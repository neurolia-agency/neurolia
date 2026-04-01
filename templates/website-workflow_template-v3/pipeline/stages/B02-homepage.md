# Etape B2 : Homepage

> **Phase B : Design / Vibe Coding** - Page d'accueil.

## Circuit d'Agents v4

**OBLIGATOIRE** : Chaque section passe par le circuit.

```
1. AGENT Creative Director (opus-4.6 — creatif)
   -> Lit le creative brief de la section (03.5-wireframes/homepage.md)
   -> Lit les fichiers brand/art-direction + references visuelles
   -> DECIDE : layout, technique(s), dials section, choreographie
   -> Produit : _preflight/homepage/[section]-creative-direction.md

2. CLAUDE + frontend-design2 (charge via Read explicite de .claude/skills/frontend-design2/SKILL.md)
   -> Lit frontend-design2/SKILL.md (OBLIGATOIRE)
   -> Lit la creative direction (1 seul fichier — decisions + intention)
   -> Implemente les decisions du Creative Director
   -> Code le composant

3. AGENT Technical Validator (haiku — verification)
   -> Verifie : tokens, a11y, responsive, anti-patterns, server/client
   -> NE verifie PAS les choix creatifs (layout, technique)
   -> Produit : pass/fail + corrections
```

---

## Objectif

Creer la page d'accueil **section par section**, chaque section utilisant le circuit d'agents complet.

## Input

| Fichier | Usage |
|---------|-------|
| `output/03.5-wireframes/homepage.md` | **Source de contenu** — creative brief |
| `app/globals.css` | Design tokens |
| `output/02-art-direction/` | Brand + art direction (lus par le Creative Director) |

> **Creative Brief v4** : Le brief definit QUOI (contenu, emotion, contraintes).
> Le Creative Director decide COMMENT (layout, technique, dials).

## Server vs Client Components

| Section | Type | Raison |
|---------|------|--------|
| Hero | Server | SEO critique |
| ServicesPreview | Server | Liste statique |
| PortfolioPreview | Server | Images statiques |
| Testimonials | Server | Contenu statique |
| ContactMini | Client | Form interactif |
| CtaFinal | Server | Contenu statique |
| AnimatedSection | Client | Wrapper animations |

## Workflow : Section par Section

Pour **chaque section** du creative brief `homepage.md` :

### Etape 1 — Creative Direction

Le Creative Director lit le brief + les fichiers sources, puis DECIDE l'approche :

```markdown
## Hero — Direction Creative

### Calibrage Dials
VARIANCE: 6 | MOTION: 5 | DENSITY: 2
Rationale : Hero = premiere impression, asymetrie pour se differencier

### Decision Layout
Split asymetrique 40/60 — texte ancre a gauche, visuel debordant a droite
Mobile : stack vertical, visuel en premier (above the fold)
Rationale : l'asymetrie cree de la tension, le vide a gauche = respiration

### Technique(s) Selectionnee(s)
**Apparition Decalee (Stagger)** — revele les elements un par un
- Comportement : translateY(24px) -> 0 + opacity, stagger 100ms
- Timing : 600ms cubic-bezier(0.22, 1, 0.36, 1)
- Fallback : tout visible immediatement

### Intention Sensorielle
[Description de l'experience visiteur...]

### Resume en 1 phrase
"[...]"
```

### Etape 2 — Code

Claude code le composant avec :
- Le SKILL.md de frontend-design2 lu explicitement
- La creative direction (decisions + intention)
- Les dials de la section decides par le Creative Director

### Etape 3 — Validation technique

Le Technical Validator verifie :
- [ ] Tokens CSS utilises (pas de valeurs hardcodees)
- [ ] Contraintes constraints.md respectees
- [ ] UI Kit conforme
- [ ] Anti-patterns fd2 absents
- [ ] Server/Client separation correcte
- [ ] Responsive present
- [ ] A11y basique (aria, focus, contraste)

---

## Sections a Creer

> L'ordre et le contenu exact viennent du creative brief homepage.md.

### Section 1 : Hero
**Type** : Server Component (+ wrapper AnimatedSection si animation)
-> Circuit complet

### Section 2 : Services (apercu)
**Type** : Server Component
-> Circuit complet

### Section 3-N : [Sections depuis brief]
-> Circuit complet pour chaque section

### Contact Mini (si present)
**Type** : Client Component

**Stack formulaire** :
```bash
npm install react-hook-form @hookform/resolvers zod sonner
npx shadcn@latest add input textarea
```

**Fichiers** :
- `components/sections/contact-mini.tsx` (Client Component)
- `app/actions/contact.ts` (Server Action)

## Assemblage Page

`app/page.tsx` — assembler les sections dans l'ordre du brief.

## Output

```
_preflight/homepage/
├── hero-creative-direction.md
├── services-preview-creative-direction.md
├── [section]-creative-direction.md
└── ...

app/
├── page.tsx
└── actions/
    └── contact.ts

components/
├── sections/
│   ├── hero.tsx
│   ├── services-preview.tsx
│   ├── [autres sections].tsx
│   └── cta-final.tsx
└── ui/
    └── animated-section.tsx
```

## Validation

- [ ] Direction creative produite pour CHAQUE section (Creative Director)
- [ ] Chaque section creee via le circuit
- [ ] Creative brief respecte (contenu, emotion)
- [ ] Server/Client Components correctement separes
- [ ] Responsive mobile-first
- [ ] **Technical Validator** : pass sur CHAQUE section
- [ ] Accessibilite : labels, aria-invalid sur inputs, focus visible

## Prochaine Etape

-> `stages/B03-pages.md`

---

**Version** : 4.0
**Phase** : B2 (Design / Vibe Coding)
**Dependances** : B1 (Layout), A5 (Creative Briefs), A3 (art-direction)
**Agents** : Creative Director (opus-4.6), Technical Validator (haiku)
**Skill** : frontend-design2
**Produit pour** : B4 (Polish)
