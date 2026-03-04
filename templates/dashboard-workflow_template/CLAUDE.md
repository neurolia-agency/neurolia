# [NOM_PROJET] - Dashboard

Dashboard de gestion pour [CLIENT], [DESCRIPTION_COURTE].

## Premiere action de chaque session

Invoquer `/load-dashboard-context` AVANT toute autre action. Ce skill charge le contexte projet, identifie la prochaine etape a executer, et recommande l'agent et le modele a utiliser.

## Statut Pipeline

### Phase A : Architecture (Markdown uniquement)

| Etape | Stage | Status | Output |
|-------|-------|--------|--------|
| A01 | Init | ⬜ | `pipeline/output/01-brief/` |
| A02 | Design Extraction | ⬜ | `pipeline/output/02-design-system/` |
| A03 | Structure | ⬜ | `pipeline/output/03-structure/` |
| A04 | Wireframes | ⬜ | `pipeline/output/04-wireframes/` |
| A05 | Design Tokens | ⬜ | `app/globals.css` |

### Phase B : Developpement

| Etape | Stage | Status | Output |
|-------|-------|--------|--------|
| B01 | Setup | ⬜ | Supabase + Auth + Layout |
| B02 | Core | ⬜ | CRUD principal |
| B03 | Dashboard | ⬜ | Vues dashboard + KPIs |
| B04 | Automations | ⬜ | n8n workflows |
| B05 | Polish | ⬜ | Mobile + notifications + PWA |
| B06 | Deploy | ⬜ | Production |

## Commandes

```bash
# Phase A - Executer avec APEX
/apex -a -s executer A01-init depuis pipeline/stages/A01-init.md
/apex -a -s executer A02-design-extraction depuis pipeline/stages/A02-design-extraction.md
/apex -a -s executer A03-structure depuis pipeline/stages/A03-structure.md
/apex -a -s executer A04-wireframes depuis pipeline/stages/A04-wireframes.md
/apex -a -s executer A05-design-tokens depuis pipeline/stages/A05-design-tokens.md

# Phase B - Developpement avec agents
# Voir PLAN.md pour l'attribution des batchs et modeles

# Serveur dev
npm run dev

# Seed data
npm run db:seed        # ou executer seed/seed-scenario.sql manuellement
npm run db:reset       # nettoyage + re-seed
```

## Skills Disponibles

| Skill | Phase | Usage |
|-------|-------|-------|
| `init-dashboard` | Pre-pipeline | Bootstrapper un projet depuis le template |
| `load-dashboard-context` | Transversal | Charger contexte + identifier prochaine etape |
| `dashboard-brief-analyzer` | A01 | Transformer brief en PRD dashboard |
| `dashboard-design-extraction` | A02 | Extraire elements d'un design system existant |
| `dashboard-data-architect` | A03 | Data model + auth + routes + webhooks |
| `dashboard-wireframes` | A04 | Patterns wireframe dashboard + templates |
| `dashboard-design-tokens` | A05 | Template globals.css + tokens OKLCH |
| `dashboard-auth-patterns` | B01 | Snippets Supabase auth + middleware + layouts |
| `dashboard-layout-patterns` | B01 | Snippets sidebar + header + mobile nav |
| `dashboard-crud-patterns` | B02 | Snippets CRUD complets (7 patterns) |
| `dashboard-kpi-patterns` | B03 | Snippets KPIs + charts + alertes + calendrier |
| `dashboard-n8n-hostinger` | B04 | Config Hostinger + patterns webhook + test |
| `dashboard-email-templates` | B04 | Templates HTML email + composants + mapping tokens |
| `dashboard-email-design` | B04 | Methodologie contenu email + brief + processus design-first |
| `dashboard-email-n8n` | B04 | Config emailSend n8n + emails auth Supabase |
| `dashboard-polish-patterns` | B05 | Responsive + PWA + micro-interactions + a11y |
| `dashboard-deploy-checklist` | B06 | Checklist pre-deploy + template doc client |

## Workflow d'Execution

```
1. /init-dashboard          → Copier template, configurer le projet
2. /load-dashboard-context  → Identifier la prochaine etape
3. Executer le stage        → /apex (Phase A) ou agents (Phase B)
4. Mettre a jour PLAN.md    → Cocher items, journal, etat actuel
5. Repeter 2-4              → Jusqu'a B06-deploy
```

## Sources de Verite

| Domaine | Source unique |
|---------|---------------|
| Statut pipeline | Ce fichier (CLAUDE.md) |
| Plan projet | `PLAN.md` |
| Donnees client | `pipeline/input/` |
| Design system | `pipeline/output/02-design-system/` |
| Data model | `pipeline/output/03-structure/data-model.md` |
| Auth strategy | `pipeline/output/03-structure/auth-strategy.md` |
| Routes & roles | `pipeline/output/03-structure/routes.md` |
| Workflow map | `pipeline/output/03-structure/workflow-map.md` |
| Webhooks | `pipeline/output/03-structure/webhook-map.md` |
| Integrations | `pipeline/output/03-structure/integrations.md` |
| Wireframes | `pipeline/output/04-wireframes/` |
| Tokens CSS | `app/globals.css` |
| Stack technique | `pipeline/workflow/DESIGN_STACK.md` |
| Dependances | `pipeline/workflow/DEPENDENCIES.md` |
| Seed data | `seed/` |
| n8n workflows (docs) | `n8n-workflows/*.md` |
| n8n workflows (JSON) | `n8n-workflows/*.json` |

## Contexte Projet

| Cle | Valeur |
|-----|--------|
| Client | [NOM_CLIENT] |
| Type | Dashboard / Application web |
| Description | [DESCRIPTION] |
| KPI Principal | [KPI] |
| Stack | Next.js 15+ / Tailwind CSS 4 / Supabase / n8n |
| n8n Hosting | Hostinger |

## Roles Utilisateurs

| Role | Description | Acces |
|------|-------------|-------|
| [ROLE_1] | [Description] | [Pages/fonctionnalites] |
| [ROLE_2] | [Description] | [Pages/fonctionnalites] |
| [ROLE_3] | [Description] | [Pages/fonctionnalites] |

## ADN Visuel (a completer en A02)

| Aspect | Valeur |
|--------|--------|
| Couleur signature | [A definir] |
| Style UI | [A definir] |
| Densite info | [A definir] |
| Radius | [A definir] |
| Typographies | [A definir] |

### Test Rapide "Est-ce [NOM_PROJET] ?"

- [ ] [Critere 1] ?
- [ ] [Critere 2] ?
- [ ] [Critere 3] ?
- [ ] [Critere 4] ?
- [ ] [Critere 5] ?

> 5/5 = Conforme | < 4/5 = Revoir

## Flux de Contexte

### Phase A : Architecture

```
A01 : pipeline/input/brief-client.md → pipeline/output/01-brief/
A02 : 01-brief/ + design system source → pipeline/output/02-design-system/
A03 : 01-brief/ + 02-design-system/ → pipeline/output/03-structure/ (data model, routes, auth, RLS)
A04 : 02-design-system/ + 03-structure/ → pipeline/output/04-wireframes/
A05 : 02-design-system/ + 04-wireframes/ → app/globals.css
```

### Phase B : Developpement

```
B01 : 03-structure/ → Supabase schema + Auth + Layout
B02 : 03-structure/ + 04-wireframes/ → Pages CRUD principales
B03 : 04-wireframes/ + seed data → Vues dashboard + KPIs
B04 : 03-structure/ (workflow-map + webhook-map + integrations) + 01-brief/features.md (cross-check) → n8n docs enrichies + API routes (Hostinger)
Batch G : n8n-workflows/*.md (docs enrichies) → n8n-workflows/*.json (importables) + validation
B05 : Toutes les pages → Responsive + notifications + PWA
B06 : Tout → Production
```

**Regle** : Utiliser les agents specialises (`.claude/agents/`) avec attribution de modeles (`.claude/rules/agent-models.md`).

## Structure

```
[nom-projet]/
├── CLAUDE.md                    # Statut pipeline (CE FICHIER)
├── PLAN.md                      # Plan projet (copie de PLAN-TEMPLATE.md)
│
├── .claude/
│   ├── agents/                  # Agents specialises
│   │   ├── architecture-planner.md
│   │   ├── dashboard-ui-builder.md
│   │   ├── backend-layer.md
│   │   ├── integration-builder.md
│   │   └── n8n-workflow-builder.md
│   ├── rules/                   # Regles contextuelles
│   │   ├── agent-models.md
│   │   ├── data-model.md
│   │   ├── api-patterns.md
│   │   ├── plan-update.md
│   │   └── post-agent-checklist.md
│   └── skills/                  # Skills techniques (17 skills template + 7 skills workspace n8n)
│
├── pipeline/                    # WORKFLOW
│   ├── input/                   # Donnees client
│   │   ├── brief-client.md
│   │   └── references/
│   ├── output/                  # Artifacts generes
│   │   ├── 01-brief/
│   │   ├── 02-design-system/
│   │   ├── 03-structure/        # data-model, routes, auth, RLS, webhooks
│   │   └── 04-wireframes/
│   ├── stages/                  # Instructions par etape
│   │   ├── A01-init.md ... A05-design-tokens.md
│   │   └── B01-setup.md ... B06-deploy.md
│   └── workflow/
│       ├── DEPENDENCIES.md
│       ├── DESIGN_STACK.md
│       └── README.md
│
├── seed/                        # Donnees de test
│   ├── README.md
│   ├── seed-scenario.sql
│   ├── seed-auth-users.md
│   └── reset-seed.sql
│
├── n8n-workflows/               # Automations (Hostinger)
│   └── README.md
│
├── src/                         # CODE NEXT.JS
│   ├── app/
│   │   ├── globals.css          # Tokens CSS (source unique)
│   │   ├── (auth)/              # Routes publiques (login, register)
│   │   ├── ([ROLE_1])/          # Routes role 1
│   │   └── ([ROLE_2])/          # Routes role 2
│   ├── components/
│   │   ├── layout/
│   │   └── ui/
│   ├── lib/
│   │   └── supabase/
│   └── types/
│
└── [config files]
```

## Contraintes

- **Performance** : Lighthouse > 90
- **Responsive** : Desktop-first (dashboard), mobile adaptif
- **Accessibilite** : WCAG AA
- **Securite** : RLS sur toutes les tables, auth obligatoire, RBAC
- **Ton** : [Vouvoiement/Tutoiement]

## Agents Disponibles

| Agent | Modele | Scope |
|-------|--------|-------|
| `architecture-planner` | sonnet | Execution Phase A (A01-A05 sequentiellement) |
| `dashboard-ui-builder` | sonnet | Pages dashboard, composants CRUD, formulaires, tableaux, KPIs |
| `backend-layer` | sonnet (opus pour auth/RLS) | Schema Supabase, RLS, migrations, types TS, seed data |
| `integration-builder` | sonnet (opus pour auth) | n8n workflows docs, APIs externes, auth, middleware, webhooks |
| `n8n-workflow-builder` | sonnet (opus pour AI Agent) | Generation JSON n8n importables, validation, maintenance |

## Infrastructure

| Service | Hebergement | Notes |
|---------|-------------|-------|
| Frontend | Vercel | Deploy auto depuis Git |
| Backend | Supabase (cloud) | PostgreSQL + Auth + Realtime |
| Automations | n8n (Hostinger) | Webhooks, emails, sync |

---

*Derniere mise a jour : [DATE]*
