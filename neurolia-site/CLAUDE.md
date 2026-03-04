# Neurolia - Site Agence Web

Site vitrine pour Neurolia, agence de design web et automatisation.

## Statut Pipeline

**Phase actuelle : B05-Validate (prochaine étape)**

| Phase | Étapes | Status |
|-------|--------|--------|
| A - Architecture | A01→A06 | ✅ Complété |
| B - Code | B01→B04 | ✅ Complété |
| B - Code | B05-Validate | ⬜ Prochaine |
| B - Code | B06-Deploy | ⬜ |

### Correspondance fichiers stages/

| Phase | Fichier stage |
|-------|---------------|
| A01 | `pipeline/stages/A01-init.md` |
| A02 | `pipeline/stages/A02-brand.md` |
| A03 | `pipeline/stages/A03-art-direction.md` |
| A04 | `pipeline/stages/A04-structure.md` |
| A05 | `pipeline/stages/A05-wireframes.md` |
| A06 | `pipeline/stages/A06-design-tokens.md` |
| B01 | `pipeline/stages/B01-layout.md` |
| B02 | `pipeline/stages/B02-homepage.md` |
| B03 | `pipeline/stages/B03-pages.md` |
| B04 | `pipeline/stages/B04-polish.md` |
| B05 | `pipeline/stages/B05-validate.md` |
| B06 | `pipeline/stages/B06-deploy.md` |

## Sources de Vérité

| Domaine | Fichier |
|---------|---------|
| Statut pipeline | Ce fichier (`CLAUDE.md`) |
| Design tokens CSS | `app/globals.css` |
| Brief client | `input/brief-client.md` |
| Catalogue services | `../../business/catalogue services/Neurolia-Catalogue-Services-2026.pdf` |
| Références sites | `references/sites/` |
| Briefs d'implémentation | `references/briefs/` |
| Direction artistique | `pipeline/output/03-art-direction/` |
| Wireframes | `pipeline/output/05-wireframes/` |
| Dépendances | `pipeline/workflow/DEPENDENCIES.md` |
| Inventaire assets | `pipeline/workflow/IMAGES.md` |
| Contexte multi-agent design | `AI_CONTEXT_DESIGN.md` |

## Contexte

| Clé | Valeur |
|-----|--------|
| Client | Neurolia (interne) |
| Type | Site vitrine agence |
| Tagline | "Un business qui respire." |
| Stack | Next.js 15 + Tailwind 4 + Motion + Lenis |

## ADN Visuel

| Aspect | Valeur |
|--------|--------|
| Couleur signature | Terracotta `#C45C3B` (5-10%) |
| Forme | Barre verticale 4px |
| Emphase texte | "L'Éclat" — gleam terracotta via `background-clip: text` (`<NrEmphasis>`) |
| Animation | Translate only, 300ms ease-out |
| Radius | 0 (sauf inputs: 2-4px) |
| Espacement | 160px desktop, 96px mobile |

## Structure Projet

```
neurolia/
│
├── CLAUDE.md              # Statut pipeline (CE FICHIER)
├── README.md              # Vue d'ensemble
│
├── input/                 # DONNÉES CLIENT (lecture seule)
│   ├── brief-client.md    # Brief client
│   └── assets/            # Logo, images fournies
│
├── references/            # RÉFÉRENCES (inspiration + UI dev)
│   ├── sites/             # Sites d'inspiration (xtract, etc.)
│   ├── briefs/            # Briefs d'implémentation validés
│   └── [nom-element]/     # Références UI (outerHTML, screenshots)
│
├── pipeline/              # WORKFLOW SÉQUENTIEL
│   ├── output/            # Artifacts Phase A (01-05)
│   ├── stages/            # Instructions (A01-A06, B01-B06)
│   ├── workflow/          # Documentation (IMAGES.md, DEPENDENCIES.md...)
│   └── archive/           # Fichiers archivés
│
├── app/                   # CODE NEXT.JS (convention framework)
│   ├── globals.css        # Design tokens
│   ├── page.tsx           # Homepage
│   └── [routes]/          # Autres pages
│
├── components/            # COMPOSANTS REACT (convention framework)
│   ├── layout/            # Header, Footer, Nav
│   ├── sections/          # Sections homepage
│   ├── pages/             # Composants par page
│   └── ui/                # Primitives (Button, Input...)
│
├── lib/                   # UTILITAIRES (requis par shadcn/ui)
│   └── utils.ts           # Fonction cn() pour Tailwind
│
├── public/                # ASSETS STATIQUES (convention framework)
│   ├── fonts/             # Polices
│   └── images/            # Images
│
└── [config]               # FICHIERS CONFIG (requis à la racine)
    ├── package.json       # Dépendances Node
    ├── tsconfig.json      # Config TypeScript
    ├── tailwind.config.ts # Config Tailwind
    ├── next.config.ts     # Config Next.js
    ├── postcss.config.js  # Config PostCSS
    └── components.json    # Config shadcn/ui
```

## Commandes

```bash
npm run dev                                            # Serveur dev
/apex -a -s exécuter étape B05-validate depuis pipeline/stages/B05-validate.md   # Prochaine étape
/design-brief [description]                            # Brief sensoriel → review → /frontend-design
/frontend-design                                       # UI development
```

## Règles

1. **Lire ce fichier en premier** - Statut et contexte
2. **`/frontend-design`** pour tout UI en Phase B
3. **Ne jamais modifier `pipeline/output/`** - Lecture seule
4. **`app/globals.css`** = source unique des tokens CSS
5. **Cohabitation agents** - appliquer `AI_CONTEXT_DESIGN.md` pour les règles Claude/Gemini

## Features implémentées

| Feature | Fichier | Stages | Statut |
|---------|---------|--------|--------|
| Section Process (landing) | `references/briefs/process-section-landing.md` | `F01` → `F02` → `F03` → `F04` → `F05` | ✅ Complété |

---

## Sections de la landing page

```
Hero → ServicesPreview → Process → PortfolioPreview → Testimonials → ContactMini → Faq → ScrollBenefits → CtaFinal
```

Fichiers : `components/sections/*.tsx`

## Pages du site

| Route | Fichier | Composants |
|-------|---------|------------|
| `/` | `app/page.tsx` | 9 sections (voir ci-dessus) |
| `/services` | `app/services/page.tsx` | `components/pages/services/` |
| `/about` | `app/about/page.tsx` | `components/pages/about/` |
| `/portfolio` | `app/portfolio/page.tsx` | `components/pages/portfolio/` |
| `/contact` | `app/contact/page.tsx` | `components/pages/contact/` |

---

*Mise à jour : 2026-02-15 (sync docs vs réalité, ajout sections/pages inventaire)*
