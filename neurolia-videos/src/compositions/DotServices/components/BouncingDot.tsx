import React from 'react';

interface BouncingDotProps {
  x: number;
  y: number;
  radius?: number;
  squashX?: number;
  squashY?: number;
  rotation?: number;
  opacity?: number;
  glowIntensity?: number;
  scale?: number;
}

export const BouncingDot: React.FC<BouncingDotProps> = ({
  x,
  y,
  radius = 24,
  squashX = 1,
  squashY = 1,
  rotation = 0,
  opacity = 1,
  glowIntensity = 0,
  scale = 1,
}) => {
  const effectiveRadius = radius * scale;

  return (
    <div
      style={{
        position: 'absolute',
        left: x - effectiveRadius,
        top: y - effectiveRadius,
        width: effectiveRadius * 2,
        height: effectiveRadius * 2,
        borderRadius: '50%',
        opacity,
        transform: `rotate(${rotation}deg) scaleX(${squashX}) scaleY(${squashY}) rotate(${-rotation}deg)`,
        transformOrigin: 'center center',
        pointerEvents: 'none',
      }}
    >
      {/* Base sphere */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: `radial-gradient(circle at 38% 32%,
            #F4976C 0%,
            #E8703A 30%,
            #D45A2E 55%,
            #B84425 80%,
            #943620 100%)`,
        }}
      />

      {/* Specular highlight */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: `radial-gradient(circle at 32% 26%,
            rgba(255,255,255,0.55) 0%,
            rgba(255,255,255,0.2) 15%,
            rgba(255,255,255,0.05) 30%,
            transparent 50%)`,
        }}
      />

      {/* Glow overlay */}
      {glowIntensity > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: -glowIntensity * 30,
            borderRadius: '50%',
            background: `radial-gradient(circle,
              rgba(232, 112, 58, ${0.4 * glowIntensity}) 0%,
              rgba(232, 112, 58, ${0.15 * glowIntensity}) 50%,
              transparent 70%)`,
            filter: `blur(${8 + glowIntensity * 15}px)`,
          }}
        />
      )}
    </div>
  );
};
