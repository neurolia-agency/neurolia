# WF02 — iCal Sync

**Type** : Main workflow
**Trigger** : Schedule (*/30 min) + Webhook `/webhook/property-created`
**Nodes principaux** : Trigger → Config → Get Properties → Loop → Fetch iCal (Airbnb + Booking) → Parse .ics → Get DB Reservations → Compare → IF (anomalies) → HTTP Alert + Email
**Donnees entrantes** : iCal feeds (URLs stockees dans `properties`) + donnees DB existantes
**Donnees sortantes** : Reservations upsertees + anomalies detectees
**Sub-workflows** : N/A
**Webhook expose** : Oui — `POST /webhook/property-created` (App → n8n)
**Error handling** : Fetch fail → continue (skip property). URL expiree → log. Pas d'email owner trouvee → skip email, tenter HTTP.

## Flux detaille

### Flow A : Sync periodique (*/30 min)

1. **[Schedule Trigger]** → Cron `*/30 * * * *` (Europe/Paris)
2. **[Config]** → Charge variables : `DASHBOARD_URL`, `N8N_WEBHOOK_API_KEY`
3. **[Supabase: Get Properties]** → `SELECT * FROM properties WHERE is_active = true AND (ical_airbnb_url IS NOT NULL OR ical_booking_url IS NOT NULL)`
4. **[Split In Batches]** → Traite chaque bien individuellement
5. **[HTTP: Fetch iCal Airbnb]** → GET `ical_airbnb_url` (si presente)
6. **[HTTP: Fetch iCal Booking]** → GET `ical_booking_url` (si presente)
7. **[Code: Parse .ics]** → Parse RFC 5545 :
   - Extraire VEVENT (DTSTART, DTEND, SUMMARY, UID, DESCRIPTION)
   - Filtrer : futur 90 jours uniquement
   - Separer : vraies reservations vs periodes bloquees ("Not available", "Blocked", "Closed", "Indisponible")
   - Convertir dates YYYYMMDD → ISO
8. **[Supabase: Get Owner]** → Recuperer email owner (pour alertes)
9. **[Supabase: Get DB Reservations]** → `SELECT * FROM reservations WHERE property_id = ? AND check_in >= today - 7 AND check_out <= today + 90`
10. **[Code: Compare iCal vs DB]** → Detection anomalies avec tolerance 1 jour :
    - `missing_reservation` : iCal a une reservation, DB non
    - `missing_ical_block` : DB a une reservation, iCal non
    - `date_mismatch` : Dates different entre iCal et DB
    - Ignorer : `inquiry` type, periodes bloquees
11. **[Code: Build Upsert Payloads]** → Pour chaque reservation iCal sans match DB :
    ```json
    {
      "property_id": "uuid",
      "platform": "airbnb | booking",
      "source": "ical",
      "guest_name": "SUMMARY value",
      "check_in": "2026-03-15",
      "check_out": "2026-03-18",
      "ical_uid": "event-uid-123",
      "raw_ical_data": {}
    }
    ```
12. **[HTTP: POST /api/webhooks/n8n/reservation]** → Upsert reservations iCal
13. **[IF: Anomalies?]** → Si anomalies detectees
14. **[HTTP: POST /api/webhooks/n8n/ical-alert]** → Creer anomalie en base
15. **[Send Email]** → Email owner avec details anomalie + lien dashboard

### Flow B : Sync immediate (property.created)

1. **[Webhook: /webhook/property-created]** → Recoit `{ property_id, owner_id, name, ical_airbnb_url, ical_booking_url }`
2. **[Config]** → Memes variables que Flow A
3. **[Code: Format Property]** → Formate en objet property compatible
4. → Rejoint le pipeline Flow A a partir de l'etape 5 (Fetch iCal) pour ce bien uniquement

## Endpoints API utilises

| Methode | Endpoint | Usage |
|---------|----------|-------|
| POST | `/api/webhooks/n8n/reservation` | Upsert reservations iCal |
| POST | `/api/webhooks/n8n/ical-alert` | Signaler anomalies |
| GET | Supabase `properties` | Lister biens avec URLs iCal |
| GET | Supabase `reservations` | Comparer avec iCal |
| GET | Supabase `profiles` (owner) | Recuperer email owner |

## Credentials

| Credential | Type | Usage |
|------------|------|-------|
| Supabase - Loc Immo | Supabase | Acces DB (service_role) |
| Header Auth - API Key Dashboard | Header Auth | Authentification webhook App |
| SMTP - Loc Immo | SMTP | Envoi alertes email |

## Variables d'environnement

| Variable | Usage |
|----------|-------|
| `DASHBOARD_URL` | Base URL API App + liens emails |
| `N8N_WEBHOOK_API_KEY` | Cle API webhooks |

## Notes

- **Filet de securite** : WF02 est un filet de securite. La source principale est WF01 (email). iCal fournit des donnees basiques (pas de montant, pas d'email guest, pas de nb_guests fiable).
- **Reconciliation** : WF02 envoie `source: "ical"`. L'API gere le matching avec les reservations email existantes.
- **Tolerance dates** : 1 jour de tolerance pour comparer iCal vs DB (differences timezone).
- **Health Check** : Anciennement dans WF02 en v1, migre vers WF09 en v2 pour separation des responsabilites.
- **Batching** : Traitement sequentiel par bien pour eviter de surcharger les APIs iCal.
- **URLs expirees** : Si fetch iCal retourne 403/404, logger l'erreur dans `sync_logs` et notifier l'owner que l'URL doit etre regeneree.

---

**Version** : 2.0
**Feature(s)** : F03 (Ingestion iCal), F05 (Reconciliation input)
**Depend de** : Aucun
**Appelle** : Aucun
**Appele par** : App (webhook property.created), Schedule
