# D01 Phase 3b : Identite Visuelle

> **Brand & Identity** - Creation des fichiers d'identite visuelle.

## Objectif

Produire 3 fichiers d'identite visuelle adaptes au contexte mobile : personas utilisateurs, palette de couleurs avec etats semantiques, et echelle typographique mobile.

## Input

- `pipeline/output/01-brand/00-platform.md`
- `pipeline/input/assets/` (logo, charte existante)
- Diagnostic Phase 1 (en memoire)

## Fichiers a Produire

### 1. personas.md (Profils Utilisateurs)

```markdown
# Personas

## Persona Principal : [Prenom]

### Profil
- **Age** : [Tranche]
- **Profession** :
- **Situation** :
- **Device principal** : [iPhone / Android / Les deux]
- **Digital literacy** : [Debutant / Intermediaire / Avance]

### Contexte d'Usage
- **Quand** : [Moment de la journee / situation]
- **Ou** : [En deplacement / A la maison / Au travail]
- **Duree session** : [Courte < 2min / Moyenne 2-10min / Longue > 10min]
- **Frequence** : [Quotidien / Hebdomadaire / Ponctuel]

### Probleme
[Quel probleme cherche-t-il a resoudre ?]

### Objectif
[Qu'est-ce qu'il veut accomplir dans l'app ?]

### Freins
[Qu'est-ce qui l'empecherait d'utiliser l'app ?]
- [Frein 1 : ex. complexite]
- [Frein 2 : ex. temps]
- [Frein 3 : ex. confiance]

### Parcours Type
1. Ouvre l'app → [Premier ecran]
2. [Action 1] → [Ecran]
3. [Action 2] → [Ecran]
4. [Objectif atteint] → [Ecran de confirmation]

### Message Cle
[La phrase qui va le convaincre de telecharger/utiliser]

## Persona Secondaire : [Prenom]
[Meme structure si pertinent]
```

### 2. colors.md (Palette de Couleurs)

```markdown
# Palette de Couleurs

## Couleur Primaire
- **Nom** : [Ex: Ocean Blue]
- **HEX** : #[code]
- **OKLCH** : oklch([L] [C] [H])
- **Usage** : CTAs, elements interactifs, accent principal
- **Touch state** : [variante pressed - legere variation de L]

## Couleur Secondaire
- **Nom** : [Ex: Soft Coral]
- **HEX** : #[code]
- **OKLCH** : oklch([L] [C] [H])
- **Usage** : Elements secondaires, badges, tags

## Neutrals

| Role | HEX | OKLCH | Usage |
|------|-----|-------|-------|
| Background | #[code] | oklch([L] [C] [H]) | Fond principal |
| Surface | #[code] | oklch([L] [C] [H]) | Cards, bottom sheets |
| Foreground | #[code] | oklch([L] [C] [H]) | Texte principal |
| Muted | #[code] | oklch([L] [C] [H]) | Texte secondaire |
| Border | #[code] | oklch([L] [C] [H]) | Separateurs, bordures |

## Couleurs Semantiques (Etats App)

| Etat | HEX | OKLCH | Usage |
|------|-----|-------|-------|
| Success | #10b981 | oklch(0.696 0.17 162.48) | Validation, confirmation, check |
| Error | #ef4444 | oklch(0.627 0.257 29.23) | Erreurs, suppressions, alertes critiques |
| Warning | #f59e0b | oklch(0.769 0.188 70.08) | Avertissements, attention requise |
| Info | #3b82f6 | oklch(0.623 0.214 259.15) | Informations, aide, tips |

## Couleurs Interaction

| Etat | Transformation | Exemple |
|------|---------------|---------|
| Default | -- | oklch([L] [C] [H]) |
| Pressed | L - 0.05 | oklch([L-0.05] [C] [H]) |
| Disabled | C * 0.3, L + 0.2 | oklch([L+0.2] [C*0.3] [H]) |
| Focus | ring avec primary | 2px solid var(--primary) |

## Variables CSS (Reference)
```css
:root {
  --color-primary: oklch([L] [C] [H]);
  --color-secondary: oklch([L] [C] [H]);
  --color-background: oklch([L] [C] [H]);
  --color-surface: oklch([L] [C] [H]);
  --color-foreground: oklch([L] [C] [H]);
  --color-muted: oklch([L] [C] [H]);
  --color-border: oklch([L] [C] [H]);
  --color-success: oklch(0.696 0.17 162.48);
  --color-error: oklch(0.627 0.257 29.23);
  --color-warning: oklch(0.769 0.188 70.08);
  --color-info: oklch(0.623 0.214 259.15);
}
```

## Ratios de Contraste (WCAG AA)

| Combinaison | Ratio minimum | Status |
|-------------|--------------|--------|
| Foreground / Background | >= 4.5:1 | [A verifier] |
| Primary / Background | >= 4.5:1 | [A verifier] |
| Foreground / Surface | >= 4.5:1 | [A verifier] |
| Error / Background | >= 4.5:1 | [A verifier] |
```

### 3. typography.md (Typographie Mobile)

```markdown
# Typographie

## Police Principale
- **Nom** : [Inter / SF Pro / Roboto / etc.]
- **Source** : [Google Fonts / System font]
- **Fallback** : system-ui, sans-serif
- **Justification** : [Lisibilite mobile, caractere, coherence avec archetype]

## Police Secondaire (optionnelle)
- **Nom** : [Police display si necessaire]
- **Usage** : Titres principaux uniquement
- **Fallback** : sans-serif

## Echelle de Tailles Mobile

| Element | Taille | Weight | Line-height | Usage |
|---------|--------|--------|-------------|-------|
| Display | clamp(28px, 7vw, 36px) | 700 | 1.1 | Titres hero / onboarding |
| H1 | clamp(24px, 6vw, 32px) | 700 | 1.15 | Titres ecrans |
| H2 | clamp(20px, 5vw, 26px) | 600 | 1.2 | Sous-titres sections |
| H3 | clamp(18px, 4.5vw, 22px) | 600 | 1.3 | Titres cards |
| Body | 16px | 400 | 1.5 | Texte courant |
| Body Small | 14px | 400 | 1.4 | Texte secondaire, descriptions |
| Caption | 12px | 400 | 1.3 | Labels, metadata, timestamps |
| Button | 16px | 600 | 1.0 | Labels de boutons |
| Tab | 12px | 500 | 1.0 | Labels bottom tabs |
| Input | 16px | 400 | 1.5 | Champs de saisie (16px = pas de zoom iOS) |

## Regles

### Minimum absolu
- **Body** : 14px minimum (jamais en dessous)
- **Input** : 16px obligatoire (evite le zoom automatique sur iOS)
- **Caption** : 12px minimum (sous reserve contraste suffisant)

### Viewport cible
- **375px** : iPhone SE / petits Android
- **390px** : iPhone 14 / 15
- **428px** : iPhone 14 Plus / grands Android

### Troncature
- Titres : max 2 lignes, ellipsis au-dela
- Descriptions cards : max 3 lignes
- Labels : 1 ligne, ellipsis

## Variables CSS (Reference)
```css
:root {
  --font-family: '[Font]', system-ui, sans-serif;
  --font-size-display: clamp(1.75rem, 7vw, 2.25rem);
  --font-size-h1: clamp(1.5rem, 6vw, 2rem);
  --font-size-h2: clamp(1.25rem, 5vw, 1.625rem);
  --font-size-h3: clamp(1.125rem, 4.5vw, 1.375rem);
  --font-size-body: 1rem;
  --font-size-small: 0.875rem;
  --font-size-caption: 0.75rem;
  --font-size-button: 1rem;
  --font-size-tab: 0.75rem;
  --font-size-input: 1rem;
}
```
```

## Phase Suivante

→ `D01-brand/04-validation.md` (apres completion de 3a ET 3b)

---

**Version** : 1.0
**Phase** : D01 - Sous-phase 3b/4
