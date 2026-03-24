import React from 'react';
import { colors } from '../../../styles/neurolia-tokens';

export const LOGO_PATHS = {
  N: 'M7.78,6.66c.47.7.78,1.22,1.17,1.94-.06-.75-.1-1.5-.1-2.41v-3.71c0-1.07-.03-1.73-.13-2.47h3.47c-.1.73-.13,1.42-.13,2.47v8.65c0,.99.05,1.74.13,2.43h-3.57c-.29-.62-.67-1.22-1.22-2.07l-3.01-4.54c-.44-.65-.72-1.14-1.17-2,.08.73.11,1.63.11,2.43v3.65c0,1.12.03,1.84.13,2.54H0c.1-.63.13-1.35.13-2.56V2.43C.13,1.48.1.75,0,0h3.53c.16.44.52,1.09,1.16,2.04l3.09,4.62Z',
  e: 'M15.99,9.49c.16,1.32.93,2.02,2.21,2.02.65,0,1.22-.21,1.64-.6.24-.23.36-.41.49-.83l2.83.8c-.37.85-.62,1.22-1.07,1.68-.93.91-2.23,1.38-3.84,1.38s-2.85-.46-3.78-1.38c-.96-.98-1.48-2.36-1.48-3.97,0-3.22,2.07-5.36,5.18-5.36,2.54,0,4.31,1.38,4.88,3.81.13.52.2,1.21.24,2.13,0,.07,0,.16.02.33h-7.33ZM20.22,7.25c-.23-1.04-.93-1.6-2.05-1.6s-1.86.52-2.13,1.6h4.18Z',
  u: 'M34.37,3.61c-.1.77-.13,1.45-.13,2.44v5.03c0,1.12.03,1.79.13,2.44h-3.24v-.7c0-.08,0-.33.02-.44-1.07,1.01-2,1.4-3.39,1.4-1.09,0-1.97-.31-2.59-.91-.65-.65-.93-1.45-.93-2.74v-4.09c0-.94-.05-1.76-.13-2.44h3.39c-.1.78-.13,1.46-.13,2.44v3.34c0,.67.06.96.26,1.22.23.29.59.46,1.06.46.9,0,1.81-.64,2.44-1.68v-3.34c0-.91-.03-1.6-.13-2.44h3.37Z',
  r: 'M38.91,7.11c.36-.45.81-.72,1.37-.83.45-1.15,1.23-2.14,2.24-2.82-.29-.04-.54-.05-.84-.05-1.48,0-2.46.44-3.26,1.48v-1.29h-3.25c.1.7.13,1.27.13,2.46v5.02c0,1.06-.03,1.65-.13,2.46h3.38c-.1-.78-.13-1.4-.13-2.45v-2.54c.07-.72.18-1.06.49-1.45Z',
  oRing: 'M45.91,3.35c-2.82,0-5.11,2.29-5.11,5.11s2.29,5.11,5.11,5.11,5.11-2.29,5.11-5.11-2.29-5.11-5.11-5.11ZM45.91,11.14c-1.48,0-2.69-1.2-2.69-2.69s1.2-2.69,2.69-2.69,2.69,1.2,2.69,2.69-1.2,2.69-2.69,2.69Z',
  oDot: { cx: 45.91, cy: 8.46, r: 1.66 },
  l: 'M55.22,0c-.1.68-.13,1.35-.13,2.46v8.63c0,.98.03,1.6.13,2.46h-3.4c.1-.73.13-1.29.13-2.46V2.46c0-1.16-.03-1.84-.13-2.46h3.4Z',
  i: 'M59.42,3.61c-.1.67-.13,1.32-.13,2.46v5.01c0,.88.05,1.76.13,2.46h-3.4c.1-.8.13-1.42.13-2.46v-5.01c0-1.06-.03-1.73-.13-2.46h3.4ZM59.37,0v2.44h-3.3V0h3.3Z',
  a: 'M70.93,5.95c0-1.14.03-1.79.13-2.46h-3.4c.02.15.04.3.05.44-.71-.38-1.52-.61-2.38-.61-2.82,0-5.11,2.29-5.11,5.11s2.29,5.11,5.11,5.11c.87,0,1.67-.24,2.38-.61-.02.16-.03.32-.05.49h3.4c-.08-.7-.13-1.58-.13-2.46v-5.01ZM65.49,11.1c-1.47,0-2.67-1.19-2.67-2.67s1.19-2.67,2.67-2.67,2.67,1.19,2.67,2.67-1.19,2.67-2.67,2.67Z',
};

export const LOGO_VIEWBOX = { width: 71.06, height: 13.94 };

export const getODotPosition = (logoWidth: number, logoX: number, logoY: number) => {
  const scale = logoWidth / LOGO_VIEWBOX.width;
  return {
    x: logoX + LOGO_PATHS.oDot.cx * scale,
    y: logoY + LOGO_PATHS.oDot.cy * scale,
  };
};

interface LogoSVGProps {
  width?: number;
  x: number;
  y: number;
  theme?: 'dark' | 'light';
  letterOpacities?: Record<string, number>;
  letterTransforms?: Record<string, string>;
  ringOpacity?: number;
  ringScale?: number;
  dotVisible?: boolean;
  overallOpacity?: number;
  overallScale?: number;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
}

export const LogoSVG: React.FC<LogoSVGProps> = ({
  width = 500,
  x,
  y,
  theme = 'dark',
  letterOpacities = {},
  letterTransforms = {},
  ringOpacity = 1,
  ringScale = 1,
  dotVisible = true,
  overallOpacity = 1,
  overallScale = 1,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
}) => {
  const height = (LOGO_VIEWBOX.height / LOGO_VIEWBOX.width) * width;
  const letterColor = theme === 'dark' ? colors.textPrimary : '#1A1A1A';

  const letters: { key: string; d: string }[] = [
    { key: 'N', d: LOGO_PATHS.N },
    { key: 'e', d: LOGO_PATHS.e },
    { key: 'u', d: LOGO_PATHS.u },
    { key: 'r', d: LOGO_PATHS.r },
    { key: 'l', d: LOGO_PATHS.l },
    { key: 'i', d: LOGO_PATHS.i },
    { key: 'a', d: LOGO_PATHS.a },
  ];

  const has3DRotation = rotateX !== 0 || rotateY !== 0 || rotateZ !== 0;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        height,
        perspective: has3DRotation ? '1000px' : undefined,
        pointerEvents: 'none',
      }}
    >
      <svg
        viewBox={`0 0 ${LOGO_VIEWBOX.width} ${LOGO_VIEWBOX.height}`}
        width={width}
        height={height}
        style={{
          opacity: overallOpacity,
          transform: `scale(${overallScale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
          transformOrigin: 'center center',
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
        }}
      >
        {letters.map(({ key, d }) => {
          const op = letterOpacities[key as keyof typeof letterOpacities] ?? 1;
          const tr = letterTransforms[key as keyof typeof letterTransforms] ?? '';
          return (
            <path
              key={key}
              d={d}
              fill={letterColor}
              style={{
                opacity: op,
                transform: tr || undefined,
                transformOrigin: 'center',
                transformBox: 'fill-box' as const,
              }}
            />
          );
        })}

        <path
          d={LOGO_PATHS.oRing}
          fill={letterColor}
          style={{
            opacity: ringOpacity,
            transform: `scale(${ringScale})`,
            transformOrigin: `${LOGO_PATHS.oDot.cx}px ${LOGO_PATHS.oDot.cy}px`,
          }}
        />

        {dotVisible && (
          <circle
            cx={LOGO_PATHS.oDot.cx}
            cy={LOGO_PATHS.oDot.cy}
            r={LOGO_PATHS.oDot.r}
            fill={colors.primary}
          />
        )}
      </svg>
    </div>
  );
};
