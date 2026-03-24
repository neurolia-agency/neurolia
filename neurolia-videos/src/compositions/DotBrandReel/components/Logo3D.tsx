import React, { useMemo } from 'react';
import { AbsoluteFill, interpolate } from 'remotion';
import { LOGO_PATHS, LOGO_SVG, C } from '../constants';

type LetterKey = 'N' | 'e' | 'u' | 'r' | 'oRing' | 'l' | 'i' | 'a';

interface Logo3DProps {
  /** X position — aligns to the O center on the 1080x1920 canvas */
  x: number;
  /** Y position — aligns to the O center on the 1080x1920 canvas */
  y: number;
  /** Global scale multiplier (default 1, yielding ~500px wide) */
  scale?: number;
  /**
   * Additional scale applied to the logo during 3D scenes.
   * Use 1.5 during scene 4b to make the extruded logo more imposing.
   */
  logoScale?: number;
  /** Surface fill color */
  fillColor?: string;
  /** 3D rotation around X axis in degrees */
  rotateX?: number;
  /** 3D rotation around Y axis in degrees */
  rotateY?: number;
  /** 3D rotation around Z axis in degrees */
  rotateZ?: number;
  /** Edge glow opacity (0-1) — multi-color iridescent edge lighting */
  edgeOpacity?: number;
  /** Number of extrusion layers behind the surface (default 10) */
  extrusionDepth?: number;
  /** Whether to render the iridescent multi-color edge strokes */
  showEdgeGlow?: boolean;
  /** Vitrification intensity (0-1). Activates holographic gradient on surface. */
  vitrification?: number;
  /** Current frame — needed for animating the holographic gradient. */
  frame?: number;
}

/**
 * Extrusion layer colors, from deepest (farthest) to shallowest (closest to surface).
 * 10 layers with a rich progressive gradient from near-black to warm terracotta.
 */
const EXTRUSION_COLORS = [
  '#0A0503',
  '#1A0A05',
  '#2D1510',
  '#401F1A',
  '#5A2A1A',
  '#6B3520',
  '#7D4030',
  '#8B4A38',
  '#9A5540',
  '#A86048',
] as const;

/** SVG letter paths (excluding the O dot, handled separately by LogoDot). */
const LETTER_ENTRIES: { key: LetterKey; d: string }[] = [
  { key: 'N', d: LOGO_PATHS.N },
  { key: 'e', d: LOGO_PATHS.e },
  { key: 'u', d: LOGO_PATHS.u },
  { key: 'r', d: LOGO_PATHS.r },
  { key: 'oRing', d: LOGO_PATHS.oRing },
  { key: 'l', d: LOGO_PATHS.l },
  { key: 'i', d: LOGO_PATHS.i },
  { key: 'a', d: LOGO_PATHS.a },
];

/** Canvas pixels of offset per extrusion step. */
const PX_PER_LAYER = 6;

/**
 * Simulated 3D extruded logo.
 *
 * Technique:
 * - Outer container applies `perspective(1000px)` + `rotateX/Y/Z`
 * - 10 copies of the SVG logo stacked behind the surface, each offset by
 *   6 canvas-px in x/y (~0.86 SVG units at default scale)
 * - Extrusion layers use dark-to-warm terracotta gradient (deepest = darkest)
 * - Surface layer sits on top with the main `fillColor` + subtle vertical gradient
 * - Luminous terracotta edge strokes: thick primary + thin white highlight
 * - Optional `logoScale` prop to enlarge the logo during 3D showcase scenes
 *
 * The O dot is NOT rendered here — it is managed independently by LogoDot.
 */
export const Logo3D: React.FC<Logo3DProps> = ({
  x,
  y,
  scale: scaleProp = 1,
  logoScale = 1,
  fillColor = '#F5F5F5',
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  edgeOpacity = 0,
  extrusionDepth = 10,
  showEdgeGlow = false,
  vitrification = 0,
  frame = 0,
}) => {
  const renderScale = scaleProp * LOGO_SVG.scale * logoScale;
  const svgW = LOGO_SVG.viewBoxWidth * renderScale;
  const svgH = LOGO_SVG.viewBoxHeight * renderScale;

  // Position so O center maps to (x, y)
  const offsetX = x - LOGO_SVG.oDotCx * renderScale;
  const offsetY = y - LOGO_SVG.oDotCy * renderScale;

  // Unique IDs for SVG gradients and filters
  const uid = useMemo(() => Math.random().toString(36).slice(2, 8), []);
  const gradientId = `logo3d-grad-${uid}`;
  const holoGradientId = `logo3d-holo-${uid}`;
  const edgeAmberFilterId = `logo3d-edge-amber-${uid}`;
  const edgeRoseFilterId = `logo3d-edge-rose-${uid}`;
  const edgeGoldFilterId = `logo3d-edge-gold-${uid}`;

  // Holographic gradient rotation driven by frame
  const holoAngle = interpolate(frame, [0, 120], [0, 360], {
    extrapolateRight: 'extend',
  });

  // Surface opacity reduces as vitrification increases
  const surfaceOpacity = vitrification > 0 ? 1 - vitrification * 0.4 : 1;

  // Build extrusion layers array: deepest first, each offset by PX_PER_LAYER canvas-px more
  const extrusionLayers = useMemo(() => {
    const layers: { offsetX: number; offsetY: number; color: string }[] = [];
    const layerCount = Math.min(extrusionDepth, EXTRUSION_COLORS.length);
    for (let i = 0; i < layerCount; i++) {
      const colorIdx = Math.min(i, EXTRUSION_COLORS.length - 1);
      // Offset in SVG coordinates: PX_PER_LAYER canvas-px / renderScale
      const pxOffset = (layerCount - i) * (PX_PER_LAYER / renderScale);
      layers.push({
        offsetX: pxOffset,
        offsetY: pxOffset,
        color: EXTRUSION_COLORS[colorIdx],
      });
    }
    return layers;
  }, [extrusionDepth, renderScale]);

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <div
        style={{
          position: 'absolute',
          left: offsetX,
          top: offsetY,
          width: svgW,
          height: svgH,
          perspective: '1000px',
        }}
      >
        <div
          style={{
            width: svgW,
            height: svgH,
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
            transformOrigin: 'center center',
            transformStyle: 'preserve-3d',
            position: 'relative',
          }}
        >
          {/* ---- Extrusion layers (back to front) ---- */}
          {extrusionLayers.map((layer, idx) => (
            <svg
              key={`ext-${idx}`}
              width={svgW}
              height={svgH}
              viewBox={`0 0 ${LOGO_SVG.viewBoxWidth} ${LOGO_SVG.viewBoxHeight}`}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                overflow: 'visible',
              }}
            >
              <g transform={`translate(${layer.offsetX}, ${layer.offsetY})`}>
                {LETTER_ENTRIES.map(({ key, d }) => (
                  <path key={key} d={d} fill={layer.color} />
                ))}
              </g>
            </svg>
          ))}

          {/* ---- Surface layer (top) ---- */}
          <svg
            width={svgW}
            height={svgH}
            viewBox={`0 0 ${LOGO_SVG.viewBoxWidth} ${LOGO_SVG.viewBoxHeight}`}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              overflow: 'visible',
            }}
          >
            <defs>
              {/* Subtle vertical gradient: lighter at top, darker at bottom */}
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={fillColor} stopOpacity={surfaceOpacity} />
                <stop
                  offset="100%"
                  stopColor={fillColor}
                  stopOpacity={surfaceOpacity * 0.75}
                />
              </linearGradient>

              {/* Holographic animated gradient (active when vitrification > 0) */}
              <linearGradient
                id={holoGradientId}
                x1="0" y1="0" x2="1" y2="1"
                gradientTransform={`rotate(${holoAngle}, 0.5, 0.5)`}
              >
                <stop offset="0%" stopColor={C.holoRose} stopOpacity={0.8} />
                <stop offset="33%" stopColor={C.holoCyan} stopOpacity={0.7} />
                <stop offset="66%" stopColor={C.holoGold} stopOpacity={0.8} />
                <stop offset="100%" stopColor={C.holoWhite} stopOpacity={0.6} />
              </linearGradient>

              {/* Glow filters for each edge color */}
              <filter id={edgeAmberFilterId} x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="0" stdDeviation={`${6 / renderScale}`} floodColor={C.edgeAmber} floodOpacity="0.6" />
              </filter>
              <filter id={edgeRoseFilterId} x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="0" stdDeviation={`${6 / renderScale}`} floodColor={C.edgeRose} floodOpacity="0.5" />
              </filter>
              <filter id={edgeGoldFilterId} x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="0" stdDeviation={`${6 / renderScale}`} floodColor={C.edgeGold} floodOpacity="0.5" />
              </filter>
            </defs>

            {/* Filled surface paths */}
            {LETTER_ENTRIES.map(({ key, d }) => (
              <path key={`surf-${key}`} d={d} fill={`url(#${gradientId})`} />
            ))}

            {/* Holographic overlay (visible when vitrification > 0) */}
            {vitrification > 0 &&
              LETTER_ENTRIES.map(({ key, d }) => (
                <path
                  key={`holo-${key}`}
                  d={d}
                  fill={`url(#${holoGradientId})`}
                  style={{ opacity: vitrification * 0.6 }}
                />
              ))}

            {/* ---- Iridescent multi-color edge strokes ---- */}
            {/* Stroke 1: Amber — dasharray "20 40" offset 0 */}
            {showEdgeGlow &&
              LETTER_ENTRIES.map(({ key, d }) => (
                <path
                  key={`edge-amber-${key}`}
                  d={d}
                  fill="none"
                  stroke={C.edgeAmber}
                  strokeWidth={2.5 / renderScale}
                  strokeDasharray="20 40"
                  strokeDashoffset="0"
                  filter={`url(#${edgeAmberFilterId})`}
                  style={{ opacity: edgeOpacity }}
                />
              ))}

            {/* Stroke 2: Rose — dasharray "20 40" offset 20 */}
            {showEdgeGlow &&
              LETTER_ENTRIES.map(({ key, d }) => (
                <path
                  key={`edge-rose-${key}`}
                  d={d}
                  fill="none"
                  stroke={C.edgeRose}
                  strokeWidth={2.5 / renderScale}
                  strokeDasharray="20 40"
                  strokeDashoffset="20"
                  filter={`url(#${edgeRoseFilterId})`}
                  style={{ opacity: edgeOpacity }}
                />
              ))}

            {/* Stroke 3: Gold — dasharray "20 40" offset 40 */}
            {showEdgeGlow &&
              LETTER_ENTRIES.map(({ key, d }) => (
                <path
                  key={`edge-gold-${key}`}
                  d={d}
                  fill="none"
                  stroke={C.edgeGold}
                  strokeWidth={2.5 / renderScale}
                  strokeDasharray="20 40"
                  strokeDashoffset="40"
                  filter={`url(#${edgeGoldFilterId})`}
                  style={{ opacity: edgeOpacity }}
                />
              ))}

            {/* Thin white highlight stroke — specular simulation */}
            {showEdgeGlow &&
              LETTER_ENTRIES.map(({ key, d }) => (
                <path
                  key={`highlight-${key}`}
                  d={d}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.3)"
                  strokeWidth={0.5 / renderScale}
                  style={{ opacity: edgeOpacity }}
                />
              ))}
          </svg>
        </div>
      </div>
    </AbsoluteFill>
  );
};
