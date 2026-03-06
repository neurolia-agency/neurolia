# Website Workflow Template v3

Template standardisé pour la création de sites web avec Claude Code, intégrant un circuit d'agents spécialisés pour la Phase B.

## Concept

Workflow en **2 phases** avec circuit d'agents automatisé :

| Phase | Description | Méthode | Output |
|-------|-------------|---------|--------|
| **A** | Architecture | Étapes séquentielles | Markdown uniquement |
| **B** | Design / Vibe Coding | Circuit d'agents (`section-builder`) | Code React/Next.js |

### Circuit d'Agents (Phase B)

Pour chaque section, le skill `section-builder` orchestre automatiquement :

```
Context Assembler (haiku) → Aesthetic Director (opus-4.6) → Code + frontend-design2 → Constraint Validator (haiku)
```

Les agents sont des **custom subagents** définis dans `.claude/agents/` (context-assembler, aesthetic-director, constraint-validator pour Phase B + wireframe-validator pour A05 et token-auditor pour A06).

## Quick Start

### 1. Copier le template

```bash
cp -r website-workflow_template-v2/ mon-projet/
cd mon-projet/
```

### 2. Personnaliser

- Éditer `CLAUDE.md` (remplacer les `[PLACEHOLDERS]`)
- Remplir `pipeline/input/brief-client.md`
- Déposer les formulaires externes dans `pipeline/input/forms/` avec leur manifest (si disponibles)
- Ajouter les références visuelles dans `pipeline/input/references/` (URLs + screenshots)

### 3. Initialiser Next.js

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false
npm install motion lenis react-hook-form @hookform/resolvers zod sonner lucide-react
```

### 4. Exécuter le workflow

```bash
# Phase A (séquentiel, étape par étape)
/apex -a -s exécuter A01-init depuis pipeline/stages/A01-init.md
/apex -a -s exécuter A02-brand depuis pipeline/stages/A02-brand.md
# ... jusqu'à A06

# Phase B (circuit d'agents automatisé)
# Exemple : "Code le Hero de la homepage"
# → Le skill section-builder lance le circuit pour chaque section
```

## Structure

```
template/
├── CLAUDE.md                      # Statut pipeline + contexte projet
├── README.md                      # Ce fichier
│
├── pipeline/                      # WORKFLOW
│   ├── input/                     # Données client (source de vérité)
│   │   ├── brief-client.md        # Questionnaire rempli (OBLIGATOIRE)
│   │   ├── assets/                # Logo, images fournies
│   │   ├── references/
│   │   │   ├── sites.md           # Sites d'inspiration annotés
│   │   │   └── screenshots/       # Captures visuelles (prioritaires)
│   │   ├── content/               # Textes fournis par le client
│   │   ├── typographies/          # Polices si identité existante
│   │   └── forms/                 # Formulaires externes (CSV + manifests) — optionnel
│   │
│   ├── output/                    # Artifacts générés (immutables)
│   │   ├── 00-brief.md            # A01
│   │   ├── 01-brand/              # A02 (8 fichiers)
│   │   ├── 02-art-direction/      # A03 (7 fichiers)
│   │   ├── 03-sitemap.md          # A04
│   │   ├── 03.5-wireframes/       # A05 (wireframes auto-suffisants)
│   │   ├── 07-validation.md       # B05
│   │   └── 08-deploy.md           # B06
│   │
│   ├── stages/                    # Instructions par étape
│   │   ├── A01-init.md
│   │   ├── A02-brand.md
│   │   ├── A03-art-direction.md
│   │   ├── A04-structure.md
│   │   ├── A05-wireframes.md
│   │   ├── A06-design-tokens.md
│   │   ├── B01-layout.md
│   │   ├── B02-homepage.md
│   │   ├── B03-pages.md
│   │   ├── B04-polish.md
│   │   ├── B05-validate.md
│   │   └── B06-deploy.md
│   │
│   └── workflow/                  # Documentation process
│       ├── DEPENDENCIES.md        # Matrice dépendances
│       ├── DESIGN_STACK.md        # Stack technique + agents
│       └── README.md              # Vue d'ensemble workflow
│
├── _preflight/                    # Fichiers de contexte pré-coding (générés)
│   ├── [page]/
│   │   ├── [section]-context.md   # Étape 1 : Context Assembler
│   │   └── [section]-direction.md # Étape 2 : Aesthetic Director
│   └── validation/                # Rapports validation finaux
│
├── app/                           # CODE NEXT.JS
│   ├── globals.css                # Tokens CSS (source unique)
│   ├── page.tsx
│   └── [pages]/
│
├── components/
│   ├── layout/
│   ├── sections/
│   └── ui/
│
└── .claude/
    ├── agents/                    # Custom subagents
    │   ├── context-assembler.md   # Haiku — résout le contexte (Phase B)
    │   ├── aesthetic-director.md  # Opus 4.6 — direction créative (Phase B)
    │   ├── constraint-validator.md # Haiku — vérifie les règles (Phase B, skills: [frontend-design2])
    │   ├── wireframe-validator.md # Haiku — valide les wireframes (A05)
    │   └── token-auditor.md       # Haiku — audite les tokens CSS (A06)
    └── skills/
        ├── section-builder/       # Skill orchestrateur Phase B
        │   └── SKILL.md
        ├── frontend-design2/      # Skill comportemental UI (Phase B)
        │   └── SKILL.md
        └── ui-ux-pro-max/         # Donnees design (Phase A — palettes + font pairings)
            ├── SKILL.md
            └── data/
                ├── colors.csv     # 97 palettes par industrie
                └── typography.csv # 57 font pairings par mood
```

## Étapes

### Phase A : Architecture

| Étape | Stage | Output |
|-------|-------|--------|
| A01 | Init | `00-brief.md` |
| A02 | Brand | `01-brand/` (8 fichiers) |
| A03 | Art Direction | `02-art-direction/` (7 fichiers dont project-dials, ui-kit, emotion-map) |
| A04 | Structure | `03-sitemap.md` |
| A05 | Wireframes | `03.5-wireframes/` (wireframes auto-suffisants, 7 dimensions) |
| A06 | Design Tokens | `app/globals.css` |

**A03 produit 7 fichiers** : moodboard.md, visual-vocabulary.md, constraints.md, emotion-map.md, project-dials.md, ui-kit.md, README.md

**A05 wireframes auto-suffisants** : chaque wireframe porte contenu, layout, émotion, dials, technique, contraintes et transitions — le circuit d'agents peut les consommer sans aller chercher ailleurs.

### Phase B : Design / Vibe Coding

| Étape | Stage | Méthode | Output |
|-------|-------|---------|--------|
| B01 | Layout | Circuit d'agents | `components/layout/` |
| B02 | Homepage | Circuit d'agents (section par section) | `components/sections/` + `app/page.tsx` |
| B03 | Pages | Circuit d'agents (section par section) | `app/[pages]/` |
| B04 | Polish | Circuit partiel ou complet | Animations, SEO, cohérence |
| B05 | Validate | Constraint Validator global | `pipeline/output/07-validation.md` |
| B06 | Deploy | Vercel | Production |

## Agents & Skills

### Skills (configuration comportementale)

| Skill | Rôle |
|-------|------|
| `frontend-design2` | Règles de qualité UI : anti-slop, 100 AI Tells, 3 dials (VARIANCE/MOTION/DENSITY), arsenal créatif |
| `ui-ux-pro-max` | Donnees design Phase A : 97 palettes par industrie + 57 font pairings par mood (CSVs, recommande en A02) |
| `section-builder` | Orchestrateur qui lance le circuit d'agents pour chaque section demandée |

### Agents (subagents spécialisés)

| Agent | Modèle | Rôle |
|-------|--------|------|
| Context Assembler | haiku | Résout les pointeurs du wireframe en contexte auto-suffisant |
| Aesthetic Director | opus-4.6 | Transforme le contexte technique en direction créative sensorielle |
| Constraint Validator | haiku | Vérifie systématiquement le code contre toutes les règles du projet |

Le **coding** est fait par Claude directement, avec le skill `frontend-design2` chargé en contexte.

## Règles

### Phase A
- Output = **Markdown uniquement**
- Ne pas écrire de code
- Valider chaque étape avant la suivante
- Chaque étape lit ses dépendances depuis `DEPENDENCIES.md`

### Phase B
- **Toujours** passer par le circuit d'agents (skill `section-builder`)
- Les dials du `project-dials.md` overrident les defaults du skill
- Toutes les valeurs visuelles passent par les tokens CSS de `globals.css`
- Valider chaque section contre `constraints.md` et `ui-kit.md`
- Ne jamais hardcoder couleurs, spacing ou durées

### Inputs
- `brief-client.md` est le seul fichier **obligatoire**
- Les screenshots de références sont **prioritaires** sur les URLs (analyse visuelle)
- Les fichiers `input/` ne sont **jamais modifiés** pendant le pipeline

## Stack Technique

- **Framework** : Next.js 15+
- **Styling** : Tailwind CSS 4
- **Animations** : Motion + Lenis
- **Forms** : react-hook-form + zod
- **UI** : shadcn/ui (inputs uniquement)
- **Couleurs** : OKLCH
- **Agents** : Claude (haiku + opus-4.6) via circuit automatisé

---

**Version** : 3.0
**Date** : 2026-03-05
