# Neurolia-Immo - Dashboard Locations Courte Duree

Dashboard de gestion de locations courte duree (Airbnb/Booking) pour proprietaires et professionnels. Centralisation des reservations, coordination equipe entretien, livret d'accueil digital.

## Statut Pipelines

### Pipeline 1 : Architecture (A01-A05)

| Etape | Stage | Status | Output |
|-------|-------|--------|--------|
| A01 | Init & Brief | ✅ | `architecture/pipeline/output/01-brief/` |
| A02 | User Flows | ✅ (refonte UX) | `architecture/pipeline/output/02-user-flows/` |
| A03 | Data Architecture | ✅ | `architecture/pipeline/output/03-data/` |
| A04 | API & Integrations | ✅ | `architecture/pipeline/output/04-api/` |
| A05 | Tech Stack | ✅ | `architecture/pipeline/output/05-tech/` |

### Pipeline 2 : n8n (N01-N06)

| Etape | Stage | Status | Output |
|-------|-------|--------|--------|
| N01 | Workflow Architecture | ✅ | `n8n/pipeline/output/01-architecture/` |
| N02 | Node Design | ✅ | `n8n/pipeline/output/02-node-configs/` |
| N03 | Credential Mapping | ✅ | `n8n/pipeline/output/03-credentials/` |
| N04 | JSON Generation | ✅ | `n8n/pipeline/output/04-workflows/` |
| N05 | Validation | ⬜ | `n8n/pipeline/output/05-validation/` |
| N06 | Maintenance | 🔄 | `n8n/pipeline/output/06-patches/` |

### Pipeline 3 : Design (D01-D10)

| Etape | Stage | Status | Output |
|-------|-------|--------|--------|
| D01 | Brand & Identity | ✅ | `design/pipeline/output/01-brand/` |
| D02 | Art Direction | ✅ | `design/pipeline/output/02-art-direction/` |
| D03 | Wireframes | ✅ | `design/pipeline/output/03-wireframes/` |
| D04 | Design Tokens | ✅ | `design/pipeline/output/04-design-tokens/` |
| D05 | App Setup | ⬜ | Projet scaffolde |
| D06 | Core Screens | ⬜ | Ecrans principaux |
| D07 | Backend Integration | ⬜ | Ecrans connectes |
| D08 | Polish | ⬜ | Animations + micro-interactions |
| D09 | Validate | ⬜ | `design/pipeline/output/validation-report.md` |
| D10 | Deploy | ⬜ | Production |

## Commandes

```bash
# Pipeline Architecture (sequentiel, bloquant)
/apex -a -s executer A01-init depuis architecture/pipeline/stages/A01-init.md
/apex -a -s executer A02-user-flows depuis architecture/pipeline/stages/A02-user-flows.md
/apex -a -s executer A03-data-architecture depuis architecture/pipeline/stages/A03-data-architecture.md
/apex -a -s executer A04-api-contracts depuis architecture/pipeline/stages/A04-api-contracts.md
/apex -a -s executer A05-tech-stack depuis architecture/pipeline/stages/A05-tech-stack.md

# Pipeline n8n (apres Architecture)
/apex -a -s executer N01-workflow-architecture depuis n8n/pipeline/stages/N01-workflow-architecture.md
/apex -a -s executer N02-node-design depuis n8n/pipeline/stages/N02-node-design.md
/apex -a -s executer N03-credential-mapping depuis n8n/pipeline/stages/N03-credential-mapping.md
/apex -a -s executer N04-json-generation depuis n8n/pipeline/stages/N04-json-generation.md
/apex -a -s executer N05-validation depuis n8n/pipeline/stages/N05-validation.md
/apex -a -s executer N06-maintenance depuis n8n/pipeline/stages/N06-maintenance.md

# Pipeline Design Phase A (apres Architecture)
/apex -a -s executer D01-brand depuis design/pipeline/stages/D01-brand.md
/apex -a -s executer D02-art-direction depuis design/pipeline/stages/D02-art-direction.md
/apex -a -s executer D03-wireframes depuis design/pipeline/stages/D03-wireframes.md
/apex -a -s executer D04-design-tokens depuis design/pipeline/stages/D04-design-tokens.md

# Pipeline Design Phase B (apres Phase A)
/apex -a -s executer D05-setup depuis design/pipeline/stages/D05-setup.md
/apex -a -s executer D06-core-screens depuis design/pipeline/stages/D06-core-screens.md
/apex -a -s executer D07-backend-integration depuis design/pipeline/stages/D07-backend-integration.md
/apex -a -s executer D08-polish depuis design/pipeline/stages/D08-polish.md
/apex -a -s executer D09-validate depuis design/pipeline/stages/D09-validate.md
/apex -a -s executer D10-deploy depuis design/pipeline/stages/D10-deploy.md

# Dev server (apres D05)
npm run dev
```

## Sources de Verite

| Domaine | Source unique |
|---------|---------------|
| Statut global | Ce fichier (CLAUDE.md) |
| Brief client | `architecture/pipeline/input/brief-client.md` |
| PRD & Features | `architecture/pipeline/output/01-brief/` |
| User Flows | `architecture/pipeline/output/02-user-flows/` |
| Data Model | `architecture/pipeline/output/03-data/` |
| API Contracts | `architecture/pipeline/output/04-api/` |
| Tech Stack | `architecture/pipeline/output/05-tech/` |
| Workflows n8n v1 (ref.) | `n8n/pipeline/input/existing-workflows/` |
| Brand v1 (ref.) | `design/pipeline/input/references/` |
| Dependances archi | `architecture/pipeline/workflow/DEPENDENCIES.md` |
| Dependances n8n | `n8n/pipeline/workflow/DEPENDENCIES.md` |
| Dependances design | `design/pipeline/workflow/DEPENDENCIES.md` |

## Contexte Projet

| Cle | Valeur |
|-----|--------|
| Produit | Neurolia-Immo |
| Type | Dashboard (monitoring, coordination, analytics) |
| Objectif | Centraliser reservations + coordonner equipe entretien |
| KPI | Zero reservation manquee |
| Personas | Proprietaire (desktop/mobile), Personnel entretien (mobile-first) |
| Distribution | iOS + Android + Web (mobile-first) |

## Contraintes d'Acces Plateformes

| Canal | Acces | Usage |
|-------|-------|-------|
| Email proprietaire (IMAP) | OUI | Parsing confirmations/modifications/annulations Airbnb & Booking |
| iCal feeds | OUI | Sync reservations en lecture seule |
| Messageries internes (chat in-app) | NON | Pas d'acces aux echanges voyageurs |
| API Airbnb/Booking | NON | Aucune API plateforme disponible |
| Emails voyageurs directs | NON | Pas d'acces aux adresses email voyageurs |

## Flux Inter-Pipelines

```
[Architecture A01-A05]
        │
        ├──→ n8n/pipeline/input/imports/
        │    (features.md, api-contracts.md, webhook-map.md, integrations.md)
        │
        └──→ design/pipeline/input/imports/
             (prd.md, features.md, user-flows/, navigation-map.md, tech-stack.md)

[n8n N01-N05] ←── n8n/pipeline/input/existing-workflows/ (analyse v1)
[Design D01-D04] ←── design/pipeline/input/references/ (inspiration v1)

[Design D07] ←── integration n8n + Supabase
```

## Ordre d'Execution

```
Phase 1 : Architecture (A01 → A02 → A03/A05 parallel → A04) — BLOQUANT
Phase 2 : Import outputs vers n8n + design
Phase 3 : n8n (N01-N05) + Design Phase A (D01-D04) — EN PARALLELE
Phase 4 : Design Phase B (D05-D10) — sequentiel
```

## Contraintes

- **Immutabilite** : Les outputs pipeline sont immutables une fois valides
- **Pas de secrets** dans le repo — utiliser `.env.local`
- **Vouvoiement** pour tout contenu utilisateur
- **Mobile-first** pour le persona entretien
- **Stores** : iOS (App Store) + Android (Google Play) + Web
- **n8n config** : JAMAIS de .env dans les workflows n8n — toujours un noeud "Set" de configuration en debut de workflow

---

## Changelog

### 2026-02-20 — v2.2 Deprecation Formulaire Pre-arrivee + WF06

**Deprecation WF06 Check-in Form Alert**
- Raison : formulaire pre-arrivee = doublon Airbnb/Booking (heure arrivee, demandes speciales, nb voyageurs)
- WF06 spec + 4 node configs + JSON : marques DEPRECATED v2.2
- workflow-tree : 8 workflows actifs + 2 deprecated (WF05, WF06)
- credentials-map : WF06 marque deprecated dans matrice (CRED-02, CRED-03, CRED-04)
- features.md : "Formulaire pre-arrivee" ajoute au Won't Have
- integrations.md + webhook-map : references WF06 marquees deprecated
- WF05 alternatives mises a jour (retrait reference WF06)
- F11 reste inchange (livret d'accueil = page statique, pas de formulaire)

### 2026-02-20 — v2.1 Check-in Mode + WF05 Deprecation + Brand Derivative

**Change 1 : Mode Check-in (Architecture + Wireframes + N8n)**
- Data model : champ `check_in_mode` (enum: `self_checkin | staff_checkin`) sur `properties`, nouveau type `check_in_greeting` dans `task_type` et `property_checklists`
- Features : F02 choix mode check-in, F12 creation auto tache `check_in_greeting`
- User flows : toggle check-in dans edition bien (owner), Flow 2ter Accueil Voyageur (staff) avec checklist 5 items
- API contracts : `check_in_mode` sur POST/PATCH properties, type `check_in_greeting` sur cleaning_tasks et checklists
- Wireframes : edition-bien (toggle accueil), fiche-bien (affichage mode), planning-jour (badge Accueil), fiche-intervention (checklist accueil), suivi-menages (taches accueil)
- WF04 : logique conditionnelle `check_in_mode === 'staff_checkin'` → creation tache + checklist greeting (spec, node config, JSON)

**Change 2 : Deprecation WF05 Guest Messages**
- Raison : PRD interdit emails voyageurs directs, `guest_email` indisponible via iCal
- WF05 spec : header DEPRECATED v2.1 avec justification
- workflow-tree : 8 workflows actifs + 2 deprecated (WF05, WF06)
- credentials-map : WF05 marque deprecated dans matrice
- webhook-map : triggers WF05 marques deprecated
- 12 fichiers node configs : header deprecated
- WF05 JSON : `deprecated: true`, `deprecated_version: "2.1"`
- Alternatives : F11 QR livret (page statique), WF03 digest proprietaire

**Change 3 : Brand Derivative Neurolia**
- Accent agence : terracotta `oklch(0.58 0.14 35)` + light + pale (3 tokens)
- Police display : Satoshi (Fontshare) pour H1 uniquement, fallback Inter
- Barre signature : `border-left: 4px solid accent-agency` (utility `.signature-bar`)
- Radius ajustes : card 12→10px, button 8→6px, input 8→6px, modal 12→10px
- Fichiers mis a jour : input references (colors, typography), brand (platform, colors, typography), art direction (visual-vocabulary, constraints), design tokens (globals.css)
- Principe : ADN Neurolia = accent < 5% surface, ne remplace PAS primary blue-slate

### 2026-02-20 — D04 Design Tokens

**D04 — globals.css dans design/pipeline/output/04-design-tokens/**
- Format Option A : CSS Custom Properties + @theme inline (Tailwind CSS 4)
- 160+ tokens extraits de colors.md, typography.md, visual-vocabulary.md, constraints.md
- Couleurs OKLCH : primary (echelle 50-900 + hover/pressed/disabled), secondary, neutral (50-950), 4 semantiques (success/error/warning/info x 5 steps), 3 plateformes (Airbnb/Booking/Manuel x 5 steps)
- Typographie : 2 font families (Inter + JetBrains Mono), 13 font-size tokens (display→tab), clamp() responsive, body=16px, input=16px (iOS zoom prevention)
- Espacements : grille 4px (7 steps), screen-padding responsive (16/20/24px), card/section/form gaps
- Sizing : header 56px, bottom-tab 56px, touch-target 44px, safe-areas env()
- Ombres OKLCH (card, elevated, nav, sticky, header) + dark mode ajuste
- Transitions : 10 durees + 3 easings + press-scale 0.97
- 6 keyframes animations (skeleton-pulse, spinner, toast enter/exit, modal enter/exit, flash-realtime)
- Dark mode (.dark) avec neutrals inverses + ombres renforcees
- @theme inline mapping vers Tailwind + @layer base (headings, body, input) + @layer utilities (screen-padding, safe-bottom, touch-target, etc.)
- prefers-reduced-motion respecte (spinner exception)
- Validation 10/10 : OKLCH, semantiques, echelle typo, body>=14px, touch=44px, safe-areas, ombres, transitions, dark mode

### 2026-02-20 — D03 Wireframes

**D03 — 25 fichiers wireframe + README dans design/pipeline/output/03-wireframes/**
- 32 ecrans couverts (100% de navigation-map.md) : 7 auth + 17 Owner + 6 Staff + 1 public + 1 modals partages
- Auth : splash, login, register, register-staff, magic-link-sent, forgot-password, onboarding (3 etapes)
- Owner Tab 1 Accueil : dashboard (5 zones, 3 blocs hierarchises alertes/aujourd'hui/KPIs), suivi-menages, detail-reservation, detail-anomalie
- Owner Tab 2 Calendrier : calendrier-mois (grille mobile=liste + desktop=7col, barres colorees par plateforme), calendrier-detail-jour
- Owner Tab 3 Gestion : hub-gestion, liste-proprietes, fiche-bien (zone haute=operationnel, zone basse=config), edition-bien, gestion-checklist, livret-accueil-preview, liste-staff, fiche-agent, inviter-agent (bottom sheet), parametres
- Staff Tab 1 Planning : planning-jour (prochaine tache bordure primary, badge ponctuel), fiche-intervention (5 zones: header, infos-bien lien, checklist cochable, signaler, CTA sticky), infos-bien (code acces gros copiable, tap adresse→GPS), signaler-probleme
- Staff Tab 2 Profil : profil-staff (mini-KPIs), parametres-staff
- Public : livret-accueil-public (6 zones, sans auth, QR code)
- Modals : confirmation, toast succes/erreur/alerte, camera, bottom sheet filtre
- Format strict : zones numerotees top-to-bottom, references `fichier.md > cle` (pas de texte duplique)
- Etats speciaux (empty, loading skeleton, error, offline, pull-to-refresh) definis sur chaque ecran data-driven
- Touch targets >= 44px annotes sur tous les elements interactifs
- Layout precis (heights, paddings, positions sticky/fixed/scroll) conformes a visual-vocabulary.md
- 87 zones totales definies, interactions avec geste + destination pour chaque element interactif

### 2026-02-20 — N03 Credential Mapping

**N03 — credentials-map.md dans n8n/pipeline/output/03-credentials/**
- 4 credentials pour 4 services : IMAP, SMTP, Supabase (HTTP Header Auth), Header Auth (webhook API key)
- CRED-01 (IMAP - Loc Immo) : emailReadImap, login SSL/TLS, utilise par WF01 uniquement
- CRED-02 (SMTP - Loc Immo) : emailSend, login TLS/STARTTLS, utilise par 9/10 workflows (WF00, WF02-WF09)
- CRED-03 (Supabase - Loc Immo) : HTTP Request headers manuels (apikey + Bearer service_role), 9/10 workflows (WF01-WF09)
- CRED-04 (Header Auth - API Key Dashboard) : headerAuth x-api-key 64 hex, 6 webhooks entrants (WF01, WF02, WF04, WF06, WF07, WF08)
- Matrice Credential x Workflow complete (TRIGGER, SEND, READ, WRITE, STORAGE, WEBHOOK)
- Template .env avec 13 variables (4 IMAP + 6 SMTP + 2 Supabase + 1 API Key) + 4 variables additionnelles
- Correspondance entre noms $env dans Config nodes et noms N8N_CRED normalises
- Validation 5/5 : couverture complete, zero secrets, variables nommees, scopes documentes, mapping workflows

### 2026-02-20 — N02 Node Design

**N02 — 93 fichiers dans n8n/pipeline/output/02-node-configs/ (10 dossiers)**
- WF00-error-handler/ (4 nodes) : Error Trigger → Config → Code: Format Error → Send Email
- WF01-email-parser/ (11 nodes) : IMAP Trigger + Webhook → Config → Switch Router → Parser Airbnb (v1 regex) + Parser Booking → Switch Type → Payload Builder (property lookup Supabase) → HTTP Upsert → IF New → Trigger WF04
- WF02-ical-sync/ (16 nodes) : Schedule */30min + Webhook → Config → Get Properties → Split → Fetch iCal Airbnb/Booking → Parse RFC 5545 → Get Owner → Get DB Reservations → Compare (tolerance 1j, match ical_uid/ref/dates) → IF Upserts → HTTP Upsert → IF Anomalies → Alert API + Email
- WF03-daily-notifications/ (16 nodes) : 2 Schedule Triggers (7h/8h) → Config → Flow A (Get Tasks + Staff → Build Staff Emails → Loop Send) + Flow B (4 queries paralleles → Merge → Build Owner HTML → Get Owners → Send)
- WF04-cleaning-tasks/ (13 nodes) : Webhook → Config → Validate → Get Property → Check Existing → IF Exists → Create Tasks (checkout_clean + checkin_prep + checklists) → Get Staff → Round-Robin → Build Emails → Loop Send → Confirm
- WF05-guest-messages/ (12 nodes) : 2 Schedules (10h/14h) → Config → Get Reservations → Loop → Check Duplicate → Build Variables → Insert sent_message → IF Has Email → Send → Update sent_message
- WF06-checkin-form/ (4 nodes) : Webhook → Config → Validate & Detect Priority (keywords FR) → Send Email (standard/urgent)
- WF07-user-onboarding/ (8 nodes) : Webhook → Config → Switch Role → [Owner: Welcome Email] / [Staff: Get Owner → Build 2 Emails → Loop Send]
- WF08-issue-handler/ (4 nodes) : Webhook → Config → Build Urgent Email (3 lookups + signed photo URL) → Send Email
- WF09-health-monitor/ (7 nodes) : Schedule */6h → Config → Get Properties → Health Checks (iCal + IMAP thresholds) → IF Issues → Build Alert → Send Admin
- Toutes les expressions n8n en syntaxe `={{ }}`, Code nodes JS complets et fonctionnels
- Supabase via HTTP Request + Header Auth (service_role), pas le node natif
- Config node = Set chargeant `$env.VARIABLE_NAME`, reference via `$('Config').item.json.X`
- Schemas de sortie coherents d'un node a l'autre (sortie N alimente entree N+1)

### 2026-02-20 — D02 Art Direction

**D02 — 5 fichiers dans design/pipeline/output/02-art-direction/**
- moodboard.md : 7 references apps analysees (Guesty, Hospitable, Breezeway, Linear, Airbnb Host, Notion, Properly) avec mesures concretes (px, colors, patterns). Tableau patterns communs avec decisions adopter/adapter/rejeter.
- visual-vocabulary.md : Lexique 6 categories (espacements, typographie, transitions, couleurs, formes, ombres). Chaque terme traduit en valeur precise (px/ms/OKLCH).
- constraints.md : 15 regles "ON FAIT" + 15 regles "ON NE FAIT PAS". Patterns navigation, zones tactiles, test rapide "Est-ce Neurolia-Immo ?".
- emotion-map.md : 16 ecrans + 5 etats speciaux couverts. Emotion primaire, tension, resolution, element signature, archetype actif pour chaque ecran.
- README.md : ADN visuel, test rapide, index fichiers, usage par etape pipeline.

### 2026-02-20 — N01 Workflow Architecture + D01 Brand & Identity

**N01 — workflow-tree.md + 10 workflow specs**
- Architecture v2 : 10 main workflows (WF00-WF09), 0 sub-workflows
- WF00 Error Handler (centralise, remplace error triggers individuels v1)
- WF01 Email Parser (IMAP */2min + webhook imap.configured)
- WF02 iCal Sync (*/30min + webhook property.created)
- WF03 Daily Notifications (cron 7h staff + 8h owner)
- WF04 Cleaning Tasks (webhook inter-WF depuis WF01)
- WF05 Guest Messages (cron 10h pre-arrivee + 14h post-depart, Flow A supprime)
- WF06 Check-in Form Alert (webhook App)
- WF07 User Onboarding (webhook user.created — nouveau v2)
- WF08 Issue Handler (webhook issue.created — nouveau v2)
- WF09 Health Monitor (cron */6h — nouveau v2, extrait de WF02)
- Couverture F01-F12 validee, toutes webhook-map mappees
- Imports inter-templates copies (features, api-contracts, webhook-map, integrations)

**D01 — 8 fichiers brand dans design/pipeline/output/01-brand/**
- 00-platform.md : Brand Key + Kapferer + Archetypes (Souverain + Soignant)
- about.md : Slogan "Vos locations, zero oubli." (4 mots)
- services.md : 6 fonctionnalites cles avec taglines
- positioning.md : 30+ messages par ecran, 20+ CTAs tactiles
- tone.md : Vouvoiement, formalite 3/5, 10 mots a utiliser/8 a eviter
- personas.md : Marc (proprietaire) + Sarah (staff mobile-first)
- colors.md : Palette OKLCH (Ardoise + Lavande + 4 semantiques + 3 plateformes)
- typography.md : Inter + JetBrains Mono, echelle 13 elements, body min 14px
- Validation PASS (46/46)

### 2026-02-20 — Tech Stack A05

**tech-stack.md**
- Matrice de decision 4 options : PWA (3.70), React Native/Expo (4.00), Flutter (3.50), Natif (3.40)
- Decision : Next.js 15 + Capacitor 6 (compatibilite architecture A04, budget < 5K, 1 codebase)
- Stack frontend : Next.js 15, React 19, TypeScript 5.7, Tailwind CSS 4, shadcn/ui, Capacitor 6
- Stack backend : Supabase (PostgreSQL 15, Auth, Realtime, Storage, Edge Functions), Vercel
- Automations : n8n self-hosted, IMAP/SMTP, iCal feeds
- Outils : ESLint 9, Prettier, Sentry, Vitest (Phase 2), Capacitor plugins (Camera, Geolocation, Push)
- Strategie migration Phase 2 : si WebView insuffisant → Expo Router (frontend mobile uniquement)

**project-setup.md**
- Pre-requis : Node.js 20+, Supabase CLI, Capacitor CLI, Xcode 16+, Android Studio
- Commandes d'initialisation : create-next-app + dependances (Supabase, Capacitor, shadcn/ui, React Hook Form, Zod)
- Configuration Capacitor : appId fr.neurolia.immo, plugins Camera/Geolocation/Push
- Variables d'environnement : 6 Next.js + 14 n8n documentees
- Structure projet : 6 dossiers principaux (app, components, lib, types, supabase, public)
- Scripts dev/build/mobile documentes
- Checklist setup 15 items

### 2026-02-19 — Corrections User Flows A02 (v2.1)

**cleaning-staff.md**
- Ajout taches ponctuelles (ad_hoc) dans le planning et Flow 2bis dedie
- Badge "Ponctuel" pour distinguer les taches non-recurrentes
- Checklist specifique a la tache (pas celle du bien standard)
- Exemple de notification mis a jour avec tache ponctuelle

**owner.md**
- Retrait "Menages X/Y termines" du bloc Aujourd'hui (ambigu multi-biens)
- Ajout bouton "Suivi menages →" redirigeant vers vue detaillee par bien
- Statut menage accessible via : bouton suivi, detail reservation, calendrier jour
- Decision UX "Statut menage promu" recrite → "Suivi menage accessible, pas agrege"

**navigation-map.md**
- Ajout ecran "Suivi Menages" dans le stack Accueil Owner
- Detail Jour annote avec taches menage
- 2 nouvelles transitions ajoutees (Dashboard → Suivi Menages, Calendrier Detail Jour → Suivi Menages)
- F06 mis a jour

### 2026-02-19 — API & Integrations A04

**api-contracts.md**
- Architecture Supabase PostgREST + Next.js API routes + Edge Functions
- Auth : Supabase Auth (magic link, OAuth Google, signup, refresh, logout)
- CRUD pour 13 tables avec exemples request/response JSON
- 3 API routes webhook n8n→App (/reservation, /ical-alert, /task-created)
- 5 Edge Functions/RPC (create_invitation, validate_invitation, on_auth_user_created, get_public_welcome_guide, mark_all_notifications_read)
- Mapping complet F01-F12 → endpoints

**webhook-map.md**
- 5 webhooks App→n8n (user.created, property.created, imap.configured, issue.created)
- 3 webhooks n8n→App (reservation, ical-alert, task-created)
- 2 webhooks inter-workflows (WF01→WF04, WF01→WF05)
- 7 triggers cron (iCal */30min, IMAP */2min, digest 7h/8h, guests 10h/14h, health */6h)
- 5 Realtime subscriptions (cleaning_tasks, notifications, reservations, anomalies)
- Diagramme de flux complet App ↔ API ↔ n8n
- Securite : API key, HTTPS, idempotency, timestamp, rate limiting

**integrations.md**
- 7 services documentes : Supabase, n8n, iCal, IMAP, SMTP, Vercel, Web Push (Phase 2)
- Variables d'environnement : 15 vars Next.js + 14 vars n8n
- Correspondance cles partagees (3 paires)
- Configuration par environnement (dev/staging/prod)

### 2026-02-19 — Data Architecture A03

**data-model.md**
- 13 tables : profiles, properties, property_checklists, reservations, cleaning_tasks, task_checklist_items, task_photos, issues, anomalies, staff_invitations, notifications, welcome_guides, sync_logs
- 15 enums couvrant tous les champs a valeurs fixes
- 17 relations documentees avec cardinalite (1:1, 1:N, 0:N)
- Multi-tenant via owner_id + RLS Supabase sur toutes les tables
- Strategie offline preparee (Phase 2) avec priorites par table
- Mapping complet F01-F12 → tables + operations CRUD
- Notes Supabase : Realtime (3 tables), Storage (4 buckets)

**auth-strategy.md**
- Methode principale : Magic Link (Supabase Auth) — justifie par persona Staff
- Secondaire : Google OAuth (optionnel pour owners)
- 3 roles : owner, cleaning_staff, admin
- Matrice de permissions : 23 actions x 3 roles
- Flow d'authentification detaille : Owner (magic link + OAuth) + Staff (invitation → inscription)
- RLS : policies generiques (owner_isolation, staff_read_via_owner) + policies specifiques par table
- Securite : 11 items checklist + protection donnees sensibles + webhook security

### 2026-02-19 — Refonte UX anti-friction A02

**Staff (cleaning-staff.md)**
- Separation Fiche Intervention / Infos Bien en 2 ecrans distincts (contextes temporels differents)
- Fiche Intervention = travail (checklist, photos, actions Commencer/Terminer/Signaler)
- Infos Bien = lieu (adresse tap→GPS, code acces gros/copiable, WiFi, consignes)

**Owner (owner.md)**
- Dashboard restructure en 3 blocs : Alertes → Aujourd'hui (avec statut menage X/Y) → Cette semaine (KPIs)
- Fiche Bien separee en zone operationnelle (haut) et configuration (bas)
- Passage de 4 tabs a 3 tabs (Accueil, Calendrier, Gestion)
- KPIs integres au Dashboard (plus d'ecran separe)

**Navigation Map (navigation-map.md)**
- Owner : 3 tabs + Hub Gestion (biens, equipe, parametres)
- Staff : ajout ecran Infos Bien dans le stack Planning
- Transitions mises a jour (Hub Gestion, Fiche Intervention → Infos Bien)
- Desktop sidebar : 3 sections (Accueil/Calendrier + Mes biens/Mon equipe/Parametres)
- Tableau Ecrans par Feature : F02 + Infos Bien staff, F06 + statut menage, F07 + Infos Bien

---

*Derniere mise a jour : 2026-02-20*
