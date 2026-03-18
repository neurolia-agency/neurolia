import React from 'react';
import { AbsoluteFill, useVideoConfig } from 'remotion';
import { AnimatedBackground } from '../backgrounds/AnimatedBackground';
import { AnimatedText } from '../typography/AnimatedText';
import { colors } from '../../styles/neurolia-tokens';

interface HookSceneProps {
  /** Main hook text (line 1) */
  textLine1: string;
  /** Hook text line 2 (optional) */
  textLine2?: string;
  /** Accent text (colored in terracotta) */
  accentText?: string;
  /** Background intensity */
  backgroundIntensity?: number;
  /** Font size for main text */
  fontSize?: number;
}

export const HookScene: React.FC<HookSceneProps> = ({
  textLine1,
  textLine2,
  accentText,
  backgroundIntensity = 1.2,
  fontSize = 72,
}) => {
  const { width } = useVideoConfig();

  return (
    <AbsoluteFill>
      <AnimatedBackground intensity={backgroundIntensity} />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 60,
        }}
      >
        <div style={{ maxWidth: width * 0.85, textAlign: 'center' }}>
          <AnimatedText
            text={textLine1}
            fontSize={fontSize}
            fontWeight={700}
            delay={5}
            staggerDelay={1.5}
          />
          {textLine2 && (
            <>
              <div style={{ height: 20 }} />
              <AnimatedText
                text={textLine2}
                fontSize={fontSize}
                fontWeight={700}
                delay={25}
                staggerDelay={1.5}
              />
            </>
          )}
          {accentText && (
            <>
              <div style={{ height: 20 }} />
              <AnimatedText
                text={accentText}
                fontSize={fontSize}
                fontWeight={700}
                color={colors.primary}
                delay={textLine2 ? 45 : 25}
                staggerDelay={1.5}
              />
            </>
          )}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
