# Phase 2 — Plateforme de marque (fondation stratégique)

> Sous-étape de [A02-brand.md](../A02-brand.md)

## Pourquoi cette phase ?

Les éléments d'expression (taglines, ton, messages) ont besoin d'une fondation stratégique explicite. Sans plateforme, l'expression est déconnectée de la stratégie et tend vers le générique.

## Instructions

### Si formulaire brand-platform disponible dans input/forms/

Tableau de correspondance CSV → composants 00-platform.md :
- Q1 (Colère fondatrice) + Q4 (Avant/Après) → Key Insight / Tension
- Q3 (Mission) → Mission
- Q4 Après + Q17 (Mantra) → Brand Promise
- Q5 (Ennemi commun) → Competitive Environment
- Q7 (Preuve d'autorité) + Q8 (Secret sauce) → Proof Points + Discriminator
- Q10 (3 adjectifs) + Q11 (Anti-portrait) → Values
- Q12 (Ton verbal) → tone.md

Règle : citations client entre guillemets avec attribution `— Réponse client, Q[X]`
Le formulaire accélère la Phase 2 mais les frameworks (Brand Key, Kapferer) restent obligatoires.

### Si aucun formulaire disponible

Construire la plateforme depuis les données du brief et le diagnostic Phase 1 uniquement.

---

Créer **1 fichier** dans `output/01-brand/` :

### 00-platform.md (Plateforme de marque)

La plateforme est le socle analytique qui alimente TOUS les fichiers suivants. Chaque composant doit être justifié et traçable.

## Frameworks de référence

### Brand Key (Unilever) — 9 composants à construire dans l'ordre

1. Root Strengths (forces historiques)
2. Competitive Environment (paysage concurrentiel — depuis 00-brief.md)
3. Target (cible — depuis 00-brief.md)
4. Insight (tension fondatrice)
5. Benefits (fonctionnels + émotionnels)
6. Values & Personality
7. Reason to Believe (preuves)
8. Discriminator (ce qui est unique)
9. Brand Essence (1 mot ou expression)

### Prisme de Kapferer — 6 facettes pour vérifier la cohérence

1. Physique (traits tangibles : produit, logo, couleurs)
2. Personnalité (caractère de la marque si elle était une personne)
3. Culture (système de valeurs)
4. Relation (type de lien avec le client)
5. Reflet (image du client type dans la communication)
6. Mentalisation (ce que le client ressent en utilisant la marque)

### Archétypes jungiens — Choisir 1 principal (+ 1 secondaire optionnel)

| Archétype | Motivation | Promet | Craint |
|-----------|------------|--------|--------|
| **Innocent** | Sécurité | Bonheur, simplicité | Complexité |
| **Sage** | Compréhension | Vérité, expertise | Ignorance |
| **Explorer** | Liberté | Découverte, authenticité | Conformisme |
| **Outlaw** | Libération | Révolution, rupture | Impuissance |
| **Magician** | Pouvoir | Transformation | Conséquences négatives |
| **Hero** | Maîtrise | Victoire, excellence | Faiblesse |
| **Lover** | Intimité | Passion, connexion | Solitude |
| **Jester** | Plaisir | Fun, légèreté | Ennui |
| **Regular Guy** | Appartenance | Connexion, authenticité | Exclusion |
| **Caregiver** | Service | Protection, soin | Égoïsme |
| **Ruler** | Contrôle | Ordre, stabilité | Chaos |
| **Creator** | Innovation | Originalité, expression | Médiocrité |

## Template 00-platform.md

```markdown
# Plateforme de Marque

<!-- Ce fichier est la fondation stratégique de toute l'expression de marque.
     Chaque composant ci-dessous alimente directement les fichiers créatifs. -->

## Key Insight / Tension

> [La contradiction fondatrice — le point de départ de toute l'expression.
> Format : "[Réalité actuelle]" vs. "[Ce que la marque propose]"
> Ex: "Les galeries marchandes sont des non-lieux de passage" vs. "La Pause est un lieu vrai où on s'arrête"]

## Purpose (Raison d'être)

[Pourquoi cette marque existe au-delà du profit — 1-2 phrases]

## Vision

[Ambition spécifique et mesurable — où la marque veut aller — 1 phrase]

## Mission

[Action quotidienne concrète — ce que la marque fait chaque jour — 1 phrase]

## Values

> 3-4 valeurs maximum. Chaque valeur a une définition + ce qu'elle implique + ce qu'elle exclut.

### 1. [Valeur]

- **Définition** : [Ce que ça signifie pour cette marque]
- **Implique** : [Comportement concret que cette valeur entraîne]
- **Exclut** : [Comportement que cette valeur interdit]

### 2. [Valeur]

[Même structure]

### 3. [Valeur]

[Même structure]

## Archétype

- **Principal** : [Archétype] — [Justification en 2-3 phrases]
- **Secondaire** (optionnel) : [Archétype] — [Nuance apportée]
- **Manifestation** :
  - **Ton** : [Comment l'archétype parle]
  - **Comportement** : [Comment l'archétype agit]
  - **Visuel** : [Quel univers visuel l'archétype évoque]

### Calibrage Frontend (alimente `project-dials.md` en A03)

> Traduire l'archétype en intentions visuelles concrètes. Ces recommandations seront affinées en A03 et calibreront les dials de `frontend-design2`.

- **Layout attendu** : [Symétrique/stable → DESIGN_VARIANCE bas | Asymétrique/expressif → DESIGN_VARIANCE haut]
- **Mouvement attendu** : [Sobre/rassurant → MOTION_INTENSITY bas | Dynamique/immersif → MOTION_INTENSITY haut]
- **Densité attendue** : [Aéré/luxe → VISUAL_DENSITY bas | Dense/technique → VISUAL_DENSITY haut]
- **Registre visuel** : [Mots-clés visuels — ex: "minéral, anguleux, contrasté" ou "organique, arrondi, chaleureux"]
- **Techniques pertinentes** (depuis arsenal frontend-design2 Section 8) :
  - [Technique 1 — ex: "Sticky Scroll Stack" si storytelling, "Bento Grid" si SaaS]
  - [Technique 2]
  - [Technique 3 si applicable]

## Brand Promise

[1 phrase — ce que le client obtient à chaque interaction]

> **Test de spécificité** : Remplacer le nom de la marque par un concurrent. Si la promesse fonctionne encore → réécrire.

## Proof Points

> Faits tangibles qui prouvent la promesse. Pas d'affirmations invérifiables.

1. [Preuve 1 — fait concret]
2. [Preuve 2 — fait concret]
3. [Preuve 3 — fait concret]

## Carte de Dérivation

> Comment chaque composant de la plateforme alimente les fichiers suivants.

| Composant | → Fichier(s) | Ce qu'il alimente |
|-----------|-------------|-------------------|
| Insight | positioning.md (Hero) | Message hero, contraste principal |
| Purpose | about.md | Section Mission |
| Vision | about.md | Section Vision |
| Mission | about.md, services.md | Descriptions d'offre |
| Values | about.md, tone.md | Valeurs affichées, personnalité |
| Archétype | tone.md, **project-dials.md** | Registre, personnalité, **calibrage visuel frontend** |
| Archétype > Registre visuel | **A03 constraints.md, visual-vocabulary.md** | Règles visuelles, vocabulaire CSS |
| Archétype > Techniques | **A03 project-dials.md** | Arsenal créatif sélectionné |
| Promise | positioning.md | Tagline, baseline, CTAs |
| Proof Points | positioning.md, services.md | USPs, tarifs, faits |
| Ambition Visuelle (A01) | **A03 project-dials.md** | Niveau de sophistication, complexité technique |
```

## Validation Phase 2

- [ ] L'Insight contient une tension réelle (pas un truisme)
- [ ] L'Insight est spécifique (test d'interchangeabilité)
- [ ] Les Values ont toutes : définition + implique + exclut
- [ ] L'Archétype est justifié par le contexte (pas choisi arbitrairement)
- [ ] La Promise passe le test de spécificité
- [ ] Les Proof Points sont vérifiables (pas inventés)
- [ ] La Carte de Dérivation est complète
