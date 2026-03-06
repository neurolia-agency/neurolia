# Fonctionnalites

> D01-Brand | Phase 3a : Fonctionnalites cles de l'application
> Source : 00-platform.md, features.md, navigation-map.md

---

## Fonctionnalite 1 : Centralisation des Reservations

- **Icone** : calendar-check (Lucide)
- **Tagline** : "Toutes vos reservations, un seul ecran."
- **Description** : Les reservations Airbnb et Booking sont importees automatiquement via iCal et email parsing. Les deux sources sont croisees pour enrichir les donnees et detecter les anomalies. Le proprietaire consulte un calendrier multi-biens consolide avec filtres par plateforme, par bien et par statut.
- **Ecran principal** : Dashboard Accueil (Owner)
- **Action principale** : Consulter le calendrier

## Fonctionnalite 2 : Coordination Equipe Entretien

- **Icone** : clipboard-check (Lucide)
- **Tagline** : "Chaque menage planifie, chaque tache validee."
- **Description** : A chaque checkout detecte, une tache de menage est generee et assignee automatiquement a un agent d'entretien selon sa disponibilite et sa charge. L'agent recoit son planning du jour avec checklists par bien, prend des photos de validation, et confirme l'intervention en un geste. Le proprietaire suit l'avancement en temps reel.
- **Ecran principal** : Planning Jour (Staff)
- **Action principale** : Valider une intervention

## Fonctionnalite 3 : Detection d'Anomalies

- **Icone** : shield-alert (Lucide)
- **Tagline** : "Les problemes detectes avant qu'ils n'arrivent."
- **Description** : Le systeme croise les donnees iCal et email en continu. Il detecte automatiquement les doubles reservations, les creneaux bloques sans reservation correspondante, et les echecs de synchronisation. Le proprietaire recoit une alerte avec le detail du conflit et les actions possibles.
- **Ecran principal** : Dashboard Accueil (bloc Alertes)
- **Action principale** : Consulter et resoudre une alerte

## Fonctionnalite 4 : Gestion des Biens

- **Icone** : home (Lucide)
- **Tagline** : "Chaque bien, toutes ses infos, en un seul endroit."
- **Description** : Chaque propriete dispose d'une fiche complete : adresse, code d'acces, WiFi, URLs iCal, checklist d'entretien personnalisee, et consignes specifiques. L'etat operationnel (occupe, libre, menage en cours) est visible instantanement. Un livret d'accueil digital accessible par QR code complete l'experience voyageur.
- **Ecran principal** : Fiche Bien (Owner)
- **Action principale** : Configurer un bien

## Fonctionnalite 5 : Planning Intelligent

- **Icone** : users (Lucide)
- **Tagline** : "La bonne personne, au bon endroit, au bon moment."
- **Description** : Les taches d'entretien sont reparties equitablement entre les agents en fonction de leur disponibilite et de leur charge de travail. Le proprietaire visualise le planning de chaque agent et peut ajuster les affectations si necessaire. Les taches ponctuelles (nettoyage specifique, maintenance) s'integrent au meme planning.
- **Ecran principal** : Suivi Menages (Owner) / Planning Jour (Staff)
- **Action principale** : Consulter le planning equipe

## Fonctionnalite 6 : Livret d'Accueil Digital

- **Icone** : qr-code (Lucide)
- **Tagline** : "Un QR code, tout ce que le voyageur doit savoir."
- **Description** : Chaque propriete genere automatiquement une page publique (sans authentification) contenant les informations pratiques : WiFi, regles de la maison, numeros utiles, recommandations locales. Le QR code peut etre imprime et place dans le logement. Les voyageurs accedent a l'information sans application, sans compte.
- **Ecran principal** : Livret Accueil Preview (Owner)
- **Action principale** : Partager le QR code

---

*Document genere le 2026-02-20 -- D01-Brand / Services*
