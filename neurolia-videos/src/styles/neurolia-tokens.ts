/**
 * Neurolia Design Tokens for Remotion Videos
 * Source: ../Neurolia/app/globals.css
 *
 * Usage in compositions:
 * import { colors, typography, animation } from '../styles/neurolia-tokens';
 */

// ============================================
// COLORS - Dark Theme Palette
// ============================================

export const colors = {
  // Backgrounds (4 layers)
  background: '#050810',        // Ultra-dark (primary)
  surface: '#0A0F1A',           // Surface sombre
  surfaceCard: '#111827',       // Cards
  surfaceContrast: '#1A1F2E',   // Contrast sections

  // Text hierarchy
  textPrimary: '#F5F5F5',       // Headings, labels
  textSecondary: '#D4D4D4',     // Body text
  textMuted: '#A3A3A3',         // Secondary text
  textSubtle: '#737373',        // Metadata
  textDisabled: '#525252',      // Disabled, placeholders

  // Terracotta accent (5-10% visibility max)
  primary: '#C45C3B',           // Terracotta base
  primaryLight: '#E07856',      // Terracotta hover
  primaryPale: '#F0A088',       // Terracotta subtle

  // Glow effects (for box-shadow)
  glowTerracotta: 'rgba(196, 92, 59, 0.3)',
  glowTerracottaSubtle: 'rgba(196, 92, 59, 0.15)',

  // Semantic
  success: '#34D399',
  warning: '#FBBF24',
  error: '#F87171',
  info: '#60A5FA',

  // Border
  border: 'rgba(136, 146, 176, 0.15)',
} as const;

// ============================================
// TYPOGRAPHY
// ============================================

export const typography = {
  // Font families
  fontFamily: {
    sans: "'Inter', system-ui, -apple-system, sans-serif",
    display: "'Satoshi', 'Inter', system-ui, sans-serif",
    hero: "'Lexend', sans-serif",
  },

  // Font sizes (in pixels for Remotion)
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,     // Body (never less)
    lg: 20,       // Lead
    h5: 20,
    h4: 28,       // 24-32px
    h3: 36,       // 28-48px
    h2: 56,       // 48-64px
    h1: 84,       // 72-96px (for 1080p)
  },

  // Scaled for different resolutions
  fontSizeScaled: {
    // For 1080x1920 (Reel)
    reel: {
      h1: 84,
      h2: 56,
      h3: 36,
      body: 18,
    },
    // For 1080x1080 (Post)
    post: {
      h1: 72,
      h2: 48,
      h3: 32,
      body: 16,
    },
    // For 1920x1080 (LinkedIn)
    linkedin: {
      h1: 96,
      h2: 64,
      h3: 42,
      body: 20,
    },
  },

  // Font weights
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Line heights
  lineHeight: {
    tight: 0.95,      // H1
    snug: 1.0,        // H2
    normal: 1.1,      // H3
    relaxed: 1.6,     // Body secondary
    loose: 1.75,      // Body primary
  },

  // Letter spacing
  letterSpacing: {
    tighter: '-0.03em',  // H1
    tight: '-0.02em',    // H2
    normal: '0',
    wide: '0.025em',     // Labels
  },
} as const;

// ============================================
// ANIMATION - Neurolia "Respiration"
// ============================================

export const animation = {
  // Duration in frames (at 30fps)
  duration: {
    fast: 6,        // 200ms
    standard: 10,   // 333ms (~300ms)
    slow: 12,       // 400ms
    verySlow: 18,   // 600ms
  },

  // Duration in milliseconds (for reference)
  durationMs: {
    fast: 200,
    standard: 300,
    slow: 400,
    verySlow: 600,
  },

  // Stagger between elements (in frames at 30fps)
  stagger: 2,  // ~60ms per item (max 10 items = 300ms total)

  // Translate values
  translate: {
    hover: -4,      // Standard hover lift
    entrance: 20,   // Scroll reveal entrance
    stagger: {
      small: 40,
      medium: 60,
      large: 80,
    },
  },

  // Easing (use with Remotion's Easing)
  // All animations should use ease-out
  easingType: 'ease-out' as const,
} as const;

// ============================================
// SPACING
// ============================================

export const spacing = {
  // Section spacing
  sectionDesktop: 160,
  sectionMobile: 96,
  sectionMin: 40,
  sectionSmall: 60,
  sectionMedium: 96,

  // Container
  containerMaxWidth: 1440,
  containerPadding: {
    mobile: 24,
    tablet: 40,
    desktop: 80,
  },

  // Component padding
  buttonPadding: { x: 24, y: 12 },
  cardPadding: 40,
} as const;

// ============================================
// VIDEO FORMATS
// ============================================

export const videoFormats = {
  // Social Media
  reel: {
    width: 1080,
    height: 1920,
    fps: 30,
    aspectRatio: '9:16',
    category: 'social' as const,
  },
  post: {
    width: 1080,
    height: 1080,
    fps: 30,
    aspectRatio: '1:1',
    category: 'social' as const,
  },
  linkedin: {
    width: 1920,
    height: 1080,
    fps: 30,
    aspectRatio: '16:9',
    category: 'social' as const,
  },
  tiktok: {
    width: 1080,
    height: 1920,
    fps: 30,
    aspectRatio: '9:16',
    category: 'social' as const,
  },

  // Website - Background videos (looped, no audio)
  heroBackground: {
    width: 1920,
    height: 1080,
    fps: 30,
    aspectRatio: '16:9',
    category: 'website' as const,
    loop: true,
    codec: 'webm' as const, // Better for web backgrounds
  },
  sectionBackground: {
    width: 1920,
    height: 1080,
    fps: 24, // Lower fps for subtle backgrounds
    aspectRatio: '16:9',
    category: 'website' as const,
    loop: true,
    codec: 'webm' as const,
  },

  // Website - Showcase videos (with content)
  showcase: {
    width: 1920,
    height: 1080,
    fps: 30,
    aspectRatio: '16:9',
    category: 'website' as const,
    codec: 'mp4' as const,
  },
  showcasePortrait: {
    width: 1080,
    height: 1350,
    fps: 30,
    aspectRatio: '4:5',
    category: 'website' as const,
    codec: 'mp4' as const,
  },

  // Website - Mobile optimized
  mobileBanner: {
    width: 750,
    height: 1334,
    fps: 30,
    aspectRatio: '9:16',
    category: 'website' as const,
    codec: 'webm' as const,
  },
} as const;

// ============================================
// HELPERS
// ============================================

/**
 * Convert seconds to frames
 */
export const secondsToFrames = (seconds: number, fps: number = 30): number => {
  return Math.round(seconds * fps);
};

/**
 * Convert frames to seconds
 */
export const framesToSeconds = (frames: number, fps: number = 30): number => {
  return frames / fps;
};

/**
 * Get font size scaled for video format
 */
export const getFontSize = (
  level: 'h1' | 'h2' | 'h3' | 'body',
  format: 'reel' | 'post' | 'linkedin' = 'reel'
): number => {
  return typography.fontSizeScaled[format][level];
};

// ============================================
// STYLE PRESETS
// ============================================

export const stylePresets = {
  // H1 style preset
  h1: {
    fontFamily: typography.fontFamily.display,
    fontSize: typography.fontSize.h1,
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.tight,
    letterSpacing: typography.letterSpacing.tighter,
    color: colors.textPrimary,
  },

  // H2 style preset
  h2: {
    fontFamily: typography.fontFamily.display,
    fontSize: typography.fontSize.h2,
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.snug,
    letterSpacing: typography.letterSpacing.tight,
    color: colors.textPrimary,
  },

  // Body style preset
  body: {
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.lineHeight.loose,
    color: colors.textSecondary,
  },

  // Lead text preset
  lead: {
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.normal,
    lineHeight: 1.7,
    color: colors.textSecondary,
  },
} as const;

// ============================================
// SIGNATURE ELEMENTS
// ============================================

export const signature = {
  // Vertical bar (4px terracotta)
  bar: {
    width: 4,
    color: colors.primary,
    borderRadius: 0,
  },

  // Glow effect
  glow: {
    blur: 60,
    color: colors.glowTerracotta,
  },

  glowSubtle: {
    blur: 40,
    color: colors.glowTerracottaSubtle,
  },
} as const;
