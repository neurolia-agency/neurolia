import React from 'react';
import { spring, useVideoConfig, interpolate, Easing } from 'remotion';
import { COMP, C, SPRINGS } from '../constants';
import { fontSatoshi } from '../font-loader';

type AnimationType = 'flipX' | 'flipY' | 'spinZoom' | 'depthRush';

interface ServicePunchProps {
  text: string;
  fontSize: number;
  frame: number;
  duration: number;
  animationType: AnimationType;
}

/**
 * A single service text that punches in with a unique 3D animation,
 * holds, then exits with scale+opacity+translateY.
 */
export const ServicePunch: React.FC<ServicePunchProps> = ({
  text,
  fontSize,
  frame,
  duration,
  animationType,
}) => {
  const { fps } = useVideoConfig();

  // Phase boundaries
  const enterEnd = 10;
  const exitStart = duration - 12;

  // --- Entrance spring (0 -> 1) ---
  const enterSpring = spring({
    frame: Math.max(0, frame),
    fps,
    config: getSpringConfig(animationType),
    durationInFrames: enterEnd + 10, // give spring enough room to settle
  });

  // --- Exit progress (0 -> 1) ---
  const exitProgress = frame >= exitStart
    ? interpolate(frame, [exitStart, duration], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.in(Easing.ease),
      })
    : 0;

  // Exit transforms
  const exitScale = 1 - exitProgress * 0.15; // 1 -> 0.85
  const exitOpacity = 1 - exitProgress; // 1 -> 0
  const exitTranslateY = -exitProgress * 20; // 0 -> -20

  // --- Entrance transforms per animation type ---
  const enterTransform = getEnterTransform(animationType, enterSpring, frame, enterEnd);

  // Combined opacity: fade in during first 4 frames, fade out during exit
  const enterOpacity = interpolate(frame, [0, 4], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = enterOpacity * exitOpacity;

  // --- Shockwave flash ---
  const flashScale = interpolate(frame, [0, 6], [0, 2.5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const flashOpacity = interpolate(frame, [0, 1, 6], [0, 0.5, 0.15], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const showFlash = frame >= 0 && frame <= 8;

  // --- Text extrusion layers ---
  const extrusionLayers = [
    { offset: 2, color: C.extrusion[4] },
    { offset: 4, color: C.extrusion[6] },
    { offset: 6, color: C.extrusion[8] },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: COMP.width,
        height: COMP.height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '800px',
      }}
    >
      {/* Terracotta halo */}
      <div
        style={{
          position: 'absolute',
          left: COMP.cx - 300,
          top: COMP.cy - 300,
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(196,92,59,0.35) 0%, transparent 70%)',
          opacity: opacity * 0.8,
          pointerEvents: 'none',
        }}
      />

      {/* Shockwave flash */}
      {showFlash && (
        <div
          style={{
            position: 'absolute',
            left: COMP.cx - 150,
            top: COMP.cy - 150,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(196,92,59,0.6) 0%, transparent 70%)',
            transform: `scale(${flashScale})`,
            opacity: flashOpacity,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Text container with 3D transforms */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: COMP.width,
          height: COMP.height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `${enterTransform} scale(${exitScale}) translateY(${exitTranslateY}px)`,
          opacity,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Extrusion layers (behind) */}
        {extrusionLayers.map((layer, i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              fontFamily: fontSatoshi,
              fontWeight: 700,
              fontSize,
              color: layer.color,
              textAlign: 'center',
              lineHeight: 1.1,
              maxWidth: COMP.width - 80,
              transform: `translate(${layer.offset}px, ${layer.offset}px)`,
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          >
            {text}
          </span>
        ))}

        {/* Main text */}
        <span
          style={{
            position: 'relative',
            fontFamily: fontSatoshi,
            fontWeight: 700,
            fontSize,
            color: C.textPrimary,
            textAlign: 'center',
            lineHeight: 1.1,
            maxWidth: COMP.width - 80,
            userSelect: 'none',
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

/**
 * Returns the spring config for each animation type.
 */
function getSpringConfig(type: AnimationType) {
  switch (type) {
    case 'flipX':
      return SPRINGS.servicePunch; // { damping: 10, stiffness: 150 }
    case 'flipY':
      return SPRINGS.servicePunch;
    case 'spinZoom':
      return SPRINGS.serviceElastic; // { damping: 8, stiffness: 120 }
    case 'depthRush':
      return SPRINGS.serviceHeavy; // { damping: 12, stiffness: 80, mass: 1.2 }
  }
}

/**
 * Returns the CSS transform string for the entrance animation.
 */
function getEnterTransform(
  type: AnimationType,
  enterSpring: number,
  frame: number,
  enterEnd: number,
): string {
  // enterSpring goes 0 -> 1 (with spring overshoot)
  const progress = enterSpring;

  switch (type) {
    case 'flipX': {
      // rotateX: -90 -> 0 entrance
      const rotateX = -90 * (1 - progress);
      return `rotateX(${rotateX}deg)`;
    }
    case 'flipY': {
      // rotateY: 90 -> 0 entrance
      const rotateY = 90 * (1 - progress);
      return `rotateY(${rotateY}deg)`;
    }
    case 'spinZoom': {
      // scale 0 -> 1 + rotateZ 180 -> 0
      const scale = progress;
      const rotateZ = 180 * (1 - progress);
      return `scale(${scale}) rotateZ(${rotateZ}deg)`;
    }
    case 'depthRush': {
      // translateZ -1500 -> 0 + rotateX 10 -> 0
      const translateZ = -1500 * (1 - progress);
      const rotateX = 10 * (1 - progress);
      return `translateZ(${translateZ}px) rotateX(${rotateX}deg)`;
    }
  }
}
