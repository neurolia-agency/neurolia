# Attribution des Modeles et Organisation en Batchs

## Principe

Chaque tache est attribuee au modele le moins couteux capable de la realiser correctement.

| Modele | Cout | Usage |
|--------|------|-------|
| **haiku** | $ | Pages statiques, templates, contenu placeholder, taches repetitives |
| **sonnet** | $$ | Composants UI, data layer, routes dynamiques, patterns existants |
| **opus** | $$$ | Architecture complexe, securite (auth, RLS), multi-systeme, debugging difficile |

## Agents et leurs Skills

| Agent | Modele par defaut | Skills associes |
|-------|-------------------|-----------------|
| `architecture-planner` | sonnet | `dashboard-brief-analyzer`, `dashboard-design-extraction`, `dashboard-data-architect`, `dashboard-wireframes`, `dashboard-design-tokens` |
| `dashboard-ui-builder` | sonnet | `dashboard-auth-patterns`, `dashboard-layout-patterns`, `dashboard-crud-patterns`, `dashboard-kpi-patterns`, `dashboard-polish-patterns`, `dashboard-email-templates`, `dashboard-email-design` |
| `backend-layer` | sonnet (opus pour auth/RLS) | `dashboard-data-architect`, `dashboard-auth-patterns` |
| `integration-builder` | sonnet (opus pour auth) | `dashboard-n8n-hostinger`, `dashboard-auth-patterns`, `dashboard-deploy-checklist`, `dashboard-email-n8n` |
| `n8n-workflow-builder` | sonnet (opus pour AI Agent) | Skills workspace : `n8n-workflow-patterns`, `n8n-node-configuration`, `n8n-code-javascript`, `n8n-expression-syntax`, `n8n-json-generator`, `n8n-validation-expert` + template : `dashboard-n8n-hostinger` |

## Attribution par Type de Tache

### haiku ($)
- Pages statiques (settings, profile, legal)
- Copier un pattern existant vers une nouvelle page
- Corriger du contenu (textes, labels)
- Ajouter des icones/badges
- Pages sans logique metier

### sonnet ($$)
- Phase A complete (via `architecture-planner`)
- Composants UI avec logique (tableaux CRUD, formulaires, filtres)
- Data layer (schema SQL, types TS, seeds)
- Dashboard views (KPIs, graphiques, calendrier)
- API routes et webhooks
- n8n workflow configuration

### opus ($$$)
- Auth strategy + middleware
- RLS policies complexes (multi-tenant, role-based)
- Integration multi-systeme (auth + n8n + Supabase)
- Debugging d'erreurs complexes
- A03-structure si multi-tenant complexe (via `architecture-planner`)

## Organisation en Batchs

### Phase A : Architecture (sequentiel, `architecture-planner`)

Execution sequentielle A01 → A05 par un seul agent.

| Etape | Skill | Modele | Output |
|-------|-------|--------|--------|
| A01 | `dashboard-brief-analyzer` | sonnet | `pipeline/output/01-brief/` |
| A02 | `dashboard-design-extraction` | sonnet | `pipeline/output/02-design-system/` |
| A03 | `dashboard-data-architect` | sonnet (opus si multi-tenant) | `pipeline/output/03-structure/` (incl. workflow-map) |
| A04 | `dashboard-wireframes` | sonnet | `pipeline/output/04-wireframes/` |
| A05 | `dashboard-design-tokens` | sonnet | `app/globals.css` |

**Dependances** : Brief client rempli. Chaque etape depend de la precedente.

### Batch A : Auth UI (parallele)
- Login page → sonnet (`dashboard-ui-builder`)
- Register page → sonnet (`dashboard-ui-builder`)
- Pages post-auth (magic link sent, etc.) → haiku (`dashboard-ui-builder`)

**Dependances** : B01 termine (layout + wireframes disponibles)

### Batch B : Pages role principal (parallele)
- Dashboard principal → sonnet (`dashboard-ui-builder`)
- Pages CRUD listes → sonnet (`dashboard-ui-builder`)
- Pages detail → sonnet (`dashboard-ui-builder`)

**Dependances** : Layout (B01) doit etre fait. Peut utiliser mock data.

### Batch C : Pages role secondaire (parallele)
- Vues specifiques au role → sonnet (`dashboard-ui-builder`)
- Pages taches/actions → sonnet (`dashboard-ui-builder`)

**Dependances** : Layout (B01) doit etre fait. Peut utiliser mock data.

### Batch D : Pages secondaires (parallele)
- Settings → haiku (`dashboard-ui-builder`)
- Profile → haiku (`dashboard-ui-builder`)
- Pages publiques → haiku (`dashboard-ui-builder`)

**Dependances** : Layout (B01)

### Batch E : Backend critique (SEQUENTIEL)
1. Auth + middleware + RLS → **opus** (`backend-layer`)
2. Schema complet + seed data → sonnet (`backend-layer`)
3. API webhooks → sonnet (`integration-builder`)

**Dependances** : Chaque etape depend de la precedente. L'auth DOIT etre faite en premier.

### Batch F : Integrations (apres Batch E)
- n8n workflows → sonnet (`integration-builder`)
- Emails transactionnels (design HTML) → sonnet (`dashboard-ui-builder` + `dashboard-email-design` + `dashboard-email-templates`)
- Emails transactionnels (wiring n8n) → sonnet (`integration-builder` + `dashboard-email-n8n`)
- Sync externe → sonnet/opus (`integration-builder`)

**Dependances** : Backend (Batch E) doit etre complet.

### Batch G : Generation JSON n8n (apres Batch F, `n8n-workflow-builder`)

| Tache | Agent | Modele | Skill(s) | Statut |
|-------|-------|--------|----------|--------|
| JSON WF00 (Error Handler) | `n8n-workflow-builder` | sonnet | `n8n-json-generator` + `dashboard-n8n-hostinger` | ⬜ |
| JSON main workflows | `n8n-workflow-builder` | sonnet | `n8n-json-generator` + `n8n-node-configuration` + `n8n-code-javascript` | ⬜ |
| JSON sub-workflows | `n8n-workflow-builder` | sonnet | `n8n-json-generator` + `n8n-node-configuration` | ⬜ |
| JSON workflows AI Agent | `n8n-workflow-builder` | opus | `n8n-json-generator` + `n8n-workflow-patterns` (AI Agent) | ⬜ |
| Validation globale | `n8n-workflow-builder` | sonnet | `n8n-validation-expert` | ⬜ |
| Setup maintenance | `n8n-workflow-builder` | sonnet | `n8n-maintenance` | ⬜ |

**Dependances** : Batch F (documentation B04 enrichie) doit etre complet. Les JSON sont generes dans l'ordre du graphe de dependances inter-workflows (WF00 en premier).

**Parallelisation** : Les workflows sans dependances entre eux peuvent etre generes en parallele. Les sub-workflows doivent etre generes avant les workflows qui les appellent.

### B05 : Polish (apres Batchs A-G)
- Responsive mobile → sonnet (`dashboard-ui-builder`)
- Loading states / skeletons → haiku (`dashboard-ui-builder`)
- PWA / notifications → sonnet (`integration-builder`)
- Micro-interactions + a11y → sonnet (`dashboard-ui-builder`)

**Dependances** : Batchs A-D (UI), E-F (backend), et G (JSON n8n) termines.

### B06 : Deploy (apres B05)
- Pre-deploy verification → sonnet (`integration-builder`)
- Deploiement Vercel + Supabase + n8n → sonnet (`integration-builder`)
- Documentation client → haiku (`integration-builder`)

**Dependances** : B05 termine. Tout le code teste et valide.

## Regles de Parallelisation

1. **Batchs A, B, C, D** peuvent tourner en parallele (UI avec mock data)
2. **Batch E** est sequentiel et critique — pas de raccourci
3. **Batch F** depend de Batch E
4. Quand le backend (E) est pret, connecter les pages UI aux vraies donnees
5. Les batchs UI avec mock data doivent avoir un TODO pour le branchement reel

## Checklist Post-Agent (OBLIGATOIRE)

Apres chaque execution d'agent, verifier :

### Checks automatiques
- [ ] `npm run build` sans erreurs
- [ ] Pas d'erreurs TypeScript
- [ ] Imports corrects
- [ ] Fichiers au bon emplacement

### Checks humains (build OK ≠ validation)
- [ ] Ouvrir la page dans le navigateur
- [ ] Verifier visuellement (desktop + mobile)
- [ ] Tester les interactions (clics, formulaires, navigation)
- [ ] Verifier les donnees affichees (seed ou mock)
- [ ] Verifier la securite (acces par role)
