import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { AnimatedBackground } from '../backgrounds/AnimatedBackground';
import { AnimatedText } from '../typography/AnimatedText';
import { StatCounter } from '../typography/StatCounter';
import { colors } from '../../styles/neurolia-tokens';

interface StatRevealSceneProps {
  /** Number to animate */
  value: number;
  /** Prefix (e.g., "+") */
  prefix?: string;
  /** Suffix (e.g., "modules", "%") */
  suffix: string;
  /** Context text below the number */
  context: string;
  /** Background intensity */
  backgroundIntensity?: number;
  /** Number font size */
  numberFontSize?: number;
}

export const StatRevealScene: React.FC<StatRevealSceneProps> = ({
  value,
  prefix,
  suffix,
  context,
  backgroundIntensity = 1.3,
  numberFontSize = 140,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const glowPulse = Math.sin((frame / fps) * 3) * 0.3 + 0.7;

  return (
    <AbsoluteFill>
      <AnimatedBackground intensity={backgroundIntensity} />

      {/* Intense center glow */}
      <div
        style={{
          position: 'absolute',
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.glowTerracotta} 0%, transparent 60%)`,
          opacity: 0.4 * glowPulse,
          filter: 'blur(60px)',
        }}
      />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 60,
        }}
      >
        <StatCounter
          value={value}
          prefix={prefix}
          suffix={suffix}
          delay={10}
          fontSize={numberFontSize}
        />

        <div style={{ height: 40 }} />

        <AnimatedText
          text={context}
          fontSize={36}
          fontWeight={500}
          color={colors.textSecondary}
          delay={50}
          staggerDelay={1}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
