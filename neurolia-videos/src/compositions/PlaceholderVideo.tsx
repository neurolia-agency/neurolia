import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from 'remotion';
import { z } from 'zod';
import { colors, typography, animation } from '../styles/neurolia-tokens';

// Schema must be exported for use in Root.tsx
export const placeholderVideoSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
});

type PlaceholderVideoProps = z.infer<typeof placeholderVideoSchema>;

export const PlaceholderVideo: React.FC<PlaceholderVideoProps> = ({
  title,
  subtitle,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Animation duration in frames (300ms = ~10 frames at 30fps)
  const animDuration = animation.duration.standard;

  // Title animation - translate Y from 20px to 0
  const titleTranslateY = interpolate(
    frame,
    [0, animDuration],
    [animation.translate.entrance, 0],
    {
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.ease),
    }
  );

  const titleOpacity = interpolate(
    frame,
    [0, animDuration],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );

  // Subtitle animation - delayed by stagger
  const subtitleDelay = animation.stagger * 2; // 2 items stagger
  const subtitleTranslateY = interpolate(
    frame,
    [subtitleDelay, subtitleDelay + animDuration],
    [animation.translate.entrance, 0],
    {
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.ease),
    }
  );

  const subtitleOpacity = interpolate(
    frame,
    [subtitleDelay, subtitleDelay + animDuration],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );

  // Signature bar animation
  const barHeight = interpolate(
    frame,
    [0, animDuration * 1.5],
    [0, 80],
    {
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.ease),
    }
  );

  // Calculate responsive font sizes based on video dimensions
  const isPortrait = height > width;
  const baseFontSize = Math.min(width, height) / 10;
  const titleSize = isPortrait ? baseFontSize * 1.2 : baseFontSize;
  const subtitleSize = titleSize * 0.35;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
      }}
    >
      {/* Signature bar */}
      <div
        style={{
          position: 'absolute',
          left: 80,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 4,
          height: barHeight,
          backgroundColor: colors.primary,
        }}
      />

      {/* Content container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: isPortrait ? 'center' : 'flex-start',
          textAlign: isPortrait ? 'center' : 'left',
          paddingLeft: isPortrait ? 0 : 60,
        }}
      >
        {/* Title */}
        {title && (
          <h1
            style={{
              fontFamily: typography.fontFamily.display,
              fontSize: titleSize,
              fontWeight: typography.fontWeight.bold,
              lineHeight: typography.lineHeight.tight,
              letterSpacing: typography.letterSpacing.tighter,
              color: colors.textPrimary,
              margin: 0,
              transform: `translateY(${titleTranslateY}px)`,
              opacity: titleOpacity,
            }}
          >
            {title}
          </h1>
        )}

        {/* Subtitle */}
        {subtitle && (
          <p
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: subtitleSize,
              fontWeight: typography.fontWeight.normal,
              lineHeight: typography.lineHeight.loose,
              color: colors.textSecondary,
              margin: 0,
              marginTop: 24,
              transform: `translateY(${subtitleTranslateY}px)`,
              opacity: subtitleOpacity,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Terracotta glow accent */}
      <div
        style={{
          position: 'absolute',
          bottom: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.glowTerracotta} 0%, transparent 70%)`,
          opacity: 0.3,
        }}
      />
    </AbsoluteFill>
  );
};
