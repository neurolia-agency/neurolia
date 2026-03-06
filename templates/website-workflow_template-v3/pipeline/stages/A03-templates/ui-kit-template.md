# UI Kit — [NOM_PROJET]

<!-- Dérive de : visual-vocabulary.md, constraints.md, project-dials.md, colors.md -->

## Boutons

### Primaire (CTA)
- **Background** : var(--accent)
- **Texte** : var(--accent-foreground)
- **Radius** : [valeur depuis visual-vocabulary.md > "radius standard"]
- **Padding** : [X]px [Y]px
- **Hover** : [Transformation depuis visual-vocabulary.md > "hover bouton"]
- **Taille min** : 44px hauteur (accessibilité)
- **Variante mobile** : full-width sur < 640px

### Secondaire
- **Background** : transparent
- **Border** : 1px solid var(--border)
- **Texte** : var(--foreground)
- **Hover** : [Transformation]

### Ghost (si applicable)
- **Background** : transparent
- **Texte** : var(--muted-foreground)
- **Hover** : background var(--muted)

> **Interdit** : Aucun autre style de bouton. Si un composant nécessite un bouton,
> il utilise l'une de ces 2-3 variantes. Pas de bouton custom par section.

## Cards

### Style autorisé
- **Background** : var(--card)
- **Border** : [1px solid var(--border) OU aucune — choisir UN seul style pour le projet]
- **Radius** : [valeur depuis visual-vocabulary.md > "radius large"]
- **Shadow** : [valeur depuis visual-vocabulary.md > "ombre subtle"]
- **Shadow hover** : [valeur > "ombre hover"]
- **Padding interne** : [X]px
- **Séparation contenu** : [gap-tight ou dividers — choisir UN]

> **Anti-pattern** : Pas de card avec border + shadow + radius arrondi simultanément.
> Si VISUAL_DENSITY > 7 → pas de cards, utiliser border-t / divide-y.

## Inputs & Formulaires

### Champ texte
- **Background** : var(--input) ou transparent
- **Border** : 1px solid var(--border)
- **Radius** : [valeur > "radius input"]
- **Focus** : ring 2px var(--ring)
- **Erreur** : border var(--destructive) + message en var(--destructive)
- **Label** : au-dessus du champ, jamais flottant (sauf si MOTION > 7)

### Textarea
- **Même style** que champ texte, min-height: [X]px

### Select
- **Même style** que champ texte + chevron custom

## Badges / Tags

- **Background** : var(--muted) ou var(--accent) à 10% opacité
- **Texte** : var(--muted-foreground) ou var(--accent)
- **Radius** : [valeur > "radius pill"]
- **Font-size** : [valeur > "texte discret"]

## Séparateurs

- **Horizontal** : 1px solid var(--border), opacity 0.5
- **Vertical** : idem, hauteur contextuelle
- **Interdit** : hr décoratif, gradient separator, double-line

## Icônes (si utilisées)

- **Librairie** : [Lucide / Heroicons / Phosphor — en choisir UNE]
- **Taille default** : [X]px
- **Couleur** : currentColor (hérite du texte parent)
- **Interdit** : mélanger plusieurs librairies d'icônes

## Conteneurs de section

### Standard
- **Max-width** : var(--max-width-content)
- **Padding** : var(--spacing-container)
- **Spacing vertical** : var(--spacing-section) desktop / var(--spacing-section-mobile) mobile

### Full-bleed
- **Width** : 100vw
- **Usage** : [sections spécifiques listées — ex: Hero, CTA Final]

## États Interactifs

### Loading
- Skeleton pulse avec var(--muted) → luminosité +5%
- Durée animation : 1.5s infinite

### Empty state
- Icône + texte centré, var(--muted-foreground)
- Jamais un simple "Aucun résultat"

### Error state
- var(--destructive) pour bordures/icônes
- Message descriptif, jamais technique

## Règle d'or

> Tout composant qui n'est pas dans ce ui-kit doit être justifié.
> Si un agent crée un pattern non listé ici, le Constraint Validator doit le signaler.
