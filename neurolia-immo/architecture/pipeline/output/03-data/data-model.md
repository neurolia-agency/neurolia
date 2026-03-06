# Data Model - Neurolia-Immo

## Vue d'Ensemble

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   profiles   │────<│  properties  │>────│  reservations│
└──────────────┘     └──────────────┘     └──────────────┘
       │                    │                    │
       │                    │                    │
       ▼                    ▼                    ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│staff_invit.  │     │property_     │     │cleaning_tasks│
└──────────────┘     │checklists    │     └──────────────┘
       │              └──────────────┘           │
       │                    │              ┌─────┴─────┐
       ▼                    │              ▼           ▼
┌──────────────┐            │       ┌──────────┐ ┌──────────┐
│notifications │            │       │task_check│ │task_     │
└──────────────┘            │       │list_items│ │photos    │
                            │       └──────────┘ └──────────┘
                            ▼
                     ┌──────────────┐     ┌──────────────┐
                     │welcome_guides│     │  anomalies   │
                     └──────────────┘     └──────────────┘
                                          ┌──────────────┐
                                          │  sync_logs   │
                                          └──────────────┘
                                          ┌──────────────┐
                                          │   issues     │
                                          └──────────────┘
```

> **Convention** : Toutes les tables utilisent `owner_id` pour l'isolation multi-tenant via RLS Supabase (F09).
> Les tables `profiles`, `staff_invitations` et `notifications` utilisent `user_id` directement.

---

## Tables / Collections

### profiles

> Extension de `auth.users` Supabase. Le profil applicatif est separe de l'authentification.

| Champ | Type | Requis | Description |
|-------|------|--------|-------------|
| id | UUID | oui | FK vers auth.users.id (PK) |
| email | text | oui | Email (copie de auth.users.email) |
| display_name | text | oui | Nom affiche |
| avatar_url | text | non | URL photo de profil (Supabase Storage) |
| phone | text | non | Telephone |
| role | enum (user_role) | oui | Role : owner, cleaning_staff, admin |
| owner_id | UUID (FK) | non | Pour staff : reference vers le proprietaire (NULL pour owners) |
| push_token | text | non | Token Web Push (Phase 2) |
| preferences | jsonb | non | Preferences utilisateur (langue, notifications) |
| is_active | boolean | oui | Compte actif (default: true) |
| created_at | timestamptz | oui | Date de creation |
| updated_at | timestamptz | oui | Derniere mise a jour |
| last_login_at | timestamptz | non | Derniere connexion |

**Index** : id (PK), email (unique), role, owner_id
**RLS** : owner voit son profil + profils de son staff ; staff voit son propre profil
**Feature** : F01, F09

---

### properties

| Champ | Type | Requis | Description |
|-------|------|--------|-------------|
| id | UUID | oui | Identifiant unique (PK) |
| owner_id | UUID (FK) | oui | Reference vers profiles.id (proprietaire) |
| name | text | oui | Nom du bien (ex: "Studio Marais") |
| address | text | oui | Adresse complete |
| city | text | non | Ville |
| postal_code | text | non | Code postal |
| country | text | non | Pays (default: France) |
| access_code | text | non | Code d'acces (digicode, boite a cles) |
| wifi_ssid | text | non | Nom du reseau WiFi |
| wifi_password | text | non | Mot de passe WiFi |
| instructions | text | non | Consignes generales pour le staff |
| max_guests | integer | non | Capacite maximale |
| ical_airbnb_url | text | non | URL du flux iCal Airbnb |
| ical_booking_url | text | non | URL du flux iCal Booking |
| imap_host | text | non | Serveur IMAP pour parsing email |
| imap_email | text | non | Adresse email IMAP |
| check_in_mode | enum: check_in_mode | oui | Mode d'accueil voyageur (auto-gestion ou accueil personnel) (default: self_checkin) |
| imap_configured | boolean | oui | IMAP configure (default: false) |
| is_active | boolean | oui | Bien actif (default: true) |
| created_at | timestamptz | oui | Date de creation |
| updated_at | timestamptz | oui | Derniere mise a jour |

**Index** : id (PK), owner_id, is_active
**RLS** : owner voit ses propres biens ; staff voit les biens de son owner (via profiles.owner_id)
**Feature** : F02, F03, F04, F11

> **Note securite** : `imap_host` et `imap_email` sont stockes en base. Les credentials IMAP (mot de passe) sont dans les variables d'environnement n8n, jamais en base.

---

### property_checklists

> Templates de checklist reutilisables par bien. Copies dans `task_checklist_items` a la creation d'une tache.

| Champ | Type | Requis | Description |
|-------|------|--------|-------------|
| id | UUID | oui | Identifiant unique (PK) |
| property_id | UUID (FK) | oui | Reference vers properties.id |
| owner_id | UUID (FK) | oui | Reference vers profiles.id (denormalise pour RLS) |
| type | enum (task_type) | oui | checkin_prep, checkout_clean ou check_in_greeting |
| items | jsonb | oui | Liste ordonnee [{label, order}] |
| created_at | timestamptz | oui | Date de creation |
| updated_at | timestamptz | oui | Derniere mise a jour |

**Index** : id (PK), property_id, type
**RLS** : owner voit/modifie ses propres checklists ; staff lecture seule
**Feature** : F02, F07

---

### reservations

| Champ | Type | Requis | Description |
|-------|------|--------|-------------|
| id | UUID | oui | Identifiant unique (PK) |
| property_id | UUID (FK) | oui | Reference vers properties.id |
| owner_id | UUID (FK) | oui | Reference vers profiles.id (denormalise pour RLS) |
| platform | enum (reservation_platform) | oui | airbnb, booking, manual |
| platform_ref_id | text | non | Code de confirmation plateforme |
| status | enum (reservation_status) | oui | confirmed, modified, cancelled, pending |
| source | enum (reservation_source) | oui | Source initiale : ical, email, manual |
| guest_name | text | non | Nom du voyageur |
| guest_email | text | non | Email voyageur (si disponible) |
| nb_guests | integer | non | Nombre de voyageurs |
| check_in | date | oui | Date d'arrivee |
| check_out | date | oui | Date de depart |
| amount | numeric(10,2) | non | Montant de la reservation |
| special_requests | text | non | Demandes particulieres |
| arrival_time | time | non | Heure d'arrivee prevue |
| reconciliation_status | enum (reconciliation_status) | oui | pending, matched, conflict, manual |
| reconciliation_confidence | numeric(3,2) | non | Score de confiance (0.00 a 1.00) |
| ical_uid | text | non | UID de l'evenement iCal (pour matching) |
| email_message_id | text | non | Message-ID email (pour deduplication) |
| raw_ical_data | jsonb | non | Donnees brutes iCal (debug) |
| raw_email_data | jsonb | non | Donnees brutes email parsing (debug) |
| created_at | timestamptz | oui | Date de creation |
| updated_at | timestamptz | oui | Derniere mise a jour |

**Index** : id (PK), property_id, owner_id, check_in, check_out, platform_ref_id, ical_uid, status
**Contrainte** : UNIQUE(property_id, platform, platform_ref_id) pour eviter les doublons
**RLS** : owner voit ses propres reservations ; staff ne voit PAS les reservations directement
**Feature** : F03, F04, F05, F06

---

### cleaning_tasks

| Champ | Type | Requis | Description |
|-------|------|--------|-------------|
| id | UUID | oui | Identifiant unique (PK) |
| reservation_id | UUID (FK) | non | Reference vers reservations.id (NULL si tache ad-hoc) |
| property_id | UUID (FK) | oui | Reference vers properties.id |
| owner_id | UUID (FK) | oui | Reference vers profiles.id (denormalise pour RLS) |
| assigned_to | UUID (FK) | non | Reference vers profiles.id (staff assigne, NULL si non assigne) |
| type | enum (task_type) | oui | checkin_prep, checkout_clean, check_in_greeting, ad_hoc |
| status | enum (task_status) | oui | pending, in_progress, completed (default: pending) |
| scheduled_date | date | oui | Date prevue |
| scheduled_time | time | non | Heure prevue |
| started_at | timestamptz | non | Debut effectif |
| completed_at | timestamptz | non | Fin effective |
| notes | text | non | Notes libres |
| created_at | timestamptz | oui | Date de creation |
| updated_at | timestamptz | oui | Derniere mise a jour |

**Index** : id (PK), property_id, owner_id, assigned_to, scheduled_date, status
**RLS** : owner voit toutes les taches de ses biens ; staff voit uniquement ses taches assignees
**Feature** : F07, F08, F12

---

### task_checklist_items

> Items de checklist instancies pour une tache specifique (copie depuis property_checklists.items).

| Champ | Type | Requis | Description |
|-------|------|--------|-------------|
| id | UUID | oui | Identifiant unique (PK) |
| task_id | UUID (FK) | oui | Reference vers cleaning_tasks.id |
| label | text | oui | Intitule de l'item |
| is_done | boolean | oui | Coche (default: false) |
| sort_order | integer | oui | Ordre d'affichage |
| completed_at | timestamptz | non | Horodatage de la validation |
| created_at | timestamptz | oui | Date de creation |

**Index** : id (PK), task_id, sort_order
**RLS** : herite de cleaning_tasks (via join sur task_id → owner_id)
**Feature** : F07

---

### task_photos

> Photos prises par le staff pendant une intervention (preuve de travail).

| Champ | Type | Requis | Description |
|-------|------|--------|-------------|
| id | UUID | oui | Identifiant unique (PK) |
| task_id | UUID (FK) | oui | Reference vers cleaning_tasks.id |
| checklist_item_id | UUID (FK) | non | Reference vers task_checklist_items.id (photo liee a un item) |
| storage_path | text | oui | Chemin dans Supabase Storage |
| caption | text | non | Legende optionnelle |
| uploaded_at | timestamptz | oui | Date d'upload |

**Index** : id (PK), task_id
**RLS** : herite de cleaning_tasks (via join sur task_id → owner_id)
**Feature** : F07

---

### issues

> Signalements de problemes par le staff pendant une intervention.

| Champ | Type | Requis | Description |
|-------|------|--------|-------------|
| id | UUID | oui | Identifiant unique (PK) |
| task_id | UUID (FK) | non | Reference vers cleaning_tasks.id (si lie a une tache) |
| property_id | UUID (FK) | oui | Reference vers properties.id |
| owner_id | UUID (FK) | oui | Reference vers profiles.id (denormalise pour RLS) |
| reported_by | UUID (FK) | oui | Reference vers profiles.id (staff qui signale) |
| type | enum (issue_type) | oui | leak, breakage, missing, other |
| description | text | oui | Description du probleme |
| photo_path | text | non | Chemin dans Supabase Storage |
| status | enum (issue_status) | oui | open, acknowledged, resolved (default: open) |
| resolved_at | timestamptz | non | Date de resolution |
| created_at | timestamptz | oui | Date de creation |
| updated_at | timestamptz | oui | Derniere mise a jour |

**Index** : id (PK), property_id, owner_id, status, reported_by
**RLS** : owner voit les issues de ses biens ; staff voit les issues qu'il a signalees
**Feature** : F07

---

### anomalies

> Anomalies detectees lors de la reconciliation iCal/email ou du monitoring.

| Champ | Type | Requis | Description |
|-------|------|--------|-------------|
| id | UUID | oui | Identifiant unique (PK) |
| property_id | UUID (FK) | oui | Reference vers properties.id |
| owner_id | UUID (FK) | oui | Reference vers profiles.id (denormalise pour RLS) |
| type | enum (anomaly_type) | oui | double_reservation, missing_reservation, date_mismatch, sync_failure |
| reservation_a_id | UUID (FK) | non | Premiere reservation impliquee |
| reservation_b_id | UUID (FK) | non | Seconde reservation impliquee (double-reservation) |
| description | text | oui | Description de l'anomalie |
| status | enum (anomaly_status) | oui | pending, resolved, false_positive (default: pending) |
| resolved_at | timestamptz | non | Date de resolution |
| resolved_by | UUID (FK) | non | Reference vers profiles.id (qui a resolu) |
| created_at | timestamptz | oui | Date de creation |
| updated_at | timestamptz | oui | Derniere mise a jour |

**Index** : id (PK), property_id, owner_id, status, type
**RLS** : owner voit les anomalies de ses biens
**Feature** : F05, F06

---

### staff_invitations

> Invitations envoyees par un owner pour ajouter du staff a son equipe.

| Champ | Type | Requis | Description |
|-------|------|--------|-------------|
| id | UUID | oui | Identifiant unique (PK) |
| owner_id | UUID (FK) | oui | Reference vers profiles.id (proprietaire qui invite) |
| email | text | non | Email du staff invite (optionnel, peut etre un lien generique) |
| token | text | oui | Token unique d'invitation (URL) |
| status | enum (invitation_status) | oui | pending, accepted, expired (default: pending) |
| accepted_by | UUID (FK) | non | Reference vers profiles.id (staff qui a accepte) |
| expires_at | timestamptz | oui | Date d'expiration (default: +7 jours) |
| created_at | timestamptz | oui | Date de creation |

**Index** : id (PK), token (unique), owner_id, status
**RLS** : owner voit ses propres invitations
**Feature** : F01

---

### notifications

> Notifications internes (in-app + email). Push Web prevu Phase 2.

| Champ | Type | Requis | Description |
|-------|------|--------|-------------|
| id | UUID | oui | Identifiant unique (PK) |
| user_id | UUID (FK) | oui | Reference vers profiles.id (destinataire) |
| type | enum (notification_type) | oui | new_reservation, cancellation, anomaly, task_assigned, task_completed, issue_reported, sync_failure, daily_digest |
| title | text | oui | Titre court |
| body | text | oui | Contenu de la notification |
| data | jsonb | non | Donnees pour deep link (ex: {screen: "reservation", id: "..."}) |
| is_read | boolean | oui | Lu (default: false) |
| created_at | timestamptz | oui | Date de creation |

**Index** : id (PK), user_id, is_read, created_at DESC
**RLS** : chaque utilisateur voit uniquement ses propres notifications
**Feature** : F10

---

### welcome_guides

> Livret d'accueil digital par bien. Page publique accessible sans authentification.

| Champ | Type | Requis | Description |
|-------|------|--------|-------------|
| id | UUID | oui | Identifiant unique (PK) |
| property_id | UUID (FK) | oui | Reference vers properties.id (unique) |
| owner_id | UUID (FK) | oui | Reference vers profiles.id (denormalise pour RLS) |
| slug | text | oui | Slug unique pour l'URL publique |
| content | jsonb | oui | Contenu structure (voir schema ci-dessous) |
| qr_code_url | text | non | URL du QR code genere (Supabase Storage) |
| is_published | boolean | oui | Publie (default: false) |
| created_at | timestamptz | oui | Date de creation |
| updated_at | timestamptz | oui | Derniere mise a jour |

**Schema `content`** :
```json
{
  "wifi": { "ssid": "...", "password": "..." },
  "house_rules": ["..."],
  "useful_numbers": [{ "label": "...", "number": "..." }],
  "local_recommendations": [{ "name": "...", "type": "...", "address": "..." }],
  "custom_sections": [{ "title": "...", "body": "..." }]
}
```

**Index** : id (PK), property_id (unique), slug (unique)
**RLS** : owner edite son livret ; lecture publique pour les visiteurs (pas d'auth requise)
**Feature** : F11

---

### sync_logs

> Journal de synchronisation iCal et email pour monitoring et debug.

| Champ | Type | Requis | Description |
|-------|------|--------|-------------|
| id | UUID | oui | Identifiant unique (PK) |
| property_id | UUID (FK) | oui | Reference vers properties.id |
| owner_id | UUID (FK) | oui | Reference vers profiles.id (denormalise pour RLS) |
| source | enum (sync_source) | oui | ical_airbnb, ical_booking, email_imap |
| status | enum (sync_status) | oui | success, partial, failure |
| events_processed | integer | oui | Nombre d'evenements traites (default: 0) |
| events_created | integer | oui | Reservations creees (default: 0) |
| events_updated | integer | oui | Reservations modifiees (default: 0) |
| error_message | text | non | Message d'erreur si echec |
| duration_ms | integer | non | Duree de la sync en ms |
| synced_at | timestamptz | oui | Horodatage de la synchronisation |

**Index** : id (PK), property_id, source, synced_at DESC
**RLS** : owner voit les logs de ses biens
**Feature** : F03, F04

---

## Relations

| Table A | Relation | Table B | Description |
|---------|----------|---------|-------------|
| profiles | 1:N | profiles | Un owner a plusieurs staff (via owner_id) |
| profiles | 1:N | properties | Un owner a plusieurs biens |
| profiles | 1:N | staff_invitations | Un owner envoie plusieurs invitations |
| profiles | 1:N | notifications | Un utilisateur a plusieurs notifications |
| profiles | 1:N | cleaning_tasks | Un staff est assigne a plusieurs taches |
| properties | 1:N | reservations | Un bien a plusieurs reservations |
| properties | 1:N | cleaning_tasks | Un bien a plusieurs taches |
| properties | 1:N | property_checklists | Un bien a plusieurs templates de checklist |
| properties | 1:1 | welcome_guides | Un bien a un livret d'accueil |
| properties | 1:N | anomalies | Un bien a plusieurs anomalies |
| properties | 1:N | issues | Un bien a plusieurs signalements |
| properties | 1:N | sync_logs | Un bien a plusieurs logs de sync |
| reservations | 1:N | cleaning_tasks | Une reservation genere 1-3 taches (checkout_clean + checkin_prep optionnel + check_in_greeting optionnel) |
| reservations | 0:N | anomalies | Une reservation peut etre impliquee dans des anomalies |
| cleaning_tasks | 1:N | task_checklist_items | Une tache a plusieurs items de checklist |
| cleaning_tasks | 1:N | task_photos | Une tache a plusieurs photos |
| cleaning_tasks | 0:N | issues | Une tache peut avoir des signalements de problemes |

---

## Enums

### user_role
| Valeur | Description |
|--------|-------------|
| owner | Proprietaire de biens locatifs |
| cleaning_staff | Personnel d'entretien |
| admin | Administrateur systeme (futur) |

### reservation_platform
| Valeur | Description |
|--------|-------------|
| airbnb | Reservation Airbnb |
| booking | Reservation Booking.com |
| manual | Reservation saisie manuellement |

### reservation_status
| Valeur | Description |
|--------|-------------|
| pending | En attente de confirmation |
| confirmed | Confirmee |
| modified | Modifiee (dates ou details changes) |
| cancelled | Annulee |

### reservation_source
| Valeur | Description |
|--------|-------------|
| ical | Importee via flux iCal |
| email | Importee via parsing email IMAP |
| manual | Saisie manuelle par le owner |

### reconciliation_status
| Valeur | Description |
|--------|-------------|
| pending | En attente de reconciliation |
| matched | iCal et email reconcilies (confiance > 0.8) |
| conflict | Conflit detecte (donnees contradictoires) |
| manual | Reconciliation manuelle par le owner |

### task_type
| Valeur | Description |
|--------|-------------|
| checkin_prep | Preparation avant arrivee |
| checkout_clean | Menage apres depart |
| check_in_greeting | Accueil voyageur par le personnel |
| ad_hoc | Tache ponctuelle (intervention, reparation) |

### task_status
| Valeur | Description |
|--------|-------------|
| pending | A faire |
| in_progress | En cours |
| completed | Termine |

### issue_type
| Valeur | Description |
|--------|-------------|
| leak | Fuite d'eau |
| breakage | Casse / degradation |
| missing | Objet manquant |
| other | Autre probleme |

### issue_status
| Valeur | Description |
|--------|-------------|
| open | Signale, non traite |
| acknowledged | Pris en compte par le owner |
| resolved | Resolu |

### anomaly_type
| Valeur | Description |
|--------|-------------|
| double_reservation | Deux reservations sur les memes dates |
| missing_reservation | Reservation presente sur une source mais pas l'autre |
| date_mismatch | Dates differentes entre iCal et email |
| sync_failure | Echec de synchronisation (iCal ou IMAP) |

### anomaly_status
| Valeur | Description |
|--------|-------------|
| pending | En attente de traitement |
| resolved | Resolu par le owner |
| false_positive | Faux positif (ecarte) |

### invitation_status
| Valeur | Description |
|--------|-------------|
| pending | En attente d'acceptation |
| accepted | Acceptee |
| expired | Expiree |

### notification_type
| Valeur | Description |
|--------|-------------|
| new_reservation | Nouvelle reservation detectee |
| cancellation | Annulation detectee |
| anomaly | Anomalie detectee (double-reservation, etc.) |
| task_assigned | Nouvelle tache assignee (staff) |
| task_completed | Tache terminee (owner) |
| issue_reported | Probleme signale par le staff |
| sync_failure | Echec de synchronisation |
| daily_digest | Resume quotidien |

### sync_source
| Valeur | Description |
|--------|-------------|
| ical_airbnb | Flux iCal Airbnb |
| ical_booking | Flux iCal Booking.com |
| email_imap | Email IMAP (parsing) |

### check_in_mode
| Valeur | Description |
|--------|-------------|
| self_checkin | Le voyageur s'enregistre seul (livret d'accueil + code d'acces) |
| staff_checkin | Le personnel accueille le voyageur sur place |

### sync_status
| Valeur | Description |
|--------|-------------|
| success | Synchronisation reussie |
| partial | Partiellement reussie (certains evenements en echec) |
| failure | Echec complet |

---

## Donnees Offline

> Mode hors-connexion : Phase 2 (F22). Strategie preparee.

| Table | Sync Strategy | Priorite | Justification |
|-------|--------------|----------|---------------|
| profiles (profil local) | Cache on login | Haute | Nom, role necessaires offline |
| cleaning_tasks (assignees) | Sync on connect | Haute | Staff doit voir son planning meme offline |
| task_checklist_items | Sync on connect | Haute | Staff doit pouvoir cocher les items offline |
| properties (infos bien) | Cache on access | Moyenne | Adresse, code acces necessaires sur le terrain |
| task_photos | Queue upload | Moyenne | Photos mises en file d'attente si pas de reseau |
| reservations | Online only | Basse | Owner consulte en temps reel |
| anomalies | Online only | Basse | Consultation non critique offline |
| notifications | Online only | Basse | Necessitent connectivite |

> **Pattern de sync (Phase 2)** : Les modifications offline sont stockees localement avec un timestamp, puis synchronisees en FIFO a la reconnexion. Conflit resolu par "last write wins" avec alerte si conflit detecte.

---

## Mapping Features → Donnees

| Feature | Tables Impliquees | Operations |
|---------|------------------|------------|
| F01 (Auth & Roles) | profiles, staff_invitations | CREATE profil, READ/UPDATE profil, CREATE invitation, UPDATE invitation (accept) |
| F02 (Gestion Proprietes) | properties, property_checklists | CRUD properties, CRUD property_checklists |
| F03 (Ingestion iCal) | reservations, sync_logs | CREATE/UPDATE reservations (upsert), CREATE sync_logs |
| F04 (Ingestion Email) | reservations, sync_logs | UPDATE reservations (enrichissement), CREATE sync_logs |
| F05 (Reconciliation) | reservations, anomalies | UPDATE reservations (reconciliation_status), CREATE anomalies |
| F06 (Dashboard Proprio) | reservations, cleaning_tasks, anomalies, properties | READ reservations, READ cleaning_tasks (statut menage), READ anomalies, READ properties |
| F07 (Dashboard Entretien) | cleaning_tasks, task_checklist_items, task_photos, issues, properties | READ cleaning_tasks, UPDATE task status, UPDATE checklist items, CREATE photos, CREATE issues, READ properties (infos bien) |
| F08 (Planning Intelligent) | cleaning_tasks, profiles | READ staff disponibilites, UPDATE cleaning_tasks (assigned_to) |
| F09 (Multi-tenant) | toutes les tables | RLS via owner_id sur toutes les tables |
| F10 (Notifications) | notifications | CREATE notifications, UPDATE is_read |
| F11 (Livret Accueil) | welcome_guides | CRUD welcome_guides, READ publique (sans auth) |
| F12 (Creation Auto Taches) | cleaning_tasks, task_checklist_items, reservations | CREATE cleaning_tasks, CREATE task_checklist_items (copie depuis property_checklists) |

---

## Notes d'Implementation Supabase

### RLS (Row Level Security)

Chaque table avec `owner_id` utilise des policies RLS :
- **SELECT** : `owner_id = auth.uid()` (owner) OU `owner_id = (SELECT owner_id FROM profiles WHERE id = auth.uid())` (staff)
- **INSERT/UPDATE/DELETE** : `owner_id = auth.uid()` (owner uniquement, sauf exceptions staff)

### Supabase Realtime

Tables avec abonnement Realtime active :
- `cleaning_tasks` : owner surveille le statut des taches en temps reel
- `notifications` : alerte instantanee pour les deux personas
- `reservations` : mise a jour live du dashboard

### Supabase Storage

Buckets :
- `task-photos` : Photos d'intervention (prive, acces via RLS)
- `avatars` : Photos de profil (prive)
- `welcome-guides` : Assets des livrets d'accueil (public pour les publiees)
- `qr-codes` : QR codes generes (public)

---

*Derniere mise a jour : 2026-02-19*
