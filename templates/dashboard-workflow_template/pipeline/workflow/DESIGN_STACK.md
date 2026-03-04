# Stack Technique — Dashboard Template

## Frontend

| Composant | Technologie | Version | Usage |
|-----------|------------|---------|-------|
| Framework | Next.js | 15+ | App Router, SSR, API Routes, Middleware |
| Runtime | React | 19+ | Server/Client Components, Suspense |
| Langage | TypeScript | 5+ | Typage strict |
| Styling | Tailwind CSS | 4+ | Utility-first, CSS variables, @theme inline |
| UI Library | shadcn/ui | latest | Composants accessibles (Button, Input, Dialog, Table, etc.) |
| Icones | Lucide React | latest | Icones SVG, tree-shakable |
| Formulaires | react-hook-form | 7+ | Gestion formulaires performante |
| Validation | Zod | 3+ | Validation schema, inference TypeScript |
| Graphiques | Recharts | 2+ | KPIs, charts (optionnel) |
| Dates | date-fns | 3+ | Utilitaires dates, locales FR |
| Toasts | Sonner | 1+ | Notifications toast |
| Themes | next-themes | 0.4+ | Dark mode (optionnel) |
| Utilities | clsx, tailwind-merge | latest | Classnames conditionnels |

## Backend

| Composant | Technologie | Usage |
|-----------|------------|-------|
| BaaS | Supabase | PostgreSQL + Auth + Realtime + Storage |
| Database | PostgreSQL | 15+ | Tables, RLS, Enums, Functions |
| Auth | Supabase Auth | Magic Link, OAuth, RBAC |
| Realtime | Supabase Realtime | Subscriptions (optionnel) |
| Storage | Supabase Storage | Photos, fichiers (optionnel) |
| Hosting | Vercel | Serverless, Edge, Preview builds |

## Automations

| Composant | Technologie | Usage |
|-----------|------------|-------|
| Orchestrateur | n8n | Workflows, webhooks, scheduling |
| Email | SMTP | Emails transactionnels |
| Sync | iCal / API / IMAP | Integrations externes (selon projet) |

## Developpement

| Outil | Usage |
|-------|-------|
| ESLint | Linting (flat config) |
| Prettier | Formatting (+ plugin Tailwind) |
| Vitest | Tests unitaires (Phase 2) |
| Playwright | Tests E2E (Phase 2) |
| Sentry | Error tracking (production) |

## Installation

```bash
# Scaffold Next.js
npx create-next-app@latest [nom-projet] --typescript --tailwind --eslint --app --src-dir

# Dependencies core
npm install @supabase/supabase-js @supabase/ssr
npm install react-hook-form @hookform/resolvers zod
npm install sonner lucide-react
npm install clsx tailwind-merge

# Dependencies optionnelles
npm install recharts date-fns          # KPIs, calendrier
npm install next-themes                 # Dark mode
npm install @sentry/nextjs              # Error tracking

# shadcn/ui
npx shadcn@latest init
npx shadcn@latest add button input dialog table tabs card badge avatar
```

## Conventions

### Fichiers
- Pages : `src/app/([role])/[route]/page.tsx`
- Composants : `src/components/[domain]/[component].tsx`
- Server Actions : `src/app/actions/[domain].ts`
- Types : `src/types/[domain].ts`
- Supabase : `src/lib/supabase/[client|server|admin|middleware].ts`

### Nommage
- Fichiers : `kebab-case`
- Composants React : `PascalCase`
- Variables/fonctions : `camelCase`
- Tables/colonnes SQL : `snake_case`
- CSS tokens : `--kebab-case`
