# Calendrier Vue Mois (Owner) - Wireframe

**Route** : Tab: Calendrier
**Objectif** : Visualiser l'occupation de tous les biens sur un mois, avec codage couleur par plateforme.

---

## Zone 1 : Header Calendrier

**Contenu** :
- Titre : `positioning.md > Messages par Ecran > Calendrier Vue Mois` ("Calendrier")
  - `visual-vocabulary.md > titre ecran` (clamp 24-32px, weight 700)
- Navigation mois : fleches gauche/droite (chevron-left / chevron-right 20px) + label mois "Fevrier 2026" 16px weight 600 centre
- Bouton "Aujourd'hui" : texte 14px weight 500 `visual-vocabulary.md > accent primaire` (visible si mois affiche ≠ mois courant)

**Layout** : Sticky header, height ~100px (56px header + 44px navigation mois) + safe-area-top, padding horizontal 16px
**Interaction** :
- Tap chevron gauche → mois precedent (animation `visual-vocabulary.md > navigation push` inversee)
- Tap chevron droit → mois suivant
- Tap "Aujourd'hui" → retour au mois courant
- Touch targets fleches : 44x44px

---

## Zone 2 : Filtre Biens

**Contenu** :
- Chips de filtrage par bien : "Tous" (actif par defaut) + 1 chip par bien
  - Chip actif : fond `visual-vocabulary.md > surface selection`, bordure `visual-vocabulary.md > accent primaire`, texte `visual-vocabulary.md > accent primaire`
  - Chip inactif : fond transparent, bordure 1px `visual-vocabulary.md > bordure legere`, texte `visual-vocabulary.md > texte courant`
  - `visual-vocabulary.md > coins chip` (999px = pilule)
  - Height 32px, padding horizontal 12px

**Layout** : Scroll horizontal avec indicateur `constraints.md > Indicateurs de scroll` (gradient fade-out a droite). Padding-left 16px, gap 8px entre chips.
**Interaction** :
- Tap chip → filtre les reservations par bien
- Touch target : 44px height (padding vertical etendu)

---

## Zone 3 : Grille Calendrier (Mobile = Liste)

**Contenu** :
- **Mobile (< 640px)** : Vue liste chronologique
  - En-tetes de jour sticky : `visual-vocabulary.md > en-tete section` ("LUN. 17 FEV.", 12px uppercase, fond `visual-vocabulary.md > fond page`)
  - Jour actuel : cercle `visual-vocabulary.md > accent primaire` derriere le numero du jour
  - Sous chaque jour : barres de reservation
    - `visual-vocabulary.md > barre calendrier` : height 28px, border-radius 6px, border-left 3px solid couleur plateforme
    - Airbnb : fond airbnb-100, bordure `visual-vocabulary.md > couleur Airbnb`
    - Booking : fond booking-100, bordure `visual-vocabulary.md > couleur Booking`
    - Manuel : fond neutral-100, bordure `visual-vocabulary.md > couleur Manuel`
    - Texte dans la barre : nom voyageur 14px weight 500, troncature ellipsis
  - Jours sans reservation : pas de barre, juste l'en-tete du jour

- **Desktop (> 1024px)** : Grille 7 colonnes
  - En-tetes colonnes : L, M, M, J, V, S, D — 12px weight 500 uppercase
  - Cellules : numero du jour + barres de reservation empilees
  - `emotion-map.md > Calendrier Vue Mois > element signature`

**Layout** : Scroll vertical. Padding horizontal 16px. Gap 0 entre jours (separateur `visual-vocabulary.md > separateur liste`). Content padding bottom : `visual-vocabulary.md > content padding bottom`.
**Interaction** :
- Tap jour (mobile) → `→ /calendrier-detail-jour` (push)
- Tap barre reservation → `→ /detail-reservation/[id]` (push)
- Touch target barres : 44px height (padding vertical etendu si barre < 44px)

---

## Zone 4 : Bottom Tab Bar (Owner)

**Contenu** :
- 3 tabs (meme structure que `dashboard.md > Zone 5`)
  - Tab 1 : Accueil — inactif
  - Tab 2 : Calendrier — **ACTIF** (`visual-vocabulary.md > accent primaire`)
  - Tab 3 : Gestion — inactif

**Layout** : Fixed bottom, height 56px + env(safe-area-inset-bottom), `visual-vocabulary.md > ombre navigation bottom`
**Interaction** :
- Tap Tab 1 → `→ Tab: Accueil`
- Tap Tab 3 → `→ Tab: Gestion`
- Touch target par tab : 44x44px minimum

---

## Etats Speciaux

### Empty
- Grille affichee avec jours mais aucune barre de reservation
- Pas de message empty state (le calendrier vide est informatif en soi)
- `positioning.md > Empty States > Aucune reservation` si filtre actif sur un bien sans reservation

### Loading
- Zone 1 : header reel
- Zone 2 : chips skeleton (3 rectangles pilule, pulse)
- Zone 3 : `constraints.md > Skeleton screens > Calendrier mois` — grille avec en-tete reel + cellules avec barres skeleton
- Skeleton pulse 1500ms

### Error
- Toast : `positioning.md > Messages de feedback > Error (generique)`
- Bouton "Reessayer"

### Pull-to-Refresh
- `constraints.md > Pull-to-refresh` : seuil 60px
- Rafraichit les reservations depuis Supabase

---

*Wireframe D03 | Calendrier Vue Mois | 4 zones*
