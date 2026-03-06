# Regles de Layout — Dashboard Loc Immo

> A03-Art Direction | Grille, espacement et comportement responsive
> Sources : `02-brand/colors.md`, `02-brand/typography.md`, `01-brief/prd.md`

---

## 1. Systeme de grille

### 1.1 Base

Le systeme d'espacement est fonde sur une grille de **4px**. Toutes les dimensions (marges, paddings, gaps, hauteurs) sont des multiples de 4px.

### 1.2 Echelle d'espacement

| Token | Valeur | Usage courant |
|-------|--------|---------------|
| `space-0` | `0px` | Reset |
| `space-0.5` | `2px` | Micro-ajustement (bordures decoratives) |
| `space-1` | `4px` | Gap entre icone et label, gap interne badge |
| `space-1.5` | `6px` | Gap label-input |
| `space-2` | `8px` | Padding interne compact, gap entre badges |
| `space-3` | `12px` | Padding bouton sm, gap sidebar items, gap cards mobile |
| `space-4` | `16px` | Padding card mobile, padding header mobile, gap entre champs de formulaire |
| `space-5` | `20px` | Padding card desktop, gap entre sections internes |
| `space-6` | `24px` | Padding header desktop, padding page mobile, gap entre cards |
| `space-8` | `32px` | Gap entre sections de page |
| `space-10` | `40px` | Marge top de section majeure |
| `space-12` | `48px` | Padding empty state, espacement de section large |
| `space-16` | `64px` | Hauteur header owner, hauteur bottom nav |

---

## 2. Breakpoints

| Nom | Valeur | Cible principale |
|-----|--------|-----------------|
| `mobile` | `< 640px` | Smartphone (vue cleaning staff prioritaire) |
| `tablet` | `640px - 1024px` | Tablette |
| `desktop` | `> 1024px` | Desktop (vue owner prioritaire) |

### 2.1 Approche

Le design est **mobile-first** : les styles de base ciblent le mobile, puis les media queries `@media (min-width: 640px)` et `@media (min-width: 1024px)` ajoutent les styles pour tablette et desktop.

---

## 3. Layouts par role

### 3.1 Layout Owner — Desktop (> 1024px)

```
+------------------+--------------------------------------------+
|                  |              Header (64px)                  |
|                  +--------------------------------------------+
|   Sidebar        |                                            |
|   (256px)        |          Zone de contenu                   |
|   fixe           |          scrollable                        |
|                  |                                            |
|                  |          max-width: 1280px                 |
|                  |          padding: 24px                     |
|                  |          margin: 0 auto                    |
|                  |                                            |
+------------------+--------------------------------------------+
```

**Details :**
- Sidebar : `width: 256px`, `position: fixed`, `left: 0`, `top: 0`, `height: 100vh`
- Header : `position: fixed`, `top: 0`, `left: 256px`, `right: 0`, `height: 64px`, `z-index: 40`
- Contenu : `margin-left: 256px`, `margin-top: 64px`, `padding: 24px`
- Contenu max-width : `1280px`, centre avec `margin: 0 auto`
- Fond page : `surface-page` `oklch(0.985 0.002 260)`
- Fond sidebar : `surface-card` `oklch(0.998 0.000 0)`
- Fond header : `surface-card`

### 3.2 Layout Owner — Tablette (640px - 1024px)

```
+----------------------------------------------------+
|  [Hamburger]     Header (56px)          [Actions]  |
+----------------------------------------------------+
|                                                     |
|            Zone de contenu                          |
|            scrollable                               |
|                                                     |
|            padding: 20px                            |
|                                                     |
+----------------------------------------------------+
```

**Details :**
- Sidebar : masquee, accessible via hamburger menu (panneau lateral anime)
- Header : `height: 56px`, pleine largeur, `position: fixed`, `z-index: 40`
- Contenu : `margin-top: 56px`, `padding: 20px`
- Pas de max-width sur tablette (contenu prend toute la largeur)

### 3.3 Layout Owner — Mobile (< 640px)

Identique a la tablette avec :
- Padding contenu : `16px`
- Les tables deviennent des listes de cards
- Le calendrier grille devient une vue liste

### 3.4 Layout Cleaning Staff — Mobile (< 640px)

```
+----------------------------------------------------+
|  Loc Immo        Header (56px)          [Avatar]   |
+----------------------------------------------------+
|                                                     |
|            Zone de contenu                          |
|            scrollable                               |
|                                                     |
|            padding: 16px                            |
|            padding-bottom: 80px                     |
|                                                     |
+----------------------------------------------------+
| [Aujourd'hui]   [Semaine]   [Profil]               |
|              Bottom Nav (64px)                      |
+----------------------------------------------------+
```

**Details :**
- Header : `height: 56px`, simplifie (pas de hamburger, pas de breadcrumbs)
- Bottom nav : `height: 64px` + `env(safe-area-inset-bottom)`, `position: fixed`, `bottom: 0`
- Contenu : `margin-top: 56px`, `padding-bottom: calc(64px + 16px + env(safe-area-inset-bottom))`
- Padding contenu : `16px`

### 3.5 Layout Cleaning Staff — Desktop (> 1024px)

Le personnel de menage utilise principalement un smartphone. Si toutefois il accede au dashboard sur desktop :
- Meme layout que la vue mobile, mais centre dans un conteneur de `640px` max-width
- Pas de sidebar — la navigation reste simple (tabs ou navigation horizontale)

---

## 4. Grille de contenu

### 4.1 Desktop — Grille principale

La zone de contenu utilise une grille CSS flexible :

| Contexte | Colonnes | Gap |
|----------|----------|-----|
| Dashboard KPIs | 4 colonnes egales | `24px` |
| Liste de cards | 1 colonne (liste) | `16px` |
| Formulaire | 1 colonne, max-width `640px` | `20px` entre champs |
| Detail reservation | 2 colonnes (contenu principal 2/3 + sidebar 1/3) | `24px` |
| Proprietes (grille) | 2 colonnes | `24px` |
| Calendrier | 7 colonnes egales | `0px` (bordures gerent l'espacement) |

### 4.2 Tablette

| Contexte | Colonnes | Gap |
|----------|----------|-----|
| Dashboard KPIs | 2 colonnes | `20px` |
| Liste de cards | 1 colonne | `16px` |
| Formulaire | 1 colonne, max-width `100%` | `20px` |
| Detail reservation | 1 colonne (sidebar en dessous) | `20px` |
| Proprietes (grille) | 2 colonnes | `20px` |
| Calendrier | 7 colonnes | `0px` |

### 4.3 Mobile

| Contexte | Colonnes | Gap |
|----------|----------|-----|
| Dashboard KPIs | 2 colonnes | `12px` |
| Liste de cards | 1 colonne | `12px` |
| Formulaire | 1 colonne | `16px` |
| Detail reservation | 1 colonne | `16px` |
| Proprietes (grille) | 1 colonne | `12px` |
| Calendrier | Vue liste (pas de grille) | `0px` |

---

## 5. Dimensions fixes

### 5.1 Elements de structure

| Element | Dimension | Breakpoint |
|---------|-----------|------------|
| Sidebar | largeur `256px` | Desktop uniquement |
| Header Owner | hauteur `64px` | Desktop |
| Header Owner | hauteur `56px` | Tablette / Mobile |
| Header Staff | hauteur `56px` | Tous |
| Bottom Nav Staff | hauteur `64px` + safe area | Mobile |
| Max-width contenu | `1280px` | Desktop |
| Max-width formulaire | `640px` | Tous |
| Max-width modale small | `480px` | Desktop |
| Max-width modale medium | `640px` | Desktop |
| Max-width modale large | `800px` | Desktop |

### 5.2 Elements de contenu

| Element | Dimension |
|---------|-----------|
| Hauteur ligne de table | min `48px` |
| Hauteur en-tete de table | `40px` |
| Hauteur cellule calendrier (mois) | min `100px` (desktop), min `80px` (tablette) |
| Hauteur barre calendrier | `28px` |
| Hauteur item sidebar | `36px` |
| Hauteur item bottom nav | `64px` |

---

## 6. Paddings et marges de page

### 6.1 Padding de la zone de contenu

| Breakpoint | Padding |
|------------|---------|
| Mobile (< 640px) | `16px` |
| Tablette (640-1024px) | `20px` |
| Desktop (> 1024px) | `24px` |

### 6.2 Padding interne des cards

| Breakpoint | Padding |
|------------|---------|
| Mobile | `16px` |
| Tablette et desktop | `20px` |

### 6.3 Espacement entre sections

| Niveau | Espacement | Usage |
|--------|------------|-------|
| Entre le titre de page et le premier contenu | `24px` | Apres le titre "Reservations", avant la table |
| Entre deux sections de meme niveau | `32px` | Entre la section filtres et la section table |
| Entre deux cards empilees | `16px` (mobile), `24px` (desktop) | Liste de Reservation Cards |
| Entre les champs d'un formulaire | `20px` | Formulaire d'ajout de bien |
| Entre label et input | `6px` | Dans un groupe de champ |
| Entre input et message d'aide/erreur | `4px` | Sous un champ |

---

## 7. Comportement responsive detaille

### 7.1 Sidebar

| Breakpoint | Comportement |
|------------|--------------|
| Desktop (> 1024px) | Visible, fixe, `256px` |
| Tablette (640-1024px) | Masquee. Accessible via hamburger. Panneau lateral `280px` avec overlay. |
| Mobile (< 640px) | Masquee. Meme comportement que tablette. |

### 7.2 Tables

| Breakpoint | Comportement |
|------------|--------------|
| Desktop | Table classique avec toutes les colonnes |
| Tablette | Table avec colonnes reduites (masquer : plateforme si badge dans le nom, notes, date de creation). Priorite : statut, nom bien, dates, montant. |
| Mobile | Pas de table. Transformation en liste de cards (Reservation Card, Property Card, etc.). Le contenu masque est accessible en ouvrant le detail. |

**Colonnes de la table reservations par breakpoint :**

| Colonne | Desktop | Tablette | Mobile |
|---------|---------|----------|--------|
| Checkbox selection | Oui | Non | Non |
| Plateforme (dot) | Oui | Oui | Dans la card |
| Bien | Oui | Oui | Dans la card |
| Voyageur | Oui | Oui | Dans la card |
| Check-in | Oui | Oui | Dans la card |
| Check-out | Oui | Non (duree a la place) | Dans la card |
| Duree | Non | Oui | Dans la card |
| Montant | Oui | Oui | Dans la card |
| Statut | Oui | Oui | Badge dans la card |
| Actions | Oui | Icone | Chevron dans la card |

### 7.3 Calendrier

| Breakpoint | Comportement |
|------------|--------------|
| Desktop | Grille mois (7 colonnes, cellules de 100px+ de hauteur) avec barres de reservation |
| Tablette | Grille mois compacte (cellules de 80px de hauteur), texte reduit, max 2 barres + "+N" |
| Mobile | Vue liste chronologique. En-tete de jour sticky, Reservation Cards sous chaque jour. Navigation par date picker. |

### 7.4 KPIs

| Breakpoint | Comportement |
|------------|--------------|
| Desktop | 4 cards en ligne (grille 4 colonnes) |
| Tablette | 2 cards par ligne (grille 2 colonnes) |
| Mobile | 2 cards par ligne, valeurs reduites (`text-2xl` au lieu de `text-3xl`) |

### 7.5 Formulaires

| Breakpoint | Comportement |
|------------|--------------|
| Desktop | Max-width `640px`, champs en 1 colonne (sauf paires logiques : check-in / check-out cote a cote) |
| Tablette | Pleine largeur, meme structure |
| Mobile | Pleine largeur, toutes les paires passent en 1 colonne empilee |

### 7.6 Modales

| Breakpoint | Comportement |
|------------|--------------|
| Desktop | Centree a l'ecran, largeur selon type (small/medium/large) |
| Tablette | Centree, max-width `calc(100vw - 48px)` |
| Mobile | Plein ecran ou bottom sheet (glisse depuis le bas), border-radius top `12px`, hauteur max `85vh` |

---

## 8. Z-index

Echelle de z-index pour gerer l'empilement :

| Couche | Z-index | Elements |
|--------|---------|----------|
| Contenu | `0` (auto) | Cards, tables, contenu de page |
| Sticky headers | `10` | En-tetes de table sticky, en-tetes de jour (calendrier mobile) |
| Sidebar | `30` | Sidebar desktop |
| Header | `40` | Header fixe (desktop et mobile) |
| Bottom nav | `40` | Bottom navigation staff |
| Dropdown / Select | `50` | Menus deroulants, date pickers |
| Overlay modale | `60` | Fond semi-transparent des modales |
| Modale | `70` | Contenu de la modale |
| Toast | `80` | Notifications toast (toujours au-dessus) |
| Tooltip | `90` | Tooltips (toujours au premier plan) |

---

## 9. Scroll

### 9.1 Zone de contenu

- La zone de contenu principale est la seule zone qui scroll (`overflow-y: auto`)
- La sidebar (desktop) est fixe et ne scroll pas (sauf si la navigation depasse la hauteur : `overflow-y: auto` sur la zone de nav)
- Le header et la bottom nav sont fixes et ne scroll jamais

### 9.2 Scroll horizontal

- **Interdit** sur la page globale — le contenu s'adapte a la largeur
- **Autorise** dans les cas suivants uniquement :
  - Tables avec beaucoup de colonnes sur tablette (si la transformation en cards n'est pas souhaitable pour ce contexte)
  - Contenu code/reference (blocs `overflow-x: auto` avec `font-mono`)

### 9.3 Scroll snap (calendrier)

Sur mobile, la navigation entre semaines/mois peut utiliser `scroll-snap-type: x mandatory` pour un defilement fluide.

---

## 10. Safe areas

### 10.1 Appareils a encoche

Sur les smartphones modernes (encoche, Dynamic Island) :
- Le header respecte `env(safe-area-inset-top)` — padding-top supplementaire
- La bottom nav respecte `env(safe-area-inset-bottom)` — padding-bottom supplementaire
- Les bords gauche/droit respectent `env(safe-area-inset-left)` et `env(safe-area-inset-right)` en mode paysage

### 10.2 CSS

```css
/* Appliquer sur le layout global */
padding-top: env(safe-area-inset-top);
padding-bottom: env(safe-area-inset-bottom);
padding-left: env(safe-area-inset-left);
padding-right: env(safe-area-inset-right);
```

---

## 11. Resume des regles critiques

| Regle | Valeur |
|-------|--------|
| Grille de base | 4px |
| Sidebar desktop | 256px fixe |
| Header owner desktop | 64px |
| Header mobile/staff | 56px |
| Bottom nav staff | 64px + safe area |
| Max-width contenu | 1280px |
| Max-width formulaire | 640px |
| Padding page mobile | 16px |
| Padding page tablette | 20px |
| Padding page desktop | 24px |
| Gap entre cards mobile | 12px |
| Gap entre cards desktop | 24px |
| Tables -> Cards | < 640px |
| Calendrier -> Liste | < 640px |
| Sidebar -> Hamburger | < 1024px |

---

*Document genere le 2026-02-11 — A03-Art Direction / Layout Rules*
