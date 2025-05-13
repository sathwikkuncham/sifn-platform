# Codebase File Overview

> **Generation timestamp:** <!-- will be filled by CI -->

This document gives a bird's-eye view of _every_ file in the repository as of v0.1, grouped by directory. For brevity, small purely-visual shadcn components share a single row.

---

## Root

| File / Dir           | Purpose                                     |
| -------------------- | ------------------------------------------- |
| `package.json`       | Project metadata, scripts, deps.            |
| `pnpm-lock.yaml`     | Frozen dependency graph.                    |
| `tsconfig.json`      | TypeScript compiler config.                 |
| `tailwind.config.ts` | Tailwind theme and shadcn preset.           |
| `postcss.config.mjs` | Tailwind + autoprefixer setup.              |
| `next.config.mjs`    | Next.js runtime options (experimental RSC). |
| `.gitignore`         | Git hygiene.                                |
| `components.json`    | shadcn generator manifest.                  |
| `styles/`            | Global CSS (`globals.css`) + util classes.  |
| `docs/`              | Project documentation (this folder).        |

## `/app`

| Sub-Dir / File                | Route                      | Description                                      |
| ----------------------------- | -------------------------- | ------------------------------------------------ |
| `layout.tsx`                  | _global_                   | Root layout with `ThemeProvider`, nav panel.     |
| `page.tsx`                    | `/`                        | Landing screen – features cards & hero.          |
| `globals.css`                 | –                          | Tailwind base + glass morph style.               |
| **`analytics/`**              | `/analytics`               | Dashboard with idea/validation KPIs.             |
| **`settings/`**               | `/settings`                | Multi-tab preferences UI.                        |
| **`modules/idea-genesis`**    | `/modules/idea-genesis`    | Idea generation workspace.                       |
| **`modules/idea-evaluation`** | `/modules/idea-evaluation` | Evaluation workspace.                            |
| **`modules/validation`**      | `/modules/validation`      | (Placeholder).                                   |
| **`modules/execution`**       | `/modules/execution`       | Execution & growth workspace.                    |
| **`guides/`**                 | `/guides`                  | Markdown-driven educational content (see below). |

### Guides

_Each guide folder (`startup-foundation`, `early-execution`, …) contains_:

1. `content.md` – the markdown source.
2. `page.tsx` – renders MDX via `GuideContent` component.

`[slug]/page.tsx` is the dynamic route that handles unknown guide slugs.

## `/components`

| Scope                 | Example File(s)                                       | Purpose                                                                                                    |
| --------------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Domain Components** | `guide-table-of-contents.tsx`, `navigation-panel.tsx` | Feature-specific reusable pieces.                                                                          |
| **Utility / Global**  | `theme-provider.tsx`, `hero-pattern.tsx`              | Cross-cutting utilities.                                                                                   |
| **UI kit (shadcn)**   | `components/ui/*` (≈60 files)                         | HeadlessUI-based accessible primitives: Button, Card, Tabs, etc. These are generated; business logic free. |

## `/hooks`

| File             | Purpose                                                    |
| ---------------- | ---------------------------------------------------------- |
| `use-toast.ts`   | Minimal toast state machine (ported from react-hot-toast). |
| `use-mobile.tsx` | Media-query helper for responsive tweaks.                  |

## `/lib`

| File       | Purpose                                                       |
| ---------- | ------------------------------------------------------------- |
| `utils.ts` | `cn()` className merger wrapper around clsx + tailwind-merge. |

## `/public`

Static assets (logos, favicons, og images) – directory currently empty placeholder.

## Docs Folder (`/docs`)

Generated docs you are reading now: architecture, backend-design, database-design, features, AI-integration, roadmap, resources, etc.

---

### Generated / Vendor Files Not Listed Individually

- All files in `components/ui/` follow the same pattern: forward refs to Radix primitives → Tailwind classes. They are intentionally left un-expanded in this overview.

### How to Keep This File Up-to-Date

`pnpm run docs:generate` (script TBD) will diff the file tree and update this markdown automatically. **CI** fails if the working tree is dirty after running the script, enforcing documentation parity.

---

_Return to higher-level docs for conceptual design._
