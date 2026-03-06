# Donnees de test — Dashboard Loc Immo

Donnees inserees en base (Supabase) pour les tests des workflows n8n.
Dernier dump : 2026-02-13

---

## UUIDs de reference

| Ressource | UUID |
|-----------|------|
| Owner (Dorian) | `daaefdc3-fc7c-4b3a-b848-e35f34db18bb` |
| Staff (Fatima) | `1009f18f-8fb8-4ca4-aeb3-6aa092b9ef05` |
| Property (Villa Sidi Kaouki) | `06f47a84-9b8f-4da2-9316-9783b5259398` |
| Reservation test | `00000000-0000-0000-0000-000000000001` |
| Cleaning task (checkin_prep) | `986f5328-8fc2-4b41-9587-9824ba90e0f9` |
| Cleaning task (checkout_clean) | `9af616c2-506b-4eaf-80c8-185074e45ff6` |

---

## Utilisateurs

| UUID | Email | Nom | Role |
|------|-------|-----|------|
| `daaefdc3-fc7c-4b3a-b848-e35f34db18bb` | `dorian.gustiez@gmail.com` | Dorian Gustiez | `owner` |
| `1009f18f-8fb8-4ca4-aeb3-6aa092b9ef05` | `dorian.gustiez2@gmail.com` | Fatima | `cleaning_staff` |

---

## Propriete : Villa Sidi Kaouki

| Champ | Valeur |
|-------|--------|
| `id` | `06f47a84-9b8f-4da2-9316-9783b5259398` |
| `owner_id` | `daaefdc3-fc7c-4b3a-b848-e35f34db18bb` |
| `name` | `Villa Sidi Kaouki` |
| `address` | `Douar Sidi Kaouki, Route d'Essaouira` |
| `city` | `Essaouira` |
| `access_code` | `1234B` |
| `wifi_ssid` | `Villa-Kaouki` |
| `wifi_password` | `mdp-wifi-123` |
| `max_guests` | `4` |
| `is_active` | `true` |
| `ical_airbnb_url` | `null` |
| `ical_booking_url` | `null` |
| `welcome_guide` | `{}` |

---

## Reservation test

| Champ | Valeur |
|-------|--------|
| `id` | `00000000-0000-0000-0000-000000000001` |
| `property_id` | `06f47a84-9b8f-4da2-9316-9783b5259398` |
| `guest_id` | `null` |
| `platform` | `manual` |
| `platform_ref_id` | `null` |
| `status` | `confirmed` |
| `check_in` | `2026-02-20` |
| `check_out` | `2026-02-23` |
| `nb_guests` | `2` |
| `amount` | `null` |
| `guest_message` | `null` |
| `arrival_time` | `null` |
| `special_requests` | `null` |
| `checkin_token` | `null` |

---

## Cleaning tasks (creees par WF04)

| UUID | Type | Date | Assignee |
|------|------|------|----------|
| `986f5328-8fc2-4b41-9587-9824ba90e0f9` | `checkin_prep` | `2026-02-20` | Fatima |
| `9af616c2-506b-4eaf-80c8-185074e45ff6` | `checkout_clean` | `2026-02-23` | Fatima |

---

## Configuration n8n

| Cle | Valeur |
|-----|--------|
| Instance URL | `https://n8n.srv1207220.hstgr.cloud` |
| Webhook test path | `/webhook-test/` |
| Webhook prod path | `/webhook/` |
| API Key (x-api-key) | `8708c0a6d4766898a2293e41d5137b4b11b3e497a37fc043416b2f823079ca27` |
| OWNER_EMAIL (n8n var) | `dorian.gustiez@gmail.com` |

---

## Payloads de test

### WF04 — Cleaning Tasks (teste avec succes)

```bash
curl -X POST "https://n8n.srv1207220.hstgr.cloud/webhook-test/wf04-cleaning-task" \
  -H "Content-Type: application/json" \
  -H "x-api-key: 8708c0a6d4766898a2293e41d5137b4b11b3e497a37fc043416b2f823079ca27" \
  -d '{
    "id": "00000000-0000-0000-0000-000000000001",
    "property_id": "06f47a84-9b8f-4da2-9316-9783b5259398",
    "check_in": "2026-02-20",
    "check_out": "2026-02-23",
    "guest_name": "Jean Test",
    "nb_guests": 2
  }'
```

### WF06 — Checkin Form Notify (a tester)

**Test 1 : Prioritaire** (contient "bebe" + "lit bebe")
```bash
curl -X POST "https://n8n.srv1207220.hstgr.cloud/webhook-test/wf06-checkin-notify" \
  -H "Content-Type: application/json" \
  -H "x-api-key: 8708c0a6d4766898a2293e41d5137b4b11b3e497a37fc043416b2f823079ca27" \
  -d '{
    "reservationId": "00000000-0000-0000-0000-000000000001",
    "guestName": "Jean Test",
    "propertyName": "Villa Sidi Kaouki",
    "propertyId": "06f47a84-9b8f-4da2-9316-9783b5259398",
    "checkIn": "2026-02-20",
    "checkOut": "2026-02-23",
    "arrivalTime": "15:00",
    "specialRequests": "Nous arrivons avec un bebe, est-il possible d avoir un lit bebe ?",
    "nbGuests": 2
  }'
```

**Test 2 : Standard** (pas de mots-cles prioritaires)
```bash
curl -X POST "https://n8n.srv1207220.hstgr.cloud/webhook-test/wf06-checkin-notify" \
  -H "Content-Type: application/json" \
  -H "x-api-key: 8708c0a6d4766898a2293e41d5137b4b11b3e497a37fc043416b2f823079ca27" \
  -d '{
    "reservationId": "00000000-0000-0000-0000-000000000001",
    "guestName": "Jean Test",
    "propertyName": "Villa Sidi Kaouki",
    "propertyId": "06f47a84-9b8f-4da2-9316-9783b5259398",
    "checkIn": "2026-02-20",
    "checkOut": "2026-02-23",
    "arrivalTime": "15:00",
    "specialRequests": null,
    "nbGuests": 2
  }'
```

**Test 3 : Arrivee tardive** (heure >= 21h)
```bash
curl -X POST "https://n8n.srv1207220.hstgr.cloud/webhook-test/wf06-checkin-notify" \
  -H "Content-Type: application/json" \
  -H "x-api-key: 8708c0a6d4766898a2293e41d5137b4b11b3e497a37fc043416b2f823079ca27" \
  -d '{
    "reservationId": "00000000-0000-0000-0000-000000000001",
    "guestName": "Jean Test",
    "propertyName": "Villa Sidi Kaouki",
    "propertyId": "06f47a84-9b8f-4da2-9316-9783b5259398",
    "checkIn": "2026-02-20",
    "checkOut": "2026-02-23",
    "arrivalTime": "23:00",
    "specialRequests": null,
    "nbGuests": 2
  }'
```

---

## Notes

- Les tests avec le webhook de production (`/webhook/`) retournent des erreurs — utiliser `/webhook-test/` et le mode "Listen for test event" dans n8n
- Nettoyage cleaning_tasks : `DELETE FROM cleaning_tasks WHERE reservation_id = '00000000-0000-0000-0000-000000000001';`
