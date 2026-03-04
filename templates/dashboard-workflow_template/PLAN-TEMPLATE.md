# PLAN — [NOM_PROJET]

> **Statut** : Phase A01 — Initialisation
> **Derniere MAJ** : [DATE]
> **Prochaine action** : [ACTION]

---

## Decisions

| Decision | Valeur | Justification |
|----------|--------|---------------|
| Stack frontend | Next.js 15+ / Tailwind CSS 4 | [Raison] |
| BaaS | Supabase | [Raison] |
| Auth method | [Magic Link / OAuth / Email+Password] | [Raison] |
| Automations | n8n (Hostinger) | [Raison] |
| Hosting frontend | Vercel | [Raison] |
| Hosting n8n | Hostinger | [Raison] |
| Mobile | [PWA / Capacitor / Responsive only] | [Raison] |

---

## Inventaire Pages

### [ROLE_1] (ex: Owner / Admin)

| Page | Route | Wireframe | Batch | Skill | Statut |
|------|-------|-----------|-------|-------|--------|
| Dashboard | `/dashboard` | `04-wireframes/dashboard.md` | B | `dashboard-kpi-patterns` | ⬜ |
| [Page 2] | `/[route]` | `04-wireframes/[page].md` | [X] | `dashboard-crud-patterns` | ⬜ |
| [Page 3] | `/[route]` | `04-wireframes/[page].md` | [X] | `dashboard-crud-patterns` | ⬜ |

### [ROLE_2] (ex: Staff / User)

| Page | Route | Wireframe | Batch | Skill | Statut |
|------|-------|-----------|-------|-------|--------|
| [Page 1] | `/[route]` | `04-wireframes/[page].md` | [X] | `dashboard-crud-patterns` | ⬜ |
| [Page 2] | `/[route]` | `04-wireframes/[page].md` | [X] | `dashboard-crud-patterns` | ⬜ |

### Commun

| Page | Route | Wireframe | Batch | Skill | Statut |
|------|-------|-----------|-------|-------|--------|
| Login | `/login` | `04-wireframes/login.md` | A | `dashboard-auth-patterns` | ⬜ |
| Register | `/register` | `04-wireframes/register.md` | A | `dashboard-auth-patterns` | ⬜ |
| Settings | `/settings` | `04-wireframes/settings.md` | D | `dashboard-crud-patterns` | ⬜ |

---

## Phase A : Architecture

### A01 — Init (Skill: `dashboard-brief-analyzer`)
- [ ] Brief client analyse
- [ ] PRD redige (features, personas, KPIs)
- [ ] Entites principales identifiees
- [ ] Integrations n8n listees

### A02 — Design Extraction (Skill: `dashboard-design-extraction`)
- [ ] Palette couleurs extraite (OKLCH)
- [ ] Typographie extraite (2-3 familles max)
- [ ] Composants UI inventories
- [ ] Contraintes definies (ON FAIT / ON NE FAIT PAS)

### A03 — Structure (Skill: `dashboard-data-architect`)
- [ ] Data model complet (tables, relations, enums)
- [ ] Auth strategy (roles, permissions, RLS)
- [ ] Routes par role
- [ ] Workflow map complet :
  - [ ] Triage de TOUTES les features (verdict + justification)
  - [ ] Decomposition en workflows atomiques (5 questions)
  - [ ] Spec par workflow (trigger, donnees, logique, sortie, erreurs)
  - [ ] Graphe de dependances inter-workflows
- [ ] Webhook map + config Hostinger (derive du workflow-map)
- [ ] Integrations externes documentees (specs techniques)

### A04 — Wireframes (Skill: `dashboard-wireframes`)
- [ ] Wireframes par page et par role
- [ ] Navigation map
- [ ] Etats UI documentes (loading, empty, error)

### A05 — Design Tokens (Skill: `dashboard-design-tokens`)
- [ ] globals.css avec tokens OKLCH
- [ ] Tailwind @theme inline
- [ ] Dark mode (si applicable)

---

## Phase B : Developpement

### B01 — Setup (Skills: `dashboard-auth-patterns`, `dashboard-layout-patterns`)
- [ ] Supabase init (schema + migrations)
- [ ] Auth configure (provider + middleware)
- [ ] Layout + sidebar/navigation
- [ ] Types TS generes

### B02 — Core (Skill: `dashboard-crud-patterns`)
- [ ] Pages CRUD principales
- [ ] Formulaires avec validation
- [ ] Listes avec filtres/recherche/pagination
- [ ] Detail pages

### B03 — Dashboard (Skill: `dashboard-kpi-patterns`)
- [ ] Vue principale avec KPIs
- [ ] Calendrier / timeline (si applicable)
- [ ] Alertes / notifications in-app
- [ ] Vues par role

### B04 — Automations (Skill: `dashboard-n8n-hostinger`)
- [ ] Cross-check PRD → workflow-map (aucune feature n8n oubliee)
- [ ] n8n workflows documentes avec format enrichi (tableau nodes, types n8n, expressions)
- [ ] Sub-workflows identifies et documentes (SW01, SW02...)
- [ ] API routes webhooks (depuis webhook-map)
- [ ] Emails transactionnels (design HTML + wiring n8n)
- [ ] Sync externe (depuis integrations.md)

### Batch G — JSON n8n (Agent: `n8n-workflow-builder`)
- [ ] JSON WF00 (Error Handler) genere et valide
- [ ] JSON main workflows generes (dans l'ordre du graphe de dependances)
- [ ] JSON sub-workflows generes
- [ ] JSON workflows AI Agent generes (si applicable)
- [ ] Validation globale : tous les JSON parseables, nodes complets, connexions correctes
- [ ] Rapport de validation (`n8n-workflows/validation-report.md`)
- [ ] Patch-notes initialises (`n8n-workflows/PATCH-NOTES.md`)

### B05 — Polish (Skill: `dashboard-polish-patterns`)
- [ ] Responsive mobile
- [ ] Loading states / skeletons
- [ ] Notifications push (si PWA)
- [ ] Micro-interactions
- [ ] Error boundaries

### B06 — Deploy (Skill: `dashboard-deploy-checklist`)
- [ ] Vercel production
- [ ] Supabase production
- [ ] n8n production (Hostinger)
- [ ] Monitoring (Sentry)
- [ ] Documentation client

---

## Batchs de Developpement

> Voir `.claude/rules/agent-models.md` pour l'attribution des modeles.

### Batch A : Auth UI (parallele, sonnet/haiku)
| Page | Agent | Modele | Skill | Statut |
|------|-------|--------|-------|--------|
| Login | `dashboard-ui-builder` | sonnet | `dashboard-auth-patterns` | ⬜ |
| Register | `dashboard-ui-builder` | sonnet | `dashboard-auth-patterns` | ⬜ |
| Post-auth pages | `dashboard-ui-builder` | haiku | `dashboard-auth-patterns` | ⬜ |

### Batch B : Pages [ROLE_1] (parallele, sonnet)
| Page | Agent | Modele | Skill | Statut |
|------|-------|--------|-------|--------|
| Dashboard | `dashboard-ui-builder` | sonnet | `dashboard-kpi-patterns` | ⬜ |
| [Page 2] | `dashboard-ui-builder` | sonnet | `dashboard-crud-patterns` | ⬜ |
| [Page 3] | `dashboard-ui-builder` | sonnet | `dashboard-crud-patterns` | ⬜ |

### Batch C : Pages [ROLE_2] (parallele, sonnet)
| Page | Agent | Modele | Skill | Statut |
|------|-------|--------|-------|--------|
| [Page 1] | `dashboard-ui-builder` | sonnet | `dashboard-crud-patterns` | ⬜ |
| [Page 2] | `dashboard-ui-builder` | sonnet | `dashboard-crud-patterns` | ⬜ |

### Batch D : Pages secondaires (parallele, haiku/sonnet)
| Page | Agent | Modele | Skill | Statut |
|------|-------|--------|-------|--------|
| Settings | `dashboard-ui-builder` | haiku | `dashboard-crud-patterns` | ⬜ |
| Profile | `dashboard-ui-builder` | haiku | `dashboard-crud-patterns` | ⬜ |

### Batch E : Backend critique (sequentiel, opus)
| Etape | Agent | Modele | Skill | Statut |
|-------|-------|--------|-------|--------|
| 1. Auth + middleware + RLS | `backend-layer` | opus | `dashboard-auth-patterns` | ⬜ |
| 2. Seed data | `backend-layer` | sonnet | `dashboard-data-architect` | ⬜ |
| 3. API webhooks | `integration-builder` | sonnet | `dashboard-n8n-hostinger` | ⬜ |

### Batch F : Integrations (apres Batch E, sonnet)
| Tache | Agent | Modele | Skill | Statut |
|-------|-------|--------|-------|--------|
| n8n workflows (docs enrichies) | `integration-builder` | sonnet | `dashboard-n8n-hostinger` | ⬜ |
| Sub-workflows (docs enrichies) | `integration-builder` | sonnet | `dashboard-n8n-hostinger` | ⬜ |
| Emails transactionnels (design HTML) | `dashboard-ui-builder` | sonnet | `dashboard-email-design` + `dashboard-email-templates` | ⬜ |
| Emails transactionnels (wiring n8n) | `integration-builder` | sonnet | `dashboard-email-n8n` | ⬜ |
| Sync externe | `integration-builder` | sonnet/opus | `dashboard-n8n-hostinger` | ⬜ |

### Batch G : JSON n8n (apres Batch F, sonnet/opus)
| Tache | Agent | Modele | Skill(s) | Statut |
|-------|-------|--------|----------|--------|
| JSON WF00 | `n8n-workflow-builder` | sonnet | `n8n-json-generator` + `dashboard-n8n-hostinger` | ⬜ |
| JSON main workflows | `n8n-workflow-builder` | sonnet | `n8n-json-generator` + `n8n-node-configuration` | ⬜ |
| JSON sub-workflows | `n8n-workflow-builder` | sonnet | `n8n-json-generator` | ⬜ |
| JSON workflows AI Agent | `n8n-workflow-builder` | opus | `n8n-json-generator` + `n8n-workflow-patterns` | ⬜ |
| Validation globale | `n8n-workflow-builder` | sonnet | `n8n-validation-expert` | ⬜ |
| Setup maintenance | `n8n-workflow-builder` | sonnet | `n8n-maintenance` | ⬜ |

---

## Infrastructure

| Service | Hebergement | URL | Statut |
|---------|-------------|-----|--------|
| Frontend | Vercel | [A configurer] | ⬜ |
| Backend | Supabase | [A configurer] | ⬜ |
| Automations | n8n (Hostinger) | [A configurer] | ⬜ |

---

## Verification Humaine

> La checklist est generee automatiquement par la rule `.claude/rules/post-agent-checklist.md` apres chaque modification de code (`src/*`, `components/*`, `app/*`). Pas besoin de la copier manuellement.

---

## Journal

| Date | Session | Travail effectue |
|------|---------|-----------------|
| [DATE] | 1 | [Description] |

---

## Etat Actuel

### Fait
- (rien encore)

### Reste a faire
- Phase A complete (A01-A05)
- Phase B complete (B01-B06)

### Bloqueurs
- (aucun)
