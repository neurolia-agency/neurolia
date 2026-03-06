# Node: Code: Build Urgent Email

**Type** : code
**Mode** : Run Once for Each Item

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| language | javaScript | Code JavaScript |
| mode | runOnceForEachItem | Par signalement |

## Code

**Langage** : JavaScript

```javascript
// ============================================================
// WF08 — Build urgent issue email for owner
// Lookup property, reporter, owner + generate signed URL for photo
// ============================================================

const config = $('Config').item.json;
const body = $('Webhook Trigger').item.json.body;
const supabaseUrl = config.SUPABASE_URL;
const supabaseKey = config.SUPABASE_SERVICE_KEY;

const headers = {
  'apikey': supabaseKey,
  'Authorization': `Bearer ${supabaseKey}`
};

// --- Fetch property ---
let property = {};
try {
  const propRes = await fetch(
    `${supabaseUrl}/rest/v1/properties?id=eq.${body.property_id}&select=name,address,owner_id`,
    { headers }
  );
  const propData = await propRes.json();
  property = propData[0] || {};
} catch (err) {}

// --- Fetch reporter ---
let reporter = {};
try {
  const repRes = await fetch(
    `${supabaseUrl}/rest/v1/profiles?id=eq.${body.reported_by}&select=display_name,email,phone`,
    { headers }
  );
  const repData = await repRes.json();
  reporter = repData[0] || {};
} catch (err) {}

// --- Fetch owner ---
let ownerEmail = null;
let ownerName = '';
try {
  const ownerRes = await fetch(
    `${supabaseUrl}/rest/v1/profiles?id=eq.${property.owner_id}&select=email,display_name`,
    { headers }
  );
  const ownerData = await ownerRes.json();
  if (ownerData[0]) {
    ownerEmail = ownerData[0].email;
    ownerName = ownerData[0].display_name;
  }
} catch (err) {}

if (!ownerEmail) {
  throw new Error(`Impossible de recuperer l'email du owner pour property: ${property.name}`);
}

// --- Generate signed URL for photo ---
let photoUrl = null;
if (body.photo_path) {
  try {
    const signRes = await fetch(
      `${supabaseUrl}/storage/v1/object/sign/${body.photo_path}`,
      {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ expiresIn: 86400 }) // 24h
      }
    );
    const signData = await signRes.json();
    if (signData.signedURL) {
      photoUrl = `${supabaseUrl}/storage/v1${signData.signedURL}`;
    }
  } catch (err) {
    // Photo URL generation failed — continue without photo
  }
}

// --- Type labels ---
const typeLabels = {
  'leak': 'Fuite',
  'breakage': 'Casse',
  'missing': 'Manquant',
  'other': 'Autre'
};
const typeLabel = typeLabels[body.type] || body.type;

const timestamp = new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });

// --- Build email ---
let html = `<div style="font-family:-apple-system,sans-serif;max-width:600px;margin:0 auto;">`;
html += `<div style="background:#dc2626;color:#fff;padding:16px;border-radius:8px 8px 0 0;">`;
html += `<h2 style="margin:0;">SIGNALEMENT URGENT</h2>`;
html += `</div>`;
html += `<div style="padding:16px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">`;

html += `<table style="width:100%;border-collapse:collapse;">`;
html += `<tr><td style="padding:8px;font-weight:bold;">Type</td><td style="padding:8px;"><span style="background:#dc2626;color:#fff;padding:2px 8px;border-radius:4px;">${typeLabel}</span></td></tr>`;
html += `<tr style="background:#f3f4f6;"><td style="padding:8px;font-weight:bold;">Description</td><td style="padding:8px;">${body.description || '-'}</td></tr>`;
html += `<tr><td style="padding:8px;font-weight:bold;">Propriete</td><td style="padding:8px;">${property.name || '-'} — ${property.address || '-'}</td></tr>`;
html += `<tr style="background:#f3f4f6;"><td style="padding:8px;font-weight:bold;">Signale par</td><td style="padding:8px;">${reporter.display_name || '-'}${reporter.phone ? ` (${reporter.phone})` : ''}</td></tr>`;
html += `<tr><td style="padding:8px;font-weight:bold;">Quand</td><td style="padding:8px;">${timestamp}</td></tr>`;
html += `</table>`;

if (photoUrl) {
  html += `<div style="margin-top:16px;"><img src="${photoUrl}" alt="Photo du signalement" style="max-width:100%;border-radius:8px;border:1px solid #e5e7eb;"></div>`;
}

html += `<div style="margin-top:16px;">`;
html += `<a href="${config.DASHBOARD_URL}/issues/${body.issue_id}" style="display:inline-block;background:#1a1a2e;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;margin-right:8px;">Voir le signalement</a>`;
if (reporter.phone) {
  html += `<a href="tel:${reporter.phone}" style="display:inline-block;background:#22c55e;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;">Appeler ${reporter.display_name}</a>`;
}
html += `</div>`;

html += `</div></div>`;

const subject = `[URGENT] Signalement — ${typeLabel} @ ${property.name || 'Propriete'}`;

return [{
  json: {
    ownerEmail: ownerEmail,
    subject: subject,
    html: html
  }
}];
```

## Sortie attendue

```json
{
  "ownerEmail": "marc@exemple.fr",
  "subject": "[URGENT] Signalement — Fuite @ Studio Marais",
  "html": "<div>...</div>"
}
```

## Connexions

- **Entree** : Supabase: Get Owner
- **Sortie** : Send Email Urgent
