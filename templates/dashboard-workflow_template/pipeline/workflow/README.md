# Workflow Dashboard — Guide

## Concept

Workflow en **2 phases** pour creer un dashboard/application web :

| Phase | Description | Outil | Output |
|-------|-------------|-------|--------|
| **A** | Architecture | `/apex` | Markdown uniquement |
| **B** | Developpement | Agents specialises | Code Next.js + Supabase |

## Phase A : Architecture

Execution sequentielle, chaque etape produit des artefacts Markdown qui alimentent la suivante.

| Etape | Stage | Output | Skill | Description |
|-------|-------|--------|-------|-------------|
| A01 | Init | `01-brief/` | `dashboard-brief-analyzer` | PRD, features, personas, entites |
| A02 | Design Extraction | `02-design-system/` | `dashboard-design-extraction` | Palette, typo, composants, contraintes |
| A03 | Structure | `03-structure/` | `dashboard-data-architect` | Data model, auth, routes, webhooks |
| A04 | Wireframes | `04-wireframes/` | `dashboard-wireframes` | Wireframes par page et role |
| A05 | Design Tokens | `globals.css` | `dashboard-design-tokens` | Tokens CSS (source unique) |

**Commande** :
```bash
/apex -a -s executer [AXX]-[nom] depuis pipeline/stages/[AXX]-[nom].md
```

## Phase B : Developpement

Execution en batchs paralleles avec agents specialises.

| Etape | Stage | Agent | Skill principal | Description |
|-------|-------|-------|-----------------|-------------|
| B01 | Setup | backend-layer + dashboard-ui-builder | `dashboard-auth-patterns` | Supabase + Auth + Layout |
| B02 | Core | dashboard-ui-builder + backend-layer | `dashboard-crud-patterns` | Pages CRUD principales |
| B03 | Dashboard | dashboard-ui-builder | `dashboard-kpi-patterns` | Vues KPIs, calendrier, alertes |
| B04 | Automations | integration-builder | `dashboard-n8n-hostinger` | n8n workflows, webhooks, emails |
| B05 | Polish | dashboard-ui-builder | `dashboard-polish-patterns` | Responsive, notifications, PWA |
| B06 | Deploy | - | `dashboard-deploy-checklist` | Production |

## Agents

| Agent | Modele | Skills precharges | Scope |
|-------|--------|-------------------|-------|
| `architecture-planner` | sonnet | brief-analyzer, design-extraction, data-architect, wireframes, design-tokens | Execution Phase A (A01-A05) |
| `dashboard-ui-builder` | sonnet | crud-patterns, kpi-patterns, layout-patterns, polish-patterns | Pages UI, composants, formulaires, tableaux |
| `backend-layer` | sonnet/opus | auth-patterns, data-architect, crud-patterns | Schema, RLS, types, seed data |
| `integration-builder` | sonnet/opus | n8n-hostinger, auth-patterns | n8n, webhooks, auth, emails |

## Regles

1. **Phase A = Markdown uniquement** — pas de code
2. **Artefacts immutables** — ne jamais modifier les outputs des etapes precedentes
3. **Agents specialises** — utiliser le bon agent pour chaque tache
4. **Attribution modeles** — voir `.claude/rules/agent-models.md`
5. **Verification humaine** — build OK ≠ validation (voir checklist dans PLAN.md)
6. **Seed data** — tester visuellement avec des donnees realistes
7. **Securite** — RLS sur chaque table, auth obligatoire, secrets dans .env
8. **MAJ PLAN.md** — obligatoire apres chaque etape (voir `.claude/rules/plan-update.md`)

## Differences avec le Template Site Vitrine

| Aspect | Site Vitrine | Dashboard |
|--------|-------------|-----------|
| Phase A | 6 etapes (brand + art direction) | 5 etapes (design extraction) |
| Phase A04 | Sitemap | Data model + routes + auth + webhooks |
| Phase B | `/frontend-design` | Agents specialises (UI, backend, integrations) |
| Backend | Pas de backend | Supabase (schema, RLS, auth) |
| Automations | Non | n8n workflows (Hostinger) |
| Seed Data | Non | SQL avec dates relatives |
| Roles | Non | Multi-role (RBAC) |
| Realtime | Non | Supabase Realtime (optionnel) |
| Skills | /frontend-design | 14 skills techniques avec snippets |
