import { colors } from '../../styles/neurolia-tokens';

// ============================================
// COMPOSITION
// ============================================

export const COMP = {
  width: 1080,
  height: 1920,
  fps: 30,
  durationInFrames: 1188,
  cx: 540,
  cy: 960,
} as const;

// ============================================
// BPM GRID — 150 BPM at 30fps
// ============================================

export const BPM = 150;
export const BEAT = 12;
export const HALF_BEAT = 6;

// ============================================
// SCENE TIMINGS
// ============================================

export const SCENES = {
  dotBirth:     { from: 0,   duration: 132 },  // 11 beats — fall + 1s pause + inflate + deflate
  construction: { from: 132, duration: 264 },  // 22 beats — N build (17) + eurolia slides + assemble (5)
  build3D:      { from: 396, duration: 216 },  // 18 beats — extrusion + edges + vitrification
  explore3D:    { from: 612, duration: 96  },  // 8 beats
  alternations: { from: 708, duration: 96  },  // 8 beats
  palette:      { from: 804, duration: 72  },  // 6 beats
  services:     { from: 876, duration: 144 },  // 12 beats
  tagline:      { from: 1020, duration: 72 },  // 6 beats
  instagram:    { from: 1092, duration: 96 },  // 8 beats
} as const;

// ============================================
// LETTER TYPES
// ============================================

export type LetterKey = 'N' | 'e' | 'u' | 'r' | 'oRing' | 'l' | 'i' | 'a';
export const LETTER_KEYS: LetterKey[] = ['N', 'e', 'u', 'r', 'oRing', 'l', 'i', 'a'];

// ============================================
// CONSTRUCTION — N BUILD + EUROLIA SLIDES
// ============================================

// Phase 1: N construction (beats 0-16, frames 0-204, 6.8s)
// The dot LEAVES the screen to fetch each piece, RETURNS with it, places it
export const N_BUILD = {
  duration: 204, // 17 beats
  phases: {
    // Beat 0-1: Dot leaves screen LEFT to fetch bar1
    fetchBar1: { startBeat: 0, endBeat: 1 },
    // Beat 2-3: Dot returns with bar1, deposits it at center
    placeBar1: { startBeat: 2, endBeat: 3 },
    // Beat 4: Dot adjusts bar1 (size, position). Guides appear.
    adjustBar1: { startBeat: 4, endBeat: 4 },
    // Beat 5-6: Dot leaves screen TOP-RIGHT to fetch diagonal
    fetchDiag: { startBeat: 5, endBeat: 6 },
    // Beat 7-8: Dot returns tracing the diagonal behind it
    placeDiag: { startBeat: 7, endBeat: 8 },
    // Beat 9: Diagonal connects to bar1
    connectDiag: { startBeat: 9, endBeat: 9 },
    // Beat 10-11: Dot leaves screen RIGHT to fetch bar2
    fetchBar2: { startBeat: 10, endBeat: 11 },
    // Beat 12: Dot returns with bar2, positions it
    placeBar2: { startBeat: 12, endBeat: 12 },
    // Beat 13-14: The 3 pieces merge into the final N path
    merge: { startBeat: 13, endBeat: 14 },
    // Beat 15-16: N finalizes (white). Hold.
    finalize: { startBeat: 15, endBeat: 16 },
  },
} as const;

// Phase 2: eurolia letters slide in (beats 17-19, frames 204-240)
export const EUROLIA_SLIDES = {
  startBeat: 17,
  letters: [
    { key: 'e' as LetterKey, fromEdge: 'top' as const, delay: 0 },
    { key: 'u' as LetterKey, fromEdge: 'right' as const, delay: 3 },
    { key: 'r' as LetterKey, fromEdge: 'bottom' as const, delay: 6 },
    { key: 'oRing' as LetterKey, fromEdge: 'left' as const, delay: 9 },
    { key: 'l' as LetterKey, fromEdge: 'top' as const, delay: 12 },
    { key: 'i' as LetterKey, fromEdge: 'right' as const, delay: 15 },
    { key: 'a' as LetterKey, fromEdge: 'bottom' as const, delay: 18 },
  ],
} as const;

// Phase 3: N joins eurolia (beats 20-21, frames 240-264)
export const N_JOIN = {
  startBeat: 20,
  duration: 24, // 2 beats
} as const;

// ============================================
// BUILD 3D — Extrusion + Edges + Vitrification
// ============================================

export const BUILD_3D = {
  // Beat 0: Dot rises above logo (anticipation)
  dotRise: { startBeat: 0, endBeat: 0 },
  // Beat 1-2: Dot exits screen top (goes to fetch 3D "tool")
  dotFetch: { startBeat: 1, endBeat: 2 },
  // Beat 3: Dot returns with terracotta halo — changed mode
  dotReturn: { startBeat: 3, endBeat: 3 },
  // Beat 4-5: Pass 1 — dot traverses N, e, u → extrusion appears
  extrusionPass1: { startBeat: 4, endBeat: 5, letters: ['N', 'e', 'u'] as LetterKey[] },
  // Beat 6-7: Pass 1 continued — r, oRing, l, i, a
  extrusionPass2: { startBeat: 6, endBeat: 7, letters: ['r', 'oRing', 'l', 'i', 'a'] as LetterKey[] },
  // Beat 8: Pause — viewer sees monochrome 3D logo
  pause: { startBeat: 8, endBeat: 8 },
  // Beat 9-10: Pass 2 reverse — dot goes a→i→l→o→r, adding iridescent edges
  edgesPass1: { startBeat: 9, endBeat: 10, letters: ['a', 'i', 'l', 'oRing', 'r'] as LetterKey[] },
  // Beat 11-12: Pass 2 continued — u→e→N, edges complete
  edgesPass2: { startBeat: 11, endBeat: 12, letters: ['u', 'e', 'N'] as LetterKey[] },
  // Beat 13: Dot settles into O
  dotSettle: { startBeat: 13, endBeat: 13 },
  // Beat 14-15: Vitrification progressive
  vitrifyStart: { startBeat: 14, endBeat: 15 },
  // Beat 16-17: Vitrification complete + cinematic hold
  vitrifyComplete: { startBeat: 16, endBeat: 17 },
} as const;

// Final position of each letter in the logo (canvas coords)
export const LETTER_FINAL_POSITIONS: Record<LetterKey, { x: number; y: number }> = {
  N:     { x: 257, y: 912 },
  e:     { x: 346, y: 920 },
  u:     { x: 428, y: 920 },
  r:     { x: 485, y: 916 },
  oRing: { x: 540, y: 919 },
  l:     { x: 594, y: 912 },
  i:     { x: 623, y: 912 },
  a:     { x: 678, y: 920 },
};

// 3D rotation keyframes for exploration (local frames)
export const ROTATION_KEYFRAMES = [
  { localFrame: 0,  rotateY: 45,  rotateX: 0,   rotateZ: 0,   hold: 2 },
  { localFrame: 12, rotateY: -60, rotateX: 25,  rotateZ: 0,   hold: 2 },
  { localFrame: 24, rotateY: 180, rotateX: 0,   rotateZ: 0,   hold: 3 },
  { localFrame: 36, rotateY: 180, rotateX: 90,  rotateZ: 0,   hold: 2 },
  { localFrame: 48, rotateY: -90, rotateX: -30, rotateZ: -15, hold: 2 },
  { localFrame: 60, rotateY: 30,  rotateX: 10,  rotateZ: 5,   hold: 6 },
  { localFrame: 72, rotateY: -20, rotateX: -5,  rotateZ: -3,  hold: 6 },
  { localFrame: 84, rotateY: 0,   rotateX: 0,   rotateZ: 0,   hold: 12 },
] as const;

// Services (from = global frame, aligned to SCENES.services.from)
export const SERVICES = [
  { from: 876,  duration: 36, text: 'Sites web sur-mesure',       fontSize: 120, animationType: 'flipX' as const },
  { from: 912,  duration: 36, text: 'Automatisations',            fontSize: 130, animationType: 'flipY' as const },
  { from: 948,  duration: 36, text: 'IA',                         fontSize: 280, animationType: 'spinZoom' as const },
  { from: 984,  duration: 36, text: 'Accompagnement stratégique', fontSize: 80,  animationType: 'depthRush' as const },
] as const;

// Flips for alternations (local frames on beats)
export const FLIPS = [
  { localFrame: 12, type: 'rotateY' as const },
  { localFrame: 36, type: 'rotateY' as const },
  { localFrame: 60, type: 'rotateX' as const },
  { localFrame: 84, type: 'rotateY' as const },
] as const;

// ============================================
// SPRING CONFIGS
// ============================================

export const SPRINGS = {
  smooth: { damping: 200 },
  snappy: { damping: 20, stiffness: 200 },
  bouncy: { damping: 8 },
  cinematic: { damping: 15, stiffness: 80, mass: 2 },
  dotLand: { damping: 10, stiffness: 300 },
  dotPop: { damping: 12, stiffness: 200 },
  dotPulse: { damping: 8, stiffness: 150 },
  snap: { damping: 8, stiffness: 250 },
  rotationSnap: { damping: 12, stiffness: 150 },
  servicePunch: { damping: 10, stiffness: 150 },
  serviceElastic: { damping: 8, stiffness: 120 },
  serviceHeavy: { damping: 12, stiffness: 80, mass: 1.2 },
  columnDrop: { damping: 10, stiffness: 120 },
  mockupEntrance: { damping: 12, stiffness: 80 },
  buttonClick: { damping: 15, stiffness: 200 },
  // Slide in for eurolia letters
  slideIn: { damping: 12, stiffness: 120 },
} as const;

// ============================================
// COLORS
// ============================================

export const C = {
  ...colors,
  bg: colors.background,
  white: '#FFFFFF',
  grey: '#E8E8E8',
  extrusion: [
    '#0A0503', '#1A0A05', '#2D1510', '#401F1A', '#5A2A1A',
    '#6B3520', '#7D4030', '#8B4A38', '#9A5540', '#A86048',
  ] as readonly string[],
  edgeAmber: '#F0A088',
  edgeRose: '#E8607A',
  edgeGold: '#D4A574',
  edgeHot: '#FFD4B8',
  holoRose: '#FF6B9D',
  holoCyan: '#4ECDC4',
  holoGold: '#FFD93D',
  holoWhite: '#FFFFFF',
  dotDark: '#8B3A20',
  dotMid: colors.primary,
  dotEdge: '#F0A088',
  dotHot: '#FFD4B8',
  igBlue: '#0095F6',
  igGrey: '#363636',
  igTextMuted: 'rgba(255,255,255,0.5)',
  igLinkBlue: '#5B7FFF',
  gridLine: 'rgba(136, 146, 176, 0.18)',
  gridAxis: 'rgba(136, 146, 176, 0.35)',
  guideLine: 'rgba(245, 245, 245, 0.4)',
} as const;

// ============================================
// LOGO SVG PATHS
// ============================================

export const LOGO_PATHS = {
  N: 'M7.78,6.66c.47.7.78,1.22,1.17,1.94-.06-.75-.1-1.5-.1-2.41v-3.71c0-1.07-.03-1.73-.13-2.47h3.47c-.1.73-.13,1.42-.13,2.47v8.65c0,.99.05,1.74.13,2.43h-3.57c-.29-.62-.67-1.22-1.22-2.07l-3.01-4.54c-.44-.65-.72-1.14-1.17-2,.08.73.11,1.63.11,2.43v3.65c0,1.12.03,1.84.13,2.54H0c.1-.63.13-1.35.13-2.56V2.43C.13,1.48.1.75,0,0h3.53c.16.44.52,1.09,1.16,2.04l3.09,4.62Z',
  e: 'M15.99,9.49c.16,1.32.93,2.02,2.21,2.02.65,0,1.22-.21,1.64-.6.24-.23.36-.41.49-.83l2.83.8c-.37.85-.62,1.22-1.07,1.68-.93.91-2.23,1.38-3.84,1.38s-2.85-.46-3.78-1.38c-.96-.98-1.48-2.36-1.48-3.97,0-3.22,2.07-5.36,5.18-5.36,2.54,0,4.31,1.38,4.88,3.81.13.52.2,1.21.24,2.13,0,.07,0,.16.02.33h-7.33ZM20.22,7.25c-.23-1.04-.93-1.6-2.05-1.6s-1.86.52-2.13,1.6h4.18Z',
  u: 'M34.37,3.61c-.1.77-.13,1.45-.13,2.44v5.03c0,1.12.03,1.79.13,2.44h-3.24v-.7c0-.08,0-.33.02-.44-1.07,1.01-2,1.4-3.39,1.4-1.09,0-1.97-.31-2.59-.91-.65-.65-.93-1.45-.93-2.74v-4.09c0-.94-.05-1.76-.13-2.44h3.39c-.1.78-.13,1.46-.13,2.44v3.34c0,.67.06.96.26,1.22.23.29.59.46,1.06.46.9,0,1.81-.64,2.44-1.68v-3.34c0-.91-.03-1.6-.13-2.44h3.37Z',
  r: 'M38.91,7.11c.36-.45.81-.72,1.37-.83.45-1.15,1.23-2.14,2.24-2.82-.29-.04-.54-.05-.84-.05-1.48,0-2.46.44-3.26,1.48v-1.29h-3.25c.1.7.13,1.27.13,2.46v5.02c0,1.06-.03,1.65-.13,2.46h3.38c-.1-.78-.13-1.4-.13-2.45v-2.54c.07-.72.18-1.06.49-1.45Z',
  oRing: 'M45.91,3.35c-2.82,0-5.11,2.29-5.11,5.11s2.29,5.11,5.11,5.11,5.11-2.29,5.11-5.11-2.29-5.11-5.11-5.11ZM45.91,11.14c-1.48,0-2.69-1.2-2.69-2.69s1.2-2.69,2.69-2.69,2.69,1.2,2.69,2.69-1.2,2.69-2.69,2.69Z',
  oDot: { cx: 45.91, cy: 8.46, r: 1.66 },
  l: 'M55.22,0c-.1.68-.13,1.35-.13,2.46v8.63c0,.98.03,1.6.13,2.46h-3.4c.1-.73.13-1.29.13-2.46V2.46c0-1.16-.03-1.84-.13-2.46h3.4Z',
  i: 'M59.42,3.61c-.1.67-.13,1.32-.13,2.46v5.01c0,.88.05,1.76.13,2.46h-3.4c.1-.8.13-1.42.13-2.46v-5.01c0-1.06-.03-1.73-.13-2.46h3.4ZM59.37,0v2.44h-3.3V0h3.3Z',
  a: 'M70.93,5.95c0-1.14.03-1.79.13-2.46h-3.4c.02.15.04.3.05.44-.71-.38-1.52-.61-2.38-.61-2.82,0-5.11,2.29-5.11,5.11s2.29,5.11,5.11,5.11c.87,0,1.67-.24,2.38-.61-.02.16-.03.32-.05.49h3.4c-.08-.7-.13-1.58-.13-2.46v-5.01ZM65.49,11.1c-1.47,0-2.67-1.19-2.67-2.67s1.19-2.67,2.67-2.67,2.67,1.19,2.67,2.67-1.19,2.67-2.67,2.67Z',
} as const;

export const LOGO_SVG = {
  viewBoxWidth: 71.06,
  viewBoxHeight: 13.57,
  scale: 7,
  oDotCx: 45.91,
  oDotCy: 8.46,
  wordCenterX: 35.53,
} as const;

// ============================================
// AUDIO MAP
// ============================================

export const SFX = [
  // Scene 1 — Dot birth (from 0, 132 frames)
  // Fall: beat 0-2, Pause: beat 2-5, Inflate: beat 5-7, Deflate: beat 7-11
  { frame: 3,    file: 'impact-soft.mp3', volume: 0.5 },    // dot appears
  { frame: 12,   file: 'impact-medium.wav', volume: 0.6 },  // dot lands
  { frame: 60,   file: 'inflate.mp3', volume: 0.7 },        // inflate on beat 5
  { frame: 84,   file: 'deflate.mp3', volume: 0.6 },        // deflate on beat 7

  // Scene 2 — Construction (from 132, 264 frames)
  { frame: 132,  file: 'woosh-soft.wav', volume: 0.5 },     // dot leaves to fetch bar1
  { frame: 156,  file: 'impact-soft.mp3', volume: 0.5 },    // dot returns with bar1
  { frame: 192,  file: 'woosh-soft.wav', volume: 0.5 },     // dot leaves to fetch diagonal
  { frame: 216,  file: 'impact-soft.mp3', volume: 0.5 },    // dot returns tracing diagonal
  { frame: 252,  file: 'woosh-soft.wav', volume: 0.5 },     // dot leaves to fetch bar2
  { frame: 276,  file: 'impact-soft.mp3', volume: 0.5 },    // dot returns with bar2
  { frame: 288,  file: 'impact-medium.wav', volume: 0.6 },  // merge begins
  { frame: 312,  file: 'impact-lock.wav', volume: 0.7 },    // N finalized
  // eurolia slides (from beat 17 = frame 132 + 17*12 = 336)
  { frame: 336,  file: 'woosh-micro.mp3', volume: 0.3 },
  { frame: 339,  file: 'woosh-micro.mp3', volume: 0.3 },
  { frame: 342,  file: 'woosh-micro.mp3', volume: 0.3 },
  { frame: 345,  file: 'woosh-micro.mp3', volume: 0.3 },
  { frame: 348,  file: 'woosh-micro.mp3', volume: 0.3 },
  { frame: 351,  file: 'woosh-micro.mp3', volume: 0.3 },
  { frame: 354,  file: 'woosh-micro.mp3', volume: 0.3 },
  // N joins (from beat 20 = frame 132 + 20*12 = 372)
  { frame: 372,  file: 'sub-drop.mp3', volume: 0.7 },
  { frame: 390,  file: 'impact-lock.wav', volume: 0.7 },

  // Scene 3 — Build 3D (from 396, 216 frames)
  { frame: 396,  file: 'woosh-soft.wav', volume: 0.4 },     // dot rises
  { frame: 420,  file: 'woosh-soft.wav', volume: 0.5 },     // dot leaves to fetch
  { frame: 432,  file: 'impact-soft.mp3', volume: 0.5 },    // dot returns
  { frame: 444,  file: 'impact-medium.wav', volume: 0.5 },  // extrusion pass 1
  { frame: 468,  file: 'impact-medium.wav', volume: 0.5 },  // extrusion pass 2
  { frame: 492,  file: 'woosh-glass.wav', volume: 0.4 },    // pause
  { frame: 504,  file: 'woosh-micro.mp3', volume: 0.4 },    // edges pass reverse
  { frame: 528,  file: 'woosh-micro.mp3', volume: 0.4 },    // edges complete
  { frame: 552,  file: 'impact-soft.mp3', volume: 0.4 },    // dot settles
  { frame: 564,  file: 'woosh-glass.wav', volume: 0.6 },    // vitrification starts
  { frame: 588,  file: 'sub-drop.mp3', volume: 0.5 },       // vitrification complete

  // Scene 4 — Exploration (from 612, 96 frames)
  ...Array.from({ length: 8 }, (_, i) => ({
    frame: 612 + i * BEAT,
    file: 'woosh-micro.mp3' as string,
    volume: 0.3,
  })),

  // Scene 5 — Alternations (from 708, 96 frames)
  { frame: 708 + 1 * BEAT, file: 'flip-hit-1.mp3', volume: 0.7 },
  { frame: 708 + 3 * BEAT, file: 'flip-hit-2.mp3', volume: 0.7 },
  { frame: 708 + 5 * BEAT, file: 'flip-hit-3.mp3', volume: 0.7 },
  { frame: 708 + 7 * BEAT, file: 'flip-hit-1.mp3', volume: 0.7 },

  // Scene 6 — Palette (from 804, 72 frames)
  ...Array.from({ length: 4 }, (_, i) => ({
    frame: 804 + i * HALF_BEAT,
    file: 'col-hit.wav' as string,
    volume: 0.5,
  })),

  // Scene 7 — Services (from 876, 144 frames)
  { frame: 876, file: 'service-hit-1.wav', volume: 0.7 },
  { frame: 912, file: 'service-hit-2.wav', volume: 0.7 },
  { frame: 948, file: 'service-hit-3.wav', volume: 0.8 },
  { frame: 984, file: 'service-hit-4.wav', volume: 0.7 },

  // Scene 8 — Tagline (from 1020, 72 frames)
  { frame: 1020 + BEAT, file: 'atmo-open.wav', volume: 0.4 },
  { frame: 1020 + 3 * BEAT, file: 'dot-pop.mp3', volume: 0.5 },

  // Scene 9 — Instagram (from 1092, 96 frames)
  { frame: 1092, file: 'woosh-3D.mp3', volume: 0.6 },
  { frame: 1092 + 7 * BEAT, file: 'ui-click.mp3', volume: 0.6 },
  { frame: 1092 + 7 * BEAT + 3, file: 'ui-confirm.mp3', volume: 0.5 },
] as const;
