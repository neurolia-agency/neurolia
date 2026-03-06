# Etape N05 : Validation

> **Phase N : Conception & Generation** - Validation des JSONs avant deploiement.

## Objectif

Valider chaque fichier JSON genere en N04 : structure, champs requis, expressions, references inter-nodes, et coherence globale. Produire un rapport detaille. Boucler avec N04 jusqu'a 0 erreurs.

## Skill

- `n8n-validation-expert` : Validation structurelle et semantique des workflows n8n

## Input

- `pipeline/output/04-workflows/` : Fichiers JSON n8n a valider

## Instructions

### 1. Validation structurelle

Pour chaque JSON, verifier :
- JSON valide (parseable)
- Presence des cles racine obligatoires : `name`, `nodes`, `connections`, `settings`
- Chaque node a : `id`, `name`, `type`, `typeVersion`, `position`, `parameters`
- Les connexions referencent des nodes existants

### 2. Validation des nodes

Pour chaque node :
- Le `type` est un type de node n8n valide
- La `typeVersion` est compatible avec la version n8n cible
- Les `parameters` requis pour ce type de node sont presents
- Les valeurs sont du bon type (string, number, boolean, array, object)
- Les expressions `={{ }}` utilisent une syntaxe valide

### 3. Validation des connexions

- Chaque node (sauf le dernier) a au moins une connexion sortante
- Le trigger est le premier node (aucune connexion entrante)
- Pas de connexion orpheline (node source ou destination inexistant)
- Les branchements (IF, Switch) ont le bon nombre de sorties

### 4. Validation des credentials

- Chaque credential referencee dans un node existe dans `credentials-map.md`
- Aucun secret en clair dans le JSON
- Les types de credentials correspondent aux types de nodes

### 5. Validation semantique

- Le flux de donnees est coherent (les schemas de sortie alimentent les entrees)
- Les sub-workflows appeles existent dans `04-workflows/`
- Les webhooks exposes ont des URL patterns uniques

### 6. Boucle de correction

Si des erreurs sont detectees :
1. Documenter dans le rapport
2. Corriger les JSONs dans `04-workflows/`
3. Re-valider jusqu'a 0 erreurs
4. Les warnings n'empechent pas la validation

## Output

### `05-validation/validation-report.md`

```markdown
# Validation Report

## Resume

| Workflow | Erreurs | Warnings | Status |
|----------|---------|----------|--------|
| WF01-nom | 0 | 2 | PASS |
| WF02-nom | 1 | 0 | FAIL |
| SW01-nom | 0 | 0 | PASS |
| ... | ... | ... | ... |

**Total** : [X] workflows valides, [Y] en erreur
**Status global** : PASS | FAIL

## Details par Workflow

### WF01 — [Nom]

**Status** : PASS

**Erreurs** : Aucune

**Warnings** :
- W001 : [Description du warning — ex: Node "Set" pourrait etre remplace par une expression]
- W002 : [Description]

**Suggestions** :
- [Amelioration optionnelle]

---

### WF02 — [Nom]

**Status** : FAIL

**Erreurs** :
- E001 : [Description de l'erreur — ex: Node "HTTP Request" manque le parametre "url"]
  - **Node** : [Nom du node]
  - **Champ** : [Champ concerne]
  - **Correction** : [Action a effectuer]

**Warnings** : Aucun

---

## Historique des validations

| Date | Erreurs | Warnings | Status |
|------|---------|----------|--------|
| [DATE] | [X] | [Y] | FAIL |
| [DATE] | 0 | [Y] | PASS |
```

## Validation

- [ ] Tous les fichiers JSON de `04-workflows/` ont ete valides
- [ ] Le rapport contient un resume avec status par workflow
- [ ] Chaque erreur a une description et une correction suggeree
- [ ] Le status global est PASS (0 erreurs)
- [ ] L'historique des validations est documente (si boucle de correction)

## Prochaine Etape

Une fois le status global PASS → Deployer les JSONs dans n8n via "Import from File".

Pour les modifications post-deploiement → Utiliser `stages/N06-maintenance.md`

---

**Version** : 1.0
**Phase** : N05 (Conception & Generation)
**Dependances** : N04 (JSONs workflows)
**Produit pour** : Deploiement, N06 (Maintenance)
