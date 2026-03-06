# WF05 — Patch Notes

> Corrections appliquees au workflow WF05 (Notifications voyageurs)
> Derniere mise a jour : 2026-02-16

---

## Patch 1 : Desactiver Flow A (confirmation voyageur)

### Contexte

WF05 gere 3 flows de notifications voyageurs :

| Flow | Trigger | Description |
|------|---------|-------------|
| **Flow A** | Webhook (appele par WF01) | Confirmation de reservation |
| **Flow B** | Cron J-1 | Pre-arrivee (instructions d'acces) |
| **Flow C** | Cron J+0 (apres depart) | Post-depart (remerciements + avis) |

Le **Flow A fait doublon** avec les emails de confirmation envoyes automatiquement par Airbnb et Booking. Quand une reservation est confirmee, la plateforme envoie deja un email au voyageur. Le Flow A genere donc un deuxieme email inutile.

### Solution

Desactiver le Flow A sur 3 niveaux :

1. **WF01** : Supprimer l'appel au webhook WF05 Flow A (voir `WF01-PATCH-NOTES.md` Patch 1)
2. **Dashboard** : Desactiver le template de notification `confirmation`
3. **WF05** (optionnel) : Desactiver le noeud webhook dans l'interface n8n

> **Pas de modification du JSON WF05** — le webhook existera toujours dans le workflow mais ne sera simplement plus appele.

---

### 1.1 Action 1 : Supprimer l'appel depuis WF01

Deja documente dans `WF01-PATCH-NOTES.md` Patch 1.

**Resume** : Le noeud "Envoyer confirmation voyageur" (HTTP Request) est supprime de WF01. Le webhook WF05 Flow A ne recoit plus d'appels.

---

### 1.2 Action 2 : Desactiver le template dans le dashboard

Mettre `is_active = false` pour le template de notification avec `trigger_event = 'confirmation'` dans la table `message_templates` de Supabase.

**Requete SQL :**
```sql
UPDATE message_templates
SET is_active = false, updated_at = NOW()
WHERE trigger_event = 'confirmation';
```

| Parametre | Avant | Apres |
|-----------|-------|-------|
| `is_active` | `true` | `false` |
| `trigger_event` | `confirmation` | `confirmation` (inchange) |

> Le template reste en base pour reference. Il peut etre reactive si necessaire.

---

### 1.3 Action 3 (optionnel) : Desactiver le noeud webhook dans n8n

Dans l'interface n8n, clic droit sur le noeud "Webhook confirmation" de WF05 → **Deactivate**.

Cela empeche le webhook de repondre si un appel est accidentellement envoye. Ce n'est pas strictement necessaire puisque WF01 ne l'appelle plus, mais c'est une securite supplementaire.

---

### 1.4 Flows WF05 restants actifs

| Flow | Status | Trigger | Description |
|------|--------|---------|-------------|
| **Flow A** | **Desactive** | Webhook | Confirmation voyageur (doublon plateforme) |
| **Flow B** | Actif | Cron J-1 | Pre-arrivee (instructions d'acces, digicode, wifi) |
| **Flow C** | Actif | Cron J+0 | Post-depart (remerciements, lien pour laisser un avis) |

---

### 1.5 Resultat

| Evenement | Avant | Apres |
|-----------|-------|-------|
| Nouvelle reservation | Email plateforme + email WF05 Flow A (doublon) | Email plateforme uniquement |
| J-1 avant arrivee | Email WF05 Flow B (pre-arrivee) | Inchange |
| Jour du depart | Email WF05 Flow C (post-depart) | Inchange |

### Voir aussi

- `WF01-PATCH-NOTES.md` Patch 1 — Suppression de l'appel WF05 depuis WF01

---

*Document mis a jour le 2026-02-16 (Patch 1)*
