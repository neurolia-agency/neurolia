import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, interpolateColors } from 'remotion';
import { WALL_HITS } from '../utils/billiardPhysics';

const BG_COLORS = [
  '#FAFAF8',
  '#FFD6E0',
  '#C3D4F7',
  '#050810',
];

const GRID_COLORS = [
  'rgba(0, 0, 0, 0.02)',
  'rgba(180, 60, 80, 0.04)',
  'rgba(60, 80, 180, 0.04)',
  'rgba(255, 255, 255, 0.02)',
];

const TRANSITION_FRAMES = 4;

interface DynamicBackgroundProps {
  dotX?: number;
  dotY?: number;
}

export const DynamicBackground: React.FC<DynamicBackgroundProps> = ({
  dotX = 540,
  dotY = 960,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const hitFrames = WALL_HITS.map((h) => h.frame + 5);

  let bgColor = BG_COLORS[0];
  let gridColor = GRID_COLORS[0];
  let currentColorIndex = 0;

  for (let i = 0; i < hitFrames.length && i < 3; i++) {
    if (frame >= hitFrames[i]) {
      currentColorIndex = i + 1;
    }
  }

  if (currentColorIndex > 0) {
    const transitionStart = hitFrames[currentColorIndex - 1];
    if (frame < transitionStart + TRANSITION_FRAMES) {
      const t = Math.min((frame - transitionStart) / TRANSITION_FRAMES, 1);
      bgColor = interpolateColors(t, [0, 1], [BG_COLORS[currentColorIndex - 1], BG_COLORS[currentColorIndex]]);
      gridColor = interpolateColors(t, [0, 1], [GRID_COLORS[currentColorIndex - 1], GRID_COLORS[currentColorIndex]]);
    } else {
      bgColor = BG_COLORS[currentColorIndex];
      gridColor = GRID_COLORS[currentColorIndex];
    }
  }

  const activeFlash = WALL_HITS.find((hit) => {
    const hitFrame = hit.frame + 5;
    return frame >= hitFrame && frame < hitFrame + 6;
  });

  let flashOpacity = 0;
  let flashScale = 0;
  let flashX = 540;
  let flashY = 960;

  if (activeFlash) {
    const hitFrame = activeFlash.frame + 5;
    const localT = (frame - hitFrame) / 6;
    flashOpacity = interpolate(localT, [0, 0.1, 1], [1, 0.7, 0], {
      extrapolateRight: 'clamp',
    });
    flashScale = interpolate(localT, [0, 1], [0.2, 4]);
    flashX = activeFlash.x;
    flashY = activeFlash.y;
  }

  const breathe = Math.sin((frame / fps) * 0.3) * 0.5 + 0.5;
  const isDark = currentColorIndex >= 3;

  const px1 = { x: (dotX - 540) * 0.015, y: (dotY - 960) * 0.015 };

  return (
    <AbsoluteFill style={{ backgroundColor: bgColor, overflow: 'hidden' }}>
      {/* Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(${gridColor} 1px, transparent 1px),
            linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          opacity: 0.5,
        }}
      />

      {/* Parallax shapes */}
      <div
        style={{
          position: 'absolute',
          inset: -30,
          transform: `translate(${px1.x}px, ${px1.y}px)`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '12%',
            right: '8%',
            width: 250,
            height: 250,
            borderRadius: '50%',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.015)'}`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '25%',
            left: '8%',
            width: 180,
            height: 180,
            borderRadius: '50%',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.01)'}`,
          }}
        />
      </div>

      {/* Ambient glow (dark mode) */}
      {isDark && (
        <div
          style={{
            position: 'absolute',
            top: '25%',
            right: '5%',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(232, 112, 58, 0.06) 0%, transparent 70%)',
            opacity: 0.5 + breathe * 0.2,
            filter: 'blur(60px)',
          }}
        />
      )}

      {/* Flash shockwave */}
      {flashOpacity > 0 && (
        <div
          style={{
            position: 'absolute',
            left: flashX - 400,
            top: flashY - 400,
            width: 800,
            height: 800,
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.3) 30%, transparent 65%)`,
            opacity: flashOpacity,
            transform: `scale(${flashScale})`,
            pointerEvents: 'none',
          }}
        />
      )}
    </AbsoluteFill>
  );
};
