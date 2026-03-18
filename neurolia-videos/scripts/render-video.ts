/**
 * Multi-format Batch Render
 *
 * Renders a video composition to all target platforms in one command.
 *
 * Usage:
 *   npx tsx scripts/render-video.ts --id=FeatureFlashReel
 *   npx tsx scripts/render-video.ts --id=FeatureFlashReel --platforms=reel,tiktok
 *   npx tsx scripts/render-video.ts --all
 *
 * Prerequisites:
 *   - Remotion installed (npm install)
 *   - Compositions registered in Root.tsx
 */

import { execSync } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

const PROJECT_ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(PROJECT_ROOT, 'out');
const ENTRY_POINT = 'src/index.ts';

interface RenderConfig {
  compositionId: string;
  outputFile: string;
  codec?: string;
}

// Platform-specific render configs
const PLATFORM_SUFFIXES: Record<string, { suffix: string; codec: string }> = {
  reel: { suffix: '-reel', codec: 'h264' },
  tiktok: { suffix: '-tiktok', codec: 'h264' },
  'youtube-short': { suffix: '-yt-short', codec: 'h264' },
  'youtube-long': { suffix: '-yt-long', codec: 'h264' },
  web: { suffix: '-web', codec: 'vp8' },
};

function render(config: RenderConfig) {
  const outputPath = path.join(OUT_DIR, config.outputFile);
  const codec = config.codec || 'h264';
  const ext = codec === 'vp8' || codec === 'vp9' ? 'webm' : 'mp4';
  const fullPath = `${outputPath}.${ext}`;

  console.log(`\n🎬 Rendering ${config.compositionId} → ${fullPath}`);

  const cmd = [
    'npx remotion render',
    ENTRY_POINT,
    config.compositionId,
    fullPath,
    `--codec=${codec}`,
    '--log=error',
  ].join(' ');

  try {
    execSync(cmd, { cwd: PROJECT_ROOT, stdio: 'inherit' });
    const stats = fs.statSync(fullPath);
    console.log(`  ✅ Done (${(stats.size / 1024 / 1024).toFixed(1)} MB)`);
    return fullPath;
  } catch (error) {
    console.error(`  ❌ Failed to render ${config.compositionId}`);
    throw error;
  }
}

function main() {
  const args = process.argv.slice(2);
  const idArg = args.find(a => a.startsWith('--id='))?.split('=')[1];
  const platformsArg = args.find(a => a.startsWith('--platforms='))?.split('=')[1];
  const renderAll = args.includes('--all');

  fs.mkdirSync(OUT_DIR, { recursive: true });

  if (!idArg && !renderAll) {
    console.log(`
Usage:
  npx tsx scripts/render-video.ts --id=CompositionId
  npx tsx scripts/render-video.ts --id=CompositionId --platforms=reel,tiktok
  npx tsx scripts/render-video.ts --all

Options:
  --id=ID           Remotion composition ID to render
  --platforms=LIST  Comma-separated platform list (reel,tiktok,youtube-short,youtube-long)
  --all             Render all compositions
    `);
    return;
  }

  if (idArg) {
    const platforms = platformsArg?.split(',') || ['reel'];

    console.log(`\n🎬 Rendering ${idArg} for platforms: ${platforms.join(', ')}\n`);

    const results: string[] = [];
    for (const platform of platforms) {
      const config = PLATFORM_SUFFIXES[platform];
      if (!config) {
        console.warn(`  ⚠️  Unknown platform: ${platform}`);
        continue;
      }

      const rendered = render({
        compositionId: idArg,
        outputFile: `${idArg}${config.suffix}`,
        codec: config.codec,
      });
      results.push(rendered);
    }

    console.log(`\n✅ Rendered ${results.length} file(s):\n${results.map(r => `  ${r}`).join('\n')}\n`);
  }
}

main();
