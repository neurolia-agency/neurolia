# Configuration des variables — Noeud Config

> Les variables de configuration ne sont plus dans `$vars` (Settings → Variables, plan payant)
> ni dans `$env` (variables Docker partagees entre projets).
>
> Chaque workflow contient un **noeud Code "Config"** qui centralise toutes les valeurs.
> Les autres noeuds y accedent via `$('Config').item.json.NOM_VARIABLE`.
>
> Version 4.0 — Noeud Config (2026-02-13)

---

## Fonctionnement

Chaque workflow contient un noeud **Config** (type Code) connecte au trigger.
Ce noeud retourne un objet JSON avec toutes les variables de configuration :

```javascript
return [{
  json: {
    DASHBOARD_URL: 'https://app.locimmo.fr',
    SMTP_FROM_EMAIL: 'gustiez.dorian@neurolia.work',
    ADMIN_EMAIL: 'gustiez.dorian@neurolia.work',
    N8N_WF04_WEBHOOK_URL: 'https://n8n.srv1207220.hstgr.cloud/webhook/wf04-cleaning-task',
    N8N_WF05_WEBHOOK_URL: 'https://n8n.srv1207220.hstgr.cloud/webhook/wf05-auto-message',
  }
}];
```

### Acces aux variables

Dans les **expressions n8n** (champs des noeuds) :
```
={{ $('Config').item.json.DASHBOARD_URL }}
```

Dans les **Code nodes** (JavaScript) :
```javascript
const dashboardUrl = $('Config').item.json.DASHBOARD_URL;
```

---

## Variables de configuration

| Variable | Valeur actuelle | Utilise par |
|----------|-----------------|-------------|
| `DASHBOARD_URL` | `https://app.locimmo.fr` | WF01-WF06 (URLs webhooks + liens emails) |
| `SMTP_FROM_EMAIL` | `gustiez.dorian@neurolia.work` | WF00-WF06 (expediteur emails) |
| `ADMIN_EMAIL` | `gustiez.dorian@neurolia.work` | WF00, WF01 (alertes techniques) |
| `N8N_WF04_WEBHOOK_URL` | `https://n8n.srv1207220.hstgr.cloud/webhook/wf04-cleaning-task` | WF01 (chainage vers WF04) |
| `N8N_WF05_WEBHOOK_URL` | `https://n8n.srv1207220.hstgr.cloud/webhook/wf05-auto-message` | WF01 (chainage vers WF05) |

---

## Modifier une valeur

1. Ouvrir le workflow dans n8n
2. Cliquer sur le noeud **Config** (premier noeud apres le trigger)
3. Modifier la valeur dans le code JavaScript
4. Sauvegarder le workflow

> **Important** : La meme variable peut apparaitre dans plusieurs workflows.
> Pour un changement global (ex: changement d'URL du dashboard), il faut
> mettre a jour le noeud Config de **chaque** workflow concerne.

---

## Credentials n8n (inchanges)

Les secrets restent dans les **Credentials n8n** (chiffrees) :

| Nom | Type | Utilise par |
|-----|------|-------------|
| `IMAP - Reservations` | IMAP | WF01 |
| `SMTP - Loc Immo` | SMTP | WF00-WF06 |
| `Supabase - Loc Immo` | Supabase | WF02-WF06 |
| `API Key - Dashboard` | Header Auth | WF01, WF02, WF04, WF05, WF06 |

---

## Historique des migrations

| Version | Date | Changement |
|---------|------|------------|
| v1 | 2026-02-12 | `$env.X` dans les expressions et Code nodes |
| v2 | 2026-02-12 | Migration `$env` → `$vars` (Settings → Variables) |
| v3 | 2026-02-13 | Suppression SUPABASE_URL/KEY des Variables, noeuds Supabase natifs |
| **v4** | **2026-02-13** | **Migration `$vars` → noeud Config (`$('Config').item.json.X`)** |

---

*Mis a jour le 2026-02-13 — v4 noeud Config (plan n8n Community, sans Variables payantes)*
