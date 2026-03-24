-- Migration 007 : Table content_strategy + colonne editorial_slots.pillar
-- Spec : 06-strategie-integration-spec.md
-- Date : 2026-03-07

-- 1. Table content_strategy
CREATE TABLE IF NOT EXISTS content_strategy (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id uuid REFERENCES clients(id) NOT NULL UNIQUE,

  -- Positionnement strategique
  role_statement text,
  positioning_summary text,

  -- Piliers editoriaux
  pillars jsonb NOT NULL DEFAULT '[]',

  -- Calendrier semaine type
  weekly_calendar jsonb,

  -- Guidelines par format
  stories_guidelines jsonb,
  reels_guidelines jsonb,
  caption_rules jsonb,

  -- Periodes strategiques
  periods jsonb NOT NULL DEFAULT '[]',

  -- Vision
  vision_6m text,
  vision_12m text,
  review_frequency jsonb,

  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_content_strategy_client ON content_strategy(client_id);

-- 2. Colonne pillar sur editorial_slots
ALTER TABLE editorial_slots ADD COLUMN IF NOT EXISTS pillar text;
