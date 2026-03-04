# Dependances entre Phases

## Phase A : Architecture (sequentielle)

```
A01-init
  └─→ A02-design-extraction
        └─→ A03-structure (utilise aussi A01)
              └─→ A04-wireframes (utilise aussi A02)
                    └─→ A05-design-tokens (utilise aussi A02)
```

**Regle** : Chaque etape Phase A depend de la precedente. Executer sequentiellement.

## Phase B : Developpement (parallele + sequentiel)

```
B01-setup (depend de A03, A05)
  ├─→ Batch A : Auth UI (parallele)
  ├─→ Batch B : Pages role 1 (parallele, mock data)
  ├─→ Batch C : Pages role 2 (parallele, mock data)
  ├─→ Batch D : Pages secondaires (parallele)
  │
  └─→ Batch E : Backend critique (SEQUENTIEL, opus)
        │   1. Auth + middleware + RLS
        │   2. Schema + seed data
        │   3. API webhooks
        │
        └─→ Batch F : Integrations (depend de E)
        │       - n8n workflows documentation enrichie (Hostinger)
        │       - Emails
        │       - Sync externe
        │
        └─→ Batch G : JSON n8n (depend de F)
                - Generation JSON importables (n8n-workflow-builder)
                - Validation
                - Setup maintenance

B05-polish (depend de B01-B04 + Batches E/F/G)
  └─→ B06-deploy (depend de tout)
```

## Matrice de Dependances

| Etape | Depend de | Produit |
|-------|-----------|---------|
| A01 | brief-client.md | 01-brief/ |
| A02 | A01, design system source | 02-design-system/ |
| A03 | A01, A02 | 03-structure/ (data-model, auth, routes, workflow-map, webhook-map, integrations) |
| A04 | A02, A03 | 04-wireframes/ |
| A05 | A02, A04 | globals.css |
| B01 | A03, A05 | Schema + Auth + Layout |
| B02 | B01, wireframes | Pages CRUD |
| B03 | B01, wireframes, seed | Dashboard views |
| B04 | B01, workflow-map, webhook-map, integrations | API routes + n8n docs enrichies (Hostinger) |
| Batch G | B04 (docs enrichies) | JSON n8n importables + validation |
| B05 | B01-B04 + Batch G | Polish |
| B06 | B01-B05 | Production |

## Infrastructure

| Service | Hebergement | Dependance |
|---------|-------------|------------|
| Frontend | Vercel | B06 |
| Backend | Supabase (cloud) | B01 |
| Automations | n8n (Hostinger) | B04 + Batch G |

## Parallelisation

### Peut tourner en parallele
- Batch A + B + C + D (UI pages avec mock data)
- Au sein de Batch G : workflows sans dependances entre eux

### DOIT etre sequentiel
- Phase A complete (A01 → A05)
- Batch E etape 1 (Auth) avant tout le reste du backend
- Batch F avant Batch G (les docs enrichies sont les inputs de la generation JSON)
- B05 apres tous les batchs (A-G)
- B06 apres B05
