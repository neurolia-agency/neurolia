---
name: ui-ux-pro-max
description: "Donnees design (palettes couleurs par industrie, font pairings par mood) pour les choix visuels en Phase A. 97 palettes, 57 font pairings. Lookup CSV direct, zero dependance Python."
---

# ui-ux-pro-max — Donnees Design (Phase A)

Version allegee du skill global `ui-ux-pro-max`, embarquee dans le template pour autonomie complete.
Contient uniquement les **donnees CSV** (palettes + typographies) et le process de lookup.

> **Scope** : Phase A uniquement (A02-Brand, A03-Art Direction).
> Phase B utilise `frontend-design2` (dials, anti-slop, arsenal creatif).

## Fichiers

| Fichier | Contenu | Lignes |
|---------|---------|--------|
| `data/colors.csv` | 97 palettes par type de produit (HEX) | 97 |
| `data/typography.csv` | 57 font pairings par mood/industrie | 57 |

## Schema CSV — colors.csv

| Colonne | Description |
|---------|-------------|
| No | Index (1-97) |
| Product Type | Type de produit/industrie (SaaS, E-commerce, Restaurant, etc.) |
| Primary (Hex) | Couleur primaire |
| Secondary (Hex) | Couleur secondaire |
| CTA (Hex) | Couleur d'accent / CTA |
| Background (Hex) | Fond principal |
| Text (Hex) | Texte principal |
| Border (Hex) | Bordures |
| Notes | Justification du choix |

## Schema CSV — typography.csv

| Colonne | Description |
|---------|-------------|
| No | Index (1-57) |
| Font Pairing Name | Nom du pairing |
| Category | Type (Serif + Sans, Sans + Sans, etc.) |
| Heading Font | Police titres |
| Body Font | Police corps |
| Mood/Style Keywords | Mots-cles d'ambiance |
| Best For | Industries/usages recommandes |
| Google Fonts URL | Lien Google Fonts |
| CSS Import | Code @import |
| Tailwind Config | Configuration Tailwind |
| Notes | Justification du pairing |

## Process de Lookup — Couleurs

1. Identifier le **type de produit** depuis `output/00-brief.md`
2. LIRE `data/colors.csv`
3. Filtrer par colonne "Product Type" (correspondance exacte ou proche)
4. Selectionner 2-3 palettes candidates
5. **Personnaliser** selon l'archetype de marque (00-platform.md) :
   - Ajuster les teintes pour correspondre a l'atmosphere
   - Nommer les couleurs selon l'univers de marque
   - Le CSV est un POINT DE DEPART, pas un copier-coller
6. Convertir en **OKLCH** pour l'output final (colors.md)

## Process de Lookup — Typographie

1. Identifier les **mots-cles d'ambiance** depuis `output/01-brand/00-platform.md` (archetype, valeurs)
2. LIRE `data/typography.csv`
3. Chercher par colonnes "Mood/Style Keywords" et "Best For"
4. Selectionner 2-3 pairings candidats
5. **Evaluer** chaque pairing contre l'archetype :
   - Le heading incarne-t-il la personnalite de marque ?
   - Le body est-il lisible et coherent avec l'atmosphere ?
   - Le contraste hierarchique est-il suffisant ?
6. **Justifier** le choix final dans typography.md

## Important

- Les CSVs fournissent des valeurs **HEX** — la conversion OKLCH se fait a l'output
- Les donnees sont des **points de depart** — toujours personnaliser selon le projet
- Si le client fournit deja une palette/typo complete, ce lookup est **optionnel**
- Ce skill ne remplace PAS `frontend-design2` pour la Phase B
