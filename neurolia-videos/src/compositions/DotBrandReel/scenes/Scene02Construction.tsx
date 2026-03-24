import React, { useMemo } from 'react';
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
  LOGO_SVG,
  LOGO_PATHS,
  LETTER_FINAL_POSITIONS,
  N_BUILD,
  EUROLIA_SLIDES,
  N_JOIN,
  SPRINGS,
} from '../constants';
import type { LetterKey } from '../constants';
import { TechGrid } from '../components/TechGrid';
import { LogoDot } from '../components/LogoDot';

// ============================================
// Types
// ============================================

interface Vec2 {
  x: number;
  y: number;
}

interface GuideData {
  id: string;
  x?: number;
  y?: number;
  opacity: number;
}

// ============================================
// Bezier helpers
// ============================================

const bezierPoint = (t: number, p0: Vec2, ctrl: Vec2, p2: Vec2): Vec2 => ({
  x: (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * ctrl.x + t * t * p2.x,
  y: (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * ctrl.y + t * t * p2.y,
});

// ============================================
// Constants for the N construction
// ============================================

// N primitives in SVG units
const N_VB = { w: 12, h: 13.57 };
const N_SCALE = 7;
const N_BIG_SCALE = 3.5;

const N_CENTER_X = COMP.cx;
const N_CENTER_Y = COMP.cy;

// Logo anchor for final assembly
const renderScale = LOGO_SVG.scale;
const logoAnchorX = COMP.cx - LOGO_SVG.wordCenterX * renderScale;
const logoAnchorY = COMP.cy - (LOGO_SVG.viewBoxHeight / 2) * renderScale;

// Computed pixel dimensions for the N at big scale
const nPixelW = N_VB.w * N_SCALE * N_BIG_SCALE;
const nPixelH = N_VB.h * N_SCALE * N_BIG_SCALE;
const nTopLeftX = N_CENTER_X - nPixelW / 2;
const nTopLeftY = N_CENTER_Y - nPixelH / 2;

// Primitive dimensions at big scale
const barW = 3.5 * N_SCALE * N_BIG_SCALE;  // ~85.75px
const barH = 13.57 * N_SCALE * N_BIG_SCALE; // ~332px
const bar2X_offset = 8.5 * N_SCALE * N_BIG_SCALE; // ~208px from left of N

// ============================================
// SVG path data (eurolia letters only)
// ============================================

const euroliaPathData: Partial<Record<LetterKey, string>> = {
  e: LOGO_PATHS.e,
  u: LOGO_PATHS.u,
  r: LOGO_PATHS.r,
  oRing: LOGO_PATHS.oRing,
  l: LOGO_PATHS.l,
  i: LOGO_PATHS.i,
  a: LOGO_PATHS.a,
};

// ============================================
// Dynamic construction guides
// ============================================

const DynamicGuides: React.FC<{ guides: GuideData[] }> = ({ guides }) => {
  const { width, height } = COMP;
  const guideColor = C.guideLine;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
    >
      {guides.map((g) => (
        <g key={g.id} opacity={g.opacity}>
          {g.y !== undefined && (
            <line
              x1={0}
              y1={g.y}
              x2={width}
              y2={g.y}
              stroke={guideColor}
              strokeWidth={0.5}
              strokeDasharray="4 6"
            />
          )}
          {g.x !== undefined && (
            <line
              x1={g.x}
              y1={0}
              x2={g.x}
              y2={height}
              stroke={guideColor}
              strokeWidth={0.5}
              strokeDasharray="4 6"
            />
          )}
        </g>
      ))}
    </svg>
  );
};

// ============================================
// Helper: beat-to-frame
// ============================================
const bf = (beat: number): number => beat * BEAT;

// ============================================
// Scene 02 — Construction (264 frames, 22 beats)
// ============================================
//
// Phase 1 (beats 0-16,  frames 0-204):  Build the N — dot LEAVES screen to fetch pieces
// Phase 2 (beats 17-19, frames 204-240): eurolia letters slide in from edges
// Phase 3 (beats 20-21, frames 240-264): N joins eurolia -> "Neurolia"

export const Scene02Construction: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ============================================
  // PHASE 1 — N construction (frames 0-204)
  // The dot LEAVES the screen to fetch each piece
  // ============================================

  const p = N_BUILD.phases;

  // Beat boundaries (local frames)
  const fetchBar1Start = bf(p.fetchBar1.startBeat);     // 0
  const fetchBar1End = bf(p.fetchBar1.endBeat + 1);     // 24
  const placeBar1Start = bf(p.placeBar1.startBeat);     // 24
  const placeBar1End = bf(p.placeBar1.endBeat + 1);     // 48
  const adjustBar1Start = bf(p.adjustBar1.startBeat);   // 48
  const adjustBar1End = bf(p.adjustBar1.endBeat + 1);   // 60
  const fetchDiagStart = bf(p.fetchDiag.startBeat);     // 60
  const fetchDiagEnd = bf(p.fetchDiag.endBeat + 1);     // 84
  const placeDiagStart = bf(p.placeDiag.startBeat);     // 84
  const placeDiagEnd = bf(p.placeDiag.endBeat + 1);     // 108
  const connectDiagStart = bf(p.connectDiag.startBeat); // 108
  const connectDiagEnd = bf(p.connectDiag.endBeat + 1); // 120
  const fetchBar2Start = bf(p.fetchBar2.startBeat);     // 120
  const fetchBar2End = bf(p.fetchBar2.endBeat + 1);     // 144
  const placeBar2Start = bf(p.placeBar2.startBeat);     // 144
  const placeBar2End = bf(p.placeBar2.endBeat + 1);     // 156
  const mergeStart = bf(p.merge.startBeat);             // 156
  const mergeEnd = bf(p.merge.endBeat + 1);             // 180
  const finalizeStart = bf(p.finalize.startBeat);       // 180
  const finalizeEnd = bf(p.finalize.endBeat + 1);       // 204

  // --- Bar 1 positions ---
  const bar1FinalX = nTopLeftX;
  const bar1FinalY = nTopLeftY;

  // Bar 1 visibility: appears at placeBar1Start (dot returns with it)
  const bar1Visible = frame >= placeBar1Start;

  // Bar 1 arrival spring
  const bar1ArrivalSpring = frame >= placeBar1Start
    ? spring({
        frame: frame - placeBar1Start,
        fps,
        config: SPRINGS.snap,
      })
    : 0;

  // Bar 1 arrives from the left with the dot
  const bar1X = bar1Visible
    ? interpolate(bar1ArrivalSpring, [0, 1], [-200, bar1FinalX])
    : -200;
  const bar1Y = bar1FinalY;

  // Bar 1 color: terracotta during transport, white after adjust
  const bar1ColorT = interpolate(
    frame,
    [adjustBar1Start, adjustBar1End],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );
  const bar1Color = bar1ColorT < 0.5 ? C.primary : '#F5F5F5';
  const bar1FillOpacity = interpolate(
    frame,
    [placeBar1Start, placeBar1Start + 6],
    [0.4, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  // Bar 1 outline (guides appear at adjust phase)
  const bar1OutlineOpacity = frame >= adjustBar1Start && frame < mergeStart
    ? interpolate(
        frame,
        [adjustBar1Start, adjustBar1Start + 6, mergeStart - 6, mergeStart],
        [0, 0.5, 0.5, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
      )
    : 0;

  // --- Diagonal ---
  // Diagonal is traced by the dot returning from top-right (placeDiag phase)
  const diagVisible = frame >= placeDiagStart;

  const diagDrawT = diagVisible
    ? interpolate(
        frame,
        [placeDiagStart, placeDiagEnd],
        [0, 1],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.ease) },
      )
    : 0;

  // Stroke thickness: starts thin, grows
  const diagThickness = diagVisible
    ? interpolate(
        frame,
        [placeDiagStart, placeDiagEnd + 12],
        [1, 4],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.ease) },
      )
    : 1;

  const diagOpacity = diagVisible
    ? interpolate(frame, [placeDiagStart, placeDiagStart + 3], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 0;

  // --- Bar 2 ---
  const bar2FinalX = nTopLeftX + bar2X_offset;
  const bar2FinalY = nTopLeftY;

  const bar2Visible = frame >= placeBar2Start;

  const bar2ArrivalSpring = frame >= placeBar2Start
    ? spring({
        frame: frame - placeBar2Start,
        fps,
        config: SPRINGS.snap,
      })
    : 0;

  const bar2X = bar2Visible
    ? interpolate(bar2ArrivalSpring, [0, 1], [COMP.width + 200, bar2FinalX])
    : COMP.width + 200;
  const bar2Y = bar2FinalY;

  // Bar 2 color: terracotta during transport, white shortly after
  const bar2ColorT = interpolate(
    frame,
    [placeBar2Start + 6, placeBar2Start + 12],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );
  const bar2Color = bar2ColorT < 0.5 ? C.primary : '#F5F5F5';
  const bar2FillOpacity = interpolate(
    frame,
    [placeBar2Start, placeBar2Start + 6],
    [0.4, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  const bar2OutlineOpacity = frame >= placeBar2Start && frame < mergeStart
    ? interpolate(
        frame,
        [placeBar2Start, Math.min(placeBar2Start + 6, mergeStart - 7), Math.max(placeBar2Start + 7, mergeStart - 6), mergeStart],
        [0, 0.5, 0.5, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
      )
    : 0;

  // --- Merge: primitives fade out, final N path fades in ---
  const mergeT = interpolate(frame, [mergeStart, mergeEnd], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.ease),
  });
  const primitivesOpacity = frame >= mergeStart
    ? interpolate(mergeT, [0, 0.6], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : 1;
  const nPathOpacity = frame >= mergeStart
    ? interpolate(mergeT, [0.3, 1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : 0;

  // N final color
  const nFinalColor = '#F5F5F5';

  // ============================================
  // PHASE 2 — eurolia slides (frames 204-240)
  // ============================================

  const euroliaStartFrame = EUROLIA_SLIDES.startBeat * BEAT; // 204

  const euroliaLetterStates = useMemo(() => {
    return EUROLIA_SLIDES.letters.map((letter) => {
      const letterStart = euroliaStartFrame + letter.delay;
      const springVal = frame >= letterStart
        ? spring({
            frame: frame - letterStart,
            fps,
            config: SPRINGS.slideIn,
          })
        : 0;

      const finalPos = LETTER_FINAL_POSITIONS[letter.key];
      let startX = finalPos.x;
      let startY = finalPos.y;

      switch (letter.fromEdge) {
        case 'top':
          startY = -150;
          break;
        case 'bottom':
          startY = COMP.height + 150;
          break;
        case 'left':
          startX = -200;
          break;
        case 'right':
          startX = COMP.width + 200;
          break;
      }

      const x = startX + (finalPos.x - startX) * springVal;
      const y = startY + (finalPos.y - startY) * springVal;
      const opacity = frame >= letterStart ? Math.min(springVal * 3, 1) : 0;

      return {
        key: letter.key,
        x,
        y,
        opacity,
        visible: frame >= letterStart,
      };
    });
  }, [frame, fps, euroliaStartFrame]);

  // ============================================
  // PHASE 3 — N joins eurolia (frames 240-264)
  // ============================================

  const nJoinStartFrame = N_JOIN.startBeat * BEAT; // 240
  const nJoinDuration = N_JOIN.duration; // 24

  const nJoinSpring = frame >= nJoinStartFrame
    ? spring({
        frame: frame - nJoinStartFrame,
        fps,
        config: { damping: 12, stiffness: 100 },
      })
    : 0;

  const nFinalPos = LETTER_FINAL_POSITIONS.N;

  // During phase 1-2 N is big at center, during phase 3 it transitions
  const nDisplayScale = frame < nJoinStartFrame
    ? N_BIG_SCALE
    : N_BIG_SCALE + (1 - N_BIG_SCALE) * nJoinSpring;

  const nDisplayX = frame < nJoinStartFrame
    ? N_CENTER_X
    : N_CENTER_X + (nFinalPos.x - N_CENTER_X) * nJoinSpring;

  const nDisplayY = frame < nJoinStartFrame
    ? N_CENTER_Y
    : N_CENTER_Y + (nFinalPos.y - N_CENTER_Y) * nJoinSpring;

  const nPathVisible = frame >= mergeStart;

  // ============================================
  // DOT CURSOR position
  // ============================================

  let dotX: number = COMP.cx;
  let dotY: number = COMP.cy;
  let dotScale = 1;
  let dotGlowBlur = 40;
  let dotGlowOpacity = 0.15;
  let dotVisible = true;

  if (frame < fetchBar1End) {
    // fetchBar1: dot leaves CENTER toward LEFT, exits screen
    const t = interpolate(frame, [fetchBar1Start, fetchBar1End], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.in(Easing.quad),
    });
    dotX = interpolate(t, [0, 1], [COMP.cx, -50]);
    dotY = COMP.cy;
  } else if (frame < placeBar1End) {
    // placeBar1: dot RETURNS from left, trailing bar1
    const t = interpolate(frame, [placeBar1Start, placeBar1End], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.exp),
    });
    // Dot arrives slightly ahead of the bar
    dotX = interpolate(t, [0, 1], [-50, bar1FinalX + barW + 20]);
    dotY = COMP.cy;
  } else if (frame < adjustBar1End) {
    // adjustBar1: dot hovers near bar1, adjusting
    dotX = bar1FinalX + barW + 20;
    dotY = COMP.cy;
    // Pulse during adjustment
    if (frame >= adjustBar1Start && frame < adjustBar1Start + 6) {
      dotScale = interpolate(frame, [adjustBar1Start, adjustBar1Start + 3, adjustBar1Start + 6], [1, 1.3, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
    }
  } else if (frame < fetchDiagEnd) {
    // fetchDiag: dot leaves toward TOP-RIGHT, exits screen
    const t = interpolate(frame, [fetchDiagStart, fetchDiagEnd], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.in(Easing.quad),
    });
    dotX = interpolate(t, [0, 1], [bar1FinalX + barW + 20, COMP.width + 50]);
    dotY = interpolate(t, [0, 1], [COMP.cy, -50]);
  } else if (frame < placeDiagEnd) {
    // placeDiag: dot returns TRACING the diagonal
    // Diagonal goes from top of bar1 to bottom-right of bar2
    const diagStartPx: Vec2 = { x: nTopLeftX + barW, y: nTopLeftY };
    const diagEndPx: Vec2 = { x: nTopLeftX + bar2X_offset, y: nTopLeftY + nPixelH };
    const t = interpolate(frame, [placeDiagStart, placeDiagEnd], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.ease),
    });
    dotX = diagStartPx.x + (diagEndPx.x - diagStartPx.x) * t;
    dotY = diagStartPx.y + (diagEndPx.y - diagStartPx.y) * t;
  } else if (frame < connectDiagEnd) {
    // connectDiag: dot hovers at diagonal connection point
    const diagEndPx: Vec2 = { x: nTopLeftX + bar2X_offset, y: nTopLeftY + nPixelH };
    dotX = diagEndPx.x;
    dotY = diagEndPx.y;
    // Pulse at connection
    if (frame >= connectDiagStart && frame < connectDiagStart + 6) {
      dotScale = interpolate(frame, [connectDiagStart, connectDiagStart + 3, connectDiagStart + 6], [1, 1.3, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
    }
  } else if (frame < fetchBar2End) {
    // fetchBar2: dot leaves toward RIGHT, exits screen
    const diagEndPx: Vec2 = { x: nTopLeftX + bar2X_offset, y: nTopLeftY + nPixelH };
    const t = interpolate(frame, [fetchBar2Start, fetchBar2End], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.in(Easing.quad),
    });
    dotX = interpolate(t, [0, 1], [diagEndPx.x, COMP.width + 50]);
    dotY = interpolate(t, [0, 1], [diagEndPx.y, COMP.cy]);
  } else if (frame < placeBar2End) {
    // placeBar2: dot returns from right with bar2
    const t = interpolate(frame, [placeBar2Start, placeBar2End], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.exp),
    });
    dotX = interpolate(t, [0, 1], [COMP.width + 50, bar2FinalX - 20]);
    dotY = COMP.cy;
  } else if (frame < mergeEnd) {
    // merge: dot moves to center
    const t = interpolate(frame, [mergeStart, mergeStart + 12], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.ease),
    });
    dotX = interpolate(t, [0, 1], [bar2FinalX - 20, COMP.cx]);
    dotY = COMP.cy;
    // Pulse at merge
    if (frame >= mergeStart && frame < mergeStart + 6) {
      dotScale = interpolate(frame, [mergeStart, mergeStart + 3, mergeStart + 6], [1, 1.4, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
    }
  } else if (frame < finalizeEnd) {
    // finalize: dot pulses at center
    dotX = COMP.cx;
    dotY = COMP.cy;
    if (frame >= finalizeStart && frame < finalizeStart + 6) {
      dotScale = interpolate(frame, [finalizeStart, finalizeStart + 3, finalizeStart + 6], [1, 1.3, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
    }
  } else if (frame < nJoinStartFrame) {
    // Phase 2: dot at center, waiting
    dotX = COMP.cx;
    dotY = COMP.cy;
  } else {
    // Phase 3: dot moves to the oDot position in the logo via Bezier arc
    const oDotFinalX = LETTER_FINAL_POSITIONS.oRing.x;
    const oDotFinalY = LETTER_FINAL_POSITIONS.oRing.y;

    const t = interpolate(frame, [nJoinStartFrame, nJoinStartFrame + nJoinDuration], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.exp),
    });

    const ctrl: Vec2 = {
      x: COMP.cx + (oDotFinalX - COMP.cx) * 0.3,
      y: COMP.cy - 80,
    };
    const pos = bezierPoint(
      t,
      { x: COMP.cx, y: COMP.cy },
      ctrl,
      { x: oDotFinalX, y: oDotFinalY },
    );
    dotX = pos.x;
    dotY = pos.y;
  }

  // ============================================
  // CONSTRUCTION GUIDES
  // ============================================

  const guides = useMemo(() => {
    const result: GuideData[] = [];

    // Bar 1 guides (appear at adjust phase)
    if (frame >= adjustBar1Start && frame < mergeStart) {
      const op = interpolate(
        frame,
        [adjustBar1Start, adjustBar1Start + 6, mergeStart - 6, mergeStart],
        [0, 0.35, 0.35, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
      );
      result.push(
        { id: 'bar1-h', y: nTopLeftY, opacity: op },
        { id: 'bar1-v', x: nTopLeftX, opacity: op },
      );
    }

    // Diagonal connection guides
    if (frame >= connectDiagStart && frame < mergeStart) {
      const op = interpolate(
        frame,
        [connectDiagStart, connectDiagStart + 6, mergeStart - 6, mergeStart],
        [0, 0.3, 0.3, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
      );
      result.push(
        { id: 'diag-h1', y: nTopLeftY, opacity: op },
        { id: 'diag-h2', y: nTopLeftY + nPixelH, opacity: op },
      );
    }

    // Bar 2 guides
    if (frame >= placeBar2Start && frame < mergeStart) {
      const op = interpolate(
        frame,
        [placeBar2Start, Math.min(placeBar2Start + 6, mergeStart - 7), Math.max(placeBar2Start + 7, mergeStart - 6), mergeStart],
        [0, 0.35, 0.35, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
      );
      result.push(
        { id: 'bar2-v', x: nTopLeftX + bar2X_offset + barW, opacity: op },
      );
    }

    // Merge guides (N bounding box)
    if (frame >= mergeStart && frame < finalizeEnd) {
      const op = interpolate(
        frame,
        [mergeStart, mergeStart + 6, finalizeEnd - 6, finalizeEnd],
        [0, 0.4, 0.4, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
      );
      result.push(
        { id: 'merge-top', y: nTopLeftY, opacity: op },
        { id: 'merge-bottom', y: nTopLeftY + nPixelH, opacity: op },
        { id: 'merge-left', x: nTopLeftX, opacity: op },
        { id: 'merge-right', x: nTopLeftX + nPixelW, opacity: op },
      );
    }

    return result;
  }, [frame]);

  // ============================================
  // FLASH on assembly complete
  // ============================================

  const assemblyCompleteFrame = nJoinStartFrame + nJoinDuration - 4;
  const flashOpacity = frame >= assemblyCompleteFrame && frame < assemblyCompleteFrame + 4
    ? interpolate(frame, [assemblyCompleteFrame, assemblyCompleteFrame + 4], [0.15, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 0;

  // ============================================
  // RENDER
  // ============================================

  // Show primitives during phase 1, before merge completes
  const showPrimitives = frame < mergeEnd && frame < N_BUILD.duration;

  // N SVG dimensions at current display scale
  const nSvgPixelW = N_VB.w * N_SCALE * nDisplayScale;
  const nSvgPixelH = N_VB.h * N_SCALE * nDisplayScale;

  // eurolia letter elements
  const euroliaElements = euroliaLetterStates.map((ls) => {
    if (!ls.visible) return null;

    const d = euroliaPathData[ls.key];
    if (!d) return null;

    const svgW = LOGO_SVG.viewBoxWidth * renderScale;
    const svgH = LOGO_SVG.viewBoxHeight * renderScale;

    const finalLetterPos = LETTER_FINAL_POSITIONS[ls.key];
    const offsetX = ls.x - finalLetterPos.x;
    const offsetY = ls.y - finalLetterPos.y;
    const svgLeft = logoAnchorX + offsetX;
    const svgTop = logoAnchorY + offsetY;

    return (
      <div
        key={ls.key}
        style={{
          position: 'absolute',
          left: svgLeft,
          top: svgTop,
          width: svgW,
          height: svgH,
          opacity: ls.opacity,
          pointerEvents: 'none',
          willChange: 'transform, opacity',
        }}
      >
        <svg
          width={svgW}
          height={svgH}
          viewBox={`0 0 ${LOGO_SVG.viewBoxWidth} ${LOGO_SVG.viewBoxHeight}`}
          style={{ overflow: 'visible' }}
        >
          <path d={d} fill="#F5F5F5" />
          {ls.key === 'oRing' && (
            <circle
              cx={LOGO_PATHS.oDot.cx}
              cy={LOGO_PATHS.oDot.cy}
              r={LOGO_PATHS.oDot.r}
              fill="none"
            />
          )}
        </svg>
      </div>
    );
  });

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      {/* Technical grid -- always visible */}
      <TechGrid opacity={1} />

      {/* Dynamic construction guides */}
      <DynamicGuides guides={guides} />

      {/* === PHASE 1: N primitives === */}
      {showPrimitives && (
        <div
          style={{
            position: 'absolute',
            opacity: primitivesOpacity,
            pointerEvents: 'none',
          }}
        >
          {/* Bar 1 -- left vertical */}
          {bar1Visible && (
            <div
              style={{
                position: 'absolute',
                left: bar1X,
                top: bar1Y,
                width: barW,
                height: barH,
                opacity: bar1FillOpacity,
                willChange: 'transform, opacity',
              }}
            >
              {/* Outline during adjust */}
              {bar1OutlineOpacity > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    border: `1px solid rgba(245, 245, 245, ${bar1OutlineOpacity})`,
                  }}
                />
              )}
              {/* Fill */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: bar1Color,
                }}
              />
            </div>
          )}

          {/* Diagonal -- drawn as SVG line, traced by dot */}
          {diagVisible && (
            <svg
              width={COMP.width}
              height={COMP.height}
              viewBox={`0 0 ${COMP.width} ${COMP.height}`}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                pointerEvents: 'none',
                opacity: diagOpacity,
              }}
            >
              <line
                x1={nTopLeftX + barW}
                y1={nTopLeftY}
                x2={nTopLeftX + bar2X_offset}
                y2={nTopLeftY + nPixelH}
                stroke="#F5F5F5"
                strokeWidth={diagThickness * N_BIG_SCALE}
                strokeLinecap="round"
                strokeDasharray={1200}
                strokeDashoffset={1200 * (1 - diagDrawT)}
              />
            </svg>
          )}

          {/* Bar 2 -- right vertical */}
          {bar2Visible && (
            <div
              style={{
                position: 'absolute',
                left: bar2X,
                top: bar2Y,
                width: barW,
                height: barH,
                opacity: bar2FillOpacity,
                willChange: 'transform, opacity',
              }}
            >
              {/* Outline */}
              {bar2OutlineOpacity > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    border: `1px solid rgba(245, 245, 245, ${bar2OutlineOpacity})`,
                  }}
                />
              )}
              {/* Fill */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: bar2Color,
                }}
              />
            </div>
          )}
        </div>
      )}

      {/* === N final SVG path (appears during merge, stays through phases 2-3) === */}
      {nPathVisible && (
        <div
          style={{
            position: 'absolute',
            left: nDisplayX - nSvgPixelW / 2,
            top: nDisplayY - nSvgPixelH / 2,
            width: nSvgPixelW,
            height: nSvgPixelH,
            opacity: frame < finalizeStart ? nPathOpacity : 1,
            pointerEvents: 'none',
            willChange: 'transform, opacity',
          }}
        >
          <svg
            width={nSvgPixelW}
            height={nSvgPixelH}
            viewBox={`0 0 ${N_VB.w} ${N_VB.h}`}
            style={{ overflow: 'visible' }}
          >
            <path d={LOGO_PATHS.N} fill={nFinalColor} />
          </svg>
        </div>
      )}

      {/* === PHASE 2: eurolia letters === */}
      <AbsoluteFill style={{ pointerEvents: 'none' }}>
        {euroliaElements}
      </AbsoluteFill>

      {/* === DOT cursor === */}
      {dotVisible && (
        <LogoDot
          x={dotX}
          y={dotY}
          scale={dotScale}
          radius={20}
          glowBlur={dotGlowBlur}
          glowOpacity={dotGlowOpacity}
          variant="flat"
          opacity={1}
        />
      )}

      {/* === Terracotta flash on assembly complete === */}
      {flashOpacity > 0 && (
        <AbsoluteFill
          style={{
            backgroundColor: C.primary,
            opacity: flashOpacity,
            pointerEvents: 'none',
          }}
        />
      )}
    </AbsoluteFill>
  );
};
