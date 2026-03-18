import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { AnimatedBackground } from '../backgrounds/AnimatedBackground';
import { AnimatedText } from '../typography/AnimatedText';
import { CTAButton } from '../ui/CTAButton';
import { LogoOverlay } from '../overlays/LogoOverlay';
import { colors, typography } from '../../styles/neurolia-tokens';

interface CTASceneProps {
  /** Text above CTA button */
  preText?: string;
  /** Main CTA question/statement */
  mainText: string;
  /** Button text */
  buttonText: string;
  /** URL displayed below button */
  url?: string;
  /** Show logo */
  showLogo?: boolean;
  /** Background intensity */
  backgroundIntensity?: number;
}

export const CTAScene: React.FC<CTASceneProps> = ({
  preText,
  mainText,
  buttonText,
  url = 'neurolia.fr',
  showLogo = true,
  backgroundIntensity = 1.4,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const glowPulse = Math.sin((frame / fps) * 3) * 0.3 + 0.7;

  return (
    <AbsoluteFill>
      <AnimatedBackground intensity={backgroundIntensity} />

      {/* Intense background glow */}
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.glowTerracotta} 0%, transparent 50%)`,
          opacity: 0.4 * glowPulse,
          filter: 'blur(80px)',
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
        {/* Logo */}
        {showLogo && <LogoOverlay delay={5} width={280} position="center" />}

        <div style={{ height: showLogo ? 120 : 0 }} />

        {/* Pre-text */}
        {preText && (
          <>
            <AnimatedText
              text={preText}
              fontSize={48}
              fontWeight={500}
              color={colors.textSecondary}
              delay={20}
              staggerDelay={2}
            />
            <div style={{ height: 15 }} />
          </>
        )}

        {/* Main text */}
        <AnimatedText
          text={mainText}
          fontSize={72}
          fontWeight={700}
          delay={preText ? 40 : 20}
          staggerDelay={1.5}
        />

        {/* CTA Button */}
        <div style={{ marginTop: 60 }}>
          <CTAButton text={buttonText} delay={60} />
        </div>

        {/* URL */}
        <div
          style={{
            marginTop: 40,
            opacity: interpolate(frame, [90, 110], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          <span
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: 24,
              fontWeight: 400,
              color: colors.textMuted,
            }}
          >
            {url}
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
