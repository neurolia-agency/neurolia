# A02 — Data Model

Schema Supabase pour Neurolia Social Engine. Nouveau projet Supabase (separe de neurolia-immo).

---

## Enums

```sql
-- Statut du calendrier editorial
CREATE TYPE calendar_status AS ENUM (
  'draft',        -- genere par l'IA, pas encore valide
  'pending_review', -- soumis a validation Neurolia
  'approved',     -- valide, actif
  'archived'      -- mois passe
);

-- Type de contenu
CREATE TYPE content_type AS ENUM (
  'post',         -- publication feed Instagram/Facebook
  'story'         -- story Instagram/Facebook
);

-- Format de sublimation
CREATE TYPE sublimation_mode AS ENUM (
  'light',        -- retouche legere (filtres, couleurs, cadrage)
  'creative'      -- transformation creative (fond, compositing)
);

-- Style de caption (guide la variete)
CREATE TYPE caption_style AS ENUM (
  'question_directe',
  'storytelling_court',
  'factuel',
  'exclamatif',
  'conseil',
  'citation',
  'liste',
  'teaser'
);

-- Objectif du post
CREATE TYPE post_objective AS ENUM (
  'engagement',   -- likes, commentaires, partages
  'conversion',   -- visite site, reservation, commande
  'notoriete',    -- reach, impressions
  'fidelisation'  -- communaute, behind the scenes
);

-- Categorie de contenu (rotation editoriale)
CREATE TYPE content_category AS ENUM (
  'produit',        -- mise en avant produit/service
  'coulisses',      -- behind the scenes
  'equipe',         -- portraits, vie d'equipe
  'engagement',     -- questions, sondages, UGC
  'saisonnier',     -- evenements, fetes, saisons
  'educatif',       -- tips, how-to, savoir-faire
  'temoignage',     -- avis client, retour d'experience
  'ambiance'        -- atmosphere, lifestyle
);

-- Statut du contenu dans la queue
CREATE TYPE content_status AS ENUM (
  'generating',     -- IA en cours de creation
  'generation_failed', -- erreur IA
  'pending_review', -- en attente de validation Neurolia
  'approved',       -- valide, pret a publier
  'rejected',       -- rejete avec feedback
  'scheduled',      -- programme pour publication
  'publishing',     -- publication en cours
  'published',      -- publie avec succes
  'publish_failed'  -- erreur publication
);

-- Plateforme de publication
CREATE TYPE platform AS ENUM (
  'instagram',
  'facebook'
);

-- Type d'asset de marque
CREATE TYPE asset_type AS ENUM (
  'logo',
  'logo_variant',
  'font',
  'color_palette',
  'moodboard',
  'background',     -- banque de fonds pour sublimation
  'photo_style',    -- exemples de style photo
  'icon',
  'pattern',
  'other'
);

-- Statut d'upload
CREATE TYPE upload_status AS ENUM (
  'new',            -- vient d'arriver (Drive ou interface)
  'assigned',       -- associe a un slot editorial
  'processing',     -- en cours de sublimation
  'processed',      -- sublimation terminee
  'failed'          -- erreur
);
```

---

## Tables

### clients

Table centrale multi-tenant.

```sql
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,           -- identifiant URL-friendly
  industry TEXT,                        -- ex: "restaurant", "commerce", "service"
  website_url TEXT,
  instagram_handle TEXT,
  facebook_page_url TEXT,
  meta_page_id TEXT,                   -- Facebook Page ID (pour Graph API)
  meta_ig_user_id TEXT,                -- Instagram Business Account ID
  meta_access_token TEXT,              -- Long-lived access token (chiffre)
  drive_folder_id TEXT,                -- Google Drive folder ID (Phase 1)
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### brand_platforms

Plateforme de marque par client. Statique, modifiable.

```sql
CREATE TABLE brand_platforms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  -- Identite
  mission TEXT,                        -- mission de la marque
  vision TEXT,                         -- vision long terme
  values TEXT[],                       -- valeurs (array)
  personality TEXT,                    -- personnalite de marque
  archetype TEXT,                      -- archetype (ex: "Explorer", "Creator")
  -- Voix
  tone_of_voice TEXT,                  -- description du ton
  vocabulary_do TEXT[],                -- mots/expressions a utiliser
  vocabulary_dont TEXT[],              -- mots/expressions interdits
  writing_rules TEXT,                  -- regles redactionnelles specifiques
  -- Visuel
  primary_color TEXT,                  -- couleur principale (hex)
  secondary_colors TEXT[],             -- couleurs secondaires
  font_primary TEXT,                   -- police principale
  font_secondary TEXT,                 -- police secondaire
  visual_style TEXT,                   -- description du style visuel
  photo_style TEXT,                    -- style photographique attendu
  -- Social
  hashtags_branded TEXT[],             -- hashtags de marque (#NomMarque)
  hashtags_niche TEXT[],               -- hashtags de niche
  emoji_usage TEXT,                    -- policy emojis (none, moderate, frequent)
  cta_preferred TEXT[],                -- CTA favoris
  -- Contexte
  target_audience TEXT,                -- description cible
  competitors TEXT[],                  -- concurrents
  differentiators TEXT[],              -- differenciateurs
  -- Objectifs
  objectives_primary TEXT,             -- objectif principal
  objectives_secondary TEXT[],         -- objectifs secondaires
  kpis TEXT[],                         -- KPIs a suivre
  --
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(client_id)                    -- 1 brand platform par client
);
```

### brand_assets

Assets visuels de la marque (stockes dans Supabase Storage).

```sql
CREATE TABLE brand_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  type asset_type NOT NULL,
  name TEXT NOT NULL,                  -- nom descriptif
  file_url TEXT NOT NULL,              -- URL Supabase Storage
  file_path TEXT NOT NULL,             -- chemin dans le bucket
  metadata JSONB DEFAULT '{}',        -- donnees supplementaires (dimensions, format...)
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_brand_assets_client ON brand_assets(client_id);
CREATE INDEX idx_brand_assets_type ON brand_assets(client_id, type);
```

### editorial_calendars

Calendrier editorial par campagne client. Une campagne a une duree flexible (1 semaine a 3 mois).

```sql
CREATE TABLE editorial_calendars (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  -- Campagne
  campaign_name TEXT NOT NULL,           -- ex: "Lancement Menu Ete"
  start_date DATE NOT NULL,              -- debut de la campagne
  end_date DATE NOT NULL,                -- fin de la campagne
  campaign_objectives JSONB,             -- objectifs structures (voir schema ci-dessous)
  campaign_brief TEXT,                   -- brief libre du client
  -- Strategie
  status calendar_status DEFAULT 'draft',
  strategy_summary TEXT,                 -- resume de la strategie generee par l'IA
  ai_generation_data JSONB,              -- donnees brutes de l'agent strategiste
  -- Validation
  reviewer_notes TEXT,                   -- notes de l'equipe Neurolia
  approved_at TIMESTAMPTZ,
  approved_by TEXT,                      -- email du validateur
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Schema campaign_objectives JSONB :
-- {
--   "primary_goal": "lancement_produit|notoriete|engagement|conversion|evenement|fidelisation",
--   "description": "Description de l'objectif principal",
--   "kpis": [{ "metric": "reach|engagement_rate|conversions|followers", "target": 50000 }],
--   "posts_per_week": 5,
--   "stories_per_day": 7,
--   "key_dates": [{ "date": "2026-04-15", "label": "Jour de lancement" }],
--   "themes_imposed": ["menu ete", "terrasse"],
--   "intensity_curve": "flat|ramp_up|peak_middle|front_loaded",
--   "budget_tone": "standard|premium|economique"
-- }
```

### editorial_slots

Creneaux individuels du calendrier editorial.

```sql
CREATE TABLE editorial_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  calendar_id UUID NOT NULL REFERENCES editorial_calendars(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  -- Planning
  scheduled_date DATE NOT NULL,
  scheduled_time TIME NOT NULL,        -- heure de publication
  content_type content_type NOT NULL,  -- post ou story
  -- Direction editoriale
  category content_category NOT NULL,
  theme TEXT NOT NULL,                 -- ex: "Burger Le Classique"
  angle TEXT,                          -- ex: "ingredients_frais"
  tone TEXT,                           -- override du ton par defaut
  caption_style caption_style,
  objective post_objective DEFAULT 'engagement',
  -- Direction visuelle
  visual_direction TEXT,               -- ex: "fond sombre, focus ingredients, vapeur"
  sublimation_mode sublimation_mode DEFAULT 'creative',
  story_text TEXT,                     -- texte a incruster (stories uniquement)
  -- Liens
  source_slot_id UUID REFERENCES editorial_slots(id), -- story liee a un post
  -- WF1.5 Demande Photos
  drive_subfolder_id TEXT,                -- Google Drive folder ID du sous-dossier cree par WF1.5
  photo_requested_at TIMESTAMPTZ,         -- date de la notification envoyee (NULL = pas encore demande)
  --
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_slots_calendar ON editorial_slots(calendar_id);
CREATE INDEX idx_slots_client_date ON editorial_slots(client_id, scheduled_date);
CREATE INDEX idx_slots_source ON editorial_slots(source_slot_id);
```

### uploads

Photos brutes fournies par le client.

```sql
CREATE TABLE uploads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  slot_id UUID REFERENCES editorial_slots(id),  -- peut etre NULL si pas encore assigne
  -- Fichier
  original_url TEXT NOT NULL,          -- URL Supabase Storage
  original_path TEXT NOT NULL,         -- chemin dans le bucket
  filename TEXT NOT NULL,              -- nom original du fichier
  mime_type TEXT,
  file_size INTEGER,                   -- en octets
  -- Contexte
  source TEXT DEFAULT 'drive',         -- 'drive' ou 'dashboard'
  drive_file_id TEXT,                  -- Google Drive file ID (pour tracking)
  client_notes TEXT,                   -- notes du client
  -- Images contexte (fonds, ambiance)
  context_images TEXT[] DEFAULT '{}',  -- URLs des images de contexte associees
  --
  status upload_status DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_uploads_client ON uploads(client_id);
CREATE INDEX idx_uploads_status ON uploads(client_id, status);
CREATE INDEX idx_uploads_slot ON uploads(slot_id);
```

### content_queue

Contenu genere en attente de validation/publication.

```sql
CREATE TABLE content_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  slot_id UUID NOT NULL REFERENCES editorial_slots(id),
  upload_id UUID REFERENCES uploads(id),
  content_type content_type NOT NULL,
  -- Image
  sublimated_url TEXT,                 -- URL image sublimee (Supabase Storage)
  sublimated_path TEXT,                -- chemin dans le bucket
  sublimation_prompt TEXT,             -- prompt utilise pour la sublimation
  sublimation_model TEXT,              -- modele utilise (gpt-4o, gemini...)
  -- Caption
  caption TEXT,                        -- texte de la caption
  hashtags TEXT[],                     -- hashtags generes
  cta TEXT,                            -- call to action
  caption_prompt TEXT,                 -- prompt utilise pour la caption (debug)
  caption_model TEXT,                  -- modele utilise
  -- Validation
  status content_status DEFAULT 'generating',
  reviewer_feedback TEXT,              -- feedback si rejete
  reviewed_at TIMESTAMPTZ,
  reviewed_by TEXT,
  -- Publication
  scheduled_at TIMESTAMPTZ,            -- date/heure de publication prevue
  -- Batch (stories)
  batch_id UUID,                       -- regroupement batch hebdo stories
  batch_week DATE,                     -- semaine du batch (lundi)
  --
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_content_client ON content_queue(client_id);
CREATE INDEX idx_content_status ON content_queue(status);
CREATE INDEX idx_content_scheduled ON content_queue(status, scheduled_at);
CREATE INDEX idx_content_batch ON content_queue(batch_id);
CREATE INDEX idx_content_slot ON content_queue(slot_id);
```

### publications

Posts publies sur les plateformes.

```sql
CREATE TABLE publications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID NOT NULL REFERENCES content_queue(id),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  platform platform NOT NULL,
  content_type content_type NOT NULL,
  -- Meta Graph API
  external_id TEXT,                    -- ID du post sur la plateforme
  external_url TEXT,                   -- URL du post
  -- Timing
  published_at TIMESTAMPTZ,
  -- Erreur
  error_message TEXT,                  -- si publication echouee
  retry_count INTEGER DEFAULT 0,
  --
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_pub_content ON publications(content_id);
CREATE INDEX idx_pub_client ON publications(client_id);
CREATE INDEX idx_pub_platform ON publications(client_id, platform);
```

### publication_metrics

Metriques de performance recuperees via Meta Graph API.

```sql
CREATE TABLE publication_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  publication_id UUID NOT NULL REFERENCES publications(id) ON DELETE CASCADE,
  -- Metriques communes
  impressions INTEGER DEFAULT 0,
  reach INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  saves INTEGER DEFAULT 0,
  -- Stories specifiques
  replies INTEGER DEFAULT 0,          -- reponses story
  exits INTEGER DEFAULT 0,            -- sorties story
  taps_forward INTEGER DEFAULT 0,
  taps_back INTEGER DEFAULT 0,
  -- Engagement
  engagement_rate NUMERIC(5,4),        -- calcule
  -- Timing
  fetched_at TIMESTAMPTZ DEFAULT now(), -- derniere recuperation
  --
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_metrics_pub ON publication_metrics(publication_id);
```

### workflow_logs

Logs des executions de workflows (debug et monitoring).

```sql
CREATE TABLE workflow_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id),
  workflow_name TEXT NOT NULL,         -- ex: "wf02-content-creation"
  execution_id TEXT,                   -- ID execution n8n
  status TEXT NOT NULL,                -- success, error, warning
  message TEXT,
  metadata JSONB DEFAULT '{}',        -- donnees supplementaires
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_logs_client ON workflow_logs(client_id);
CREATE INDEX idx_logs_workflow ON workflow_logs(workflow_name);
CREATE INDEX idx_logs_created ON workflow_logs(created_at DESC);
```

---

## Relations

```
clients (1) ─── (1) brand_platforms
clients (1) ─── (N) brand_assets
clients (1) ─── (N) editorial_calendars
clients (1) ─── (N) uploads
clients (1) ─── (N) content_queue
clients (1) ─── (N) publications

editorial_calendars (1) ─── (N) editorial_slots

editorial_slots (1) ─── (N) content_queue
editorial_slots (1) ─── (N) editorial_slots  [story -> post source]

uploads (1) ─── (N) content_queue

content_queue (1) ─── (N) publications
publications (1) ─── (N) publication_metrics
```

---

## Storage Buckets (Supabase Storage)

```
social-engine/
  {client_slug}/
    originals/        -- photos brutes uploadees
    context/          -- images de contexte/fonds
    sublimated/       -- images sublimees
    brand-assets/     -- assets de marque
```

---

## RLS (Row Level Security)

Pour le dashboard Neurolia, deux niveaux d'acces :

```sql
-- Equipe Neurolia : acces a tous les clients
CREATE POLICY neurolia_full_access ON clients
  FOR ALL USING (auth.jwt() ->> 'role' = 'neurolia_admin');

-- Client : acces a ses propres donnees uniquement
CREATE POLICY client_read_own ON editorial_calendars
  FOR SELECT USING (
    client_id IN (
      SELECT id FROM clients WHERE meta_page_id = auth.jwt() ->> 'client_id'
    )
  );

-- Pattern identique pour : editorial_slots, content_queue, publications, publication_metrics
```

---

## Notes

- `meta_access_token` dans `clients` devra etre chiffre (Supabase Vault ou chiffrement applicatif)
- Les `TEXT[]` (arrays) sont natifs PostgreSQL, supportes par Supabase
- `content_queue.batch_id` permet de regrouper les stories d'une semaine pour la validation batch
- `editorial_slots.source_slot_id` lie une story a son post parent (meme photo, traitement different)
- Les index sont optimises pour les requetes les plus frequentes des workflows n8n

---

*Redige le 2026-03-05 — A02 Data Model*
