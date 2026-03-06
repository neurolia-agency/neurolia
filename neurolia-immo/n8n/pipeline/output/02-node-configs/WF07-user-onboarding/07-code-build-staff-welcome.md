# Node: Code: Build Staff Welcome Emails

**Type** : code
**Mode** : Run Once for Each Item

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| language | javaScript | Code JavaScript |
| mode | runOnceForEachItem | Par utilisateur |

## Code

**Langage** : JavaScript

```javascript
// ============================================================
// WF07 — Build staff welcome email + owner notification
// ============================================================

const config = $('Config').item.json;
const body = $('Webhook Trigger').item.json.body;
const ownerArr = $('HTTP: Get Owner Profile').all().map(i => i.json);
const owner = Array.isArray(ownerArr[0]) ? ownerArr[0][0] : ownerArr[0];

const staffFirstName = (body.display_name || 'Cher collaborateur').split(' ')[0];
const ownerName = owner ? owner.display_name : 'votre employeur';
const ownerEmail = owner ? owner.email : null;

// --- Email staff bienvenue ---
const staffHtml = `<div style="font-family:-apple-system,sans-serif;max-width:600px;margin:0 auto;">
  <div style="background:#6366f1;color:#fff;padding:24px;border-radius:8px 8px 0 0;text-align:center;">
    <h1 style="margin:0;">Bienvenue dans l'equipe !</h1>
  </div>
  <div style="padding:24px;">
    <p>Bonjour ${staffFirstName},</p>
    <p>Vous avez rejoint l'equipe de <strong>${ownerName}</strong> sur Neurolia-Immo.</p>
    <h3>Comment ca fonctionne :</h3>
    <ul>
      <li>Vous recevrez votre planning de taches chaque matin par email</li>
      <li>Consultez les details de chaque tache (adresse, code d'acces, checklist)</li>
      <li>Validez les taches une fois completees dans l'application</li>
    </ul>
    <p style="text-align:center;margin-top:24px;">
      <a href="${config.DASHBOARD_URL}/planning" style="display:inline-block;background:#6366f1;color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;">Voir mon planning</a>
    </p>
  </div>
</div>`;

// --- Email owner notification ---
let ownerHtml = '';
if (ownerEmail) {
  ownerHtml = `<div style="font-family:-apple-system,sans-serif;max-width:600px;margin:0 auto;">
    <div style="background:#1a1a2e;color:#fff;padding:16px;border-radius:8px 8px 0 0;">
      <h2 style="margin:0;">Nouveau membre dans votre equipe</h2>
    </div>
    <div style="padding:16px;">
      <p><strong>${body.display_name}</strong> a rejoint votre equipe d'entretien.</p>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px;font-weight:bold;">Nom</td><td style="padding:8px;">${body.display_name}</td></tr>
        <tr style="background:#f3f4f6;"><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;">${body.email}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Date inscription</td><td style="padding:8px;">${new Date().toLocaleDateString('fr-FR')}</td></tr>
      </table>
      <p style="margin-top:16px;"><a href="${config.DASHBOARD_URL}/team" style="display:inline-block;background:#1a1a2e;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;">Gerer mon equipe</a></p>
    </div>
  </div>`;
}

const emails = [
  {
    json: {
      to: body.email,
      subject: `Bienvenue dans l'equipe — Neurolia-Immo`,
      html: staffHtml,
      type: 'staff_welcome'
    }
  }
];

if (ownerEmail) {
  emails.push({
    json: {
      to: ownerEmail,
      subject: `${body.display_name} a rejoint votre equipe`,
      html: ownerHtml,
      type: 'owner_notification'
    }
  });
}

return emails;
```

## Connexions

- **Entree** : HTTP: Get Owner Profile
- **Sortie** : Split In Batches: Staff Emails
