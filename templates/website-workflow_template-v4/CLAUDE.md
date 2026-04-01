# [NOM_PROJET] - Site Web

Site vitrine pour [CLIENT], [DESCRIPTION_COURTE].

## Statut Pipeline

### Phase A : Architecture (Markdown uniquement)

| Etape | Stage | Status | Output |
|-------|-------|--------|--------|
| A01 | Init | ⬜ | `pipeline/output/00-brief.md` |
| A02 | Brand | ⬜ | `pipeline/output/01-brand/` (8 fichiers) |
| A03 | Art Direction | ⬜ | `pipeline/output/02-art-direction/` (7 fichiers) |
| A04 | Structure | ⬜ | `pipeline/output/03-sitemap.md` |
| A05 | Creative Briefs | ⬜ | `pipeline/output/03.5-wireframes/` |
| A06 | Design Tokens | ⬜ | `app/globals.css` |

### Phase B : Design / Vibe Coding (Circuit d'Agents v4)

| Etape | Stage | Status | Output |
|-------|-------|--------|--------|
| B01 | Layout | ⬜ | `components/layout/` |
| B02 | Homepage | ⬜ | `components/sections/` + `app/page.tsx` |
| B03 | Pages | ⬜ | `app/[pages]/` |
| B04 | Polish | ⬜ | Animations + SEO + coherence |
| B05 | Validate | ⬜ | `pipeline/output/07-validation.md` |
| B06 | Deploy | ⬜ | `pipeline/output/08-deploy.md` |

## Commandes

```bash
# Phase A — /apex -a -s executer [AXX]-[nom] depuis pipeline/stages/[AXX]-[nom].md
# Phase B — "Code le Hero de la homepage" -> section-builder orchestre le circuit
npm run dev
```

## Sources de Verite

| Domaine | Source unique |
|---------|---------------|
| Statut pipeline | Ce fichier (CLAUDE.md) |
| Donnees client | `pipeline/input/` (brief + forms + assets) |
| References visuelles | `pipeline/input/references/screenshots/` |
| Contraintes design | `pipeline/output/02-art-direction/constraints.md` |
| Vocabulaire visuel | `pipeline/output/02-art-direction/visual-vocabulary.md` |
| Dials globaux + Creative Palette | `pipeline/output/02-art-direction/project-dials.md` |
| Composants UI | `pipeline/output/02-art-direction/ui-kit.md` |
| Emotions par section | `pipeline/output/02-art-direction/emotion-map.md` |
| Contenu brand | `pipeline/output/01-brand/` |
| Donnees design (palettes, typo) | `.claude/skills/ui-ux-pro-max/data/` (CSVs) |
| Creative Briefs | `pipeline/output/03.5-wireframes/` |
| Tokens CSS | `app/globals.css` |
| Stack & dependances | `pipeline/workflow/` |
| Custom subagents | `.claude/agents/` |

## Contexte Projet

| Cle | Valeur |
|-----|--------|
| Client | [NOM_CLIENT] |
| Type | [Site vitrine / Landing / E-commerce] |
| Tagline | "[TAGLINE]" |
| Stack | Next.js 15+ / Tailwind CSS 4 / Motion / Lenis |
| Couleurs | OKLCH |

## ADN Visuel & Dials (a completer en A03)

| Aspect | Valeur |
|--------|--------|
| Couleur signature | [A definir] |
| Forme / Radius | [A definir] |
| Mouvement | [A definir] |
| Typographies | [A definir] |
| DESIGN_VARIANCE | [1-10] (global) |
| MOTION_INTENSITY | [1-10] (global) |
| VISUAL_DENSITY | [1-10] (global) |

> Note v4 : Les dials par section sont decides par frontend-design2 au moment du coding, pas fixes en A03.

<!-- Details flux Phase B dans .claude/rules/phase-b-circuit.md -->
<!-- Arborescence complete dans .claude/rules/pipeline-structure.md -->

## Contraintes

- **Performance** : Lighthouse > 90
- **Responsive** : Mobile-first
- **Accessibilite** : WCAG AA
- **Ton** : [Vouvoiement/Tutoiement]
- **Tokens** : Pas de valeurs hardcodees (couleurs, spacing, durees -> globals.css)
- **Composants** : Conformes a ui-kit.md

---

*Derniere mise a jour : [DATE]*
