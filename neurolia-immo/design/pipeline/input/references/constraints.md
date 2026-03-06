# Contraintes — Dashboard Loc Immo

> A03-Art Direction | Accessibilite, performance, animations, anti-patterns
> Sources : `02-brand/colors.md`, `02-brand/typography.md`, `01-brief/prd.md`

---

## 1. Accessibilite

### 1.1 Standard vise

**WCAG 2.1 niveau AA** — c'est le standard minimum pour toute l'application.

### 1.2 Contraste

| Contexte | Ratio minimum | Verification |
|----------|---------------|--------------|
| Texte courant (< 18px ou < 14px bold) | **4.5:1** | `neutral-700` sur `surface-page` : conforme |
| Texte large (>= 18px ou >= 14px bold) | **3:1** | `neutral-600` sur `surface-card` : conforme |
| Elements d'interface (bordures, icones) | **3:1** | `neutral-300` sur `surface-card` : a verifier |
| Texte sur badge colore | **4.5:1** | Tokens `-700` sur fond `-100` : concu pour conformite |
| Texte placeholder | **Non requis par WCAG** | Mais utiliser au minimum `neutral-400` pour lisibilite |

**Regle critique** : ne jamais utiliser de texte en `neutral-400` ou plus clair pour du contenu informatif. Le `neutral-400` est reserve aux placeholders et texte decoratif.

### 1.3 Zones tactiles

| Regle | Valeur |
|-------|--------|
| Taille minimum zone tactile | **44x44px** |
| Espacement minimum entre zones tactiles | **8px** |
| Boutons sur mobile | Taille `lg` (44px de hauteur) obligatoire |
| Items de liste cliquables | Padding suffisant pour atteindre 44px de hauteur |
| Bottom nav items | Zone de 64px de hauteur — conforme |
| Checkbox / Radio | Zone visuelle 18px, zone tactile etendue a 44px via padding invisible |
| Icone buttons | Taille minimum `sm` = 32x32px (desktop uniquement), `lg` = 44x44px sur mobile |

### 1.4 Focus visible

Tous les elements interactifs doivent avoir un indicateur de focus visible lorsqu'ils sont atteints par navigation clavier.

**Style de focus :**
```css
outline: none;
box-shadow: 0 0 0 2px oklch(0.998 0.000 0), 0 0 0 4px oklch(0.580 0.115 250);
```

- Double anneau : blanc interieur (`surface-card`) + `primary-500` exterieur
- Visible sur fond clair et sur fond colore
- Applique uniquement sur `:focus-visible` (pas sur `:focus` pour eviter l'anneau au clic)
- Jamais desactive (`outline: none` seul est interdit sans alternative)

### 1.5 Navigation clavier

| Exigence | Implementation |
|----------|----------------|
| Tous les elements interactifs sont tabulables | `tabindex="0"` implicite (elements natifs) ou explicite |
| Ordre de tabulation logique | Suit l'ordre du DOM, de gauche a droite, de haut en bas |
| Skip link | Lien "Aller au contenu" en premiere position, visible au focus |
| Modale : focus trap | Quand une modale est ouverte, Tab/Shift+Tab reste dans la modale |
| Modale : fermeture Escape | Touche Escape ferme la modale |
| Dropdown : fermeture Escape | Touche Escape ferme le dropdown |
| Dropdown : navigation fleches | Fleches haut/bas naviguent entre les items |

### 1.6 Semantique HTML

| Element UI | Balise HTML |
|------------|-------------|
| Bouton | `<button>` (jamais `<div onclick>`) |
| Lien de navigation | `<a href>` ou `<Link>` (Next.js) |
| Liste de cards | `<ul>` + `<li>` |
| Table | `<table>` + `<thead>` + `<tbody>` + `<th scope>` |
| Formulaire | `<form>` + `<label for>` + `<input>` |
| Modale | `role="dialog"` + `aria-modal="true"` + `aria-labelledby` |
| Toast | `role="status"` + `aria-live="polite"` |
| Alerte urgente | `role="alert"` + `aria-live="assertive"` |
| Navigation | `<nav aria-label>` |
| Section de page | `<main>`, `<aside>`, `<header>`, `<footer>` |

### 1.7 Labels et ARIA

- Chaque input a un `<label>` associe (via `htmlFor` / `id`)
- Les icone-buttons sans texte ont un `aria-label` descriptif
- Les badges de statut ont un `aria-label` (ex: `aria-label="Statut : confirmee"`)
- Les dots de plateforme ont un `aria-label` (ex: `aria-label="Source : Airbnb"`)
- Les images et avatars ont un `alt` descriptif (ou `alt=""` si purement decoratif)

### 1.8 Mouvement reduit

Respecter la preference utilisateur `prefers-reduced-motion` :
- Si activee : toutes les animations de transition sont supprimees (`transition: none`)
- Les spinners de chargement restent animes (essentiels a la comprehension)
- Les animations de skeleton passent d'une animation pulse a un fond statique `neutral-150`

---

## 2. Performance

### 2.1 Loading states obligatoires

**Regle** : chaque vue qui charge des donnees depuis Supabase doit afficher un skeleton pendant le chargement. Aucune vue ne doit rester vide ou afficher un spinner seul au centre de la page (sauf le chargement initial de l'application).

| Vue | Loading state |
|-----|---------------|
| Liste reservations | Skeleton table (en-tete reel + lignes skeleton) |
| Detail reservation | Skeleton des champs (rectangles) |
| Calendrier mois | Grille avec en-tete reel + cellules avec barres skeleton |
| Calendrier liste (mobile) | Skeleton Reservation Cards |
| Liste proprietes | Skeleton Property Cards |
| Detail propriete | Skeleton des champs |
| KPIs | Skeleton KPI Cards (4 cartes avec rectangles) |
| Taches menage (staff) | Skeleton Cleaning Task Cards |
| Formulaire de chargement | Skeleton des champs + bouton desactive |

### 2.2 Pagination

| Regle | Valeur |
|-------|--------|
| Limite par defaut (reservations) | 20 items par page |
| Limite par defaut (proprietes) | 20 items par page |
| Limite par defaut (taches menage) | 10 items (vue jour), 30 items (vue semaine) |
| Chargement suivant | Boutons de pagination (pas de scroll infini en MVP) |
| Indicateur de comptage | "1-20 sur 47 reservations" en bas de table/liste |

### 2.3 Images

| Regle | Implementation |
|-------|----------------|
| Format | WebP en priorite, JPEG en fallback |
| Taille max upload | 2 MB par image |
| Dimensions max stockees | 1200px de large (redimensionnement cote serveur/Supabase Storage) |
| Miniatures | 200x200px pour les listes, 400x300px pour les details |
| Lazy loading | `loading="lazy"` sur toutes les images sous le fold |
| Placeholder | Fond `neutral-200` avec icone image `neutral-300` pendant le chargement |
| CDN | Supabase Storage avec transformation d'image |

### 2.4 Polices

| Regle | Implementation |
|-------|----------------|
| Inter | Variable font via `next/font/google`, `display: swap` |
| JetBrains Mono | Variable font via `next/font/google`, `display: swap` |
| Preload | Les deux polices sont preload dans le `<head>` |
| Subset | `latin` uniquement (couvre le francais) |

### 2.5 Bundle et rendu

| Regle | Valeur |
|-------|--------|
| First Contentful Paint (FCP) | < 1.5s |
| Largest Contentful Paint (LCP) | < 2.5s |
| Cumulative Layout Shift (CLS) | < 0.1 |
| First Input Delay (FID) | < 100ms |
| Lighthouse Performance | > 90 |

### 2.6 Donnees temps reel

- Les mises a jour Supabase Realtime ne doivent pas provoquer de re-render complet de la page
- Utiliser des mises a jour granulaires (mise a jour d'une ligne de table, ajout d'une card)
- Animation subtile pour signaler une mise a jour : flash de fond `primary-50` pendant `500ms` sur l'element modifie

---

## 3. Densite d'information

### 3.1 Tables

| Regle | Valeur |
|-------|--------|
| Colonnes max visibles (desktop) | **8** colonnes (au-dela, masquer les moins critiques) |
| Colonnes max visibles (tablette) | **5** colonnes |
| Colonnes max visibles (mobile) | Pas de table — transformation en cards |
| Largeur minimum de colonne | `80px` (evite l'ecrasement du texte) |
| Colonne actions | Largeur fixe `48px` (1 icone) ou `96px` (2 icones) |

### 3.2 Troncature du texte

| Contexte | Regle | Indicateur |
|----------|-------|------------|
| Nom de bien dans table | Tronquer a 1 ligne, `text-overflow: ellipsis` | Tooltip au hover avec nom complet |
| Nom de voyageur dans table | Tronquer a 1 ligne | Tooltip |
| Notes dans table | Tronquer a 1 ligne | Tooltip ou detail accessible au clic |
| Barre calendrier | Tronquer a 1 ligne, `text-overflow: ellipsis` | Tooltip au hover |
| Titre de card | Pas de troncature (max 2 lignes, `line-clamp: 2`) | Detail accessible |
| Adresse dans card | Tronquer a 1 ligne | Tooltip |

**Regle CSS de troncature :**
```css
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

### 3.3 Calendrier

| Regle | Valeur |
|-------|--------|
| Barres max par cellule (desktop) | 3 visibles + "+N autres" |
| Barres max par cellule (tablette) | 2 visibles + "+N autres" |
| Hauteur min cellule (desktop) | 100px |
| Hauteur min cellule (tablette) | 80px |
| Mobile | Vue liste — pas de limite visible |

### 3.4 KPI Cards

| Regle | Valeur |
|-------|--------|
| Max KPIs affiches simultanement | 4 (en grille) |
| Chiffre max sans abbreviation | 99 999 (au-dela : "100K", "1.2M") |
| Variation max sans contexte | Toujours accompagnee de la periode de comparaison |

---

## 4. Animations et transitions

### 4.1 Principes

- **Subtilite** : les animations sont fonctionnelles, jamais decoratives
- **Rapidite** : durees courtes pour ne pas ralentir l'utilisateur
- **Coherence** : les memes types d'animations utilisent les memes durees et courbes

### 4.2 Durees

| Type d'animation | Duree | Courbe |
|------------------|-------|--------|
| Hover (boutons, cards, lignes) | `150ms` | `ease-out` |
| Apparition d'element (toast, dropdown, tooltip) | `200ms` | `ease-out` |
| Modale (entree/sortie) | `200ms` | `ease-out` |
| Sidebar mobile (ouverture/fermeture) | `200ms` | `ease-out` |
| Changement de page / transition de contenu | `150ms` | `ease-out` |
| Skeleton pulse | `1500ms` | `ease-in-out`, en boucle |
| Spinner rotation | `600ms` | `linear`, en boucle |

### 4.3 Animations autorisees

| Animation | Usage | Detail |
|-----------|-------|--------|
| Fade in/out | Apparition d'overlay, tooltip, toast | `opacity: 0 → 1` |
| Scale | Apparition de modale | `scale(0.95) → scale(1)` + fade |
| Slide | Ouverture sidebar mobile, toast mobile | `translateX(-100%) → translateX(0)` ou `translateY(100%) → translateY(0)` |
| Pulse | Skeleton loading | Opacite oscillante |
| Rotation | Spinner | Rotation continue |
| Flash | Mise a jour temps reel | Fond `primary-50` pendant 500ms, fade-out |
| Pulse dot | Statut actif (checked_in) | Scale oscillant `1 → 1.3 → 1`, opacite oscillante |

### 4.4 Animations interdites

| Animation | Raison |
|-----------|--------|
| Bounce / Spring | Trop ludique pour un outil de travail |
| Parallax | Non pertinent pour un dashboard |
| Confettis / Particules | Viole le ton neutre de l'application |
| Scroll-triggered animations | Non pertinent — le contenu est des donnees |
| Background animations | Distraction inutile |
| Transitions de page avec slide | Trop lent pour une navigation frequente |
| Animations de plus de 300ms | Trop lentes — l'utilisateur percoit un delai |

### 4.5 Support reduce-motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Exceptions (animations maintenues meme en reduce-motion) :
- Spinner de chargement (essentiel a l'information)
- Changement de couleur de focus (instantane, pas d'animation)

---

## 5. Mode sombre

### 5.1 Statut

**Explicitement hors scope pour le MVP.** Le mode sombre ne sera pas implemente en Phase 1.

### 5.2 Preparation

La palette de couleurs et les tokens ont ete structures pour faciliter l'ajout futur :

- Tous les tokens de surface (`surface-page`, `surface-card`, `surface-elevated`, `surface-sunken`) sont des variables — il suffira de les remapper
- Les tokens semantiques (`success-*`, `error-*`, etc.) sont independants des fonds — ils fonctionneront en mode sombre avec des fonds inverses
- Les couleurs OKLCH facilitent la generation de variantes sombres (meme teinte, luminosite ajustee)

### 5.3 Recommandation pour le futur

Quand le mode sombre sera implemente :
- Utiliser des variables CSS (custom properties) pour tous les tokens
- Switcher les valeurs via `prefers-color-scheme: dark` ou un toggle utilisateur
- Inverser les echelles neutres : `neutral-50` desktop clair = `neutral-900` desktop sombre
- Les couleurs semantiques et plateformes restent les memes mais les fonds `*-100` sont remplaces par des fonds `*-900` avec opacite reduite

---

## 6. Border radius

### 6.1 Echelle

| Token | Valeur | Usage |
|-------|--------|-------|
| `radius-none` | `0px` | Aucun arrondi (edges de page) |
| `radius-sm` | `4px` | Inputs, badges, barres de calendrier, items de dropdown |
| `radius-md` | `6px` | Cards, boutons, tables (conteneur), sidebar items, tooltips |
| `radius-lg` | `8px` | Modales, bottom sheets |
| `radius-xl` | `12px` | Bottom sheet (coins superieurs sur mobile) |
| `radius-full` | `9999px` | Pills, avatars, dots de statut, badge compteur, switch |

### 6.2 Regles d'application

- **Cards** : toujours `6px` — pas d'exceptions
- **Inputs et badges** : toujours `4px`
- **Boutons** : `6px` (rectangulaires), `9999px` (pills — usage rare)
- **Avatars** : toujours `9999px` (cercles)
- **Images dans cards** : `6px` si standalone, `0px` en haut d'une card (image edge-to-edge avec border-radius du conteneur via `overflow: hidden`)
- **Modales** : `8px` sur desktop, `12px` (top uniquement) en mode bottom sheet mobile

---

## 7. Bordures et separateurs

### 7.1 Bordure standard

- Epaisseur : `1px`
- Couleur : `neutral-200` `oklch(0.900 0.005 260)`
- Style : `solid`

### 7.2 Usages

| Element | Bordure |
|---------|---------|
| Card | `1px solid neutral-200` sur les 4 cotes |
| Table (conteneur) | `1px solid neutral-200` sur les 4 cotes |
| Table (lignes) | `border-bottom: 1px solid neutral-200` (sauf derniere ligne) |
| Sidebar | `border-right: 1px solid neutral-200` |
| Header | `border-bottom: 1px solid neutral-200` |
| Bottom nav | `border-top: 1px solid neutral-200` |
| Separateur de section (sidebar) | `border-top: 1px solid neutral-200`, margin `12px 0` |
| Input (default) | `1px solid neutral-200` |
| Input (hover) | `1px solid neutral-300` |
| Input (focus) | `1px solid primary-500` |
| Input (error) | `1px solid error-500` |

### 7.3 Separateurs internes

- Utiliser `<hr>` ou `border-top/bottom` — jamais de `<div>` avec une hauteur de 1px et un fond colore
- Couleur : toujours `neutral-200`
- Pas de separateurs en pointilles ou doubles

---

## 8. Ombres

### 8.1 Echelle

| Token | Valeur | Usage |
|-------|--------|-------|
| `shadow-sm` | `0 1px 2px oklch(0 0 0 / 0.04)` | Boutons (optionnel), inputs focus |
| `shadow-md` | `0 1px 3px oklch(0 0 0 / 0.04), 0 1px 2px oklch(0 0 0 / 0.06)` | Cards |
| `shadow-lg` | `0 4px 12px oklch(0 0 0 / 0.08), 0 2px 4px oklch(0 0 0 / 0.04)` | Dropdowns, modales, tooltips |
| `shadow-xl` | `0 8px 24px oklch(0 0 0 / 0.12), 0 4px 8px oklch(0 0 0 / 0.06)` | Reserve pour cas extremes |

### 8.2 Regles

- Les cards ont une ombre `shadow-md` **uniquement si** elles n'ont pas de bordure visible. Si elles ont une bordure `neutral-200`, l'ombre est optionnelle.
- Les dropdowns et modales ont toujours une ombre `shadow-lg`
- Pas d'ombres internes (`inset`) — sauf pour les inputs en focus (anneau de focus)
- Pas d'ombres colorees — toujours noir avec opacite

---

## 9. Anti-patterns

### 9.1 CSS et styling

| Interdit | Raison | Alternative |
|----------|--------|-------------|
| CSS-in-JS (`styled-components`, `emotion`) | Incompatible avec le stack Tailwind, performance | Tailwind CSS 4 utilities |
| `transition: all` | Transite des proprietes inattendues (layout shift), mauvaise performance | Transiter des proprietes explicites : `transition: background-color 150ms, border-color 150ms` |
| `!important` (sauf reduce-motion) | Specificite impossible a gerer | Utiliser des classes Tailwind plus specifiques ou reorganiser |
| Gradients decoratifs sur fond | Viole le ton sobre de l'application | Fonds unis avec tokens |
| `box-shadow` colore | Effet visuel non maitrise | Ombres noires avec opacite |
| `opacity` sur du texte pour creer des niveaux de gris | Opacite compose avec le fond | Utiliser les tokens `neutral-*` |
| `z-index` arbitraires (999, 9999) | Impossibles a debugger | Utiliser l'echelle definie (10, 30, 40, 50, 60, 70, 80, 90) |
| Tailles en `px` fixes pour le texte | Non responsif, non accessible | Utiliser les tokens `text-*` en `rem` |
| `line-height` sans unite | Incohérent selon les navigateurs | Utiliser les valeurs `1.25` a `1.5` definies |
| Couleurs hardcodees (hex, rgb) | Contourne le systeme de tokens | Utiliser les tokens OKLCH definis dans `02-brand/colors.md` |
| `display: none` pour cacher du contenu accessible | Le contenu disparait pour les lecteurs d'ecran | `sr-only` (visuellement cache, accessible) ou `aria-hidden="true"` |

### 9.2 Structure et patterns

| Interdit | Raison | Alternative |
|----------|--------|-------------|
| Scroll infini en MVP | Complexite d'implementation, pas de position stable | Pagination classique avec compteur |
| Carousel/Slider | Mauvaise UX sur mobile pour des donnees | Liste scrollable ou pagination |
| Modales imbriquees | UX confuse, focus trap problematique | Remplacer par navigation ou etapes dans une seule modale |
| Auto-play (animations, defilement) | Distraction, accessibilite | Interaction explicite de l'utilisateur |
| Layout avec position: absolute sur des elements de contenu | Layout fragile, non responsif | CSS Grid ou Flexbox |
| Scroll lateral sur la page | Erreur d'UX, contenu masque | Adapter le contenu a la largeur (responsive, transformation table -> cards) |
| Texte sur image sans overlay | Contraste non garanti | Texte a cote de l'image, ou overlay semi-transparent |
| Plus de 2 niveaux d'imbrication de cards | Hierarchie visuelle illisible | Aplatir la structure, utiliser des separateurs |

### 9.3 Interactions

| Interdit | Raison | Alternative |
|----------|--------|-------------|
| Double-clic pour une action | Non standard, non decouvrable | Simple clic |
| Drag & drop en MVP | Complexite, mauvais sur mobile | Boutons de reordonnancement ou menus |
| Swipe obligatoire sans alternative | Non decouvrable, pas accessible | Boutons visibles + swipe optionnel |
| Formulaire sans feedback d'erreur inline | L'utilisateur ne sait pas quoi corriger | Erreurs affichees sous chaque champ invalide |
| Suppression sans confirmation | Action irreversible trop rapide | Dialog de confirmation (voir ui-kit.md section 10.2) |
| Toast comme seul feedback d'erreur | Disparait avant d'etre lu | Erreur inline + toast optionnel |

---

## 10. Icones

### 10.1 Bibliotheque

**Lucide Icons** — bibliotheque coherente, legere, open-source, compatible React.

### 10.2 Regles

| Regle | Valeur |
|-------|--------|
| Style | Outline (`stroke-width: 2`) — jamais solid/filled |
| Taille par defaut | `20px` (match la taille du texte dans les boutons et la navigation) |
| Couleur | Herite du texte parent (`currentColor`) |
| Alignement | Centre vertical avec le texte (`vertical-align: middle` ou flexbox) |
| Icone seule (sans label) | `aria-label` obligatoire |
| Icone decorative (avec label visible) | `aria-hidden="true"` |

### 10.3 Icones personnalisees interdites

Pas d'icones SVG custom en Phase 1. Toutes les icones proviennent de Lucide. Si un besoin specifique n'est pas couvert par Lucide, utiliser le texte comme fallback.

---

## 11. Resume des contraintes critiques

| Contrainte | Valeur |
|------------|--------|
| Standard accessibilite | WCAG 2.1 AA |
| Contraste texte courant | 4.5:1 minimum |
| Zone tactile minimum | 44x44px |
| Focus visible | Obligatoire sur tous les elements interactifs |
| Skeleton loading | Obligatoire pour chaque vue avec donnees |
| Duree max animation | 300ms (sauf boucles : skeleton, spinner) |
| `prefers-reduced-motion` | Obligatoire |
| Mode sombre | Hors scope MVP (tokens prets) |
| Border radius cards | 6px |
| Border radius inputs/badges | 4px |
| Border radius pills/avatars | 9999px |
| Pagination par defaut | 20 items |
| Taille min texte | 12px (`text-xs`) |
| Icones | Lucide Icons, outline, 20px par defaut |
| CSS | Tailwind CSS 4 uniquement, pas de CSS-in-JS |
| `transition: all` | Interdit |
| Gradients decoratifs | Interdit |
| Couleurs hardcodees | Interdit — tokens OKLCH uniquement |
| Scroll infini | Interdit en MVP |

---

*Document genere le 2026-02-11 — A03-Art Direction / Constraints*
