# WF08 — Issue Handler

**Type** : Main workflow
**Trigger** : Webhook `POST /webhook/issue-created` (Database Webhook Supabase)
**Nodes principaux** : Webhook → Config → Get Issue Details → Get Property → Get Reporter → Code (build email) → Send Email
**Donnees entrantes** : Payload `{ issue_id, property_id, reported_by, type, description, photo_path }`
**Donnees sortantes** : Email urgent SMTP au owner
**Sub-workflows** : N/A
**Webhook expose** : Oui — `POST /webhook/issue-created` (App → n8n)
**Error handling** : SMTP fail → 2 retries. Photo inaccessible → email sans photo.

## Flux detaille

1. **[Webhook]** → Recoit payload depuis Database Webhook Supabase (INSERT `issues`) :
   ```json
   {
     "issue_id": "uuid",
     "property_id": "uuid",
     "reported_by": "uuid",
     "type": "leak | breakage | missing | other",
     "description": "Fuite d'eau sous l'evier de la cuisine",
     "photo_path": "task-photos/issue-xxx/photo-001.jpg"
   }
   ```
2. **[Config]** → Charge variables : `DASHBOARD_URL`, `SMTP_FROM_EMAIL`
3. **[Supabase: Get Property]** → `SELECT name, address, owner_id FROM properties WHERE id = ?`
4. **[Supabase: Get Reporter]** → `SELECT display_name, email, phone FROM profiles WHERE id = ?`
5. **[Supabase: Get Owner]** → `SELECT email, display_name FROM profiles WHERE id = ?`
6. **[IF: Has Photo?]** → Si `photo_path` non null
7. **[Supabase Storage: Get Photo URL]** → Generer URL signee (temporaire, 24h) pour la photo
8. **[Code: Build Urgent Email]** → Email HTML :
   - Sujet : `[URGENT] Signalement — {type_label} @ {property_name}`
   - Banniere rouge "SIGNALEMENT URGENT"
   - Type de probleme (traduit : Fuite, Casse, Manquant, Autre)
   - Description du probleme
   - Photo jointe ou lien (si disponible)
   - Qui a signale : `{reporter_name}` + telephone (si disponible)
   - Ou : `{property_name}` — `{address}`
   - Quand : timestamp du signalement
   - Bouton "Voir le signalement" → `DASHBOARD_URL/issues/{issue_id}`
   - Bouton "Appeler {reporter_name}" → `tel:{phone}` (si phone disponible)
9. **[Send Email (SMTP)]** → Email urgent au owner

## Endpoints API utilises

| Methode | Endpoint | Usage |
|---------|----------|-------|
| GET | Supabase `properties` | Nom et adresse du bien |
| GET | Supabase `profiles` (reporter) | Nom et telephone du signaleur |
| GET | Supabase `profiles` (owner) | Email du owner |
| GET | Supabase Storage signed URL | Photo du signalement |

## Credentials

| Credential | Type | Usage |
|------------|------|-------|
| Header Auth - API Key Dashboard | Header Auth | Validation webhook entrant |
| Supabase - Loc Immo | Supabase | Acces DB + Storage |
| SMTP - Loc Immo | SMTP | Envoi email urgent |

## Variables d'environnement

| Variable | Usage |
|----------|-------|
| `DASHBOARD_URL` | Liens dans email |
| `SMTP_FROM_EMAIL` | Expediteur |

## Notes

- **Nouveau workflow v2** : En v1, les alertes issues etaient conceptuellement dans WF03 mais jamais implementees.
- **Database Webhook** : Declenche par INSERT dans `issues` (pas un appel direct depuis le code frontend).
- **Urgence** : Tous les signalements sont traites comme urgents (email immediat). Phase 2 : niveaux de severite avec routing different.
- **Photo** : URL signee temporaire (24h). Si la photo est supprimee ou le lien expire, le owner peut toujours la voir dans le dashboard.
- **Traduction types** : `leak` → "Fuite", `breakage` → "Casse", `missing` → "Manquant", `other` → "Autre"
- **Telephone** : Si le staff a renseigne son telephone, un bouton "Appeler" est ajoute a l'email pour contact direct.

---

**Version** : 2.0
**Feature(s)** : F10 (Notifications — signalements)
**Depend de** : Aucun
**Appelle** : Aucun
**Appele par** : Supabase Database Webhook (INSERT issues)
