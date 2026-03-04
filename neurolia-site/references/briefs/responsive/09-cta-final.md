# Brief Responsive — CTA Final Section

**Fichier** : `components/sections/cta-final.tsx`
**Priorite** : P1 (Batch 2)
**Score actuel** : 3/5
**Workflow** : `/workflow-apex`
**Skill implementation** : `/frontend-design`

---

## Scope

Optimiser le responsive mobile-first (375px → 768px) sans casser le desktop existant (lg:/xl:).

## Problemes identifies

### 1. min-h-screen — probleme mobile landscape
- `min-h-screen` force la section a prendre tout le viewport
- En paysage mobile (ex: 667x375), ça cree un espace enorme
- **Fix** : `min-h-[80vh] sm:min-h-[90vh] md:min-h-screen` ou retirer min-h et laisser le contenu dicter

### 2. Padding — seulement mobile value
- `py-20 md:py-28 lg:py-36` — le py-20 (80px) est beaucoup pour mobile
- **Fix** : `py-12 sm:py-16 md:py-28 lg:py-36`

### 3. Gap — saut enorme
- `gap-4 md:gap-12` — passe de 16px a 48px d'un coup
- **Fix** : `gap-4 sm:gap-6 md:gap-8 lg:gap-12`

### 4. Glow effect — debordement
- `w-[80vw] h-[80vw] max-w-[1000px]` — sur mobile 375px = 300px de glow
- Peut deborder visuellement ou impacter les performances
- **Fix** : `w-[60vw] h-[60vw] sm:w-[70vw] sm:h-[70vw] md:w-[80vw] md:h-[80vw]` avec `overflow-hidden` sur le parent

### 5. Decorative lines — position fixe
- `top-20 bottom-20` (80px) — ne scale pas
- **Fix** : `top-10 sm:top-14 md:top-20` et `bottom-10 sm:bottom-14 md:bottom-20`

### 6. Step indicators — gap
- Les indicateurs d'etapes (1 → 2 → 3) en `flex-col md:flex-row`
- Le gap-3 est fixe — OK mais verifier l'alignement mobile
- **Fix** : `gap-2 sm:gap-3`

### 7. Small text — hardcode
- `text-[0.6875rem]` (11px) — fixe
- **Fix** : acceptable a cette taille, mais verifier la lisibilite

### 8. Body text — fixe
- `text-lg` dans certains endroits
- **Fix** : `text-base sm:text-lg`

## Contraintes

- C'est la derniere section avant le footer — elle doit donner envie de cliquer sur le CTA
- Le CTA principal doit etre proéminent et facilement cliquable (touch target 48px min)
- Les step indicators sont secondaires — ils peuvent etre plus compacts sur mobile

## Tokens a utiliser

- `--container-padding` pour les marges
- `.section-spacing` pourrait remplacer le py custom
- Typography clamp deja en place pour les headings

## Critere de succes

- A 375px : CTA visible above the fold si possible, pas de glow qui deborde, padding raisonnable
- A 768px : layout aere, transition fluide vers desktop
- Touch target du bouton CTA >= 48px de hauteur
