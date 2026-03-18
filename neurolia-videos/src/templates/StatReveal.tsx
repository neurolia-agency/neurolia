/**
 * StatReveal Template — Animated number reveal (15-20s)
 *
 * Structure: Hook (2-3s) → Number animation (5-8s) → Context + CTA (5-8s)
 * Platforms: IG Reels + TikTok
 *
 * Perfect for social proof and impressive stats.
 */

import React from 'react';
import {
  AbsoluteFill,
  useVideoConfig,
} from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';

import { HookScene } from '../components/scenes/HookScene';
import { StatRevealScene } from '../components/scenes/StatRevealScene';
import { CTAScene } from '../components/scenes/CTAScene';
import { statRevealSchema } from '../data/types';
import type { StatRevealProps } from '../data/types';

export { statRevealSchema };

export const StatReveal: React.FC<StatRevealProps> = ({
  hook,
  stat,
  cta,
  durationSeconds,
}) => {
  const { fps } = useVideoConfig();

  const totalFrames = durationSeconds * fps;
  const transitionDuration = 15;

  // Scene distribution: Hook ~15%, Stat ~45%, CTA ~40%
  const hookFrames = Math.round(totalFrames * 0.15);
  const ctaFrames = Math.round(totalFrames * 0.40);
  const statFrames = totalFrames - hookFrames - ctaFrames;

  // Split hook text
  const hookWords = hook.text.split(' ');
  const midPoint = Math.ceil(hookWords.length / 2);
  const hookLine1 = hookWords.slice(0, midPoint).join(' ');
  const hookLine2 = hookWords.slice(midPoint).join(' ');

  return (
    <AbsoluteFill>
      <TransitionSeries>
        {/* Scene 1: Hook */}
        <TransitionSeries.Sequence durationInFrames={hookFrames}>
          <HookScene
            textLine1={hookLine1}
            textLine2={hookLine2}
            accentText={hook.accentWord}
            backgroundIntensity={1}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene 2: Number animation */}
        <TransitionSeries.Sequence durationInFrames={statFrames}>
          <StatRevealScene
            value={stat.value}
            prefix={stat.prefix}
            suffix={stat.suffix}
            context={stat.context}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene 3: CTA */}
        <TransitionSeries.Sequence durationInFrames={ctaFrames}>
          <CTAScene
            mainText={cta.text}
            buttonText="Essayer"
            url={cta.url || 'neurolia.fr'}
            showLogo
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
