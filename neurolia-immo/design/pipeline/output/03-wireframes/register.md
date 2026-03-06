# Register (Owner) - Wireframe

**Route** : /register
**Objectif** : Permettre a un proprietaire de creer son compte.

---

## Zone 1 : Header Branding

**Contenu** :
- Bouton back (icone arrow-left 20px, `visual-vocabulary.md > texte courant`) en haut a gauche
- Logo "Neurolia-Immo" centre
- Titre : `positioning.md > Messages par Ecran > Register` ("Creez votre compte proprietaire.")
- Texte : 14px weight 400, `visual-vocabulary.md > texte secondaire`

**Layout** : Header 56px sticky top avec safe-area. Titre sous le header, centre, padding-top 24px.
**Interaction** :
- Tap back → `→ /login` (pop)
- Touch target back : 44x44px

---

## Zone 2 : Formulaire Inscription

**Contenu** :
- Champ "Prenom" : label 14px weight 500, input 16px, `visual-vocabulary.md > coins input` (8px)
- Champ "Nom" : label 14px weight 500, input 16px
- Champ "Email" : label 14px weight 500, input 16px, type="email"
- Chaque champ : fond `visual-vocabulary.md > surface enfonced`, bordure 1px `visual-vocabulary.md > bordure legere`

**Layout** : Padding horizontal 16px, gap 16px entre champs, gap 6px entre label et input
**Interaction** :
- Focus input → bordure `visual-vocabulary.md > accent primaire`, fond blanc
- Validation inline par champ (blur) : `positioning.md > Messages de feedback > Error (champ requis)`

---

## Zone 3 : CTA Inscription

**Contenu** :
- Bouton CTA : `positioning.md > CTAs par Ecran > Register` ("Creer mon compte")
  - Style : fond `visual-vocabulary.md > accent primaire`, texte blanc, pleine largeur, height 48px
  - `visual-vocabulary.md > coins bouton` (8px)
  - Touch target : 48px >= 44px minimum

**Layout** : Padding horizontal 16px, margin-top 24px
**Interaction** : Tap → creation de compte → `→ /onboarding` (etape premier bien)

---

## Zone 4 : Lien Connexion

**Contenu** :
- Texte "Deja un compte ?" + lien "Se connecter" (`visual-vocabulary.md > accent primaire`)

**Layout** : Centre horizontal, margin-top 16px, padding-bottom 32px + safe-area
**Interaction** : Tap → `→ /login`
- Touch target : 44px height

---

## Etats Speciaux

### Loading
- Bouton CTA : spinner 20px blanc remplace le texte, bouton desactive (opacity 0.7)
- Champs desactives pendant la soumission

### Error
- Champ invalide : bordure `visual-vocabulary.md > couleur erreur`, message 14px sous le champ
- Email deja utilise : message inline sous le champ email, "Un compte existe deja avec cet email."
- Erreur serveur : toast `positioning.md > Messages de feedback > Error (generique)`

---

*Wireframe D03 | Register | 4 zones*
