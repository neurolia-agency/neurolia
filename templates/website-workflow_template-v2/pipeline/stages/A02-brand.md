# Étape A02 : Brand (Identité de marque)

> **Phase A : Architecture** — Définition de l'identité complète.

## Objectif

Définir l'identité complète de la marque pour guider tout le contenu et le design. L'output doit être suffisamment profond pour que les étapes suivantes (Art Direction, Structure, Wireframes) puissent s'y référer sans ambiguïté.

## Input

- `output/00-brief.md` (brief structuré — source principale)
- Assets existants dans `input/` (logo, charte graphique, cartes, contenus)
- Identité visuelle documentée dans 00-brief.md (si existante)

## Séquence d'exécution

| Phase | Fichier | Description | Skill requis |
|-------|---------|-------------|--------------|
| **1. Diagnostic** | [01-diagnostic.md](A02-brand/01-diagnostic.md) | Lecture du brief, évaluation du point de départ, identification des pages | — |
| **2. Plateforme** | [02-platform.md](A02-brand/02-platform.md) | Fondation stratégique (Brand Key, Kapferer, archétypes) → `00-platform.md` | — |
| **3a. Expression verbale** | [03-production-verbal.md](A02-brand/03-production-verbal.md) | 4 fichiers : positioning, about, services, tone | `/brand-expression` |
| **3b. Identité visuelle & Personas** | [03-production-visual.md](A02-brand/03-production-visual.md) | 3 fichiers : personas, colors, typography | — |
| **4. Validation** | [04-validation.md](A02-brand/04-validation.md) | Vérification complète (44 items) | — |

> **Exécuter dans l'ordre.** Chaque phase s'appuie sur les outputs de la précédente. Lire le sous-fichier correspondant à chaque phase pour les instructions détaillées et templates.

## Output

```
output/01-brand/
├── 00-platform.md    # Plateforme de marque (fondation stratégique)
├── about.md          # Identité, mission, valeurs
├── services.md       # Offre structurée par catégorie
├── positioning.md    # Tagline, USPs, CTAs, messages par page
├── tone.md           # Registre, personnalité, lexique, exemples
├── personas.md       # Personas narratifs avec scénarios
├── colors.md         # Système couleurs complet (OKLCH + variantes)
└── typography.md     # Système typo complet (polices + échelle + CSS)
```

## Prochaine Étape

Une fois `output/01-brand/` complet → Passer à `stages/A03-art-direction.md`

---

**Version** : 3.2
**Phase** : A02 (Architecture)
**Dépendances** : A01 (00-brief.md)
**Skill requis** : `/brand-expression` (Phase 3a — expression verbale)
**Produit pour** : A03 (Art Direction), A04 (Structure), A05 (Wireframes), B01-B03 (Design/Pages)
