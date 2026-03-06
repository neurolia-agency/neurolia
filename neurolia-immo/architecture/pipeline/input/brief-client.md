# Brief Client - Neurolia-Immo

Dashboard de gestion de locations courte duree (Airbnb/Booking).

---

## 1. Informations Generales

### Entreprise
- **Nom** : Neurolia
- **Secteur d'activite** : PropTech / Gestion locative courte duree
- **Date de creation** : 2024
- **Nombre d'employes** : < 5

### Contact Projet
- **Nom** : Dorian (Product Owner)
- **Role** : Fondateur / Developpeur
- **Email** : -
- **Telephone** : -

---

## 2. Projet Mobile

### Type d'Application
- [x] Dashboard (monitoring, analytics, coordination)

### Objectif Principal
> Quel est l'objectif #1 de cette application ?

- [x] Automatiser un processus metier
- [x] Fournir un tableau de bord / suivi
- [x] Remplacer un processus manuel

Objectif mesurable : **Zero reservation manquee, zero menage oublie.**

Centraliser toutes les reservations provenant d'Airbnb et Booking (via iCal + parsing d'emails proprietaire) dans un dashboard unique. Coordonner automatiquement les taches d'entretien (menage, linge, maintenance) entre le proprietaire et le personnel de terrain. Offrir un livret d'accueil digital aux voyageurs.

### Audience Cible

**Persona 1 : Proprietaire / Gestionnaire**

```
Age : 30-60 ans
Profession : Proprietaire de 1 a 10 biens en location courte duree (particulier ou professionnel)
Contexte d'utilisation : Bureau (desktop) + deplacement (mobile)
Frequence d'utilisation prevue : Quotidienne (consultations) + hebdomadaire (gestion)
Niveau technique : Moyen — sait utiliser Airbnb/Booking, pas forcement tech-savvy
Probleme principal : Jongler entre Airbnb et Booking manuellement, risque de double-reservation,
                     oubli de menages, pas de vue consolidee des revenus et occupations
Ce qu'il cherche : Un endroit unique pour TOUT voir — reservations, calendrier, equipe, revenus
```

**Persona 2 : Personnel d'entretien (femme/homme de menage, agent)**

```
Age : 25-55 ans
Profession : Personnel d'entretien (menage, linge, maintenance)
Contexte d'utilisation : Terrain (mobile uniquement, souvent en deplacement entre biens)
Frequence d'utilisation prevue : Quotidienne (matin : consulter planning, sur place : checker taches)
Niveau technique : Basique — smartphone, pas d'experience apps metier
Probleme principal : Recevoir les infos par SMS/WhatsApp, pas de planning centralise, oublis
Ce qu'il cherche : Savoir OU aller, QUAND, et QUOI faire — avec la checklist du bien
```

### Concurrents / Alternatives

1. **Superhote** (superhote.com) : PMS francais complet — calendrier multi-plateformes,
   creation taches automatique, gestion equipe, tarification dynamique (Pricelabs),
   moteur de reservation directe, portail comptable. Forces : UX simple vs "usines a gaz",
   support FR reactif, fait en France. Faiblesses : pricing opaque (demo obligatoire),
   pas de free trial, oriente gestion lourde (channel manager, pricing) dont on n'a pas besoin.
   Neurolia-Immo se differencie par la legerete (pas de channel manager),
   le livret d'accueil digital, et le cout zero (produit interne).
2. **Lodgify** : PMS complet avec channel manager, lourd et cher pour un particulier
   avec 2-5 biens. Neurolia-Immo vise la simplicite.
3. **Tableur Google Sheets** : C'est ce que font la plupart des petits proprietaires —
   manuel, fragile, pas temps reel.

---

## 3. Features

### Features MVP (Version 1)

1. **Authentification & Roles** : Signup/login avec 3 niveaux : owner (proprietaire), cleaning_staff (personnel), admin (super-admin optionnel). Chaque owner gere ses biens et invite son propre staff. Isolation RLS par owner_id.
2. **Gestion des proprietes** : CRUD proprietes avec adresse, code d'acces, WiFi, URLs iCal (Airbnb + Booking), checklists d'entretien par bien, consignes specifiques.
3. **Ingestion des reservations (2 sources)** :
   - **iCal sync** : Synchronisation periodique des flux iCal Airbnb et Booking. Detection nouvelles reservations, modifications, annulations.
   - **Email parsing** : Lecture IMAP de la boite mail proprietaire. Parsing des emails de confirmation/modification/annulation Airbnb et Booking. Enrichissement des reservations iCal avec les donnees extraites (nom voyageur, nombre de personnes, montant, etc.).
4. **Dashboard proprietaire** : Vue reservations (liste + calendrier multi-biens), KPIs (taux d'occupation, revenus, nuits a venir), alertes (arrivees/departs du jour, anomalies).
5. **Dashboard entretien** : Planning jour/semaine par agent, fiche intervention par bien (adresse, code, checklist), validation checklist avec photos, statut temps reel (a faire / en cours / termine). Planning intelligent : repartition equitable des missions entre les agents d'entretien en fonction de leur disponibilite, localisation et charge de travail.
6. **Notifications internes** : Alertes push/email pour le proprietaire (nouvelle reservation, annulation, anomalie). Notifications staff (nouvelle tache assignee, rappel). Pas de notifications vers les voyageurs (hors-scope).
7. **Livret d'accueil digital** : Page publique par propriete (pas d'auth requise). QR code imprimable a placer dans le logement. Infos pratiques : WiFi, regles maison, numeros utiles, recommandations locales.
8. **Multi-proprietaire** : Chaque proprietaire a ses propres biens, son equipe, ses donnees. Isolation complete entre proprietaires (multi-tenant). Un proprietaire ne voit jamais les donnees d'un autre. Inscription self-service.

### Features Phase 2

1. **Export comptable** : Export CSV/PDF des revenus par bien, par periode, par plateforme.
2. **Notifications avancees** : Rappels automatiques (J-1 arrivee, J menage), digest hebdomadaire proprietaire.

### Hors-Scope

- **Messages directs aux voyageurs** : Pas d'acces aux messageries internes Airbnb/Booking, pas d'API plateforme, pas d'acces aux emails voyageurs. Toute communication voyageur reste dans les apps Airbnb/Booking.
- **Channel manager** : Pas de synchronisation des prix/disponibilites VERS les plateformes. Lecture seule.

### Priorites

| Feature | Priorite |
|---------|----------|
| Auth & Roles | Critique |
| Gestion proprietes | Critique |
| Ingestion iCal | Critique |
| Ingestion email parsing | Critique |
| Dashboard proprietaire | Critique |
| Dashboard entretien | Critique |
| Planning intelligent (repartition equitable) | Critique |
| Multi-proprietaire (multi-tenant) | Critique |
| Notifications internes | Important |
| Livret d'accueil digital | Important |
| Export comptable | Nice-to-have |
| Notifications avancees | Nice-to-have |

---

## 4. Integrations

### APIs Tierces

- [x] Authentification externe (Google, Apple, Facebook) : **Supabase Auth** (magic link + OAuth Google optionnel)
- [x] Notifications push (Firebase, OneSignal) : **Web Push API** (preparees, activation Phase 2)
- [ ] Paiement : Non requis
- [ ] Cartographie : Non requis MVP (Phase 2 eventuellement)
- [ ] Analytics : Non requis MVP
- [ ] CRM / ERP existant : Non

### Automations n8n

- [x] **Synchronisation iCal** : Fetch periodique des flux iCal Airbnb/Booking, parsing des evenements, upsert en base
- [x] **Parsing emails proprietaire** : Connexion IMAP a la boite mail du proprietaire, detection emails Airbnb/Booking, extraction donnees reservation, enrichissement base
- [x] **Creation taches entretien** : Generation automatique des taches menage a chaque checkout detecte
- [x] **Notifications automatiques** : Email/push vers owner (nouvelle resa, annulation) et staff (nouvelle tache)
- [x] **Reconciliation iCal + email** : Croisement des 2 sources pour fiabiliser les donnees reservation
- [ ] Rapports automatises : Phase 2
- [ ] Workflows d'approbation : Non requis

> **Note** : Cette liste est non-exhaustive. Le pipeline N01 determinera l'arbre
> complet des workflows necessaires en fonction de l'architecture produite.
> D'autres automations pourront etre ajoutees (ex: alertes anomalies,
> synchronisation inter-sources, nettoyage donnees, health checks, etc.).

> **Contrainte technique n8n** : JAMAIS de variables d'environnement (.env)
> dans les workflows n8n. TOUJOURS utiliser un noeud "Set" de configuration
> en debut de workflow pour centraliser les parametres. Cela garantit la
> portabilite des workflows et la visibilite des configurations.

### Services Existants

```
Backend existant : Supabase (PostgreSQL + Auth + Realtime + Storage + Edge Functions)
Base de donnees existante : PostgreSQL via Supabase (a re-concevoir from scratch)
API existante : Supabase auto-generated REST + Realtime subscriptions
Outils internes : n8n self-hosted (instance existante)
```

### Contraintes d'Acces Plateformes (CRITIQUE)

| Source | Acces | Methode | Donnees disponibles |
|--------|-------|---------|---------------------|
| **iCal Airbnb** | OUI | URL feed en lecture | Dates, statut, nom (partiel) |
| **iCal Booking** | OUI | URL feed en lecture | Dates, statut, nom (partiel) |
| **Emails proprietaire** | OUI | IMAP (lecture) | Confirmations, modifications, annulations avec details complets (nom, nb personnes, montant, etc.) |
| **Chat Airbnb** | NON | — | — |
| **Chat Booking** | NON | — | — |
| **API Airbnb** | NON | — | — |
| **API Booking** | NON | — | — |
| **Emails voyageurs** | NON | — | — |

**Consequence** : Les 2 seules sources de donnees sont iCal (basique) et emails proprietaire (riche). L'email parsing est le canal d'enrichissement principal. Toute feature supposant un acces direct aux voyageurs ou aux APIs plateformes est hors-scope.

---

## 5. Contraintes Mobiles

### Fonctionnalites Natives
- [ ] Mode hors-ligne (offline-first) — Nice-to-have Phase 2
- [x] Notifications push — Preparees MVP, activees Phase 2
- [ ] Geolocalisation — Non requis
- [x] Camera / Scan QR — Photos entretien (validation checklist), scan QR livret accueil
- [ ] Stockage local important — Non requis
- [ ] Biometrie (Face ID, empreinte) — Non requis
- [ ] Bluetooth / NFC — Non requis
- [ ] Accelerometre / capteurs — Non requis

### Distribution
- [x] iOS (App Store)
- [x] Android (Google Play)
- [x] Web (version navigateur compatible)

Strategie : Mobile-first avec presence sur les stores (formule la moins chere).
Le choix technique (Capacitor wrapper, Expo, React Native, etc.) sera determine
en A05-Tech Stack. L'objectif est d'avoir une app installable sur les stores
avec un budget minimal, tout en maintenant une version web accessible.
Le personnel d'entretien doit pouvoir installer l'app depuis le store
comme n'importe quelle application.

### Performance

```
Temps de chargement max : < 3s sur 4G
Taille max de l'app : < 5 Mo (PWA bundle)
Usage donnees mobiles : Leger (texte + photos compressees)
```

---

## 6. Identite Visuelle

### Identite Existante
- [x] Identite existante de la v1 (dans `design/pipeline/input/references/`) — comme reference/inspiration
- [ ] Aucune identite existante (a creer)

La v1 avait une identite complete (couleurs OKLCH, typographies, composants). Les fichiers sont disponibles dans `design/pipeline/input/references/` comme materiel de reference. Le pipeline Design (D01-D02) produira une identite neuve qui peut s'en inspirer mais n'est pas tenue de la reproduire.

### Ton de Communication
- [x] Professionnel mais accessible

Le ton doit etre rassurant et efficace. Les proprietaires veulent se sentir en controle. Le personnel d'entretien veut des instructions claires et simples.

### Tutoiement / Vouvoiement
- [x] Vouvoiement

---

## 7. Inspirations

### Applications Aimees

1. **Notion** : Ce que j'aime → Clarte de l'interface, flexibilite des vues (tableau, calendrier, liste), sensation de controle
2. **Linear** : Ce que j'aime → Rapidite, design epure, statuts visuels clairs, raccourcis clavier
3. **Airbnb (app hote)** : Ce que j'aime → Calendrier multi-biens, notifications claires, onboarding progressif
4. **Hospitable** : Ce que j'aime → Dashboard simple pour multi-plateformes, vue consolidee des reservations

### Applications a Eviter

```
- Interfaces surchargees type backoffice ERP (trop de menus, trop de colonnes)
- Designs "corporate" froids sans personnalite
- Onboarding complexe avec trop d'etapes avant de voir le dashboard
- Mobile comme version degradee du desktop — le mobile doit etre pense comme experience a part entiere
```

---

## 8. Budget & Timeline

### Budget
- [x] < 5 000 EUR (produit interne Neurolia)

### Delai Souhaite
- [x] Normal (1-3 mois)

MVP fonctionnel en 6-8 semaines.

### Autres Contraintes

```
- Instance n8n self-hosted deja disponible
- Projet Supabase a creer (ou re-utiliser existant si pertinent)
- Deploiement Vercel (coherent avec le reste du workspace Neurolia)
- Le produit est interne Neurolia mais concu comme un produit generique (pas specifique a un client unique)
- Multi-proprietaire (multi-tenant) des le MVP — isolation RLS par owner_id
```

---

## 9. Notes Additionnelles

```
Ce brief remplace entierement le brief v1 (clients/dashboard-loc-immo/).
Le projet est re-concu from scratch en utilisant les 3 templates app (Architecture → n8n → Design).

Points cles :
- Les workflows n8n v1 sont disponibles dans n8n/pipeline/input/existing-workflows/ pour analyse.
  Ils ne sont PAS conserves tacitement — le pipeline N01 decidera quels workflows creer.
- L'identite visuelle v1 est disponible dans design/pipeline/input/references/ pour inspiration.
  Le pipeline D01-D02 produira des outputs neufs.
- La reconciliation iCal + email est un point technique critique : les 2 sources doivent etre
  croisees pour eviter les doublons et enrichir les donnees iCal (basiques) avec les donnees
  email (riches).
- Le livret d'accueil est une page publique sans auth — accessible par QR code dans le logement.
  C'est un differentiel important vs les solutions concurrentes.
- Le multi-proprietaire est une feature MVP (multi-tenant avec isolation RLS par owner_id).
  Chaque proprietaire gere ses propres biens et son equipe de maniere isolee.
- Contrainte n8n : JAMAIS de .env dans les workflows n8n. Toujours utiliser un noeud "Set"
  de configuration en debut de workflow pour centraliser les parametres (portabilite + visibilite).
```

---

**Date de remplissage** : 2026-02-19
**Valide par le client** : [x] Oui (produit interne)

---

*Neurolia-Immo v2.0 — Brief reconcu from scratch*
