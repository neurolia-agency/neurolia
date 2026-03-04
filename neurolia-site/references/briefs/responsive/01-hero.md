# Brief Responsive — Hero Section

**Fichier** : `components/sections/hero.tsx`
**Priorite** : P1 (Batch 2)
**Score actuel** : 3.5/5
**Workflow** : `/workflow-apex`
**Skill implementation** : `/frontend-design`

---

## Scope

Optimiser le responsive mobile-first (375px → 768px) sans casser le desktop existant (lg:/xl:).

## Problemes identifies

### 1. Trust signals row — spacing cassé sur mobile
- `gap-5 gap-y-2` hardcodé, pas de responsive
- Les 3 items (techno, satisfaction, accompagnement) ne s'empilent pas proprement
- **Fix** : `gap-3 sm:gap-4 md:gap-5 gap-y-2`

### 2. Padding top hero — calcul fragile
- `pt-[calc(25vh+40px)]` — le 40px ne scale pas
- **Fix** : `pt-[calc(20vh+24px)] sm:pt-[calc(22vh+32px)] md:pt-[calc(25vh+40px)]`

### 3. Tagline dividers — taille fixe
- `w-10 h-px` flanquant le tagline — trop large sur petit écran
- **Fix** : `w-6 sm:w-8 md:w-10 h-px`

### 4. Text sizes fixes
- `text-[0.625rem]` labels hardcodé
- **Fix** : utiliser `text-[clamp(0.5625rem, 1.5vw, 0.6875rem)]`

### 5. Grid trust signals
- `md:grid-cols-3` mais pas de gestion de la vue 1-col mobile
- Verifier que le stack vertical mobile est lisible

## Contraintes

- Ne pas toucher aux animations existantes (word stagger, respire)
- Les valeurs lg: et xl: restent identiques
- Garder la hierachie visuelle : tagline > heading > trust signals

## Tokens a utiliser

- `--container-padding` pour le padding lateral
- `--font-size-h1` a `--font-size-h4` pour la typo
- `.section-spacing` si applicable

## Critere de succes

- A 375px : hero lisible, trust signals empiles proprement, pas de debordement horizontal
- A 768px : transition fluide vers le layout desktop, pas de "saut" visuel
