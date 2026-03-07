# Dependances Inter-Etapes

Matrice des inputs/outputs du pipeline social brand.

## Vue d'Ensemble

```
pipeline/input/brief-client.md
pipeline/input/forms/*.csv (optionnel)
pipeline/input/existing-posts/ (optionnel)
        |
        v
+------------------+
|   S01: Init      | --> pipeline/output/00-brief.md
+------------------+
        |
        v
+------------------+
|   S02: Brand     | --> pipeline/output/01-brand/ (8 fichiers)
+------------------+
        |
        v
  [WF00 Onboarding]
  [WF01 Planning]
  [WF02 Prompts]
  [WF03 Publishing]
```

## Matrice Detaillee

| Etape | Stage | Inputs Requis | Outputs | Depend de |
|-------|-------|---------------|---------|-----------|
| **S01** | `S01-init.md` | `pipeline/input/brief-client.md`, `pipeline/input/forms/*` (optionnel), `pipeline/input/existing-posts/` (optionnel) | `pipeline/output/00-brief.md` | — |
| **S02** | `S02-brand/` | `00-brief.md`, `pipeline/input/forms/*` (si reference dans Sources Externes) | `pipeline/output/01-brand/` (8 fichiers) | S01 |

## Output S02 — 8 fichiers

| # | Fichier | Depend de | Produit pour |
|---|---------|-----------|-------------|
| 1 | `00-platform.md` | 00-brief.md, forms/ | Tous les autres fichiers brand |
| 2 | `about.md` | 00-platform.md | WF00 (#12-15, #24, #27) |
| 3 | `personas.md` | 00-platform.md | WF00 (#44, #50), WF01 (ciblage) |
| 4 | `positioning.md` | 00-platform.md | WF00 (#21-23, #25, #43, #46, #50), WF01/WF02 (piliers) |
| 5 | `tone.md` | 00-platform.md | WF00 (#16, #28-33, #40-42, #50), WF02/WF03 (redaction) |
| 6 | `services.md` | 00-platform.md | WF00 (#50), WF01 (calendrier) |
| 7 | `design-system.md` | 00-platform.md | WF00 (#34-38, #50), WF02 (visuels) |
| 8 | `objectifs.md` | 00-brief.md | WF00 (#47-49), WF01 (strategie) |

## Sequence d'execution S02

```
S02-brand/01-diagnostic.md    (lecture + analyse)
        |
        v
S02-brand/02-platform.md      (00-platform.md)
        |
        +---> S02-brand/03-production-verbal.md   (positioning + about + services + tone + objectifs)
        |
        +---> S02-brand/03-production-visual.md   (personas + design-system)
        |
        v
S02-brand/04-validation.md    (verification 8 fichiers)
```

> **3a et 3b** peuvent etre executes en quasi-parallele apres la Phase 2, mais la progression sequentielle est recommandee.

## Couverture WF00 Input Map

| Categorie | Champs | Fichier(s) source |
|-----------|--------|-------------------|
| CLIENT (#1-11) | name, slug, industry, web, social | 00-brief.md + manuel |
| IDENTITE (#12-17) | mission, vision, purpose, values, personality, archetype | 00-platform.md + tone.md |
| POSITIONNEMENT (#18-27) | insight, promise, essence, discriminator, tagline, baseline, slogan, usps, proof_points, key_figures | 00-platform.md + positioning.md + about.md |
| VOIX (#28-33) | tone, tu/vous, formality, vocab_do, vocab_dont, writing_rules | tone.md |
| VISUEL (#34-39) | primary_color, secondary_colors, font_primary, font_secondary, visual_style, photo_style | design-system.md + 00-platform.md |
| SOCIAL (#40-43) | hashtags_branded, hashtags_niche, emoji_usage, cta_preferred | tone.md + positioning.md |
| CONTEXTE (#44-46) | target_audience, competitors, differentiators | personas.md + 00-brief.md + positioning.md |
| OBJECTIFS (#47-49) | objectives_primary, objectives_secondary, kpis | objectifs.md |
| ETENDU (#50) | personas[], example_phrases[], product_categories, brand_key, kapferer, color_system | Repartis sur les 8 fichiers |
| ASSETS (#51-56) | logo, photos | input/assets/ (collecte manuelle) |
| CONTENU EXISTANT (#57-63) | posts existants (anti-repetition) | input/existing-posts/ |

**Resultat : 64/64 champs couverts.**

---

*Social Brand Template v1.0 — 2026-03-07*
