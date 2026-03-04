# A02 — Design Extraction : Extraction Design System

## Objectif

Extraire les elements visuels necessaires au dashboard depuis un design system existant (Neurolia, client, ou autre source). Produit un sous-ensemble simplifie, adapte a la densite d'information d'un dashboard.

> **Note** : Cette etape remplace A02-Brand et A03-Art Direction du template site vitrine. Un dashboard n'a pas besoin d'une identite de marque complete — il a besoin d'un systeme de design fonctionnel, dense et coherent.

## Agent

**`architecture-planner`** (sonnet)

## Skill

`dashboard-design-extraction`

## Inputs

- `pipeline/output/01-brief/prd.md` — PRD (pour identifier les composants necessaires)
- `pipeline/output/01-brief/features.md` — features (pour anticiper les UI patterns)
- Design system source (Neurolia, guide de style client, ou references visuelles)
- `pipeline/input/references/` — dashboards de reference

## Processus

### 1. Identification des Besoins UI

A partir du PRD et des features, lister les composants UI necessaires :

```markdown
### Composants requis

#### Navigation
- [ ] Sidebar (desktop)
- [ ] Tab bar (mobile)
- [ ] Header
- [ ] Breadcrumb

#### Data Display
- [ ] Table / Liste
- [ ] KPI Card
- [ ] Badge / Tag
- [ ] Chart (bar, line, donut)
- [ ] Calendrier
- [ ] Timeline

#### Forms
- [ ] Input text
- [ ] Select / Dropdown
- [ ] Checkbox / Toggle
- [ ] Date picker
- [ ] File upload

#### Feedback
- [ ] Toast / Notification
- [ ] Modal / Dialog
- [ ] Empty state
- [ ] Loading skeleton
- [ ] Error boundary

#### Actions
- [ ] Button (primary, secondary, danger)
- [ ] Icon button
- [ ] Dropdown menu
- [ ] Search bar
```

### 2. Extraction Palette Couleurs

Depuis le design system source, extraire :

**Couleurs principales** :
- Primary : couleur d'action/accent (+ nuances 50-900 en OKLCH)
- Secondary : couleur complementaire (si applicable)
- Neutral : gamme gris (50-950 en OKLCH)

**Couleurs semantiques** :
- Success : actions positives, validations (vert)
- Error : erreurs, suppressions (rouge)
- Warning : alertes, attention (orange/jaune)
- Info : informations, aide (bleu)

**Regles dashboard** :
- Privilegier les couleurs desaturees pour les surfaces
- Reserver la saturation aux elements interactifs et alertes
- Contraste WCAG AA minimum (4.5:1 texte, 3:1 elements UI)

Creer `pipeline/output/02-design-system/palette.md` :

```markdown
# Palette — [NOM_PROJET]

## Source
[Nom du design system source] — [URL ou reference]

## Couleurs Principales

### Primary
| Nuance | OKLCH | HEX | Usage |
|--------|-------|-----|-------|
| 50 | oklch(0.97 0.01 [hue]) | #... | Background subtil |
| 100 | oklch(0.93 0.02 [hue]) | #... | Background hover |
| 200 | oklch(0.87 0.04 [hue]) | #... | Border active |
| 300 | oklch(0.78 0.08 [hue]) | #... | Icon secondary |
| 400 | oklch(0.68 0.12 [hue]) | #... | Icon primary |
| 500 | oklch(0.58 0.16 [hue]) | #... | Text link |
| 600 | oklch(0.50 0.18 [hue]) | #... | Button primary |
| 700 | oklch(0.42 0.16 [hue]) | #... | Button hover |
| 800 | oklch(0.34 0.12 [hue]) | #... | Text on light bg |
| 900 | oklch(0.26 0.08 [hue]) | #... | Text heading |

### Neutral
| Nuance | OKLCH | HEX | Usage |
|--------|-------|-----|-------|
| 50 | oklch(0.98 0 0) | #... | Page background |
| 100 | oklch(0.95 0 0) | #... | Card background alt |
| 200 | oklch(0.90 0 0) | #... | Border default |
| 300 | oklch(0.83 0 0) | #... | Border hover |
| 400 | oklch(0.70 0 0) | #... | Text muted |
| 500 | oklch(0.55 0 0) | #... | Text placeholder |
| 600 | oklch(0.44 0 0) | #... | Text secondary |
| 700 | oklch(0.37 0 0) | #... | Text body |
| 800 | oklch(0.27 0 0) | #... | Text heading |
| 900 | oklch(0.18 0 0) | #... | Text strong |
| 950 | oklch(0.10 0 0) | #... | Dark mode bg |

### Semantic
| Couleur | Base (OKLCH) | HEX | Light BG | Usage |
|---------|-------------|-----|----------|-------|
| Success | oklch(0.55 0.15 145) | #... | oklch(0.95 0.03 145) | Validation, actif |
| Error | oklch(0.55 0.20 25) | #... | oklch(0.95 0.03 25) | Erreur, suppression |
| Warning | oklch(0.70 0.15 80) | #... | oklch(0.95 0.03 80) | Alerte, attention |
| Info | oklch(0.55 0.15 250) | #... | oklch(0.95 0.03 250) | Information, aide |
```

### 3. Extraction Typographie

Extraire 2-3 familles maximum :

```markdown
# Typographie — [NOM_PROJET]

## Familles

| Usage | Famille | Source | Fallback |
|-------|---------|--------|----------|
| Titres + Body | [Inter / Geist / ...] | Google Fonts / Local | system-ui, sans-serif |
| Monospace | [JetBrains Mono / Fira Code / ...] | Google Fonts / Local | monospace |

## Echelle

| Token | Taille | Poids | Line-height | Usage |
|-------|--------|-------|-------------|-------|
| display | 2rem (32px) | 700 | 1.2 | Hero, titre principal |
| h1 | 1.5rem (24px) | 600 | 1.3 | Titre page |
| h2 | 1.25rem (20px) | 600 | 1.35 | Titre section |
| h3 | 1.125rem (18px) | 500 | 1.4 | Sous-titre |
| body | 0.875rem (14px) | 400 | 1.5 | Texte courant dashboard |
| small | 0.8125rem (13px) | 400 | 1.5 | Labels, metadata |
| caption | 0.75rem (12px) | 400 | 1.5 | Badges, timestamps |

## Regles Dashboard

- Body a **14px** (plus dense que les 16px d'un site vitrine)
- Titres a **font-weight 600** maximum (pas de 800/900)
- Line-height serre (1.2-1.5) pour la densite
- Monospace pour les donnees numeriques, IDs, codes
```

### 4. Extraction Composants Visuels

Creer `pipeline/output/02-design-system/components.md` :

```markdown
# Composants — [NOM_PROJET]

## Spacing

| Token | Valeur | Usage |
|-------|--------|-------|
| page | 24px | Padding page principal |
| section | 32px | Gap entre sections |
| card | 16px | Padding interne card |
| gap-sm | 8px | Gap entre elements inline |
| gap-md | 12px | Gap entre elements de formulaire |
| gap-lg | 16px | Gap entre cards de liste |

## Radius

| Token | Valeur | Usage |
|-------|--------|-------|
| sm | 6px | Badges, tags, petits elements |
| md | 8px | Boutons, inputs |
| lg | 12px | Cards, panneaux |
| full | 9999px | Avatars, pills |

## Shadows

| Token | Valeur | Usage |
|-------|--------|-------|
| card | 0 1px 3px oklch(0 0 0 / 0.08) | Cards, surfaces elevees |
| elevated | 0 4px 12px oklch(0 0 0 / 0.12) | Dropdowns, popovers |
| modal | 0 16px 48px oklch(0 0 0 / 0.2) | Modales |

## Transitions

| Token | Valeur | Usage |
|-------|--------|-------|
| fast | 150ms | Hover states, toggles |
| normal | 250ms | Ouverture menus, tabs |
| slow | 350ms | Modales, sidebars |
| ease-out | cubic-bezier(0.16, 1, 0.3, 1) | Easing par defaut |

## Dimensions

| Token | Valeur | Usage |
|-------|--------|-------|
| sidebar-width | 260px | Sidebar desktop |
| sidebar-collapsed | 64px | Sidebar collapses |
| header-height | 56px | Header fixe |
| touch-target | 44px | Minimum zone tactile mobile |

## Composants de Base (inventaire)

| Composant | Source | Personnalisation |
|-----------|--------|-----------------|
| Button | shadcn/ui | Couleurs via tokens, radius via --radius-md |
| Input | shadcn/ui | Border via --border-default |
| Dialog | shadcn/ui | Shadow via --shadow-modal |
| Table | shadcn/ui | Alternance bg via tokens |
| Badge | shadcn/ui | Couleurs semantiques |
| Tabs | shadcn/ui | Active state via primary |
| Toast | sonner | Integration tokens couleurs |
| Icons | Lucide React | Taille par defaut 16px |
| Charts | Recharts | Couleurs via CSS tokens |
```

### 5. Definition des Contraintes Dashboard

Creer `pipeline/output/02-design-system/constraints.md` :

```markdown
# Contraintes — [NOM_PROJET]

## ON FAIT

1. **Densite elevee** — Plus d'informations par ecran, body a 14px, espacement serre
2. **Surfaces plates** — Cards avec border subtile, shadows minimales
3. **Couleurs fonctionnelles** — Semantique claire (vert=OK, rouge=erreur, orange=attention)
4. **Typographie hierarchique** — Titres 600, body 400, pas de gras decoratif
5. **Navigation persistante** — Sidebar toujours visible desktop, tab bar mobile
6. **Tables denses** — Lignes compactes, colonnes alignees, tri interactif
7. **Feedback immediat** — Toast pour chaque action, skeleton pour chaque chargement
8. **Contraste fonctionnel** — WCAG AA, texte sur fond clair, actions bien visibles

## ON NE FAIT PAS

1. **Pas de decorations superflues** — Pas de gradients, pas d'illustrations hero, pas de backgrounds patterns
2. **Pas de texte display large** — Maximum 2rem pour les titres, le contenu prime
3. **Pas de radius excessif** — Maximum 12px, pas de "pill shape" sauf avatars
4. **Pas de shadows lourdes** — Ombres subtiles uniquement, pas de box-shadow dramatiques
5. **Pas d'animations complexes** — Transform + opacity uniquement, jamais filter:blur anime
6. **Pas de couleurs saturees en surface** — Les couleurs vives sont reservees aux accents et alertes
7. **Pas de scroll horizontal** — Responsive strict, tables overflow gere
8. **Pas d'auto-play** — Pas de carousel automatique, pas de refresh agressif

## Principes de Simplification

> "Un dashboard est un outil de travail, pas une vitrine."

| Aspect | Site vitrine | Dashboard |
|--------|-------------|-----------|
| Body font size | 16px | 14px |
| Spacing | Genereux | Dense |
| Shadows | Multiples niveaux | 1-2 niveaux |
| Radius | Variable (8-24px) | Uniforme (6-12px) |
| Animations | Reveals, parallax | Transitions simples |
| Couleurs | Identite forte | Fonctionnel + accent |
| Images | Omniprésentes | Donnees uniquement |
```

## Output

```
pipeline/output/02-design-system/
├── palette.md        # Couleurs OKLCH (primaire, neutres, semantiques)
├── typography.md     # Familles + echelle typographique
├── components.md     # Spacing, radius, shadows, dimensions, composants UI
└── constraints.md    # ON FAIT / ON NE FAIT PAS + regles simplification
```

## Validation

- [ ] Palette couleurs complete en OKLCH (primaire 50-900, neutres 50-950, 4 semantiques)
- [ ] Correspondance HEX pour chaque couleur
- [ ] Contraste WCAG AA verifie (texte principal sur surface)
- [ ] Typographie limitee a 2-3 familles
- [ ] Echelle typographique avec 7 niveaux minimum
- [ ] Body a 14px (densite dashboard)
- [ ] Spacing system complet (page, section, card, gaps)
- [ ] Radius, shadows, transitions definis
- [ ] Dimensions sidebar et header definies
- [ ] Inventaire composants shadcn/ui + personnalisation
- [ ] Contraintes : minimum 8 ON FAIT + 8 ON NE FAIT PAS
- [ ] Chaque contrainte justifiee
- [ ] Coherence : pas de contradiction entre palette et contraintes
- [ ] Source du design system documentee
