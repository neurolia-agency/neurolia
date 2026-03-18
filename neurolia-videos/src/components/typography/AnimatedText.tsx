import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { colors, typography } from '../../styles/neurolia-tokens';

interface AnimatedTextProps {
  text: string;
  fontSize: number;
  fontWeight?: number;
  color?: string;
  /** Frame delay before animation starts */
  delay?: number;
  /** Frames between each letter animation */
  staggerDelay?: number;
  /** Center text horizontally */
  centerX?: boolean;
  letterSpacing?: string;
  fontFamily?: string;
  /** Spring damping override */
  damping?: number;
  /** Spring stiffness override */
  stiffness?: number;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  fontSize,
  fontWeight = 700,
  color = colors.textPrimary,
  delay = 0,
  staggerDelay = 2,
  centerX = true,
  letterSpacing = '-0.02em',
  fontFamily = typography.fontFamily.display,
  damping = 12,
  stiffness = 100,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const letters = text.split('');

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: centerX ? 'center' : 'flex-start',
        flexWrap: 'wrap',
        gap: '0px',
      }}
    >
      {letters.map((letter, index) => {
        const letterDelay = delay + index * staggerDelay;
        const localFrame = frame - letterDelay;

        const progress = spring({
          frame: Math.max(0, localFrame),
          fps,
          config: { damping, stiffness },
        });

        const opacity = interpolate(localFrame, [0, 8], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        const translateY = interpolate(progress, [0, 1], [40, 0]);
        const scale = interpolate(progress, [0, 1], [0.8, 1]);

        return (
          <span
            key={index}
            style={{
              display: 'inline-block',
              fontFamily,
              fontSize,
              fontWeight,
              color,
              letterSpacing,
              opacity,
              transform: `translateY(${translateY}px) scale(${scale})`,
              whiteSpace: letter === ' ' ? 'pre' : 'normal',
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        );
      })}
    </div>
  );
};
