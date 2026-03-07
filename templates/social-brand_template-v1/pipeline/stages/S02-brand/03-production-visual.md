# Phase 3b — Identite visuelle & Personas

> Sous-etape de [S02-brand.md](S02-brand.md)
> Pre-requis : `output/01-brand/00-platform.md` (Phase 2)

Ces fichiers combinent des **decisions creatives visuelles** (selection, naming, intention) et des **donnees personas enrichies pour le social media**. Ils ne necessitent pas `/brand-expression` mais impliquent des decisions creatives ancrees dans l'archetype et les valeurs.

> **Derivation tracable** : Chaque fichier inclut un commentaire `<!-- Derive de : 00-platform.md > [Composant(s)] -->` en tete.

---

## 1. personas.md (Cible + Comportement Social)

> **Important** : Les personas doivent inclure un **scenario narratif** (micro-histoire) et une section **Comportement Social** qui decrit comment le persona interagit avec les reseaux sociaux.

```markdown
# Personas

<!-- Derive de : 00-platform.md > Insight (tension ressentie), Values (ce qui resonne) -->

## Persona Principal : [Prenom]

### Profil
- **Age** : [Tranche]
- **Profession** : [Metier / situation]
- **Situation** : [Contexte de vie pertinent]

### Scenario
[3-4 phrases qui racontent une micro-histoire : la situation concrete dans laquelle cette personne se retrouve, ce qu'elle fait, ce qu'elle ressent, comment elle decouvre la marque.]

### Probleme
[Quel probleme cherche-t-il a resoudre ?]

### Objectif
[Qu'est-ce qu'il veut accomplir ?]

### Freins
- [Frein 1 — avec contexte]
- [Frein 2]
- [Frein 3]

### Message Cle
"[La phrase qui va le convaincre — doit sonner vrai, pas marketing]"

### Comportement Social
- **Plateforme principale** : [Instagram / TikTok / Facebook / LinkedIn]
- **Temps de consultation** : [Ex: 30 min/jour, surtout le soir]
- **Contenu consomme** : [Ex: reels food, stories lifestyle, carousels info]
- **Mode d'interaction** : [Ex: like silencieux, partage en DM, commente rarement]
- **Ce qui le fait s'arreter de scroller** : [Ex: photo appetissante, stat surprenante, transformation visible]
- **Ce qui le fait fuir** : [Ex: contenu trop publicitaire, stock photos, texte trop long]

---

## Persona Secondaire : [Prenom]
[Meme structure complete avec Comportement Social]
```

---

## 2. design-system.md (Couleurs + Typographies + Application Social Media)

> Fusion de `colors.md` et `typography.md` du template v2. Toutes les couleurs en **HEX uniquement** (pas d'OKLCH — compatibilite Canva/Figma/CapCut). Pas de variables CSS ni d'import HTML.

> **Si identite existante** : Partir des couleurs documentees dans 00-brief.md et construire le systeme autour d'elles.

### Process de selection creative (avant de remplir le template)

**Couleurs :**
1. Explorer 2-3 strategies de palette : analogique, complementaire, split-complementary
2. Evaluer contre l'archetype et l'atmosphere de 00-platform.md
3. Nommer les couleurs (noms evocateurs coherents avec l'univers de marque)
4. Justifier le choix dans "Harmonie Colorimetrique"

**Typographies :**
1. Identifier 2-3 pairings candidats (heading + body) — Google Fonts prefere
2. Evaluer contre l'archetype (feeling, lisibilite mobile, contraste hierarchique)
3. Justifier le choix du pairing retenu

```markdown
# Design System

<!-- Derive de : 00-platform.md > Archetype (atmosphere, personnalite visuelle), Values (symbolique) -->

## Couleurs

### Couleur Primaire
- **Nom** : [Nom evocateur — ex: "Or Miel", "Terracotta"]
- **HEX** : #[code]
- **Usage** : [Role dans les visuels]

### Variantes primaire
- **[Nom] clair** : #[hex] — [Usage : hover, highlights]
- **[Nom] fonce** : #[hex] — [Usage : texte sur fond clair]
- **[Nom] pale** : #[hex] — [Usage : backgrounds subtils]

### Couleur Secondaire
- **Nom** : [Nom evocateur]
- **HEX** : #[code]
- **Usage** : [Role]

### Variantes secondaire
- **[Nom] clair** : #[hex] — [Usage]
- **[Nom] fonce** : #[hex] — [Usage]

### Couleur d'Accent (si applicable)
- **Nom** : [Nom evocateur]
- **HEX** : #[code]
- **Usage** : [Role — ex: CTA, highlight, badge]

### Neutrals

| Nom | HEX | Usage |
|-----|-----|-------|
| [Nom] | #[hex] | Background principal |
| [Nom] | #[hex] | Background alternatif |
| [Nom] | #[hex] | Texte principal |
| [Nom] | #[hex] | Texte secondaire |
| [Nom] | #[hex] | Bordures, separateurs |

### Harmonie Colorimetrique
> Justifier le choix : complementaire, analogique, split-complementary, etc.
[Explication du systeme]

### Notes d'Usage Couleurs
- [Note 1 — quand utiliser quelle couleur]
- [Note 2 — contraste minimum pour lisibilite mobile]
- [Note 3 — couleur(s) jamais utilisee(s) en isolation]

---

## Typographies

### Police Principale (Titres)
- **Nom** : [Police]
- **Source** : [Google Fonts / Adobe / locale]
- **Weights** : [400, 500, 600, 700...]
- **Usage** : [Titres, headings, elements d'emphase]
- **Feeling** : [Adjectifs qui decrivent l'impression]

### Police Secondaire (Corps)
- **Nom** : [Police]
- **Source** : [Google Fonts / systeme]
- **Weights** : [300, 400, 500, 600...]
- **Usage** : [Body text, captions, descriptions]
- **Feeling** : [Adjectifs]

### Police Display (optionnel)
- **Nom** : [Police]
- **Usage** : [Accroches, titres principaux si different de heading]

### Echelle de Tailles (reference)

| Element | Taille | Weight | Usage |
|---------|--------|--------|-------|
| Titre principal | [px] | [wt] | Headlines de posts, couvertures carousel |
| Sous-titre | [px] | [wt] | Slides carousel, sections |
| Corps | [px] | [wt] | Texte courant sur visuels |
| Caption | [px] | [wt] | Petits textes, credits, hashtags |

### Justification du Pairing
[Pourquoi CE pairing incarne l'archetype — contraste hierarchique, coherence atmospherique]

### Notes d'Usage Typo
- [Note 1 — taille minimum pour lisibilite stories/reels]
- [Note 2 — quand utiliser quelle police]
- [Note 3 — contraste hierarchique entre heading et body]

---

## Application Social Media

> Guidelines specifiques pour l'application des couleurs et typos sur les contenus social media.

### Contraste Mobile
- **Taille minimum texte** : [Ex: 24px sur visuels, 14px sur carousel]
- **Contraste fond/texte** : [Ex: ratio 4.5:1 minimum — WCAG AA]
- **Zone safe stories/reels** : [Ex: eviter texte dans les 15% haut et bas]

### Templates Grille Instagram
- **Feed** : [Ex: alternance photo/graphique, palette coherente]
- **Highlights** : [Ex: icones en couleur primaire sur fond neutre]
- **Stories** : [Ex: fond couleur primaire ou photo + overlay]

### Usage par Format

| Format | Fond | Texte | Couleur accent | Police |
|--------|------|-------|---------------|--------|
| Feed photo | [transparent/overlay] | [couleur] | [usage] | [police] |
| Carousel | [couleur fond] | [couleur] | [slides accent] | [police] |
| Story | [couleur/photo] | [couleur] | [boutons/stickers] | [police] |
| Reel cover | [couleur fond] | [couleur] | [titre] | [police] |
| LinkedIn | [couleur fond] | [couleur] | [accent] | [police] |
```
