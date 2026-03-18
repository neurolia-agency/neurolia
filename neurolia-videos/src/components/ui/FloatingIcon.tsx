import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { colors } from '../../styles/neurolia-tokens';

interface FloatingIconProps {
  children: React.ReactNode;
  /** Frame delay before animation starts */
  delay?: number;
  x?: number;
  y?: number;
  size?: number;
  /** Float animation amplitude in px */
  floatAmplitude?: number;
}

export const FloatingIcon: React.FC<FloatingIconProps> = ({
  children,
  delay = 0,
  x = 0,
  y = 0,
  size = 80,
  floatAmplitude = 5,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - delay;

  const progress = spring({
    frame: Math.max(0, localFrame),
    fps,
    config: { damping: 10, stiffness: 80, mass: 1.2 },
  });

  const opacity = interpolate(localFrame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(progress, [0, 1], [0.5, 1]);
  const translateY = interpolate(progress, [0, 1], [50, 0]);

  // Subtle float animation
  const float = Math.sin((frame / fps) * 2) * floatAmplitude;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        transform: `translateY(${translateY + float}px) scale(${scale})`,
        backgroundColor: colors.surfaceCard,
        borderRadius: 20,
        border: `1px solid ${colors.border}`,
        boxShadow: `0 0 40px rgba(196, 92, 59, 0.15)`,
        fontSize: size * 0.5,
      }}
    >
      {children}
    </div>
  );
};
