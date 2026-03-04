import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  Img,
  staticFile,
} from 'remotion';
import { z } from 'zod';
import { colors, typography, animation } from '../styles/neurolia-tokens';

export const heroMotionSchema = z.object({
  tagline: z.string().default('Un business qui respire.'),
});

type HeroMotionProps = z.infer<typeof heroMotionSchema>;

export const HeroMotion: React.FC<HeroMotionProps> = ({
  tagline = 'Un business qui respire.',
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Timeline phases (in frames at 30fps)
  const LOGO_FADE_START = 0;
  const LOGO_FADE_END = 30;           // 0-1s: Logo appears
  const LOGO_HOLD_END = 90;           // 1-3s: Logo holds
  const TEXT_FADE_START = 90;
  const TEXT_FADE_END = 120;          // 3-4s: Text appears
  const HOLD_END = 210;               // 4-7s: Both hold
  const FADE_OUT_START = 210;
  const FADE_OUT_END = 270;           // 7-9s: Fade out
  const DARK_PAUSE_END = 300;         // 9-10s: Dark pause

  // Signature bar animation (grows with logo)
  const barHeight = interpolate(
    frame,
    [LOGO_FADE_START, LOGO_FADE_END * 1.5],
    [0, 120],
    {
      extrapolateRight: 'clamp',
      extrapolateLeft: 'clamp',
      easing: Easing.out(Easing.ease),
    }
  );

  const barOpacity = interpolate(
    frame,
    [LOGO_FADE_START, LOGO_FADE_END, FADE_OUT_START, FADE_OUT_END],
    [0, 1, 1, 0],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  // Logo animation - translateY entrance + fade
  const logoTranslateY = interpolate(
    frame,
    [LOGO_FADE_START, LOGO_FADE_END],
    [animation.translate.entrance, 0],
    {
      extrapolateRight: 'clamp',
      extrapolateLeft: 'clamp',
      easing: Easing.out(Easing.ease),
    }
  );

  const logoOpacity = interpolate(
    frame,
    [LOGO_FADE_START, LOGO_FADE_END, FADE_OUT_START, FADE_OUT_END],
    [0, 1, 1, 0],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  // Tagline animation - delayed entrance
  const taglineTranslateY = interpolate(
    frame,
    [TEXT_FADE_START, TEXT_FADE_END],
    [animation.translate.entrance, 0],
    {
      extrapolateRight: 'clamp',
      extrapolateLeft: 'clamp',
      easing: Easing.out(Easing.ease),
    }
  );

  const taglineOpacity = interpolate(
    frame,
    [TEXT_FADE_START, TEXT_FADE_END, FADE_OUT_START, FADE_OUT_END],
    [0, 1, 1, 0],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  // Subtle glow pulse animation (continuous, subtle)
  const glowPulse = interpolate(
    frame % 90, // Loop every 3 seconds
    [0, 45, 90],
    [0.2, 0.35, 0.2],
    { extrapolateRight: 'clamp' }
  );

  // Logo sizing - SVG is 71x14, scale to ~400px width
  const logoWidth = 400;
  const logoHeight = (14 / 71) * logoWidth;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Terracotta glow accent - bottom right */}
      <div
        style={{
          position: 'absolute',
          bottom: -150,
          right: -150,
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.glowTerracotta} 0%, transparent 70%)`,
          opacity: glowPulse,
        }}
      />

      {/* Secondary glow - top left (subtle) */}
      <div
        style={{
          position: 'absolute',
          top: -100,
          left: -100,
          width: 350,
          height: 350,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.glowTerracottaSubtle} 0%, transparent 70%)`,
          opacity: glowPulse * 0.5,
        }}
      />

      {/* Signature bar - left side */}
      <div
        style={{
          position: 'absolute',
          left: 120,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 4,
          height: barHeight,
          backgroundColor: colors.primary,
          opacity: barOpacity,
        }}
      />

      {/* Content container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 48,
        }}
      >
        {/* Logo */}
        <div
          style={{
            transform: `translateY(${logoTranslateY}px)`,
            opacity: logoOpacity,
          }}
        >
          <Img
            src={staticFile('neurolia/logo_neurolia_light.svg')}
            width={logoWidth}
            height={logoHeight}
            style={{
              filter: 'brightness(1.1)',
            }}
          />
        </div>

        {/* Tagline */}
        <p
          style={{
            fontFamily: typography.fontFamily.sans,
            fontSize: 32,
            fontWeight: typography.fontWeight.normal,
            lineHeight: typography.lineHeight.loose,
            letterSpacing: typography.letterSpacing.wide,
            color: colors.textSecondary,
            margin: 0,
            transform: `translateY(${taglineTranslateY}px)`,
            opacity: taglineOpacity,
          }}
        >
          {tagline}
        </p>
      </div>
    </AbsoluteFill>
  );
};
