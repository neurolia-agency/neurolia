-- 1. Nouvelles colonnes dedicees
ALTER TABLE brand_platforms
  ADD COLUMN IF NOT EXISTS key_insight TEXT,
  ADD COLUMN IF NOT EXISTS purpose TEXT,
  ADD COLUMN IF NOT EXISTS brand_promise TEXT,
  ADD COLUMN IF NOT EXISTS brand_essence TEXT,
  ADD COLUMN IF NOT EXISTS tagline TEXT,
  ADD COLUMN IF NOT EXISTS baseline TEXT,
  ADD COLUMN IF NOT EXISTS slogan TEXT,
  ADD COLUMN IF NOT EXISTS usps JSONB DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS proof_points TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS key_figures TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS discriminator TEXT,
  ADD COLUMN IF NOT EXISTS formality_level SMALLINT DEFAULT 3,
  ADD COLUMN IF NOT EXISTS tu_vous TEXT DEFAULT 'vouvoiement',
  ADD COLUMN IF NOT EXISTS brand_extended JSONB DEFAULT '{}';

-- 2. Renommer values (reserved word) → brand_values
ALTER TABLE brand_platforms RENAME COLUMN "values" TO brand_values;

-- 3. Upgrader brand_values TEXT[] → JSONB
ALTER TABLE brand_platforms
  ALTER COLUMN brand_values TYPE JSONB USING to_jsonb(brand_values);

-- 4. Upgrader archetype TEXT → JSONB
ALTER TABLE brand_platforms
  ALTER COLUMN archetype TYPE JSONB
  USING jsonb_build_object('principal', archetype);

-- 5. Contraintes
ALTER TABLE brand_platforms
  ADD CONSTRAINT chk_tu_vous CHECK (tu_vous IN ('tutoiement', 'vouvoiement')),
  ADD CONSTRAINT chk_formality CHECK (formality_level BETWEEN 1 AND 5);
