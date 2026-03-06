# Navigation Map - Neurolia-Immo

## Principe Directeur

> Navigation adaptive par role. Le proprietaire et le personnel d'entretien ne voient PAS la meme app. L'interface s'adapte au role de l'utilisateur connecte.

---

## Hierarchie des Ecrans

```
App
├── Auth (Stack)
│   ├── Splash
│   ├── Login (magic link / Google OAuth)
│   ├── Register (owner self-signup)
│   ├── Register Staff (lien invitation pre-rempli)
│   ├── Magic Link Sent (ecran d'attente)
│   └── Forgot Password
│
├── Owner Main (Tab Navigator — 3 tabs)
│   ├── Tab 1 : Accueil (Stack)
│   │   ├── Dashboard (alertes, arrivees/departs, KPIs)
│   │   ├── Suivi Menages (taches du jour, tous biens)
│   │   ├── Detail Reservation (+ statut menage associe)
│   │   └── Detail Anomalie
│   │
│   ├── Tab 2 : Calendrier (Stack)
│   │   ├── Vue Mois Multi-Biens
│   │   └── Detail Jour (reservations + taches menage du jour)
│   │
│   └── Tab 3 : Gestion (Stack)
│       ├── Hub Gestion (acces biens, equipe, parametres)
│       ├── Liste Proprietes
│       │   ├── Fiche Bien (etat operationnel + config)
│       │   ├── Edition Bien
│       │   ├── Gestion Checklist
│       │   └── Livret Accueil (preview + QR code)
│       ├── Liste Staff
│       │   ├── Fiche Agent (planning, stats)
│       │   └── Inviter Agent
│       └── Parametres (profil, IMAP, notifications, compte)
│
├── Staff Main (Tab Navigator — 2 tabs)
│   ├── Tab 1 : Planning (Stack)
│   │   ├── Planning Jour (liste taches chronologique)
│   │   ├── Fiche Intervention (type, statut, checklist, photos, actions)
│   │   ├── Infos Bien (adresse, code acces, WiFi, consignes — lecture seule)
│   │   └── Signaler Probleme
│   │
│   └── Tab 2 : Profil (Stack)
│       ├── Mon Profil
│       └── Parametres (notifications, deconnexion)
│
├── Shared Modals (Overlays)
│   ├── Confirmation Action ("Etes-vous sur ?")
│   ├── Succes / Erreur (toast + detail)
│   ├── Camera (prise photo checklist)
│   └── Filtre / Tri (calendrier, reservations)
│
└── Public (Sans auth)
    └── Livret Accueil (page publique par bien, accessible via QR code)
```

---

## Pattern de Navigation

| Pattern | Usage | Details |
|---------|-------|---------|
| Bottom Tab | Navigation principale | Owner : 3 tabs (Accueil, Calendrier, Gestion). Staff : 2 tabs (Planning, Profil). |
| Stack | Navigation en profondeur | Liste → Detail → Action (push/pop) |
| Modal | Actions ponctuelles | Confirmation, camera, filtres |
| Deep Link | Acces direct | Notification → ecran specifique |
| Public Route | Sans authentification | Livret d'accueil (/livret/[property-id]) |

### Pourquoi 3 tabs Owner (au lieu de 4)

Le proprietaire utilise Dashboard et Calendrier quotidiennement, mais Proprietes et Equipe occasionnellement. 4 tabs donnaient le meme poids visuel aux 4. La nouvelle structure regroupe la configuration sous un onglet "Gestion" unique, liberant l'espace visuel pour les 2 tabs principaux (90% de l'usage quotidien).

### Pourquoi 2 navigations distinctes

Le personnel d'entretien n'a **aucun besoin** du calendrier multi-biens, des KPIs ou de la gestion des proprietes. Lui montrer ces ecrans serait du bruit. Sa navigation est reduite a l'essentiel : Planning + Profil.

---

## Transitions

| De | Vers | Type | Condition |
|----|------|------|-----------|
| Splash | Login | Replace | Non authentifie |
| Splash | Owner Main | Replace | Auth valide + role owner |
| Splash | Staff Main | Replace | Auth valide + role cleaning_staff |
| Login | Magic Link Sent | Push | Choix magic link |
| Login | Owner Main | Replace | Auth reussie + role owner |
| Login | Staff Main | Replace | Auth reussie + role staff |
| Register | Owner Main | Replace | Inscription owner reussie |
| Register Staff | Staff Main | Replace | Inscription staff reussie |
| Dashboard | Detail Reservation | Push | Tap reservation |
| Dashboard | Detail Anomalie | Push | Tap alerte |
| Dashboard | Suivi Menages | Push | Tap "Suivi menages →" |
| Calendrier Detail Jour | Suivi Menages | Push | Tap tache menage |
| Hub Gestion | Liste Proprietes | Push | Tap "Mes biens" |
| Hub Gestion | Liste Staff | Push | Tap "Mon equipe" |
| Hub Gestion | Parametres | Push | Tap "Parametres" |
| Liste Proprietes | Fiche Bien | Push | Tap propriete |
| Fiche Bien | Edition Bien | Push | Tap "Modifier" |
| Fiche Bien | Gestion Checklist | Push | Tap "Checklist" |
| Fiche Bien | Livret Preview | Push | Tap "Livret" |
| Liste Staff | Fiche Agent | Push | Tap agent |
| Liste Staff | Inviter Agent | Modal | Tap "+" |
| Planning Jour | Fiche Intervention | Push | Tap tache |
| Fiche Intervention | Infos Bien | Push | Tap "Infos du bien" |
| Fiche Intervention | Camera | Modal | Tap item photo checklist |
| Fiche Intervention | Signaler Probleme | Push | Tap "Signaler" |
| Notification push | Ecran concerne | Deep link | Tap notification |

---

## Ecrans par Feature

| Feature | Ecrans Owner | Ecrans Staff |
|---------|-------------|-------------|
| F01 (Auth) | Login, Register, Forgot Password | Register Staff |
| F02 (Proprietes) | Liste Proprietes, Fiche Bien (etat operationnel + config), Edition Bien, Checklist | Infos Bien (lecture seule) |
| F03 (iCal) | — (backend, resultats visibles sur Dashboard) | — |
| F04 (Email parsing) | — (backend, resultats visibles sur Dashboard) | — |
| F05 (Reconciliation) | Detail Anomalie | — |
| F06 (Dashboard proprio) | Dashboard (alertes, aujourd'hui, cette semaine, KPIs), Suivi Menages, Detail Reservation (+ statut menage), Calendrier | — |
| F07 (Dashboard entretien) | — | Planning Jour, Fiche Intervention, Infos Bien |
| F08 (Planning intelligent) | Fiche Agent (vue planning) | Planning Jour (resultat) |
| F09 (Multi-tenant) | — (RLS transparent) | — (RLS transparent) |
| F10 (Notifications) | Toasts + badges + emails | Push + email planning matin |
| F11 (Livret accueil) | Preview + QR code | — |
| F12 (Taches auto) | — (visible dans Dashboard) | Planning Jour (taches generees) |

---

## Points de Contact n8n (Resume)

| Ecran / Action | Declencheur | Workflow n8n |
|----------------|-------------|-------------|
| Post-inscription owner | Webhook user.created (role=owner) | Email bienvenue + premiere synchro iCal |
| Post-inscription staff | Webhook user.created (role=staff) | Notification proprio "X a rejoint votre equipe" |
| Ajout propriete | Webhook property.created | Demarrage synchro iCal pour ce bien |
| Config IMAP | Webhook imap.configured | Premier parsing email |
| Tache demarree | Realtime task.status=in_progress | Notification in-app proprio |
| Tache terminee | Realtime task.status=completed | Notification in-app proprio |
| Signalement probleme | Webhook issue.created | Email proprio avec photo |
| Chaque matin (7h) | Cron | Email planning staff |
| Chaque matin (8h) | Cron | Email digest proprio |
| Synchro echouee | Health check cron | Email alerte proprio |
| Erreur critique n8n | Error handler | Alerte technique |

---

## Responsive Breakpoints

| Breakpoint | Cible | Navigation |
|------------|-------|------------|
| < 640px | Mobile (staff + proprio mobile) | Bottom tabs, stack navigation |
| 640-1024px | Tablette | Bottom tabs, layout plus large |
| > 1024px | Desktop (proprio) | Sidebar navigation, multi-colonnes |

### Desktop Owner : Layout Alternatif

Sur desktop, le proprietaire beneficie d'un layout enrichi avec sidebar a 3 sections :
```
┌──────────────────────────────────────────────┐
│  Sidebar         │  Contenu Principal        │
│                  │                           │
│  ○ Accueil       │  [Dashboard / Calendrier  │
│  ○ Calendrier    │   / Proprietes / Equipe   │
│  ─────────       │   / Parametres]           │
│  ○ Mes biens     │                           │
│  ○ Mon equipe    │                           │
│  ○ Parametres    │                           │
└──────────────────────────────────────────────┘
```

Les 2 premiers items (Accueil, Calendrier) correspondent aux tabs quotidiens. Le separateur marque la zone de gestion (Mes biens, Mon equipe, Parametres). Le contenu dispose de plus d'espace (calendrier en grille large, tableaux de KPIs, etc.).

---

*Neurolia-Immo v2.1 — Navigation Map*
