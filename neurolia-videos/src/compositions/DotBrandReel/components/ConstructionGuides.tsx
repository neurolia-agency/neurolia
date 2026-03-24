import React from 'react';
import { AbsoluteFill, interpolate } from 'remotion';
import { COMP, C } from '../constants';

interface ConstructionGuidesProps {
  opacity: number;
  /** 0-1 progress controlling staggered appearance of guide elements */
  progress: number;
}

/**
 * SVG construction guides around the logo center.
 * - 2 concentric circles (r=60, r=120)
 * - 2 diagonals at +/-45 degrees, 400px each side from center
 * - 1 centered rectangle 280x120
 *
 * Elements appear progressively based on `progress` (0-1).
 */
export const ConstructionGuides: React.FC<ConstructionGuidesProps> = ({
  opacity,
  progress,
}) => {
  const { width, height, cx, cy } = COMP;
  const guideColor = C.guideLine;

  // Stagger thresholds — each element fades in over its own slice of progress
  const circle1Opacity = interpolate(progress, [0, 0.2], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const circle2Opacity = interpolate(progress, [0.15, 0.35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const diag1Opacity = interpolate(progress, [0.3, 0.5], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const diag2Opacity = interpolate(progress, [0.45, 0.65], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const rectOpacity = interpolate(progress, [0.6, 0.85], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Diagonal endpoints: 400px from center at 45 and -45 degrees
  const diagLen = 400;
  const cos45 = Math.cos(Math.PI / 4);
  const sin45 = Math.sin(Math.PI / 4);

  const diag45 = {
    x1: cx - diagLen * cos45,
    y1: cy - diagLen * sin45,
    x2: cx + diagLen * cos45,
    y2: cy + diagLen * sin45,
  };

  const diagNeg45 = {
    x1: cx + diagLen * cos45,
    y1: cy - diagLen * sin45,
    x2: cx - diagLen * cos45,
    y2: cy + diagLen * sin45,
  };

  // Rectangle centered on (cx, cy), 280x120
  const rectW = 280;
  const rectH = 120;

  return (
    <AbsoluteFill style={{ opacity }}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        {/* Concentric circle 1 — r=60 */}
        <circle
          cx={cx}
          cy={cy}
          r={60}
          fill="none"
          stroke={guideColor}
          strokeWidth={1}
          strokeDasharray="6 4"
          opacity={circle1Opacity}
        />

        {/* Concentric circle 2 — r=120 */}
        <circle
          cx={cx}
          cy={cy}
          r={120}
          fill="none"
          stroke={guideColor}
          strokeWidth={1}
          strokeDasharray="6 4"
          opacity={circle2Opacity}
        />

        {/* Diagonal +45 degrees */}
        <line
          x1={diag45.x1}
          y1={diag45.y1}
          x2={diag45.x2}
          y2={diag45.y2}
          stroke={guideColor}
          strokeWidth={1}
          strokeDasharray="6 4"
          opacity={diag1Opacity}
        />

        {/* Diagonal -45 degrees */}
        <line
          x1={diagNeg45.x1}
          y1={diagNeg45.y1}
          x2={diagNeg45.x2}
          y2={diagNeg45.y2}
          stroke={guideColor}
          strokeWidth={1}
          strokeDasharray="6 4"
          opacity={diag2Opacity}
        />

        {/* Centered rectangle */}
        <rect
          x={cx - rectW / 2}
          y={cy - rectH / 2}
          width={rectW}
          height={rectH}
          fill="none"
          stroke={guideColor}
          strokeWidth={1}
          strokeDasharray="6 4"
          opacity={rectOpacity}
        />
      </svg>
    </AbsoluteFill>
  );
};
