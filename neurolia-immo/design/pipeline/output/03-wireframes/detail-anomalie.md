# Detail Anomalie (Owner) - Wireframe

**Route** : /anomalie/[id] (push depuis Dashboard)
**Objectif** : Afficher le detail d'un conflit detecte et proposer des actions de resolution.

---

## Zone 1 : Header Navigation

**Contenu** :
- Bouton back (icone arrow-left 20px, `visual-vocabulary.md > texte courant`)
- Titre : `positioning.md > Messages par Ecran > Detail Anomalie` ("Anomalie detectee")
  - 16px weight 600, `visual-vocabulary.md > texte principal`, centre

**Layout** : Header sticky 56px + safe-area-top, bouton back a gauche
**Interaction** :
- Tap back → pop (retour Dashboard)
- Touch target back : 44x44px

---

## Zone 2 : Card Anomalie

**Contenu** :
- Card avec fond `visual-vocabulary.md > fond alerte`, bordure gauche 3px `visual-vocabulary.md > couleur alerte`
  - `emotion-map.md > Detail Anomalie > element signature`
- Icone shield-alert 24px `visual-vocabulary.md > couleur alerte` en haut a gauche
- Titre anomalie : 16px weight 600 `visual-vocabulary.md > texte principal` (ex: "Double-reservation detectee")
- Bien concerne : 14px weight 500 `visual-vocabulary.md > texte courant`
- Dates en conflit : 14px `visual-vocabulary.md > texte secondaire`

**Layout** : Padding horizontal 16px, card padding 16px, `visual-vocabulary.md > coins card` (12px), margin-top 16px
**Interaction** : Aucune (lecture)

---

## Zone 3 : Sources en Conflit

**Contenu** :
- Titre section : "Sources en conflit" — `visual-vocabulary.md > en-tete section` (12px uppercase)
- Source 1 : card avec badge plateforme (Airbnb/Booking/Manuel) + nom voyageur + dates
  - Badge plateforme : meme style que `detail-reservation.md > Zone 1`
  - Nom voyageur : 16px weight 500
  - Dates : 14px `visual-vocabulary.md > texte secondaire`
- Source 2 : meme structure, badge plateforme different
- Les 2 cards empilees verticalement (mobile), gap 12px

**Layout** : Padding horizontal 16px, gap 24px apres Zone 2, gap 8px titre-cards, gap 12px entre les 2 cards sources
**Interaction** : Aucune

---

## Zone 4 : Actions de Resolution

**Contenu** :
- 3 boutons d'action :
  1. "Ignorer (faux positif)" : bouton secondary (fond blanc, bordure 1px `visual-vocabulary.md > bordure legere`, texte `visual-vocabulary.md > texte courant`)
     - Pleine largeur, height 48px, `visual-vocabulary.md > coins bouton` (8px)
  2. "Marquer comme resolue" : bouton primary (fond `visual-vocabulary.md > accent primaire`, texte blanc)
     - Pleine largeur, height 48px
  3. "Ouvrir [plateforme]" : bouton secondary avec icone external-link 16px
     - Pleine largeur, height 48px
- Chaque bouton : touch target >= 44px

**Layout** : Fixed bottom, padding 16px, safe-area-bottom. Gap 12px entre boutons. Fond `visual-vocabulary.md > surface card`, `visual-vocabulary.md > ombre bouton sticky`.
**Interaction** :
- Tap "Ignorer" → modal confirmation ("Ignorer cette anomalie ?") → marque comme faux positif → pop retour Dashboard
- Tap "Marquer resolue" → marque resolue → toast `positioning.md > Messages de feedback > Success (generique)` → pop retour Dashboard
- Tap "Ouvrir [plateforme]" → ouvre lien externe (navigateur / app plateforme)

---

## Etats Speciaux

### Loading
- Header reel
- Zone 2 : skeleton card (rectangle 120px height, pulse)
- Zone 3 : 2 skeleton cards
- Zone 4 : boutons disabled pendant le chargement

### Error
- Toast : `positioning.md > Messages de feedback > Error (generique)`

---

*Wireframe D03 | Detail Anomalie | 4 zones*
