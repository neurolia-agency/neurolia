-- ============================================
-- neurolia-social — Schema initial V1
-- Brand Memory + Content Calendar + Analytics
-- ============================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- RESTAURANTS (profil client)
-- ============================================
CREATE TABLE restaurants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  cuisine_type TEXT[] DEFAULT '{}',
  location JSONB DEFAULT '{}',
  price_range TEXT,
  ambiance TEXT[] DEFAULT '{}',
  signature_dishes TEXT[] DEFAULT '{}',
  opening_hours JSONB DEFAULT '{}',
  website_url TEXT,
  phone TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- BRAND DNA (voix de marque)
-- ============================================
CREATE TABLE brand_dna (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  tone TEXT[] DEFAULT '{}',
  vocabulary_preferred TEXT[] DEFAULT '{}',
  vocabulary_forbidden TEXT[] DEFAULT '{}',
  emojis_allowed TEXT[] DEFAULT '{}',
  emojis_forbidden TEXT[] DEFAULT '{}',
  hashtags_primary TEXT[] DEFAULT '{}',
  hashtags_secondary TEXT[] DEFAULT '{}',
  hashtags_forbidden TEXT[] DEFAULT '{}',
  content_pillars TEXT[] DEFAULT '{}',
  posting_style JSONB DEFAULT '{"caption_length": "medium", "cta_frequency": 0.6}',
  competitor_accounts TEXT[] DEFAULT '{}',
  target_audience TEXT,
  unique_selling_points TEXT[] DEFAULT '{}',
  additional_context TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(restaurant_id)
);

-- ============================================
-- BRAND VISUAL (identite visuelle)
-- ============================================
CREATE TABLE brand_visual (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  primary_color TEXT,
  secondary_color TEXT,
  accent_color TEXT,
  font_heading TEXT,
  font_body TEXT,
  logo_path TEXT,
  template_style TEXT DEFAULT 'minimal',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(restaurant_id)
);

-- ============================================
-- SOCIAL ACCOUNTS (connexions plateformes)
-- ============================================
CREATE TABLE social_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  account_id TEXT,
  account_name TEXT,
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMPTZ,
  page_id TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(restaurant_id, platform)
);

-- ============================================
-- VISUAL ASSETS (photos/videos client)
-- ============================================
CREATE TABLE visual_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  original_filename TEXT,
  mime_type TEXT,
  tags TEXT[] DEFAULT '{}',
  used_count INT DEFAULT 0,
  quality_score FLOAT,
  width INT,
  height INT,
  uploaded_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- CONTENT CALENDAR (planning editorial)
-- ============================================
CREATE TABLE content_calendar (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  scheduled_at TIMESTAMPTZ NOT NULL,
  platforms TEXT[] DEFAULT '{}',
  content_type TEXT NOT NULL,
  format TEXT NOT NULL,
  creative_brief TEXT,
  caption TEXT,
  hashtags TEXT[] DEFAULT '{}',
  media_paths TEXT[] DEFAULT '{}',
  hook_type TEXT,
  structure_type TEXT,
  caption_length TEXT,
  asset_ids UUID[] DEFAULT '{}',
  status TEXT DEFAULT 'planned',
  error_message TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index pour les requetes frequentes
CREATE INDEX idx_content_calendar_restaurant_status
  ON content_calendar(restaurant_id, status);
CREATE INDEX idx_content_calendar_scheduled
  ON content_calendar(scheduled_at)
  WHERE status IN ('planned', 'ready');

-- ============================================
-- POST PUBLICATIONS (tracking publication)
-- ============================================
CREATE TABLE post_publications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID NOT NULL REFERENCES content_calendar(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  external_post_id TEXT,
  external_url TEXT,
  published_at TIMESTAMPTZ DEFAULT now(),
  publish_method TEXT DEFAULT 'api',
  UNIQUE(content_id, platform)
);

-- ============================================
-- POST ANALYTICS (metriques)
-- ============================================
CREATE TABLE post_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  publication_id UUID NOT NULL REFERENCES post_publications(id) ON DELETE CASCADE,
  impressions INT DEFAULT 0,
  reach INT DEFAULT 0,
  likes INT DEFAULT 0,
  comments INT DEFAULT 0,
  shares INT DEFAULT 0,
  saves INT DEFAULT 0,
  video_views INT DEFAULT 0,
  engagement_rate FLOAT DEFAULT 0,
  performance_score FLOAT DEFAULT 0,
  raw_data JSONB DEFAULT '{}',
  collected_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_post_analytics_publication
  ON post_analytics(publication_id, collected_at DESC);

-- ============================================
-- GENERATION LOG (tracabilite IA)
-- ============================================
CREATE TABLE generation_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID REFERENCES content_calendar(id) ON DELETE SET NULL,
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  generation_type TEXT NOT NULL,
  model_used TEXT,
  prompt_hash TEXT,
  input_tokens INT,
  output_tokens INT,
  cost_estimate FLOAT,
  duration_ms INT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- UPDATED_AT TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_restaurants_updated
  BEFORE UPDATE ON restaurants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_brand_dna_updated
  BEFORE UPDATE ON brand_dna
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_brand_visual_updated
  BEFORE UPDATE ON brand_visual
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_social_accounts_updated
  BEFORE UPDATE ON social_accounts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_content_calendar_updated
  BEFORE UPDATE ON content_calendar
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- ROW LEVEL SECURITY (preparation dashboard)
-- ============================================
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_dna ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_visual ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE visual_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_calendar ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE generation_log ENABLE ROW LEVEL SECURITY;

-- Note: Les policies RLS seront ajoutees dans une migration separee
-- quand le dashboard client sera implemente (002_rls_policies.sql)
