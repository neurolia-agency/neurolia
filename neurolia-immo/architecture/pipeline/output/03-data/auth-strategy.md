# Auth Strategy - Neurolia-Immo

## Methodes d'Authentification

### Methode Principale

- **Type** : Magic Link (email)
- **Fournisseur** : Supabase Auth
- **Justification** : Le persona Staff (Sarah) a un niveau technique basique — le magic link elimine la friction de creation/memorisation de mot de passe. Un seul clic sur le lien email pour se connecter. Pour le Owner (Marc), c'est egalement plus simple qu'un mot de passe classique pour un usage quotidien.

### Methodes Secondaires

- [x] Google OAuth — Option pour les owners qui preferent un login rapide via leur compte Google
- [ ] Apple Sign-In — A implementer si distribution iOS via App Store (requis par Apple)
- [ ] Facebook Login — Non prevu (pas de besoin identifie)
- [x] Magic Link (email) — Methode principale (voir ci-dessus)

### Inscription Staff

- **Flow specifique** : Le staff ne s'inscrit pas de maniere autonome
- **Invitation** : Le owner genere un lien/email d'invitation (table `staff_invitations`)
- **Inscription** : Le staff clique sur le lien → formulaire pre-rempli (owner_id fixe) → saisit prenom + confirme email → compte cree avec role `cleaning_staff`
- **Securite** : Le token d'invitation expire apres 7 jours et est a usage unique

---

## Roles & Permissions

### Definition des Roles

| Role | Description | Contexte d'usage |
|------|-------------|------------------|
| owner | Proprietaire de biens locatifs | Gestion complete de ses biens, equipe, reservations |
| cleaning_staff | Personnel d'entretien | Consultation planning, execution taches, signalement problemes |
| admin | Administrateur systeme | Acces global (futur, reserve a Neurolia) |

### Matrice de Permissions

| Action | owner | cleaning_staff | admin |
|--------|-------|----------------|-------|
| **Profil** | | | |
| Voir son profil | V | V | V |
| Modifier son profil | V | V | V |
| Voir profils de son equipe | V | X | V |
| **Proprietes** | | | |
| Creer un bien | V | X | V |
| Voir ses biens | V | Lecture seule (biens de son owner) | V |
| Modifier un bien | V | X | V |
| Supprimer un bien | V | X | V |
| Voir infos bien (adresse, code, WiFi) | V | V (read-only) | V |
| **Reservations** | | | |
| Voir les reservations | V | X | V |
| Creer reservation manuelle | V | X | V |
| Modifier une reservation | V | X | V |
| Resoudre une anomalie | V | X | V |
| **Taches** | | | |
| Voir toutes les taches | V | Uniquement ses taches assignees | V |
| Creer une tache | V | X | V |
| Assigner une tache | V | X | V |
| Demarrer une tache | V | V (si assignee) | V |
| Completer une tache | V | V (si assignee) | V |
| Valider checklist | V | V (si assignee) | V |
| Ajouter photos | V | V (si assignee) | V |
| **Issues** | | | |
| Signaler un probleme | V | V | V |
| Voir les problemes | V | Ses propres signalements | V |
| Resoudre un probleme | V | X | V |
| **Equipe** | | | |
| Inviter du staff | V | X | V |
| Voir son equipe | V | X | V |
| Desactiver un staff | V | X | V |
| **Livret d'accueil** | | | |
| Creer/modifier livret | V | X | V |
| Voir livret (public) | V | V | V |
| **Notifications** | | | |
| Recevoir notifications | V | V | V |
| Marquer comme lu | V | V | V |
| **KPIs & Analytics** | | | |
| Voir dashboard KPIs | V | X | V |
| Voir calendrier multi-biens | V | X | V |

### Regles Metier

1. Un owner ne peut voir et gerer que ses propres donnees (isolation RLS via `owner_id`)
2. Un staff ne voit que les taches qui lui sont assignees et les infos des biens correspondants
3. Un staff ne peut pas creer de reservations, biens ou taches — il execute uniquement
4. Le staff accede aux infos bien (adresse, code acces, WiFi) en lecture seule pour ses interventions
5. Les photos et signalements du staff sont visibles par le owner du bien concerne
6. Un admin peut voir toutes les donnees de tous les owners (acces support technique)
7. L'inscription staff est toujours initiee par un owner via invitation (jamais d'inscription autonome)

---

## Flow d'Authentification

### Owner

```
App Launch
    │
    ├── Token JWT valide (non expire) ?
    │       │
    │       └── OUI → Dashboard Owner
    │
    └── NON (pas de token / expire / premier lancement)
            │
            ▼
        Ecran Login
            │
            ├── Magic Link
            │     │
            │     ├── Saisie email → POST /auth/magiclink → Email envoye
            │     │
            │     └── Clic lien email → Callback /auth/callback → Token JWT
            │
            └── Google OAuth
                  │
                  ├── Bouton "Continuer avec Google"
                  │
                  └── Google Auth Flow → Callback → Token JWT
                          │
                          ▼
                  Profil existe ?
                  ├── OUI → Dashboard Owner
                  └── NON → Creation profil (role: owner) → Dashboard Owner
```

### Staff

```
Lien d'Invitation
    │
    ├── Token invitation valide ?
    │       │
    │       ├── NON → Page "Invitation expiree"
    │       │
    │       └── OUI → Formulaire Inscription Staff
    │                     │
    │                     ├── Saisie : prenom, email
    │                     │   (owner_id pre-rempli via token)
    │                     │
    │                     └── Supabase Auth signup (magic link)
    │                               │
    │                               ▼
    │                         Email magic link → Clic → Callback
    │                               │
    │                               ▼
    │                         Creation profil (role: cleaning_staff, owner_id: X)
    │                               │
    │                               ▼
    │                         Planning Staff (ecran principal)
    │
    └── Connexions suivantes
            │
            ├── Ecran Login (meme que Owner)
            │
            └── Magic Link → Callback → Detection role
                    │
                    ├── role = owner → Dashboard Owner
                    └── role = cleaning_staff → Planning Staff
```

### Logout

```
Parametres → Bouton Deconnexion
    │
    ├── POST /auth/logout
    │
    ├── Suppression tokens locaux
    │   (Keychain iOS / Keystore Android / Cookies PWA)
    │
    ├── Invalidation refresh token en base
    │
    └── Redirect → Ecran Login
```

---

## Gestion des Tokens

| Element | Valeur |
|---------|--------|
| Type | JWT (access + refresh) — gere par Supabase Auth |
| Duree access token | 1 heure (Supabase default, configurable) |
| Duree refresh token | 7 jours |
| Stockage iOS | Keychain (via expo-secure-store ou equivalent) |
| Stockage Android | Keystore (via expo-secure-store ou equivalent) |
| Stockage PWA | httpOnly cookie (Supabase SSR helper) |
| Renouvellement | Silent refresh automatique par Supabase client avant expiration |
| Revocation | `auth.signOut()` invalide le refresh token cote serveur |
| Claims JWT | `sub` (user ID), `email`, `role` (via app_metadata), `aud` |

### Token Refresh Flow

```
Request API
    │
    ├── Access token valide ? → Requete autorisee
    │
    └── Access token expire ?
            │
            ├── Refresh token valide ?
            │       │
            │       └── OUI → Supabase auto-refresh → Nouveau access token → Requete autorisee
            │
            └── Refresh token expire ?
                    │
                    └── Redirect → Ecran Login (re-authentification requise)
```

### Role dans le JWT

Le role utilisateur est stocke dans `app_metadata` du JWT Supabase :

```json
{
  "sub": "uuid-user-id",
  "email": "marc@exemple.fr",
  "app_metadata": {
    "role": "owner"
  },
  "user_metadata": {
    "display_name": "Marc"
  }
}
```

> **Note** : `app_metadata` ne peut etre modifie que cote serveur (Edge Function ou service_role key), pas par le client. Cela garantit que le role ne peut pas etre usurpe.

---

## RLS (Row Level Security) — Strategie

### Principe General

Chaque table avec `owner_id` utilise deux niveaux de policies :

**Pour le Owner** :
```sql
-- Le owner voit/modifie ses propres donnees
CREATE POLICY "owner_isolation" ON [table]
  FOR ALL
  USING (owner_id = auth.uid());
```

**Pour le Staff** :
```sql
-- Le staff voit les donnees de son owner (lecture seule par defaut)
CREATE POLICY "staff_read_via_owner" ON [table]
  FOR SELECT
  USING (
    owner_id = (SELECT owner_id FROM profiles WHERE id = auth.uid())
  );
```

### Policies Specifiques

| Table | Owner | Staff | Public |
|-------|-------|-------|--------|
| profiles | CRUD (son profil + READ equipe) | READ (son propre profil) | X |
| properties | CRUD | SELECT (infos bien de son owner) | X |
| reservations | CRUD | X | X |
| cleaning_tasks | CRUD | SELECT (ses taches), UPDATE (status, checklist) | X |
| task_checklist_items | CRUD | SELECT + UPDATE (ses taches) | X |
| task_photos | CRUD | INSERT + SELECT (ses taches) | X |
| issues | SELECT + UPDATE | INSERT + SELECT (ses signalements) | X |
| anomalies | CRUD | X | X |
| staff_invitations | CRUD | X | X |
| notifications | SELECT + UPDATE (is_read) | SELECT + UPDATE (is_read) | X |
| welcome_guides | CRUD | X | SELECT (si is_published = true) |
| property_checklists | CRUD | SELECT (biens de son owner) | X |
| sync_logs | SELECT | X | X |

---

## Securite

### Checklist

- [x] Magic Link : pas de mot de passe a stocker/hacher — Supabase Auth gere le flow complet
- [x] Rate limiting sur /auth/* : 5 tentatives / minute (configurable via Supabase Dashboard)
- [x] HTTPS obligatoire : force par Vercel (frontend) et Supabase (backend)
- [x] Token rotation : refresh token rotation active (Supabase Auth config)
- [x] Validation email : implicite avec Magic Link (l'email est la methode d'auth)
- [x] RLS active sur toutes les tables : isolation multi-tenant stricte
- [x] `service_role` key uniquement cote serveur : Edge Functions et n8n (jamais expose au client)
- [x] API keys segmentees : `anon` key pour le client, `service_role` pour n8n/backend
- [x] CORS configure : domaines autorises uniquement
- [ ] 2FA disponible : Non (Phase 2, optionnel pour owners)
- [ ] Audit log : Non (Phase 2, journalisation des actions sensibles)

### Protection des Donnees Sensibles

| Donnee | Stockage | Acces |
|--------|----------|-------|
| Credentials IMAP | Variables d'environnement n8n | n8n uniquement |
| Code acces bien | Table `properties` (chiffrement applicatif optionnel Phase 2) | Owner + Staff assigne |
| WiFi password | Table `properties` | Owner + Staff assigne |
| Photos taches | Supabase Storage (bucket prive) | Owner + Staff auteur |
| Tokens invitation | Table `staff_invitations` (usage unique + expiration) | Systeme uniquement |

### Webhook Security (n8n → Supabase)

| Element | Valeur |
|---------|--------|
| Authentification | Header `x-api-key` avec cle partagee |
| Validation | Verification de la cle dans l'Edge Function ou middleware Next.js |
| Transport | HTTPS obligatoire |
| Idempotence | Chaque webhook inclut un `idempotency_key` pour eviter les doublons |

---

*Derniere mise a jour : 2026-02-19*
