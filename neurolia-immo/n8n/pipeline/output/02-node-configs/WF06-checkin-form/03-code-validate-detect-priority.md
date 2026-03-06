> **⚠️ DEPRECATED v2.2** — Voir WF06-checkin-form.md pour justification.

# Node: Code: Validate & Detect Priority

**Type** : code
**Mode** : Run Once for Each Item

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| language | javaScript | Code JavaScript |
| mode | runOnceForEachItem | Par soumission |

## Code

**Langage** : JavaScript

```javascript
// ============================================================
// WF06 — Validate payload + detect priority keywords
// ============================================================

const config = $('Config').item.json;
const body = $('Webhook Trigger').item.json.body;

// --- Validation ---
const required = ['reservationId', 'guestName', 'propertyName'];
const missing = required.filter(f => !body[f]);
if (missing.length > 0) {
  throw new Error(`Champs requis manquants: ${missing.join(', ')}`);
}

// --- Priority keyword detection ---
const specialRequests = (body.specialRequests || '').toLowerCase();
const arrivalTime = body.arrivalTime || '';
const reasons = [];

// Bebe/enfants
if (/b[eé]b[eé]|enfant|lit\s*b[eé]b[eé]|nourrisson|poussette/i.test(specialRequests)) {
  reasons.push('Bebe/enfant mentionne');
}

// Arrivee tardive (> 21:00)
if (arrivalTime) {
  const hour = parseInt(arrivalTime.split(':')[0]);
  if (hour >= 21) {
    reasons.push(`Arrivee tardive (${arrivalTime})`);
  }
}

// Handicap/mobilite
if (/handicap|fauteuil|mobilit[eé]\s*r[eé]duite|pmr|accessibilit/i.test(specialRequests)) {
  reasons.push('Mobilite reduite mentionnee');
}

// Animaux
if (/animaux?|chien|chat|animal/i.test(specialRequests)) {
  reasons.push('Animal mentionne');
}

// Allergie
if (/allergi[eq]/i.test(specialRequests)) {
  reasons.push('Allergie mentionnee');
}

// Probleme/urgence
if (/probl[eè]me|urgence|urgent/i.test(specialRequests)) {
  reasons.push('Urgence mentionnee');
}

const isPriority = reasons.length > 0;

// --- Lookup owner email ---
let ownerEmail = null;
try {
  const supabaseUrl = config.SUPABASE_URL;
  const supabaseKey = config.SUPABASE_SERVICE_KEY;
  const res = await fetch(
    `${supabaseUrl}/rest/v1/properties?id=eq.${body.propertyId}&select=owner_id,profiles!properties_owner_id_fkey(email)`,
    {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    }
  );
  const data = await res.json();
  if (data && data[0] && data[0].profiles) {
    ownerEmail = data[0].profiles.email;
  }
} catch (err) {
  // Fallback handled below
}

if (!ownerEmail) {
  throw new Error(`Impossible de recuperer l'email du owner pour property_id: ${body.propertyId}`);
}

// --- Format dates ---
const formatDateFR = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
};

// --- Build email ---
const headerColor = isPriority ? '#dc2626' : '#3b82f6';
const headerLabel = isPriority ? 'ATTENTION REQUISE' : 'Formulaire pre-arrivee';
const subjectPrefix = isPriority ? '[ATTENTION] ' : '';

const subject = `${subjectPrefix}Formulaire pre-arrivee — ${body.guestName} @ ${body.propertyName}`;

let html = `<div style="font-family:-apple-system,sans-serif;max-width:600px;margin:0 auto;">`;
html += `<div style="background:${headerColor};color:#fff;padding:16px;border-radius:8px 8px 0 0;">`;
html += `<h2 style="margin:0;">${headerLabel}</h2>`;
html += `</div>`;
html += `<div style="padding:16px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">`;

if (isPriority) {
  html += `<div style="background:#fef2f2;padding:12px;border-radius:6px;margin-bottom:16px;">`;
  html += `<strong style="color:#dc2626;">Raisons :</strong><ul style="margin:4px 0;">`;
  for (const r of reasons) {
    html += `<li style="color:#dc2626;">${r}</li>`;
  }
  html += `</ul></div>`;
}

html += `<table style="width:100%;border-collapse:collapse;">`;
html += `<tr><td style="padding:8px;font-weight:bold;">Voyageur</td><td style="padding:8px;">${body.guestName}</td></tr>`;
html += `<tr style="background:#f3f4f6;"><td style="padding:8px;font-weight:bold;">Bien</td><td style="padding:8px;">${body.propertyName}</td></tr>`;
html += `<tr><td style="padding:8px;font-weight:bold;">Arrivee</td><td style="padding:8px;">${formatDateFR(body.checkIn)}</td></tr>`;
html += `<tr style="background:#f3f4f6;"><td style="padding:8px;font-weight:bold;">Depart</td><td style="padding:8px;">${formatDateFR(body.checkOut)}</td></tr>`;
html += `<tr><td style="padding:8px;font-weight:bold;">Heure arrivee</td><td style="padding:8px;">${arrivalTime || 'Non renseignee'}</td></tr>`;
html += `<tr style="background:#f3f4f6;"><td style="padding:8px;font-weight:bold;">Nombre de voyageurs</td><td style="padding:8px;">${body.nbGuests || '-'}</td></tr>`;
if (body.specialRequests) {
  html += `<tr><td style="padding:8px;font-weight:bold;">Demandes speciales</td><td style="padding:8px;background:#fef3c7;">${body.specialRequests}</td></tr>`;
}
html += `</table>`;

html += `<p style="margin-top:16px;"><a href="${config.DASHBOARD_URL}/reservations/${body.reservationId}" style="display:inline-block;background:#1a1a2e;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;">Voir la reservation</a></p>`;
html += `</div></div>`;

return [{
  json: {
    ownerEmail: ownerEmail,
    subject: subject,
    html: html,
    isPriority: isPriority,
    reasons: reasons,
    guestName: body.guestName,
    propertyName: body.propertyName
  }
}];
```

## Sortie attendue

```json
{
  "ownerEmail": "marc@exemple.fr",
  "subject": "[ATTENTION] Formulaire pre-arrivee — Jean Dupont @ Studio Marais",
  "html": "<div>...</div>",
  "isPriority": true,
  "reasons": ["Bebe/enfant mentionne", "Arrivee tardive (22:30)"],
  "guestName": "Jean Dupont",
  "propertyName": "Studio Marais"
}
```

## Connexions

- **Entree** : Config
- **Sortie** : Send Email Owner
