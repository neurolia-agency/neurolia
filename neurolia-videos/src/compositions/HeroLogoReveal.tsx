import React, { useMemo } from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  Sequence,
  spring,
} from 'remotion';
import { z } from 'zod';
import { colors, typography } from '../styles/neurolia-tokens';

export const heroLogoRevealSchema = z.object({
  showTagline: z.boolean().default(false),
  tagline: z.string().default('Un business qui respire.'),
});

type HeroLogoRevealProps = z.infer<typeof heroLogoRevealSchema>;

// Logo path data extracted from SVG
const LOGO_PATHS = {
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

// Particle type for background effect
interface Particle {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  size: number;
  delay: number;
  duration: number;
}

// Generate particles that converge to center
const generateParticles = (count: number, width: number, height: number): Particle[] => {
  const particles: Particle[] = [];
  const centerX = width / 2;
  const centerY = height / 2;

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
    const distance = 600 + Math.random() * 400;
    particles.push({
      id: i,
      startX: centerX + Math.cos(angle) * distance,
      startY: centerY + Math.sin(angle) * distance,
      endX: centerX + (Math.random() - 0.5) * 100,
      endY: centerY + (Math.random() - 0.5) * 40,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 20,
      duration: 30 + Math.random() * 15,
    });
  }
  return particles;
};

// Particle component
const Particle: React.FC<{
  particle: Particle;
  frame: number;
}> = ({ particle, frame }) => {
  const localFrame = frame - particle.delay;

  if (localFrame < 0) return null;

  const progress = interpolate(
    localFrame,
    [0, particle.duration],
    [0, 1],
    { extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) }
  );

  const x = interpolate(progress, [0, 1], [particle.startX, particle.endX]);
  const y = interpolate(progress, [0, 1], [particle.startY, particle.endY]);

  const opacity = interpolate(
    localFrame,
    [0, particle.duration * 0.3, particle.duration * 0.8, particle.duration],
    [0, 0.8, 0.8, 0],
    { extrapolateRight: 'clamp' }
  );

  const scale = interpolate(
    localFrame,
    [0, particle.duration],
    [1, 0.3],
    { extrapolateRight: 'clamp' }
  );

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: particle.size * scale,
        height: particle.size * scale,
        borderRadius: '50%',
        backgroundColor: colors.primary,
        opacity,
        boxShadow: `0 0 ${particle.size * 2}px ${colors.glowTerracotta}`,
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
};

// Animated letter path component
const AnimatedPath: React.FC<{
  d: string;
  delay: number;
  frame: number;
  fps: number;
  color?: string;
}> = ({ d, delay, frame, fps, color = colors.textPrimary }) => {
  const localFrame = frame - delay;

  const progress = spring({
    frame: Math.max(0, localFrame),
    fps,
    config: { damping: 15, stiffness: 80, mass: 0.8 },
  });

  const opacity = interpolate(
    localFrame,
    [0, 8],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const scale = interpolate(progress, [0, 1], [0.8, 1]);
  const translateY = interpolate(progress, [0, 1], [15, 0]);

  return (
    <path
      d={d}
      fill={color}
      style={{
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        transformOrigin: 'center',
        transformBox: 'fill-box',
      }}
    />
  );
};

// The O letter with special animation (the "eye")
const AnimatedO: React.FC<{
  frame: number;
  fps: number;
  baseDelay: number;
}> = ({ frame, fps, baseDelay }) => {
  // O appears first and expands from the dot
  const dotDelay = baseDelay;
  const ringDelay = baseDelay + 8;

  // Dot animation - appears with scale + glow
  const dotLocalFrame = frame - dotDelay;
  const dotProgress = spring({
    frame: Math.max(0, dotLocalFrame),
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  const dotScale = interpolate(dotProgress, [0, 1], [0, 1]);
  const dotOpacity = interpolate(dotLocalFrame, [0, 5], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Glow pulse on dot
  const glowIntensity = interpolate(
    frame % 60,
    [0, 30, 60],
    [0.6, 1, 0.6],
  );

  // Ring animation - expands outward from dot
  const ringLocalFrame = frame - ringDelay;
  const ringProgress = spring({
    frame: Math.max(0, ringLocalFrame),
    fps,
    config: { damping: 18, stiffness: 90 },
  });

  const ringScale = interpolate(ringProgress, [0, 1], [0.5, 1]);
  const ringOpacity = interpolate(ringLocalFrame, [0, 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <g>
      {/* Ring (outer O) */}
      <path
        d={LOGO_PATHS.oRing}
        fill={colors.textPrimary}
        style={{
          opacity: ringOpacity,
          transform: `scale(${ringScale})`,
          transformOrigin: `${LOGO_PATHS.oDot.cx}px ${LOGO_PATHS.oDot.cy}px`,
        }}
      />

      {/* Dot (terracotta center) with glow */}
      <circle
        cx={LOGO_PATHS.oDot.cx}
        cy={LOGO_PATHS.oDot.cy}
        r={LOGO_PATHS.oDot.r}
        fill={colors.primary}
        style={{
          opacity: dotOpacity,
          transform: `scale(${dotScale})`,
          transformOrigin: `${LOGO_PATHS.oDot.cx}px ${LOGO_PATHS.oDot.cy}px`,
          filter: `drop-shadow(0 0 ${8 * glowIntensity}px ${colors.primary})`,
        }}
      />
    </g>
  );
};

export const HeroLogoReveal: React.FC<HeroLogoRevealProps> = ({
  showTagline = false,
  tagline = 'Un business qui respire.',
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Generate particles once
  const particles = useMemo(() => generateParticles(50, width, height), [width, height]);

  // Timeline (in frames at 30fps)
  // Phase 1: 0-45 (0-1.5s) - Particles converge
  // Phase 2: 30-60 (1-2s) - O dot appears, then ring expands
  // Phase 3: 50-110 (1.67-3.67s) - Letters reveal outward from O
  // Phase 4: 110-150 (3.67-5s) - Full logo with cinematic glow
  // Phase 5: 150-180 (5-6s) - Hold / fade to tagline

  const PARTICLE_PHASE = { start: 0, end: 50 };
  const O_REVEAL_START = 35;
  const LETTER_REVEAL_START = 55;
  const GLOW_PHASE = { start: 100, peak: 130 };
  const FADE_START = 160;

  // Letter delays (spreading outward from O in the middle)
  // Logo order: N-e-u-r-o-l-i-a
  // O is in position 4 (index), we reveal from there
  const letterDelays = {
    r: LETTER_REVEAL_START + 0,      // closest to O (left)
    l: LETTER_REVEAL_START + 0,      // closest to O (right)
    u: LETTER_REVEAL_START + 6,
    i: LETTER_REVEAL_START + 6,
    e: LETTER_REVEAL_START + 12,
    a: LETTER_REVEAL_START + 12,
    N: LETTER_REVEAL_START + 18,
  };

  // Background glow animation
  const bgGlowOpacity = interpolate(
    frame,
    [GLOW_PHASE.start, GLOW_PHASE.peak, FADE_START],
    [0, 0.4, 0.2],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Logo container scale for cinematic punch
  const logoScale = interpolate(
    frame,
    [GLOW_PHASE.start, GLOW_PHASE.start + 10, GLOW_PHASE.peak],
    [1, 1.02, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.ease) }
  );

  // Tagline animation (if enabled)
  const taglineOpacity = showTagline ? interpolate(
    frame,
    [FADE_START, FADE_START + 20],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  ) : 0;

  const taglineTranslateY = showTagline ? interpolate(
    frame,
    [FADE_START, FADE_START + 20],
    [20, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.ease) }
  ) : 20;

  // Logo sizing - SVG viewBox is 71.06 x 13.94
  const logoWidth = 600;
  const logoHeight = (13.94 / 71.06) * logoWidth;

  // Center position
  const logoX = (width - logoWidth) / 2;
  const logoY = (height - logoHeight) / 2 - (showTagline ? 30 : 0);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        overflow: 'hidden',
      }}
    >
      {/* Cinematic background glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(ellipse, ${colors.glowTerracotta} 0%, transparent 70%)`,
          opacity: bgGlowOpacity,
          filter: 'blur(60px)',
        }}
      />

      {/* Secondary ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '20%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(196, 92, 59, 0.15) 0%, transparent 70%)`,
          opacity: bgGlowOpacity * 0.5,
          filter: 'blur(40px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '25%',
          right: '15%',
          width: 250,
          height: 250,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(196, 92, 59, 0.12) 0%, transparent 70%)`,
          opacity: bgGlowOpacity * 0.4,
          filter: 'blur(35px)',
        }}
      />

      {/* Particles - converging to center */}
      {frame < PARTICLE_PHASE.end + 30 && particles.map((particle) => (
        <Particle key={particle.id} particle={particle} frame={frame} />
      ))}

      {/* Logo SVG */}
      <svg
        viewBox="0 0 71.06 13.94"
        width={logoWidth}
        height={logoHeight}
        style={{
          position: 'absolute',
          left: logoX,
          top: logoY,
          transform: `scale(${logoScale})`,
          transformOrigin: 'center',
        }}
      >
        {/* N */}
        <AnimatedPath d={LOGO_PATHS.N} delay={letterDelays.N} frame={frame} fps={fps} />

        {/* e */}
        <AnimatedPath d={LOGO_PATHS.e} delay={letterDelays.e} frame={frame} fps={fps} />

        {/* u */}
        <AnimatedPath d={LOGO_PATHS.u} delay={letterDelays.u} frame={frame} fps={fps} />

        {/* r */}
        <AnimatedPath d={LOGO_PATHS.r} delay={letterDelays.r} frame={frame} fps={fps} />

        {/* O (special animation) */}
        <AnimatedO frame={frame} fps={fps} baseDelay={O_REVEAL_START} />

        {/* l */}
        <AnimatedPath d={LOGO_PATHS.l} delay={letterDelays.l} frame={frame} fps={fps} />

        {/* i */}
        <AnimatedPath d={LOGO_PATHS.i} delay={letterDelays.i} frame={frame} fps={fps} />

        {/* a */}
        <AnimatedPath d={LOGO_PATHS.a} delay={letterDelays.a} frame={frame} fps={fps} />
      </svg>

      {/* Signature bar - appears with logo completion */}
      <Sequence from={GLOW_PHASE.start} premountFor={fps}>
        <SignatureBar frame={frame - GLOW_PHASE.start} fps={fps} logoY={logoY} logoHeight={logoHeight} />
      </Sequence>

      {/* Tagline (optional) */}
      {showTagline && (
        <p
          style={{
            position: 'absolute',
            top: logoY + logoHeight + 60,
            left: 0,
            right: 0,
            textAlign: 'center',
            fontFamily: typography.fontFamily.sans,
            fontSize: 36,
            fontWeight: typography.fontWeight.normal,
            letterSpacing: '0.02em',
            color: colors.textSecondary,
            margin: 0,
            opacity: taglineOpacity,
            transform: `translateY(${taglineTranslateY}px)`,
          }}
        >
          {tagline}
        </p>
      )}
    </AbsoluteFill>
  );
};

// Signature bar component
const SignatureBar: React.FC<{
  frame: number;
  fps: number;
  logoY: number;
  logoHeight: number;
}> = ({ frame, fps, logoY, logoHeight }) => {
  const progress = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  const height = interpolate(progress, [0, 1], [0, 80]);
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        left: 100,
        top: logoY + logoHeight / 2 - 40,
        width: 4,
        height,
        backgroundColor: colors.primary,
        opacity,
        boxShadow: `0 0 20px ${colors.glowTerracotta}`,
      }}
    />
  );
};
