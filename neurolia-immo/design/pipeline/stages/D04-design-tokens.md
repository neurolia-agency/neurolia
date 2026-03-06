# Etape D04 : Design Tokens

> **Phase D-A : Design** - Derniere etape avant le code.

## Objectif

Generer le fichier de tokens de design dans le format adapte a la stack technique du projet. Ce fichier est la **source unique** des valeurs visuelles pour la Phase D-B.

**IMPORTANT** : Le format de sortie depend de `tech-stack.md` (importe du template architecture).

## Input

- `pipeline/output/01-brand/colors.md`
- `pipeline/output/01-brand/typography.md`
- `pipeline/output/02-art-direction/visual-vocabulary.md`
- `pipeline/output/02-art-direction/constraints.md`
- `pipeline/output/03-wireframes/` (pour valider la couverture)
- `pipeline/input/imports/tech-stack.md`

## Output

Le fichier de sortie depend de la stack :

| Stack | Fichier | Format |
|-------|---------|--------|
| **PWA (Next.js)** | `pipeline/output/04-design-tokens/globals.css` | CSS Custom Properties + @theme |
| **React Native (Expo)** | `pipeline/output/04-design-tokens/theme.ts` | TypeScript object |
| **Flutter** | `pipeline/output/04-design-tokens/theme.dart` | Dart ThemeData |

## Instructions

### 1. Lire les fichiers sources

Extraire les valeurs concretes de :
- `visual-vocabulary.md` → Espacements, transitions, formes, ombres
- `colors.md` → Palette en OKLCH + semantiques
- `typography.md` → Echelle mobile et font
- `constraints.md` → Radius, touch targets, safe areas

### 2. Generer les tokens

#### Option A : PWA (Next.js + Tailwind CSS 4)

```css
@import "tailwindcss";

/* ============================================
   DESIGN TOKENS - [NOM_APP]
   Source: output/01-brand/, output/02-art-direction/
   ============================================ */

:root {
  /* ---------- Radius ---------- */
  --radius: 12px;
  --radius-card: 16px;
  --radius-button: 8px;
  --radius-input: 8px;
  --radius-chip: 999px;

  /* ---------- Couleurs ---------- */
  --primary: oklch([L] [C] [H]);
  --primary-foreground: oklch([L] [C] [H]);
  --primary-pressed: oklch([L-0.05] [C] [H]);

  --secondary: oklch([L] [C] [H]);
  --secondary-foreground: oklch([L] [C] [H]);

  --background: oklch([L] [C] [H]);
  --surface: oklch([L] [C] [H]);
  --foreground: oklch([L] [C] [H]);
  --muted: oklch([L] [C] [H]);
  --muted-foreground: oklch([L] [C] [H]);
  --border: oklch([L] [C] [H]);

  --success: oklch(0.696 0.17 162.48);
  --error: oklch(0.627 0.257 29.23);
  --warning: oklch(0.769 0.188 70.08);
  --info: oklch(0.623 0.214 259.15);

  /* ---------- Typographie ---------- */
  --font-sans: '[Font]', system-ui, sans-serif;
  --font-size-display: clamp(1.75rem, 7vw, 2.25rem);
  --font-size-h1: clamp(1.5rem, 6vw, 2rem);
  --font-size-h2: clamp(1.25rem, 5vw, 1.625rem);
  --font-size-h3: clamp(1.125rem, 4.5vw, 1.375rem);
  --font-size-body: 1rem;
  --font-size-small: 0.875rem;
  --font-size-caption: 0.75rem;

  /* ---------- Spacing ---------- */
  --spacing-screen: 16px;
  --spacing-card-gap: 12px;
  --spacing-section: 24px;
  --spacing-compact: 8px;

  /* ---------- Sizing ---------- */
  --header-height: 56px;
  --bottom-tab-height: 56px;
  --touch-target: 44px;
  --safe-area-top: env(safe-area-inset-top);
  --safe-area-bottom: env(safe-area-inset-bottom);

  /* ---------- Shadows ---------- */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.12);
  --shadow-nav: 0 -1px 3px rgba(0,0,0,0.05);

  /* ---------- Transitions ---------- */
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 350ms;
  --easing-default: ease-out;
  --easing-spring: cubic-bezier(0.32, 0.72, 0, 1);
}

/* ---------- Dark Mode (si applicable) ---------- */
.dark {
  --background: oklch([L] [C] [H]);
  --surface: oklch([L] [C] [H]);
  --foreground: oklch([L] [C] [H]);
  --muted: oklch([L] [C] [H]);
  --muted-foreground: oklch([L] [C] [H]);
  --border: oklch([L] [C] [H]);
}

/* ============================================
   THEME INLINE - Mapping vers Tailwind
   ============================================ */
@theme inline {
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-background: var(--background);
  --color-surface: var(--surface);
  --color-foreground: var(--foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-border: var(--border);
  --color-success: var(--success);
  --color-error: var(--error);
  --color-warning: var(--warning);
  --color-info: var(--info);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: var(--radius);
  --radius-lg: var(--radius-card);
  --radius-full: var(--radius-chip);

  --font-sans: var(--font-sans);
}

/* ============================================
   BASE STYLES
   ============================================ */
@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground font-sans antialiased;
    padding-top: var(--safe-area-top);
    padding-bottom: var(--safe-area-bottom);
  }

  h1 { font-size: var(--font-size-h1); font-weight: 700; line-height: 1.15; }
  h2 { font-size: var(--font-size-h2); font-weight: 600; line-height: 1.2; }
  h3 { font-size: var(--font-size-h3); font-weight: 600; line-height: 1.3; }
  p  { font-size: var(--font-size-body); line-height: 1.5; color: var(--muted-foreground); }
}

/* ============================================
   UTILITIES
   ============================================ */
@layer utilities {
  .screen-padding {
    padding-left: var(--spacing-screen);
    padding-right: var(--spacing-screen);
  }

  .safe-bottom {
    padding-bottom: max(var(--safe-area-bottom), 16px);
  }

  .touch-target {
    min-height: var(--touch-target);
    min-width: var(--touch-target);
  }
}
```

#### Option B : React Native (Expo + TypeScript)

```typescript
// theme.ts
export const theme = {
  colors: {
    primary: '#[hex]',
    primaryForeground: '#[hex]',
    secondary: '#[hex]',
    background: '#[hex]',
    surface: '#[hex]',
    foreground: '#[hex]',
    muted: '#[hex]',
    mutedForeground: '#[hex]',
    border: '#[hex]',
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
  },
  spacing: {
    screen: 16,
    cardGap: 12,
    section: 24,
    compact: 8,
  },
  sizing: {
    headerHeight: 56,
    bottomTabHeight: 56,
    touchTarget: 44,
  },
  radius: {
    default: 12,
    card: 16,
    button: 8,
    input: 8,
    chip: 999,
  },
  typography: {
    fontFamily: '[Font]',
    display: { fontSize: 32, fontWeight: '700', lineHeight: 36 },
    h1: { fontSize: 28, fontWeight: '700', lineHeight: 32 },
    h2: { fontSize: 22, fontWeight: '600', lineHeight: 26 },
    h3: { fontSize: 20, fontWeight: '600', lineHeight: 24 },
    body: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
    small: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
    caption: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
    button: { fontSize: 16, fontWeight: '600', lineHeight: 16 },
    tab: { fontSize: 12, fontWeight: '500', lineHeight: 12 },
  },
  shadows: {
    sm: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 3, elevation: 2 },
    md: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 12, elevation: 6 },
  },
  transitions: {
    fast: 150,
    normal: 250,
    slow: 350,
  },
} as const;

export type Theme = typeof theme;
```

#### Option C : Flutter (Dart)

```dart
// theme.dart
import 'package:flutter/material.dart';

final appTheme = ThemeData(
  colorScheme: ColorScheme.fromSeed(
    seedColor: Color(0xFF[hex]),
    primary: Color(0xFF[hex]),
    secondary: Color(0xFF[hex]),
    surface: Color(0xFF[hex]),
    error: Color(0xFFef4444),
  ),
  textTheme: TextTheme(
    displayLarge: TextStyle(fontSize: 32, fontWeight: FontWeight.w700),
    headlineLarge: TextStyle(fontSize: 28, fontWeight: FontWeight.w700),
    headlineMedium: TextStyle(fontSize: 22, fontWeight: FontWeight.w600),
    headlineSmall: TextStyle(fontSize: 20, fontWeight: FontWeight.w600),
    bodyLarge: TextStyle(fontSize: 16, fontWeight: FontWeight.w400),
    bodyMedium: TextStyle(fontSize: 14, fontWeight: FontWeight.w400),
    labelLarge: TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
    labelSmall: TextStyle(fontSize: 12, fontWeight: FontWeight.w500),
  ),
  // Spacing, radius, shadows defined via extension
);
```

## Categories de Tokens

| Categorie | Source | Valeurs |
|-----------|--------|---------|
| Couleurs | colors.md | Primary, secondary, neutrals, semantiques |
| Typographie | typography.md | Font family, echelle, weights |
| Espacements | visual-vocabulary.md | Screen padding, gaps, sections |
| Border radius | visual-vocabulary.md + constraints.md | Cards, boutons, inputs, chips |
| Ombres | visual-vocabulary.md | sm, md, navigation |
| Tailles fixes | constraints.md | Header, bottom tab, touch target |
| Safe areas | constraints.md | Top, bottom (env()) |
| Transitions | visual-vocabulary.md | Durees, easings |

## Validation

- [ ] Format de sortie correspond a la stack (tech-stack.md)
- [ ] Couleurs en OKLCH (PWA) ou HEX (RN/Flutter)
- [ ] 4 couleurs semantiques presentes (success, error, warning, info)
- [ ] Echelle typographique complete (display → tab)
- [ ] Body >= 14px, Input = 16px
- [ ] Touch target = 44px
- [ ] Safe areas definies
- [ ] Ombres definies (sm, md)
- [ ] Transitions definies (fast, normal, slow)
- [ ] Dark mode configure (si applicable)

## Prochaine Etape

Une fois les tokens generes → Passer a `stages/D05-setup.md`

> **Note** : Cette etape cloture la Phase D-A (Design). La Phase D-B (Code) commence avec D05-setup.

---

**Version** : 1.0
**Phase** : D-A (Design - derniere etape)
**Dependances** : D02 (Art Direction), D03 (Wireframes), imports (tech-stack.md)
**Produit pour** : Phase D-B (D05-setup et suivants)
