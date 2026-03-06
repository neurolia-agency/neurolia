# Session R1 — Recherche nodes natifs n8n pour Social Engine

## Contexte

Projet `neurolia-social-engine/`. Les specs A03 (Workflow Map) et A04 (Prompt Specs) ont ete ecrites avec un biais neurolia-immo : HTTP Request bruts pour OpenAI et Supabase au lieu des nodes natifs n8n.

On corrige ca en 4 phases : R1 (recherche) → R2 (rewrite A03) → R3 (rewrite A04) → R4 (build B01).

**Cette session = R1 + R2.**

## Regle absolue

`n8n-consultant/` est la SEULE source de verite pour les patterns n8n.
Ne jamais importer de patterns depuis neurolia-immo, MEMORY.md neurolia-immo, ou de memoire de sessions precedentes.

## R1 — Recherche (faire en premier)

Utilise les outils MCP n8n pour decouvrir les nodes natifs. Pour chaque recherche, note les typeVersions, parametres requis, et types de connexion.

### 1. Rechercher les nodes

```
search_nodes("supabase")
search_nodes("openai")
search_nodes("ai agent")
search_nodes("structured output parser")
search_nodes("webhook")
search_nodes("respond to webhook")
```

### 2. Inspecter chaque node (mode full)

```
get_node("n8n-nodes-base.supabase", mode="full")
get_node("@n8n/n8n-nodes-langchain.lmChatOpenAi", mode="full")
get_node("@n8n/n8n-nodes-langchain.agent", mode="full")
get_node("@n8n/n8n-nodes-langchain.outputParserStructured", mode="full")
get_node("n8n-nodes-base.webhook", mode="full")
get_node("n8n-nodes-base.respondToWebhook", mode="full")
get_node("n8n-nodes-base.code", mode="full")
```

Ajuste les noms de nodes selon les resultats de search_nodes (les noms ci-dessus sont des estimations).

### 3. Chercher des templates pour inspiration

```
search_templates("ai agent structured json output")
search_templates("supabase webhook workflow")
search_templates("openai json calendar generation")
```

### 4. Sauvegarder les resultats

Cree un fichier `_preflight/R1-node-research.md` avec :
- Nom exact de chaque node (type + typeVersion)
- Parametres requis et optionnels
- Types de connexion (main, ai_languageModel, ai_outputParser, ai_tool)
- Patterns de configuration recommandes
- Templates pertinents trouves

## R2 — Reecriture A03 (Workflow Map)

En s'appuyant sur les resultats R1, reecris `pipeline/output/02-workflow-map.md` :

### Changements a appliquer sur les 5 workflows

1. **Remplacer tous les "HTTP Request → Supabase"** par le node Supabase natif (ou Postgres natif si Supabase node ne couvre pas l'operation)
2. **Remplacer tous les "HTTP Request → OpenAI API"** par AI Agent node + OpenAI Chat Model (connexion ai_languageModel)
3. **Ajouter Structured Output Parser** (connexion ai_outputParser) pour les outputs JSON des 3 agents
4. **Conserver** : Webhook node, Code nodes, Switch/IF nodes, Split In Batches, Error Trigger — ces nodes sont corrects
5. **Conserver** : HTTP Request pour les APIs tierces (Google Drive, Meta Graph API, Gemini fallback) — pas de node natif pour celles-ci
6. **Mettre a jour** les sections "APIs externes" et "Tables DB" en consequence
7. **Mettre a jour** la section "Notes Techniques" avec les bonnes typeVersions

### Structure attendue

Meme structure que le document actuel (vue d'ensemble, flux par workflow, tables, APIs, recaps) mais avec les bons nodes.

### Fichiers a lire avant d'ecrire

- `pipeline/output/02-workflow-map.md` (version actuelle a remplacer)
- `pipeline/output/01-data-model.md` (schema DB reference)
- `pipeline/input/brief.md` (decisions fonctionnelles)
- `_preflight/R1-node-research.md` (resultats de la recherche R1)
- `n8n-consultant/CLAUDE.md` (regles n8n-consultant)

## Validation

Avant de terminer la session :
1. Verifier que AUCUN "HTTP Request → Supabase" ne reste dans A03 (sauf si le node Supabase natif ne couvre pas l'operation)
2. Verifier que AUCUN "HTTP Request → OpenAI" ne reste dans A03
3. Verifier que tous les typeVersions viennent de get_node (pas de memoire)
4. Mettre a jour le CLAUDE.md du projet : R1 → Done, R2 → Done, A03 → Done
