# Node: Code: Health Checks

**Type** : code
**Mode** : Run Once for All Items

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| language | javaScript | Code JavaScript |
| mode | runOnceForAllItems | Traite toutes les proprietes |

## Code

**Langage** : JavaScript

```javascript
// ============================================================
// WF09 — Health checks: iCal syncs + IMAP syncs
// Check sync_logs for each property, detect stale/error/never_synced
// ============================================================

const config = $('Config').first().json;
const propertiesRaw = $('HTTP: Get Active Properties').all().map(i => i.json);
const properties = Array.isArray(propertiesRaw[0]) ? propertiesRaw[0] : propertiesRaw;

const supabaseUrl = config.SUPABASE_URL;
const supabaseKey = config.SUPABASE_SERVICE_KEY;
const headers = {
  'apikey': supabaseKey,
  'Authorization': `Bearer ${supabaseKey}`
};

const now = new Date();
const results = [];

// Thresholds (in milliseconds)
const ICAL_WARNING_MS = 60 * 60 * 1000;       // 1 hour
const ICAL_ERROR_MS = 2 * 60 * 60 * 1000;     // 2 hours
const IMAP_WARNING_MS = 5 * 60 * 1000;         // 5 minutes
const IMAP_ERROR_MS = 10 * 60 * 1000;          // 10 minutes

for (const property of properties) {
  if (!property.id) continue;

  const propResult = {
    property_id: property.id,
    property_name: property.name,
    owner_email: property.profiles ? property.profiles.email : null,
    owner_name: property.profiles ? property.profiles.display_name : null,
    ical_status: 'n/a',
    imap_status: 'n/a',
    last_ical_sync: null,
    last_imap_sync: null,
    issues: []
  };

  // --- Check iCal syncs ---
  if (property.ical_airbnb_url || property.ical_booking_url) {
    try {
      const icalRes = await fetch(
        `${supabaseUrl}/rest/v1/sync_logs?property_id=eq.${property.id}&source=like.ical_*&order=synced_at.desc&limit=5`,
        { headers }
      );
      const icalLogs = await icalRes.json();

      if (!icalLogs || icalLogs.length === 0) {
        propResult.ical_status = 'error';
        propResult.issues.push({ type: 'never_synced', severity: 'error', message: 'Aucune sync iCal enregistree' });
      } else {
        const lastSync = new Date(icalLogs[0].synced_at);
        propResult.last_ical_sync = icalLogs[0].synced_at;
        const ageMs = now - lastSync;

        // Check for consecutive errors
        const consecutiveErrors = icalLogs.filter(l => l.status === 'error').length;

        if (icalLogs[0].status === 'error') {
          propResult.ical_status = consecutiveErrors >= 3 ? 'error' : 'warning';
          propResult.issues.push({
            type: consecutiveErrors >= 3 ? 'persistent_error' : 'sync_error',
            severity: consecutiveErrors >= 3 ? 'error' : 'warning',
            message: `Derniere sync en erreur${consecutiveErrors >= 3 ? ` (${consecutiveErrors} erreurs consecutives)` : ''}`
          });
        } else if (ageMs > ICAL_ERROR_MS) {
          propResult.ical_status = 'error';
          propResult.issues.push({ type: 'stale_sync', severity: 'error', message: `Derniere sync iCal > 2 heures (${Math.round(ageMs / 60000)} min)` });
        } else if (ageMs > ICAL_WARNING_MS) {
          propResult.ical_status = 'warning';
          propResult.issues.push({ type: 'stale_sync', severity: 'warning', message: `Derniere sync iCal > 1 heure (${Math.round(ageMs / 60000)} min)` });
        } else {
          propResult.ical_status = 'ok';
        }
      }
    } catch (err) {
      propResult.ical_status = 'error';
      propResult.issues.push({ type: 'check_failed', severity: 'error', message: `Erreur verification iCal: ${err.message}` });
    }
  }

  // --- Check IMAP syncs ---
  // IMAP is global, not per-property — check once
  if (property === properties[0]) {
    try {
      const imapRes = await fetch(
        `${supabaseUrl}/rest/v1/sync_logs?source=eq.imap&order=synced_at.desc&limit=5`,
        { headers }
      );
      const imapLogs = await imapRes.json();

      if (imapLogs && imapLogs.length > 0) {
        const lastImapSync = new Date(imapLogs[0].synced_at);
        const imapAgeMs = now - lastImapSync;

        const imapErrors = imapLogs.filter(l => l.status === 'error').length;

        if (imapLogs[0].status === 'error' && imapErrors >= 5) {
          propResult.imap_status = 'error';
          propResult.issues.push({ type: 'imap_error', severity: 'error', message: `IMAP en erreur (${imapErrors} erreurs consecutives)` });
        } else if (imapAgeMs > IMAP_ERROR_MS) {
          propResult.imap_status = 'error';
          propResult.issues.push({ type: 'stale_imap', severity: 'error', message: `Derniere sync IMAP > 10 min (${Math.round(imapAgeMs / 60000)} min)` });
        } else if (imapAgeMs > IMAP_WARNING_MS) {
          propResult.imap_status = 'warning';
          propResult.issues.push({ type: 'stale_imap', severity: 'warning', message: `Derniere sync IMAP > 5 min (${Math.round(imapAgeMs / 60000)} min)` });
        } else {
          propResult.imap_status = 'ok';
        }

        propResult.last_imap_sync = imapLogs[0].synced_at;
      }
    } catch (err) {
      propResult.issues.push({ type: 'check_failed', severity: 'error', message: `Erreur verification IMAP: ${err.message}` });
    }
  }

  results.push(propResult);
}

// Aggregate
const totalProperties = results.length;
const healthy = results.filter(r => r.issues.length === 0).length;
const withWarnings = results.filter(r => r.issues.some(i => i.severity === 'warning') && !r.issues.some(i => i.severity === 'error')).length;
const withErrors = results.filter(r => r.issues.some(i => i.severity === 'error')).length;

return [{
  json: {
    total_properties: totalProperties,
    healthy: healthy,
    warnings: withWarnings,
    errors: withErrors,
    has_issues: withWarnings > 0 || withErrors > 0,
    details: results,
    checked_at: now.toISOString()
  }
}];
```

## Sortie attendue

```json
{
  "total_properties": 5,
  "healthy": 3,
  "warnings": 1,
  "errors": 1,
  "has_issues": true,
  "details": [
    {
      "property_name": "Studio Marais",
      "owner_email": "marc@exemple.fr",
      "ical_status": "ok",
      "imap_status": "warning",
      "last_ical_sync": "2026-02-20T10:30:00Z",
      "last_imap_sync": "2026-02-20T09:55:00Z",
      "issues": [{ "type": "stale_imap", "severity": "warning", "message": "..." }]
    }
  ],
  "checked_at": "2026-02-20T12:00:00Z"
}
```

## Connexions

- **Entree** : HTTP: Get Active Properties
- **Sortie** : IF: Issues Found?
