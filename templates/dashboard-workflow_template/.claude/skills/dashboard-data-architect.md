# Skill : dashboard-data-architect

## Description

Concevoir l'architecture data complete d'un dashboard : data model, auth strategy, routes, workflow map, webhook map, integrations. Produit tous les outputs de l'etape A03-structure.

## Usage

Invoquer pendant l'execution de A03-structure pour generer les artefacts d'architecture.

## Templates

### Template data-model.md

```markdown
# Data Model — [NOM_PROJET]

## Vue d'ensemble

| Table | Description | RLS | Multi-tenant |
|-------|-------------|-----|--------------|
| profiles | Profils utilisateurs | Oui | owner_id = auth.uid() |
| [table] | [Description] | [Oui/Non] | [Politique] |

## Schema

### profiles

**Description** : Profils utilisateurs lies a auth.users
**RLS** : Chaque utilisateur voit son propre profil

| Colonne | Type | Contrainte | Description |
|---------|------|------------|-------------|
| id | UUID | PK, FK auth.users(id) | Identifiant (meme que auth) |
| email | TEXT | NOT NULL, UNIQUE | Email |
| full_name | TEXT | | Nom complet |
| role | user_role | NOT NULL, DEFAULT 'user' | Role applicatif |
| avatar_url | TEXT | | URL avatar |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Creation |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Modification |

**Indexes** :
- UNIQUE idx_profiles_email ON email

### [table_name]

**Description** : [Role de cette table]
**RLS** : [Politique d'acces — qui voit quoi]

| Colonne | Type | Contrainte | Description |
|---------|------|------------|-------------|
| id | UUID | PK, DEFAULT gen_random_uuid() | Identifiant unique |
| owner_id | UUID | FK profiles(id), NOT NULL | Proprietaire (tenant) |
| [colonne] | [type] | [contrainte] | [description] |
| status | [enum_name] | NOT NULL, DEFAULT '[default]' | Statut |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Creation |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Modification |

**Relations** :
- profiles.id → [table].owner_id (1:N)

**Indexes** :
- idx_[table]_owner_id ON owner_id
- idx_[table]_status ON status
- idx_[table]_created_at ON created_at DESC

## Enums

| Enum | Valeurs | Usage |
|------|---------|-------|
| user_role | owner, staff, admin | Role utilisateur |
| [enum_name] | [val_1, val_2, val_3] | [Description] |

## Diagramme

```mermaid
erDiagram
    profiles ||--o{ [table_1] : owns
    [table_1] ||--o{ [table_2] : has
    profiles {
        uuid id PK
        text email
        text full_name
        user_role role
    }
    [table_1] {
        uuid id PK
        uuid owner_id FK
        text name
        [enum] status
    }
```

## RLS Policies

### profiles

```sql
-- Chaque utilisateur voit son propre profil
CREATE POLICY profiles_select_own ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Chaque utilisateur modifie son propre profil
CREATE POLICY profiles_update_own ON profiles
  FOR UPDATE USING (auth.uid() = id);
```

### [table_name]

```sql
-- Owner voit ses propres donnees
CREATE POLICY [table]_owner_select ON [table]
  FOR SELECT USING (owner_id = auth.uid());

-- Staff voit les donnees de son owner
CREATE POLICY [table]_staff_select ON [table]
  FOR SELECT USING (
    owner_id IN (
      SELECT owner_id FROM staff_assignments
      WHERE staff_id = auth.uid()
    )
  );

-- Owner peut creer
CREATE POLICY [table]_owner_insert ON [table]
  FOR INSERT WITH CHECK (owner_id = auth.uid());

-- Owner peut modifier ses donnees
CREATE POLICY [table]_owner_update ON [table]
  FOR UPDATE USING (owner_id = auth.uid());

-- Owner peut supprimer ses donnees
CREATE POLICY [table]_owner_delete ON [table]
  FOR DELETE USING (owner_id = auth.uid());
```

## Checklist de Coherence

- [ ] Chaque feature du PRD → au moins 1 table
- [ ] Chaque role → au moins 1 policy SELECT
- [ ] Chaque table → RLS activee + policies definies
- [ ] Chaque FK → index correspondant
- [ ] Chaque enum → toutes les valeurs du domaine metier
- [ ] Multi-tenant → owner_id sur chaque table de donnees
- [ ] Timestamps → created_at + updated_at sur chaque table
```

### Template auth-strategy.md

```markdown
# Auth Strategy — [NOM_PROJET]

## Providers

| Provider | Usage | Priorite | Configuration |
|----------|-------|----------|---------------|
| Email + Password | Inscription standard | Primaire | Confirmation email requise |
| Magic Link | Alternative sans mot de passe | Secondaire | Expiration 1h |

## Roles

| Role | Description | Inscription | Metadata | Redirect apres login |
|------|-------------|-------------|----------|---------------------|
| owner | [Description] | Self-service | `app_metadata.role = 'owner'` | /dashboard |
| staff | [Description] | Invitation | `app_metadata.role = 'staff'` | /[staff-home] |

## Matrice de Permissions

| Ressource | owner | staff | public |
|-----------|-------|-------|--------|
| [Table 1] | CRUD | Read | - |
| [Table 2] | CRUD | CRUD (ses assignements) | - |
| Settings | CRUD | Read (son profil) | - |

## Middleware Routing

```
Non authentifie → /login
owner (role = 'owner') → /dashboard
staff (role = 'staff') → /[staff-home]
Route interdite par role → redirect vers home du role
Route inexistante → 404
```

## Invitation Flow (si applicable)

1. Owner cree une invitation depuis Settings → Equipe
2. Email envoye avec lien `/register-staff?token=[TOKEN]`
3. Staff cree son compte → token valide → profil lie au owner
4. Token expire apres 7 jours
5. Owner peut revoquer une invitation non-utilisee

### Schema invitation

```sql
CREATE TABLE invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES profiles(id) NOT NULL,
  email TEXT,
  token TEXT UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex'),
  role user_role NOT NULL DEFAULT 'staff',
  expires_at TIMESTAMPTZ NOT NULL DEFAULT NOW() + INTERVAL '7 days',
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;
CREATE POLICY invitations_owner_all ON invitations
  FOR ALL USING (owner_id = auth.uid());
```

## Session Management

- Refresh automatique via middleware (Supabase SSR)
- Duree session : 1 semaine (configurable Supabase)
- Expiration → redirect /login avec message
```

### Template routes.md

```markdown
# Routes — [NOM_PROJET]

## Route Map

```
(auth)/                    # Routes publiques (pas de sidebar)
├── login/                 # Connexion
├── register/              # Inscription
├── register-staff/        # Inscription staff (si invitation flow)
├── forgot-password/       # Mot de passe oublie
└── auth/callback/         # Callback OAuth/Magic Link

(owner)/                   # Routes owner (sidebar owner)
├── dashboard/             # Vue principale avec KPIs
├── [entite-1]/            # Liste entite 1
│   ├── [id]/              # Detail entite 1
│   └── [id]/edit/         # Edition entite 1
├── [entite-2]/            # Liste entite 2
│   └── [id]/              # Detail entite 2
└── settings/              # Parametres
    ├── profile/           # Profil
    └── team/              # Equipe (invitations)

(staff)/                   # Routes staff (sidebar staff)
├── [home]/                # Accueil staff
├── [tasks]/               # Taches assignees
│   └── [id]/              # Detail tache
└── profile/               # Profil staff

api/
└── webhooks/
    └── [provider]/
        └── [action]/      # POST: webhook n8n
```

## Navigation par Role

### Owner — Sidebar Desktop

| Icone | Label | Route | Badge |
|-------|-------|-------|-------|
| LayoutDashboard | Dashboard | /dashboard | - |
| [Icon] | [Entite 1] | /[entite-1] | count |
| [Icon] | [Entite 2] | /[entite-2] | - |
| Settings | Parametres | /settings | - |

### Owner — Header

| Element | Position | Action |
|---------|----------|--------|
| Logo/Nom projet | Gauche | → /dashboard |
| Notifications | Droite | Toggle panel |
| Avatar + nom | Droite | Menu dropdown (profil, deconnexion) |

### Staff — Tab Bar Mobile

| Icone | Label | Route |
|-------|-------|-------|
| Home | Accueil | /[home] |
| CheckSquare | Taches | /[tasks] |
| User | Profil | /profile |

## API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | /api/webhooks/[provider]/[action] | Webhook secret | [Description] |
```

### Template webhook-map.md

```markdown
# Webhook Map — [NOM_PROJET]

## Conventions

- Tous les webhooks utilisent le header `x-webhook-secret` pour l'authentification
- Le secret est stocke dans `.env.local` sous `N8N_WEBHOOK_SECRET`
- Base URL n8n : `N8N_WEBHOOK_BASE_URL` (Hostinger)

## Webhooks Entrants (n8n → App)

| Endpoint | Trigger n8n | Body | Response | Workflow |
|----------|------------|------|----------|----------|
| `POST /api/webhooks/[provider]/[action]` | [Declencheur] | `{ field: type }` | `{ success: true }` | WF0X |

## Webhooks Sortants (App → n8n)

| Trigger App | URL n8n | Body | Workflow |
|-------------|---------|------|----------|
| [Action utilisateur] | `$N8N_WEBHOOK_BASE_URL/[path]` | `{ field: type }` | WF0X |

## Configuration Hostinger

### URLs

| Environnement | Base URL |
|---------------|----------|
| Development | `http://localhost:5678/webhook` |
| Production (Hostinger) | `https://[HOSTINGER_DOMAIN]/webhook` |

### Headers requis

```
x-webhook-secret: $N8N_WEBHOOK_SECRET
Content-Type: application/json
```

### Test

```bash
# Test webhook entrant
curl -X POST http://localhost:3000/api/webhooks/[provider]/[action] \
  -H "Content-Type: application/json" \
  -H "x-webhook-secret: $N8N_WEBHOOK_SECRET" \
  -d '{ "field": "value" }'

# Reponse attendue
{ "success": true }

# Test sans secret (doit echouer)
curl -X POST http://localhost:3000/api/webhooks/[provider]/[action] \
  -H "Content-Type: application/json" \
  -d '{ "field": "value" }'

# Reponse attendue : 401
{ "error": "Unauthorized" }
```
```

### Template workflow-map.md

> **Note** : Le format detaille et la methodologie de decomposition (triage, 5 questions, specs, graphe) sont documentes dans `pipeline/stages/A03-structure.md` section 6. Ce template fournit la structure du fichier de sortie.

```markdown
# Workflow Map — [NOM_PROJET]

## Triage des Features

| Feature ID | Feature | Verdict | Justification |
|------------|---------|---------|---------------|
| F01 | [Nom] | [Pur frontend / n8n requis / Hybride] | [Raison] |

## Decomposition par Feature

### Feature F0X — [Nom]

**Verdict** : n8n requis
**Nombre de workflows** : [N]

#### Analyse (5 questions)

1. **Evenements** : [triggers identifies]
2. **Collecte** : [sources de donnees]
3. **Logique** : [traitement metier]
4. **Effets** : [ecritures, notifications]
5. **Erreurs** : [strategie fallback]

#### Workflows identifies

| WF ID | Nom | Type | Trigger | Appele par | Appelle |
|-------|-----|------|---------|------------|---------|
| WF0Xa | [Nom] | [Type] | [Trigger] | — | WF0Xb |

## Specifications Workflows

### WF0X — [Nom en francais]

**Feature source** : F0X — [Nom]
**Type** : [Collecte / Traitement / Notification / Sync / Orchestrateur]
**Priorite** : [Must / Should]
**Complexite estimee** : [Simple / Moyen / Complexe]

#### Trigger
- **Type** : [Schedule / Webhook / IMAP / Sub-workflow / Error Trigger]
- **Frequence** : [cron ou temps reel]

#### Donnees d'entree
| Source | Table/Endpoint | Champs |
|--------|---------------|--------|

#### Logique metier
1. [Etape]

#### Donnees de sortie
| Destination | Table/Endpoint | Action |
|-------------|---------------|--------|

#### Services externes
| Service | Usage | Credentials |
|---------|-------|-------------|

#### Endpoint App (si applicable)
| Endpoint | Direction | Body | Response |
|----------|-----------|------|----------|

#### Error Handling
- Fallback : [comportement]
- Utilise WF00

#### Architecture n8n

**Pattern** : [Webhook Processing / HTTP API Integration / Database Operations / AI Agent Workflow / Scheduled Tasks]

**Nodes estimes** :

| # | Role | Type n8n | Notes |
|---|------|----------|-------|
| 1 | [Trigger] | [type] | [details] |
| 2 | [Action] | [type] | [details] |

> Si AI Agent Workflow : completer modele LLM, type d'agent, memory, tools, securite AI (voir A03-structure.md §6.3)

## Graphe de Dependances

[Diagramme ASCII des dependances inter-workflows]

## Ordre d'Execution Type

[Planning chronologique]
```

## Checklist Architecture

- [ ] Toutes les features du PRD ont au moins 1 table dans le data model
- [ ] Toutes les tables ont RLS + policies par role
- [ ] Tous les roles ont au moins 1 route group
- [ ] Workflow map complet :
  - [ ] TOUTES les features Must Have et Should Have dans le tableau de triage
  - [ ] Chaque feature "n8n requis" decomposee (5 questions + workflows)
  - [ ] Chaque workflow a sa spec complete
  - [ ] Endpoints App reportes dans le webhook-map
  - [ ] Graphe de dependances documente
- [ ] Webhook map derive du workflow-map (endpoints API uniquement)
- [ ] Integrations documentees (specs techniques chaque systeme externe)
- [ ] Le diagramme Mermaid est a jour
- [ ] La matrice de permissions couvre toutes les tables x roles
- [ ] Le middleware routing est coherent avec les roles
- [ ] Les webhook URLs Hostinger sont documentees
