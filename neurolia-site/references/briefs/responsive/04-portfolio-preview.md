# Brief Responsive — Portfolio Preview Section

**Fichier** : `components/sections/portfolio-preview.tsx`
**Priorite** : P2 (Batch 3)
**Score actuel** : 4/5 — Meilleure section responsive
**Workflow** : `/workflow-apex`
**Skill implementation** : `/frontend-design`

---

## Scope

Finitions responsive mobile-first (375px → 768px). Cette section a deja un bon systeme mobile/desktop conditionnel.

## Problemes identifies

### 1. Header padding — saut
- `pt-16 md:pt-24` — passe de 64px a 96px sans transition
- **Fix** : `pt-12 sm:pt-16 md:pt-20 lg:pt-24`

### 2. Overlay text — padding fixe
- `pt-20 pb-5` dans les overlays d'image
- Sur petit écran, le pt-20 (80px) est disproportionne
- **Fix** : `pt-10 sm:pt-14 md:pt-20 pb-3 sm:pb-4 md:pb-5`

### 3. Metrics text — manque md
- `text-5xl lg:text-7xl` — pas de breakpoint intermediaire
- **Fix** : `text-4xl sm:text-5xl md:text-6xl lg:text-7xl`

### 4. Skip button — position fixe
- `fixed bottom-8 right-8` — peut chevaucher du contenu sur petit ecran
- **Fix** : `fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8`

### 5. Mobile cards — spacing
- `space-y-6` entre les MobileProjectCard — verifier si c'est assez aere
- **Fix** : `space-y-8 sm:space-y-6` (plus d'espace sur petit ecran)

## Contraintes

- Le systeme conditionnel `{isDesktop}` / `{!isDesktop}` reste intact
- Les animations GSAP desktop ne sont pas concernees
- Le composant MobileProjectCard est deja bien structure

## Tokens a utiliser

- `--container-padding` pour les marges laterales
- `.section-spacing` si applicable

## Critere de succes

- A 375px : les cards mobile sont bien espacees, pas de chevauchement
- A 768px : transition fluide — verifier que le breakpoint desktop/mobile est au bon endroit (lg: = 1024px)
