import React, { useMemo } from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  spring,
  Img,
  staticFile,
} from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { slide } from '@remotion/transitions/slide';
import { fade } from '@remotion/transitions/fade';
import { z } from 'zod';
import { colors, typography } from '../styles/neurolia-tokens';

export const agencyShowcaseSchema = z.object({
  variant: z.enum(['reel', 'post', 'linkedin']).default('reel'),
});

type AgencyShowcaseProps = z.infer<typeof agencyShowcaseSchema>;

// ============================================
// SHARED COMPONENTS
// ============================================

// Animated gradient background with floating particles
const AnimatedBackground: React.FC<{ intensity?: number }> = ({ intensity = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow breathing animation
  const breathe = Math.sin((frame / fps) * 0.5) * 0.5 + 0.5;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      {/* Main gradient orb */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800 * intensity,
          height: 800 * intensity,
          borderRadius: '50%',
          background: `radial-gradient(ellipse, ${colors.glowTerracotta} 0%, transparent 70%)`,
          opacity: 0.3 + breathe * 0.15,
          filter: 'blur(80px)',
        }}
      />

      {/* Secondary orb */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: 400 * intensity,
          height: 400 * intensity,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(196, 92, 59, 0.2) 0%, transparent 70%)`,
          opacity: 0.4 + breathe * 0.2,
          filter: 'blur(60px)',
        }}
      />

      {/* Grid overlay for tech feel */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(196, 92, 59, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(196, 92, 59, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          opacity: 0.5,
        }}
      />
    </AbsoluteFill>
  );
};

// Animated text reveal - letter by letter with spring
const AnimatedText: React.FC<{
  text: string;
  fontSize: number;
  fontWeight?: number;
  color?: string;
  delay?: number;
  staggerDelay?: number;
  centerX?: boolean;
  letterSpacing?: string;
  fontFamily?: string;
}> = ({
  text,
  fontSize,
  fontWeight = 700,
  color = colors.textPrimary,
  delay = 0,
  staggerDelay = 2,
  centerX = true,
  letterSpacing = '-0.02em',
  fontFamily = typography.fontFamily.display,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const letters = text.split('');

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: centerX ? 'center' : 'flex-start',
        flexWrap: 'wrap',
        gap: '0px',
      }}
    >
      {letters.map((letter, index) => {
        const letterDelay = delay + index * staggerDelay;
        const localFrame = frame - letterDelay;

        const progress = spring({
          frame: Math.max(0, localFrame),
          fps,
          config: { damping: 12, stiffness: 100 },
        });

        const opacity = interpolate(localFrame, [0, 8], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        const translateY = interpolate(progress, [0, 1], [40, 0]);
        const scale = interpolate(progress, [0, 1], [0.8, 1]);

        return (
          <span
            key={index}
            style={{
              display: 'inline-block',
              fontFamily,
              fontSize,
              fontWeight,
              color,
              letterSpacing,
              opacity,
              transform: `translateY(${translateY}px) scale(${scale})`,
              whiteSpace: letter === ' ' ? 'pre' : 'normal',
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        );
      })}
    </div>
  );
};

// Animated line/bar element
const AnimatedBar: React.FC<{
  delay?: number;
  width?: number;
  height?: number;
  color?: string;
  direction?: 'horizontal' | 'vertical';
}> = ({
  delay = 0,
  width = 4,
  height = 100,
  color = colors.primary,
  direction = 'vertical',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - delay;

  const progress = spring({
    frame: Math.max(0, localFrame),
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const scaleValue = interpolate(progress, [0, 1], [0, 1]);
  const opacity = interpolate(localFrame, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const transform =
    direction === 'vertical'
      ? `scaleY(${scaleValue})`
      : `scaleX(${scaleValue})`;
  const transformOrigin =
    direction === 'vertical' ? 'center top' : 'left center';

  return (
    <div
      style={{
        width: direction === 'vertical' ? width : width,
        height: direction === 'vertical' ? height : height,
        backgroundColor: color,
        opacity,
        transform,
        transformOrigin,
        boxShadow: `0 0 20px ${colors.glowTerracotta}`,
      }}
    />
  );
};

// Floating icon/element
const FloatingIcon: React.FC<{
  children: React.ReactNode;
  delay?: number;
  x?: number;
  y?: number;
  size?: number;
}> = ({ children, delay = 0, x = 0, y = 0, size = 80 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - delay;

  const progress = spring({
    frame: Math.max(0, localFrame),
    fps,
    config: { damping: 10, stiffness: 80, mass: 1.2 },
  });

  const opacity = interpolate(localFrame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(progress, [0, 1], [0.5, 1]);
  const translateY = interpolate(progress, [0, 1], [50, 0]);

  // Subtle float animation
  const float = Math.sin((frame / fps) * 2) * 5;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        transform: `translateY(${translateY + float}px) scale(${scale})`,
        backgroundColor: colors.surfaceCard,
        borderRadius: 20,
        border: `1px solid ${colors.border}`,
        boxShadow: `0 0 40px rgba(196, 92, 59, 0.15)`,
        fontSize: size * 0.5,
      }}
    >
      {children}
    </div>
  );
};

// ============================================
// SCENE COMPONENTS
// ============================================

// Scene 1: Hook/Intro - "Votre business tourne en pilote automatique ?"
const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Question mark animation
  const qMarkProgress = spring({
    frame: Math.max(0, frame - 20),
    fps,
    config: { damping: 8, stiffness: 100 },
  });

  const qMarkScale = interpolate(qMarkProgress, [0, 1], [3, 1]);
  const qMarkRotate = interpolate(qMarkProgress, [0, 1], [-30, 0]);
  const qMarkOpacity = interpolate(frame, [20, 35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <AnimatedBackground intensity={1.2} />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 60,
        }}
      >
        {/* Main question */}
        <div style={{ maxWidth: width * 0.85, textAlign: 'center' }}>
          <AnimatedText
            text="Votre business"
            fontSize={72}
            fontWeight={700}
            delay={5}
            staggerDelay={1.5}
          />
          <div style={{ height: 20 }} />
          <AnimatedText
            text="tourne en"
            fontSize={72}
            fontWeight={700}
            delay={25}
            staggerDelay={1.5}
          />
          <div style={{ height: 20 }} />
          <AnimatedText
            text="pilote automatique"
            fontSize={72}
            fontWeight={700}
            color={colors.primary}
            delay={45}
            staggerDelay={1.5}
          />
        </div>

        {/* Question mark */}
        <div
          style={{
            marginTop: 60,
            fontSize: 180,
            fontFamily: typography.fontFamily.display,
            fontWeight: 700,
            color: colors.primary,
            opacity: qMarkOpacity,
            transform: `scale(${qMarkScale}) rotate(${qMarkRotate}deg)`,
            textShadow: `0 0 60px ${colors.glowTerracotta}`,
          }}
        >
          ?
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scene 2: Problem - "Pendant que vous dormez..."
const SceneProblem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  // Icons animation
  const icons = ['😴', '📧', '📊', '🔄'];
  const iconPositions = [
    { x: width * 0.15, y: 200 },
    { x: width * 0.75, y: 250 },
    { x: width * 0.2, y: 500 },
    { x: width * 0.7, y: 480 },
  ];

  return (
    <AbsoluteFill>
      <AnimatedBackground intensity={0.8} />

      {/* Floating icons */}
      {icons.map((icon, i) => (
        <FloatingIcon
          key={i}
          delay={40 + i * 12}
          x={iconPositions[i].x}
          y={iconPositions[i].y}
          size={90}
        >
          {icon}
        </FloatingIcon>
      ))}

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 60,
        }}
      >
        <div style={{ maxWidth: width * 0.85, textAlign: 'center' }}>
          <AnimatedText
            text="Pendant que"
            fontSize={56}
            fontWeight={600}
            color={colors.textSecondary}
            delay={5}
            staggerDelay={1.5}
          />
          <div style={{ height: 30 }} />
          <AnimatedText
            text="vous dormez..."
            fontSize={72}
            fontWeight={700}
            delay={25}
            staggerDelay={2}
          />
          <div style={{ height: 60 }} />
          <AnimatedText
            text="vos concurrents"
            fontSize={48}
            fontWeight={500}
            color={colors.textMuted}
            delay={55}
            staggerDelay={1.5}
          />
          <div style={{ height: 15 }} />
          <AnimatedText
            text="automatisent"
            fontSize={64}
            fontWeight={700}
            color={colors.primary}
            delay={75}
            staggerDelay={2}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scene 3: Solution intro - "Neurolia"
const SceneSolutionIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Logo reveal
  const logoProgress = spring({
    frame: Math.max(0, frame - 15),
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const logoScale = interpolate(logoProgress, [0, 1], [0.7, 1]);
  const logoOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Glow pulse
  const glowPulse = Math.sin((frame / fps) * 3) * 0.3 + 0.7;

  return (
    <AbsoluteFill>
      <AnimatedBackground intensity={1.5} />

      {/* Intense center glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.glowTerracotta} 0%, transparent 60%)`,
          opacity: 0.5 * glowPulse,
          filter: 'blur(60px)',
        }}
      />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 60,
        }}
      >
        {/* Logo */}
        <div
          style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
          }}
        >
          <Img
            src={staticFile('neurolia/logo_neurolia_light.svg')}
            style={{
              width: 400,
              filter: `drop-shadow(0 0 ${30 * glowPulse}px ${colors.primary})`,
            }}
          />
        </div>

        <div style={{ height: 60 }} />

        {/* Tagline */}
        <AnimatedText
          text="Automatisation"
          fontSize={52}
          fontWeight={600}
          delay={45}
          staggerDelay={1.5}
        />
        <div style={{ height: 10 }} />
        <AnimatedText
          text="& Boost IA"
          fontSize={68}
          fontWeight={700}
          color={colors.primary}
          delay={70}
          staggerDelay={2}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scene 4: Feature 1 - Automatisation
const SceneAutomation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  // Animated connection lines
  const lineProgress = spring({
    frame: Math.max(0, frame - 50),
    fps,
    config: { damping: 20, stiffness: 60 },
  });

  const nodes = [
    { icon: '📧', label: 'Emails', x: width * 0.2, y: 300 },
    { icon: '📅', label: 'Rendez-vous', x: width * 0.5, y: 180 },
    { icon: '💳', label: 'Facturation', x: width * 0.8, y: 300 },
    { icon: '📊', label: 'Reporting', x: width * 0.35, y: 500 },
    { icon: '🤖', label: 'CRM', x: width * 0.65, y: 500 },
  ];

  return (
    <AbsoluteFill>
      <AnimatedBackground intensity={0.9} />

      {/* Title */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: 80,
        }}
      >
        <AnimatedBar delay={5} height={60} />
        <div style={{ height: 30 }} />
        <AnimatedText
          text="Automatisation"
          fontSize={64}
          fontWeight={700}
          delay={15}
          staggerDelay={1.5}
        />
        <div style={{ height: 15 }} />
        <AnimatedText
          text="sur-mesure"
          fontSize={48}
          fontWeight={500}
          color={colors.primary}
          delay={40}
          staggerDelay={2}
        />
      </AbsoluteFill>

      {/* Automation nodes */}
      {nodes.map((node, i) => (
        <FloatingIcon
          key={i}
          delay={60 + i * 10}
          x={node.x - 45}
          y={node.y}
          size={90}
        >
          {node.icon}
        </FloatingIcon>
      ))}

      {/* Connection lines (SVG) */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      >
        {/* Lines connecting nodes */}
        {[
          [0, 1],
          [1, 2],
          [0, 3],
          [2, 4],
          [3, 4],
        ].map(([from, to], i) => {
          const fromNode = nodes[from];
          const toNode = nodes[to];
          const lineLength = Math.sqrt(
            Math.pow(toNode.x - fromNode.x, 2) +
              Math.pow(toNode.y - fromNode.y, 2)
          );

          const dashOffset = interpolate(lineProgress, [0, 1], [lineLength, 0]);

          return (
            <line
              key={i}
              x1={fromNode.x}
              y1={fromNode.y + 45}
              x2={toNode.x}
              y2={toNode.y + 45}
              stroke={colors.primary}
              strokeWidth={2}
              strokeDasharray={lineLength}
              strokeDashoffset={dashOffset}
              opacity={0.5}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

// Scene 5: Feature 2 - IA Integration
const SceneAI: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  // Brain pulse
  const brainPulse = Math.sin((frame / fps) * 4) * 0.15 + 1;

  // Rotating particles around brain
  const particleCount = 8;
  const particleRadius = 120;

  return (
    <AbsoluteFill>
      <AnimatedBackground intensity={1.3} />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 60,
        }}
      >
        {/* AI Brain visualization */}
        <div style={{ position: 'relative', marginBottom: 50 }}>
          {/* Rotating particles */}
          {Array.from({ length: particleCount }).map((_, i) => {
            const angle =
              (i / particleCount) * Math.PI * 2 + (frame / fps) * 0.5;
            const x = Math.cos(angle) * particleRadius;
            const y = Math.sin(angle) * particleRadius * 0.6;

            const particleOpacity = interpolate(frame, [20 + i * 3, 40 + i * 3], [0, 0.8], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: `translate(${x - 6}px, ${y - 6}px)`,
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: colors.primary,
                  opacity: particleOpacity,
                  boxShadow: `0 0 20px ${colors.glowTerracotta}`,
                }}
              />
            );
          })}

          {/* Brain icon */}
          <div
            style={{
              fontSize: 140,
              transform: `scale(${brainPulse})`,
              filter: `drop-shadow(0 0 30px ${colors.glowTerracotta})`,
            }}
          >
            🧠
          </div>
        </div>

        {/* Text */}
        <AnimatedText
          text="Intelligence"
          fontSize={64}
          fontWeight={700}
          delay={30}
          staggerDelay={1.5}
        />
        <div style={{ height: 10 }} />
        <AnimatedText
          text="Artificielle"
          fontSize={64}
          fontWeight={700}
          color={colors.primary}
          delay={55}
          staggerDelay={1.5}
        />
        <div style={{ height: 40 }} />
        <AnimatedText
          text="intégrée à vos outils"
          fontSize={36}
          fontWeight={400}
          color={colors.textSecondary}
          delay={85}
          staggerDelay={1}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scene 6: Benefits
const SceneBenefits: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const benefits = [
    { icon: '⏰', text: 'Gagnez du temps' },
    { icon: '💰', text: 'Réduisez les coûts' },
    { icon: '📈', text: 'Boostez vos ventes' },
    { icon: '😌', text: 'Respirez enfin' },
  ];

  return (
    <AbsoluteFill>
      <AnimatedBackground intensity={1} />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 60,
          gap: 30,
        }}
      >
        {benefits.map((benefit, i) => {
          const itemDelay = 10 + i * 25;
          const localFrame = frame - itemDelay;

          const progress = spring({
            frame: Math.max(0, localFrame),
            fps,
            config: { damping: 12, stiffness: 100 },
          });

          const translateX = interpolate(progress, [0, 1], [-100, 0]);
          const opacity = interpolate(localFrame, [0, 15], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 25,
                opacity,
                transform: `translateX(${translateX}px)`,
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 20,
                  backgroundColor: colors.surfaceCard,
                  border: `1px solid ${colors.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 40,
                  boxShadow: `0 0 30px rgba(196, 92, 59, 0.2)`,
                }}
              >
                {benefit.icon}
              </div>
              <span
                style={{
                  fontFamily: typography.fontFamily.display,
                  fontSize: 42,
                  fontWeight: 600,
                  color: colors.textPrimary,
                }}
              >
                {benefit.text}
              </span>
            </div>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scene 7: CTA
const SceneCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Pulsing CTA button
  const ctaPulse = Math.sin((frame / fps) * 4) * 0.05 + 1;

  const ctaProgress = spring({
    frame: Math.max(0, frame - 60),
    fps,
    config: { damping: 10, stiffness: 100 },
  });

  const ctaScale = interpolate(ctaProgress, [0, 1], [0.8, 1]);
  const ctaOpacity = interpolate(frame, [60, 80], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Logo
  const logoOpacity = interpolate(frame, [5, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <AnimatedBackground intensity={1.4} />

      {/* Intense background glow */}
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.glowTerracotta} 0%, transparent 50%)`,
          opacity: 0.4,
          filter: 'blur(80px)',
        }}
      />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 60,
        }}
      >
        {/* Logo */}
        <div style={{ opacity: logoOpacity, marginBottom: 50 }}>
          <Img
            src={staticFile('neurolia/logo_neurolia_light.svg')}
            style={{ width: 280 }}
          />
        </div>

        {/* Main CTA text */}
        <AnimatedText
          text="Prêt à"
          fontSize={48}
          fontWeight={500}
          color={colors.textSecondary}
          delay={20}
          staggerDelay={2}
        />
        <div style={{ height: 15 }} />
        <AnimatedText
          text="automatiser ?"
          fontSize={72}
          fontWeight={700}
          delay={40}
          staggerDelay={1.5}
        />

        {/* CTA Button */}
        <div
          style={{
            marginTop: 60,
            padding: '24px 60px',
            backgroundColor: colors.primary,
            borderRadius: 16,
            opacity: ctaOpacity,
            transform: `scale(${ctaScale * ctaPulse})`,
            boxShadow: `0 0 50px ${colors.glowTerracotta}`,
          }}
        >
          <span
            style={{
              fontFamily: typography.fontFamily.display,
              fontSize: 32,
              fontWeight: 600,
              color: '#FFFFFF',
            }}
          >
            Contactez-nous
          </span>
        </div>

        {/* Website */}
        <div
          style={{
            marginTop: 40,
            opacity: interpolate(frame, [90, 110], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          <span
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: 24,
              fontWeight: 400,
              color: colors.textMuted,
            }}
          >
            neurolia.fr
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ============================================
// MAIN COMPOSITION
// ============================================

export const AgencyShowcase: React.FC<AgencyShowcaseProps> = ({ variant }) => {
  const { fps } = useVideoConfig();

  // Scene durations in seconds
  const sceneDurations = {
    hook: 4,
    problem: 4,
    solutionIntro: 3.5,
    automation: 4.5,
    ai: 4,
    benefits: 4.5,
    cta: 5.5,
  };

  // Convert to frames
  const frames = {
    hook: sceneDurations.hook * fps,
    problem: sceneDurations.problem * fps,
    solutionIntro: sceneDurations.solutionIntro * fps,
    automation: sceneDurations.automation * fps,
    ai: sceneDurations.ai * fps,
    benefits: sceneDurations.benefits * fps,
    cta: sceneDurations.cta * fps,
  };

  const transitionDuration = 15; // 0.5s at 30fps

  return (
    <AbsoluteFill>
      <TransitionSeries>
        {/* Scene 1: Hook */}
        <TransitionSeries.Sequence durationInFrames={frames.hook}>
          <SceneHook />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: 'from-bottom' })}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene 2: Problem */}
        <TransitionSeries.Sequence durationInFrames={frames.problem}>
          <SceneProblem />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene 3: Solution intro */}
        <TransitionSeries.Sequence durationInFrames={frames.solutionIntro}>
          <SceneSolutionIntro />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: 'from-right' })}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene 4: Automation */}
        <TransitionSeries.Sequence durationInFrames={frames.automation}>
          <SceneAutomation />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: 'from-left' })}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene 5: AI */}
        <TransitionSeries.Sequence durationInFrames={frames.ai}>
          <SceneAI />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene 6: Benefits */}
        <TransitionSeries.Sequence durationInFrames={frames.benefits}>
          <SceneBenefits />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: 'from-bottom' })}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene 7: CTA */}
        <TransitionSeries.Sequence durationInFrames={frames.cta}>
          <SceneCTA />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
