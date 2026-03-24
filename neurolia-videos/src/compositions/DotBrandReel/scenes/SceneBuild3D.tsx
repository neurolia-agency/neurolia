import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {
  COMP,
  BEAT,
  C,
  BUILD_3D,
  LETTER_KEYS,
  LETTER_FINAL_POSITIONS,
} from '../constants';
import type { LetterKey } from '../constants';
import { TechGrid } from '../components/TechGrid';
import { LogoSvg } from '../components/LogoSvg';
import { Logo3D } from '../components/Logo3D';
import { LogoDot } from '../components/LogoDot';

// ============================================
// Helper: beat to frame
// ============================================
const bf = (beat: number): number => beat * BEAT;

// Letters in left-to-right order for passes
const LETTERS_LTR: LetterKey[] = ['N', 'e', 'u', 'r', 'oRing', 'l', 'i', 'a'];
const LETTERS_RTL: LetterKey[] = [...LETTERS_LTR].reverse();

// Horizontal positions of each letter (canvas x coords)
const LETTER_X: Record<LetterKey, number> = {} as Record<LetterKey, number>;
for (const key of LETTER_KEYS) {
  LETTER_X[key] = LETTER_FINAL_POSITIONS[key].x;
}

// ============================================
// Scene Build3D (216 frames, 18 beats)
// ============================================
//
// The flat white "Neurolia" logo gains 3D progressively:
//   1. Dot rises above logo, exits screen, returns with 3D "tool"
//   2. Dot traverses letters L→R, adding extrusion
//   3. Dot traverses letters R→L, adding iridescent edges
//   4. Vitrification (holographic overlay)

export const SceneBuild3D: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase boundaries (local frames)
  const dotRiseStart = bf(BUILD_3D.dotRise.startBeat);       // 0
  const dotRiseEnd = bf(BUILD_3D.dotRise.endBeat + 1);       // 12
  const dotFetchStart = bf(BUILD_3D.dotFetch.startBeat);     // 12
  const dotFetchEnd = bf(BUILD_3D.dotFetch.endBeat + 1);     // 36
  const dotReturnStart = bf(BUILD_3D.dotReturn.startBeat);   // 36
  const dotReturnEnd = bf(BUILD_3D.dotReturn.endBeat + 1);   // 48
  const ext1Start = bf(BUILD_3D.extrusionPass1.startBeat);   // 48
  const ext1End = bf(BUILD_3D.extrusionPass1.endBeat + 1);   // 72
  const ext2Start = bf(BUILD_3D.extrusionPass2.startBeat);   // 72
  const ext2End = bf(BUILD_3D.extrusionPass2.endBeat + 1);   // 96
  const pauseStart = bf(BUILD_3D.pause.startBeat);           // 96
  const pauseEnd = bf(BUILD_3D.pause.endBeat + 1);           // 108
  const edge1Start = bf(BUILD_3D.edgesPass1.startBeat);      // 108
  const edge1End = bf(BUILD_3D.edgesPass1.endBeat + 1);      // 132
  const edge2Start = bf(BUILD_3D.edgesPass2.startBeat);      // 132
  const edge2End = bf(BUILD_3D.edgesPass2.endBeat + 1);      // 156
  const dotSettleStart = bf(BUILD_3D.dotSettle.startBeat);   // 156
  const dotSettleEnd = bf(BUILD_3D.dotSettle.endBeat + 1);   // 168
  const vitrifyStartF = bf(BUILD_3D.vitrifyStart.startBeat); // 168
  const vitrifyStartEnd = bf(BUILD_3D.vitrifyStart.endBeat + 1); // 192
  const vitrifyCompleteF = bf(BUILD_3D.vitrifyComplete.startBeat); // 192
  const vitrifyCompleteEnd = bf(BUILD_3D.vitrifyComplete.endBeat + 1); // 216

  // ============================================
  // DOT POSITION
  // ============================================

  const logoY = COMP.cy;
  const oRingX = LETTER_FINAL_POSITIONS.oRing.x;
  const oRingY = LETTER_FINAL_POSITIONS.oRing.y;

  let dotX = oRingX;
  let dotY = oRingY;
  let dotGlowBlur = 40;
  let dotGlowOpacity = 0.15;
  let dotVariant: 'flat' | 'incandescent' = 'flat';
  let dotScale = 1;

  if (frame < dotRiseEnd) {
    // dotRise: dot rises from O position to above logo
    const t = interpolate(frame, [dotRiseStart, dotRiseEnd], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.ease),
    });
    dotX = oRingX;
    dotY = interpolate(t, [0, 1], [oRingY, logoY - 120]);
  } else if (frame < dotFetchEnd) {
    // dotFetch: dot exits screen top
    const t = interpolate(frame, [dotFetchStart, dotFetchEnd], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.in(Easing.quad),
    });
    dotX = oRingX;
    dotY = interpolate(t, [0, 1], [logoY - 120, -80]);
  } else if (frame < dotReturnEnd) {
    // dotReturn: dot returns with terracotta halo -- changed mode
    const t = interpolate(frame, [dotReturnStart, dotReturnEnd], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.exp),
    });
    dotX = oRingX;
    dotY = interpolate(t, [0, 1], [-80, logoY - 60]);
    dotGlowBlur = 60;
    dotGlowOpacity = 0.4;
    dotVariant = 'flat';
  } else if (frame < ext2End) {
    // Extrusion passes: dot traverses horizontally L→R
    const extTotalStart = ext1Start; // 48
    const extTotalEnd = ext2End; // 96

    const leftmostX = LETTER_FINAL_POSITIONS.N.x - 30;
    const rightmostX = LETTER_FINAL_POSITIONS.a.x + 30;

    const t = interpolate(frame, [extTotalStart, extTotalEnd], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.ease),
    });
    dotX = interpolate(t, [0, 1], [leftmostX, rightmostX]);
    dotY = logoY - 60;
    dotGlowBlur = 60;
    dotGlowOpacity = 0.4;
  } else if (frame < pauseEnd) {
    // Pause: dot stays at right end
    dotX = LETTER_FINAL_POSITIONS.a.x + 30;
    dotY = logoY - 60;
    dotGlowBlur = 60;
    dotGlowOpacity = 0.4;
  } else if (frame < edge2End) {
    // Edge passes: dot traverses R→L
    const edgeTotalStart = edge1Start; // 108
    const edgeTotalEnd = edge2End; // 156

    const leftmostX = LETTER_FINAL_POSITIONS.N.x - 30;
    const rightmostX = LETTER_FINAL_POSITIONS.a.x + 30;

    const t = interpolate(frame, [edgeTotalStart, edgeTotalEnd], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.ease),
    });
    dotX = interpolate(t, [0, 1], [rightmostX, leftmostX]);
    dotY = logoY - 60;
    dotGlowBlur = 60;
    dotGlowOpacity = 0.4;
  } else if (frame < dotSettleEnd) {
    // dotSettle: dot moves to O position
    const t = interpolate(frame, [dotSettleStart, dotSettleEnd], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.exp),
    });
    const leftmostX = LETTER_FINAL_POSITIONS.N.x - 30;
    dotX = interpolate(t, [0, 1], [leftmostX, oRingX]);
    dotY = interpolate(t, [0, 1], [logoY - 60, oRingY]);
    dotGlowBlur = interpolate(t, [0, 1], [60, 40]);
    dotGlowOpacity = interpolate(t, [0, 1], [0.4, 0.15]);
  } else {
    // Vitrification: dot in O position, pulses incandescent
    dotX = oRingX;
    dotY = oRingY;
    dotVariant = 'incandescent';
    // Pulsing during vitrification
    const pulseT = interpolate(
      frame,
      [vitrifyCompleteF, vitrifyCompleteEnd],
      [0, Math.PI * 2],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
    );
    dotScale = 1 + Math.sin(pulseT) * 0.15;
    dotGlowBlur = 50;
    dotGlowOpacity = 0.3;
  }

  // ============================================
  // EXTRUSION PROGRESS (per letter)
  // ============================================

  // Determine which letters have extrusion based on dot position
  const getExtrusionProgress = (letterKey: LetterKey): number => {
    const letterX = LETTER_X[letterKey];
    const leftmostX = LETTER_FINAL_POSITIONS.N.x - 30;
    const rightmostX = LETTER_FINAL_POSITIONS.a.x + 30;
    const totalRange = rightmostX - leftmostX;

    // The letter gets extruded when the dot passes its x position
    const letterNorm = (letterX - leftmostX) / totalRange;
    const extTotalStart = ext1Start;
    const extTotalEnd = ext2End;

    if (frame < extTotalStart) return 0;

    const dotProgress = interpolate(frame, [extTotalStart, extTotalEnd], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

    // Letter extruded when dot passes it (with a slight lead)
    const triggerT = Math.max(0, dotProgress - letterNorm + 0.05);
    return Math.min(triggerT * 20, 1); // Fast fade-in over ~3 frames
  };

  // Total extrusion progress (0 = no extrusion, 1 = all letters extruded)
  const allExtruded = frame >= ext2End;
  const extrusionDepth = allExtruded
    ? 10
    : Math.round(
        LETTER_KEYS.reduce((sum, k) => sum + getExtrusionProgress(k), 0) /
          LETTER_KEYS.length *
          10,
      );

  // ============================================
  // EDGE GLOW PROGRESS
  // ============================================

  const getEdgeProgress = (letterKey: LetterKey): number => {
    const letterX = LETTER_X[letterKey];
    const leftmostX = LETTER_FINAL_POSITIONS.N.x - 30;
    const rightmostX = LETTER_FINAL_POSITIONS.a.x + 30;
    const totalRange = rightmostX - leftmostX;

    // Edges are added R→L, so we reverse the normalization
    const letterNorm = (rightmostX - letterX) / totalRange;
    const edgeTotalStart = edge1Start;
    const edgeTotalEnd = edge2End;

    if (frame < edgeTotalStart) return 0;

    const dotProgress = interpolate(frame, [edgeTotalStart, edgeTotalEnd], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

    const triggerT = Math.max(0, dotProgress - letterNorm + 0.05);
    return Math.min(triggerT * 20, 1);
  };

  const allEdges = frame >= edge2End;
  const edgeOpacity = allEdges
    ? 1
    : LETTER_KEYS.reduce((sum, k) => sum + getEdgeProgress(k), 0) / LETTER_KEYS.length;

  const showEdgeGlow = frame >= edge1Start;

  // ============================================
  // VITRIFICATION PROGRESS
  // ============================================

  let vitrification = 0;
  if (frame >= vitrifyStartF && frame < vitrifyStartEnd) {
    vitrification = interpolate(frame, [vitrifyStartF, vitrifyStartEnd], [0, 0.5], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  } else if (frame >= vitrifyCompleteF) {
    vitrification = interpolate(frame, [vitrifyCompleteF, vitrifyCompleteEnd], [0.5, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  }

  // ============================================
  // FLAT → 3D CROSSFADE
  // ============================================

  // The flat logo disappears as the 3D version takes over
  // Crossfade happens at extrusion pass 1 start
  const flatOpacity = interpolate(frame, [ext1Start, ext1Start + 5], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const show3D = frame >= ext1Start;

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      {/* Technical grid */}
      <TechGrid opacity={1} />

      {/* Flat white logo (visible until extrusion begins) */}
      {flatOpacity > 0 && (
        <AbsoluteFill style={{ opacity: flatOpacity }}>
          <LogoSvg
            x={oRingX}
            y={oRingY}
            fillColor="#F5F5F5"
          />
        </AbsoluteFill>
      )}

      {/* 3D extruded logo (appears as flat fades) */}
      {show3D && (
        <Logo3D
          x={oRingX}
          y={oRingY}
          fillColor="#F5F5F5"
          extrusionDepth={extrusionDepth}
          showEdgeGlow={showEdgeGlow}
          edgeOpacity={edgeOpacity}
          vitrification={vitrification}
          frame={frame}
        />
      )}

      {/* Dot */}
      <LogoDot
        x={dotX}
        y={dotY}
        scale={dotScale}
        radius={20}
        glowBlur={dotGlowBlur}
        glowOpacity={dotGlowOpacity}
        variant={dotVariant}
        opacity={1}
      />
    </AbsoluteFill>
  );
};
