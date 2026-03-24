import { useCurrentFrame } from 'remotion';

/**
 * Returns the local frame relative to a scene's start.
 * If the global frame is before the scene, returns a negative number.
 */
export const useSceneFrame = (sceneFrom: number): number => {
  const frame = useCurrentFrame();
  return frame - sceneFrom;
};

/**
 * Returns a 0-1 progress value for an animation within a scene.
 * Clamped between 0 and 1.
 */
export const useProgress = (
  startFrame: number,
  durationFrames: number,
): number => {
  const frame = useCurrentFrame();
  const local = frame - startFrame;
  if (local <= 0) return 0;
  if (local >= durationFrames) return 1;
  return local / durationFrames;
};
