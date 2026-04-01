# Pipeline Workflow v4.0

Index des fichiers de documentation du workflow.

## Structure en 2 Phases

### Phase A : Architecture (Markdown uniquement)
```
A01-Init -> A02-Brand -> A03-Art Direction -> A04-Structure -> A05-Creative Briefs -> A06-Design Tokens
```

### Phase B : Design / Vibe Coding (Code avec frontend-design2 + agents)
```
B01-Layout -> B02-Homepage -> B03-Pages -> B04-Polish -> B05-Validate -> B06-Deploy
```

## Circuit d'Agents v4 (Phase B)

Chaque composant/section passe par :

```
Claude + frontend-design2 (DECIDE + CODE) -> Technical Validator (haiku)
```

frontend-design2 EST le creative director ET le codeur. Il decide librement le layout, les techniques et les dials, puis code. Le Technical Validator verifie les regles techniques (pas les choix creatifs).

## Fichiers

| Fichier | Contenu |
|---------|---------|
| `DESIGN_STACK.md` | Stack technique, structure codebase, conventions |
| `DEPENDENCIES.md` | Matrice inputs/outputs, circuit agents, parallelisme |

## Custom Subagents

Definis dans `.claude/agents/` (racine du projet) :

| Fichier | Agent | Phase | Modele | Skills precharges |
|---------|-------|-------|--------|-------------------|
| `technical-validator.md` | Verificateur technique | B | Haiku | frontend-design2 |
| `visual-reviewer.md` | Evaluation visuelle | B (opt.) | Haiku | — |
| `source-reader.md` | Utilitaire resolution | B (opt.) | Haiku | — |
| `wireframe-validator.md` | Validateur briefs | A05 | Haiku | — |
| `token-auditor.md` | Auditeur tokens CSS | A06 | Haiku | — |

## Phase B : Workflow par section

1. **Claude + frontend-design2** lit le creative brief + sources -> DECIDE layout, technique, dials -> CODE le composant
2. **Technical Validator** verifie le code -> pass/fail + corrections

**Fichiers cles consommes** :
- `output/03.5-wireframes/*.md` — Creative Briefs (contenu + emotion + contraintes)
- `output/02-art-direction/project-dials.md` — Dials globaux + Creative Palette
- `output/02-art-direction/constraints.md` — ON FAIT / ON NE FAIT PAS
- `output/02-art-direction/ui-kit.md` — Composants autorises
- `output/02-art-direction/emotion-map.md` — Emotions par section

**Regle** : Ne jamais ecrire de composant UI sans passer par le circuit.

---

*Template Workflow v4.0 — 2026-03-21*
