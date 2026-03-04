# Étape 02 : Design System

## Objectif

Configurer le système de design dans `app/globals.css` en utilisant la directive `@theme` de Tailwind CSS 4 et le format de couleurs **OKLCH** (perceptuellement uniforme).

**IMPORTANT** : `app/globals.css` est la source unique. `output/02-design-system.css` sert de documentation de référence pour les tokens.

## Input

- `output/01-brand/colors.md`
- `output/01-brand/typography.md`
- `output/01.5-art-direction/visual-vocabulary.md`
- `output/01.5-art-direction/constraints.md`
- `output/03.5-wireframes/` (pour valider que les tokens couvrent les besoins)

## Bonnes Pratiques Tailwind CSS 4 (2025)

### 1. Directive @theme

Tailwind 4 utilise `@theme` pour définir les design tokens. Ces tokens génèrent automatiquement les classes utilitaires.

```css
@theme {
  --color-primary: oklch(0.21 0.034 264.665);
  /* Génère : bg-primary, text-primary, border-primary, etc. */
}
```

### 2. Format OKLCH

OKLCH est le format recommandé pour les couleurs en 2025 :
- Perceptuellement uniforme (transitions de couleurs plus naturelles)
- Meilleur gamut pour les écrans modernes
- Utilisé par shadcn/ui et Tailwind CSS 4

**Conversion depuis Hex** :
- `#1A1A2E` → `oklch(0.18 0.03 280)` (accent bleu profond)
- `#111827` → `oklch(0.145 0.02 265)` (text heading)
- `#FFFFFF` → `oklch(1 0 0)` (blanc)

---

## Instructions

### 1. Lire les fichiers brand

- `output/01-brand/colors.md` pour la palette
- `output/01-brand/typography.md` pour les fonts et échelles

### 2. Configurer app/globals.css

Le fichier doit suivre cette structure :

```css
@import "tailwindcss";
@import "tw-animate-css";

/* Dark mode variant */
@custom-variant dark (&:is(.dark *));

/* ============================================
   DESIGN TOKENS - Neurolia
   Source: output/01-brand/
   ============================================ */

:root {
  /* Radius global */
  --radius: 0.5rem;

  /* ---------- Couleurs Sémantiques ---------- */
  /* Background & Foreground */
  --background: oklch(1 0 0);                    /* Blanc */
  --foreground: oklch(0.145 0.02 265);           /* Noir/gris foncé */

  /* Cards & Popovers */
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0.02 265);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0.02 265);

  /* Primary (accent #1A1A2E) */
  --primary: oklch(0.18 0.03 280);               /* Bleu profond */
  --primary-foreground: oklch(0.98 0 0);         /* Blanc */

  /* Secondary */
  --secondary: oklch(0.97 0.003 265);            /* Gris très clair */
  --secondary-foreground: oklch(0.18 0.03 280);

  /* Muted */
  --muted: oklch(0.97 0.003 265);
  --muted-foreground: oklch(0.55 0.02 265);      /* Gris moyen */

  /* Accent */
  --accent: oklch(0.97 0.003 265);
  --accent-foreground: oklch(0.18 0.03 280);

  /* Destructive */
  --destructive: oklch(0.577 0.245 27.325);      /* Rouge */
  --destructive-foreground: oklch(0.985 0 0);

  /* Border & Input */
  --border: oklch(0.92 0.006 265);
  --input: oklch(0.92 0.006 265);
  --ring: oklch(0.70 0.02 265);

  /* ---------- Typographie ---------- */
  /* Font family depuis typography.md */
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;

  /* ---------- Spacing (référence) ---------- */
  --spacing-section: 6rem;      /* 96px - padding sections */
  --spacing-container: 1.5rem;  /* 24px - padding container mobile */
}

/* ---------- Dark Mode (optionnel) ---------- */
.dark {
  --background: oklch(0.145 0.02 265);
  --foreground: oklch(0.98 0 0);
  --card: oklch(0.18 0.03 280);
  --card-foreground: oklch(0.98 0 0);
  --popover: oklch(0.18 0.03 280);
  --popover-foreground: oklch(0.98 0 0);
  --primary: oklch(0.92 0.006 265);
  --primary-foreground: oklch(0.18 0.03 280);
  --secondary: oklch(0.27 0.03 265);
  --secondary-foreground: oklch(0.98 0 0);
  --muted: oklch(0.27 0.03 265);
  --muted-foreground: oklch(0.70 0.02 265);
  --accent: oklch(0.27 0.03 265);
  --accent-foreground: oklch(0.98 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --destructive-foreground: oklch(0.985 0 0);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.55 0.02 265);
}

/* ============================================
   THEME INLINE - Mapping vers Tailwind
   ============================================ */
@theme inline {
  /* Couleurs */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);

  /* Radius */
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  /* Font */
  --font-sans: var(--font-sans);
}

/* ============================================
   BASE STYLES
   ============================================ */
@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  body {
    @apply bg-background text-foreground font-sans antialiased;
  }

  /* Typographie - échelle depuis typography.md */
  h1 {
    @apply text-5xl md:text-7xl font-bold leading-tight tracking-tight;
    /* 72px desktop, 48px mobile */
  }

  h2 {
    @apply text-3xl md:text-5xl font-bold leading-tight;
  }

  h3 {
    @apply text-2xl md:text-3xl font-semibold leading-snug;
  }

  h4 {
    @apply text-xl md:text-2xl font-semibold;
  }

  p {
    @apply text-base leading-relaxed text-muted-foreground;
  }
}

/* ============================================
   UTILITIES CUSTOM
   ============================================ */
@layer utilities {
  /* Container */
  .container-custom {
    @apply mx-auto max-w-7xl px-6 md:px-8;
  }

  /* Section padding */
  .section-padding {
    @apply py-16 md:py-24;
  }

  /* Text balance pour titres */
  .text-balance {
    text-wrap: balance;
  }
}
```

---

## Output

**Fichier modifié** : `app/globals.css`

**Pas de fichier séparé** `output/02-design-system.css` - tout est dans globals.css.

**Optionnel** : Créer `output/02-design-tokens.md` pour documenter les tokens :

```markdown
# Design Tokens - Neurolia

## Couleurs (OKLCH)

| Token | OKLCH | Usage |
|-------|-------|-------|
| --primary | oklch(0.18 0.03 280) | Accent, CTAs, liens hover |
| --background | oklch(1 0 0) | Fond pages |
| --foreground | oklch(0.145 0.02 265) | Texte principal |
| --muted-foreground | oklch(0.55 0.02 265) | Texte secondaire |
| --border | oklch(0.92 0.006 265) | Bordures |

## Typographie

| Élément | Desktop | Mobile | Weight |
|---------|---------|--------|--------|
| H1 | 72px (text-7xl) | 48px (text-5xl) | Bold |
| H2 | 48px (text-5xl) | 30px (text-3xl) | Bold |
| H3 | 30px (text-3xl) | 24px (text-2xl) | Semibold |
| Body | 16px (text-base) | 16px | Normal |

## Spacing

| Token | Valeur | Usage |
|-------|--------|-------|
| section-padding | py-16 md:py-24 | Padding vertical sections |
| container-custom | max-w-7xl px-6 | Container principal |
```

---

## Validation

- [ ] `@theme inline` configuré avec tous les tokens
- [ ] Couleurs en format **OKLCH**
- [ ] Variables CSS sémantiques (--primary, --background, etc.)
- [ ] Mapping vers classes Tailwind fonctionnel
- [ ] Échelle typographique responsive
- [ ] Dark mode optionnel configuré
- [ ] Pas de fichier CSS séparé (tout dans globals.css)

## Prochaine Étape

Une fois `app/globals.css` configuré → Passer à `stages/04-layout.md`

> **Note** : Cette étape (A6) clôture la Phase Architecture. La Phase Design/Vibe Coding commence avec 04-layout.

---

**Version** : 1.1
**Phase** : A6 (Architecture - dernière étape)
**Dépendances** : A3 (01.5-Art Direction), A5 (03.5-Wireframes)
**Produit pour** : Phase B (04-layout et suivants)
