import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C } from '../constants';
import { PaletteColumns } from '../components/PaletteColumns';

/**
 * Scene 06 — Palette (from=552, duration=72, 6 beats)
 *
 * Timeline:
 *   0     : Cut to grey background (#E8E8E8)
 *   3-24  : PaletteColumns stagger entrance (spring drop from top)
 *   24-48 : Columns oscillate in wave pattern
 *   48-72 : Columns eject downward with reverse stagger
 */
export const Scene06Palette: React.FC = () => {
  const localFrame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: C.grey }}>
      <PaletteColumns
        frame={localFrame}
        exitStart={48}
        exitEnd={72}
      />
    </AbsoluteFill>
  );
};
