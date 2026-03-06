# Gestion Checklist (Owner) - Wireframe

**Route** : /propriete/[id]/checklist (push depuis Fiche Bien)
**Objectif** : Gerer la checklist d'entretien standard d'un bien (ajouter, reordonner, supprimer des items).

---

## Zone 1 : Header Navigation

**Contenu** :
- Bouton back (icone arrow-left 20px, `visual-vocabulary.md > texte courant`)
- Titre : "Checklist — [Nom du bien]" — 16px weight 600, `visual-vocabulary.md > texte principal`, centre
- Bouton ajouter (icone plus 20px, `visual-vocabulary.md > accent primaire`) a droite

**Layout** : Header sticky 56px + safe-area-top, back a gauche, titre centre, "+" a droite
**Interaction** :
- Tap back → pop (retour Fiche Bien)
- Tap "+" → ajoute un nouvel item en bas de la liste (focus auto sur le champ)
- Touch targets : 44x44px chacun

---

## Zone 2 : Liste des Items

**Contenu** :
- Items de checklist empiles verticalement :
  - Icone grip-vertical 16px `visual-vocabulary.md > texte desactive` a gauche (handle de reorder)
  - Texte item : 16px weight 400 `visual-vocabulary.md > texte courant`
  - Indicateur type : badge "Photo" si l'item requiert une photo (12px `visual-vocabulary.md > badge texte`, fond `visual-vocabulary.md > fond info`)
  - Bouton supprimer (icone trash-2 16px `visual-vocabulary.md > couleur erreur`) a droite
- `visual-vocabulary.md > separateur liste` entre items
- Chaque item : padding vertical 12px, padding horizontal 16px

**Layout** : Scroll vertical. Padding horizontal 0 (items pleine largeur). Content padding bottom : `visual-vocabulary.md > content padding bottom`.
**Interaction** :
- Long press + drag : reordonne les items (haptic feedback)
- Tap supprimer → `constraints.md > Actions destructives sans confirmation` : dialog "Supprimer cet item ?" avec boutons "Annuler" (secondary) + "Supprimer" (danger)
- Tap item texte → mode edition inline (input 16px editable)
- Touch target grip : 44x44px, bouton supprimer : 44x44px
- `visual-vocabulary.md > espace touch minimum` (8px) entre grip et texte, entre texte et supprimer

---

## Zone 3 : CTA Enregistrer

**Contenu** :
- Bouton : "Enregistrer la checklist"
  - Fond `visual-vocabulary.md > accent primaire`, texte blanc, pleine largeur, height 48px
  - `visual-vocabulary.md > coins bouton` (8px)

**Layout** : Fixed bottom, padding 16px, safe-area-bottom, fond `visual-vocabulary.md > surface card`, `visual-vocabulary.md > ombre bouton sticky`
**Interaction** :
- Tap → sauvegarde toutes les modifications → toast `positioning.md > Messages de feedback > Success (generique)` ("Enregistre.") → pop retour

---

## Etats Speciaux

### Empty
- Icone clipboard 48px `visual-vocabulary.md > icone empty state`, centre
- Titre : "Aucun item dans la checklist."
- Description : "Ajoutez les etapes d'entretien pour ce bien." 14px `visual-vocabulary.md > texte secondaire`
- CTA : "Ajouter un item" — fond `visual-vocabulary.md > accent primaire`, texte blanc

### Loading
- Header reel
- 5-6 lignes skeleton (rectangles texte), pulse

### Error
- Toast : `positioning.md > Messages de feedback > Error (generique)`

---

*Wireframe D03 | Gestion Checklist | 3 zones*
