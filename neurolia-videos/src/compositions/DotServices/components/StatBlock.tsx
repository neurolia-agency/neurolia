import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { colors, typography } from '../../../styles/neurolia-tokens';

interface StatBlockProps {
  value: string;
  label: string;
  delay?: number;
  y: number;
  valueColor?: string;
  labelColor?: string;
}

export const StatBlock: React.FC<StatBlockProps> = ({
  value,
  label,
  delay = 0,
  y,
  valueColor = colors.primary,
  labelColor = colors.textSecondary,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - delay;

  const progress = spring({
    frame: Math.max(0, localFrame),
    fps,
    config: { damping: 10, stiffness: 120 },
  });

  const opacity = interpolate(localFrame, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(progress, [0, 1], [1.3, 1]);

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: y,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity,
      }}
    >
      <span
        style={{
          fontFamily: typography.fontFamily.display,
          fontSize: 120,
          fontWeight: 700,
          color: valueColor,
          lineHeight: 1,
          transform: `scale(${scale})`,
          display: 'inline-block',
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily: typography.fontFamily.sans,
          fontSize: 28,
          fontWeight: 400,
          color: labelColor,
          marginTop: 16,
        }}
      >
        {label}
      </span>
    </div>
  );
};
