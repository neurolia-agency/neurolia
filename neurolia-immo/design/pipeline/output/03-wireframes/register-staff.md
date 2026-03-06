# Register Staff - Wireframe

**Route** : /register-staff?token=[invitation_token]
**Objectif** : Permettre a un agent d'entretien de creer son compte via le lien d'invitation du proprietaire.

---

## Zone 1 : Header Branding

**Contenu** :
- Logo "Neurolia-Immo" centre
- Titre : `positioning.md > Messages par Ecran > Register Staff` ("Rejoignez l'equipe de [prenom proprietaire].")
- Texte titre : `visual-vocabulary.md > titre ecran`, centre
- Prenom proprietaire : dynamique, recupere depuis le token d'invitation

**Layout** : Centre horizontal, padding-top 80px (safe-area-top + espace genereux), gap 8px entre logo et titre
**Interaction** : Aucune

---

## Zone 2 : Formulaire Inscription Staff

**Contenu** :
- Champ "Prenom" : label 14px weight 500, input 16px, `visual-vocabulary.md > coins input` (8px)
- Champ "Telephone" (optionnel) : label 14px weight 500 + badge "Optionnel" 12px `visual-vocabulary.md > texte secondaire`, input 16px, type="tel"
- Champ "Mot de passe" ou option Magic Link : selon config
- Chaque champ : fond `visual-vocabulary.md > surface enfonced`, bordure 1px `visual-vocabulary.md > bordure legere`

**Layout** : Padding horizontal 16px, gap 16px entre champs, gap 6px entre label et input
**Interaction** :
- Focus input → bordure `visual-vocabulary.md > accent primaire`
- Validation inline par champ

---

## Zone 3 : CTA Inscription

**Contenu** :
- Bouton CTA : "Rejoindre l'equipe"
  - Style : fond `visual-vocabulary.md > accent primaire`, texte blanc, pleine largeur, height 48px
  - `visual-vocabulary.md > coins bouton` (8px)
  - Touch target : 48px >= 44px minimum

**Layout** : Padding horizontal 16px, margin-top 24px, padding-bottom 32px + safe-area
**Interaction** : Tap → creation compte staff, rattachement au proprietaire → `→ /planning-jour` (Replace)

---

## Etats Speciaux

### Loading
- Bouton CTA : spinner 20px blanc, bouton desactive
- Champs desactives pendant soumission

### Error
- Token invalide/expire : ecran d'erreur avec message "Ce lien d'invitation n'est plus valide. Contactez votre proprietaire pour en recevoir un nouveau."
  - Icone link-2-off 48px `visual-vocabulary.md > texte desactive`, centre vertical
  - Pas de CTA (pas d'action possible)
- Erreur serveur : toast `positioning.md > Messages de feedback > Error (generique)`

---

*Wireframe D03 | Register Staff | 3 zones*
