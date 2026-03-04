# Phase 3b — Identité visuelle & Personas

> Sous-étape de [A02-brand.md](../A02-brand.md)
> Pré-requis : `output/01-brand/00-platform.md` (Phase 2)

Ces fichiers combinent des **décisions créatives visuelles** (sélection, naming, intention) et des **spécifications techniques** (CSS, OKLCH, scale). Ils ne nécessitent pas `/brand-expression` (expression verbale) mais impliquent des décisions créatives ancrées dans l'archétype et les valeurs — ce n'est pas du remplissage de template.

> **Dérivation traçable** : Chaque fichier inclut un commentaire `<!-- Dérive de : 00-platform.md > [Composant(s)] -->` en tête, traçant sa source dans la plateforme.

---

## 5. personas.md (Cible)

> **Important** : Les personas doivent inclure un **scénario narratif** (micro-histoire) — pas seulement des bullet points. Ce scénario est du craft narratif qui rend le persona mémorable et actionnable pour les étapes suivantes. Les "Messages Clés" et les "Freins" sont aussi des actes d'écriture empathique ancrés dans l'Insight de la plateforme.

```markdown
# Personas

<!-- Dérive de : 00-platform.md > Insight (tension ressentie), Values (ce qui résonne) -->

## Persona Principal : [Prénom]

### Profil
- **Âge** : [Tranche]
- **Profession** : [Métier / situation]
- **Situation** : [Contexte de vie pertinent]

### Scénario
[3-4 phrases qui racontent une micro-histoire : la situation concrète dans laquelle cette personne se retrouve, ce qu'elle fait, ce qu'elle ressent, comment elle arrive sur le site.]

### Problème
[Quel problème cherche-t-il à résoudre ?]

### Objectif
[Qu'est-ce qu'il veut accomplir ?]

### Freins
- [Frein 1 — avec contexte]
- [Frein 2]
- [Frein 3]

### Message Clé
"[La phrase qui va le convaincre — doit sonner vrai, pas marketing]"

---

## Persona Secondaire : [Prénom]
[Même structure]
```

---

## 6. colors.md (Couleurs)

> **Si identité existante** : Partir des couleurs documentées dans 00-brief.md, les convertir en OKLCH, et construire le système de variantes autour d'elles.

### Process de sélection créative (avant de remplir le template)

1. **Explorer 2-3 stratégies de palette** : analogique, complémentaire, split-complementary, triadique. Tenir compte des couleurs existantes (logo, charte) comme contrainte.
2. **Évaluer chaque stratégie** contre :
   - L'archétype (ex: Caregiver = chaleur → privilégier les harmonies chaudes)
   - L'atmosphère décrite dans 00-platform.md (section Archétype > Manifestation > Visuel)
   - Le secteur et le contexte (ex: restaurant ≠ cabinet d'avocats)
3. **Nommer les couleurs** : Les noms doivent être évocateurs et cohérents avec l'univers de marque (ex: "Or Miel" plutôt que "Jaune primaire"). Le naming est un acte de brand expression.
4. **Justifier le choix** : inclure une section "Harmonie Colorimétrique" qui argumente la stratégie retenue.

```markdown
# Palette de Couleurs

<!-- Dérive de : 00-platform.md > Archétype (atmosphère), Values (symbolique) -->

## Couleur Primaire
- **Nom** : [Nom évocateur — ex: "Or Miel", "Terracotta"]
- **HEX** : #[code]
- **OKLCH** : oklch([L] [C] [H])
- **Usage** : [Rôle dans l'interface]

### Variantes
- **[Nom] clair** : #[hex] — oklch(...) — [Usage : hover, focus]
- **[Nom] foncé** : #[hex] — oklch(...) — [Usage : active, texte]
- **[Nom] pâle** : #[hex] — oklch(...) — [Usage : backgrounds subtils]

## Couleur Secondaire
- **Nom** : [Nom évocateur]
- **HEX** : #[code]
- **OKLCH** : oklch([L] [C] [H])
- **Usage** : [Rôle]

### Variantes
- **[Nom] clair** : #[hex] — oklch(...) — [Usage]
- **[Nom] foncé** : #[hex] — oklch(...) — [Usage]

## Couleur d'Accent (si applicable)
- [Même structure que ci-dessus]

## Neutrals

### Backgrounds
- **[Nom]** : #[hex] — oklch(...) — Background principal
- **[Nom]** : #[hex] — oklch(...) — Background alternatif
- **[Nom]** : #[hex] — oklch(...) — Surfaces (cards)
- **[Nom]** : #[hex] — oklch(...) — Bordures, séparateurs

### Textes
- **[Nom]** : #[hex] — oklch(...) — Texte principal
- **[Nom]** : #[hex] — oklch(...) — Titres
- **[Nom]** : #[hex] — oklch(...) — Sous-titres
- **[Nom]** : #[hex] — oklch(...) — Texte secondaire (body)
- **[Nom]** : #[hex] — oklch(...) — Labels, captions, placeholders

## Sémantique
- **Succès** : #[hex] — oklch(...) — [Si personnalisé ou harmonisé]
- **Erreur** : #[hex] — oklch(...)
- **Warning** : #[hex] — oklch(...)
- **Info** : #[hex] — oklch(...)

## Harmonie Colorimétrique
> Justifier le choix des couleurs : complémentaire, analogique, split-complementary, etc.

[Explication du système + diagramme ASCII si utile]

## Variables CSS
```css
:root {
  /* Primaire */
  --color-primary: oklch(...);
  --color-primary-light: oklch(...);
  --color-primary-dark: oklch(...);

  /* Secondaire */
  --color-secondary: oklch(...);

  /* Accent */
  --color-accent: oklch(...);

  /* Backgrounds */
  --color-background: oklch(...);
  --color-background-alt: oklch(...);
  --color-surface: oklch(...);
  --color-border: oklch(...);

  /* Textes */
  --color-foreground: oklch(...);
  --color-foreground-heading: oklch(...);
  --color-foreground-muted: oklch(...);
  --color-foreground-subtle: oklch(...);

  /* Sémantique */
  --color-success: oklch(...);
  --color-error: oklch(...);
  --color-warning: oklch(...);
  --color-info: oklch(...);
}
```

## Notes d'Usage
- [Note 1 — quand utiliser quelle couleur]
- [Note 2 — contraste WCAG AA respecté entre [texte] et [fond]]
- [Note 3 — couleur(s) jamais utilisée(s) en isolation]

## Compatibilité frontend-design2
> Vérifier que la palette respecte les règles anti-slop du skill.
- [ ] Max 1 couleur d'accent (frontend-design2 Rule 2)
- [ ] Saturation accent < 80% (Rule 2)
- [ ] Pas de purple/blue "AI aesthetic" (LILA BAN — Rule 2)
- [ ] Pas de neon/outer glows prévus (Section 7)
- [ ] Pas de pure black #000000 — utiliser off-black/zinc-950 (Section 7)
- [ ] Bases neutres : Zinc ou Slate (pas de gris chaud/froid mixé)
```

---

## 7. typography.md (Typographie)

### Process de sélection créative (avant de remplir le template)

1. **Identifier 3 pairings candidats** (heading + body). Utiliser Google Fonts comme source principale (gratuit, performant).
2. **Évaluer chaque pairing** contre :
   - Cohérence archétype (ex: Caregiver = rondeur, douceur optique ; Explorer = anguleux, dynamique)
   - Lisibilité mobile (taille minimum 16px body, formes ouvertes)
   - Contraste hiérarchique (heading ≠ body — serif/sans, display/text, etc.)
   - Disponibilité et performance (variable fonts préférées, poids limités)
3. **Décrire le "Feeling"** de chaque police : ce n'est pas une fiche technique, c'est l'expression de la personnalité visuelle de la marque.
4. **Justifier le choix** : expliquer pourquoi CE pairing incarne l'archétype mieux que les alternatives.

```markdown
# Typographie

<!-- Dérive de : 00-platform.md > Archétype (personnalité visuelle), Values (impression) -->

## Police Principale (Titres)
- **Nom** : [Police]
- **Source** : [Google Fonts / Adobe / locale]
- **Weights** : [400, 500, 600, 700...]
- **Fallback** : [Stack fallback]
- **Usage** : [Titres, headings, éléments d'emphase]
- **Feeling** : [Adjectifs qui décrivent l'impression]

## Police Secondaire (Corps)
- **Nom** : [Police]
- **Source** : [Google Fonts / système]
- **Weights** : [300, 400, 500, 600...]
- **Fallback** : [Stack fallback]
- **Usage** : [Body text, interface, boutons]
- **Feeling** : [Adjectifs]

> Si le projet n'utilise qu'une seule police : fusionner en une section unique.

## Échelle de Tailles

| Élément | Desktop | Mobile | Weight | Line-height | Font |
|---------|---------|--------|--------|-------------|------|
| H1 | [px] | [px] | [wt] | [lh] | [Police] |
| H2 | [px] | [px] | [wt] | [lh] | [Police] |
| H3 | [px] | [px] | [wt] | [lh] | [Police] |
| H4 | [px] | [px] | [wt] | [lh] | [Police] |
| H5 | [px] | [px] | [wt] | [lh] | [Police] |
| Body | [px] | [px] | [wt] | [lh] | [Police] |
| Body Large | [px] | [px] | [wt] | [lh] | [Police] |
| Small | [px] | [px] | [wt] | [lh] | [Police] |
| Caption | [px] | [px] | [wt] | [lh] | [Police] |

## Variables CSS
```css
:root {
  /* Familles */
  --font-heading: '[Font]', [fallback];
  --font-body: '[Font]', [fallback];

  /* Tailles fluides (clamp) */
  --font-size-h1: clamp([min], [fluid], [max]);
  --font-size-h2: clamp([min], [fluid], [max]);
  --font-size-h3: clamp([min], [fluid], [max]);
  --font-size-h4: clamp([min], [fluid], [max]);
  --font-size-body: clamp([min], [fluid], [max]);
  --font-size-body-lg: clamp([min], [fluid], [max]);
  --font-size-small: [rem];
  --font-size-caption: [rem];

  /* Poids */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Line heights */
  --line-height-tight: 1.1;
  --line-height-snug: 1.2;
  --line-height-normal: 1.4;
  --line-height-relaxed: 1.6;
  --line-height-loose: 1.7;

  /* Letter spacing */
  --letter-spacing-tight: -0.02em;
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.02em;
}
```

## Import
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=[Font1]:[weights]&family=[Font2]:[weights]&display=swap" rel="stylesheet">
```

## Notes d'Usage
- [Note 1 — quand utiliser quelle police]
- [Note 2 — taille minimum mobile]
- [Note 3 — contraste hiérarchique entre heading et body]

## Compatibilité frontend-design2
> Vérifier que les choix typographiques respectent les règles du skill.
- [ ] Police heading ≠ Inter (BANNI par frontend-design2 Rule 1)
- [ ] Police heading ≠ police par défaut système (anti-générique)
- [ ] Si Dashboard/Software UI : Serif BANNI pour heading (frontend-design2 Rule 1)
- [ ] Polices recommandées par le skill : Geist, Outfit, Cabinet Grotesk, Satoshi
- [ ] Si choix différent des recommandations : justifier pourquoi cette police incarne mieux l'archétype
```
