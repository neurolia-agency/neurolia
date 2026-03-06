# Modals Partages - Wireframe

**Route** : Overlays (superposes a tout ecran)
**Objectif** : Definir les composants modaux reutilisables dans toute l'application.

---

## Modal 1 : Confirmation Action

**Contenu** :
- Overlay : `visual-vocabulary.md > overlay modale` (oklch(0 0 0 / 0.5))
- Modale centree, max 480px largeur :
  - Icone contextuelle 24px (danger = error-500, warning = warning-500, info = info-500)
  - Titre : 16px weight 600 `visual-vocabulary.md > texte principal` (ex: "Supprimer ce bien ?")
  - Description : 14px `visual-vocabulary.md > texte courant` (ex: "Cette action est irreversible.")
  - 2 boutons :
    - "Annuler" : bouton secondary (fond transparent, texte `visual-vocabulary.md > texte courant`), height 44px
    - Action : bouton danger (fond `visual-vocabulary.md > couleur erreur`, texte blanc) ou primary, height 44px
  - `visual-vocabulary.md > coins modale` (12px), fond `visual-vocabulary.md > surface card`, `visual-vocabulary.md > ombre elevee`, padding 24px

**Layout** : Centre ecran, animation `visual-vocabulary.md > modal entree` (200ms ease-out, scale 0.95 → 1)
**Interaction** :
- Tap "Annuler" ou tap overlay → ferme la modale (`visual-vocabulary.md > modal sortie`, 150ms)
- Tap action → execute l'action → ferme la modale
- `constraints.md > Actions destructives sans confirmation` : toute suppression passe par cette modale
- Touch targets boutons : 44px height minimum

---

## Modal 2 : Toast Succes

**Contenu** :
- Barre laterale gauche 3px `visual-vocabulary.md > couleur succes`
- Icone check-circle 20px `visual-vocabulary.md > couleur succes`
- Titre : 14px weight 600 `visual-vocabulary.md > texte principal` (ex: `positioning.md > Messages de feedback > Success (generique)`)
- Description optionnelle : 14px `visual-vocabulary.md > texte secondaire`
- Bouton close ghost (icone x 16px `visual-vocabulary.md > texte secondaire`)
- `visual-vocabulary.md > coins card` (12px), fond `visual-vocabulary.md > surface card`, `visual-vocabulary.md > ombre elevee`

**Layout** : Position fixed, top 16px + safe-area-top (mobile) ou top-right 16px (desktop), max-width 400px, padding 12px 16px
**Interaction** :
- Auto-dismiss apres `visual-vocabulary.md > toast auto-dismiss` (4000ms)
- Tap close → dismiss immediat
- Animation entree : `visual-vocabulary.md > toast entree` (300ms ease-out, translateY -16px → 0)
- Animation sortie : `visual-vocabulary.md > toast sortie` (200ms ease-in, opacity → 0)

---

## Modal 3 : Toast Erreur

**Contenu** :
- Meme structure que Toast Succes mais :
  - Barre laterale 3px `visual-vocabulary.md > couleur erreur`
  - Icone x-circle 20px `visual-vocabulary.md > couleur erreur`
  - Titre : `positioning.md > Messages de feedback > Error (generique)` ou message specifique
  - **Ne disparait pas automatiquement** — dismiss manuel uniquement

**Layout** : Meme que Toast Succes
**Interaction** :
- Tap close → dismiss
- Tap "Reessayer" (si present) → retente l'action
- Pas d'auto-dismiss (les erreurs restent affichees)

---

## Modal 4 : Toast Alerte

**Contenu** :
- Barre laterale 3px `visual-vocabulary.md > couleur alerte`
- Icone alert-triangle 20px `visual-vocabulary.md > couleur alerte`
- Titre et description factuels
- Auto-dismiss apres 4000ms

**Layout** : Meme que Toast Succes
**Interaction** : Meme que Toast Succes

---

## Modal 5 : Camera

**Contenu** :
- Ouverture camera native du device (Capacitor Camera plugin)
- Overlay minimal avec :
  - Bouton capture (cercle 64px, bordure 3px blanc)
  - Bouton close (icone x 24px blanc) en haut a gauche
  - Preview flash apres capture (200ms)
- Apres capture : preview de la photo plein ecran avec 2 boutons :
  - "Reprendre" (secondary) : retour camera
  - "Utiliser" (primary) : sauvegarde et retour a l'ecran appelant

**Layout** : Plein ecran, fond noir, safe areas respectees
**Interaction** :
- Tap capture → prend la photo
- Tap "Utiliser" → ferme la camera, retourne la photo a l'ecran appelant (Fiche Intervention ou Signaler Probleme)
- Touch target capture : 64px, touch target close : 44x44px

---

## Modal 6 : Bottom Sheet Filtre/Tri

**Contenu** :
- `visual-vocabulary.md > handle bottom sheet` (36x4px)
- Titre : "Filtrer" ou "Trier par" — `visual-vocabulary.md > titre card` (18px weight 600)
- Options de filtre/tri :
  - Chips multi-selection (meme style que `calendrier-mois.md > Zone 2`)
  - Ou liste de radio buttons (1 selection)
- Bouton "Appliquer" : fond `visual-vocabulary.md > accent primaire`, texte blanc, pleine largeur, height 48px
- Bouton "Reinitialiser" : texte 14px `visual-vocabulary.md > accent primaire`

**Layout** : Bottom sheet, `visual-vocabulary.md > coins bottom sheet` (16px 16px 0 0), overlay `visual-vocabulary.md > overlay modale`, `visual-vocabulary.md > ombre elevee`, padding 16px, safe-area-bottom
**Interaction** :
- Entree : `visual-vocabulary.md > bottom sheet entree` (350ms)
- Sortie : `visual-vocabulary.md > bottom sheet sortie` (250ms)
- Swipe down → ferme (`visual-vocabulary.md > swipe dismiss`)
- Tap "Appliquer" → applique les filtres → ferme
- Tap "Reinitialiser" → reset les filtres

---

*Wireframe D03 | Modals Partages | 6 modals*
