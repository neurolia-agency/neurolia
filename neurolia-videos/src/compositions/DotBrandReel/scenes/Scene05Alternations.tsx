import React, { useMemo } from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import { COMP, C, LOGO_PATHS, LOGO_SVG, FLIPS } from '../constants';

/**
 * Scene 05 — Logo Alternations (from=456, duration=96, 8 beats)
 *
 * The flat logo performs rapid 3D flips, switching between
 * different color variants on different backgrounds.
 * Flip timings driven by FLIPS in constants.ts (localFrame on beats).
 */

// Flip definitions derived from FLIPS constants
interface FlipDef {
  start: number;
  end: number;
  axis: 'Y' | 'X';
  bgBefore: string;
  bgAfter: string;
  logoBefore: string;
  logoAfter: string;
  dotBefore: string;
  dotAfter: string;
}

// Color states per flip (noir -> blanc -> noir -> terracotta -> noir)
const flipAxis = (i: number): 'X' | 'Y' => (FLIPS[i].type as string) === 'rotateX' ? 'X' : 'Y';

const FLIP_DEFS: FlipDef[] = [
  {
    start: FLIPS[0].localFrame, end: FLIPS[0].localFrame + 4,
    axis: flipAxis(0),
    bgBefore: C.bg, bgAfter: C.white,
    logoBefore: '#F5F5F5', logoAfter: C.bg,
    dotBefore: C.primary, dotAfter: C.primary,
  },
  {
    start: FLIPS[1].localFrame, end: FLIPS[1].localFrame + 4,
    axis: flipAxis(1),
    bgBefore: C.white, bgAfter: C.bg,
    logoBefore: C.bg, logoAfter: '#F5F5F5',
    dotBefore: C.primary, dotAfter: C.primary,
  },
  {
    start: FLIPS[2].localFrame, end: FLIPS[2].localFrame + 4,
    axis: flipAxis(2),
    bgBefore: C.bg, bgAfter: C.primary,
    logoBefore: '#F5F5F5', logoAfter: '#FFFFFF',
    dotBefore: C.primary, dotAfter: '#FFFFFF',
  },
  {
    start: FLIPS[3].localFrame, end: FLIPS[3].localFrame + 4,
    axis: flipAxis(3),
    bgBefore: C.primary, bgAfter: C.bg,
    logoBefore: '#FFFFFF', logoAfter: '#F5F5F5',
    dotBefore: '#FFFFFF', dotAfter: C.primary,
  },
];

/**
 * Determine the current state (bg, logo color, dot color)
 * based on the local frame and flip definitions.
 */
const getColorState = (localFrame: number) => {
  // Default state: before any flip
  let bg: string = C.bg;
  let logoColor: string = '#F5F5F5';
  let dotColor: string = C.primary;

  for (const flip of FLIP_DEFS) {
    const mid = (flip.start + flip.end) / 2;

    if (localFrame < flip.start) {
      break;
    } else if (localFrame < mid) {
      // First half of flip — still showing "before"
      bg = flip.bgBefore;
      logoColor = flip.logoBefore;
      dotColor = flip.dotBefore;
    } else {
      // Second half of flip or past it — showing "after"
      bg = flip.bgAfter;
      logoColor = flip.logoAfter;
      dotColor = flip.dotAfter;
    }
  }

  return { bg, logoColor, dotColor };
};

/**
 * Get the combined rotation for all flips at a given local frame.
 */
const getFlipRotation = (localFrame: number) => {
  let rotateY = 0;
  let rotateX = 0;

  for (const flip of FLIP_DEFS) {
    if (localFrame < flip.start) continue;
    if (localFrame > flip.end) continue;

    const flipProgress = interpolate(
      localFrame,
      [flip.start, flip.end],
      [0, 360],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.exp) },
    );

    if (flip.axis === 'Y') {
      rotateY += flipProgress;
    } else {
      rotateX += flipProgress;
    }
  }

  return { rotateY, rotateX };
};

export const Scene05Alternations: React.FC = () => {
  const localFrame = useCurrentFrame();

  // Color state
  const { bg, logoColor, dotColor } = useMemo(
    () => getColorState(localFrame),
    [localFrame],
  );

  // Flip rotations
  const { rotateY: flipY, rotateX: flipX } = useMemo(
    () => getFlipRotation(localFrame),
    [localFrame],
  );

  // Micro-movement (constant subtle 3D oscillation)
  const microY = Math.sin(localFrame * 0.15) * 2;
  const microX = Math.cos(localFrame * 0.12) * 1.5;

  // Combined rotation
  const totalRotateY = flipY + microY;
  const totalRotateX = flipX + microX;

  // Logo dimensions
  const logoWidth = LOGO_SVG.viewBoxWidth * LOGO_SVG.scale;
  const logoHeight = LOGO_SVG.viewBoxHeight * LOGO_SVG.scale;

  // Center position
  const logoX = COMP.cx - logoWidth / 2;
  const logoY = COMP.cy - logoHeight / 2;

  return (
    <AbsoluteFill style={{ backgroundColor: bg }}>
      <div
        style={{
          position: 'absolute',
          left: logoX,
          top: logoY,
          width: logoWidth,
          height: logoHeight,
          perspective: 1200,
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            transform: `rotateY(${totalRotateY}deg) rotateX(${totalRotateX}deg)`,
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          }}
        >
          <svg
            width={logoWidth}
            height={logoHeight}
            viewBox={`0 0 ${LOGO_SVG.viewBoxWidth} ${LOGO_SVG.viewBoxHeight}`}
          >
            {/* Letter paths */}
            {Object.entries(LOGO_PATHS).map(([key, value]) => {
              if (key === 'oDot') return null;
              return (
                <path
                  key={key}
                  d={value as string}
                  fill={logoColor}
                />
              );
            })}

            {/* The dot on the "o" */}
            <circle
              cx={LOGO_PATHS.oDot.cx}
              cy={LOGO_PATHS.oDot.cy}
              r={LOGO_PATHS.oDot.r}
              fill={dotColor}
            />
          </svg>
        </div>
      </div>
    </AbsoluteFill>
  );
};
