import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { LogoSVG, LOGO_VIEWBOX } from '../components/LogoSVG';

const LOGO_WIDTH = 500;
const LOGO_HEIGHT = (LOGO_VIEWBOX.height / LOGO_VIEWBOX.width) * LOGO_WIDTH;

/**
 * Scene 2: Logo Compose (frames 120-250, local 0-130)
 * Dot arrives at ~local 42. Logo 3D rotation with staggered letters.
 */
export const SceneLogoCompose: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoX = (1080 - LOGO_WIDTH) / 2;
  const logoY = (1920 - LOGO_HEIGHT) / 2 - 40;

  const logoStartFrame = 40;

  // Ring
  const ringLocalFrame = frame - logoStartFrame;
  const ringProgress = spring({
    frame: Math.max(0, ringLocalFrame),
    fps,
    config: { damping: 18, stiffness: 90 },
  });
  const ringScale = interpolate(ringProgress, [0, 1], [0.3, 1]);
  const ringOpacity = interpolate(ringLocalFrame, [0, 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 3D Rotation
  const rotProgress = spring({
    frame: Math.max(0, frame - logoStartFrame),
    fps,
    config: { damping: 14, stiffness: 50, mass: 1.8 },
  });

  const rotateY = interpolate(rotProgress, [0, 1], [-90, 0]);
  const rotateX = interpolate(rotProgress, [0, 1], [25, 0]);
  const rotateZ = interpolate(rotProgress, [0, 1], [-12, 0]);

  // Letters stagger outward from O
  const letterBaseDelay = logoStartFrame + 5;
  const letterDelays: Record<string, number> = {
    r: letterBaseDelay + 0,
    l: letterBaseDelay + 0,
    u: letterBaseDelay + 5,
    i: letterBaseDelay + 5,
    e: letterBaseDelay + 10,
    a: letterBaseDelay + 10,
    N: letterBaseDelay + 15,
  };

  const letterOpacities: Record<string, number> = {};
  const letterTransforms: Record<string, string> = {};

  for (const [key, delay] of Object.entries(letterDelays)) {
    const localLetterFrame = frame - delay;
    const progress = spring({
      frame: Math.max(0, localLetterFrame),
      fps,
      config: { damping: 15, stiffness: 80, mass: 0.8 },
    });

    letterOpacities[key] = interpolate(localLetterFrame, [0, 8], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

    const translateY = interpolate(progress, [0, 1], [12, 0]);
    const scale = interpolate(progress, [0, 1], [0.8, 1]);
    letterTransforms[key] = `translateY(${translateY}px) scale(${scale})`;
  }

  const logoOverallOpacity = interpolate(frame, [logoStartFrame, logoStartFrame + 5], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <LogoSVG
        width={LOGO_WIDTH}
        x={logoX}
        y={logoY}
        theme="dark"
        letterOpacities={letterOpacities}
        letterTransforms={letterTransforms}
        ringOpacity={ringOpacity}
        ringScale={ringScale}
        dotVisible={frame >= logoStartFrame}
        overallOpacity={logoOverallOpacity}
        rotateX={rotateX}
        rotateY={rotateY}
        rotateZ={rotateZ}
      />
    </AbsoluteFill>
  );
};
