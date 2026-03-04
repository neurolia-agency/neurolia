# Brief Responsive — Testimonials Section

**Fichier** : `components/sections/testimonials.tsx`
**Priorite** : P1 (Batch 2)
**Score actuel** : 3.5/5
**Workflow** : `/workflow-apex`
**Skill implementation** : `/frontend-design`

---

## Scope

Optimiser le responsive mobile-first (375px → 768px) sans casser le desktop existant (lg:/xl:).

## Problemes identifies

### 1. Card padding — progression incomplete
- `p-6 md:p-10 lg:p-14` — 3 valeurs mais pas de sm:
- Sur 375px, p-6 (24px) mange beaucoup de place
- **Fix** : `p-5 sm:p-6 md:p-10 lg:p-14`

### 2. Quote mark — cache au lieu d'adapte
- `text-[40rem]` guillemet decoratif masqué sur mobile — pourrait etre visible en plus petit
- **Fix** : `hidden md:block` est OK, ou afficher en plus petit `text-[8rem] sm:text-[12rem] md:text-[20rem] lg:text-[40rem]`

### 3. Attribution line — taille fixe
- `w-10 h-px` — petit separateur qui pourrait scaler
- **Fix** : `w-6 sm:w-8 md:w-10 h-px`

### 4. Stagger column — margin top
- `md:mt-20 lg:mt-32` — le decalage de la 2e colonne n'a pas de sm: car c'est 1 col sur mobile
- Verifier que en 1 col le stagger (space-y-8) est suffisant

### 5. Labels text — trop petit
- `text-[0.625rem]` (10px) — labels fixes
- **Fix** : `text-[0.6875rem] sm:text-[0.625rem]` (11px mobile)

### 6. Gap testimonial items mobile
- `space-y-8` en mobile — correct mais verifier visuellement
- Possibilite de `space-y-6 sm:space-y-8` pour compacter un peu

## Contraintes

- Layout 1 col mobile → 2 cols md+ — cette logique reste
- Chiffres (metrique) doivent rester visibles et impactants
- Blockquote styling reste identique

## Tokens a utiliser

- `--container-padding` pour les marges
- `.section-spacing` pour le padding de section

## Critere de succes

- A 375px : temoignages empiles, lisibles, padding proportionnel
- A 768px : passage en 2 colonnes fluide, pas de compression de texte
