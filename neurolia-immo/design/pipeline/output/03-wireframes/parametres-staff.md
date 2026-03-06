# Parametres Staff - Wireframe

**Route** : /parametres-staff (push depuis Profil Staff)
**Objectif** : Gerer les preferences de notifications du staff.

---

## Zone 1 : Header Navigation

**Contenu** :
- Bouton back (icone arrow-left 20px, `visual-vocabulary.md > texte courant`)
- Titre : "Parametres" — 16px weight 600, `visual-vocabulary.md > texte principal`, centre

**Layout** : Header sticky 56px + safe-area-top, back a gauche, titre centre
**Interaction** :
- Tap back → pop (retour Profil)
- Touch target back : 44x44px

---

## Zone 2 : Parametres Notifications

**Contenu** :
- **Section "Notifications"** — `visual-vocabulary.md > en-tete section` (12px uppercase neutral-500)
  - "Notifications push" : icone bell 20px + texte 16px weight 500 + toggle switch a droite
  - `visual-vocabulary.md > separateur liste`
  - "Email planning matin" : icone mail 20px + texte 16px weight 500 + toggle switch
  - `visual-vocabulary.md > separateur liste`
  - "Nouvelles taches" : icone clipboard-plus 20px + texte 16px weight 500 + toggle switch
- Fond section : `visual-vocabulary.md > surface card`, `visual-vocabulary.md > coins card` (12px), bordure 1px `visual-vocabulary.md > bordure legere`
- Chaque item : padding 16px

**Layout** : Padding horizontal 16px, padding-top 16px, gap 8px en-tete → premier item. Content padding bottom : `visual-vocabulary.md > content padding bottom`.
**Interaction** :
- Tap toggle → change l'etat, animation `visual-vocabulary.md > transition standard` (200ms)
- Sauvegarde automatique (pas de bouton Enregistrer)
- Touch target chaque item : 56px height >= 44px minimum

---

## Etats Speciaux

### Error
- Echec sauvegarde toggle : toast `positioning.md > Messages de feedback > Error (generique)`, toggle revient a l'etat precedent

---

*Wireframe D03 | Parametres Staff | 2 zones*
