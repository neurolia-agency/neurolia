# Login - Wireframe

**Route** : /login
**Objectif** : Permettre a l'utilisateur de se connecter via magic link ou OAuth Google.

---

## Zone 1 : Header Branding

**Contenu** :
- Logo "Neurolia-Immo" centre horizontal
- Tagline : `positioning.md > Messages par Ecran > Login` ("Connectez-vous a votre espace.")
- Texte tagline : 14px weight 400, `visual-vocabulary.md > texte secondaire`

**Layout** : Centre horizontal, padding-top 80px (safe-area-top + espace genereux), gap 8px entre logo et tagline
**Interaction** : Aucune

---

## Zone 2 : Formulaire Magic Link

**Contenu** :
- Label : `tone.md > Mots a Utiliser` ("Email")
- Input email : placeholder "votre@email.com", 16px (prevent iOS zoom), `visual-vocabulary.md > coins input` (8px)
- Bouton CTA principal : `positioning.md > CTAs par Ecran > Login` ("Recevoir le lien de connexion")
  - Style : fond `visual-vocabulary.md > accent primaire`, texte blanc, pleine largeur, height 48px, `visual-vocabulary.md > coins bouton` (8px)
  - Touch target : 48px >= 44px minimum

**Layout** : Padding horizontal 16px, gap 6px entre label et input, gap 16px entre input et bouton
**Interaction** :
- Tap input → clavier email (type="email")
- Tap CTA → envoie le magic link, `→ /magic-link-sent`
- Validation inline si email invalide : `positioning.md > Messages de feedback > Error (champ requis)`

---

## Zone 3 : Separateur

**Contenu** :
- Ligne horizontale avec texte "ou" centre
- Ligne : 1px `visual-vocabulary.md > bordure legere`, texte "ou" 14px `visual-vocabulary.md > texte secondaire`

**Layout** : Padding horizontal 16px, margin vertical 24px
**Interaction** : Aucune

---

## Zone 4 : OAuth Google

**Contenu** :
- Bouton secondaire : `positioning.md > CTAs par Ecran > Login (OAuth)` ("Continuer avec Google")
  - Style : fond blanc, bordure 1px `visual-vocabulary.md > bordure legere`, icone Google 20px a gauche, texte 16px weight 600 `visual-vocabulary.md > texte principal`
  - Pleine largeur, height 48px, `visual-vocabulary.md > coins bouton` (8px)
  - Touch target : 48px >= 44px minimum

**Layout** : Padding horizontal 16px
**Interaction** : Tap → OAuth Google flow → redirection selon role

---

## Zone 5 : Liens Secondaires

**Contenu** :
- Lien "Creer un compte" → `→ /register`
- Lien "Mot de passe oublie ?" → `→ /forgot-password`
- Style : 14px weight 500, `visual-vocabulary.md > accent primaire`, underline au tap

**Layout** : Centre horizontal, gap 16px entre les 2 liens, margin-top 24px, padding-bottom 32px + safe-area
**Interaction** :
- Tap "Creer un compte" → `→ /register`
- Tap "Mot de passe oublie" → `→ /forgot-password`
- Touch target : 44px height (padding vertical inclus)

---

## Etats Speciaux

### Loading
- Bouton CTA : texte remplace par spinner 20px blanc, bouton desactive (opacity 0.7)
- Bouton Google : meme pattern

### Error
- Erreur reseau : toast en haut, `positioning.md > Messages de feedback > Error (reseau)`
- Email invalide : message inline sous l'input, 14px `visual-vocabulary.md > couleur erreur`, "Format d'email invalide."
- Email non reconnu : meme flow, magic link envoye quand meme (securite : pas de leaking d'existence de compte)

---

*Wireframe D03 | Login | 5 zones*
