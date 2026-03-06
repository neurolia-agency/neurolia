# Wireframes - Neurolia-Immo

Source unique de contenu pour les etapes D06-D08.

---

## Fichiers

### Ecrans d'Entree (Auth)

| Fichier | Route/Tab | Zones | Persona |
|---------|-----------|-------|---------|
| splash.md | / | 2 zones | Tous |
| onboarding.md | /onboarding | 3 zones | Owner |
| login.md | /login | 5 zones | Tous |
| register.md | /register | 4 zones | Owner |
| register-staff.md | /register-staff | 3 zones | Staff |
| magic-link-sent.md | /magic-link-sent | 2 zones | Tous |
| forgot-password.md | /forgot-password | 3 zones | Tous |

### Ecrans Principaux — Owner

| Fichier | Route/Tab | Zones | Stack |
|---------|-----------|-------|-------|
| dashboard.md | Tab: Accueil | 5 zones | Accueil |
| suivi-menages.md | /suivi-menages | 3 zones | Accueil |
| detail-reservation.md | /reservation/[id] | 5 zones | Accueil |
| detail-anomalie.md | /anomalie/[id] | 4 zones | Accueil |
| calendrier-mois.md | Tab: Calendrier | 4 zones | Calendrier |
| calendrier-detail-jour.md | /calendrier/[date] | 3 zones | Calendrier |
| hub-gestion.md | Tab: Gestion | 3 zones | Gestion |
| liste-proprietes.md | /proprietes | 2 zones | Gestion |
| fiche-bien.md | /propriete/[id] | 3 zones | Gestion |
| edition-bien.md | /propriete/[id]/edit | 3 zones | Gestion |
| gestion-checklist.md | /propriete/[id]/checklist | 3 zones | Gestion |
| livret-accueil-preview.md | /propriete/[id]/livret | 3 zones | Gestion |
| liste-staff.md | /staff | 2 zones | Gestion |
| fiche-agent.md | /staff/[id] | 4 zones | Gestion |
| inviter-agent.md | Modal (depuis Liste Staff) | 3 zones | Gestion |
| parametres.md | /parametres | 2 zones | Gestion |
| notifications.md | /notifications | 2 zones | Transverse |

### Ecrans Principaux — Staff

| Fichier | Route/Tab | Zones | Stack |
|---------|-----------|-------|-------|
| planning-jour.md | Tab: Planning | 3 zones | Planning |
| fiche-intervention.md | /intervention/[id] | 5 zones | Planning |
| infos-bien.md | /intervention/[id]/infos-bien | 6 zones | Planning |
| signaler-probleme.md | /intervention/[id]/signaler | 5 zones | Planning |
| profil-staff.md | Tab: Profil | 5 zones | Profil |
| parametres-staff.md | /parametres-staff | 2 zones | Profil |

### Ecrans Publics

| Fichier | Route/Tab | Zones | Persona |
|---------|-----------|-------|---------|
| livret-accueil-public.md | /livret/[property-id] | 6 zones | Voyageur (sans auth) |

### Composants Partages

| Fichier | Type | Composants |
|---------|------|------------|
| modals-shared.md | Overlays | 6 modals (Confirmation, Toast Succes, Toast Erreur, Toast Alerte, Camera, Bottom Sheet Filtre) |

---

## Statistiques

| Metrique | Valeur |
|----------|--------|
| Total fichiers wireframe | 25 |
| Total ecrans uniques | 24 + 6 modals |
| Ecrans Owner | 17 |
| Ecrans Staff | 6 |
| Ecrans partages/publics | 7 (auth) + 1 (public) |
| Total zones definies | 87 |

---

## Principe

Les wireframes referencent les fichiers brand/ et art-direction/ sans dupliquer leur contenu :

```
positioning.md > tagline
positioning.md > Messages par Ecran > [ecran]
positioning.md > CTAs par Ecran > [ecran]
positioning.md > Empty States > [type]
positioning.md > Messages de feedback > [type]
tone.md > Formatage des Donnees > [type]
services.md > fonctionnalites[0-5]
visual-vocabulary.md > [terme]
constraints.md > [regle]
emotion-map.md > [ecran] > element signature
```

---

## Usage

| Etape | Lire |
|-------|------|
| D04 - Design Tokens | Extraire les valeurs repetees dans les wireframes (espacements, couleurs, typographie) |
| D06 - Core Screens | Le wireframe de chaque ecran (zones, contenu, layout, interactions) |
| D07 - Backend Integration | Le wireframe + api-contracts (endpoints par ecran) |
| D08 - Polish | emotion-map.md + constraints.md + transitions definies dans chaque wireframe |

---

## Couverture Navigation Map

Validation croisee avec `navigation-map.md` :

| Ecran navigation-map | Wireframe | Statut |
|---------------------|-----------|--------|
| Splash | splash.md | OK |
| Login | login.md | OK |
| Register (owner) | register.md | OK |
| Register Staff | register-staff.md | OK |
| Magic Link Sent | magic-link-sent.md | OK |
| Forgot Password | forgot-password.md | OK |
| Dashboard | dashboard.md | OK |
| Suivi Menages | suivi-menages.md | OK |
| Detail Reservation | detail-reservation.md | OK |
| Detail Anomalie | detail-anomalie.md | OK |
| Vue Mois Multi-Biens | calendrier-mois.md | OK |
| Detail Jour | calendrier-detail-jour.md | OK |
| Hub Gestion | hub-gestion.md | OK |
| Liste Proprietes | liste-proprietes.md | OK |
| Fiche Bien | fiche-bien.md | OK |
| Edition Bien | edition-bien.md | OK |
| Gestion Checklist | gestion-checklist.md | OK |
| Livret Accueil (preview) | livret-accueil-preview.md | OK |
| Liste Staff | liste-staff.md | OK |
| Fiche Agent | fiche-agent.md | OK |
| Inviter Agent | inviter-agent.md | OK |
| Parametres | parametres.md | OK |
| Planning Jour | planning-jour.md | OK |
| Fiche Intervention | fiche-intervention.md | OK |
| Infos Bien | infos-bien.md | OK |
| Signaler Probleme | signaler-probleme.md | OK |
| Mon Profil (Staff) | profil-staff.md | OK |
| Parametres Staff | parametres-staff.md | OK |
| Livret Accueil (public) | livret-accueil-public.md | OK |
| Modals partages | modals-shared.md | OK |
| Onboarding | onboarding.md | OK |
| Notifications | notifications.md | OK |

**Couverture : 32/32 (100%)**

---

**Important** : Toujours valider contre `02-art-direction/constraints.md`

---

*Document genere le 2026-02-20 -- D03-Wireframes / README*
