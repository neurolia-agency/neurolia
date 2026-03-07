# Etape S02 : Brand (Identite de marque social media)

> Definir l'identite complete de la marque pour guider la production de contenu social media.

## Objectif

Definir l'identite complete de la marque orientee social media. L'output doit etre suffisamment profond pour alimenter directement les workflows de contenu (WF01 Planning, WF02 Prompts, WF03 Publishing) et la base de donnees WF00.

## Input

- `output/00-brief.md` (brief structure — source principale)
- Assets existants dans `input/` (logo, charte graphique)
- Identite visuelle documentee dans 00-brief.md (si existante)

## Sequence d'execution

| Phase | Fichier | Description | Skill requis |
|-------|---------|-------------|--------------|
| **1. Diagnostic** | [01-diagnostic.md](01-diagnostic.md) | Lecture du brief, evaluation du point de depart, analyse social | — |
| **2. Plateforme** | [02-platform.md](02-platform.md) | Fondation strategique (Brand Key, Kapferer, archetypes) + Calibrage Creatif Social → `00-platform.md` | — |
| **3a. Expression verbale** | [03-production-verbal.md](03-production-verbal.md) | 5 fichiers : positioning, about, services, tone, objectifs | `/brand-expression` |
| **3b. Identite visuelle & Personas** | [03-production-visual.md](03-production-visual.md) | 2 fichiers : personas, design-system | — |
| **4. Validation** | [04-validation.md](04-validation.md) | Verification complete (8 fichiers) | — |

> **Executer dans l'ordre.** Chaque phase s'appuie sur les outputs de la precedente.

## Output

```
output/01-brand/
├── 00-platform.md    # Plateforme de marque + Calibrage Creatif Social
├── about.md          # Identite, mission, valeurs, chiffres cles
├── services.md       # Offre structuree par categorie + Potentiel Social
├── positioning.md    # Tagline, USPs, Piliers de Contenu Social, CTA Sociaux
├── tone.md           # Registre, personnalite, lexique, Adaptation Social Media, Regles Redactionnelles
├── personas.md       # Personas narratifs avec scenarios + Comportement Social
├── design-system.md  # Couleurs (HEX) + Typographies + Application Social Media
└── objectifs.md      # Objectifs social media + KPIs
```

---

**Version** : 1.0
**Phase** : S02
**Dependances** : S01 (00-brief.md)
**Skill requis** : `/brand-expression` (Phase 3a — expression verbale)
**Produit pour** : WF00 (Onboarding), WF01 (Planning), WF02 (Prompts), WF03 (Publishing)
