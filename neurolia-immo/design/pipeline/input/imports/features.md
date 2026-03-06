# Features - Neurolia-Immo

## Methode de Priorisation : MoSCoW

### Must Have (MVP)
> Fonctionnalites sans lesquelles l'app ne peut pas etre lancee.

| # | Feature | Description | Contrainte Mobile |
|---|---------|-------------|-------------------|
| F01 | Authentification & Roles | Signup/login avec 3 niveaux (owner, cleaning_staff, admin). Supabase Auth avec magic link + OAuth Google optionnel. Chaque owner invite son propre staff. | Aucune |
| F02 | Gestion des proprietes | CRUD proprietes : adresse, code d'acces, WiFi, URLs iCal (Airbnb + Booking), checklists d'entretien par bien, consignes specifiques. | Aucune |
| F03 | Ingestion iCal | Synchronisation periodique des flux iCal Airbnb et Booking via n8n. Detection nouvelles reservations, modifications, annulations. Upsert en base Supabase. | Aucune (backend n8n) |
| F04 | Ingestion email parsing | Lecture IMAP de la boite mail proprietaire via n8n. Parsing des emails de confirmation/modification/annulation Airbnb et Booking. Enrichissement des reservations iCal avec donnees extraites (nom voyageur, nombre de personnes, montant). | Aucune (backend n8n) |
| F05 | Reconciliation iCal + email | Croisement des 2 sources (iCal + email) pour eviter les doublons et enrichir les donnees iCal basiques avec les donnees email riches. Score de confiance par reservation. | Aucune (backend n8n) |
| F06 | Dashboard proprietaire | Vue reservations (liste + calendrier multi-biens). KPIs : taux d'occupation, revenus, nuits a venir. Alertes : arrivees/departs du jour, anomalies. | Responsive mobile-first |
| F07 | Dashboard entretien | Planning jour/semaine par agent. Fiche intervention par bien (adresse, code, checklist). Validation checklist avec photos. Statut temps reel (a faire / en cours / termine). | Camera (photos checklist) |
| F08 | Planning intelligent | Repartition equitable des missions entre les agents d'entretien en fonction de leur disponibilite, localisation et charge de travail. | Aucune |
| F09 | Multi-proprietaire (multi-tenant) | Isolation complete entre proprietaires via RLS Supabase (owner_id). Chaque owner gere ses biens, son equipe, ses donnees. Inscription self-service. Un proprietaire ne voit jamais les donnees d'un autre. | Aucune |

### Should Have (MVP+)
> Fonctionnalites importantes mais dont l'absence ne bloque pas le lancement.

| # | Feature | Description | Contrainte Mobile |
|---|---------|-------------|-------------------|
| F10 | Notifications internes | Alertes push/email pour le proprietaire (nouvelle reservation, annulation, anomalie). Notifications staff (nouvelle tache assignee, rappel). Web Push API preparee, activation Phase 2. | Push (preparee) |
| F11 | Livret d'accueil digital | Page publique par propriete (sans auth). QR code imprimable. Infos pratiques : WiFi, regles maison, numeros utiles, recommandations locales. | QR code scan |
| F12 | Creation automatique taches entretien | Generation automatique des taches menage a chaque checkout detecte via n8n. Attribution selon planning intelligent (F08). | Aucune (backend n8n) |

### Could Have (Phase 2)
> Fonctionnalites souhaitees si le budget et le temps le permettent.

| # | Feature | Description | Contrainte Mobile |
|---|---------|-------------|-------------------|
| F20 | Export comptable | Export CSV/PDF des revenus par bien, par periode, par plateforme. | Aucune |
| F21 | Notifications avancees | Rappels automatiques (J-1 arrivee, J menage), digest hebdomadaire proprietaire. | Push |
| F22 | Mode hors-ligne | Cache local des taches et checklists pour le personnel terrain sans connexion. | Offline-first |
| F23 | Cartographie | Vue carte des biens avec statut occupation. | GPS |
| F24 | Analytics avancees | Statistiques detaillees par bien, par saison, comparaison inter-plateformes. | Aucune |

### Won't Have (Hors-Scope)
> Fonctionnalites explicitement exclues du projet.

- **Messages directs aux voyageurs** : Pas d'acces aux messageries internes Airbnb/Booking, pas d'API plateforme, pas d'acces aux emails voyageurs
- **Channel manager** : Pas de synchronisation des prix/disponibilites vers les plateformes — lecture seule uniquement
- **Tarification dynamique** : Gestion des prix deleguee aux plateformes (ou outils specialises comme Pricelabs)
- **Moteur de reservation directe** : Pas de site de reservation, toutes les reservations viennent des plateformes
- **Workflows d'approbation** : Non requis pour ce type d'application

## Dependances entre Features

| Feature | Depend de |
|---------|-----------|
| F02 (Proprietes) | F01 (Auth) |
| F03 (iCal) | F02 (Proprietes — URLs iCal par bien) |
| F04 (Email parsing) | F02 (Proprietes — configuration IMAP owner) |
| F05 (Reconciliation) | F03 (iCal) + F04 (Email parsing) |
| F06 (Dashboard proprio) | F01 (Auth) + F05 (Reconciliation — donnees fiables) |
| F07 (Dashboard entretien) | F01 (Auth) + F02 (Proprietes — checklists) + F12 (Taches auto) |
| F08 (Planning intelligent) | F07 (Dashboard entretien) + F12 (Taches auto) |
| F09 (Multi-tenant) | F01 (Auth — RLS) |
| F10 (Notifications) | F05 (Reconciliation — declencheurs) |
| F11 (Livret accueil) | F02 (Proprietes — infos bien) |
| F12 (Taches auto) | F03 (iCal — detection checkout) + F02 (Proprietes — checklists) |
| F20 (Export) | F05 (Reconciliation — donnees financieres) |
| F21 (Notifs avancees) | F10 (Notifications) |

## Points de Contact n8n

| Feature | Automation n8n |
|---------|---------------|
| F03 (iCal) | Workflow de synchronisation periodique des feeds iCal Airbnb/Booking. Fetch, parse, upsert en base Supabase. |
| F04 (Email parsing) | Workflow IMAP : connexion boite mail proprietaire, detection emails plateformes, extraction donnees reservation (regex + IA optionnel). |
| F05 (Reconciliation) | Workflow de croisement iCal + email : matching par dates/nom, enrichissement, deduplication, score de confiance. |
| F10 (Notifications) | Workflows de notification : nouvelle reservation → email/push owner ; nouvelle tache → notification staff. |
| F12 (Taches auto) | Workflow de creation taches : a chaque checkout detecte, generer tache menage, attribuer agent selon planning intelligent. |
| Transversal | Workflow error handler : gestion centralisee des erreurs n8n avec alertes owner. |
| Transversal | Health check : verification periodique que les syncs iCal et IMAP fonctionnent correctement. |

---

*Neurolia-Immo v2.0 — Features generees depuis brief-client.md*
