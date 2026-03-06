---
paths:
  - "pipeline/**"
---

# Structure du Pipeline

```
[nom-projet]/
├── CLAUDE.md                      # Statut pipeline (CE FICHIER)
├── README.md                      # Vue d'ensemble projet
│
├── pipeline/                      # WORKFLOW
│   ├── input/                     # Données client (immutables)
│   │   ├── brief-client.md        # Questionnaire rempli (OBLIGATOIRE)
│   │   ├── assets/                # Logo, images fournies
│   │   ├── references/
│   │   │   ├── sites.md           # Sites d'inspiration annotés
│   │   │   └── screenshots/       # Captures visuelles (prioritaires)
│   │   ├── content/               # Textes fournis
│   │   ├── typographies/          # Polices si identité existante
│   │   └── forms/                 # Formulaires externes (CSV + manifests)
│   │       ├── README.md
│   │       └── .gitkeep
│   │
│   ├── output/                    # Artifacts générés (immutables)
│   │   ├── 00-brief.md
│   │   ├── 01-brand/              # Stratégie (8 fichiers)
│   │   ├── 02-art-direction/      # Direction artistique (7 fichiers)
│   │   ├── 03-sitemap.md
│   │   ├── 03.5-wireframes/       # Wireframes auto-suffisants
│   │   ├── 07-validation.md       # B05
│   │   └── 08-deploy.md           # B06
│   │
│   ├── stages/                    # Instructions par étape (A01-A06, B01-B06)
│   │
│   └── workflow/                  # Documentation process
│       ├── DEPENDENCIES.md
│       ├── DESIGN_STACK.md
│       └── README.md
│
├── _preflight/                    # Contexte pré-coding (généré par agents)
│   ├── [page]/
│   │   ├── [section]-context.md   # Context Assembler
│   │   └── [section]-direction.md # Aesthetic Director
│   └── validation/                # Rapports finaux
│
├── public/                        # ASSETS STATIQUES (images, fonts, etc.)
│   └── images/                    # Photos produits, hero, artisans, etc.
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
        └── frontend-design2/      # Skill comportemental UI
            └── SKILL.md
```
