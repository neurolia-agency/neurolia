# Etape D03 : Wireframes Mobile

> **Phase D-A : Design** - Definition du contenu de chaque ecran.

## Objectif

Creer un brief structure pour chaque ecran de l'application, servant d'**unique source de contenu** pour la Phase D-B (code).

**Principe cle** : Les wireframes **referencent** les fichiers brand/ sans dupliquer leur contenu.

## Input

- `pipeline/output/02-art-direction/` (contraintes, vocabulaire)
- `pipeline/input/imports/user-flows/` (parcours utilisateurs)
- `pipeline/input/imports/navigation-map.md` (carte de navigation)

## Output

```
pipeline/output/03-wireframes/
├── README.md
├── [ecran-1].md
├── [ecran-2].md
├── [ecran-3].md
└── ...
```

Un fichier par ecran identifie dans la navigation-map.

## Skill

Ce stage utilise le skill `mobile-wireframes` pour generer les wireframes :

```bash
# Le skill guide la creation structuree des wireframes mobile
```

## Format Wireframe (STRICT)

Chaque wireframe suit ce format :

```markdown
# [Ecran] - Wireframe

**Route** : /screen-name (ou Tab: Home)
**Objectif** : 1 ligne

---

## Zone 1 : Header

**Contenu** :
- Titre : `positioning.md > tagline`
- Action : Back button / Menu

**Layout** : Sticky header, 56px height
**Interaction** : Collapse on scroll (si applicable)

---

## Zone 2 : Content

**Contenu** :
- Liste de `services.md > fonctionnalites[0-3]`
- Chaque item : icone + titre + description courte

**Layout** : Vertical scroll, cards 100% width, gap 12px
**Interaction** : Tap → ecran detail

---

## Zone 3 : Bottom Action

**Contenu** :
- CTA : `positioning.md > cta_principal`

**Layout** : Fixed bottom, padding 16px, safe area
**Interaction** : Tap → action principale

---

## Etats Speciaux

### Empty
- Illustration centered
- Message : `tone.md > empty_state`
- CTA : `positioning.md > cta_ecran`

### Loading
- Skeleton screens (cards placeholder)
- Header reste visible

### Error
- Icone erreur
- Message : `tone.md > error`
- Bouton "Reessayer"
```

## Regles du Format

1. **Pas de texte duplique** : Utiliser la notation `fichier.md > cle` pour referencer brand/
2. **Zones numerotees** : Ordre d'apparition sur l'ecran (top to bottom)
3. **1 zone = 1 bloc** : Sera traite individuellement lors du coding
4. **Etats speciaux obligatoires** : Chaque ecran avec donnees doit avoir empty, loading, error
5. **Layout precis** : Hauteurs, paddings, positions (sticky, fixed, scroll)
6. **Interactions definies** : Geste + destination pour chaque element interactif

## Notation des References

| Notation | Signification |
|----------|---------------|
| `fichier.md > cle` | Valeur a recuperer dans le fichier brand/ |
| `fichier.md > array[0-2]` | Premiers elements d'une liste |
| `(placeholder)` | Contenu a definir plus tard |
| `→ /route` | Destination de la navigation |
| `→ Tab: [nom]` | Switch vers un onglet |

## Ecrans a Creer

A partir de `navigation-map.md`, creer un wireframe pour chaque ecran :

### Ecrans d'Entree
| Ecran | Sections principales |
|-------|---------------------|
| onboarding.md | Steps (3-4), illustration, message, dots, CTA |
| login.md | Logo, formulaire, social login, register link |

### Ecrans Principaux (Tabs)
| Ecran | Sections principales |
|-------|---------------------|
| home.md | Header, hero/summary, content feed, quick actions |
| [tab-2].md | Header, filtres, liste/grid, empty state |
| [tab-3].md | Header, contenu principal, actions |
| profile.md | Avatar, infos, settings list, logout |

### Ecrans Secondaires
| Ecran | Sections principales |
|-------|---------------------|
| [detail].md | Header back, hero image, content, action bottom |
| [form].md | Header, form fields, validation, submit |
| notifications.md | Header, liste notifications, empty state |
| search.md | Search bar, filtres, resultats, empty state |

## README.md

Creer un index :

```markdown
# Wireframes - [NOM_APP]

Source unique de contenu pour les etapes D06-D08.

## Fichiers

| Fichier | Route/Tab | Zones |
|---------|-----------|-------|
| onboarding.md | /onboarding | X zones |
| login.md | /login | X zones |
| home.md | Tab: Home | X zones |
| [ecran].md | [route] | X zones |
| ... | ... | ... |

## Principe

Les wireframes referencent les fichiers brand sans dupliquer :
```
positioning.md > tagline
services.md > fonctionnalites[0-2]
```

## Usage

| Etape | Lire |
|-------|------|
| D06 - Core Screens | Le wireframe de chaque ecran |
| D07 - Backend | Le wireframe + api-contracts |
| D08 - Polish | emotion-map.md + constraints.md |

**Important** : Toujours valider contre `02-art-direction/constraints.md`
```

## Validation

- [ ] 1 wireframe par ecran de la navigation-map
- [ ] Format strict respecte (zones numerotees)
- [ ] References `fichier.md > cle` utilisees (pas de texte duplique)
- [ ] Etats speciaux definis (empty, loading, error) pour chaque ecran avec donnees
- [ ] Layout precis (hauteurs, positions)
- [ ] Interactions definies (geste + destination)
- [ ] Touch targets >= 44px notes pour tous les elements interactifs
- [ ] README index cree

## Prochaine Etape

Une fois les wireframes crees → Passer a `stages/D04-design-tokens.md`

---

**Version** : 1.0
**Phase** : D-A (Design)
**Dependances** : D02 (Art Direction), imports (user-flows/, navigation-map.md)
**Produit pour** : D04 (Design Tokens), D06-D08 (Code)
