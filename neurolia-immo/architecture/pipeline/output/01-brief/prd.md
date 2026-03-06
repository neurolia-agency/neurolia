# PRD : Neurolia-Immo

## Resume Executif

**Client** : Neurolia (produit interne)
**Type d'application** : Dashboard (monitoring, coordination, analytics)
**Objectif mesurable** : Zero reservation manquee, zero menage oublie
**Audience cible** : Proprietaires de locations courte duree (1-10 biens) et leur personnel d'entretien

## Probleme

Les proprietaires de locations courte duree jonglent entre Airbnb et Booking sans vue consolidee. Les reservations sont dispersees, les menages sont coordonnes par SMS/WhatsApp avec des oublis frequents, et il n'existe aucun outil simple et abordable pour les petits proprietaires (2-5 biens) — les PMS existants sont trop lourds et trop chers.

## Solution

Un dashboard centralise qui ingere automatiquement les reservations via iCal et parsing d'emails proprietaire, genere les taches d'entretien a chaque checkout, et fournit au personnel un planning mobile clair avec checklists par bien. Un livret d'accueil digital par QR code complete l'experience voyageur sans necessiter d'acces aux plateformes.

## Personas

### Persona Principal : Marc (Proprietaire)
- **Age** : 30-60 ans
- **Profession** : Proprietaire de 1 a 10 biens en location courte duree
- **Contexte** : Bureau (desktop) + deplacement (mobile)
- **Probleme** : Jongler entre Airbnb et Booking manuellement, risque de double-reservation, aucune vue consolidee des revenus et occupations
- **Objectif** : Un endroit unique pour tout voir — reservations, calendrier, equipe, revenus
- **Frequence d'utilisation** : Quotidienne (consultations) + hebdomadaire (gestion)

### Persona Secondaire : Sarah (Personnel d'entretien)
- **Age** : 25-55 ans
- **Profession** : Personnel d'entretien (menage, linge, maintenance)
- **Contexte** : Terrain (mobile uniquement, en deplacement entre biens)
- **Probleme** : Infos recues par SMS/WhatsApp sans planning centralise, oublis frequents
- **Objectif** : Savoir OU aller, QUAND, et QUOI faire — avec la checklist du bien
- **Frequence d'utilisation** : Quotidienne (matin : planning, sur place : checklist)

## Objectifs & KPIs

| Objectif | KPI | Cible |
|----------|-----|-------|
| Aucune reservation manquee | Taux de reservations capturees (iCal + email vs plateforme) | 100% |
| Aucun menage oublie | Taches entretien generees automatiquement / checkouts detectes | 100% |
| Adoption personnel terrain | Taux de completion des checklists dans l'app | > 90% |
| Consolidation temps reel | Delai entre reservation plateforme et apparition dashboard | < 15 min |
| Fiabilite donnees | Taux de reconciliation reussie iCal + email | > 95% |

## Contraintes Techniques

- **Plateformes** : iOS (App Store) + Android (Google Play) + Web (mobile-first)
- **Offline** : Non requis MVP (nice-to-have Phase 2)
- **Notifications push** : Preparees MVP, activees Phase 2 (Web Push API)
- **Geolocalisation** : Non requis
- **Camera** : Oui — photos entretien (validation checklist), scan QR livret accueil
- **Biometrie** : Non requis
- **Performance** : < 3s chargement sur 4G, < 5 Mo bundle app
- **Integrations** :
  - Supabase (PostgreSQL + Auth + Realtime + Storage + Edge Functions)
  - n8n self-hosted (automations iCal sync, email parsing, notifications, taches entretien)
  - iCal feeds Airbnb/Booking (lecture seule)
  - IMAP boite mail proprietaire (lecture seule)
  - Supabase Auth (magic link + OAuth Google optionnel)

## Contraintes d'Acces Plateformes

| Source | Acces | Donnees |
|--------|-------|---------|
| iCal Airbnb/Booking | OUI | Dates, statut, nom partiel |
| Emails proprietaire (IMAP) | OUI | Confirmations/modifications/annulations avec details complets |
| Chat Airbnb/Booking | NON | — |
| API Airbnb/Booking | NON | — |
| Emails voyageurs | NON | — |

**Consequence** : Les 2 seules sources de donnees sont iCal (basique) et emails proprietaire (riche). L'email parsing est le canal d'enrichissement principal.

## Contraintes Business

- **Budget** : < 5 000 EUR (produit interne)
- **Delai** : MVP fonctionnel en 6-8 semaines
- **Equipe** : Fondateur/developpeur seul + Claude Code + n8n
- **Multi-tenant** : Isolation RLS par owner_id des le MVP

## Inspirations

| Application | Ce qu'on retient |
|-------------|-----------------|
| Notion | Clarte de l'interface, flexibilite des vues (tableau, calendrier, liste), sensation de controle |
| Linear | Rapidite, design epure, statuts visuels clairs |
| Airbnb (app hote) | Calendrier multi-biens, notifications claires, onboarding progressif |
| Hospitable | Dashboard simple multi-plateformes, vue consolidee des reservations |

## A Eviter

- Interfaces surchargees type backoffice ERP
- Designs "corporate" froids sans personnalite
- Onboarding complexe avant de voir le dashboard
- Mobile comme version degradee du desktop

## Hors-Scope (MVP)

- Messages directs aux voyageurs (pas d'acces aux messageries internes ni aux emails voyageurs)
- Channel manager (pas de synchronisation des prix/disponibilites vers les plateformes — lecture seule uniquement)
- Mode hors-ligne (Phase 2)
- Cartographie (Phase 2)
- Analytics avancees (Phase 2)
- Rapports automatises (Phase 2)
- Export comptable (Phase 2)
- Notifications push activees (preparees MVP, activees Phase 2)

---

*Neurolia-Immo v2.0 — PRD genere depuis brief-client.md*
