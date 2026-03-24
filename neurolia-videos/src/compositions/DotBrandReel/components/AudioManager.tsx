import React, { useCallback } from 'react';
import { Audio } from '@remotion/media';
import { Sequence, staticFile, interpolate } from 'remotion';
import { SFX, COMP } from '../constants';

// Frames where strong impacts occur (instru volume gets ducked)
const STRONG_IMPACT_FRAMES = SFX
  .filter((sfx) => sfx.volume >= 0.6)
  .map((sfx) => sfx.frame);

const TOTAL_DURATION = COMP.durationInFrames;

/**
 * Computes the instru trap volume at a given frame.
 * Uses fade in (15 frames), fade out (20 frames), and ducking near strong impacts.
 */
const getInstruVolume = (frame: number): number => {
  // Fade in (first 15 frames): 0 -> 1
  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Fade out (last 20 frames): 1 -> 0
  const fadeOut = interpolate(
    frame,
    [TOTAL_DURATION - 20, TOTAL_DURATION],
    [1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );

  // Ducking: reduce volume when near strong impacts
  const isNearImpact = STRONG_IMPACT_FRAMES.some(
    (impactFrame) => frame >= impactFrame - 2 && frame <= impactFrame + 8,
  );
  const duckFactor = isNearImpact ? 0.5 : 1;

  // Base volume 0.5, with fade in/out and ducking
  return 0.5 * fadeIn * fadeOut * duckFactor;
};

/**
 * Audio Manager for DotBrandReel.
 *
 * - Instru trap: plays from frame 0 to 936 (COMP.durationInFrames), with fade in/out and ducking.
 * - SFX: each sound effect is placed at its frame via <Sequence>.
 * - trimBefore for the instru trap = 38 * 30 = 1140 (starts at 38s into the audio file).
 */
export const AudioManager: React.FC = () => {
  // Volume callback for instru -- Remotion calls this per frame
  const instruVolumeCallback = useCallback(
    (f: number) => getInstruVolume(f),
    [],
  );

  return (
    <>
      {/* Instru trap - starts at the drop (38s into the audio file) */}
      <Sequence from={0} durationInFrames={TOTAL_DURATION}>
        <Audio
          src={staticFile('audio/instru-trap.mp3')}
          volume={instruVolumeCallback}
          trimBefore={38 * COMP.fps}
        />
      </Sequence>

      {/* SFX - each at its precise frame */}
      {SFX.map((sfx, i) => (
        <Sequence key={`sfx-${i}-${sfx.frame}`} from={sfx.frame}>
          <Audio
            src={staticFile(`audio/${sfx.file}`)}
            volume={sfx.volume}
          />
        </Sequence>
      ))}
    </>
  );
};
