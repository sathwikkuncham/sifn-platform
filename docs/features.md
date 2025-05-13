# Feature Catalogue

> **Version:** 0.1.0

This document summarises all user-facing functionality currently present _or_ planned in SIFN, mapped to the codebase so engineers & PMs know where things live.

---

| #   | Feature             | Route                      | Source Code                            | Status                          |
| --- | ------------------- | -------------------------- | -------------------------------------- | ------------------------------- |
| 1   | Landing & Overview  | `/`                        | `app/page.tsx`                         | ✅ Implemented                  |
| 2   | Idea Genesis        | `/modules/idea-genesis`    | `app/modules/idea-genesis/page.tsx`    | ✅ UI only – AI integration WIP |
| 3   | Idea Evaluation     | `/modules/idea-evaluation` | `app/modules/idea-evaluation/page.tsx` | ✅ UI only – backend TBD        |
| 4   | Idea Validation     | `/modules/validation`      | `app/modules/validation/page.tsx`      | ⏳ In design                    |
| 5   | Execution Dashboard | `/modules/execution`       | `app/modules/execution/page.tsx`       | ✅ UI only                      |
| 6   | Analytics Dashboard | `/analytics`               | `app/analytics/page.tsx`               | ✅ Mock data                    |
| 7   | User Settings       | `/settings`                | `app/settings/page.tsx`                | ✅ Functional (local state)     |
| 8   | Guides Index        | `/guides`                  | `app/guides/page.tsx`                  | ✅ Implemented                  |
| 9   | Guide Reader        | `/guides/[slug]`           | `app/guides/[slug]/page.tsx`           | ✅ Data-driven (markdown)       |
| 10  | Search Guides       | Inline search bar          | Various components                     | ⏳ Hooking to vector search     |
| 11  | Floating Nav Button | All pages                  | `components/floating-nav-button.tsx`   | ✅                              |
| 12  | Dark / Light Theme  | Toggle in nav              | `components/theme-toggle.tsx`          | ✅                              |

### Legend

- ✅ – Fully functional
- ⏳ – Work in progress / partly functional
- 🗓️ – Planned (see Roadmap)

## Module Breakdown

### 1. Idea Genesis

- **AI Idea Generator** (planned) – collects user interests & calls OpenAI.
- **Framework Explorer** – UI cards for PG, Friedman, Design Thinking, Blue Ocean.
- **Refinement Workshop** – interactive wizard (not yet coded).

### 2. Idea Evaluation

- **YC 10-Question** form (planned server component) → outputs score.
- **Market Sizing Tool** – interactive TAM/SAM/SOM calculator.
- **Competitive Analysis** – matrix builder.
- **Idea Scorecard** – multi-criteria scoring system.

### 3. Validation

- **Landing Page Generator** – one-click page & Stripe pre-orders.
- **Survey Designer** – phone-friendly forms.
- **Early Adopter CRM** – track interviews.

### 4. Execution

- **MVP Builder** – Gantt-style planner.
- **Technical Resources** – curated tech stack suggestions.
- **Metrics Dashboard** – integrates with PostHog.
- **Operational Checklist** – legal, finance, HR tasks.

## Non-Functional Features

- **Accessibility** – shadcn components accessible by default.
- **Responsive Design** – Tailwind breakpoints verified (ℹ️ see `styles/globals.css`).
- **Performance** – Next.js Image optimisation (future) & RSC streaming.
- **Internationalisation (i18n)** – roadmap Q4 2025.

---

For deeper architectural context, refer to `docs/architecture.md`. For upcoming work, see `docs/roadmap.md`.
