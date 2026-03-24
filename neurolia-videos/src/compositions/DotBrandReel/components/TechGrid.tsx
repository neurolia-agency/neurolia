import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COMP, C } from '../constants';

interface TechGridProps {
  opacity: number;
}

/**
 * Technical grid overlay — 80x80px cells covering the full 1080x1920 canvas.
 * Central axes (horizontal y=960, vertical x=540) are highlighted with dashed lines.
 */
export const TechGrid: React.FC<TechGridProps> = ({ opacity }) => {
  const cellSize = 80;
  const { width, height, cx, cy } = COMP;

  // How many vertical and horizontal lines
  const cols = Math.floor(width / cellSize);
  const rows = Math.floor(height / cellSize);

  // Build arrays of line positions
  const verticalLines: number[] = [];
  for (let i = 0; i <= cols; i++) {
    verticalLines.push(i * cellSize);
  }

  const horizontalLines: number[] = [];
  for (let i = 0; i <= rows; i++) {
    horizontalLines.push(i * cellSize);
  }

  return (
    <AbsoluteFill style={{ opacity }}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        {/* Regular grid lines */}
        {verticalLines.map((x) => (
          <line
            key={`v-${x}`}
            x1={x}
            y1={0}
            x2={x}
            y2={height}
            stroke={C.gridLine}
            strokeWidth={1}
          />
        ))}
        {horizontalLines.map((y) => (
          <line
            key={`h-${y}`}
            x1={0}
            y1={y}
            x2={width}
            y2={y}
            stroke={C.gridLine}
            strokeWidth={1}
          />
        ))}

        {/* Central axes — highlighted, dashed */}
        <line
          x1={cx}
          y1={0}
          x2={cx}
          y2={height}
          stroke={C.gridAxis}
          strokeWidth={1}
          strokeDasharray="8 4"
        />
        <line
          x1={0}
          y1={cy}
          x2={width}
          y2={cy}
          stroke={C.gridAxis}
          strokeWidth={1}
          strokeDasharray="8 4"
        />
      </svg>
    </AbsoluteFill>
  );
};
