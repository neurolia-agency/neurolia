# Node: Code: Build Staff Emails

**Type** : code
**Mode** : Run Once for All Items

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| -- | -- | Acces via `$('HTTP: Get Cleaning Tasks Today')`, `$('HTTP: Get Staff Profiles')`, `$('Config')` |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| language | javaScript | Code JavaScript |
| mode | runOnceForAllItems | Traite toutes les taches ensemble |

## Code

**Langage** : JavaScript

```javascript
// ============================================================
// WF03 — Build staff planning emails
// Regrouper les taches par staff assigne
// Adapte de v1 wf03-construire-emails-staff.js
// ============================================================

const config = $('Config').first().json;
const tasksRaw = $('HTTP: Get Cleaning Tasks Today').all().map(i => i.json);
const tasks = Array.isArray(tasksRaw[0]) ? tasksRaw[0] : tasksRaw;
const staffRaw = $('HTTP: Get Staff Profiles').all().map(i => i.json);
const staffList = Array.isArray(staffRaw[0]) ? staffRaw[0] : staffRaw;

// Build staff lookup
const staffMap = {};
for (const s of staffList) {
  staffMap[s.id] = s;
}

// Group tasks by assigned staff
const staffTasks = new Map();

for (const task of tasks) {
  if (task.status === 'completed') continue;
  if (!task.assigned_to) continue;

  const staffId = task.assigned_to;
  const staff = staffMap[staffId];

  if (!staffTasks.has(staffId)) {
    staffTasks.set(staffId, {
      staffId,
      staffName: staff ? staff.display_name : 'Inconnu',
      staffEmail: staff ? staff.email : null,
      tasks: []
    });
  }

  const prop = task.properties || {};
  const resv = task.reservations || {};

  staffTasks.get(staffId).tasks.push({
    propertyName: prop.name || '-',
    propertyAddress: prop.address || '-',
    propertyCity: prop.city || '-',
    accessCode: prop.access_code || '-',
    wifiSsid: prop.wifi_ssid || '-',
    wifiPassword: prop.wifi_password || '-',
    instructions: prop.instructions || null,
    type: task.type,
    scheduledDate: task.scheduled_date,
    scheduledTime: task.scheduled_time || '-',
    nbGuests: resv.nb_guests || '-',
    arrivalTime: resv.arrival_time || 'non renseignee',
    guestName: resv.guest_name || '-',
    specialRequests: resv.special_requests || null,
    notes: task.notes || null,
    isAdHoc: task.type === 'ad_hoc'
  });
}

// Build one email per staff
const emails = [];
const todayStr = new Date().toLocaleDateString('fr-FR', {
  weekday: 'long', day: 'numeric', month: 'long'
});

for (const [, staff] of staffTasks) {
  if (!staff.staffEmail) continue;

  const firstName = staff.staffName.split(' ')[0];

  let html = '<div style="font-family:-apple-system,sans-serif;max-width:600px;margin:0 auto;">';
  html += '<div style="background:#1a1a2e;color:#fff;padding:16px;border-radius:8px 8px 0 0;">';
  html += `<h2 style="margin:0;">Bonjour ${firstName},</h2>`;
  html += `<p style="margin:4px 0 0 0;opacity:0.8;">Votre planning du ${todayStr}</p>`;
  html += '</div>';
  html += '<div style="padding:16px;">';

  if (staff.tasks.length === 0) {
    html += '<p>Aucune tache prevue pour aujourd\'hui.</p>';
  }

  for (const task of staff.tasks) {
    const typeLabels = {
      'checkout_clean': 'Menage depart',
      'checkin_prep': 'Preparation arrivee',
      'ad_hoc': 'Tache ponctuelle'
    };
    const typeLabel = typeLabels[task.type] || 'Tache';
    const borderColor = task.type === 'checkout_clean' ? '#dc2626' : task.type === 'checkin_prep' ? '#3b82f6' : '#f59e0b';

    html += `<div style="margin:12px 0;padding:16px;background:#f9fafb;border-radius:8px;border-left:4px solid ${borderColor};">`;
    html += `<h3 style="margin:0 0 8px 0;">${typeLabel}`;
    if (task.isAdHoc) {
      html += ' <span style="background:#f59e0b;color:#fff;padding:2px 8px;border-radius:12px;font-size:12px;">Ponctuel</span>';
    }
    html += ` — ${task.scheduledTime}</h3>`;
    html += `<p style="margin:4px 0;"><strong>Logement :</strong> ${task.propertyName}</p>`;
    html += `<p style="margin:4px 0;"><strong>Adresse :</strong> <a href="https://maps.google.com/?q=${encodeURIComponent(task.propertyAddress + ', ' + task.propertyCity)}">${task.propertyAddress}, ${task.propertyCity}</a></p>`;
    html += `<p style="margin:4px 0;"><strong>Code acces :</strong> <span style="font-size:18px;font-weight:bold;letter-spacing:2px;">${task.accessCode}</span></p>`;
    html += `<p style="margin:4px 0;"><strong>WiFi :</strong> ${task.wifiSsid} / ${task.wifiPassword}</p>`;

    if (!task.isAdHoc) {
      html += `<p style="margin:4px 0;"><strong>Voyageur :</strong> ${task.guestName} (${task.nbGuests} pers.)</p>`;
      html += `<p style="margin:4px 0;"><strong>Heure arrivee :</strong> ${task.arrivalTime}</p>`;
    }

    if (task.specialRequests) {
      html += `<div style="margin-top:8px;padding:8px;background:#fef3c7;border-radius:4px;">`;
      html += `<strong>Demande speciale :</strong> ${task.specialRequests}</div>`;
    }

    if (task.notes) {
      html += `<p style="margin:8px 0 0 0;color:#6b7280;"><em>Notes : ${task.notes}</em></p>`;
    }

    if (task.instructions) {
      html += `<p style="margin:4px 0;color:#6b7280;"><em>Consignes : ${task.instructions}</em></p>`;
    }

    html += '</div>';
  }

  html += `<p style="margin-top:16px;"><a href="${config.DASHBOARD_URL}/planning" style="display:inline-block;background:#6366f1;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;">Voir mon planning</a></p>`;
  html += '</div></div>';

  emails.push({
    json: {
      to: staff.staffEmail,
      subject: `[Neurolia-Immo] Ton planning — ${todayStr} (${staff.tasks.length} tache(s))`,
      html: html,
      staffName: staff.staffName
    }
  });
}

if (emails.length === 0) {
  return [{ json: { warning: 'Aucun email staff a envoyer', to: null } }];
}

return emails;
```

## Sortie attendue

```json
[
  {
    "to": "sarah@exemple.fr",
    "subject": "[Neurolia-Immo] Ton planning — jeudi 20 fevrier (2 tache(s))",
    "html": "<div>...</div>",
    "staffName": "Sarah Martin"
  }
]
```

## Connexions

- **Entree** : HTTP: Get Staff Profiles
- **Sortie** : Split In Batches: Staff Emails
