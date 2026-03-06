# n8n Consultant — Expert Automatisations

Environnement de travail dédié à la création de workflows n8n de haute qualité.
Toujours ouvrir ce dossier directement (`cd n8n-consultant/ && claude`) pour bénéficier de toute la configuration.

---

## Première action de chaque session

1. Vérifier que le MCP n8n est actif : les outils `mcp__n8n-mcp__*` doivent être disponibles
2. Si pas de MCP → voir section **Installation MCP** ci-dessous
3. Lancer `tools_documentation` pour vérifier les outils disponibles sur la version installée

---

## MCP n8n — `n8n-mcp` par czlonkowski

### Deux modes de fonctionnement

| Mode | Usage | API requise |
|------|-------|-------------|
| **Documentation only** | Accès aux schémas de 1 084 nodes, 2 709 templates, validation JSON | Non |
| **Gestion complète** | Créer/modifier/activer workflows + exécutions | Oui |

### Installation

Le fichier `.mcp.json` est déjà présent dans ce dossier. Pour l'activer :

1. Renseigner `N8N_API_URL` et `N8N_API_KEY` dans `.mcp.json`
2. Relancer Claude Code depuis ce dossier

Voir `.mcp.json.example` pour la config de référence du repo officiel.

> **`MCP_MODE=stdio` est obligatoire** pour Claude Code/Desktop — sans ça, le MCP ne fonctionne pas.

### Obtenir la clé API n8n

1. Dans n8n → **Settings → API → Create API Key**
2. Permissions minimales : `workflow:read`, `workflow:write`, `execution:read`

### Règle critique

> **Ne jamais modifier des workflows de production directement avec l'IA.**
> Toujours tester sur une instance de développement d'abord.

---

## Skills n8n — `.claude/skills/`

7 skills czlonkowski installés localement dans ce projet.

### Les 7 Skills

| Priorité | Skill | Activation automatique quand... |
|----------|-------|----------------------------------|
| **HAUTE** | `n8n-mcp-tools-expert` | Utiliser les outils MCP, sélectionner le bon outil, formats `nodeType` |
| | `n8n-workflow-patterns` | "Construire un webhook", "workflow API", "workflow planifié" |
| | `n8n-node-configuration` | Configurer un node, propriétés requises, 8 types de connexions AI |
| | `n8n-expression-syntax` | Écrire des expressions `{{ }}`, `$json`, `$node`, `$now`, `$env` |
| | `n8n-validation-expert` | "Pourquoi la validation échoue", auto-sanitization, faux positifs |
| | `n8n-code-javascript` | Code nodes JS, `$input`, `$helpers.httpRequest`, patterns production |
| | `n8n-code-python` | Code nodes Python (limites : pas de `requests`/`pandas` externes) |

### Intégration cross-skills

```
n8n-workflow-patterns   → identifier la structure
n8n-mcp-tools-expert    → trouver les nodes
n8n-node-configuration  → configurer chaque node
n8n-expression-syntax   → mapper les données
n8n-code-javascript/py  → logique custom
n8n-validation-expert   → valider le résultat
```

---

## Outils MCP disponibles (vrais noms)

### Node Discovery

| Outil | Description |
|-------|-------------|
| `search_nodes` | Rechercher un node par mot-clé |
| `get_node` | Info node unifiée avec niveaux de détail (`minimal`, `standard`, `full`) et modes (`info`, `docs`, `search_properties`, `versions`) |

### Validation

| Outil | Description |
|-------|-------------|
| `validate_node` | Validation unifiée avec modes (`minimal`, `full`) et profils (`runtime`, `ai-friendly`, `strict`) |
| `validate_workflow` | Validation complète d'un workflow JSON |
| `n8n_validate_workflow` | Valider un workflow par ID sur l'instance |
| `n8n_autofix_workflow` | Auto-correction des problèmes courants |

### Workflow Management

| Outil | Description |
|-------|-------------|
| `n8n_create_workflow` | Créer un nouveau workflow |
| `n8n_update_partial_workflow` | Mises à jour incrémentales (17 types d'opérations, dont `activateWorkflow`) |
| `n8n_deploy_template` | Déployer un template vers l'instance |
| `n8n_workflow_versions` | Historique des versions et rollback |
| `n8n_test_workflow` | Exécution de test |
| `n8n_executions` | Gérer les exécutions |

### Templates

| Outil | Description |
|-------|-------------|
| `search_templates` | Recherche multi-mode (`keyword`, `by_nodes`, `by_task`, `by_metadata`) |
| `get_template` | Détails d'un template |

### Guides et Meta

| Outil | Description |
|-------|-------------|
| `tools_documentation` | Meta-documentation de tous les outils |
| `ai_agents_guide` | Guide workflows AI Agent |

### Patterns d'usage les plus fréquents

```
search_nodes → get_node                              (18s avg entre les étapes)
n8n_update_partial_workflow → n8n_validate_workflow   (7 841 occurrences, 23s réflexion, 58s correction)
n8n_update_partial_workflow                           (38 287 utilisations, 99.0% succès, 56s entre éditions)
```

### Profils de validation

| Profil | Usage |
|--------|-------|
| `runtime` | Vérification pré-exécution (recommandé) |
| `ai-friendly` | Optimisé pour workflows AI Agent |
| `strict` | Validation complète |

---

## Couverture des nodes

| Métrique | Valeur |
|----------|--------|
| Nodes core | 537 |
| Nodes communauté | 547 |
| **Total** | **1 084** |
| Couverture documentation | 87% |
| Variantes AI-capable | 265 |
| Configurations pré-extraites | 2 646 |
| Templates workflow | 2 709 |

---

## Workflow de Création

```
1. Brief        → identifier le besoin, décomposer en workflows
2. Patterns     → /n8n-workflow-patterns (choisir l'architecture)
3. Nodes        → search_nodes + get_node (MCP)
4. Templates    → search_templates (MCP, pour inspiration)
5. Génération   → n8n_create_workflow (MCP)
6. Itération    → n8n_update_partial_workflow (MCP, éditions incrémentales)
7. Validation   → n8n_validate_workflow + n8n_autofix_workflow (MCP)
8. Test         → n8n_test_workflow (MCP)
9. Monitoring   → n8n_executions (MCP)
```

---

## Gotchas importants

- **Données webhook** : accessibles via `$json.body` dans Code nodes et expressions
- **Retour Code node** : format obligatoire `[{ json: {...} }]`
- **Python** : pas de librairies externes (`requests`, `pandas`) — utiliser JS pour 95% des cas
- **Sub-workflows** : trigger `executeWorkflowTrigger` obligatoire
- **AI Agent** : connexions typées `ai_tool`, `ai_memory`, `ai_languageModel`

---

## Structure du Dossier

```
n8n-consultant/
├── CLAUDE.md                    # Ce fichier — configuration principale
├── .mcp.json                    # MCP server n8n (credentials à remplir)
├── .mcp.json.example            # Config de référence officielle
├── .env.example                 # Template variables d'environnement
├── .claude/
│   └── skills/                  # 7 skills czlonkowski (chargés par Claude Code)
├── .claude-plugin/              # Config plugin Claude (marketplace.json, plugin.json)
├── docs/                        # Documentation officielle czlonkowski
│   ├── CODE_NODE_BEST_PRACTICES.md
│   ├── DEVELOPMENT.md
│   ├── INSTALLATION.md
│   ├── MCP_TESTING_LOG.md
│   └── USAGE.md
└── evaluations/                 # Scénarios de test par skill
    ├── code-javascript/
    ├── code-python/
    ├── expression-syntax/
    ├── mcp-tools/
    ├── node-configuration/
    ├── validation-expert/
    └── workflow-patterns/
```

---

## Ressources

- **n8n-mcp GitHub** : https://github.com/czlonkowski/n8n-mcp
- **n8n-skills GitHub** : https://github.com/czlonkowski/n8n-skills
- **Docs n8n** : https://docs.n8n.io
- **Node Reference** : https://docs.n8n.io/integrations/builtin/
- **Expression Syntax** : https://docs.n8n.io/code/expressions/

---

*Dernière mise à jour : 2026-02-26*
