# Personas

> D01-Brand | Phase 3b : Profils utilisateurs mobiles
> Source : 00-platform.md, prd.md, user-flows

---

## Persona Principal : Marc (Proprietaire)

### Profil

- **Age** : 30-60 ans
- **Profession** : Proprietaire / gestionnaire de 1 a 10 biens en location courte duree
- **Situation** : Gere ses locations en parallele d'une autre activite professionnelle ou en activite principale
- **Device principal** : iPhone et/ou Android + ordinateur portable (usage mixte desktop/mobile)
- **Digital literacy** : Intermediaire a avance. A l'aise avec les apps de gestion, Airbnb, Booking, Google Sheets. Pas developpeur.

### Contexte d'Usage

- **Quand** : Le matin (routine : verification arrivees/departs du jour), en journee (verifications ponctuelles, alertes), en soiree (bilan hebdomadaire, gestion des biens)
- **Ou** : Au bureau (desktop), en deplacement (mobile), a domicile (les deux)
- **Duree session** : Courte < 2 min (consultation dashboard matin) a moyenne 5-15 min (gestion biens, parametrage)
- **Frequence** : Quotidienne (consultations) + hebdomadaire (gestion)

### Probleme

Marc jongle entre les applications Airbnb et Booking sans vue consolidee. Il maintient un tableur manuel pour croiser les donnees et coordonne ses menages par WhatsApp. Les risques de double-reservation, d'oubli de menage et de perte d'information sont permanents. Les PMS existants sont trop chers et trop complexes pour ses 3 biens.

### Objectif

Un endroit unique pour tout voir en un coup d'oeil : reservations a venir, arrivees/departs du jour, statut des menages, revenus. Etre alerte quand quelque chose ne va pas, ne rien avoir a faire quand tout va bien.

### Freins

- **Complexite d'adoption** : Si l'outil demande plus de 10 minutes pour demarrer, il abandonne et retourne a son tableur.
- **Cout** : Les PMS a 40-80 EUR/mois ne sont pas justifies pour 3 biens. Le rapport valeur/prix doit etre evident.
- **Fiabilite** : Si une reservation n'apparait pas ou apparait en double, la confiance est perdue immediatement. La premiere impression est decisive.
- **Temps** : Marc n'a pas de temps a consacrer a la configuration. L'import doit etre automatique.

### Parcours Type

1. Ouvre l'app le matin sur mobile --> Dashboard Accueil
2. Lit les alertes (si existantes) et le bloc "Aujourd'hui" --> Rassurant ou action requise
3. Verifie le calendrier si besoin --> Vue mois multi-biens
4. Ferme l'app en < 2 minutes --> Serenite confirmee

### Parcours Secondaire (Gestion)

1. Ouvre l'app sur desktop en soiree --> Dashboard puis tab Gestion
2. Configure un nouveau bien --> Formulaire (nom, adresse, iCal, checklist)
3. Invite un agent d'entretien --> Lien d'invitation
4. Verifie les KPIs de la semaine --> Bloc "Cette semaine" du Dashboard

### Message Cle

"Voyez tout, n'oubliez rien. Vos locations sont sous controle."

---

## Persona Secondaire : Sarah (Personnel d'Entretien)

### Profil

- **Age** : 25-55 ans
- **Profession** : Personnel d'entretien (menage, linge, maintenance ponctuelle)
- **Situation** : Intervient chez plusieurs proprietaires, se deplace entre les biens en journee
- **Device principal** : Smartphone Android (principalement) ou iPhone, usage exclusivement mobile
- **Digital literacy** : Debutante a intermediaire. Utilise WhatsApp, Google Maps, l'appareil photo. Pas necessairement a l'aise avec des applications complexes.

### Contexte d'Usage

- **Quand** : Le matin tot (7h-8h, consulte le planning), sur site (entre chaque intervention, consulte la fiche et la checklist), entre deux biens (infos du bien suivant)
- **Ou** : En deplacement (transport, voiture), devant la porte du logement (code d'acces), a l'interieur du logement (checklist)
- **Duree session** : Tres courte < 1 min (consulte le code, verifie l'heure) a courte 2-5 min (parcourt la checklist, prend les photos)
- **Frequence** : Quotidienne, plusieurs sessions courtes par jour

### Probleme

Sarah recoit ses consignes par SMS et WhatsApp, parfois la veille, parfois le matin meme. Les informations sont dispersees dans des conversations. Elle oublie un code d'acces, se trompe de logement, ou decouvre une tache imprevue sur place. Elle n'a aucun historique centralise de ses interventions.

### Objectif

Savoir exactement ou aller, quand, et quoi faire -- sans avoir a demander au proprietaire. Avoir le code d'acces accessible instantanement devant la porte. Cocher ses taches et passer au logement suivant sans perte de temps.

### Freins

- **Complexite de l'interface** : Si l'app demande plus de 2 taps pour acceder au code d'acces ou a la checklist, Sarah prefere appeler le proprietaire.
- **Taille des elements** : Utilise son telephone debout, souvent d'une seule main. Les boutons doivent etre grands, les textes lisibles sans zoom.
- **Confiance technique** : Si l'app plante ou ne charge pas (mauvaise connexion sur le terrain), elle perd confiance et retourne a WhatsApp.
- **Pertinence** : Ne veut voir que ce qui la concerne. Aucun interet pour les revenus, les KPIs ou les details financiers du proprietaire.

### Parcours Type

1. Recoit la notification push le matin --> "3 taches aujourd'hui"
2. Ouvre l'app --> Planning Jour (liste chronologique)
3. Tap sur la premiere tache --> Fiche Intervention
4. Tap "Infos du bien" --> Adresse (tap pour GPS), code d'acces (gros, copiable), WiFi
5. Retour Fiche Intervention --> Tap "Commencer"
6. Coche chaque item de la checklist, prend les photos requises
7. Tap "Terminer" --> Confirmation avec horodatage
8. Retour Planning --> Prochaine tache mise en avant
9. Repete pour chaque tache de la journee

### Message Cle

"Votre planning est pret. Tout ce dont vous avez besoin est la."

---

*Document genere le 2026-02-20 -- D01-Brand / Personas*
