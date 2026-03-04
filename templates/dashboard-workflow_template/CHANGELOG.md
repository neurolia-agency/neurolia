# Changelog — Dashboard Workflow Template

## [2.8.0] — 2026-02-23

### Ajout — Agent `n8n-workflow-builder` + Batch G : generation JSON n8n importables

**Probleme resolu** : Le template documentait les workflows n8n en markdown (B04) mais ne generait pas de JSON importable. L'implementation restait 100% manuelle dans l'interface n8n, avec risque d'erreurs et perte de tracabilite.

**Solution** : Nouvel agent A7 `n8n-workflow-builder` qui genere des fichiers JSON importables via "Import from File" a partir des docs enrichies de B04. Batch G ajoute apres Batch F dans le pipeline.

#### Nouvel agent (1 fichier)
- `.claude/agents/n8n-workflow-builder.md` : agent sonnet (opus pour AI Agent), utilise 7 skills workspace (`n8n-workflow-patterns`, `n8n-node-configuration`, `n8n-code-javascript`, `n8n-expression-syntax`, `n8n-json-generator`, `n8n-validation-expert`, `n8n-maintenance`) + 1 skill template (`dashboard-n8n-hostinger`)

#### A03-structure.md — Section "Architecture n8n" ajoutee a §6.3
- Chaque spec workflow inclut maintenant un **tableau de nodes estimes** (type n8n, role, notes)
- Reference vers le **pattern architectural** correspondant (skill workspace `n8n-workflow-patterns`)
- **Section AI Agent** conditionnelle : modele LLM, type d'agent, memory, tools avec connexions `ai_tool`, securite AI (read-only, sanitize, rate limiting)

#### B04-automations.md — Format documentation enrichi (§3)
- Ancien format : liste textuelle de nodes
- Nouveau format : **tableau structure** avec colonnes Nom (francais), Type n8n, Operation, Parametres cles, Expressions
- Sections ajoutees : Code nodes (JS documente), Connexions (diagramme ASCII), Sticky Notes (tableau), Pattern
- Ce format enrichi sert d'input direct pour le Batch G

#### n8n-workflows/README.md — Sub-workflows + JSON
- **Sub-workflow conventions** : prefixe SW, numeration independante, criteres de creation, structure
- **Fichiers JSON** : convention de nommage, generes par Batch G, jamais modifies manuellement
- **Credentials** : nommage coherent CRED-XX

#### Mises a jour en cascade (6 fichiers)
- `dashboard-data-architect.md` : template workflow-map enrichi avec "Architecture n8n"
- `agent-models.md` : agent A7 ajoute, Batch G detaille (6 taches), B05 depend de A-G
- `DEPENDENCIES.md` : Batch G entre F et B05, parallelisation intra-Batch G documentee
- `PLAN-TEMPLATE.md` : B04 enrichi (sub-workflows, format enrichi), Batch G ajoute (6 items)
- `CLAUDE.md` : agent A7, structure mise a jour (5 agents), sources de verite JSON, flux Phase B
- `CHANGELOG.md` : cette entree

#### Gaps resolus du prompt_session_suivante.md
- **Axe C (A7 agent)** : agent `n8n-workflow-builder` cree
- **Axe D (JSON importable)** : Batch G genere des JSON importables depuis les specs
- **Axe D (AI Agent patterns)** : section conditionnelle AI Agent dans A03 §6.3, reference vers `ai_agent_workflow.md`
- **Axe D (Sub-workflows)** : conventions formalisees dans README (prefixe SW, criteres, structure)

#### Pipeline complet A03 → Batch G

```
A03 §6 : Workflow Map (specs logiques + pattern + nodes estimes)
  → B04 §3 : Documentation enrichie (tableau nodes, types n8n, expressions, code JS)
  → Batch G : Generation JSON importables + validation + maintenance
  → Humain : import dans n8n + credentials + activation + test
```

## [2.7.0] — 2026-02-23

### Ajout — Workflow Map : tracabilite features → workflows n8n

Nouveau document `workflow-map.md` en sortie de A03, qui trace CHAQUE feature du PRD vers les workflows n8n necessaires (ou l'absence de workflow). Ferme le gap ou des features pouvaient etre silencieusement ignorees entre le brief et B04.

#### A03-structure.md (3 modifications)
- Section 4 (Webhook Map) : marque comme "derive du workflow-map" (n'est plus la source principale)
- Section 5 (Integrations) : rendu **obligatoire** (retire "si applicable")
- **Section 6 (NOUVEAU)** : Workflow Map complet
  - 6.1 Triage des features (tableau verdict + justification pour TOUTES les features)
  - 6.2 Decomposition en workflows atomiques (methode des 5 questions : evenements, collecte, logique, effets, erreurs)
  - 6.3 Specification par workflow (fiche complete : trigger, donnees, logique, sortie, services, endpoint app, error handling)
  - 6.4 Graphe de dependances inter-workflows
  - Types de workflows : Collecte, Traitement, Notification, Sync, Orchestrateur
- Output mis a jour : `workflow-map.md` ajoute comme source de verite pour B04
- Validation : 7 nouveaux criteres workflow-map + coherence elargie `features ↔ tables ↔ routes ↔ workflows`

#### B04-automations.md (3 modifications)
- Inputs : `workflow-map.md` comme input principal + `features.md` comme cross-check
- Section 1 renommee "Verification et Inventaire" : cross-check PRD obligatoire avant implementation
- Validation : 3 nouveaux criteres (2 cross-checks + respect graphe dependances)

#### Mises a jour en cascade (8 fichiers)
- `integration-builder.md` : `workflow-map.md` et `features.md` ajoutes aux fichiers obligatoires, processus mis a jour
- `DEPENDENCIES.md` : B04 depend maintenant de workflow-map + webhook-map + integrations
- `placeholder-verification.md` : scan post-A03 ajoute pour les placeholders workflow-map
- `CLAUDE.md` : workflow-map et integrations ajoutes aux Sources de Verite, flux B04 mis a jour
- `PLAN-TEMPLATE.md` : A03 checklist enrichie (4 sous-items workflow-map), B04 checklist avec cross-check
- `agent-models.md` : output A03 mentionne workflow-map
- `dashboard-data-architect.md` : description mise a jour, template workflow-map ajoute, checklist enrichie
- `CHANGELOG.md` : cette entree

#### Audit skills — zero conflit identifie
- `dashboard-n8n-hostinger` (infra) ↔ `dashboard-email-n8n` (email wiring) : domaines orthogonaux
- `dashboard-email-design` (ui-builder) ↔ `dashboard-email-n8n` (integration-builder) : separation design/wiring explicite
- `dashboard-auth-patterns` (partage 3 agents) : chaque agent utilise un aspect different (UI / middleware / webhook security)
- `dashboard-data-architect` (architecture-planner) ↔ `dashboard-n8n-hostinger` (integration-builder) : phases differentes (A03 design vs B04 implementation)

## [2.6.0] — 2026-02-23

### Ajout — Conventions n8n : sticky notes, francais obligatoire, stack

#### n8n-workflows/README.md (refonte)
- Section "Stack n8n" ajoutee : v2.8.3, self-hosted Hostinger KVM2, PostgreSQL, Nginx SSL
- Section "Langue : tout en francais" avec exemples corrects/incorrects pour workflows, nodes, sticky notes
- Section "Sticky Notes (OBLIGATOIRE)" : regles (2-4 par workflow), structure type, exemples (simple 2 notes, complexe 4 notes), JSON structure, dimensions recommandees, positionnement
- Format documentation enrichi avec section Sticky Notes
- Conventions mises a jour (noms en francais, gestion depreciation)

#### Skill workspace `n8n-json-generator` (hors template)
- Etape 3 "Ajouter les sticky notes" ajoutee dans le workflow de generation
- Section sticky notes complete : JSON structure, regles, positionnement, nommage
- Convention de nommage francais obligatoire avec tableau d'exemples
- `n8n-nodes-base.stickyNote` ajoute dans les types de nodes (typeVersion 1)
- 4 quality gates ajoutees : sticky notes presentes, nom workflow en francais, noms nodes en francais, sticky notes hors `connections`

## [2.5.0] — 2026-02-23

### Ajout — Verification des placeholders (ceinture + bretelles)
- Rule `placeholder-verification.md` creee : scan automatique grep apres chaque etape, rapport format markdown, zero tolerance sur globals.css
- Checklists placeholders ajoutees dans 4 stages :
  - `A01-init.md` : 14 placeholders globaux (NOM_PROJET, CLIENT, ROLES, KPI, DATE...)
  - `A05-design-tokens.md` : 56+ tokens OKLCH, fonts, dimensions (zero tolerance CSS)
  - `B04-automations.md` : .env.example, n8n workflows, config email
  - `B06-deploy.md` : sweep final sur tout le projet

## [2.4.0] — 2026-02-23

### Decoupe — Skill email en 3 skills specialises
- `dashboard-email-templates` allege : sections 1-3 + anti-patterns techniques (HTML, composants, mapping tokens)
- `dashboard-email-design` cree : methodologie contenu, brief obligatoire, processus design-first, checklists (ex-sections 4+7)
- `dashboard-email-n8n` cree : config emailSend n8n, emails auth Supabase (ex-sections 5+6)
- References mises a jour dans : CLAUDE.md, agent-models.md, dashboard-ui-builder.md, integration-builder.md, PLAN-TEMPLATE.md, B04-automations.md

### Supprime — Checklist redondante dans PLAN-TEMPLATE.md
- Section "Verification Humaine — Template" supprimee (copie manuelle)
- Remplacee par renvoi vers la rule `.claude/rules/post-agent-checklist.md` (auto-declenchee)

## [2.3.0] — 2026-02-23

### Refonte — Skill `dashboard-email-templates`
- Section 4 reecrite : "Templates par type" → "Methodologie de design de contenu email"
  - Email Design Brief obligatoire avant tout HTML (objectif unique, hierarchie, exclusions)
  - Regles de hierarchie de contenu (titre=info cle, pas de repetition, 1 CTA)
  - Patterns de presentation : plannings compacts, pastilles statut, chiffres hero, listes a puces
  - Anti-patterns de contenu : repetitions, formules de politesse, surcharge de donnees
- Section 7 reecrite : "Processus lineaire" → "Processus design-first"
  - 7 etapes : inventaire → brief → contenu (validation humaine) → tokens → HTML → wiring → test
  - Sources de verite explicites (PRD, webhook-map, integrations, features)
  - Validation contenu AVANT le HTML (etape 3 = gate humaine)
  - Checklist separee : contenu (avant HTML) + technique (apres HTML)

### Supprime
- 4 templates pre-faits (invitation, notification, confirmation, rapport) — remplace par methodologie derivee du pipeline

## [2.2.0] — 2026-02-23

### Corrige (audit qualite — 14 items)

#### CRITICAL
- Skills `dashboard-design-extraction` et `dashboard-design-tokens` : chemin `01-design-extraction/` → `02-design-system/` (8 occurrences)

#### HIGH
- `agent-models.md` : Batch A dependance "Phase A terminee" → "B01 termine"
- `DEPENDENCIES.md` : B05 repositionne dans le graphe (depend de B01-B04 + E/F, pas sous Batch F)
- `DEPENDENCIES.md` : Batch E strictement sequentiel (suppression parallelisation E2/E3)

#### MEDIUM
- `agent-models.md` : ajout skill `dashboard-email-templates` pour `dashboard-ui-builder` et `integration-builder`
- Stages A01-A05 : ajout sections Agent + Skill dans chaque fichier
- `dashboard-ui-builder` : ajout reads `data-model.md` et `routes.md`
- `integration-builder` : ajout read `integrations.md`
- `PLAN-TEMPLATE.md` : Sync externe associe au skill `dashboard-n8n-hostinger`
- `B04-automations.md` : `integrations.md` marque comme optionnel (si applicable)

#### LOW
- `agent-models.md` : ajout B05 (Polish) et B06 (Deploy) dans l'organisation en batchs
- `architecture-planner.md` : chemin `pipeline/input/imports/` → `pipeline/input/references/`
- `B06-deploy.md` : ajout declaration Agent + Skill

## [2.1.0] — 2026-02-23

### Ajoute
- Skill `dashboard-email-templates` : templates HTML email transactionnels compatibles n8n emailSend v2.2+
  - Structure HTML table-based responsive (Gmail, Outlook, Apple Mail)
  - Mapping tokens CSS → valeurs inline pour coherence visuelle dashboard/email
  - 4 templates : invitation, notification, confirmation, rapport periodique
  - Composants reutilisables : bouton CTA, bloc info, alerte
  - Config noeud emailSend n8n + templates auth Supabase
  - Processus agents : design par `dashboard-ui-builder`, wiring par `integration-builder`
- Table `typeVersion` pour n8n v2.8.3 dans le skill workspace `n8n-json-generator`

### Corrige (compatibilite n8n v2.8.3)
- `dashboard-n8n-hostinger` : remplacement `N8N_BASIC_AUTH_*` (supprime en v2.x) par `N8N_DEFAULT_USER_*`
- `dashboard-n8n-hostinger` : WF00 Set node v1 → v3.4 (syntax `assignments`)
- `dashboard-n8n-hostinger` : correction expression `=[{{ }}]` → `={{ }}`
- `dashboard-n8n-hostinger` : ajout `typeVersion` sur tous les nodes WF00
- `dashboard-n8n-hostinger` : ajout frontmatter + version cible v2.8.3+
- Skills workspace : deprecation `$node["Name"].json` dans Code nodes (n8n-code-javascript)
- Skills workspace : correction code Stripe signature (n8n-workflow-patterns)
- Skills workspace : ajout variable `$today` (n8n-expression-syntax)

### Modifie
- `dashboard-ui-builder` : ajout emails HTML dans le scope + skill `dashboard-email-templates`
- `integration-builder` : separation responsabilites email (design → ui-builder, wiring → integration)
- `agent-models.md` : Batch F split email en 2 lignes (design HTML + wiring n8n)
- `PLAN-TEMPLATE.md` : colonne Skill remplie pour emails (etait vide `—`)
- `B04-automations.md` : section emails enrichie avec processus 2 etapes et regles detaillees
- `CLAUDE.md` : ajout skill `dashboard-email-templates` dans le tableau des skills

## [2.0.0] — 2026-02-23

### Ajoute
- Agent `architecture-planner` pour executer la Phase A (A01-A05) de maniere sequentielle
- Section `skills:` sur les 4 agents (mapping agent → skills associes)
- 14 skills techniques couvrant toutes les etapes du pipeline
- 2 rules supplementaires : `plan-update.md`, `post-agent-checklist.md`
- Phase A : Architecture (A01-A05 sequentiel par `architecture-planner`)
- Phase B : Batchs paralleles (6 batchs A-F par les 3 agents dev)

### Modifie
- Pipeline Phase A : 5 etapes (A01-A05) au lieu de 6 (A01-A06)
  - A02 = Design Extraction (remplace ancien A02-Brand + A03-Art Direction)
  - A03 = Structure (renumerote depuis ancien A04)
  - A04 = Wireframes (renumerote depuis ancien A05)
  - A05 = Design Tokens (renumerote depuis ancien A06)
- `agent-models.md` : ajout tableau agents/skills + section Phase A
- `README.md` : structure mise a jour (4 agents, 14 skills, 5 rules)
- `CLAUDE.md` : reference les 4 agents et 14 skills
- `PLAN-TEMPLATE.md` : colonnes Skill et Agent dans les tableaux

### Supprime
- Anciens stages A02-Brand et A03-Art-Direction (fusionnes en A02-Design-Extraction)

## [1.0.0] — 2026-02-23

### Cree
- Template complet pour projets dashboard/application web
- 3 agents specialises : `dashboard-ui-builder`, `backend-layer`, `integration-builder`
- 3 rules contextuelles : `agent-models.md`, `data-model.md`, `api-patterns.md`
- 12 pipeline stages (A01-A06 architecture + B01-B06 developpement)
- Systeme de seed data avec dates relatives (NOW())
- Convention n8n workflows (patch notes, documentation)
- Brief client template
- PLAN-TEMPLATE.md avec batchs paralleles et verification humaine
- Documentation complete (README, DEPENDENCIES, DESIGN_STACK)

### Base sur
- Methodologie multi-agent du projet FOG (clients/fog/)
- Structure pipeline du website-workflow_template
- Cas d'usage reel du projet dashboard-loc-immo
