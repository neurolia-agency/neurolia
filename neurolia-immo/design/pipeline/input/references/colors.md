# Palette de couleurs — Dashboard Loc Immo

> A02-Brand | Systeme de couleurs
> Source : `pipeline/output/01-brief/prd.md`
> Format : OKLCH (Oklch Color Space)

---

## 1. Philosophie

La palette est construite pour un **dashboard applicatif**. Les couleurs neutres dominent l'interface (fonds, textes, bordures). Les couleurs vives sont reservees a deux usages :

1. **Couleurs plateformes** : identifier immediatement la source d'une reservation (Airbnb, Booking, Manuel)
2. **Couleurs semantiques** : communiquer un statut (succes, erreur, alerte, info)

Le reste de l'interface est volontairement sobre pour ne pas concurrencer visuellement les donnees.

---

## 2. Couleurs neutres (base de l'interface)

Echelle de gris neutre-froid, base de toute l'interface.

| Token | OKLCH | Usage |
|-------|-------|-------|
| `neutral-50` | `oklch(0.985 0.002 260)` | Fond de page principal |
| `neutral-100` | `oklch(0.965 0.003 260)` | Fond de carte, fond secondaire |
| `neutral-150` | `oklch(0.940 0.004 260)` | Fond de zone hover |
| `neutral-200` | `oklch(0.900 0.005 260)` | Bordures legeres, separateurs |
| `neutral-300` | `oklch(0.830 0.007 260)` | Bordures visibles, icones inactives |
| `neutral-400` | `oklch(0.710 0.010 260)` | Texte desactive, placeholder |
| `neutral-500` | `oklch(0.590 0.013 260)` | Texte secondaire, labels |
| `neutral-600` | `oklch(0.490 0.015 260)` | Texte courant secondaire |
| `neutral-700` | `oklch(0.390 0.015 260)` | Texte courant |
| `neutral-800` | `oklch(0.300 0.015 260)` | Texte important, titres |
| `neutral-900` | `oklch(0.210 0.015 260)` | Texte principal, titres forts |
| `neutral-950` | `oklch(0.150 0.015 260)` | Texte maximal (rare) |

### Fond et surface

| Token | OKLCH | Usage |
|-------|-------|-------|
| `surface-page` | `oklch(0.985 0.002 260)` | Fond global de la page |
| `surface-card` | `oklch(0.998 0.000 0)` | Fond des cartes et panneaux (blanc) |
| `surface-elevated` | `oklch(0.998 0.000 0)` | Modales, dropdowns (blanc + shadow) |
| `surface-sunken` | `oklch(0.955 0.004 260)` | Zones en retrait, inputs |

---

## 3. Couleur principale de l'application

Couleur d'accent neutre pour les elements interactifs (boutons principaux, liens, focus). Un bleu-ardoise discret, qui ne rentre pas en conflit avec les couleurs plateformes.

| Token | OKLCH | Usage |
|-------|-------|-------|
| `primary-50` | `oklch(0.970 0.010 250)` | Fond tres leger |
| `primary-100` | `oklch(0.930 0.025 250)` | Fond de badge, fond hover |
| `primary-200` | `oklch(0.870 0.045 250)` | Fond de selection legere |
| `primary-300` | `oklch(0.780 0.070 250)` | Icones actives legeres |
| `primary-400` | `oklch(0.680 0.095 250)` | Liens hover |
| `primary-500` | `oklch(0.580 0.115 250)` | Couleur d'accent principale — boutons, liens |
| `primary-600` | `oklch(0.500 0.115 250)` | Bouton hover |
| `primary-700` | `oklch(0.420 0.110 250)` | Bouton pressed |
| `primary-800` | `oklch(0.340 0.090 250)` | Texte sur fond clair |
| `primary-900` | `oklch(0.270 0.070 250)` | Texte fort sur fond clair |

---

## 4. Couleurs plateformes

Couleurs fixes, derivees des identites visuelles d'Airbnb et Booking.com. Utilisees pour les badges, les barres de calendrier, et les indicateurs de source.

### 4.1 Airbnb

Origine HEX : `#FF5A5F`

| Token | OKLCH | Usage |
|-------|-------|-------|
| `airbnb-50` | `oklch(0.970 0.015 20)` | Fond tres leger |
| `airbnb-100` | `oklch(0.930 0.040 20)` | Fond de badge |
| `airbnb-200` | `oklch(0.860 0.080 20)` | Fond de barre calendrier |
| `airbnb-400` | `oklch(0.720 0.150 20)` | Texte sur fond clair |
| `airbnb-500` | `oklch(0.640 0.190 20)` | Couleur principale Airbnb — badge, point, barre |
| `airbnb-600` | `oklch(0.560 0.180 20)` | Hover / accentue |
| `airbnb-700` | `oklch(0.470 0.150 20)` | Texte fort |

### 4.2 Booking.com

Origine HEX : `#003580`

| Token | OKLCH | Usage |
|-------|-------|-------|
| `booking-50` | `oklch(0.970 0.012 245)` | Fond tres leger |
| `booking-100` | `oklch(0.920 0.035 245)` | Fond de badge |
| `booking-200` | `oklch(0.850 0.065 245)` | Fond de barre calendrier |
| `booking-400` | `oklch(0.600 0.120 245)` | Texte sur fond clair |
| `booking-500` | `oklch(0.430 0.150 245)` | Couleur principale Booking — badge, point, barre |
| `booking-600` | `oklch(0.360 0.140 245)` | Hover / accentue |
| `booking-700` | `oklch(0.290 0.120 245)` | Texte fort |

### 4.3 Manuel (saisie manuelle)

| Token | OKLCH | Usage |
|-------|-------|-------|
| `manual-50` | `oklch(0.970 0.003 260)` | Fond tres leger |
| `manual-100` | `oklch(0.930 0.005 260)` | Fond de badge |
| `manual-500` | `oklch(0.590 0.013 260)` | Couleur principale Manuel — gris neutre |
| `manual-600` | `oklch(0.490 0.015 260)` | Hover |
| `manual-700` | `oklch(0.390 0.015 260)` | Texte fort |

---

## 5. Couleurs semantiques

Utilisees pour les statuts, les messages de feedback, et les alertes.

### 5.1 Succes (vert)

| Token | OKLCH | Usage |
|-------|-------|-------|
| `success-50` | `oklch(0.970 0.025 155)` | Fond notification succes |
| `success-100` | `oklch(0.930 0.055 155)` | Fond de badge "confirme" |
| `success-500` | `oklch(0.650 0.170 155)` | Icone, texte succes, badge "confirme" |
| `success-600` | `oklch(0.560 0.155 155)` | Texte hover |
| `success-700` | `oklch(0.460 0.130 155)` | Texte fort sur fond clair |

**Usages** : statut "confirme", menage termine, synchronisation OK

### 5.2 Alerte (jaune-ambre)

| Token | OKLCH | Usage |
|-------|-------|-------|
| `warning-50` | `oklch(0.975 0.030 85)` | Fond notification alerte |
| `warning-100` | `oklch(0.940 0.070 85)` | Fond de badge "en attente" |
| `warning-500` | `oklch(0.770 0.170 75)` | Icone, texte alerte, badge "en attente" |
| `warning-600` | `oklch(0.680 0.160 70)` | Texte hover |
| `warning-700` | `oklch(0.550 0.130 60)` | Texte fort sur fond clair |

**Usages** : statut "en attente d'info", anomalie iCal, reservation incomplete

### 5.3 Erreur / Danger (rouge)

| Token | OKLCH | Usage |
|-------|-------|-------|
| `error-50` | `oklch(0.970 0.015 25)` | Fond notification erreur |
| `error-100` | `oklch(0.930 0.045 25)` | Fond de badge "annule" |
| `error-500` | `oklch(0.580 0.200 25)` | Icone, texte erreur, badge "annule" |
| `error-600` | `oklch(0.500 0.185 25)` | Texte hover |
| `error-700` | `oklch(0.410 0.150 25)` | Texte fort sur fond clair |

**Usages** : statut "annule", erreur de formulaire, echec de synchronisation, suppression

### 5.4 Info (bleu)

| Token | OKLCH | Usage |
|-------|-------|-------|
| `info-50` | `oklch(0.970 0.015 240)` | Fond notification info |
| `info-100` | `oklch(0.930 0.040 240)` | Fond de badge info |
| `info-500` | `oklch(0.580 0.140 240)` | Icone, texte info |
| `info-600` | `oklch(0.500 0.130 240)` | Texte hover |
| `info-700` | `oklch(0.410 0.110 240)` | Texte fort sur fond clair |

**Usages** : nouvelles reservations, informations contextuelles, aide

---

## 6. Regles d'application

### 6.1 Contraste et accessibilite

- Texte courant (`neutral-700` ou plus fonce) sur fond clair : ratio minimum **4.5:1** (WCAG AA)
- Texte large/titre (`neutral-800`+) sur fond clair : ratio minimum **3:1**
- Texte sur fond colore (badges) : toujours verifier le contraste avec le token `-700` sur le fond `-100`
- Les couleurs plateformes `-500` ne sont PAS utilisees comme fond de texte — uniquement en points, barres, et badges avec fond clair

### 6.2 Mode sombre

Non prevu en Phase 1 (MVP). La palette neutre froide a ete choisie pour faciliter une future inversion si necessaire.

### 6.3 Principes de hierarchie

| Niveau | Couleur |
|--------|---------|
| Fond de page | `surface-page` (gris tres clair) |
| Cartes et panneaux | `surface-card` (blanc) |
| Texte principal | `neutral-900` |
| Texte secondaire | `neutral-500` |
| Bordures | `neutral-200` |
| Actions principales | `primary-500` |
| Identite plateforme | `airbnb-500`, `booking-500`, `manual-500` |
| Statuts | `success-500`, `warning-500`, `error-500` |

---

## 7. Resume visuel des couleurs plateformes

```
Airbnb    ████  oklch(0.640 0.190 20)    Rose/Rouge
Booking   ████  oklch(0.430 0.150 245)   Bleu fonce
Manuel    ████  oklch(0.590 0.013 260)   Gris
```

## 8. Resume visuel des couleurs de statut

```
Confirme   ████  oklch(0.650 0.170 155)  Vert
En attente ████  oklch(0.770 0.170 75)   Jaune/Ambre
Annule     ████  oklch(0.580 0.200 25)   Rouge
Info       ████  oklch(0.580 0.140 240)  Bleu
```

---

*Document genere le 2026-02-11 — A02-Brand / Colors*

---

## Accent Agence (Neurolia DNA)

Couleur signature de l'agence Neurolia, utilisée comme accent secondaire pour marquer l'appartenance à l'écosystème Neurolia.

| Token | Valeur OKLCH | Usage |
|-------|-------------|-------|
| accent-agency | `oklch(0.58 0.14 35)` | Barre signature, tab indicator actif, accents ponctuels |
| accent-agency-light | `oklch(0.68 0.12 35)` | Hover sur éléments accent |
| accent-agency-pale | `oklch(0.92 0.04 35)` | Fond subtil, badge, chip |

> **Règle** : L'accent agence ne remplace PAS la couleur primaire (blue-slate). Il est utilisé uniquement pour les marqueurs d'identité Neurolia (barre signature, tab indicator, accents décoratifs). Surface maximale : < 5%.
