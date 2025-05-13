# SIFN Platform – System Architecture

> **Version:** 0.1.0  
> **Last updated:** <!-- YYYY-MM-DD will be auto-updated by CI -->

---

## 1. High-Level Overview

The _Startup Idea Framework Navigator_ (SIFN) is a full-stack web application that guides founders through the entire lifecycle of building a startup idea:

1. **Idea Genesis** → 2. **Idea Evaluation** → 3. **Idea Validation** → 4. **Execution & Growth**

The current code base includes a modern **Next.js 15** front-end with rich, responsive UI built with **TypeScript**, **Tailwind CSS**, and **shadcn/ui**. Back-end services, data-persistence, and heavy AI workflows are designed but not yet implemented—this document defines their target architecture so engineering work can proceed in parallel with product discovery.

```
                ┌────────────┐
                │   Client   │  (Next.js ‑ React 18, CSR/SSR/ISR)
                └──────┬─────┘
                       │ HTTP(S) / WebSocket
        ┌───────────────────────────────────────────┐
        │          Next.js Edge Runtime             │  (Vercel/Cloudflare)
        ├───────────────────────────────────────────┤
        │ API Route Handlers (REST/GraphQL)         │
        │ Server Components & RSC Streams           │
        └──────┬────────────────────────────────────┘
               │ Prisma Client
        ┌──────▼────────────────────────────────────┐
        │             Postgres (Supabase)           │
        └───────────────────────────────────────────┘
               │
        ┌──────▼────────────────────────────────────┐
        │   External AI Providers (OpenAI, Pinecone)│
        └───────────────────────────────────────────┘
```

## 2. Layer Breakdown

### 2.1 Presentation Layer (Next.js / React)

- **`/app` directory** implements the **App Router** pattern with Server Components by default.
- **UI Components** are colocated in `components/ui` and wrapped by domain-aware components in `components/` (e.g. `guide-*`, `navigation-panel`).
- **Styling** leverages Tailwind CSS with a custom design-token-driven theme (`tailwind.config.ts`).
- **State management** is minimal; React Server Components fetch data on the server, while client hooks (`hooks/`) manage transient UI state (e.g. `use-toast`).
- **Routing & layouts** follow the file-system convention: each folder under `app/` corresponds to a route (e.g. `/modules/idea-genesis`).

### 2.2 API Layer (Planned)

- Implemented as **Next.js Route Handlers** under `app/api/**` (not yet present).
- **REST-first** with optional GraphQL wrapper for complex queries.
- Uses **Zod** for request/response validation.
- Auth via **NextAuth.js** + **JWT** (or Supabase Auth) ‑ TBD.

### 2.3 Business Logic Layer (Planned)

- **Services** folder will encapsulate domain logic (idea scoring, market sizing, validation experiments, etc.).
- Long-running or compute-heavy tasks will be off-loaded to **Serverless Functions** (Vercel Functions) or **Background Jobs** (e.g. _Upstash QStash_).

### 2.4 Data Layer

- **Relational store**: **PostgreSQL** (hosted via Supabase or RDS).
- **ORM**: **Prisma v5** (planned) with generated TypeScript types.
- **Vector store**: **Pinecone** (for semantic search across user notes, guides, AI embeddings).

### 2.5 AI/ML Layer

- **OpenAI GPT-4o** for text generation, analysis, and dynamic content (idea generator, evaluation scoring, personalised insights).
- **LangChain** orchestrates multi-step chains (prompt templates, tool calling, retrieval-augmented generation).
- **Embeddings** stored in Pinecone for similarity search.

### 2.6 Observability

- **Analytics** route (`/analytics`) demonstrates planned metric cards.
- Production will integrate **Planetscale Insights**, **Sentry** for error tracking, and **PostHog** for product analytics.

## 3. Deployment Topology

| Environment | Hosting | Branch | Notes                                   |
| ----------- | ------- | ------ | --------------------------------------- |
| Preview     | Vercel  | PRs    | Automatic, ephemeral                    |
| Staging     | Vercel  | _main_ | Mirrors production DB, feature gates on |
| Production  | Vercel  | _prod_ | Geo-replicated Edge Network             |

CI/CD powered by **GitHub Actions** → **Vercel Deploy**.

## 4. Security Considerations

1. **OWASP Top-10** hardening out-of-the-box via Next.js security headers.
2. **Rate limiting** on API routes using _Upstash Ratelimit_.
3. **End-to-End encryption** (TLS 1.3 everywhere).
4. Secrets managed via Vercel Environments.

## 5. Future Enhancements

- Edge AI inference using **Vercel AI SDK**.
- **Realtime** collaboration using Supabase Realtime & Y.js.
- **Plugin system** for third-party frameworks (e.g. Lean Canvas, Business Model Canvas).

---

_Next: See `docs/backend-design.md` for concrete API contracts and service decomposition._
