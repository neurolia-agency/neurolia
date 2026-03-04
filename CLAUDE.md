# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Workspace Overview

This is a multi-project workspace containing web development projects for various clients. Most projects follow a standardized pipeline workflow.

> **Voir [GOVERNANCE.md](./GOVERNANCE.md)** pour les règles de priorité, conventions et anti-hallucination.

## Multi-Agent Setup (Claude + Gemini)

Le repo est configuré pour faire cohabiter `claude-code` et `Gemini CLI` dans le même environnement.

- Dossier `/.claude/`: configuration Claude spécifique au projet (doit rester à la racine).
- Fichier `/CLAUDE.md`: règles Claude de haut niveau pour ce workspace.
- Dossier `/.ai/shared/`: standards transverses et architecture commune.
- Dossiers `/.ai/claude/` et `/.ai/gemini/`: règles spécifiques par outil.
- Scripts `scripts/ai/`: wrappers d'exécution (`preflight`, `run-claude`, `run-gemini`).
- Pour les sessions design Gemini: utiliser `scripts/ai/run-gemini-design.sh`.

### Règle d'autorité

1. Standards communs: `.ai/shared/standards.md`
2. Architecture de cohabitation: `.ai/shared/architecture.md`
3. Règles Claude: `CLAUDE.md` puis `.ai/claude/AGENTS.md`

En cas de conflit, appliquer la règle la plus spécifique au contexte de tâche, sans contredire les standards partagés.

## Projects

### Neurolia (interne)

| Folder | Type | Status | Priority |
|--------|------|--------|----------|
| `neurolia-site/` | Site vitrine agence | Phase B05-Validate | P0 |
| `neurolia-videos/` | Vidéos Remotion Neurolia | Actif | P1 |
| `neurolia-social/` | Contenu réseaux sociaux | Actif | P1 |
| `business/` | Documents business (présentation, prévisionnel) | Actif | P1 |
| `demo/` | Démos interactives services Neurolia | Stable | P1 |
| `scripts/` | Scripts internes Neurolia | Actif | P2 |
| `guide-github/` | Guide interne GitHub | En cours | P2 |
| `website-workflow-template/` | Template pipeline | Stable | P2 |

### Clients (`clients/`)

| Folder | Type | Status | Priority |
|--------|------|--------|----------|
| `clients/fog/` | E-commerce FOG (automations + design) | Actif | P0 |
| `clients/opendoor-v2/` | Site vitrine serrurier | Phase B03-Pages | P0 |
| `clients/dashboard-loc-immo/` | Dashboard réservations Airbnb/Booking (Ilyes) | Phase A01-Init | P0 |
| `clients/iwok-muraliste/` | Site muraliste | En attente | P2 |
| `clients/la-pause-restaurant/` | Site restaurant | En attente | P2 |

### Archive (`_archive/`)

| Folder | Type |
|--------|------|
| `_archive/agence-web/` | Ancien site Proxima |
| `_archive/opendoor-v1/` | Ancien projet Opendoor |
| `_archive/pixel-academy/` | Site formation |
| `_archive/fog-automations/` | Ancien fog automations |
| `_archive/fog-design/` | Ancien fog design |

## Standard Pipeline (for site projects)

Projects using the workflow template follow a **2-phase pipeline**:

### Phase A: Architecture
```
A01-Init → A02-Brand → A03-Art Direction → A04-Structure → A05-Wireframes → A06-Design Tokens
```
- Output: `pipeline/output/` folder with brand strategy, sitemap, wireframes
- Execute with: `/apex -a -s exécuter étape [AXX]-[nom] depuis pipeline/stages/[AXX]-[nom].md`
- A02-Brand invoque `/brand-expression` (skill créatif) pour les fichiers d'expression de marque

### Phase B: Design / Vibe Coding
```
B01-Layout → B02-Homepage → B03-Pages → B04-Polish → B05-Validate → B06-Deploy
```
- Use `/frontend-design` for all UI development
- Never write CSS/components manually in Phase B

## Common Stack

- **Framework**: Next.js 15+ / React 19 / TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Motion (Framer Motion) + Lenis (smooth scroll)
- **Deployment**: Vercel

## Commands

```bash
# Development (inside a project folder)
npm run dev

# Multi-agent preflight (repo root)
scripts/ai/preflight.sh

# Run Claude / Gemini (repo root)
scripts/ai/run-claude.sh
scripts/ai/run-gemini.sh
scripts/ai/run-gemini-design.sh

# Execute pipeline stage (Phase A)
/apex -a -s exécuter étape [AXX]-[nom] depuis pipeline/stages/[AXX]-[nom].md

# UI development (Phase B)
/design-brief [description]              # Generer un brief sensoriel avant /frontend-design
/frontend-design
```

## Project Structure Pattern (v2.0)

Each site project follows this standardized structure:
```
project/
├── CLAUDE.md              # Pipeline status + project context
├── pipeline/
│   ├── input/             # Client data (brief, assets)
│   ├── stages/            # Stage instructions (A01-A06, B01-B06)
│   ├── workflow/          # Workflow docs (DEPENDENCIES.md, DESIGN_STACK.md)
│   ├── output/            # Generated artifacts (01-brief, 02-brand, etc.)
│   └── archive/           # Archived files
├── app/                   # Next.js app (globals.css = CSS tokens)
└── components/            # UI components
```

## Key Rules

1. **Read CLAUDE.md first** in each project - it contains current pipeline status
2. **Never modify previous outputs** - pipeline artifacts are immutable
3. **Use `/frontend-design`** for all UI work in Phase B
4. **globals.css is the single source** for design tokens
5. **Vouvoiement** - All client-facing content uses formal French
6. **Priorités P0 d'abord** - Voir GOVERNANCE.md pour la classification
7. **Ne pas versionner d'artefacts runtime d'agent** - logs/transcripts restent locaux
8. **Pas de secrets dans le repo** - utiliser `.env` local (basé sur `.env.example`)

## Instructions Transversales

### Avant de travailler sur un projet
1. Lire le CLAUDE.md du projet cible
2. Vérifier le statut pipeline actuel
3. Identifier les contraintes spécifiques

### Nommage
- Dossiers : `kebab-case` minuscules
- Composants React : `PascalCase`
- Fichiers généraux : `kebab-case`

### KPIs par Projet P0
| Projet | KPI Principal |
|--------|---------------|
| `neurolia-site/` | Signature devis |
| `clients/opendoor-v2/` | Appel téléphone |
| `clients/fog/` | Commandes traitées |
| `clients/dashboard-loc-immo/` | Zéro réservation manquée |
