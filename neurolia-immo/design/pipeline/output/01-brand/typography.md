# Typographie

> D01-Brand | Phase 3b : Echelle typographique mobile (min 14px body)
> Source : 00-platform.md, references/typography.md (v1)

---

## Police Principale

- **Nom** : Inter
- **Source** : Google Fonts (variable font)
- **Type** : Sans-serif grotesque
- **Fallback** : system-ui, -apple-system, 'Segoe UI', sans-serif
- **Features** : Tabular numbers (`font-variant-numeric: tabular-nums`), case-sensitive forms
- **Justification** : Concue pour les interfaces, excellente lisibilite en petite taille sur ecran mobile. Largeur compacte pour maximiser l'information affichee. Chiffres tabulaires natifs essentiels pour un dashboard (montants, dates, KPIs). Variable font = un seul fichier pour tous les graisses. Support complet du francais. Coherente avec l'archetype Souverain : precise, professionnelle, sans fioriture.

### Import Next.js

```typescript
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})
```

## Police Secondaire (Mono)

- **Nom** : JetBrains Mono
- **Source** : Google Fonts
- **Type** : Monospace
- **Usage** : Codes d'acces, references de reservation, identifiants techniques, mots de passe WiFi
- **Fallback** : 'Fira Code', 'Cascadia Code', monospace
- **Justification** : Distinction visuelle claire pour les donnees copiables (codes d'acces devant la porte). Lisibilite optimale des caracteres ambigus (0/O, 1/l).

### Import Next.js

```typescript
import { JetBrains_Mono } from 'next/font/google'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})
```

---

## Echelle de Tailles Mobile

L'echelle est concue pour des viewports de 375px a 428px. Le body minimum est 14px (jamais en dessous). Les inputs restent a 16px pour eviter le zoom automatique iOS.

| Element | Taille | Weight | Line-height | Usage |
|---------|--------|--------|-------------|-------|
| Display | clamp(28px, 7vw, 36px) | 700 | 1.1 | Titres hero, onboarding, splash |
| H1 | clamp(24px, 6vw, 32px) | 700 | 1.15 | Titres d'ecrans principaux |
| H2 | clamp(20px, 5vw, 26px) | 600 | 1.2 | Sous-titres de sections, titres de blocs Dashboard |
| H3 | clamp(18px, 4.5vw, 22px) | 600 | 1.3 | Titres de cards, noms de biens |
| Body | 16px | 400 | 1.5 | Texte courant, contenu de carte, descriptions |
| Body Small | 14px | 400 | 1.4 | Texte secondaire, descriptions courtes, adresses |
| Caption | 12px | 400 | 1.3 | Labels, metadata, timestamps, references |
| Button | 16px | 600 | 1.0 | Labels de boutons taille lg (mobile) |
| Button SM | 14px | 600 | 1.0 | Labels de boutons taille md |
| Tab | 12px | 500 | 1.0 | Labels bottom tabs |
| Input | 16px | 400 | 1.5 | Champs de saisie (16px = pas de zoom iOS) |
| KPI Value | clamp(24px, 6vw, 30px) | 700 | 1.2 | Valeurs KPI sur mobile |
| KPI Value (desktop) | clamp(30px, 5vw, 36px) | 700 | 1.25 | Valeurs KPI sur desktop |
| Code | 14px | 400 | 1.3 | Codes d'acces, references, WiFi (JetBrains Mono) |

---

## Regles

### Minimum absolu

- **Body** : 14px minimum (jamais en dessous pour du texte informatif)
- **Input** : 16px obligatoire (evite le zoom automatique sur iOS Safari)
- **Caption** : 12px minimum (uniquement pour metadata non-critique, sous reserve de contraste suffisant)
- **Aucun texte** en dessous de 12px dans l'application

### Viewport cible

- **375px** : iPhone SE / petits Android (viewport de reference pour le design mobile-first)
- **390px** : iPhone 14 / 15 (viewport le plus courant)
- **428px** : iPhone 14 Plus / grands Android

### Troncature

- **Titres** : max 2 lignes, ellipsis au-dela (`line-clamp: 2`)
- **Descriptions cards** : max 3 lignes (`line-clamp: 3`)
- **Labels / noms dans tables** : 1 ligne, `text-overflow: ellipsis`, tooltip au hover
- **Adresses** : 1 ligne, ellipsis, tap pour voir en entier
- **Barres calendrier** : 1 ligne, ellipsis, tooltip au hover

### Graisses utilisees

| Poids | Token | Usage |
|-------|-------|-------|
| 400 (Regular) | `font-normal` | Texte courant, labels, descriptions, inputs |
| 500 (Medium) | `font-medium` | Sous-titres, elements interactifs, labels de formulaire |
| 600 (Semibold) | `font-semibold` | Titres de carte, titres de section, noms de biens, boutons |
| 700 (Bold) | `font-bold` | Chiffres KPI, valeurs mises en avant, titres d'ecrans majeurs |

Les poids 100, 200, 300, 800, 900 ne sont pas utilises.

### Chiffres tabulaires

`font-variant-numeric: tabular-nums` obligatoire dans :
- Tableaux de reservations (dates, montants, nombre de voyageurs)
- KPIs et statistiques
- Calendrier (numeros de jours)
- Montants financiers
- Horodatages

---

## Styles Fonctionnels Mobile

### Titres

| Contexte | Style |
|----------|-------|
| Titre d'ecran | H1 : `clamp(24px, 6vw, 32px) font-bold neutral-900` |
| Titre de section (Dashboard bloc) | H2 : `clamp(20px, 5vw, 26px) font-semibold neutral-800` |
| Titre de card / nom de bien | H3 : `clamp(18px, 4.5vw, 22px) font-semibold neutral-800` |
| Sous-titre | Body : `16px font-medium neutral-600` |

### Texte courant

| Contexte | Style |
|----------|-------|
| Paragraphe | Body : `16px font-normal neutral-700` |
| Description, aide | Body Small : `14px font-normal neutral-500` |
| Metadata (date, source) | Caption : `12px font-normal neutral-400` |

### Donnees et listes

| Contexte | Style |
|----------|-------|
| En-tete de liste / section | Caption : `12px font-medium neutral-500 uppercase tracking-wide` |
| Item de liste (texte) | Body Small : `14px font-normal neutral-700` |
| Item de liste (montant) | Body Small : `14px font-medium neutral-900 tabular-nums` |
| Item de liste (date) | Body Small : `14px font-normal neutral-600 tabular-nums` |

### KPIs (mobile)

| Contexte | Style |
|----------|-------|
| Valeur KPI | `clamp(24px, 6vw, 30px) font-bold neutral-900 tabular-nums` |
| Label KPI | `14px font-medium neutral-500` |
| Variation (+/-) | `14px font-semibold success-600 / error-600` |

### Elements d'interface

| Contexte | Style |
|----------|-------|
| Label de formulaire | `14px font-medium neutral-700` |
| Input / Textarea | `16px font-normal neutral-900` |
| Placeholder | `16px font-normal neutral-400` |
| Bouton principal (mobile) | `16px font-semibold` (taille lg, 44px hauteur) |
| Badge | `12px font-semibold uppercase tracking-wide` |
| Code (acces, WiFi, reference) | `14px font-normal font-mono neutral-800` sur fond `neutral-100` |
| Bottom tab label | `12px font-medium` |
| Toast titre | `14px font-semibold neutral-900` |
| Toast description | `14px font-normal neutral-600` |

---

## Variables CSS (Reference)

```css
:root {
  /* Font families */
  --font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;

  /* Font sizes */
  --font-size-display: clamp(1.75rem, 7vw, 2.25rem);
  --font-size-h1: clamp(1.5rem, 6vw, 2rem);
  --font-size-h2: clamp(1.25rem, 5vw, 1.625rem);
  --font-size-h3: clamp(1.125rem, 4.5vw, 1.375rem);
  --font-size-body: 1rem;
  --font-size-small: 0.875rem;
  --font-size-caption: 0.75rem;
  --font-size-button: 1rem;
  --font-size-button-sm: 0.875rem;
  --font-size-tab: 0.75rem;
  --font-size-input: 1rem;
  --font-size-kpi-mobile: clamp(1.5rem, 6vw, 1.875rem);
  --font-size-kpi-desktop: clamp(1.875rem, 5vw, 2.25rem);
  --font-size-code: 0.875rem;
}
```

---

## Responsive

| Breakpoint | Ajustements |
|------------|-------------|
| Mobile (< 640px) | Echelle telle que definie (reference mobile-first). KPIs en `kpi-mobile`. Body = 16px. |
| Tablette (640-1024px) | Pas de changement. L'echelle de base fonctionne. |
| Desktop (> 1024px) | KPIs passent a `kpi-desktop`. Les `clamp()` atteignent leur valeur maximale. |

---

## Anti-patterns

| A eviter | Pourquoi | Alternative |
|----------|----------|-------------|
| Texte en dessous de 12px | Illisible sur mobile, non conforme WCAG | Utiliser Caption (12px) minimum |
| Body en dessous de 14px | Illisible pour le persona staff sur le terrain | Body Small (14px) est le minimum pour du texte informatif |
| Input en dessous de 16px | Zoom automatique iOS Safari | Toujours 16px pour les inputs |
| Plus de 4 niveaux de taille sur un ecran | Hierarchie confuse | S'en tenir aux tokens definis |
| Gras partout | Perte de hierarchie | Reserver le gras aux titres et KPIs |
| Italique | Peu lisible en petite taille sur mobile | Utiliser couleur ou poids pour differencier |
| Majuscules sur du texte courant | Reduit la lisibilite | Reserver les majuscules aux labels et badges |

---

## Police Display (Neurolia DNA)

| Propriété | Valeur |
|-----------|--------|
| Famille | Satoshi (Fontshare) |
| Usage | Titres d'écran (H1 / screen-title) uniquement |
| Poids | 700 (Bold) |
| Taille | `clamp(24px, 6vw, 32px)` (identique au screen-title existant) |
| Line-height | 1.15 (tight) |
| Fallback | `'Inter', system-ui, sans-serif` |
| Chargement | `font-display: swap` |

### Justification
Satoshi est la police display de neurolia-site. Son utilisation en H1 dans neurolia-immo crée un lien visuel immédiat avec l'écosystème Neurolia, sans impacter la lisibilité des données (corps en Inter).

### Règle stricte
Satoshi est **exclusivement** réservé aux titres d'écran (H1). Tous les autres niveaux typographiques restent en Inter.

---

*Document genere le 2026-02-20 -- D01-Brand / Typography*
