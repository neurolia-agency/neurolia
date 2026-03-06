# Mémoire de Session — website-workflow template-v3

> Fichier de continuité entre sessions Claude. Lire ce fichier en début de nouvelle session pour reprendre le travail sans perte de contexte.
> Dernière mise à jour : 2026-03-05 (session v3 — integration ui-ux-pro-max)

---

## 1. Contexte du projet

**Qui** : Joris, fondateur de l'agence Neurolia.
**Quoi** : Un template de pipeline pour créer des sites web avec Claude Code. Le template orchestre 12 étapes (A01→A06 = architecture, B01→B06 = code) et utilise un circuit d'agents spécialisés pour produire du frontend non-générique.
**Où** : `/neurolia/templates/website-workflow_template-v3/`
**Repo** : `/neurolia/` (les agents et skills existent aussi au niveau repo dans `/neurolia/.claude/`)

---

## 2. Architecture actuelle du pipeline

### Vue d'ensemble

```
Phase A (Architecture — documents Markdown)
A01-Init → A02-Brand → A03-Art Direction → A04-Structure → A05-Wireframes → A06-Design Tokens

Phase B (Code — composants React/Next.js)
B01-Layout → B02-Homepage → B03-Pages → B04-Polish → B05-Validate → B06-Deploy
```

### Circuit d'agents Phase B (pour chaque section)

```
Étape 1 → context-assembler (haiku)     : résout les pointeurs wireframe → context block
Étape 2 → aesthetic-director (opus-4.6)    : traduit le context en direction créative
Étape 3 → Claude direct + frontend-design2 : code le composant .tsx
Étape 4 → constraint-validator (haiku)   : vérifie contre les règles projet
```

### Agents de validation Phase A

```
A05 → wireframe-validator (haiku) : valide structure/complétude des wireframes
A06 → token-auditor (haiku)       : audite couverture visual-vocabulary → globals.css
```

### Arborescence .claude/

```
.claude/
├── settings.json                   # Hooks PostToolUse (rappel constraint-validator)
├── rules/
│   ├── phase-b-circuit.md          # Flux circuit d'agents Phase B
│   └── pipeline-structure.md       # Arborescence complète du projet
├── agents/
│   ├── context-assembler.md        # Haiku — Phase B étape 1 (permissionMode: acceptEdits)
│   ├── aesthetic-director.md       # Opus 4.6 — Phase B étape 2 (permissionMode: acceptEdits)
│   ├── constraint-validator.md     # Haiku — Phase B étape 4 (permissionMode: dontAsk, skills: [frontend-design2])
│   ├── wireframe-validator.md      # Haiku — fin A05 (permissionMode: dontAsk)
│   ├── token-auditor.md            # Haiku — fin A06 (permissionMode: dontAsk)
│   └── references/                 # Checklists détaillées (extraites des agents)
│       ├── token-audit-checklist.md
│       └── wireframe-checklist.md
└── skills/
    ├── section-builder/SKILL.md    # Orchestrateur Phase B + Protocole FAIL
    ├── frontend-design2/SKILL.md   # Règles anti-slop, dials, arsenal créatif (Phase B)
    └── ui-ux-pro-max/              # Donnees design Phase A (palettes + font pairings)
        ├── SKILL.md
        └── data/
            ├── colors.csv          # 97 palettes par industrie
            └── typography.csv      # 57 font pairings par mood
```

### Skills globaux utilisés (installés dans ~/.claude/skills/)

- `/brand-expression` — A02 phase 3a (expression verbale)
- `/workflow-apex` — exécution des stages

---

## 3. Décisions d'architecture et leurs justifications

### Pourquoi des custom subagents plutôt que des skills ?

**Problème initial** : Le skill `frontend-design2` n'était pas chargé de façon garantie. La description disait "déjà actif" — c'était faux. L'auto-discovery des skills est best-effort.

**Recherche effectuée** : Documentation officielle Claude Code sur skills, subagents, Agent Teams.

**Résultat** :
- Le champ `skills:` dans le frontmatter d'un custom subagent = **chargement garanti** (injection au démarrage)
- Les subagents **ne peuvent pas** spawner d'autres subagents (limitation critique)
- Agent Teams = parallèle, pas adapté aux pipelines séquentiels

**Architecture choisie** :
- `section-builder` reste un **skill** (pas un subagent) car il doit spawner les 3 subagents via Task tool
- `constraint-validator` a `skills: [frontend-design2]` dans son frontmatter → chargement garanti
- L'étape 3 (coding) est faite par Claude directement avec un Read explicite de frontend-design2

### Pourquoi wireframe-validator et token-auditor ?

**Analyse des maillons faibles** : On a cartographié chaque étape du pipeline avec sa protection qualité. Deux trous critiques identifiés :

1. **A05 Wireframes** : zéro contrôle automatisé sur le document le plus critique du pipeline. Les wireframes sont la source unique pour tout le circuit Phase B. Erreur ici = erreur amplifiée dans tout le circuit.

2. **A06 Design Tokens** : pas de vérification croisée entre visual-vocabulary.md et globals.css. Un token manquant → valeur hardcodée en Phase B → FAIL systématique du constraint-validator.

---

## 4. Fichiers modifiés (liste exhaustive)

### Créés

| Fichier | Contenu |
|---------|---------|
| `.claude/agents/context-assembler.md` | Subagent haiku, résout contexte, 7 fichiers sources, format output strict |
| `.claude/agents/aesthetic-director.md` | Subagent opus-4.6, direction créative, calibrage par dials |
| `.claude/agents/constraint-validator.md` | Subagent haiku, `skills: [frontend-design2]`, checklist 8 points |
| `.claude/agents/wireframe-validator.md` | Subagent haiku, 4 catégories de validation (couverture, complétude, refs, qualité) |
| `.claude/agents/token-auditor.md` | Subagent haiku, audit 8 catégories + qualité + cohérence |

### Réécrits

| Fichier | Ce qui a changé |
|---------|-----------------|
| `.claude/skills/section-builder/SKILL.md` | Cible les custom subagents par nom au lieu de "general-purpose". Prompts allégés (données dynamiques seulement). Diagramme d'architecture. |
| `.claude/skills/frontend-design2/SKILL.md` | Frontmatter corrigé : `name: frontend-design2` (était `design-taste-frontend`) |
| `CLAUDE.md` | Sources de vérité, arbre de structure, flux Phase B, tout réécrit pour v2 |
| `README.md` | Vue d'ensemble, circuit d'agents, structure, Quick Start, tout réécrit pour v2 |

### Modifiés (éditions ciblées)

| Fichier | Modification |
|---------|-------------|
| `pipeline/stages/A05-wireframes.md` | Section Validation remplacée par wireframe-validator + checklist manuelle réduite |
| `pipeline/stages/A06-design-tokens.md` | Section Validation remplacée par token-auditor + checklist manuelle réduite |
| `pipeline/stages/B01-layout.md` | Référence "Read explicite de frontend-design2/SKILL.md" |
| `pipeline/stages/B02-homepage.md` | Idem + mise à jour de l'étape 3 |
| `pipeline/stages/B03-pages.md` | Idem |
| `pipeline/stages/B04-polish.md` | Idem |
| `pipeline/workflow/README.md` | Tableau agents → 5 agents avec phases. Section "Fichiers Agents" → "Custom Subagents" |
| `pipeline/workflow/DEPENDENCIES.md` | Référence `.claude/agents/` avec les 5 agents |
| `pipeline/workflow/DESIGN_STACK.md` | Tableau AI/Agents → 5 agents + colonne Phase. Arbre sans `pipeline/agents/` |

### Copies repo-level synchronisées

Tous les fichiers `.claude/agents/*.md` et `.claude/skills/*/SKILL.md` du template ont été copiés dans `/neurolia/.claude/` pour rester synchronisés.

---

## 5. Ce qui reste à faire

### Améliorations futures possibles

- [ ] **Tester le pipeline sur un vrai projet** pour valider que les subagents fonctionnent bien avec le Task tool et que le section-builder orchestre correctement.
- [ ] **Valider que `subagent_type: "context-assembler"` etc.** fonctionne dans Claude Code CLI (c'est la syntaxe documentée pour les custom subagents, mais un test réel confirmera).

### Résolu

- [x] ~~Axe 1 — CLAUDE.md trop long (218 lignes)~~ — Sections flux et structure extraites vers `.claude/rules/`. CLAUDE.md réduit à 90 lignes.
- [x] ~~Axe 2 — Agents sans permissionMode~~ — `permissionMode` ajouté aux 5 agents (acceptEdits ou dontAsk).
- [x] ~~Axe 4 — Pas de hooks de validation~~ — `.claude/settings.json` créé avec hook PostToolUse pour rappel constraint-validator.
- [x] ~~Axe 5 — Pas de boucle FAIL documentée~~ — Protocole FAIL ajouté dans section-builder (max 2 itérations).
- [x] ~~Axe 6 — Agents trop longs (token-auditor 205L, wireframe-validator 152L)~~ — Checklists extraites dans `.claude/agents/references/`. Agents réduits à ~60-80 lignes.
- [x] ~~Axe 7 — A03 trop long (843 lignes)~~ — 7 templates extraits dans `pipeline/stages/A03-templates/`. A03 réduit à 266 lignes.
- [x] ~~Supprimer `pipeline/agents/`~~ — Fait. Les 3 fichiers orphelins ont été supprimés.
- [x] ~~Automatisation tests B05 (Lighthouse)~~ — Abandonné. Les tests performance se feront manuellement (décision Joris, 2026-03-04).
- [x] ~~Nommage outputs décalé dans CLAUDE.md/README.md~~ — Corrigé : `01-brief.md` → `00-brief.md`, `02-brand/` → `01-brand/`, aligné sur les stages et DEPENDENCIES.md.
- [x] ~~Nombre fichiers A02 incorrect~~ — Corrigé : "7 fichiers" → "8 fichiers" partout (inclut `00-platform.md`).
- [x] ~~Suppression `/canvas-design`~~ — Phase 3 (art direction board) retirée de A03. Output passe de 9 à 7 fichiers. Propagé dans CLAUDE.md, README.md, DEPENDENCIES.md, CHANGELOG.md.
- [x] ~~Terminologie Task vs Agent~~ — Corrigé : `Task()` → `Agent()` dans section-builder SKILL.md, A05-wireframes.md, A06-design-tokens.md.
- [x] ~~Dossier fantôme `04-design-tokens/`~~ — Supprimé de l'arborescence documentée (CLAUDE.md, README.md).
- [x] ~~Titre A04 incohérent~~ — Corrigé : "A4" → "A04" dans A04-structure.md.

### v3 — Integration ui-ux-pro-max (2026-03-05)

- [x] Copie locale `ui-ux-pro-max` (SKILL.md + 2 CSVs) dans `.claude/skills/ui-ux-pro-max/`
- [x] A02 Phase 3b : "Compatibilite frontend-design2" → "Point de depart ui-ux-pro-max" + "Contraintes Qualite"
- [x] A02 Phase 4 : "Compatibilite frontend-design2" → "Qualite visuelle" + checks personnalisation
- [x] A02 orchestrateur : skill recommande ajoute
- [x] A03 : note informative ajoutee
- [x] Documentation propagee (8 fichiers)
- [x] Phase B intacte (frontend-design2, agents, stages B01-B06)

### Note

- [ ] **GUIDE-UTILISATION.pdf** à régénérer — référence encore `pipeline/agents/` (supprimé) et "3 agents" au lieu de 5.

---

## 6. Points techniques à retenir

### Skills vs Subagents

| | Skill (.claude/skills/) | Custom Subagent (.claude/agents/) |
|---|---|---|
| Chargement | Best-effort (description match) | Task tool explicite |
| Contexte | Partagé avec conversation | Isolé |
| Peut spawner subagents | ✅ Oui | ❌ Non |
| `skills:` field | — | Injecte d'autres skills au démarrage |

### Conventions de nommage

- Agents : kebab-case (`context-assembler.md`)
- `name:` dans frontmatter = identifiant pour `subagent_type:` dans Task tool
- Les agents Phase B sont appelés par `section-builder` (skill)
- Les agents Phase A (wireframe-validator, token-auditor) sont appelés directement par Claude dans les stages

### Le pipeline/agents/ (SUPPRIMÉ)

Le dossier `pipeline/agents/` contenait 3 fichiers orphelins au format ancien. Il a été supprimé le 2026-03-04. Tous les agents sont dans `.claude/agents/`.

---

## 7. Comment reprendre

1. Lire ce fichier
2. Lire `CLAUDE.md` (statut pipeline + sources de vérité)
3. Si modification d'un agent → modifier dans le template ET copier au niveau repo
4. Si ajout d'un nouvel agent → l'ajouter dans : template `.claude/agents/`, repo `.claude/agents/`, CLAUDE.md, README.md, workflow/README.md, workflow/DESIGN_STACK.md, workflow/DEPENDENCIES.md
5. Pour tester : utiliser un vrai projet et lancer les stages un par un
