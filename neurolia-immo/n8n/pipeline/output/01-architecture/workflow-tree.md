# Arbre des Workflows — Neurolia-Immo v2

## Vue d'ensemble

Total : **8 workflows actifs** + **2 deprecated (WF05, WF06)** + **0 sub-workflows**

### Couverture Features

| Feature | Workflow(s) | Role |
|---------|------------|------|
| F01 (Auth & Roles) | WF07 | Email bienvenue, init apres inscription |
| F02 (Gestion Proprietes) | WF02 | Demarrage sync iCal a la creation |
| F03 (Ingestion iCal) | WF02 | Fetch + parse iCal periodique |
| F04 (Ingestion Email) | WF01 | Parse emails IMAP, extraction donnees |
| F05 (Reconciliation) | WF01, WF02 | Envoi donnees → reconciliation cote API |
| F06 (Dashboard Proprio) | WF03 | Digest quotidien owner |
| F07 (Dashboard Entretien) | WF03, WF04 | Planning staff + creation taches |
| F08 (Planning Intelligent) | WF04 | Assignation round-robin |
| F09 (Multi-tenant) | -- | Gere par RLS Supabase (pas n8n) |
| F10 (Notifications) | WF03, ~~WF05~~ (DEPRECATED v2.1), WF07, WF08 | Emails multi-types |
| F11 (Livret Accueil) | -- | Page publique statique (pas de workflow n8n) |
| F12 (Creation Auto Taches) | WF04 | Creation taches sur checkout detecte |
| Transversal | WF00, WF09 | Error handling + health monitoring |

## Arbre

```
Neurolia-Immo n8n Workflows (v2)
│
├── WF00 — Error Handler
│   ├── Trigger: Error Trigger (from all workflows)
│   └── Action: Email alerte admin/owner
│
├── WF01 — Email Parser
│   ├── Trigger 1: IMAP Polling (*/2 min)
│   ├── Trigger 2: Webhook /webhook/imap-configured
│   ├── Action: Parse Airbnb/Booking → POST /api/webhooks/n8n/reservation
│   └── Appelle: WF04 (creation tache sur nouvelle reservation)
│
├── WF02 — iCal Sync
│   ├── Trigger 1: Schedule (*/30 min)
│   ├── Trigger 2: Webhook /webhook/property-created
│   ├── Action: Fetch iCal → compare DB → detect anomalies
│   └── Action: POST /api/webhooks/n8n/reservation + /api/webhooks/n8n/ical-alert
│
├── WF03 — Daily Notifications
│   ├── Trigger 1: Schedule 07:00 CET (planning staff)
│   ├── Trigger 2: Schedule 08:00 CET (digest owner)
│   └── Action: Emails SMTP (planning individuel staff + resume owner)
│
├── WF04 — Cleaning Tasks Creator
│   ├── Trigger: Webhook /webhook/wf04-cleaning-task
│   ├── Action: Create checkin_prep + checkout_clean → assign staff → notify
│   └── Appele par: WF01
│
├── WF05 — Guest Auto Messages (DEPRECATED v2.1)
│   ├── Trigger 1: Schedule 10:00 CET (pre-arrivee J-1) (DEPRECATED)
│   ├── Trigger 2: Schedule 14:00 CET (post-depart J+0) (DEPRECATED)
│   └── Action: Emails SMTP aux guests (bienvenue + remerciement) (DEPRECATED)
│   └── Raison: PRD interdit emails voyageurs directs
│
├── WF06 — Check-in Form Alert (DEPRECATED v2.2)
│   ├── Trigger: Webhook /webhook/wf06-checkin-notify (DEPRECATED)
│   └── Action: Detection priorite → email owner (standard/urgent) (DEPRECATED)
│   └── Raison: Formulaire pre-arrivee = doublon Airbnb/Booking
│
├── WF07 — User Onboarding
│   ├── Trigger: Webhook /webhook/user-created
│   └── Action: Email bienvenue (owner/staff) + init sync iCal si owner
│
├── WF08 — Issue Handler
│   ├── Trigger: Webhook /webhook/issue-created
│   └── Action: Email urgent owner avec photo jointe
│
└── WF09 — Health Monitor
    ├── Trigger: Schedule (*/6 heures)
    └── Action: Verifier syncs iCal + IMAP → alerte si echec
```

## Matrice de Dependances

| Workflow | Depends on | Called by | Calls |
|----------|-----------|-----------|-------|
| WF00 | -- | All (Error Trigger) | -- |
| WF01 | -- | App (imap.configured) | WF04 |
| WF02 | -- | App (property.created) | -- |
| WF03 | -- | -- | -- |
| WF04 | -- | WF01 | -- |
| WF05 (DEPRECATED v2.1) | -- | -- | -- |
| WF06 (DEPRECATED v2.2) | -- | ~~App (form submit)~~ | -- |
| WF07 | -- | App (user.created) | -- |
| WF08 | -- | App (issue.created) | -- |
| WF09 | -- | -- | -- |

## Flux de Donnees

```
                    ┌─────────────────────────────────────────────────┐
                    │               TRIGGERS EXTERNES                  │
                    │                                                  │
                    │  IMAP (*/2min)      iCal Feeds (*/30min)        │
                    │       │                    │                     │
                    │       ▼                    ▼                     │
                    │     WF01               WF02                     │
                    │   Email Parser       iCal Sync                  │
                    │       │                    │                     │
                    │       ├── POST /reservation │── POST /reservation│
                    │       │   (source:email)   │   (source:ical)    │
                    │       │                    │                     │
                    │       │                    ├── POST /ical-alert  │
                    │       │                    │                     │
                    │       └──► WF04            │                     │
                    │         Cleaning Tasks     │                     │
                    │                            │                     │
                    └────────────────────────────┘                     │
                                                                      │
                    ┌─────────────────────────────────────────────────┐
                    │               TRIGGERS CRON                     │
                    │                                                  │
                    │  07:00    08:00    10:00    14:00    */6h        │
                    │    │        │        │        │        │         │
                    │    └──┬─────┘        └──┬─────┘        │         │
                    │       ▼                 ▼              ▼         │
                    │     WF03             WF05           WF09        │
                    │  Notifications    Guest Msgs    Health Check    │
                    │                  (DEPRECATED)                    │
                    └─────────────────────────────────────────────────┘
                                                                      │
                    ┌─────────────────────────────────────────────────┐
                    │               TRIGGERS WEBHOOK (App → n8n)      │
                    │                                                  │
                    │  user.created    property.created   imap.config  │
                    │       │               │                │         │
                    │       ▼               ▼                ▼         │
                    │     WF07           WF02             WF01        │
                    │  Onboarding      iCal Sync       Email Parser   │
                    │                                                  │
                    │  issue.created                                   │
                    │       │                                          │
                    │       ▼                                          │
                    │     WF08                                         │
                    │  Issue Alert                                     │
                    │                                                  │
                    └─────────────────────────────────────────────────┘
                                                                      │
                    ┌─────────────────────────────────────────────────┐
                    │               ERROR HANDLING                     │
                    │                                                  │
                    │  WF00 ◄── Error Trigger (toutes les WFs)        │
                    │    │                                             │
                    │    └── Email alerte admin + log                  │
                    │                                                  │
                    └─────────────────────────────────────────────────┘
```

## Differences vs v1

| Aspect | v1 | v2 |
|--------|----|----|
| Nombre workflows | 6 (WF01-WF06) + error handler implicite | 10 (WF00-WF09) |
| Error Handler | Implicite (Error Trigger par WF) | WF00 centralise |
| Onboarding | Conceptuel dans WF03 | WF07 dedie |
| Issue Alerts | Conceptuel dans WF03 | WF08 dedie |
| Health Check | Integre dans WF02 | WF09 dedie |
| WF01 triggers | IMAP uniquement | IMAP + webhook imap.configured |
| WF02 triggers | Schedule uniquement | Schedule + webhook property.created |
| WF05 Flow A | Desactive (duplicate) | Supprime |
| Reconciliation | Implicite | Explicite (cote API, F05) |
| Config pattern | Variables env dans n8n | Noeud Config en debut de workflow |

## Conventions

### Nommage
- **WFXX** : Main workflow (execution autonome)
- Pas de sub-workflows (architecture plate pour simplicite)

### Error Handling
- Chaque workflow a un Error Trigger → WF00
- Retry : 2-3 tentatives avec backoff exponentiel
- Logging : `sync_logs` pour WF01/WF02, `sent_messages` pour WF03/~~WF05~~ (DEPRECATED v2.1)

### Configuration
- Noeud `Set` "Config" en debut de chaque workflow
- Variables lues depuis l'environnement n8n (jamais de .env dans les workflows)
- Pattern : `$env.VARIABLE_NAME`

### Securite
- Webhooks entrants : validation `x-api-key` header
- Webhooks sortants : envoi `x-api-key` + `x-idempotency-key`
- Supabase : `service_role` key via credential (pas dans le workflow)

---

*Neurolia-Immo v2.0 — N01 Workflow Architecture*
*Genere le : 2026-02-20*
