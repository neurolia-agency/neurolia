# Parametrage "Fields to Send" — Noeuds Supabase (Create / Update)

> Reference pour configurer les champs dans l'UI n8n
> pour chaque noeud Supabase de type Create ou Update.
>
> Format : `Field Name` = `Field Value` (expression ou valeur fixe)

---

## WF04 — Creation taches menage

### Noeud : "Creer tache checkin_prep"

- **Operation** : Create
- **Table** : `cleaning_tasks`

| Field Name | Field Value |
|-----------|-------------|
| `reservation_id` | `={{ $node['Recevoir nouvelle reservation'].json.body.id }}` |
| `property_id` | `={{ $node['Recevoir nouvelle reservation'].json.body.property_id }}` |
| `type` | `checkin_prep` |
| `status` | `pending` |
| `scheduled_date` | `={{ $node['Recevoir nouvelle reservation'].json.body.check_in }}` |
| `checklist` | `=[{"label":"Verifier la proprete generale","done":false},{"label":"Installer les draps propres","done":false},{"label":"Disposer les serviettes","done":false},{"label":"Verifier les produits d'accueil","done":false},{"label":"Verifier le fonctionnement du chauffage/climatisation","done":false},{"label":"Laisser les cles / verifier le digicode","done":false}]` |

---

### Noeud : "Assigner checkout_clean"

- **Operation** : Update
- **Table** : `cleaning_tasks`
- **Filter** : `id=eq.{{ $json.assignedCheckout.taskId }}`

| Field Name | Field Value |
|-----------|-------------|
| `assigned_to` | `={{ $json.assignedCheckout.staffId }}` |

---

### Noeud : "Assigner checkin_prep"

- **Operation** : Update
- **Table** : `cleaning_tasks`
- **Filter** : `id=eq.{{ $json.assignedCheckin.taskId }}`

| Field Name | Field Value |
|-----------|-------------|
| `assigned_to` | `={{ $json.assignedCheckin.staffId }}` |

---

## WF05 — Messages automatiques voyageurs

### Noeud : "Inserer message en attente (Flow A)"

- **Operation** : Create
- **Table** : `sent_messages`

| Field Name | Field Value |
|-----------|-------------|
| `reservation_id` | `={{ $json.reservationId }}` |
| `template_id` | `={{ $json.templateId }}` |
| `channel` | `email` |
| `recipient_email` | `={{ $json.recipientEmail }}` |
| `status` | `pending` |

---

### Noeud : "Marquer message envoye (Flow A)"

- **Operation** : Update
- **Table** : `sent_messages`
- **Filter** : `id=eq.{{ $node['Inserer message en attente (Flow A)'].json.id }}`

| Field Name | Field Value |
|-----------|-------------|
| `status` | `sent` |
| `sent_at` | `={{ $now.toISO() }}` |

---

### Noeud : "Log echec sans email (Flow A)"

- **Operation** : Create
- **Table** : `sent_messages`

| Field Name | Field Value |
|-----------|-------------|
| `reservation_id` | `={{ $json.reservationId }}` |
| `template_id` | `={{ $json.templateId }}` |
| `channel` | `email` |
| `status` | `failed` |
| `error_message` | `Email voyageur non disponible` |

---

### Noeud : "Inserer message en attente (Flow B)"

- **Operation** : Create
- **Table** : `sent_messages`

| Field Name | Field Value |
|-----------|-------------|
| `reservation_id` | `={{ $json.reservationId }}` |
| `template_id` | `={{ $json.templateId }}` |
| `channel` | `email` |
| `recipient_email` | `={{ $json.recipientEmail }}` |
| `status` | `pending` |

---

### Noeud : "Marquer message envoye (Flow B)"

- **Operation** : Update
- **Table** : `sent_messages`
- **Filter** : `id=eq.{{ $node['Inserer message en attente (Flow B)'].json.id }}`

| Field Name | Field Value |
|-----------|-------------|
| `status` | `sent` |
| `sent_at` | `={{ $now.toISO() }}` |

---

### Noeud : "Log echec sans email (Flow B)"

- **Operation** : Create
- **Table** : `sent_messages`

| Field Name | Field Value |
|-----------|-------------|
| `reservation_id` | `={{ $json.reservationId }}` |
| `template_id` | `={{ $json.templateId }}` |
| `channel` | `email` |
| `status` | `failed` |
| `error_message` | `Email voyageur non disponible` |

---

### Noeud : "Inserer message en attente (Flow C)"

- **Operation** : Create
- **Table** : `sent_messages`

| Field Name | Field Value |
|-----------|-------------|
| `reservation_id` | `={{ $json.reservationId }}` |
| `template_id` | `={{ $json.templateId }}` |
| `channel` | `email` |
| `recipient_email` | `={{ $json.recipientEmail }}` |
| `status` | `pending` |

---

### Noeud : "Marquer message envoye (Flow C)"

- **Operation** : Update
- **Table** : `sent_messages`
- **Filter** : `id=eq.{{ $node['Inserer message en attente (Flow C)'].json.id }}`

| Field Name | Field Value |
|-----------|-------------|
| `status` | `sent` |
| `sent_at` | `={{ $now.toISO() }}` |

---

### Noeud : "Log echec sans email (Flow C)"

- **Operation** : Create
- **Table** : `sent_messages`

| Field Name | Field Value |
|-----------|-------------|
| `reservation_id` | `={{ $json.reservationId }}` |
| `template_id` | `={{ $json.templateId }}` |
| `channel` | `email` |
| `status` | `failed` |
| `error_message` | `Email voyageur non disponible` |

---

*Genere le 2026-02-13*
