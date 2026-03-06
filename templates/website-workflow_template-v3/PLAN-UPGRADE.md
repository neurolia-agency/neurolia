# Plan Upgrade — website-workflow template-v3

> Fichier de memoire permanente pour le suivi des upgrades du template.
> Derniere mise a jour : 2026-03-05

---

## Phase 1 : Mise a jour modele (sonnet -> opus-4.6) — COMPLETE

**Objectif** : Backporter le changement de modele de l'aesthetic-director, valide sur `client-strictfood`.

### Template (14 fichiers modifies, ~25 remplacements)

| # | Fichier | Changement |
|---|---------|------------|
| 1 | `.claude/agents/aesthetic-director.md` | `model: sonnet` -> `model: opus-4.6` |
| 2 | `.claude/skills/section-builder/SKILL.md` | `[sonnet]` -> `[opus-4.6]`, `model: "sonnet"` -> `model: "opus-4.6"` |
| 3 | `.claude/rules/phase-b-circuit.md` | `(sonnet)` -> `(opus-4.6)` |
| 4 | `.claude/rules/pipeline-structure.md` | `# Sonnet —` -> `# Opus 4.6 —` |
| 5 | `README.md` | 4 occurrences (circuit, arbre, tableau agents, stack) |
| 6 | `pipeline/workflow/README.md` | Circuit + tableau agents |
| 7 | `pipeline/workflow/DEPENDENCIES.md` | Circuit + tableau agents |
| 8 | `pipeline/workflow/DESIGN_STACK.md` | Tableau AI/Agents |
| 9 | `pipeline/stages/B01-layout.md` | Circuit + footer metadata |
| 10 | `pipeline/stages/B02-homepage.md` | Circuit + footer metadata |
| 11 | `pipeline/stages/B03-pages.md` | Circuit + footer metadata |
| 12 | `pipeline/stages/B04-polish.md` | Circuit |
| 13 | `SESSION-MEMORY.md` | 3 occurrences (architecture + tableau fichiers) |

### Client-strictfood (coherence doc vs agent) — 10 fichiers

L'agent `aesthetic-director.md` etait deja a `opus-4.6`. La doc a ete alignee.

| # | Fichier | Changement |
|---|---------|------------|
| 1 | `.claude/skills/section-builder/SKILL.md` | `[opus]` -> `[opus-4.6]`, `model: "opus"` -> `model: "opus-4.6"` |
| 2 | `.claude/rules/phase-b-circuit.md` | `(sonnet)` -> `(opus-4.6)` |
| 3 | `.claude/rules/pipeline-structure.md` | `# Sonnet —` -> `# Opus 4.6 —` |
| 4 | `pipeline/workflow/README.md` | Circuit + tableau agents |
| 5 | `pipeline/workflow/DEPENDENCIES.md` | Circuit + tableau agents |
| 6 | `pipeline/workflow/DESIGN_STACK.md` | Tableau AI/Agents |
| 7 | `pipeline/stages/B01-layout.md` | Circuit + footer metadata |
| 8 | `pipeline/stages/B02-homepage.md` | Circuit + footer metadata |
| 9 | `pipeline/stages/B03-pages.md` | Circuit + footer metadata |
| 10 | `pipeline/stages/B04-polish.md` | Circuit |

**Note** : Les references `sonnet-4.6` dans les blocs Configuration des stages client (A02, A06, B05, B06) sont des specifications de modele pour l'execution du stage — PAS des references a l'aesthetic-director. Elles n'ont pas ete modifiees.

### Verification

```bash
# Template : 0 resultats
grep -ri "sonnet" neurolia/templates/website-workflow_template-v2/

# Client-strictfood .claude/ : 0 resultats
grep -ri "sonnet" client-strictfood/.claude/

# Client-strictfood pipeline/ : seuls "sonnet-4.6" dans Configuration stages (attendu)
grep -ri "sonnet" client-strictfood/pipeline/
```

---

## Phase 2 : Comparatif frontend-design2 vs ui-ux-pro-max

### Vue d'ensemble

| Dimension | frontend-design2 | ui-ux-pro-max |
|-----------|-------------------|---------------|
| **Type** | Regles comportementales (227 lignes MD) | Data-driven (14KB MD + 275KB CSV + 59KB Python) |
| **Format** | 1 fichier SKILL.md embedded | 1 SKILL.md + donnees CSV + CLI Python |
| **Installation** | `.claude/skills/` (local au projet) | `~/.claude/skills/` (global) + CLI |
| **Invocation** | Read explicite dans le circuit | Skill global auto-discovered |

### Systeme de Dials

| Aspect | frontend-design2 | ui-ux-pro-max |
|--------|-------------------|---------------|
| Dials | DESIGN_VARIANCE / MOTION_INTENSITY / VISUAL_DENSITY (1-10) | Pas de systeme de dials |
| Calibrage par section | Oui (via project-dials.md) | Non |
| Impact pipeline | Le circuit entier depend des dials (context-assembler, aesthetic-director, constraint-validator) | Pas d'integration pipeline |

### Anti-slop / Qualite

| Aspect | frontend-design2 | ui-ux-pro-max |
|--------|-------------------|---------------|
| AI Tells interdits | 100 patterns nommes (Section 7) | ~20 regles dans checklist |
| Anti-patterns | Liste exhaustive avec exemples | References basiques |
| Test qualite | "Est-ce [PROJET] ?" (8 criteres) | Checklist generique |

### Arsenal creatif

| Aspect | frontend-design2 | ui-ux-pro-max |
|--------|-------------------|---------------|
| Techniques nommees | 30+ concepts (Text Scramble, Magnetic Button, Sticky Scroll Stack, etc.) | Pas d'arsenal equivalent |
| Motion engine | Spring physics, bento paradigm (Section 9) | References basiques |
| Selection par section | Oui (dans project-dials.md > Arsenal) | Non |

### Donnees design

| Aspect | frontend-design2 | ui-ux-pro-max |
|--------|-------------------|---------------|
| Palettes couleurs | Regles generales (max 1 accent, sat < 80%) | 97 palettes par industrie (CSV) |
| Typographie | Bans + recommandations | 57 pairings par mood (CSV) |
| Stacks supportes | Next.js + Tailwind + Motion | 13 stacks (React, Vue, Svelte, Flutter, etc.) |
| Composants | Architecture via ui-kit.md | Patterns par stack |

### Integration pipeline

| Aspect | frontend-design2 | ui-ux-pro-max |
|--------|-------------------|---------------|
| Chargement | Read explicite (etape 3) + `skills: [frontend-design2]` (constraint-validator) | Auto-discovery global |
| Dependances | Aucune (pure MD) | Python (pour CLI/generation) |
| Pipeline v2 | Natif (concu pour) | Necessiterait adaptation |

### Risques du swap

1. **Rupture des dials** : Le pipeline depend des dials (project-dials.md, context-assembler, aesthetic-director, constraint-validator). `ui-ux-pro-max` n'a pas ce systeme → il faudrait soit adapter le pipeline, soit ne pas utiliser les dials.

2. **Rupture du constraint-validator** : L'agent reference des sections specifiques de frontend-design2 (Section 7 = AI Tells, Section 8 = Arsenal). Avec ui-ux-pro-max, ces references seraient invalides.

3. **Dependance Python** : frontend-design2 est pure Markdown (zero dependance). ui-ux-pro-max necessite Python pour la CLI et la generation. Ajoute de la complexite au setup.

4. **Perte d'arsenal creatif** : Les 30+ techniques nommees de frontend-design2 sont utilisees par l'aesthetic-director pour ses recommandations. ui-ux-pro-max n'a pas d'equivalent.

5. **Gain potentiel** : Les 97 palettes par industrie et 57 font pairings pourraient enrichir les etapes A03 (art direction) et A06 (design tokens), mais au prix d'une perte de controle fin via les dials.

### Verdict

**frontend-design2** est plus adapte au pipeline v2 car il est natif (concu pour le circuit d'agents, les dials, et le constraint-validator). **ui-ux-pro-max** apporte des donnees riches (palettes, typo) mais sans integration pipeline.

**Recommandation** : Tester ui-ux-pro-max en complement (pas en remplacement) — par exemple en l'utilisant pendant A03 pour enrichir les choix de palettes et typographies, tout en gardant frontend-design2 pour la Phase B.

---

## Phase 3 : Swap skill (pour test) — SUPERSEDE PAR PHASE 4

> Cette phase ne sera executee que sur validation explicite de l'utilisateur.

### Strategie proposee : cohabitation (pas de swap complet)

Plutot qu'un remplacement risque, tester la cohabitation :

1. **Copier** `~/.claude/skills/ui-ux-pro-max/` dans `.claude/skills/ui-ux-pro-max/` du template
2. **Garder** `frontend-design2/` a cote (rollback facile)
3. **Utiliser ui-ux-pro-max** uniquement en Phase A (A03 art direction) pour les palettes et font pairings
4. **Garder frontend-design2** pour Phase B (dials, anti-slop, arsenal, constraint-validator)

### Si swap complet souhaite

Fichiers a modifier :

| # | Fichier | Changement |
|---|---------|------------|
| 1 | `.claude/skills/section-builder/SKILL.md` | Diagramme, prerequisites, etape 3, priorites |
| 2 | `.claude/agents/constraint-validator.md` | `skills: [ui-ux-pro-max]`, references sections |
| 3 | `README.md` | References frontend-design2 → ui-ux-pro-max |
| 4 | `CLAUDE.md` | Sources de verite |
| 5 | `pipeline/workflow/README.md` | Circuit + workflow |
| 6 | `pipeline/workflow/DESIGN_STACK.md` | Tableau AI/Agents |
| 7 | `pipeline/stages/B01-layout.md` | Circuit + skill |
| 8 | `pipeline/stages/B02-homepage.md` | Circuit + skill |
| 9 | `pipeline/stages/B03-pages.md` | Circuit + skill |
| 10 | `pipeline/stages/B04-polish.md` | Circuit + skill |
| 11 | `.claude/rules/phase-b-circuit.md` | References skill |

**Prerequis avant swap** :
- [ ] Adapter le constraint-validator a la structure de ui-ux-pro-max (sections differentes)
- [ ] Definir comment remplacer les dials (VARIANCE/MOTION/DENSITY) ou les supprimer
- [ ] Tester sur un projet pilote avant de merger dans le template

---

## Phase 4 : Integration ui-ux-pro-max en complement — COMPLETE

**Objectif** : Utiliser les donnees riches de `ui-ux-pro-max` (97 palettes, 57 font pairings) comme point de depart en Phase A (A02-Brand), sans toucher a la Phase B (frontend-design2 intact).

### Decisions

| Question | Decision |
|----------|----------|
| Copie locale ou reference globale ? | Copie locale (data-only : SKILL.md + 2 CSVs, ~40KB) |
| HEX (CSV) vs OKLCH (pipeline) ? | CSV = HEX, output final = OKLCH (conversion dans A02) |
| Obligatoire ou recommande ? | Recommande — skip si le client fournit deja palette/typo |
| Garder les regles anti-slop ? | Oui — internalisees comme "Contraintes Qualite" |
| Python CLI ? | Non — Claude lit les CSVs directement |

### Fichiers modifies (15 fichiers)

| # | Fichier | Action |
|---|---------|--------|
| 1 | `.claude/skills/ui-ux-pro-max/SKILL.md` | CREE — schema CSV + process lookup |
| 2 | `.claude/skills/ui-ux-pro-max/data/colors.csv` | CREE — copie depuis global |
| 3 | `.claude/skills/ui-ux-pro-max/data/typography.csv` | CREE — copie depuis global |
| 4 | `pipeline/stages/A02-brand/03-production-visual.md` | MODIFIE — sections couleurs + typo |
| 5 | `pipeline/stages/A02-brand/04-validation.md` | MODIFIE — checks qualite |
| 6 | `pipeline/stages/A02-brand.md` | MODIFIE — skill recommande |
| 7 | `pipeline/stages/A03-art-direction.md` | MODIFIE — note informative |
| 8 | `CLAUDE.md` | MODIFIE — source de verite |
| 9 | `README.md` | MODIFIE — skill + arborescence + v3.0 |
| 10 | `pipeline/workflow/DESIGN_STACK.md` | MODIFIE — tableau AI/Agents |
| 11 | `pipeline/workflow/DEPENDENCIES.md` | MODIFIE — inputs A02 |
| 12 | `CHANGELOG.md` | MODIFIE — v3 documentee |
| 13 | `SESSION-MEMORY.md` | MODIFIE — section v3 |
| 14 | `PLAN-UPGRADE.md` | MODIFIE — Phase 4 |
| 15 | `.claude/rules/pipeline-structure.md` | MODIFIE — arborescence skills |

### Non modifies (Phase B intacte)

- `.claude/skills/frontend-design2/SKILL.md`
- `.claude/skills/section-builder/SKILL.md`
- `.claude/agents/*` (5 agents)
- `.claude/rules/phase-b-circuit.md`
- `pipeline/stages/B01-B06`
- `pipeline/stages/A06-design-tokens.md`

---

## Historique

| Date | Phase | Action |
|------|-------|--------|
| 2026-03-05 | 1 | Backport opus-4.6 dans template (14 fichiers) |
| 2026-03-05 | 1 | Coherence doc client-strictfood (10 fichiers) |
| 2026-03-05 | 2 | Comparatif frontend-design2 vs ui-ux-pro-max |
| 2026-03-05 | 3 | Supersede par Phase 4 (cohabitation v3) |
| 2026-03-05 | 4 | Integration ui-ux-pro-max en complement (template v3) |
