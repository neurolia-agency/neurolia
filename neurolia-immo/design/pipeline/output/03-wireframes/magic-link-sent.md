# Magic Link Sent - Wireframe

**Route** : /magic-link-sent
**Objectif** : Confirmer l'envoi du lien de connexion et guider l'utilisateur vers sa boite email.

---

## Zone 1 : Illustration + Message

**Contenu** :
- Icone mail-check 48px, `visual-vocabulary.md > accent primaire`, centre
- Titre : "Verifiez votre boite email"
  - `visual-vocabulary.md > titre ecran`, centre
- Description : `positioning.md > Messages par Ecran > Magic Link Sent` ("Un lien de connexion vous a ete envoye par email. Verifiez votre boite de reception.")
  - 16px weight 400, `visual-vocabulary.md > texte courant`, centre, max 2 lignes

**Layout** : Centre vertical et horizontal dans l'ecran, padding horizontal 32px, gap 16px entre icone et titre, gap 8px entre titre et description
**Interaction** : Aucune

---

## Zone 2 : Actions Secondaires

**Contenu** :
- Lien "Renvoyer le lien" : 14px weight 500, `visual-vocabulary.md > accent primaire`
  - Desactive pendant 60 secondes apres envoi, texte "Renvoyer le lien (45s)" avec countdown
- Lien "Retour a la connexion" : 14px weight 500, `visual-vocabulary.md > texte secondaire`

**Layout** : Centre horizontal, gap 16px entre les 2 liens, margin-top 32px
**Interaction** :
- Tap "Renvoyer" (actif) → renvoie le magic link, reset countdown 60s
- Tap "Retour" → `→ /login` (pop)
- Touch targets : 44px height chacun

---

## Etats Speciaux

### Loading
- Apres tap "Renvoyer" : texte remplace par "Envoi en cours..." avec spinner 16px inline

### Error
- Echec renvoi : toast `positioning.md > Messages de feedback > Error (generique)`

---

*Wireframe D03 | Magic Link Sent | 2 zones*
