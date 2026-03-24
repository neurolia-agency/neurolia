import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { LogoSVG, LOGO_VIEWBOX } from '../components/LogoSVG';
import { AnimatedText } from '../components/AnimatedText';
import { colors } from '../../../styles/neurolia-tokens';

const LOGO_WIDTH = 500;
const LOGO_HEIGHT = (LOGO_VIEWBOX.height / LOGO_VIEWBOX.width) * LOGO_WIDTH;

/**
 * Scene 3: Dot Escape + Baseline (frames 250-450, local 0-200)
 * Logo fades out first, then baseline text appears.
 */
export const SceneDotEscape: React.FC = () => {
  const frame = useCurrentFrame();

  const logoX = (1080 - LOGO_WIDTH) / 2;
  const logoY = (1920 - LOGO_HEIGHT) / 2 - 40;

  const dotEscaped = frame >= 25;

  // Logo fades out
  const logoFade = interpolate(frame, [40, 70], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const logoShift = interpolate(frame, [40, 70], [0, -80], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Text appears after logo gone
  const textDelay1 = 110;
  const textDelay2 = 130;

  const text1Opacity = interpolate(frame, [textDelay1, textDelay1 + 15, 175, 200], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const text2Opacity = interpolate(frame, [textDelay2, textDelay2 + 15, 175, 200], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      {logoFade > 0.01 && (
        <div style={{ transform: `translateY(${logoShift}px)`, opacity: logoFade }}>
          <LogoSVG
            width={LOGO_WIDTH}
            x={logoX}
            y={logoY}
            theme="dark"
            dotVisible={!dotEscaped}
          />
        </div>
      )}

      {frame >= textDelay1 - 5 && (
        <div
          style={{
            position: 'absolute',
            left: 80,
            right: 80,
            top: 400,
            textAlign: 'center',
          }}
        >
          <div style={{ opacity: text1Opacity }}>
            <AnimatedText
              text="Un business qui respire."
              fontSize={42}
              fontWeight={600}
              color={colors.textPrimary}
              delay={textDelay1}
              mode="wordByWord"
              staggerFrames={4}
            />
          </div>
          <div style={{ height: 24 }} />
          <div style={{ opacity: text2Opacity }}>
            <AnimatedText
              text="L'agence web & IA des PME qui avancent."
              fontSize={28}
              fontWeight={400}
              color={colors.textSecondary}
              delay={textDelay2}
              mode="wordByWord"
              staggerFrames={3}
            />
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
