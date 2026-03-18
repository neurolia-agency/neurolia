/**
 * Capture Dashboard Screenshots
 *
 * Uses Playwright to capture screenshots of all 12 dashboard modules.
 * Output: public/screenshots/ (PNG, 1920x1080)
 *
 * Usage:
 *   npx tsx scripts/capture-screenshots.ts
 *   npx tsx scripts/capture-screenshots.ts --module=pipeline
 *
 * Prerequisites:
 *   - Dashboard running on localhost:3000
 *   - npm install playwright @playwright/test (in this project)
 */

import { chromium, type Page } from 'playwright';
import * as path from 'path';
import * as fs from 'fs';

const DASHBOARD_URL = process.env.DASHBOARD_URL || 'http://localhost:3000';
const OUTPUT_DIR = path.resolve(__dirname, '../public/screenshots');

// All dashboard modules with their routes
const MODULES = [
  { slug: 'home', route: '/dashboard', name: 'Home' },
  { slug: 'clients', route: '/dashboard/clients', name: 'Clients' },
  { slug: 'devis', route: '/dashboard/devis', name: 'Devis' },
  { slug: 'factures', route: '/dashboard/factures', name: 'Factures' },
  { slug: 'pipeline', route: '/dashboard/pipeline', name: 'Pipeline' },
  { slug: 'chantiers', route: '/dashboard/chantiers', name: 'Chantiers' },
  { slug: 'projets', route: '/dashboard/projets', name: 'Projets' },
  { slug: 'associes', route: '/dashboard/associes', name: 'Associes' },
  { slug: 'reunions', route: '/dashboard/reunions', name: 'Reunions' },
  { slug: 'finances', route: '/dashboard/finances', name: 'Finances' },
  { slug: 'temps', route: '/dashboard/temps', name: 'Temps' },
  { slug: 'objectifs', route: '/dashboard/objectifs', name: 'Objectifs' },
] as const;

async function captureModule(page: Page, module: typeof MODULES[number]) {
  const url = `${DASHBOARD_URL}${module.route}`;
  console.log(`📸 Capturing ${module.name}...`);

  await page.goto(url, { waitUntil: 'networkidle' });

  // Wait for content to load (skeletons to disappear)
  await page.waitForTimeout(2000);

  const outputPath = path.join(OUTPUT_DIR, `${module.slug}.png`);
  await page.screenshot({
    path: outputPath,
    fullPage: false, // Viewport only (1920x1080)
  });

  console.log(`  ✅ ${outputPath}`);
}

async function main() {
  // Parse CLI args
  const targetModule = process.argv.find(a => a.startsWith('--module='))?.split('=')[1];

  // Ensure output directory exists
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2, // Retina for crisp screenshots
    colorScheme: 'dark',
  });

  // Set auth cookie (dashboard uses cookie-based auth)
  await context.addCookies([{
    name: 'dashboard_password',
    value: process.env.DASHBOARD_PASSWORD || 'neurolia',
    domain: new URL(DASHBOARD_URL).hostname,
    path: '/',
  }]);

  const page = await context.newPage();

  const modulesToCapture = targetModule
    ? MODULES.filter(m => m.slug === targetModule)
    : MODULES;

  if (modulesToCapture.length === 0) {
    console.error(`Module "${targetModule}" not found. Available: ${MODULES.map(m => m.slug).join(', ')}`);
    process.exit(1);
  }

  console.log(`\n🎬 Capturing ${modulesToCapture.length} module(s)...\n`);

  for (const module of modulesToCapture) {
    await captureModule(page, module);
  }

  await browser.close();
  console.log(`\n✅ Done! Screenshots saved to ${OUTPUT_DIR}\n`);
}

main().catch(console.error);
