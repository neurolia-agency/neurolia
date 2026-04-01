# Changelog — Website Workflow Template

Modifications propagées depuis les case studies vers le template canonical.

## [4.0] — 2026-03-21

### Restructuration creative — separer WHAT de HOW

**Probleme** : Le pipeline v3 sur-contraignait la creativite. Les wireframes prescrivaient le layout, les techniques et les dials par section, si bien que frontend-design2 n'avait plus rien a decider (entonnoir de convergence de ~100% a ~2% de liberte creative). Recherche 2026 : les prescriptions detaillees induisent un "fixation bias" qui produit du generique.

**Principe v4** : Phase A definit QUOI (contenu, emotion, contraintes). Phase B decide COMMENT (layout, technique, dials) via un Creative Director qui a le pouvoir de decision.

#### Circuit Phase B : v3 -> v4
```
v3 : Context Assembler -> Aesthetic Director -> Code + fd2 -> Constraint Validator (4 etapes)
v4 : Creative Director -> Code + fd2 -> Technical Validator (3 etapes)
```

#### Changements agents
- **creative-director.md** : NOUVEAU — opus-4.6, DECIDE layout, technique, dials par section (remplace aesthetic-director qui ne faisait que traduire)
- **technical-validator.md** : NOUVEAU — haiku, verifie regles techniques seulement (remplace constraint-validator qui verifiait aussi les choix creatifs)
- **source-reader.md** : NOUVEAU — haiku, utilitaire optionnel (remplace context-assembler qui etait une etape obligatoire)
- **visual-reviewer.md** : NOUVEAU — haiku, evaluation visuelle optionnelle via Playwright
- **aesthetic-director.md** : DEPRECATED (remplace par creative-director)
- **constraint-validator.md** : DEPRECATED (remplace par technical-validator)
- **context-assembler.md** : DEPRECATED (remplace par source-reader)

#### Changements templates Phase A
- **project-dials-template.md** : Retire dials par section + arsenal P0/P1. Ajoute "Creative Palette" (techniques compatibles sans assignation) + "Techniques Exclues"
- **emotion-map-template.md** : Retire "Techniques frontend-design2 recommandees" par section
- **A05-wireframes.md** : Creative Brief format (3 champs obligatoires : Contenu, Emotion, Contraintes). Retire : Layout, Fond, Dials override, Technique, Interaction
- **wireframe-checklist.md** : Adapte au format Creative Brief. Ajoute check D7 (pas de prescription layout/technique)

#### Changements skills
- **section-builder/SKILL.md** : Reecrit — circuit 3 etapes, Creative Director decide, Technical Validator verifie
- **frontend-design2/SKILL.md** : 3 notes v4 ajoutees (dials du Creative Director, techniques selectionnees par le Creative Director, reference technical-validator)

#### Documentation (10 fichiers)
- CLAUDE.md, README.md, phase-b-circuit.md, pipeline-structure.md, workflow/README.md, workflow/DEPENDENCIES.md, workflow/DESIGN_STACK.md, B01-B05 stages, A03 checklist

## [3.1] — 2026-03-20

### Skill brand-expression cree + optimisations workflow

- **`.claude/skills/brand-expression/`** : Nouveau skill creatif (v1.0) — corrige le bloquant A02 Phase 3a
  - `SKILL.md` : Process 5 etapes (Nourrir → Diverger → Evaluer → Choisir → Raffiner), 3 scopes (tagline, tone, messaging), 14 anti-patterns copy IA, calibration par archetype
  - `references/tagline-methodology.md` : Brand Ladder, Language Library, scoring detaille 4 criteres, verification de diversite
  - `references/tone-of-voice.md` : Spectrum mapping 4 axes, registre par archetype, construction champ lexical, arbre decision tutoiement/vouvoiement
  - `references/messaging-craft.md` : Mapping plateforme → sections, hierarchie CTAs, construction USPs, coherence inter-categories
- **`section-builder/SKILL.md`** : 3 optimisations majeures
  - Pipeline overlapping : etapes 1+2 de section N+1 en parallele de l'etape 3 de section N (pages multi-sections)
  - Protocole FAIL ameliore : arbre de decision 3 types (Type A tokens → fix auto, Type B contraintes → 2 iterations, Type C architecture → re-circuit complet)
  - B04 Polish : 3 niveaux de circuit (Micro/Mineur/Majeur) au lieu de 2
- **`frontend-design2/SKILL.md`** : 2 ajustements
  - Section 9 (Bento Paradigm) conditionne : ne s'applique qu'aux dashboards SaaS ou sections Bento explicites dans project-dials.md
  - Section 10 (Pre-flight Check) : note clarifiante — automatise par constraint-validator dans le pipeline, manuel uniquement hors circuit
- **Agents** : descriptions corrigees "v2" → "v3" (aesthetic-director, constraint-validator, context-assembler, section-builder)
- **Cleanup** : .DS_Store supprimes, .gitignore ajoute, pipeline-structure.md mis a jour avec brand-expression

## [3.0] — 2026-03-05

### Integration ui-ux-pro-max pour choix couleurs/typographie en A02

- **`.claude/skills/ui-ux-pro-max/`** : Nouveau skill data-only (SKILL.md + 2 CSVs, ~40KB)
  - `data/colors.csv` : 97 palettes par type de produit (HEX)
  - `data/typography.csv` : 57 font pairings par mood/industrie
  - `SKILL.md` : Schema CSV + process de lookup, zero dependance Python
- **`A02-brand/03-production-visual.md`** : Sections "Compatibilite frontend-design2" remplacees par :
  - "Point de depart : ui-ux-pro-max (recommande)" + lookup CSV
  - "Contraintes Qualite Couleurs/Typographie" (regles internalisees, plus d'attribution frontend-design2)
- **`A02-brand/04-validation.md`** : "Compatibilite frontend-design2" renomme en "Qualite visuelle" + checks personnalisation CSV
- **`A02-brand.md`** : `ui-ux-pro-max (recommande)` ajoute dans colonne Skill requis (Phase 3b) + footer
- **`A03-art-direction.md`** : Note ajoutee (colors.md/typography.md informes par ui-ux-pro-max)
- **Documentation** : CLAUDE.md, README.md, DESIGN_STACK.md, DEPENDENCIES.md, SESSION-MEMORY.md, PLAN-UPGRADE.md, pipeline-structure.md mis a jour
- **Phase B intacte** : frontend-design2, section-builder, agents, stages B01-B06 non modifies

## [Unreleased]

### 2026-03-05 — Support formulaires externes (CSV) dans A01/A02

- `pipeline/input/forms/` : nouveau dossier optionnel pour formulaires clients (CSV + manifests)
- `pipeline/input/forms/brand-platform-manifest.md` : manifest template pour formulaire Plateforme de marque (17 questions, mapping A01/A02/A03)
- `pipeline/input/README.md` : section forms/ ajoutée, checklist mise à jour
- `A01-init.md` : détection et extraction données formulaires vers brief, section "Sources Externes" dans le template output
- `A02-brand/01-diagnostic.md` : vérification Sources Externes, diagnostic pré-alimenté si formulaire disponible
- `A02-brand/02-platform.md` : bloc conditionnel avec correspondance CSV → composants plateforme
- `DEPENDENCIES.md` : inputs A01/A02 mis à jour, diagramme d'entrée enrichi
- `.claude/rules/pipeline-structure.md` : arborescence input/ mise à jour avec forms/
- `CLAUDE.md` : Sources de Vérité mise à jour
- `README.md` : Quick Start et arborescence mis à jour
- Rétro-compatible : brief-client.md reste seul fichier obligatoire

### 2026-03-04 — Optimisation Workflow Template v2 (6 axes P0+P1)

- **Axe 1 — CLAUDE.md → rules/** : Sections "Flux de Contexte" et "Structure" extraites vers `.claude/rules/phase-b-circuit.md` et `.claude/rules/pipeline-structure.md`. CLAUDE.md passe de 218 → 90 lignes.
- **Axe 2 — permissionMode** : Ajout `permissionMode` dans le frontmatter des 5 agents (`acceptEdits` pour context-assembler/aesthetic-director, `dontAsk` pour constraint-validator/wireframe-validator/token-auditor).
- **Axe 4 — Hooks settings.json** : Création `.claude/settings.json` avec hook PostToolUse qui rappelle de lancer constraint-validator après modification de composants.
- **Axe 5 — Boucle FAIL** : Ajout "Protocole FAIL" dans section-builder/SKILL.md — boucle de correction max 2 itérations avant STOP.
- **Axe 6 — Agents → refs séparées** : Checklists détaillées extraites de token-auditor.md et wireframe-validator.md vers `.claude/agents/references/`. Agents réduits à ~60-80 lignes.
- **Axe 7 — A03 → templates séparés** : 7 templates markdown extraits de A03-art-direction.md vers `pipeline/stages/A03-templates/`. A03 passe de 843 → 266 lignes.

### 2026-03-04 — Suppression `/canvas-design` de A03

- **A03-art-direction.md** : Phase 3 (Art Direction Board / `/canvas-design`) supprimée. Output passe de 9 à 7 fichiers (suppression `art-direction-philosophy.md` + `art-direction-board.png`). Phase 4 (Validation) renommée en Phase 3. Checklist "Art Direction Board" supprimée. Table README nettoyée.
- **CLAUDE.md** : `(9 fichiers)` → `(7 fichiers)` (3 occurrences)
- **README.md** : `(9 fichiers)` → `(7 fichiers)` (3 occurrences), liste fichiers A03 corrigée
- **DEPENDENCIES.md** : `(9 fichiers)` → `(7 fichiers)` (2 occurrences)
- **SESSION-MEMORY.md** : `/canvas-design` retiré des skills globaux, ajouté dans "Résolu"

### 2026-03-04 — Cohérence nommage & terminologie (audit global)

- **CLAUDE.md** : Nommage outputs corrigé (`01-brief.md` → `00-brief.md`, `02-brand/` → `01-brand/`), "7 fichiers" → "8 fichiers" pour A02, dossier `04-design-tokens/` supprimé de l'arborescence
- **README.md** : Mêmes corrections de nommage et arborescence
- **DEPENDENCIES.md** : `(7+ fichiers)` → `(8 fichiers)` pour A02
- **section-builder/SKILL.md** : `Task` → `Agent` dans frontmatter et pseudo-code (4 blocs)
- **A04-structure.md** : Titre "A4" → "A04"
- **A05-wireframes.md** : `Task()` → `Agent()` pour wireframe-validator
- **A06-design-tokens.md** : `Task()` → `Agent()` pour token-auditor
- **SESSION-MEMORY.md** : Corrections ajoutées dans "Résolu", note PDF à régénérer

### 2026-02-18 — A01-Init v2.0 (case study: La Pause)

- **`pipeline/stages/A01-init.md`** : Refonte complète v1.0 → v2.0
  - Instructions enrichies : 4 → 6 étapes (analyse assets, recherche concurrentielle, listing manquants)
  - Template output : +8 sections (Livrables, Cibles/Personas, Offre, Concurrence, Identité Visuelle, Pré-Requis Techniques, Éléments Manquants, Notes Stratégiques)
  - Checklist validation : 6 → 11 items
  - Principe "documenter 'À confirmer' plutôt qu'omettre" ajouté
  - Nommage normalisé "A01" (était "A1")

### 2026-02-18 — A02-Brand v3.0 (case study: La Pause + Opendoor)

- **`pipeline/stages/A02-brand.md`** : v2.1 → v3.0
  - Phase 2 ajoutée : Plateforme de marque (00-platform.md) — fondation stratégique
  - Frameworks intégrés : Brand Key (Unilever), Prisme de Kapferer, 12 archétypes jungiens
  - Output : 7 → 8 fichiers (+00-platform.md)
  - Phases : 3 → 4 (Lecture → Plateforme → Production → Vérification)
  - Invocation obligatoire `/brand-expression` pour fichiers créatifs (positioning, about, services, tone)
  - Dérivation traçable : chaque fichier output a `<!-- Dérive de : 00-platform.md > [Composant] -->`
  - Protocole Créatif migré vers skill `/brand-expression`
  - Checklist validation : 33 → 44 items

- **`.claude/skills/brand-expression/`** : Nouveau skill créatif (v1.0)
  - `SKILL.md` : process 5 étapes (Nourrir → Diverger → Évaluer → Choisir → Raffiner), 3 scopes (tagline, tone, messaging)
  - `references/tagline-methodology.md` : Brand Ladder, Language Library, 25+ variantes
  - `references/tone-of-voice.md` : Spectrum mapping, registre par archétype, champ lexical
  - `references/messaging-craft.md` : Mapping plateforme→sections, CTAs contextuels, headlines
  - `checklists/creative-quality.md` : 14 anti-patterns, calibration 3 niveaux, scoring détaillé
  - `examples/expression-good.md` : 3 exemples complets multi-secteur
  - `examples/expression-weak.md` : analyse patterns faibles/moyens, corrections

### 2026-02-18 — A02-Brand v2.1 (case study: Opendoor)

- **`pipeline/stages/A02-brand.md`** : v2.0 → v2.1
  - Protocole Créatif ajouté : process divergent→convergent (5 variantes, 4 critères)
  - Anti-patterns copy IA : 6 patterns identifiés avec exemples
  - Calibration par exemples multi-secteur (❌ Faible / ⚠️ Moyen / ✅ Fort)
  - Checklist validation créative : +7 items (total 33)

### 2026-02-18 — A02-Brand v2.0 (case study: La Pause + Opendoor)

- **`pipeline/stages/A02-brand.md`** : Refonte complète v1.0 → v2.0
  - Instructions restructurées en 3 phases (Lecture/diagnostic → Production → Vérification)
  - Conditional pour marque existante vs. à créer
  - services.md adaptable au secteur (Services/Offre/Carte)
  - positioning.md : messages par section liés aux pages réelles de 00-brief.md
  - personas.md : section "Scénario" obligatoire (micro-histoires narratives)
  - colors.md : système complet variantes + harmonie colorimétrique + WCAG + notes d'usage
  - typography.md : 2 polices + H5/Body Large/Caption + letter-spacing + import HTML + notes
  - Checklist validation : 6 → 21 items (16 par fichier + 5 globaux)
