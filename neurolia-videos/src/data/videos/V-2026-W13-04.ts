/**
 * Video #4 — Stat Reveal: 12 modules connectes
 *
 * "12 modules. Donnees reelles. Pas de mock."
 * Platforms: IG Reels + TikTok
 */

import type { StatRevealConfig } from '../types';

export const video: StatRevealConfig = {
  id: 'V-2026-W13-04',
  template: 'StatReveal',
  platforms: ['reel', 'tiktok'],
  pillar: 'social-proof',
  durationSeconds: 18,

  hook: {
    text: 'Donnees reelles. Pas de mock.',
    accentWord: 'reelles',
  },

  stat: {
    value: 12,
    suffix: 'modules',
    context: 'Tous connectes. Tous en donnees reelles.',
  },

  cta: {
    text: 'Decouvrez le dashboard',
    url: 'neurolia.fr',
  },

  audio: {
    voiceover: 'audio/voiceover/V-2026-W13-04.mp3',
    music: 'audio/music/tech-ambient-01.mp3',
    musicVolume: 0.10,
  },
};
