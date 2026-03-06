# WF00 — Error Handler

**Type** : Main workflow
**Trigger** : Error Trigger (execute quand un autre workflow echoue)
**Nodes principaux** : Error Trigger → Config → Code (format message) → IF (severity) → Send Email (SMTP)
**Donnees entrantes** : Objet erreur n8n (`error.message`, `error.node`, `error.workflow`, `error.timestamp`)
**Donnees sortantes** : Email alerte envoye
**Sub-workflows** : N/A
**Webhook expose** : Non
**Error handling** : Si l'envoi email echoue → log console n8n (dernier recours)

## Flux detaille

1. **[Error Trigger]** → Recoit l'objet erreur d'un workflow en echec
2. **[Config]** → Charge variables : `ADMIN_EMAIL`, `DASHBOARD_URL`, `SMTP_FROM_EMAIL`
3. **[Code: Format Error]** → Formate le message d'erreur :
   - Nom du workflow en echec
   - Nom du node en echec
   - Message d'erreur
   - Timestamp
   - Lien vers l'execution n8n (si disponible)
4. **[IF: Severity]** → Determine la gravite :
   - `critical` : Supabase down, IMAP connection refused, API unreachable
   - `warning` : Parsing partiel, timeout, retry epuise
5. **[Send Email]** → Email SMTP au owner/admin
   - Sujet : `[Neurolia-Immo] ERREUR {severity} — {workflow_name}`
   - Corps : Details erreur + action recommandee

## Endpoints API utilises

| Methode | Endpoint | Usage |
|---------|----------|-------|
| -- | -- | Aucun endpoint API (email uniquement) |

## Credentials

| Credential | Type | Usage |
|------------|------|-------|
| SMTP - Loc Immo | SMTP | Envoi email alerte |

## Variables d'environnement

| Variable | Usage |
|----------|-------|
| `ADMIN_EMAIL` | Destinataire alertes |
| `SMTP_FROM_EMAIL` | Expediteur |
| `DASHBOARD_URL` | Liens dans email |

## Notes

- Ce workflow doit etre lie a TOUS les autres workflows via la configuration "Error Workflow" dans les settings de chaque workflow n8n
- En v1, chaque workflow avait son propre Error Trigger — v2 centralise dans WF00
- Si le SMTP est en panne, l'erreur est uniquement loggee dans les executions n8n
- Pattern Email : sujet prefixe `[Neurolia-Immo]` pour filtrage boite email
- Ne pas creer de boucle : WF00 ne doit PAS avoir WF00 comme error workflow

---

**Version** : 2.0
**Feature(s)** : Transversal
**Depend de** : Aucun
**Appele par** : Tous les workflows (Error Trigger)
