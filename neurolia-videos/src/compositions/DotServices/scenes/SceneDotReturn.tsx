import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';
import { LogoSVG, LOGO_VIEWBOX } from '../components/LogoSVG';
import { AnimatedText } from '../components/AnimatedText';
import { colors, typography } from '../../../styles/neurolia-tokens';

const LOGO_WIDTH = 500;
const LOGO_HEIGHT = (LOGO_VIEWBOX.height / LOGO_VIEWBOX.width) * LOGO_WIDTH;

/**
 * Scene 6: Dot Return + CTA (frames 900-1110, local 0-210)
 */
export const SceneDotReturn: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoX = (1080 - LOGO_WIDTH) / 2;
  const logoY = 680;

  const logoOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const dotInLogo = frame >= 50;

  // Glow burst at click
  const glowBurst = frame >= 48 && frame <= 65;
  const glowOpacity = glowBurst
    ? interpolate(frame, [48, 52, 65], [0, 0.6, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 0;

  const ctaTextDelay = 70;

  // CTA button
  const buttonFrame = frame - 100;
  const buttonProgress = spring({
    frame: Math.max(0, buttonFrame),
    fps,
    config: { damping: 10, stiffness: 100 },
  });
  const buttonScale = interpolate(buttonProgress, [0, 1], [0.8, 1]);
  const buttonOpacity = interpolate(buttonFrame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const buttonPulse = frame >= 120
    ? 1 + Math.sin(((frame - 120) / fps) * 3) * 0.02
    : 1;

  // Handle tag
  const tagOpacity = interpolate(frame, [130, 145], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <LogoSVG
        width={LOGO_WIDTH}
        x={logoX}
        y={logoY}
        theme="dark"
        overallOpacity={logoOpacity}
        dotVisible={dotInLogo}
      />

      {/* Glow burst */}
      {glowOpacity > 0 && (
        <div
          style={{
            position: 'absolute',
            left: logoX + (45.91 / LOGO_VIEWBOX.width) * LOGO_WIDTH - 60,
            top: logoY + (8.46 / LOGO_VIEWBOX.height) * LOGO_HEIGHT - 60,
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(196, 92, 59, 0.5) 0%, transparent 70%)`,
            opacity: glowOpacity,
            filter: 'blur(15px)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* CTA text */}
      <div
        style={{
          position: 'absolute',
          left: 80,
          right: 80,
          top: logoY + LOGO_HEIGHT + 80,
          textAlign: 'center',
        }}
      >
        <AnimatedText
          text="Pret a respirer ?"
          fontSize={36}
          fontWeight={600}
          color={colors.textPrimary}
          delay={ctaTextDelay}
          mode="wordByWord"
          staggerFrames={4}
        />
        <div style={{ height: 16 }} />
        <AnimatedText
          text="30 minutes. Gratuit. Sans engagement."
          fontSize={26}
          fontWeight={400}
          color={colors.textSecondary}
          delay={ctaTextDelay + 15}
          mode="wordByWord"
          staggerFrames={3}
        />
      </div>

      {/* CTA Button */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: logoY + LOGO_HEIGHT + 240,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            padding: '24px 60px',
            backgroundColor: colors.primary,
            borderRadius: 100,
            opacity: buttonOpacity,
            transform: `scale(${buttonScale * buttonPulse})`,
            boxShadow: '0 4px 30px rgba(196, 92, 59, 0.3), 0 0 60px rgba(196, 92, 59, 0.15)',
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
            Reserver mon appel
          </span>
        </div>
      </div>

      {/* Handle tag */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 120,
          display: 'flex',
          justifyContent: 'center',
          opacity: tagOpacity,
        }}
      >
        <span
          style={{
            fontFamily: typography.fontFamily.sans,
            fontSize: 24,
            fontWeight: 500,
            color: colors.textMuted,
          }}
        >
          @neurolia.fr
        </span>
      </div>
    </AbsoluteFill>
  );
};
