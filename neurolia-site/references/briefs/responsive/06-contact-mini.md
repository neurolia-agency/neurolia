# Brief Responsive — Contact Mini Section

**Fichier** : `components/sections/contact-mini.tsx`
**Priorite** : P1 (Batch 2)
**Score actuel** : 3.5/5
**Workflow** : `/workflow-apex`
**Skill implementation** : `/frontend-design`

---

## Scope

Optimiser le responsive mobile-first (375px → 768px) sans casser le desktop existant (lg:/xl:).

## Problemes identifies

### 1. Card padding — seulement 2 breakpoints
- `p-8 md:p-12` — manque sm: et passage brusque
- **Fix** : `p-6 sm:p-8 md:p-10 lg:p-12`

### 2. Grid gap — saut
- `gap-12 lg:gap-20` — passe de 48px a 80px sans intermediaire
- **Fix** : `gap-8 sm:gap-10 md:gap-12 lg:gap-20`

### 3. Trust indicators — stack mobile
- Les 3 indicateurs (24h / 0 euro / 97%) en `flex-row` — verifier qu'ils ne debordent pas sur 375px
- **Fix** : `flex-col sm:flex-row gap-4 sm:gap-6`

### 4. Perspective 3D — mobile
- `perspective: "800px"` sur la CTA card — effet 3D inutile sur touch
- **Fix** : desactiver le tilt mouse-tracking sur mobile, garder juste le style de la card

### 5. SVG filter — dimensions fixes
- Effets visuels SVG avec dimensions hardcodees
- **Fix** : verifier qu'ils ne causent pas de debordement, sinon masquer sur mobile

### 6. Body text — taille fixe
- `text-lg` (18px) — ne scale pas
- **Fix** : `text-base sm:text-lg` ou `text-[clamp(1rem, 2vw, 1.125rem)]`

## Contraintes

- Layout 1 col mobile → 2 cols lg+ — cette logique reste
- Le CTA "Discutons de votre projet" est critique — il doit rester visible et cliquable
- Le formulaire/lien de contact est la conversion principale

## Tokens a utiliser

- `--container-padding` pour les marges
- `.section-spacing` pour le padding de section

## Critere de succes

- A 375px : CTA card visible et cliquable, trust indicators empiles proprement
- A 768px : layout 1 col mais spacieux, transition vers 2 cols (a lg:) preparee
- Pas d'effet 3D cassé sur touch devices
