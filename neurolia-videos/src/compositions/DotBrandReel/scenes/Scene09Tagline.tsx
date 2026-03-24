import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Easing,
  spring,
  useVideoConfig,
} from 'remotion';
import { C, COMP } from '../constants';
import { fontSatoshi } from '../font-loader';

/**
 * Scene 09 -- Tagline (from=768, duration=72, 6 beats)
 *
 * "Un business" appears at frame 15, "qui respire." at frame 30,
 * the period pops terracotta at frame 38. Micro-floating constant.
 * Ambient terracotta glow breathing behind.
 * useCurrentFrame() returns local frame (0-based) within the Sequence.
 */
export const Scene09Tagline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- "Un business" entrance (frame 15, 15 frames duration) ---
  const line1Progress = frame >= 15
    ? interpolate(frame - 15, [0, 15], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.ease),
      })
    : 0;

  const line1TranslateZ = interpolate(line1Progress, [0, 1], [-500, 0]);
  const line1Opacity = line1Progress;
  const line1RotateX = interpolate(line1Progress, [0, 1], [5, 0]);

  // --- "qui respire" (without period) entrance (frame 30, 15 frames duration) ---
  const line2Progress = frame >= 30
    ? interpolate(frame - 30, [0, 15], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.ease),
      })
    : 0;

  const line2TranslateZ = interpolate(line2Progress, [0, 1], [-500, 0]);
  const line2Opacity = line2Progress;
  const line2RotateX = interpolate(line2Progress, [0, 1], [5, 0]);

  // --- Period "." pop (frame 38) ---
  const dotSpring = frame >= 38
    ? spring({
        frame: frame - 38,
        fps,
        config: { damping: 10, stiffness: 200 },
      })
    : 0;

  // Scale: 0 -> overshoot ~1.2 -> settle 1.0
  const dotFinalScale = frame >= 38
    ? interpolate(
        dotSpring,
        [0, 0.5, 1],
        [0, 1.2, 1.0],
        { extrapolateRight: 'clamp' },
      )
    : 0;
  const dotOpacity = frame >= 38 ? Math.min(1, dotSpring * 2) : 0;

  // --- Micro-floating (constant, applied to whole text block) ---
  const floatY = Math.sin(frame * 0.06) * 4;
  const floatRotateX = Math.sin(frame * 0.04) * 1;

  // --- Ambient glow breathing ---
  const glowBreathing = 0.1 + Math.sin(frame * 0.08) * 0.04;

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      {/* Ambient terracotta glow */}
      <div
        style={{
          position: 'absolute',
          left: COMP.cx - 250,
          top: COMP.cy - 250,
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(196,92,59,${glowBreathing}) 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Text container with micro-floating */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: COMP.width,
          height: COMP.height,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `translateY(${floatY}px) rotateX(${floatRotateX}deg)`,
          perspective: '800px',
        }}
      >
        {/* Line 1: "Un business" */}
        <div
          style={{
            fontFamily: fontSatoshi,
            fontWeight: 500,
            fontSize: 56,
            color: C.textPrimary,
            lineHeight: 1.3,
            textAlign: 'center',
            transform: `translateZ(${line1TranslateZ}px) rotateX(${line1RotateX}deg)`,
            opacity: line1Opacity,
            userSelect: 'none',
          }}
        >
          Un business
        </div>

        {/* Line 2: "qui respire" + terracotta dot */}
        <div
          style={{
            fontFamily: fontSatoshi,
            fontWeight: 500,
            fontSize: 56,
            color: C.textPrimary,
            lineHeight: 1.3,
            textAlign: 'center',
            transform: `translateZ(${line2TranslateZ}px) rotateX(${line2RotateX}deg)`,
            opacity: line2Opacity,
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'center',
            userSelect: 'none',
          }}
        >
          <span>qui respire</span>
          {/* Terracotta period */}
          <span
            style={{
              color: C.primary,
              display: 'inline-block',
              transform: `scale(${dotFinalScale})`,
              opacity: dotOpacity,
              fontWeight: 700,
              marginLeft: 2,
            }}
          >
            .
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
