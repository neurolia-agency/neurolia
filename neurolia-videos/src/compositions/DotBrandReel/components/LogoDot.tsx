import React, { useMemo } from 'react';
import { AbsoluteFill } from 'remotion';
import { C } from '../constants';

interface LogoDotProps {
  /** X position on the 1080x1920 canvas */
  x?: number;
  /** Y position on the 1080x1920 canvas */
  y?: number;
  /** Scale multiplier */
  scale?: number;
  /** Circle radius in px */
  radius?: number;
  /** Glow blur radius in px */
  glowBlur?: number;
  /** Glow opacity (0-1) */
  glowOpacity?: number;
  /** Visual variant */
  variant?: 'flat' | 'incandescent';
  /** Override color (e.g. white dot on terracotta background) */
  color?: string;
  /** Global opacity for the entire dot+glow */
  opacity?: number;
}

/**
 * The terracotta dot — Neurolia's signature element.
 * Rendered as an SVG circle with optional radial gradient (incandescent)
 * and a glow halo via filter drop-shadow.
 */
export const LogoDot: React.FC<LogoDotProps> = ({
  x = 540,
  y = 960,
  scale = 1,
  radius = 20,
  glowBlur = 40,
  glowOpacity = 0.15,
  variant = 'flat',
  color,
  opacity = 1,
}) => {
  const gradientId = useMemo(() => `dot-grad-${Math.random().toString(36).slice(2, 8)}`, []);
  const filterId = useMemo(() => `dot-glow-${Math.random().toString(36).slice(2, 8)}`, []);

  // Resolve fill color based on variant and override
  const flatColor = color ?? C.primary;

  // The SVG viewBox is sized to contain the circle + glow padding
  const padding = glowBlur * 2;
  const svgSize = (radius + padding) * 2;
  const svgCenter = svgSize / 2;

  return (
    <AbsoluteFill
      style={{
        opacity,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: x,
          top: y,
          transform: `translate(-50%, -50%) scale(${scale})`,
          width: svgSize,
          height: svgSize,
          willChange: 'transform, opacity',
        }}
      >
        <svg
          width={svgSize}
          height={svgSize}
          viewBox={`0 0 ${svgSize} ${svgSize}`}
        >
          <defs>
            {/* Incandescent radial gradient */}
            {variant === 'incandescent' && (
              <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={C.dotDark} />
                <stop offset="55%" stopColor={C.dotEdge} />
                <stop offset="100%" stopColor={C.dotHot} />
              </radialGradient>
            )}

            {/* Glow filter */}
            <filter
              id={filterId}
              x="-200%"
              y="-200%"
              width="500%"
              height="500%"
            >
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation={glowBlur / 2}
              />
            </filter>
          </defs>

          {/* Glow halo */}
          <circle
            cx={svgCenter}
            cy={svgCenter}
            r={radius}
            fill={
              variant === 'incandescent'
                ? `url(#${gradientId})`
                : flatColor
            }
            filter={`url(#${filterId})`}
            opacity={glowOpacity}
          />

          {/* Main circle */}
          <circle
            cx={svgCenter}
            cy={svgCenter}
            r={radius}
            fill={
              variant === 'incandescent'
                ? `url(#${gradientId})`
                : flatColor
            }
          />
        </svg>
      </div>
    </AbsoluteFill>
  );
};
