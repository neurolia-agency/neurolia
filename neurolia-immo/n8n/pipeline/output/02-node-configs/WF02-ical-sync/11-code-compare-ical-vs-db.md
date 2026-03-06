# Node: Code: Compare iCal vs DB

**Type** : code
**Mode** : Run Once for Each Item

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| -- | -- | Acces via `$('Code: Parse .ics')` et `$('HTTP: Get DB Reservations')` |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| language | javaScript | Code JavaScript |
| mode | runOnceForEachItem | Par bien |

## Code

**Langage** : JavaScript

```javascript
// ============================================================
// WF02 — Compare iCal vs DB
// Detecter anomalies avec tolerance 1 jour (timezone differences)
// ============================================================

const icalData = $('Code: Parse .ics').item.json;
const dbReservations = $('HTTP: Get DB Reservations').all().map(i => i.json);
// Si le resultat est un tableau dans un seul item
const dbResaArray = Array.isArray(dbReservations[0]) ? dbReservations[0] : dbReservations;
const icalReservations = icalData.reservations || [];

const TOLERANCE_DAYS = 1;

// --- Helper : comparer dates avec tolerance ---
function datesMatch(date1, date2, tolerance) {
  if (!date1 || !date2) return false;
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffMs = Math.abs(d1 - d2);
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays <= tolerance;
}

// --- Helper : trouver un match DB pour une reservation iCal ---
function findDbMatch(icalEvent, dbList) {
  // 1. Match par ical_uid exact
  if (icalEvent.uid) {
    const uidMatch = dbList.find(db => db.ical_uid === icalEvent.uid);
    if (uidMatch) return { match: uidMatch, method: 'ical_uid' };
  }

  // 2. Match par platform_ref_id (si present dans description/summary)
  if (icalEvent.description) {
    const refMatch = dbList.find(db =>
      db.platform_ref_id && icalEvent.description.includes(db.platform_ref_id)
    );
    if (refMatch) return { match: refMatch, method: 'platform_ref_id' };
  }

  // 3. Match par dates + platform (avec tolerance)
  const dateMatch = dbList.find(db =>
    db.platform === icalEvent.platform &&
    datesMatch(db.check_in, icalEvent.check_in, TOLERANCE_DAYS) &&
    datesMatch(db.check_out, icalEvent.check_out, TOLERANCE_DAYS)
  );
  if (dateMatch) return { match: dateMatch, method: 'dates_platform' };

  // 4. Match par dates uniquement (cross-platform, tolerance 0)
  const crossMatch = dbList.find(db =>
    datesMatch(db.check_in, icalEvent.check_in, 0) &&
    datesMatch(db.check_out, icalEvent.check_out, 0)
  );
  if (crossMatch) return { match: crossMatch, method: 'dates_cross_platform' };

  return null;
}

const anomalies = [];
const upsertPayloads = [];
const matchedDbIds = new Set();

// --- 1. Pour chaque reservation iCal, chercher un match DB ---
for (const icalEvent of icalReservations) {
  const result = findDbMatch(icalEvent, dbResaArray);

  if (!result) {
    // iCal a une reservation, DB non → missing_reservation
    anomalies.push({
      type: 'missing_reservation',
      severity: 'warning',
      message: `Reservation iCal non trouvee en DB`,
      ical_event: {
        uid: icalEvent.uid,
        summary: icalEvent.summary,
        check_in: icalEvent.check_in,
        check_out: icalEvent.check_out,
        platform: icalEvent.platform
      }
    });

    // Creer un payload upsert
    upsertPayloads.push({
      property_id: icalData.property_id,
      platform: icalEvent.platform,
      source: 'ical',
      guest_name: icalEvent.summary || 'Voyageur iCal',
      check_in: icalEvent.check_in,
      check_out: icalEvent.check_out,
      ical_uid: icalEvent.uid,
      raw_ical_data: {
        summary: icalEvent.summary,
        description: icalEvent.description,
        dtstart: icalEvent.raw_dtstart,
        dtend: icalEvent.raw_dtend
      }
    });
  } else {
    matchedDbIds.add(result.match.id);

    // Verifier date_mismatch (si match par uid/ref mais dates differentes)
    if (result.method === 'ical_uid' || result.method === 'platform_ref_id') {
      if (!datesMatch(result.match.check_in, icalEvent.check_in, 0) ||
          !datesMatch(result.match.check_out, icalEvent.check_out, 0)) {
        anomalies.push({
          type: 'date_mismatch',
          severity: 'warning',
          message: `Dates differentes entre iCal et DB`,
          db_reservation: {
            id: result.match.id,
            check_in: result.match.check_in,
            check_out: result.match.check_out
          },
          ical_event: {
            uid: icalEvent.uid,
            check_in: icalEvent.check_in,
            check_out: icalEvent.check_out
          }
        });
      }
    }
  }
}

// --- 2. Pour chaque reservation DB, verifier si elle est dans iCal ---
for (const dbResa of dbResaArray) {
  if (matchedDbIds.has(dbResa.id)) continue;
  if (dbResa.status === 'cancelled') continue;

  // DB a une reservation, iCal non → missing_ical_block
  // Ne pas alerter pour les reservations source "ical" (reconciliation normale)
  if (dbResa.source !== 'ical') {
    anomalies.push({
      type: 'missing_ical_block',
      severity: 'info',
      message: `Reservation DB non trouvee dans iCal`,
      db_reservation: {
        id: dbResa.id,
        guest_name: dbResa.guest_name,
        check_in: dbResa.check_in,
        check_out: dbResa.check_out,
        platform: dbResa.platform,
        source: dbResa.source
      }
    });
  }
}

// Ajouter fetch errors comme anomalies
for (const fetchErr of (icalData.fetch_errors || [])) {
  anomalies.push({
    type: 'fetch_error',
    severity: 'error',
    message: `Erreur fetch iCal ${fetchErr.platform}`,
    platform: fetchErr.platform,
    error: fetchErr.error
  });
}

return [{
  json: {
    property_id: icalData.property_id,
    property_name: icalData.property_name,
    owner_id: icalData.owner_id,
    upsert_payloads: upsertPayloads,
    anomalies: anomalies,
    has_anomalies: anomalies.length > 0,
    has_upserts: upsertPayloads.length > 0,
    stats: {
      ical_reservations: icalReservations.length,
      db_reservations: dbResaArray.length,
      matched: matchedDbIds.size,
      new_from_ical: upsertPayloads.length,
      anomalies_count: anomalies.length
    },
    synced_at: icalData.synced_at
  }
}];
```

## Sortie attendue

```json
{
  "property_id": "uuid-property-1",
  "property_name": "Studio Marais",
  "owner_id": "uuid-owner-1",
  "upsert_payloads": [],
  "anomalies": [],
  "has_anomalies": false,
  "has_upserts": false,
  "stats": {
    "ical_reservations": 3,
    "db_reservations": 3,
    "matched": 3,
    "new_from_ical": 0,
    "anomalies_count": 0
  },
  "synced_at": "2026-02-20T10:30:00.000Z"
}
```

## Connexions

- **Entree** : HTTP: Get DB Reservations
- **Sortie** : IF: Has Upserts?
