/**
 * FeatureFlash Template — Workhorse short-form video (15-30s)
 *
 * Structure: Hook (3-4s) → Feature showcase (8-15s) → CTA (4-5s)
 * Platforms: IG Reels + TikTok + YouTube Shorts
 *
 * This is a DATA-DRIVEN template. Each video is a config object,
 * not custom code. See src/data/types.ts for FeatureFlashProps.
 */

import React from 'react';
import {
  AbsoluteFill,
  useVideoConfig,
} from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { slide } from '@remotion/transitions/slide';
import { fade } from '@remotion/transitions/fade';

import { HookScene } from '../components/scenes/HookScene';
import { FeatureScene } from '../components/scenes/FeatureScene';
import { CTAScene } from '../components/scenes/CTAScene';
import { featureFlashSchema } from '../data/types';
import type { FeatureFlashProps } from '../data/types';

export { featureFlashSchema };

export const FeatureFlash: React.FC<FeatureFlashProps> = ({
  hook,
  feature,
  cta,
  durationSeconds,
}) => {
  const { fps } = useVideoConfig();

  const totalFrames = durationSeconds * fps;
  const transitionDuration = 15; // 0.5s

  // Scene distribution: Hook ~15%, Feature ~55%, CTA ~30%
  const hookFrames = Math.round(totalFrames * 0.15);
  const ctaFrames = Math.round(totalFrames * 0.30);
  const featureFrames = totalFrames - hookFrames - ctaFrames;

  // Split hook text into lines for better visual
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
            backgroundIntensity={1.2}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: 'from-bottom' })}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene 2: Feature showcase */}
        <TransitionSeries.Sequence durationInFrames={featureFrames}>
          <FeatureScene
            title={feature.moduleName}
            description={feature.description}
            screenshot={feature.screenshot}
            device="desktop"
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
            buttonText="Decouvrir"
            url={cta.url || 'neurolia.fr'}
            showLogo
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
