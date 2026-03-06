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
| zod | 3+ | Validation schémas |
| sonner | Latest | Toasts notifications |

## UI Components

| Technologie | Usage |
|-------------|-------|
| Lucide React | Icônes (librairie unique — voir ui-kit.md) |
| shadcn/ui | Composants (Input, Textarea, Select uniquement) |

## AI / Agents

| Outil | Modèle | Phase | Usage |
|-------|--------|-------|-------|
| ui-ux-pro-max | — | A (A02) | Skill data-driven (CSVs) — 97 palettes par industrie + 57 font pairings par mood. Recommande pour lookup couleurs/typo |
| frontend-design2 | — | B | Skill comportemental Claude (SKILL.md) — active les règles anti-slop, dials, arsenal créatif |
| Context Assembler | Haiku | B | Agent résolveur de contexte (déterministe) |
| Aesthetic Director | Opus 4.6 | B | Agent direction créative (sensoriel) |
| Constraint Validator | Haiku | B | Agent vérificateur de règles (systématique, skills: [frontend-design2]) |
| Wireframe Validator | Haiku | A05 | Agent validateur structurel des wireframes |
| Token Auditor | Haiku | A06 | Agent auditeur de couverture tokens CSS |

## Structure Codebase

```
app/
├── globals.css          # SOURCE UNIQUE design tokens (@theme, OKLCH, transitions, ombres)
├── layout.tsx           # Root layout (Server Component)
├── page.tsx             # Homepage
├── sitemap.ts           # Sitemap dynamique
├── robots.ts            # Robots.txt
├── not-found.tsx        # Page 404 custom
├── actions/             # Server Actions
│   └── contact.ts       # Form submission
└── [pages]/             # Pages secondaires
    ├── services/
    ├── portfolio/
    ├── about/
    └── contact/

components/
├── layout/              # Header, Footer (Server Components)
│   ├── header.tsx
│   ├── mobile-menu.tsx  # Client Component
│   └── footer.tsx
├── sections/            # Sections homepage
│   ├── hero.tsx
│   ├── services-preview.tsx
│   └── ...
├── pages/               # Sections pages secondaires
│   ├── services/
│   ├── portfolio/
│   └── ...
└── ui/                  # Composants réutilisables
    ├── animated-section.tsx  # Client Component
    ├── input.tsx             # shadcn/ui
    └── textarea.tsx          # shadcn/ui

_preflight/              # Fichiers agents (context blocks + directions créatives)
├── header-context.md
├── header-direction.md
├── footer-context.md
├── footer-direction.md
├── homepage/
│   ├── hero-context.md
│   ├── hero-direction.md
│   └── ...
├── services/
│   └── ...
├── portfolio/
│   └── ...
├── about/
│   └── ...
├── contact/
│   └── ...
└── validation/          # Reports du pass final B05
    ├── homepage-report.md
    └── ...

pipeline/
├── input/               # Données client
├── stages/              # Instructions par étape (A01-B06)
├── workflow/            # DEPENDENCIES.md, DESIGN_STACK.md
├── output/              # Artefacts générés (Phase A)
└── archive/             # Fichiers archivés
```

## Conventions

### Server vs Client Components

| Type | Usage | Marqueur |
|------|-------|----------|
| Server Component | Contenu statique, SEO | (défaut, pas de marqueur) |
| Client Component | Interactivité, useState, hooks | `"use client"` en première ligne |

### Règle de composition

```tsx
// header.tsx (Server Component — pas de "use client")
import MobileMenu from './mobile-menu' // Client Component

export default function Header() {
  return (
    <header>
      <nav className="hidden md:flex">...</nav>
      <MobileMenu /> {/* Client Component pour interactivité */}
    </header>
  )
}
```

### Animations

- **Wrapper pattern** : `AnimatedSection` (Client) wrappe du contenu Server
- **Transitions** : Utiliser les tokens CSS `var(--transition-*)` de globals.css
- **GPU accelerated** : `transform` et `opacity` uniquement (pas de `top`, `left`, `width`)
- **Calibrage** : Respecter MOTION_INTENSITY de `project-dials.md`

### CSS

- **Source unique** : `app/globals.css`
- **Format couleurs** : OKLCH
- **Classes** : Tailwind uniquement, pas de CSS custom inline
- **Spacing** : Variables CSS via @theme
- **Pas de valeurs hardcodées** : tout passe par var(--xxx)

### Composants

- **UI Kit** : Respecter `output/02-art-direction/ui-kit.md` pour les variantes
- **Pas de composant custom** non listé dans le ui-kit sans justification
- **Nommage** : PascalCase pour les composants, kebab-case pour les fichiers

## Installation

```bash
# Créer projet Next.js
npx create-next-app@latest [nom-projet] --typescript --tailwind --eslint --app --src-dir=false

# Dépendances
npm install motion lenis react-hook-form @hookform/resolvers zod sonner lucide-react

# shadcn/ui (composants select uniquement si page Contact)
npx shadcn@latest init
npx shadcn@latest add input textarea select
```

---

*Template Workflow v2.0 — 2026-03-03*
