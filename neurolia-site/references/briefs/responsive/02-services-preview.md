# Brief Responsive — Services Preview Section

**Fichier** : `components/sections/services-preview.tsx`
**Priorite** : P0 (Batch 1)
**Score actuel** : 3/5
**Workflow** : `/workflow-apex`
**Skill implementation** : `/frontend-design`

---

## Scope

Optimiser le responsive mobile-first (375px → 768px) sans casser le desktop existant (lg:/xl:).

## Problemes identifies

### 1. CRITIQUE — Card padding hardcodé
- `px-[2.125rem] py-[2.5rem]` identique sur toutes les tailles
- Sur 375px ça mange ~45% de la largeur en padding
- **Fix** : `px-5 sm:px-6 md:px-7 lg:px-[2.125rem] py-6 sm:py-7 md:py-8 lg:py-[2.5rem]`

### 2. Grid gap — manque le breakpoint md
- `gap-5 lg:gap-6` — seulement 2 valeurs, saut brusque
- **Fix** : `gap-4 sm:gap-5 md:gap-5 lg:gap-6`

### 3. Icon sizes — fixes
- `w-6 h-6` (24px) partout — ne scale pas
- **Fix** : `w-5 h-5 sm:w-6 sm:h-6` ou utiliser clamp

### 4. Label text — trop petit
- `text-[0.625rem] tracking-[0.2em]` (10px) — lisibilite critique sur mobile
- **Fix** : `text-[0.6875rem] sm:text-[0.625rem]` (11px mobile, 10px desktop avec plus d'espace)

### 5. Section padding — sauts
- `px-6 md:px-12 lg:px-20` — pas de sm:
- **Fix** : utiliser `container-custom` ou `px-6 sm:px-8 md:px-12 lg:px-20`

### 6. Gleam effect — hover only
- L'effet metallic gleam suit le curseur — inutile sur touch
- **Fix** : verifier qu'il y a un fallback visuel (bordure subtile ?) ou simplement le desactiver sur mobile

## Contraintes

- Grid passe de 1 col (mobile) a 2 cols (lg:) — cette logique reste
- Ne pas changer la structure HTML des cards
- Les descriptions de services restent identiques

## Tokens a utiliser

- `--container-padding` pour le padding de section
- `.container-custom` pour le wrapper
- `.section-spacing` pour le padding vertical

## Critere de succes

- A 375px : cards lisibles avec padding proportionnel, pas de texte ecrase
- A 768px : cards en 1 col mais avec des proportions genereuses
- Pas de scrollbar horizontale a aucune taille
