# Stack Technique

## Frontend

| Technologie | Version | Usage |
|-------------|---------|-------|
| Next.js | 15+ | Framework React, App Router |
| React | 19+ | UI Library |
| TypeScript | 5+ | Typage statique |
| Tailwind CSS | 4+ | Styling (directive @theme) |

## Animations

| Technologie | Version | Usage |
|-------------|---------|-------|
| Motion | 12+ | Animations (ex Framer Motion) |
| Lenis | Latest | Smooth scroll |

## Formulaires

| Technologie | Version | Usage |
|-------------|---------|-------|
| react-hook-form | 7+ | Gestion formulaires |
| zod | 3+ | Validation schemas |
| sonner | Latest | Toasts notifications |

## UI Components

| Technologie | Usage |
|-------------|-------|
| Lucide React | Icones (librairie unique — voir ui-kit.md) |
| shadcn/ui | Composants (Input, Textarea, Select uniquement) |

## AI / Agents

| Outil | Modele | Phase | Usage |
|-------|--------|-------|-------|
| ui-ux-pro-max | — | A (A02) | Skill data-driven (CSVs) — 97 palettes + 57 font pairings |
| frontend-design2 | — | B | Skill comportemental — anti-slop, dials, arsenal creatif |
| Creative Director | Opus 4.6 | B | Agent decideur — layout, technique, dials par section |
| Technical Validator | Haiku | B | Agent verificateur — tokens, a11y, responsive, anti-patterns |
| Source Reader | Haiku | B (opt.) | Utilitaire de resolution de pointeurs |
| Visual Reviewer | Haiku | B (opt.) | Evaluation visuelle par screenshot |
| Wireframe Validator | Haiku | A05 | Agent validateur des creative briefs |
| Token Auditor | Haiku | A06 | Agent auditeur de couverture tokens CSS |

## Structure Codebase

```
app/
├── globals.css          # SOURCE UNIQUE design tokens (@theme, OKLCH, transitions, ombres)
├── layout.tsx           # Root layout (Server Component)
├── page.tsx             # Homepage
├── sitemap.ts
├── robots.ts
├── not-found.tsx
├── actions/contact.ts
└── [pages]/

components/
├── layout/              # Header, Footer (Server Components)
├── sections/            # Sections homepage
├── pages/               # Sections pages secondaires
└── ui/                  # Composants reutilisables

_preflight/              # Fichiers agents (creative directions)
├── header-creative-direction.md
├── footer-creative-direction.md
├── homepage/
│   ├── hero-creative-direction.md
│   └── ...
├── [pages]/
└── validation/          # Reports du pass final B05

pipeline/
├── input/               # Donnees client
├── stages/              # Instructions par etape (A01-B06)
├── workflow/            # DEPENDENCIES.md, DESIGN_STACK.md
└── output/              # Artefacts generes (Phase A)
```

## Conventions

### Server vs Client Components

| Type | Usage | Marqueur |
|------|-------|----------|
| Server Component | Contenu statique, SEO | (defaut) |
| Client Component | Interactivite, useState, hooks | `"use client"` |

### Animations

- **Wrapper pattern** : `AnimatedSection` (Client) wrappe du contenu Server
- **Transitions** : Utiliser les tokens CSS `var(--transition-*)` de globals.css
- **GPU accelerated** : `transform` et `opacity` uniquement
- **Calibrage** : Respecter les dials decides par le Creative Director

### CSS

- **Source unique** : `app/globals.css`
- **Format couleurs** : OKLCH
- **Pas de valeurs hardcodees** : tout passe par var(--xxx)

### Composants

- **UI Kit** : Respecter `output/02-art-direction/ui-kit.md`
- **Nommage** : PascalCase composants, kebab-case fichiers

## Installation

```bash
npx create-next-app@latest [nom-projet] --typescript --tailwind --eslint --app --src-dir=false
npm install motion lenis react-hook-form @hookform/resolvers zod sonner lucide-react
npx shadcn@latest init
npx shadcn@latest add input textarea select
```

---

*Template Workflow v4.0 — 2026-03-21*
