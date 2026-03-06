# Étape A6 : Design System (Tokens CSS)

> **Phase A : Architecture** - Dernière étape avant le code.

## Objectif

Configurer le système de design dans `app/globals.css` en utilisant la directive `@theme` de Tailwind CSS 4 et le format de couleurs **OKLCH**.

**IMPORTANT** : `app/globals.css` est la source unique des tokens CSS.

## Input

- `output/01-brand/colors.md`
- `output/01-brand/typography.md`
- `output/02-art-direction/visual-vocabulary.md`
- `output/02-art-direction/constraints.md`
- `output/02-art-direction/project-dials.md` (pour les animations/transitions selon MOTION_INTENSITY)
- `output/03.5-wireframes/` (pour valider que les tokens couvrent les besoins)

## Instructions

### 1. Lire les fichiers sources

Extraire les valeurs concrètes de :
- `visual-vocabulary.md` → Espacements, transitions, formes
- `colors.md` → Palette en OKLCH
- `typography.md` → Échelle et font

### 2. Configurer app/globals.css

```css
@import "tailwindcss";
@import "tw-animate-css";

/* Dark mode variant (si applicable) */
@custom-variant dark (&:is(.dark *));

/* ============================================
   DESIGN TOKENS - [NOM_PROJET]
   Source: output/01-brand/, output/01.5-art-direction/
   ============================================ */

:root {
  /* ---------- Radius ---------- */
  --radius: 0.5rem;  /* ou 0 selon constraints.md */

  /* ---------- Couleurs Sémantiques ---------- */
  --background: oklch([L] [C] [H]);
  --foreground: oklch([L] [C] [H]);

  --card: oklch([L] [C] [H]);
  --card-foreground: oklch([L] [C] [H]);

  --popover: oklch([L] [C] [H]);
  --popover-foreground: oklch([L] [C] [H]);

  --primary: oklch([L] [C] [H]);
  --primary-foreground: oklch([L] [C] [H]);

  --secondary: oklch([L] [C] [H]);
  --secondary-foreground: oklch([L] [C] [H]);

  --muted: oklch([L] [C] [H]);
  --muted-foreground: oklch([L] [C] [H]);

  --accent: oklch([L] [C] [H]);
  --accent-foreground: oklch([L] [C] [H]);

  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.985 0 0);

  --border: oklch([L] [C] [H]);
  --input: oklch([L] [C] [H]);
  --ring: oklch([L] [C] [H]);

  /* ---------- Typographie ---------- */
  --font-sans: '[Font]', ui-sans-serif, system-ui, sans-serif;

  /* ---------- Spacing (depuis visual-vocabulary.md — VALEURS CONCRÈTES OBLIGATOIRES) ---------- */
  --spacing-section: Xrem;           /* visual-vocabulary.md > espacements > "whitespace généreux" */
  --spacing-section-mobile: Xrem;    /* visual-vocabulary.md > espacements > "whitespace mobile" */
  --spacing-container: Xrem;         /* visual-vocabulary.md > espacements > "marge latérale" */
  --spacing-gap: Xrem;               /* visual-vocabulary.md > espacements > "gap composant" */
  --spacing-gap-tight: Xrem;         /* visual-vocabulary.md > espacements > "gap serré" */
  --max-width-content: Xpx;          /* visual-vocabulary.md > layout > "conteneur" */
  --max-width-text: Xpx;             /* visual-vocabulary.md > layout > "max-width texte" */

  /* ---------- Transitions (depuis visual-vocabulary.md) ---------- */
  --transition-hover: Xms cubic-bezier(...);     /* visual-vocabulary.md > transitions > "hover subtil" */
  --transition-button: Xms cubic-bezier(...);    /* visual-vocabulary.md > transitions > "hover bouton" */
  --transition-reveal: Xms cubic-bezier(...);    /* visual-vocabulary.md > transitions > "apparition douce" */
  --transition-standard: Xms cubic-bezier(...);  /* visual-vocabulary.md > transitions > "transition standard" */
  --easing-standard: cubic-bezier(...);          /* visual-vocabulary.md > transitions > "easing standard" */

  /* ---------- Ombres (depuis visual-vocabulary.md) ---------- */
  --shadow-subtle: X;      /* visual-vocabulary.md > ombres > "ombre subtle" */
  --shadow-hover: X;       /* visual-vocabulary.md > ombres > "ombre hover" */
  --shadow-elevated: X;    /* visual-vocabulary.md > ombres > "ombre élevée" */
}

/* ⚠️ AUCUN PLACEHOLDER AUTORISÉ — Toutes les valeurs ci-dessus doivent être
   des valeurs concrètes extraites de visual-vocabulary.md et colors.md.
   Si une valeur reste en [X], le token n'est pas prêt. */

/* ---------- Dark Mode (si applicable) ---------- */
.dark {
  --background: oklch([L] [C] [H]);
  --foreground: oklch([L] [C] [H]);
  /* ... autres overrides ... */
}

/* ============================================
   THEME INLINE - Mapping vers Tailwind
   ============================================ */
@theme inline {
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

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

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

  /* Typographie - depuis typography.md */
  h1 {
    @apply text-5xl md:text-7xl font-bold leading-tight tracking-tight;
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
  .container-custom {
    @apply mx-auto max-w-7xl px-6 md:px-8;
  }

  .section-padding {
    @apply py-16 md:py-24;  /* Ajuster selon visual-vocabulary.md */
  }

  .text-balance {
    text-wrap: balance;
  }
}
```

## Conversion HEX → OKLCH

| HEX | OKLCH (approximatif) |
|-----|---------------------|
| #FFFFFF | oklch(1 0 0) |
| #000000 | oklch(0 0 0) |
| #111827 | oklch(0.145 0.02 265) |
| #C45C3B | oklch(0.55 0.15 35) |

Utiliser un convertisseur en ligne ou les DevTools pour les valeurs exactes.

## Output

- `app/globals.css` (source unique - modifié)

## Validation — Token Auditor (OBLIGATOIRE)

**Après avoir configuré globals.css**, lancer le custom subagent `token-auditor` pour un audit de couverture automatisé.

```
Agent(
  subagent_type: "token-auditor",
  model: "haiku",
  prompt: """
    PROJET : [NOM_PROJET] — chemin racine : [CHEMIN_PROJET]
    Audite app/globals.css contre les fichiers de direction artistique
    dans pipeline/output/02-art-direction/ et pipeline/output/01-brand/.
  """
)
```

Le token-auditor vérifie :

- **Couverture** : chaque terme de visual-vocabulary.md a un token CSS correspondant (8 catégories)
- **Qualité** : aucun placeholder `[X]`, aucune couleur hex dans :root, aucune valeur magique
- **Cohérence** : colors.md ↔ globals.css, typography.md ↔ globals.css, constraints.md → tokens
- **UI Kit** : les tokens nécessaires aux composants de ui-kit.md existent
- **Compatibilité frontend-design2** : pas de #000000, pas d'Inter, saturation accent < 80%

**Action selon le verdict :**
- Si **✅ PASS** → Passer à B01 (Phase B commence)
- Si **⚠️ PASS avec réserves** → Corriger les réserves, puis passer à B01
- Si **❌ FAIL** → Compléter globals.css en suivant le rapport, puis relancer l'auditor

### Checklist manuelle complémentaire

- [ ] Dark mode configuré (si applicable)
- [ ] Contraste WCAG AA vérifié manuellement sur les paires critiques signalées par l'auditor
- [ ] `npm run dev` démarre sans erreur CSS

## Prochaine Étape

Une fois `app/globals.css` validé (token-auditor PASS) → Passer à `stages/B01-layout.md`

> **Note** : Cette étape clôture la Phase A (Architecture). La Phase B (Design/Vibe Coding) commence avec B01-layout.

---

**Version** : 2.1
**Phase** : A6 (Architecture - dernière étape)
**Dépendances** : A03 (Art Direction — visual-vocabulary, constraints, project-dials), A05 (Wireframes)
**Agents** : token-auditor (haiku) — audit de couverture tokens
**Produit pour** : Phase B (B01-Layout et suivants — tokens consommés par frontend-design2 via agents)
