# Node: Send Email: iCal Alert

**Type** : emailSend
**Mode** : Run Once for Each Item

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| toEmail | `={{ $('HTTP: Get Owner').item.json[0].email }}` | Email du owner |
| subject | `=[Neurolia-Immo] Anomalie iCal — {{ $json.property_name }}` | Sujet email |
| html | (expression) | Corps HTML genere |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| fromEmail | `={{ $('Config').item.json.SMTP_FROM_EMAIL }}` | Expediteur |
| toEmail | (expression) | Email owner dynamique |
| subject | (expression) | Sujet avec nom propriete |
| emailType | html | Email HTML |
| html | `={{ (function() { const anomalies = $json.anomalies; const propName = $json.property_name; const dashUrl = $('Config').item.json.DASHBOARD_URL; let html = '<div style="font-family:-apple-system,sans-serif;max-width:600px;margin:0 auto;">'; html += '<div style="background:#f59e0b;color:#fff;padding:16px;border-radius:8px 8px 0 0;"><h2 style="margin:0;">Anomalie detectee</h2></div>'; html += '<div style="padding:16px;background:#fffbeb;border:1px solid #f59e0b;border-top:none;border-radius:0 0 8px 8px;">'; html += '<p>Propriete : <strong>' + propName + '</strong></p>'; html += '<table style="width:100%;border-collapse:collapse;">'; html += '<tr style="background:#fef3c7;"><th style="padding:8px;text-align:left;">Type</th><th style="padding:8px;text-align:left;">Details</th></tr>'; for (const a of anomalies) { html += '<tr style="border-bottom:1px solid #e5e7eb;"><td style="padding:8px;">' + a.type + '</td><td style="padding:8px;">' + a.message + '</td></tr>'; } html += '</table>'; html += '<p style="margin-top:16px;"><a href="' + dashUrl + '/properties" style="background:#1a1a2e;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;">Voir mes biens</a></p>'; html += '</div></div>'; return html; })() }}` | HTML inline |
| options.replyTo | `={{ $('Config').item.json.SMTP_FROM_EMAIL }}` | Reply-to |

## Sortie attendue

```json
{
  "accepted": ["marc@exemple.fr"],
  "rejected": [],
  "messageId": "<msg-id@smtp>"
}
```

## Connexions

- **Entree** : HTTP: Post iCal Alert
- **Sortie** : Split In Batches (retour loop — bien suivant)

## Notes

- Credential SMTP - Loc Immo utilise pour l'envoi
- L'email est envoye au owner du bien (pas a l'admin)
- Le template HTML est inline (pas de fichier externe) pour simplicite
- Phase 2 : templates editables dans le dashboard
