# Website Workflow Template v4

Template standardise pour la creation de sites web avec Claude Code, ou frontend-design2 a toute la liberte creative.

## Concept

Workflow en **2 phases** avec circuit minimaliste :

| Phase | Description | Methode | Output |
|-------|-------------|---------|--------|
| **A** | Architecture | Etapes sequentielles | Markdown uniquement |
| **B** | Design / Vibe Coding | Circuit 2 etapes | Code React/Next.js |

### Circuit v4 (Phase B)

Pour chaque section, le skill `section-builder` orchestre :

```
Claude + frontend-design2 (DECIDE + CODE) -> Technical Validator (haiku)
```

**Principe v4** : frontend-design2 est le creative director ET le codeur. Il lit le creative brief (contenu + emotion + contraintes), decide librement le layout, les techniques et les dials, puis code le composant. Le Technical Validator ne verifie que les regles techniques.

## Quick Start

### 1. Copier le template

```bash
cp -r website-workflow_template-v3/ mon-projet/
cd mon-projet/
```

### 2. Personnaliser

- Editer `CLAUDE.md` (remplacer les `[PLACEHOLDERS]`)
- Remplir `pipeline/input/brief-client.md`
- Deposer les formulaires externes dans `pipeline/input/forms/`
- Ajouter les references visuelles dans `pipeline/input/references/` (URLs + screenshots)

### 3. Initialiser Next.js

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false
npm install motion lenis react-hook-form @hookform/resolvers zod sonner lucide-react
```

### 4. Executer le workflow

```bash
# Phase A (sequentiel, etape par etape)
/apex -a -s executer A01-init depuis pipeline/stages/A01-init.md
/apex -a -s executer A02-brand depuis pipeline/stages/A02-brand.md
# ... jusqu'a A06

# Phase B (circuit d'agents automatise)
# Exemple : "Code le Hero de la homepage"
# -> Le skill section-builder lance le circuit pour chaque section
```

## Etapes

### Phase A : Architecture

| Etape | Stage | Output |
|-------|-------|--------|
| A01 | Init | `00-brief.md` |
| A02 | Brand | `01-brand/` (8 fichiers) |
| A03 | Art Direction | `02-art-direction/` (7 fichiers dont project-dials, ui-kit, emotion-map) |
| A04 | Structure | `03-sitemap.md` |
| A05 | Creative Briefs | `03.5-wireframes/` (contenu + emotion + contraintes, PAS de layout/technique) |
| A06 | Design Tokens | `app/globals.css` |

### Phase B : Design / Vibe Coding

| Etape | Stage | Methode | Output |
|-------|-------|---------|--------|
| B01 | Layout | Circuit d'agents | `components/layout/` |
| B02 | Homepage | Circuit d'agents (section par section) | `components/sections/` + `app/page.tsx` |
| B03 | Pages | Circuit d'agents (section par section) | `app/[pages]/` |
| B04 | Polish | Circuit partiel ou complet | Animations, SEO, coherence |
| B05 | Validate | Technical Validator global | `pipeline/output/07-validation.md` |
| B06 | Deploy | Vercel | Production |

## Agents & Skills

### Skills (configuration comportementale)

| Skill | Role |
|-------|------|
| `frontend-design2` | Regles de qualite UI : anti-slop, 100 AI Tells, dials, arsenal creatif |
| `ui-ux-pro-max` | Donnees design Phase A : 97 palettes + 57 font pairings (CSVs) |
| `section-builder` | Orchestrateur qui lance le circuit d'agents pour chaque section |

### Agents (subagents specialises)

| Agent | Modele | Role |
|-------|--------|------|
| Technical Validator | haiku | Verifie tokens, a11y, responsive, anti-patterns |
| Visual Reviewer | haiku | Evaluation visuelle optionnelle (Playwright) |
| Source Reader | haiku | Utilitaire optionnel de resolution de pointeurs |
| Wireframe Validator | haiku | Valide les creative briefs (A05) |
| Token Auditor | haiku | Audite les tokens CSS (A06) |

## Regles

### Phase A
- Output = **Markdown uniquement**
- Valider chaque etape avant la suivante
- Les Creative Briefs (A05) ne prescrivent PAS le layout ni les techniques
- Les dials par section ne sont PAS fixes en A03 (seulement les dials globaux)

### Phase B
- **Toujours** passer par le circuit (skill `section-builder`)
- frontend-design2 DECIDE le layout et les techniques (liberte creative totale)
- Les dials globaux de `project-dials.md` sont le point de depart
- Toutes les valeurs visuelles passent par les tokens CSS de `globals.css`
- Valider chaque section via le Technical Validator
- Ne jamais hardcoder couleurs, spacing ou durees

### Inputs
- `brief-client.md` est le seul fichier **obligatoire**
- Les screenshots de references sont **prioritaires** (input creatif)
- Les fichiers `input/` ne sont **jamais modifies** pendant le pipeline

## Stack Technique

- **Framework** : Next.js 15+
- **Styling** : Tailwind CSS 4
- **Animations** : Motion + Lenis
- **Forms** : react-hook-form + zod
- **UI** : shadcn/ui (inputs uniquement)
- **Couleurs** : OKLCH
- **Agents** : Claude (haiku + opus-4.6)

---

**Version** : 4.0
**Date** : 2026-03-21
