import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { typography } from '../../../styles/neurolia-tokens';

interface AnimatedTextProps {
  text: string;
  fontSize: number;
  fontWeight?: number;
  color?: string;
  delay?: number;
  mode?: 'letterByLetter' | 'wordByWord';
  staggerFrames?: number;
  centerX?: boolean;
  letterSpacing?: string;
  fontFamily?: string;
  lineHeight?: number;
  opacity?: number;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  fontSize,
  fontWeight = 700,
  color = '#F5F5F5',
  delay = 0,
  mode = 'wordByWord',
  staggerFrames,
  centerX = true,
  letterSpacing = '-0.02em',
  fontFamily = typography.fontFamily.display,
  lineHeight = 1.1,
  opacity: containerOpacity,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stagger = staggerFrames ?? (mode === 'letterByLetter' ? 2 : 4);
  const units = mode === 'letterByLetter' ? text.split('') : text.split(' ');

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: centerX ? 'center' : 'flex-start',
        gap: mode === 'wordByWord' ? '0.3em' : '0px',
        opacity: containerOpacity,
      }}
    >
      {units.map((unit, index) => {
        const unitDelay = delay + index * stagger;
        const localFrame = frame - unitDelay;

        const progress = spring({
          frame: Math.max(0, localFrame),
          fps,
          config: { damping: 12, stiffness: 100 },
        });

        const unitOpacity = interpolate(localFrame, [0, 8], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        const translateY = interpolate(progress, [0, 1], [30, 0]);
        const scale = interpolate(progress, [0, 1], [0.85, 1]);

        return (
          <span
            key={index}
            style={{
              display: 'inline-block',
              fontFamily,
              fontSize,
              fontWeight,
              color,
              letterSpacing: mode === 'letterByLetter' ? letterSpacing : undefined,
              lineHeight,
              opacity: unitOpacity,
              transform: `translateY(${translateY}px) scale(${scale})`,
              whiteSpace: mode === 'letterByLetter' && unit === ' ' ? 'pre' : 'normal',
            }}
          >
            {mode === 'letterByLetter' && unit === ' ' ? '\u00A0' : unit}
          </span>
        );
      })}
    </div>
  );
};
