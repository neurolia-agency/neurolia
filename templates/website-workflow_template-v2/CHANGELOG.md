# Changelog — Website Workflow Template

Modifications propagées depuis les case studies vers le template canonical.

## [Unreleased]

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
