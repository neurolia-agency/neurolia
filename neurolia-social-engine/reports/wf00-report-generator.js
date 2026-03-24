// === WF00 — Generer Rapport Onboarding ===
// Ce code va dans le Code node "Generer Rapport Onboarding" (cd22b)
// Position dans le flux : Preparer Reponse → [CE NOEUD] → Journal Execution

const httpRequest = this.helpers.httpRequest;
const SB = 'https://abbtnownnraylaylswqk.supabase.co';
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiYnRub3dubnJheWxheWxzd3FrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3OTM0MTYsImV4cCI6MjA4ODM2OTQxNn0.OkRpMcaNgZDGSDLOxWP32F50iOZa3mhcRxSMH-5UlaM';

const clientId = $('UPSERT Client').first().json.client_id;
const client = $('Extraire Donnees Client').first().json.client;
const resp = $('Preparer Reponse').first().json;

const hdrs = { apikey: KEY, Authorization: `Bearer ${KEY}` };
const brand = ((await httpRequest({ url: `${SB}/rest/v1/brand_platforms?client_id=eq.${clientId}&select=*`, headers: hdrs })) || [])[0] || {};
const strategy = ((await httpRequest({ url: `${SB}/rest/v1/content_strategy?client_id=eq.${clientId}&select=*`, headers: hdrs })) || [])[0] || {};
const assetsList = (await httpRequest({ url: `${SB}/rest/v1/brand_assets?client_id=eq.${clientId}&select=*`, headers: hdrs })) || [];

// === Helpers ===
const esc = s => String(s || '\u2014').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const j = v => (v && typeof v === 'object') ? JSON.stringify(v) : String(v || '');
const COLORS = ['#C45C3B', '#0FB8C4', '#8B5CF6', '#10B981', '#F59E0B'];
const reportDate = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });

// Derived data
const pillars = Array.isArray(strategy.pillars) ? strategy.pillars : [];
const periods = Array.isArray(strategy.periods) ? strategy.periods : [];
const brandValues = Array.isArray(brand.brand_values) ? brand.brand_values : [];
const usps = Array.isArray(brand.usps) ? brand.usps : [];
const vocDo = Array.isArray(brand.vocabulary_do) ? brand.vocabulary_do : [];
const vocDont = Array.isArray(brand.vocabulary_dont) ? brand.vocabulary_dont : [];
const hashBrand = Array.isArray(brand.hashtags_brand) ? brand.hashtags_brand : [];
const hashNiche = Array.isArray(brand.hashtags_niche) ? brand.hashtags_niche : [];
const ctaFav = Array.isArray(brand.ctas_favorites) ? brand.ctas_favorites : [];
const bColors = brand.colors || {};
const bFonts = brand.fonts || {};

const brandKeys = Object.keys(brand).filter(k => !['id', 'client_id', 'created_at', 'updated_at', 'platform'].includes(k));
const filledCount = brandKeys.filter(k => { const v = brand[k]; return v !== null && v !== undefined && v !== '' && !(Array.isArray(v) && v.length === 0); }).length;

// === Checks ===
const checks = [];
const warnings = [];
if (client.name) checks.push('Nom client renseigne');
else warnings.push({ label: 'Nom client manquant', detail: 'Le champ client_name est vide dans le manifeste.' });
if (filledCount >= 20) checks.push(`Brand platform : ${filledCount}/${brandKeys.length} champs remplis`);
else warnings.push({ label: `Brand platform incomplet : ${filledCount}/${brandKeys.length} champs`, detail: 'Certains fichiers brand sont peut-etre manquants ou incomplets.' });
if (pillars.length >= 3) checks.push(`${pillars.length} piliers editoriaux detectes`);
else warnings.push({ label: `Seulement ${pillars.length} pilier(s) detecte(s)`, detail: 'Le fichier strategie devrait definir au moins 3 piliers.' });
if (periods.length >= 1) checks.push(`${periods.length} periode(s) detectee(s)`);
else warnings.push({ label: 'Aucune periode detectee', detail: 'Le fichier strategie ne contient pas de periodes definies.' });
if (assetsList.length >= 1) checks.push(`${assetsList.length} asset(s) importe(s)`);
else warnings.push({ label: 'Aucun asset importe', detail: 'Le logo ou les photos de contexte n\'ont pas ete detectes.' });
if (strategy.weekly_calendar) checks.push('Calendrier hebdomadaire extrait');
if (strategy.stories_guidelines) checks.push('Guidelines stories extraites');
if (strategy.caption_rules) checks.push('Regles de caption extraites');

// === HTML Builders ===
function card(label, title, desc, accent) {
  return `<div style="background:#111827;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:28px 24px;text-align:left;position:relative;overflow:hidden;">
    <div style="position:absolute;top:0;left:0;right:0;height:3px;background:${accent};"></div>
    <p style="font-family:'Satoshi',sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${accent};margin-bottom:4px;">${esc(label)}</p>
    <p style="font-family:'Satoshi',sans-serif;font-size:18px;font-weight:900;color:#F5F5F5;margin-bottom:6px;">${esc(title)}</p>
    <p style="font-size:14px;color:#A3A3A3;line-height:1.6;">${esc(desc)}</p>
  </div>`;
}

function kpi(tag, value, label, color) {
  return `<div style="background:#111827;border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:20px;text-align:center;">
    <div style="font-family:'Satoshi',sans-serif;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${color};opacity:0.6;margin-bottom:6px;">${esc(tag)}</div>
    <div style="font-family:'Satoshi',sans-serif;font-size:22px;font-weight:900;color:${color};margin-bottom:4px;">${esc(value)}</div>
    <div style="font-size:12px;color:#737373;">${esc(label)}</div>
  </div>`;
}

function sectionTitle(text, color) {
  return `<h3 style="font-family:'Satoshi',sans-serif;font-weight:700;font-size:20px;color:#F5F5F5;margin-bottom:20px;padding-left:16px;border-left:3px solid ${color};">${esc(text)}</h3>`;
}

function dataRow(field, value) {
  return `<tr><td style="font-family:'Satoshi',sans-serif;font-weight:600;color:#D4D4D4;padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.08);width:200px;">${esc(field)}</td><td style="font-size:14px;color:#A3A3A3;padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.08);">${value}</td></tr>`;
}

function stepCard(title, content, badge) {
  const badgeHtml = badge ? `<span style="font-family:'Satoshi',sans-serif;font-size:11px;font-weight:600;color:#737373;background:#1A1F2E;padding:4px 10px;border-radius:5px;">${esc(badge)}</span>` : '';
  return `<div style="background:#111827;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:28px;">
    <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:12px;gap:12px;">
      <span style="font-family:'Satoshi',sans-serif;font-size:17px;font-weight:700;color:#F5F5F5;flex:1;">${esc(title)}</span>${badgeHtml}
    </div>${content}</div>`;
}

function tag(text, color) {
  return `<span style="font-family:'Satoshi',sans-serif;font-size:11px;font-weight:600;padding:3px 10px;border-radius:999px;background:${color}25;color:${color};display:inline-block;margin:2px;">${esc(text)}</span>`;
}

function checkRow(label, status, detail) {
  const isOk = status === 'ok';
  const dotColor = isOk ? '#10B981' : '#F59E0B';
  const tagColor = isOk ? '#10B981' : '#F59E0B';
  const tagText = isOk ? 'OK' : 'A verifier';
  let html = `<div style="background:#111827;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:16px 24px;margin-bottom:8px;">
    <div style="display:flex;align-items:center;gap:12px;">
      <span style="width:8px;height:8px;border-radius:50%;background:${dotColor};display:inline-block;"></span>
      <span style="font-size:14px;color:#D4D4D4;flex:1;">${esc(label)}</span>
      ${tag(tagText, tagColor)}
    </div>`;
  if (detail) html += `<p style="font-size:13px;color:#737373;margin-top:8px;padding-left:20px;">${esc(detail)}</p>`;
  html += '</div>';
  return html;
}

// === Color palette rendering ===
const colorEntries = Object.entries(bColors).filter(([k, v]) => v);
const colorHtml = colorEntries.length > 0
  ? colorEntries.map(([name, hex]) => `<div style="display:flex;align-items:center;gap:8px;"><div style="width:32px;height:32px;border-radius:6px;background:${esc(hex)};border:1px solid rgba(255,255,255,0.08);"></div><div><div style="font-size:12px;color:#F5F5F5;font-weight:600;">${esc(name)}</div><div style="font-size:11px;color:#737373;">${esc(hex)}</div></div></div>`).join('')
  : '<p style="color:#737373;font-size:13px;">Non renseigne</p>';

// === Weekly calendar ===
const weekCal = strategy.weekly_calendar || {};
const weekCalRows = Object.entries(weekCal).map(([day, info]) => {
  const pillar = typeof info === 'string' ? info : (info.pilier || info.pillar || info.pilier_name || j(info));
  const format = typeof info === 'object' ? (info.format || info.format_privilegie || '') : '';
  return dataRow(day, `${esc(pillar)}${format ? ' — ' + esc(format) : ''}`);
}).join('');

// === Build Complete HTML ===
const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Rapport Onboarding \u2014 ${esc(client.name)}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@500,700,900&display=swap">
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;font-size:15px;line-height:1.7;color:#D4D4D4;background:#050810;-webkit-font-smoothing:antialiased}
h1,h2,h3,h4{font-family:'Satoshi',sans-serif;color:#F5F5F5;line-height:1.2}
a{color:inherit;text-decoration:none}
.ctn{max-width:1200px;margin:0 auto;padding:0 24px}
.sec{padding:80px 0}
.sec-e{background:#0A0F1A;border-top:1px solid rgba(255,255,255,0.08);border-bottom:1px solid rgba(255,255,255,0.08)}
.grid2{display:grid;grid-template-columns:repeat(2,1fr);gap:20px}
.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
@media(max-width:768px){.grid2,.grid3,.grid4{grid-template-columns:1fr}}
</style>
</head>
<body>

<!-- HERO -->
<section style="padding:120px 0 60px;text-align:center;position:relative;overflow:hidden;">
<div style="position:absolute;top:-200px;left:50%;transform:translateX(-50%);width:800px;height:800px;background:radial-gradient(circle,rgba(196,92,59,0.08) 0%,transparent 70%);pointer-events:none;"></div>
<div class="ctn">
  <p style="font-family:'Satoshi',sans-serif;font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#C45C3B;margin-bottom:20px;">WF00 \u2014 Rapport d'Onboarding</p>
  <h1 style="font-size:clamp(32px,5vw,56px);font-weight:900;margin-bottom:16px;background:linear-gradient(135deg,#F5F5F5 0%,#A3A3A3 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">${esc(client.name)}</h1>
  <p style="font-size:clamp(16px,2vw,20px);color:#A3A3A3;max-width:600px;margin:0 auto 48px;line-height:1.6;">Voici ce que le Social Engine a compris de vos fichiers brand et strategie.</p>
  <div class="grid4" style="max-width:1100px;margin:0 auto;">
    ${card('Client', client.name, client.industry || 'Secteur non renseigne', COLORS[0])}
    ${card('Brand Platform', filledCount + ' champs', 'Parses via GPT-4o', COLORS[1])}
    ${card('Strategie', pillars.length + ' piliers', periods.length + ' periode(s)', COLORS[2])}
    ${card('Assets', assetsList.length + ' fichier(s)', 'Logo + contexte + contenu', COLORS[3])}
  </div>
</div>
</section>

<!-- IDENTITE CLIENT -->
<section class="sec sec-e"><div class="ctn">
  <div style="text-align:center;margin-bottom:48px;">
    <h2 style="font-size:clamp(24px,3.5vw,36px);font-weight:900;margin-bottom:8px;">Identite Client</h2>
    <p style="color:#A3A3A3;font-size:16px;">Table <code style="background:#1A1F2E;padding:2px 6px;border-radius:4px;font-size:13px;">clients</code></p>
  </div>
  <div style="max-width:700px;margin:0 auto;">
    <table style="width:100%;border-collapse:collapse;">
      ${dataRow('Nom', esc(client.name))}
      ${dataRow('Slug', '<code style="background:#1A1F2E;padding:2px 6px;border-radius:4px;">' + esc(client.slug) + '</code>')}
      ${dataRow('Secteur', esc(client.industry))}
      ${dataRow('Site web', client.website_url ? '<a href="' + esc(client.website_url) + '" style="color:#0FB8C4;">' + esc(client.website_url) + '</a>' : '\u2014')}
      ${dataRow('Instagram', esc(client.instagram_handle))}
      ${dataRow('Facebook', esc(client.facebook_page_url))}
      ${dataRow('Drive Folder', client.drive_folder_id ? '<code style="background:#1A1F2E;padding:2px 6px;border-radius:4px;font-size:12px;">' + esc(client.drive_folder_id) + '</code>' : '\u2014')}
    </table>
  </div>
</div></section>

<!-- MARQUE -->
<section class="sec"><div class="ctn">
  <div style="display:flex;align-items:flex-start;gap:20px;margin-bottom:48px;">
    <div style="font-family:'Satoshi',sans-serif;font-size:48px;font-weight:900;color:#0FB8C4;line-height:1;">01</div>
    <div>
      <h2 style="font-size:clamp(24px,3.5vw,36px);font-weight:900;margin-bottom:12px;">Plateforme de Marque</h2>
      <p style="font-size:16px;color:#A3A3A3;max-width:700px;line-height:1.65;">${filledCount} champs extraits des fichiers brand via GPT-4o.</p>
    </div>
  </div>

  ${sectionTitle('Fondation & Identite', COLORS[1])}
  <div class="grid2" style="margin-bottom:40px;">
    ${stepCard('Mission', '<p style="font-size:14px;color:#A3A3A3;line-height:1.7;">' + esc(brand.mission) + '</p>')}
    ${stepCard('Vision', '<p style="font-size:14px;color:#A3A3A3;line-height:1.7;">' + esc(brand.vision) + '</p>')}
    ${stepCard('Personnalite', '<p style="font-size:14px;color:#A3A3A3;line-height:1.7;">' + esc(brand.personality) + '</p>', brand.archetype?.principal || null)}
    ${stepCard('Archetype', '<p style="font-size:14px;color:#A3A3A3;line-height:1.7;">Principal : ' + esc(brand.archetype?.principal) + '<br>Secondaire : ' + esc(brand.archetype?.secondaire) + '</p>')}
  </div>

  ${brandValues.length > 0 ? sectionTitle('Valeurs de Marque', COLORS[1]) + '<div class="grid2" style="margin-bottom:40px;">' + brandValues.map(v => stepCard(typeof v === 'string' ? v : (v.name || v.nom || '?'), '<ul style="list-style:none;">' + (v.implique ? '<li style="font-size:14px;color:#A3A3A3;padding:4px 0;">Implique : ' + esc(v.implique) + '</li>' : '') + (v.exclut ? '<li style="font-size:14px;color:#A3A3A3;padding:4px 0;">Exclut : ' + esc(v.exclut) + '</li>' : '') + (v.definition ? '<li style="font-size:14px;color:#A3A3A3;padding:4px 0;">' + esc(v.definition) + '</li>' : '') + '</ul>')).join('') + '</div>' : ''}

  ${sectionTitle('Positionnement', COLORS[1])}
  <div style="background:#111827;border-radius:12px;padding:24px 28px;margin-bottom:40px;border-left:3px solid #0FB8C4;">
    <p style="font-size:14.5px;line-height:1.7;color:#A3A3A3;"><strong style="color:#F5F5F5;">Promesse :</strong> ${esc(brand.brand_promise)}</p>
    <p style="font-size:14.5px;line-height:1.7;color:#A3A3A3;margin-top:8px;"><strong style="color:#F5F5F5;">Insight cle :</strong> ${esc(brand.key_insight)}</p>
    <p style="font-size:14.5px;line-height:1.7;color:#A3A3A3;margin-top:8px;"><strong style="color:#F5F5F5;">Differenciateur :</strong> ${esc(brand.brand_essence || brand.discriminator)}</p>
    ${brand.tagline ? '<div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:16px;">' + tag(brand.tagline, '#0FB8C4') + (brand.baseline ? tag(brand.baseline, '#0FB8C4') : '') + '</div>' : ''}
  </div>
  ${usps.length > 0 ? '<div style="background:#111827;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:28px;margin-bottom:40px;"><p style="font-family:\'Satoshi\',sans-serif;font-size:17px;font-weight:700;color:#F5F5F5;margin-bottom:16px;">USPs</p><ul style="list-style:none;">' + usps.map(u => '<li style="font-size:14px;color:#A3A3A3;padding:6px 0;padding-left:20px;position:relative;"><span style="position:absolute;left:0;top:12px;width:8px;height:8px;border-radius:2px;background:#0FB8C4;opacity:0.5;"></span>' + esc(typeof u === 'string' ? u : (u.title || u.description || j(u))) + '</li>').join('') + '</ul></div>' : ''}

  ${sectionTitle('Voix & Ton', COLORS[1])}
  <div class="grid4" style="margin-bottom:24px;">
    ${kpi('Ton', brand.tone_of_voice || '?', '', '#0FB8C4')}
    ${kpi('Registre', brand.tu_vous || '?', '', '#0FB8C4')}
    ${kpi('Formalite', (brand.formality_level || '?') + '/5', '', '#0FB8C4')}
    ${kpi('Emojis', brand.emoji_usage || '?', '', '#0FB8C4')}
  </div>
  <div class="grid2" style="margin-bottom:40px;">
    ${stepCard('Vocabulaire recommande ' + tag('DO', '#10B981'), '<ul style="list-style:none;">' + vocDo.map(w => '<li style="font-size:14px;color:#A3A3A3;padding:3px 0;">• ' + esc(w) + '</li>').join('') + '</ul>')}
    ${stepCard('Vocabulaire interdit ' + tag("DON'T", '#EF4444'), '<ul style="list-style:none;">' + vocDont.map(w => '<li style="font-size:14px;color:#A3A3A3;padding:3px 0;">• ' + esc(w) + '</li>').join('') + '</ul>')}
  </div>

  ${sectionTitle('Identite Visuelle', COLORS[1])}
  <div class="grid2" style="margin-bottom:40px;">
    ${stepCard('Palette', '<div style="display:flex;gap:12px;flex-wrap:wrap;">' + colorHtml + '</div>')}
    ${stepCard('Typographies', '<div style="margin-bottom:12px;"><span style="font-size:11px;color:#737373;text-transform:uppercase;letter-spacing:1px;">Display</span><p style="font-size:20px;color:#F5F5F5;font-weight:700;margin-top:4px;">' + esc(bFonts.primary || brand.font_primary || '?') + '</p></div><div><span style="font-size:11px;color:#737373;text-transform:uppercase;letter-spacing:1px;">Body</span><p style="font-size:20px;color:#F5F5F5;font-weight:700;margin-top:4px;">' + esc(bFonts.secondary || brand.font_secondary || '?') + '</p></div>')}
    ${stepCard('Style visuel', '<p style="font-size:14px;color:#A3A3A3;line-height:1.7;">' + esc(brand.visual_style) + '</p>')}
    ${stepCard('Style photo', '<p style="font-size:14px;color:#A3A3A3;line-height:1.7;">' + esc(brand.photo_style) + '</p>')}
  </div>

  ${sectionTitle('Configuration Social', COLORS[1])}
  <div class="grid2" style="margin-bottom:40px;">
    ${stepCard('Hashtags branded', '<div style="display:flex;flex-wrap:wrap;gap:6px;">' + hashBrand.map(h => tag(h, '#C45C3B')).join('') + (hashBrand.length === 0 ? '<span style="color:#737373;font-size:13px;">Aucun</span>' : '') + '</div>')}
    ${stepCard('Hashtags niche', '<div style="display:flex;flex-wrap:wrap;gap:6px;">' + hashNiche.map(h => tag(h, '#0FB8C4')).join('') + (hashNiche.length === 0 ? '<span style="color:#737373;font-size:13px;">Aucun</span>' : '') + '</div>')}
  </div>
  ${ctaFav.length > 0 ? stepCard('CTA preferes', '<div style="display:flex;flex-wrap:wrap;gap:8px;">' + ctaFav.map(c => '<span style="font-family:\'Satoshi\',sans-serif;font-size:12px;font-weight:600;color:#737373;background:#1A1F2E;padding:6px 14px;border-radius:6px;border:1px solid rgba(255,255,255,0.08);">' + esc(c) + '</span>').join('') + '</div>') : ''}
</div></section>

<!-- STRATEGIE -->
<section class="sec sec-e"><div class="ctn">
  <div style="display:flex;align-items:flex-start;gap:20px;margin-bottom:48px;">
    <div style="font-family:'Satoshi',sans-serif;font-size:48px;font-weight:900;color:#8B5CF6;line-height:1;">02</div>
    <div>
      <h2 style="font-size:clamp(24px,3.5vw,36px);font-weight:900;margin-bottom:12px;">Strategie de Contenu</h2>
      <p style="font-size:16px;color:#A3A3A3;max-width:700px;line-height:1.65;">Structure editoriale extraite du fichier strategie.</p>
    </div>
  </div>

  ${pillars.length > 0 ? sectionTitle('Piliers editoriaux', COLORS[2]) + '<div style="display:flex;height:40px;border-radius:8px;overflow:hidden;margin-bottom:12px;">' + pillars.map((p, i) => '<div style="flex:' + (p.percentage || 20) + ';background:' + COLORS[i % COLORS.length] + ';display:flex;align-items:center;justify-content:center;font-family:\'Satoshi\',sans-serif;font-size:11px;font-weight:700;color:rgba(255,255,255,0.9);">' + (p.percentage || '?') + '%</div>').join('') + '</div><div style="display:flex;flex-wrap:wrap;gap:16px 32px;margin-bottom:40px;">' + pillars.map((p, i) => '<div style="display:flex;align-items:center;gap:8px;font-size:13px;color:#A3A3A3;"><div style="width:10px;height:10px;border-radius:3px;background:' + COLORS[i % COLORS.length] + ';"></div>' + esc(p.name) + ' (' + (p.percentage || '?') + '% \u00B7 ~' + (p.posts_per_month || '?') + ' posts/mois)</div>').join('') + '</div>' + '<div class="grid2" style="margin-bottom:40px;">' + pillars.map((p, i) => stepCard(p.name || '?', '<p style="font-size:13px;color:#737373;margin-bottom:12px;">' + esc(p.subtitle || p.function || '') + '</p>' + (Array.isArray(p.content_types) ? '<ul style="list-style:none;">' + p.content_types.map(ct => '<li style="font-size:14px;color:#A3A3A3;padding:3px 0;padding-left:20px;position:relative;"><span style="position:absolute;left:0;top:11px;width:8px;height:8px;border-radius:2px;background:' + COLORS[i % COLORS.length] + ';opacity:0.5;"></span>' + esc(ct) + '</li>').join('') + '</ul>' : ''), (p.percentage || '?') + '%')).join('') + '</div>' : '<p style="color:#737373;">Aucun pilier detecte.</p>'}

  ${periods.length > 0 ? sectionTitle('Periodes', COLORS[2]) + '<div class="grid3" style="margin-bottom:40px;">' + periods.map((p, i) => card('Periode ' + (p.number || i + 1), p.name || '?', p.mission || p.duration || '', COLORS[i % COLORS.length])).join('') + '</div>' : ''}

  ${Object.keys(weekCal).length > 0 ? sectionTitle('Calendrier semaine type', COLORS[2]) + '<div style="max-width:800px;margin-bottom:40px;"><table style="width:100%;border-collapse:collapse;">' + weekCalRows + '</table></div>' : ''}

  ${strategy.stories_guidelines ? sectionTitle('Guidelines', COLORS[2]) + '<div class="grid2" style="margin-bottom:40px;">' + stepCard('Stories', '<p style="font-size:14px;color:#A3A3A3;line-height:1.7;">' + esc(j(strategy.stories_guidelines)) + '</p>') + (strategy.caption_rules ? stepCard('Captions', '<p style="font-size:14px;color:#A3A3A3;line-height:1.7;">' + esc(j(strategy.caption_rules)) + '</p>') : '') + '</div>' : ''}
</div></section>

<!-- ASSETS -->
<section class="sec"><div class="ctn">
  <div style="display:flex;align-items:flex-start;gap:20px;margin-bottom:48px;">
    <div style="font-family:'Satoshi',sans-serif;font-size:48px;font-weight:900;color:#10B981;line-height:1;">03</div>
    <div>
      <h2 style="font-size:clamp(24px,3.5vw,36px);font-weight:900;margin-bottom:12px;">Assets Detectes</h2>
      <p style="font-size:16px;color:#A3A3A3;">Fichiers importes dans <code style="background:#1A1F2E;padding:2px 6px;border-radius:4px;font-size:13px;">brand_assets</code>.</p>
    </div>
  </div>
  <div class="grid3" style="margin-bottom:40px;">
    ${kpi('Logo', assetsList.filter(a => a.type === 'logo').length.toString(), 'fichier(s)', '#10B981')}
    ${kpi('Photos contexte', assetsList.filter(a => ['background', 'photo_style', 'context'].includes(a.type)).length.toString(), 'backgrounds / style', '#10B981')}
    ${kpi('Total', assetsList.length.toString(), 'asset(s) importes', '#10B981')}
  </div>
  ${assetsList.length > 0 ? '<table style="width:100%;border-collapse:collapse;">' + assetsList.map(a => dataRow(a.name || '?', tag(a.type || '?', '#0FB8C4') + ' <span style="color:#737373;margin-left:8px;">' + esc(a.file_path || '') + '</span>')).join('') + '</table>' : '<p style="color:#737373;">Aucun asset detecte.</p>'}
</div></section>

<!-- VERIFICATION -->
<section class="sec sec-e"><div class="ctn">
  <div style="display:flex;align-items:flex-start;gap:20px;margin-bottom:48px;">
    <div style="font-family:'Satoshi',sans-serif;font-size:48px;font-weight:900;color:#F59E0B;line-height:1;">04</div>
    <div>
      <h2 style="font-size:clamp(24px,3.5vw,36px);font-weight:900;margin-bottom:12px;">Verification</h2>
      <p style="font-size:16px;color:#A3A3A3;">Controle de coherence et anomalies detectees.</p>
    </div>
  </div>
  ${sectionTitle('Controles passes', '#F59E0B')}
  ${checks.map(c => checkRow(c, 'ok')).join('')}
  ${warnings.length > 0 ? '<div style="margin-top:32px;">' + sectionTitle('Avertissements', '#F59E0B') + warnings.map(w => checkRow(w.label, 'warning', w.detail)).join('') + '</div>' : ''}
  <div style="background:#111827;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:24px 28px;margin-top:40px;">
    <p style="font-family:'Satoshi',sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;color:#737373;text-transform:uppercase;margin-bottom:10px;">Bilan Onboarding</p>
    <h4 style="font-family:'Satoshi',sans-serif;font-weight:700;font-size:16px;color:#F5F5F5;margin-bottom:8px;">${warnings.length === 0 ? 'Onboarding complet — pret pour WF01' : 'Onboarding termine avec ' + warnings.length + ' avertissement(s)'}</h4>
    <p style="font-size:14px;color:#A3A3A3;line-height:1.7;font-style:italic;">${filledCount} champs brand, ${pillars.length} piliers, ${periods.length} periode(s), ${assetsList.length} asset(s). ${warnings.length === 0 ? 'Toutes les donnees sont presentes pour lancer la generation de strategie editoriale.' : 'Verifiez les avertissements ci-dessus avant de lancer WF01.'}</p>
  </div>
</div></section>

<!-- FOOTER -->
<footer style="padding:48px 0;text-align:center;border-top:1px solid rgba(255,255,255,0.08);">
<div class="ctn">
  <p style="font-family:'Satoshi',sans-serif;font-size:15px;font-weight:700;color:#F5F5F5;margin-bottom:4px;">Neurolia Social Engine</p>
  <p style="font-size:14px;color:#737373;font-style:italic;margin-bottom:12px;">Rapport WF00 \u2014 Onboarding ${esc(client.name)}</p>
  <p style="font-size:12px;color:#737373;">${reportDate} \u00B7 Confidentiel</p>
</div>
</footer>

</body></html>`;

return [{ json: { ...resp, report_html: html } }];
