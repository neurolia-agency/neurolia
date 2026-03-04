# Étape B2 : Homepage

> **Phase B : Design / Vibe Coding** - Page d'accueil.

## Workflow Agents + frontend-design2

**OBLIGATOIRE** : Chaque section passe par le circuit d'agents complet.

### Circuit pour chaque section

```
1. AGENT Context Assembler (haiku — déterministe)
   → Lit la section du wireframe (homepage.md)
   → Résout TOUS les pointeurs : visual-vocabulary, constraints, emotions, tokens
   → Extrait les dials de la section depuis project-dials.md
   → Produit : _preflight/homepage/[section]-context.md

2. AGENT Aesthetic Director (sonnet — créatif)
   → Lit le context block
   → Transforme en direction créative sensorielle
   → Sélectionne la/les technique(s) depuis l'arsenal (max 2-3 par section)
   → Décrit l'intention émotionnelle en termes visuels
   → Produit : _preflight/homepage/[section]-direction.md

3. CLAUDE + frontend-design2 (chargé via Read explicite de .claude/skills/frontend-design2/SKILL.md)
   → Lit .claude/skills/frontend-design2/SKILL.md (OBLIGATOIRE — chargement garanti)
   → Lit les 2 fichiers preflight
   → Les dials de la SECTION (pas les globaux) sont actifs
   → Code le composant
   → Applique la technique recommandée

4. AGENT Constraint Validator (haiku — vérification)
   → Compare le code contre constraints.md (règle par règle)
   → Vérifie les dials (ex: si VARIANCE=6, le layout ne doit pas être centré symétrique)
   → Vérifie la technique (ex: si "Sticky Scroll Stack" recommandé, est-il implémenté ?)
   → Produit : pass/fail + corrections
```

---

## Objectif

Créer la page d'accueil **section par section**, chaque section utilisant le circuit d'agents complet.

## Input

| Fichier | Usage |
|---------|-------|
| `output/03.5-wireframes/homepage.md` | **Source de contenu** — wireframe auto-suffisant |
| `app/globals.css` | Design tokens |
| `output/02-art-direction/project-dials.md` | Dials par section |
| `output/02-art-direction/constraints.md` | Règles visuelles |
| `output/02-art-direction/emotion-map.md` | Émotions par section |

> **Wireframe auto-suffisant** : Le wireframe enrichi (v2) contient déjà les pointeurs vers
> toutes les sources (émotions, dials, contraintes, techniques). L'agent Context Assembler
> résout ces pointeurs automatiquement — pas de pré-chargement manuel nécessaire.

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

Pour **chaque section** du wireframe `homepage.md` :

### Étape 1 — Preflight (automatique)

L'agent Context Assembler lit la section du wireframe et produit un context block du type :

```markdown
## Hero — Context Block

### Dials Section
DESIGN_VARIANCE: 6 | MOTION_INTENSITY: 5 | VISUAL_DENSITY: 2
Source : project-dials.md > Hero

### Contenu Résolu
- H1 : "Votre artisan de confiance depuis 1987"  ← positioning.md > tagline
- Baseline : "Dépannage, installation..."  ← positioning.md > baseline
- CTA : "Appelez-nous" → tel:+33...  ← positioning.md > cta_principal

### Émotion
- Primaire : Impact, confiance immédiate  ← emotion-map.md > Homepage > Hero
- Tension : Sobriété du fond vs énergie du CTA accent

### Layout
Split screen 60/40 — texte aligné à gauche, espace négatif à droite  ← wireframe

### Tokens Actifs
- Fond : oklch(0.15 0.02 265) = --background  ← visual-vocabulary > fond principal
- H1 : clamp(3rem, 6vw + 1rem, 4.5rem) = --font-size-h1  ← visual-vocabulary > typo massive
- Transition : 300ms ease-out = --transition-reveal  ← visual-vocabulary > apparition douce

### Contraintes Applicables
- ON FAIT #1 : [règle résolue]
- ON FAIT #3 : [règle résolue]
- ON NE FAIT PAS #2 : [règle résolue]
- ON NE FAIT PAS #5 : [règle résolue]

### Technique Recommandée
Text Scramble Effect — renforce la première impression de maîtrise
Source : project-dials.md > Arsenal
```

### Étape 2 — Direction Créative (automatique)

L'agent Aesthetic Director transforme le context block en intention sensorielle :

```markdown
## Hero — Direction Créative

L'entrée sur le site doit frapper par sa retenue maîtrisée. Le fond charbon absorbe
le regard, le silence visuel est total — puis la tagline surgit lettre par lettre
(Text Scramble), comme un artisan qui pose ses outils un par un avant de parler.
Le CTA ocre est le seul point de chaleur : il dit "je suis là" sans crier.

L'espace négatif à droite n'est pas vide — il respire. Il dit : "on a de la place,
on prend le temps". Le visiteur doit ressentir de la confiance avant d'avoir lu un mot.

Technique : Text Scramble Effect sur le H1 (révélation progressive, 50ms par caractère)
Palette active : fond charbon + texte craie + CTA ocre (seul accent)
Interdit : aucun mouvement sur le fond, aucune image hero, aucun gradient
```

### Étape 3 — Code (avec frontend-design2 chargé via Read explicite)

Claude code le composant avec :
- Le SKILL.md de frontend-design2 lu explicitement via Read (`.claude/skills/frontend-design2/SKILL.md`)
- Le context block (valeurs concrètes)
- La direction créative (âme du composant)
- Les dials de la section comme override

### Étape 4 — Validation (automatique)

L'agent Constraint Validator vérifie :
- [ ] Chaque règle de constraints.md applicable → code conforme
- [ ] Dials respectés (ex: VARIANCE=6 → pas de layout centré symétrique)
- [ ] Technique implémentée si recommandée
- [ ] Tokens CSS utilisés (pas de valeurs hardcodées)
- [ ] Server/Client separation correcte

---

## Sections à Créer

> L'ordre et le contenu exact viennent du wireframe homepage.md.
> Les sections ci-dessous sont un EXEMPLE — adapter au projet réel.

### Section 1 : Hero
**Type** : Server Component (+ wrapper AnimatedSection si animation)
→ Circuit agents complet

### Section 2 : Services (aperçu)
**Type** : Server Component
→ Circuit agents complet

### Section 3-N : [Sections depuis wireframe]
→ Circuit agents complet pour chaque section

### Contact Mini (si présent)
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

`app/page.tsx` — assembler les sections dans l'ordre du wireframe.

## Output

```
_preflight/homepage/
├── hero-context.md
├── hero-direction.md
├── services-preview-context.md
├── services-preview-direction.md
├── [section]-context.md
└── [section]-direction.md

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

- [ ] **Preflight** : Context block + direction créative produits pour CHAQUE section
- [ ] Chaque section créée individuellement via le circuit agents
- [ ] Wireframe respecté (contenu, layout, interactions, **émotions**, **techniques**)
- [ ] Server/Client Components correctement séparés
- [ ] Responsive mobile-first
- [ ] **Constraint Validator** : pass sur CHAQUE section
- [ ] **Dials respectés** : valeurs par section cohérentes avec project-dials.md
- [ ] **Techniques implémentées** : celles recommandées dans project-dials.md > Arsenal
- [ ] Accessibilité : labels, aria-invalid sur inputs, focus visible

## Prochaine Étape

→ `stages/B03-pages.md`

---

**Version** : 2.0
**Phase** : B2 (Design / Vibe Coding)
**Dépendances** : B1 (Layout), A5 (Wireframes), A3 (project-dials, constraints, emotion-map)
**Agents** : Context Assembler (haiku), Aesthetic Director (sonnet), Constraint Validator (haiku)
**Skill** : frontend-design2
**Produit pour** : B4 (Polish)
