import React from 'react';
import { AbsoluteFill, useVideoConfig } from 'remotion';
import { AnimatedBackground } from '../backgrounds/AnimatedBackground';
import { AnimatedText } from '../typography/AnimatedText';
import { AnimatedBar } from '../ui/AnimatedBar';
import { DeviceMockup } from '../ui/DeviceMockup';
import { colors } from '../../styles/neurolia-tokens';

interface FeatureSceneProps {
  /** Feature/module name */
  title: string;
  /** One-line description */
  description?: string;
  /** Screenshot path (relative to public/) */
  screenshot: string;
  /** Device type for mockup */
  device?: 'desktop' | 'tablet' | 'phone';
  /** Background intensity */
  backgroundIntensity?: number;
}

export const FeatureScene: React.FC<FeatureSceneProps> = ({
  title,
  description,
  screenshot,
  device = 'desktop',
  backgroundIntensity = 0.9,
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
          paddingTop: 80,
        }}
      >
        {/* Title section */}
        <AnimatedBar delay={5} height={60} />
        <div style={{ height: 20 }} />
        <AnimatedText
          text={title}
          fontSize={52}
          fontWeight={700}
          delay={15}
          staggerDelay={1.5}
        />
        {description && (
          <>
            <div style={{ height: 10 }} />
            <AnimatedText
              text={description}
              fontSize={28}
              fontWeight={400}
              color={colors.textSecondary}
              delay={40}
              staggerDelay={1}
            />
          </>
        )}

        {/* Device mockup */}
        <div
          style={{
            marginTop: 40,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <DeviceMockup
            screenshot={screenshot}
            delay={30}
            device={device}
            scale={0.85}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
