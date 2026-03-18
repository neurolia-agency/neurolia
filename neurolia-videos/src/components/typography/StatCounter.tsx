import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { colors, typography } from '../../styles/neurolia-tokens';

interface StatCounterProps {
  /** Target value to count up to */
  value: number;
  /** Prefix before the number (e.g., "+") */
  prefix?: string;
  /** Suffix after the number (e.g., "%", " modules") */
  suffix: string;
  /** Frame delay before animation starts */
  delay?: number;
  fontSize?: number;
  color?: string;
  /** Show glow effect around number */
  glow?: boolean;
}

export const StatCounter: React.FC<StatCounterProps> = ({
  value,
  prefix = '',
  suffix,
  delay = 0,
  fontSize = 120,
  color = colors.textPrimary,
  glow = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - delay;

  const progress = spring({
    frame: Math.max(0, localFrame),
    fps,
    config: { damping: 20, stiffness: 60, mass: 1.5 },
  });

  const displayValue = Math.round(interpolate(progress, [0, 1], [0, value]));

  const opacity = interpolate(localFrame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(progress, [0, 1], [0.7, 1]);

  const glowPulse = Math.sin((frame / fps) * 3) * 0.3 + 0.7;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'center',
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      {prefix && (
        <span
          style={{
            fontFamily: typography.fontFamily.display,
            fontSize: fontSize * 0.6,
            fontWeight: 700,
            color: colors.primary,
            marginRight: 8,
          }}
        >
          {prefix}
        </span>
      )}
      <span
        style={{
          fontFamily: typography.fontFamily.display,
          fontSize,
          fontWeight: 700,
          color,
          letterSpacing: '-0.03em',
          textShadow: glow
            ? `0 0 ${40 * glowPulse}px ${colors.glowTerracotta}`
            : 'none',
        }}
      >
        {displayValue}
      </span>
      <span
        style={{
          fontFamily: typography.fontFamily.display,
          fontSize: fontSize * 0.35,
          fontWeight: 600,
          color: colors.textSecondary,
          marginLeft: 12,
        }}
      >
        {suffix}
      </span>
    </div>
  );
};
