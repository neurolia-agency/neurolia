# Etape A5 : Creative Briefs (Wireframes)

> **Phase A : Architecture** - Definition du contenu et de l'intention de chaque page.

## Objectif

Creer un **creative brief** pour chaque page, servant de source de contenu et d'intention emotionnelle pour la Phase B. Le Creative Director s'appuie sur ces briefs pour DECIDER l'approche visuelle — le brief ne prescrit pas le HOW.

**Principe cle v4** : Les briefs definissent QUOI montrer et QUELLE emotion viser. Le COMMENT (layout, techniques, animations) est decide par le Creative Director en Phase B.

## Input

- `output/01-brand/` (tous les fichiers)
- `output/02-art-direction/` (contraintes, vocabulaire, emotion-map, project-dials)
- `output/03-sitemap.md` (architecture pages)
- `input/references/screenshots/` (references visuelles — si disponibles)

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

## Format Creative Brief (STRICT)

Chaque page contient des sections. Chaque section suit ce format allege qui laisse l'espace creatif au Creative Director.

```markdown
# [Page] - Creative Brief

**Route** : /[route]
**Objectif** : [1 phrase]

> Derive de : `03-sitemap.md > [Page]`, `01-brand/positioning.md`, `02-art-direction/constraints.md`

---

## Section 1 : [Nom]

**Contenu** :
- H1 : `positioning.md > tagline`
- Baseline : `positioning.md > baseline`
- CTA : `positioning.md > cta_principal` -> /contact

**Emotion** : `emotion-map.md > [Page] > [Section]`
- Primaire : [emotion]
- Tension : [ex: "Calme du fond vs Energie du CTA"]

**Contraintes** : `constraints.md > ON FAIT > #1, #3, #7` | `ON NE FAIT PAS > #2, #5`

**References visuelles** (optionnel) :
- [Chemin screenshot ou description d'une reference qui capture le feeling]
- [Ce qu'on en retient et ce qu'on evite]

**Notes** (optionnel) :
- [Exigences client specifiques : "telephone prominent", "image produit obligatoire"]
- [Indication de densite : "minimal — juste tagline + CTA" ou "riche — 3 blocs"]

---

## Section 2 : [Nom]

[Meme structure...]
```

### Champs par section

| Champ | Obligatoire | Contenu |
|-------|-------------|---------|
| **Contenu** | Oui | References aux textes, CTAs, images depuis brand/ |
| **Emotion** | Oui | Emotion primaire + tension depuis emotion-map.md |
| **Contraintes** | Oui | Numeros de contraintes applicables depuis constraints.md |
| **References visuelles** | Non | Screenshots ou descriptions de references qui capturent le feeling |
| **Notes** | Non | Exigences client, indication de densite, precisions |

### Ce qui N'EST PLUS dans le brief (decide en Phase B par le Creative Director)

| Ancien champ v3 | Maintenant decide par |
|------------------|----------------------|
| Layout ("Split screen 40/60") | Creative Director (Phase B, etape 1) |
| Fond (`visual-vocabulary.md > couleurs > fond principal`) | Creative Director |
| Interaction (hover/scroll/click) | Creative Director |
| Dials override (VARIANCE: 6, MOTION: 7) | Creative Director |
| Technique ("Sticky Scroll Stack, P0") | Creative Director |

## Notation des References

| Notation | Signification |
|----------|---------------|
| `fichier.md > cle` | Valeur a recuperer dans le fichier brand/ |
| `fichier.md > array[0-2]` | Premiers elements d'une liste |
| `(placeholder)` | Contenu a definir plus tard |
| `-> /route` | Destination du lien/CTA |

## Exemple : Homepage

```markdown
# Homepage - Creative Brief

**Route** : /
**Objectif** : Captiver, differencier, convertir

> Derive de : `03-sitemap.md > Accueil`, `01-brand/positioning.md`, `02-art-direction/constraints.md`

---

## Section 1 : Hero

**Contenu** :
- H1 : `positioning.md > tagline`
- Baseline : `positioning.md > baseline`
- CTA Primaire : `positioning.md > cta_principal` -> /contact
- Visuel : `input/assets/hero.webp` (image produit / portrait)

**Emotion** : `emotion-map.md > Homepage > Hero`
- Primaire : Impact, confiance immediate
- Tension : Sobriete du fond vs energie du CTA accent

**Contraintes** : `constraints.md > ON FAIT > #1, #3, #7` | `ON NE FAIT PAS > #2, #5, #7`

**References visuelles** :
- `input/references/screenshots/ref-hero-01.png` — retenir : asymetrie, espace negatif genereux
- Eviter : hero centre classique, stock photo generique

**Notes** :
- Densite minimale — le hero doit respirer
- Le visuel produit est l'element dominant

---

## Section 2 : Services (apercu)

**Contenu** :
- Titre : `positioning.md > messages > services`
- Items : `services.md > services[0-2]` (3 premiers services)
- Lien : "Voir tous les services" -> /services

**Emotion** : `emotion-map.md > Homepage > Services`
- Primaire : Curiosite, decouverte progressive
- Transition depuis Hero : Du "wow" initial vers l'exploration concrete

**Contraintes** : `constraints.md > ON FAIT > #4, #8` | `ON NE FAIT PAS > #1`

**Notes** :
- PAS de grid 3 colonnes egales (anti-pattern renforce dans project-dials.md)

---

[Continuer pour chaque section]
```

## Pages a Creer

| Page | Sections principales |
|------|---------------------|
| homepage.md | Hero, Services, Portfolio, Temoignages, CTA |
| services.md | Hero, Grid services, Process, FAQ, CTA |
| portfolio.md | Hero, Grid projets, Etude de cas, CTA |
| about.md | Hero, Mission, Valeurs, Equipe, Chiffres, CTA |
| contact.md | Hero, Formulaire, Coordonnees |

## README.md

Creer un index :

```markdown
# Creative Briefs - [NOM_PROJET]

Source unique de contenu et d'intention pour les etapes B1-B3.

## Fichiers

| Fichier | Route | Sections |
|---------|-------|----------|
| homepage.md | / | X sections |
| services.md | /services | X sections |
| portfolio.md | /portfolio | X sections |
| about.md | /about | X sections |
| contact.md | /contact | X sections |

## Principe v4

Les creative briefs definissent QUOI montrer et QUELLE emotion viser.
Le Creative Director decide COMMENT en Phase B (layout, technique, dials par section).

Chaque section contient :
- **Contenu** : references aux fichiers brand/ (textes, CTAs, images)
- **Emotion** : cible emotionnelle depuis emotion-map.md
- **Contraintes** : gardes-fous depuis constraints.md

## Usage

| Etape | Lire | Qui decide le HOW |
|-------|------|-------------------|
| B1-Layout | 03-sitemap.md | Creative Director |
| B2-Homepage | homepage.md | Creative Director (par section) |
| B3-Pages | Le brief de chaque page | Creative Director (par section) |
```

## Validation — Wireframe Validator (OBLIGATOIRE)

**Apres avoir produit tous les creative briefs**, lancer le custom subagent `wireframe-validator` pour une verification structurelle automatisee.

```
Agent(
  subagent_type: "wireframe-validator",
  model: "haiku",
  prompt: """
    PROJET : [NOM_PROJET] — chemin racine : [CHEMIN_PROJET]
    Valide tous les creative briefs dans pipeline/output/03.5-wireframes/
    contre le sitemap pipeline/output/03-sitemap.md
    et les fichiers de reference dans pipeline/output/02-art-direction/ et pipeline/output/01-brand/.
  """
)
```

Le wireframe-validator verifie :

- **Couverture** : chaque page du sitemap a un creative brief, chaque section est presente
- **Completude** : les 3 champs obligatoires par section (Contenu, Emotion, Contraintes)
- **References croisees** : chaque `fichier.md > cle` pointe vers une valeur reelle
- **Qualite** : emotions specifiques (pas vagues), contenu reel (pas de placeholder non resolu)

**Action selon le verdict :**
- Si PASS -> Passer a A06
- Si PASS avec reserves -> Corriger les reserves, puis passer a A06
- Si FAIL -> Corriger les briefs en suivant le rapport, puis relancer le validator

### Checklist manuelle complementaire

- [ ] **Transitions emotionnelles** notees entre sections adjacentes (via le champ Tension)
- [ ] Aucune prescription de layout, technique ou dials dans les briefs
- [ ] Les briefs racontent un **parcours**, pas une liste de sections
- [ ] Les references visuelles (si presentes) decrivent le FEELING, pas l'implementation

## Prochaine Etape

Une fois les creative briefs valides (wireframe-validator PASS) -> Passer a `stages/A06-design-tokens.md`

---

**Version** : 4.0
**Phase** : A5 (Architecture)
**Dependances** : A3 (02-Art Direction — emotion-map, project-dials, constraints), A4 (03-Structure)
**Agents** : wireframe-validator (haiku) — validation structurelle
**Produit pour** : A6 (Design Tokens), B1-B3 (Frontend — via Creative Director)
