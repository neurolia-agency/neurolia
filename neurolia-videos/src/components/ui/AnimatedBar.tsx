import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { colors } from '../../styles/neurolia-tokens';

interface AnimatedBarProps {
  /** Frame delay before animation starts */
  delay?: number;
  width?: number;
  height?: number;
  color?: string;
  direction?: 'horizontal' | 'vertical';
  /** Show glow effect */
  glow?: boolean;
}

export const AnimatedBar: React.FC<AnimatedBarProps> = ({
  delay = 0,
  width = 4,
  height = 100,
  color = colors.primary,
  direction = 'vertical',
  glow = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - delay;

  const progress = spring({
    frame: Math.max(0, localFrame),
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const scaleValue = interpolate(progress, [0, 1], [0, 1]);
  const opacity = interpolate(localFrame, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const transform =
    direction === 'vertical'
      ? `scaleY(${scaleValue})`
      : `scaleX(${scaleValue})`;
  const transformOrigin =
    direction === 'vertical' ? 'center top' : 'left center';

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: color,
        opacity,
        transform,
        transformOrigin,
        boxShadow: glow ? `0 0 20px ${colors.glowTerracotta}` : 'none',
      }}
    />
  );
};
