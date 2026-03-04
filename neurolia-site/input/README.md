# Input - Données Client

> **Fonction** : Données source fournies par le client (lecture seule)

Ce dossier centralise les informations client. Ces fichiers ne sont **jamais modifiés** pendant le pipeline.

## Structure

```
input/
├── brief-client.md     # Questionnaire client (obligatoire)
└── assets/             # Logo, images fournies
    ├── fonts/
    ├── logo/
    ├── portfolio/
    └── team/
```

> **Note** : Les références d'inspiration sont dans `references/sites/` (racine projet).

## Utilisation par Étape

| Étape | Fichier(s) Consommé(s) |
|-------|------------------------|
| A1-Init | `brief-client.md` |
| A2-Brand | `brief-client.md` |
| A3-Art Direction | `references/sites/sites.md` |
