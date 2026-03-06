# Forgot Password - Wireframe

**Route** : /forgot-password
**Objectif** : Permettre a l'utilisateur de reinitialiser son mot de passe via email.

---

## Zone 1 : Header Navigation

**Contenu** :
- Bouton back (icone arrow-left 20px, `visual-vocabulary.md > texte courant`)
- Titre header : "Mot de passe oublie"
  - 16px weight 600, `visual-vocabulary.md > texte principal`, centre

**Layout** : Header sticky 56px + safe-area-top, bouton back a gauche (padding-left 16px)
**Interaction** :
- Tap back → `→ /login` (pop)
- Touch target back : 44x44px

---

## Zone 2 : Description + Formulaire

**Contenu** :
- Description : "Saisissez votre adresse email. Vous recevrez un lien pour reinitialiser votre mot de passe."
  - 16px weight 400, `visual-vocabulary.md > texte courant`
- Champ "Email" : label 14px weight 500, input 16px, type="email"
  - Fond `visual-vocabulary.md > surface enfonced`, bordure 1px `visual-vocabulary.md > bordure legere`
  - `visual-vocabulary.md > coins input` (8px)
- Bouton CTA : "Envoyer le lien"
  - Fond `visual-vocabulary.md > accent primaire`, texte blanc, pleine largeur, height 48px
  - Touch target : 48px >= 44px minimum

**Layout** : Padding horizontal 16px, padding-top 24px, gap 24px entre description et champ, gap 6px label-input, gap 16px input-bouton
**Interaction** :
- Tap CTA → envoie le lien de reinitialisation → affiche Zone 3 (confirmation)
- Validation inline email

---

## Zone 3 : Confirmation (apres envoi)

**Contenu** :
- Icone mail-check 48px `visual-vocabulary.md > accent primaire`, centre
- Message : "Si un compte est associe a cette adresse, un lien de reinitialisation a ete envoye."
  - 16px weight 400, `visual-vocabulary.md > texte courant`, centre
- Lien "Retour a la connexion" : 14px weight 500, `visual-vocabulary.md > accent primaire`

**Layout** : Centre vertical dans la zone de contenu, padding horizontal 32px
**Interaction** :
- Tap "Retour" → `→ /login` (pop)
- Touch target : 44px height

---

## Etats Speciaux

### Loading
- Bouton CTA : spinner 20px blanc, bouton desactive

### Error
- Erreur serveur : toast `positioning.md > Messages de feedback > Error (generique)`

---

*Wireframe D03 | Forgot Password | 3 zones*
