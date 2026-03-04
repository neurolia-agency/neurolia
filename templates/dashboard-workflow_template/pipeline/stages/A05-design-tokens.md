# A05 — Design Tokens : globals.css

## Objectif

Transformer les elements visuels extraits (A02) en tokens CSS concrets dans `app/globals.css`, prets pour l'implementation.

## Agent

**`architecture-planner`** (sonnet)

## Skill

`dashboard-design-tokens`

## Inputs

- `pipeline/output/02-design-system/palette.md` — systeme de couleurs
- `pipeline/output/02-design-system/typography.md` — typographie et echelle
- `pipeline/output/02-design-system/components.md` — spacing, radius, shadows, dimensions
- `pipeline/output/02-design-system/constraints.md` — regles de simplification dashboard

## Processus

### 1. Structure du globals.css

```css
/* ============================================
   [NOM_PROJET] — Design Tokens
   Source unique pour tous les tokens visuels
   ============================================ */

@import "tailwindcss";

/* ---- Fonts ---- */
@font-face { /* ... */ }

/* ---- Theme Tailwind ---- */
@theme inline {
  /* Colors - Primary */
  --color-primary-50: oklch(...);
  --color-primary-100: oklch(...);
  /* ... 50 → 900 */

  /* Colors - Neutral */
  --color-neutral-50: oklch(...);
  /* ... 50 → 950 */

  /* Colors - Semantic */
  --color-success: oklch(...);
  --color-error: oklch(...);
  --color-warning: oklch(...);
  --color-info: oklch(...);

  /* Typography */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Font sizes */
  --text-display: clamp(2rem, 4vw, 3rem);
  --text-h1: clamp(1.5rem, 3vw, 2.25rem);
  /* ... */

  /* Spacing */
  --spacing-page: 24px;
  --spacing-section: 32px;
  --spacing-card: 16px;

  /* Radius */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-card: 0 1px 3px oklch(0 0 0 / 0.08);
  --shadow-elevated: 0 4px 12px oklch(0 0 0 / 0.12);
  --shadow-modal: 0 16px 48px oklch(0 0 0 / 0.2);

  /* Transitions */
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 350ms;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}

/* ---- Base styles ---- */
:root {
  /* Surfaces */
  --bg-base: var(--color-neutral-50);
  --bg-surface: white;
  --bg-elevated: white;

  /* Text */
  --text-primary: var(--color-neutral-900);
  --text-secondary: var(--color-neutral-600);
  --text-muted: var(--color-neutral-400);

  /* Borders */
  --border-default: var(--color-neutral-200);
  --border-hover: var(--color-neutral-300);

  /* Sidebar */
  --sidebar-width: 260px;
  --sidebar-collapsed: 64px;

  /* Header */
  --header-height: 56px;

  /* Touch */
  --touch-target: 44px;
}

/* ---- Dark mode ---- */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-base: var(--color-neutral-950);
    --bg-surface: var(--color-neutral-900);
    --bg-elevated: var(--color-neutral-800);
    --text-primary: var(--color-neutral-50);
    --text-secondary: var(--color-neutral-400);
    --text-muted: var(--color-neutral-600);
    --border-default: var(--color-neutral-800);
    --border-hover: var(--color-neutral-700);
  }
}

/* ---- Animations ---- */
@keyframes skeleton-pulse { /* ... */ }
@keyframes spinner { /* ... */ }
@keyframes toast-enter { /* ... */ }
@keyframes modal-enter { /* ... */ }
```

### 2. Regles

- **OKLCH obligatoire** pour toutes les couleurs (avec commentaire HEX pour reference)
- **Tailwind @theme inline** pour rendre les tokens accessibles via les classes utilitaires
- **Semantic tokens** (`--bg-surface`, `--text-primary`) au-dessus des raw tokens (`--color-neutral-50`)
- **Dark mode** avec media query (pas de classe `.dark`)
- **Responsive** : utiliser `clamp()` pour la typographie
- **Safe area** : `env(safe-area-inset-*)` pour les apps mobile (si PWA/Capacitor)
- **Touch targets** : minimum 44px

### 3. Validation Coherence

Verifier la coherence entre les tokens et les fichiers source :
- Couleurs → `02-design-system/palette.md`
- Typographie → `02-design-system/typography.md`
- Spacing, radius, shadows, dimensions → `02-design-system/components.md`
- Contraintes → `02-design-system/constraints.md`

## Output

- `app/globals.css` modifie/cree avec tous les tokens

## Verification Placeholders

Le `globals.css` est un fichier CSS executable — tout placeholder non remplace causera un bug a l'execution.

### globals.css (zero tolerance)
- [ ] Aucun `[OKLCH_*]` restant (couleurs primaire, semantiques, neutres, dark mode)
- [ ] Aucun `[HUE]` restant (gamme de gris)
- [ ] `[FONT_UI]`, `[FONT_MONO]`, `[FONT_UI_NAME]`, `[FONT_MONO_NAME]` remplaces
- [ ] `[SIDEBAR_WIDTH]`, `[SIDEBAR_COLLAPSED]`, `[HEADER_HEIGHT]`, `[HEADER_HEIGHT_MOBILE]` remplaces
- [ ] `[NOM_PROJET]` remplace dans le commentaire d'en-tete

### CLAUDE.md — section ADN Visuel
- [ ] `[A definir]` remplace par les valeurs extraites en A02
- [ ] `[Critere N]` remplace dans le test rapide "Est-ce [NOM_PROJET] ?"

## Validation

- [ ] Toutes les couleurs en format OKLCH
- [ ] Semantic tokens definis (bg, text, border)
- [ ] Tailwind @theme inline avec tous les tokens
- [ ] Dark mode gere
- [ ] Typographie responsive avec clamp()
- [ ] Spacing, radius, shadows definis
- [ ] Sidebar et header dimensions
- [ ] Touch target 44px minimum
- [ ] Animations de base (skeleton, spinner, toast, modal)
- [ ] Coherence avec `02-design-system/palette.md` et `02-design-system/components.md`
- [ ] Commentaires structurants (sections clairement separees)
