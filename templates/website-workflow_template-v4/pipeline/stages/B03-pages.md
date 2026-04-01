# Etape B3 : Pages Secondaires

> **Phase B : Design / Vibe Coding** - Pages Services, Portfolio, About, Contact.

## Circuit d'Agents v4

**Identique a B02.** Chaque section de chaque page passe par le circuit 2 etapes :

```
Claude + frontend-design2 (decide + code) -> Technical Validator (haiku)
```

> **Creative Briefs v4** : Chaque brief definit le contenu et l'emotion.
> Le frontend-design2 decide le layout, les techniques et les dials par section.

---

## Objectif

Creer les pages secondaires, chaque page utilisant son **creative brief** comme source de contenu.

## Input

| Page | Creative Brief |
|------|---------------|
| Services | `output/03.5-wireframes/services.md` |
| Portfolio | `output/03.5-wireframes/portfolio.md` |
| About | `output/03.5-wireframes/about.md` |
| Contact | `output/03.5-wireframes/contact.md` |

**Contexte supplementaire** (lu par le frontend-design2) :
- `app/globals.css` — Design tokens
- `output/02-art-direction/` — Brand + art direction

**Exception** : Page Contact peut lire `01-brand/about.md` pour les coordonnees.

## Pages a Creer

### 1. Services (/services)

**Creative Brief** : `output/03.5-wireframes/services.md`

Pour chaque section du brief :
1. Claude + frontend-design2 (decide + code)
2. Technical Validator -> pass/fail

> **Attention** : La page Services est particulierement a risque pour les anti-patterns
> (grid 3 colonnes, cards generiques). Verifier project-dials.md > Anti-Patterns.

### 2. Portfolio (/portfolio)

**Creative Brief** : `output/03.5-wireframes/portfolio.md`

Meme circuit. Le portfolio est souvent la page la plus visuellement expressive.

### 3. About (/about)

**Creative Brief** : `output/03.5-wireframes/about.md`

Meme circuit. Page narrative — le frontend-design2 devrait produire
des directions plus storytelling.

### 4. Contact (/contact)

**Creative Brief** : `output/03.5-wireframes/contact.md`

Meme circuit. Page de conversion — le frontend-design2 calibrera
probablement les dials MOTION et VARIANCE au minimum.

**Stack formulaire** :
```bash
npm install react-hook-form @hookform/resolvers zod sonner
npx shadcn@latest add input textarea select
```

## Structure Fichiers

```
_preflight/
├── services/
│   └── [section]-creative-direction.md
├── portfolio/
│   └── [section]-creative-direction.md
├── about/
│   └── [section]-creative-direction.md
└── contact/
    └── [section]-creative-direction.md

app/
├── services/page.tsx
├── portfolio/page.tsx
├── about/page.tsx
├── contact/page.tsx
└── actions/contact.ts

components/pages/
├── services/[sections].tsx
├── portfolio/[sections].tsx
├── about/[sections].tsx
└── contact/[sections].tsx
```

## Composants Reutilisables

| Composant | Usage |
|-----------|-------|
| `CtaFinal` | Toutes les pages (section finale) |
| `AnimatedSection` | Wrapper animations |

## Validation

- [ ] Toutes les pages creees selon leur creative brief
- [ ] Server/Client Components correctement separes
- [ ] Formulaire Contact fonctionnel (validation Zod + Server Action)
- [ ] Composants reutilises (CtaFinal, AnimatedSection)
- [ ] Responsive mobile-first
- [ ] **Technical Validator** : pass sur CHAQUE section de CHAQUE page
- [ ] Anti-patterns evites (grid 3 colonnes, layout centre, cards generiques)

## Prochaine Etape

-> `stages/B04-polish.md`

---

**Version** : 4.0
**Phase** : B3 (Design / Vibe Coding)
**Dependances** : B1 (Layout), A5 (Creative Briefs), A3 (art-direction)
**Agents** : Technical Validator (haiku)
**Skill** : frontend-design2
**Produit pour** : B4 (Polish)
