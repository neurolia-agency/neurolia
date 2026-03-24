import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { StatBlock } from '../components/StatBlock';
import { AnimatedText } from '../components/AnimatedText';
import { colors } from '../../../styles/neurolia-tokens';

/**
 * Scene 5: Stats (frames 720-900, local 0-180)
 * Two big stats + closing line.
 */
export const SceneStats: React.FC = () => {
  const frame = useCurrentFrame();

  const closingOpacity = interpolate(frame, [150, 170], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      {frame >= 35 && (
        <StatBlock
          value="+40%"
          label="de conversions en moyenne"
          delay={40}
          y={500}
          valueColor={colors.primary}
          labelColor={colors.textSecondary}
        />
      )}

      {frame >= 95 && (
        <StatBlock
          value="+10h"
          label="par semaine recuperees"
          delay={100}
          y={1050}
          valueColor={colors.primary}
          labelColor={colors.textSecondary}
        />
      )}

      <div
        style={{
          position: 'absolute',
          left: 80,
          right: 80,
          bottom: 280,
          textAlign: 'center',
          opacity: closingOpacity,
        }}
      >
        <AnimatedText
          text="Des resultats, pas des promesses."
          fontSize={34}
          fontWeight={500}
          color={colors.textSecondary}
          delay={155}
          mode="wordByWord"
          staggerFrames={3}
        />
      </div>
    </AbsoluteFill>
  );
};
