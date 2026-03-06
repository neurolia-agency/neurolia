# Positionnement

> D01-Brand | Phase 3a : Arguments, messages par ecran, CTAs
> Source : 00-platform.md, navigation-map.md, user-flows

---

## Tagline

**"Vos locations, zero oubli."**

Processus de selection (5 propositions evaluees sur 20 -- memorabilite, clarte, emotion, brevete) :

| Proposition | Score | Notes |
|-------------|-------|-------|
| "Vos locations, zero oubli." | 18/20 | 4 mots. Promesse universelle. Rythme binaire percutant. |
| "Gerez vos locations en confiance." | 15/20 | Bon message mais trop courant dans le secteur. |
| "La location courte duree, maitrisee." | 16/20 | Fort mais long (5 mots) et un peu sec. |
| "Zero resa manquee, zero menage oublie." | 15/20 | Trop specifique, ne couvre pas la vision globale. |
| "Tout voir, rien oublier." | 17/20 | Percutant mais trop generique (applicable a n'importe quel dashboard). |

## Baseline

**"Le dashboard qui centralise vos reservations et coordonne vos equipes d'entretien."**

(14 mots, precise le "comment" de la tagline.)

## 3 Arguments de Vente (USPs)

1. **Centralisation automatique** : Les reservations Airbnb et Booking sont importees et croisees automatiquement sans saisie manuelle, via iCal et email parsing.
2. **Coordination equipe integree** : Chaque checkout genere une tache d'entretien assignee au bon agent. Le proprietaire suit en temps reel, l'agent a son planning mobile complet.
3. **Concu pour les petits proprietaires** : Interface simple, pas de formation, onboarding en 3 etapes. Un outil professionnel a un cout accessible, pense pour 1 a 10 biens.

## CTA Principal

- **Texte** : "Commencer gratuitement"
- **Action** : Ecran Register (inscription owner)

## CTA Secondaire

- **Texte** : "Decouvrir les fonctionnalites"
- **Action** : Scroll vers la section fonctionnalites (page marketing, hors-scope MVP)

---

## Differenciation

Neurolia-Immo est le seul outil de gestion locative concu specifiquement pour les petits proprietaires (1-10 biens) qui ne disposent pas d'acces aux API Airbnb/Booking. La double ingestion iCal + email parsing fournit des donnees riches (nom voyageur, montant, nombre de personnes) sans jamais necessiter d'integration officielle avec les plateformes. La coordination equipe d'entretien est integree nativement, pas en supplement.

---

## Messages par Ecran

### Ecrans d'entree

- **Splash** : "Neurolia-Immo" (logo + nom, pas de message additionnel)
- **Onboarding step 1** : "Bienvenue sur Neurolia-Immo. Centralisez vos reservations Airbnb et Booking en un seul endroit."
- **Onboarding step 2** : "Ajoutez votre premier bien et importez vos reservations automatiquement."
- **Onboarding step 3** : "Votre equipe d'entretien recoit son planning directement. Zero oubli."
- **Login** : "Connectez-vous a votre espace." (sous le logo, au-dessus du formulaire)
- **Register** : "Creez votre compte proprietaire." (titre du formulaire)
- **Register Staff** : "Rejoignez l'equipe de [prenom proprietaire]." (titre personnalise)
- **Magic Link Sent** : "Un lien de connexion vous a ete envoye par email. Verifiez votre boite de reception."

### Ecrans principaux (Owner)

- **Dashboard Accueil** : "Bonjour [prenom]." (salutation sobre en header, pas de tagline repetee)
- **Calendrier Vue Mois** : "Calendrier" (titre de page seul, pas de message additionnel -- les donnees parlent)
- **Hub Gestion** : "Gestion" (acces biens, equipe, parametres -- pas de message, juste les liens)

### Ecrans principaux (Staff)

- **Planning Jour** : "Votre planning du [date]" (titre dynamique, factuel)
- **Fiche Intervention** : "[Nom du bien] -- [Type de tache]" (contexte immediat sans phrase)
- **Infos Bien** : "Informations du bien" (titre fonctionnel)

### Ecrans secondaires

- **Detail Reservation** : Pas de message -- les donnees structurees suffisent.
- **Detail Anomalie** : "Anomalie detectee" (titre) + description factuelle du conflit.
- **Fiche Bien** : "[Nom du bien]" (titre dynamique)
- **Fiche Agent** : "[Prenom de l'agent]" (titre dynamique)
- **Livret Accueil Preview** : "Livret d'accueil -- [Nom du bien]"

### Empty States

- **Aucune reservation** : "Aucune reservation pour cette periode."
- **Aucun bien** : "Ajoutez votre premier bien pour commencer."
- **Aucune tache (Staff)** : "Rien de prevu aujourd'hui. Bonne journee !"
- **Aucun resultat recherche** : "Aucun resultat pour cette recherche."
- **Aucun staff** : "Invitez votre premier collaborateur."

### Messages de feedback

- **Success (generique)** : "Enregistre."
- **Success (bien ajoute)** : "Bien ajoute avec succes."
- **Success (intervention terminee)** : "Intervention terminee a [heure]."
- **Error (generique)** : "Une erreur est survenue. Veuillez reessayer."
- **Error (reseau)** : "Connexion perdue. Les donnees affichees datent de [heure]."
- **Error (champ requis)** : "Ce champ est requis."

### Notifications Push

- **Nouvelle reservation** : "Nouvelle reservation : [Bien], [dates] ([plateforme])"
- **Annulation** : "Annulation : [Bien], [dates]. Tache menage annulee."
- **Anomalie** : "Attention : conflit detecte sur [Bien], [dates]."
- **Tache assignee (Staff)** : "Nouvelle tache : [Bien], [heure]"
- **Planning matin (Staff)** : "[N] tache(s) aujourd'hui. Premiere a [heure]."
- **Intervention terminee (Owner)** : "Menage termine : [Bien], [heure]."

---

## CTAs par Ecran

Tous les CTAs utilisent des verbes d'action adaptes au contexte mobile (tactile, immediat).

| Ecran | CTA | Verbe d'action |
|-------|-----|----------------|
| Onboarding (step 1) | "Commencer" | Commencer |
| Onboarding (step 2) | "Ajouter mon premier bien" | Ajouter |
| Onboarding (step 3) | "Acceder au dashboard" | Acceder |
| Login | "Recevoir le lien de connexion" | Recevoir |
| Login (OAuth) | "Continuer avec Google" | Continuer |
| Register | "Creer mon compte" | Creer |
| Dashboard | "Suivi menages" | Suivre |
| Dashboard (alerte) | "Voir le detail" | Voir |
| Calendrier | "Filtrer" | Filtrer |
| Mes Biens | "Ajouter un bien" | Ajouter |
| Fiche Bien | "Modifier" | Modifier |
| Fiche Bien (checklist) | "Gerer la checklist" | Gerer |
| Fiche Bien (livret) | "Partager le QR code" | Partager |
| Mon Equipe | "Inviter un collaborateur" | Inviter |
| Planning (Staff) | "Voir la fiche" | Voir |
| Fiche Intervention (Staff) | "Commencer" | Commencer |
| Fiche Intervention (Staff) | "Terminer" | Terminer |
| Fiche Intervention (Staff) | "Signaler un probleme" | Signaler |
| Infos Bien (Staff) | "Ouvrir dans Maps" | Ouvrir |
| Parametres | "Enregistrer" | Enregistrer |
| Confirmation suppression | "Supprimer" | Supprimer |
| Confirmation annulation | "Annuler" | Annuler |

---

*Document genere le 2026-02-20 -- D01-Brand / Positioning*
