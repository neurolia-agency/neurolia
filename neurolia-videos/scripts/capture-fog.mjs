/**
 * Capture screen recordings du site FOG (avant/apres)
 * Usage: node scripts/capture-fog.mjs
 *
 * V2 : banniere masquee, scroll ralenti avec pauses sur sections cles
 */
import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.resolve(__dirname, '../public/recordings');

const VIEWPORT = { width: 390, height: 844 }; // iPhone 14 Pro

/**
 * Scroll segmente : alterne scroll doux et pauses sur les sections cles.
 * @param {object} page - Playwright page
 * @param {Array<{distance: number, pauseMs?: number}>} segments
 *   Chaque segment scroll de `distance` px puis pause `pauseMs` ms.
 * @param {number} scrollSpeed - px/step (plus bas = plus lent)
 * @param {number} stepDelay - ms entre chaque step (~frame interval)
 */
async function segmentedScroll(page, segments, scrollSpeed = 30, stepDelay = 50) {
  for (const seg of segments) {
    const steps = Math.ceil(seg.distance / scrollSpeed);
    const actualStep = seg.distance / steps;

    for (let i = 0; i < steps; i++) {
      await page.evaluate((d) => window.scrollBy(0, d), actualStep);
      await page.waitForTimeout(stepDelay);
    }

    if (seg.pauseMs) {
      await page.waitForTimeout(seg.pauseMs);
    }
  }
}

async function captureRecording(url, outputFile, { cookies, segments, initialWait = 2000, waitUntil = 'networkidle' }) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: VIEWPORT,
    recordVideo: {
      dir: OUTPUT_DIR,
      size: VIEWPORT,
    },
    deviceScaleFactor: 2,
  });

  // Pre-set cookies (ex: masquer la banniere welcome)
  if (cookies?.length) {
    await context.addCookies(cookies);
  }

  const page = await context.newPage();

  console.log(`Navigating to ${url}...`);
  await page.goto(url, { waitUntil, timeout: 30000 });

  // Attendre le rendu visuel complet (fonts, images, animations)
  await page.waitForTimeout(initialWait);

  // Scroll segmente avec pauses
  console.log('Scrolling with pauses...');
  await segmentedScroll(page, segments);

  // Pause finale
  await page.waitForTimeout(800);

  await context.close();
  await browser.close();

  // Renommer le fichier video genere
  const fs = await import('fs');
  const files = fs.readdirSync(OUTPUT_DIR)
    .filter((f) => f.endsWith('.webm'))
    .sort((a, b) => {
      const statA = fs.statSync(path.join(OUTPUT_DIR, a));
      const statB = fs.statSync(path.join(OUTPUT_DIR, b));
      return statB.mtimeMs - statA.mtimeMs;
    });

  if (files.length > 0) {
    const latestFile = files[0];
    const src = path.join(OUTPUT_DIR, latestFile);
    const dest = path.join(OUTPUT_DIR, outputFile);
    fs.renameSync(src, dest);
    console.log(`Saved: ${dest}`);
  }
}

async function main() {
  // ===== AVANT : futureofgrow.com (site Webflow actuel) =====
  console.log('=== Capture FOG Avant ===');
  await captureRecording('https://www.futureofgrow.com', 'fog-avant.webm', {
    cookies: [
      {
        name: 'fog_welcome_dismissed',
        value: 'true',
        domain: 'www.futureofgrow.com',
        path: '/',
        sameSite: 'Lax',
      },
    ],
    initialWait: 2500,
    segments: [
      { distance: 400, pauseMs: 2000 },  // Hero visible, pause pour apprecier
      { distance: 600, pauseMs: 1500 },  // Section suivante
      { distance: 800, pauseMs: 1500 },  // Scroll vers le bas
      { distance: 700, pauseMs: 1000 },  // Fin de page
    ],
  });

  // ===== APRES : Shopify redesign (serveur local) =====
  console.log('\n=== Capture FOG Apres ===');
  await captureRecording('http://127.0.0.1:9292', 'fog-apres.webm', {
    cookies: [],
    waitUntil: 'domcontentloaded',
    initialWait: 3000,
    segments: [
      { distance: 300, pauseMs: 2000 },  // Hero Shopify, pause longue
      { distance: 500, pauseMs: 1800 },  // Value proposition / KPIs
      { distance: 600, pauseMs: 1500 },  // Calculateur ROI
      { distance: 800, pauseMs: 1200 },  // Sections suivantes
      { distance: 800, pauseMs: 1000 },  // Fin
    ],
  });

  console.log('\nDone! Recordings saved in public/recordings/');
}

main().catch(console.error);
