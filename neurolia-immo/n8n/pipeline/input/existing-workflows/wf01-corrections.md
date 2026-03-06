# WF01 — Corrections a appliquer

## BUG CRITIQUE 1 : Typo dans l'URL

**Noeud** : `Upsert reservation`
**Probleme** : L'URL se termine par `reservatio` au lieu de `reservation` (il manque le `n`)
**Actuel** : `https://dashboard-loc-immo.vercel.app/api/webhooks/n8n/reservatio`
**Corriger en** : `={{ $('Config').first().json.DASHBOARD_URL }}/api/webhooks/n8n/reservation`

---

## BUG CRITIQUE 2 : Config ecrase les donnees email

**Probleme** : La connexion actuelle est :
```
Recevoir email → Config → Email Airbnb ?
```
Le noeud Config retourne `{ DASHBOARD_URL, SMTP_FROM_EMAIL, ... }` et **ecrase** les donnees de l'email.
Donc `Email Airbnb ?` recoit les variables de config au lieu de l'email, et `$json.from` est `undefined`.

**Fix** : Changer les connexions pour que `Recevoir email` envoie vers **les deux en parallele** :
```
Recevoir email → Config         (branche 1 — pour executer Config)
Recevoir email → Email Airbnb ? (branche 2 — pour passer les donnees email)
```

**Comment faire dans n8n** :
1. Supprimer la connexion `Config → Email Airbnb ?`
2. Ajouter une connexion `Recevoir email → Email Airbnb ?` (en plus de `Recevoir email → Config`)
3. Le noeud Config sera execute mais ne bloquera plus le flux email

Les noeuds en aval pourront utiliser `$('Config').first().json.XXX` pour les variables de config.

---

## Correction 3 : Creer tache menage — URL dynamique

**Noeud** : `Creer tache menage`
**Champ** : URL
**Actuel** : `https://n8n.srv1207220.hstgr.cloud/webhook/wf04-cleaning-task`
**Corriger en** : `={{ $('Config').first().json.N8N_WF04_WEBHOOK_URL }}`

---

## Correction 4 : Envoyer confirmation voyageur — URL dynamique

**Noeud** : `Envoyer confirmation voyageur`
**Champ** : URL
**Actuel** : `https://n8n.srv1207220.hstgr.cloud/webhook/wf05-auto-message`
**Corriger en** : `={{ $('Config').first().json.N8N_WF05_WEBHOOK_URL }}`

---

## Correction 5 : Alerte email inconnu — utiliser Config

**Noeud** : `Alerte email inconnu`

| Champ | Actuel | Corriger en |
|-------|--------|-------------|
| fromEmail | `gustiez.dorian@neurolia.work` | `={{ $('Config').first().json.SMTP_FROM_EMAIL }}` |
| toEmail | `gustiez.dorian@neurolia.work` | `={{ $('Config').first().json.ADMIN_EMAIL }}` |

---

## Resume des changements

| # | Noeud | Champ | Action |
|---|-------|-------|--------|
| 1 | Upsert reservation | URL | Corriger typo `reservatio` → utiliser expression Config |
| 2 | Connexions | Recevoir email | Ajouter sortie vers `Email Airbnb ?` en parallele de Config |
| 2 | Connexions | Config | Supprimer connexion vers `Email Airbnb ?` |
| 3 | Creer tache menage | URL | Remplacer par expression Config |
| 4 | Envoyer confirmation voyageur | URL | Remplacer par expression Config |
| 5 | Alerte email inconnu | fromEmail | Remplacer par expression Config |
| 5 | Alerte email inconnu | toEmail | Remplacer par expression Config |

---

## Verification apres corrections

Le flux doit etre :
```
Recevoir email ──→ Config (parallele, pas dans le chemin principal)
      │
      └──→ Email Airbnb ? ──→ [true] Parser email Airbnb ──→ Confirmation ? ──→ ...
                │
                └──→ [false] Email Booking ? ──→ ...
```

Tous les noeuds en aval utilisent `$('Config').first().json.XXX` pour les variables,
et `$json` / `$input` pour les donnees email.
