# Hub Gestion (Owner) - Wireframe

**Route** : Tab: Gestion
**Objectif** : Point d'acces centralise vers les ecrans de configuration : biens, equipe, parametres.

---

## Zone 1 : Header

**Contenu** :
- Titre : `positioning.md > Messages par Ecran > Hub Gestion` ("Gestion")
  - `visual-vocabulary.md > titre ecran` (clamp 24-32px, weight 700)

**Layout** : Sticky header, height 56px + safe-area-top, padding horizontal 16px, titre a gauche
**Interaction** : Aucune

---

## Zone 2 : Liens de Navigation

**Contenu** :
- 3 cards lien empilees verticalement :
  - `emotion-map.md > Hub Gestion > element signature`
  1. "Mes biens" : icone home 24px `visual-vocabulary.md > texte courant` + titre 16px weight 600 `visual-vocabulary.md > texte principal` + chevron right 16px `visual-vocabulary.md > texte desactive`
  2. "Mon equipe" : icone users 24px + titre + chevron
  3. "Parametres" : icone settings 24px + titre + chevron
- Chaque card : fond `visual-vocabulary.md > surface card`, bordure 1px `visual-vocabulary.md > bordure legere`, `visual-vocabulary.md > coins card` (12px), padding 16px

**Layout** : Padding horizontal 16px, padding-top 16px, gap 12px entre cards
**Interaction** :
- Tap "Mes biens" → `→ /liste-proprietes` (push)
- Tap "Mon equipe" → `→ /liste-staff` (push)
- Tap "Parametres" → `→ /parametres` (push)
- Touch target par card : 56px height >= 44px minimum
- `visual-vocabulary.md > press feedback` : scale(0.97) 100ms

---

## Zone 3 : Bottom Tab Bar (Owner)

**Contenu** :
- 3 tabs (meme structure que `dashboard.md > Zone 5`)
  - Tab 1 : Accueil — inactif
  - Tab 2 : Calendrier — inactif
  - Tab 3 : Gestion — **ACTIF** (`visual-vocabulary.md > accent primaire`)

**Layout** : Fixed bottom, height 56px + env(safe-area-inset-bottom), `visual-vocabulary.md > ombre navigation bottom`
**Interaction** :
- Tap Tab 1 → `→ Tab: Accueil`
- Tap Tab 2 → `→ Tab: Calendrier`
- Touch target par tab : 44x44px minimum

---

## Etats Speciaux

Cet ecran n'affiche pas de donnees dynamiques. Pas d'etat empty, loading ou error.

---

*Wireframe D03 | Hub Gestion | 3 zones*
