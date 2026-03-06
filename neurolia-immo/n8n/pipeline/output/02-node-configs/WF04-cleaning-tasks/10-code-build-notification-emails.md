# Node: Code: Build Notification Emails

**Type** : code
**Mode** : Run Once for Each Item

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| -- | -- | Acces via `$json` (assignments) et `$('Config')` |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| language | javaScript | Code JavaScript |
| mode | runOnceForEachItem | Par reservation |

## Code

**Langage** : JavaScript

```javascript
// ============================================================
// WF04 — Build notification emails for assigned staff
// ============================================================

const config = $('Config').item.json;
const data = $input.item.json;

if (data.no_staff_available || !data.assignments || data.assignments.length === 0) {
  return [{ json: { emails: [], warning: 'Pas de staff assigne — pas d\'email a envoyer' } }];
}

const typeLabels = {
  'checkout_clean': 'Menage depart',
  'checkin_prep': 'Preparation arrivee',
  'check_in_greeting': 'Accueil voyageur',
  'ad_hoc': 'Tache ponctuelle'
};

const emails = [];

// Regrouper par staff (un staff peut avoir 2 taches pour la meme reservation)
const staffEmails = {};

for (const assignment of data.assignments) {
  if (!assignment.staff_email) continue;

  if (!staffEmails[assignment.staff_email]) {
    staffEmails[assignment.staff_email] = {
      to: assignment.staff_email,
      staffName: assignment.staff_name,
      tasks: []
    };
  }

  staffEmails[assignment.staff_email].tasks.push(assignment);
}

for (const [email, staffData] of Object.entries(staffEmails)) {
  const firstName = staffData.staffName.split(' ')[0];
  const taskCount = staffData.tasks.length;

  let html = '<div style="font-family:-apple-system,sans-serif;max-width:600px;margin:0 auto;">';
  html += '<div style="background:#1a1a2e;color:#fff;padding:16px;border-radius:8px 8px 0 0;">';
  html += `<h2 style="margin:0;">Nouvelle tache assignee</h2>`;
  html += '</div>';
  html += '<div style="padding:16px;background:#f9fafb;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">';
  html += `<p>Bonjour ${firstName},</p>`;
  html += `<p>Vous avez ${taskCount} nouvelle(s) tache(s) pour le bien <strong>${data.property_name}</strong>.</p>`;

  for (const task of staffData.tasks) {
    const typeLabel = typeLabels[task.task_type] || task.task_type;
    const dateObj = new Date(task.task_date + 'T12:00:00');
    const dateFR = dateObj.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });

    html += '<div style="margin:12px 0;padding:12px;background:#fff;border-radius:6px;border-left:4px solid #6366f1;">';
    html += `<h3 style="margin:0 0 8px 0;color:#1a1a2e;">${typeLabel}</h3>`;
    html += `<p style="margin:4px 0;"><strong>Date :</strong> ${dateFR}</p>`;
    html += `<p style="margin:4px 0;"><strong>Bien :</strong> ${data.property_name}</p>`;
    html += `<p style="margin:4px 0;"><strong>Adresse :</strong> <a href="https://maps.google.com/?q=${encodeURIComponent(data.property_address)}">${data.property_address}</a></p>`;
    html += `<p style="margin:4px 0;"><strong>Voyageur :</strong> ${data.guest_name} (${data.nb_guests} pers.)</p>`;
    html += '</div>';
  }

  html += `<p style="margin-top:16px;"><a href="${config.DASHBOARD_URL}/planning" style="display:inline-block;background:#6366f1;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;">Voir mon planning</a></p>`;
  html += '</div></div>';

  emails.push({
    json: {
      to: email,
      subject: `[Neurolia-Immo] Nouvelle tache — ${data.property_name} (${dateFR || task.task_date})`,
      html: html,
      staffName: staffData.staffName
    }
  });
}

return emails.length > 0 ? emails : [{ json: { emails: [], warning: 'Aucun email a envoyer' } }];
```

## Sortie attendue

```json
[
  {
    "to": "sarah@exemple.fr",
    "subject": "[Neurolia-Immo] Nouvelle tache — Studio Marais (mardi 18 mars)",
    "html": "<div>...</div>",
    "staffName": "Sarah Martin"
  }
]
```

## Connexions

- **Entree** : Code: Assign Round-Robin
- **Sortie** : Split In Batches: Emails

## Notes

- Un email par staff assigne (pas par tache — regroupe si le meme staff a checkout + checkin)
- Le lien Google Maps permet au staff de naviguer directement vers le bien
- Le bouton "Voir mon planning" redirige vers le dashboard staff
