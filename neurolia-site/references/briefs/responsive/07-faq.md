# Brief Responsive — FAQ Section

**Fichier** : `components/sections/faq.tsx`
**Priorite** : P1 (Batch 2)
**Score actuel** : 3.5/5
**Workflow** : `/workflow-apex`
**Skill implementation** : `/frontend-design`

---

## Scope

Optimiser le responsive mobile-first (375px → 768px) sans casser le desktop existant (lg:/xl:).

## Problemes identifies

### 1. Section margin — valeur unique
- `mb-14` (56px) — pas de responsive
- **Fix** : `mb-8 sm:mb-10 md:mb-14`

### 2. FAQ item padding — fixe
- `py-6` (24px) identique partout
- Sur mobile c'est correct mais pourrait etre plus compact
- **Fix** : `py-4 sm:py-5 md:py-6`

### 3. Plus/minus icon — taille fixe
- `w-3 h-px` pour les lignes du +/- — tres petit
- **Fix** : `w-2.5 sm:w-3 h-px`

### 4. Gap question/number — fixe
- `gap-4` entre le numero et la question
- **Fix** : `gap-3 sm:gap-4`

### 5. Label text — extremement petit
- `text-[10px]` — quasiment illisible sur mobile
- **Fix** : `text-[11px] sm:text-[10px]` ou `text-[0.6875rem] sm:text-[0.625rem]`

### 6. Container max-width
- `max-w-[1100px]` — correct, mais verifier que les FAQ items utilisent bien la largeur disponible sur mobile
- Le padding lateral doit etre minimal (px-4 sur mobile)

### 7. Answer text — responsive OK mais verifier
- `text-base md:text-lg` — verifier la lisibilite a 375px
- Potentiellement `text-sm sm:text-base md:text-lg` si trop grand

## Contraintes

- L'accordion open/close animation reste identique
- L'ordre des questions ne change pas
- Le style du separateur entre questions (border) reste

## Tokens a utiliser

- `--container-padding` pour les marges laterales
- `.section-spacing` pour le padding de section

## Critere de succes

- A 375px : questions lisibles, padding compact mais aere, tap target suffisant (44px min)
- A 768px : transition naturelle, l'accordion fonctionne bien
- Les zones cliquables sont assez grandes pour le touch (min 44x44px)
