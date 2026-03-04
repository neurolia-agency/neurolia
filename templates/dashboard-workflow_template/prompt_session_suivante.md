# Prompt pour la prochaine session d'optimisation

## Contexte

Je suis en train d'optimiser le template `templates/dashboard-workflow_template/`. Ce template genere des projets dashboard (Next.js + Supabase + n8n) via un pipeline en 2 phases : Phase A (architecture markdown) et Phase B (developpement code).

### Fichiers de reference a lire EN PREMIER

1. `templates/dashboard-workflow_template/CHANGELOG.md` — historique complet (v1.0.0 → v2.7.0)
2. `templates/dashboard-workflow_template/CLAUDE.md` — structure du template, skills, agents, sources de verite
3. `templates/dashboard-workflow_template/.claude/rules/agent-models.md` — attribution modeles et batchs
4. `templates/dashboard-workflow_template/pipeline/workflow/DEPENDENCIES.md` — graphe de dependances

### Architecture du template

```
4 agents   : architecture-planner, dashboard-ui-builder, backend-layer, integration-builder
17 skills  : 5 Phase A + 10 Phase B + 2 transversaux
5 rules    : agent-models, data-model, api-patterns, post-agent-checklist, placeholder-verification, plan-update, pipeline-optimization
12 stages  : A01-A05 (architecture) + B01-B06 (developpement)
```

---

## Ce qui a ete fait (v1.0.0 → v2.7.0)

### v1.0.0 — Template initial
- 3 agents, 3 rules, 12 stages, seed data, conventions n8n

### v2.0.0 — Structure multi-agent
- Phase A reduite a 5 stages (A01-A05), 4 agents, 14 skills, 5 rules
- PLAN-TEMPLATE.md avec batchs paralleles

### v2.1.0 — Compatibilite n8n v2.8.3
- Skill `dashboard-email-templates` cree (15e skill)
- Skills workspace n8n mis a jour pour v2.8.3

### v2.2.0 — Corrections audit qualite (14 items)
- Paths corriges, dependances corrigees, agents/skills declares dans les stages

### v2.3.0 — Refonte methodologie email
- Methodologie design-first (Brief obligatoire avant HTML, gate humaine sur contenu)

### v2.4.0 — Decoupe skill email en 3 skills specialises
- `dashboard-email-templates` (HTML structure), `dashboard-email-design` (methodologie contenu), `dashboard-email-n8n` (wiring n8n)

### v2.5.0 — Verification placeholders
- Rule `placeholder-verification.md` : scan grep apres chaque etape pipeline

### v2.6.0 — Conventions n8n enrichies
- Sticky notes obligatoires (2-4 par workflow), tout en francais, stack n8n documentee

### v2.7.0 — Workflow Map (tracabilite features → workflows n8n)

**Probleme resolu** : Les features du PRD pouvaient etre silencieusement ignorees entre A01 et B04. Le webhook-map ne capturait que les flux avec un endpoint HTTP (n8n→App), ignorant les workflows autonomes (schedules, polling iCal, check IMAP, emails quotidiens). Le fichier `integrations.md` etait optionnel ("si applicable").

**Solution** : Nouveau document `workflow-map.md` en sortie de A03, source de verite pour B04.

**Modifications (10 fichiers)** :

| Fichier | Modification |
|---------|-------------|
| `A03-structure.md` | Section 4 derivee du workflow-map, Section 5 obligatoire, **Section 6 Workflow Map** (triage + 5 questions decomposition + specs + graphe dependances) |
| `B04-automations.md` | Inputs (workflow-map principal + features.md cross-check), Section 1 "Verification et Inventaire" avec cross-check PRD obligatoire |
| `integration-builder.md` | workflow-map.md en position 2 des lectures obligatoires (source de verite), features.md ajoute |
| `DEPENDENCIES.md` | B04 depend de workflow-map + webhook-map + integrations |
| `placeholder-verification.md` | Scan post-A03 pour placeholders workflow-map |
| `CLAUDE.md` | Workflow map + Integrations dans Sources de Verite, flux B04 mis a jour |
| `PLAN-TEMPLATE.md` | A03 checklist enrichie (4 sous-items workflow-map), B04 avec cross-check |
| `agent-models.md` | Output A03 mentionne workflow-map |
| `dashboard-data-architect.md` | Template workflow-map.md ajoute, checklist enrichie |
| `CHANGELOG.md` | Entree v2.7.0 |

**Pipeline workflow corrige** :

```
A01 features.md ──→ A03 §6 Workflow Map (source de verite) ──→ B04 §1.1 Cross-check PRD
                         │                                              │
                         ├──→ webhook-map.md (derive : endpoints HTTP)  ├──→ §2 API Routes
                         ├──→ integrations.md (obligatoire)             ├──→ §3 Doc n8n
                         └──→ graphe dependances inter-workflows        ├──→ §4 Emails
                                                                        └──→ §5 Sync
```

**Audit skills** : zero conflit identifie entre les 4 skills de l'integration-builder et les 7 skills de l'ui-builder.

---

## Axes d'optimisation restants

### A. Cross-cutting rules manquantes
- R3 `pipeline-immutability` : empecher la modification des outputs pipeline precedents (un output de A01 ne doit pas etre modifie en A03)
- R4 `security-checks` : consolider tous les checks securite en une rule dediee (RLS, secrets, CORS, XSS)
- R5 `type-sync` : forcer la coherence types TypeScript ↔ schema SQL Supabase

### B. Infrastructure Hostinger
- Documentation specifique n8n Hostinger (RAM/CPU KVM2, limitations, monitoring)
- Integration Hostinger ↔ Vercel ↔ Supabase (latence, retry, CORS cross-origin)
- Procedure de deploiement n8n sur Hostinger (Docker vs PM2, migration, backup)

### C. Agents potentiels
- A5 `qa-validator` : validation automatique post-batch (haiku, pas d'edits — readonly)
- A6 `deploy-assistant` : orchestration pre-deploy (sonnet)
- ~~A7 `n8n-workflow-builder` : generation JSON n8n importable directement depuis les specs du workflow-map (sonnet)~~ **→ FAIT (v2.8.0)**

### D. Completude du pipeline
- **A01 → A03 gap residuel** : la table "Integrations Externes" de A01 (§2.6) n'a pas de format contraignant pour la Direction et la Frequence — ce sont des textes libres qui pourraient etre mal remplis et rendre la decomposition en A03 §6 plus difficile
- **B04 → B06 gap** : comment s'assurer que TOUS les secrets .env sont effectivement configures en production ?
- ~~**B04 documentation vs implementation** : le template documente les workflows en markdown mais ne genere pas de JSON n8n importable — l'implementation reste manuelle dans l'interface n8n~~ **→ FAIT (v2.8.0) : Batch G genere les JSON importables**
- ~~**Workflows complexes (AI Agent)** : les workflows avec des noeuds AI Agent (OpenAI, Claude) n'ont pas de patterns documentes dans les skills du template~~ **→ FAIT (v2.8.0) : section AI Agent dans A03 §6.3 + reference vers n8n-workflow-patterns/ai_agent_workflow.md**
- ~~**Sub-workflows n8n** : la convention de nommage et documentation des sub-workflows (appeles par d'autres WF) n'est pas formalisee~~ **→ FAIT (v2.8.0) : conventions SW dans n8n-workflows/README.md**

### E. Test reel
- Appliquer le template complet sur `clients/dashboard-loc-immo/` pour valider en conditions reelles
- Mesurer : temps de completion par stage, qualite des outputs, interventions humaines necessaires

---

## Consigne pour cette session

L'objectif est de continuer l'optimisation du template. Deux modes possibles :

### Mode 1 : Brainstorm (continuer a explorer)
Travailler par Q&A :
1. **Tu me poses des questions** sur le fonctionnement actuel, les cas d'usage, les frictions
2. **Je reponds**, tu identifies ce qui peut etre ameliore
3. **On itere** sur chaque point



### Mode 2 : Implementation (traiter un axe precis)
Choisir un axe parmi A-E et l'implementer directement :
- `/apex` pour les modifications structurelles
- Edits directs pour les ajustements

**Mode recommande** : Mode 1 d'abord sur les axes D (completude pipeline) et C (agents potentiels), puis Mode 2 pour implementer.
