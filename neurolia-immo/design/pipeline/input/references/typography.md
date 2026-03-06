# Typographie — Dashboard Loc Immo

> A02-Brand | Systeme typographique
> Source : `pipeline/output/01-brief/prd.md`

---

## 1. Philosophie

Un dashboard affiche beaucoup de texte : tableaux, listes, labels, chiffres, dates, noms. La typographie doit etre :

- **Lisible** : meme en petite taille (12px), meme sur mobile
- **Dense** : permettre d'afficher beaucoup d'information sans ecraser l'utilisateur
- **Hierarchisee** : les titres, les donnees et les labels se distinguent instantanement
- **Neutre** : la police ne doit pas "avoir de personnalite" — elle s'efface devant le contenu

---

## 2. Police principale

### Inter

| Propriete | Valeur |
|-----------|--------|
| Nom | **Inter** |
| Source | Google Fonts (variable) |
| Type | Sans-serif grotesque |
| Features | Tabular numbers, case-sensitive forms |
| Fallback | `system-ui, -apple-system, 'Segoe UI', sans-serif` |

**Pourquoi Inter :**
- Concue specifiquement pour les interfaces utilisateur
- Excellente lisibilite en petite taille (optimisee pour les ecrans)
- Largeur compacte — affiche plus de texte par ligne qu'une Helvetica
- Chiffres tabulaires natifs (`font-variant-numeric: tabular-nums`) — essentiel pour les tableaux de donnees et les montants
- Support complet des caracteres francais (accents, ligatures)
- Variable font — un seul fichier pour tous les graisses
- Gratuite et open-source

### Import Next.js

```typescript
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})
```

---

## 3. Police mono (chiffres et codes)

### JetBrains Mono (optionnelle)

| Propriete | Valeur |
|-----------|--------|
| Nom | **JetBrains Mono** |
| Source | Google Fonts |
| Type | Monospace |
| Fallback | `'Fira Code', 'Cascadia Code', monospace` |

**Usage** : exclusivement pour les codes d'acces, references de reservation, et identifiants techniques. Pas pour le texte courant.

```typescript
import { JetBrains_Mono } from 'next/font/google'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})
```

**Exemples d'usage :**
- Code d'acces : `4A72B`
- Reference reservation : `HM3X9KN2Z7`
- Code wifi : `MonWifi2024!`

---

## 4. Echelle typographique

Echelle modulaire basee sur un ratio de 1.200 (tierce mineure), adaptee a la densite d'un dashboard.

| Token | Taille (rem) | Taille (px) | Line-height | Poids | Usage |
|-------|-------------|-------------|-------------|-------|-------|
| `text-xs` | 0.75 | 12 | 1.5 (18px) | 400 | Labels tres petits, metadata, horodatage |
| `text-sm` | 0.875 | 14 | 1.5 (21px) | 400 | Labels, texte secondaire, badges |
| `text-base` | 1.0 | 16 | 1.5 (24px) | 400 | Texte courant, contenu de carte |
| `text-lg` | 1.125 | 18 | 1.45 (26px) | 500 | Sous-titres de section |
| `text-xl` | 1.25 | 20 | 1.4 (28px) | 600 | Titres de carte, titres de section |
| `text-2xl` | 1.5 | 24 | 1.35 (32px) | 600 | Titres de page |
| `text-3xl` | 1.875 | 30 | 1.3 (39px) | 700 | Chiffres KPI, valeurs mises en avant |
| `text-4xl` | 2.25 | 36 | 1.25 (45px) | 700 | KPI principal (usage rare) |

### Notes sur l'echelle

- La taille de base est **16px** — standard pour la lisibilite
- Les tailles en dessous de 12px sont interdites (accessibilite)
- Le `line-height` est serre pour les grands titres (1.25) et aere pour le texte courant (1.5)
- Les chiffres KPI (`text-3xl`, `text-4xl`) utilisent le poids 700 pour l'impact visuel

---

## 5. Graisses utilisees

| Poids | Token | Usage |
|-------|-------|-------|
| 400 (Regular) | `font-normal` | Texte courant, labels, descriptions |
| 500 (Medium) | `font-medium` | Sous-titres, elements interactifs (liens, boutons texte) |
| 600 (Semibold) | `font-semibold` | Titres de carte, titres de section, noms de bien |
| 700 (Bold) | `font-bold` | Chiffres KPI, valeurs mises en avant, titres de page majeurs |

Les poids 100, 200, 300, 800, 900 ne sont pas utilises. Cela simplifie le systeme et reduit la taille du fichier variable font.

---

## 6. Styles fonctionnels

### 6.1 Titres

| Contexte | Style |
|----------|-------|
| Titre de page | `text-2xl font-semibold neutral-900` |
| Titre de section | `text-xl font-semibold neutral-800` |
| Titre de carte | `text-lg font-semibold neutral-800` |
| Sous-titre | `text-base font-medium neutral-600` |

### 6.2 Texte courant

| Contexte | Style |
|----------|-------|
| Paragraphe | `text-base font-normal neutral-700` |
| Description, aide | `text-sm font-normal neutral-500` |
| Metadata (date, source) | `text-xs font-normal neutral-400` |

### 6.3 Donnees et tableaux

| Contexte | Style |
|----------|-------|
| En-tete de colonne | `text-xs font-medium neutral-500 uppercase tracking-wide` |
| Cellule texte | `text-sm font-normal neutral-700` |
| Cellule montant | `text-sm font-medium neutral-900 tabular-nums` |
| Cellule date | `text-sm font-normal neutral-600 tabular-nums` |

### 6.4 KPIs

| Contexte | Style |
|----------|-------|
| Valeur KPI principale | `text-3xl font-bold neutral-900 tabular-nums` |
| Label KPI | `text-sm font-medium neutral-500` |
| Variation (+ / -) | `text-sm font-semibold success-600 / error-600` |

### 6.5 Elements d'interface

| Contexte | Style |
|----------|-------|
| Label de formulaire | `text-sm font-medium neutral-700` |
| Input | `text-base font-normal neutral-900` |
| Placeholder | `text-base font-normal neutral-400` |
| Bouton principal | `text-sm font-semibold` (couleur selon variante) |
| Badge | `text-xs font-semibold uppercase tracking-wide` |
| Navigation sidebar | `text-sm font-medium neutral-600` (actif: `primary-600 font-semibold`) |
| Code / identifiant | `font-mono text-sm font-normal` |

---

## 7. Chiffres tabulaires

Les chiffres tabulaires (`tabular-nums`) sont **obligatoires** dans les contextes suivants :

- Tableaux de reservations (dates, montants, nombre de voyageurs)
- KPIs et statistiques
- Calendrier (numeros de jours)
- Montants financiers

```css
.tabular-nums {
  font-variant-numeric: tabular-nums;
}
```

Cela garantit que les colonnes de chiffres sont alignees verticalement, meme quand les valeurs changent dynamiquement.

---

## 8. Responsive

| Breakpoint | Ajustements |
|------------|-------------|
| Mobile (< 640px) | `text-2xl` passe a `text-xl` pour les titres de page. Les KPI passent de `text-3xl` a `text-2xl`. Le texte courant reste a `text-base`. |
| Tablette (640-1024px) | Pas de changement — l'echelle de base fonctionne |
| Desktop (> 1024px) | Echelle standard telle que definie |

---

## 9. Anti-patterns

| A eviter | Pourquoi | Alternative |
|----------|----------|-------------|
| Texte en dessous de 12px | Illisible, non conforme WCAG | Utiliser `text-xs` (12px) minimum |
| Plus de 4 niveaux de taille sur un ecran | Hierarchie confuse | S'en tenir aux tokens definis |
| Gras partout | Perte de hierarchie | Reserver le gras aux titres et KPIs |
| Italique | Peu lisible en petite taille sur ecran | Utiliser la couleur ou le poids pour differencier |
| Majuscules pour du texte courant | Reduit la lisibilite | Reserver les majuscules aux labels de colonne et badges |
| Espacement de lettres sur du texte courant | Ralentit la lecture | Uniquement `tracking-wide` sur les labels `uppercase` |

---

*Document genere le 2026-02-11 — A02-Brand / Typography*

---

## Police Display (Neurolia DNA)

| Propriété | Valeur |
|-----------|--------|
| Famille | Satoshi (Fontshare, licence gratuite) |
| Usage | Titres d'écran (H1) uniquement |
| Poids | 700 (Bold) |
| Fallback | Inter, system-ui, sans-serif |
| Chargement | Font-display: swap |

> **Règle** : Satoshi est réservé aux titres d'écran (H1/screen-title). Tous les autres niveaux (H2, H3, body, etc.) restent en Inter. Le fallback Inter garantit une expérience correcte si Satoshi ne charge pas.
