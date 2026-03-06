# Étape A03 : Direction Artistique

> **Phase A : Architecture** — Traduction de la stratégie de marque en vision visuelle concrète et actionnable.

## Objectif

Transformer la stratégie de marque (A02-Brand) en **direction artistique mesurable** : un ensemble de règles visuelles précises, traçables jusqu'à la plateforme de marque, qui guideront toutes les décisions de design en Phase B.

## Input

- `output/01-brand/` (tous les fichiers, en particulier `00-platform.md`)
- `output/00-brief.md` (pages prévues, cibles, contexte)
- `input/references/sites.md` (si fourni par le client)
- `input/references/screenshots/` (captures d'écran des références — analyse visuelle directe)

## Output

```
output/02-art-direction/
├── moodboard.md                    # Références visuelles analysées avec mesures
├── visual-vocabulary.md            # Lexique visuel → valeurs CSS précises
├── constraints.md                  # Règles ON FAIT / ON NE FAIT PAS + Exceptions
├── emotion-map.md                  # Émotion cible par section/page + courbe émotionnelle + techniques frontend
├── project-dials.md                # Calibrage des 3 dials frontend-design2 pour ce projet
├── ui-kit.md                       # Inventaire des composants réutilisables (boutons, cards, inputs, etc.)
└── README.md                       # Index, ADN visuel, équation visuelle, test rapide
```

## Phases

| # | Phase | Input | Output | Tooling |
|---|-------|-------|--------|---------|
| 1 | Diagnostic & Références | 01-brand/, 00-brief.md, sites.md | Carte de dérivation, références validées | Subagent websearch (si sites.md vide) |
| 2 | Production Markdown | Carte dérivation + références | 5 fichiers .md + README.md | — |
| 3 | Validation | Tous les outputs | Checklist passée | — |

---

## Phase 1 : Diagnostic & Références

### 1.1 Lecture des inputs

Lire dans cet ordre :

1. `output/01-brand/00-platform.md` — Archétype, valeurs, promesse, insight
2. `output/01-brand/colors.md` — Palette complète (noms, OKLCH, variantes)
   > Note : colors.md et typography.md peuvent avoir ete informes par les donnees `ui-ux-pro-max` (CSVs palettes/font pairings) lors de A02. Les valeurs finales dans ces fichiers priment.
3. `output/01-brand/typography.md` — Polices, échelle, axes variables
4. `output/01-brand/tone.md` — Registre, personnalité, champ lexical
5. `output/01-brand/positioning.md` — Messages par section, tagline, CTAs
6. `output/00-brief.md` — Pages prévues, cibles, contexte technique

### 1.2 Carte de dérivation

Construire un tableau reliant chaque composant de la plateforme de marque à son expression visuelle attendue. Ce tableau est la **fondation** de toutes les décisions qui suivent — chaque règle dans constraints.md, chaque valeur dans visual-vocabulary.md doit pouvoir être tracée à une ligne de ce tableau.

```markdown
## Carte de Dérivation Brand → Visuel

| Composant Brand | Source | Expression Visuelle Attendue |
|-----------------|--------|------------------------------|
| Archétype [X] | 00-platform.md | [Caractéristiques visuelles de cet archétype : formes, rythme, ton visuel] |
| Valeur 1 : [X] | 00-platform.md | [Traduction en choix de design concrets] |
| Valeur 2 : [X] | 00-platform.md | [Traduction en choix de design concrets] |
| Valeur 3 : [X] | 00-platform.md | [Traduction en choix de design concrets] |
| Palette | colors.md | [Ratios d'utilisation, dominante, accent, neutres] |
| Polices [X + Y] | typography.md | [Rôles, hiérarchie, feeling typographique] |
| Registre [X] | tone.md | [Impact sur animations, spacing, rythme visuel] |
| Promesse | 00-platform.md | [Comment le visuel incarne la promesse client] |
```

### 1.3 Analyse des références

#### Screenshots (prioritaires)

Si `input/references/screenshots/` contient des images, les analyser EN PREMIER :

- Ouvrir chaque screenshot et mesurer visuellement : proportions, espacements, tailles de typo, couleurs dominantes, densité, rythme
- Les screenshots sont plus fiables que les URLs car ils montrent exactement ce que le client a vu et aimé
- Croiser les screenshots avec les annotations de `sites.md` pour comprendre POURQUOI le client a retenu cette référence
- Extraire des mesures concrètes : "H1 environ 60px, espacement sections environ 120px, radius cards 12px, palette dominante beige/noir"

#### Si `input/references/sites.md` est fourni

- Analyser les sites fournis par le client (toujours prioritaires)
- Compléter avec 2-3 sites du même secteur trouvés par websearch pour atteindre le minimum de 5

#### Si `input/references/sites.md` est vide ou absent

**Recherche active obligatoire.** Utiliser un subagent websearch pour trouver **5-7 sites de référence** :

- 2-3 sites du **même secteur** (même type d'établissement, même positionnement)
- 1-2 sites d'un **secteur adjacent** avec une esthétique cohérente avec l'archétype de marque
- 1-2 sites **primés** (Awwwards, CSS Design Awards, FWA) dans un registre émotionnel similaire

**Critères de sélection** : Chercher des sites qui incarnent visuellement des qualités proches de l'archétype et des valeurs de la plateforme de marque — pas simplement des sites "jolis" du même secteur.

Pour chaque site, noter : URL, nom, secteur, et 3-5 éléments visuels remarquables.

---

## Phase 2 : Production Markdown

### 2.1 Moodboard (moodboard.md)

Analyser **5-7 références visuelles** en détail. Chaque référence **DOIT** avoir une URL réelle et vérifiable.

Lire `pipeline/stages/A03-templates/moodboard-template.md` et remplir selon le contexte du projet.

### 2.2 Vocabulaire Visuel (visual-vocabulary.md)

Dictionnaire de traduction entre termes de design et **valeurs CSS précises**. Couvrir les **8 catégories** suivantes (toutes obligatoires) :

Lire `pipeline/stages/A03-templates/visual-vocabulary-template.md` et remplir selon le contexte du projet.

### 2.3 Contraintes (constraints.md)

Règles **non-négociables** organisées par catégorie. Chaque règle est justifiée par un lien avec la plateforme de marque.

Lire `pipeline/stages/A03-templates/constraints-template.md` et remplir selon le contexte du projet.

### 2.4 Carte des Émotions (emotion-map.md)

Pour chaque page/section, définir l'expérience émotionnelle complète.

Lire `pipeline/stages/A03-templates/emotion-map-template.md` et remplir selon le contexte du projet.

### 2.5 Calibrage Frontend (project-dials.md)

Fichier **critique** qui fait le pont entre la direction artistique et le skill `frontend-design2`. Ce fichier sera lu par les agents Context Assembler et Aesthetic Director avant chaque invocation du skill en Phase B.

Lire `pipeline/stages/A03-templates/project-dials-template.md` et remplir selon le contexte du projet.

> **Règle de production** : Les dials ne sont pas arbitraires. Chaque valeur doit être traçable à :
> 1. L'archétype + son calibrage frontend (00-platform.md)
> 2. L'ambition visuelle (00-brief.md)
> 3. La complexité technique acceptée (00-brief.md)
> 4. Les émotions cibles (emotion-map.md)

### 2.6 UI Kit (ui-kit.md)

Inventaire des **patterns de composants** autorisés pour le projet. Ce fichier ne duplique pas les tokens (qui restent dans `globals.css`) — il documente les variantes de composants que les agents peuvent utiliser en Phase B.

> **Pourquoi** : Sans ce fichier, chaque agent réinvente les boutons, les cards, les inputs.
> Résultat : incohérence entre pages. Le ui-kit fixe un vocabulaire de composants partagé.

Lire `pipeline/stages/A03-templates/ui-kit-template.md` et remplir selon le contexte du projet.

### 2.7 README (README.md)

Index enrichi synthétisant toute la direction artistique.

Lire `pipeline/stages/A03-templates/readme-template.md` et remplir selon le contexte du projet.

---

## Phase 3 : Validation

### Règles de Rédaction (à respecter dans tous les fichiers)

#### Être Spécifique

❌ "Utiliser des titres grands"
✅ "H1 = clamp(3rem, 6vw + 1rem, 4.5rem)"

❌ "Espacement généreux entre sections"
✅ "160px desktop / 96px mobile, jamais en dessous de 120px / 80px"

❌ "Animations subtiles"
✅ "Transitions = translateY(-4px), 300ms ease-out"

#### Justifier Chaque Choix

Chaque contrainte, chaque valeur doit être liée à :
- Un composant de la plateforme de marque (archétype, valeur, promesse)
- Ou un pattern validé dans le moodboard
- Ou une exigence technique du brief (mobile-first, performance)

#### Traçabilité

Chaque fichier commence par un commentaire `<!-- Dérive de : ... -->` indiquant ses sources dans la plateforme de marque et le moodboard.

### Checklist de Validation

#### Diagnostic & Dérivation (Phase 1)

- [ ] Tous les fichiers de `01-brand/` ont été lus (8 fichiers)
- [ ] `00-brief.md` lu pour les pages prévues et le contexte technique
- [ ] Screenshots analysés visuellement (si fournis dans `input/references/screenshots/`)
- [ ] Carte de dérivation complète (archétype, valeurs, palette, polices, registre, promesse)
- [ ] Chaque ligne de la carte a une expression visuelle concrète (pas de "[À définir]")

#### Moodboard

- [ ] 5+ références analysées avec **URLs réelles vérifiables**
- [ ] Mesures concrètes pour chaque référence (px, ratios, hex)
- [ ] Cohérence avec l'archétype évaluée pour chaque référence
- [ ] Tableau "Patterns Communs" avec 10+ patterns évalués
- [ ] Chaque décision du tableau est justifiée par un lien brand
- [ ] Synthèse Visuelle : équation nommée
- [ ] Mots-clés visuels : 5+ avec traductions concrètes

#### Vocabulaire Visuel

- [ ] 8 catégories couvertes : espacements, typo, transitions, couleurs, formes, ombres, layout, breakpoints
- [ ] Chaque terme a une valeur CSS précise (pas de fourchettes vagues)
- [ ] Valeurs responsive présentes (desktop + mobile pour espacements, typo)
- [ ] Couleurs en OKLCH + Hex (cohérent avec `01-brand/colors.md`)

#### Contraintes

- [ ] 8+ règles "ON FAIT" organisées par catégorie
- [ ] 8+ règles "ON NE FAIT PAS" organisées par catégorie
- [ ] Chaque règle justifiée (lien marque, moodboard, ou technique)
- [ ] Section "Exceptions Autorisées" présente avec contexte et conditions
- [ ] Test Rapide avec 8 critères spécifiques au projet
- [ ] Scoring documenté (8/8, 6-7/8, < 6/8)

#### Carte des Émotions

- [ ] Chaque section homepage a : émotion primaire + secondaire + tension + élément signature
- [ ] Chaque page secondaire a : émotion globale + parcours émotionnel + élément signature
- [ ] Tableau récapitulatif (section / émotion / couleur / élément)
- [ ] Courbe émotionnelle du parcours avec objectif narratif

#### Project Dials (project-dials.md)

- [ ] 3 dials globaux définis avec justification (archétype + ambition + complexité technique)
- [ ] Dials par section définis pour toutes les sections de la homepage + pages secondaires
- [ ] Arsenal créatif sélectionné : 8-10 techniques max pour tout le projet
- [ ] Techniques exclues listées avec justification
- [ ] Anti-patterns frontend-design2 renforcés : 5+ règles critiques identifiées
- [ ] Chaque dial est traçable à un composant brand/brief (pas de valeur arbitraire)
- [ ] Mapping émotion → dials complété avec les émotions spécifiques du projet

#### UI Kit (ui-kit.md)

- [ ] Boutons : 2-3 variantes max définies (Primaire, Secondaire, Ghost)
- [ ] Cards : 1 seul style autorisé, cohérent avec VISUAL_DENSITY
- [ ] Inputs : style unifié avec états (focus, error, disabled)
- [ ] Badges/Tags : style défini
- [ ] Séparateurs : style défini, pas de variantes décoratives
- [ ] Icônes : 1 seule librairie choisie
- [ ] Conteneurs : standard + full-bleed définis
- [ ] États interactifs : loading, empty, error documentés
- [ ] Toutes les valeurs référencent visual-vocabulary.md ou globals.css (pas de valeurs hardcodées)
- [ ] Règle d'or présente : "tout composant hors ui-kit doit être justifié"

#### README & Cohérence

- [ ] README contient : ADN visuel, équation, test rapide, palette résumée, liens valeurs, fichiers, usage
- [ ] Tous les fichiers commencent par `<!-- Dérive de : ... -->`
- [ ] Aucune valeur en conflit entre visual-vocabulary.md et constraints.md
- [ ] Les couleurs de visual-vocabulary.md correspondent à `01-brand/colors.md`
- [ ] Les polices de visual-vocabulary.md correspondent à `01-brand/typography.md`

## Prochaine Étape

Une fois `output/02-art-direction/` complet (7 fichiers, checklist passée) → Passer à `stages/A04-structure.md`

---

**Version** : 2.0
**Phase** : A03 (Architecture)
**Dépendances** : A02 (01-Brand)
**Tooling** : Subagent websearch (références)
**Produit pour** : A04 (Structure), A05 (Wireframes), A06 (Design Tokens), B01-B04 (Frontend), Agents (Context Assembler, Aesthetic Director, Constraint Validator)
