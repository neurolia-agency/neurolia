# Palette de Couleurs

> D01-Brand | Phase 3b : Palette OKLCH + couleurs semantiques app
> Source : 00-platform.md, references/colors.md (v1)

---

## Philosophie

La palette est construite pour un **dashboard applicatif mobile-first**. Les couleurs neutres dominent l'interface (fonds, textes, bordures). Les couleurs vives sont reservees a trois usages stricts :

1. **Couleur primaire** : elements interactifs (boutons, liens, focus)
2. **Couleurs plateformes** : identifier la source d'une reservation (Airbnb, Booking, Manuel)
3. **Couleurs semantiques** : communiquer un statut (succes, erreur, alerte, info)

Le reste de l'interface est volontairement sobre pour ne pas concurrencer visuellement les donnees.

---

## Couleur Primaire

- **Nom** : Ardoise
- **HEX** : #5B7BB2
- **OKLCH** : oklch(0.580 0.115 250)
- **Usage** : CTAs, elements interactifs, accent principal, liens, selection active
- **Touch state** : oklch(0.500 0.115 250) (pressed : L - 0.08)

Un bleu-ardoise discret qui ne rentre pas en conflit avec les couleurs plateformes (Airbnb rose, Booking bleu fonce). Suffisamment sature pour etre perceptible sur fond clair, suffisamment neutre pour ne pas fatiguer l'oeil en usage quotidien.

### Echelle primaire

| Token | OKLCH | Usage |
|-------|-------|-------|
| `primary-50` | oklch(0.970 0.010 250) | Fond tres leger, page active sidebar |
| `primary-100` | oklch(0.930 0.025 250) | Fond de badge, fond hover, anneau focus |
| `primary-200` | oklch(0.870 0.045 250) | Fond de selection legere |
| `primary-300` | oklch(0.780 0.070 250) | Icones actives legeres |
| `primary-400` | oklch(0.680 0.095 250) | Liens hover |
| `primary-500` | oklch(0.580 0.115 250) | Accent principal, boutons, liens |
| `primary-600` | oklch(0.500 0.115 250) | Bouton hover, texte actif sidebar |
| `primary-700` | oklch(0.420 0.110 250) | Bouton pressed, texte sur fond clair |
| `primary-800` | oklch(0.340 0.090 250) | Texte fort sur fond clair |
| `primary-900` | oklch(0.270 0.070 250) | Texte tres fort sur fond clair |

## Couleur Secondaire

- **Nom** : Lavande
- **HEX** : #8B7EC8
- **OKLCH** : oklch(0.580 0.120 290)
- **Usage** : Elements secondaires, badges informatifs, tags non-critiques, variante visuelle optionnelle

Utilisee avec parcimonie pour creer une distinction visuelle quand le bleu primaire ne suffit pas (ex : difference entre deux types de badges non-semantiques).

---

## Neutrals

| Role | HEX | OKLCH | Usage |
|------|-----|-------|-------|
| Background (page) | #F8F8FA | oklch(0.985 0.002 260) | Fond principal de la page |
| Surface (cards) | #FFFFFF | oklch(0.998 0.000 0) | Fond des cartes, panneaux, modales |
| Surface (sunken) | #F0F0F4 | oklch(0.955 0.004 260) | Zones en retrait, inputs |
| Foreground | #333340 | oklch(0.210 0.015 260) | Texte principal, titres forts |
| Body text | #5A5A6A | oklch(0.390 0.015 260) | Texte courant |
| Muted | #8A8A96 | oklch(0.590 0.013 260) | Texte secondaire, labels |
| Border | #E0E0E6 | oklch(0.900 0.005 260) | Separateurs, bordures legeres |

### Echelle neutre complete

| Token | OKLCH | Usage |
|-------|-------|-------|
| `neutral-50` | oklch(0.985 0.002 260) | Fond de page principal |
| `neutral-100` | oklch(0.965 0.003 260) | Fond de carte secondaire, fond hover table |
| `neutral-150` | oklch(0.940 0.004 260) | Fond de zone hover, skeleton |
| `neutral-200` | oklch(0.900 0.005 260) | Bordures legeres, separateurs |
| `neutral-300` | oklch(0.830 0.007 260) | Bordures visibles, icones inactives |
| `neutral-400` | oklch(0.710 0.010 260) | Texte desactive, placeholder |
| `neutral-500` | oklch(0.590 0.013 260) | Texte secondaire, labels |
| `neutral-600` | oklch(0.490 0.015 260) | Texte courant secondaire |
| `neutral-700` | oklch(0.390 0.015 260) | Texte courant |
| `neutral-800` | oklch(0.300 0.015 260) | Texte important, titres |
| `neutral-900` | oklch(0.210 0.015 260) | Texte principal, titres forts |
| `neutral-950` | oklch(0.150 0.015 260) | Texte maximal (usage rare) |

### Surfaces

| Token | OKLCH | Usage |
|-------|-------|-------|
| `surface-page` | oklch(0.985 0.002 260) | Fond global de la page |
| `surface-card` | oklch(0.998 0.000 0) | Fond des cartes et panneaux (blanc) |
| `surface-elevated` | oklch(0.998 0.000 0) | Modales, dropdowns (blanc + shadow) |
| `surface-sunken` | oklch(0.955 0.004 260) | Zones en retrait, inputs |

---

## Couleurs Semantiques (Etats App)

### Succes (vert)

| Token | OKLCH | Usage |
|-------|-------|-------|
| `success-50` | oklch(0.970 0.025 155) | Fond notification succes |
| `success-100` | oklch(0.930 0.055 155) | Fond de badge "confirme", "termine" |
| `success-500` | oklch(0.650 0.170 155) | Icone, texte succes, badge principal |
| `success-600` | oklch(0.560 0.155 155) | Texte hover, variation positive KPI |
| `success-700` | oklch(0.460 0.130 155) | Texte fort sur fond clair |

**Usages app** : statut "confirme", menage termine, synchronisation OK, validation checklist

### Erreur / Danger (rouge)

| Token | OKLCH | Usage |
|-------|-------|-------|
| `error-50` | oklch(0.970 0.015 25) | Fond notification erreur |
| `error-100` | oklch(0.930 0.045 25) | Fond de badge "annule" |
| `error-500` | oklch(0.580 0.200 25) | Icone, texte erreur, badge principal |
| `error-600` | oklch(0.500 0.185 25) | Texte hover, variation negative KPI |
| `error-700` | oklch(0.410 0.150 25) | Texte fort sur fond clair |

**Usages app** : statut "annule", erreur de formulaire, echec de synchronisation, suppression, action destructrice

### Alerte (jaune-ambre)

| Token | OKLCH | Usage |
|-------|-------|-------|
| `warning-50` | oklch(0.975 0.030 85) | Fond notification alerte |
| `warning-100` | oklch(0.940 0.070 85) | Fond de badge "en attente" |
| `warning-500` | oklch(0.770 0.170 75) | Icone, texte alerte, badge principal |
| `warning-600` | oklch(0.680 0.160 70) | Texte hover |
| `warning-700` | oklch(0.550 0.130 60) | Texte fort sur fond clair |

**Usages app** : statut "en attente d'info", anomalie iCal, reservation incomplete, avertissement

### Info (bleu)

| Token | OKLCH | Usage |
|-------|-------|-------|
| `info-50` | oklch(0.970 0.015 240) | Fond notification info |
| `info-100` | oklch(0.930 0.040 240) | Fond de badge info, "en cours" |
| `info-500` | oklch(0.580 0.140 240) | Icone, texte info |
| `info-600` | oklch(0.500 0.130 240) | Texte hover |
| `info-700` | oklch(0.410 0.110 240) | Texte fort sur fond clair |

**Usages app** : nouvelles reservations, informations contextuelles, aide, statut "en cours"

---

## Couleurs Plateformes

Couleurs fixes derivees des identites visuelles d'Airbnb et Booking.com.

### Airbnb (rose/rouge)

Origine HEX : #FF5A5F

| Token | OKLCH | Usage |
|-------|-------|-------|
| `airbnb-50` | oklch(0.970 0.015 20) | Fond tres leger |
| `airbnb-100` | oklch(0.930 0.040 20) | Fond de badge, fond barre calendrier |
| `airbnb-500` | oklch(0.640 0.190 20) | Couleur principale, dot, barre |
| `airbnb-600` | oklch(0.560 0.180 20) | Hover / accentue |
| `airbnb-700` | oklch(0.470 0.150 20) | Texte fort |

### Booking.com (bleu fonce)

Origine HEX : #003580

| Token | OKLCH | Usage |
|-------|-------|-------|
| `booking-50` | oklch(0.970 0.012 245) | Fond tres leger |
| `booking-100` | oklch(0.920 0.035 245) | Fond de badge, fond barre calendrier |
| `booking-500` | oklch(0.430 0.150 245) | Couleur principale, dot, barre |
| `booking-600` | oklch(0.360 0.140 245) | Hover / accentue |
| `booking-700` | oklch(0.290 0.120 245) | Texte fort |

### Manuel (gris neutre)

| Token | OKLCH | Usage |
|-------|-------|-------|
| `manual-50` | oklch(0.970 0.003 260) | Fond tres leger |
| `manual-100` | oklch(0.930 0.005 260) | Fond de badge |
| `manual-500` | oklch(0.590 0.013 260) | Couleur principale, dot |
| `manual-600` | oklch(0.490 0.015 260) | Hover |
| `manual-700` | oklch(0.390 0.015 260) | Texte fort |

---

## Couleurs Interaction

| Etat | Transformation OKLCH | Exemple sur primary-500 |
|------|---------------------|------------------------|
| Default | -- | oklch(0.580 0.115 250) |
| Hover | L - 0.08 | oklch(0.500 0.115 250) |
| Pressed | L - 0.16 | oklch(0.420 0.110 250) |
| Disabled | C * 0.3, L + 0.2 | oklch(0.780 0.035 250) |
| Focus | ring 3px avec primary-100 | 0 0 0 3px oklch(0.930 0.025 250) |

---

## Variables CSS (Reference)

```css
:root {
  /* Primary */
  --color-primary: oklch(0.580 0.115 250);
  --color-primary-hover: oklch(0.500 0.115 250);
  --color-primary-pressed: oklch(0.420 0.110 250);

  /* Secondary */
  --color-secondary: oklch(0.580 0.120 290);

  /* Neutrals */
  --color-background: oklch(0.985 0.002 260);
  --color-surface: oklch(0.998 0.000 0);
  --color-surface-sunken: oklch(0.955 0.004 260);
  --color-foreground: oklch(0.210 0.015 260);
  --color-muted: oklch(0.590 0.013 260);
  --color-border: oklch(0.900 0.005 260);

  /* Semantic */
  --color-success: oklch(0.650 0.170 155);
  --color-error: oklch(0.580 0.200 25);
  --color-warning: oklch(0.770 0.170 75);
  --color-info: oklch(0.580 0.140 240);

  /* Platforms */
  --color-airbnb: oklch(0.640 0.190 20);
  --color-booking: oklch(0.430 0.150 245);
  --color-manual: oklch(0.590 0.013 260);
}
```

---

## Ratios de Contraste (WCAG AA)

| Combinaison | Ratio estime | Seuil | Status |
|-------------|-------------|-------|--------|
| Foreground (neutral-900) / Background (neutral-50) | ~12:1 | >= 4.5:1 | Conforme |
| Primary-500 / Background (neutral-50) | ~5.2:1 | >= 4.5:1 | Conforme |
| Body text (neutral-700) / Surface (surface-card) | ~7.5:1 | >= 4.5:1 | Conforme |
| Muted (neutral-500) / Surface (surface-card) | ~4.6:1 | >= 4.5:1 | Conforme |
| Error-700 / Error-100 | ~6.5:1 | >= 4.5:1 | Conforme |
| Success-700 / Success-100 | ~5.8:1 | >= 4.5:1 | Conforme |
| Warning-700 / Warning-100 | ~4.8:1 | >= 4.5:1 | Conforme |
| Airbnb-700 / Airbnb-100 | ~5.5:1 | >= 4.5:1 | Conforme |
| Booking-700 / Booking-100 | ~6.2:1 | >= 4.5:1 | Conforme |

Note : Les ratios sont estimes a partir des valeurs de luminance OKLCH. Verification instrumentale recommandee en D04 (Design Tokens).

---

## Couleur Accent Agence (Neurolia DNA)

Couleur terracotta de l'agence Neurolia, utilisée comme accent secondaire.

| Token | OKLCH | Hex approx. | Usage |
|-------|-------|-------------|-------|
| accent-agency | `oklch(0.58 0.14 35)` | #C45C3B | Barre signature 4px, tab indicator actif |
| accent-agency-light | `oklch(0.68 0.12 35)` | #E07856 | Hover sur éléments accent |
| accent-agency-pale | `oklch(0.92 0.04 35)` | #F5E0D6 | Fond subtil, badge « Neurolia » |

### Règles d'usage
- Surface maximale : < 5% de l'écran visible
- Ne remplace PAS la couleur primaire (blue-slate) pour les CTA, boutons, liens
- Utilisé uniquement pour : barre signature, tab indicator actif, accents décoratifs ponctuels
- Contraste WCAG : ~4.5:1 sur blanc — OK pour éléments décoratifs (accompagnés d'icône + label)
- En dark mode : conserver les mêmes valeurs OKLCH (bonne lisibilité sur fond sombre)

---

*Document genere le 2026-02-20 -- D01-Brand / Colors*
