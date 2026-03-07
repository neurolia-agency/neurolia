# Phase 2 — Plateforme de marque (fondation strategique)

> Sous-etape de [S02-brand.md](S02-brand.md)

## Pourquoi cette phase ?

Les elements d'expression (taglines, ton, messages, piliers de contenu) ont besoin d'une fondation strategique explicite. Sans plateforme, l'expression est deconnectee de la strategie et tend vers le generique.

## Instructions

### Si formulaire brand-platform disponible dans input/forms/

Tableau de correspondance CSV → composants 00-platform.md :
- Q1 (Colere fondatrice) + Q4 (Avant/Apres) → Key Insight / Tension
- Q3 (Mission) → Mission
- Q4 Apres + Q17 (Mantra) → Brand Promise
- Q5 (Ennemi commun) → Competitive Environment
- Q7 (Preuve d'autorite) + Q8 (Secret sauce) → Proof Points + Discriminator
- Q10 (3 adjectifs) + Q11 (Anti-portrait) → Values
- Q12 (Ton verbal) → tone.md
- Q13 (Ambiance visuelle) → Calibrage Creatif Social
- Q16 (Contenu prefere) → Piliers de Contenu (positioning.md)

Regle : citations client entre guillemets avec attribution `— Reponse client, Q[X]`
Le formulaire accelere la Phase 2 mais les frameworks (Brand Key, Kapferer) restent obligatoires.

### Si aucun formulaire disponible

Construire la plateforme depuis les donnees du brief et le diagnostic Phase 1 uniquement.

---

Creer **1 fichier** dans `output/01-brand/` :

### 00-platform.md (Plateforme de marque)

La plateforme est le socle analytique qui alimente TOUS les fichiers suivants.

## Frameworks de reference

### Brand Key (Unilever) — 9 composants a construire dans l'ordre

1. Root Strengths (forces historiques)
2. Competitive Environment (paysage concurrentiel — depuis 00-brief.md)
3. Target (cible — depuis 00-brief.md)
4. Insight (tension fondatrice)
5. Benefits (fonctionnels + emotionnels)
6. Values & Personality
7. Reason to Believe (preuves)
8. Discriminator (ce qui est unique)
9. Brand Essence (1 mot ou expression)

### Prisme de Kapferer — 6 facettes pour verifier la coherence

1. Physique (traits tangibles : produit, logo, couleurs)
2. Personnalite (caractere de la marque si elle etait une personne)
3. Culture (systeme de valeurs)
4. Relation (type de lien avec le client)
5. Reflet (image du client type dans la communication)
6. Mentalisation (ce que le client ressent en utilisant la marque)

### Archetypes jungiens — Choisir 1 principal (+ 1 secondaire optionnel)

| Archetype | Motivation | Promet | Craint |
|-----------|------------|--------|--------|
| **Innocent** | Securite | Bonheur, simplicite | Complexite |
| **Sage** | Comprehension | Verite, expertise | Ignorance |
| **Explorer** | Liberte | Decouverte, authenticite | Conformisme |
| **Outlaw** | Liberation | Revolution, rupture | Impuissance |
| **Magician** | Pouvoir | Transformation | Consequences negatives |
| **Hero** | Maitrise | Victoire, excellence | Faiblesse |
| **Lover** | Intimite | Passion, connexion | Solitude |
| **Jester** | Plaisir | Fun, legerete | Ennui |
| **Regular Guy** | Appartenance | Connexion, authenticite | Exclusion |
| **Caregiver** | Service | Protection, soin | Egoisme |
| **Ruler** | Controle | Ordre, stabilite | Chaos |
| **Creator** | Innovation | Originalite, expression | Mediocrite |

## Template 00-platform.md

```markdown
# Plateforme de Marque

<!-- Ce fichier est la fondation strategique de toute l'expression de marque.
     Chaque composant ci-dessous alimente directement les fichiers creatifs. -->

## Key Insight / Tension

> [La contradiction fondatrice — le point de depart de toute l'expression.
> Format : "[Realite actuelle]" vs. "[Ce que la marque propose]"
> Ex: "Les fast-foods sont synonymes de malbouffe" vs. "StrictFood prouve qu'on peut manger vite ET sain"]

## Purpose (Raison d'etre)

[Pourquoi cette marque existe au-dela du profit — 1-2 phrases]

## Vision

[Ambition specifique et mesurable — ou la marque veut aller — 1 phrase]

## Mission

[Action quotidienne concrete — ce que la marque fait chaque jour — 1 phrase]

## Values

> 3-4 valeurs maximum. Chaque valeur a une definition + ce qu'elle implique + ce qu'elle exclut.

### 1. [Valeur]

- **Definition** : [Ce que ca signifie pour cette marque]
- **Implique** : [Comportement concret que cette valeur entraine]
- **Exclut** : [Comportement que cette valeur interdit]

### 2. [Valeur]

[Meme structure]

### 3. [Valeur]

[Meme structure]

## Archetype

- **Principal** : [Archetype] — [Justification en 2-3 phrases]
- **Secondaire** (optionnel) : [Archetype] — [Nuance apportee]
- **Manifestation** :
  - **Ton** : [Comment l'archetype parle]
  - **Comportement** : [Comment l'archetype agit]
  - **Visuel** : [Quel univers visuel l'archetype evoque]

### Calibrage Creatif Social

> Traduire l'archetype en intentions creatives pour le social media. Ce calibrage guide les choix de style dans tous les contenus produits.

- **Style photo** : [Lifestyle / Studio / UGC / Mix — avec justification archetype]
- **Style video** : [Cinematique / Raw / Talking head / Mix — avec justification]
- **Formats privilegies** : [Feed / Carousel / Reel / Story / LinkedIn article — ordonnes par pertinence]
- **Densite texte/visuel** : [Dominance visuelle / Equilibre / Dominance texte — avec justification]
- **Usage couleurs sur posts** :
  - [Quand utiliser la couleur signature]
  - [Quand rester sobre/neutre]
  - [Regles de contraste pour lisibilite mobile]
- **Registre visuel** : [Mots-cles visuels — ex: "mineral, anguleux, contraste" ou "organique, arrondi, chaleureux"]

## Brand Promise

[1 phrase — ce que le client obtient a chaque interaction]

> **Test de specificite** : Remplacer le nom de la marque par un concurrent. Si la promesse fonctionne encore → reecrire.

## Proof Points

> Faits tangibles qui prouvent la promesse. Pas d'affirmations inverifiables.

1. [Preuve 1 — fait concret]
2. [Preuve 2 — fait concret]
3. [Preuve 3 — fait concret]

## Carte de Derivation

> Comment chaque composant de la plateforme alimente les fichiers suivants.

| Composant | → Fichier(s) | Ce qu'il alimente |
|-----------|-------------|-------------------|
| Insight | positioning.md | Message hero, contraste principal |
| Purpose | about.md | Section Mission |
| Vision | about.md | Section Vision |
| Mission | about.md, services.md | Descriptions d'offre |
| Values | about.md, tone.md | Valeurs affichees, personnalite |
| Archetype | tone.md | Registre, personnalite |
| Archetype > Calibrage Creatif Social | design-system.md | Guidelines visuelles social |
| Promise | positioning.md | Tagline, baseline, CTAs |
| Proof Points | positioning.md, services.md | USPs, tarifs, faits |
```

## Validation Phase 2

- [ ] L'Insight contient une tension reelle (pas un truisme)
- [ ] L'Insight est specifique (test d'interchangeabilite)
- [ ] Les Values ont toutes : definition + implique + exclut
- [ ] L'Archetype est justifie par le contexte (pas choisi arbitrairement)
- [ ] La Promise passe le test de specificite
- [ ] Les Proof Points sont verifiables (pas inventes)
- [ ] Le Calibrage Creatif Social est coherent avec l'archetype
- [ ] La Carte de Derivation est complete
