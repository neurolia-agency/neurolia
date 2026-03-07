# Social Brand Template v1

Template allege pour creer une identite de marque orientee social media. Produit 8 fichiers Markdown exploitables par les workflows de contenu (WF01 Planning, WF02 Prompts, WF03 Publishing).

## Concept

Workflow en **2 etapes** — pas de code, pas de design frontend :

| Etape | Description | Output |
|-------|-------------|--------|
| **S01** | Init | `00-brief.md` (brief structure social-first) |
| **S02** | Brand | `01-brand/` (8 fichiers d'identite de marque) |

## Quand utiliser ce template ?

- Client qui a besoin d'une identite social media **sans site web**
- Client qui a deja un site (workflow v2) et a besoin de **l'identite social en complement**
- Onboarding rapide pour alimenter les workflows WF01/WF02/WF03

> **Si le client a aussi besoin d'un site web**, utiliser `website-workflow_template-v2` pour le site. Les 8 fichiers brand produits par les deux templates doivent rester coherents — le brief-client et la plateforme de marque sont la source commune.

## Quick Start

### 1. Copier le template

```bash
cp -r social-brand_template-v1/ mon-projet-social/
cd mon-projet-social/
```

### 2. Personnaliser

- Editer `CLAUDE.md` (remplacer les `[PLACEHOLDERS]`)
- Remplir `pipeline/input/brief-client.md`
- Deposer les formulaires externes dans `pipeline/input/forms/` avec leur manifest (si disponibles)
- Deposer les posts existants dans `pipeline/input/existing-posts/` (si disponibles)

### 3. Executer le workflow

```bash
# Etape par etape
/apex -a -s executer S01-init depuis pipeline/stages/S01-init.md
/apex -a -s executer S02-brand depuis pipeline/stages/S02-brand/S02-brand.md
```

## Structure

```
social-brand_template-v1/
├── CLAUDE.md                      # Statut pipeline + contexte projet
├── README.md                      # Ce fichier
├── CHANGELOG.md                   # Historique des modifications
│
├── pipeline/
│   ├── input/                     # Donnees client (source de verite)
│   │   ├── README.md              # Documentation des inputs
│   │   ├── brief-client.md        # Questionnaire rempli (OBLIGATOIRE)
│   │   ├── forms/                 # Formulaires externes (CSV + manifests) — optionnel
│   │   │   ├── brand-platform-manifest.md
│   │   │   └── .gitkeep
│   │   ├── assets/                # Logo, images fournies
│   │   ├── content/               # Textes fournis par le client
│   │   └── existing-posts/        # Posts existants pour anti-repetition
│   │       └── README.md
│   │
│   ├── output/                    # Artifacts generes
│   │   ├── 00-brief.md            # S01
│   │   └── 01-brand/              # S02 (8 fichiers)
│   │       ├── 00-platform.md
│   │       ├── about.md
│   │       ├── personas.md
│   │       ├── positioning.md
│   │       ├── tone.md
│   │       ├── services.md
│   │       ├── design-system.md
│   │       └── objectifs.md
│   │
│   ├── stages/                    # Instructions par etape
│   │   ├── S01-init.md
│   │   └── S02-brand/
│   │       ├── S02-brand.md       # Orchestrateur
│   │       ├── 01-diagnostic.md
│   │       ├── 02-platform.md
│   │       ├── 03-production-verbal.md
│   │       ├── 03-production-visual.md
│   │       └── 04-validation.md
│   │
│   └── workflow/
│       └── DEPENDENCIES.md        # Matrice dependances
│
└── .claude/
    └── settings.json
```

## Output — 8 fichiers d'identite de marque

| # | Fichier | Role | Champs WF00 |
|---|---------|------|-------------|
| 1 | `00-platform.md` | Plateforme de marque + Calibrage Creatif Social | #12-21, #26, #39, #50 |
| 2 | `about.md` | Nom, mission, vision, valeurs, chiffres cles | #12-15, #24, #27 |
| 3 | `personas.md` | Cibles + Comportement Social | #44, #50 |
| 4 | `positioning.md` | Tagline, USPs + Piliers de Contenu Social + CTA Sociaux | #21-23, #25, #43, #46, #50 |
| 5 | `tone.md` | Registre, lexique + Adaptation Social Media + Regles Redactionnelles | #16, #28-33, #40-42, #50 |
| 6 | `services.md` | Offre par categorie + Potentiel Social | #50 |
| 7 | `design-system.md` | Couleurs HEX + Typographies + Application Social Media | #34-38, #50 |
| 8 | `objectifs.md` | Objectifs social media + KPIs | #47-49 |

## Differences avec website-workflow_template-v2

### Retire (website-specific)
- Phase B entiere (B01-B06 — coding React/Next.js)
- A03 Art Direction (moodboard, visual vocabulary, constraints, emotion map, UI kit, project dials)
- A04 Structure / A05 Wireframes / A06 Design Tokens
- Variables CSS, import Next.js, echelle clamp()
- Valeurs OKLCH (HEX uniquement — Canva/Figma/CapCut)
- Semantique couleurs (success/error/warning)
- Agents Phase B (context-assembler, aesthetic-director, constraint-validator)

### Ajoute (social-specific)
- Sections "Presence Social Media" et "Ambition Creatif Social" dans le brief
- Calibrage Creatif Social (style photo/video, formats, densite texte/visuel)
- Piliers de Contenu Social dans positioning.md
- Adaptation Social Media dans tone.md (emojis, hashtags, ton par format)
- Regles Redactionnelles dans tone.md (#33 writing_rules)
- Objectifs social media + KPIs dans objectifs.md (#47-49)
- Comportement Social par persona dans personas.md
- Potentiel Social par categorie dans services.md
- Design system fusionne (colors + typography) avec guidelines mobile/social
- Dossier existing-posts/ pour bootstrap anti-repetition (#57-63)

## Regles

- Output = **Markdown uniquement** — aucun code
- `brief-client.md` est le seul fichier **obligatoire**
- Les fichiers `input/` ne sont **jamais modifies** pendant le pipeline
- Couleurs en **HEX uniquement** (pas d'OKLCH)
- Valider chaque etape avant la suivante

---

**Version** : 1.0
**Date** : 2026-03-07
