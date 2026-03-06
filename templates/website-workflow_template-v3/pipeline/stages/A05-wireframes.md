# Étape A5 : Wireframes

> **Phase A : Architecture** - Définition du contenu de chaque page.

## Objectif

Créer un brief structuré pour chaque page, servant d'**unique source de contenu** pour la Phase B (frontend-design).

**Principe clé** : Les wireframes **référencent** les fichiers brand/ sans dupliquer leur contenu.

## Input

- `output/01-brand/` (tous les fichiers)
- `output/02-art-direction/` (contraintes, vocabulaire, **emotion-map**, **project-dials**)
- `output/03-sitemap.md` (architecture pages)

## Output

```
output/03.5-wireframes/
├── README.md
├── homepage.md
├── services.md
├── portfolio.md
├── about.md
└── contact.md
```

## Format Wireframe (STRICT)

Chaque wireframe suit ce format enrichi. La différence avec le format classique : chaque section porte son **contexte émotionnel**, ses **dials**, et sa **technique recommandée**, pour que le skill frontend-design2 reçoive un contexte complet.

```markdown
# [Page] - Wireframe

**Route** : /[route]
**Objectif** : [1 phrase]

> Dérive de : `03-sitemap.md > [Page]`, `01-brand/positioning.md`, `02-art-direction/constraints.md`

---

## Section 1 : [Nom]

**Contenu** :
- H1 : `positioning.md > tagline`
- Baseline : `positioning.md > baseline`
- CTA : `positioning.md > cta_principal` → /contact

**Layout** : [Description précise — ex: "Split screen 60/40, texte à gauche, image à droite"]
**Fond** : `visual-vocabulary.md > couleurs > [terme]` ([#hex])
**Interaction** : [hover/scroll/click — avec valeurs depuis visual-vocabulary.md]

**Émotion** : `emotion-map.md > [Page] > [Section]`
- Primaire : [émotion]
- Tension : [ex: "Calme du fond vs Énergie du CTA"]

**Dials (override section)** : `project-dials.md > [Section]`
- VARIANCE: [val] | MOTION: [val] | DENSITY: [val]

**Technique** : `project-dials.md > Arsenal > [Technique]`
- [Ex: "Kinetic Marquee" — justification : renforce le dynamisme d'entrée]

**Contraintes applicables** : `constraints.md > ON FAIT > [#numéros]`, `ON NE FAIT PAS > [#numéros]`

---

## Section 2 : [Nom]

[Même structure enrichie...]
```

### Règles du Format

1. **Pas de texte dupliqué** : Utiliser la notation `fichier.md > clé` pour référencer brand/
2. **Sections numérotées** : Ordre d'apparition sur la page
3. **1 section = 1 bloc** : Sera traité individuellement avec frontend-design2
4. **Émotion obligatoire** : Chaque section DOIT porter son émotion depuis emotion-map.md
5. **Dials obligatoires** : Chaque section DOIT porter ses dials depuis project-dials.md
6. **Technique recommandée** : Si une technique de l'arsenal s'applique, la noter
7. **Contraintes explicites** : Lister les numéros de contraintes applicables (pas "valider après")
8. **Layout précis** : "Plein écran, centré" est INTERDIT. Spécifier la structure exacte (split, asymétrique, grid colonnes, etc.)

## Notation des Références

| Notation | Signification |
|----------|---------------|
| `fichier.md > clé` | Valeur à récupérer dans le fichier brand/ |
| `fichier.md > array[0-2]` | Premiers éléments d'une liste |
| `(placeholder)` | Contenu à définir plus tard |
| `→ /route` | Destination du lien/CTA |

## Exemple : Homepage

```markdown
# Homepage - Wireframe

**Route** : /
**Objectif** : Captiver, différencier, convertir

> Dérive de : `03-sitemap.md > Accueil`, `01-brand/positioning.md`, `02-art-direction/constraints.md`

---

## Section 1 : Hero

**Contenu** :
- H1 : `positioning.md > tagline` — `visual-vocabulary.md > typographie > typo massive`
- Baseline : `positioning.md > baseline` — `visual-vocabulary.md > typographie > corps large`
- CTA : `positioning.md > cta_principal` → /contact

**Layout** : Split screen 60/40 — texte aligné à gauche, espace négatif à droite avec élément graphique
**Fond** : `visual-vocabulary.md > couleurs > fond principal` (#hex)
**Interaction** : `visual-vocabulary.md > transitions > apparition douce` — staggered au load

**Émotion** : `emotion-map.md > Homepage > Hero`
- Primaire : [Ex: Impact, confiance immédiate]
- Tension : [Ex: Sobriété du fond vs énergie du CTA accent]

**Dials** : `project-dials.md > Hero`
- VARIANCE: 6 | MOTION: 5 | DENSITY: 2

**Technique** : `project-dials.md > Arsenal > [Ex: Text Scramble Effect]`
- Justification : [Ex: renforce la première impression de maîtrise technique]

**Contraintes** : `constraints.md > ON FAIT > #1, #3, #7` | `ON NE FAIT PAS > #2, #5`

---

## Section 2 : Services (aperçu)

**Contenu** :
- Titre : `positioning.md > messages > services`
- Items : `services.md > services[0-2]` (3 premiers services)
- Lien : "Voir tous les services" → /services

**Layout** : Zig-zag alternée (image gauche/texte droite, puis inverse) — PAS de grid 3 colonnes
**Fond** : `visual-vocabulary.md > couleurs > fond alternatif` (#hex)
**Interaction** : `visual-vocabulary.md > transitions > hover subtil` + reveal au scroll

**Émotion** : `emotion-map.md > Homepage > Services`
- Primaire : [Ex: Curiosité, découverte progressive]
- Transition depuis Hero : [Ex: Du "wow" initial vers l'exploration concrète]

**Dials** : `project-dials.md > Services`
- VARIANCE: 5 | MOTION: 4 | DENSITY: 4

**Technique** : `project-dials.md > Arsenal > [Ex: Sticky Scroll Stack]`

**Contraintes** : `constraints.md > ON FAIT > #4, #8` | `ON NE FAIT PAS > #1`

---

[Continuer pour chaque section avec le même niveau de détail]
```

## Pages à Créer

| Page | Sections principales |
|------|---------------------|
| homepage.md | Hero, Services, Portfolio, Témoignages, CTA |
| services.md | Hero, Grid services, Process, FAQ, CTA |
| portfolio.md | Hero, Grid projets, Étude de cas, CTA |
| about.md | Hero, Mission, Valeurs, Équipe, Chiffres, CTA |
| contact.md | Hero, Formulaire, Coordonnées |

## README.md

Créer un index :

```markdown
# Wireframes - [NOM_PROJET]

Source unique de contenu pour les étapes B1-B3.

## Fichiers

| Fichier | Route | Sections |
|---------|-------|----------|
| homepage.md | / | X sections |
| services.md | /services | X sections |
| portfolio.md | /portfolio | X sections |
| about.md | /about | X sections |
| contact.md | /contact | X sections |

## Principe

Les wireframes référencent les fichiers brand et art-direction sans dupliquer :
```
positioning.md > tagline
services.md > services[0-2]
emotion-map.md > Homepage > Hero
project-dials.md > Hero > VARIANCE: 6
constraints.md > ON FAIT > #1, #3
```

## Usage

| Étape | Lire | Contexte supplémentaire |
|-------|------|------------------------|
| B1-Layout | 03-sitemap.md | project-dials.md (dials globaux) |
| B2-Homepage | homepage.md | **Tout le contexte est dans le wireframe** (émotions, dials, contraintes) |
| B3-Pages | Le wireframe de chaque page | **Tout le contexte est dans le wireframe** |

**Principe clé** : Chaque wireframe est maintenant **auto-suffisant** — il contient toutes les références nécessaires pour que les agents Context Assembler et Aesthetic Director puissent produire un brief complet sans aller chercher ailleurs.
```

## Validation — Wireframe Validator (OBLIGATOIRE)

**Après avoir produit tous les wireframes**, lancer le custom subagent `wireframe-validator` pour une vérification structurelle automatisée.

```
Agent(
  subagent_type: "wireframe-validator",
  model: "haiku",
  prompt: """
    PROJET : [NOM_PROJET] — chemin racine : [CHEMIN_PROJET]
    Valide tous les wireframes dans pipeline/output/03.5-wireframes/
    contre le sitemap pipeline/output/03-sitemap.md
    et les fichiers de référence dans pipeline/output/02-art-direction/ et pipeline/output/01-brand/.
  """
)
```

Le wireframe-validator vérifie :

- **Couverture** : chaque page du sitemap a un wireframe, chaque section est présente
- **Complétude** : les 7 champs obligatoires par section (contenu, layout, fond, émotion, dials, contraintes, interaction/technique)
- **Références croisées** : chaque `fichier.md > clé` pointe vers une valeur réelle
- **Qualité structurelle** : pas de layout vague, pas de placeholders non résolus

**Action selon le verdict :**
- Si **✅ PASS** → Passer à A06
- Si **⚠️ PASS avec réserves** → Corriger les réserves, puis passer à A06
- Si **❌ FAIL** → Corriger les wireframes en suivant le rapport, puis relancer le validator

### Checklist manuelle complémentaire

- [ ] **Transitions émotionnelles** notées entre sections adjacentes
- [ ] Aucune "grid 3 colonnes" par défaut (vérifier project-dials.md > Anti-Patterns)
- [ ] Les wireframes racontent un **parcours**, pas une liste de sections

## Prochaine Étape

Une fois les wireframes validés (wireframe-validator PASS) → Passer à `stages/A06-design-tokens.md`

---

**Version** : 2.1
**Phase** : A5 (Architecture)
**Dépendances** : A3 (02-Art Direction — emotion-map, project-dials, constraints), A4 (03-Structure)
**Agents** : wireframe-validator (haiku) — validation structurelle
**Produit pour** : A6 (Design Tokens), B1-B3 (Frontend — via agents Context Assembler + Aesthetic Director)
