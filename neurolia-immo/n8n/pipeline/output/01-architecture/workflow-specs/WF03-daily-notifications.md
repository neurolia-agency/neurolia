# WF03 — Daily Notifications

**Type** : Main workflow
**Trigger** : Schedule 07:00 CET (staff) + Schedule 08:00 CET (owner)
**Nodes principaux** : Trigger → Config → Supabase Queries (parallel) → Code (build emails) → Send Email (owner) → Loop Staff → Send Email (staff)
**Donnees entrantes** : Reservations du jour/lendemain, taches menage en attente, profils staff
**Donnees sortantes** : Emails SMTP (1 owner + N staff)
**Sub-workflows** : N/A
**Webhook expose** : Non
**Error handling** : Pas de donnees → email "Aucun mouvement". Echec email staff → continue (un echec ne bloque pas les autres).

## Flux detaille

### Flow A : Planning Staff (07:00 CET)

1. **[Schedule Trigger]** → Cron `0 7 * * *` (Europe/Paris)
2. **[Config]** → Charge variables : `DASHBOARD_URL`, `SMTP_FROM_EMAIL`
3. **[Supabase: Get Cleaning Tasks Today]** → `SELECT ct.*, p.name, p.address, p.access_code, p.wifi_ssid, p.wifi_password, p.instructions FROM cleaning_tasks ct JOIN properties p ON ct.property_id = p.id WHERE ct.scheduled_date = TODAY AND ct.status IN ('pending', 'in_progress')`
4. **[Supabase: Get Staff Profiles]** → `SELECT * FROM profiles WHERE role = 'cleaning_staff' AND is_active = true`
5. **[Code: Build Staff Emails]** → Pour chaque staff :
   - Filtrer ses taches du jour
   - Construire email HTML personnalise :
     - Salutation avec prenom
     - Liste des taches avec :
       - Nom du bien + adresse (lien Google Maps)
       - Code d'acces (gros/copiable)
       - WiFi
       - Horaire prevu
       - Nom voyageur + nb guests + heure arrivee estimee
       - Type de tache (checkout_clean / checkin_prep / ad_hoc)
       - Badge "Ponctuel" si ad_hoc
     - Bouton "Voir mon planning" → lien dashboard
6. **[Split In Batches]** → Loop sur les emails staff
7. **[Send Email (SMTP)]** → Envoi individuel a chaque staff

### Flow B : Digest Owner (08:00 CET)

1. **[Schedule Trigger]** → Cron `0 8 * * *` (Europe/Paris)
2. **[Config]** → Charge variables
3. **[Supabase Queries (4 en parallele)]** :
   - Check-ins aujourd'hui : `reservations WHERE check_in = TODAY AND status = 'confirmed'`
   - Check-outs aujourd'hui : `reservations WHERE check_out = TODAY AND status = 'confirmed'`
   - Check-ins demain : `reservations WHERE check_in = TOMORROW AND status = 'confirmed'`
   - Taches menage en attente : `cleaning_tasks WHERE status = 'pending'`
4. **[Merge]** → Rassemble les 4 resultats
5. **[Code: Build Owner HTML]** → Email HTML :
   - Section "Arrivees aujourd'hui" (nom guest, bien, nb guests, heure arrivee, special requests en surbrillance)
   - Section "Departs aujourd'hui" (nom guest, bien)
   - Section "Arrivees demain" (preview)
   - Section "Taches menage en attente" (tableau avec bien, agent, statut)
   - KPIs rapides (nb reservations en cours, taux occupation semaine)
   - Bouton "Voir le dashboard" → lien
6. **[Send Email (SMTP)]** → Envoi au owner

## Endpoints API utilises

| Methode | Endpoint | Usage |
|---------|----------|-------|
| GET | Supabase `reservations` | Arrivees/departs du jour et lendemain |
| GET | Supabase `cleaning_tasks` + join `properties` | Taches avec details bien |
| GET | Supabase `profiles` | Liste staff + email owner |

## Credentials

| Credential | Type | Usage |
|------------|------|-------|
| Supabase - Loc Immo | Supabase | Acces DB (service_role) |
| SMTP - Loc Immo | SMTP | Envoi emails |

## Variables d'environnement

| Variable | Usage |
|----------|-------|
| `DASHBOARD_URL` | Liens dans emails |
| `SMTP_FROM_EMAIL` | Expediteur |
| `SMTP_FROM_NAME` | Nom expediteur |

## Notes

- **Pas de donnees** : Si aucun mouvement prevu, envoyer quand meme le digest ("Aucune arrivee/depart prevue") pour confirmer que le systeme fonctionne.
- **Special requests** : Mises en surbrillance dans l'email owner (attention requise).
- **Multi-tenant** : En v2, les queries filtrent par `owner_id` (via service_role + filtre explicite). Un owner ne recoit que ses donnees.
- **Taches ad_hoc** : Incluses dans le planning staff avec badge "Ponctuel" (v2.1).
- **Suivi menage** : Le lien "Suivi menages →" dans l'email redirige vers la vue detaillee par bien (v2.1).

---

**Version** : 2.0
**Feature(s)** : F06 (Dashboard Proprio), F07 (Dashboard Entretien), F10 (Notifications)
**Depend de** : Aucun
**Appelle** : Aucun
**Appele par** : Schedule (cron)
