import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  interpolate,
  Easing,
} from 'remotion';
import { z } from 'zod';
import { DynamicBackground } from './components/DynamicBackground';
import { BouncingDot } from './components/BouncingDot';
import { LOGO_VIEWBOX, LOGO_PATHS } from './components/LogoSVG';
import { computeBilliardState, getLastBilliardPosition } from './utils/billiardPhysics';
import { SceneDotBounce } from './scenes/SceneDotBounce';
import { SceneLogoCompose } from './scenes/SceneLogoCompose';
import { SceneDotEscape } from './scenes/SceneDotEscape';
import { SceneServiceReveal } from './scenes/SceneServiceReveal';
import { SceneStats } from './scenes/SceneStats';
import { SceneDotReturn } from './scenes/SceneDotReturn';

export const dotServicesReelSchema = z.object({});

// ============================================
// LAYOUT CONSTANTS
// ============================================

const LOGO_WIDTH = 500;
const LOGO_HEIGHT = (LOGO_VIEWBOX.height / LOGO_VIEWBOX.width) * LOGO_WIDTH;
const SVG_SCALE = LOGO_WIDTH / LOGO_VIEWBOX.width;

const LOGO_X = (1080 - LOGO_WIDTH) / 2;
const LOGO_Y = (1920 - LOGO_HEIGHT) / 2 - 40;

const O_DOT_X = LOGO_X + LOGO_PATHS.oDot.cx * SVG_SCALE;
const O_DOT_Y = LOGO_Y + LOGO_PATHS.oDot.cy * SVG_SCALE;

const LOGO_Y_SCENE6 = 680;
const O_DOT_Y_SCENE6 = LOGO_Y_SCENE6 + LOGO_PATHS.oDot.cy * SVG_SCALE;

// ============================================
// SCENE TIMINGS
// ============================================

const S = {
  scene1: { start: 0, end: 120 },
  scene2: { start: 120, end: 250 },
  scene3: { start: 250, end: 450 },
  scene4: { start: 450, end: 720 },
  scene5: { start: 720, end: 900 },
  scene6: { start: 900, end: 1110 },
};

// ============================================
// DOT STATE
// ============================================

interface DotState {
  x: number;
  y: number;
  radius: number;
  squashX: number;
  squashY: number;
  rotation: number;
  opacity: number;
  glowIntensity: number;
  scale: number;
  visible: boolean;
}

// ============================================
// COMPUTE DOT TIMELINE
// ============================================

function computeDotTimeline(frame: number, fps: number): DotState {
  const CX = 540;
  const DOT_RADIUS = 24;

  const state: DotState = {
    x: CX,
    y: -50,
    radius: DOT_RADIUS,
    squashX: 1,
    squashY: 1,
    rotation: 0,
    opacity: 1,
    glowIntensity: 0,
    scale: 1,
    visible: true,
  };

  // ============================================
  // SCENE 1: Billiard Bounces (0-120)
  // ============================================
  if (frame < S.scene1.end) {
    if (frame < 5) {
      state.opacity = 0;
    } else if (frame < 100) {
      const billiard = computeBilliardState(frame - 5);
      state.x = billiard.x;
      state.y = billiard.y;
      state.rotation = billiard.velocityAngle;

      const speed = Math.sqrt(billiard.vx * billiard.vx + billiard.vy * billiard.vy);
      if (speed > 10) {
        const stretchFactor = Math.min(speed / 25, 0.15);
        state.squashX = 1 + stretchFactor;
        state.squashY = 1 - stretchFactor * 0.5;
      }

      const nearLeft = state.x < 50;
      const nearRight = state.x > 1030;
      const nearBottom = state.y > 1870;
      const nearTop = state.y < 50;

      if (nearLeft || nearRight || nearTop || nearBottom) {
        state.squashX = 1.35;
        state.squashY = 0.65;
        state.glowIntensity = 0.7;
      }
    } else {
      const lastPos = getLastBilliardPosition();
      const t = Math.min((frame - 100) / 20, 1);
      const easedT = Easing.out(Easing.exp)(t);
      state.x = interpolate(easedT, [0, 1], [lastPos.x, CX]);
      state.y = interpolate(easedT, [0, 1], [lastPos.y, 960]);
      state.rotation = 0;

      if (t > 0.6) {
        const breathe = Math.sin(((frame - 112) / fps) * 3) * 0.02;
        state.squashX = 1 + breathe;
        state.squashY = 1 - breathe;
      }
    }
    return state;
  }

  // ============================================
  // SCENE 2: Logo Compose (120-250)
  // ============================================
  if (frame < S.scene2.end) {
    if (frame < 140) {
      const t = (frame - 120) / 20;
      state.scale = interpolate(t, [0, 0.6, 1], [1, 3.2, 3], {
        easing: Easing.out(Easing.quad),
      });
      state.x = CX;
      state.y = 960;
      state.glowIntensity = interpolate(t, [0, 0.5, 1], [0, 0.4, 0.6]);
    } else if (frame < 162) {
      const t = (frame - 140) / 22;
      const easedT = Easing.out(Easing.cubic)(Math.min(t, 1));
      state.scale = interpolate(easedT, [0, 0.4, 1], [3, 1.5, 1]);
      state.x = interpolate(easedT, [0, 1], [CX, O_DOT_X]);
      state.y = interpolate(easedT, [0, 1], [960, O_DOT_Y]);
      state.y += Math.sin(easedT * Math.PI) * -150;
      state.glowIntensity = interpolate(easedT, [0, 0.3, 1], [0.6, 0.3, 0]);

      if (frame >= 160) {
        const clickT = (frame - 160) / 2;
        state.glowIntensity = interpolate(clickT, [0, 0.5, 1], [0, 0.9, 0]);
      }
    } else {
      state.visible = false;
    }
    return state;
  }

  // ============================================
  // SCENE 3: Dot Escape + Baseline (250-450)
  // ============================================
  if (frame < S.scene3.end) {
    const local = frame - S.scene3.start;

    if (local < 10) {
      const amplitude = interpolate(local, [0, 10], [2, 18]);
      state.x = O_DOT_X + Math.sin((local / fps) * 30) * amplitude;
      state.y = O_DOT_Y;
    } else if (local < 25) {
      const t = (local - 10) / 15;
      state.scale = interpolate(t, [0, 0.7, 1], [1, 2.6, 2.5], {
        easing: Easing.out(Easing.quad),
      });
      state.x = O_DOT_X;
      state.y = O_DOT_Y;
      state.glowIntensity = interpolate(t, [0, 1], [0.2, 0.7]);
    } else if (local < 35) {
      const t = (local - 25) / 10;
      const easedT = Easing.out(Easing.exp)(Math.min(t, 1));
      state.scale = interpolate(easedT, [0, 1], [2.5, 1]);
      state.x = interpolate(easedT, [0, 1], [O_DOT_X, 900]);
      state.y = interpolate(easedT, [0, 1], [O_DOT_Y, O_DOT_Y - 150]);
      state.rotation = interpolate(easedT, [0, 1], [0, 25]);
      state.squashX = interpolate(easedT, [0, 0.3, 1], [1, 1.3, 1]);
      state.squashY = interpolate(easedT, [0, 0.3, 1], [1, 0.7, 1]);
    } else if (local < 100) {
      const t = (local - 35) / 65;
      state.x = interpolate(t,
        [0, 0.15, 0.35, 0.55, 0.75, 1],
        [900, 1020, 200, 100, 800, 700]
      );
      state.y = interpolate(t,
        [0, 0.15, 0.35, 0.55, 0.75, 1],
        [O_DOT_Y - 150, 300, 500, 1500, 1200, 500]
      );
      state.rotation = interpolate(t, [0, 0.5, 1], [25, -15, 0]);

      if (t < 0.7) {
        const stretch = 0.08 * (1 - t);
        state.squashX = 1 + stretch;
        state.squashY = 1 - stretch * 0.5;
      }

      if (state.x > 1020 || state.x < 60 || state.y > 1870 || state.y < 50) {
        state.squashX = 1.25;
        state.squashY = 0.75;
        state.glowIntensity = 0.5;
      }
    } else {
      const settleT = Math.min((local - 100) / 20, 1);
      const easedSettle = Easing.out(Easing.exp)(settleT);

      const restX = 850;
      const restY = 450;
      state.x = interpolate(easedSettle, [0, 1], [700, restX]);
      state.y = interpolate(easedSettle, [0, 1], [500, restY]);
      state.rotation = 0;

      if (settleT >= 1) {
        const orbitT = (local - 120) / fps;
        state.x = restX + Math.cos(orbitT * 1.5) * 25;
        state.y = restY + Math.sin(orbitT * 1.5) * 25;
      }

      const breathe = Math.sin(((local - 100) / fps) * 3) * 0.15;
      state.glowIntensity = 0.2 + Math.max(0, breathe);
      state.squashX = 1 + Math.sin(((local - 100) / fps) * 2.5) * 0.015;
      state.squashY = 1 - Math.sin(((local - 100) / fps) * 2.5) * 0.015;
    }
    return state;
  }

  // ============================================
  // SCENE 4: Service Reveal (450-720)
  // ============================================
  if (frame < S.scene4.end) {
    const local = frame - S.scene4.start;
    const DOT_SVC_X = 110;

    if (local < 20) {
      const t = local / 20;
      state.x = interpolate(t, [0, 1], [850, DOT_SVC_X]);
      state.y = interpolate(t, [0, 1], [450, 540], {
        easing: Easing.out(Easing.quad),
      });
    } else {
      const breathe = Math.sin(((local - 20) / fps) * 2) * 0.015;
      state.x = DOT_SVC_X;
      state.y = 540;
      state.squashX = 1 + breathe;
      state.squashY = 1 - breathe;
    }
    return state;
  }

  // ============================================
  // SCENE 5: Stats (720-900)
  // ============================================
  if (frame < S.scene5.end) {
    const local = frame - S.scene5.start;

    if (local < 20) {
      const t = local / 20;
      state.x = interpolate(t, [0, 1], [110, CX]);
      state.y = interpolate(t, [0, 1], [540, 400], {
        easing: Easing.out(Easing.quad),
      });
    } else if (local < 40) {
      const t = (local - 20) / 20;
      state.x = CX;
      state.y = interpolate(t, [0, 1], [400, 440], {
        easing: Easing.inOut(Easing.quad),
      });
    } else if (local < 42) {
      const t = (local - 40) / 2;
      state.x = CX;
      state.y = 440;
      state.squashX = interpolate(t, [0, 0.5, 1], [1, 1.2, 1]);
      state.squashY = interpolate(t, [0, 0.5, 1], [1, 0.8, 1]);
      state.glowIntensity = interpolate(t, [0, 0.5, 1], [0, 0.7, 0.2]);
    } else if (local < 100) {
      if (local < 80) {
        state.x = CX;
        state.y = 440;
        const breathe = Math.sin(((local - 42) / fps) * 3) * 0.015;
        state.squashX = 1 + breathe;
        state.squashY = 1 - breathe;
      } else {
        const t = (local - 80) / 20;
        state.x = CX;
        state.y = interpolate(t, [0, 1], [440, 990], {
          easing: Easing.inOut(Easing.quad),
        });
      }
    } else if (local < 102) {
      const t = (local - 100) / 2;
      state.x = CX;
      state.y = 990;
      state.squashX = interpolate(t, [0, 0.5, 1], [1, 1.2, 1]);
      state.squashY = interpolate(t, [0, 0.5, 1], [1, 0.8, 1]);
      state.glowIntensity = interpolate(t, [0, 0.5, 1], [0, 0.7, 0.2]);
    } else {
      state.x = CX;
      state.y = 990;
      const breathe = Math.sin(((local - 102) / fps) * 3) * 0.015;
      state.squashX = 1 + breathe;
      state.squashY = 1 - breathe;
    }
    return state;
  }

  // ============================================
  // SCENE 6: Dot Return (900-1110)
  // ============================================
  {
    const local = frame - S.scene6.start;

    if (local < 20) {
      const t = local / 20;
      state.x = interpolate(t, [0, 1], [CX, CX + 50]);
      state.y = interpolate(t, [0, 1], [990, 700], {
        easing: Easing.out(Easing.quad),
      });
    } else if (local < 50) {
      const t = (local - 20) / 30;
      const easedT = Easing.out(Easing.exp)(Math.min(t, 1));
      const targetX = LOGO_X + LOGO_PATHS.oDot.cx * SVG_SCALE;
      state.x = interpolate(easedT, [0, 1], [CX + 50, targetX]);
      state.y = interpolate(easedT, [0, 1], [700, O_DOT_Y_SCENE6]);
      state.y += Math.sin(easedT * Math.PI) * -60;

      if (local >= 48) {
        const clickT = (local - 48) / 2;
        state.glowIntensity = interpolate(clickT, [0, 0.5, 1], [0, 0.8, 0]);
      }
    } else {
      state.visible = false;
    }
  }

  return state;
}

// ============================================
// SCENE TRANSITION TILT
// ============================================

function computeSceneTilt(frame: number): number {
  const boundaries = [S.scene1.end, S.scene2.end, S.scene3.end, S.scene4.end, S.scene5.end];

  for (const boundary of boundaries) {
    const dist = Math.abs(frame - boundary);
    if (dist < 5) {
      return 3 * Math.sin((1 - dist / 5) * Math.PI * 0.5);
    }
  }
  return 0;
}

// ============================================
// MAIN COMPOSITION
// ============================================

export const DotServicesReel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dotState = computeDotTimeline(frame, fps);
  const sceneTilt = computeSceneTilt(frame);

  return (
    <AbsoluteFill>
      <DynamicBackground
        dotX={dotState.visible ? dotState.x : 540}
        dotY={dotState.visible ? dotState.y : 960}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          perspective: '1200px',
          perspectiveOrigin: '540px 960px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transform: `rotateX(${sceneTilt}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          <Sequence from={S.scene1.start} durationInFrames={S.scene1.end - S.scene1.start} premountFor={fps}>
            <SceneDotBounce />
          </Sequence>

          <Sequence from={S.scene2.start} durationInFrames={S.scene2.end - S.scene2.start} premountFor={fps}>
            <SceneLogoCompose />
          </Sequence>

          <Sequence from={S.scene3.start} durationInFrames={S.scene3.end - S.scene3.start} premountFor={fps}>
            <SceneDotEscape />
          </Sequence>

          <Sequence from={S.scene4.start} durationInFrames={S.scene4.end - S.scene4.start} premountFor={fps}>
            <SceneServiceReveal />
          </Sequence>

          <Sequence from={S.scene5.start} durationInFrames={S.scene5.end - S.scene5.start} premountFor={fps}>
            <SceneStats />
          </Sequence>

          <Sequence from={S.scene6.start} durationInFrames={S.scene6.end - S.scene6.start} premountFor={fps}>
            <SceneDotReturn />
          </Sequence>
        </div>
      </div>

      {dotState.visible && (
        <BouncingDot
          x={dotState.x}
          y={dotState.y}
          radius={dotState.radius}
          squashX={dotState.squashX}
          squashY={dotState.squashY}
          rotation={dotState.rotation}
          opacity={dotState.opacity}
          glowIntensity={dotState.glowIntensity}
          scale={dotState.scale}
        />
      )}
    </AbsoluteFill>
  );
};
