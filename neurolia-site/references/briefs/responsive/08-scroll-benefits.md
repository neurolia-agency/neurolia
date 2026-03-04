# Brief Responsive — Scroll Benefits Section

**Fichier** : `components/sections/scroll-benefits.tsx`
**Priorite** : P0 (Batch 1)
**Score actuel** : 3/5
**Workflow** : `/workflow-apex`
**Skill implementation** : `/frontend-design`

---

## Scope

Optimiser le responsive mobile-first (375px → 768px) sans casser le desktop existant (lg:/xl:).

## Problemes identifies

### 1. CRITIQUE — Layout 2-col sticky fragile sur mobile
- `grid-cols-[auto_1fr]` avec sticky left + scrolling right
- Sur mobile, la colonne sticky (logo) prend de la place inutilement
- **Fix** : sur mobile, passer en 1 col avec le logo au-dessus (ou masqué), benefices en stack vertical
- Envisager : `grid-cols-1 md:grid-cols-[auto_1fr]`

### 2. CRITIQUE — Padding vertical viewport
- `py-[35vh]` — sur un mobile 667px de haut, ça fait ~233px de padding en haut ET en bas
- Beaucoup trop d'espace vide sur petit ecran
- **Fix** : `py-[15vh] sm:py-[25vh] md:py-[35vh]`

### 3. Sticky positioning — calcul complexe
- `top: "calc(50vh - clamp(...))"` — fragile, a tester sur mobile
- Verifier que le logo ne sort pas du viewport sur petit ecran
- **Fix** : simplifier le calc pour mobile ou utiliser un layout different

### 4. Glow effect — pas responsive
- `blur-[180px]` avec `max-h-[700px] max-w-[700px]`
- Le glow deborde probablement sur mobile
- **Fix** : `blur-[80px] sm:blur-[120px] md:blur-[180px]` et `max-h-[300px] max-w-[300px] sm:max-h-[500px] sm:max-w-[500px] md:max-h-[700px] md:max-w-[700px]`

### 5. Decorative line — masquee OK
- `hidden lg:block` — deja correct, la ligne decorative est masquee sur mobile

### 6. Grid gap — 3 valeurs OK
- `gap-2 md:gap-8 lg:gap-12` — manque sm:
- **Fix** : `gap-2 sm:gap-4 md:gap-8 lg:gap-12`

## Contraintes

- Le concept de benefices qui defilent avec un logo fixe est le coeur de la section
- Sur mobile, si le layout 2-col ne marche pas, le logo peut devenir un header fixe au-dessus de la liste
- Les textes des benefices utilisent deja clamp() — bon

## Tokens a utiliser

- `--container-padding` pour les marges
- Typography tokens deja en place (clamp)

## Critere de succes

- A 375px : les benefices sont lisibles en stack, pas de glow qui deborde, padding vertical raisonnable
- A 768px : le layout 2-col commence a fonctionner, le sticky est stable
- Pas de scrollbar horizontale
