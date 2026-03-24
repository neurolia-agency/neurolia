import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from 'remotion';
import {
  COMP,
  ROTATION_KEYFRAMES,
  C,
} from '../constants';
import { Logo3D } from '../components/Logo3D';
import { LogoDot } from '../components/LogoDot';

/**
 * Scene 05 — Pass 4: Exploration 3D (local frames 0-96, 8 beats)
 *
 * The fully 3D logo is rotated in all directions following ROTATION_KEYFRAMES.
 * The dot sits in the O (incandescent variant), pulsing gently.
 *
 * Timeline (from ROTATION_KEYFRAMES, already in localFrame):
 *   Beat 1 (0):   rotateY 45
 *   Beat 2 (12):  rotateY -60, rotateX 25
 *   Beat 3 (24):  half-turn rotateY 180
 *   Beat 4 (36):  flip rotateX 90 (see underside)
 *   Beat 5 (48):  rotateY -90, rotateX -30, rotateZ -15
 *   Beat 6 (60):  rotateY 120, rotateX 45, rotateZ 20
 *   Beat 7 (72):  rotateY -45, rotateX -60
 *   Beat 8 (84):  settle back to 0,0,0
 */
export const Scene05Explore3D: React.FC = () => {
  const localFrame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // -----------------------------------------------
  // 3D Rotation from ROTATION_KEYFRAMES
  // -----------------------------------------------
  const computeRotation = (): {
    rotateX: number;
    rotateY: number;
    rotateZ: number;
  } => {
    // Find the two keyframes we're between
    for (let i = 0; i < ROTATION_KEYFRAMES.length; i++) {
      const kf = ROTATION_KEYFRAMES[i];
      const nextKf = ROTATION_KEYFRAMES[i + 1];

      // If we're before this keyframe, interpolate from previous
      if (localFrame < kf.localFrame) {
        const prevKf = i > 0 ? ROTATION_KEYFRAMES[i - 1] : null;
        const prevEnd = prevKf
          ? prevKf.localFrame + prevKf.hold
          : 0;

        const progress = interpolate(
          localFrame,
          [prevEnd, kf.localFrame],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
        );
        const eased = Easing.out(Easing.exp)(progress);

        return {
          rotateX: interpolate(eased, [0, 1], [prevKf?.rotateX ?? 0, kf.rotateX]),
          rotateY: interpolate(eased, [0, 1], [prevKf?.rotateY ?? 0, kf.rotateY]),
          rotateZ: interpolate(eased, [0, 1], [prevKf?.rotateZ ?? 0, kf.rotateZ]),
        };
      }

      // If we're within this keyframe's hold period
      const kfEnd = kf.localFrame + kf.hold;
      if (localFrame >= kf.localFrame && localFrame < kfEnd) {
        return {
          rotateX: kf.rotateX,
          rotateY: kf.rotateY,
          rotateZ: kf.rotateZ,
        };
      }

      // If we're between this keyframe's hold end and the next keyframe
      if (nextKf && localFrame >= kfEnd && localFrame < nextKf.localFrame) {
        const progress = interpolate(
          localFrame,
          [kfEnd, nextKf.localFrame],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
        );
        const eased = Easing.out(Easing.exp)(progress);

        return {
          rotateX: interpolate(eased, [0, 1], [kf.rotateX, nextKf.rotateX]),
          rotateY: interpolate(eased, [0, 1], [kf.rotateY, nextKf.rotateY]),
          rotateZ: interpolate(eased, [0, 1], [kf.rotateZ, nextKf.rotateZ]),
        };
      }

      // After last keyframe: hold final values
      if (!nextKf && localFrame >= kfEnd) {
        return {
          rotateX: kf.rotateX,
          rotateY: kf.rotateY,
          rotateZ: kf.rotateZ,
        };
      }
    }

    return { rotateX: 0, rotateY: 0, rotateZ: 0 };
  };

  const rotation = computeRotation();

  // -----------------------------------------------
  // Dot: incandescent, pulsing scale +/-8% via sin wave
  // -----------------------------------------------
  const dotScale = 1 + 0.08 * Math.sin(localFrame / 4);

  // Glow: maximum intensity
  const glowBlur = 100;
  const glowOpacity = 0.5;

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      {/* ---- Large terracotta glow halo ---- */}
      <div
        style={{
          position: 'absolute',
          left: COMP.cx - 200,
          top: COMP.cy - 200,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(196, 92, 59, ${glowOpacity}) 0%, transparent 60%)`,
          pointerEvents: 'none',
        }}
      />

      {/* ---- Logo3D with dynamic rotations ---- */}
      <Logo3D
        x={COMP.cx}
        y={COMP.cy}
        scale={1}
        logoScale={1.5}
        fillColor={C.textPrimary}
        rotateX={rotation.rotateX}
        rotateY={rotation.rotateY}
        rotateZ={rotation.rotateZ}
        edgeOpacity={0.8}
        extrusionDepth={10}
        showEdgeGlow={true}
      />

      {/* ---- Incandescent dot in the O ---- */}
      <LogoDot
        x={COMP.cx}
        y={COMP.cy}
        scale={dotScale}
        radius={16}
        glowBlur={glowBlur}
        glowOpacity={glowOpacity}
        variant="incandescent"
      />
    </AbsoluteFill>
  );
};
