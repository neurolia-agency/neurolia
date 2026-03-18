/**
 * Generate Captions (SRT) from Video Script
 *
 * Parses a video script markdown file and generates an SRT file
 * with word-level timestamps for TikTok-style captions.
 *
 * Usage:
 *   npx tsx scripts/generate-captions.ts --script=content/scripts/V-2026-W13-01.md
 *   npx tsx scripts/generate-captions.ts --script=content/scripts/V-2026-W13-01.md --format=json
 *
 * Output formats:
 *   - SRT (default): Standard subtitle format
 *   - JSON: CaptionTrack for Remotion component
 */

import * as fs from 'fs';
import * as path from 'path';

interface CaptionEntry {
  index: number;
  start: number; // seconds
  end: number;
  text: string;
  accentWord?: string;
}

function formatSRTTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const ms = Math.round((seconds % 1) * 1000);
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')},${ms.toString().padStart(3, '0')}`;
}

function parseScript(scriptPath: string): CaptionEntry[] {
  const content = fs.readFileSync(scriptPath, 'utf-8');
  const entries: CaptionEntry[] = [];

  // Extract scenes with timing info
  // Pattern: ### Scene N — Title (Xs-Ys)
  // **Voiceover** : "text"
  const sceneRegex = /### .+?\((\d+(?:\.\d+)?)s[–-](\d+(?:\.\d+)?)s\)\s*\n(?:.*?\n)*?\*\*Voiceover\*\*\s*:\s*"([^"]+)"/g;

  let match: RegExpExecArray | null;
  let index = 1;

  while ((match = sceneRegex.exec(content)) !== null) {
    const startTime = parseFloat(match[1]);
    const endTime = parseFloat(match[2]);
    const text = match[3];

    entries.push({
      index,
      start: startTime,
      end: endTime,
      text,
    });
    index++;
  }

  // Fallback: if no timing in scenes, use voiceover complet section
  if (entries.length === 0) {
    const voiceoverMatch = content.match(/## Voiceover complet\s*\n>\s*(.+?)(?=\n## |\n---|\n$)/s);
    if (voiceoverMatch) {
      const fullText = voiceoverMatch[1].trim();
      const sentences = fullText.split(/[.!?]+/).filter(s => s.trim());

      // Get total duration from metadata
      const durationMatch = content.match(/\| Duree \| (\d+)s \|/);
      const totalDuration = durationMatch ? parseInt(durationMatch[1]) : 30;

      // Distribute evenly
      const avgDuration = totalDuration / sentences.length;

      sentences.forEach((sentence, i) => {
        entries.push({
          index: i + 1,
          start: i * avgDuration,
          end: (i + 1) * avgDuration,
          text: sentence.trim(),
        });
      });
    }
  }

  return entries;
}

function toSRT(entries: CaptionEntry[]): string {
  return entries
    .map(entry =>
      `${entry.index}\n${formatSRTTime(entry.start)} --> ${formatSRTTime(entry.end)}\n${entry.text}\n`
    )
    .join('\n');
}

function toJSON(entries: CaptionEntry[], videoId: string): string {
  return JSON.stringify(
    {
      videoId,
      language: 'fr',
      entries: entries.map(({ start, end, text, accentWord }) => ({
        start,
        end,
        text,
        ...(accentWord ? { accentWord } : {}),
      })),
    },
    null,
    2
  );
}

function main() {
  const args = process.argv.slice(2);
  const scriptArg = args.find(a => a.startsWith('--script='))?.split('=')[1];
  const formatArg = args.find(a => a.startsWith('--format='))?.split('=')[1] || 'srt';

  if (!scriptArg) {
    console.log(`
Usage:
  npx tsx scripts/generate-captions.ts --script=content/scripts/V-2026-W13-01.md
  npx tsx scripts/generate-captions.ts --script=content/scripts/V-2026-W13-01.md --format=json

Options:
  --script=PATH    Path to video script markdown file
  --format=FORMAT  Output format: srt (default) or json
    `);
    return;
  }

  const scriptPath = path.resolve(scriptArg);
  const entries = parseScript(scriptPath);

  if (entries.length === 0) {
    console.error('❌ No caption entries found in script.');
    process.exit(1);
  }

  const videoId = path.basename(scriptPath, '.md');
  const ext = formatArg === 'json' ? 'json' : 'srt';
  const outputPath = scriptPath.replace('.md', `.${ext}`);

  const output = formatArg === 'json'
    ? toJSON(entries, videoId)
    : toSRT(entries);

  fs.writeFileSync(outputPath, output);
  console.log(`✅ Generated ${entries.length} caption entries → ${outputPath}`);
}

main();
