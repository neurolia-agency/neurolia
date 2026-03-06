# WF09 — Health Monitor

**Type** : Main workflow
**Trigger** : Schedule (toutes les 6 heures)
**Nodes principaux** : Trigger → Config → Get Properties → Check iCal Syncs → Check IMAP Syncs → Aggregate Results → IF (issues?) → Send Alert Email
**Donnees entrantes** : Logs de synchronisation (`sync_logs`), proprietes actives
**Donnees sortantes** : Email alerte si probleme detecte
**Sub-workflows** : N/A
**Webhook expose** : Non
**Error handling** : Echec de verification → inclure dans le rapport (ne pas masquer l'erreur).

## Flux detaille

1. **[Schedule Trigger]** → Cron `0 */6 * * *` (Europe/Paris) → Execution a 0h, 6h, 12h, 18h
2. **[Config]** → Charge variables : `DASHBOARD_URL`, `ADMIN_EMAIL`, `SMTP_FROM_EMAIL`
3. **[Supabase: Get Active Properties]** → `SELECT p.*, pr.email AS owner_email, pr.display_name AS owner_name FROM properties p JOIN profiles pr ON p.owner_id = pr.id WHERE p.is_active = true`
4. **[Code: Check iCal Syncs]** → Pour chaque propriete avec iCal URLs :
   - `SELECT * FROM sync_logs WHERE property_id = ? AND source LIKE 'ical_%' ORDER BY synced_at DESC LIMIT 1`
   - **Alertes** :
     - Derniere sync > 2 heures → `stale_sync` (devrait etre < 30 min)
     - Derniere sync en erreur → `sync_error`
     - Aucun log de sync → `never_synced`
     - 3+ erreurs consecutives → `persistent_error`
5. **[Code: Check IMAP Syncs]** → Pour chaque propriete avec IMAP configure :
   - `SELECT * FROM sync_logs WHERE property_id = ? AND source = 'imap' ORDER BY synced_at DESC LIMIT 1`
   - **Alertes** :
     - Derniere sync > 10 minutes → `stale_imap` (devrait etre < 2 min)
     - Derniere sync en erreur → `imap_error`
     - Aucun email parse depuis 7 jours → `no_emails` (warning, pas critique)
6. **[Code: Aggregate Results]** → Rassembler tous les checks :
   ```json
   {
     "total_properties": 5,
     "healthy": 3,
     "warnings": 1,
     "errors": 1,
     "details": [
       {
         "property": "Studio Marais",
         "owner_email": "marc@exemple.fr",
         "ical_status": "ok",
         "imap_status": "stale",
         "last_ical_sync": "2026-02-20T10:30:00Z",
         "last_imap_sync": "2026-02-20T09:15:00Z"
       }
     ]
   }
   ```
7. **[IF: Issues Found?]** → Si `warnings > 0` ou `errors > 0`
8. **[Code: Build Alert Email]** → Email HTML :
   - Sujet : `[Neurolia-Immo] Health Check — {errors} erreur(s), {warnings} warning(s)`
   - Tableau recapitulatif par propriete :
     - Nom du bien | Owner | iCal Status | IMAP Status | Derniere sync
   - Couleurs : vert (ok), orange (warning), rouge (error)
   - Actions recommandees par type d'alerte
   - Lien "Voir les logs" → dashboard admin (Phase 2)
9. **[Send Email (SMTP)]** → Envoi a `ADMIN_EMAIL`

## Endpoints API utilises

| Methode | Endpoint | Usage |
|---------|----------|-------|
| GET | Supabase `properties` + join `profiles` | Proprietes actives + email owner |
| GET | Supabase `sync_logs` | Historique syncs par propriete |

## Credentials

| Credential | Type | Usage |
|------------|------|-------|
| Supabase - Loc Immo | Supabase | Acces DB (service_role) |
| SMTP - Loc Immo | SMTP | Envoi alertes |

## Variables d'environnement

| Variable | Usage |
|----------|-------|
| `DASHBOARD_URL` | Liens dans email |
| `ADMIN_EMAIL` | Destinataire alertes health check |
| `SMTP_FROM_EMAIL` | Expediteur |

## Seuils d'Alerte

| Metrique | Warning | Error |
|----------|---------|-------|
| iCal derniere sync | > 1 heure | > 2 heures |
| IMAP derniere sync | > 5 minutes | > 10 minutes |
| Erreurs consecutives iCal | 2 | 3+ |
| Erreurs consecutives IMAP | 3 | 5+ |
| Aucun email parse | 7 jours (warning) | -- |

## Notes

- **Nouveau workflow v2** : En v1, le health check etait integre dans WF02. En v2, il est separe pour une meilleure separation des responsabilites.
- **Frequence** : Toutes les 6 heures est suffisant pour detecter les problemes persistants. Les erreurs ponctuelles sont gerees par WF00 (Error Handler).
- **Multi-tenant** : Le health check couvre TOUTES les proprietes de TOUS les owners. L'email est envoye a `ADMIN_EMAIL` (support Neurolia), pas aux owners individuels.
- **Phase 2** : Dashboard de monitoring avec historique de sante par propriete. Push notification en plus de l'email.
- **Pas de faux positifs** : Un bien sans URL iCal n'est pas en erreur — il est simplement ignore. Idem pour un bien sans config IMAP.

---

**Version** : 2.0
**Feature(s)** : Transversal (monitoring)
**Depend de** : Aucun
**Appelle** : Aucun
**Appele par** : Schedule (cron)
