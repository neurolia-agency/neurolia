import React from 'react';
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COMP, C, BEAT, SPRINGS } from '../constants';
import { TechGrid } from '../components/TechGrid';
import { LogoDot } from '../components/LogoDot';

/**
 * Scene 01 — Dot Birth (frames 0-132 local, 11 beats at BPM 150)
 *
 * Timeline:
 *   Beat 0-1 (0-24)   Dot FALLS from above the screen to center (y: -50 → 960)
 *                      Gravitational easing, then bounce on landing (frame 10-12)
 *                      Grid starts appearing at frame 10 (landing moment)
 *   Beat 2-4 (24-60)  PAUSE — dot is posed, grid appears gently. 1 second of calm.
 *   Beat 5-7 (60-84)  INFLATE — scale 1 → 15 (24 frames)
 *                      Glow follows: blur 40→400, opacity 0.15→0.7
 *   Beat 7-11 (84-132) DEFLATE — scale 15 → 1 (48 frames, slower than inflate)
 *                      Grid reaches full opacity
 *
 * Audio (handled by AudioManager via constants.ts SFX):
 *   frame 3:  impact-soft (dot appears at top)
 *   frame 12: impact-medium (landing)
 *   frame 60: inflate.mp3
 *   frame 84: deflate.mp3
 */
export const Scene01DotBirth: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // -----------------------------------------------
  // Beat 0 (frame 0-12): Dot FALLS from above
  // 10 frames of gravitational fall, then spring bounce
  // -----------------------------------------------

  // Fall phase: y goes from -50 (off-screen top) to 960 (center)
  const fallY = interpolate(frame, [0, 10], [-50, COMP.cy], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.quad), // gravitational acceleration
  });

  // Bounce phase: spring starts at frame 10, overshoots below center then settles
  const bounceActive = frame >= 10;
  const bounceSpring = bounceActive
    ? spring({
        frame: frame - 10,
        fps,
        config: SPRINGS.dotLand, // { damping: 10, stiffness: 300 }
      })
    : 0;

  // Before landing (frame < 10): use fallY directly
  // After landing (frame >= 10): spring goes 0→1 with overshoot
  // We create a bounce offset that starts at some overshoot below center, then settles to 0
  const bounceOvershoot = 60; // pixels below center at impact moment
  const bounceOffset = bounceActive
    ? interpolate(bounceSpring, [0, 1], [-bounceOvershoot, 0])
    : 0;

  // Final Y position
  const dotY = bounceActive ? COMP.cy + bounceOffset : fallY;

  // Dot opacity — visible from frame 0 (it falls in from above)
  const dotOpacity = interpolate(frame, [0, 3], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // -----------------------------------------------
  // Grid fade-in — starts at frame 10 (landing), completes by frame 60
  // (gentle appearance during the pause beats 2-4)
  // -----------------------------------------------
  const gridOpacity = interpolate(frame, [10, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // -----------------------------------------------
  // Beat 5-7 (frame 60-84): INFLATE — scale 1 → 15
  // 24 frames (~0.8s), synced to inflate.mp3
  // -----------------------------------------------
  const inflateStart = BEAT * 5; // frame 60
  const inflateEnd = BEAT * 7; // frame 84

  const inflateScale = interpolate(frame, [inflateStart, inflateEnd], [1, 15], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease), // fast expansion, decelerating
  });

  // Inflate glow
  const inflateGlowBlur = interpolate(frame, [inflateStart, inflateEnd], [40, 400], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  const inflateGlowOpacity = interpolate(frame, [inflateStart, inflateEnd], [0.15, 0.7], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  // -----------------------------------------------
  // Beat 7-11 (frame 84-132): DEFLATE — scale 15 → 1
  // 48 frames (~1.6s), slower than inflate (asymmetric)
  // Synced to deflate.mp3
  // -----------------------------------------------
  const deflateStart = BEAT * 7; // frame 84
  const deflateEnd = BEAT * 11; // frame 132

  const deflateScale = interpolate(frame, [deflateStart, deflateEnd], [15, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.ease), // smooth organic deceleration
  });

  // Deflate glow
  const deflateGlowBlur = interpolate(frame, [deflateStart, deflateEnd], [400, 40], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.ease),
  });

  const deflateGlowOpacity = interpolate(frame, [deflateStart, deflateEnd], [0.7, 0.15], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.ease),
  });

  // -----------------------------------------------
  // Combine phases
  // -----------------------------------------------
  let finalScale: number;
  let finalGlowBlur: number;
  let finalGlowOpacity: number;

  // Force exact final state for the last 2 frames to guarantee
  // the dot is at scale=1, center=(540,960) for Scene02 handoff
  const SETTLE_FRAME = deflateEnd - 2; // frame 130

  if (frame >= SETTLE_FRAME) {
    // Hard clamp: dot is exactly at rest
    finalScale = 1;
    finalGlowBlur = 40;
    finalGlowOpacity = 0.15;
  } else if (frame < inflateStart) {
    // Beat 0-4: dot at rest scale after landing (includes pause)
    finalScale = 1;
    finalGlowBlur = 40;
    finalGlowOpacity = 0.15;
  } else if (frame < deflateStart) {
    // Beat 5-7: inflate
    finalScale = inflateScale;
    finalGlowBlur = inflateGlowBlur;
    finalGlowOpacity = inflateGlowOpacity;
  } else {
    // Beat 7-11: deflate
    finalScale = deflateScale;
    finalGlowBlur = deflateGlowBlur;
    finalGlowOpacity = deflateGlowOpacity;
  }

  // Force exact Y position for the final frames (spring fully settled)
  const finalDotY = frame >= SETTLE_FRAME ? COMP.cy : dotY;

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      {/* Technical grid — fades in from landing moment */}
      <TechGrid opacity={gridOpacity} />

      {/* Terracotta dot — falls, bounces, inflates, deflates */}
      <LogoDot
        x={COMP.cx}
        y={finalDotY}
        scale={finalScale}
        radius={20}
        glowBlur={finalGlowBlur}
        glowOpacity={finalGlowOpacity}
        variant="flat"
        opacity={dotOpacity}
      />
    </AbsoluteFill>
  );
};
