// === WF01 — Generer Rapport Editorial ===
// Ce code va dans le Code node "Generer Rapport Editorial" (cd22b)
// Position dans le flux : Preparer Reponse → [CE NOEUD] → Journal Execution

const campaign = $('Formater Inputs Campagne').first().json.body?.campaign || $('Formater Inputs Campagne').first().json.campaign || {};
const clientData = $('Charger Donnees Client').first().json;
const brandData = $('Charger Plateforme Marque').first().json;
const strategyNode = $('Detecter Periode Active').first().json;
const phasesNode = $('Valider Phases').first().json;
const postsNode = $('Valider Posts').first().json;
const calendarNode = $('Assembler Calendrier').first().json;
const resp = $('Preparer Reponse').first().json;

// === Derived data ===
const clientName = clientData.name || clientData.slug || campaign.name || '?';
const campaignName = campaign.name || resp.campaign_name || '?';
const objectives = campaign.objectives || {};
const strategy = strategyNode.strategy || {};
const activePeriod = strategyNode.active_period || {};
const stPillars = Array.isArray(strategy.pillars) ? strategy.pillars : [];
const campaignPhases = Array.isArray(phasesNode.campaign_phases) ? phasesNode.campaign_phases : [];
const strategySummary = phasesNode.strategy_summary || {};
const posts = Array.isArray(postsNode.posts) ? postsNode.posts : [];
const stories = Array.isArray(calendarNode.stories) ? calendarNode.stories : [];
const totalPosts = posts.length;
const totalStories = stories.length;
const totalSlots = totalPosts + totalStories;
const postsPerWeek = objectives.posts_per_week || Math.round(totalPosts / ((calendarNode.campaignDays || 30) / 7));
const storiesPerDay = objectives.stories_per_day || Math.round(totalStories / (calendarNode.campaignDays || 30));
const startDate = campaign.start_date || calendarNode.campaignStartDate || '?';
const endDate = campaign.end_date || calendarNode.campaignEndDate || '?';
const totalWeeks = Math.ceil((calendarNode.campaignDays || 30) / 7);

// === Helpers ===
const esc = s => String(s || '\u2014').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const j = v => (v && typeof v === 'object') ? JSON.stringify(v) : String(v || '');
const COLORS = ['#C45C3B', '#0FB8C4', '#8B5CF6', '#10B981', '#F59E0B'];
const reportDate = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });

// Helper: pillar color lookup
const pillarColorMap = {};
stPillars.forEach((p, i) => { pillarColorMap[(p.name || '').toLowerCase()] = COLORS[i % COLORS.length]; });
function pillarColor(name) { return pillarColorMap[(name || '').toLowerCase()] || '#737373'; }

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
function tagEl(text, color) {
  return `<span style="font-family:'Satoshi',sans-serif;font-size:11px;font-weight:600;padding:3px 10px;border-radius:999px;background:${color}25;color:${color};display:inline-block;margin:2px;">${esc(text)}</span>`;
}
function checkRow(label, status, detail) {
  const isOk = status === 'ok';
  const dotColor = isOk ? '#10B981' : '#F59E0B';
  const tagText = isOk ? 'OK' : 'Ecart';
  let html = `<div style="background:#111827;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:16px 24px;margin-bottom:8px;">
    <div style="display:flex;align-items:center;gap:12px;">
      <span style="width:8px;height:8px;border-radius:50%;background:${dotColor};display:inline-block;"></span>
      <span style="font-size:14px;color:#D4D4D4;flex:1;">${esc(label)}</span>
      ${tagEl(tagText, dotColor)}
    </div>`;
  if (detail) html += `<p style="font-size:13px;color:#737373;margin-top:8px;padding-left:20px;">${esc(detail)}</p>`;
  html += '</div>';
  return html;
}

// === Pillar Distribution Analysis ===
const pillarCounts = {};
posts.forEach(p => {
  const pName = p.pillar || p.category || '?';
  pillarCounts[pName] = (pillarCounts[pName] || 0) + 1;
});

function pillarBar(data, pillarsRef) {
  return `<div style="display:flex;height:40px;border-radius:8px;overflow:hidden;margin-bottom:12px;">` +
    pillarsRef.map((p, i) => {
      const pct = data[i] || 0;
      return `<div style="flex:${Math.max(pct, 5)};background:${COLORS[i % COLORS.length]};display:flex;align-items:center;justify-content:center;font-family:'Satoshi',sans-serif;font-size:11px;font-weight:700;color:rgba(255,255,255,0.9);">${pct}%</div>`;
    }).join('') + '</div>';
}

const stratPcts = stPillars.map(p => p.percentage || 0);
const actualPcts = stPillars.map(p => {
  const count = pillarCounts[(p.name || '').toLowerCase()] || pillarCounts[p.name] || 0;
  return totalPosts > 0 ? Math.round((count / totalPosts) * 100) : 0;
});

// Check pillar deviation
const maxDeviation = stPillars.reduce((max, p, i) => Math.max(max, Math.abs((stratPcts[i] || 0) - (actualPcts[i] || 0))), 0);
const distributionOk = maxDeviation <= 10;

// === Group posts by week ===
const weekMap = {};
posts.forEach(p => {
  const d = new Date(p.scheduled_date);
  const weekStart = new Date(d);
  weekStart.setDate(d.getDate() - d.getDay() + 1); // Monday
  const weekKey = weekStart.toISOString().split('T')[0];
  if (!weekMap[weekKey]) weekMap[weekKey] = { start: weekKey, posts: [] };
  weekMap[weekKey].posts.push(p);
});
const weeks = Object.values(weekMap).sort((a, b) => a.start.localeCompare(b.start));

// === Coherence checks ===
const coherenceChecks = [];
coherenceChecks.push({ label: `Distribution piliers conforme a la strategie (\u00B110%)`, ok: distributionOk, detail: distributionOk ? '' : `Deviation max : ${maxDeviation}%` });
const expectedPosts = postsPerWeek * totalWeeks;
coherenceChecks.push({ label: `Volume posts (${totalPosts} generes vs ~${expectedPosts} attendus)`, ok: Math.abs(totalPosts - expectedPosts) <= 4, detail: '' });
const expectedStories = storiesPerDay * (calendarNode.campaignDays || 30);
coherenceChecks.push({ label: `Volume stories (${totalStories} generees vs ~${expectedStories} attendues)`, ok: Math.abs(totalStories - expectedStories) <= totalStories * 0.2, detail: '' });

// Check no 3+ consecutive same category
let consecutiveOk = true;
for (let i = 2; i < posts.length; i++) {
  const cat = posts[i].category || posts[i].pillar;
  if (cat && cat === (posts[i-1].category || posts[i-1].pillar) && cat === (posts[i-2].category || posts[i-2].pillar)) {
    consecutiveOk = false;
    break;
  }
}
coherenceChecks.push({ label: 'Aucun theme repete 3 fois consecutives', ok: consecutiveOk, detail: consecutiveOk ? '' : 'Au moins 3 posts consecutifs dans le meme pilier/categorie.' });

// === Build HTML ===
const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Strategie Editoriale \u2014 ${esc(campaignName)}</title>
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
@media(max-width:768px){.grid2,.grid3{grid-template-columns:1fr}}
</style>
</head>
<body>

<!-- HERO -->
<section style="padding:120px 0 60px;text-align:center;position:relative;overflow:hidden;">
<div style="position:absolute;top:-200px;left:50%;transform:translateX(-50%);width:800px;height:800px;background:radial-gradient(circle,rgba(196,92,59,0.08) 0%,transparent 70%);pointer-events:none;"></div>
<div class="ctn">
  <p style="font-family:'Satoshi',sans-serif;font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#C45C3B;margin-bottom:20px;">WF01 \u2014 Strategie Editoriale</p>
  <h1 style="font-size:clamp(32px,5vw,56px);font-weight:900;margin-bottom:16px;background:linear-gradient(135deg,#F5F5F5 0%,#A3A3A3 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">${esc(campaignName)}</h1>
  <p style="font-size:clamp(16px,2vw,20px);color:#A3A3A3;max-width:600px;margin:0 auto 48px;line-height:1.6;">Calendrier editorial genere par 3 agents IA pour ${esc(clientName)}.</p>
  <div class="grid3" style="max-width:960px;margin:0 auto;">
    ${card('Periode active', activePeriod.name || campaignName, startDate + ' \u2192 ' + endDate, COLORS[0])}
    ${card('Volume', totalPosts + ' posts', postsPerWeek + '/semaine \u00B7 ' + totalWeeks + ' semaines', COLORS[1])}
    ${card('Stories', totalStories + ' stories', storiesPerDay + '/jour \u00B7 ' + (calendarNode.campaignDays || '?') + ' jours', COLORS[2])}
  </div>
</div>
</section>

<!-- VISION STRATEGIQUE -->
<section class="sec sec-e"><div class="ctn">
  <div style="display:flex;align-items:flex-start;gap:20px;margin-bottom:48px;">
    <div style="font-family:'Satoshi',sans-serif;font-size:48px;font-weight:900;color:#C45C3B;line-height:1;">01</div>
    <div>
      <h2 style="font-size:clamp(24px,3.5vw,36px);font-weight:900;margin-bottom:12px;">Vision Strategique</h2>
      <p style="font-size:16px;color:#A3A3A3;max-width:700px;line-height:1.65;">Sortie de l'Agent 1 Stratege. Phases, directives, distribution.</p>
      <div style="display:flex;flex-wrap:wrap;gap:16px;margin-top:20px;">
        <span style="font-family:'Satoshi',sans-serif;font-size:12px;font-weight:600;color:#737373;background:#1A1F2E;padding:6px 14px;border-radius:6px;border:1px solid rgba(255,255,255,0.08);">Agent Stratege \u00B7 GPT-4o \u00B7 temp 0.7</span>
      </div>
    </div>
  </div>

  <div style="background:#111827;border-radius:12px;padding:24px 28px;margin-bottom:40px;border-left:3px solid #C45C3B;">
    <p style="font-size:14.5px;line-height:1.7;color:#A3A3A3;"><strong style="color:#F5F5F5;">Resume strategique</strong></p>
    <p style="font-size:14.5px;line-height:1.7;color:#A3A3A3;margin-top:8px;">${esc(typeof strategySummary === 'string' ? strategySummary : (strategySummary.summary || strategySummary.resume || j(strategySummary)))}</p>
  </div>

  ${campaignPhases.length > 0 ? sectionTitle('Phases de campagne', COLORS[0]) + '<div class="grid2" style="margin-bottom:40px;">' + campaignPhases.map((p, i) => `<div style="background:#111827;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:28px;">
    <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:12px;gap:12px;">
      <span style="font-family:'Satoshi',sans-serif;font-size:13px;font-weight:700;width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;background:${COLORS[0]}30;color:${COLORS[0]};">${i + 1}</span>
      <span style="font-family:'Satoshi',sans-serif;font-size:17px;font-weight:700;color:#F5F5F5;flex:1;">${esc(p.name || '?')}</span>
      <span style="font-family:'Satoshi',sans-serif;font-size:11px;font-weight:600;color:#737373;background:#1A1F2E;padding:4px 10px;border-radius:5px;">${esc(p.start_date || '')} \u2192 ${esc(p.end_date || '')}</span>
    </div>
    <p style="font-size:14px;color:#A3A3A3;line-height:1.7;">${esc(p.directive || p.focus || p.description || '')}</p>
    ${p.posts_target ? '<div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:14px;margin-top:14px;"><p style="font-family:\'Satoshi\',sans-serif;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#737373;margin-bottom:4px;">Volume</p><p style="font-size:13px;color:#737373;">' + p.posts_target + ' posts</p></div>' : ''}
  </div>`).join('') + '</div>' : ''}

  ${activePeriod.kpis ? sectionTitle('KPIs cibles', COLORS[0]) + '<div class="grid3" style="margin-bottom:40px;">' + Object.entries(typeof activePeriod.kpis === 'object' ? activePeriod.kpis : {}).map(([k, v]) => kpi(k, String(v), '', COLORS[0])).join('') + '</div>' : ''}
</div></section>

<!-- DISTRIBUTION PILIERS -->
<section class="sec"><div class="ctn">
  <div style="display:flex;align-items:flex-start;gap:20px;margin-bottom:48px;">
    <div style="font-family:'Satoshi',sans-serif;font-size:48px;font-weight:900;color:#0FB8C4;line-height:1;">02</div>
    <div>
      <h2 style="font-size:clamp(24px,3.5vw,36px);font-weight:900;margin-bottom:12px;">Distribution des Piliers</h2>
      <p style="font-size:16px;color:#A3A3A3;">Repartition reelle vs. objectifs de la strategie.</p>
    </div>
  </div>

  ${sectionTitle('Strategie (objectif)', COLORS[1])}
  ${pillarBar(stratPcts, stPillars)}

  <div style="margin-top:32px;">
  ${sectionTitle('Genere (reel)', COLORS[1])}
  ${pillarBar(actualPcts, stPillars)}
  </div>

  <div style="display:flex;flex-wrap:wrap;gap:16px 32px;margin:24px 0 40px;">
    ${stPillars.map((p, i) => {
      const count = pillarCounts[(p.name || '').toLowerCase()] || pillarCounts[p.name] || 0;
      return `<div style="display:flex;align-items:center;gap:8px;font-size:13px;color:#A3A3A3;"><div style="width:10px;height:10px;border-radius:3px;background:${COLORS[i % COLORS.length]};"></div>${esc(p.name)} \u2014 cible ${stratPcts[i]}% / reel ${actualPcts[i]}% (${count} posts)</div>`;
    }).join('')}
  </div>

  <div style="background:#111827;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:24px 28px;">
    <p style="font-family:'Satoshi',sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;color:#737373;text-transform:uppercase;margin-bottom:10px;">Analyse deviation</p>
    <h4 style="font-family:'Satoshi',sans-serif;font-weight:700;font-size:16px;color:#F5F5F5;margin-bottom:8px;">${distributionOk ? 'Distribution conforme' : 'Ecart detecte'}</h4>
    <p style="font-size:14px;color:#A3A3A3;line-height:1.7;font-style:italic;">Deviation maximale : ${maxDeviation}%. ${distributionOk ? 'La distribution respecte les objectifs de la strategie (\u00B110%).' : 'Certains piliers s\u2019ecartent significativement des objectifs. Verifiez les choix de l\u2019Agent 2.'}</p>
  </div>
</div></section>

<!-- CALENDRIER POSTS -->
<section class="sec sec-e"><div class="ctn">
  <div style="display:flex;align-items:flex-start;gap:20px;margin-bottom:48px;">
    <div style="font-family:'Satoshi',sans-serif;font-size:48px;font-weight:900;color:#C45C3B;line-height:1;">03</div>
    <div>
      <h2 style="font-size:clamp(24px,3.5vw,36px);font-weight:900;margin-bottom:12px;">Calendrier Posts</h2>
      <p style="font-size:16px;color:#A3A3A3;">${totalPosts} posts planifies sur ${totalWeeks} semaines.</p>
    </div>
  </div>

  ${weeks.map((week, wi) => {
    const weekEnd = new Date(week.start);
    weekEnd.setDate(weekEnd.getDate() + 6);
    const dateRange = new Date(week.start).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }) + ' \u2192 ' + weekEnd.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
    return `<div style="margin-bottom:40px;">
      <h3 style="font-family:'Satoshi',sans-serif;font-weight:700;font-size:16px;color:#F5F5F5;margin-bottom:16px;display:flex;align-items:center;gap:12px;">
        <span style="color:#737373;font-size:13px;font-weight:600;background:#1A1F2E;padding:4px 12px;border-radius:5px;">S${wi + 1}</span>
        ${dateRange}
      </h3>
      <div class="grid2">
        ${week.posts.map(p => {
          const pColor = pillarColor(p.pillar || p.category);
          const dayName = p.scheduled_date ? new Date(p.scheduled_date).toLocaleDateString('fr-FR', { weekday: 'short' }) : '?';
          return `<div style="background:#111827;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:24px;">
            <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:12px;gap:8px;">
              <span style="font-family:'Satoshi',sans-serif;font-size:11px;font-weight:700;padding:4px 8px;border-radius:5px;background:${pColor}20;color:${pColor};">${esc(dayName)}</span>
              <span style="font-family:'Satoshi',sans-serif;font-size:15px;font-weight:700;color:#F5F5F5;flex:1;">${esc(p.theme || p.angle || '?')}</span>
              <span style="font-family:'Satoshi',sans-serif;font-size:11px;font-weight:600;color:#737373;background:#1A1F2E;padding:4px 10px;border-radius:5px;">${esc(p.pillar || p.category || '?')}</span>
            </div>
            <table style="width:100%;border-collapse:collapse;font-size:13px;">
              <tr><td style="width:120px;padding:6px 0;color:#737373;">Angle</td><td style="padding:6px 0;color:#A3A3A3;">${esc(p.angle || p.theme)}</td></tr>
              <tr><td style="padding:6px 0;color:#737373;">Ton</td><td style="padding:6px 0;color:#A3A3A3;">${esc(p.tone || p.ton)}</td></tr>
              <tr><td style="padding:6px 0;color:#737373;">Style caption</td><td style="padding:6px 0;color:#A3A3A3;">${esc(p.caption_style)}</td></tr>
              <tr><td style="padding:6px 0;color:#737373;">Direction visuelle</td><td style="padding:6px 0;color:#A3A3A3;">${esc(p.visual_direction)}</td></tr>
              ${p.compositing_context ? '<tr><td style="padding:6px 0;color:#737373;">Compositing</td><td style="padding:6px 0;">' + tagEl(p.compositing_context, '#8B5CF6') + '</td></tr>' : ''}
            </table>
          </div>`;
        }).join('')}
      </div>
    </div>`;
  }).join('')}
</div></section>

<!-- STORIES RESUME -->
<section class="sec"><div class="ctn">
  <div style="display:flex;align-items:flex-start;gap:20px;margin-bottom:48px;">
    <div style="font-family:'Satoshi',sans-serif;font-size:48px;font-weight:900;color:#8B5CF6;line-height:1;">04</div>
    <div>
      <h2 style="font-size:clamp(24px,3.5vw,36px);font-weight:900;margin-bottom:12px;">Stories</h2>
      <p style="font-size:16px;color:#A3A3A3;">${totalStories} stories planifiees via l'Agent 3.</p>
    </div>
  </div>

  <div class="grid3" style="margin-bottom:40px;">
    ${kpi('Total', totalStories.toString(), 'stories generees', '#8B5CF6')}
    ${kpi('Par jour', storiesPerDay.toString(), 'stories / jour', '#8B5CF6')}
    ${kpi('Duree', (calendarNode.campaignDays || '?').toString() + 'j', 'de campagne', '#8B5CF6')}
  </div>

  <div style="background:#111827;border-radius:12px;padding:24px 28px;border-left:3px solid #8B5CF6;">
    <p style="font-size:14.5px;line-height:1.7;color:#A3A3A3;">Les stories sont generees par phase via l'Agent 3 Planificateur Stories (temp 0.8, 14k tokens). Chaque phase produit un lot de stories accumule via <code style="background:#1A1F2E;padding:2px 6px;border-radius:4px;font-size:12px;">staticData</code>. L'anti-repetition intra-batch est active.</p>
  </div>
</div></section>

<!-- COHERENCE -->
<section class="sec sec-e"><div class="ctn">
  <div style="display:flex;align-items:flex-start;gap:20px;margin-bottom:48px;">
    <div style="font-family:'Satoshi',sans-serif;font-size:48px;font-weight:900;color:#F59E0B;line-height:1;">05</div>
    <div>
      <h2 style="font-size:clamp(24px,3.5vw,36px);font-weight:900;margin-bottom:12px;">Coherence & Validation</h2>
      <p style="font-size:16px;color:#A3A3A3;">Le calendrier respecte-t-il les contraintes de la strategie ?</p>
    </div>
  </div>

  ${coherenceChecks.map(c => checkRow(c.label, c.ok ? 'ok' : 'warning', c.detail)).join('')}

  <!-- Flow diagram -->
  <div style="display:flex;align-items:center;justify-content:center;gap:24px;margin:48px 0 32px;flex-wrap:wrap;">
    ${[{ label: 'Agent 1', title: 'Stratege', accent: COLORS[0] }, { label: 'Agent 2', title: 'Posts', accent: COLORS[1] }, { label: 'Agent 3', title: 'Stories', accent: COLORS[2] }, { label: 'Resultat', title: totalSlots + ' slots', accent: COLORS[3] }].map((n, i, arr) =>
      `<div style="background:#111827;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:24px 32px;text-align:center;min-width:160px;">
        <p style="font-family:'Satoshi',sans-serif;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${n.accent};margin-bottom:6px;">${n.label}</p>
        <p style="font-family:'Satoshi',sans-serif;font-size:22px;font-weight:900;color:#F5F5F5;">${n.title}</p>
      </div>` + (i < arr.length - 1 ? '<span style="font-size:24px;color:#737373;">\u2192</span>' : '')
    ).join('')}
  </div>

  <p style="text-align:center;max-width:700px;margin:0 auto 40px;font-size:16px;color:#A3A3A3;line-height:1.8;">${totalPosts} posts + ${totalStories} stories = ${totalSlots} slots editoriaux generes pour la campagne "${esc(campaignName)}".</p>

  <div style="background:#111827;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:24px 28px;">
    <p style="font-family:'Satoshi',sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;color:#737373;text-transform:uppercase;margin-bottom:10px;">Prochaine etape</p>
    <h4 style="font-family:'Satoshi',sans-serif;font-weight:700;font-size:16px;color:#F5F5F5;margin-bottom:8px;">${coherenceChecks.every(c => c.ok) ? 'Calendrier pret — WF1.5 peut demarrer' : 'Verifiez les ecarts avant de continuer'}</h4>
    <p style="font-size:14px;color:#A3A3A3;line-height:1.7;font-style:italic;">${coherenceChecks.every(c => c.ok) ? 'Le calendrier editorial est coherent avec la strategie. WF1.5 (Demande Photos) generera les demandes de photos pour les slots des 48 prochaines heures.' : 'Certains controles montrent des ecarts. Verifiez la distribution des piliers et les volumes avant de lancer la production.'}</p>
  </div>
</div></section>

<!-- FOOTER -->
<footer style="padding:48px 0;text-align:center;border-top:1px solid rgba(255,255,255,0.08);">
<div class="ctn">
  <p style="font-family:'Satoshi',sans-serif;font-size:15px;font-weight:700;color:#F5F5F5;margin-bottom:4px;">Neurolia Social Engine</p>
  <p style="font-size:14px;color:#737373;font-style:italic;margin-bottom:12px;">Rapport WF01 \u2014 ${esc(campaignName)} \u00B7 ${esc(clientName)}</p>
  <p style="font-size:12px;color:#737373;">${reportDate} \u00B7 Confidentiel</p>
</div>
</footer>

</body></html>`;

return [{ json: { ...resp, report_html: html } }];
