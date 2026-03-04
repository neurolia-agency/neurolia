# [NOM_PROJET] - Site Web

Site vitrine pour [CLIENT], [DESCRIPTION_COURTE].

## Statut Pipeline

### Phase A : Architecture (Markdown uniquement)

| Étape | Stage | Status | Output |
|-------|-------|--------|--------|
| A01 | Init | ⬜ | `pipeline/output/01-brief.md` |
| A02 | Brand | ⬜ | `pipeline/output/02-brand/` (7 fichiers) |
| A03 | Art Direction | ⬜ | `pipeline/output/02-art-direction/` (9 fichiers) |
| A04 | Structure | ⬜ | `pipeline/output/03-sitemap.md` |
| A05 | Wireframes | ⬜ | `pipeline/output/03.5-wireframes/` |
| A06 | Design Tokens | ⬜ | `app/globals.css` |

### Phase B : Design / Vibe Coding (Circuit d'Agents)

| Étape | Stage | Status | Output |
|-------|-------|--------|--------|
| B01 | Layout | ⬜ | `components/layout/` |
| B02 | Homepage | ⬜ | `components/sections/` + `app/page.tsx` |
| B03 | Pages | ⬜ | `app/[pages]/` |
| B04 | Polish | ⬜ | Animations + SEO + cohérence |
| B05 | Validate | ⬜ | `pipeline/output/07-validation.md` |
| B06 | Deploy | ⬜ | `pipeline/output/08-deploy.md` |

## Commandes

```bash
# Phase A - Exécuter séquentiellement
/apex -a -s exécuter A01-init depuis pipeline/stages/A01-init.md
/apex -a -s exécuter A02-brand depuis pipeline/stages/A02-brand.md
/apex -a -s exécuter A03-art-direction depuis pipeline/stages/A03-art-direction.md
/apex -a -s exécuter A04-structure depuis pipeline/stages/A04-structure.md
/apex -a -s exécuter A05-wireframes depuis pipeline/stages/A05-wireframes.md
/apex -a -s exécuter A06-design-tokens depuis pipeline/stages/A06-design-tokens.md

# Phase B - Circuit d'agents via section-builder
# Exemples :
# "Code le Hero de la homepage"
# "Construis la section Services"
# "Code la page Contact"
# → Le skill section-builder orchestre automatiquement le circuit d'agents

# Serveur dev
npm run dev
```

## Sources de Vérité

| Domaine | Source unique |
|---------|---------------|
| Statut pipeline | Ce fichier (CLAUDE.md) |
| Données client | `pipeline/input/` |
| Contraintes design | `pipeline/output/02-art-direction/constraints.md` |
| Vocabulaire visuel | `pipeline/output/02-art-direction/visual-vocabulary.md` |
| Calibration dials | `pipeline/output/02-art-direction/project-dials.md` |
| Composants UI | `pipeline/output/02-art-direction/ui-kit.md` |
| Émotions par section | `pipeline/output/02-art-direction/emotion-map.md` |
| Contenu brand | `pipeline/output/02-brand/` |
| Wireframes | `pipeline/output/03.5-wireframes/` |
| Tokens CSS | `app/globals.css` |
| Stack technique | `pipeline/workflow/DESIGN_STACK.md` |
| Dépendances | `pipeline/workflow/DEPENDENCIES.md` |
| Custom subagents | `.claude/agents/` (context-assembler, aesthetic-director, constraint-validator, wireframe-validator, token-auditor) |

## Contexte Projet

| Clé | Valeur |
|-----|--------|
| Client | [NOM_CLIENT] |
| Type | [Site vitrine / Landing / E-commerce] |
| Tagline | "[TAGLINE]" |
| Stack | Next.js 15+ / Tailwind CSS 4 / Motion / Lenis |
| Couleurs | OKLCH |

## ADN Visuel (à compléter en A03)

| Aspect | Valeur |
|--------|--------|
| Couleur signature | [À définir] |
| Forme signature | [À définir] |
| Mouvement | [À définir] |
| Radius | [À définir] |
| Typographies | [À définir] |

### Test Rapide "Est-ce [NOM_PROJET] ?"

- [ ] [Critère 1] ?
- [ ] [Critère 2] ?
- [ ] [Critère 3] ?
- [ ] [Critère 4] ?
- [ ] [Critère 5] ?

→ 5/5 = Conforme | < 4/5 = Revoir

## Dials Projet (calibrés en A03)

| Dial | Valeur | Effet |
|------|--------|-------|
| DESIGN_VARIANCE | [1-10] | Layout et compositions |
| MOTION_INTENSITY | [1-10] | Animations et transitions |
| VISUAL_DENSITY | [1-10] | Densité d'information |

## Flux de Contexte

### Phase A : Architecture

```
A01 : pipeline/input/brief-client.md → pipeline/output/01-brief.md
A02 : 01-brief.md → pipeline/output/02-brand/ (7 fichiers)
A03 : 02-brand/ + input/references/ (URLs + screenshots) → pipeline/output/02-art-direction/ (9 fichiers)
A04 : 01-brief.md + 02-brand/services.md → pipeline/output/03-sitemap.md
A05 : 02-brand/ + 02-art-direction/ + 03-sitemap.md → pipeline/output/03.5-wireframes/
A06 : 02-art-direction/ + 03.5-wireframes/ → app/globals.css
```

### Phase B : Design / Vibe Coding (Circuit d'Agents)

```
Pour chaque section demandée, le skill section-builder orchestre :

1. Context Assembler (haiku)
   Lit : wireframe + project-dials + emotion-map + constraints + visual-vocabulary + ui-kit + globals.css
   Produit : _preflight/[page]/[section]-context.md

2. Aesthetic Director (sonnet)
   Lit : context block
   Produit : _preflight/[page]/[section]-direction.md

3. Code (Claude + frontend-design2)
   Lit : context block + direction créative
   Produit : composant .tsx

4. Constraint Validator (haiku)
   Lit : code + context block + constraints + project-dials + ui-kit + globals.css
   Produit : rapport PASS/FAIL → corrections si nécessaire
```

**Règle** : Ne jamais écrire de composants UI sans passer par le circuit d'agents.

## Structure

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
│   │   └── typographies/          # Polices si identité existante
│   │
│   ├── output/                    # Artifacts générés (immutables)
│   │   ├── 01-brief.md
│   │   ├── 02-brand/              # Stratégie (7 fichiers)
│   │   ├── 02-art-direction/      # Direction artistique (9 fichiers)
│   │   ├── 03-sitemap.md
│   │   ├── 03.5-wireframes/       # Wireframes auto-suffisants
│   │   ├── 04-design-tokens/
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
    │   ├── aesthetic-director.md  # Sonnet — direction créative (Phase B)
    │   ├── constraint-validator.md # Haiku — vérifie les règles (Phase B, skills: [frontend-design2])
    │   ├── wireframe-validator.md # Haiku — valide les wireframes (A05)
    │   └── token-auditor.md       # Haiku — audite les tokens CSS (A06)
    └── skills/
        ├── section-builder/       # Skill orchestrateur Phase B
        │   └── SKILL.md
        └── frontend-design2/      # Skill comportemental UI
            └── SKILL.md
```

## Contraintes

- **Performance** : Lighthouse > 90
- **Responsive** : Mobile-first
- **Accessibilité** : WCAG AA
- **Ton** : [Vouvoiement/Tutoiement]
- **Tokens** : Pas de valeurs hardcodées (couleurs, spacing, durées → globals.css)
- **Composants** : Conformes à ui-kit.md

---

*Dernière mise à jour : [DATE]*
