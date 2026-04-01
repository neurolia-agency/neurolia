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
│   ├── input/                     # Donnees client (immutables)
│   │   ├── brief-client.md        # Questionnaire rempli (OBLIGATOIRE)
│   │   ├── assets/                # Logo, images fournies
│   │   ├── references/
│   │   │   ├── sites.md           # Sites d'inspiration annotes
│   │   │   └── screenshots/       # Captures visuelles (prioritaires — input creatif)
│   │   ├── content/               # Textes fournis
│   │   ├── typographies/          # Polices si identite existante
│   │   └── forms/                 # Formulaires externes (CSV + manifests)
│   │
│   ├── output/                    # Artifacts generes (immutables)
│   │   ├── 00-brief.md
│   │   ├── 01-brand/              # Strategie (8 fichiers)
│   │   ├── 02-art-direction/      # Direction artistique (7 fichiers)
│   │   ├── 03-sitemap.md
│   │   ├── 03.5-wireframes/       # Creative Briefs (contenu + emotion + contraintes)
│   │   ├── 07-validation.md       # B05
│   │   └── 08-deploy.md           # B06
│   │
│   ├── stages/                    # Instructions par etape (A01-A06, B01-B06)
│   │
│   └── workflow/                  # Documentation process
│       ├── DEPENDENCIES.md
│       ├── DESIGN_STACK.md
│       └── README.md
│
├── _preflight/                    # Contexte pre-coding (genere par agents)
│   ├── [page]/                    # (optionnel — notes de decisions creatives)
│   └── validation/                # Rapports Technical Validator
│
├── public/images/
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
    │   ├── technical-validator.md # Haiku — verifie regles techniques (Phase B)
    │   ├── visual-reviewer.md     # Haiku — evaluation visuelle optionnelle (Phase B)
    │   ├── source-reader.md       # Haiku — utilitaire optionnel
    │   ├── wireframe-validator.md # Haiku — valide les creative briefs (A05)
    │   ├── token-auditor.md       # Haiku — audite les tokens CSS (A06)
    │   └── references/
    └── skills/
        ├── brand-expression/      # Skill creatif (Phase A — A02)
        ├── section-builder/       # Orchestrateur Phase B (circuit 2 etapes)
        ├── frontend-design2/      # Creative Director + Codeur UI (Phase B)
        └── ui-ux-pro-max/         # Donnees design (Phase A — palettes + font pairings)
```
