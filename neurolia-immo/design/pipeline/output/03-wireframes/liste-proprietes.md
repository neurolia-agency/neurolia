# Liste Proprietes (Owner) - Wireframe

**Route** : /proprietes (push depuis Hub Gestion)
**Objectif** : Voir tous les biens du proprietaire avec leur statut operationnel.

---

## Zone 1 : Header Navigation

**Contenu** :
- Bouton back (icone arrow-left 20px, `visual-vocabulary.md > texte courant`)
- Titre : "Mes biens" — 16px weight 600, `visual-vocabulary.md > texte principal`, centre
- Bouton ajouter (icone plus 20px, `visual-vocabulary.md > accent primaire`) a droite

**Layout** : Header sticky 56px + safe-area-top, back a gauche, titre centre, bouton "+" a droite
**Interaction** :
- Tap back → pop (retour Hub Gestion)
- Tap "+" → `→ /edition-bien` (push, mode creation)
- Touch targets : 44x44px chacun

---

## Zone 2 : Liste des Biens

**Contenu** :
- Cards empilees verticalement, 1 card par bien :
  - Nom du bien : `visual-vocabulary.md > titre card` (clamp 18-22px weight 600)
  - Adresse : 14px `visual-vocabulary.md > texte secondaire`, 1 ligne troncature ellipsis
  - Badge statut operationnel :
    - "Occupe" : fond `visual-vocabulary.md > fond info`, texte info-700, `visual-vocabulary.md > badge texte`
    - "Libre" : fond `visual-vocabulary.md > fond succes`, texte success-700
    - "Menage en cours" : fond `visual-vocabulary.md > fond alerte`, texte warning-700
  - Prochaine reservation : 14px `visual-vocabulary.md > texte secondaire` (nom voyageur + dates, 1 ligne)
  - Chevron right 16px a droite
- Chaque card : fond `visual-vocabulary.md > surface card`, `visual-vocabulary.md > coins card` (12px), `visual-vocabulary.md > ombre card`, padding 16px

**Layout** : Padding horizontal 16px, padding-top 12px, gap 12px entre cards. Scroll vertical. Content padding bottom : `visual-vocabulary.md > content padding bottom`.
**Interaction** :
- Tap card → `→ /fiche-bien/[id]` (push)
- Touch target : card entiere >= 44px height
- `visual-vocabulary.md > press feedback` : scale(0.97) 100ms

---

## Etats Speciaux

### Empty
- Icone home 48px `visual-vocabulary.md > icone empty state`, centre vertical
- Titre : `positioning.md > Empty States > Aucun bien` ("Ajoutez votre premier bien pour commencer.")
- CTA : `positioning.md > CTAs par Ecran > Mes Biens` ("Ajouter un bien")
  - Fond `visual-vocabulary.md > accent primaire`, texte blanc, height 48px, largeur auto (padding horizontal 24px)

### Loading
- Header reel
- 3-4 card skeletons (rectangle pleine largeur x 80px, `visual-vocabulary.md > coins card`, pulse)
- `constraints.md > Skeleton screens > Fiche bien`

### Error
- Toast : `positioning.md > Messages de feedback > Error (generique)`
- Bouton "Reessayer"

### Pull-to-Refresh
- `constraints.md > Pull-to-refresh` : seuil 60px

---

*Wireframe D03 | Liste Proprietes | 2 zones*
