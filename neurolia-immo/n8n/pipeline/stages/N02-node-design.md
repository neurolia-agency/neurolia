# Etape N02 : Node Design

> **Phase N : Conception & Generation** - Configuration detaillee de chaque node.

## Objectif

Pour chaque workflow specifie en N01, concevoir la configuration detaillee de chaque node : type, parametres, expressions, code (si Code node), et schema de sortie attendu.

## Skills

- `n8n-node-configuration` : Configuration des nodes n8n (parametres, modes, expressions)
- `n8n-code-javascript` : Ecriture de code JavaScript pour les Code nodes
- `n8n-code-python` : Ecriture de code Python pour les Code nodes
- `n8n-expression-syntax` : Syntaxe des expressions n8n (references, fonctions, variables)

## Input

- `pipeline/output/01-architecture/workflow-specs/` : Specifications de chaque workflow

## Instructions

### 1. Analyser chaque workflow-spec

Pour chaque fichier dans `workflow-specs/`, identifier :
- La chaine de nodes (du trigger a la sortie)
- Les transformations de donnees necessaires
- Les appels API et leurs parametres
- Les conditions de branchement (IF, Switch)

### 2. Configurer chaque node

Pour chaque node dans le workflow :
- Choisir le type de node n8n le plus adapte
- Configurer les parametres specifiques
- Ecrire les expressions n8n pour les champs dynamiques
- Si Code node : ecrire le code JS/Python complet

### 3. Documenter les schemas

Pour chaque node, documenter :
- Le schema des donnees en entree
- Le schema des donnees en sortie
- Les transformations appliquees

### 4. Organiser par workflow

Creer un dossier par workflow dans `02-node-configs/` avec un fichier par node.

## Output

### `02-node-configs/`

Structure : un dossier par workflow, un fichier par node.

```
02-node-configs/
├── WF01-nom-workflow/
│   ├── 01-trigger-webhook.md
│   ├── 02-http-request-get-data.md
│   ├── 03-code-transform.md
│   ├── 04-if-condition.md
│   └── 05-http-request-send.md
├── WF02-nom-workflow/
│   ├── 01-trigger-cron.md
│   ├── ...
├── SW01-nom-sub/
│   ├── 01-execute-workflow-trigger.md
│   ├── ...
└── ...
```

Format de chaque fichier node :

```markdown
# Node: [Nom du node]

**Type** : [Type n8n — ex: n8nTrigger, httpRequest, code, if, switch, set, merge, etc.]
**Mode** : [Run Once for All Items | Run Once for Each Item]

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| url | `={{ $json.endpoint }}` | URL de l'API cible |
| body | `={{ JSON.stringify($json.payload) }}` | Corps de la requete |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| method | POST | Methode HTTP |
| authentication | predefinedCredentialType | Utilise CRED-XX |
| ... | ... | ... |

## Code

> Section presente uniquement pour les nodes de type `code`.

**Langage** : JavaScript | Python
**Fichier** : `code/WFXX-node-name.js`

```javascript
// Code du node
for (const item of $input.all()) {
  // Transformation
  item.json.result = processData(item.json);
}
return $input.all();
```

## Sortie attendue

```json
{
  "field1": "type: string",
  "field2": "type: number",
  "nested": {
    "subfield": "type: boolean"
  }
}
```

## Connexions

- **Entree** : [Nom du node precedent]
- **Sortie principale** : [Nom du node suivant]
- **Sortie secondaire** : [Si branchement — nom du node alternatif]
```

## Validation

- [ ] Chaque workflow de N01 a un dossier dans `02-node-configs/`
- [ ] Chaque node liste dans le workflow-spec a un fichier de configuration
- [ ] Les types de nodes sont valides pour la version n8n cible
- [ ] Les expressions n8n utilisent la syntaxe correcte (`={{ }}`)
- [ ] Les Code nodes ont du code complet et fonctionnel
- [ ] Les schemas de sortie sont coherents d'un node a l'autre (la sortie de N alimente l'entree de N+1)
- [ ] Les connexions entre nodes correspondent au flux defini dans le workflow-spec
- [ ] Les modes d'execution (Run Once for All / Each) sont corrects pour chaque node

## Prochaine Etape

Une fois `output/02-node-configs/` cree → Passer a `stages/N03-credential-mapping.md`

---

**Version** : 1.0
**Phase** : N02 (Conception & Generation)
**Dependances** : N01 (workflow-specs)
**Produit pour** : N03 (Credential Mapping), N04 (JSON Generation)
