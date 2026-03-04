# Brand Expression

> Méthodologie créative professionnelle pour la production d'éléments d'expression de marque.

**Version** : 1.0
**Invocation** : `/brand-expression [scope]`
**Scopes** : `full` (défaut) | `tagline` | `tone` | `messaging`

---

## Purpose

Ce skill applique des méthodologies de branding professionnel (Brand Ladder, language library, spectrum mapping) pour produire des éléments d'expression de marque de qualité supérieure — taglines, slogans, baselines, ton de voix, messages par section.

**Pourquoi un skill dédié ?** L'expression de marque est un travail **créatif** qui nécessite un processus itératif structuré. Sans méthodologie, l'IA produit du copy "safe" — fonctionnel mais générique et interchangeable. Ce skill force un processus divergent→convergent avec des critères d'évaluation explicites.

## Prérequis

> **OBLIGATOIRE** : La plateforme de marque (`output/01-brand/00-platform.md`) doit exister AVANT d'invoquer ce skill.
> Le skill s'appuie sur : Insight, Purpose, Vision, Mission, Values, Archetype, Promise, Proof Points.

Si `00-platform.md` n'existe pas :
1. Arrêter l'exécution du skill
2. Informer l'utilisateur qu'il faut d'abord compléter la Phase 2 du stage A02-Brand
3. Proposer de lancer la Phase 2

### Inputs attendus

| Input | Source | Usage |
|-------|--------|-------|
| Plateforme de marque | `output/01-brand/00-platform.md` | Fondation stratégique |
| Brief structuré | `output/00-brief.md` | Contexte client, offre, concurrence |
| Pages du site | Section "Pages" de 00-brief.md | Messages par section |

---

## Process Créatif

### Vue d'ensemble

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  1. NOURRIR │ ──→ │  2. DIVERGER│ ──→ │  3. ÉVALUER │
│  (Platform) │     │  (Variantes)│     │  (Scoring)  │
└─────────────┘     └─────────────┘     └──────┬──────┘
                                               │
                                        ┌──────▼──────┐
                                        │  4. CHOISIR │
                                        │  (Justifier)│
                                        └──────┬──────┘
                                               │
                                        ┌──────▼──────┐
                                        │  5. RAFFINER│
                                        │  (Polish)   │
                                        └─────────────┘
```

### Étape 1 — Nourrir

Avant de produire quoi que ce soit :

1. **Lire** `00-platform.md` — extraire :
   - L'Insight/Tension fondatrice (point de départ créatif)
   - L'Archétype jungien (guide le ton)
   - Les Values avec leurs implications
   - La Promise (ce qu'on distille en tagline)
   - Les Proof Points (ancrage factuel)

2. **Construire la Language Library** :
   - Extraire 20-30 mots-clés depuis la plateforme
   - Classer par registre : émotionnel / factuel / sensoriel / aspirationnel
   - Identifier les **mots interdits** (ceux qui appartiennent à la concurrence ou au générique du secteur)

3. **Identifier le territoire d'expression** :
   - Quel est le registre de l'archétype ? (ex: Caregiver = chaleur, proximité, réconfort)
   - Quelle est la tension créative ? (ex: galerie marchande froide vs. lieu chaleureux)
   - Quel contraste peut servir de levier ? (ex: industriel vs. artisanal)

### Étape 2 — Diverger

Pour chaque élément créatif majeur, générer **au minimum 8 variantes** en variant systématiquement les angles :

| Angle | Description | Exemple (restaurant galerie) |
|-------|-------------|------------------------------|
| Émotionnel | Touche le ressenti | "Le moment où la galerie s'efface" |
| Factuel | Ancré dans le concret | "Cuisine minute, service à table, sourire en plus" |
| Sensoriel | Évoque les sens | "L'odeur du vrai, au milieu du plastique" |
| Provocant | Crée une tension | "La galerie marchande s'arrête ici." |
| Poétique | Rythme et image | "Entre deux vitrines, une table dressée pour toi" |
| Minimaliste | Ultra-court, percutant | "Du vrai." |
| Narratif | Raconte une micro-histoire | "Il y a ceux qui passent. Et ceux qui s'arrêtent." |
| Aspirationnel | Projette un idéal | "Le restaurant qui manquait à ta pause" |

**Règles de divergence :**
- Pas d'autocensure à cette étape — quantité > qualité
- Au moins 2 variantes doivent être "risquées" (provocantes, poétiques, ou minimalistes)
- Interdiction de reformuler la même idée avec des mots différents — chaque variante = un angle distinct

### Étape 3 — Évaluer

Scorer chaque variante (1-5) sur 4 critères :

| Critère | Score 5 | Score 1 |
|---------|---------|---------|
| **Spécificité** | Seul CE client peut l'utiliser | N'importe qui dans le secteur |
| **Mémorabilité** | Reste en tête 30 secondes après | Oubliée immédiatement |
| **Émotion** | Provoque un ressenti (surprise, chaleur, fierté) | Neutre, informatif |
| **Cohérence ADN** | Alignée avec archétype + values + promise | Décalée du positionnement |

**Scoring minimum** : Score total ≥ 16/20 pour être retenu.

Présenter sous forme de tableau :

```markdown
| # | Variante | Spéc. | Mém. | Émo. | ADN | Total | Notes |
|---|----------|-------|------|------|-----|-------|-------|
| 1 | "..." | 4 | 5 | 4 | 5 | 18 | Fort contraste |
| 2 | "..." | 2 | 3 | 3 | 4 | 12 | Trop générique |
```

### Étape 4 — Choisir

1. Retenir les **top 3** variantes (score ≥ 16)
2. Pour chaque finaliste, tester :
   - **Test d'interchangeabilité** : Remplacer le nom du client par un concurrent — la phrase fonctionne encore ? → Éliminer.
   - **Test du "Et alors ?"** : Lire la phrase à voix haute. Si la réaction naturelle est "et alors ?", elle manque de tension → Éliminer.
   - **Test de l'archétype** : La phrase pourrait-elle être dite par le personnage incarnant l'archétype ? → Garder.
3. Choisir la variante finale. Justifier en 1 ligne.

### Étape 5 — Raffiner

Une fois l'idée choisie :
1. **Rythme** — Tester des variations de longueur et de ponctuation
2. **Musicalité** — Lire à voix haute (allitérations, assonances, rythme ternaire)
3. **Précision** — Chaque mot a-t-il sa place ? Supprimer le superflu
4. **Registre** — Vérifier la cohérence avec le ton défini par l'archétype

---

## Scope : Tagline (`/brand-expression tagline`)

Applique le Brand Ladder pour construire la tagline principale.

> **Référence détaillée** : `references/tagline-methodology.md`

**Résumé du process :**
1. Brand Ladder : Feature → Functional Benefit → Emotional Benefit → Core Value
2. Language Library : banque de 20-30 mots depuis la plateforme
3. Diverger : 8+ variantes sur 8 angles
4. Évaluer : scoring 4 critères
5. Choisir : top 3 → tests d'élimination → choix final
6. Décliner : Baseline (développe la tagline) + Slogan (version mémorable/rythmée)

**Outputs** : tagline, baseline, slogan → dans `positioning.md` et `about.md`

---

## Scope : Tone (`/brand-expression tone`)

Construit le système de ton de voix.

> **Référence détaillée** : `references/tone-of-voice.md`

**Résumé du process :**
1. Spectrum mapping : positionner sur 4+ axes (formel↔informel, sérieux↔ludique, etc.)
2. Dériver le registre depuis l'archétype
3. Construire le champ lexical : mots à utiliser + mots interdits
4. Définir la personnalité : 3-4 traits avec exemples ancrés
5. Produire exemples : 4+ phrases "Bien" + 3+ phrases "À éviter" en situations réelles

**Output** : `tone.md`

---

## Scope : Messaging (`/brand-expression messaging`)

Produit les messages contextuels par section.

> **Référence détaillée** : `references/messaging-craft.md`

**Résumé du process :**
1. Mapper chaque page/section à un composant de la plateforme (Insight → Hero, Values → À propos, etc.)
2. Formuler un message par section (dérivé de la plateforme, pas inventé)
3. Créer les CTAs contextuels (verbe d'action spécifique, pas "Découvrir")
4. Produire les taglines de catégories (services/offre) via le même process divergent

**Outputs** : messages par section et CTAs → dans `positioning.md`, taglines catégories → dans `services.md`

---

## Scope : Full (`/brand-expression` ou `/brand-expression full`)

Exécute les 3 scopes dans l'ordre : Tagline → Tone → Messaging.

L'ordre est important :
1. La tagline pose l'idée centrale
2. Le ton définit comment on parle
3. Les messages déclinent l'idée centrale dans le ton défini

---

## Quality Gates

Avant de valider les outputs, vérifier :

> **Checklist détaillée** : `checklists/creative-quality.md`

### Tests obligatoires

1. **Test de spécificité** : Remplacer le nom du client par un concurrent direct. Si la phrase fonctionne encore → REJETER.
2. **Test de tension** : La phrase contient-elle un contraste, une surprise, ou une promesse audacieuse ? Si c'est un truisme ("nous faisons de bons plats") → REJETER.
3. **Test d'archétype** : Le personnage incarnant l'archétype (ex: Caregiver, Explorer) dirait-il cette phrase ? Si décalage → REJETER.
4. **Test anti-pattern** : La phrase correspond-elle à un pattern de `checklists/creative-quality.md` ? → REJETER.

### Dérivation traçable

Chaque élément créatif produit doit inclure un commentaire HTML de traçabilité :

```markdown
<!-- Dérive de : 00-platform.md > [Composant] -->
<!-- Choix : [justification en 1 ligne] -->
```

---

## Exemples

> **Exemples détaillés** : `examples/expression-good.md` et `examples/expression-weak.md`

### Bon output (restaurant en galerie marchande)
- **Tagline** : "La galerie marchande s'arrête ici."
- **Baseline** : "Un moment vrai, une cuisine vraie, au cœur de la galerie."
- **Ton** : Chaleureux mais pas mielleux, direct sans être familier

### Mauvais output (même contexte)
- **Tagline** : "Bienvenue chez La Pause"
- **Baseline** : "Découvrez notre cuisine faite maison"
- **Ton** : Générique, pourrait être n'importe quel restaurant

---

## Notes d'implémentation

- Ce skill est distribué avec le workspace Neurolia (pas dans le template externe)
- Les références sont chargées à la demande pour préserver la context window
- Charger uniquement la référence du scope actif (`tagline` → `tagline-methodology.md`)
- En mode `full`, charger les références séquentiellement (pas en bloc)
