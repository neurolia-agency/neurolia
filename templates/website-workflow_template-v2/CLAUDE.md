# [NOM_PROJET] - Site Web

Site vitrine pour [CLIENT], [DESCRIPTION_COURTE].

## Statut Pipeline

### Phase A : Architecture (Markdown uniquement)

| Étape | Stage | Status | Output |
|-------|-------|--------|--------|
| A01 | Init | ⬜ | `pipeline/output/00-brief.md` |
| A02 | Brand | ⬜ | `pipeline/output/01-brand/` (8 fichiers) |
| A03 | Art Direction | ⬜ | `pipeline/output/02-art-direction/` (7 fichiers) |
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
# Phase A — /apex -a -s exécuter [AXX]-[nom] depuis pipeline/stages/[AXX]-[nom].md
# Phase B — "Code le Hero de la homepage" → section-builder orchestre le circuit d'agents
npm run dev
```

## Sources de Vérité

| Domaine | Source unique |
|---------|---------------|
| Statut pipeline | Ce fichier (CLAUDE.md) |
| Données client | `pipeline/input/` (brief + forms + assets) |
| Contraintes design | `pipeline/output/02-art-direction/constraints.md` |
| Vocabulaire visuel | `pipeline/output/02-art-direction/visual-vocabulary.md` |
| Calibration dials | `pipeline/output/02-art-direction/project-dials.md` |
| Composants UI | `pipeline/output/02-art-direction/ui-kit.md` |
| Émotions par section | `pipeline/output/02-art-direction/emotion-map.md` |
| Contenu brand | `pipeline/output/01-brand/` |
| Wireframes | `pipeline/output/03.5-wireframes/` |
| Tokens CSS | `app/globals.css` |
| Stack & dépendances | `pipeline/workflow/` |
| Custom subagents | `.claude/agents/` (5 agents) |

## Contexte Projet

| Clé | Valeur |
|-----|--------|
| Client | [NOM_CLIENT] |
| Type | [Site vitrine / Landing / E-commerce] |
| Tagline | "[TAGLINE]" |
| Stack | Next.js 15+ / Tailwind CSS 4 / Motion / Lenis |
| Couleurs | OKLCH |

## ADN Visuel & Dials (à compléter en A03)

| Aspect | Valeur |
|--------|--------|
| Couleur signature | [À définir] |
| Forme / Radius | [À définir] |
| Mouvement | [À définir] |
| Typographies | [À définir] |
| DESIGN_VARIANCE | [1-10] |
| MOTION_INTENSITY | [1-10] |
| VISUAL_DENSITY | [1-10] |

<!-- Détails flux Phase A/B dans .claude/rules/phase-b-circuit.md -->
<!-- Arborescence complète dans .claude/rules/pipeline-structure.md -->

## Contraintes

- **Performance** : Lighthouse > 90
- **Responsive** : Mobile-first
- **Accessibilité** : WCAG AA
- **Ton** : [Vouvoiement/Tutoiement]
- **Tokens** : Pas de valeurs hardcodées (couleurs, spacing, durées → globals.css)
- **Composants** : Conformes à ui-kit.md

---

*Dernière mise à jour : [04/03/2026]*
