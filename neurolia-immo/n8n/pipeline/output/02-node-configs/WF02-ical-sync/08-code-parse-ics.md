# Node: Code: Parse .ics

**Type** : code
**Mode** : Run Once for Each Item

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| -- | -- | Acces via `$('HTTP: Fetch iCal Airbnb')` et `$('HTTP: Fetch iCal Booking')` |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| language | javaScript | Code JavaScript |
| mode | runOnceForEachItem | Par bien |

## Code

**Langage** : JavaScript

```javascript
// ============================================================
// WF02 — Parse iCal feeds (RFC 5545)
// Extraire VEVENT, filtrer futur 90 jours, separer reservations vs blocked
// ============================================================

const property = $('Split In Batches').item.json;
const airbnbRaw = $('HTTP: Fetch iCal Airbnb').item.json.data || "";
const bookingRaw = $('HTTP: Fetch iCal Booking').item.json.data || "";

const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const future90 = new Date(today);
future90.setDate(future90.getDate() + 90);
const past7 = new Date(today);
past7.setDate(past7.getDate() - 7);

// --- Parser VEVENT ---
function parseIcalEvents(icalData, platform) {
  if (!icalData || !icalData.includes('BEGIN:VEVENT')) return [];

  const events = [];
  const vevents = icalData.split('BEGIN:VEVENT');

  for (let i = 1; i < vevents.length; i++) {
    const block = vevents[i].split('END:VEVENT')[0];

    const getField = (name) => {
      const regex = new RegExp(`${name}[^:]*:(.*)`, 'i');
      const match = block.match(regex);
      return match ? match[1].trim() : null;
    };

    const dtstart = getField('DTSTART');
    const dtend = getField('DTEND');
    const summary = getField('SUMMARY') || '';
    const uid = getField('UID') || '';
    const description = getField('DESCRIPTION') || '';

    if (!dtstart || !dtend) continue;

    // Convertir YYYYMMDD → Date
    const parseDate = (str) => {
      if (!str) return null;
      const clean = str.replace(/[^0-9]/g, '').substring(0, 8);
      if (clean.length < 8) return null;
      return new Date(
        parseInt(clean.substring(0, 4)),
        parseInt(clean.substring(4, 6)) - 1,
        parseInt(clean.substring(6, 8))
      );
    };

    const checkIn = parseDate(dtstart);
    const checkOut = parseDate(dtend);

    if (!checkIn || !checkOut) continue;

    // Filtrer : futur 90 jours + 7 jours passe
    if (checkOut < past7 || checkIn > future90) continue;

    // Determiner si c'est une reservation ou un blocage
    const blockedKeywords = ['not available', 'blocked', 'closed', 'indisponible', 'airbnb (not available)'];
    const isBlocked = blockedKeywords.some(kw => summary.toLowerCase().includes(kw));

    const formatDate = (d) => {
      return d.getFullYear() + '-' +
        String(d.getMonth() + 1).padStart(2, '0') + '-' +
        String(d.getDate()).padStart(2, '0');
    };

    events.push({
      uid: uid,
      summary: summary,
      description: description,
      check_in: formatDate(checkIn),
      check_out: formatDate(checkOut),
      platform: platform,
      is_blocked: isBlocked,
      is_reservation: !isBlocked,
      property_id: property.id,
      raw_dtstart: dtstart,
      raw_dtend: dtend
    });
  }

  return events;
}

const airbnbEvents = parseIcalEvents(airbnbRaw, 'airbnb');
const bookingEvents = parseIcalEvents(bookingRaw, 'booking');

// Separer reservations et blocages
const allEvents = [...airbnbEvents, ...bookingEvents];
const reservations = allEvents.filter(e => e.is_reservation);
const blocked = allEvents.filter(e => e.is_blocked);

// Detecter les erreurs de fetch
const fetchErrors = [];
if (property.ical_airbnb_url && !airbnbRaw) {
  fetchErrors.push({ platform: 'airbnb', error: 'Fetch failed or empty response' });
}
if (property.ical_booking_url && !bookingRaw) {
  fetchErrors.push({ platform: 'booking', error: 'Fetch failed or empty response' });
}

return [{
  json: {
    property_id: property.id,
    property_name: property.name,
    owner_id: property.owner_id,
    reservations: reservations,
    blocked_periods: blocked,
    total_events: allEvents.length,
    total_reservations: reservations.length,
    total_blocked: blocked.length,
    fetch_errors: fetchErrors,
    synced_at: new Date().toISOString()
  }
}];
```

## Sortie attendue

```json
{
  "property_id": "uuid-property-1",
  "property_name": "Studio Marais",
  "owner_id": "uuid-owner-1",
  "reservations": [
    {
      "uid": "event-123@airbnb.com",
      "summary": "Jean Dupont",
      "description": "HMXXXXXXXXXX",
      "check_in": "2026-03-15",
      "check_out": "2026-03-18",
      "platform": "airbnb",
      "is_blocked": false,
      "is_reservation": true,
      "property_id": "uuid-property-1"
    }
  ],
  "blocked_periods": [],
  "total_events": 1,
  "total_reservations": 1,
  "total_blocked": 0,
  "fetch_errors": [],
  "synced_at": "2026-02-20T10:30:00.000Z"
}
```

## Connexions

- **Entree** : HTTP: Fetch iCal Booking
- **Sortie** : HTTP: Get DB Reservations
