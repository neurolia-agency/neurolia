# Vocabulaire Visuel

<!-- Dérive de : 01-brand/colors.md, 01-brand/typography.md, Moodboard patterns -->

## Espacements

| Terme | Valeur | Usage |
|-------|--------|-------|
| "whitespace généreux" | [X]px ([Y]rem) | Entre sections (desktop) |
| "whitespace mobile" | [X]px ([Y]rem) | Entre sections (mobile) |
| "padding section" | [X]px top/bottom | Intérieur sections desktop |
| "padding section mobile" | [X]px top/bottom | Intérieur sections mobile |
| "espace respiration" | [X]-[Y]px | Entre groupes d'éléments |
| "gap composant" | [X]px | Entre éléments d'un groupe |
| "gap serré" | [X]px | Entre éléments liés |
| "marge latérale" | clamp([X]px, [Y]vw, [Z]px) | Padding conteneur |
| "max-width contenu" | [X]px | Largeur max du contenu |
| "max-width texte" | [X]px | Largeur max paragraphes |

## Typographie

| Terme | Valeur | Usage |
|-------|--------|-------|
| "typo massive" | clamp([X]rem, [Y]vw + [Z]rem, [W]rem) | H1 Hero uniquement |
| "titre section" | clamp(...) | H2 sections |
| "sous-titre" | clamp(...) | H3 |
| "corps confortable" | clamp(...) | Body text |
| "corps large" | clamp(...) | Intros, lead |
| "texte discret" | [X]rem | Captions, labels |
| "line-height aéré" | [X] | Body text |
| "line-height titre" | [X] | Headings |
| "letter-spacing titre" | [X]em | Gros titres |

## Transitions & Animations

| Terme | Valeur | Usage |
|-------|--------|-------|
| "hover subtil" | [Transform], [Duration] [Easing] | Cards, liens |
| "hover bouton" | [Transform], [Duration] [Easing] | Boutons |
| "apparition douce" | [Détails complets] | Sections au scroll |
| "apparition rapide" | [Détails] | Éléments UI |
| "transition standard" | [Duration] [Easing] | Changements d'état |
| "animation macro" | [Duration] [Easing] | Reveal sections |
| "easing standard" | [Easing function] | Tous les éléments |

## Couleurs (référence)

| Terme | Valeur | Usage |
|-------|--------|-------|
| "accent signature" | oklch(...) / #[Hex] | [Nom] — highlights |
| "accent action" | oklch(...) / #[Hex] | [Nom] — CTAs |
| "fond principal" | oklch(...) / #[Hex] | [Nom] |
| "fond alternatif" | oklch(...) / #[Hex] | [Nom] |
| "surface card" | oklch(...) / #[Hex] | [Nom] |
| "bordure subtile" | oklch(...) / #[Hex] | Séparateurs |
| "texte principal" | oklch(...) / #[Hex] | [Nom] |
| "texte secondaire" | oklch(...) / #[Hex] | [Nom] |
| "présence couleur" | [X]-[Y]% de la surface | Ratio couleur signature |

## Formes & Radius

| Terme | Valeur | Usage |
|-------|--------|-------|
| "radius standard" | [X]px | Cards, boutons |
| "radius large" | [X]px | Sections, images |
| "radius pill" | [X]px | Badges, tags |
| "radius input" | [X]px | Champs de formulaire |
| "radius subtle" | [X]px | Petits éléments |

## Ombres

| Terme | Valeur | Usage |
|-------|--------|-------|
| "ombre subtle" | [Box-shadow value] | État par défaut |
| "ombre hover" | [Box-shadow value] | Hover léger |
| "ombre élevée" | [Box-shadow value] | Cards élevées |
| "teinte ombre" | rgba([R], [G], [B], x) | Toujours [tonalité cohérente palette] |

## Layout

| Terme | Valeur | Usage |
|-------|--------|-------|
| "conteneur" | max-width: [X]px, margin: 0 auto | Wrapper principal |
| "grille standard" | [Colonnes], gap [X]px | Layout desktop |
| "grille mobile" | [Colonnes], gap [X]px | Layout mobile |
| "full-bleed" | width: 100vw | Sections pleine largeur |
| "sticky header" | position: sticky, top: 0, z-index: [X] | Navigation |

## Breakpoints

| Terme | Valeur | Usage |
|-------|--------|-------|
| "mobile" | < [X]px | Smartphones |
| "tablet" | [X]px - [Y]px | Tablettes |
| "desktop" | > [Y]px | Ordinateurs |
| "large" | > [Z]px | Grands écrans |
