import React from 'react';
import { AbsoluteFill } from 'remotion';
import { LOGO_PATHS, LOGO_SVG, C } from '../constants';

type LetterKey = 'N' | 'e' | 'u' | 'r' | 'oRing' | 'l' | 'i' | 'a';

interface LetterTransform {
  translateX?: number;
  translateY?: number;
  scale?: number;
  scaleX?: number;
  rotate?: number;
}

interface LogoSvgProps {
  /** X position — aligns to the O center */
  x: number;
  /** Y position — aligns to the O center */
  y: number;
  /** Global scale (rendered at scale * 7, yielding ~500px wide at scale=1) */
  scale?: number;
  /** Per-letter opacity (0-1) */
  letterOpacities?: Partial<Record<LetterKey, number>>;
  /** Per-letter transform overrides */
  letterTransforms?: Partial<Record<LetterKey, LetterTransform>>;
  /** Fill color for all paths */
  fillColor?: string;
  /**
   * Whether to render the inner O dot.
   * Default false — the dot is typically handled by LogoDot for independent animation.
   */
  showDot?: boolean;
}

/**
 * The Neurolia logotype rendered as SVG with individually animatable letters.
 *
 * The SVG viewBox is 0 0 71.06 13.57.
 * The O dot center is at (45.91, 8.46) in SVG coords.
 * The logo is positioned so that O's center maps to (x, y) on the canvas.
 * Render scale = scale * LOGO_SVG.scale (default 7), giving ~500px wide at scale=1.
 */
export const LogoSvg: React.FC<LogoSvgProps> = ({
  x,
  y,
  scale: scaleProp = 1,
  letterOpacities = {},
  letterTransforms = {},
  fillColor = C.textPrimary,
  showDot = false,
}) => {
  const renderScale = scaleProp * LOGO_SVG.scale;

  // SVG pixel dimensions at render scale
  const svgW = LOGO_SVG.viewBoxWidth * renderScale;
  const svgH = LOGO_SVG.viewBoxHeight * renderScale;

  // Offset so that the O center in SVG coords maps to (x, y) on the canvas.
  // O center in rendered pixels = (oDotCx * renderScale, oDotCy * renderScale)
  const offsetX = x - LOGO_SVG.oDotCx * renderScale;
  const offsetY = y - LOGO_SVG.oDotCy * renderScale;

  // Letter path entries (excluding oDot which is a circle)
  const letterPaths: { key: LetterKey; d: string }[] = [
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
   * Build a CSS transform string for a letter, operating in SVG-coordinate space.
   * The transform-origin is set at the path's approximate center via the group's
   * transform-box, but since SVG paths don't have intrinsic bounding boxes in all
   * renderers, we use a wrapping <g> with transform applied as an SVG attribute.
   */
  const buildTransform = (key: LetterKey): string => {
    const t = letterTransforms[key];
    if (!t) return '';

    const parts: string[] = [];
    if (t.translateX || t.translateY) {
      // Translate values are in canvas-pixels; convert to SVG coords
      const tx = (t.translateX ?? 0) / renderScale;
      const ty = (t.translateY ?? 0) / renderScale;
      parts.push(`translate(${tx}, ${ty})`);
    }
    if (t.rotate) {
      // Rotate around the approximate center of the letter's bounding box.
      // For simplicity we use the SVG viewBox center as a fallback pivot —
      // the actual per-letter pivots are handled via the transform-origin in the style.
      parts.push(`rotate(${t.rotate})`);
    }
    if (t.scale || t.scaleX) {
      const sx = (t.scaleX ?? 1) * (t.scale ?? 1);
      const sy = t.scale ?? 1;
      parts.push(`scale(${sx}, ${sy})`);
    }
    return parts.join(' ');
  };

  /** Approximate center of each letter path in SVG coords (for transform-origin). */
  const letterCenters: Record<LetterKey, { cx: number; cy: number }> = {
    N: { cx: 5.5, cy: 6.8 },
    e: { cx: 18.2, cy: 8.5 },
    u: { cx: 30.0, cy: 8.5 },
    r: { cx: 38.2, cy: 8.0 },
    oRing: { cx: 45.91, cy: 8.46 },
    l: { cx: 53.6, cy: 6.8 },
    i: { cx: 57.7, cy: 6.8 },
    a: { cx: 65.5, cy: 8.5 },
  };

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <svg
        width={svgW}
        height={svgH}
        viewBox={`0 0 ${LOGO_SVG.viewBoxWidth} ${LOGO_SVG.viewBoxHeight}`}
        style={{
          position: 'absolute',
          left: offsetX,
          top: offsetY,
          overflow: 'visible',
        }}
      >
        {letterPaths.map(({ key, d }) => {
          const letterOpacity = letterOpacities[key] ?? 1;
          const center = letterCenters[key];
          const transform = buildTransform(key);

          return (
            <g
              key={key}
              style={{
                opacity: letterOpacity,
                transformOrigin: `${center.cx}px ${center.cy}px`,
                transform,
              }}
            >
              <path d={d} fill={fillColor} />
            </g>
          );
        })}

        {/* Inner O dot — only if explicitly enabled */}
        {showDot && (
          <circle
            cx={LOGO_PATHS.oDot.cx}
            cy={LOGO_PATHS.oDot.cy}
            r={LOGO_PATHS.oDot.r}
            fill={fillColor}
          />
        )}
      </svg>
    </AbsoluteFill>
  );
};
