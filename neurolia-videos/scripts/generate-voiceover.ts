/**
 * Generate Voiceover with ElevenLabs
 *
 * Converts text to speech using ElevenLabs API.
 * Output: public/audio/voiceover/ (MP3)
 *
 * Usage:
 *   npx tsx scripts/generate-voiceover.ts --text="Votre texte ici" --output=V-2026-W13-01
 *   npx tsx scripts/generate-voiceover.ts --script=content/scripts/V-2026-W13-01.md
 *
 * Prerequisites:
 *   - ELEVENLABS_API_KEY in .env.local
 *   - Voice ID selected (see --list-voices)
 */

import * as fs from 'fs';
import * as path from 'path';

const API_BASE = 'https://api.elevenlabs.io/v1';
const OUTPUT_DIR = path.resolve(__dirname, '../public/audio/voiceover');

// Default voice settings for Neurolia
const VOICE_SETTINGS = {
  stability: 0.5,
  similarity_boost: 0.75,
  style: 0.3,
  use_speaker_boost: true,
};

// Model: Multilingual v2 (best for French)
const MODEL_ID = 'eleven_multilingual_v2';

interface VoiceoverOptions {
  text: string;
  outputName: string;
  voiceId?: string;
  modelId?: string;
}

async function getApiKey(): Promise<string> {
  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) {
    // Try reading from .env.local
    const envPath = path.resolve(__dirname, '../.env.local');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf-8');
      const match = envContent.match(/ELEVENLABS_API_KEY=(.+)/);
      if (match) return match[1].trim();
    }
    throw new Error('ELEVENLABS_API_KEY not found. Set it in .env.local or environment.');
  }
  return key;
}

async function listVoices() {
  const apiKey = await getApiKey();
  const res = await fetch(`${API_BASE}/voices`, {
    headers: { 'xi-api-key': apiKey },
  });
  const data = await res.json();

  console.log('\n🎙️  Available voices:\n');
  for (const voice of data.voices) {
    const labels = voice.labels || {};
    const lang = labels.language || '?';
    const gender = labels.gender || '?';
    const age = labels.age || '?';
    console.log(`  ${voice.voice_id} — ${voice.name} (${lang}, ${gender}, ${age})`);
  }
  console.log('\nUse --voice=VOICE_ID to select a voice.\n');
}

async function generateVoiceover(options: VoiceoverOptions) {
  const apiKey = await getApiKey();
  const voiceId = options.voiceId || process.env.ELEVENLABS_VOICE_ID;

  if (!voiceId) {
    throw new Error('No voice ID specified. Use --voice=VOICE_ID or set ELEVENLABS_VOICE_ID');
  }

  console.log(`🎙️  Generating voiceover...`);
  console.log(`  Text: "${options.text.substring(0, 80)}..."`);
  console.log(`  Voice: ${voiceId}`);
  console.log(`  Model: ${options.modelId || MODEL_ID}`);

  const res = await fetch(`${API_BASE}/text-to-speech/${voiceId}`, {
    method: 'POST',
    headers: {
      'xi-api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: options.text,
      model_id: options.modelId || MODEL_ID,
      voice_settings: VOICE_SETTINGS,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`ElevenLabs API error (${res.status}): ${error}`);
  }

  // Save MP3
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const outputPath = path.join(OUTPUT_DIR, `${options.outputName}.mp3`);
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(outputPath, buffer);

  console.log(`  ✅ Saved: ${outputPath}`);
  console.log(`  📊 Size: ${(buffer.length / 1024).toFixed(1)} KB`);

  return outputPath;
}

function extractVoiceoverFromScript(scriptPath: string): string {
  const content = fs.readFileSync(scriptPath, 'utf-8');

  // Look for "## Voiceover complet" section
  const voiceoverMatch = content.match(/## Voiceover complet\s*\n>\s*(.+?)(?=\n## |\n---|\n$)/s);
  if (voiceoverMatch) {
    return voiceoverMatch[1].trim();
  }

  // Fallback: extract all **Voiceover** lines
  const voiceoverLines = content.match(/\*\*Voiceover\*\*\s*:\s*"([^"]+)"/g);
  if (voiceoverLines) {
    return voiceoverLines
      .map(line => line.match(/"([^"]+)"/)?.[1] || '')
      .filter(Boolean)
      .join(' ');
  }

  throw new Error(`No voiceover text found in ${scriptPath}`);
}

async function main() {
  const args = process.argv.slice(2);

  // --list-voices
  if (args.includes('--list-voices')) {
    await listVoices();
    return;
  }

  // Parse args
  const textArg = args.find(a => a.startsWith('--text='))?.split('=').slice(1).join('=');
  const scriptArg = args.find(a => a.startsWith('--script='))?.split('=')[1];
  const outputArg = args.find(a => a.startsWith('--output='))?.split('=')[1];
  const voiceArg = args.find(a => a.startsWith('--voice='))?.split('=')[1];

  let text: string;
  let outputName: string;

  if (scriptArg) {
    const scriptPath = path.resolve(scriptArg);
    text = extractVoiceoverFromScript(scriptPath);
    outputName = outputArg || path.basename(scriptPath, '.md');
  } else if (textArg) {
    text = textArg;
    outputName = outputArg || `voiceover-${Date.now()}`;
  } else {
    console.log(`
Usage:
  npx tsx scripts/generate-voiceover.ts --text="Texte" --output=filename
  npx tsx scripts/generate-voiceover.ts --script=content/scripts/V-2026-W13-01.md
  npx tsx scripts/generate-voiceover.ts --list-voices

Options:
  --text=TEXT       Text to convert to speech
  --script=PATH     Extract voiceover from script markdown file
  --output=NAME     Output filename (without extension)
  --voice=ID        ElevenLabs voice ID
  --list-voices     List available voices
    `);
    return;
  }

  await generateVoiceover({
    text,
    outputName,
    voiceId: voiceArg,
  });
}

main().catch(console.error);
