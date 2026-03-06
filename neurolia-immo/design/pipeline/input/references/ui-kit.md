# UI Kit — Dashboard Loc Immo

> A03-Art Direction | Composants et patterns UI
> Sources : `02-brand/colors.md`, `02-brand/typography.md`, `02-brand/tone.md`, `01-brief/prd.md`

---

## 1. Principes de design

### 1.1 Philosophie

L'interface est un **outil de travail quotidien**. Chaque composant est concu pour maximiser la lisibilite des donnees et minimiser le bruit visuel. Les decorations sont absentes ; seules les couleurs semantiques et les couleurs plateformes apportent de la vivacite.

### 1.2 References visuelles

Le design s'inspire des dashboards de type **Linear**, **Vercel Dashboard**, et **Notion** :
- Surfaces blanches sur fond gris tres clair
- Bordures legeres (1px) plutot qu'ombres lourdes
- Typographie dense mais aeree
- Interactions subtiles et rapides

### 1.3 Conventions generales

| Propriete | Valeur |
|-----------|--------|
| Border radius cards | `6px` |
| Border radius inputs/badges | `4px` |
| Border radius pills/avatars | `9999px` |
| Bordure par defaut | `1px solid neutral-200` (`oklch(0.900 0.005 260)`) |
| Ombre card | `0 1px 3px oklch(0 0 0 / 0.04), 0 1px 2px oklch(0 0 0 / 0.06)` |
| Ombre elevated (modale, dropdown) | `0 4px 12px oklch(0 0 0 / 0.08), 0 2px 4px oklch(0 0 0 / 0.04)` |
| Transition par defaut | `150ms ease-out` (proprietes explicites uniquement) |

---

## 2. Boutons

### 2.1 Structure

Chaque bouton est compose de :
- **Conteneur** : `display: inline-flex; align-items: center; justify-content: center; gap: 8px;`
- **Icone** (optionnel) : a gauche du label, 16px pour `sm`, 18px pour `md`, 20px pour `lg`
- **Label** : `text-sm font-semibold` (`0.875rem`, 600)

### 2.2 Variantes

#### Primary (action principale)

| Etat | Fond | Texte | Bordure |
|------|------|-------|---------|
| Default | `primary-500` `oklch(0.580 0.115 250)` | Blanc `oklch(0.998 0.000 0)` | Aucune |
| Hover | `primary-600` `oklch(0.500 0.115 250)` | Blanc | Aucune |
| Active/Pressed | `primary-700` `oklch(0.420 0.110 250)` | Blanc | Aucune |
| Disabled | `neutral-200` `oklch(0.900 0.005 260)` | `neutral-400` `oklch(0.710 0.010 260)` | Aucune |
| Loading | `primary-500` avec opacite 70% | Spinner blanc 16px | Aucune |

#### Secondary (action secondaire)

| Etat | Fond | Texte | Bordure |
|------|------|-------|---------|
| Default | `surface-card` `oklch(0.998 0.000 0)` | `neutral-700` `oklch(0.390 0.015 260)` | `1px solid neutral-200` |
| Hover | `neutral-50` `oklch(0.985 0.002 260)` | `neutral-800` `oklch(0.300 0.015 260)` | `1px solid neutral-300` |
| Active/Pressed | `neutral-100` `oklch(0.965 0.003 260)` | `neutral-900` `oklch(0.210 0.015 260)` | `1px solid neutral-300` |
| Disabled | `neutral-100` | `neutral-400` | `1px solid neutral-200` |
| Loading | Fond default avec opacite 70% | Spinner `neutral-500` 16px | Inchange |

#### Ghost (action tertiaire, navigation)

| Etat | Fond | Texte | Bordure |
|------|------|-------|---------|
| Default | Transparent | `neutral-600` `oklch(0.490 0.015 260)` | Aucune |
| Hover | `neutral-100` `oklch(0.965 0.003 260)` | `neutral-800` | Aucune |
| Active/Pressed | `neutral-150` `oklch(0.940 0.004 260)` | `neutral-900` | Aucune |
| Disabled | Transparent | `neutral-400` | Aucune |

#### Danger (action destructrice)

| Etat | Fond | Texte | Bordure |
|------|------|-------|---------|
| Default | `error-500` `oklch(0.580 0.200 25)` | Blanc | Aucune |
| Hover | `error-600` `oklch(0.500 0.185 25)` | Blanc | Aucune |
| Active/Pressed | `error-700` `oklch(0.410 0.150 25)` | Blanc | Aucune |
| Disabled | `neutral-200` | `neutral-400` | Aucune |

### 2.3 Tailles

| Taille | Hauteur | Padding horizontal | Font | Icone |
|--------|---------|-------------------|------|-------|
| `sm` | 32px | 12px | `text-xs font-semibold` (12px) | 16px |
| `md` | 36px | 16px | `text-sm font-semibold` (14px) | 18px |
| `lg` | 44px | 20px | `text-sm font-semibold` (14px) | 20px |

La taille `lg` (44px) est la taille par defaut sur mobile pour respecter la zone tactile minimum.

### 2.4 Bouton icone seule (Icon Button)

Meme variantes et etats que les boutons texte. Dimensions carrees :
- `sm` : 32x32px
- `md` : 36x36px
- `lg` : 44x44px

Border radius : `6px` (ou `9999px` pour le style rond).

---

## 3. Inputs et formulaires

### 3.1 Input texte

**Structure :**
- **Conteneur** : `height: 40px; padding: 0 12px; border-radius: 4px;`
- **Texte** : `text-base font-normal neutral-900` (`Inter`, 16px, 400)
- **Placeholder** : `text-base font-normal neutral-400` (`oklch(0.710 0.010 260)`)
- **Label** (au-dessus) : `text-sm font-medium neutral-700` (`14px`, 500)
- **Texte d'aide** (en-dessous) : `text-xs font-normal neutral-500` (`12px`, 400)
- **Message d'erreur** (en-dessous) : `text-xs font-normal error-600` (`oklch(0.500 0.185 25)`)

| Etat | Fond | Bordure | Anneau de focus |
|------|------|---------|-----------------|
| Default | `surface-sunken` `oklch(0.955 0.004 260)` | `1px solid neutral-200` | Aucun |
| Hover | `surface-sunken` | `1px solid neutral-300` `oklch(0.830 0.007 260)` | Aucun |
| Focus | `surface-card` `oklch(0.998 0.000 0)` | `1px solid primary-500` `oklch(0.580 0.115 250)` | `0 0 0 3px primary-100` `oklch(0.930 0.025 250)` |
| Error | `surface-sunken` | `1px solid error-500` `oklch(0.580 0.200 25)` | `0 0 0 3px error-50` `oklch(0.970 0.015 25)` |
| Disabled | `neutral-100` `oklch(0.965 0.003 260)` | `1px solid neutral-200` | Aucun |

### 3.2 Textarea

Meme regles que l'input texte avec :
- Hauteur minimale : 80px (3 lignes)
- Hauteur maximale : 200px
- `resize: vertical` uniquement

### 3.3 Select

**Structure :**
- Identique a l'input texte
- Icone chevron a droite : `16px`, couleur `neutral-400`
- Chevron tourne de 180 degres quand le select est ouvert

| Etat | Comportement |
|------|--------------|
| Default | Meme style que l'input |
| Open | Bordure `primary-500`, anneau de focus `primary-100`, dropdown visible |
| Disabled | Fond `neutral-100`, texte `neutral-400`, chevron `neutral-300` |

### 3.4 Dropdown (menu du select)

- Fond : `surface-elevated` `oklch(0.998 0.000 0)` + ombre elevated
- Bordure : `1px solid neutral-200`
- Border radius : `6px`
- Padding interne : `4px`
- Max-height : `240px` avec scroll interne
- Position : en-dessous de l'input, aligne a gauche, meme largeur minimum

**Item du dropdown :**
- Hauteur : `36px`
- Padding : `8px 12px`
- Border radius : `4px`
- Texte : `text-sm font-normal neutral-700`
- Hover : fond `neutral-100`
- Selectionne : fond `primary-50` `oklch(0.970 0.010 250)`, texte `primary-700` `oklch(0.420 0.110 250)`, icone check a droite

### 3.5 Checkbox

- Dimension : `18x18px` (zone tactile : `44x44px` sur mobile via padding)
- Border radius : `4px`
- Default : fond blanc, bordure `neutral-300`
- Hover : bordure `neutral-400`
- Checked : fond `primary-500`, icone check blanche
- Focus : anneau `primary-100`
- Disabled : fond `neutral-100`, bordure `neutral-200`

### 3.6 Switch (toggle)

- Piste : `40x22px`, border radius `9999px`
- Poignee : `18x18px`, cercle blanc
- Off : piste `neutral-300`
- On : piste `primary-500`
- Transition : `200ms ease-out`
- Focus : anneau `primary-100` autour de la piste

### 3.7 Date Picker

- Input texte standard avec icone calendrier a droite (`16px`, `neutral-400`)
- Clic ouvre un calendrier en dropdown (voir section Calendrier)
- Format affiche : `JJ/MM/AAAA`

### 3.8 Groupe label + input

Espacement entre le label et l'input : `6px`. Espacement entre l'input et le texte d'aide/erreur : `4px`. Espacement entre deux groupes de champs : `20px`.

---

## 4. Cards

### 4.1 Card generique

**Structure :**
- Fond : `surface-card` `oklch(0.998 0.000 0)`
- Bordure : `1px solid neutral-200`
- Border radius : `6px`
- Ombre : `0 1px 3px oklch(0 0 0 / 0.04), 0 1px 2px oklch(0 0 0 / 0.06)`
- Padding interne : `20px` (desktop), `16px` (mobile)

**Zones internes :**
- **Header** : titre + action secondaire, separe du corps par `border-bottom: 1px solid neutral-200`, padding-bottom `16px`
- **Body** : contenu principal
- **Footer** (optionnel) : actions, separe du corps par `border-top: 1px solid neutral-200`, padding-top `16px`

### 4.2 Reservation Card

Carte affichant une reservation dans la vue liste.

**Structure :**
```
+-------------------------------------------------------+
| [Dot plateforme] Studio Bastille          [Badge statut] |
| Airbnb - Ref. HM3X9KN2Z7                               |
|                                                          |
| Voyageur : Jean Dupont                                   |
| 15/03 → 18/03 (3 nuits)    2 voyageurs                  |
|                                                          |
| 450 EUR                              [Icone chevron →]   |
+-------------------------------------------------------+
```

**Details :**
- **Dot plateforme** : cercle `8px`, couleur selon plateforme (`airbnb-500`, `booking-500`, `manual-500`)
- **Nom du bien** : `text-base font-semibold neutral-900`
- **Badge statut** : voir section Badges
- **Plateforme + reference** : `text-xs font-normal neutral-500`, reference en `font-mono`
- **Voyageur** : `text-sm font-normal neutral-700`
- **Dates** : `text-sm font-normal neutral-600 tabular-nums`
- **Duree** : `text-sm font-normal neutral-500` entre parentheses
- **Montant** : `text-sm font-medium neutral-900 tabular-nums` (masque pour le role `cleaning_staff`)
- **Chevron** : `16px`, `neutral-400`, indique que la carte est cliquable

**Etats :**
- Default : comme decrit ci-dessus
- Hover : fond `neutral-50`, bordure `neutral-300`
- Active/Pressed : fond `neutral-100`

### 4.3 Property Card

Carte affichant un bien dans la vue liste des proprietes.

**Structure :**
```
+-------------------------------------------------------+
| [Photo miniature 48x48]  Studio Bastille               |
|                           12 rue de la Paix, Paris      |
|                           4 voyageurs max               |
|                                                          |
| Airbnb ● | Booking ● | 3 reservations ce mois          |
+-------------------------------------------------------+
```

**Details :**
- **Photo** : `48x48px`, border radius `6px`, fond `neutral-200` si absente
- **Nom** : `text-base font-semibold neutral-900`
- **Adresse** : `text-sm font-normal neutral-500`
- **Capacite** : `text-xs font-normal neutral-400`
- **Indicateurs plateformes** : dots `6px` colores + label `text-xs`
- **Compteur reservations** : `text-xs font-normal neutral-500`

### 4.4 Cleaning Task Card

Carte affichant une tache de menage dans la vue staff.

**Structure :**
```
+-------------------------------------------------------+
| Check-out menage             [Badge statut]             |
| Studio Bastille                                          |
| 12 rue de la Paix, Paris                                |
|                                                          |
| Check-out : 10h00 | Check-in : 15h00                   |
| Code d'acces : 4A72B          Wifi : MonWifi!           |
|                                                          |
| [Bouton: Menage termine]                                 |
+-------------------------------------------------------+
```

**Details :**
- **Type** : `text-sm font-medium neutral-700`
- **Badge statut** : `pending` (jaune), `in_progress` (bleu), `completed` (vert)
- **Nom du bien** : `text-base font-semibold neutral-900`
- **Adresse** : `text-sm font-normal neutral-500`
- **Horaires** : `text-sm font-normal neutral-600 tabular-nums`
- **Codes** : `font-mono text-sm neutral-800` sur fond `neutral-100` avec padding `2px 6px`, border radius `4px`
- **Bouton action** : variante `Primary`, taille `lg` (44px) pour mobile
- Le bouton passe en etat `loading` pendant la requete, puis disparait et affiche un texte de confirmation avec timestamp

### 4.5 KPI Card

Carte affichant un indicateur cle de performance.

**Structure :**
```
+---------------------------+
| Taux d'occupation          |
|                            |
| 78%                        |
| +12% vs mois dernier       |
+---------------------------+
```

**Details :**
- **Label** : `text-sm font-medium neutral-500`
- **Valeur** : `text-3xl font-bold neutral-900 tabular-nums` (desktop) / `text-2xl` (mobile)
- **Variation positive** : `text-sm font-semibold success-600` `oklch(0.560 0.155 155)` avec fleche vers le haut
- **Variation negative** : `text-sm font-semibold error-600` `oklch(0.500 0.185 25)` avec fleche vers le bas
- **Variation neutre** : `text-sm font-normal neutral-500`
- Padding : `20px`

### 4.6 Calendar Event Bar

Barre representant une reservation sur le calendrier multi-biens.

**Structure :**
- Hauteur : `28px`
- Border radius : `4px`
- Padding : `0 8px`
- Texte : `text-xs font-medium` (12px, 500), tronque avec `text-overflow: ellipsis`

**Couleurs selon plateforme :**

| Plateforme | Fond | Texte | Bordure gauche (3px) |
|------------|------|-------|----------------------|
| Airbnb | `airbnb-100` `oklch(0.930 0.040 20)` | `airbnb-700` `oklch(0.470 0.150 20)` | `airbnb-500` `oklch(0.640 0.190 20)` |
| Booking | `booking-100` `oklch(0.920 0.035 245)` | `booking-700` `oklch(0.290 0.120 245)` | `booking-500` `oklch(0.430 0.150 245)` |
| Manuel | `manual-100` `oklch(0.930 0.005 260)` | `manual-700` `oklch(0.390 0.015 260)` | `manual-500` `oklch(0.590 0.013 260)` |

**Etats :**
- Default : comme decrit ci-dessus
- Hover : opacite du fond passe a 100%, bordure plus prononcee
- Tooltip au hover : nom du voyageur, dates, montant (owner uniquement)

---

## 5. Tables

### 5.1 Structure

| Element | Style |
|---------|-------|
| Conteneur | Fond `surface-card`, bordure `1px solid neutral-200`, border radius `6px`, overflow hidden |
| En-tete | Fond `neutral-50` `oklch(0.985 0.002 260)` |
| Cellule en-tete | `text-xs font-medium neutral-500 uppercase tracking-wide` (12px, 500), padding `12px 16px`, hauteur `40px` |
| Ligne | Hauteur minimum `48px`, bordure `border-bottom: 1px solid neutral-200` (sauf derniere) |
| Cellule | `text-sm font-normal neutral-700` (14px, 400), padding `12px 16px` |
| Ligne hover | Fond `neutral-50` |
| Ligne selectionnee | Fond `primary-50` `oklch(0.970 0.010 250)` |

### 5.2 Colonnes specifiques

| Type de colonne | Style |
|-----------------|-------|
| Montant | `text-sm font-medium neutral-900 tabular-nums`, aligne a droite |
| Date | `text-sm font-normal neutral-600 tabular-nums` |
| Statut | Badge (voir section Badges) |
| Plateforme | Dot `8px` + label `text-xs` |
| Nom (lien) | `text-sm font-medium primary-600`, hover: `primary-700`, underline au hover |
| Actions | Icone buttons `ghost` alignes a droite |
| Checkbox (selection) | Checkbox dans la premiere colonne, largeur fixe `48px` |

### 5.3 Tri et filtres

- En-tete triable : icone fleche `12px` a droite du label, `neutral-400` (inactif), `neutral-700` (actif)
- Filtre actif : badge compteur a cote du bouton filtre (`text-xs font-semibold`, fond `primary-100`, texte `primary-700`)

### 5.4 Pagination

- Position : en-dessous de la table, aligne a droite
- Texte : `text-sm font-normal neutral-500` ("1-20 sur 47 reservations")
- Boutons page : icon buttons `ghost`, `32x32px`
- Page active : fond `primary-50`, texte `primary-700`
- Limite par defaut : 20 lignes par page

### 5.5 Comportement responsive (mobile)

Sur mobile (< 640px), les tables se transforment en **liste de cards**. Chaque ligne devient une Reservation Card, Property Card, ou Cleaning Task Card selon le contexte. Les colonnes masquees sur mobile sont accessibles en ouvrant le detail.

---

## 6. Badges

### 6.1 Structure

- Hauteur : `22px`
- Padding : `0 8px`
- Border radius : `4px`
- Texte : `text-xs font-semibold uppercase tracking-wide` (12px, 600)
- Pas de bordure visible — la differentiation se fait par le fond colore

### 6.2 Badges de statut (reservation)

| Statut | Fond | Texte | Label FR |
|--------|------|-------|----------|
| `confirmed` | `success-100` `oklch(0.930 0.055 155)` | `success-700` `oklch(0.460 0.130 155)` | CONFIRMEE |
| `pending_info` | `warning-100` `oklch(0.940 0.070 85)` | `warning-700` `oklch(0.550 0.130 60)` | EN ATTENTE |
| `checked_in` | `info-100` `oklch(0.930 0.040 240)` | `info-700` `oklch(0.410 0.110 240)` | EN COURS |
| `checked_out` | `neutral-100` `oklch(0.965 0.003 260)` | `neutral-600` `oklch(0.490 0.015 260)` | TERMINEE |
| `cancelled` | `error-100` `oklch(0.930 0.045 25)` | `error-700` `oklch(0.410 0.150 25)` | ANNULEE |
| `no_show` | `error-100` | `error-700` | NO SHOW |

### 6.3 Badges de statut (tache menage)

| Statut | Fond | Texte | Label FR |
|--------|------|-------|----------|
| `pending` | `warning-100` | `warning-700` | A FAIRE |
| `in_progress` | `info-100` | `info-700` | EN COURS |
| `completed` | `success-100` | `success-700` | TERMINE |

### 6.4 Badges de plateforme

| Plateforme | Fond | Texte | Label |
|------------|------|-------|-------|
| Airbnb | `airbnb-100` `oklch(0.930 0.040 20)` | `airbnb-700` `oklch(0.470 0.150 20)` | AIRBNB |
| Booking | `booking-100` `oklch(0.920 0.035 245)` | `booking-700` `oklch(0.290 0.120 245)` | BOOKING |
| Manuel | `manual-100` `oklch(0.930 0.005 260)` | `manual-700` `oklch(0.390 0.015 260)` | MANUEL |

### 6.5 Badge compteur

- Forme circulaire ou pill : border radius `9999px`
- Taille minimum : `20x20px`
- Fond : `primary-500` (par defaut), ou `error-500` (alerte)
- Texte : blanc, `text-xs font-bold tabular-nums` (12px, 700)
- Usage : compteur de notifications, nombre de filtres actifs

---

## 7. Indicateurs de statut

### 7.1 Status Dot

- Cercle plein : `8px` de diametre
- Couleurs : selon le statut ou la plateforme (voir palettes dans `02-brand/colors.md`)
- Avec animation pulse optionnelle pour les statuts actifs (`checked_in`) : `animation: pulse 2s ease-in-out infinite`
- Zone tactile invisible de `24px` autour pour le tooltip

### 7.2 Status Line (calendrier)

- Barre verticale : `3px` de large, hauteur complète de la cellule
- Position : bord gauche de la cellule calendrier
- Couleur : selon plateforme (`airbnb-500`, `booking-500`, `manual-500`)

---

## 8. Navigation

### 8.1 Sidebar (Owner — Desktop)

**Structure :**
- Largeur : `256px` fixe
- Hauteur : `100vh`, position fixe
- Fond : `surface-card` `oklch(0.998 0.000 0)`
- Bordure droite : `1px solid neutral-200`
- Padding : `16px 12px`

**Zones :**
1. **Logo** (haut) : "Loc Immo" en `text-lg font-semibold neutral-900` (18px, 600), padding-bottom `24px`
2. **Navigation principale** : liste de liens
3. **Section separateur** : `border-top: 1px solid neutral-200`, margin `12px 0`
4. **Navigation secondaire** (parametres, utilisateurs) : en bas de la sidebar
5. **Profil utilisateur** (tout en bas) : avatar `32px` + nom `text-sm font-medium neutral-700`

**Item de navigation :**
- Hauteur : `36px`
- Padding : `0 12px`
- Border radius : `6px`
- Icone : `20px`, a gauche, gap `12px`
- Texte : `text-sm font-medium`

| Etat | Fond | Texte/Icone |
|------|------|-------------|
| Default | Transparent | `neutral-600` `oklch(0.490 0.015 260)` |
| Hover | `neutral-100` `oklch(0.965 0.003 260)` | `neutral-800` |
| Active (page actuelle) | `primary-50` `oklch(0.970 0.010 250)` | `primary-600` `oklch(0.500 0.115 250)`, texte `font-semibold` |
| Focus | Anneau `primary-100` `2px` | Inchange |

**Items de navigation Owner :**
1. Reservations (icone: liste)
2. Calendrier (icone: calendrier)
3. Proprietes (icone: maison)
4. KPIs (icone: graphique) — Phase 2, masque en MVP
5. ---
6. Parametres (icone: engrenage)
7. Utilisateurs (icone: personnes)

### 8.2 Header (Owner — Desktop)

- Hauteur : `64px`
- Fond : `surface-card`
- Bordure basse : `1px solid neutral-200`
- Padding : `0 24px`
- Contenu : titre de la page courante (`text-2xl font-semibold neutral-900`) + actions contextuelles a droite (boutons, filtres)
- Position : fixe en haut, commence a `256px` de la gauche (apres la sidebar)

### 8.3 Header (Owner — Mobile / Tablette)

- Hauteur : `56px`
- Fond : `surface-card`
- Bordure basse : `1px solid neutral-200`
- Padding : `0 16px`
- Gauche : bouton hamburger (`ghost`, `44x44px`)
- Centre : "Loc Immo" `text-base font-semibold neutral-900`
- Droite : actions contextuelles (icone buttons)

**Menu hamburger (mobile) :**
- Overlay plein ecran, fond `oklch(0 0 0 / 0.5)`
- Panneau lateral gauche, largeur `280px`, fond `surface-card`
- Meme structure que la sidebar desktop
- Animation d'ouverture : `slide-in 200ms ease-out`
- Fermeture : clic sur overlay ou bouton X

### 8.4 Header (Cleaning Staff — Mobile)

- Hauteur : `56px`
- Fond : `surface-card`
- Bordure basse : `1px solid neutral-200`
- Gauche : "Loc Immo" `text-base font-semibold neutral-900`
- Droite : avatar profil `32px`

### 8.5 Bottom Navigation (Cleaning Staff — Mobile)

**Structure :**
- Hauteur : `64px` + safe area (env(safe-area-inset-bottom))
- Position : fixe en bas
- Fond : `surface-card`
- Bordure haute : `1px solid neutral-200`
- `display: flex; justify-content: space-around; align-items: center;`

**Items :**
- Icone : `24px`
- Label : `text-xs font-medium` (12px, 500)
- Gap icone/label : `4px`
- Zone tactile : `64x64px` minimum

| Etat | Icone/Label |
|------|-------------|
| Default | `neutral-400` `oklch(0.710 0.010 260)` |
| Active | `primary-500` `oklch(0.580 0.115 250)` |

**Items Cleaning Staff :**
1. Aujourd'hui (icone: soleil)
2. Semaine (icone: calendrier)
3. Profil (icone: personne)

### 8.6 Breadcrumbs

- Separateur : chevron `>` en `neutral-300`, `12px`
- Items : `text-sm font-normal neutral-500`, hover `neutral-700`
- Item actif (dernier) : `text-sm font-medium neutral-800`, non cliquable
- Espacement entre items : `8px`
- Position : en-dessous du header, padding `12px 24px` (desktop) / `12px 16px` (mobile)

### 8.7 Tabs

- Utilises pour les sous-sections d'une page (ex: vue mois / vue semaine dans le calendrier)
- Hauteur : `40px`
- Bordure basse du conteneur : `1px solid neutral-200`
- Item : `text-sm font-medium neutral-500`, padding `0 16px`
- Item actif : `text-sm font-semibold primary-600`, bordure basse `2px solid primary-500`
- Hover : texte `neutral-700`

---

## 9. Calendrier

### 9.1 Vue mois (desktop)

**Grille :**
- 7 colonnes (lun-dim), nombre de lignes variable (4-6)
- En-tete de colonnes : `text-xs font-medium neutral-500 uppercase` (L, M, M, J, V, S, D)
- Cellule : bordure `1px solid neutral-200`, padding `4px`, hauteur minimum `100px`

**Cellule de jour :**
- Numero du jour : `text-sm font-normal neutral-700 tabular-nums`, position top-right, padding `4px 8px`
- Jour hors du mois courant : numero en `neutral-300`
- Jour actuel : numero dans un cercle `24px` fond `primary-500`, texte blanc
- Barres de reservation : empilees verticalement, gap `2px`, style Calendar Event Bar (voir section 4.6)
- Si plus de 3 barres : afficher 2 + texte "+N autres" en `text-xs neutral-500`, cliquable

**Navigation :**
- Fleches precedent/suivant : icon buttons `ghost`
- Mois et annee au centre : `text-lg font-semibold neutral-800`
- Bouton "Aujourd'hui" : bouton `secondary` `sm`

### 9.2 Vue semaine (desktop)

- 7 colonnes, chaque colonne = un jour
- En-tete : jour de la semaine + date (`text-sm font-medium`, date en `tabular-nums`)
- Jour actuel : en-tete avec fond `primary-50`
- Contenu : liste de reservations sous forme de barres, empilees par propriete
- Ligne par propriete : nom du bien a gauche (`text-sm font-medium neutral-700`), barres a droite

### 9.3 Vue liste (mobile)

Sur mobile, le calendrier devient une **liste chronologique** :
- En-tete de jour : `text-sm font-semibold neutral-800`, fond `neutral-50`, sticky
- Sous l'en-tete : liste de Reservation Cards compactes
- Pas de vue grille — le scroll vertical est plus adapte au mobile
- Boutons de navigation : tabs "Semaine" / "Mois" remplacees par un date picker simplifie

---

## 10. Modales et Dialogs

### 10.1 Modale

**Structure :**
- Overlay : fond `oklch(0 0 0 / 0.5)`, animation `fade-in 150ms`
- Conteneur : fond `surface-elevated` `oklch(0.998 0.000 0)`, border radius `8px`, ombre elevated
- Largeur : `480px` (small), `640px` (medium), `800px` (large)
- Largeur mobile : `100vw - 32px` (padding 16px de chaque cote)
- Padding : `24px`
- Animation d'entree : `scale(0.95) → scale(1)` + `opacity 0 → 1`, `200ms ease-out`

**Zones :**
1. **Header** : titre `text-xl font-semibold neutral-900` + bouton close `ghost` icon button (X, `20px`)
2. **Body** : contenu, padding-top `16px`
3. **Footer** : boutons d'action, padding-top `24px`, alignes a droite, gap `12px`

### 10.2 Dialog de confirmation

Modale `small` (480px) avec :
- Icone contextuelle (`24px`) : info (`info-500`), alerte (`warning-500`), danger (`error-500`)
- Titre : `text-lg font-semibold neutral-900`
- Description : `text-sm font-normal neutral-600`
- Boutons : "Annuler" (`secondary`) + action (`primary` ou `danger` selon le contexte)

**Exemple suppression :**
- Icone : poubelle, `error-500`
- Titre : "Supprimer cette reservation ?"
- Description : "Cette action est irreversible."
- Boutons : "Annuler" + "Supprimer" (variante `danger`)

---

## 11. Tooltips

### 11.1 Structure

- Fond : `neutral-900` `oklch(0.210 0.015 260)`
- Texte : `text-xs font-normal` (12px, 400), blanc
- Padding : `6px 10px`
- Border radius : `4px`
- Max width : `240px`
- Fleche : triangle `6px` pointant vers l'element declencheur
- Animation : `fade-in 100ms`, delai d'apparition `300ms`
- Position : au-dessus par defaut, repositionne automatiquement si depasse l'ecran

### 11.2 Usages

- Texte tronque dans les tables : tooltip avec le texte complet
- Icones sans label : tooltip avec le nom de l'action
- Barres de calendrier : tooltip avec les details de la reservation
- Abreviations : tooltip avec le terme complet

---

## 12. Toasts (notifications in-app)

### 12.1 Structure

- Position : coin superieur droit, `24px` du bord, empiles verticalement avec `12px` de gap
- Largeur : `360px` (desktop), `100vw - 32px` (mobile, centre)
- Fond : `surface-card` + ombre elevated
- Bordure : `1px solid neutral-200`
- Border radius : `6px`
- Padding : `12px 16px`
- Barre laterale gauche : `3px` de large, couleur selon le type
- Animation d'entree : `slide-in-right 200ms ease-out` (desktop), `slide-in-top` (mobile)
- Duree : `4000ms` auto-dismiss (sauf erreur)
- Bouton close : icon button `ghost` `sm`, position droite

### 12.2 Types

| Type | Barre laterale | Icone |
|------|----------------|-------|
| Succes | `success-500` `oklch(0.650 0.170 155)` | Check cercle |
| Erreur | `error-500` `oklch(0.580 0.200 25)` | X cercle |
| Alerte | `warning-500` `oklch(0.770 0.170 75)` | Triangle alerte |
| Info | `info-500` `oklch(0.580 0.140 240)` | Info cercle |

### 12.3 Contenu

- **Titre** : `text-sm font-semibold neutral-900`
- **Description** (optionnel) : `text-sm font-normal neutral-600`
- **Action** (optionnel) : lien `text-sm font-medium primary-600`, hover `primary-700`

---

## 13. Skeletons et Loading States

### 13.1 Skeleton

Les skeletons remplacent le contenu pendant le chargement. Ils reprennent la forme exacte du composant final.

**Style :**
- Fond : `neutral-150` `oklch(0.940 0.004 260)`
- Animation : pulse (opacite oscillant entre 40% et 100%), `1.5s ease-in-out infinite`
- Border radius : identique au composant qu'ils remplacent

**Skeletons a implementer :**

| Composant | Skeleton |
|-----------|----------|
| Reservation Card | Rectangle titre (60% largeur, 16px haut) + 2 lignes texte (80%, 40%, 12px haut) + rectangle montant (20%, 14px) |
| Property Card | Carre photo (48x48) + rectangles texte |
| Table | En-tete reel (pas de skeleton) + lignes avec rectangles de largeur variable |
| KPI Card | Rectangle label (40%, 12px) + rectangle valeur (30%, 30px) + rectangle variation (25%, 12px) |
| Calendrier | Grille avec en-tete reel + cellules avec barres rectangulaires |
| Sidebar | Items avec rectangles icone (20x20) + texte (60%, 14px) |

### 13.2 Spinner

- Cercle : `20px` de diametre (sm), `24px` (md), `32px` (lg)
- Bordure : `2px solid neutral-200`
- Arc visible : `2px solid primary-500`
- Animation : rotation `600ms linear infinite`
- Usage : dans les boutons en etat `loading`, au centre des zones de chargement ponctuelles

### 13.3 Loading page entiere

- Fond : `surface-page`
- Centre de l'ecran : spinner `lg` (32px) + texte "Chargement..." en `text-sm font-normal neutral-500`, gap `12px`

---

## 14. Empty States

### 14.1 Structure

Les etats vides apparaissent quand une liste ou une vue n'a aucune donnee a afficher.

- Position : centre de la zone de contenu
- Padding : `48px 24px`
- Alignement : centre

**Composition :**
1. **Illustration** : icone large `48px`, couleur `neutral-300`
2. **Titre** : `text-base font-medium neutral-700`, margin-top `16px`
3. **Description** : `text-sm font-normal neutral-500`, margin-top `8px`, max-width `320px`
4. **Action** (optionnel) : bouton `primary` ou `secondary`, margin-top `20px`

### 14.2 Messages par contexte

| Vue | Icone | Titre | Description | Action |
|-----|-------|-------|-------------|--------|
| Reservations (vide) | Calendrier | "Aucune reservation" | "Aucune reservation pour cette periode." | "Ajouter une reservation" |
| Reservations (filtre vide) | Recherche | "Aucun resultat" | "Aucun resultat pour ces filtres." | "Reinitialiser les filtres" |
| Proprietes (vide) | Maison | "Aucun bien" | "Ajoute ton premier bien pour commencer." | "Ajouter un bien" |
| Calendrier (vide) | Calendrier | "Aucun evenement" | "Aucune reservation sur cette periode." | Aucune |
| Taches menage (vide) | Soleil | "Rien de prevu" | "Rien de prevu aujourd'hui." | Aucune |
| Utilisateurs (vide) | Personnes | "Aucun utilisateur" | "Invite du personnel pour commencer." | "Inviter un utilisateur" |

---

## 15. Avatars

### 15.1 Structure

- Forme : cercle (`border-radius: 9999px`)
- Tailles : `24px` (xs), `32px` (sm), `40px` (md), `48px` (lg)
- Avec photo : image `object-fit: cover`
- Sans photo (fallback) : initiales en `text-xs font-semibold` (pour xs/sm), `text-sm font-semibold` (pour md/lg), texte blanc, fond `primary-500`
- Bordure : `2px solid surface-card` (quand empiles)

### 15.2 Avatar groupe

Pour afficher plusieurs personnes (ex: utilisateurs assignes) :
- Empiles avec chevauchement de `8px`
- Maximum affiche : 3 + badge compteur "+N"
- Badge compteur : style Badge compteur (voir section 6.5)

---

## 16. Icones

### 16.1 Bibliotheque

Utiliser **Lucide Icons** (coherente avec l'ecosysteme React/Next.js).

### 16.2 Tailles

| Contexte | Taille |
|----------|--------|
| Navigation sidebar | `20px` |
| Bouton inline | `16px` (sm), `18px` (md), `20px` (lg) |
| Empty state | `48px` |
| Toast / Dialog | `24px` |
| Indicateur table | `16px` |

### 16.3 Couleurs

Les icones heritent la couleur du texte adjacent sauf :
- Icones de statut : couleur semantique correspondante (`success-500`, `warning-500`, `error-500`, `info-500`)
- Icones de plateforme : couleur plateforme correspondante
- Icones inactives / desactivees : `neutral-300`

---

## 17. Focus et interaction clavier

### 17.1 Focus visible

Tous les elements interactifs doivent afficher un indicateur de focus visible au clavier :
- Anneau : `0 0 0 2px surface-card, 0 0 0 4px primary-500`
- Le double anneau (blanc + couleur) assure la visibilite sur fond clair et fonce
- Applique uniquement en navigation clavier (`:focus-visible`), pas au clic

### 17.2 Ordre de tabulation

- Logique de lecture : gauche a droite, haut en bas
- Sidebar : tabulable, mais accessible via raccourci clavier ou skip link
- Modale ouverte : focus piege dans la modale (focus trap)
- Elements desactives : retires de l'ordre de tabulation (`tabindex="-1"`)

---

*Document genere le 2026-02-11 — A03-Art Direction / UI Kit*
