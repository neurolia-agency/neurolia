# Node: Code: Build Alert Email

**Type** : code
**Mode** : Run Once for Each Item

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| language | javaScript | Code JavaScript |
| mode | runOnceForEachItem | Par execution |

## Code

**Langage** : JavaScript

```javascript
// ============================================================
// WF09 — Build health check alert email
// ============================================================

const config = $('Config').item.json;
const data = $input.item.json;

const statusColors = {
  'ok': '#22c55e',
  'warning': '#f59e0b',
  'error': '#dc2626',
  'n/a': '#9ca3af'
};

const statusLabels = {
  'ok': 'OK',
  'warning': 'Warning',
  'error': 'Erreur',
  'n/a': 'N/A'
};

const statusDot = (status) => {
  const color = statusColors[status] || '#9ca3af';
  return `<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${color};margin-right:4px;"></span>${statusLabels[status] || status}`;
};

let html = `<div style="font-family:-apple-system,sans-serif;max-width:600px;margin:0 auto;">`;
html += `<div style="background:#1a1a2e;color:#fff;padding:16px;border-radius:8px 8px 0 0;">`;
html += `<h2 style="margin:0;">Health Check — ${data.errors} erreur(s), ${data.warnings} warning(s)</h2>`;
html += `<p style="margin:4px 0 0 0;opacity:0.8;">${new Date(data.checked_at).toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}</p>`;
html += `</div>`;
html += `<div style="padding:16px;">`;

// KPIs
html += `<div style="display:flex;justify-content:space-around;margin-bottom:16px;padding:12px;background:#f3f4f6;border-radius:8px;text-align:center;">`;
html += `<div><strong style="font-size:24px;color:#22c55e;">${data.healthy}</strong><br><small>Sain(s)</small></div>`;
html += `<div><strong style="font-size:24px;color:#f59e0b;">${data.warnings}</strong><br><small>Warning(s)</small></div>`;
html += `<div><strong style="font-size:24px;color:#dc2626;">${data.errors}</strong><br><small>Erreur(s)</small></div>`;
html += `</div>`;

// Table details
html += `<table style="width:100%;border-collapse:collapse;font-size:14px;">`;
html += `<tr style="background:#1a1a2e;color:#fff;">`;
html += `<th style="padding:8px;text-align:left;">Propriete</th>`;
html += `<th style="padding:8px;text-align:left;">Owner</th>`;
html += `<th style="padding:8px;text-align:center;">iCal</th>`;
html += `<th style="padding:8px;text-align:center;">IMAP</th>`;
html += `</tr>`;

for (const prop of data.details) {
  if (prop.issues.length === 0) continue; // Only show properties with issues

  const bgColor = prop.issues.some(i => i.severity === 'error') ? '#fef2f2' :
                  prop.issues.some(i => i.severity === 'warning') ? '#fffbeb' : '#fff';

  html += `<tr style="background:${bgColor};border-bottom:1px solid #e5e7eb;">`;
  html += `<td style="padding:8px;">${prop.property_name}</td>`;
  html += `<td style="padding:8px;">${prop.owner_name || '-'}</td>`;
  html += `<td style="padding:8px;text-align:center;">${statusDot(prop.ical_status)}</td>`;
  html += `<td style="padding:8px;text-align:center;">${statusDot(prop.imap_status)}</td>`;
  html += `</tr>`;

  // Show issues for this property
  for (const issue of prop.issues) {
    html += `<tr style="background:#f9fafb;"><td colspan="4" style="padding:4px 8px 4px 24px;font-size:12px;color:${statusColors[issue.severity]};">`;
    html += `${issue.message}`;
    html += `</td></tr>`;
  }
}

html += `</table>`;
html += `</div></div>`;

const subject = `[Neurolia-Immo] Health Check — ${data.errors} erreur(s), ${data.warnings} warning(s)`;

return [{
  json: {
    subject: subject,
    html: html
  }
}];
```

## Sortie attendue

```json
{
  "subject": "[Neurolia-Immo] Health Check — 1 erreur(s), 1 warning(s)",
  "html": "<div>...</div>"
}
```

## Connexions

- **Entree** : IF: Issues Found? (sortie true)
- **Sortie** : Send Email Admin
