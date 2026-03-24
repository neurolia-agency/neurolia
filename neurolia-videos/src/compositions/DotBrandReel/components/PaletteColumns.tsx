import React from 'react';
import { Easing, interpolate, spring, useVideoConfig } from 'remotion';
import { fontInter } from '../font-loader';
import { SPRINGS } from '../constants';

interface PaletteColumnsProps {
  /** Local frame (0-based relative to scene start) */
  frame: number;
  /** Frame at which the exit animation begins (local). Columns eject downward. */
  exitStart?: number;
  /** Frame at which the exit animation ends (local). */
  exitEnd?: number;
}

const COLUMNS = [
  { color: '#050810', hex: '#050810', textColor: '#FFFFFF' },
  { color: '#C45C3B', hex: '#C45C3B', textColor: '#FFFFFF' },
  { color: '#E07856', hex: '#E07856', textColor: '#050810' },
  { color: '#F5F5F5', hex: '#F5F5F5', textColor: '#050810' },
] as const;

const COL_WIDTH = 200;
const COL_HEIGHT = 900;
const GAP = 16;
const SIDE_WIDTH = 15;
const STAGGER_ENTER = 6;
const STAGGER_EXIT = 4;

/**
 * Darken a hex color by a factor (0-1, where 0.8 = 20% darker).
 */
const darkenColor = (hex: string, factor: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const dr = Math.round(r * factor);
  const dg = Math.round(g * factor);
  const db = Math.round(b * factor);
  return `rgb(${dr}, ${dg}, ${db})`;
};

/**
 * 4 colour columns in faux-3D (front face + visible right side).
 *
 * Lifecycle:
 * 1. Entrance: each column drops from above with spring + stagger
 * 2. Wave: each column oscillates in Y with phase offset
 * 3. Exit (optional): columns eject downward with reverse stagger
 *
 * Centred at canvas (540, 960).
 */
export const PaletteColumns: React.FC<PaletteColumnsProps> = ({
  frame,
  exitStart,
  exitEnd,
}) => {
  const { fps } = useVideoConfig();

  const totalWidth = COLUMNS.length * COL_WIDTH + (COLUMNS.length - 1) * GAP;
  const startX = 540 - totalWidth / 2;
  const startY = 960 - COL_HEIGHT / 2;

  return (
    <div
      style={{
        position: 'absolute',
        left: startX,
        top: startY,
        width: totalWidth,
        height: COL_HEIGHT,
        transform: 'perspective(800px) rotateY(-5deg)',
        transformStyle: 'preserve-3d',
      }}
    >
      {COLUMNS.map((col, i) => {
        // === ENTRANCE ===
        const enterDelay = i * STAGGER_ENTER;
        const enterLocalFrame = Math.max(0, frame - enterDelay);

        const entranceProgress = spring({
          frame: enterLocalFrame,
          fps,
          config: SPRINGS.columnDrop,
          durationInFrames: 30,
        });
        const entranceY = -400 * (1 - entranceProgress);
        const entranceRotateX = 15 * (1 - entranceProgress);

        // === WAVE ===
        const wave = Math.sin((frame - enterDelay) * 0.1) * 8;

        // === EXIT ===
        let exitY = 0;
        let exitRotateX = 0;
        let exitOpacity = 1;

        if (exitStart != null && exitEnd != null && frame >= exitStart) {
          // Reverse stagger: last column (index 3) exits first
          const reverseIndex = COLUMNS.length - 1 - i;
          const exitDelay = reverseIndex * STAGGER_EXIT;
          const colExitStart = exitStart + exitDelay;
          const colExitEnd = exitEnd + exitDelay;

          const exitProgress = interpolate(
            frame,
            [colExitStart, colExitEnd],
            [0, 1],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.exp) },
          );

          exitY = exitProgress * 600;
          exitRotateX = exitProgress * -30;
          exitOpacity = 1 - exitProgress;
        }

        // === COMBINED ===
        const finalY = entranceY + wave + exitY;
        const finalRotateX = entranceRotateX + exitRotateX;
        const sideColor = darkenColor(col.color, 0.8);

        return (
          <div
            key={col.hex}
            style={{
              position: 'absolute',
              left: i * (COL_WIDTH + GAP),
              top: 0,
              width: COL_WIDTH + SIDE_WIDTH,
              height: COL_HEIGHT,
              transform: `translateY(${finalY}px) rotateX(${finalRotateX}deg)`,
              transformStyle: 'preserve-3d',
              opacity: exitOpacity,
            }}
          >
            {/* Front face */}
            <div
              style={{
                position: 'absolute',
                width: COL_WIDTH,
                height: COL_HEIGHT,
                backgroundColor: col.color,
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* HEX label — vertical (rotated -90deg), centred */}
              <span
                style={{
                  fontFamily: fontInter,
                  fontSize: 20,
                  fontWeight: 400,
                  color: col.textColor,
                  transform: 'rotate(-90deg)',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.05em',
                  userSelect: 'none',
                }}
              >
                {col.hex}
              </span>
            </div>

            {/* Right side face (3D depth) */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: COL_WIDTH,
                width: SIDE_WIDTH,
                height: COL_HEIGHT,
                backgroundColor: sideColor,
                borderRadius: '0 8px 8px 0',
                transform: 'skewY(-5deg)',
                transformOrigin: 'left center',
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
