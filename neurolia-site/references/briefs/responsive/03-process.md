# Brief Responsive — Process Section

**Fichier** : `components/sections/process.tsx`
**Priorite** : P0 (Batch 1) — Score le plus bas
**Score actuel** : 2.5/5
**Workflow** : `/workflow-apex`
**Skill implementation** : `/frontend-design`

---

## Scope

Optimiser le responsive mobile-first (375px → 768px) sans casser le desktop existant (lg:/xl:).

## Problemes identifies

### 1. CRITIQUE — Mock cards padding fixe
- `p-5` (20px) identique partout — les mocks internes ne respirent pas sur mobile
- Les composants mock (AuditMock, ProposalMock, EcosystemMock) ont tous des dimensions hardcodées
- **Fix** : `p-3 sm:p-4 md:p-5` sur les cards, puis adapter les mocks internes

### 2. CRITIQUE — Textes mocks trop petits
- `text-[0.8125rem]` (13px) et `text-[0.625rem]` (10px) dans les mocks
- Illisibles sur mobile
- **Fix** : augmenter les tailles de base mobile ou accepter que les mocks soient decoratifs (non lisibles) sur mobile

### 3. Grid layout — transition abrupte
- `md:grid-cols-3 md:gap-y-0` — passe direct de 1 col a 3 cols
- A 768px les 3 colonnes sont trop etroites (256px chacune)
- **Fix** : envisager `sm:grid-cols-1 md:grid-cols-3` et s'assurer que les cards en 1 col ont un max-width pour ne pas etre trop larges

### 4. Subgrid row-span — hauteurs inegales mobile
- `md:row-span-3` avec `h-full` — en mobile (1 col) le row-span n'a pas de sens
- Verifier que le stack mobile ne cree pas de hauteurs disproportionnees

### 5. Step numbers — scaling insuffisant
- `text-[1.75rem]` mobile → `text-[2.25rem]` desktop — seulement 2 valeurs
- **Fix** : `text-[clamp(1.5rem, 4vw, 2.25rem)]`

### 6. Checklist items — gaps fixes
- `gap-3` entre les items de checklist dans les cards
- **Fix** : `gap-2 sm:gap-3`

### 7. Sidebar bar width — fixe
- `w-[3px]` pour la barre laterale de progression — OK
- Mais la hauteur de transition ne s'adapte pas

## Contraintes

- Les animations CSS @keyframes dans les mocks DOIVENT continuer a tourner
- Ne pas simplifier les mocks — ils sont un element cle de cette section
- Les 3 etapes restent dans l'ordre : Audit → Proposition → Ecosysteme

## Approche recommandee pour les mocks

Sur mobile (< 640px), les mocks peuvent :
1. Garder leur complexite visuelle mais avec des tailles reduites proportionnellement
2. Utiliser `transform: scale(0.85)` avec `transform-origin: top left` comme fallback
3. Ou adapter individuellement chaque mock (plus de travail mais meilleur resultat)

## Tokens a utiliser

- `--container-padding` pour le padding lateral
- `.section-spacing` pour le padding vertical
- Les tokens typo `--font-size-h3`, `--font-size-h4` pour les titres

## Critere de succes

- A 375px : les 3 cards empilees sont lisibles, les mocks restent visuellement interessants meme si les textes internes sont petits
- A 768px : les 3 colonnes ne sont pas ecrasees — si c'est le cas, rester en 1 col jusqu'a lg:
- Les animations continuent de tourner a toutes les tailles
