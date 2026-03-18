/**
 * Video #2 — Feature Flash: Pipeline Kanban
 *
 * "Vos prospects disparaissent dans un tableur ?"
 * Platforms: IG Reels + TikTok
 */

import type { FeatureFlashConfig } from '../types';

export const video: FeatureFlashConfig = {
  id: 'V-2026-W13-02',
  template: 'FeatureFlash',
  platforms: ['reel', 'tiktok'],
  pillar: 'problem-solution',
  durationSeconds: 25,

  hook: {
    text: 'Vos prospects disparaissent dans un tableur ?',
    accentWord: 'disparaissent',
  },

  feature: {
    screenshot: 'screenshots/pipeline.png',
    moduleName: 'Pipeline',
    description: 'Kanban visuel, drag-and-drop, valeur estimee',
    zoom: {
      x: 200,
      y: 100,
      width: 800,
      height: 600,
    },
  },

  cta: {
    text: 'Lien en bio',
    url: 'neurolia.fr',
  },

  audio: {
    voiceover: 'audio/voiceover/V-2026-W13-02.mp3',
    music: 'audio/music/tech-ambient-01.mp3',
    musicVolume: 0.12,
  },
};
