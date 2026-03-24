/**
 * Billiard Physics Engine — Hand-crafted waypoints
 * 3 wall hits with smoothstep interpolation.
 */

export interface WallHit {
  frame: number;
  x: number;
  y: number;
  wall: 'top' | 'bottom' | 'left' | 'right';
}

interface Waypoint {
  frame: number;
  x: number;
  y: number;
}

const WAYPOINTS: Waypoint[] = [
  { frame: 0, x: 540, y: -30 },
  { frame: 5, x: 590, y: 200 },
  { frame: 10, x: 640, y: 550 },
  { frame: 15, x: 700, y: 1000 },
  { frame: 20, x: 780, y: 1500 },
  // HIT 1: bottom wall
  { frame: 22, x: 820, y: 1896 },
  { frame: 26, x: 680, y: 1500 },
  { frame: 30, x: 500, y: 1050 },
  { frame: 35, x: 300, y: 600 },
  { frame: 40, x: 140, y: 250 },
  { frame: 45, x: 50, y: 80 },
  // HIT 2: left wall
  { frame: 48, x: 24, y: 40 },
  { frame: 52, x: 150, y: 200 },
  { frame: 56, x: 350, y: 450 },
  { frame: 60, x: 550, y: 680 },
  { frame: 65, x: 750, y: 850 },
  { frame: 70, x: 920, y: 960 },
  { frame: 73, x: 1000, y: 1020 },
  // HIT 3: right wall
  { frame: 75, x: 1056, y: 1060 },
  { frame: 80, x: 900, y: 1000 },
  { frame: 85, x: 750, y: 970 },
  { frame: 90, x: 640, y: 960 },
  { frame: 95, x: 580, y: 958 },
  { frame: 100, x: 550, y: 960 },
];

export const WALL_HITS: WallHit[] = [
  { frame: 22, x: 820, y: 1896, wall: 'bottom' },
  { frame: 48, x: 24, y: 40, wall: 'left' },
  { frame: 75, x: 1056, y: 1060, wall: 'right' },
];

export interface BilliardState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  velocityAngle: number;
}

function interpolateRaw(f: number): { x: number; y: number } {
  let a = WAYPOINTS[0];
  let b = WAYPOINTS[1];
  for (let i = 0; i < WAYPOINTS.length - 1; i++) {
    if (f >= WAYPOINTS[i].frame && f <= WAYPOINTS[i + 1].frame) {
      a = WAYPOINTS[i];
      b = WAYPOINTS[i + 1];
      break;
    }
  }
  const segmentDuration = b.frame - a.frame;
  const t = segmentDuration > 0 ? (f - a.frame) / segmentDuration : 0;
  const smoothT = t * t * (3 - 2 * t);
  return {
    x: a.x + (b.x - a.x) * smoothT,
    y: a.y + (b.y - a.y) * smoothT,
  };
}

export function computeBilliardState(frame: number): BilliardState {
  const f = Math.max(0, Math.min(frame, WAYPOINTS[WAYPOINTS.length - 1].frame));

  const { x, y } = interpolateRaw(f);

  const dt = 0.5;
  const nextF = Math.min(f + dt, WAYPOINTS[WAYPOINTS.length - 1].frame);
  const prevF = Math.max(f - dt, 0);
  const nextState = interpolateRaw(nextF);
  const prevState = interpolateRaw(prevF);
  const vx = (nextState.x - prevState.x) / (nextF - prevF + 0.001);
  const vy = (nextState.y - prevState.y) / (nextF - prevF + 0.001);
  const velocityAngle = Math.atan2(vy, vx) * (180 / Math.PI);

  return { x, y, vx, vy, velocityAngle };
}

export function getLastBilliardPosition(): { x: number; y: number } {
  const last = WAYPOINTS[WAYPOINTS.length - 1];
  return { x: last.x, y: last.y };
}
