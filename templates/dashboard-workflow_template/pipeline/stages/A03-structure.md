# A03 — Structure : Data Model + Routes + Auth

## Objectif

Definir l'architecture technique du dashboard : data model complet, strategie d'authentification, routes par role, et contrats API/webhook.

> **Note** : Cette etape remplace le "Sitemap" du template site vitrine. Pour un dashboard, la structure est definie par le data model, les roles, et les routes — pas par un plan de pages.

## Agent

**`architecture-planner`** (sonnet, opus si multi-tenant complexe)

## Skill

`dashboard-data-architect`

## Inputs

- `pipeline/output/01-brief/prd.md` — PRD (features, personas, entites)
- `pipeline/output/01-brief/features.md` — detail des features
- `pipeline/output/02-design-system/constraints.md` — principes UI (navigation, densite)

## Processus

### 1. Data Model

Creer `pipeline/output/03-structure/data-model.md` :

#### 1.1 Schema Entite-Relation

Pour chaque table :

```markdown
### [nom_table]

**Description** : [role de cette table]
**RLS** : [politique d'acces]

| Colonne | Type | Contrainte | Description |
|---------|------|------------|-------------|
| id | UUID | PK, DEFAULT gen_random_uuid() | Identifiant unique |
| owner_id | UUID | FK profiles(id), NOT NULL | Tenant owner |
| [colonne] | [type] | [contrainte] | [description] |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Date de creation |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Derniere modification |

**Relations** :
- [table_a].id → [table_b].[fk_colonne] (1:N)

**Indexes** :
- idx_[table]_[colonne] ON [colonne]
```

#### 1.2 Enums

| Enum | Valeurs | Usage |
|------|---------|-------|
| [nom] | val_1, val_2, val_3 | [Description] |

#### 1.3 Diagramme

Inclure un diagramme Mermaid des relations :

```mermaid
erDiagram
    profiles ||--o{ properties : owns
    properties ||--o{ reservations : has
    ...
```

### 2. Auth Strategy

Creer `pipeline/output/03-structure/auth-strategy.md` :

#### 2.1 Providers
| Provider | Usage | Priorite |
|----------|-------|----------|
| [Magic Link / OAuth / Email+Password] | [Description] | Primaire/Secondaire |

#### 2.2 Roles
| Role | Description | Inscription | Metadata |
|------|-------------|-------------|----------|
| [role] | [description] | [self-service / invitation / admin] | `app_metadata.role = '[role]'` |

#### 2.3 Permissions Matrix
| Ressource | [Role 1] | [Role 2] | [Role 3] |
|-----------|----------|----------|----------|
| [Table] | CRUD | Read | - |

#### 2.4 Middleware Routing
```
Non authentifie → /login
[Role 1] → /dashboard
[Role 2] → /[role2-home]
Route interdite → redirect vers home du role
```

#### 2.5 Invitation Flow (si applicable)
1. Owner cree une invitation (token + email optionnel)
2. Staff recoit un lien `/register-staff?token=[TOKEN]`
3. Staff cree son compte → token valide → profil lie au owner
4. Token expire apres X jours

### 3. Routes

Creer `pipeline/output/03-structure/routes.md` :

#### 3.1 Route Map par Role

```
(auth)/               # Routes publiques
├── login
├── register
├── register-staff    # Si invitation flow
└── [post-auth pages]

([role_1])/           # Routes role 1
├── dashboard
├── [entity]/
│   ├── [id]          # Detail
│   └── [id]/edit     # Edition
├── [entity-2]/
└── settings/

([role_2])/           # Routes role 2
├── [home]
├── [entity]/[id]
└── profile/

(public)/             # Routes sans auth (si applicable)
└── [public-page]/[slug]

api/
└── webhooks/
    └── [provider]/   # Endpoints n8n
```

#### 3.2 Navigation

| Element | [Role 1] | [Role 2] |
|---------|----------|----------|
| Sidebar items | [liste] | [liste] |
| Header actions | [liste] | [liste] |
| Mobile nav | [Tab bar items] | [Tab bar items] |

### 4. Webhook Map

Creer `pipeline/output/03-structure/webhook-map.md` :

> **Note** : Ce document est derive du workflow-map (section 6). Il ne contient que les workflows ayant un endpoint HTTP dans l'app Next.js. Si la section 6 est completee en premier, le webhook-map en est extrait automatiquement.

| Endpoint | Direction | Declencheur | Body | Response | n8n Workflow |
|----------|-----------|------------|------|----------|-------------|
| `/api/webhooks/[provider]/[action]` | n8n → App | [Trigger] | `{ field: type }` | `{ success: boolean }` | WF0X |

#### Configuration Hostinger n8n

| Parametre | Valeur |
|-----------|--------|
| Base URL (dev) | `http://localhost:5678/webhook` |
| Base URL (prod) | `https://[HOSTINGER_DOMAIN]/webhook` |
| Header auth | `x-webhook-secret: $N8N_WEBHOOK_SECRET` |
| Timeout | [A definir] |
| Retry policy | [A definir] |

### 5. Integrations

Creer `pipeline/output/03-structure/integrations.md` :

> **Obligatoire** — meme si le projet n'a qu'une seule integration externe. Ce fichier documente les specs techniques de chaque systeme externe (credentials, APIs, protocoles). Il est complementaire au workflow-map (section 6) qui definit le "quoi faire" tandis que ce fichier definit le "comment se connecter".

Pour chaque integration externe :

```markdown
### [Nom Integration]

**Type** : [API REST / Webhook / iCal / IMAP / SMTP]
**Direction** : [Entrant / Sortant / Bidirectionnel]
**Frequence** : [Temps reel / Polling Xmin / Schedule]
**Credentials** : [ce qui est necessaire]
**n8n Workflow** : [WF0X]
**Hebergement n8n** : Hostinger

#### Flux de donnees
1. [Etape 1]
2. [Etape 2]
3. [Etape 3]
```

### 6. Workflow Map

Creer `pipeline/output/03-structure/workflow-map.md` :

> **Source de verite pour B04.** Ce document trace chaque feature du PRD vers les workflows n8n necessaires (ou l'absence de workflow). Aucune feature n'est silencieusement ignoree.

#### 6.1 Triage des Features

Pour **CHAQUE** feature de `features.md`, determiner si elle necessite un ou plusieurs workflows n8n.

**Criteres de declenchement n8n** — si au moins un est vrai, un workflow est necessaire :

| Critere | Exemple |
|---------|---------|
| Integration systeme externe (API tierce) | Airbnb API, Google Maps, service SMS |
| Traitement planifie (schedule/cron) | Recap quotidien, sync toutes les 15min |
| Polling source externe | Check IMAP, fetch iCal, scrape API |
| Logique metier complexe multi-etapes | Planning intelligent, scoring, matching |
| Notification conditionnelle sur regles metier | Email si check-in dans 4h, alerte si seuil depasse |
| Traitement IA/LLM | Classification email, extraction donnees, generation contenu |
| Synchronisation bidirectionnelle | Calendrier ↔ reservations, CRM ↔ base locale |

**Tableau de triage** :

```markdown
| Feature ID | Feature | Verdict | Justification |
|------------|---------|---------|---------------|
| F01 | [Nom] | Pur frontend | [Raison : lecture Supabase directe, CRUD standard, etc.] |
| F02 | [Nom] | n8n requis | [Raison : systeme externe, schedule, logique multi-etapes, etc.] |
| F03 | [Nom] | Hybride | [Raison : frontend + N workflows pour X] |
```

**Regle** : TOUTES les features Must Have et Should Have apparaissent dans ce tableau, y compris celles sans workflow. Rien n'est silencieusement ignore.

#### 6.2 Decomposition en Workflows Atomiques

Pour chaque feature marquee "n8n requis" ou "Hybride", repondre aux **5 questions de decomposition** :

**Q1 — Quels evenements declenchent cette feature ?**
Chaque evenement distinct = potentiellement 1 workflow.
- L'utilisateur fait une action dans l'app ? → Webhook App → n8n
- Un horaire precis ou une frequence ? → Schedule/Cron
- Un systeme externe envoie des donnees ? → Webhook externe / IMAP / iCal
- Un autre workflow se termine ? → Sub-workflow
- Un evenement en base de donnees ? → Database trigger

**Q2 — Quelles donnees doivent etre collectees, et d'ou ?**
Chaque source externe distincte qui necessite du polling = 1 workflow de collecte.
- Depuis quel systeme ? (API, IMAP, iCal, fichier)
- A quelle frequence ? (temps reel, polling Xmin, quotidien)
- Quel format de donnees ?

**Q3 — Quelle logique metier s'applique ?**
Si la logique est complexe (multi-etapes, branchement conditionnel, IA), elle merite un workflow de traitement separe.
- Calculs, transformations, decisions ?
- IA/LLM necessaire ?
- Conditions de branchement (if/switch) ?

**Q4 — Quels effets de bord ?**
Chaque canal de sortie distinct peut justifier un workflow separe (surtout les notifications).
- Ecriture en base ? (Supabase upsert)
- Appel API externe ? (creation dans un systeme tiers)
- Envoi de notification ? (email, SMS, push — souvent un sub-workflow reutilisable)

**Q5 — Que se passe-t-il en cas d'erreur ?**
Definir le comportement d'erreur pour chaque workflow.
- Retry automatique ?
- Fallback (valeur par defaut, mode degrade) ?
- Notification admin ?
- Tous les workflows utilisent WF00 (Error Handler)

**Types de workflows** :

| Type | Responsabilite | Exemple |
|------|----------------|---------|
| Collecte | Recuperer des donnees depuis une source externe | Poll iCal, check IMAP, fetch API |
| Traitement | Appliquer une logique metier sur des donnees | Calcul planning, scoring, matching |
| Notification | Envoyer une communication | Email confirmation, alerte SMS |
| Sync | Synchroniser des donnees entre systemes | Calendrier ↔ reservations |
| Orchestrateur | Coordonner plusieurs sub-workflows | Planning complet (collecte + traitement + notification) |

**Format du resultat** — pour chaque feature decomposee :

```markdown
### Feature F0X — [Nom Feature]

**Verdict** : n8n requis
**Nombre de workflows** : [N]

#### Analyse (5 questions)

1. **Evenements** : [liste des triggers identifies]
2. **Collecte** : [sources de donnees et frequences]
3. **Logique** : [resume du traitement metier]
4. **Effets** : [ecritures, notifications, appels externes]
5. **Erreurs** : [strategie de fallback]

#### Workflows identifies

| WF ID | Nom | Type | Trigger | Appele par | Appelle |
|-------|-----|------|---------|------------|---------|
| WF0Xa | [Nom] | Collecte | Schedule [freq] | — | WF0Xb |
| WF0Xb | [Nom] | Traitement | Sub-workflow | WF0Xa | WF0Xc |
| WF0Xc | [Nom] | Notification | Sub-workflow | WF0Xb | — |
```

#### 6.3 Specification par Workflow

Pour chaque workflow identifie en 6.2, produire une fiche :

```markdown
### WF0X — [Nom du workflow en francais]

**Feature source** : F0X — [Nom feature]
**Type** : [Collecte / Traitement / Notification / Sync / Orchestrateur]
**Priorite** : [Must / Should] (heritee de la feature)
**Complexite estimee** : [Simple (3-5 nodes) / Moyen (6-10) / Complexe (10+)]

#### Trigger
- **Type** : [Schedule / Webhook App→n8n / Webhook externe→n8n / IMAP / Sub-workflow / Error Trigger]
- **Frequence** : [Expression cron ou temps reel]
- **URL** (si webhook) : `[endpoint]`

#### Donnees d'entree
| Source | Table/Endpoint | Champs utilises |
|--------|---------------|-----------------|
| [Supabase / API externe / Webhook body / Sub-workflow] | [table ou URL] | [champs] |

#### Logique metier
1. [Etape 1]
2. [Etape 2]
3. [Decision/branchement si applicable]
4. ...

#### Donnees de sortie
| Destination | Table/Endpoint | Action |
|-------------|---------------|--------|
| [Supabase / API externe / Email / Sub-workflow] | [table ou URL] | [Insert/Upsert/Send/Call] |

#### Services externes
| Service | Usage | Credentials |
|---------|-------|-------------|
| [Nom] | [Description] | [Type de credential] |

#### Endpoint App (si ce workflow necessite un endpoint dans Next.js)

| Endpoint | Direction | Body | Response |
|----------|-----------|------|----------|
| `/api/webhooks/[path]` | [n8n→App / App→n8n] | `{ schema }` | `{ schema }` |

> Les endpoints listes ici DOIVENT apparaitre dans le webhook-map.md (section 4).

#### Error Handling
- Fallback : [comportement si echec]
- Retry : [oui/non, combien de fois]
- Utilise WF00 (Error Handler)

#### Architecture n8n

**Pattern** : [Webhook Processing / HTTP API Integration / Database Operations / AI Agent Workflow / Scheduled Tasks]
> Reference : skill workspace `n8n-workflow-patterns` — consulter le pattern correspondant pour les bonnes pratiques.

**Nodes estimes** :

| # | Role | Type n8n | Notes |
|---|------|----------|-------|
| 1 | [Trigger] | [n8n-nodes-base.scheduleTrigger / webhook / etc.] | [Frequence ou path] |
| 2 | [Action] | [n8n-nodes-base.supabase / httpRequest / code / etc.] | [Parametres cles] |
| 3 | [Decision] | [n8n-nodes-base.if / switch] | [Condition] |
| ... | ... | ... | ... |

> Note : cette estimation guide l'implementation en B04 et Batch G. Les nodes reels peuvent varier lors de la generation JSON.

##### Si AI Agent Workflow

Completer uniquement si le pattern est "AI Agent Workflow" :

**Modele LLM** : [OpenAI GPT-4 / Anthropic Claude / Google Gemini / Ollama]
**Type d'agent** : [Conversational / OpenAI Functions / ReAct]
**Memory** : [Buffer / Window Buffer (recommande) / Summary] — Session key : `[champ]`

**Tools** :

| Outil | Type n8n | Connexion | Acces | Description |
|-------|----------|-----------|-------|-------------|
| [Nom] | [n8n-nodes-base.httpRequest / postgres / code] | ai_tool | [read-only / read-write] | [Ce que l'agent peut faire avec] |

**Securite AI** :
- [ ] Acces base de donnees read-only pour les tools
- [ ] Input sanitize (max [N] caracteres)
- [ ] Rate limiting (max [N] requetes/min)
```

#### 6.4 Graphe de Dependances Inter-Workflows

Documenter les dependances entre tous les workflows du projet :

```markdown
## Vue globale

WF01 (Collecte X) ──→ WF03 (Traitement) ──→ WF05 (Notifications)
WF02 (Collecte Y) ──┘                          ↑
                                                │
WF04 (Action user) ────────────────────────────┘

## Ordre d'execution type (quotidien)

06:00  WF01 — [description courte]
06:00  WF02 — [description courte] (parallele a WF01)
06:05  WF03 — [description courte] (attend WF01 + WF02)
06:06  WF05 — [description courte] (appele par WF03)
[async] WF04 — [description courte] (temps reel, declenche par user)
```

**Regles du graphe** :
- WF00 (Error Handler) n'apparait pas dans le graphe — il est implicite pour tous
- Les sub-workflows sont representes par des fleches directes
- Les workflows paralleles independants n'ont pas de fleche entre eux

## Output

```
pipeline/output/03-structure/
├── data-model.md      # Schema complet (tables, enums, relations, indexes)
├── auth-strategy.md   # Providers, roles, permissions, middleware, invitations
├── routes.md          # Routes par role, navigation, API endpoints
├── workflow-map.md    # Triage features → workflows + specs (SOURCE DE VERITE pour B04)
├── webhook-map.md     # Contrats webhook + config Hostinger (derive du workflow-map)
└── integrations.md    # Specs techniques integrations externes
```

## Validation

- [ ] Toutes les entites du PRD ont une table correspondante
- [ ] Chaque table a id, created_at, updated_at
- [ ] Tables multi-tenant ont owner_id
- [ ] RLS definie pour chaque table
- [ ] Enums pour toutes les valeurs fermees
- [ ] Auth strategy complete (providers, roles, permissions)
- [ ] Routes couvrent toutes les pages du PRD
- [ ] Navigation definie par role
- [ ] Webhook map avec config Hostinger (derive du workflow-map)
- [ ] Integrations documentees (specs techniques de chaque systeme externe)
- [ ] Workflow map complet :
  - [ ] TOUTES les features Must Have et Should Have apparaissent dans le tableau de triage
  - [ ] Chaque feature "n8n requis" a sa decomposition (5 questions + workflows identifies)
  - [ ] Chaque workflow a sa fiche spec complete (trigger, donnees, logique, sortie, erreurs)
  - [ ] Les endpoints App identifies dans les specs sont reportes dans le webhook-map
  - [ ] Le graphe de dependances inter-workflows est documente
- [ ] Diagramme Mermaid des relations (data model)
- [ ] Coherence features PRD ↔ tables ↔ routes ↔ workflows
