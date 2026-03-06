# Node: HTTP: Trigger WF04

**Type** : httpRequest
**Mode** : Run Once for Each Item

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| url | `={{ $('Config').item.json.N8N_WF04_WEBHOOK_URL }}` | URL webhook WF04 |
| body.id | `={{ $('HTTP: Upsert Reservation').item.json.reservation.id }}` | ID reservation creee |
| body.property_id | `={{ $('HTTP: Upsert Reservation').item.json.reservation.property_id }}` | ID propriete |
| body.check_in | `={{ $('HTTP: Upsert Reservation').item.json.reservation.check_in }}` | Date check-in |
| body.check_out | `={{ $('HTTP: Upsert Reservation').item.json.reservation.check_out }}` | Date check-out |
| body.nb_guests | `={{ $('HTTP: Upsert Reservation').item.json.reservation.nb_guests }}` | Nombre de voyageurs |
| body.guest_name | `={{ $('HTTP: Upsert Reservation').item.json.reservation.guest_name }}` | Nom du voyageur |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| method | POST | Methode HTTP |
| url | (expression) | URL webhook WF04 via Config |
| sendHeaders | true | Envoi headers |
| headerParameters.parameters[0].name | x-api-key | Header authentification |
| headerParameters.parameters[0].value | `={{ $('Config').item.json.N8N_WEBHOOK_API_KEY }}` | Cle API inter-workflows |
| headerParameters.parameters[1].name | Content-Type | Type contenu |
| headerParameters.parameters[1].value | application/json | JSON |
| sendBody | true | Envoi body |
| bodyContentType | json | JSON body |
| specifyBody | keypair | Champs individuels |
| bodyParameters[0].name | id | |
| bodyParameters[0].value | (expression) | reservation.id |
| bodyParameters[1].name | property_id | |
| bodyParameters[1].value | (expression) | reservation.property_id |
| bodyParameters[2].name | check_in | |
| bodyParameters[2].value | (expression) | reservation.check_in |
| bodyParameters[3].name | check_out | |
| bodyParameters[3].value | (expression) | reservation.check_out |
| bodyParameters[4].name | nb_guests | |
| bodyParameters[4].value | (expression) | reservation.nb_guests |
| bodyParameters[5].name | guest_name | |
| bodyParameters[5].value | (expression) | reservation.guest_name |
| options.retry.maxTries | 3 | 1 essai + 2 retries |
| options.retry.retryInterval | 5000 | 5s entre retries |

## Sortie attendue

```json
{
  "success": true,
  "tasks_created": ["uuid-task-checkout", "uuid-task-checkin"]
}
```

## Connexions

- **Entree** : IF: New Confirmed? (sortie true)
- **Sortie** : Aucune (fin du workflow)

## Notes

- Appel inter-workflow : WF01 → WF04 via webhook interne n8n
- Le payload est minimal : seules les donnees necessaires a WF04 sont envoyees
- Si WF04 echoue, WF04 a son propre Error Trigger vers WF00
- L'authentification utilise la meme cle API que les webhooks App
