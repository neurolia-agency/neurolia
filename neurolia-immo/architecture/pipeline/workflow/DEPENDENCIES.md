# Dependances Inter-Etapes

Matrice des inputs/outputs par etape du pipeline.

## Vue d'Ensemble

```
═══════════════════════════════════════════════════════════════════════════════
                        PHASE A : ARCHITECTURE
              (Definit CE QUI sera construit - Documentation uniquement)
═══════════════════════════════════════════════════════════════════════════════

pipeline/input/brief-client.md
        │
        ▼
┌──────────────────┐
│   A01: Init      │ → pipeline/output/01-brief/ (prd.md, features.md)
└──────────────────┘
        │
        ▼
┌──────────────────┐
│ A02: User Flows  │ → pipeline/output/02-user-flows/ (flows/, navigation-map.md)
└──────────────────┘
        │
        ├──────────────────────────────────────┐
        ▼                                      ▼
┌──────────────────┐                  ┌──────────────────┐
│  A03: Data       │                  │  A04: API        │
│  Architecture    │                  │  & Integrations  │
└──────────────────┘                  └──────────────────┘
        │                                      │
        │  pipeline/output/03-data/            │  pipeline/output/04-api/
        │  (data-model.md, auth-strategy.md)   │  (api-contracts.md, webhook-map.md,
        │                                      │   integrations.md)
        └──────────────┬───────────────────────┘
                       ▼
              ┌──────────────────┐
              │ A05: Tech Stack  │ → pipeline/output/05-tech/ (tech-stack.md, project-setup.md)
              └──────────────────┘

═══════════════════════════════════════════════════════════════════════════════
                     CONSOMMATION PAR AUTRES TEMPLATES
═══════════════════════════════════════════════════════════════════════════════

              ┌─────────────────────────────────────┐
              │        Outputs Architecture         │
              │                                     │
              │  01-brief/features.md               │
              │  01-brief/prd.md                    │
              │  02-user-flows/                     │
              │  04-api/api-contracts.md             │
              │  04-api/webhook-map.md               │
              │  05-tech/tech-stack.md               │
              └───────────┬─────────────┬───────────┘
                          │             │
                ┌─────────▼──┐    ┌─────▼───────────┐
                │ app-n8n    │    │ app-design       │
                │ template   │    │ template         │
                └────────────┘    └─────────────────┘
```

## Matrice Detaillee

### Phase A : Architecture

| Etape | Stage | Inputs Requis | Outputs | Depend de |
|-------|-------|---------------|---------|-----------|
| **A01** | `A01-init.md` | `pipeline/input/brief-client.md` | `pipeline/output/01-brief/` (prd.md, features.md) | - |
| **A02** | `A02-user-flows.md` | `01-brief/prd.md`, `01-brief/features.md` | `pipeline/output/02-user-flows/` (flows/, navigation-map.md) | A01 |
| **A03** | `A03-data-architecture.md` | `01-brief/features.md`, `02-user-flows/` | `pipeline/output/03-data/` (data-model.md, auth-strategy.md) | A01, A02 |
| **A04** | `A04-api-contracts.md` | `03-data/data-model.md`, `01-brief/features.md`, `02-user-flows/` | `pipeline/output/04-api/` (api-contracts.md, webhook-map.md, integrations.md) | A01, A02, A03 |
| **A05** | `A05-tech-stack.md` | `01-brief/prd.md`, `01-brief/features.md` | `pipeline/output/05-tech/` (tech-stack.md, project-setup.md) | A01 |

### Parallelisme

- **A03** et **A04** peuvent demarrer en parallele apres A02 (A04 depend de A03 pour le data-model, mais peut demarrer en parallele si A03 est rapide)
- **A05** peut demarrer des que A01 est termine (ne depend pas de A02-A04)
- Progression recommandee : **sequentielle** pour simplifier le suivi

### Contrats Inter-Templates

| Template Consommateur | Fichiers Importes | Usage |
|-----------------------|-------------------|-------|
| `app-n8n-template` | `01-brief/features.md` | Liste des features pour mapper les workflows |
| `app-n8n-template` | `04-api/api-contracts.md` | Endpoints pour configurer les nodes HTTP |
| `app-n8n-template` | `04-api/webhook-map.md` | Webhooks pour creer les triggers n8n |
| `app-design-template` | `01-brief/prd.md` | Contexte projet pour le design |
| `app-design-template` | `01-brief/features.md` | Features pour le design des ecrans |
| `app-design-template` | `02-user-flows/` | Navigation et flows pour le design |
| `app-design-template` | `05-tech/tech-stack.md` | Stack pour adapter les composants UI |

## Regles de Lecture de Contexte

### Pattern "Lazy Context Loading"

Les templates consommateurs utilisent un chargement paresseux :

1. **Lire d'abord** le fichier principal requis
2. **Resoudre a la demande** les references vers d'autres fichiers
3. **Ne pas pre-charger** tous les outputs

```
Exemple pour app-n8n-template :
1. Lire pipeline/output/04-api/webhook-map.md
2. Trouver reference vers features.md pour le contexte
3. Lire pipeline/output/01-brief/features.md pour resoudre
4. Continuer avec le workflow suivant
```

### Fichiers Toujours Accessibles

Ces fichiers peuvent etre lus a **toute etape** :

- `CLAUDE.md` - Statut et contexte global
- `pipeline/workflow/DEPENDENCIES.md` - Ce fichier

---

*App Architecture Template v1.0 - 2026-02-19*
