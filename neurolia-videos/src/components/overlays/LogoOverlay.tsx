import React from 'react';
import { useCurrentFrame, interpolate, Img, staticFile } from 'remotion';

interface LogoOverlayProps {
  /** Frame delay before fade in */
  delay?: number;
  /** Logo width in px */
  width?: number;
  /** Position */
  position?: 'center' | 'top' | 'bottom';
}

export const LogoOverlay: React.FC<LogoOverlayProps> = ({
  delay = 0,
  width = 280,
  position = 'center',
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - delay;

  const opacity = interpolate(localFrame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const positionStyles: Record<string, React.CSSProperties> = {
    center: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
    top: { top: 80, left: '50%', transform: 'translateX(-50%)' },
    bottom: { bottom: 120, left: '50%', transform: 'translateX(-50%)' },
  };

  return (
    <div
      style={{
        position: 'absolute',
        opacity,
        ...positionStyles[position],
      }}
    >
      <Img
        src={staticFile('neurolia/logo_neurolia_light.svg')}
        style={{ width }}
      />
    </div>
  );
};
