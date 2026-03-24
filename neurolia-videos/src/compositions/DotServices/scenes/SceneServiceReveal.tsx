import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';
import { colors, typography } from '../../../styles/neurolia-tokens';

interface ServiceData {
  title: string;
  bullets: string[];
}

const SERVICES: ServiceData[] = [
  {
    title: 'Ton site qui convertit.',
    bullets: [
      'Design sur-mesure',
      'SEO integre',
      '+40% de conversions',
    ],
  },
  {
    title: '10h par semaine recuperees.',
    bullets: [
      'CRM automatise',
      'Relances sans effort',
      '+10h/semaine liberees',
    ],
  },
  {
    title: "L'IA qui bosse a ta place.",
    bullets: [
      'Chatbot & agents IA',
      'Reponses instantanees',
      'x3 vs formulaire de contact',
    ],
  },
];

const SERVICE_DURATION = 90;

interface ServiceBlockProps {
  service: ServiceData;
  localFrame: number;
}

const ServiceBlock: React.FC<ServiceBlockProps> = ({ service, localFrame }) => {
  const { fps } = useVideoConfig();

  // 3D entrance
  const enterProgress = spring({
    frame: Math.max(0, localFrame),
    fps,
    config: { damping: 14, stiffness: 80 },
  });
  const enterRotateX = interpolate(enterProgress, [0, 1], [-15, 0]);
  const enterTranslateZ = interpolate(enterProgress, [0, 1], [-200, 0]);
  const enterOpacity = interpolate(localFrame, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Title
  const titleFrame = localFrame - 3;
  const titleProgress = spring({
    frame: Math.max(0, titleFrame),
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleFrame, [0, 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const titleTranslateX = interpolate(titleProgress, [0, 1], [30, 0]);

  // Bullets stagger
  const bulletDelays = [15, 22, 29];

  // Fade out
  const fadeOut = interpolate(localFrame, [65, 80], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: 80,
        right: 80,
        top: 580,
        opacity: fadeOut,
        perspective: '800px',
      }}
    >
      <div
        style={{
          opacity: enterOpacity,
          transform: `rotateX(${enterRotateX}deg) translateZ(${enterTranslateZ}px)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Title */}
        <div
          style={{
            fontFamily: typography.fontFamily.display,
            fontSize: 48,
            fontWeight: 700,
            color: colors.textPrimary,
            lineHeight: 1.15,
            opacity: titleOpacity,
            transform: `translateX(${titleTranslateX}px)`,
          }}
        >
          {service.title}
        </div>

        {/* Bullets */}
        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 18 }}>
          {service.bullets.map((bullet, i) => {
            const bulletFrame = localFrame - bulletDelays[i];
            const bulletProgress = spring({
              frame: Math.max(0, bulletFrame),
              fps,
              config: { damping: 14, stiffness: 100 },
            });
            const bulletOpacity = interpolate(bulletFrame, [0, 8], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const bulletTranslateX = interpolate(bulletProgress, [0, 1], [20, 0]);

            // Highlight last bullet (the stat) in terracotta
            const isStatBullet = bullet.startsWith('+') || bullet.startsWith('x');

            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  opacity: bulletOpacity,
                  transform: `translateX(${bulletTranslateX}px)`,
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    backgroundColor: colors.primary,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: typography.fontFamily.sans,
                    fontSize: 26,
                    fontWeight: isStatBullet ? 600 : 400,
                    color: isStatBullet ? colors.primary : colors.textPrimary,
                    lineHeight: 1.3,
                  }}
                >
                  {bullet}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/**
 * Scene 4: Service Reveal (frames 450-720, local 0-270)
 * 3 services with 3D entrance, staggered bullets.
 */
export const SceneServiceReveal: React.FC = () => {
  const frame = useCurrentFrame();

  const serviceTimings = [
    { start: 20 },
    { start: 95 },
    { start: 168 },
  ];

  return (
    <AbsoluteFill>
      {SERVICES.map((service, i) => {
        const timing = serviceTimings[i];
        const localFrame = frame - timing.start;

        if (localFrame < -5 || localFrame > SERVICE_DURATION + 10) return null;

        return (
          <ServiceBlock
            key={i}
            service={service}
            localFrame={localFrame}
          />
        );
      })}
    </AbsoluteFill>
  );
};
