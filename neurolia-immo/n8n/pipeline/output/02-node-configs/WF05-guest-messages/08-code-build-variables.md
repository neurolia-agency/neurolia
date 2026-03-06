> **⚠️ DEPRECATED v2.1** — Voir WF05-guest-messages.md pour justification.

# Node: Code: Build Variables

**Type** : code
**Mode** : Run Once for Each Item

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| language | javaScript | Code JavaScript |
| mode | runOnceForEachItem | Par reservation |

## Code

**Langage** : JavaScript

```javascript
// ============================================================
// WF05 — Build email variables for guest messages
// Supports pre_arrival (Flow B) and post_departure (Flow C)
// ============================================================

const config = $('Config').item.json;
const reservation = $('Split In Batches').item.json;

const prop = reservation.properties || {};
const welcomeGuide = reservation.welcome_guides || {};

// Detect flow type based on dates
const today = new Date().toISOString().slice(0, 10);
const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
const isPreArrival = reservation.check_in === tomorrow;
const triggerEvent = isPreArrival ? 'pre_arrival' : 'post_departure';

// Format dates in FR
const formatDateFR = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
};

const guestName = reservation.guest_name || 'Cher voyageur';
const propertyName = prop.name || '';
const checkInFR = formatDateFR(reservation.check_in);
const checkOutFR = formatDateFR(reservation.check_out);
const accessCode = prop.access_code || '';
const welcomeSlug = welcomeGuide.slug || null;
const welcomeLink = welcomeSlug ? `${config.DASHBOARD_URL}/welcome/${welcomeSlug}` : null;
const checkinFormLink = `${config.DASHBOARD_URL}/checkin/${reservation.id}`;

// --- Build email content ---
let subject, html;

if (isPreArrival) {
  subject = `Bienvenue — votre arrivee le ${checkInFR}`;

  html = `<div style="font-family:-apple-system,sans-serif;max-width:600px;margin:0 auto;">
    <div style="background:#1a1a2e;color:#fff;padding:20px;border-radius:8px 8px 0 0;">
      <h2 style="margin:0;">Bienvenue, ${guestName} !</h2>
      <p style="margin:4px 0 0 0;opacity:0.8;">Votre arrivee approche</p>
    </div>
    <div style="padding:20px;">
      <p>Nous avons hate de vous accueillir au <strong>${propertyName}</strong> le <strong>${checkInFR}</strong>.</p>
      <h3>Informations pratiques</h3>
      ${accessCode ? `<p><strong>Code d'acces :</strong> <span style="font-size:20px;font-weight:bold;letter-spacing:2px;background:#f3f4f6;padding:4px 12px;border-radius:4px;">${accessCode}</span></p>` : ''}
      ${welcomeLink ? `<p><a href="${welcomeLink}" style="display:inline-block;background:#6366f1;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;">Consulter le livret d'accueil</a></p>` : ''}
      <p><a href="${checkinFormLink}" style="display:inline-block;background:#1a1a2e;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;">Remplir le formulaire de pre-arrivee</a></p>
      <p style="color:#6b7280;font-size:13px;">Ce formulaire nous aide a preparer au mieux votre sejour.</p>
    </div>
  </div>`;
} else {
  subject = `Merci pour votre sejour — ${propertyName}`;

  html = `<div style="font-family:-apple-system,sans-serif;max-width:600px;margin:0 auto;">
    <div style="background:#1a1a2e;color:#fff;padding:20px;border-radius:8px 8px 0 0;">
      <h2 style="margin:0;">Merci, ${guestName} !</h2>
    </div>
    <div style="padding:20px;">
      <p>Nous esperons que votre sejour au <strong>${propertyName}</strong> s'est bien passe.</p>
      <p>Votre avis compte beaucoup pour nous. N'hesitez pas a laisser un commentaire sur la plateforme de reservation.</p>
      <p>A bientot !</p>
    </div>
  </div>`;
}

// Check if guest email is available
const hasEmail = !!reservation.guest_email;

return [{
  json: {
    reservation_id: reservation.id,
    guest_email: reservation.guest_email,
    guest_name: guestName,
    property_name: propertyName,
    trigger_event: triggerEvent,
    has_email: hasEmail,
    subject: subject,
    html: html
  }
}];
```

## Sortie attendue

```json
{
  "reservation_id": "uuid-resa",
  "guest_email": "jean@email.com",
  "guest_name": "Jean Dupont",
  "property_name": "Studio Marais",
  "trigger_event": "pre_arrival",
  "has_email": true,
  "subject": "Bienvenue — votre arrivee le samedi 21 fevrier 2026",
  "html": "<div>...</div>"
}
```

## Connexions

- **Entree** : IF: Already Sent? (sortie true)
- **Sortie** : HTTP: Insert sent_message
