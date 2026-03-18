/**
 * Video Pipeline Data Types
 *
 * Videos are DATA, not code. Each video = 1 config file → template → multi-format render.
 */

import { z } from 'zod';

// ============================================
// ENUMS & CONSTANTS
// ============================================

export const VIDEO_TEMPLATES = [
  'FeatureFlash',
  'DashboardTour',
  'BeforeAfter',
  'StatReveal',
  'BuildLog',
  'QuickTip',
  'ModuleDeepDive',
  'WorkflowDemo',
] as const;

export const PLATFORMS = [
  'reel',       // Instagram Reels (1080x1920)
  'tiktok',     // TikTok (1080x1920)
  'youtube-short', // YouTube Shorts (1080x1920)
  'youtube-long',  // YouTube (1920x1080)
] as const;

export const CONTENT_PILLARS = [
  'product-showcase',
  'problem-solution',
  'behind-the-build',
  'tips-value',
  'social-proof',
] as const;

export type VideoTemplate = typeof VIDEO_TEMPLATES[number];
export type Platform = typeof PLATFORMS[number];
export type ContentPillar = typeof CONTENT_PILLARS[number];

// ============================================
// SCENE CONFIGURATION
// ============================================

export interface TextElement {
  text: string;
  fontSize: number;
  fontWeight?: number;
  color?: string;
  /** Frame delay relative to scene start */
  delay: number;
  /** Frames between each letter animation */
  staggerDelay?: number;
  /** Word to highlight in accent color */
  accentWord?: string;
}

export interface ScreenshotElement {
  /** Path relative to public/ */
  src: string;
  /** Zoom target area */
  zoom?: {
    x: number;
    y: number;
    width: number;
    height: number;
    /** Frame to start zoom */
    startFrame: number;
    /** Zoom duration in frames */
    duration: number;
  };
}

export interface SpringConfig {
  damping: number;
  stiffness?: number;
  mass?: number;
}

export interface TransitionConfig {
  type: 'fade' | 'slide-from-bottom' | 'slide-from-right' | 'slide-from-left' | 'wipe' | 'zoom-in' | 'none';
  /** Duration in frames */
  duration: number;
}

export interface SceneConfig {
  /** Scene identifier */
  id: string;
  /** Display name */
  name: string;
  /** Duration in frames (at 30fps) */
  durationInFrames: number;
  /** Background type */
  background: {
    type: 'animated' | 'solid' | 'gradient' | 'screenshot';
    intensity?: number;
    color?: string;
  };
  /** Text elements in this scene */
  texts?: TextElement[];
  /** Screenshot to display */
  screenshot?: ScreenshotElement;
  /** Voiceover text for this scene (for caption sync) */
  voiceover?: string;
  /** Caption text displayed on screen */
  caption?: {
    text: string;
    accentWord?: string;
  };
  /** Transition to next scene */
  transition?: TransitionConfig;
}

// ============================================
// VIDEO CONFIGURATION
// ============================================

export interface AudioConfig {
  /** Path to voiceover MP3 relative to public/ */
  voiceover?: string;
  /** Path to background music relative to public/ */
  music?: string;
  /** Music volume (0-1, default 0.15) */
  musicVolume?: number;
}

export interface HookConfig {
  /** Main hook text */
  text: string;
  /** Word to highlight in accent color */
  accentWord?: string;
  /** Font size override */
  fontSize?: number;
}

export interface CTAConfig {
  /** CTA text */
  text: string;
  /** URL displayed below CTA */
  url?: string;
  /** Show logo above CTA */
  showLogo?: boolean;
}

/** Base configuration shared by all video types */
export interface BaseVideoConfig {
  /** Unique video identifier: V-YYYY-WXX-NN */
  id: string;
  /** Template to use */
  template: VideoTemplate;
  /** Target platforms for rendering */
  platforms: Platform[];
  /** Content pillar */
  pillar: ContentPillar;
  /** Hook configuration */
  hook: HookConfig;
  /** CTA configuration */
  cta: CTAConfig;
  /** Audio configuration */
  audio?: AudioConfig;
  /** Total duration in seconds (will be converted to frames) */
  durationSeconds: number;
}

// ============================================
// TEMPLATE-SPECIFIC CONFIGS
// ============================================

/** FeatureFlash: 15-30s, Hook → Feature → CTA */
export interface FeatureFlashConfig extends BaseVideoConfig {
  template: 'FeatureFlash';
  feature: {
    /** Screenshot of the feature */
    screenshot: string;
    /** Module name for label */
    moduleName: string;
    /** Zoom target on screenshot */
    zoom?: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
    /** Description text shown below screenshot */
    description?: string;
  };
}

/** StatReveal: 15-20s, Hook → Number animation → Context */
export interface StatRevealConfig extends BaseVideoConfig {
  template: 'StatReveal';
  stat: {
    /** Number to animate to */
    value: number;
    /** Prefix (e.g., "+" or "") */
    prefix?: string;
    /** Suffix (e.g., "%", "modules", "€") */
    suffix: string;
    /** Context text below the number */
    context: string;
  };
}

/** BeforeAfter: 20-30s, Split screen comparison */
export interface BeforeAfterConfig extends BaseVideoConfig {
  template: 'BeforeAfter';
  before: {
    /** Label for "before" side */
    label: string;
    /** Screenshot or description */
    screenshot?: string;
    /** Icon/emoji for visual */
    icon?: string;
    /** Pain points list */
    points?: string[];
  };
  after: {
    /** Label for "after" side */
    label: string;
    /** Dashboard screenshot */
    screenshot: string;
    /** Benefits list */
    points?: string[];
  };
}

/** DashboardTour: 30-60s, Cinematic pan through modules */
export interface DashboardTourConfig extends BaseVideoConfig {
  template: 'DashboardTour';
  modules: Array<{
    name: string;
    screenshot: string;
    /** One-line description */
    tagline: string;
    /** Duration for this module in frames */
    durationInFrames?: number;
  }>;
}

/** BuildLog: 30-45s, Code → UI transformation */
export interface BuildLogConfig extends BaseVideoConfig {
  template: 'BuildLog';
  steps: Array<{
    /** Label for this build step */
    label: string;
    /** Code snippet or screenshot */
    content: string;
    /** Type of content */
    type: 'code' | 'terminal' | 'screenshot';
  }>;
}

/** QuickTip: 20-30s, Business tip with dashboard visual */
export interface QuickTipConfig extends BaseVideoConfig {
  template: 'QuickTip';
  tip: {
    /** Numbered steps */
    steps: string[];
    /** Supporting screenshot */
    screenshot?: string;
  };
}

/** ModuleDeepDive: 2-5min, Full module walkthrough */
export interface ModuleDeepDiveConfig extends BaseVideoConfig {
  template: 'ModuleDeepDive';
  sections: Array<{
    title: string;
    screenshot: string;
    description: string;
    /** Features to highlight */
    features?: string[];
    durationSeconds: number;
  }>;
}

/** WorkflowDemo: 3-8min, End-to-end scenario */
export interface WorkflowDemoConfig extends BaseVideoConfig {
  template: 'WorkflowDemo';
  scenario: {
    title: string;
    description: string;
  };
  steps: Array<{
    title: string;
    screenshot: string;
    action: string;
    durationSeconds: number;
  }>;
}

/** Union type for all video configs */
export type VideoConfig =
  | FeatureFlashConfig
  | StatRevealConfig
  | BeforeAfterConfig
  | DashboardTourConfig
  | BuildLogConfig
  | QuickTipConfig
  | ModuleDeepDiveConfig
  | WorkflowDemoConfig;

// ============================================
// CAPTION TYPES
// ============================================

export interface CaptionEntry {
  /** Start time in seconds */
  start: number;
  /** End time in seconds */
  end: number;
  /** Caption text */
  text: string;
  /** Word to highlight */
  accentWord?: string;
}

export interface CaptionTrack {
  /** Video ID */
  videoId: string;
  /** Language */
  language: 'fr';
  /** Caption entries */
  entries: CaptionEntry[];
}

// ============================================
// ZOD SCHEMAS (for Remotion props validation)
// ============================================

export const platformSchema = z.enum(['reel', 'tiktok', 'youtube-short', 'youtube-long']);

export const featureFlashSchema = z.object({
  videoId: z.string(),
  platform: platformSchema,
  hook: z.object({
    text: z.string(),
    accentWord: z.string().optional(),
  }),
  feature: z.object({
    screenshot: z.string(),
    moduleName: z.string(),
    zoom: z.object({
      x: z.number(),
      y: z.number(),
      width: z.number(),
      height: z.number(),
    }).optional(),
    description: z.string().optional(),
  }),
  cta: z.object({
    text: z.string(),
    url: z.string().optional(),
  }),
  audio: z.object({
    voiceover: z.string().optional(),
    music: z.string().optional(),
    musicVolume: z.number().optional(),
  }).optional(),
  durationSeconds: z.number().default(25),
});

export const statRevealSchema = z.object({
  videoId: z.string(),
  platform: platformSchema,
  hook: z.object({
    text: z.string(),
    accentWord: z.string().optional(),
  }),
  stat: z.object({
    value: z.number(),
    prefix: z.string().optional(),
    suffix: z.string(),
    context: z.string(),
  }),
  cta: z.object({
    text: z.string(),
    url: z.string().optional(),
  }),
  audio: z.object({
    voiceover: z.string().optional(),
    music: z.string().optional(),
    musicVolume: z.number().optional(),
  }).optional(),
  durationSeconds: z.number().default(18),
});

export type FeatureFlashProps = z.infer<typeof featureFlashSchema>;
export type StatRevealProps = z.infer<typeof statRevealSchema>;
