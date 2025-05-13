# Product & Engineering Roadmap

> **Version:** 0.1.0  
> Owner: @product  
> Updated: <!-- YYYY-MM-DD -->

---

## 1. Vision Statement

Empower entrepreneurs worldwide to go from _problem insight_ to _product-market fit_ 2× faster by providing an integrated, AI-augmented workspace that combines frameworks, data, and execution tooling.

## 2. Milestones

| Quarter   | Milestone     | Key Deliverables      | Metrics | Status |
| --------- | ------------- | --------------------- | ------- | ------ |
| **Q2-24** | Alpha Release | • Public landing page |

• Idea Genesis MVP (UI)  
• Guides reader  
• Dark/light theme | 100 alpha sign-ups | ✅ completed |
| **Q3-24** | Beta Launch | • Auth + DB  
• Idea Evaluation backend  
• AI Idea Generator  
• Analytics dashboard (read-only) | Weekly active users (WAU) ≥ 200 | ⏳ in progress |
| **Q4-24** | Validation Toolkit | • Landing page generator  
• Survey designer  
• Early adopter CRM  
• Stripe pre-order flow | Paid conversions ≥ 20 | 🗓️ planned |
| **Q1-25** | Execution Suite | • MVP builder  
• Metrics ingestion (PostHog)  
• Team collaboration | Retention (D30) ≥ 40 % | 🗓️ planned |
| **Q2-25** | Monetisation v1 | • Pricing page  
• Paywall gating  
• Usage-based billing for GPT-4o | MRR ≥ $10 k | 🗓️ planned |

## 3. Engineering Tasks (Current Sprint)

| #   | Task                                  | Owner | Est (pts) | Status |
| --- | ------------------------------------- | ----- | --------- | ------ |
| 1   | Set up Supabase project & env secrets | @devA | 3         | ⏳     |
| 2   | Implement `/api/ideas` CRUD           | @devB | 5         | ⏳     |
| 3   | LangChain AI orchestrator POC         | @devC | 8         | ⏳     |
| 4   | Vector embeddings of guide markdown   | @devD | 5         | ⏳     |
| 5   | E2E Cypress smoke tests               | @qa   | 3         | 🗓️     |

## 4. Risk Register

| Risk                         | Impact | Mitigation                                             |
| ---------------------------- | ------ | ------------------------------------------------------ |
| OpenAI pricing increases     | High   | Allow model tier switching; cache results aggressively |
| Regulatory (AI transparency) | Medium | Display provenance & disclaimers; store inference logs |
| Feature creep                | Medium | Strict PRD & sprint planning                           |

## 5. Hiring Plan

- **Full-stack dev (TypeScript, Prisma, AI)** – August 2024
- **Product Designer** – October 2024
- **Growth Marketing** – Q1 2025

---

For backlog and issue tracking, visit the GitHub Projects board.
