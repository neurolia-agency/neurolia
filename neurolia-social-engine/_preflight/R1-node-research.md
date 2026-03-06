# R1 — Recherche Nodes Natifs n8n

Resultats de la recherche MCP du 2026-03-05. Source de verite pour les typeVersions et configurations des nodes utilises dans Social Engine.

---

## Nodes Principaux

### Supabase (`n8n-nodes-base.supabase` v1)

- **workflowNodeType** : `n8n-nodes-base.supabase`
- **Credential** : `supabaseApi` (required)
- **Operations** : `create`, `delete`, `get`, `getAll`, `update`
- **Filtres** : manual (conditions UI) ou string (syntaxe PostgREST)
- **Data** : auto-map input ou define field by field
- **getAll** : `returnAll` (bool) + `limit` (default 50)
- **Tool variant** : `n8n-nodes-base.supabaseTool` (pour connexion `ai_tool` aux AI Agents)

#### Limitations

- **Pas de `select`** : impossible de choisir des colonnes specifiques ou faire des joins
- **Pas de `order`** : impossible de trier les resultats
- **Pas de `upsert`** : seulement create/update separes
- **Consequence** : les queries complexes (joins, tri, colonnes specifiques) restent en HTTP Request

#### Quand utiliser Supabase node vs HTTP Request

| Use case | Node |
|----------|------|
| INSERT simple (workflow_logs, editorial_calendars) | Supabase node (create) |
| UPDATE avec condition eq simple (status) | Supabase node (update) |
| GET par ID ou eq simple (clients, brand_platforms) | Supabase node (get/getAll) |
| SELECT avec ORDER BY | HTTP Request |
| SELECT avec colonnes specifiques / JOIN | HTTP Request |
| UPSERT (publication_metrics) | HTTP Request |
| Supabase Storage API | HTTP Request |

---

### OpenAI Chat Model (`@n8n/n8n-nodes-langchain.lmChatOpenAi` v1.3)

- **workflowNodeType** : `@n8n/n8n-nodes-langchain.lmChatOpenAi`
- **Credential** : `openAiApi` (required)
- **Output type** : `ai_languageModel` (connexion vers AI Agent)
- **Model** : resourceLocator (list ou id), default `gpt-5-mini`
- **Version 1.3** : Responses API + built-in tools (webSearch, fileSearch, codeInterpreter)
- **Options** :
  - `responseFormat` : text, json_object, json_schema (v1.3 avec Responses API)
  - `temperature` : 0-2 (default 0.7)
  - `maxTokens` : default -1 (unlimited)
  - `frequencyPenalty`, `presencePenalty`, `topP`
  - `reasoningEffort` : low/medium/high (pour o1/o3/gpt-5)
  - `timeout` : default 60000ms

#### Usage

Se connecte comme sub-node `ai_languageModel` a un AI Agent. Ne s'utilise PAS seul.

---

### AI Agent (`@n8n/n8n-nodes-langchain.agent` v3.1)

- **workflowNodeType** : `@n8n/n8n-nodes-langchain.agent`
- **Pas de credential propre** (utilise ceux des sub-nodes)
- **Connexions entrantes** :
  - `ai_languageModel` (required) : OpenAI Chat Model ou autre LLM
  - `ai_outputParser` (optional) : Structured Output Parser
  - `ai_tool` (optional) : outils externes (Supabase Tool, etc.)
  - `ai_memory` (optional) : memoire de conversation
- **promptType** :
  - `auto` : cherche `chatInput` depuis Chat Trigger
  - `define` : texte/expression custom (notre cas)
- **hasOutputParser** : boolean — active la connexion `ai_outputParser`
- **needsFallback** : boolean — modele LLM de secours
- **Options** :
  - `systemMessage` : system prompt (string, rows: 6)
  - `maxIterations` : default 10
  - `returnIntermediateSteps` : boolean
  - `enableStreaming` : boolean (default true)
  - `batching` : batchSize + delayBetweenBatches

#### Pattern recommande pour nos agents

```
AI Agent (promptType: define, hasOutputParser: true)
  ├── ai_languageModel ← OpenAI Chat Model (gpt-4o)
  └── ai_outputParser  ← Structured Output Parser (JSON schema)
```

Le system prompt contient les instructions de l'agent (identite, regles, format).
Le user prompt (text) contient les donnees dynamiques assemblees par le Code node precedent.

---

### Structured Output Parser (`@n8n/n8n-nodes-langchain.outputParserStructured` v1.3)

- **workflowNodeType** : `@n8n/n8n-nodes-langchain.outputParserStructured`
- **Output type** : `ai_outputParser` (connexion vers AI Agent)
- **schemaType** :
  - `fromJson` : genere le schema depuis un exemple JSON
  - `manual` : JSON Schema defini manuellement
- **autoFix** : boolean — re-appel LLM si le parsing echoue
- **customizeRetryPrompt** : prompt custom pour le retry

#### IMPORTANT : autoFix requiert un sub-node LLM

Quand `autoFix: true`, le Structured Output Parser expose un slot **Model*** (`ai_languageModel`) qui **DOIT** etre connecte a un node LLM. Sans ce sub-node, le node affiche une erreur de validation (⚠️).

**Recommande** : utiliser un modele leger (`gpt-4o-mini`, temperature: 0) pour le fix — il ne fait que corriger du JSON malformate.

```
Structured Output Parser (autoFix: true)
  └── Model* ← OpenAI Chat Model (gpt-4o-mini, temperature: 0)
```

#### Usage

Se connecte comme sub-node `ai_outputParser` a un AI Agent.
Garantit que la sortie de l'agent est un JSON valide conforme au schema.

---

### OpenAI Node — Standalone (`@n8n/n8n-nodes-langchain.openAi` v2.1)

- **workflowNodeType** : `@n8n/n8n-nodes-langchain.openAi`
- **Credential** : `openAiApi`
- **Resources** : text, image, audio, file, conversation, video
- **Image operations** :
  - `generate` : generer une image depuis un prompt
    - Models : `dall-e-2`, `dall-e-3`, `gpt-image-1`
    - Prompt : max 4000 chars (dall-e-3), 32000 chars (gpt-image-1)
    - Options : quality (high/medium/low pour gpt-image-1), returnImageUrls
  - `edit` : modifier une image existante avec un prompt
    - Models : `dall-e-2`, `gpt-image-1`
    - Input : binary image (binaryPropertyName)
    - Prompt : required, max 32000 chars (gpt-image-1)
    - Options : imageMask (binary), n (nombre d'images), quality
    - **C'est le node pour la sublimation**
- **Text** : deconseille — utiliser AI Agent + OpenAI Chat Model a la place
- **Pas de GPT-4o image** dans les options — utiliser `gpt-image-1` (equivalent)

#### Usage pour sublimation

```
[Code node: Build Sublimation Prompt]
  |
[OpenAI node: resource=image, operation=edit, model=gpt-image-1]
  |
[Upload result to Supabase Storage via HTTP Request]
```

L'image binaire entre via le flux principal, le prompt est une expression.

---

### Webhook (`n8n-nodes-base.webhook` v2.1)

- **workflowNodeType** : `n8n-nodes-base.webhook`
- **httpMethod** : GET, POST, PUT, PATCH, DELETE, HEAD
- **path** : string (supporte `:param` dynamiques)
- **authentication** : none, basicAuth, headerAuth, jwtAuth
- **responseMode** : onReceived, lastNode, responseNode, streaming (v2.1)
- **Options** : binaryData, ignoreBots, ipWhitelist, rawBody, responseHeaders

---

### Respond to Webhook (`n8n-nodes-base.respondToWebhook` v1.5)

- **workflowNodeType** : `n8n-nodes-base.respondToWebhook`
- **respondWith** : firstIncomingItem, allIncomingItems, json, text, binary, noData, redirect, jwt
- **enableResponseOutput** : boolean (v1.4+) — branche output apres reponse
- **Options** : responseCode (default 200), responseHeaders, responseKey, enableStreaming (v1.5)

---

### Code (`n8n-nodes-base.code` v2)

- **workflowNodeType** : `n8n-nodes-base.code`
- **mode** : runOnceForAllItems, runOnceForEachItem
- **language** : javaScript, pythonNative (v2)
- **Pas de credential** — acces reseau via `globalThis.helpers.httpRequest`

---

## Autres Nodes (deja corrects dans A03)

| Node | Type | Version |
|------|------|---------|
| Schedule Trigger | `n8n-nodes-base.scheduleTrigger` | 1.2 |
| IF | `n8n-nodes-base.if` | 2.2 |
| Switch | `n8n-nodes-base.switch` | 3.4 |
| Split In Batches | `n8n-nodes-base.splitInBatches` | 3 |
| Set | `n8n-nodes-base.set` | 3.4 |
| HTTP Request | `n8n-nodes-base.httpRequest` | 4.2 |
| Email Send | `n8n-nodes-base.emailSend` | 2.1 |
| Error Trigger | `n8n-nodes-base.errorTrigger` | 1 |
| Merge | `n8n-nodes-base.merge` | 3.2 |
| Sticky Note | `n8n-nodes-base.stickyNote` | 1 |

---

## Templates Pertinents

| ID | Nom | Pertinence |
|----|-----|------------|
| 3066 | Automate Multi-Platform Social Media Content Creation with AI | Pattern AI Agent + Structured Output Parser + Facebook Graph API |
| 3135 | Automated Social Media Content Publishing Factory | Architecture multi-agents + toolWorkflow + Google Drive |
| 4406 | Generate Daily E-Commerce Order Reports with Supabase, GPT-4.1 and Gmail | Pattern Supabase Tool + AI Agent + Schedule |
| 3675 | MCP Supabase Server for AI Agent with RAG & Multi-Tenant CRUD | Pattern Supabase Tool multi-operations |
| 4316 | Reliable AI Agent Output Without Structured Output Parser | Pattern alternatif avec Switch pour parsing |

### Patterns observes dans les templates

1. **AI Agent + OpenAI Chat Model + Structured Output Parser** : pattern dominant pour generer du JSON structure (calendrier editorial, captions)
2. **Supabase Tool** comme `ai_tool` d'un AI Agent : permet a l'agent de lire/ecrire en DB autonomement — mais pas adapte a notre cas (on veut du deterministe, pas de l'agentic)
3. **OpenAI node (image)** pour generation d'images, combine avec HTTP Request pour les uploads
4. **Facebook Graph API node** (`n8n-nodes-base.facebookGraphApi`) : node dedie pour les appels Meta — a investiguer comme alternative aux HTTP Request dans WF04

---

## Decision Architecture pour Social Engine

### Agent Strategiste (WF01) — Texte → JSON

```
Code node (assemble prompt)
  → AI Agent (promptType: define, hasOutputParser: true)
     ├── ai_languageModel ← OpenAI Chat Model (gpt-4o, temperature: 0.7)
     └── ai_outputParser  ← Structured Output Parser (schema calendrier)
```

### Agent DA — Sublimation (WF02, WF03) — Image → Image

```
Code node (build sublimation prompt)
  → OpenAI node (resource: image, operation: edit, model: gpt-image-1)
```

### Agent Redacteur — Image+Texte → JSON (WF02, WF03)

```
Code node (assemble prompt 4 couches)
  → AI Agent (promptType: define, hasOutputParser: true)
     ├── ai_languageModel ← OpenAI Chat Model (gpt-4o, temperature: 0.8)
     └── ai_outputParser  ← Structured Output Parser (schema caption)
```

### DB Operations — Supabase

- **Simple CRUD** : Supabase node natif
- **Complex queries** : HTTP Request vers PostgREST
- **Storage** : HTTP Request vers Supabase Storage API

---

*Recherche effectuee le 2026-03-05 via MCP n8n-mcp*
