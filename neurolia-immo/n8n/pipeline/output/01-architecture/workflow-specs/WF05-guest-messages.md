> **⚠️ DEPRECATED v2.1** — Ce workflow est deprecie depuis la version 2.1.
> **Raison** : Le PRD interdit les emails voyageurs directs ("Emails voyageurs directs — NON"). Les adresses email voyageurs ne sont pas disponibles via iCal.
> **Alternatives** : F11 QR livret d'accueil (page statique), WF03 digest proprietaire.

# WF05 — Guest Auto Messages

**Type** : Main workflow
**Trigger** : Schedule 10:00 CET (pre-arrivee) + Schedule 14:00 CET (post-depart)
**Nodes principaux** : Trigger → Config → Get Reservations → Loop → Check Duplicate → Get Template + Property → Variable Replacement → Insert sent_message → Send Email → Update sent_message
**Donnees entrantes** : Reservations avec check_in demain (Flow B) ou check_out aujourd'hui (Flow C)
**Donnees sortantes** : Emails SMTP aux guests + logs dans `sent_messages`
**Sub-workflows** : N/A
**Webhook expose** : Non (Flow A desactive — voir Notes)
**Error handling** : Pas d'email guest → status = failed. SMTP fail → 2 retries (10s). Template inactive → skip. Deduplication via `sent_messages`.

## Flux detaille

### Flow B : Pre-arrivee (10:00 CET)

1. **[Schedule Trigger]** → Cron `0 10 * * *` (Europe/Paris)
2. **[Config]** → Charge variables : `DASHBOARD_URL`, `SMTP_FROM_EMAIL`, `SMTP_FROM_NAME`
3. **[Supabase: Get Reservations]** → `SELECT r.*, p.name AS property_name, p.access_code, wg.slug AS welcome_slug FROM reservations r JOIN properties p ON r.property_id = p.id LEFT JOIN welcome_guides wg ON wg.property_id = p.id AND wg.is_published = true WHERE r.check_in = TOMORROW AND r.status = 'confirmed'`
4. **[Split In Batches]** → Loop par reservation
5. **[Supabase: Check Duplicate]** → `SELECT * FROM sent_messages WHERE reservation_id = ? AND trigger_event = 'pre_arrival' AND status = 'sent'` → Si existe, skip
6. **[Code: Build Variables]** → Preparer variables de remplacement :
   - `{guest_name}` : Nom voyageur
   - `{property_name}` : Nom du bien
   - `{check_in}` : Date FR (ex: "samedi 15 mars 2026")
   - `{check_out}` : Date FR
   - `{welcome_link}` : `DASHBOARD_URL/welcome/{welcome_slug}` (si livret publie)
   - `{checkin_form_link}` : `DASHBOARD_URL/checkin/{reservation_id}`
   - `{access_code}` : Code d'acces du bien
7. **[Supabase: Insert sent_message]** → `INSERT INTO sent_messages (reservation_id, trigger_event, recipient_email, status) VALUES (?, 'pre_arrival', ?, 'pending')`
8. **[Send Email (SMTP)]** → Email guest :
   - Sujet : "Bienvenue — votre arrivee demain"
   - Corps : Infos pratiques + lien livret + lien formulaire pre-arrivee + code d'acces
9. **[Supabase: Update sent_message]** → `UPDATE sent_messages SET status = 'sent', sent_at = NOW() WHERE id = ?`
10. **[IF: Error?]** → Si echec SMTP : `UPDATE sent_messages SET status = 'failed', error_message = ?`

### Flow C : Post-depart (14:00 CET)

1. **[Schedule Trigger]** → Cron `0 14 * * *` (Europe/Paris)
2. **[Config]** → Memes variables
3. **[Supabase: Get Reservations]** → `SELECT r.*, p.name AS property_name FROM reservations r JOIN properties p ON r.property_id = p.id WHERE r.check_out = TODAY AND r.status = 'confirmed'`
4. **[Split In Batches]** → Loop par reservation
5. **[Supabase: Check Duplicate]** → Meme logique (trigger_event = 'post_departure')
6. **[Supabase: Insert sent_message]** → Status 'pending'
7. **[Send Email (SMTP)]** → Email guest :
   - Sujet : "Merci pour votre sejour"
   - Corps : Remerciement + demande d'avis (si lien disponible)
8. **[Supabase: Update sent_message]** → Status 'sent' ou 'failed'

## Endpoints API utilises

| Methode | Endpoint | Usage |
|---------|----------|-------|
| GET | Supabase `reservations` + join `properties` + join `welcome_guides` | Reservations du jour |
| GET | Supabase `sent_messages` | Verification deduplication |
| POST | Supabase `sent_messages` | Log message pending |
| PATCH | Supabase `sent_messages` | Update status sent/failed |

## Credentials

| Credential | Type | Usage |
|------------|------|-------|
| Supabase - Loc Immo | Supabase | Acces DB (service_role) |
| SMTP - Loc Immo | SMTP | Envoi emails guests |

## Variables d'environnement

| Variable | Usage |
|----------|-------|
| `DASHBOARD_URL` | Base URL pour liens welcome/checkin |
| `SMTP_FROM_EMAIL` | Expediteur |
| `SMTP_FROM_NAME` | Nom expediteur |

## Notes

- **Flow A desactive** : Les emails de confirmation voyage (Flow A dans v1) sont supprimes en v2. Les plateformes Airbnb/Booking envoient deja des confirmations — les doubler cree de la confusion (v1 Patch 1 WF05).
- **Email guest non disponible** : Si `guest_email` est null (cas courant pour les reservations iCal), le message est marque `failed` avec `error_message = 'Email voyageur non disponible'`. Ce n'est PAS une erreur critique.
- **Deduplication** : Verification stricte dans `sent_messages` avant envoi. Evite les doublons en cas de re-execution du workflow.
- **Templates** : Les emails sont en HTML avec variables `{variable}` remplacees dynamiquement. Phase 2 : templates editables dans le dashboard.
- **Sent Messages table** : Table `sent_messages` non presente dans le data model initial — a ajouter si necessaire, ou utiliser `sync_logs` avec type `email_sent`.

---

**Version** : 2.0
**Feature(s)** : F10 (Notifications), F11 (Livret Accueil — lien welcome)
**Depend de** : Aucun
**Appelle** : Aucun
**Appele par** : Schedule (cron)
