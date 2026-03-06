# Onboarding (Owner - 3 Etapes) - Wireframe

**Route** : /onboarding (apres inscription Owner)
**Objectif** : Guider le nouveau proprietaire vers sa premiere donnee reelle en 3 etapes : bienvenue, premier bien, premiere synchro.

---

## Zone 1 : Indicateur de Progression

**Contenu** :
- `emotion-map.md > Onboarding > element signature` : 3 dots de progression centre horizontal
  - Dot actif : 8px `visual-vocabulary.md > accent primaire`
  - Dots inactifs : 8px neutral-300
- Visible sur les 3 etapes

**Layout** : Centre horizontal, padding-top 16px + safe-area-top, gap 8px entre dots
**Interaction** : Aucune (indicateur seulement, pas de navigation par tap)

---

## Zone 2 : Contenu Etape (variable)

### Etape 1 — Bienvenue

**Contenu** :
- Icone calendar-check 48px `visual-vocabulary.md > accent primaire`, centre
- Titre : `positioning.md > Messages par Ecran > Onboarding step 1` ("Bienvenue sur Neurolia-Immo. Centralisez vos reservations Airbnb et Booking en un seul endroit.")
  - `visual-vocabulary.md > titre ecran`, centre, max 3 lignes
- CTA : `positioning.md > CTAs par Ecran > Onboarding (step 1)` ("Commencer")

### Etape 2 — Premier Bien

**Contenu** :
- Titre : `positioning.md > Messages par Ecran > Onboarding step 2` ("Ajoutez votre premier bien et importez vos reservations automatiquement.")
  - `visual-vocabulary.md > titre section`, centre
- Formulaire compact (meme champs que `edition-bien.md > Zone 2` mais reduit) :
  - Champ "Nom du bien" : label + input 16px
  - Champ "Adresse" : label + input 16px
  - Champ "URL iCal Airbnb" (optionnel) : label + input 16px
  - Champ "URL iCal Booking" (optionnel) : label + input 16px
- `constraints.md > Formulaires longs` : 4 champs = pas de stepper necessaire
- CTA : `positioning.md > CTAs par Ecran > Onboarding (step 2)` ("Ajouter mon premier bien")

### Etape 3 — Premiere Synchro

**Contenu** :
- Titre : `positioning.md > Messages par Ecran > Onboarding step 3` ("Votre equipe d'entretien recoit son planning directement. Zero oubli.")
  - `visual-vocabulary.md > titre section`, centre
- Indicateur synchro : spinner 24px `visual-vocabulary.md > accent primaire` + texte "Nous importons vos reservations..." 16px `visual-vocabulary.md > texte courant`
  - Apres synchro : icone check-circle 24px `visual-vocabulary.md > couleur succes` + "X reservations importees"
- CTA (apres synchro) : `positioning.md > CTAs par Ecran > Onboarding (step 3)` ("Acceder au dashboard")

**Layout (commun aux 3 etapes)** : Centre vertical dans l'ecran (entre dots et CTA), padding horizontal 32px, gap 16px entre icone et titre, gap 8px entre titre et description, gap 24px avant le formulaire (etape 2)
**Interaction** : Navigation automatique entre etapes via CTA

---

## Zone 3 : CTA Principal (Sticky Bottom)

**Contenu** :
- Bouton CTA depend de l'etape (voir Zone 2)
- Fond `visual-vocabulary.md > accent primaire`, texte blanc, pleine largeur, height 48px, `visual-vocabulary.md > coins bouton` (8px)
- Lien "Passer cette etape" sous le CTA (etape 2 uniquement, si proprietaire veut ajouter son bien plus tard)
  - 14px weight 500 `visual-vocabulary.md > texte secondaire`

**Layout** : Fixed bottom, padding 16px, safe-area-bottom
**Interaction** :
- Tap CTA etape 1 → avance a etape 2
- Tap CTA etape 2 → cree le bien → avance a etape 3
- Tap CTA etape 3 → `→ /dashboard` (Replace)
- Tap "Passer" → avance sans creer de bien → `→ /dashboard` (empty state)
- Touch target CTA : 48px >= 44px minimum
- Touch target "Passer" : 44px height

---

## Etats Speciaux

### Loading (etape 2 → 3)
- CTA etape 2 : spinner blanc, bouton desactive pendant la creation du bien

### Error
- Erreur creation bien : toast `positioning.md > Messages de feedback > Error (generique)`
- Erreur synchro iCal (etape 3) : message inline "La synchronisation a echoue. Vous pourrez reessayer dans les parametres." + CTA "Acceder au dashboard quand meme"

---

*Wireframe D03 | Onboarding | 3 zones*
