# Database Design & ERD

> **Version:** 0.1.0

---

The _Database Design_ document dives deeper into the relational schema introduced in **`docs/backend-design.md`** and rationalises choices around indexing, constraints, and performance.

## 1. Technology

- **PostgreSQL 15** – battle-tested, ACID compliant, great JSONB & full-text search support.
- **pgvector** extension – store 3-dimensional and high-dimensional embedding vectors for semantic search.
- **Prisma ORM** – auto-generates migration SQL and types.

## 2. Entity-Relationship Diagram

```
[User] 1─∞ [Idea] 1─∞ [Evaluation]
   │                 │
   │                 └─∞ [Validation]
   │
   └─∞ [Session]      ∞
                 [Project] ∞─1 [Idea]
```

(A more detailed visual ERD will be generated automatically and stored in `docs/assets/erd.png` after the first migration.)

### 2.1 User

| Field          | Type            | Notes               |
| -------------- | --------------- | ------------------- |
| id             | `UUID / cuid()` | Primary key         |
| email          | `varchar(255)`  | Unique, indexed     |
| hashedPassword | `varchar(255)`  | Null if OAuth       |
| createdAt      | `timestamp`     | defaults to `now()` |
| updatedAt      | `timestamp`     | on update           |

### 2.2 Idea

- **Partitioning**: Ideas partitioned by `userId` for scalable **Row Level Security** (Postgres RLS on Supabase).
- **Vector column** `embedding vector(1536)` stores summary embedding for search.
- **GIN index** on `tags` array.

### 2.3 Evaluation

- Composite index on `(ideaId, framework)` speeds up duplicates check.

### 2.4 Validation

- Uses **JSONB** `metrics` column for flexible storage of experiment results.

### 2.5 Project & Metrics

- `metrics` column is **JSONB** document that mirrors front-end analytics widgets.
- Time-series metrics aggregated and rolled-up daily via **Materialized Views** (`project_metrics_daily_mv`).

## 3. Naming Conventions

- Tables – **snake_case plural** (e.g. `ideas`, `validations`)
- Columns – **snake_case singular** (e.g. `created_at`)
- Enums – **PascalCase** (managed by Prisma)

## 4. Data Lifecycle & GDPR

| Stage                 | Policy                                         |
| --------------------- | ---------------------------------------------- |
| Soft-delete           | `deleted_at` column + partial indexes          |
| Hard-delete           | Scheduled job purges after 30 days             |
| Backup                | Daily snapshots to S3 (Glacier after 90 days)  |
| Right-to-be-Forgotten | cascades to evaluations, validations, projects |

## 5. Multi-Tenancy & Security

- **Row Level Security** in Supabase prohibits cross-tenant access.
- All queries scoped by `auth.uid()`.

## 6. Performance & Scaling

1. **Read replicas** for analytics dashboards.
2. **PGBouncer** for connection pooling in serverless contexts.
3. **Partitioning** large audit tables by month.

## 7. Migrations & Seed

- `pnpm db:migrate` – runs Prisma migrations.
- `pnpm db:seed` – seeds demo data + tutorial guides.

---

_Next Up:_ `docs/ai-integration.md` explains how embeddings & OpenAI tools interact with the schema.
