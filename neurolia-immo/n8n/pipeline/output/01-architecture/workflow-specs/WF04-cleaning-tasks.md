# WF04 — Cleaning Tasks Creator

**Type** : Main workflow
**Trigger** : Webhook `POST /webhook/wf04-cleaning-task`
**Nodes principaux** : Webhook → Config → Validate → Get Property → Get Existing Task → IF (create checkin_prep?) → Insert Tasks → Get Staff → Assign Round-Robin → Update Tasks → Build Emails → Loop → Send Email
**Donnees entrantes** : Payload reservation depuis WF01 `{ id, property_id, check_in, check_out, nb_guests, guest_name }`
**Donnees sortantes** : Taches creees en base + emails de notification aux staff assignes
**Sub-workflows** : N/A
**Webhook expose** : Oui — `POST /webhook/wf04-cleaning-task` (inter-workflow, WF01 → WF04)
**Error handling** : Pas de staff disponible → taches creees mais non assignees. Task deja existante → skip. Error Trigger → email owner.

## Flux detaille

1. **[Webhook]** → Recoit payload reservation depuis WF01 :
   ```json
   {
     "id": "uuid (reservation_id)",
     "property_id": "uuid",
     "check_in": "2026-03-15",
     "check_out": "2026-03-18",
     "nb_guests": 2,
     "guest_name": "Jean Dupont"
   }
   ```
2. **[Config]** → Charge variables : `DASHBOARD_URL`
3. **[Code: Validate]** → Valider champs requis (`property_id`, `check_in`, `check_out`)
4. **[Supabase: Get Property]** → Recuperer details bien + checklists templates (`property_checklists`)
5. **[Supabase: Get Existing Checkout Task]** → Verifier si une tache `checkout_clean` existe deja pour cette reservation
6. **[IF: Task Exists?]** → Si oui, skip creation checkout_clean
7. **[Supabase: Insert checkout_clean]** → Creer tache menage checkout :
   - `type`: `checkout_clean`
   - `scheduled_date`: `check_out`
   - `scheduled_time`: derive de `check_out_time` ou default 11:00
   - `reservation_id`: lien reservation
   - `status`: `pending`
   - Creer `task_checklist_items` depuis template `checkout_clean` de `property_checklists` :
     1. Vider les poubelles
     2. Faire la vaisselle
     3. Changer les draps
     4. Nettoyer la salle de bain
     5. Passer l'aspirateur
     6. Laver les sols
     7. Sortir les poubelles
     8. Nettoyer les surfaces
     9. Reapprovisionner (savon, papier toilette)
     10. Verifier objets oublies
8. **[IF: Check-in Greeting Needed?]** → Apres recuperation de la propriete, verifier `property.check_in_mode`. Si `staff_checkin` :
   - Creer tache `check_in_greeting` :
     - `type`: `check_in_greeting`
     - `scheduled_date`: `check_in`
     - `scheduled_time`: `reservation.arrival_time` ou default 16:00
     - `reservation_id`: lien reservation
     - `status`: `pending`
     - Creer `task_checklist_items` depuis template `check_in_greeting` de `property_checklists` ou checklist par defaut :
       1. Accueillir le voyageur a l'heure prevue
       2. Faire la visite guidee du logement
       3. Remettre les cles / expliquer le digicode
       4. Montrer les equipements (chauffage, WiFi, electromenager)
       5. Donner le livret d'accueil (papier ou QR code)
9. **[IF: Checkin Prep Needed?]** → Si check_in != check_out (sejour > 0 nuits)
10. **[Supabase: Insert checkin_prep]** → Creer tache preparation :
   - `type`: `checkin_prep`
   - `scheduled_date`: `check_in`
   - `scheduled_time`: derive de `check_in_time - 2h` ou default 14:00
   - Creer `task_checklist_items` depuis template `checkin_prep` :
     1. Verifier que le menage checkout a ete effectue
     2. Verifier l'etat general du logement
     3. Verifier les fournitures (draps, serviettes)
     4. Regler chauffage/climatisation
     5. Verifier cles/digicode
     6. Tester WiFi
11. **[Supabase: Get Available Staff]** → `SELECT * FROM profiles WHERE role = 'cleaning_staff' AND owner_id = ? AND is_active = true`
12. **[Code: Assign Round-Robin]** → Repartition equitable :
    - Compter taches en cours par staff sur la semaine
    - Assigner au staff avec le moins de taches
    - Si egalite : aleatoire
13. **[Supabase: Update Tasks]** → `UPDATE cleaning_tasks SET assigned_to = ? WHERE id IN (?)`
14. **[Code: Build Notification Emails]** → Pour chaque staff assigne :
    - Nom du bien + adresse
    - Date et heure prevue
    - Type de tache
    - Nom voyageur
    - Lien "Voir la tache" → dashboard
15. **[Split In Batches]** → Loop emails
16. **[Send Email (SMTP)]** → Notification individuelle

## Endpoints API utilises

| Methode | Endpoint | Usage |
|---------|----------|-------|
| GET | Supabase `properties` | Details bien |
| GET | Supabase `property_checklists` | Templates checklist |
| GET | Supabase `cleaning_tasks` | Verifier doublons |
| POST | Supabase `cleaning_tasks` | Creer taches |
| POST | Supabase `task_checklist_items` | Creer items checklist |
| GET | Supabase `profiles` (staff) | Staff disponible |
| PATCH | Supabase `cleaning_tasks` | Assigner staff |

## Credentials

| Credential | Type | Usage |
|------------|------|-------|
| Supabase - Loc Immo | Supabase | Acces DB (service_role) |
| SMTP - Loc Immo | SMTP | Notifications staff |

## Variables d'environnement

| Variable | Usage |
|----------|-------|
| `DASHBOARD_URL` | Liens dans emails |
| `SMTP_FROM_EMAIL` | Expediteur |

## Notes

- **Idempotence** : Verifier l'existence d'une tache avant creation pour eviter les doublons (re-processing d'un email).
- **Round-robin** : Algorithme simple base sur le nombre de taches de la semaine. Phase 2 : prendre en compte la localisation geographique.
- **Checklists** : Utiliser les templates de `property_checklists` si le owner en a defini pour ce bien. Sinon, utiliser les checklists par defaut.
- **v1 → v2** : Checklist `checkin_prep` corrigee (v1 Patch 1 : items de verification, pas d'installation draps).
- **v1 → v2** : Les deux taches (checkout + checkin) sont creees en un seul passage (v1 Patch 2).
- **Confirmation** : Poster `POST /api/webhooks/n8n/task-created` pour confirmer la creation a l'App (notification Realtime au owner).

---

**Version** : 2.0
**Feature(s)** : F08 (Planning Intelligent), F12 (Creation Auto Taches)
**Depend de** : Aucun
**Appelle** : Aucun
**Appele par** : WF01 (webhook inter-workflow)
