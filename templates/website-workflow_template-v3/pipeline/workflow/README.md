# Pipeline Workflow v2.0

Index des fichiers de documentation du workflow.

## Structure en 2 Phases

### Phase A : Architecture (Markdown uniquement)
```
A01-Init → A02-Brand → A03-Art Direction → A04-Structure → A05-Wireframes → A06-Design Tokens
```

### Phase B : Design / Vibe Coding (Code avec frontend-design2 + agents)
```
B01-Layout → B02-Homepage → B03-Pages → B04-Polish → B05-Validate → B06-Deploy
```

## Circuit d'Agents (Phase B)

Chaque composant/section passe par :

```
Context Assembler (haiku) → Aesthetic Director (opus-4.6) → Claude + frontend-design2 → Constraint Validator (haiku)
```

Custom subagents : `.claude/agents/` (context-assembler, aesthetic-director, constraint-validator)

## Fichiers

| Fichier | Contenu |
|---------|---------|
| `DESIGN_STACK.md` | Stack technique, structure codebase, conventions |
| `DEPENDENCIES.md` | Matrice inputs/outputs, circuit agents, parallélisme |

## Custom Subagents

Définis dans `.claude/agents/` (racine du projet, pas dans pipeline/) :

| Fichier | Agent | Phase | Modèle | Skills préchargés |
|---------|-------|-------|--------|-------------------|
| `.claude/agents/context-assembler.md` | Résolveur de contexte | B | Haiku | — |
| `.claude/agents/aesthetic-director.md` | Direction créative | B | Opus 4.6 | — |
| `.claude/agents/constraint-validator.md` | Vérificateur de règles | B | Haiku | frontend-design2 |
| `.claude/agents/wireframe-validator.md` | Validateur wireframes | A05 | Haiku | — |
| `.claude/agents/token-auditor.md` | Auditeur tokens CSS | A06 | Haiku | — |

## Source Unique

**Statut pipeline et flux de contexte** : voir `CLAUDE.md` (racine du projet)

## Exécuter une Étape

```bash
# Phase A (Architecture) - Production de documents Markdown
/apex -a -s exécuter étape [XX]-[nom] depuis stages/[XX]-[nom].md
```

## Phase B : Vibe Coding avec frontend-design2 + agents

**OBLIGATOIRE** : Tout développement UI en Phase B passe par le circuit d'agents.

**Workflow par section** :
1. **Context Assembler** lit le wireframe → produit `_preflight/[page]/[section]-context.md`
2. **Aesthetic Director** lit le context block → produit `_preflight/[page]/[section]-direction.md`
3. **Claude + frontend-design2** lit les 2 fichiers preflight → code le composant
4. **Constraint Validator** vérifie le code → pass/fail + corrections

**Fichiers clés consommés** :
- `output/02-art-direction/project-dials.md` — Dials par section
- `output/02-art-direction/constraints.md` — Règles ON FAIT / ON NE FAIT PAS
- `output/02-art-direction/ui-kit.md` — Composants autorisés
- `output/02-art-direction/emotion-map.md` — Émotions par section

**Règle** : Ne jamais écrire de composant UI sans passer par le circuit. Les fichiers `_preflight/` sont la trace de ce circuit.

---

*Template Workflow v2.0 — 2026-03-03*
