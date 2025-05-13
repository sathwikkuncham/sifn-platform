# AI Integration & LLM Workflows

> **Version:** 0.1.0

---

## 1. Rationale

SIFN leverages Artificial Intelligence to help founders _ideate_, _evaluate_, _validate_, and _execute_ faster than ever. Rather than building an AI-centric product, we embed AI where it creates outsized leverage for users while maintaining full transparency of the model's capabilities and limitations.

## 2. Primary Use-Cases

| Module          | Feature                         | Model         | Prompt Engineering Pattern                |
| --------------- | ------------------------------- | ------------- | ----------------------------------------- |
| Idea Genesis    | _AI Idea Generator_             | GPT-4o        | Few-shot + user persona, temperature 0.8  |
| Idea Evaluation | _YC 10-Question Scoring_        | GPT-4 Turbo   | System prompt enforces JSON schema output |
| Validation      | _Survey Synthesiser_            | GPT-3.5 Turbo | Chain-of-thought → refine                 |
| Execution       | _MVP Feature Slicer_            | GPT-4o        | Recursive decomposition + prioritisation  |
| Analytics       | _Actionable Insight Generation_ | GPT-4o        | RAG with Postgres analytics snapshots     |

## 3. Architecture

```
┌──────────────┐
│ React Client │──/api/ideas/generate──▶┐
└──────────────┘                        │
                                        ▼
                               ┌──────────────────┐
                               │  Idea Service    │
                               └──────────────────┘
                                        │
                                         ▼ (internal call)
                               ┌──────────────────┐
                               │ AI Orchestrator  │
                               └─▲────────┬───────┘
                                 │Cache   │Rate-Limit
            Pinecone (vector db) │        │Upstash Ratelimit
                                 ▼        ▼
                           OpenAI Chat  OpenAI Embeddings
```

### 3.1 AI Orchestrator Responsibilities

1. **Prompt templating** using `@langchain/core` `PromptTemplate`.
2. **Retry & exponential backoff** via `langchain/retriers`.
3. **Guardrails** – response validated by Zod; if invalid → automatic re-prompt.
4. **Caching** – SHA-256 prompt hash stored in Redis (Upstash) with 24h TTL.
5. **Metrics** – Token usage captured per request and stored in `ai_usage` table in Postgres.

## 4. Prompt Repository

All prompts are stored under `prompts/` directory (to be created) as `.prompt.ts` files exporting a `PromptTemplate`. Example:

```ts
// prompts/ycTenQuestions.prompt.ts
import { PromptTemplate } from "langchain/prompts";

export const ycTenQuestionsPrompt = new PromptTemplate({
  inputVariables: ["idea", "answers"],
  template: `You are a YC expert. Given the startup idea: {{idea}} and the founder's answers: {{answers}}, output a JSON object strictly matching this schema: ...`,
});
```

## 5. Vector Embeddings & RAG

- **Text Sources**: User notes, guide markdown content, YC/Paul Graham essays.
- **Chunking**: 1-3 paragraphs (≈600 tokens) with overlap 50 tokens.
- **Embedding Model**: `text-embedding-3-small`.
- **Storage**: Pinecone index `sifn-guides` (dimension 1536, cosine).

Retrieval logic uses `langchain` `ConversationalRetrievalQAChain` to ground user questions in authoritative content.

## 6. Security & Compliance

1. No PII is sent to the AI provider; user-identifiers are stripped.
2. Users can opt-out of AI features in **Settings → Privacy**.
3. API keys stored as Vercel encrypted secrets.

## 7. Cost Control

- Default models: GPT-3.5.
- GPT-4o only on-demand or for paid-tier users.
- Monthly token budget per user; limits enforced via middleware.

## 8. Future Enhancements

- **Fine-tuned models** for more accurate evaluation scoring.
- **Multi-modal** idea boards – generate diagrams via DALL·E.
- **Agentic workflows** that can call external tools (Crunchbase API) to enrich market data.

---

_Return to `docs/architecture.md` → section 2.5 for layer context._
