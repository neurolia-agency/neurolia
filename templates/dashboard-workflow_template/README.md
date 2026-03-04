# Dashboard Workflow Template

Template standardise pour la creation de dashboards et applications web avec Claude Code.

## Concept

Workflow en **2 phases** avec **4 agents specialises** :

| Phase | Description | Agent(s) | Output |
|-------|-------------|----------|--------|
| **A** | Architecture | `architecture-planner` | Markdown uniquement |
| **B** | Developpement | `dashboard-ui-builder`, `backend-layer`, `integration-builder` | Code Next.js + Supabase + n8n |

## Quick Start

### 1. Copier le template

```bash
cp -r templates/dashboard-workflow_template/ clients/[nom-projet]/
cd clients/[nom-projet]/
```

### 2. Personnaliser

- Editer `CLAUDE.md` (remplacer les `[PLACEHOLDERS]`)
- Copier `PLAN-TEMPLATE.md` → `PLAN.md` et personnaliser
- Remplir `pipeline/input/brief-client.md`

### 3. Initialiser Next.js

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir
npm install @supabase/supabase-js @supabase/ssr
npm install react-hook-form @hookform/resolvers zod sonner lucide-react
npm install recharts date-fns
```

### 4. Executer le workflow

```bash
# Phase A — Agent architecture-planner (sequentiel A01 → A05)
# Lancer l'agent architecture-planner qui execute les 5 etapes avec les skills associes

# Phase B — Batchs paralleles (voir PLAN.md)
# Utiliser dashboard-ui-builder, backend-layer, integration-builder
# Avec attribution de modeles selon agent-models.md
```

## Structure

```
template/
├── CLAUDE.md                    # Statut pipeline + contexte (LIRE EN PREMIER)
├── PLAN-TEMPLATE.md             # Copier → PLAN.md pour chaque projet
│
├── .claude/
│   ├── agents/                  # 4 agents specialises
│   │   ├── architecture-planner.md   # Phase A (A01-A05 sequentiel)
│   │   ├── dashboard-ui-builder.md   # Phase B UI
│   │   ├── backend-layer.md          # Phase B backend
│   │   └── integration-builder.md    # Phase B integrations
│   ├── rules/                   # Regles contextuelles
│   │   ├── agent-models.md      # Attribution modeles + batchs
│   │   ├── data-model.md        # Conventions DB, nommage, RLS
│   │   ├── api-patterns.md      # Server actions, API routes
│   │   ├── plan-update.md       # MAJ automatique PLAN.md
│   │   └── post-agent-checklist.md  # Checklist verification humaine
│   └── skills/                  # 14 skills techniques
│       ├── init-dashboard.md
│       ├── load-dashboard-context.md
│       ├── dashboard-brief-analyzer.md
│       ├── dashboard-design-extraction.md
│       ├── dashboard-data-architect.md
│       ├── dashboard-wireframes.md
│       ├── dashboard-design-tokens.md
│       ├── dashboard-auth-patterns.md
│       ├── dashboard-layout-patterns.md
│       ├── dashboard-crud-patterns.md
│       ├── dashboard-kpi-patterns.md
│       ├── dashboard-n8n-hostinger.md
│       ├── dashboard-polish-patterns.md
│       └── dashboard-deploy-checklist.md
│
├── pipeline/
│   ├── input/                   # Donnees client
│   │   ├── brief-client.md
│   │   └── references/
│   ├── output/                  # Artifacts generes (vide au depart)
│   ├── stages/                  # 12 etapes (A01-A06 + B01-B06)
│   └── workflow/                # Documentation process
│
├── seed/                        # Systeme de seed data
│   ├── README.md
│   ├── seed-scenario.sql
│   ├── seed-auth-users.md
│   └── reset-seed.sql
│
└── n8n-workflows/               # Documentation workflows n8n
    └── README.md
```

## Agents

| Agent | Modele | Scope | Skills |
|-------|--------|-------|--------|
| `architecture-planner` | sonnet | Phase A complete (A01-A05 sequentiel) | brief-analyzer, design-extraction, data-architect, wireframes, design-tokens |
| `dashboard-ui-builder` | sonnet | Pages dashboard, composants CRUD, formulaires, tableaux, KPIs | auth-patterns, layout-patterns, crud-patterns, kpi-patterns, polish-patterns |
| `backend-layer` | sonnet/opus | Schema Supabase, RLS, migrations, types TS, seed data | data-architect, auth-patterns |
| `integration-builder` | sonnet/opus | n8n workflows, APIs externes, auth, middleware, webhooks | n8n-hostinger, auth-patterns, deploy-checklist |

## Differences avec le Template Site Vitrine

| Aspect | `website-workflow_template` | `dashboard-workflow_template` |
|--------|---------------------------|-------------------------------|
| Phase A04 | Sitemap | Data model + routes + auth + webhooks |
| Phase B | `/frontend-design` | Agents specialises |
| Backend | Aucun | Supabase (schema, RLS, auth) |
| Automations | Non | n8n workflows |
| Seed Data | Non | SQL avec dates relatives |
| Roles | Non | Multi-role (RBAC) |

## Stack

- **Frontend** : Next.js 15+ / React 19 / TypeScript / Tailwind CSS 4
- **UI** : shadcn/ui + Lucide React
- **Backend** : Supabase (PostgreSQL + Auth + Realtime + Storage)
- **Automations** : n8n (self-hosted)
- **Hosting** : Vercel
- **Forms** : react-hook-form + zod
- **Charts** : Recharts

## Regles

1. **Lire CLAUDE.md en premier** dans chaque projet
2. **Phase A = Markdown uniquement** — pas de code
3. **Artefacts immutables** — ne jamais modifier les outputs precedents
4. **Agents specialises** — utiliser le bon agent pour chaque tache
5. **Verification humaine** — build OK ≠ validation
6. **Seed data** — tester visuellement avec des donnees realistes
7. **RLS partout** — securite multi-tenant obligatoire

---

**Version** : 1.0
**Date** : 2026-02-23
