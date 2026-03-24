import React, { useMemo } from 'react';
import { AbsoluteFill } from 'remotion';
import { LOGO_PATHS, LOGO_SVG, C } from '../constants';

type LetterKey = 'N' | 'e' | 'u' | 'r' | 'oRing' | 'l' | 'i' | 'a';

interface LogoGlassProps {
  /** X position — aligns to the O center on the 1080x1920 canvas */
  x: number;
  /** Y position — aligns to the O center on the 1080x1920 canvas */
  y: number;
  /** Global scale multiplier (default 1, yielding ~500px wide) */
  scale?: number;
  /** 3D rotation around X axis in degrees */
  rotateX?: number;
  /** 3D rotation around Y axis in degrees */
  rotateY?: number;
  /** 3D rotation around Z axis in degrees */
  rotateZ?: number;
  /** Edge brightness multiplier (0-1) — controls stroke opacity */
  edgeBrightness?: number;
  /** Radius of the circular glow behind the logo (px) */
  glowRadius?: number;
  /** Current frame — used to drive edge scintillation via sin wave */
  frame: number;
}

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

/**
 * Glass/neon treatment of the Neurolia logo.
 *
 * Technique:
 * - Container with perspective(1000px) + 3D rotations
 * - Letter paths filled with near-invisible white (rgba 255,255,255,0.08)
 * - Strokes: 2px terracotta->orange->amber gradient with drop-shadow glow
 * - Edges scintillate: opacity oscillates via `0.7 + sin(frame/3) * 0.3`
 * - Large radial-gradient glow circle behind the logo
 *
 * The O dot is NOT rendered here — it is managed independently by LogoDot.
 */
export const LogoGlass: React.FC<LogoGlassProps> = ({
  x,
  y,
  scale: scaleProp = 1,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  edgeBrightness = 1,
  glowRadius = 400,
  frame,
}) => {
  const renderScale = scaleProp * LOGO_SVG.scale;
  const svgW = LOGO_SVG.viewBoxWidth * renderScale;
  const svgH = LOGO_SVG.viewBoxHeight * renderScale;

  // Position so O center maps to (x, y)
  const offsetX = x - LOGO_SVG.oDotCx * renderScale;
  const offsetY = y - LOGO_SVG.oDotCy * renderScale;

  // Unique IDs for SVG gradients
  const strokeGradId = useMemo(
    () => `glass-stroke-${Math.random().toString(36).slice(2, 8)}`,
    [],
  );

  // Scintillation: each letter gets a slightly phase-shifted sin wave
  const getEdgeOpacity = (letterIndex: number): number => {
    const phase = letterIndex * 0.7; // Phase offset per letter
    const base = 0.7 + Math.sin((frame + phase * 10) / 3) * 0.3;
    return base * edgeBrightness;
  };

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {/* ---- Large circular glow behind the logo ---- */}
      <div
        style={{
          position: 'absolute',
          left: x - glowRadius,
          top: y - glowRadius,
          width: glowRadius * 2,
          height: glowRadius * 2,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(196, 92, 59, 0.2) 0%, transparent 60%)`,
          pointerEvents: 'none',
        }}
      />

      {/* ---- Glass logo ---- */}
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
              {/* Terracotta -> orange -> amber gradient for edge strokes */}
              <linearGradient id={strokeGradId} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={C.primary} />
                <stop offset="50%" stopColor={C.primaryLight} />
                <stop offset="100%" stopColor={C.edgeAmber} />
              </linearGradient>
            </defs>

            {/* Glass fills: near-invisible white */}
            {LETTER_ENTRIES.map(({ key, d }) => (
              <path
                key={`fill-${key}`}
                d={d}
                fill="rgba(255, 255, 255, 0.08)"
              />
            ))}

            {/* Luminous edge strokes with scintillation */}
            {LETTER_ENTRIES.map(({ key, d }, idx) => {
              const edgeOp = getEdgeOpacity(idx);
              return (
                <path
                  key={`edge-${key}`}
                  d={d}
                  fill="none"
                  stroke={`url(#${strokeGradId})`}
                  strokeWidth={2 / renderScale}
                  style={{
                    opacity: edgeOp,
                    filter: `drop-shadow(0 0 ${8 / renderScale}px rgba(196, 92, 59, 0.6))`,
                  }}
                />
              );
            })}
          </svg>
        </div>
      </div>
    </AbsoluteFill>
  );
};
