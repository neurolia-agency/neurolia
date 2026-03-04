# Skill : dashboard-design-tokens

Génère le fichier `globals.css` complet avec tous les design tokens nécessaires pour un dashboard Next.js avec Tailwind 4 et shadcn/ui.

---

## 1. Procédure de génération

1. Lire `pipeline/output/02-design-system/palette.md`
2. Lire `pipeline/output/02-design-system/typography.md`
3. Lire `pipeline/output/02-design-system/constraints.md`
4. Remplacer tous les placeholders `[PLACEHOLDER]` par les valeurs extraites
5. Écrire dans `app/globals.css`

---

## 2. Template complet globals.css

Copier ce template et remplir tous les placeholders :

```css
/* ============================================================
   GLOBALS.CSS — Design Tokens Dashboard
   Généré par skill dashboard-design-tokens
   Source : pipeline/output/02-design-system/
   ============================================================ */

@import "tailwindcss";

/* ============================================================
   1. POLICES
   ============================================================ */
@import url("https://fonts.googleapis.com/css2?family=[FONT_UI]:wght@400;500;600;700&family=[FONT_MONO]:wght@400;500&display=swap");
/* Exemple : family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500 */

/* ============================================================
   2. DESIGN TOKENS — LIGHT MODE (défaut)
   ============================================================ */
@theme inline {

  /* ----------------------------------------------------------
     2.1 COULEURS — Primaire
     Source : pipeline/output/02-design-system/palette.md
     ---------------------------------------------------------- */
  --color-primary:            [OKLCH_PRIMARY];        /* Ex: oklch(0.546 0.245 264.1) */
  --color-primary-light:      [OKLCH_PRIMARY_LIGHT];  /* Hover state */
  --color-primary-dark:       [OKLCH_PRIMARY_DARK];   /* Pressed / focus */
  --color-primary-foreground: oklch(1 0 0);           /* Texte sur fond primaire */

  /* ----------------------------------------------------------
     2.2 COULEURS — Secondaire / Accent
     ---------------------------------------------------------- */
  --color-secondary:            [OKLCH_SECONDARY];
  --color-secondary-light:      [OKLCH_SECONDARY_LIGHT];
  --color-secondary-foreground: [OKLCH_SECONDARY_FOREGROUND]; /* Texte sur fond secondaire */

  /* ----------------------------------------------------------
     2.3 COULEURS — Sémantiques
     ---------------------------------------------------------- */
  --color-success:             [OKLCH_SUCCESS];        /* Ex: oklch(0.608 0.168 145) */
  --color-success-light:       [OKLCH_SUCCESS_LIGHT];  /* Fond badge success */
  --color-success-foreground:  [OKLCH_SUCCESS_FG];     /* Texte sur fond success */

  --color-warning:             [OKLCH_WARNING];        /* Ex: oklch(0.718 0.172 73) */
  --color-warning-light:       [OKLCH_WARNING_LIGHT];
  --color-warning-foreground:  [OKLCH_WARNING_FG];

  --color-danger:              [OKLCH_DANGER];         /* Ex: oklch(0.548 0.22 27) */
  --color-danger-light:        [OKLCH_DANGER_LIGHT];
  --color-danger-foreground:   [OKLCH_DANGER_FG];

  --color-info:                [OKLCH_INFO];           /* Ex: oklch(0.556 0.20 237) */
  --color-info-light:          [OKLCH_INFO_LIGHT];
  --color-info-foreground:     [OKLCH_INFO_FG];

  /* ----------------------------------------------------------
     2.4 COULEURS — Neutrals / Gray scale
     ---------------------------------------------------------- */
  --color-gray-50:   oklch(0.985 0.001 [HUE]);
  --color-gray-100:  oklch(0.961 0.002 [HUE]);
  --color-gray-200:  oklch(0.918 0.004 [HUE]);
  --color-gray-300:  oklch(0.868 0.006 [HUE]);
  --color-gray-400:  oklch(0.716 0.010 [HUE]);
  --color-gray-500:  oklch(0.576 0.012 [HUE]);
  --color-gray-600:  oklch(0.446 0.013 [HUE]);
  --color-gray-700:  oklch(0.374 0.012 [HUE]);
  --color-gray-800:  oklch(0.274 0.008 [HUE]);
  --color-gray-900:  oklch(0.205 0.006 [HUE]);
  --color-gray-950:  oklch(0.130 0.004 [HUE]);
  /* [HUE] : teinte des gris (ex: 264 pour gris légèrement bleuté, 0 pour gris neutre) */

  /* ----------------------------------------------------------
     2.5 COULEURS — Surfaces (light mode)
     ---------------------------------------------------------- */
  --bg-app:           [OKLCH_BG_APP];       /* Fond application ex: oklch(0.975 0.003 264) */
  --bg-surface:       [OKLCH_BG_SURFACE];   /* Cards, panels ex: oklch(1 0 0) */
  --bg-elevated:      [OKLCH_BG_ELEVATED];  /* Modales, dropdowns ex: oklch(1 0 0) */
  --bg-subtle:        [OKLCH_BG_SUBTLE];    /* Zones subtiles ex: oklch(0.955 0.005 264) */
  --bg-overlay:       oklch(0 0 0 / 0.4);  /* Overlay modal */

  /* ----------------------------------------------------------
     2.6 COULEURS — Texte (light mode)
     ---------------------------------------------------------- */
  --text-primary:   [OKLCH_TEXT_PRIMARY];   /* Ex: oklch(0.145 0.01 264) */
  --text-secondary: [OKLCH_TEXT_SECONDARY]; /* Ex: oklch(0.38 0.02 264) */
  --text-muted:     [OKLCH_TEXT_MUTED];     /* Ex: oklch(0.55 0.015 264) */
  --text-disabled:  [OKLCH_TEXT_DISABLED];  /* Ex: oklch(0.72 0.008 264) */
  --text-inverse:   oklch(0.985 0.001 264); /* Texte sur fond sombre */

  /* ----------------------------------------------------------
     2.7 COULEURS — Bordures (light mode)
     ---------------------------------------------------------- */
  --border-subtle:  [OKLCH_BORDER_SUBTLE];  /* Ex: oklch(0.92 0.005 264) */
  --border-default: [OKLCH_BORDER_DEFAULT]; /* Ex: oklch(0.86 0.008 264) */
  --border-strong:  [OKLCH_BORDER_STRONG];  /* Ex: oklch(0.65 0.015 264) */
  --border-focus:   var(--color-primary);   /* Focus ring */

  /* ----------------------------------------------------------
     2.8 TYPOGRAPHIE — Familles
     ---------------------------------------------------------- */
  --font-ui:   "[FONT_UI_NAME]", system-ui, -apple-system, sans-serif;
  --font-mono: "[FONT_MONO_NAME]", ui-monospace, "Cascadia Code", "Fira Code", monospace;
  /* Exemple : --font-ui: "Inter", system-ui, sans-serif; */
  /* Exemple : --font-mono: "JetBrains Mono", ui-monospace, monospace; */

  /* ----------------------------------------------------------
     2.9 TYPOGRAPHIE — Tailles
     ---------------------------------------------------------- */
  --text-xs:   0.6875rem; /* 11px */
  --text-sm:   0.75rem;   /* 12px */
  --text-base: 0.875rem;  /* 14px — corps standard dashboard */
  --text-md:   1rem;      /* 16px */
  --text-lg:   1.125rem;  /* 18px */
  --text-xl:   1.5rem;    /* 24px — KPI values */
  --text-2xl:  2rem;      /* 32px — KPI hero */
  --text-3xl:  3rem;      /* 48px — grandes métriques */

  /* ----------------------------------------------------------
     2.10 TYPOGRAPHIE — Line heights
     ---------------------------------------------------------- */
  --leading-tight:   1.2;
  --leading-snug:    1.3;
  --leading-normal:  1.5;
  --leading-relaxed: 1.6;

  /* ----------------------------------------------------------
     2.11 TYPOGRAPHIE — Font weights
     ---------------------------------------------------------- */
  --font-normal:    400;
  --font-medium:    500;
  --font-semibold:  600;
  --font-bold:      700;

  /* ----------------------------------------------------------
     2.12 ESPACEMENT
     ---------------------------------------------------------- */
  --spacing-px:  1px;
  --spacing-0-5: 0.125rem;  /* 2px */
  --spacing-1:   0.25rem;   /* 4px */
  --spacing-1-5: 0.375rem;  /* 6px */
  --spacing-2:   0.5rem;    /* 8px */
  --spacing-2-5: 0.625rem;  /* 10px */
  --spacing-3:   0.75rem;   /* 12px */
  --spacing-3-5: 0.875rem;  /* 14px */
  --spacing-4:   1rem;      /* 16px */
  --spacing-5:   1.25rem;   /* 20px */
  --spacing-6:   1.5rem;    /* 24px */
  --spacing-7:   1.75rem;   /* 28px */
  --spacing-8:   2rem;      /* 32px */
  --spacing-10:  2.5rem;    /* 40px */
  --spacing-12:  3rem;      /* 48px */
  --spacing-16:  4rem;      /* 64px */
  --spacing-20:  5rem;      /* 80px */

  /* ----------------------------------------------------------
     2.13 RADIUS
     ---------------------------------------------------------- */
  --radius-sm:   0.125rem;  /* 2px — Tags, micro-éléments */
  --radius-base: 0.25rem;   /* 4px — Inputs, boutons */
  --radius-md:   0.375rem;  /* 6px — Cards compactes */
  --radius-lg:   0.5rem;    /* 8px — Cards standard */
  --radius-xl:   0.75rem;   /* 12px — Modales, panels */
  --radius-full: 9999px;    /* Avatars, pills, badges */

  /* ----------------------------------------------------------
     2.14 OMBRES
     ---------------------------------------------------------- */
  --shadow-xs:    0 1px 2px 0 rgb(0 0 0 / 0.04);
  --shadow-sm:    0 1px 3px 0 rgb(0 0 0 / 0.07), 0 1px 2px -1px rgb(0 0 0 / 0.04);
  --shadow-md:    0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.04);
  --shadow-lg:    0 10px 15px -3px rgb(0 0 0 / 0.07), 0 4px 6px -4px rgb(0 0 0 / 0.04);
  --shadow-xl:    0 20px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.03);
  --shadow-inset: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
  --shadow-focus: 0 0 0 3px var(--color-primary-light);

  /* ----------------------------------------------------------
     2.15 TRANSITIONS
     ---------------------------------------------------------- */
  --transition-fast:     150ms ease;
  --transition-base:     200ms ease;
  --transition-slow:     300ms ease;
  --transition-bounce:   400ms cubic-bezier(0.34, 1.56, 0.64, 1);
  --transition-property-common: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter;

  /* ----------------------------------------------------------
     2.16 DIMENSIONS SIDEBAR
     ---------------------------------------------------------- */
  --sidebar-width:          [SIDEBAR_WIDTH];       /* Ex: 16rem (256px) */
  --sidebar-width-collapsed:[SIDEBAR_COLLAPSED];   /* Ex: 4rem (64px) — mode icônes seules */
  --sidebar-width-mobile:   100vw;                 /* Plein écran sur mobile */

  /* ----------------------------------------------------------
     2.17 DIMENSIONS HEADER
     ---------------------------------------------------------- */
  --header-height:        [HEADER_HEIGHT];         /* Ex: 3.5rem (56px) */
  --header-height-mobile: [HEADER_HEIGHT_MOBILE];  /* Ex: 3rem (48px) */

  /* ----------------------------------------------------------
     2.18 TOUCH TARGETS
     ---------------------------------------------------------- */
  --touch-target-min:  2.75rem;  /* 44px — WCAG minimum mobile */
  --touch-target-desk: 2.25rem;  /* 36px — Desktop compact */

  /* ----------------------------------------------------------
     2.19 Z-INDEX SCALE
     ---------------------------------------------------------- */
  --z-base:     0;
  --z-raised:   10;
  --z-dropdown: 100;
  --z-sticky:   200;
  --z-header:   300;
  --z-sidebar:  400;
  --z-modal:    500;
  --z-toast:    600;
  --z-tooltip:  700;

  /* ----------------------------------------------------------
     2.20 BREAKPOINTS
     ---------------------------------------------------------- */
  --breakpoint-sm:  640px;
  --breakpoint-md:  768px;
  --breakpoint-lg:  1024px;
  --breakpoint-xl:  1280px;
  --breakpoint-2xl: 1536px;
}

/* ============================================================
   3. DESIGN TOKENS — DARK MODE
   ============================================================ */
@media (prefers-color-scheme: dark) {
  @theme inline {
    /* Surfaces */
    --bg-app:      [OKLCH_DARK_BG_APP];      /* Ex: oklch(0.12 0.008 264) */
    --bg-surface:  [OKLCH_DARK_BG_SURFACE];  /* Ex: oklch(0.17 0.008 264) */
    --bg-elevated: [OKLCH_DARK_BG_ELEVATED]; /* Ex: oklch(0.20 0.008 264) */
    --bg-subtle:   [OKLCH_DARK_BG_SUBTLE];   /* Ex: oklch(0.15 0.008 264) */

    /* Texte */
    --text-primary:   [OKLCH_DARK_TEXT_PRIMARY];   /* Ex: oklch(0.945 0.003 264) */
    --text-secondary: [OKLCH_DARK_TEXT_SECONDARY]; /* Ex: oklch(0.75 0.01 264) */
    --text-muted:     [OKLCH_DARK_TEXT_MUTED];     /* Ex: oklch(0.58 0.012 264) */
    --text-disabled:  [OKLCH_DARK_TEXT_DISABLED];  /* Ex: oklch(0.42 0.008 264) */

    /* Bordures */
    --border-subtle:  [OKLCH_DARK_BORDER_SUBTLE];  /* Ex: oklch(0.24 0.01 264) */
    --border-default: [OKLCH_DARK_BORDER_DEFAULT]; /* Ex: oklch(0.30 0.01 264) */
    --border-strong:  [OKLCH_DARK_BORDER_STRONG];  /* Ex: oklch(0.45 0.015 264) */

    /* Ombres (dark mode : inverser avec glow subtil) */
    --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.25), 0 1px 2px -1px rgb(0 0 0 / 0.15);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.30), 0 2px 4px -2px rgb(0 0 0 / 0.18);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.35), 0 4px 6px -4px rgb(0 0 0 / 0.20);

    /* Les couleurs sémantiques sont légèrement éclaircies en dark mode */
    --color-success-light: [OKLCH_DARK_SUCCESS_LIGHT];
    --color-warning-light: [OKLCH_DARK_WARNING_LIGHT];
    --color-danger-light:  [OKLCH_DARK_DANGER_LIGHT];
    --color-info-light:    [OKLCH_DARK_INFO_LIGHT];
  }
}

/* Support class-based dark mode (si next-themes est utilisé) */
.dark {
  --bg-app:           [OKLCH_DARK_BG_APP];
  --bg-surface:       [OKLCH_DARK_BG_SURFACE];
  --bg-elevated:      [OKLCH_DARK_BG_ELEVATED];
  --bg-subtle:        [OKLCH_DARK_BG_SUBTLE];
  --text-primary:     [OKLCH_DARK_TEXT_PRIMARY];
  --text-secondary:   [OKLCH_DARK_TEXT_SECONDARY];
  --text-muted:       [OKLCH_DARK_TEXT_MUTED];
  --text-disabled:    [OKLCH_DARK_TEXT_DISABLED];
  --border-subtle:    [OKLCH_DARK_BORDER_SUBTLE];
  --border-default:   [OKLCH_DARK_BORDER_DEFAULT];
  --border-strong:    [OKLCH_DARK_BORDER_STRONG];
}

/* ============================================================
   4. VARIABLES SHADCN/UI
   (mapping des tokens dashboard → variables shadcn)
   ============================================================ */
:root {
  --background:       var(--bg-app);
  --foreground:       var(--text-primary);
  --card:             var(--bg-surface);
  --card-foreground:  var(--text-primary);
  --popover:          var(--bg-elevated);
  --popover-foreground: var(--text-primary);
  --primary:          var(--color-primary);
  --primary-foreground: var(--color-primary-foreground);
  --secondary:        var(--bg-subtle);
  --secondary-foreground: var(--text-secondary);
  --muted:            var(--bg-subtle);
  --muted-foreground: var(--text-muted);
  --accent:           var(--color-secondary);
  --accent-foreground: var(--color-secondary-foreground);
  --destructive:      var(--color-danger);
  --destructive-foreground: var(--color-danger-foreground);
  --border:           var(--border-default);
  --input:            var(--border-default);
  --ring:             var(--color-primary);
  --radius:           var(--radius-lg);
}

/* ============================================================
   5. RESET ET BASE
   ============================================================ */
*, *::before, *::after {
  box-sizing: border-box;
}

html {
  font-size: 16px;
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
}

body {
  font-family: var(--font-ui);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
  color: var(--text-primary);
  background-color: var(--bg-app);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Taille de base 14px pour les dashboards */
html {
  font-size: 16px;
}

/* ============================================================
   6. SCROLLBARS CUSTOM (dashboard UX)
   ============================================================ */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: var(--border-default);
  border-radius: var(--radius-full);
}
::-webkit-scrollbar-thumb:hover {
  background: var(--border-strong);
}

/* ============================================================
   7. ANIMATIONS KEYFRAMES
   ============================================================ */
@keyframes skeleton-pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}

@keyframes spinner {
  to { transform: rotate(360deg); }
}

@keyframes toast-enter {
  from {
    opacity: 0;
    transform: translateY(0.5rem) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes toast-exit {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(-0.25rem) scale(0.97);
  }
}

@keyframes modal-enter {
  from {
    opacity: 0;
    transform: scale(0.96) translateY(-0.5rem);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-1rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* ============================================================
   8. CLASSES UTILITAIRES DASHBOARD
   ============================================================ */

/* Skeleton loader */
.skeleton {
  animation: skeleton-pulse 1.5s ease-in-out infinite;
  background-color: var(--bg-subtle);
  border-radius: var(--radius-base);
}

/* Spinner */
.spinner {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid var(--border-default);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spinner 0.7s linear infinite;
}

/* Truncate texte */
.truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Focus visible global */
:focus-visible {
  outline: 2px solid var(--border-focus);
  outline-offset: 2px;
}
```

---

## 3. Mapping A02 → tokens CSS

Correspondance entre les sorties de l'extraction (skill dashboard-design-extraction) et les placeholders du template :

| Sortie `palette.md` | Placeholder globals.css |
|--------------------|------------------------|
| `--color-primary` OKLCH | `[OKLCH_PRIMARY]` |
| `--color-primary-light` OKLCH | `[OKLCH_PRIMARY_LIGHT]` |
| `--color-primary-dark` OKLCH | `[OKLCH_PRIMARY_DARK]` |
| `--bg-app` | `[OKLCH_BG_APP]` |
| `--bg-surface` | `[OKLCH_BG_SURFACE]` |
| `--text-primary` | `[OKLCH_TEXT_PRIMARY]` |
| Police UI (typography.md) | `[FONT_UI_NAME]`, `[FONT_UI]` |
| Police mono (typography.md) | `[FONT_MONO_NAME]`, `[FONT_MONO]` |
| Sidebar width (constraints.md) | `[SIDEBAR_WIDTH]` |
| Header height (constraints.md) | `[HEADER_HEIGHT]` |

---

## 4. Notes d'intégration shadcn/ui

Lors de l'installation de shadcn/ui, choisir ces options :

```bash
npx shadcn@latest init
# Style : Default
# Base color : choisir "slate" ou "zinc" (sera surchargé par globals.css)
# CSS variables : Yes
```

Après init, shadcn va écrire ses propres variables dans `globals.css`. Les **supprimer** et les remplacer par la section `/* 4. VARIABLES SHADCN/UI */` du template ci-dessus, qui mappe les tokens dashboard vers les variables shadcn.

---

## 5. Checklist de validation tokens

Avant de valider le fichier, vérifier :

- [ ] Tous les `[PLACEHOLDER]` ont été remplacés par des valeurs réelles
- [ ] La Google Fonts URL charge bien les bons weights (400, 500, 600, 700)
- [ ] Les couleurs sémantiques (success/warning/danger/info) ont les 3 déclinaisons (-light, base, -foreground)
- [ ] Les dark mode tokens sont définis pour : bg-app, bg-surface, bg-elevated, text-primary, text-secondary, text-muted, border-default
- [ ] `--sidebar-width` et `--header-height` sont renseignés
- [ ] Les variables shadcn (`--background`, `--primary`, `--border`, etc.) sont bien mappées
- [ ] `npm run build` passe sans erreur après génération
