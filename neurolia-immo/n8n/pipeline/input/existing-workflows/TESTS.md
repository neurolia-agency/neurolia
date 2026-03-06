# Suivi des Tests — Workflows n8n

## Statut des Tests

| Workflow | Nom | Statut | Notes |
|----------|-----|--------|-------|
| WF00 | Error Handler | Teste avec succes | Config serie + email alerte recu |
| WF01 | Email Parser | Teste avec succes | Patch 4 valide — filtrage strict emails non-reservation |
| WF02 | iCal Sync | Teste avec succes | Alerte recue — owner email dynamique OK |
| WF03 | Notifications | Teste avec succes | Email owner + staff recus |
| WF04 | Cleaning Tasks | Teste avec succes | Mode webhook "none" |
| WF05 | Auto Messages (A+B+C) | Teste avec succes | 3 flows valides |
| WF06 | Checkin Form Notify | Teste avec succes | Mode webhook "none" + Merge node |

## Details WF04 — Cleaning Tasks

- **Date de test** : 2026-02-13
- **Mode** : webhook trigger en mode "none" (test manuel)
- **Resultat** : Workflow execute avec succes
- **Probleme identifie** : Les appels via API webhook (`/webhook/`) retournent des erreurs — utiliser le mode test (webhook "none") pour valider le workflow

## Details WF05 — Auto Messages

- **Date de test** : 2026-02-14

### Flow A (Confirmation — webhook)
- **Resultat** : Email de confirmation recu avec variables remplacees
- **Template teste** : `confirmation`
- **Corrections appliquees** :
  1. Node Config relie en amont : `Webhook → Config → Valider payload`
  2. "Valider payload confirmation" : `$('Webhook confirmation').first().json.body` au lieu de `$input`
  3. Chaque Config node doit avoir un nom unique par flow

### Flow B (Pre-arrivee — cron J-1)
- **Resultat** : Email pre-arrivee recu avec variables remplacees
- **Prerequis** : reservation avec `check_in = demain` et `guest_email` renseigne
- **Correction** : meme pattern Config que Flow A (nom du node Config unique par flow)

### Flow C (Post-depart — cron J+0)
- **Resultat** : Email post-depart recu avec variables remplacees
- **Prerequis** : reservation avec `check_out = aujourd'hui` et `guest_email` renseigne
- **Note** : contrainte `chk_dates` impose `check_out > check_in`

### Modifications DB pour les tests WF05
- Colonne `guest_email` ajoutee a la table `reservations` : `ALTER TABLE reservations ADD COLUMN guest_email text;`
- 3 templates inseres dans `message_templates` : `confirmation`, `pre_arrival`, `post_departure`

## Details WF06 — Checkin Form Notify

- **Date de test** : 2026-02-13
- **Mode** : webhook trigger en mode "none" (test manuel)
- **Resultat** : Workflow execute avec succes
- **Test effectue** : Payload prioritaire (mots-cles "bebe", "lit bebe")
- **Email recu** : Sujet `[PRIORITE]`, toutes les donnees presentes, mots-cles detectes correctement
- **Correction appliquee** : Ajout d'un Merge node entre Valider payload / Get owner et Detecter mots-cles
- **Architecture finale** :
  ```
  Webhook → Valider payload ──→ Get property → Get owner → Merge (input 1)
                    │                                          │
                    └────────────────────────────────→ Merge (input 0)
                                                           │
                                                 Detecter mots-cles → IF → Email → Send
  ```

## Details WF03 — Notifications quotidiennes

- **Date de test** : 2026-02-14
- **Mode** : cron (test manuel)
- **Resultat** : 2 emails recus (proprietaire + staff)

### Corrections appliquees
1. **Merge 4 inputs** : Merge v3 ne supporte que 2 inputs — remplace par `numberInputs: 4`
2. **Filtre Supabase** : Bug n8n avec `&` dans filterString — simplifie a un seul filtre ou vide
3. **Get properties** : Ajout noeud Supabase sans filtre pour mapper `property_id → owner_id`
4. **Deduplication owners** : Filtre `role === 'owner'` cote JS dans le Code Node (filtre Supabase non fiable)
5. **Email resume proprietaire** : `emailFormat` est le selecteur de format, pas le body — utiliser le champ Text/HTML avec `$json.body`
6. **fromEmail** : Hardcode `gustiez.dorian@neurolia.work` au lieu de `$('Config')` (probleme paired item apres SplitInBatches)
7. **Construire emails staff** : Donnees Supabase plates — utiliser lookups `userMap`, `propMap`, `resvMap` via `$('NodeName')` au lieu de `task.assigned_user`

### Architecture finale
```
Cron 8h → Config  → Check-ins aujourdhui  ──→ Merge (4 inputs) → Get tous les owners → Get properties ─┬→ Construire email proprio → Boucle → Email
         Config1 → Check-outs aujourdhui ──→                                                            │
         Config2 → Check-ins demain      ──→                                                            └→ Construire emails staff → Boucle → Email
         Config3 → Taches menage         ──→
```

## Details WF01 — Email Parser

- **Date de test** : 2026-02-14
- **Mode** : IMAP trigger (email Airbnb reel)
- **Resultat** : Parsing OK + reservation creee en base (201)

### Email teste
- **Expediteur** : `automated@airbnb.com`
- **Sujet** : `En attente : demande de reservation concernant l annonce Villa Sidi Kaouki pour 19-20 fevr. 2026`
- **Type** : Demande de reservation (pending)

### Donnees extraites
- guestName : `Alexis`
- checkIn : `2026-02-19`
- checkOut : `2026-02-20`
- platformRefId : `HMYMTBB35W`
- propertyName : `Villa Sidi Kaouki`
- amount : `null` (normal pour une demande)

### Corrections appliquees
1. **IMAP v2 field** : `textHtml` au lieu de `html` — le noeud IMAP v2 renvoie `textHtml`
2. **Dates compactes** : Ajout pattern `19-20 fevr. 2026` (jour-jour mois annee)
3. **Nom voyageur** : Pattern "demande de Alexis" + aria-label
4. **Nom propriete** : Pattern "l annonce Villa Sidi Kaouki pour"
5. **Ref Airbnb** : Pattern URL `/reservations/details/HMYMTBB35W`
6. **Config ecrase email** : Connexion Config en parallele (pas en serie) de "Email Airbnb ?"
7. **Zod amount nullable** : `z.number().positive().nullable().optional()`
8. **Continue On Fail** : Active sur "Creer tache menage" et "Envoyer confirmation voyageur"

### Notes
- WF04 et WF05 retournent 404 (pas actives en prod) — non bloquant
- La cleaning task `checkout_clean` est creee automatiquement par l API route
- Deploiement Vercel : `https://dashboard-loc-immo.vercel.app`

## Details WF02 — iCal Sync

- **Date de test** : 2026-02-15
- **Resultat** : Alerte recue avec email proprietaire dynamique

### Corrections appliquees

**Patch 1 — Config dans SplitInBatches :**
1. Cablage Config en serie : `Cron → Config → Get proprietes`
2. `dashboardUrl` hardcode dans "Comparer iCal vs DB" et passe via `$json`
3. URL "Envoyer alertes" : `{{ $json.dashboardUrl }}/api/webhooks/n8n/ical-alert`
4. API ical-alert mise a jour pour accepter batch + single format

**Patch 2 — Owner email dynamique :**
1. Nouveau noeud "Get owner" (Supabase) : table `users`, filtre `id=eq.{{ $json.owner_id }}`
2. Cablage : `Recuperer flux iCal → Get owner → Parser .ics`
3. "Parser .ics" : lit owner depuis `$input` (Get owner) et iCal depuis `$('Recuperer flux iCal')`
4. API schemas relaches (`z.coerce`, UUID optionnel)

---

## Details WF01 — Patch 4 (filtrage strict)

- **Date de test** : 2026-02-16
- **Mode** : IMAP trigger (email Airbnb reel — masquage annonce)
- **Resultat** : Email "Votre annonce a bien ete masquee" correctement ignore (emailType = unknown)

### Email teste
- **Expediteur** : Airbnb (automated@airbnb.com)
- **Sujet** : `Votre annonce a bien été masquée`
- **Type attendu** : `unknown` (pas une reservation)
- **Resultat** : `unknown` → route vers Ignorer email (NoOp) → aucune creation en base

### Changements valides
1. **Defaut `unknown`** au lieu de `confirmation` — seuls les mails avec match positif sont traites
2. **Match positif confirmation** : `/réserv/`, `/confirmée/`, `/séjour/`, `/booking confirm/`
3. **Routage** : Switch recommande (4 IF → 1 Switch, doc dans WF02-PATCH-NOTES)

---

## Cleaning V2 — Nouvelles features a tester

### Photos de preuve (apres menage checkout_clean)
1. **Upload photo** : Depuis mobile, prendre photo par piece → verifier dans Supabase Storage bucket `cleaning-photos`
2. **Compression client** : Verifier que les images sont compressees (JPEG 80%, max 2048px) avant upload
3. **Lightbox** : Tap sur une miniature → affichage plein ecran, swipe entre photos
4. **Suppression** : Bouton X sur miniature → suppression Storage + DB
5. **Signed URLs** : Verifier expiration 1h, renouvellement au rechargement

### Completion checkout_clean (dialog multi-etapes)
1. **Etape 1 (Checklist)** : Resume items non-coches (warning jaune) ou tous coches (vert)
2. **Etape 2 (Photos)** : Resume par piece, alerte si aucune photo
3. **Etape 3 (Remarques)** : 3 textareas — majeure (rouge), mineure (jaune), suivi periodique (bleu)
4. **Etape 4 (Confirmation)** : Resume final → bouton confirmer → tache completee avec remarques

### Completion checkin_prep (dialog simple)
1. Dialog simple existant (pas de photos, pas de remarques)
2. **Nouveau** : Affichage du statut du dernier checkout_clean ("Menage precedent : termine le XX/XX a HH:mm" ou "EN ATTENTE")
3. **Nouveau** : Affichage de `guest_message` et `special_requests` si presents dans la reservation

### Vue owner — Rapport menage
1. **Page rapport** : `/dashboard/cleaning/[taskId]` — detail tache + galerie photos par piece + remarques
2. **Lien depuis reservation** : "Voir le rapport" visible si tache completee
3. **Indicateurs visuels** : rouge si remarque majeure, jaune si mineure, bleu si suivi periodique

### Labels mis a jour
1. `checkin_prep` → "Verification check-in" (au lieu de "Preparation check-in")
2. Section title : "VERIFICATIONS" / "Avant check-in"

### WF01 — Suppression appel WF05 Flow A
1. Verifier qu'une nouvelle reservation ne declenche plus WF05 Flow A
2. Verifier que WF04 (tache menage) fonctionne toujours

### WF04 — Nouvelle checklist checkin_prep
1. Verifier que les nouvelles taches checkin_prep ont la checklist de verification (6 items)

### WF05 — Flow A desactive
1. Verifier que le template `confirmation` est `is_active = false`
2. Verifier que Flow B et C fonctionnent toujours

---

## Prochaines Etapes

1. **WF01** : Appliquer le routage Switch dans n8n (remplacer 4 IF par 1 Switch — voir Patch Notes 4.2)
2. Configurer le error handler WF00 apres validation des workflows principaux
3. Activer WF04 et WF05 en production quand prets
4. **Feature conversations** : en attente retour Beds24 (offre messaging-only)
5. **Cleaning V2** : Tester upload photos, completion multi-etapes, rapport owner
