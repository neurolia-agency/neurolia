# A03 — Workflow Map

Carte detaillee des 5 workflows n8n pour Neurolia Social Engine. Chaque workflow est decrit avec son trigger, ses nodes, le flux de donnees, les tables DB et les APIs utilisees.

**Nodes natifs utilises** : Supabase (CRUD simple), AI Agent + OpenAI Chat Model + Structured Output Parser (generation texte), OpenAI node (sublimation images). Les queries complexes (joins, order, select) restent en HTTP Request vers PostgREST.

---

## Vue d'ensemble

```
WF01 Strategie Editoriale (par campagne, declenchement manuel)
  |
  v
WF02 Creation Contenu (polling Google Drive)
  |
  v
WF03 Story Batch (hebdo dimanche)
  |
  v
WF04 Publication (schedule 15 min)
  |
  v
WF05 Metriques + Errors (quotidien + error trigger)
  |
  +---> feedback ---> WF01 (cycle suivant)
```

### Connexions inter-workflows

| Source | Cible | Lien |
|--------|-------|------|
| WF01 | WF02 | `editorial_slots` crees par WF01, consommes par WF02 |
| WF01 | WF03 | `editorial_slots` (type=story) crees par WF01, consommes par WF03 |
| WF02 | WF04 | `content_queue` (status=approved) cree par WF02, publie par WF04 |
| WF03 | WF04 | `content_queue` (status=approved, batch) cree par WF03, publie par WF04 |
| WF04 | WF05 | `publications` creees par WF04, metriques recuperees par WF05 |
| WF05 | WF01 | `publication_metrics` utilisees comme input du prochain calendrier |

### Workflow commun : Error Handler

Tous les workflows utilisent le meme Error Workflow (WF05-Error) pour centraliser les alertes.

---

## WF01 — Strategie Editoriale (campagne)

**Frequence** : A la demande, declenchement manuel par l'equipe Neurolia
**Role** : Generer le calendrier editorial d'une campagne pour un client (duree flexible)

### Trigger

```
Webhook (POST /webhook/editorial-strategy)
  Body: {
    client_id,
    campaign: {
      name: "Lancement Menu Ete",
      start_date: "2026-04-01",
      end_date: "2026-04-21",
      objectives: {
        primary_goal: "lancement_produit",
        description: "Lancer le nouveau menu avec 30% de visibilite en plus",
        kpis: [{ metric: "reach", target: 50000 }],
        posts_per_week: 5,
        stories_per_day: 7,
        key_dates: [{ date: "2026-04-15", label: "Jour de lancement" }],
        themes_imposed: ["menu ete", "terrasse"],
        intensity_curve: "peak_middle",
        budget_tone: "premium"
      },
      brief: "Texte libre du client..."
    }
  }
  responseMode: responseNode
```

### Flux de nodes

```
01 Webhook (n8n-nodes-base.webhook@2.1)
  |  POST, path: editorial-strategy, responseMode: responseNode
  |
02 Charger Donnees Client (n8n-nodes-base.supabase@1)
  |  operation: get, table: clients
  |  filter: id eq {{ $json.body.client_id }}
  |
03 Charger Plateforme Marque (n8n-nodes-base.supabase@1)
  |  operation: getAll, table: brand_platforms
  |  filter: client_id eq {{ $json.id }}
  |
04 Charger Metriques Precedentes (n8n-nodes-base.code@2)
  |  httpRequest: GET {SUPABASE_URL}/rest/v1/publication_metrics
  |  ?select=*,publications!inner(client_id,published_at)
  |  &publications.client_id=eq.{client_id}
  |  Periode: 30 derniers jours avant start_date de la campagne
  |  (JOIN necessaire → httpRequest dans Code node)
  |
05 Charger Captions Recentes (n8n-nodes-base.code@2)
  |  httpRequest: GET {SUPABASE_URL}/rest/v1/content_queue
  |  ?client_id=eq.{}&status=eq.published&order=created_at.desc&limit=20
  |  &select=caption,hashtags,caption_style
  |  (ORDER BY + SELECT → httpRequest dans Code node)
  |
06 Construire Prompt Strategie (n8n-nodes-base.code@2)
  |  Assemble: brand platform + objectifs campagne + metriques + captions recentes
  |  Calcule: duree campagne, volume posts/stories, phases, key dates
  |  Adapte intensity_curve → distribution du volume par phase
  |  Output: { systemPrompt, userPrompt, postsCount, storiesCount, totalSlots, campaignDays }
  |
07 Agent Strategiste (AI Agent + OpenAI Chat Model + Structured Output Parser)
  |
  |  AI Agent (@n8n/n8n-nodes-langchain.agent@3.1)
  |    promptType: define
  |    text: ={{ $json.userPrompt }}
  |    hasOutputParser: true
  |    options.systemMessage: ={{ $json.systemPrompt }}
  |    +-- ai_languageModel <- OpenAI Chat Model (@n8n/n8n-nodes-langchain.lmChatOpenAi@1.3)
  |    |     model: gpt-4o, temperature: 0.8
  |    +-- ai_outputParser  <- Structured Output Parser (@n8n/n8n-nodes-langchain.outputParserStructured@1.3)
  |          schemaType: fromJson
  |          schema: { campaign_phases: [...], posts: [...], stories: [...] }
  |
  |  Output: JSON calendar structure avec phases de campagne
  |
08 Valider Calendrier (n8n-nodes-base.code@2)
  |  Valide le JSON, verifie les contraintes:
  |  - dates dans [start_date, end_date]
  |  - variete des categories (rotation)
  |  - equilibre des angles
  |  - rotation des caption_styles
  |  - couverture des jours
  |  - key_dates couvertes (posts obligatoires ces jours-la)
  |  - intensity_curve respectee (volume par phase)
  |
09 Creer Calendrier Editorial (n8n-nodes-base.supabase@1)
  |  operation: create, table: editorial_calendars
  |  fields: client_id, campaign_name, start_date, end_date,
  |  campaign_objectives, campaign_brief, status: 'draft',
  |  strategy_summary, ai_generation_data
  |
10 Preparer Slots (n8n-nodes-base.code@2)
  |  Code node prepare les items (volume variable selon duree campagne)
  |
11 Boucle Slots (n8n-nodes-base.splitInBatches@3)
  |  batchSize: 10
  |
12 Creer Slot (n8n-nodes-base.supabase@1)
  |  operation: create, table: editorial_slots
  |  Pour chaque slot: calendar_id, client_id, scheduled_date, scheduled_time,
  |  content_type, category, theme, angle, tone, caption_style, objective,
  |  visual_direction, sublimation_mode, story_text (si story)
  |
13 Preparer Reponse (n8n-nodes-base.code@2)  [sortie done du Split In Batches]
  |
14 Journal Execution (n8n-nodes-base.supabase@1)
  |  operation: create, table: workflow_logs
  |  fields: client_id, workflow_name: 'wf01-editorial-strategy', status: 'success'
  |
15 Repondre Webhook (n8n-nodes-base.respondToWebhook@1.5)
     respondWith: json
     { status: 'success', calendar_id, campaign_name, slots_count, campaign_days }
```

### Tables DB

| Table | Operation | Node | Champs |
|-------|-----------|------|--------|
| `clients` | READ | Supabase | id, name, slug, industry |
| `brand_platforms` | READ | Supabase | * (identite, voix, visuel, social, objectifs) |
| `publication_metrics` | READ | Code (httpRequest) | impressions, reach, likes, comments, engagement_rate (JOIN publications) |
| `content_queue` | READ | Code (httpRequest) | caption, hashtags, caption_style (ORDER BY + SELECT) |
| `editorial_calendars` | INSERT | Supabase | client_id, campaign_name, start_date, end_date, campaign_objectives, campaign_brief, status, strategy_summary, ai_generation_data |
| `editorial_slots` | INSERT | Supabase | volume variable selon duree campagne |
| `workflow_logs` | INSERT | Supabase | execution log |

### APIs externes

| API | Node | Usage |
|-----|------|-------|
| OpenAI (gpt-4o) | AI Agent + OpenAI Chat Model | Agent Strategiste — generation calendrier campagne |

---

## WF02 — Creation Contenu

**Frequence** : Polling Google Drive toutes les 10 minutes
**Role** : Detecter les nouvelles photos, les sublimer et generer les captions

### Trigger

```
Schedule Trigger (interval: 10 minutes)
```

### Flux de nodes

```
01 Schedule Trigger (n8n-nodes-base.scheduleTrigger@1.2, 10 min)
  |
02 Fetch Active Clients (n8n-nodes-base.supabase@1)
  |  operation: getAll, table: clients
  |  filter: is_active eq true
  |  (Note: drive_folder_id not.is.null non supporté par le node → filtrer dans Code node suivant)
  |
03 Filter Clients with Drive (n8n-nodes-base.code@2)
  |  Filtre: clients avec drive_folder_id non null
  |
04 Split In Batches (n8n-nodes-base.splitInBatches@3, par client)
  |
05 Google Drive — List New Files (n8n-nodes-base.httpRequest@4.2)
  |  GET https://www.googleapis.com/drive/v3/files
  |  ?q='{folder_id}' in parents AND trashed=false
  |  &fields=files(id,name,mimeType,createdTime)
  |
06 Check Already Processed (n8n-nodes-base.httpRequest@4.2)
  |  GET {SUPABASE_URL}/rest/v1/uploads?client_id=eq.{}&select=drive_file_id
  |  Compare avec les fichiers Drive pour exclure les deja traites
  |
07 IF — New Files Found (n8n-nodes-base.if@2.2)
  |  True ↓                               False → Loop next client
  |
08 Download File (n8n-nodes-base.httpRequest@4.2)
  |  GET https://www.googleapis.com/drive/v3/files/{fileId}?alt=media
  |
09 Upload to Supabase Storage (n8n-nodes-base.httpRequest@4.2)
  |  POST {SUPABASE_URL}/storage/v1/object/social-engine/{client_slug}/originals/{filename}
  |
10 Insert Upload Record (n8n-nodes-base.supabase@1)
  |  operation: create, table: uploads
  |  fields: client_id, original_url, original_path, filename, mime_type,
  |  source: 'drive', drive_file_id, status: 'new'
  |
11 Match to Editorial Slot (n8n-nodes-base.code@2)
  |  Cherche le prochain slot disponible via httpRequest interne:
  |  GET editorial_slots?client_id=eq.{}&content_type=eq.post
  |  &scheduled_date=gte.{today}&order=scheduled_date.asc,scheduled_time.asc
  |  Compare avec content_queue existants pour exclure slots pris
  |  Si match → retourne slot_id
  |
12 IF — Slot Assigned (n8n-nodes-base.if@2.2)
  |  True ↓                               False → Queue upload (status: 'new')
  |
13 Update Upload (n8n-nodes-base.supabase@1)
  |  operation: update, table: uploads, filter: id eq {upload_id}
  |  fields: slot_id, status: 'assigned'
  |
14 Fetch Slot Direction (n8n-nodes-base.supabase@1)
  |  operation: get, table: editorial_slots, filter: id eq {slot_id}
  |
15 Fetch Brand Platform (n8n-nodes-base.supabase@1)
  |  operation: getAll, table: brand_platforms, filter: client_id eq {}
  |
16 Fetch Context Images (n8n-nodes-base.httpRequest@4.2)
  |  GET {SUPABASE_URL}/rest/v1/brand_assets
  |  ?client_id=eq.{}&type=in.(background,photo_style)&select=file_url
  |  (IN filter + SELECT specifique → HTTP Request)
  |
17 Build Sublimation Prompt (n8n-nodes-base.code@2)
  |  Input: photo URL + slot.visual_direction + brand.visual_style + brand.photo_style
  |  + context images URLs + slot.sublimation_mode (creative pour posts)
  |  Output: prompt de sublimation
  |
18 Agent DA — Sublimation (@n8n/n8n-nodes-langchain.openAi@2.1)
  |  resource: image, operation: edit, model: gpt-image-1
  |  Input: binary image (depuis node 08/09) + prompt de sublimation
  |  quality: high
  |  Output: image sublimee (binary)
  |
19 Upload Sublimated Image (n8n-nodes-base.httpRequest@4.2)
  |  POST {SUPABASE_URL}/storage/v1/object/social-engine/{client_slug}/sublimated/{filename}
  |
20 Fetch Anti-Repetition Captions (n8n-nodes-base.httpRequest@4.2)
  |  GET {SUPABASE_URL}/rest/v1/content_queue
  |  ?client_id=eq.{}&status=eq.published&order=created_at.desc&limit=15
  |  &select=caption,hashtags
  |  (ORDER BY + LIMIT + SELECT → HTTP Request)
  |
21 Build Caption Prompt (n8n-nodes-base.code@2)
  |  4 couches:
  |  - Couche 1: brand_platform (ton, valeurs, vocabulaire)
  |  - Couche 2: editorial_slot (theme, angle, ton, style, CTA)
  |  - Couche 3: image sublimee (reference pour description)
  |  - Couche 4: 15 dernieres captions (anti-repetition)
  |  Output: { systemPrompt, userPrompt }
  |
22 Agent Redacteur — Caption (AI Agent + OpenAI Chat Model + Structured Output Parser)
  |
  |  AI Agent (@n8n/n8n-nodes-langchain.agent@3.1)
  |    promptType: define
  |    text: ={{ $json.userPrompt }}
  |    hasOutputParser: true
  |    options.systemMessage: ={{ $json.systemPrompt }}
  |    options.passthroughBinaryImages: true  (image sublimee en vision)
  |    ├── ai_languageModel ← OpenAI Chat Model (@n8n/n8n-nodes-langchain.lmChatOpenAi@1.3)
  |    |     model: gpt-4o, temperature: 0.8
  |    └── ai_outputParser  ← Structured Output Parser (@n8n/n8n-nodes-langchain.outputParserStructured@1.3)
  |          schemaType: fromJson
  |          schema: { caption: "...", hashtags: [...], cta: "..." }
  |
  |  Output: { caption, hashtags[], cta }
  |
23 Insert Content Queue (n8n-nodes-base.supabase@1)
  |  operation: create, table: content_queue
  |  fields: client_id, slot_id, upload_id, content_type: 'post',
  |  sublimated_url, sublimated_path, sublimation_prompt, sublimation_model: 'gpt-image-1',
  |  caption, hashtags, cta, caption_prompt, caption_model: 'gpt-4o',
  |  status: 'pending_review', scheduled_at
  |
24 Update Upload Status (n8n-nodes-base.supabase@1)
  |  operation: update, table: uploads, filter: id eq {upload_id}
  |  fields: status: 'processed'
  |
25 Move Drive File to /Traites/ (n8n-nodes-base.httpRequest@4.2)
  |  PATCH https://www.googleapis.com/drive/v3/files/{fileId}
  |  { addParents: '{traites_folder_id}', removeParents: '{source_folder_id}' }
  |
26 Log Execution (n8n-nodes-base.supabase@1)
  |  operation: create, table: workflow_logs
  |
27 Loop → next file / next client
```

### Branche erreur (entre node 18-22)

```
IF — Sublimation Failed (n8n-nodes-base.if@2.2)
  |
  Fallback Gemini (n8n-nodes-base.httpRequest@4.2)
  |  POST https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001
  |
  IF — Still Failed → Update upload status='failed' + Log error
```

### Tables DB

| Table | Operation | Node | Champs |
|-------|-----------|------|--------|
| `clients` | READ | Supabase | id, slug, drive_folder_id, is_active |
| `brand_platforms` | READ | Supabase | * |
| `brand_assets` | READ | HTTP Request | file_url (IN filter + SELECT) |
| `editorial_slots` | READ | Code (httpRequest) | visual_direction, sublimation_mode, theme, angle (ORDER BY) |
| `uploads` | INSERT | Supabase | original_url, status, drive_file_id |
| `uploads` | UPDATE | Supabase | slot_id, status |
| `content_queue` | READ | HTTP Request | captions recentes (ORDER BY + LIMIT) |
| `content_queue` | INSERT | Supabase | nouveau contenu |
| `workflow_logs` | INSERT | Supabase | execution log |

### APIs externes

| API | Node | Usage |
|-----|------|-------|
| Google Drive | HTTP Request | Lister, telecharger, deplacer fichiers |
| Supabase Storage | HTTP Request | Upload original + sublime |
| OpenAI (gpt-image-1) | OpenAI node (image/edit) | Agent DA — sublimation |
| OpenAI (gpt-4o) | AI Agent + OpenAI Chat Model | Agent Redacteur — caption |
| Gemini (fallback) | HTTP Request | Sublimation fallback |

---

## WF03 — Story Batch

**Frequence** : Hebdomadaire, dimanche soir
**Role** : Generer un lot de ~42 stories pour la semaine suivante a partir des photos disponibles

### Trigger

```
Schedule Trigger (cron: 0 20 * * 0)  — dimanche 20h00
```

### Flux de nodes

```
01 Schedule Trigger (n8n-nodes-base.scheduleTrigger@1.2, dimanche 20h)
  |
02 Fetch Active Clients (n8n-nodes-base.supabase@1)
  |  operation: getAll, table: clients, filter: is_active eq true
  |
03 Split In Batches (n8n-nodes-base.splitInBatches@3, par client)
  |
04 Calculate Week Range (n8n-nodes-base.code@2)
  |  next_monday = lundi suivant
  |  next_sunday = dimanche suivant
  |  batch_id = UUID genere
  |  batch_week = next_monday (DATE)
  |
05 Fetch Story Slots for Week (n8n-nodes-base.httpRequest@4.2)
  |  GET {SUPABASE_URL}/rest/v1/editorial_slots
  |  ?client_id=eq.{}&content_type=eq.story
  |  &scheduled_date=gte.{next_monday}&scheduled_date=lte.{next_sunday}
  |  &order=scheduled_date.asc,scheduled_time.asc
  |  (ORDER BY → HTTP Request)
  |
06 IF — Slots Found (n8n-nodes-base.if@2.2)
  |  True ↓                               False → Loop next client
  |
07 Fetch Available Photos (n8n-nodes-base.httpRequest@4.2)
  |  GET {SUPABASE_URL}/rest/v1/uploads
  |  ?client_id=eq.{}&status=in.(new,assigned)
  |  (IN filter → HTTP Request)
  |  + photos deja sublimees pour posts de la semaine (reutilisation)
  |
08 Assign Photos to Slots (n8n-nodes-base.code@2)
  |  Logique d'association:
  |  - Priorite 1: uploads.slot_id deja assigne
  |  - Priorite 2: reutilisation des photos de posts (source_slot_id)
  |  - Priorite 3: round-robin des photos disponibles
  |  Output: array [{slot, photo_url, context}]
  |
09 Fetch Brand Platform (n8n-nodes-base.supabase@1)
  |  operation: getAll, table: brand_platforms, filter: client_id eq {}
  |
10 Split In Batches (n8n-nodes-base.splitInBatches@3, par story slot)
  |
11 Build Story Sublimation Prompt (n8n-nodes-base.code@2)
  |  Input: photo + slot.visual_direction + slot.story_text
  |  Mode: sublimation_mode='light' (retouche legere)
  |  Texte a incruster dans l'image (pas de texte natif via Meta API)
  |
12 Agent DA — Story Sublimation (@n8n/n8n-nodes-langchain.openAi@2.1)
  |  resource: image, operation: edit, model: gpt-image-1
  |  Input: binary image + prompt (light + texte incruste)
  |  quality: medium
  |
13 Upload Story Image (n8n-nodes-base.httpRequest@4.2)
  |  POST {SUPABASE_URL}/storage/v1/object/social-engine/{client_slug}/sublimated/{filename}
  |
14 Build Caption Prompt (n8n-nodes-base.code@2)
  |  Prompt simplifie pour stories (caption courte, pas de hashtags longs)
  |  Output: { systemPrompt, userPrompt }
  |
15 Agent Redacteur — Story Caption (AI Agent + OpenAI Chat Model + Structured Output Parser)
  |
  |  AI Agent (@n8n/n8n-nodes-langchain.agent@3.1)
  |    promptType: define
  |    text: ={{ $json.userPrompt }}
  |    hasOutputParser: true
  |    options.systemMessage: ={{ $json.systemPrompt }}
  |    ├── ai_languageModel ← OpenAI Chat Model (@n8n/n8n-nodes-langchain.lmChatOpenAi@1.3)
  |    |     model: gpt-4o, temperature: 0.8
  |    └── ai_outputParser  ← Structured Output Parser (@n8n/n8n-nodes-langchain.outputParserStructured@1.3)
  |          schemaType: fromJson
  |          schema: { caption: "...", cta: "..." }
  |
  |  Output: { caption, cta }
  |
16 Insert Content Queue (n8n-nodes-base.supabase@1)
  |  operation: create, table: content_queue
  |  fields: client_id, slot_id, content_type: 'story',
  |  sublimated_url, caption, status: 'pending_review',
  |  batch_id, batch_week, scheduled_at
  |
17 Loop → next slot
  |
18 Update Uploads Status (n8n-nodes-base.supabase@1)
  |  operation: update, table: uploads
  |  filter: id eq {upload_ids}
  |  fields: status: 'processed'
  |
19 Log Execution (n8n-nodes-base.supabase@1)
  |  operation: create, table: workflow_logs
  |  fields: workflow_name: 'wf03-story-batch', metadata: { batch_id, stories_count }
  |
20 Loop → next client
```

### Tables DB

| Table | Operation | Node | Champs |
|-------|-----------|------|--------|
| `clients` | READ | Supabase | id, slug, is_active |
| `brand_platforms` | READ | Supabase | * |
| `editorial_slots` | READ | HTTP Request | story slots de la semaine (ORDER BY) |
| `uploads` | READ | HTTP Request | photos disponibles (IN filter) |
| `uploads` | UPDATE | Supabase | status |
| `content_queue` | INSERT | Supabase | ~42 stories par client/semaine |
| `workflow_logs` | INSERT | Supabase | execution log |

### APIs externes

| API | Node | Usage |
|-----|------|-------|
| OpenAI (gpt-image-1) | OpenAI node (image/edit) | Agent DA — sublimation legere + texte |
| OpenAI (gpt-4o) | AI Agent + OpenAI Chat Model | Agent Redacteur — caption story |
| Supabase Storage | HTTP Request | Upload images stories |

---

## WF04 — Publication

**Frequence** : Toutes les 15 minutes
**Role** : Publier les contenus approuves sur Instagram et Facebook via Meta Graph API

### Trigger

```
Schedule Trigger (interval: 15 minutes)
```

### Flux de nodes

```
01 Schedule Trigger (n8n-nodes-base.scheduleTrigger@1.2, 15 min)
  |
02 Fetch Approved Content (n8n-nodes-base.httpRequest@4.2)
  |  GET {SUPABASE_URL}/rest/v1/content_queue
  |  ?status=eq.approved&scheduled_at=lte.{now}&order=scheduled_at.asc&limit=10
  |  (ORDER BY + LIMIT → HTTP Request)
  |
03 IF — Content Found (n8n-nodes-base.if@2.2)
  |  True ↓                               False → End
  |
04 Split In Batches (n8n-nodes-base.splitInBatches@3, par contenu)
  |
05 Fetch Client Meta Credentials (n8n-nodes-base.httpRequest@4.2)
  |  GET {SUPABASE_URL}/rest/v1/clients?id=eq.{client_id}
  |  &select=meta_page_id,meta_ig_user_id,meta_access_token
  |  (SELECT specifique → HTTP Request)
  |
06 Update Status Publishing (n8n-nodes-base.supabase@1)
  |  operation: update, table: content_queue
  |  filter: id eq {content_id}
  |  fields: status: 'publishing'
  |
07 Switch — Content Type (n8n-nodes-base.switch@3.4)
  |
  ├── post ──────────────────────────────────────┐
  |                                               |
  | 08a Upload Image to Meta (n8n-nodes-base.httpRequest@4.2)
  |   POST https://graph.facebook.com/v21.0/
  |   {ig_user_id}/media
  |   { image_url, caption, access_token }
  |                                               |
  | 09a Publish Container (n8n-nodes-base.httpRequest@4.2)
  |   POST https://graph.facebook.com/v21.0/
  |   {ig_user_id}/media_publish
  |   { creation_id }
  |                                               |
  | 10a Facebook Post (n8n-nodes-base.httpRequest@4.2)
  |   POST https://graph.facebook.com/v21.0/
  |   {page_id}/photos
  |   { url, message, access_token }
  |                                               |
  ├── story ─────────────────────────────────────┐
  |                                               |
  | 08b Upload Story to Meta (n8n-nodes-base.httpRequest@4.2)
  |   POST https://graph.facebook.com/v21.0/
  |   {ig_user_id}/media
  |   { image_url, media_type: 'STORIES' }
  |                                               |
  | 09b Publish Story (n8n-nodes-base.httpRequest@4.2)
  |   POST https://graph.facebook.com/v21.0/
  |   {ig_user_id}/media_publish
  |   { creation_id }
  |                                               |
  | 10b Facebook Story (n8n-nodes-base.httpRequest@4.2)
  |   POST https://graph.facebook.com/v21.0/
  |   {page_id}/photo_stories
  |   { photo_id, access_token }
  |                                               |
  └──────────────────── Merge (n8n-nodes-base.merge@3.2) ─┘
  |
11 Insert Publication Records (n8n-nodes-base.supabase@1)
  |  operation: create, table: publications
  |  (1 insert par plateforme — 2 executions via Split In Batches)
  |  fields: content_id, client_id, platform, content_type,
  |  external_id, external_url, published_at
  |
12 Update Content Status (n8n-nodes-base.supabase@1)
  |  operation: update, table: content_queue
  |  filter: id eq {content_id}
  |  fields: status: 'published'
  |
13 Log Execution (n8n-nodes-base.supabase@1)
  |  operation: create, table: workflow_logs
  |
14 Loop → next content
```

### Branche erreur (entre node 08-10)

```
IF — Publish Failed (n8n-nodes-base.if@2.2)
  |
  Update content_queue.status='publish_failed' (Supabase node)
  |
  Insert publication { error_message, retry_count++ } (Supabase node)
  |
  IF retry_count < 3 → requeue (status='approved')
  ELSE → Log critical + alerte
```

### Tables DB

| Table | Operation | Node | Champs |
|-------|-----------|------|--------|
| `clients` | READ | HTTP Request | meta_page_id, meta_ig_user_id, meta_access_token (SELECT) |
| `content_queue` | READ | HTTP Request | status=approved, ORDER BY scheduled_at |
| `content_queue` | UPDATE | Supabase | status (publishing → published/publish_failed) |
| `publications` | INSERT | Supabase | external_id, external_url, published_at, error_message |
| `workflow_logs` | INSERT | Supabase | execution log |

### APIs externes

| API | Node | Usage |
|-----|------|-------|
| Meta Graph API | HTTP Request | Creer container media IG |
| Meta Graph API | HTTP Request | Publier le container IG |
| Meta Graph API | HTTP Request | Publier post/story Facebook |

---

## WF05 — Metriques + Errors

Deux sous-workflows dans un meme ensemble logique.

### WF05a — Collecte Metriques

**Frequence** : Quotidien, 06h00
**Role** : Recuperer les metriques de performance de toutes les publications

#### Trigger

```
Schedule Trigger (cron: 0 6 * * *)  — tous les jours 06h00
```

#### Flux de nodes

```
01 Schedule Trigger (n8n-nodes-base.scheduleTrigger@1.2, 06h00)
  |
02 Fetch Recent Publications (n8n-nodes-base.httpRequest@4.2)
  |  GET {SUPABASE_URL}/rest/v1/publications
  |  ?published_at=gte.{30_days_ago}
  |  &select=*,clients!inner(meta_ig_user_id,meta_page_id,meta_access_token)
  |  (JOIN + SELECT → HTTP Request)
  |
03 IF — Publications Found (n8n-nodes-base.if@2.2)
  |  True ↓                               False → End
  |
04 Split In Batches (n8n-nodes-base.splitInBatches@3, par publication)
  |
05 Switch — Platform (n8n-nodes-base.switch@3.4)
  |
  ├── instagram ─────────────────────────────────┐
  |                                               |
  | 06a Fetch IG Insights (n8n-nodes-base.httpRequest@4.2)
  |   GET https://graph.facebook.com/v21.0/
  |   {external_id}/insights
  |   ?metric=impressions,reach,likes,comments,shares,saved
  |   &access_token={token}
  |                                               |
  | 07a Fetch IG Story Insights (n8n-nodes-base.httpRequest@4.2)
  |   (si content_type=story)
  |   ?metric=impressions,reach,replies,exits,taps_forward,taps_back
  |                                               |
  ├── facebook ──────────────────────────────────┐
  |                                               |
  | 06b Fetch FB Insights (n8n-nodes-base.httpRequest@4.2)
  |   GET https://graph.facebook.com/v21.0/
  |   {external_id}/insights
  |   ?metric=post_impressions,post_engaged_users
  |                                               |
  └──────────────────── Merge (n8n-nodes-base.merge@3.2) ─┘
  |
08 Calculate Engagement Rate (n8n-nodes-base.code@2)
  |  engagement_rate = (likes + comments + shares + saves) / reach
  |
09 Upsert Publication Metrics (n8n-nodes-base.httpRequest@4.2)
  |  POST {SUPABASE_URL}/rest/v1/publication_metrics
  |  Prefer: resolution=merge-duplicates
  |  { publication_id, impressions, reach, likes, comments, shares, saves,
  |    replies, exits, taps_forward, taps_back, engagement_rate, fetched_at }
  |  (UPSERT → HTTP Request)
  |
10 Log Execution (n8n-nodes-base.supabase@1)
  |  operation: create, table: workflow_logs
  |
11 Loop → next publication
```

### WF05b — Error Handler

**Frequence** : Event-driven (Error Trigger)
**Role** : Centraliser les alertes d'erreur de tous les workflows

#### Trigger

```
Error Trigger (configure comme Error Workflow pour WF01-WF04 + WF05a)
```

#### Flux de nodes

```
01 Error Trigger (n8n-nodes-base.errorTrigger@1)
  |
02 Extract Error Details (n8n-nodes-base.code@2)
  |  workflow_name, execution_id, node_name, error_message, timestamp
  |
03 Insert Error Log (n8n-nodes-base.supabase@1)
  |  operation: create, table: workflow_logs
  |  fields: workflow_name, execution_id, status: 'error', message, metadata
  |
04 Determine Severity (n8n-nodes-base.code@2)
  |  critical: publication failed (WF04), strategy generation failed (WF01)
  |  warning: sublimation failed with fallback (WF02), single story failed (WF03)
  |  info: metrics fetch failed (WF05a)
  |
05 Switch — Severity (n8n-nodes-base.switch@3.4)
  |
  ├── critical ──→ Email Send (n8n-nodes-base.emailSend@2.1, equipe Neurolia)
  |
  ├── warning ───→ Email Send (n8n-nodes-base.emailSend@2.1, resume quotidien)
  |
  └── info ──────→ Log only (pas de notification)
```

### Tables DB (WF05a + WF05b)

| Table | Operation | Node | Champs |
|-------|-----------|------|--------|
| `publications` | READ | HTTP Request | external_id, platform, published_at (JOIN clients) |
| `clients` | READ (join) | HTTP Request | meta_ig_user_id, meta_access_token |
| `publication_metrics` | UPSERT | HTTP Request | impressions, reach, likes, comments, engagement_rate |
| `workflow_logs` | INSERT | Supabase | errors + execution logs |

### APIs externes

| API | Node | Usage |
|-----|------|-------|
| Meta Graph API | HTTP Request | Metriques IG posts/stories |
| Meta Graph API | HTTP Request | Metriques FB |
| SMTP | Email Send | Alertes erreur |

---

## Webhooks Dashboard (entrants)

Le dashboard Neurolia envoie des webhooks vers n8n pour les actions de validation.

### Webhook: Approve/Reject Content

```
Webhook (n8n-nodes-base.webhook@2.1)
  POST /webhook/content-review
  Body: { content_id, action: 'approve'|'reject', reviewer_feedback?, reviewed_by }
  responseMode: responseNode
  |
  Supabase node (n8n-nodes-base.supabase@1)
  operation: update, table: content_queue, filter: id eq {content_id}
  fields: status (approved/rejected), reviewer_feedback, reviewed_by, reviewed_at
  |
  IF action=='approve' → set scheduled_at from editorial_slot
  |
  Respond to Webhook (n8n-nodes-base.respondToWebhook@1.5)
  respondWith: json, body: { status: 'success' }
```

### Webhook: Approve/Reject Calendar

```
Webhook (n8n-nodes-base.webhook@2.1)
  POST /webhook/calendar-review
  Body: { calendar_id, action: 'approve'|'reject', reviewer_notes?, approved_by }
  responseMode: responseNode
  |
  Supabase node (n8n-nodes-base.supabase@1)
  operation: update, table: editorial_calendars, filter: id eq {calendar_id}
  fields: status (approved/rejected), reviewer_notes, approved_at, approved_by
  |
  Respond to Webhook (n8n-nodes-base.respondToWebhook@1.5)
  respondWith: json, body: { status: 'success' }
```

### Webhook: Batch Approve Stories

```
Webhook (n8n-nodes-base.webhook@2.1)
  POST /webhook/story-batch-review
  Body: { batch_id, action: 'approve_all'|'reject_all', reviewer_feedback?, reviewed_by }
  responseMode: responseNode
  |
  Code node (n8n-nodes-base.code@2)
  Fetch content_queue items par batch_id via httpRequest
  Update chaque item via Supabase node dans un loop
  |
  Respond to Webhook (n8n-nodes-base.respondToWebhook@1.5)
  respondWith: json, body: { status: 'success', updated_count }
```

---

## Recapitulatif des Schedules

| Workflow | Trigger | Node | Frequence |
|----------|---------|------|-----------|
| WF01 | Webhook (manuel) | webhook@2.1 | ~1-3x/mois par client (par campagne) |
| WF02 | Schedule Trigger | scheduleTrigger@1.2 | Toutes les 10 min |
| WF03 | Schedule Trigger | scheduleTrigger@1.2 | Dimanche 20h00 |
| WF04 | Schedule Trigger | scheduleTrigger@1.2 | Toutes les 15 min |
| WF05a | Schedule Trigger | scheduleTrigger@1.2 | Quotidien 06h00 |
| WF05b | Error Trigger | errorTrigger@1 | Event-driven |
| Dashboard webhooks | Webhook | webhook@2.1 | Event-driven |

## Recapitulatif des APIs et Nodes

| API | Node n8n | Workflows | Credentials |
|-----|----------|-----------|-------------|
| OpenAI (gpt-4o texte) | AI Agent + OpenAI Chat Model + Structured Output Parser | WF01, WF02, WF03 | openAiApi |
| OpenAI (gpt-image-1) | OpenAI node (image/edit) | WF02, WF03 | openAiApi |
| Google Drive | HTTP Request | WF02 | OAuth2 par client (header) |
| Meta Graph API | HTTP Request | WF04, WF05a | Long-lived token par client (dans `clients.meta_access_token`) |
| Gemini (fallback) | HTTP Request | WF02 | API key (header) |
| Supabase (PostgREST) | Supabase node (simple) + HTTP Request (complex) | Tous | supabaseApi |
| Supabase Storage | HTTP Request | WF02, WF03 | supabaseApi (header) |
| SMTP | Email Send | WF05b | SMTP credentials |

## Recapitulatif des Tables

| Table | WF01 | WF02 | WF03 | WF04 | WF05 |
|-------|------|------|------|------|------|
| `clients` | R(S) | R(S) | R(S) | R(H) | R(H) |
| `brand_platforms` | R(S) | R(S) | R(S) | | |
| `brand_assets` | | R(H) | | | |
| `editorial_calendars` | W(S) | | | | |
| `editorial_slots` | W(S) | R(H) | R(H) | | |
| `uploads` | | RW(S+H) | RW(S+H) | | |
| `content_queue` | R(H) | RW(S+H) | W(S) | RW(S+H) | |
| `publications` | | | | W(S) | R(H) |
| `publication_metrics` | R(H) | | | | W(H) |
| `workflow_logs` | W(S) | W(S) | W(S) | W(S) | W(S) |

R = Read, W = Write, RW = Read + Write
**(S)** = Supabase node, **(H)** = HTTP Request, **(S+H)** = mix selon l'operation

---

## Notes Techniques

### Nodes et Versions (source: get_node MCP)

| Node | workflowNodeType | Version |
|------|------------------|---------|
| Webhook | `n8n-nodes-base.webhook` | 2.1 |
| Respond to Webhook | `n8n-nodes-base.respondToWebhook` | 1.5 |
| Supabase | `n8n-nodes-base.supabase` | 1 |
| AI Agent | `@n8n/n8n-nodes-langchain.agent` | 3.1 |
| OpenAI Chat Model | `@n8n/n8n-nodes-langchain.lmChatOpenAi` | 1.3 |
| Structured Output Parser | `@n8n/n8n-nodes-langchain.outputParserStructured` | 1.3 |
| OpenAI (image) | `@n8n/n8n-nodes-langchain.openAi` | 2.1 |
| Code | `n8n-nodes-base.code` | 2 |
| Schedule Trigger | `n8n-nodes-base.scheduleTrigger` | 1.2 |
| HTTP Request | `n8n-nodes-base.httpRequest` | 4.2 |
| IF | `n8n-nodes-base.if` | 2.2 |
| Switch | `n8n-nodes-base.switch` | 3.4 |
| Split In Batches | `n8n-nodes-base.splitInBatches` | 3 |
| Set | `n8n-nodes-base.set` | 3.4 |
| Merge | `n8n-nodes-base.merge` | 3.2 |
| Email Send | `n8n-nodes-base.emailSend` | 2.1 |
| Error Trigger | `n8n-nodes-base.errorTrigger` | 1 |

### Regles de conception

- **n8n Community Edition** : pas de `$vars` — les IDs et URLs sont hardcodes ou passes via les donnees du workflow
- **Supabase node** : utilise pour les operations CRUD simples (create, get, update, delete avec filtres eq)
- **HTTP Request** : conserve pour les queries Supabase complexes (JOIN, ORDER BY, SELECT, UPSERT, IN), Supabase Storage, Google Drive, Meta Graph API, Gemini
- **AI Agent pattern** : promptType=define, hasOutputParser=true, systemMessage dans options — jamais de HTTP Request direct vers OpenAI
- **OpenAI image** : resource=image, operation=edit pour la sublimation (prend une image en entree)
- **Structured Output Parser** : schemaType=fromJson avec exemple JSON — garantit le format de sortie
- **Timezone** : `Europe/Paris` dans les settings de tous les workflows
- **`$now.toUTC().toISO()`** : toujours utiliser UTC pour les requetes Supabase (evite le `+` encode en espace)
- **Retry publication** : 3 tentatives max avec requeue, puis alerte critique

---

*Reecrit le 2026-03-05 — R2 Remediation nodes natifs*
