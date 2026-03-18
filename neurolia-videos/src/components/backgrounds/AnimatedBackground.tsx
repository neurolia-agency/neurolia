import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors } from '../../styles/neurolia-tokens';

interface AnimatedBackgroundProps {
  /** Controls the size of gradient orbs (default: 1) */
  intensity?: number;
  /** Override base background color */
  backgroundColor?: string;
  /** Show grid overlay (default: true) */
  showGrid?: boolean;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  intensity = 1,
  backgroundColor = colors.background,
  showGrid = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const breathe = Math.sin((frame / fps) * 0.5) * 0.5 + 0.5;

  return (
    <AbsoluteFill style={{ backgroundColor }}>
      {/* Main gradient orb */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800 * intensity,
          height: 800 * intensity,
          borderRadius: '50%',
          background: `radial-gradient(ellipse, ${colors.glowTerracotta} 0%, transparent 70%)`,
          opacity: 0.3 + breathe * 0.15,
          filter: 'blur(80px)',
        }}
      />

      {/* Secondary orb */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: 400 * intensity,
          height: 400 * intensity,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(196, 92, 59, 0.2) 0%, transparent 70%)`,
          opacity: 0.4 + breathe * 0.2,
          filter: 'blur(60px)',
        }}
      />

      {/* Grid overlay for tech feel */}
      {showGrid && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(196, 92, 59, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(196, 92, 59, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            opacity: 0.5,
          }}
        />
      )}
    </AbsoluteFill>
  );
};
