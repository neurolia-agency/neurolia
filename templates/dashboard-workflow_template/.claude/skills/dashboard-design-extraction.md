# Skill : dashboard-design-extraction

Extrait les éléments pertinents d'un design system existant et les adapte pour un usage dashboard (haute densité d'information, contraste fonctionnel).

---

## 1. Principe d'extraction

Un dashboard n'est PAS un site vitrine. Les règles d'extraction suivantes s'appliquent systématiquement :

| Critère | Site vitrine | Dashboard |
|---------|-------------|-----------|
| Densité visuelle | Faible (respiration) | Haute (maximum d'info par écran) |
| Décoration | Gradients, illustrations, animations | Minimal, fonctionnel |
| Contrastes | Esthétiques | Fonctionnels (lisibilité données) |
| Radius | Variable (style) | Cohérent et petit (2–8px) |
| Ombres | Dramatiques | Subtiles ou absentes |
| Typographie | Expressive | Tabulaire, monospace pour chiffres |
| Couleurs sémantiques | Optionnelles | Obligatoires (success/warning/danger/info) |

---

## 2. Sources d'entrée

### Source principale : Design System Neurolia

Le design system de reference est celui du site Neurolia :

```
neurolia-site/app/globals.css
```

Ce fichier contient les tokens complets : couleurs OKLCH (dark theme terracotta), typographie (Satoshi, Cabinet Grotesk, Lexend, Inter), spacing, radius, transitions, composants (buttons, cards, forms, badges, tables).

**Procedure** : Lire `globals.css` du projet Neurolia, extraire les tokens pertinents pour le dashboard, et les adapter selon les regles de simplification (section 4).

### Sources additionnelles par projet

```
pipeline/input/
├── assets/          # Logos, icônes, images de marque du CLIENT
├── imports/         # Design system client existant (si different de Neurolia)
└── references/      # Screenshots, sites de référence du CLIENT
```

Si le client a son propre design system : fusionner avec la base Neurolia (le client prime pour les couleurs de marque, Neurolia prime pour la structure et les patterns dashboard).

---

## 3. Étapes d'extraction

### Étape 1 — Palette de couleurs

**Ce qu'il faut extraire :**

```
- Couleur primaire (brand) : 1 couleur, 3 nuances (light, base, dark)
- Couleur secondaire (accent) : 1 couleur max
- Neutres : 8 à 10 nuances (gray-50 → gray-950)
- Sémantiques OBLIGATOIRES :
  - success : vert (#16a34a ou équivalent)
  - warning : orange/jaune (#d97706 ou équivalent)
  - danger : rouge (#dc2626 ou équivalent)
  - info : bleu (#2563eb ou équivalent)
- Surface/fond : bg-app, bg-surface, bg-elevated
- Texte : text-primary, text-secondary, text-muted, text-disabled
- Bordures : border-default, border-subtle, border-strong
```

**Ce qu'il faut ignorer :**
- Couleurs de section marketing (hero backgrounds)
- Couleurs d'illustration
- Gradients décoratifs (sauf si utilisés pour les badges/statuts)

**Conversion en OKLCH :**

```css
/* Outil de conversion : oklch.com */
/* Exemple : #2563eb → oklch(0.546 0.245 264.1) */
--color-primary: oklch(0.546 0.245 264.1);
--color-primary-light: oklch(0.72 0.18 264.1);
--color-primary-dark: oklch(0.38 0.28 264.1);
```

### Étape 2 — Typographie

**Ce qu'il faut extraire :**

Maximum 3 familles de polices :

```
- Police principale (UI) : pour labels, boutons, navigation
  Ex: Inter, DM Sans, Geist Sans
- Police de données (tabulaire, optionnelle) : pour chiffres dans les KPIs
  Ex: Geist Mono, JetBrains Mono, Tabular Numbers
- Police de titres (optionnelle) : si la marque a une police display distincte
  Ex: Sora, Cabinet Grotesk
```

**Échelle typographique pour dashboard :**

```
xs   : 11px / 1.3 — méta-infos, timestamps
sm   : 12px / 1.4 — labels de formulaires, légendes
base : 14px / 1.5 — texte courant (taille standard dashboard)
md   : 16px / 1.5 — titres de section mineurs
lg   : 18px / 1.4 — titres de page
xl   : 24px / 1.3 — KPI values
2xl  : 32px / 1.2 — KPI hero
3xl  : 48px / 1.1 — grandes métriques
```

**Note :** La `base` d'un dashboard est 14px, pas 16px comme sur un site vitrine.

**Ce qu'il faut ignorer :**
- Tailles > 48px (réservées aux héros marketing)
- Polices d'affichage utilisées uniquement pour les headlines du site vitrine

### Étape 3 — Système d'espacement

**Extraire la grille d'espacement existante et l'adapter :**

```
Identifier si le projet utilise :
- Tailwind default (4px base) → conserver tel quel
- Échelle custom (8px base) → documenter et mapper vers Tailwind
- Système propriétaire → créer un mapping explicite
```

**Tableau d'espacement dashboard :**

| Token | Valeur | Usage dashboard |
|-------|--------|----------------|
| `--spacing-1` | 4px | Gap interne composants |
| `--spacing-2` | 8px | Padding cellules, gap icons |
| `--spacing-3` | 12px | Padding compact |
| `--spacing-4` | 16px | Padding standard cards |
| `--spacing-5` | 20px | Gap entre composants |
| `--spacing-6` | 24px | Padding sections |
| `--spacing-8` | 32px | Gap entre sections |
| `--spacing-10` | 40px | Marge page |

### Étape 4 — Radius et ombres

**Règle dashboard : radius petit et cohérent**

```css
/* À extraire et simplifier */
--radius-sm:   2px;   /* Tags, badges */
--radius-base: 4px;   /* Inputs, boutons */
--radius-md:   6px;   /* Cards compactes */
--radius-lg:   8px;   /* Cards standard */
--radius-xl:   12px;  /* Modales, panels */
--radius-full: 9999px; /* Avatars, pills */
```

**Ombres dashboard : subtiles uniquement**

```css
--shadow-sm:  0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md:  0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -1px rgb(0 0 0 / 0.04);
--shadow-lg:  0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -2px rgb(0 0 0 / 0.03);
--shadow-inset: inset 0 1px 2px rgb(0 0 0 / 0.06);
```

**Ce qu'il faut ignorer :**
- Ombres colorées (box-shadow avec couleur de marque)
- Ombres dramatiques (> 20px blur, opacité > 0.15)
- Effets glow / neon

### Étape 5 — Inventaire des composants UI

Lister les composants disponibles dans le design system source et leur statut d'adoption :

| Composant | Dans le DS source ? | Action pour dashboard |
|-----------|--------------------|-----------------------|
| Button (primary/secondary/ghost) | ✓ | Adopter |
| Input, Select, Textarea | ✓ | Adopter + adapter (taille 14px) |
| Badge / Tag | ✓/✗ | Adopter ou créer |
| Table | ✓/✗ | Critique — créer si absent |
| Card | ✓ | Adopter + densifier (padding réduit) |
| Modal / Dialog | ✓/✗ | Adopter ou utiliser shadcn/ui |
| Toast / Notification | ✓/✗ | Adopter ou utiliser sonner |
| Dropdown / Menu | ✓/✗ | Adopter ou utiliser shadcn/ui |
| Tabs | ✓/✗ | Adopter ou utiliser shadcn/ui |
| Sidebar / Nav | Rarement | Créer selon pattern dashboard |
| KPI Card | Rarement | Créer (voir skill dashboard-kpi-patterns) |
| Data Charts | Rarement | Recharts avec tokens du DS |

---

## 4. Règles de simplification pour dashboard

### Philosophie

**Zero decoration cosmétique.** Chaque element visuel doit servir la comprehension ou l'action. Si un element n'aide ni a lire, ni a decider, ni a agir — il n'a pas sa place.

### Ce qu'il faut GARDER

- Couleurs de marque (primaire terracotta + nuances)
- Logotype et favicon
- Couleurs semantiques (success/warning/danger/info)
- Hierarchie de texte (text-primary/secondary/muted/subtle/disabled)
- Surfaces et bordures du dark theme
- Focus states et accessibilite

### Ce qu'il faut ADAPTER

- **Densite d'information** : maximiser le contenu visible par ecran, reduire les espacements genereux du site vitrine (160px sections → 16-32px dans le dashboard)
- **Tailles de texte** : reduire de 1-2 crans (16px body → 14px, headings proportionnellement)
- **Cards** : simplifier — pas de hover-lift, pas de glow, padding reduit, border subtile uniquement
- **Approche mobile-first** : concevoir d'abord pour mobile, enrichir pour desktop (inverse du site vitrine qui est desktop-first)
- **Parcours UX ultra-intuitif** : navigation evidente, actions primaires toujours visibles, zero friction, zero ambiguite

### Ce qu'il faut SUPPRIMER (zero tolerance)

- **Animations decoratives** : hero-breathe, brain-glow, process-scan, marquee, cta-pulse, eclat-gleam — AUCUNE dans le dashboard
- **Glow effects** : pas de box-shadow terracotta, pas de text-shadow pulse
- **Hover transforms** : pas de translateY(-4px), pas de scale(1.03) — hover = changement de couleur uniquement
- **Images decoratives** : pas d'illustrations, pas de backgrounds visuels, pas de gradients cinematiques
- **Signature elements vitrine** : signature-bar, corner-accent, glow-line, number-accent, stagger offsets
- **Polices display** : pas de Lexend (hero), pas de Cabinet Grotesk — garder uniquement Satoshi (UI) + Inter (fallback) + monospace (donnees)
- **Spacing genereux** : section-spacing 160px, spacing-section-desktop — remplacer par echelle dashboard compacte
- **Glass effects** : header-glass, backdrop-filter — pas dans un dashboard

### Animations AUTORISEES (liste exhaustive)

Seules ces micro-interactions sont acceptees dans le dashboard :

| Animation | Duree | Usage |
|-----------|-------|-------|
| Transition couleur hover | 150ms | Boutons, liens, lignes de tableau |
| Transition border-color focus | 150ms | Inputs, selects |
| Skeleton pulse | 1.5s | Loading states uniquement |
| Toast slide-in | 200ms | Notifications sonner |
| Collapse/expand | 200ms | Accordions, filtres, menus |

**Regle : aucune animation > 200ms, aucune animation en boucle infinie, aucun will-change.**

---

## 5. Templates de sortie

### `pipeline/output/02-design-system/palette.md`

```markdown
# Palette de couleurs extraite

## Source
[Nom du DS source / URL / fichier]

## Couleurs primaires

| Token | OKLCH | Hex | Usage |
|-------|-------|-----|-------|
| --color-primary | oklch(...) | #... | CTAs, liens actifs |
| --color-primary-light | oklch(...) | #... | Hover states |
| --color-primary-dark | oklch(...) | #... | Focus, pressed |
| --color-secondary | oklch(...) | #... | Accents secondaires |

## Neutres (gray scale)

| Token | OKLCH | Hex |
|-------|-------|-----|
| --color-gray-50 | oklch(0.985 0.001 264) | #f9fafb |
| ... | ... | ... |
| --color-gray-950 | oklch(0.13 0.008 264) | #030712 |

## Sémantiques

| Token | OKLCH | Hex | Usage |
|-------|-------|-----|-------|
| --color-success | oklch(...) | #... | Statuts OK, validations |
| --color-warning | oklch(...) | #... | Alertes, attention |
| --color-danger | oklch(...) | #... | Erreurs, suppressions |
| --color-info | oklch(...) | #... | Informations, aide |

## Surfaces (light mode)

| Token | Valeur | Usage |
|-------|--------|-------|
| --bg-app | oklch(...) | Fond de l'application |
| --bg-surface | oklch(...) | Cards, panels |
| --bg-elevated | oklch(...) | Modales, dropdowns |
| --bg-subtle | oklch(...) | Zones de mise en avant subtile |

## Notes d'adaptation

[Décisions prises lors de l'adaptation, écarts avec le DS source]
```

### `pipeline/output/02-design-system/typography.md`

```markdown
# Typographie extraite

## Polices sélectionnées

| Rôle | Famille | Source | Fallback |
|------|---------|--------|---------|
| UI principale | [Famille] | Google Fonts / Local | system-ui, sans-serif |
| Données tabulaires | [Famille] | Google Fonts / Local | ui-monospace, monospace |

## Échelle typographique dashboard

| Token | Size | Line-height | Weight | Usage |
|-------|------|-------------|--------|-------|
| --text-xs | 11px | 1.3 | 400 | Timestamps, méta |
| --text-sm | 12px | 1.4 | 400/500 | Labels |
| --text-base | 14px | 1.5 | 400 | Corps |
| --text-md | 16px | 1.5 | 500/600 | Titres mineurs |
| --text-lg | 18px | 1.4 | 600 | Titres de page |
| --text-xl | 24px | 1.3 | 700 | KPI values |
| --text-2xl | 32px | 1.2 | 700 | KPI hero |

## Décisions

[Justification des choix : pourquoi ces polices, écarts avec le DS source]
```

### `pipeline/output/02-design-system/components.md`

```markdown
# Inventaire composants

## Composants adoptés du DS source

| Composant | Fichier source | Adaptations nécessaires |
|-----------|---------------|------------------------|
| Button | [path] | Réduire padding, ajouter variant ghost |
| Input | [path] | Hauteur 36px (vs 44px site vitrine) |

## Composants à créer (absents du DS)

| Composant | Priorité | Référence |
|-----------|----------|-----------|
| KPICard | P0 | skill dashboard-kpi-patterns.md |
| DataTable | P0 | shadcn/ui Table + adaptations |
| Sidebar | P0 | Pattern dashboard standard |
| AlertPanel | P1 | skill dashboard-kpi-patterns.md |

## Composants shadcn/ui à installer

```bash
npx shadcn@latest add table
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add tabs
npx shadcn@latest add badge
npx shadcn@latest add toast
npx shadcn@latest add skeleton
```
```

### `pipeline/output/02-design-system/constraints.md`

```markdown
# Contraintes de design dashboard

## Règles non-négociables

1. Taille de texte minimum : 11px (--text-xs)
2. Contraste minimum : WCAG AA (4.5:1 pour texte normal, 3:1 pour grand texte)
3. Hauteur minimum des éléments interactifs : 36px desktop, 44px mobile
4. Radius cohérent : utiliser uniquement les 5 valeurs définies dans palette
5. Pas de dégradés sur les fonds de cards ou tables

## Appareils cibles

| Rôle | Appareil | Breakpoint | Densité |
|------|----------|-----------|---------|
| [rôle] | [appareil] | [px] | [compact/comfortable] |

## Palette restreinte

Seules ces classes de couleurs sont autorisées dans les composants :
[liste les tokens définis dans palette.md]

## Polices chargées

[Liste exacte des imports Google Fonts / fichiers locaux]
```

---

## 6. Exemple d'extraction — Design System Neurolia

### Entree : `neurolia-site/app/globals.css` (Dark Theme Terracotta)

```
Primaire   : oklch(0.58 0.14 35) — #C45C3B Terracotta
Light      : oklch(0.68 0.12 35) — #E07856
Pale       : oklch(0.75 0.10 35) — #F0A088
Background : oklch(0.03 0 0) — #050810 Ultra-dark
Surface    : oklch(0.09 0 0) — #111827
Semantiques: success oklch(0.76 0.15 165), warning oklch(0.82 0.14 85), danger oklch(0.70 0.19 25), info oklch(0.71 0.14 245)
```

### Sortie adaptee dashboard :

```css
/* Couleurs conservees telles quelles (deja OKLCH, deja dark) */
--color-primary:       oklch(0.58 0.14 35);    /* Terracotta base */
--color-primary-light: oklch(0.68 0.12 35);    /* Hover */
--color-primary-pale:  oklch(0.75 0.10 35);    /* Backgrounds subtils */

/* Semantiques conservees telles quelles */
--color-success: oklch(0.76 0.15 165);
--color-warning: oklch(0.82 0.14 85);
--color-danger:  oklch(0.70 0.19 25);
--color-info:    oklch(0.71 0.14 245);

/* Surfaces conservees */
--bg-app:      oklch(0.03 0 0);     /* Ultra-dark */
--bg-surface:  oklch(0.09 0 0);     /* Cards */
--bg-elevated: oklch(0.11 0 0);     /* Modales, dropdowns */
--bg-subtle:   oklch(0.06 0 0);     /* Zones muted */

/* Texte conserve */
--text-primary:  oklch(0.97 0 0);
--text-secondary: oklch(0.86 0 0);
--text-muted:    oklch(0.69 0 0);
--text-subtle:   oklch(0.52 0 0);
--text-disabled: oklch(0.38 0 0);

/* SUPPRIME du site vitrine */
/* --glow-terracotta → pas de glow */
/* --glow-terracotta-subtle → pas de glow */
/* Toutes les animations hero/brain/process/marquee/eclat */
/* Font Lexend (hero), Cabinet Grotesk (display) */
/* Spacing 160px sections */
/* Radius 0 (site vitrine) → radius 4-8px (dashboard, meilleure lisibilite) */
```

### Decisions documentees

1. **Radius** : Le site Neurolia utilise `--radius: 0` (sharp design). Pour le dashboard, adopter un radius subtil (4-8px) car la densite d'information beneficie de la separation visuelle des cards.
2. **Typographie** : Garder Satoshi comme police UI principale, Inter en fallback. Abandonner Lexend et Cabinet Grotesk (polices display du site vitrine).
3. **Dark theme** : Conserver le dark theme complet — il fonctionne bien pour les dashboards (reduction fatigue visuelle, bon contraste donnees).
4. **Couleurs** : Palette terracotta conservee integralement — les tokens OKLCH sont deja adaptes au dark mode.
