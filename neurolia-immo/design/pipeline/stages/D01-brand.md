# Etape D01 : Brand & Identity

> **Phase D-A : Design** - Definition de l'identite complete pour l'application mobile.

## Objectif

Definir l'identite complete de la marque adaptee au contexte mobile : messages courts, CTAs tactiles, couleurs semantiques pour les etats de l'app.

## Input

- `pipeline/input/imports/prd.md` (Product Requirements Document)
- `pipeline/input/imports/features.md` (liste des fonctionnalites)
- `pipeline/input/assets/` (logo, images existantes)

## Output

```
pipeline/output/01-brand/
├── 00-platform.md    # Plateforme de marque (Brand Key + Kapferer + Archetypes)
├── about.md          # Identite de l'application
├── services.md       # Fonctionnalites cles / offre
├── positioning.md    # Tagline, messages par ecran, CTAs mobiles
├── tone.md           # Ton de communication
├── personas.md       # Profils utilisateurs mobiles
├── colors.md         # Palette OKLCH + couleurs semantiques app
└── typography.md     # Echelle typographique mobile (min 14px)
```

## Execution Multi-Phase

Cette etape s'execute en **4 phases sequentielles** via des sous-fichiers :

| Phase | Fichier | Description | Skill |
|-------|---------|-------------|-------|
| 1. Diagnostic | `D01-brand/01-diagnostic.md` | Lecture brief, evaluation point de depart, identification ecrans | -- |
| 2. Plateforme | `D01-brand/02-platform.md` | Brand Key (9 composantes), Prisme Kapferer (6 facettes), Archetypes → 00-platform.md | -- |
| 3a. Expression verbale | `D01-brand/03-production-verbal.md` | 4 fichiers via /brand-expression | /brand-expression |
| 3b. Identite visuelle | `D01-brand/03-production-visual.md` | 3 fichiers : personas, colors, typography | -- |
| 4. Validation | `D01-brand/04-validation.md` | Checklist 44+ items | -- |

## Instructions d'Execution

### Ordre strict

```
01-diagnostic → 02-platform → 03-production-verbal + 03-production-visual → 04-validation
```

Les phases 3a et 3b peuvent s'executer en parallele apres la phase 2.

### Pour chaque phase

1. Lire le fichier de la phase dans `D01-brand/`
2. Executer les instructions
3. Produire les fichiers dans `pipeline/output/01-brand/`
4. Passer a la phase suivante

## Adaptations Mobile

Par rapport au template website, cette etape integre des specificites mobiles :

- **Phase 1 (Diagnostic)** : Identifier les ecrans de l'app (pas des pages web)
- **Phase 3a (Verbal)** : Messages adaptes aux ecrans mobiles (Home tab, Onboarding, Dashboard)
- **Phase 3a (Verbal)** : CTAs adaptes au mobile (verbes d'action tactile : "Reserver", "Scanner", "Glisser")
- **Phase 3b (Visual)** : `colors.md` inclut les couleurs semantiques pour les etats app (success/error/warning/info)
- **Phase 3b (Visual)** : `typography.md` inclut min 14px body, echelle pour 375-428px

## Validation

- [ ] 8 fichiers crees dans `pipeline/output/01-brand/`
- [ ] `00-platform.md` contient Brand Key + Kapferer + Archetypes
- [ ] Aucun placeholder `[texte]` restant
- [ ] Couleurs en format OKLCH avec etats semantiques
- [ ] Messages par ecran definis (pas par page web)
- [ ] CTAs utilisant des verbes d'action tactile
- [ ] Echelle typographique adaptee mobile (min 14px body)
- [ ] Ton coherent avec la cible et le contexte mobile

## Prochaine Etape

Une fois `output/01-brand/` complet → Passer a `stages/D02-art-direction.md`

---

**Version** : 1.0
**Phase** : D-A (Design)
**Dependances** : Imports architecture (prd.md, features.md)
**Produit pour** : D02 (Art Direction), D03 (Wireframes), D06 (Core Screens)
