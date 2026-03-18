import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Img,
  staticFile,
} from 'remotion';
import { colors } from '../../styles/neurolia-tokens';

interface DeviceMockupProps {
  /** Screenshot path relative to public/ */
  screenshot: string;
  /** Frame delay before entrance animation */
  delay?: number;
  /** Scale of the mockup (1 = fit container) */
  scale?: number;
  /** Device type affects the frame style */
  device?: 'desktop' | 'tablet' | 'phone';
  /** Show glow behind device */
  glow?: boolean;
}

export const DeviceMockup: React.FC<DeviceMockupProps> = ({
  screenshot,
  delay = 0,
  scale = 1,
  device = 'desktop',
  glow = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const localFrame = frame - delay;

  const progress = spring({
    frame: Math.max(0, localFrame),
    fps,
    config: { damping: 15, stiffness: 80, mass: 1.2 },
  });

  const opacity = interpolate(localFrame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const translateY = interpolate(progress, [0, 1], [60, 0]);
  const scaleAnim = interpolate(progress, [0, 1], [0.9, 1]) * scale;

  // Device dimensions based on type and container
  const deviceDimensions = {
    desktop: { width: width * 0.85, ratio: 16 / 10, borderRadius: 12, bezel: 8 },
    tablet: { width: width * 0.7, ratio: 4 / 3, borderRadius: 16, bezel: 12 },
    phone: { width: width * 0.45, ratio: 9 / 19.5, borderRadius: 24, bezel: 6 },
  };

  const d = deviceDimensions[device];
  const deviceWidth = d.width;
  const deviceHeight = deviceWidth / d.ratio;

  return (
    <div
      style={{
        position: 'relative',
        opacity,
        transform: `translateY(${translateY}px) scale(${scaleAnim})`,
      }}
    >
      {/* Glow behind device */}
      {glow && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: deviceWidth * 0.8,
            height: deviceHeight * 0.8,
            borderRadius: '50%',
            background: `radial-gradient(ellipse, ${colors.glowTerracotta} 0%, transparent 60%)`,
            opacity: 0.3,
            filter: 'blur(60px)',
          }}
        />
      )}

      {/* Device frame */}
      <div
        style={{
          width: deviceWidth,
          height: deviceHeight,
          borderRadius: d.borderRadius,
          border: `${d.bezel}px solid ${colors.surfaceContrast}`,
          overflow: 'hidden',
          boxShadow: `
            0 0 0 1px ${colors.border},
            0 20px 60px rgba(0, 0, 0, 0.5)
          `,
          position: 'relative',
        }}
      >
        {/* Top bar (browser/status bar) */}
        {device === 'desktop' && (
          <div
            style={{
              height: 32,
              backgroundColor: colors.surface,
              borderBottom: `1px solid ${colors.border}`,
              display: 'flex',
              alignItems: 'center',
              padding: '0 12px',
              gap: 6,
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#FF5F57' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#28CA41' }} />
          </div>
        )}

        {/* Screenshot */}
        <Img
          src={staticFile(screenshot)}
          style={{
            width: '100%',
            height: device === 'desktop' ? 'calc(100% - 32px)' : '100%',
            objectFit: 'cover',
          }}
        />
      </div>
    </div>
  );
};
