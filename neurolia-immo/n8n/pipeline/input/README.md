# Input - Imports Architecture

Ce dossier contient les fichiers importes depuis le `app-architecture-template`. Ces fichiers sont le point d'entree du pipeline n8n.

## Structure

```
input/
├── README.md                # Ce fichier
└── imports/                 # Fichiers architecture importes
    ├── features.md          # Liste des fonctionnalites (depuis 01-brief/)
    ├── api-contracts.md     # Contrats API (depuis 04-api/)
    ├── webhook-map.md       # Mapping webhooks (depuis 04-api/)
    └── integrations.md      # Services tiers integres (depuis 04-api/)
```

## Comment importer

### Option 1 : Copie directe

```bash
# Depuis la racine du projet architecture
cp pipeline/output/01-brief/features.md ../mon-projet-n8n/pipeline/input/imports/
cp pipeline/output/04-api/api-contracts.md ../mon-projet-n8n/pipeline/input/imports/
cp pipeline/output/04-api/webhook-map.md ../mon-projet-n8n/pipeline/input/imports/
cp pipeline/output/04-api/integrations.md ../mon-projet-n8n/pipeline/input/imports/
```

### Option 2 : Lien symbolique

```bash
# Si les deux projets cohabitent dans le meme workspace
ln -s ../../mon-projet-archi/pipeline/output/01-brief/features.md pipeline/input/imports/features.md
ln -s ../../mon-projet-archi/pipeline/output/04-api/api-contracts.md pipeline/input/imports/api-contracts.md
ln -s ../../mon-projet-archi/pipeline/output/04-api/webhook-map.md pipeline/input/imports/webhook-map.md
ln -s ../../mon-projet-archi/pipeline/output/04-api/integrations.md pipeline/input/imports/integrations.md
```

## Fichiers requis

### features.md (OBLIGATOIRE)

Liste structuree des fonctionnalites de l'application. Utilise par N01 pour identifier les workflows necessaires.

**Contenu attendu** : Fonctionnalites groupees par domaine, avec priorite et description.

### api-contracts.md (OBLIGATOIRE)

Contrats des endpoints API. Utilise par N01 pour concevoir les interactions entre workflows et backend.

**Contenu attendu** : Endpoints avec methode, URL, payload, reponse attendue.

### webhook-map.md (OBLIGATOIRE)

Mapping des webhooks exposes et consommes. Utilise par N01 pour configurer les triggers webhook.

**Contenu attendu** : Liste des webhooks avec URL pattern, methode, payload, workflow cible.

### integrations.md (OBLIGATOIRE)

Liste des services tiers integres. Utilise par N03 pour le mapping des credentials.

**Contenu attendu** : Services avec type d'API, methode d'authentification, scopes necessaires.

## Checklist Pre-Pipeline

Avant de demarrer N01-workflow-architecture, verifier :

- [ ] `imports/features.md` present et a jour
- [ ] `imports/api-contracts.md` present et a jour
- [ ] `imports/webhook-map.md` present et a jour
- [ ] `imports/integrations.md` present et a jour
- [ ] Les fichiers proviennent d'un pipeline architecture valide (etapes A01-A06 completees)
- [ ] `CLAUDE.md` personnalise avec les placeholders remplis

## Regles

1. **Ne jamais modifier** les fichiers imports/ pendant le pipeline n8n
2. **Source de verite architecture** : en cas de doute, ces fichiers prevalent
3. **Versioning** : si l'architecture change, re-importer et re-executer depuis N01

---

*Template Workflow v1.0*
