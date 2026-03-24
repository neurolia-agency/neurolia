# A03 — Workflow Map

Carte detaillee des 6 workflows n8n pour Neurolia Social Engine. Chaque workflow est decrit avec son trigger, ses nodes, le flux de donnees, les tables DB et les APIs utilisees.

**Nodes natifs utilises** : Supabase (CRUD simple), AI Agent + OpenAI Chat Model (generation texte, hasOutputParser=false), OpenAI node (sublimation images). Les queries complexes (joins, order, select) restent en HTTP Request vers PostgREST.

### Statut implementation (Session 9 — 2026-03-08)

| Workflow | Statut | Nodes | Divergences majeures vs spec originale |
|----------|--------|-------|----------------------------------------|
| WF00 | DEPLOYE | 29 (22 fn + 7 stickies) | Trigger: Manual + Google Sheets (pas webhook). Parseurs brand + strategie via HTTP OpenAI (pas AI Agent). Rapport tracabilite HTML (Session 9). |
| WF01 | DEPLOYE | 40 (32 fn + 8 stickies) | Trigger: Manual + Google Sheets (pas webhook). 3 agents sequentiels (pas 1). hasOutputParser=false. Integration content_strategy. Rapport tracabilite HTML (Session 9). |
| WF1.5 | DEPLOYE | 21 (15 fn + 6 stickies) | Directives photo IA ajoutees (GPT-4o-mini). 5 bugs fixes Session 8. |
| WF02 | DEPLOYE | 44 (37 fn + 7 stickies) | Compositing multi-image (3 nodes). Vision reelle. Validation caption. Branchement post/story. hasOutputParser=false, temp 0.85. |
| WF03 | DEPLOYE | 29 (23 fn + 6 stickies) | Planificateur stories hebdo (3 nodes). Accumulateur intra-batch. Source photos WF02. |
| WF04 | -- | -- | Pas encore construit |
| WF05 | -- | -- | Pas encore construit |

> **Note** : Les sections ci-dessous decrivent l'architecture reelle deployee. Les divergences avec la spec A03 originale sont documentees dans `phase1-diagnostic-optimisation.md`.

---

## Vue d'ensemble

```
WF00 Onboarding Client (manuel, une fois par client)
  |  Depot fichiers -> Agent IA parse -> DB structuree
  v
WF01 Strategie Editoriale (par campagne, declenchement manuel)
  |
  v
WF1.5 Demande Photos (quotidien 07h00)
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
| WF00 | WF01-05 | `clients`, `brand_platforms`, `content_strategy`, `brand_assets` remplis par WF00, consommes par tous les workflows |
| WF01 | WF1.5 | `editorial_slots` crees par WF01, scannes par WF1.5 pour demander les photos |
| WF01 | WF03 | `editorial_slots` (type=story) crees par WF01, consommes par WF03 |
| WF1.5 | WF02 | Sous-dossiers Drive crees par WF1.5, photos deposees par l'equipe, detectees par WF02 via polling |
| WF02 | WF03 | `uploads` (status=ready_for_story) crees par WF02 pour les stories, consommes par WF03 |
| WF02 | WF04 | `content_queue` (status=approved) cree par WF02, publie par WF04 |
| WF03 | WF04 | `content_queue` (status=approved, batch) cree par WF03, publie par WF04 |
| WF04 | WF05 | `publications` creees par WF04, metriques recuperees par WF05 |
| WF05 | WF01 | `publication_metrics` utilisees comme input du prochain calendrier |

### Workflow commun : Error Handler

Tous les workflows utilisent le meme Error Workflow (WF05-Error) pour centraliser les alertes.

---

## WF00 — Onboarding Client

**Frequence** : A la demande, une seule fois par client (re-executable grace a on_conflict)
**Role** : Lire le Google Sheet manifeste, telecharger fichiers brand + strategie depuis Drive, parser via GPT-4o, UPSERT en DB (clients, brand_platforms, content_strategy, brand_assets)
**n8n ID** : `7AzZSyW7Q5cv6VW6` — 29 noeuds (22 fn + 7 stickies), active=false

### Trigger

```
Manual Trigger (manualTrigger)
  Declenchement manuel, 1x par client
```

### Source des donnees

Google Sheet manifeste avec colonnes :
| Col | Nom | Contenu |
|-----|-----|---------|
| A | client_name | Nom commercial |
| B | client_slug | Identifiant URL-safe |
| C | industry | Secteur |
| D | website_url | URL site web |
| E | instagram_handle | @compte |
| F | facebook_page_url | URL page Facebook |
| G | brand_folder | lien Drive → dossier brand/ (fichiers .md) |
| H | strategie_md | lien Drive → fichier strategie Instagram |
| I | logo | lien Drive → fichier logo |
| J | photos_contexte | lien Drive → dossier photos contexte |
| K | photos_brutes_folder | lien Drive → dossier photos brutes |

### Flux de nodes

```
mt01 Declencheur Manuel (manualTrigger)
  |
gs02 Charger Manifeste Client (googleSheets, read)
  |  Lit le Google Sheet manifeste
  |
cd03 Extraire Donnees Client (code@2)
  |  Validation lignes vides, extraction IDs Drive, parsing URL/ID
  |
cd04 UPSERT Client (code@2)
  |  POST {SUPABASE_URL}/rest/v1/clients?on_conflict=slug
  |  Prefer: resolution=merge-duplicates
  |
hr05 Lister Fichiers Brand (httpRequest@4.2)
  |  GET Google Drive API — liste fichiers du dossier brand
  |
cd05b Preparer Fichiers Brand (code@2)
  |  Init staticData.brandTexts = [], map fichiers en items
  |
si06 Boucle Fichiers Brand (splitInBatches@3)
  |
hr07 Telecharger Fichier Brand (httpRequest@4.2)  [boucle]
  |  GET Google Drive API — export text/plain (Google Docs) ou ?alt=media
  |
cd08 Accumuler Contenu Brand (code@2)  [boucle]
  |  Push dans staticData.brandTexts, retour boucle si06
  |
cd09 Preparer Parseur Brand (code@2)  [sortie done de si06]
  |  Concatene tous les brandTexts, construit systemPrompt + userPrompt
  |  Prompt structuree XML avec schema brand_platforms complet
  |
hr10 Agent Parseur Brand (httpRequest@4.2)
  |  POST OpenAI chat/completions — gpt-4o, temp 0.1, max_tokens 8000
  |
cd11 Valider et UPSERT Brand (code@2)
  |  Parse JSON robuste (3 strategies), POST brand_platforms?on_conflict=client_id
  |
hr14 Telecharger Strategie (httpRequest@4.2)
  |  GET Google Drive API — fichier strategie Instagram
  |
cd15 Preparer Parseur Strategie (code@2)
  |  Construit systemPrompt XML avec schema content_strategy complet
  |
hr16 Agent Parseur Strategie (httpRequest@4.2)
  |  POST OpenAI chat/completions — gpt-4o, temp 0.1, max_tokens 8000
  |
cd17 Valider et UPSERT Strategie (code@2)
  |  Parse JSON robuste (3 strategies), POST content_strategy?on_conflict=client_id
  |
hr19 Telecharger Logo (httpRequest@4.2)
  |  GET Google Drive API — fichier logo (responseFormat: file)
  |
hr20 Upload Logo Storage (httpRequest@4.2)
  |  POST Supabase Storage: social-engine/{slug}/brand-assets/logo
  |
cd21 Inserer Asset et MAJ Client (code@2)
  |  POST brand_assets?on_conflict=client_id,type + PATCH clients drive_folder_id
  |
cd22 Preparer Reponse (code@2)
  |
cd22b Generer Rapport Onboarding (code@2)
  |  Fetch brand_platforms, content_strategy, brand_assets depuis Supabase
  |  Genere rapport HTML self-contained (dark theme, 4 sections)
  |  Retourne report_html dans le JSON de sortie
  |
sb23 Journal Execution (supabase@1)
  |  operation: create, table: workflow_logs
```

### Tables DB

| Table | Operation | Node | Champs |
|-------|-----------|------|--------|
| `clients` | UPSERT | Code (httpRequest) | name, slug, industry, drive_folder_id, instagram_handle, etc. |
| `brand_platforms` | UPSERT | Code (httpRequest) | * (tous les champs extraits par le parseur GPT-4o) |
| `content_strategy` | UPSERT | Code (httpRequest) | pillars, weekly_calendar, stories_guidelines, periods, etc. |
| `brand_assets` | UPSERT | Code (httpRequest) | logo (on_conflict=client_id,type) |
| `workflow_logs` | INSERT | Supabase | execution log |

### APIs externes

| API | Node | Usage |
|-----|------|-------|
| Google Sheets | googleSheets node | Lire le manifeste client |
| Google Drive | HTTP Request | Lister, telecharger fichiers brand + strategie + logo |
| OpenAI (gpt-4o) | HTTP Request | 2 parseurs (brand + strategie), temp 0.1 |
| Supabase Storage | HTTP Request | Upload logo |
| Supabase PostgREST | HTTP Request | UPSERT clients, brand_platforms, content_strategy, brand_assets |

---

## WF01 — Strategie Editoriale (campagne)

**Frequence** : A la demande, declenchement manuel par l'equipe Neurolia
**Role** : Generer le calendrier editorial d'une campagne via 3 agents sequentiels (Stratege → Posts → Stories)
**n8n ID** : `TG3Pxizh8oWKA3Ab` — 40 noeuds (32 fn + 8 stickies), active=false

### Trigger

```
Manual Trigger (manualTrigger)
  + Google Sheets (lecture parametres campagne, range A:M)
  + Code node (formatage colonnes → format campaign)

Colonnes Google Sheets :
  client_id, campaign_name, start_date, end_date, primary_goal,
  description, posts_per_week, stories_per_day, intensity_curve,
  brief, themes_imposed, key_dates, kpis
```

### Architecture Multi-Agent v2

```
Agent 1 — Stratege (GPT-4o, temp 0.7, 3k tokens)
  Input: brand + campagne + metriques + content_strategy (periode active)
  Output: strategy_summary + campaign_phases[] + pillar_distribution

Agent 2 — Planificateur Posts (GPT-4o, temp 0.85, 8k tokens)
  Input: phases Agent 1 + brand full + captions recentes + pillar_definitions + caption_rules
  Output: posts[] (avec pillar par post)

Agent 3 — Planificateur Stories (GPT-4o, temp 0.8, 14k tokens) — via SplitInBatches
  Input: phase + posts Agent 2 + brand resume + stories_guidelines
  Output: stories[] par phase (accumules via staticData)
```

### Flux de nodes

```
mt01 Declencheur Manuel (manualTrigger)
  |
gs01b Charger Parametres Campagne (googleSheets, read)
  |
cd01c Formater Inputs Campagne (code@2)
  |  Transforme colonnes GSheets → format body.campaign
  |
sb02 Charger Donnees Client (supabase@1)
  |  operation: get, table: clients
  |
sb03 Charger Plateforme Marque (supabase@1)
  |  operation: getAll, table: brand_platforms
  |
hr03b Charger Catalogue Contexte (httpRequest@4.2)
  |  GET brand_assets type=context
  |
hr03c Charger Strategie Client (httpRequest@4.2)
  |  GET content_strategy?client_id=eq.{client_id}
  |
cd03d Detecter Periode Active (code@2)
  |  Match campaign.start_date vs periods[].date_start/date_end
  |  Fallback periods[0]
  |
cd04 Charger Metriques Precedentes (code@2)
  |  httpRequest: GET publication_metrics (JOIN publications, 30 derniers jours)
  |
cd05 Charger Captions Recentes (code@2)
  |  httpRequest: GET content_queue (published, order desc, limit 20)
  |
cd06 Construire Prompt Agent 1 (code@2)
  |  Injecte <content_strategy> XML (pillars, weekly_calendar, active_period)
  |  + <planning_rules> + pillar_distribution dans output_format
  |
ag07 Agent 1 — Stratege (AI Agent, hasOutputParser=false)
  |  +-- Modele OpenAI — Stratege (gpt-4o, temp 0.7, 3k tokens)
  |
cd08 Valider Strategie (code@2)
  |  Parse JSON robuste 3 strategies, validation structure
  |
cd09 Construire Prompt Agent 2 (code@2)
  |  Injecte <pillar_definitions> (content_types, rules, creative_dial par pilier)
  |  + <caption_rules> + compositing_context + pillar dans output_format
  |
ag10 Agent 2 — Planificateur Posts (AI Agent, hasOutputParser=false)
  |  +-- Modele OpenAI — Posts (gpt-4o, temp 0.85, 8k tokens)
  |
cd11 Valider Posts (code@2)
  |  Parse JSON robuste, validation structure
  |
cd12 Preparer Boucle Stories (code@2)
  |  Reset staticData.allStories = [], split phases en items
  |
si13 Boucle Phases Stories (splitInBatches@3)
  |
cd14 Construire Prompt Agent 3 (code@2)  [boucle]
  |  Injecte <stories_guidelines> (frequency, interactive, style, weekday/weekend)
  |
ag15 Agent 3 — Planificateur Stories (AI Agent, hasOutputParser=false)  [boucle]
  |  +-- Modele OpenAI — Stories (gpt-4o, temp 0.8, 14k tokens)
  |
cd16 Valider Stories Phase (code@2)  [boucle]
  |  Parse JSON robuste, accumule dans staticData.allStories, retour boucle
  |
cd17 Assembler Calendrier (code@2)  [sortie done de si13]
  |  Combine posts[] + allStories[], calcule statistiques
  |
sb18 Creer Calendrier Editorial (supabase@1)
  |  operation: create, table: editorial_calendars
  |
cd19 Inserer Slots (code@2)
  |  httpRequest: POST editorial_slots (batch) — propage pillar pour posts + stories
  |
cd20 Preparer Reponse (code@2)
  |
cd22b Generer Rapport Editorial (code@2)
  |  Analyse pillar distribution (strategie vs reel), posts par semaine
  |  4 checks de coherence, genere rapport HTML self-contained (dark theme)
  |  Retourne report_html dans le JSON de sortie
  |
sb21 Journal Execution (supabase@1)
```

### Tables DB

| Table | Operation | Node | Champs |
|-------|-----------|------|--------|
| `clients` | READ | Supabase | id, name, slug, industry |
| `brand_platforms` | READ | Supabase | * |
| `brand_assets` | READ | HTTP Request | catalogue contexte (type=context) |
| `content_strategy` | READ | HTTP Request | pillars, weekly_calendar, stories_guidelines, periods |
| `publication_metrics` | READ | Code (httpRequest) | metriques 30 derniers jours |
| `content_queue` | READ | Code (httpRequest) | 20 dernieres captions publiees |
| `editorial_calendars` | INSERT | Supabase | campagne + strategy_summary |
| `editorial_slots` | INSERT | Code (httpRequest) | posts + stories avec pillar |
| `workflow_logs` | INSERT | Supabase | execution log |

### APIs externes

| API | Node | Usage |
|-----|------|-------|
| Google Sheets | googleSheets node | Parametres campagne |
| OpenAI (gpt-4o) | AI Agent (x3) | 3 agents sequentiels (Stratege, Posts, Stories) |
| Supabase PostgREST | HTTP Request | Lecture content_strategy, insertion editorial_slots |

---

## WF1.5 — Demande Photos

**Frequence** : Quotidien, 07h00 (cron: 0 7 * * *)
**Role** : Scanner les slots editoriaux des 48h suivantes sans photo, creer des sous-dossiers Google Drive dedies, enrichir les directives photo via IA, et envoyer un email recap a l'equipe Neurolia.
**n8n ID** : `F47NAnabEESZd4cf` — 21 noeuds (15 fn + 6 stickies), active=true

### Trigger

```
Schedule Trigger (cron: 0 7 * * *)
```

### Flux de nodes

```
sch01 Declencheur Planifie (scheduleTrigger@1.2, cron 0 7 * * *)
  |
sb02 Charger Clients Actifs (supabase@1)
  |  operation: getAll, table: clients, filter: is_active eq true
  |
cd03 Filtrer Clients avec Drive (code@2)
  |  Filtre: clients avec drive_folder_id non null
  |
si04 Boucle Clients (splitInBatches@3)
  |
cd05 Charger Slots a Couvrir (code@2)
  |  httpRequest: GET editorial_slots (URL-based query pour duplicate gte/lte PostgREST)
  |  ?client_id=eq.{}&slot_date=gte.{today}&slot_date=lte.{today+48h}
  |  &upload_id=is.null&photo_requested=eq.false
  |  &select=id,slot_date,slot_time,content_type,theme,angle,tone,style,
  |  visual_direction,category,compositing_context,calendar_id
  |  Si aucun slot: retourne { _noSlots: true }
  |
if06 SI — Slots a Traiter (if@2.2)
  |  Condition: !$json._noSlots
  |  True ↓                    False → Loop next client
  |
cd07 Preparer Slots (code@2)
  |  Structure plate $input.all(), subfolder_name: slot_date + theme-slug
  |  Init staticData.processedSlots = []
  |
si08 Boucle Slots (splitInBatches@3)
  |
hr09 Creer Sous-Dossier Drive (httpRequest@4.2)  [boucle]
  |  POST Google Drive API — creer dossier dans drive_folder_id
  |
cd10 MAJ Slot Notifie (code@2)  [boucle]
  |  Ref: $('Boucle Slots').first().json pour slot courant
  |  PATCH editorial_slots: photo_requested=true, drive_subfolder_id=folder_id
  |  Accumule dans staticData.processedSlots (avec drive_folder_url)
  |  Retour boucle si08
  |
cd10b Preparer Prompt Directives (code@2)  [sortie done de si08]
  |  Filtre _noSlots, merge drive_folder_url depuis staticData.processedSlots
  |  Construit prompt batch pour directives photo IA
  |
hr10c Enrichir Directives IA (httpRequest@4.2)
  |  POST OpenAI chat/completions — GPT-4o-mini, temp 0.5
  |  Genere directives photo specifiques par slot
  |
cd11 Construire Email Demande (code@2)
  |  Parse directives IA, photo_sujet + photo_contexte
  |  Badges COMPOSITING/2 photos, fallback visual_direction brut
  |  Genere email HTML avec tableau + liens Drive directs
  |
hr12 Envoyer Email Demande (emailSend@2.1)
  |  subject: "[ClientName] Photos a deposer — X slots"
  |
sb13 Journal Execution (supabase@1)
  |  Loop → next client
```

### Tables DB

| Table | Operation | Node | Champs |
|-------|-----------|------|--------|
| `clients` | READ | Supabase | id, name, slug, drive_folder_id, is_active |
| `editorial_slots` | READ | Code (httpRequest) | slots 48h sans photo (upload_id=is.null, photo_requested=eq.false) |
| `editorial_slots` | UPDATE | Code (httpRequest) | photo_requested=true, drive_subfolder_id |
| `workflow_logs` | INSERT | Supabase | execution log |

### APIs externes

| API | Node | Usage |
|-----|------|-------|
| Google Drive API v3 | HTTP Request | Creer sous-dossiers par slot |
| OpenAI (gpt-4o-mini) | HTTP Request | Directives photo IA (temp 0.5) |
| SMTP | Email Send | Notification equipe avec liens Drive + directives |

### Connexion inter-workflows

- **Amont** : WF01 cree les `editorial_slots` que WF1.5 scanne
- **Aval** : L'equipe Neurolia depose les photos dans les sous-dossiers Drive → WF02 les detecte via polling

---

## WF02 — Creation Contenu

**Frequence** : Polling Google Drive toutes les 10 minutes
**Role** : Detecter les nouvelles photos, sublimer (avec compositing conditionnel), generer les captions, brancher posts/stories
**n8n ID** : `9CjAn1p1fBvqICU2` — 44 noeuds (37 fn + 7 stickies), active=true

### Trigger

```
Schedule Trigger (interval: 10 minutes)
```

### Flux de nodes

```
sch01 Declencheur Planifie (scheduleTrigger@1.2, 10 min)
  |
sb02 Charger Clients Actifs (supabase@1)
  |  operation: getAll, table: clients, filter: is_active eq true
  |
cd03 Filtrer Clients avec Drive (code@2)
  |
si04 Boucle Clients (splitInBatches@3, par client)
  |
cd05 Charger Slots Prets (code@2)
  |  httpRequest: GET editorial_slots avec drive_subfolder_id non null
  |  Exclut TOUT slot avec upload existant (idempotence renforcee)
  |  Output: items[] ou { _noSlots: true }
  |
if06 SI — Slots a Traiter (if@2.2)
  |  True ↓                               False → Loop next client
  |
cd07 Preparer Slots (code@2)
  |
si08 Boucle Slots (splitInBatches@3, par slot)
  |
hr09 Lister Fichiers Sous-Dossier (httpRequest@4.2)
  |  GET Google Drive API — fichiers dans le sous-dossier du slot
  |
cd10 Identifier Nouveau Fichier (code@2)
  |  Exclut uploads deja traites
  |
if11 SI — Fichier Trouve (if@2.2)
  |  True ↓                               False → Loop next slot
  |
hr12 Telecharger Fichier (httpRequest@4.2)
  |
hr13 Upload vers Storage (httpRequest@4.2)
  |  POST Supabase Storage: originals/
  |
sb14 Inserer Upload Assigne (supabase@1)
  |  table: uploads, status: 'assigned'
  |
  +--- BRANCHEMENT POST/STORY ---
  |
if14b SI — Type Post (if@2.2)
  |  Condition: content_type == "post"
  |  True (POST) ↓                        False (STORY) ↓
  |                                        |
  |                                   cd14c MAJ Upload Story Pret (code@2)
  |                                        |  PATCH upload status=ready_for_story
  |                                        |
  |                                   hr14d Deplacer Fichier Story (httpRequest@4.2)
  |                                        |  Google Drive move → traites/
  |                                        |  → Retour boucle si08
  |
  +--- PIPELINE SUBLIMATION (posts uniquement) ---
  |
sb15 Charger Direction Artistique (supabase@1)
  |
sb16 Charger Plateforme Marque (supabase@1)
  |
hr17 Charger Images Contexte (httpRequest@4.2)
  |  GET brand_assets?type=in.(background,photo_style,context)
  |
hr18 Telecharger Original (httpRequest@4.2)
  |
cd17b Selectionner Photo Contexte (code@2) [COMPOSITING]
  |  Matching mots-cles compositing_context vs brand_assets metadata
  |
cd17c Preparer Compositing (code@2) [COMPOSITING]
  |  Si hasCompositing: telecharge photo contexte, 2 binaires (data+context)
  |  Sinon: binaire original seul
  |
cd17d Valider Compatibilite Compositing (code@2) [GARDE-FOU]
  |  GPT-4o-mini vision — verifie compatibilite sujet/decor
  |  Si incoherent → fallback sublimation simple
  |
cd19 Construire Prompt Sublimation (code@2)
  |  3 branches: compositing / story / sublimation simple
  |  Dictionnaire categoryDirections (8 creative + 8 light)
  |  Sections: CHARTE GRAPHIQUE, IDENTITE, DIRECTION CATEGORIE, DIRECTION VISUELLE
  |
oa20 Agent DA — Sublimation (openAi@2.1)
  |  resource: image, operation: edit, model: gpt-image-1
  |  inputFidelity: high, size: auto
  |  1 ou 2 images (data + context conditionnel)
  |
hr21 Upload Image Sublimee (httpRequest@4.2)
  |
hr22 Charger Captions Anti-Repetition (httpRequest@4.2)
  |  GET content_queue (published, order desc, limit 15)
  |
cd23 Construire Prompt Caption (code@2)
  |  4 couches prompt-engineered (XML, CoT, quality_checklist, guardrails):
  |  - Couche 1: brand_platform (ton, valeurs, vocabulaire, tu/vous)
  |  - Ancrage: promesse de marque, USPs
  |  - Couche 2: editorial_slot (theme, angle, ton, style, CTA)
  |  - Couche 3: image sublimee (vision reelle via passthroughBinaryImages)
  |  - Couche 4: 15 dernieres captions (anti-repetition + mots surutilises)
  |
hr23b Telecharger Image Sublimee (httpRequest@4.2)
  |  Telecharge le binaire pour vision reelle
  |
ag24 Agent Redacteur (AI Agent, hasOutputParser=false)
  |  passthroughBinaryImages: true — vision reelle de l'image sublimee
  |  +-- Modele OpenAI — Redacteur (gpt-4o, temp 0.85, 1000 tokens)
  |
cd24b Valider Sortie Caption (code@2)
  |  Parse JSON robuste 3 strategies
  |  Validation: longueur, hashtags, CTA, formules bannies
  |
sb25 Inserer File Contenu (supabase@1)
  |  table: content_queue, content_type dynamique, pillar propage
  |  status: 'pending_review'
  |
sb26 MAJ Statut Upload (supabase@1)
  |  status: 'processed'
  |
hr27 Deplacer Fichier Drive (httpRequest@4.2)
  |  PATCH Google Drive — move vers traites/
  |
sb28 Journal Execution (supabase@1)
  |
29 Loop → next slot / next client
```

### Tables DB

| Table | Operation | Node | Champs |
|-------|-----------|------|--------|
| `clients` | READ | Supabase | id, slug, drive_folder_id, is_active |
| `brand_platforms` | READ | Supabase | * |
| `brand_assets` | READ | HTTP Request | file_url, metadata, type (IN filter) |
| `editorial_slots` | READ | Supabase + Code | visual_direction, category, compositing_context, content_type, pillar |
| `uploads` | INSERT | Supabase | original_url, status, drive_file_id |
| `uploads` | UPDATE | Supabase + Code | status: processed / ready_for_story |
| `content_queue` | READ | HTTP Request | captions recentes (anti-repetition) |
| `content_queue` | INSERT | Supabase | contenu avec content_type dynamique + pillar |
| `workflow_logs` | INSERT | Supabase | execution log |

### APIs externes

| API | Node | Usage |
|-----|------|-------|
| Google Drive | HTTP Request | Lister, telecharger, deplacer fichiers |
| Supabase Storage | HTTP Request | Upload original + sublime |
| OpenAI (gpt-image-1) | OpenAI node (image/edit) | Agent DA — sublimation (1-2 images) |
| OpenAI (gpt-4o) | AI Agent | Agent Redacteur — caption (vision reelle) |
| OpenAI (gpt-4o-mini) | HTTP Request | Garde-fou compositing (vision) |

---

## WF03 — Story Batch

**Frequence** : Hebdomadaire, dimanche soir
**Role** : Generer un lot de ~42 stories pour la semaine suivante, avec planification IA et accumulateur anti-repetition
**n8n ID** : `lseu1WhVn7c29EEj` — 29 noeuds (23 fn + 6 stickies), active=false

### Trigger

```
Schedule Trigger (cron: 0 20 * * 0)  — dimanche 20h00
```

### Flux de nodes

```
sch01 Declencheur Planifie (scheduleTrigger@1.2, dimanche 20h)
  |
sb02 Charger Clients Actifs (supabase@1)
  |  operation: getAll, table: clients, filter: is_active eq true
  |
si03 Boucle Clients (splitInBatches@3, par client)
  |
cd04 Calculer Plage Semaine (code@2)
  |  next_monday, next_sunday, batch_id, batch_week
  |  Init staticData.batchCaptions = [] (reset par client)
  |
cd05 Charger Creneaux Stories (code@2)
  |  httpRequest: GET editorial_slots (type=story, semaine suivante)
  |
if06 SI — Creneaux Trouves (if@2.2)
  |  True ↓                               False → Loop next client
  |
cd07 Charger Photos Disponibles (code@2)
  |  httpRequest: GET uploads?status=eq.ready_for_story (depuis WF02)
  |  Matching strict par slot_id
  |
sb07 Charger Plateforme Marque (supabase@1)
  |
  +--- PLANIFICATEUR STORIES HEBDO (3B) ---
  |
cd08a Preparer Contexte Planification (code@2)
  |  Charge posts semaine (cross-WF Supabase), resume brand+slots
  |  Construit prompt planificateur
  |
hr08b Planifier Stories Hebdo (httpRequest@4.2)
  |  POST OpenAI chat/completions — GPT-4o-mini, temp 0.7, 1500 tokens
  |  Planifie variete accroches/ton/complementarite posts
  |
cd08c Valider Plan Stories (code@2)
  |  Parse JSON robuste 3 strategies
  |  Enrichit slots avec _brief (accroche_type, angle_enrichi, ton_cible, differentiation, mots_interdits)
  |  Fallback _planningFailed
  |
  +--- FIN PLANIFICATEUR ---
  |
cd08 Assigner Photos aux Creneaux (code@2)
  |  Ref: $('Valider Plan Stories') — propage briefs
  |
sp09 Boucle Creneaux Stories (splitInBatches@3, par story slot)
  |
cd11 Construire Prompt Sublimation (code@2)  [boucle]
  |  Mode light (retouche legere + texte incruste)
  |
oa12 Agent DA — Sublimation Story (openAi@2.1)  [boucle]
  |  gpt-image-1, mode light
  |
hr13 Upload Image Story (httpRequest@4.2)  [boucle]
  |
cd14 Construire Prompt Caption (code@2)  [boucle]
  |  Prompt-engineered (XML/CoT/few-shot/guardrails/quality_checklist)
  |  Injection <planning_brief> depuis cd08c
  |  Injection <anti_repetition> depuis staticData.batchCaptions (accumulateur intra-batch)
  |
ag15 Agent Redacteur Story (AI Agent, hasOutputParser=false)  [boucle]
  |  +-- Modele OpenAI — Redacteur (gpt-4o, temp 0.85)
  |
cd15a Valider Sortie Story (code@2)  [boucle]
  |  Parse JSON robuste 3 strategies
  |  Push caption validee dans staticData.batchCaptions (accumulateur)
  |
sb16 Inserer File Contenu (supabase@1)  [boucle]
  |  table: content_queue, content_type: 'story', status: 'pending_review'
  |  batch_id, batch_week, 14 champs
  |
17 Loop → next slot
  |
cd18 MAJ Statut Uploads (code@2)
  |  httpRequest: PATCH uploads status='processed'
  |
sb19 Journal Execution (supabase@1)
  |
20 Loop → next client
```

### Tables DB

| Table | Operation | Node | Champs |
|-------|-----------|------|--------|
| `clients` | READ | Supabase | id, slug, is_active |
| `brand_platforms` | READ | Supabase | * |
| `editorial_slots` | READ | HTTP Request | story slots de la semaine + posts semaine (cross-WF) |
| `uploads` | READ | HTTP Request | photos status=ready_for_story (depuis WF02) |
| `uploads` | UPDATE | Code (httpRequest) | status: processed |
| `content_queue` | INSERT | Supabase | ~42 stories par client/semaine |
| `workflow_logs` | INSERT | Supabase | execution log |

### APIs externes

| API | Node | Usage |
|-----|------|-------|
| OpenAI (gpt-image-1) | OpenAI node (image/edit) | Agent DA — sublimation legere + texte |
| OpenAI (gpt-4o) | AI Agent | Agent Redacteur — caption story (hasOutputParser=false) |
| OpenAI (gpt-4o-mini) | HTTP Request | Planificateur stories hebdo (temp 0.7) |
| Supabase Storage | HTTP Request | Upload images stories |
| Supabase PostgREST | HTTP Request | Posts semaine (cross-WF), uploads ready_for_story |

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
| WF00 | Webhook (manuel) | webhook@2.1 | 1x par client (re-executable pour maj) |
| WF01 | Webhook (manuel) | webhook@2.1 | ~1-3x/mois par client (par campagne) |
| WF1.5 | Schedule Trigger | scheduleTrigger@1.2 | Quotidien 07h00 |
| WF02 | Schedule Trigger | scheduleTrigger@1.2 | Toutes les 10 min |
| WF03 | Schedule Trigger | scheduleTrigger@1.2 | Dimanche 20h00 |
| WF04 | Schedule Trigger | scheduleTrigger@1.2 | Toutes les 15 min |
| WF05a | Schedule Trigger | scheduleTrigger@1.2 | Quotidien 06h00 |
| WF05b | Error Trigger | errorTrigger@1 | Event-driven |
| Dashboard webhooks | Webhook | webhook@2.1 | Event-driven |

## Recapitulatif des APIs et Nodes

| API | Node n8n | Workflows | Credentials |
|-----|----------|-----------|-------------|
| OpenAI (gpt-4o texte) | AI Agent + OpenAI Chat Model + Structured Output Parser | WF00, WF01, WF02, WF03 | openAiApi |
| OpenAI (gpt-image-1) | OpenAI node (image/edit) | WF02, WF03 | openAiApi |
| Google Drive | HTTP Request | WF00, WF1.5, WF02 | OAuth2 par client (header) |
| Meta Graph API | HTTP Request | WF04, WF05a | Long-lived token par client (dans `clients.meta_access_token`) |
| Gemini (fallback) | HTTP Request | WF02 | API key (header) |
| Supabase (PostgREST) | Supabase node (simple) + HTTP Request (complex) | Tous | supabaseApi |
| Supabase Storage | HTTP Request | WF00, WF02, WF03 | supabaseApi (header) |
| SMTP | Email Send | WF1.5, WF05b | SMTP credentials |

## Recapitulatif des Tables

| Table | WF00 | WF01 | WF1.5 | WF02 | WF03 | WF04 | WF05 |
|-------|------|------|-------|------|------|------|------|
| `clients` | W(S) | R(S) | R(S) | R(S) | R(S) | R(H) | R(H) |
| `brand_platforms` | W(S) | R(S) | | R(S) | R(S) | | |
| `brand_assets` | W(S) | | | R(H) | | | |
| `editorial_calendars` | | W(S) | | | | | |
| `editorial_slots` | | W(S) | RW(H) | R(H) | R(H) | | |
| `uploads` | | | | RW(S+H) | RW(S+H) | | |
| `content_queue` | | R(H) | | RW(S+H) | W(S) | RW(S+H) | |
| `publications` | | | | | | W(S) | R(H) |
| `publication_metrics` | | R(H) | | | | | W(H) |
| `workflow_logs` | W(S) | W(S) | W(S) | W(S) | W(S) | W(S) | W(S) |

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

*Reecrit le 2026-03-05 — R2 Remediation nodes natifs. MAJ 2026-03-08 Session 9 — rapports tracabilite HTML (WF00 + WF01).*
