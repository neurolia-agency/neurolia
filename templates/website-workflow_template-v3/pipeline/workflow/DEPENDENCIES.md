# Dépendances Inter-Étapes

Matrice des inputs/outputs par étape du pipeline.

## Vue d'Ensemble

```
═══════════════════════════════════════════════════════════════════════════════
                        PHASE A : ARCHITECTURE
              (Définit CE QUI sera construit - Markdown uniquement)
═══════════════════════════════════════════════════════════════════════════════

pipeline/input/brief-client.md
pipeline/input/forms/*.csv (optionnel)
        │
        ▼
┌──────────────────┐
│   A01: Init      │ → pipeline/output/00-brief.md
└──────────────────┘
        │
        ▼
┌──────────────────┐
│   A02: Brand     │ → pipeline/output/01-brand/ (8 fichiers)
└──────────────────┘
        │
        ├──────────────────────────────────────┐
        ▼                                      ▼
┌──────────────────┐                  ┌──────────────────┐
│ A03: Art Dir     │                  │  A04: Structure  │
└──────────────────┘                  └──────────────────┘
        │                                      │
        │  pipeline/output/02-art-direction/   │  pipeline/output/03-sitemap.md
        │  (7 fichiers incl. project-dials,    │
        │   ui-kit, constraints, emotion-map)  │
        └──────────────┬───────────────────────┘
                       ▼
              ┌──────────────────┐
              │ A05: Wireframes  │ → pipeline/output/03.5-wireframes/
              └──────────────────┘     (wireframes auto-suffisants 7 dimensions)
                       │
                       ▼
              ┌──────────────────┐
              │ A06: Design      │ → app/globals.css (tokens, transitions, ombres)
              └──────────────────┘

═══════════════════════════════════════════════════════════════════════════════
                     PHASE B : DESIGN / VIBE CODING
        (Construit le site avec frontend-design2 + circuit d'agents)
═══════════════════════════════════════════════════════════════════════════════

              ┌──────────────────┐
              │   B01: Layout    │ → components/layout/ + _preflight/
              └──────────────────┘   (circuit agents : dials GLOBAUX)
                       │
        ┌──────────────┴──────────────┐
        ▼                              ▼
┌──────────────────┐          ┌──────────────────┐
│   B02: Homepage  │          │   B03: Pages     │
└──────────────────┘          └──────────────────┘
  (circuit agents :             (circuit agents :
   dials par SECTION)            dials par SECTION)
        │                              │
        └──────────────┬───────────────┘
                       ▼
              ┌──────────────────┐
              │   B04: Polish    │ → animations, SEO, cohérence
              └──────────────────┘   (Constraint Validator pass)
                       │
                       ▼
              ┌──────────────────┐
              │   B05: Validate  │ → output/07-validation.md
              └──────────────────┘   (Constraint Validator pass final GLOBAL)
                       │
                       ▼
              ┌──────────────────┐
              │   B06: Deploy    │ → output/08-deploy.md
              └──────────────────┘
```

## Circuit d'Agents (Phase B)

Chaque composant/section en Phase B passe par ce circuit :

```
Context Assembler (haiku) ──→ Aesthetic Director (opus-4.6) ──→ Claude + frontend-design2 ──→ Constraint Validator (haiku)
    [résout le contexte]      [direction créative]           [code le composant]          [vérifie les règles]
    _preflight/*-context.md   _preflight/*-direction.md      components/*.tsx              pass/fail + corrections
```

**Custom subagents** : voir `.claude/agents/` (Phase A : wireframe-validator, token-auditor | Phase B : context-assembler, aesthetic-director, constraint-validator)

## Matrice Détaillée

### Phase A : Architecture

| Étape | Stage | Inputs Requis | Outputs | Dépend de |
|-------|-------|---------------|---------|-----------|
| **A01** | `A01-init.md` | `pipeline/input/brief-client.md`, `pipeline/input/forms/*` (optionnel) | `pipeline/output/00-brief.md` | - |
| **A02** | `A02-brand/` | `00-brief.md`, `pipeline/input/forms/*` (si référencé dans Sources Externes), `.claude/skills/ui-ux-pro-max/data/` (recommande) | `pipeline/output/01-brand/` (8 fichiers) | A01 |
| **A03** | `A03-art-direction.md` | `01-brand/` (tous) | `pipeline/output/02-art-direction/` (7 fichiers) | A02 |
| **A04** | `A04-structure.md` | `00-brief.md`, `01-brand/`, `02-art-direction/emotion-map.md` | `pipeline/output/03-sitemap.md` | A02, A03 |
| **A05** | `A05-wireframes.md` | `01-brand/`, `02-art-direction/`, `03-sitemap.md` | `pipeline/output/03.5-wireframes/` | A03, A04 |
| **A06** | `A06-design-tokens.md` | `02-art-direction/`, `03.5-wireframes/` | `app/globals.css` | A03, A05 |

### Phase B : Design / Vibe Coding

| Étape | Stage | Inputs Requis | Agents | Outputs | Dépend de |
|-------|-------|---------------|--------|---------|-----------|
| **B01** | `B01-layout.md` | `globals.css`, `03-sitemap.md`, `project-dials.md` (globaux), `constraints.md`, `ui-kit.md` | Circuit complet (dials globaux) | `components/layout/`, `_preflight/` | A06 |
| **B02** | `B02-homepage.md` | `03.5-wireframes/homepage.md`, `project-dials.md` (section), `emotion-map.md`, `constraints.md`, `ui-kit.md` | Circuit complet (dials section) | `components/sections/`, `app/page.tsx`, `_preflight/homepage/` | B01 |
| **B03** | `B03-pages.md` | `03.5-wireframes/*.md`, mêmes sources A3 | Circuit complet (dials section) | `app/[pages]/`, `components/pages/`, `_preflight/[pages]/` | B01 |
| **B04** | `B04-polish.md` | Composants B01-B03, `project-dials.md`, `ui-kit.md`, `emotion-map.md` | Constraint Validator (pass) + circuit si nouveau composant | Animations, SEO, cohérence | B02, B03 |
| **B05** | `B05-validate.md` | Tout le site, tous les outputs A3 | Constraint Validator (pass final global) | `output/07-validation.md` | B04 |
| **B06** | `B06-deploy.md` | Validation PASS | — | `output/08-deploy.md`, Production | B05 |

### Parallélisme

- **A03** et **A04** peuvent démarrer en quasi-parallèle après A02 (A04 peut commencer, mais enrichit ses sections avec emotion-map de A03)
- **B02** et **B03** peuvent être développés en parallèle après B01
- Progression recommandée : **linéaire** pour simplifier le suivi

## Règles de Lecture de Contexte

### Pattern "Context Assembler" (remplace le Lazy Loading v1)

En v2, le chargement de contexte est délégué à l'agent Context Assembler :

1. **L'agent lit** le wireframe de la section
2. **L'agent résout** TOUS les pointeurs (brand, art direction, tokens)
3. **L'agent produit** un context block auto-suffisant dans `_preflight/`
4. **Claude code** en lisant uniquement les 2 fichiers preflight (context + direction)

```
Exemple pour Homepage > Hero :
1. Context Assembler lit output/03.5-wireframes/homepage.md > Hero
2. Résout : positioning.md > tagline, emotion-map.md > Hero, project-dials.md > Hero
3. Produit : _preflight/homepage/hero-context.md (auto-suffisant)
4. Aesthetic Director produit : _preflight/homepage/hero-direction.md
5. Claude code hero.tsx en lisant ces 2 fichiers
```

### Fichiers Toujours Accessibles

Ces fichiers peuvent être lus à **toute étape** :

- `app/globals.css` — Design tokens
- `output/02-art-direction/constraints.md` — Règles design
- `output/02-art-direction/project-dials.md` — Dials + arsenal
- `output/02-art-direction/ui-kit.md` — Composants autorisés
- `output/02-art-direction/visual-vocabulary.md` — Traductions visuelles
- `CLAUDE.md` — Statut et contexte global

## Composants Partagés

| Composant | Créé à | Utilisé par |
|-----------|--------|-------------|
| `AnimatedSection` | B02 | B02, B03 (toutes pages) |
| `CtaFinal` | B02 | B03 (Services, Portfolio, About) |
| `SmoothScrollProvider` | B01 | B01+ (layout global) |

## Fichiers Agents

| Agent | Spec | Modèle | Usage |
|-------|------|--------|-------|
| Context Assembler | `agents/context-assembler.md` | Haiku | Résolution contexte |
| Aesthetic Director | `agents/aesthetic-director.md` | Opus 4.6 | Direction créative |
| Constraint Validator | `agents/constraint-validator.md` | Haiku | Vérification règles |

---

*Template Workflow v2.0 — 2026-03-03*
