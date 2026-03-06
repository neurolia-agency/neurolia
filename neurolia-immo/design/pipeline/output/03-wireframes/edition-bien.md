# Edition Bien (Owner) - Wireframe

**Route** : /propriete/[id]/edit (push depuis Fiche Bien) ou /propriete/new (creation)
**Objectif** : Creer ou modifier les informations d'un bien (adresse, code, WiFi, URLs iCal).

---

## Zone 1 : Header Navigation

**Contenu** :
- Bouton back/annuler (icone x 20px, `visual-vocabulary.md > texte courant`)
- Titre : "Nouveau bien" (creation) ou "Modifier [Nom du bien]" (edition)
  - 16px weight 600, `visual-vocabulary.md > texte principal`, centre

**Layout** : Header sticky 56px + safe-area-top, bouton annuler a gauche
**Interaction** :
- Tap annuler → modal confirmation si modifications non sauvegardees → pop
- Touch target : 44x44px

---

## Zone 2 : Formulaire

**Contenu** :
- `constraints.md > Formulaires longs` : max 6 champs par ecran (pas de stepper necessaire ici)
- Champ "Nom du bien" : label `visual-vocabulary.md > label formulaire` (14px weight 500) + input 16px
- Champ "Adresse" : label + input 16px
- Champ "Code d'acces" : label + input 16px, `visual-vocabulary.md > code monospace` si rempli
- Champ "WiFi (nom du reseau)" : label + input 16px
- Champ "WiFi (mot de passe)" : label + input 16px
- Section "Synchronisation" — `visual-vocabulary.md > en-tete section` (12px uppercase)
  - Champ "URL iCal Airbnb" : label + input 16px, type="url"
  - Champ "URL iCal Booking" : label + input 16px, type="url"
  - Texte d'aide sous chaque URL : 14px `visual-vocabulary.md > texte secondaire`, "Collez l'URL de votre calendrier iCal."
- Tous les inputs : fond `visual-vocabulary.md > surface enfonced`, bordure 1px `visual-vocabulary.md > bordure legere`, `visual-vocabulary.md > coins input` (8px), height 48px, input text 16px (prevent iOS zoom)

**Layout** : Scroll vertical. Padding horizontal 16px, padding-top 16px. Gap 16px entre champs (`visual-vocabulary.md > gap form fields`). Gap 6px entre label et input (`visual-vocabulary.md > gap label-input`). Gap 4px entre input et texte d'aide (`visual-vocabulary.md > gap input-help`). Gap 24px entre sections.
**Interaction** :
- Focus input → bordure `visual-vocabulary.md > accent primaire`, fond blanc
- Validation inline par champ au blur
- iCal URL : validation asynchrone (test de l'URL) avec feedback inline
  - Valide : icone check-circle 16px `visual-vocabulary.md > couleur succes` a droite de l'input
  - Invalide : message `positioning.md > Messages de feedback > Error (champ requis)` + lien aide

---

## Zone 3 : Accueil

**Contenu** :
- Titre section : "Accueil" — `visual-vocabulary.md > en-tete section` (12px uppercase)
- Toggle "Le personnel accueille les voyageurs" (switch iOS-style)
  - Largeur toggle : 51x31px standard iOS, zone tactile : 44px height minimum
  - Etat off (defaut) : `check_in_mode = self_checkin`
  - Etat on : `check_in_mode = staff_checkin`
- Si active : texte d'aide sous le toggle : "Une tache d'accueil sera creee automatiquement pour chaque reservation"
  - 14px `visual-vocabulary.md > texte secondaire`, `visual-vocabulary.md > gap input-help` (4px)

**Layout** : Padding horizontal 16px, gap 24px apres la section Synchronisation. Hauteur toggle : 44px (touch target).
**Interaction** :
- Tap toggle → bascule `check_in_mode` entre `self_checkin` et `staff_checkin`
- Animation toggle : `visual-vocabulary.md > transition standard` 200ms

---

## Zone 4 : CTA Enregistrer

**Contenu** :
- Bouton : `positioning.md > CTAs par Ecran > Parametres` ("Enregistrer")
  - Fond `visual-vocabulary.md > accent primaire`, texte blanc, pleine largeur, height 48px
  - `visual-vocabulary.md > coins bouton` (8px)
  - Touch target : 48px >= 44px minimum
- En mode creation : "Ajouter le bien" au lieu de "Enregistrer"

**Layout** : Fixed bottom, padding 16px, safe-area-bottom, fond `visual-vocabulary.md > surface card`, `visual-vocabulary.md > ombre bouton sticky`
**Interaction** :
- Tap → validation de tous les champs → sauvegarde → toast `positioning.md > Messages de feedback > Success (bien ajoute)` → pop retour

---

## Etats Speciaux

### Loading (soumission)
- Bouton CTA : spinner 20px blanc, bouton desactive
- Champs desactives

### Error
- Champ invalide : bordure `visual-vocabulary.md > couleur erreur`, message 14px sous le champ
- Erreur serveur : toast `positioning.md > Messages de feedback > Error (generique)`

---

*Wireframe D03 | Edition Bien | 4 zones*
