# Changelog — Website Workflow Template

Modifications propagées depuis les case studies vers le template canonical.

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
