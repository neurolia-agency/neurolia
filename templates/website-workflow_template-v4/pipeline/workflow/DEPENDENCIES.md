# Dependances Inter-Etapes

Matrice des inputs/outputs par etape du pipeline.

## Vue d'Ensemble

```
==================================================================================
                        PHASE A : ARCHITECTURE
              (Definit CE QUI sera construit - Markdown uniquement)
==================================================================================

pipeline/input/brief-client.md
pipeline/input/forms/*.csv (optionnel)
        |
        v
+------------------+
|   A01: Init      | -> pipeline/output/00-brief.md
+------------------+
        |
        v
+------------------+
|   A02: Brand     | -> pipeline/output/01-brand/ (8 fichiers)
+------------------+
        |
        +--------------------------------------+
        v                                      v
+------------------+                  +------------------+
| A03: Art Dir     |                  |  A04: Structure  |
+------------------+                  +------------------+
        |                                      |
        |  pipeline/output/02-art-direction/   |  pipeline/output/03-sitemap.md
        |  (7 fichiers incl. project-dials,    |
        |   ui-kit, constraints, emotion-map)  |
        +--------------+-----------------------+
                       v
              +------------------+
              | A05: Creative    | -> pipeline/output/03.5-wireframes/
              |     Briefs       |     (contenu + emotion + contraintes)
              +------------------+
                       |
                       v
              +------------------+
              | A06: Design      | -> app/globals.css (tokens, transitions, ombres)
              +------------------+

==================================================================================
                     PHASE B : DESIGN / VIBE CODING
        (Construit le site avec frontend-design2 + circuit d'agents v4)
==================================================================================

              +------------------+
              |   B01: Layout    | -> components/layout/ + _preflight/
              +------------------+   (frontend-design2 : dials GLOBAUX)
                       |
        +--------------+--------------+
        v                              v
+------------------+          +------------------+
|   B02: Homepage  |          |   B03: Pages     |
+------------------+          +------------------+
  (frontend-design2            (frontend-design2
   decide par SECTION)           decide par SECTION)
        |                              |
        +--------------+---------------+
                       v
              +------------------+
              |   B04: Polish    | -> animations, SEO, coherence
              +------------------+   (Technical Validator pass)
                       |
                       v
              +------------------+
              |   B05: Validate  | -> output/07-validation.md
              +------------------+   (Technical Validator pass final GLOBAL)
                       |
                       v
              +------------------+
              |   B06: Deploy    | -> output/08-deploy.md
              +------------------+
```

## Circuit d'Agents v4 (Phase B)

Chaque composant/section passe par :

```
Claude + frontend-design2 (DECIDE + CODE) --> Technical Validator (haiku)
    [decide layout/tech/dials + code]        [verifie regles techniques]
    components/*.tsx                          pass/fail + corrections
```

**Custom subagents** : `.claude/agents/` (Phase A : wireframe-validator, token-auditor | Phase B : technical-validator, visual-reviewer (opt.), source-reader (opt.))

## Matrice Detaillee

### Phase A : Architecture

| Etape | Stage | Inputs Requis | Outputs | Depend de |
|-------|-------|---------------|---------|-----------|
| **A01** | `A01-init.md` | `pipeline/input/brief-client.md`, `pipeline/input/forms/*` (optionnel) | `pipeline/output/00-brief.md` | - |
| **A02** | `A02-brand/` | `00-brief.md`, forms (si ref.), `.claude/skills/ui-ux-pro-max/data/` (recommande) | `pipeline/output/01-brand/` (8 fichiers) | A01 |
| **A03** | `A03-art-direction.md` | `01-brand/` (tous) | `pipeline/output/02-art-direction/` (7 fichiers) | A02 |
| **A04** | `A04-structure.md` | `00-brief.md`, `01-brand/`, `02-art-direction/emotion-map.md` | `pipeline/output/03-sitemap.md` | A02, A03 |
| **A05** | `A05-wireframes.md` | `01-brand/`, `02-art-direction/`, `03-sitemap.md` | `pipeline/output/03.5-wireframes/` (Creative Briefs) | A03, A04 |
| **A06** | `A06-design-tokens.md` | `02-art-direction/`, `03.5-wireframes/` | `app/globals.css` | A03, A05 |

### Phase B : Design / Vibe Coding

| Etape | Stage | Inputs Requis | Agents | Outputs | Depend de |
|-------|-------|---------------|--------|---------|-----------|
| **B01** | `B01-layout.md` | `globals.css`, `03-sitemap.md`, art-direction/ | fd2 (decide+code) + Technical Validator | `components/layout/`, `_preflight/` | A06 |
| **B02** | `B02-homepage.md` | `03.5-wireframes/homepage.md`, art-direction/ | fd2 (decide+code) + Technical Validator | `components/sections/`, `app/page.tsx`, `_preflight/homepage/` | B01 |
| **B03** | `B03-pages.md` | `03.5-wireframes/*.md`, art-direction/ | fd2 (decide+code) + Technical Validator | `app/[pages]/`, `_preflight/[pages]/` | B01 |
| **B04** | `B04-polish.md` | Composants B01-B03, art-direction/ | Technical Validator (pass) + circuit si nouveau | Animations, SEO, coherence | B02, B03 |
| **B05** | `B05-validate.md` | Tout le site, art-direction/ | Technical Validator (pass final global) | `output/07-validation.md` | B04 |
| **B06** | `B06-deploy.md` | Validation PASS | — | `output/08-deploy.md`, Production | B05 |

### Parallelisme

- **A03** et **A04** peuvent demarrer en quasi-parallele apres A02
- **B02** et **B03** peuvent etre developpes en parallele apres B01
- Progression recommandee : **lineaire** pour simplifier le suivi

## Composants Partages

| Composant | Cree a | Utilise par |
|-----------|--------|-------------|
| `AnimatedSection` | B02 | B02, B03 |
| `CtaFinal` | B02 | B03 |
| `SmoothScrollProvider` | B01 | B01+ |

---

*Template Workflow v4.0 — 2026-03-21*
