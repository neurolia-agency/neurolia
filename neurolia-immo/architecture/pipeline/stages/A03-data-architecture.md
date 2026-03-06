# Etape A03 : Data Architecture

> **Phase A : Architecture** - Conception du modele de donnees et de la strategie d'authentification.

## Objectif

Concevoir le schema de donnees complet (tables/collections, relations, types), definir la strategie d'authentification (methodes, roles, permissions), et mapper les donnees aux features.

## Skill

`app-data-architect`

## Input

- `pipeline/output/01-brief/features.md`
- `pipeline/output/02-user-flows/` (tous les fichiers)

## Output

Creer 2 fichiers dans `pipeline/output/03-data/` :

### 1. data-model.md

```markdown
# Data Model - [Nom du Projet]

## Vue d'Ensemble

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    Users      │────<│   [Entity]   │>────│   [Entity]   │
└──────────────┘     └──────────────┘     └──────────────┘
       │                    │
       │                    │
       ▼                    ▼
┌──────────────┐     ┌──────────────┐
│  [Entity]    │     │  [Entity]    │
└──────────────┘     └──────────────┘
```

## Tables / Collections

### users

| Champ | Type | Requis | Description |
|-------|------|--------|-------------|
| id | UUID | oui | Identifiant unique |
| email | string | oui | Email unique |
| password_hash | string | oui | Mot de passe hashe |
| display_name | string | oui | Nom affiche |
| avatar_url | string | non | URL photo de profil |
| role | enum | oui | Role utilisateur |
| created_at | timestamp | oui | Date de creation |
| updated_at | timestamp | oui | Derniere mise a jour |
| last_login_at | timestamp | non | Derniere connexion |
| push_token | string | non | Token notification push |
| preferences | json | non | Preferences utilisateur |

**Index** : email (unique), role
**Feature** : F01, F02

### [entity_name]

| Champ | Type | Requis | Description |
|-------|------|--------|-------------|
| id | UUID | oui | Identifiant unique |
| user_id | UUID (FK) | oui | Reference vers users |
| ... | ... | ... | ... |
| created_at | timestamp | oui | Date de creation |
| updated_at | timestamp | oui | Derniere mise a jour |

**Relations** : users (N:1)
**Index** : user_id, [champs de recherche]
**Feature** : F03

[Repeter pour chaque entite]

## Relations

| Table A | Relation | Table B | Description |
|---------|----------|---------|-------------|
| users | 1:N | [entity] | Un utilisateur a plusieurs [entities] |
| [entity_a] | N:M | [entity_b] | Via table de jointure [join_table] |

## Enums

### user_role
| Valeur | Description |
|--------|-------------|
| admin | Administrateur |
| user | Utilisateur standard |
| [role] | [Description] |

### [entity]_status
| Valeur | Description |
|--------|-------------|
| draft | Brouillon |
| active | Actif |
| archived | Archive |

## Donnees Offline

> Quelles donnees doivent etre disponibles hors connexion ?

| Table | Sync Strategy | Priorite |
|-------|--------------|----------|
| users (profil local) | Cache on login | Haute |
| [entity] | Sync on connect | Moyenne |
| [entity] | Online only | Basse |

## Mapping Features → Donnees

| Feature | Tables Impliquees | Operations |
|---------|------------------|------------|
| F01 | users | CREATE, READ |
| F02 | users | UPDATE |
| F03 | [entity], users | CRUD |
| ... | ... | ... |
```

### 2. auth-strategy.md

```markdown
# Auth Strategy - [Nom du Projet]

## Methodes d'Authentification

### Methode Principale
- **Type** : [Email/Password | OAuth | Magic Link]
- **Justification** : [Pourquoi ce choix]

### Methodes Secondaires
- [ ] Google OAuth
- [ ] Apple Sign-In (requis si iOS)
- [ ] Facebook Login
- [ ] Magic Link (email)

## Roles & Permissions

### Matrice de Permissions

| Action | admin | user | guest |
|--------|-------|------|-------|
| Lire [entity] publiques | V | V | V |
| Creer [entity] | V | V | X |
| Modifier ses [entities] | V | V | X |
| Modifier tout [entity] | V | X | X |
| Gerer utilisateurs | V | X | X |

### Regles Metier
- Un utilisateur ne peut modifier que ses propres [entities]
- Un admin peut tout modifier
- [Regle specifique au projet]

## Flow d'Authentification

```
App Launch
    │
    ├── Token valide ? → Ecran Principal
    │
    └── Pas de token / expire
            │
            ▼
        Ecran Login
            │
            ├── Email/Password → API /auth/login → Token JWT
            │
            ├── OAuth Provider → Redirect → Callback → Token JWT
            │
            └── Magic Link → Email → Click → Token JWT
                            │
                            ▼
                    Stockage Securise
                    (Keychain iOS / Keystore Android / httpOnly cookie PWA)
```

## Gestion des Tokens

| Element | Valeur |
|---------|--------|
| Type | JWT (access + refresh) |
| Duree access token | 15 minutes |
| Duree refresh token | 7 jours |
| Stockage | Keychain (iOS) / Keystore (Android) / httpOnly cookie (PWA) |
| Renouvellement | Silent refresh avant expiration |
| Revocation | Blacklist en base + refresh rotation |

## Securite

- [ ] Mots de passe hashes (bcrypt, min 10 rounds)
- [ ] Rate limiting sur /auth/* (5 tentatives / minute)
- [ ] HTTPS obligatoire
- [ ] Token rotation sur refresh
- [ ] Validation email obligatoire
- [ ] 2FA disponible (optionnel) : [Oui / Non]
```

## Instructions

1. **Analyser les features** depuis `features.md` pour identifier les entites de donnees
2. **Examiner les user flows** pour comprendre les operations CRUD necessaires
3. **Concevoir le schema** :
   - Tables/collections avec tous les champs, types et contraintes
   - Relations entre entites (1:1, 1:N, N:M)
   - Enums pour les champs a valeurs fixes
   - Index pour les requetes frequentes
4. **Definir la strategie offline** si applicable :
   - Quelles donnees cacher localement
   - Strategie de synchronisation (cache-first, sync-on-connect)
5. **Definir l'authentification** :
   - Methodes (email/password, OAuth, magic link)
   - Roles et matrice de permissions
   - Gestion des tokens (JWT, duree, stockage, renouvellement)
   - Mesures de securite

## Validation

- [ ] Toutes les entites identifiees depuis les features
- [ ] Chaque table a un id, created_at, updated_at
- [ ] Relations documentees avec cardinalite
- [ ] Index definis pour les requetes frequentes
- [ ] Enums documentes pour les champs a valeurs fixes
- [ ] Strategie offline definie (si applicable)
- [ ] Mapping features → tables complet
- [ ] Methode d'auth principale justifiee
- [ ] Matrice de permissions complete
- [ ] Gestion des tokens documentee (type, duree, stockage)
- [ ] Mesures de securite listees
- [ ] Aucun placeholder `[texte]` restant dans les outputs

## Prochaine Etape

Une fois `pipeline/output/03-data/` complet → Passer a `stages/A04-api-contracts.md`

Note : A03 et A04 peuvent etre executes en parallele si les user flows sont completes.

---

**Version** : 1.0
**Phase** : A03 (Architecture)
**Dependances** : A01 (Features), A02 (User Flows)
**Produit pour** : A04 (API Contracts)
