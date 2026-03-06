# Dependances Inter-Etapes

Matrice des inputs/outputs par etape du pipeline design mobile.

## Vue d'Ensemble

```
===============================================================================
                     PHASE D-A : DESIGN (Documentation)
             (Definit l'identite visuelle et le contenu - Markdown uniquement)
===============================================================================

pipeline/input/imports/prd.md
pipeline/input/imports/features.md
pipeline/input/assets/
        │
        ▼
┌──────────────────┐
│   D01: Brand     │ → pipeline/output/01-brand/ (8 fichiers)
│   & Identity     │
└──────────────────┘
        │
        ▼
┌──────────────────┐
│   D02: Art       │ → pipeline/output/02-art-direction/ (5 fichiers)
│   Direction      │
└──────────────────┘
        │
        ├── imports/user-flows/
        ├── imports/navigation-map.md
        ▼
┌──────────────────┐
│   D03: Wire-     │ → pipeline/output/03-wireframes/ (1 par ecran)
│   frames         │
└──────────────────┘
        │
        ├── imports/tech-stack.md
        ▼
┌──────────────────┐
│   D04: Design    │ → pipeline/output/04-design-tokens/ (globals.css / theme.ts)
│   Tokens         │
└──────────────────┘

===============================================================================
                     PHASE D-B : CODE (Implementation)
               (Construit l'app avec les patterns mobile)
===============================================================================

┌──────────────────┐
│   D05: App       │ → Projet scaffolde + navigation + auth
│   Setup          │
└──────────────────┘
        │
        ▼
┌──────────────────┐
│   D06: Core      │ → Ecrans principaux codes
│   Screens        │
└──────────────────┘
        │
        ▼
┌──────────────────┐
│   D07: Backend   │ → Ecrans connectes aux APIs / n8n
│   Integration    │
└──────────────────┘
        │
        ▼
┌──────────────────┐
│   D08: Polish    │ → Animations, transitions, micro-interactions
└──────────────────┘
        │
        ▼
┌──────────────────┐
│   D09: Validate  │ → pipeline/output/validation-report.md
└──────────────────┘
        │
        ▼
┌──────────────────┐
│   D10: Deploy    │ → App en production
└──────────────────┘
```

## Matrice Detaillee

### Phase D-A : Design

| Etape | Stage | Inputs Requis | Outputs | Depend de |
|-------|-------|---------------|---------|-----------|
| **D01** | `D01-brand.md` | `imports/prd.md`, `imports/features.md`, `input/assets/` | `output/01-brand/` (8 fichiers) | -- |
| **D02** | `D02-art-direction.md` | `01-brand/` (tous), `input/references/` | `output/02-art-direction/` (5 fichiers) | D01 |
| **D03** | `D03-wireframes.md` | `02-art-direction/`, `imports/user-flows/`, `imports/navigation-map.md` | `output/03-wireframes/` (1 par ecran) | D02 |
| **D04** | `D04-design-tokens.md` | `02-art-direction/`, `03-wireframes/`, `imports/tech-stack.md` | `output/04-design-tokens/` | D02, D03 |

### Phase D-B : Code

| Etape | Stage | Inputs Requis | Outputs | Depend de |
|-------|-------|---------------|---------|-----------|
| **D05** | `D05-setup.md` | `imports/tech-stack.md`, `04-design-tokens/`, `imports/navigation-map.md` | Projet scaffolde | D04 |
| **D06** | `D06-core-screens.md` | `03-wireframes/`, `04-design-tokens/`, `01-brand/` | Ecrans codes | D05 |
| **D07** | `D07-backend-integration.md` | `imports/api-contracts.md`, `imports/webhook-map.md`, ecrans D06 | Ecrans connectes | D06 |
| **D08** | `D08-polish.md` | App complete, `02-art-direction/` | Animations + finitions | D07 |
| **D09** | `D09-validate.md` | App complete, `02-art-direction/constraints.md` | `output/validation-report.md` | D08 |
| **D10** | `D10-deploy.md` | Validation PASS | Production | D09 |

### Parallelisme

- **Phase D-A** : Strictement sequentiel (D01 → D02 → D03 → D04)
- **Phase D-B** : Strictement sequentiel (D05 → D06 → D07 → D08 → D09 → D10)
- **Inter-phases** : D-B depend de la completion de D-A

### Dependances Inter-Templates

```
app-architecture-template/          app-design-template/
pipeline/output/                    pipeline/input/imports/
├── 01-brief/prd.md          ──→   ├── prd.md
├── 01-brief/features.md     ──→   ├── features.md
├── 02-user-flows/           ──→   ├── user-flows/
├── 02-user-flows/nav-map.md ──→   ├── navigation-map.md
├── 05-tech/tech-stack.md    ──→   └── tech-stack.md
│
app-n8n-template/
pipeline/output/
├── api-contracts.md         ──→   ├── api-contracts.md (D07)
└── webhook-map.md           ──→   └── webhook-map.md (D07)
```

## Regles de Lecture de Contexte

### Pattern "Lazy Context Loading"

Les etapes D06-D08 utilisent un chargement paresseux :

1. **Lire d'abord** le wireframe de l'ecran concerne
2. **Resoudre a la demande** les references vers `01-brand/`
3. **Ne pas pre-charger** tout le dossier brand/

```
Exemple pour ecran Home :
1. Lire pipeline/output/03-wireframes/home.md
2. Trouver reference "positioning.md > tagline"
3. Lire pipeline/output/01-brand/positioning.md pour resoudre
4. Continuer avec la zone suivante du wireframe
```

### Fichiers Toujours Accessibles

Ces fichiers peuvent etre lus a **toute etape** :

- `pipeline/output/04-design-tokens/` - Tokens visuels
- `pipeline/output/02-art-direction/constraints.md` - Regles design
- `pipeline/output/02-art-direction/visual-vocabulary.md` - Traductions visuelles
- `CLAUDE.md` - Statut et contexte global

## Composants Partages

| Composant | Cree a | Utilise par |
|-----------|--------|-------------|
| Card | D06 (Home) | Tous les ecrans avec listes |
| SkeletonCard | D06 (Home) | Tous les ecrans avec loading |
| EmptyState | D06 (Home) | Tous les ecrans vides |
| ErrorState | D06 (Home) | Tous les ecrans en erreur |
| ListItem | D06 (Tab 2) | Profile, Notifications |
| ScreenWrapper | D05 (Setup) | Tous les ecrans |

---

*Template App Design v1.0 - 2026-02-19*
