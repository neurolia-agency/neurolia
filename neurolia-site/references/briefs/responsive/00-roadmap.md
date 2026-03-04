# Responsive Optimization — Landing Page (Mobile-First)

**Scope** : Landing page uniquement (`app/page.tsx`)
**Breakpoints cibles** : Mobile (375px) → Tablette (768px)
**Workflow** : Chaque section = 1 brief autonome = 1 agent APEX
**Skill** : `/workflow-apex` puis `/frontend-design` pour l'implémentation

---

## Audit Global

| # | Section | Fichier | Score Responsive | Priorite |
|---|---------|---------|-----------------|----------|
| 1 | Hero | `components/sections/hero.tsx` | 3.5/5 | P1 |
| 2 | ServicesPreview | `components/sections/services-preview.tsx` | 3/5 | P0 |
| 3 | Process | `components/sections/process.tsx` | 2.5/5 | P0 |
| 4 | PortfolioPreview | `components/sections/portfolio-preview.tsx` | 4/5 | P2 |
| 5 | Testimonials | `components/sections/testimonials.tsx` | 3.5/5 | P1 |
| 6 | ContactMini | `components/sections/contact-mini.tsx` | 3.5/5 | P1 |
| 7 | Faq | `components/sections/faq.tsx` | 3.5/5 | P1 |
| 8 | ScrollBenefits | `components/sections/scroll-benefits.tsx` | 3/5 | P0 |
| 9 | CtaFinal | `components/sections/cta-final.tsx` | 3/5 | P1 |

**Score moyen : 3.3/5** — Production-ready desktop, mais mobile/tablette degradé.

---

## Ordre d'execution recommande

### Batch 1 — Critiques (P0) — Lancer en parallele
- `03-process.md` (2.5/5 — mock cards cassés sur mobile)
- `02-services-preview.md` (3/5 — padding/gaps hardcodés)
- `08-scroll-benefits.md` (3/5 — layout 2-col fragile sur mobile)

### Batch 2 — Importants (P1) — Apres validation Batch 1
- `01-hero.md` (3.5/5 — trust signals, spacing)
- `05-testimonials.md` (3.5/5 — padding, quote mark)
- `06-contact-mini.md` (3.5/5 — gaps, trust indicators)
- `07-faq.md` (3.5/5 — spacing, icon sizing)
- `09-cta-final.md` (3/5 — gaps, glow overflow)

### Batch 3 — Polish (P2)
- `04-portfolio-preview.md` (4/5 — deja le meilleur, finitions)

---

## Tokens responsives disponibles (globals.css)

```css
/* Container */
--container-padding: clamp(1.5rem, 5vw, 5rem);  /* 24px → 80px */
--container-max-width: 1440px;

/* Breakpoints CSS */
Mobile :  @media (max-width: 639px)    → --container-padding: 1.5rem (24px)
Tablet :  @media (640px – 1023px)      → --container-padding: 2.5rem (40px)
Desktop : @media (min-width: 1024px)   → --container-padding: 5rem

/* Section spacing */
.section-spacing → mobile: var(--spacing-section-mobile) / desktop: var(--spacing-section-desktop)
Valeurs : 96px mobile / 160px desktop (breakpoint 768px)

/* Typography fluid */
--font-size-h1: clamp(2.5rem, 8vw, 4rem)     /* mobile */
--font-size-h2: clamp(1.75rem, 3.5vw, 2.75rem)
--font-size-h3: clamp(1.5rem, 4vw, 2rem)
--font-size-h4: clamp(1.25rem, 3vw, 1.75rem)
```

## Tailwind breakpoints (defaut)

```
sm: 640px   — Petit mobile → grand mobile
md: 768px   — Tablette portrait
lg: 1024px  — Tablette paysage / petit desktop
xl: 1280px  — Desktop
```

**Focus de cette passe : mobile (base) → sm → md**
On ne touche PAS aux valeurs lg: et xl: existantes.

---

## Regles pour chaque brief

1. **Mobile-first** — Le style de base = mobile. On ajoute sm: et md: pour ameliorer.
2. **Ne pas casser le desktop** — Les valeurs lg: et xl: existantes ne bougent pas.
3. **Utiliser les tokens** — `container-custom`, `section-spacing`, `--container-padding` quand possible.
4. **Pas de refonte** — On optimise le responsive, on ne redesigne pas.
5. **Tester a 375px et 768px** — Les deux extremes de notre scope.
6. **APEX workflow** — Analyze → Plan → Execute → eXamine pour chaque section.
