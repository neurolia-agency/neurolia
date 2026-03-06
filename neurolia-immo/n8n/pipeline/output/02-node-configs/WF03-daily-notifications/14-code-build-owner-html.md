# Node: Code: Build Owner HTML

**Type** : code
**Mode** : Run Once for All Items

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| -- | -- | Acces via les 4 queries HTTP et Config |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| language | javaScript | Code JavaScript |
| mode | runOnceForAllItems | Traite tous les resultats |

## Code

**Langage** : JavaScript

```javascript
// ============================================================
// WF03 — Build owner daily digest HTML
// Sections: Arrivees aujourd'hui, Departs, Arrivees demain, Taches menage, KPIs
// ============================================================

const config = $('Config').first().json;

// Recuperer les donnees des 4 queries
const checkinsToday = $('HTTP: Get Check-ins Today').all().map(i => i.json);
const checkinsArr = Array.isArray(checkinsToday[0]) ? checkinsToday[0] : checkinsToday;

const checkoutsToday = $('HTTP: Get Check-outs Today').all().map(i => i.json);
const checkoutsArr = Array.isArray(checkoutsToday[0]) ? checkoutsToday[0] : checkoutsToday;

const checkinsTomorrow = $('HTTP: Get Check-ins Tomorrow').all().map(i => i.json);
const checkinsTomorrowArr = Array.isArray(checkinsTomorrow[0]) ? checkinsTomorrow[0] : checkinsTomorrow;

const pendingTasks = $('HTTP: Get Pending Tasks').all().map(i => i.json);
const pendingArr = Array.isArray(pendingTasks[0]) ? pendingTasks[0] : pendingTasks;

const todayStr = new Date().toLocaleDateString('fr-FR', {
  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
});

// --- Recuperer les owners ---
// Multi-tenant : grouper par owner_id et envoyer un email par owner
const ownerData = {};

function addToOwner(ownerId, section, items) {
  // On ne peut pas determiner l'owner_id depuis les reservations directement
  // On utilise les properties pour le lookup
  // Simplification v2 MVP : un seul owner
}

// --- Build HTML ---
let html = '<div style="font-family:-apple-system,sans-serif;max-width:600px;margin:0 auto;">';
html += '<div style="background:#1a1a2e;color:#fff;padding:20px;border-radius:8px 8px 0 0;">';
html += `<h1 style="margin:0;font-size:20px;">Votre resume quotidien</h1>`;
html += `<p style="margin:4px 0 0 0;opacity:0.8;font-size:14px;">${todayStr}</p>`;
html += '</div>';
html += '<div style="padding:16px;">';

// --- Section : Arrivees aujourd'hui ---
html += '<h2 style="color:#1a1a2e;border-bottom:2px solid #6366f1;padding-bottom:8px;">Arrivees aujourd\'hui</h2>';
if (checkinsArr.length === 0 || (checkinsArr.length === 1 && !checkinsArr[0].id)) {
  html += '<p style="color:#6b7280;">Aucune arrivee prevue.</p>';
} else {
  for (const r of checkinsArr) {
    if (!r.id) continue;
    const propName = r.properties ? r.properties.name : '-';
    html += '<div style="margin:8px 0;padding:12px;background:#f0fdf4;border-radius:6px;border-left:4px solid #22c55e;">';
    html += `<strong>${r.guest_name}</strong> — ${propName}`;
    html += `<br><span style="color:#6b7280;">${r.nb_guests} pers. | Arrivee : ${r.arrival_time || 'non renseignee'}</span>`;
    if (r.special_requests) {
      html += `<br><span style="background:#fef3c7;padding:2px 6px;border-radius:4px;font-size:12px;">Demande speciale : ${r.special_requests}</span>`;
    }
    html += '</div>';
  }
}

// --- Section : Departs aujourd'hui ---
html += '<h2 style="color:#1a1a2e;border-bottom:2px solid #ef4444;padding-bottom:8px;">Departs aujourd\'hui</h2>';
if (checkoutsArr.length === 0 || (checkoutsArr.length === 1 && !checkoutsArr[0].id)) {
  html += '<p style="color:#6b7280;">Aucun depart prevu.</p>';
} else {
  for (const r of checkoutsArr) {
    if (!r.id) continue;
    const propName = r.properties ? r.properties.name : '-';
    html += '<div style="margin:8px 0;padding:12px;background:#fef2f2;border-radius:6px;border-left:4px solid #ef4444;">';
    html += `<strong>${r.guest_name}</strong> — ${propName}`;
    html += '</div>';
  }
}

// --- Section : Arrivees demain (preview) ---
html += '<h2 style="color:#1a1a2e;border-bottom:2px solid #3b82f6;padding-bottom:8px;">Arrivees demain</h2>';
if (checkinsTomorrowArr.length === 0 || (checkinsTomorrowArr.length === 1 && !checkinsTomorrowArr[0].id)) {
  html += '<p style="color:#6b7280;">Aucune arrivee prevue demain.</p>';
} else {
  for (const r of checkinsTomorrowArr) {
    if (!r.id) continue;
    const propName = r.properties ? r.properties.name : '-';
    html += '<div style="margin:8px 0;padding:12px;background:#eff6ff;border-radius:6px;border-left:4px solid #3b82f6;">';
    html += `<strong>${r.guest_name}</strong> — ${propName} (${r.nb_guests} pers.)`;
    html += '</div>';
  }
}

// --- Section : Taches menage en attente ---
html += '<h2 style="color:#1a1a2e;border-bottom:2px solid #f59e0b;padding-bottom:8px;">Taches menage en attente</h2>';
if (pendingArr.length === 0 || (pendingArr.length === 1 && !pendingArr[0].id)) {
  html += '<p style="color:#6b7280;">Aucune tache en attente.</p>';
} else {
  html += '<table style="width:100%;border-collapse:collapse;font-size:14px;">';
  html += '<tr style="background:#fef3c7;"><th style="padding:8px;text-align:left;">Bien</th><th style="padding:8px;text-align:left;">Agent</th><th style="padding:8px;text-align:left;">Date</th><th style="padding:8px;text-align:left;">Type</th></tr>';
  for (const t of pendingArr) {
    if (!t.id) continue;
    const propName = t.properties ? t.properties.name : '-';
    const staffName = t.profiles ? t.profiles.display_name : 'Non assigne';
    const typeLabels = { 'checkout_clean': 'Menage', 'checkin_prep': 'Preparation', 'ad_hoc': 'Ponctuel' };
    html += `<tr style="border-bottom:1px solid #e5e7eb;"><td style="padding:8px;">${propName}</td><td style="padding:8px;">${staffName}</td><td style="padding:8px;">${t.scheduled_date}</td><td style="padding:8px;">${typeLabels[t.type] || t.type}</td></tr>`;
  }
  html += '</table>';
}

// --- KPIs rapides ---
const totalCheckins = checkinsArr.filter(r => r.id).length;
const totalCheckouts = checkoutsArr.filter(r => r.id).length;
const totalPending = pendingArr.filter(t => t.id).length;

html += '<div style="margin-top:20px;padding:16px;background:#f3f4f6;border-radius:8px;text-align:center;">';
html += `<span style="display:inline-block;margin:0 12px;"><strong style="font-size:24px;color:#22c55e;">${totalCheckins}</strong><br><small>Arrivee(s)</small></span>`;
html += `<span style="display:inline-block;margin:0 12px;"><strong style="font-size:24px;color:#ef4444;">${totalCheckouts}</strong><br><small>Depart(s)</small></span>`;
html += `<span style="display:inline-block;margin:0 12px;"><strong style="font-size:24px;color:#f59e0b;">${totalPending}</strong><br><small>Tache(s) en attente</small></span>`;
html += '</div>';

// --- Boutons ---
html += `<div style="margin-top:16px;text-align:center;">`;
html += `<a href="${config.DASHBOARD_URL}" style="display:inline-block;background:#1a1a2e;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;margin:4px;">Voir le dashboard</a>`;
html += `<a href="${config.DASHBOARD_URL}/cleaning" style="display:inline-block;background:#6366f1;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;margin:4px;">Suivi menages</a>`;
html += '</div>';

html += '</div></div>';

// --- Recuperer email owner ---
// Multi-tenant : pour l'instant, on envoie a l'ADMIN_EMAIL
// TODO v2 : loop par owner_id distinct
return [{
  json: {
    subject: `[Neurolia-Immo] Resume quotidien — ${todayStr}`,
    html: html,
    stats: { checkins: totalCheckins, checkouts: totalCheckouts, pendingTasks: totalPending }
  }
}];
```

## Sortie attendue

```json
{
  "subject": "[Neurolia-Immo] Resume quotidien — jeudi 20 fevrier 2026",
  "html": "<div>...</div>",
  "stats": { "checkins": 2, "checkouts": 1, "pendingTasks": 3 }
}
```

## Connexions

- **Entree** : Merge
- **Sortie** : HTTP: Get Owners
