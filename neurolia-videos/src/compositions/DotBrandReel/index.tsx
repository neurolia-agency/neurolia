import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { z } from 'zod';
import { COMP, SCENES, C } from './constants';
import { Scene01DotBirth } from './scenes/Scene01DotBirth';
import { Scene02Construction } from './scenes/Scene02Construction';
import { SceneBuild3D } from './scenes/SceneBuild3D';
import { Scene05Explore3D } from './scenes/Scene05Explore3D';
import { Scene05Alternations } from './scenes/Scene05Alternations';
import { Scene06Palette } from './scenes/Scene06Palette';
import { Scene08Services } from './scenes/Scene08Services';
import { Scene09Tagline } from './scenes/Scene09Tagline';
import { Scene10Instagram } from './scenes/Scene10Instagram';
import { AudioManager } from './components/AudioManager';

export const dotBrandReelSchema = z.object({});

type DotBrandReelProps = z.infer<typeof dotBrandReelSchema>;

export const DotBrandReel: React.FC<DotBrandReelProps> = () => {
  const pm = COMP.fps; // premount = 1 second

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      {/* Scene 1 — Dot Birth (0-132) */}
      <Sequence
        from={SCENES.dotBirth.from}
        durationInFrames={SCENES.dotBirth.duration}
        premountFor={pm}
      >
        <Scene01DotBirth />
      </Sequence>

      {/* Scene 2 — Construction: N build + eurolia slides + assemble (132-396) */}
      <Sequence
        from={SCENES.construction.from}
        durationInFrames={SCENES.construction.duration}
        premountFor={pm}
      >
        <Scene02Construction />
      </Sequence>

      {/* Scene 3 — Build 3D: extrusion + edges + vitrification (396-612) */}
      <Sequence
        from={SCENES.build3D.from}
        durationInFrames={SCENES.build3D.duration}
        premountFor={pm}
      >
        <SceneBuild3D />
      </Sequence>

      {/* Scene 4 — 3D Exploration (612-708) */}
      <Sequence
        from={SCENES.explore3D.from}
        durationInFrames={SCENES.explore3D.duration}
        premountFor={pm}
      >
        <Scene05Explore3D />
      </Sequence>

      {/* Scene 5 — Alternations (708-804) */}
      <Sequence
        from={SCENES.alternations.from}
        durationInFrames={SCENES.alternations.duration}
        premountFor={pm}
      >
        <Scene05Alternations />
      </Sequence>

      {/* Scene 6 — Palette (804-876) */}
      <Sequence
        from={SCENES.palette.from}
        durationInFrames={SCENES.palette.duration}
        premountFor={pm}
      >
        <Scene06Palette />
      </Sequence>

      {/* Scene 7 — Services (876-1020) */}
      <Sequence
        from={SCENES.services.from}
        durationInFrames={SCENES.services.duration}
        premountFor={pm}
      >
        <Scene08Services />
      </Sequence>

      {/* Scene 8 — Tagline (1020-1092) */}
      <Sequence
        from={SCENES.tagline.from}
        durationInFrames={SCENES.tagline.duration}
        premountFor={pm}
      >
        <Scene09Tagline />
      </Sequence>

      {/* Scene 9 — Instagram (1092-1188) */}
      <Sequence
        from={SCENES.instagram.from}
        durationInFrames={SCENES.instagram.duration}
        premountFor={pm}
      >
        <Scene10Instagram />
      </Sequence>

      {/* Audio -- plays across all scenes */}
      <AudioManager />
    </AbsoluteFill>
  );
};
