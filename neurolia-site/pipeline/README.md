# Pipeline - Workflow de Création

> **Fonction** : Processus séquentiel de création du site en 2 phases (Architecture → Code)
>
> **Note** : Les données client sont dans `input/` (racine projet). Les références sont dans `references/` (racine projet).

## Structure

```
pipeline/
├── output/             # Artifacts générés Phase A (LECTURE SEULE)
│   ├── 01-brand/       # Stratégie marque (7 fichiers)
│   ├── 01.5-art-direction/  # Direction artistique (5 fichiers)
│   └── 03.5-wireframes/     # Wireframes pages (5 fichiers)
│
├── stages/             # Instructions par étape (00-09)
│
├── workflow/           # Documentation du pipeline
│   ├── DEPENDENCIES.md # Matrice inputs/outputs
│   └── DESIGN_STACK.md # Stack technique
│
└── archive/            # Fichiers archivés
```

## Flux de Données

```
CLIENT → input/brief-client.md (racine projet)
              ↓
         PHASE A (stages/00-06)
              ↓
         output/ (brand, art-direction, wireframes)
              ↓
         PHASE B (stages/04-09)
              ↓
         app/ + components/ (CODE FINAL)
```

## Consommateurs

| Dossier | Consommé par | Quand |
|---------|--------------|-------|
| `output/` | Agent Phase B | Étapes 04-09 |
| `stages/` | Agent Claude | Chaque étape |
| `workflow/` | Agent Claude | Référence |
