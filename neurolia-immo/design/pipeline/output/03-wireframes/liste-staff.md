# Liste Staff (Owner) - Wireframe

**Route** : /staff (push depuis Hub Gestion)
**Objectif** : Voir tous les agents d'entretien de l'equipe avec leur disponibilite.

---

## Zone 1 : Header Navigation

**Contenu** :
- Bouton back (icone arrow-left 20px, `visual-vocabulary.md > texte courant`)
- Titre : "Mon equipe" — 16px weight 600, `visual-vocabulary.md > texte principal`, centre
- Bouton ajouter (icone plus 20px, `visual-vocabulary.md > accent primaire`) a droite

**Layout** : Header sticky 56px + safe-area-top, back a gauche, titre centre, "+" a droite
**Interaction** :
- Tap back → pop (retour Hub Gestion)
- Tap "+" → modal `inviter-agent.md`
- Touch targets : 44x44px chacun

---

## Zone 2 : Liste des Agents

**Contenu** :
- Cards empilees verticalement, 1 card par agent :
  - Avatar : 40px cercle, initiales sur fond `visual-vocabulary.md > accent primaire` si pas de photo, texte blanc 16px weight 600
  - Prenom : 16px weight 600 `visual-vocabulary.md > texte principal`
  - Statut actuel : 14px `visual-vocabulary.md > texte secondaire`
    - "Disponible" : dot 8px `visual-vocabulary.md > couleur succes`
    - "En mission" : dot 8px `visual-vocabulary.md > couleur info`
  - Stat rapide : "X interventions ce mois" — 14px `visual-vocabulary.md > texte secondaire`
  - Chevron right 16px a droite
- Chaque card : fond `visual-vocabulary.md > surface card`, `visual-vocabulary.md > coins card` (12px), `visual-vocabulary.md > ombre card`, padding 16px

**Layout** : Padding horizontal 16px, padding-top 12px, gap 12px entre cards. Scroll vertical. Content padding bottom : `visual-vocabulary.md > content padding bottom`.
**Interaction** :
- Tap card → `→ /fiche-agent/[id]` (push)
- Touch target : card entiere >= 44px height

---

## Etats Speciaux

### Empty
- Icone users 48px `visual-vocabulary.md > icone empty state`, centre vertical
- Titre : `positioning.md > Empty States > Aucun staff` ("Invitez votre premier collaborateur.")
- CTA : `positioning.md > CTAs par Ecran > Mon Equipe` ("Inviter un collaborateur")
  - Fond `visual-vocabulary.md > accent primaire`, texte blanc, height 48px

### Loading
- Header reel
- 2-3 card skeletons (rectangle pleine largeur x 72px, pulse)

### Error
- Toast : `positioning.md > Messages de feedback > Error (generique)`

### Pull-to-Refresh
- `constraints.md > Pull-to-refresh` : seuil 60px

---

*Wireframe D03 | Liste Staff | 2 zones*
