# Backend Design & API Contracts

> **Version:** 0.2.0  
> **Last updated:** 2025-05-12

---

## 1. Service Decomposition

| Domain Service         | Responsibility                                                 | API Route Prefix           | Owner                     |
| ---------------------- | -------------------------------------------------------------- | -------------------------- | ------------------------- |
| **Auth Service**       | User registration, login, OAuth, sessions, password reset, 2FA | `/api/auth/*`              | Platform                  |
| **Idea Service**       | CRUD for Ideas, tags, attachments, ideation history            | `/api/ideas/*`             | Modules – Idea Genesis    |
| **Evaluation Service** | Store evaluation forms, scores, YC 10-Q answers                | `/api/evaluation/*`        | Modules – Idea Evaluation |
| **Validation Service** | Manage validation experiments (surveys, landing pages, etc.)   | `/api/validation/*`        | Modules – Validation      |
| **Execution Service**  | Projects, tasks, milestones, metrics dashboards                | `/api/execution/*`         | Modules – Execution       |
| **AI Orchestrator**    | Proxy to OpenAI, embeddings generation, caching                | Internal – no direct route | Platform                  |
| **Analytics Service**  | Aggregate user KPIs & platform metrics                         | `/api/analytics/*`         | Platform                  |

> **Why multiple services?** Separation of concerns allows different feature teams to iterate independently, and optionally migrate heavy workloads to dedicated micro-services later.

## 2. Technology Stack

| Concern         | Choice                      | Reason                                         |
| --------------- | --------------------------- | ---------------------------------------------- |
| Runtime         | **Next.js Route Handlers**  | Zero-cold-start on Vercel edge; unified repo   |
| Language        | **TypeScript 5**            | Type-safety across stack                       |
| Data Access     | **Repository Pattern**      | Abstraction layer for database operations      |
| Validation      | **Zod**                     | Co-located schema validation & inference       |
| Auth            | **NextAuth.js w/ JWT**      | Works seamlessly with Next.js & edge functions |
| Background Jobs | **Upstash QStash**          | HTTP-based task queue with cron                |
| AI SDK          | **LangChainJS**             | Chainable LLM workflows                        |
| Search          | **Pinecone** + **PgVector** | Vector DB hybrid                               |

## 3. Data Models & Repository Pattern

Instead of using an ORM like Prisma, we'll implement a Repository Pattern to abstract database operations. This provides flexibility to change the underlying database implementation without affecting the business logic.

### 3.1 Core Entities

```typescript
// Core entity interfaces

interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  hashedPassword?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Idea {
  id: string;
  userId: string;
  title: string;
  description?: string;
  status: "DRAFT" | "VALIDATED" | "ARCHIVED";
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface Evaluation {
  id: string;
  ideaId: string;
  framework: "YC_TEN_QUESTIONS" | "RICE" | "CUSTOM";
  score: number;
  details: Record<string, any>;
  createdAt: Date;
}

interface Validation {
  id: string;
  ideaId: string;
  method:
    | "SURVEY"
    | "LANDING_PAGE"
    | "LETTER_OF_INTENT"
    | "PROTOTYPE_INTERVIEW";
  metrics: Record<string, any>;
  result: "PENDING" | "SUCCESS" | "FAIL";
  createdAt: Date;
}

interface Project {
  id: string;
  ideaId: string;
  title: string;
  description?: string;
  status: "PLANNING" | "BUILDING" | "LAUNCHED" | "SUNSETTED";
  metrics: Record<string, any>;
  createdAt: Date;
}
```

### 3.2 Repository Interfaces

```typescript
// Repository interfaces

interface Repository<T> {
  findById(id: string): Promise<T | null>;
  findAll(filter?: Record<string, any>): Promise<T[]>;
  create(data: Omit<T, "id" | "createdAt" | "updatedAt">): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<boolean>;
}

interface UserRepository extends Repository<User> {
  findByEmail(email: string): Promise<User | null>;
}

interface IdeaRepository extends Repository<Idea> {
  findByUserId(userId: string): Promise<Idea[]>;
  findByTags(tags: string[]): Promise<Idea[]>;
}

interface EvaluationRepository extends Repository<Evaluation> {
  findByIdeaId(ideaId: string): Promise<Evaluation[]>;
}

interface ValidationRepository extends Repository<Validation> {
  findByIdeaId(ideaId: string): Promise<Validation[]>;
}

interface ProjectRepository extends Repository<Project> {
  findByIdeaId(ideaId: string): Promise<Project[]>;
}
```

### 3.3 Implementation Example (PostgreSQL)

```typescript
// PostgreSQL implementation example for IdeaRepository

import { Pool } from "pg";
import { Idea } from "../models/Idea";
import { IdeaRepository } from "../interfaces/IdeaRepository";

export class PostgresIdeaRepository implements IdeaRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async findById(id: string): Promise<Idea | null> {
    const result = await this.pool.query("SELECT * FROM ideas WHERE id = $1", [
      id,
    ]);

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapRowToIdea(result.rows[0]);
  }

  async findAll(filter?: Record<string, any>): Promise<Idea[]> {
    let query = "SELECT * FROM ideas";
    const params: any[] = [];

    if (filter) {
      const conditions: string[] = [];
      let paramIndex = 1;

      Object.entries(filter).forEach(([key, value]) => {
        if (key === "tags") {
          conditions.push(`tags && $${paramIndex}`);
          params.push(value);
        } else {
          conditions.push(`${key} = $${paramIndex}`);
          params.push(value);
        }
        paramIndex++;
      });

      if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
      }
    }

    const result = await this.pool.query(query, params);
    return result.rows.map(this.mapRowToIdea);
  }

  async create(
    data: Omit<Idea, "id" | "createdAt" | "updatedAt">
  ): Promise<Idea> {
    const result = await this.pool.query(
      `INSERT INTO ideas (user_id, title, description, status, tags) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [data.userId, data.title, data.description, data.status, data.tags]
    );

    return this.mapRowToIdea(result.rows[0]);
  }

  async update(id: string, data: Partial<Idea>): Promise<Idea> {
    const setClause: string[] = [];
    const params: any[] = [];
    let paramIndex = 1;

    Object.entries(data).forEach(([key, value]) => {
      if (key !== "id" && key !== "createdAt" && key !== "updatedAt") {
        const snakeKey = this.camelToSnake(key);
        setClause.push(`${snakeKey} = $${paramIndex}`);
        params.push(value);
        paramIndex++;
      }
    });

    params.push(id);

    const result = await this.pool.query(
      `UPDATE ideas SET ${setClause.join(", ")}, updated_at = NOW() 
       WHERE id = $${paramIndex} 
       RETURNING *`,
      params
    );

    return this.mapRowToIdea(result.rows[0]);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.pool.query(
      "DELETE FROM ideas WHERE id = $1 RETURNING id",
      [id]
    );

    return result.rows.length > 0;
  }

  async findByUserId(userId: string): Promise<Idea[]> {
    const result = await this.pool.query(
      "SELECT * FROM ideas WHERE user_id = $1",
      [userId]
    );

    return result.rows.map(this.mapRowToIdea);
  }

  async findByTags(tags: string[]): Promise<Idea[]> {
    const result = await this.pool.query(
      "SELECT * FROM ideas WHERE tags && $1",
      [tags]
    );

    return result.rows.map(this.mapRowToIdea);
  }

  private mapRowToIdea(row: any): Idea {
    return {
      id: row.id,
      userId: row.user_id,
      title: row.title,
      description: row.description,
      status: row.status,
      tags: row.tags,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  private camelToSnake(str: string): string {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  }
}
```

## 4. Service Layer

The service layer encapsulates business logic and orchestrates operations across repositories.

```typescript
// Example service for Idea domain

import { Idea } from "../models/Idea";
import { IdeaRepository } from "../interfaces/IdeaRepository";
import { EvaluationRepository } from "../interfaces/EvaluationRepository";
import { AIOrchestrator } from "../services/AIOrchestrator";

export class IdeaService {
  private ideaRepository: IdeaRepository;
  private evaluationRepository: EvaluationRepository;
  private aiOrchestrator: AIOrchestrator;

  constructor(
    ideaRepository: IdeaRepository,
    evaluationRepository: EvaluationRepository,
    aiOrchestrator: AIOrchestrator
  ) {
    this.ideaRepository = ideaRepository;
    this.evaluationRepository = evaluationRepository;
    this.aiOrchestrator = aiOrchestrator;
  }

  async createIdea(
    userId: string,
    data: { title: string; description?: string; tags: string[] }
  ): Promise<Idea> {
    return this.ideaRepository.create({
      userId,
      title: data.title,
      description: data.description,
      status: "DRAFT",
      tags: data.tags,
    });
  }

  async evaluateIdea(
    ideaId: string,
    framework: "YC_TEN_QUESTIONS" | "RICE" | "CUSTOM",
    answers: Record<string, any>
  ): Promise<{ score: number; feedback: Record<string, any> }> {
    const idea = await this.ideaRepository.findById(ideaId);

    if (!idea) {
      throw new Error("Idea not found");
    }

    // Use AI to evaluate the idea based on the framework and answers
    const evaluation = await this.aiOrchestrator.evaluateIdea(
      idea,
      framework,
      answers
    );

    // Store the evaluation result
    await this.evaluationRepository.create({
      ideaId,
      framework,
      score: evaluation.score,
      details: {
        answers,
        feedback: evaluation.feedback,
      },
    });

    return {
      score: evaluation.score,
      feedback: evaluation.feedback,
    };
  }

  async generateIdeas(
    userId: string,
    prompt: { interests: string[]; constraints: string[] }
  ): Promise<Idea[]> {
    // Use AI to generate ideas based on user interests and constraints
    const generatedIdeas = await this.aiOrchestrator.generateIdeas(prompt);

    // Store the generated ideas
    const createdIdeas = await Promise.all(
      generatedIdeas.map((ideaData) =>
        this.createIdea(userId, {
          title: ideaData.title,
          description: ideaData.description,
          tags: ideaData.tags,
        })
      )
    );

    return createdIdeas;
  }
}
```

## 5. API Layer (Route Handlers)

Next.js Route Handlers implement the API endpoints, handling HTTP requests and responses.

```typescript
// Example route handler for creating an idea

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { container } from "@/lib/container";
import { IdeaService } from "@/services/IdeaService";

const createIdeaSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().optional(),
  tags: z.array(z.string()).default([]),
});

export async function POST(req: NextRequest) {
  try {
    // Authenticate user
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse and validate request body
    const body = await req.json();
    const validatedData = createIdeaSchema.parse(body);

    // Get service from dependency injection container
    const ideaService = container.resolve(IdeaService);

    // Create idea
    const idea = await ideaService.createIdea(session.user.id, validatedData);

    // Return response
    return NextResponse.json(
      { id: idea.id, status: idea.status },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.format() },
        { status: 400 }
      );
    }

    console.error("Error creating idea:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

## 6. Dependency Injection

A simple dependency injection container manages service instantiation and dependencies.

```typescript
// lib/container.ts

import { Pool } from "pg";
import { PostgresUserRepository } from "@/repositories/PostgresUserRepository";
import { PostgresIdeaRepository } from "@/repositories/PostgresIdeaRepository";
import { PostgresEvaluationRepository } from "@/repositories/PostgresEvaluationRepository";
import { AIOrchestrator } from "@/services/AIOrchestrator";
import { IdeaService } from "@/services/IdeaService";
import { UserService } from "@/services/UserService";

class Container {
  private instances: Map<string, any> = new Map();

  constructor() {
    this.registerSingletons();
  }

  private registerSingletons() {
    // Database connection
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    this.instances.set("Pool", pool);

    // Repositories
    this.instances.set("UserRepository", new PostgresUserRepository(pool));
    this.instances.set("IdeaRepository", new PostgresIdeaRepository(pool));
    this.instances.set(
      "EvaluationRepository",
      new PostgresEvaluationRepository(pool)
    );

    // Services
    this.instances.set("AIOrchestrator", new AIOrchestrator());
    this.instances.set(
      "UserService",
      new UserService(this.resolve("UserRepository"))
    );
    this.instances.set(
      "IdeaService",
      new IdeaService(
        this.resolve("IdeaRepository"),
        this.resolve("EvaluationRepository"),
        this.resolve("AIOrchestrator")
      )
    );
  }

  resolve<T>(name: string): T {
    if (!this.instances.has(name)) {
      throw new Error(`No instance registered for ${name}`);
    }

    return this.instances.get(name) as T;
  }
}

export const container = new Container();
```

## 7. AI Orchestrator Pattern

```
Client → Idea Service → AI Orchestrator ─┬─> OpenAI ChatCompletion (analysis)
                                         └─> Database (cache)
```

```typescript
// services/AIOrchestrator.ts

import { PromptTemplate } from "langchain/prompts";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { LLMChain } from "langchain/chains";
import { Idea } from "@/models/Idea";

export class AIOrchestrator {
  private llm: ChatOpenAI;

  constructor() {
    this.llm = new ChatOpenAI({
      modelName: "gpt-4o",
      temperature: 0.7,
    });
  }

  async evaluateIdea(
    idea: Idea,
    framework: "YC_TEN_QUESTIONS" | "RICE" | "CUSTOM",
    answers: Record<string, any>
  ): Promise<{ score: number; feedback: Record<string, any> }> {
    // Load the appropriate prompt template based on the framework
    const promptTemplate = this.getPromptTemplate(framework);

    // Create a chain
    const chain = new LLMChain({
      llm: this.llm,
      prompt: promptTemplate,
    });

    // Run the chain
    const result = await chain.call({
      idea: {
        title: idea.title,
        description: idea.description,
        tags: idea.tags,
      },
      answers,
    });

    // Parse the result
    const parsedResult = JSON.parse(result.text);

    return {
      score: parsedResult.score,
      feedback: parsedResult.feedback,
    };
  }

  async generateIdeas(prompt: {
    interests: string[];
    constraints: string[];
  }): Promise<Array<{ title: string; description: string; tags: string[] }>> {
    const promptTemplate = new PromptTemplate({
      inputVariables: ["interests", "constraints"],
      template: `Generate 3 startup ideas based on the following interests: {{interests}} and constraints: {{constraints}}. Return the ideas as a JSON array with each idea having a title, description, and tags.`,
    });

    const chain = new LLMChain({
      llm: this.llm,
      prompt: promptTemplate,
    });

    const result = await chain.call({
      interests: prompt.interests.join(", "),
      constraints: prompt.constraints.join(", "),
    });

    return JSON.parse(result.text);
  }

  private getPromptTemplate(
    framework: "YC_TEN_QUESTIONS" | "RICE" | "CUSTOM"
  ): PromptTemplate {
    switch (framework) {
      case "YC_TEN_QUESTIONS":
        return new PromptTemplate({
          inputVariables: ["idea", "answers"],
          template: `You are a YC expert. Given the startup idea: {{idea}} and the founder's answers: {{answers}}, output a JSON object with a score (0-100) and detailed feedback for each question.`,
        });
      case "RICE":
        return new PromptTemplate({
          inputVariables: ["idea", "answers"],
          template: `Evaluate the following idea using the RICE framework (Reach, Impact, Confidence, Effort): {{idea}} with the provided data: {{answers}}. Return a JSON object with the RICE score and detailed feedback.`,
        });
      case "CUSTOM":
        return new PromptTemplate({
          inputVariables: ["idea", "answers"],
          template: `Evaluate the following startup idea: {{idea}} based on the custom criteria: {{answers}}. Return a JSON object with an overall score (0-100) and detailed feedback for each criterion.`,
        });
    }
  }
}
```

## 8. Error Handling & Rate Limiting

- Each route returns `ProblemDetails` (RFC 9457) JSON on error.
- **401** / **403** for auth issues, **429** if rate-limited, **5xx** for unexpected.
- Global middleware (`middleware.ts`) will invoke Upstash Ratelimit based on user-id or IP.

```typescript
// middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Create a new ratelimiter that allows 10 requests per minute
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1 m"),
  analytics: true,
});

export async function middleware(request: NextRequest) {
  // Only apply rate limiting to API routes
  if (!request.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Get IP or user identifier for rate limiting
  const ip = request.ip ?? "127.0.0.1";

  // Get authentication token if available
  const authHeader = request.headers.get("authorization");
  const identifier = authHeader ? `auth:${authHeader}` : `ip:${ip}`;

  // Check if the request is rate limited
  const { success, limit, reset, remaining } = await ratelimit.limit(
    identifier
  );

  // Set rate limit headers
  const response = success
    ? NextResponse.next()
    : NextResponse.json(
        {
          error: "Too many requests",
          details: {
            limit,
            remaining: 0,
            reset: new Date(reset).toISOString(),
          },
        },
        { status: 429 }
      );

  response.headers.set("X-RateLimit-Limit", limit.toString());
  response.headers.set("X-RateLimit-Remaining", remaining.toString());
  response.headers.set("X-RateLimit-Reset", new Date(reset).toISOString());

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
```

## 9. OpenAPI & SDK Generation

- OpenAPI 3.1 schema generated from Zod with **zod-to-openapi**.
- **client-sdk** generated via **openapi-typescript**; published to npm as `@sifn/sdk` so the React front-end can call typed endpoints without boilerplate.

```typescript
// lib/openapi.ts

import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { createIdeaSchema } from "@/schemas/idea";

const registry = new OpenAPIRegistry();

// Register schemas
registry.register("CreateIdea", createIdeaSchema);

// Define paths
registry.registerPath({
  method: "post",
  path: "/api/ideas",
  summary: "Create a new idea",
  request: {
    body: {
      content: {
        "application/json": {
          schema: registry.getRef("CreateIdea"),
        },
      },
    },
  },
  responses: {
    201: {
      description: "Idea created successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              id: { type: "string" },
              status: { type: "string" },
            },
            required: ["id", "status"],
          },
        },
      },
    },
  },
});

// Generate OpenAPI document
export const openApiDocument = registry.getDefinitions();
```

## 10. Database Migration Strategy

Without Prisma, we'll use a SQL migration tool like `node-pg-migrate` to manage database schema changes.

```typescript
// migrations/1_create_initial_tables.js

exports.up = (pgm) => {
  // Users table
  pgm.createTable("users", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    email: { type: "varchar(255)", notNull: true, unique: true },
    name: { type: "varchar(255)" },
    image: { type: "varchar(255)" },
    hashed_password: { type: "varchar(255)" },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("now()"),
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("now()"),
    },
  });

  // Ideas table
  pgm.createTable("ideas", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    user_id: {
      type: "uuid",
      notNull: true,
      references: "users(id)",
      onDelete: "CASCADE",
    },
    title: { type: "varchar(100)", notNull: true },
    description: { type: "text" },
    status: { type: "varchar(20)", notNull: true, default: "DRAFT" },
    tags: { type: "text[]", notNull: true, default: "{}" },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("now()"),
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("now()"),
    },
  });

  // Create index on user_id
  pgm.createIndex("ideas", "user_id");

  // Create GIN index on tags
  pgm.createIndex("ideas", "tags", { method: "GIN" });

  // Evaluations table
  pgm.createTable("evaluations", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    idea_id: {
      type: "uuid",
      notNull: true,
      references: "ideas(id)",
      onDelete: "CASCADE",
    },
    framework: { type: "varchar(50)", notNull: true },
    score: { type: "decimal", notNull: true },
    details: { type: "jsonb", notNull: true },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("now()"),
    },
  });

  // Create index on idea_id
  pgm.createIndex("evaluations", "idea_id");

  // Create composite index on idea_id and framework
  pgm.createIndex("evaluations", ["idea_id", "framework"]);

  // Validations table
  pgm.createTable("validations", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    idea_id: {
      type: "uuid",
      notNull: true,
      references: "ideas(id)",
      onDelete: "CASCADE",
    },
    method: { type: "varchar(50)", notNull: true },
    metrics: { type: "jsonb", notNull: true },
    result: { type: "varchar(20)", notNull: true, default: "PENDING" },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("now()"),
    },
  });

  // Create index on idea_id
  pgm.createIndex("validations", "idea_id");

  // Projects table
  pgm.createTable("projects", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    idea_id: {
      type: "uuid",
      notNull: true,
      references: "ideas(id)",
      onDelete: "CASCADE",
    },
    title: { type: "varchar(100)", notNull: true },
    description: { type: "text" },
    status: { type: "varchar(20)", notNull: true, default: "PLANNING" },
    metrics: { type: "jsonb", notNull: true, default: "{}" },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("now()"),
    },
  });

  // Create index on idea_id
  pgm.createIndex("projects", "idea_id");
};

exports.down = (pgm) => {
  pgm.dropTable("projects");
  pgm.dropTable("validations");
  pgm.dropTable("evaluations");
  pgm.dropTable("ideas");
  pgm.dropTable("users");
};
```

---

See also `docs/database-design.md` for ERD diagrams and normalization rationale.
