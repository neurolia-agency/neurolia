# Dépendances Inter-Étapes

Matrice des inputs/outputs par étape du pipeline.

## Vue d'Ensemble

Le workflow est divisé en **2 phases** :

```
═══════════════════════════════════════════════════════════════════════════════
                        PHASE A : ARCHITECTURE
              (Définit CE QUI sera construit - Markdown uniquement)
═══════════════════════════════════════════════════════════════════════════════

../input/brief-client.md
        │
        ▼
┌──────────────────┐
│   A1: Init       │ → output/01-brief.md
└──────────────────┘
        │
        ▼
┌──────────────────┐
│   A2: Brand      │ → output/02-brand/ (7 fichiers)
└──────────────────┘
        │
        ├──────────────────────────────────────┐
        ▼                                      ▼
┌──────────────────┐                  ┌──────────────────┐
│ A3: Art Dir      │                  │   A4: Structure  │
└──────────────────┘                  └──────────────────┘
        │                                      │
        └──────────────┬───────────────────────┘
                       ▼
              ┌──────────────────┐
              │ A5: Wireframes   │ → output/05-wireframes/ (5 + README)
              └──────────────────┘
                       │
                       ▼
              ┌──────────────────┐
              │ A6: Design Tokens│ → app/globals.css
              └──────────────────┘

═══════════════════════════════════════════════════════════════════════════════
                     PHASE B : DESIGN / VIBE CODING
                   (Construit le site avec frontend-design)
═══════════════════════════════════════════════════════════════════════════════

              ┌──────────────────┐
              │   B1: Layout     │ → components/layout/
              └──────────────────┘
                       │
        ┌──────────────┴──────────────┐
        ▼                              ▼
┌──────────────────┐          ┌──────────────────┐
│   B2: Homepage   │          │   B3: Pages      │
└──────────────────┘          └──────────────────┘
        │                              │
        └──────────────┬───────────────┘
                       ▼
              ┌──────────────────┐
              │   B4: Polish     │
              └──────────────────┘
                       │
                       ▼
              ┌──────────────────┐
              │   B5: Validate   │
              └──────────────────┘
                       │
                       ▼
              ┌──────────────────┐
              │   B6: Deploy     │
              └──────────────────┘
```

## Matrice Détaillée

### Phase A : Architecture

| Étape | Stage | Inputs Requis | Outputs | Dépend de |
|-------|-------|---------------|---------|-----------|
| **A1** | `A01-init.md` | `../input/brief-client.md` | `output/01-brief.md` | - |
| **A2** | `A02-brand.md` | `output/01-brief.md` | `output/02-brand/` (7 fichiers) | A1 |
| **A3** | `A03-art-direction.md` | `output/02-brand/` (tous) | `output/03-art-direction/` (5 fichiers) | A2 |
| **A4** | `A04-structure.md` | `output/01-brief.md`, `02-brand/services.md` | `output/04-sitemap.md` | A2 |
| **A5** | `A05-wireframes.md` | `02-brand/`, `03-art-direction/`, `04-sitemap.md` | `output/05-wireframes/` (5 + README) | A3, A4 |
| **A6** | `A06-design-tokens.md` | `03-art-direction/`, `05-wireframes/` | `app/globals.css` | A3, A5 |

### Phase B : Design / Vibe Coding

| Étape | Stage | Inputs Requis | Outputs | Dépend de |
|-------|-------|---------------|---------|-----------|
| **B1** | `B01-layout.md` | `app/globals.css`, `04-sitemap.md` | `components/layout/` | A6 |
| **B2** | `B02-homepage.md` | `05-wireframes/homepage.md` | `components/sections/`, `app/page.tsx` | B1 |
| **B3** | `B03-pages.md` | `05-wireframes/*.md` | `app/[pages]/`, `components/pages/` | B1 |
| **B4** | `B04-polish.md` | Composants B1-B3 | Animations, SEO | B2, B3 |
| **B5** | `B05-validate.md` | Tout `output/`, site assemblé | `output/validation.md` | B4 |
| **B6** | `B06-deploy.md` | `output/validation.md` (PASS) | `output/deploy.md` | B5 |

### Note sur le Parallélisme

- **A3 (Art Dir)** et **A4 (Structure)** peuvent démarrer en parallèle après A2
- **B2 (Homepage)** et **B3 (Pages)** peuvent être développés en parallèle après B1
- La progression recommandée reste **linéaire** pour simplifier le suivi

## Règles de Lecture de Contexte

### Pattern "Lazy Context Loading"

Les étapes 05-06 utilisent un pattern de chargement paresseux du contexte :

1. **Lire d'abord** le wireframe de la page concernée
2. **Résoudre à la demande** les références `fichier.md > clé` vers `02-brand/`
3. **Ne pas pré-charger** tout le dossier brand/

```
Exemple pour Homepage :
1. Lire output/05-wireframes/homepage.md
2. Trouver référence "positioning.md > tagline"
3. Lire output/02-brand/positioning.md pour résoudre
4. Continuer avec la section suivante
```

### Exceptions à "Pas de Lecture Croisée"

Certaines pages nécessitent des données d'autres fichiers brand/ :

| Page | Fichier Wireframe | Lectures Croisées Autorisées |
|------|-------------------|------------------------------|
| Contact | `contact.md` | `about.md` (coordonnées : email, téléphone, adresse) |
| About | `about.md` | Aucune |
| Services | `services.md` | Aucune |
| Portfolio | `portfolio.md` | Aucune |
| Homepage | `homepage.md` | Toutes références dans le wireframe |

### Fichiers Toujours Accessibles

Ces fichiers peuvent être lus à **toute étape** sans restriction :

- `app/globals.css` - Design tokens (source unique CSS)
- `output/03-art-direction/constraints.md` - Règles de design
- `output/03-art-direction/visual-vocabulary.md` - Traductions visuelles
- `CLAUDE.md` - Statut et contexte global

## Composants Partagés

| Composant | Créé à | Utilisé par |
|-----------|--------|-------------|
| `AnimatedSection` | 05-Homepage | 05, 06 (toutes pages) |
| `CtaFinal` | 05-Homepage | 06 (Services, Portfolio, About) |
| `SmoothScrollProvider` | 04-Layout | 04+ (layout global) |
| Skeletons | 05-Homepage | 05, 06 (Suspense) |

## Validation Pré-Étape

Avant de commencer une étape, vérifier :

```bash
# Exemple pour étape 05
✓ output/05-wireframes/homepage.md existe
✓ app/globals.css contient les tokens
✓ components/layout/ créé (étape 04)
✓ components/ui/animated-section.tsx existe ou sera créé
```

---

*Dernière mise à jour : 2026-02-15*
