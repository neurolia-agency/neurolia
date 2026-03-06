# Forms — Formulaires Externes

Dossier optionnel pour les formulaires clients remplis en amont du pipeline (Google Forms, Typeform, etc.).

## Convention

Chaque formulaire = **1 CSV** (données brutes) + **1 manifest** (mapping vers le pipeline).

### Nommage

```
forms/
├── README.md
├── [type]-responses.csv        # Données brutes du formulaire
├── [type]-manifest.md          # Mapping colonnes CSV → concepts pipeline
└── .gitkeep
```

### Types supportés

| Type | Formulaire | Cible principale |
|------|-----------|-----------------|
| `brand-platform` | Plateforme de marque (identité, mission, ton, valeurs) | A02-Brand |
| `strategy-audit` | Audit stratégique (marché, concurrence, positionnement) | A01-Init, A02-Brand |
| `customer-survey` | Enquête clients finaux (besoins, perception, satisfaction) | A02-Brand, A04-Structure |

> Cette liste est extensible. Pour ajouter un type : créer un nouveau manifest `[type]-manifest.md`.

## Règle d'immutabilité

Comme tout fichier dans `input/`, les CSV et manifests ne sont **jamais modifiés** pendant le pipeline. Ce sont des données brutes client — source de vérité.

## Règle de priorité

`brief-client.md` > CSV en cas de contradiction. Le brief est le document validé avec le client ; les formulaires sont des sources complémentaires.

## Utilisation par le pipeline

1. **A01-Init** : Détecte les formulaires, extrait les données mappées vers A01 (infos client, objectifs, ambition)
2. **A02-Brand** : Exploite les données brand-platform pour pré-alimenter `00-platform.md` (voix brute du client)
3. **A03-Art Direction** : Enrichissement secondaire (ambiance visuelle, couleurs/matières)

---

*Template Workflow v2.0*
