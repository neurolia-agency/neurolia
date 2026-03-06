# WF01 — Email Parser

**Type** : Main workflow
**Trigger** : IMAP Email Trigger (polling */2 min) + Webhook `/webhook/imap-configured`
**Nodes principaux** : Trigger → Config → Router (Airbnb/Booking/Unknown) → Parser → Type Detector → Payload Builder → HTTP Upsert → IF (new confirmed) → Webhook WF04
**Donnees entrantes** : Email brut (HTML + headers) depuis IMAP, ou payload webhook `{ property_id, owner_id, imap_host, imap_email }`
**Donnees sortantes** : Reservation upsertee via API + tache menage declenchee
**Sub-workflows** : N/A
**Webhook expose** : Oui — `POST /webhook/imap-configured` (App → n8n)
**Error handling** : Parsing partiel → email alerte owner. HTTP fail → 2 retries (5s). Email inconnu → alerte avec sujet original.

## Flux detaille

### Flow A : IMAP Polling (principal)

1. **[IMAP Trigger]** → Recoit nouvel email depuis `reservations@locimmo.fr` (polling 2 min)
2. **[Config]** → Charge variables : `DASHBOARD_URL`, `N8N_WF04_WEBHOOK_URL`, `N8N_WEBHOOK_API_KEY`
3. **[Switch: Email Router]** → Route selon expediteur :
   - `*@airbnb.com` → Parser Airbnb
   - `*@booking.com` → Parser Booking
   - Autre → Alerte email inconnu
4. **[Code: Parser Airbnb/Booking]** → Extraction regex :
   - `guestName` : Nom voyageur
   - `checkIn`, `checkOut` : Dates (format FR → ISO)
   - `checkInTime`, `checkOutTime` : Heures d'arrivee/depart
   - `nbGuests` : Nombre de personnes
   - `amount` : Montant (EUR)
   - `platformRefId` : Reference plateforme (HMXXXXXX)
   - `propertyName` : Nom du bien (extraction titre)
   - `_isPartialParse` : Indicateur qualite parsing
5. **[Switch: Type Detector]** → Detecte le type d'email :
   - `confirmation` : Reservation confirmee
   - `modification` : Dates ou montant modifies
   - `cancellation` : Annulation
   - `inquiry` : Demande de renseignement (ignore)
   - `unknown` : Non reconnu
6. **[Code: Payload Builder]** → Construit le payload `reservation.upsert` :
   ```json
   {
     "property_id": "resolve via propertyName → DB lookup",
     "platform": "airbnb | booking",
     "platform_ref_id": "HMXXXXXX",
     "status": "confirmed | modified | cancelled",
     "source": "email",
     "guest_name": "...",
     "guest_email": "null (non disponible)",
     "nb_guests": 2,
     "check_in": "2026-03-15",
     "check_out": "2026-03-18",
     "amount": 450.00,
     "email_message_id": "<msg-id@airbnb.com>",
     "raw_email_data": {}
   }
   ```
7. **[HTTP: POST /api/webhooks/n8n/reservation]** → Upsert reservation cote App
   - Headers : `x-api-key`, `x-idempotency-key`
   - Retry : 2 tentatives, delay 5s
8. **[IF: New Confirmed?]** → Si `action=created` et `status=confirmed`
9. **[HTTP: POST /webhook/wf04-cleaning-task]** → Declenche WF04 avec les donnees reservation

### Flow B : Webhook imap.configured (premier parsing)

1. **[Webhook: /webhook/imap-configured]** → Recoit `{ property_id, owner_id, imap_host, imap_email }`
2. **[Config]** → Memes variables que Flow A
3. **[Code: First Run]** → Force un premier scan IMAP pour ce proprietaire
   - Connecte au serveur IMAP avec les credentials
   - Scanne les 30 derniers jours
   - Meme pipeline de parsing que Flow A (etapes 3-9)

## Endpoints API utilises

| Methode | Endpoint | Usage |
|---------|----------|-------|
| POST | `/api/webhooks/n8n/reservation` | Upsert reservation parsee |
| GET | Supabase `properties` | Lookup property_id par nom |
| POST | `/webhook/wf04-cleaning-task` (n8n) | Declenchement creation tache |

## Credentials

| Credential | Type | Usage |
|------------|------|-------|
| IMAP - Reservations | IMAP | Lecture boite email |
| Header Auth - API Key Dashboard | Header Auth | Authentification webhook App |

## Variables d'environnement

| Variable | Usage |
|----------|-------|
| `DASHBOARD_URL` | Base URL API App |
| `N8N_WEBHOOK_API_KEY` | Cle API webhooks |
| `N8N_WF04_WEBHOOK_URL` | URL webhook WF04 |
| `ADMIN_EMAIL` | Destinataire alertes parsing |

## Notes

- **Reconciliation** : WF01 envoie `source: "email"`. L'API cote App (`/api/webhooks/n8n/reservation`) gere la reconciliation avec les donnees iCal (F05). n8n n'a pas de logique de reconciliation.
- **Property lookup** : Le parser extrait `propertyName` depuis l'email. Un lookup Supabase resolut le `property_id`. Si pas de match → alerte owner.
- **v1 → v2** : Suppression de l'appel a WF05 Flow A (confirmations duplicates — desactive depuis Patch 1 v1)
- **Partial parse** : Si des champs critiques manquent (`checkIn`, `checkOut`), `_isPartialParse = true` et une alerte est envoyee au owner pour verification manuelle
- **Email type default** : `unknown` (pas `confirmation`) — requiert match positif pour eviter faux positifs (v1 Patch 4)

---

**Version** : 2.0
**Feature(s)** : F04 (Email Parsing), F05 (Reconciliation input)
**Depend de** : Aucun
**Appelle** : WF04 (Cleaning Tasks)
**Appele par** : App (webhook imap.configured)
