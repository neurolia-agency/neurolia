# WF07 — User Onboarding

**Type** : Main workflow
**Trigger** : Webhook `POST /webhook/user-created` (Database Webhook Supabase)
**Nodes principaux** : Webhook → Config → Switch (role) → [Owner path / Staff path] → Send Email → [IF owner: Trigger sync init]
**Donnees entrantes** : Payload `{ user_id, email, display_name, role, owner_id? }`
**Donnees sortantes** : Email bienvenue SMTP + (owner) premiere sync iCal declenchee
**Sub-workflows** : N/A
**Webhook expose** : Oui — `POST /webhook/user-created` (App → n8n)
**Error handling** : SMTP fail → 2 retries. Pas de properties avec iCal → skip sync init (normal pour nouvel owner).

## Flux detaille

### Flow A : Nouvel Owner

1. **[Webhook]** → Recoit :
   ```json
   {
     "user_id": "uuid",
     "email": "marc@exemple.fr",
     "display_name": "Marc Dupont",
     "role": "owner"
   }
   ```
2. **[Config]** → Charge variables : `DASHBOARD_URL`, `SMTP_FROM_EMAIL`, `SMTP_FROM_NAME`
3. **[Switch: Role]** → Route `role == "owner"` → Flow A
4. **[Code: Build Welcome Email]** → Email HTML bienvenue owner :
   - Salutation personnalisee
   - Etapes de demarrage :
     1. Ajouter votre premier bien
     2. Configurer les URLs iCal (Airbnb/Booking)
     3. Inviter votre equipe d'entretien
   - Bouton "Commencer" → `DASHBOARD_URL/properties/new`
   - Lien aide : documentation ou contact support
5. **[Send Email (SMTP)]** → Email bienvenue au owner
6. **[Supabase: Get Owner Properties]** → Verifier si l'owner a deja des biens avec iCal URLs (cas rare : donnees pre-existantes)
7. **[IF: Has Properties with iCal?]** → Si oui, declencher premiere sync
8. **[HTTP: POST /webhook/property-created]** → Pour chaque bien, trigger WF02 (sync iCal immediate)

### Flow B : Nouveau Staff

1. **[Webhook]** → Recoit :
   ```json
   {
     "user_id": "uuid",
     "email": "sarah@exemple.fr",
     "display_name": "Sarah Martin",
     "role": "cleaning_staff",
     "owner_id": "uuid"
   }
   ```
2. **[Config]** → Memes variables
3. **[Switch: Role]** → Route `role == "cleaning_staff"` → Flow B
4. **[Supabase: Get Owner]** → Recuperer profil du owner (`display_name`, `email`)
5. **[Code: Build Staff Welcome]** → Email HTML bienvenue staff :
   - Salutation personnalisee
   - "Vous avez rejoint l'equipe de {owner_display_name}"
   - Explication du fonctionnement (taches, planning, validation)
   - Bouton "Voir mon planning" → `DASHBOARD_URL/planning`
6. **[Send Email (SMTP)]** → Email bienvenue au staff
7. **[Code: Build Owner Notification]** → Email au owner :
   - "{display_name} a rejoint votre equipe"
   - Details : email, date inscription
   - Bouton "Gerer mon equipe" → `DASHBOARD_URL/team`
8. **[Send Email (SMTP)]** → Notification au owner

## Endpoints API utilises

| Methode | Endpoint | Usage |
|---------|----------|-------|
| GET | Supabase `profiles` | Recuperer profil owner |
| GET | Supabase `properties` | Verifier biens existants (owner flow) |
| POST | `/webhook/property-created` (n8n) | Trigger sync iCal si biens pre-existants |

## Credentials

| Credential | Type | Usage |
|------------|------|-------|
| Header Auth - API Key Dashboard | Header Auth | Validation webhook entrant |
| Supabase - Loc Immo | Supabase | Acces DB |
| SMTP - Loc Immo | SMTP | Envoi emails |

## Variables d'environnement

| Variable | Usage |
|----------|-------|
| `DASHBOARD_URL` | Liens dans emails |
| `SMTP_FROM_EMAIL` | Expediteur |
| `SMTP_FROM_NAME` | Nom expediteur |

## Notes

- **Nouveau workflow v2** : En v1, l'onboarding etait conceptuellement dans WF03 mais jamais implemente comme workflow separe.
- **Database Webhook Supabase** : Le trigger est un Database Webhook (`pg_net`) declenche par INSERT dans `profiles` (apres `on_auth_user_created`). Pas un appel direct de l'App.
- **Premiere sync** : Pour les owners qui ajoutent des iCal URLs a la creation du bien, la premiere sync est declenchee via WF02's webhook `property.created`. WF07 ne fait la sync que si des biens pre-existent (migration/import).
- **Invitation flow** : Le staff s'inscrit via lien d'invitation → `on_auth_user_created` cree le profil → Database Webhook trigger WF07 → email bienvenue + notif owner.

---

**Version** : 2.0
**Feature(s)** : F01 (Auth — onboarding), F10 (Notifications — bienvenue)
**Depend de** : Aucun
**Appelle** : WF02 (via trigger property.created, si biens pre-existants)
**Appele par** : Supabase Database Webhook (INSERT profiles)
