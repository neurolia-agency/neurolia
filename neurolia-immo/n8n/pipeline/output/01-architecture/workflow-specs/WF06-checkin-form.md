> **⚠️ DEPRECATED v2.2** — Ce workflow est deprecie depuis la version 2.2.
> **Raison** : Le formulaire de pre-arrivee fait doublon avec Airbnb/Booking qui collectent deja heure d'arrivee, demandes speciales et nombre de voyageurs.
> **Alternative** : F11 Livret d'accueil digital (page statique, infos pratiques uniquement).

# WF06 — Check-in Form Alert

**Type** : Main workflow
**Trigger** : Webhook `POST /webhook/wf06-checkin-notify` (API Key auth)
**Nodes principaux** : Webhook → Config → Validate → Code (detect keywords) → IF (priority?) → Code (email template) → Send Email
**Donnees entrantes** : Payload formulaire pre-arrivee depuis App `{ reservationId, guestName, propertyName, propertyId, checkIn, checkOut, arrivalTime, specialRequests, nbGuests }`
**Donnees sortantes** : Email SMTP au owner (standard ou prioritaire)
**Sub-workflows** : N/A
**Webhook expose** : Oui — `POST /webhook/wf06-checkin-notify` (App → n8n)
**Error handling** : Webhook inaccessible → App catch error et log (ne bloque pas la soumission). SMTP fail → 2 retries. Pas d'email owner → erreur.

## Flux detaille

1. **[Webhook]** → Recoit payload depuis Next.js Server Action :
   ```json
   {
     "reservationId": "uuid",
     "guestName": "Jean Dupont",
     "propertyName": "Studio Marais",
     "propertyId": "uuid",
     "checkIn": "2026-03-15",
     "checkOut": "2026-03-18",
     "arrivalTime": "22:30",
     "specialRequests": "Nous arrivons avec un bebe de 6 mois, avez-vous un lit bebe ?",
     "nbGuests": 3
   }
   ```
2. **[Config]** → Charge variables : `DASHBOARD_URL`, `SMTP_FROM_EMAIL`
3. **[Code: Validate]** → Valider champs requis (`reservationId`, `guestName`, `propertyName`)
4. **[Code: Detect Priority Keywords]** → Scanner `specialRequests` et `arrivalTime` :
   - **Bebe/enfants** : `bebe`, `bébé`, `enfant`, `lit bebe`, `lit bébé`
   - **Arrivee tardive** : `arrivalTime` > 21:00
   - **Handicap/mobilite** : `handicap`, `fauteuil`, `mobilite reduite`, `mobilité réduite`
   - **Animaux** : `animaux`, `chien`, `chat`, `animal`
   - **Allergie** : `allergie`, `allergique`
   - **Probleme/urgence** : `probleme`, `problème`, `urgence`, `urgent`
   - Resultat : `{ isPriority: boolean, reasons: string[] }`
5. **[IF: Priority?]** → Branch selon `isPriority`
6. **[Code: Email Template]** →
   - **Prioritaire** (red header) :
     - Sujet : `[ATTENTION] Formulaire pre-arrivee — {guestName} @ {propertyName}`
     - Banniere rouge "ATTENTION REQUISE"
     - Raisons de la priorite en surbrillance
     - Tableau details (nom, dates, heure arrivee, nb guests, demandes speciales)
     - Bouton "Voir la reservation" → lien dashboard
   - **Standard** (blue header) :
     - Sujet : `Formulaire pre-arrivee — {guestName} @ {propertyName}`
     - Banniere bleue informative
     - Tableau details
     - Bouton "Voir la reservation"
7. **[Send Email (SMTP)]** → Envoi au owner

## Endpoints API utilises

| Methode | Endpoint | Usage |
|---------|----------|-------|
| -- | -- | Aucun endpoint API (webhook entrant uniquement + SMTP) |

## Credentials

| Credential | Type | Usage |
|------------|------|-------|
| Header Auth - API Key Dashboard | Header Auth | Validation webhook entrant |
| SMTP - Loc Immo | SMTP | Envoi email owner |

## Variables d'environnement

| Variable | Usage |
|----------|-------|
| `DASHBOARD_URL` | Liens dans email |
| `SMTP_FROM_EMAIL` | Expediteur |

## Notes

- **Non bloquant** : Si le webhook n8n est inaccessible, la soumission du formulaire cote App reussit quand meme. L'erreur est loggee cote Next.js.
- **Pas de DB** : Ce workflow ne lit ni n'ecrit dans Supabase. Il recoit un payload et envoie un email.
- **Keywords FR** : Les mots-cles de detection sont en francais (cible utilisateur francophone).
- **Escalade** : Phase 2 : notifications push en plus de l'email pour les cas prioritaires.

---

**Version** : 2.0
**Feature(s)** : F11 (Livret Accueil — formulaire pre-arrivee)
**Depend de** : Aucun
**Appelle** : Aucun
**Appele par** : App (Next.js Server Action)
