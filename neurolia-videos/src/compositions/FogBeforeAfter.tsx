import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  staticFile,
  Sequence,
  Video,
} from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { slide } from '@remotion/transitions/slide';
import { z } from 'zod';
import { AnimatedBackground } from '../components/backgrounds/AnimatedBackground';
import { AnimatedText } from '../components/typography/AnimatedText';
import { LogoOverlay } from '../components/overlays/LogoOverlay';
import { colors, typography } from '../styles/neurolia-tokens';

// ============================================
// Schema
// ============================================

export const fogBeforeAfterSchema = z.object({
  hookLine1: z.string(),
  hookLine2: z.string(),
  ctaText: z.string(),
  url: z.string(),
  beforeVideo: z.string(),
  afterVideo: z.string(),
});

type FogBeforeAfterProps = z.infer<typeof fogBeforeAfterSchema>;

// ============================================
// Sub-components
// ============================================

/** Badge "AVANT" / "APRES" avec spring entrance */
const PhaseLabel: React.FC<{
  label: string;
  color: string;
  delay: number;
}> = ({ label, color, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  const opacity = interpolate(frame - delay, [0, 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(progress, [0, 1], [0.6, 1]);
  const translateY = interpolate(progress, [0, 1], [-20, 0]);

  return (
    <div
      style={{
        position: 'absolute',
        top: 60,
        left: '50%',
        transform: `translateX(-50%) translateY(${translateY}px) scale(${scale})`,
        opacity,
        zIndex: 10,
      }}
    >
      <div
        style={{
          padding: '10px 32px',
          borderRadius: 24,
          backgroundColor: color,
          fontFamily: typography.fontFamily.display,
          fontSize: 22,
          fontWeight: 700,
          color: '#ffffff',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>
    </div>
  );
};

/** Phone mockup avec video a l'interieur */
const PhoneMockup: React.FC<{
  videoSrc: string;
  delay: number;
}> = ({ videoSrc, delay }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  const progress = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 15, stiffness: 80, mass: 1.2 },
  });

  const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const translateY = interpolate(progress, [0, 1], [80, 0]);
  const scaleAnim = interpolate(progress, [0, 1], [0.85, 1]);

  const phoneWidth = width * 0.85;
  const phoneHeight = phoneWidth * (19.5 / 9);
  const bezel = 8;
  const borderRadius = 40;

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -46%) translateY(${translateY}px) scale(${scaleAnim})`,
        opacity,
      }}
    >
      {/* Glow behind phone */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: phoneWidth * 0.7,
          height: phoneHeight * 0.5,
          borderRadius: '50%',
          background: `radial-gradient(ellipse, ${colors.glowTerracotta} 0%, transparent 60%)`,
          opacity: 0.25,
          filter: 'blur(60px)',
        }}
      />

      {/* Phone frame */}
      <div
        style={{
          width: phoneWidth,
          height: phoneHeight,
          borderRadius,
          border: `${bezel}px solid ${colors.surfaceContrast}`,
          overflow: 'hidden',
          boxShadow: `0 0 0 1px ${colors.border}, 0 30px 80px rgba(0, 0, 0, 0.6)`,
          position: 'relative',
          backgroundColor: '#000',
        }}
      >
        <Video
          src={staticFile(videoSrc)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          muted
        />
      </div>
    </div>
  );
};

// ============================================
// Main Composition
// ============================================

/**
 * FogBeforeAfter — Reel Instagram 15s
 *
 * Structure :
 * - Hook (0-2s / 0-60f) : texte accroche
 * - Avant (2-6s / 60-180f) : label AVANT + video scroll futureofgrow.com
 * - Transition (wipe 0.5s / 15f)
 * - Apres (6.5-12s / 195-360f) : label APRES + video scroll Shopify
 * - CTA (12-15s / 360-450f) : logo Neurolia + CTA
 */
export const FogBeforeAfter: React.FC<FogBeforeAfterProps> = ({
  hookLine1,
  hookLine2,
  ctaText,
  url,
  beforeVideo,
  afterVideo,
}) => {
  const { fps } = useVideoConfig();

  const HOOK_DURATION = Math.round(1.5 * fps); // 45f
  const BEFORE_DURATION = Math.round(5.5 * fps); // 165f
  const TRANSITION_DURATION = 15; // 0.5s
  const AFTER_DURATION = 6 * fps; // 180f
  const CTA_DURATION = 3 * fps; // 90f

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <TransitionSeries>
        {/* ===== SCENE 1 : HOOK ===== */}
        <TransitionSeries.Sequence durationInFrames={HOOK_DURATION}>
          <AbsoluteFill>
            <AnimatedBackground intensity={1.2} />
            <AbsoluteFill
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 60,
                gap: 16,
              }}
            >
              <AnimatedText
                text={hookLine1}
                fontSize={72}
                fontWeight={700}
                delay={3}
                staggerDelay={1.5}
              />
              <div style={{ height: 12 }} />
              <AnimatedText
                text={hookLine2}
                fontSize={72}
                fontWeight={700}
                color={colors.primary}
                delay={18}
                staggerDelay={1.5}
              />
            </AbsoluteFill>
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        {/* Transition hook -> avant */}
        <TransitionSeries.Transition
          presentation={slide({ direction: 'from-right' })}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* ===== SCENE 2 : AVANT ===== */}
        <TransitionSeries.Sequence durationInFrames={BEFORE_DURATION}>
          <AbsoluteFill>
            <AnimatedBackground intensity={0.6} />
            <PhaseLabel label="Avant" color="#6B7280" delay={5} />
            <PhoneMockup videoSrc={beforeVideo} delay={8} />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        {/* Transition avant -> apres (wipe) */}
        <TransitionSeries.Transition
          presentation={slide({ direction: 'from-right' })}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* ===== SCENE 3 : APRES ===== */}
        <TransitionSeries.Sequence durationInFrames={AFTER_DURATION}>
          <AbsoluteFill>
            <AnimatedBackground intensity={0.8} />
            <PhaseLabel label="Apres" color={colors.primary} delay={5} />
            <PhoneMockup videoSrc={afterVideo} delay={8} />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        {/* Transition apres -> CTA */}
        <TransitionSeries.Transition
          presentation={slide({ direction: 'from-bottom' })}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* ===== SCENE 4 : CTA ===== */}
        <TransitionSeries.Sequence durationInFrames={CTA_DURATION}>
          <CTAFinalScene ctaText={ctaText} url={url} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};

/** Scene CTA finale avec logo et glow */
const CTAFinalScene: React.FC<{ ctaText: string; url: string }> = ({
  ctaText,
  url,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const glowPulse = Math.sin((frame / fps) * 3) * 0.3 + 0.7;

  const urlOpacity = interpolate(frame, [40, 55], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <AnimatedBackground intensity={1.4} />

      {/* Glow central */}
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.glowTerracotta} 0%, transparent 50%)`,
          opacity: 0.35 * glowPulse,
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
          gap: 24,
        }}
      >
        {/* Logo */}
        <LogoOverlay delay={3} width={240} position="top" />

        <div style={{ height: 140 }} />

        {/* Texte CTA */}
        <AnimatedText
          text={ctaText}
          fontSize={56}
          fontWeight={700}
          delay={15}
          staggerDelay={1.5}
        />

        {/* URL */}
        <div style={{ marginTop: 40, opacity: urlOpacity }}>
          <span
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: 24,
              fontWeight: 400,
              color: colors.textMuted,
            }}
          >
            {url}
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
