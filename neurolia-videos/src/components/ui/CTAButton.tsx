import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { colors, typography } from '../../styles/neurolia-tokens';

interface CTAButtonProps {
  text: string;
  /** Frame delay before entrance */
  delay?: number;
  /** Pulsing animation */
  pulse?: boolean;
  fontSize?: number;
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  text,
  delay = 0,
  pulse = true,
  fontSize = 32,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - delay;

  const progress = spring({
    frame: Math.max(0, localFrame),
    fps,
    config: { damping: 10, stiffness: 100 },
  });

  const scale = interpolate(progress, [0, 1], [0.8, 1]);
  const opacity = interpolate(localFrame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const pulseScale = pulse
    ? Math.sin((frame / fps) * 4) * 0.05 + 1
    : 1;

  return (
    <div
      style={{
        padding: '24px 60px',
        backgroundColor: colors.primary,
        borderRadius: 16,
        opacity,
        transform: `scale(${scale * pulseScale})`,
        boxShadow: `0 0 50px ${colors.glowTerracotta}`,
      }}
    >
      <span
        style={{
          fontFamily: typography.fontFamily.display,
          fontSize,
          fontWeight: 600,
          color: '#FFFFFF',
        }}
      >
        {text}
      </span>
    </div>
  );
};
