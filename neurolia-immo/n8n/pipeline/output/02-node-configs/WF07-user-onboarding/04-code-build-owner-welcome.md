# Node: Code: Build Owner Welcome Email

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
// WF07 — Build owner welcome email
// ============================================================

const config = $('Config').item.json;
const body = $('Webhook Trigger').item.json.body;

const firstName = (body.display_name || 'Cher proprietaire').split(' ')[0];

const html = `<div style="font-family:-apple-system,sans-serif;max-width:600px;margin:0 auto;">
  <div style="background:#1a1a2e;color:#fff;padding:24px;border-radius:8px 8px 0 0;text-align:center;">
    <h1 style="margin:0;font-size:24px;">Bienvenue sur Neurolia-Immo !</h1>
  </div>
  <div style="padding:24px;">
    <p>Bonjour ${firstName},</p>
    <p>Votre compte proprietaire a ete cree avec succes. Voici les prochaines etapes pour bien demarrer :</p>

    <div style="margin:20px 0;">
      <div style="display:flex;align-items:center;margin:12px 0;padding:12px;background:#f0fdf4;border-radius:6px;">
        <span style="font-size:24px;margin-right:12px;">1</span>
        <div><strong>Ajouter votre premier bien</strong><br><span style="color:#6b7280;">Renseignez le nom, l'adresse et les informations pratiques.</span></div>
      </div>
      <div style="display:flex;align-items:center;margin:12px 0;padding:12px;background:#eff6ff;border-radius:6px;">
        <span style="font-size:24px;margin-right:12px;">2</span>
        <div><strong>Configurer les URLs iCal</strong><br><span style="color:#6b7280;">Importez votre calendrier Airbnb et/ou Booking pour synchroniser vos reservations.</span></div>
      </div>
      <div style="display:flex;align-items:center;margin:12px 0;padding:12px;background:#fdf4ff;border-radius:6px;">
        <span style="font-size:24px;margin-right:12px;">3</span>
        <div><strong>Inviter votre equipe d'entretien</strong><br><span style="color:#6b7280;">Ajoutez vos agents de menage pour automatiser le planning.</span></div>
      </div>
    </div>

    <p style="text-align:center;margin-top:24px;">
      <a href="${config.DASHBOARD_URL}/properties/new" style="display:inline-block;background:#6366f1;color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;font-size:16px;">Commencer la configuration</a>
    </p>

    <p style="color:#6b7280;font-size:13px;margin-top:24px;">Besoin d'aide ? Contactez-nous a support@neurolia.fr</p>
  </div>
</div>`;

return [{
  json: {
    to: body.email,
    subject: 'Bienvenue sur Neurolia-Immo !',
    html: html,
    user_id: body.user_id
  }
}];
```

## Connexions

- **Entree** : Switch: Role (sortie 0 — owner)
- **Sortie** : Send Email Owner Welcome
