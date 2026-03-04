# Étape B3 : Pages Secondaires

> **Phase B : Design / Vibe Coding** - Pages Services, Portfolio, About, Contact.

## Workflow Agents + frontend-design2

**Identique à B02.** Chaque section de chaque page passe par le circuit d'agents complet :

```
Context Assembler (haiku) → Aesthetic Director (sonnet) → Code + frontend-design2 → Constraint Validator (haiku)
```

> **Rappel** : Les wireframes enrichis (v2) sont auto-suffisants — chaque section porte ses émotions,
> dials, techniques et contraintes. L'agent Context Assembler résout tout automatiquement.

---

## Objectif

Créer les pages secondaires, chaque page utilisant **uniquement son wireframe** comme source de contenu.

## Input

| Page | Wireframe | Dials Section |
|------|-----------|---------------|
| Services | `output/03.5-wireframes/services.md` | `project-dials.md > [sections services]` |
| Portfolio | `output/03.5-wireframes/portfolio.md` | `project-dials.md > [sections portfolio]` |
| About | `output/03.5-wireframes/about.md` | `project-dials.md > [sections about]` |
| Contact | `output/03.5-wireframes/contact.md` | `project-dials.md > [sections contact]` |

**Contexte supplémentaire** :
- `app/globals.css` — Design tokens
- `output/02-art-direction/constraints.md` — Règles visuelles
- `output/02-art-direction/emotion-map.md` — Émotions par section

**Exception** : Page Contact peut lire `01-brand/about.md` pour les coordonnées.

## Pages à Créer

### 1. Services (/services)

**Wireframe** : `output/03.5-wireframes/services.md`

Pour chaque section du wireframe :
1. Agent Context Assembler → context block avec dials de la section
2. Agent Aesthetic Director → direction créative
3. Code avec frontend-design2 (chargé via Read explicite de .claude/skills/frontend-design2/SKILL.md)
4. Agent Constraint Validator → pass/fail

> **Attention** : La page Services est particulièrement à risque pour les anti-patterns
> (grid 3 colonnes, cards génériques). Vérifier que project-dials.md > Anti-Patterns
> est bien appliqué.

### 2. Portfolio (/portfolio)

**Wireframe** : `output/03.5-wireframes/portfolio.md`

Même circuit. Le portfolio est souvent la page la plus visuellement expressive —
les dials de section seront probablement plus élevés en VARIANCE.

### 3. About (/about)

**Wireframe** : `output/03.5-wireframes/about.md`

Même circuit. Page narrative — l'Aesthetic Director devrait produire
des directions plus storytelling que techniques.

### 4. Contact (/contact)

**Wireframe** : `output/03.5-wireframes/contact.md`

Même circuit. Page de conversion — les dials MOTION et VARIANCE devraient
être au minimum. Pas de distraction.

**Stack formulaire** :
```bash
npm install react-hook-form @hookform/resolvers zod sonner
npx shadcn@latest add input textarea select
```

## Structure Fichiers

```
_preflight/
├── services/
│   ├── [section]-context.md
│   └── [section]-direction.md
├── portfolio/
│   ├── [section]-context.md
│   └── [section]-direction.md
├── about/
│   ├── [section]-context.md
│   └── [section]-direction.md
└── contact/
    ├── [section]-context.md
    └── [section]-direction.md

app/
├── services/
│   └── page.tsx
├── portfolio/
│   └── page.tsx
├── about/
│   └── page.tsx
├── contact/
│   └── page.tsx
└── actions/
    └── contact.ts

components/
└── pages/
    ├── services/
    │   └── [sections].tsx
    ├── portfolio/
    │   └── [sections].tsx
    ├── about/
    │   └── [sections].tsx
    └── contact/
        └── [sections].tsx
```

## Composants Réutilisables

Ces composants créés en B2 sont réutilisés :

| Composant | Usage |
|-----------|-------|
| `CtaFinal` | Toutes les pages (section finale) |
| `AnimatedSection` | Wrapper animations |

## Validation

- [ ] **Preflight** : Context block + direction créative produits pour CHAQUE section de CHAQUE page
- [ ] Toutes les pages créées selon leur wireframe
- [ ] Server/Client Components correctement séparés
- [ ] Formulaire Contact fonctionnel (validation Zod + Server Action)
- [ ] Composants réutilisés (CtaFinal, AnimatedSection)
- [ ] Responsive mobile-first
- [ ] **Constraint Validator** : pass sur CHAQUE section de CHAQUE page
- [ ] **Dials respectés** : valeurs par section cohérentes avec project-dials.md
- [ ] **Techniques implémentées** : celles recommandées dans project-dials.md > Arsenal
- [ ] **Anti-patterns évités** : grid 3 colonnes (Services), layout centré (si VARIANCE ≥ 4), cards génériques

## Prochaine Étape

→ `stages/B04-polish.md`

---

**Version** : 2.0
**Phase** : B3 (Design / Vibe Coding)
**Dépendances** : B1 (Layout), A5 (Wireframes), A3 (project-dials, constraints, emotion-map)
**Agents** : Context Assembler (haiku), Aesthetic Director (sonnet), Constraint Validator (haiku)
**Skill** : frontend-design2
**Produit pour** : B4 (Polish)
