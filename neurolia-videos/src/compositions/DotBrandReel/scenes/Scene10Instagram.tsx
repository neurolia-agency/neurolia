import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';
import { C, COMP, SCENES, SPRINGS } from '../constants';
import { InstagramMockup } from '../components/InstagramMockup';
import { Cursor } from '../components/Cursor';

/**
 * Scene 10 -- Instagram (from=840, duration=96, 8 beats)
 *
 * Timeline:
 *   0-20   Mockup arrives in 3D (perspective, rotateY, rotateX, scale)
 *   20+    Micro-floating constant
 *   30     Cursor appears (pop)
 *   30-60  Cursor moves toward "Suivre" button with bezier + hesitation
 *   58     Hover: button glows
 *   70     Click: press, bounce, flash, state change
 *   70-96  Hold final state, glow pulse and fade
 * useCurrentFrame() returns local frame (0-based) within the Sequence.
 */
export const Scene10Instagram: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // === MOCKUP ENTRANCE (0-20) ===
  const mockupSpring = spring({
    frame: Math.max(0, frame),
    fps,
    config: SPRINGS.mockupEntrance, // { damping: 12, stiffness: 80 }
  });

  const mockupRotateY = interpolate(mockupSpring, [0, 1], [-30, 0]);
  const mockupRotateX = interpolate(mockupSpring, [0, 1], [5, 0]);
  const mockupScale = interpolate(mockupSpring, [0, 1], [0.8, 1]);
  const mockupOpacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Shadow fades as mockup settles
  const shadowIntensity = interpolate(mockupSpring, [0, 1], [0.6, 0.2]);

  // === MICRO-FLOATING (constant) ===
  const floatRotateY = Math.sin(frame * 0.05) * 1.5;
  const floatRotateX = Math.cos(frame * 0.04) * 1;

  // === CURSOR ===
  const showCursor = frame >= 30;

  // Cursor appearance pop
  const cursorOpacity = showCursor
    ? interpolate(frame - 30, [0, 4], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 0;

  // Cursor position (bezier movement from start to button)
  // Start: (700, 900) relative to canvas
  // Target: approximately center of "Suivre" button on the mockup
  // Mockup is centered at (540, 960), button is roughly at mockup-relative (190, 415)
  // So canvas coords for button: ~(540 - 190 + 190, 960 - 350 + 415) -> ~(450, 1025)
  // Adjusting: mockup left edge ~ 540-190=350, button center ~ 350+190=540, button Y ~ 610+415=1025
  const cursorStartX = 700;
  const cursorStartY = 900;
  const cursorTargetX = 420;
  const cursorTargetY = 970;

  let cursorX = cursorStartX;
  let cursorY = cursorStartY;

  if (showCursor) {
    const moveFrame = frame - 30;
    const moveDuration = 30; // 30 frames to reach target

    if (moveFrame <= moveDuration) {
      // Bezier-like easing with hesitation at midpoint
      let t = moveFrame / moveDuration;
      t = Math.min(1, Math.max(0, t));

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);

      // Hesitation: at frame 45 (moveFrame=15), pause 3 frames + micro-lateral
      const hesitationStart = 15;
      const hesitationEnd = 18;
      let hesitationOffsetX = 0;

      if (moveFrame >= hesitationStart && moveFrame <= hesitationEnd) {
        // Micro lateral movement during hesitation
        const hesitPhase = (moveFrame - hesitationStart) / (hesitationEnd - hesitationStart);
        hesitationOffsetX = Math.sin(hesitPhase * Math.PI * 2) * 5;
        // Slow down the main easing during hesitation
      }

      cursorX = cursorStartX + (cursorTargetX - cursorStartX) * eased + hesitationOffsetX;
      cursorY = cursorStartY + (cursorTargetY - cursorStartY) * eased;
    } else {
      cursorX = cursorTargetX;
      cursorY = cursorTargetY;
    }
  }

  // === BUTTON STATES ===
  const isHovering = frame >= 58;
  const isClicked = frame >= 70;

  // Button glow on hover
  const buttonGlow = isHovering && !isClicked;

  // Click animation: press down then bounce
  const isPressed = frame >= 70 && frame <= 72; // 2 frames press
  const clickBounce = frame >= 72
    ? spring({
        frame: frame - 72,
        fps,
        config: SPRINGS.buttonClick, // { damping: 15, stiffness: 200 }
      })
    : 0;

  // Button scale: 1.03 on hover, 0.95 on press, then spring back to 1
  let buttonScale = 1;
  if (isClicked) {
    if (isPressed) {
      buttonScale = 0.95;
    } else {
      buttonScale = 0.95 + clickBounce * 0.05; // 0.95 -> 1.0
    }
  } else if (isHovering) {
    buttonScale = 1.03;
  }

  // Flash overlay on click
  const flashOpacity = frame >= 70
    ? interpolate(frame - 70, [0, 1, 3], [0, 0.4, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 0;

  // Cursor press effect
  const cursorPressed = frame >= 70 && frame <= 72;

  // Post-click glow pulse (frame 70-105)
  const postClickGlow = isClicked
    ? 0.3 + Math.sin((frame - 70) * 0.15) * 0.15
    : 0;

  // Final fade (last 15 frames)
  const sceneDuration = SCENES.instagram.duration;
  const finalFade = interpolate(frame, [sceneDuration - 15, sceneDuration], [1, 0.85], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // The mockup position (centered on canvas)
  const mockupCenterX = COMP.cx;
  const mockupCenterY = COMP.cy - 60; // slightly above center

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000' }}>
      {/* Mockup container with 3D entrance + floating */}
      <div
        style={{
          position: 'absolute',
          left: mockupCenterX - 190,
          top: mockupCenterY - 350,
          perspective: '1200px',
          opacity: mockupOpacity * finalFade,
        }}
      >
        <div
          style={{
            transform: [
              `rotateY(${mockupRotateY + floatRotateY}deg)`,
              `rotateX(${mockupRotateX + floatRotateX}deg)`,
              `scale(${mockupScale})`,
            ].join(' '),
            boxShadow: `0 20px 60px rgba(0,0,0,${shadowIntensity}), 0 0 ${postClickGlow > 0 ? 30 : 0}px rgba(196,92,59,${postClickGlow})`,
            borderRadius: 20,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Button scale wrapper - wraps entire mockup but we apply button scale via CSS on the button */}
          <div style={{ position: 'relative' }}>
            <InstagramMockup
              frame={frame}
              showCursor={false}
              cursorX={0}
              cursorY={0}
              isFollowing={isClicked}
              buttonGlow={buttonGlow || (isClicked && postClickGlow > 0.2)}
            />

            {/* Button scale overlay -- positioned over the follow button area */}
            <div
              style={{
                position: 'absolute',
                left: 16,
                top: 370, // approximate button Y within mockup
                width: 170,
                height: 34,
                transform: `scale(${buttonScale})`,
                transformOrigin: 'center center',
                pointerEvents: 'none',
                // This invisible overlay just carries the scale transform
                // The actual button is rendered by InstagramMockup
                zIndex: -1,
              }}
            />
          </div>
        </div>
      </div>

      {/* Flash overlay on click */}
      {flashOpacity > 0 && (
        <AbsoluteFill
          style={{
            backgroundColor: `rgba(255,255,255,${flashOpacity})`,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Cursor (rendered on top of everything) */}
      {showCursor && cursorOpacity > 0 && (
        <div style={{ opacity: cursorOpacity }}>
          <Cursor
            x={cursorX}
            y={cursorY}
            pressed={cursorPressed}
          />
        </div>
      )}
    </AbsoluteFill>
  );
};
