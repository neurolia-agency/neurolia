# WF01 + WF02 — Patch Notes

> Corrections appliquees aux workflows WF01 (Parseur d'emails) et WF02 (Synchronisation iCal)
> Derniere mise a jour : 2026-02-15

---

## Patch 1 : Config dans boucle SplitInBatches

### Probleme

`$('Config')` est inaccessible depuis les noeuds a l'interieur de la boucle SplitInBatches.
Solution : passer `dashboardUrl` dans le flux de donnees JSON.

### 1.1 Cablage

**Avant :**
```
Cron 30 min → Config          (branche morte)
            → Get proprietes
```

**Apres :**
```
Cron 30 min → Config → Get proprietes avec iCal
```

- Supprimer la connexion directe `Cron → Get proprietes`
- Creer la chaine `Cron → Config → Get proprietes`

### 1.2 Noeud : Comparer iCal vs DB (Code)

**Ajouter cette ligne** apres `const ownerEmail = ...` :

```javascript
// Hardcode car $('Config') est inaccessible dans SplitInBatches
const dashboardUrl = 'https://dashboard-loc-immo.vercel.app';
```

**Ajouter `dashboardUrl`** dans le return.

### 1.3 Noeud : Envoyer alertes (HTTP Request)

**URL :**
```
{{ $json.dashboardUrl }}/api/webhooks/n8n/ical-alert
```

### 1.4 Noeud : Preparer email alerte (Code)

Lire `dashboardUrl` depuis `$json` et l'utiliser dans le lien HTML.

---

## Patch 2 : Recuperation dynamique de l'email proprietaire

### Probleme

`ownerEmail` est toujours `null` car le noeud Supabase "Get proprietes avec iCal" retourne les colonnes de la table `properties` sans joindre la table `users`. La ligne `property.owner?.email` retourne donc `null`.

Consequence : le noeud "Email alerte proprietaire" echoue avec "No recipients defined".

### Solution

Ajouter un noeud Supabase **"Get owner"** dans la boucle qui requete la table `users` par `owner_id`.

### 2.1 Nouveau noeud : Get owner (Supabase)

| Parametre | Valeur |
|-----------|--------|
| **Nom** | `Get owner` |
| **Operation** | Get Many |
| **Table** | `users` |
| **Return All** | Non |
| **Limit** | 1 |
| **Filter Type** | String |
| **Filter String** | `id=eq.{{ $json.owner_id }}` |
| **Always Output Data** | Oui |
| **Credential** | `Supabase Neurolia Immo` |

### 2.2 Cablage mis a jour

**Avant :**
```
Boucle → Recuperer flux iCal → Parser .ics → Get reservations DB → ...
```

**Apres :**
```
Boucle → Recuperer flux iCal → Get owner → Parser .ics → Get reservations DB → ...
```

- Supprimer la connexion `Recuperer flux iCal → Parser .ics`
- Creer : `Recuperer flux iCal → Get owner`
- Creer : `Get owner → Parser .ics`

### 2.3 Noeud : Recuperer flux iCal (Code)

**Supprimer** les lignes `owner_email` et `owner_name` du return (elles sont toujours `null` de toute facon) :

```javascript
return [{
  json: {
    property_id: property.id,
    property_name: property.name,
    owner_id: property.owner_id,
    ical_airbnb_text: icalAirbnbText,
    ical_booking_text: icalBookingText,
  }
}];
```

### 2.4 Noeud : Parser .ics (Code)

**Remplacer le debut du code :**

```javascript
// AVANT (ne fonctionne pas — owner_email est null)
const icalAirbnb = $input.first().json.ical_airbnb_text || '';
const icalBooking = $input.first().json.ical_booking_text || '';
const propertyId = $input.first().json.property_id;
const propertyName = $input.first().json.property_name;
const ownerEmail = $input.first().json.owner_email;
const ownerName = $input.first().json.owner_name;
```

```javascript
// APRES — lit le owner depuis "Get owner" (input) et iCal depuis "Recuperer flux iCal"
const ownerRecord = $input.first().json || {};
const ownerEmail = ownerRecord.email || null;
const ownerName = ownerRecord.full_name || null;

const icalInput = $('Recuperer flux iCal').first().json;
const icalAirbnb = icalInput.ical_airbnb_text || '';
const icalBooking = icalInput.ical_booking_text || '';
const propertyId = icalInput.property_id;
const propertyName = icalInput.property_name;
```

> **Pourquoi `$('Recuperer flux iCal')` fonctionne ici ?**
> Contrairement a `$('Config')` qui est HORS de la boucle SplitInBatches,
> "Recuperer flux iCal" est DANS la boucle. Les references `$('NodeName')`
> fonctionnent entre noeuds a l'interieur de la meme boucle.

### 2.5 Flux de donnees complet (ownerEmail)

```
Get proprietes → Boucle → Recuperer flux iCal (owner_id)
                             ↓
                        Get owner (email, full_name)
                             ↓
                        Parser .ics (ownerEmail dans return)
                             ↓
                        Get reservations DB
                             ↓
                        Comparer iCal vs DB (ownerEmail via $('Parser .ics'))
                             ↓
                        Anomalies? → oui →
                             ↓                ↓
                        Preparer email    Envoyer alertes
                             ↓
                        Email proprietaire ({{ $json.ownerEmail }})
```

---

## Patch 3 : Ignorer les emails de demande de reservation (faux positifs iCal)

### Probleme

Quand un voyageur fait une **demande de reservation** sur Airbnb (ou Booking), le proprietaire recoit un email de type "demande" avant meme de confirmer. WF01 traitait ce mail comme une confirmation et creait la reservation avec `status: 'confirmed'` en base.

Or, le calendrier iCal ne bloque pas le creneau tant que le proprietaire n'a pas accepte. WF02 detectait donc un ecart : reservation en DB sans creneau iCal correspondant → alerte `missing_ical_block` faussement positive.

### Solution

Les emails de demande sont **completement ignores** par le systeme : pas de creation en base, aucune trace. Seuls les mails de confirmation de reservation sont traites.

Le filtrage se fait dans WF01 (parseur d'emails). WF02 (sync iCal) n'est pas modifie.

---

### 3.1 Noeud modifie : Parser email Airbnb (Code)

**Remplacement** du bloc de detection du type d'email.

**AVANT :**
```javascript
// --- Detection du type d email ---
var emailType = "confirmation";

// "En attente" ou "demande" = pending
if (/en attente/i.test(subject) || /demande de r/i.test(subject)) {
  emailType = "confirmation"; // on traite comme confirmation pour creer la resa
}
if (/annul/i.test(subject) || /cancel/i.test(subject)) {
  emailType = "cancellation";
}
if (/modifi/i.test(subject) || /updated/i.test(subject) || /changed/i.test(subject)) {
  emailType = "modification";
}
```

**APRES :**
```javascript
// --- Detection du type d email ---
var emailType = "confirmation";

// Annulation (tester en premier car prioritaire)
if (/annul/i.test(subject) || /cancel/i.test(subject)) {
  emailType = "cancellation";
}
// Modification
else if (/modifi/i.test(subject) || /updated/i.test(subject) || /changed/i.test(subject)) {
  emailType = "modification";
}
// "En attente" ou "demande" = inquiry (en attente de validation proprietaire)
else if (/en attente/i.test(subject) || /demande de r/i.test(subject) || /demande.*reservation/i.test(subject) || /reservation request/i.test(subject)) {
  emailType = "inquiry";
}
```

> **Changements cles :**
> - Les patterns "en attente" et "demande de r..." produisent maintenant `emailType = "inquiry"` au lieu de `"confirmation"`
> - Ajout de patterns supplementaires : `demande.*reservation`, `reservation request`
> - Utilisation de `else if` pour eviter les ecrasements entre types

---

### 3.2 Noeud modifie : Parser email Booking (Code)

**Ajout** de patterns d'inquiry dans la section detection du type d'email.

**AVANT :**
```javascript
// (apres les boucles cancelPatterns et modifyPatterns existantes)
// Rien d'autre — tout email non annule/modifie est traite comme confirmation
```

**APRES — ajouter ce bloc apres la boucle `modifyPatterns` :**
```javascript
const inquiryPatterns = [
  /demande de r[ée]servation/i,
  /reservation request/i,
  /en attente de confirmation/i,
  /en attente de validation/i,
  /pending confirmation/i,
  /awaiting.*confirmation/i,
  /demande.*en attente/i,
];

if (emailType === 'confirmation') {
  for (const pattern of inquiryPatterns) {
    if (pattern.test(subject) || pattern.test(html)) {
      emailType = 'inquiry';
      break;
    }
  }
}
```

---

### 3.3 Nouveau noeud : Demande ? (IF)

| Parametre | Valeur |
|-----------|--------|
| **Nom** | `Demande ?` |
| **Type** | IF |
| **Position** | `[4576, 1648]` |
| **Condition** | `{{ $json.emailType }}` equals `inquiry` |

**Parametres complets :**
```json
{
  "conditions": {
    "options": {
      "caseSensitive": true,
      "leftValue": "",
      "typeValidation": "strict"
    },
    "conditions": [
      {
        "id": "cond-node-wf01-008",
        "leftValue": "={{ $json.emailType }}",
        "rightValue": "inquiry",
        "operator": {
          "type": "string",
          "operation": "equals"
        }
      }
    ],
    "combinator": "and"
  },
  "options": {}
}
```

---

### 3.4 Nouveau noeud : Ignorer demande (NoOp)

| Parametre | Valeur |
|-----------|--------|
| **Nom** | `Ignorer demande` |
| **Type** | No Operation (NoOp) |
| **Position** | `[4832, 1728]` |

Ce noeud ne fait rien. L'email de demande est simplement abandonne — pas d'appel API, pas de creation en base.

---

### 3.5 Noeud deplace : Payload annulation (Code)

**Position mise a jour** pour eviter le chevauchement avec les nouveaux noeuds :

| Parametre | Ancienne valeur | Nouvelle valeur |
|-----------|-----------------|-----------------|
| **Position** | `[4832, 1584]` | `[4832, 1920]` |

Le code du noeud ne change pas.

---

### 3.6 Cablage mis a jour

**AVANT :**
```
Parser email Airbnb ─┐
Parser email Booking ─┤
                      ↓
                Confirmation ? ── oui → Payload confirmation → Upsert reservation
                      │
                      non
                      ↓
                Modification ? ── oui → Payload modification → Upsert reservation
                      │
                      non
                      ↓
                Payload annulation → Upsert reservation
```

**APRES :**
```
Parser email Airbnb ─┐
Parser email Booking ─┤
                      ↓
                Confirmation ? ── oui → Payload confirmation → Upsert reservation
                      │
                      non
                      ↓
                Modification ? ── oui → Payload modification → Upsert reservation
                      │
                      non
                      ↓
                Demande ? ── oui → Ignorer demande (NoOp = FIN)
                      │
                      non
                      ↓
                Payload annulation → Upsert reservation
```

**Connexions modifiees :**

1. **Supprimer** : `Modification ?` (false) → `Payload annulation`
2. **Creer** : `Modification ?` (false) → `Demande ?`
3. **Creer** : `Demande ?` (true) → `Ignorer demande`
4. **Creer** : `Demande ?` (false) → `Payload annulation`

---

### 3.7 Resultat

| Type d'email | emailType | Action |
|---|---|---|
| Confirmation de reservation | `confirmation` | Cree/met a jour la reservation en base |
| Modification de reservation | `modification` | Met a jour la reservation en base |
| Annulation de reservation | `cancellation` | Annule la reservation en base |
| **Demande de reservation** | **`inquiry`** | **Ignore (NoOp) — aucune trace** |

### Cycle de vie

```
1. Email "demande de reservation" recu
   → WF01 detecte emailType = "inquiry"
   → Noeud "Demande ?" = oui → "Ignorer demande" (NoOp)
   → Rien ne se passe. Pas de creation en base. Pas de faux positif iCal.

2. Proprietaire accepte sur Airbnb/Booking
   → Email "confirmation de reservation" recu (nouveau mail, sujet different)
   → WF01 detecte emailType = "confirmation"
   → Reservation creee normalement avec status = 'confirmed'
   → Tache menage + confirmation voyageur declenches

3. Proprietaire refuse sur Airbnb/Booking
   → Aucun email de confirmation n'arrive
   → Rien en base = aucun probleme
```

---

## Pourquoi ces solutions marchent

- `$('Config')` est **inaccessible** dans les noeuds a l'interieur d'un SplitInBatches
- `$('NodeName')` **fonctionne** entre noeuds qui sont tous DANS la boucle
- Le noeud Supabase "Get owner" utilise le credential chiffre existant — pas de secret en dur
- `alwaysOutputData: true` garantit que le noeud renvoie un item meme si aucun user n'est trouve

---

## Patch 4 : Filtrage strict des emails non-reservation

### Probleme

Un email Airbnb "Votre annonce a bien ete masquee" a ete interprete comme une confirmation de reservation car le parser **defaut a `emailType = "confirmation"`**. Tout email ne matchant pas annulation/modification/inquiry etait traite comme une reservation, creant des faux positifs.

### Solution

Inversion de la logique : **defaut a `"unknown"`** au lieu de `"confirmation"`. Les confirmations de reservation exigent desormais un **match positif** (mot-cle reservation dans le sujet). Tout email sans match est ignore.

### 4.1 Parsers mis a jour

**Parser email Airbnb :**
```javascript
var emailType = "unknown"; // etait "confirmation"

if (/annul|cancel/i.test(subject)) emailType = "cancellation";
else if (/modifi|updated|changed/i.test(subject)) emailType = "modification";
else if (/en attente|demande de r|demande.*reservation|reservation request/i.test(subject)) emailType = "inquiry";
// NOUVEAU: match positif requis pour confirmation
else if (/r[eé]serv|confirmée?|séjour|booking confirm/i.test(subject)) emailType = "confirmation";
// Sinon: reste "unknown" → ignore
```

**Parser email Booking :**

Remplacer tout le bloc de detection du type d'email (de `let emailType =` jusqu'a `// --- Extraction du nom du voyageur ---`) par :

```javascript
// IMPORTANT: defaut = 'unknown' — seuls les emails avec match positif sont traites
let emailType = 'unknown'; // etait 'confirmation'

const cancelPatterns = [
  /annul(é|e|ation)/i,
  /cancel(led|lation)/i,
  /[Rr][ée]servation\s+annul[ée]e/i,
  /[Bb]ooking\s+cancell?ation/i,
];

const modifyPatterns = [
  /modifi(é|cation)/i,
  /mis(e)?\s+[àa]\s+jour/i,
  /updated/i,
  /changed/i,
  /changement/i,
];

for (const pattern of cancelPatterns) {
  if (pattern.test(subject) || pattern.test(html)) {
    emailType = 'cancellation';
    break;
  }
}

if (emailType === 'unknown') {
  for (const pattern of modifyPatterns) {
    if (pattern.test(subject) || pattern.test(html)) {
      emailType = 'modification';
      break;
    }
  }
}

// NOUVEAU: patterns inquiry (demandes en attente)
const inquiryPatterns = [
  /demande de r[ée]servation/i,
  /reservation request/i,
  /en attente de confirmation/i,
  /en attente de validation/i,
  /pending confirmation/i,
  /awaiting.*confirmation/i,
  /demande.*en attente/i,
];

if (emailType === 'unknown') {
  for (const pattern of inquiryPatterns) {
    if (pattern.test(subject) || pattern.test(html)) {
      emailType = 'inquiry';
      break;
    }
  }
}

// NOUVEAU: match positif requis pour confirmation
const confirmationPatterns = [
  /r[ée]serv/i,
  /confirm[ée]e?/i,
  /s[ée]jour/i,
  /nouvelle? r[ée]servation/i,
  /new booking/i,
];

if (emailType === 'unknown') {
  for (const pattern of confirmationPatterns) {
    if (pattern.test(subject) || pattern.test(html)) {
      emailType = 'confirmation';
      break;
    }
  }
}
```

> **Changements cles par rapport a l'ancien code :**
> - `let emailType = 'unknown'` au lieu de `'confirmation'`
> - Garde `if (emailType === 'unknown')` au lieu de `'confirmation'` sur le bloc modifyPatterns
> - Ajout du tableau `inquiryPatterns` + son bloc de check (n'existait pas avant)
> - Ajout du tableau `confirmationPatterns` + son bloc de check (n'existait pas avant)

### 4.2 Nouveau routage (Switch)

Remplacer les 4 noeuds IF (`Confirmation ?`, `Modification ?`, `Demande ?`, `Annulation ?`) par **un seul noeud Switch** :

```
Parser Airbnb ──┐
Parser Booking ──┤
                 ↓
        Router par type (Switch)
          ├→ confirmation  → Payload confirmation → Upsert reservation
          ├→ modification  → Payload modification → Upsert reservation
          ├→ cancellation  → Payload annulation   → Upsert reservation
          └→ default       → Ignorer email (NoOp = FIN)
```

> `inquiry` et `unknown` tombent dans `default` → ignores.

**Noeud a creer : `Router par type` (Switch)**

| Parametre | Valeur |
|-----------|--------|
| **Nom** | `Router par type` |
| **Type** | Switch |
| **Position** | `[4576, 1280]` (a la place de `Confirmation ?`) |
| **Routing mode** | Rules |
| **Data type** | String |
| **Value** | `{{ $json.emailType }}` |

**Regles :**

| # | Operation | Value | Output |
|---|-----------|-------|--------|
| 0 | Equals | `confirmation` | → `Payload confirmation` |
| 1 | Equals | `modification` | → `Payload modification` |
| 2 | Equals | `cancellation` | → `Payload annulation` |
| 3 | (default / fallback) | | → `Ignorer email` (NoOp) |

**Parametres complets du noeud :**
```json
{
  "rules": {
    "values": [
      {
        "conditions": {
          "options": { "caseSensitive": true, "leftValue": "", "typeValidation": "strict" },
          "conditions": [{
            "leftValue": "={{ $json.emailType }}",
            "rightValue": "confirmation",
            "operator": { "type": "string", "operation": "equals" }
          }],
          "combinator": "and"
        },
        "renameOutput": true,
        "outputKey": "confirmation"
      },
      {
        "conditions": {
          "options": { "caseSensitive": true, "leftValue": "", "typeValidation": "strict" },
          "conditions": [{
            "leftValue": "={{ $json.emailType }}",
            "rightValue": "modification",
            "operator": { "type": "string", "operation": "equals" }
          }],
          "combinator": "and"
        },
        "renameOutput": true,
        "outputKey": "modification"
      },
      {
        "conditions": {
          "options": { "caseSensitive": true, "leftValue": "", "typeValidation": "strict" },
          "conditions": [{
            "leftValue": "={{ $json.emailType }}",
            "rightValue": "cancellation",
            "operator": { "type": "string", "operation": "equals" }
          }],
          "combinator": "and"
        },
        "renameOutput": true,
        "outputKey": "cancellation"
      }
    ]
  },
  "options": {
    "fallbackOutput": "extra"
  }
}
```

**Connexions :**

| Sortie | Index | Destination |
|--------|-------|-------------|
| `confirmation` | 0 | `Payload confirmation` |
| `modification` | 1 | `Payload modification` |
| `cancellation` | 2 | `Payload annulation` |
| `default` (extra) | 3 | `Ignorer email` (NoOp) |

**Noeuds a supprimer** (remplaces par le Switch) :
- `Confirmation ?` (IF)
- `Modification ?` (IF)
- `Demande ?` (IF)
- `Annulation ?` (IF)
- `Ignorer demande` (NoOp) — fusionne dans le default du Switch

**Noeud a creer :**
- `Ignorer email` (NoOp) — position `[4832, 1648]`

**Connexions a supprimer :**
- `Parser email Airbnb` → `Confirmation ?`
- `Parser email Booking` → `Confirmation ?`
- Toutes les connexions entre les 4 IF

**Connexions a creer :**
- `Parser email Airbnb` → `Router par type`
- `Parser email Booking` → `Router par type`
- `Router par type` output 0 → `Payload confirmation`
- `Router par type` output 1 → `Payload modification`
- `Router par type` output 2 → `Payload annulation`
- `Router par type` output 3 → `Ignorer email`

### 4.3 Resultat

| Type d'email | emailType | Action |
|---|---|---|
| Confirmation de reservation | `confirmation` | Cree/met a jour la reservation |
| Modification de reservation | `modification` | Met a jour la reservation |
| Annulation de reservation | `cancellation` | Annule la reservation |
| Demande de reservation | `inquiry` | Ignore (NoOp) |
| **Tout autre email** | **`unknown`** | **Ignore (NoOp)** |

### 4.4 Tests valides

| Sujet | emailType | Route |
|---|---|---|
| "Reservation confirmee : Villa Sidi Kaouki" | confirmation | Upsert |
| "Votre sejour a Villa Sidi Kaouki est confirme" | confirmation | Upsert |
| "Modification de votre reservation" | modification | Upsert |
| "Reservation annulee" | cancellation | Upsert |
| "En attente : demande de reservation..." | inquiry | Ignorer |
| **"Votre annonce a bien ete masquee"** | **unknown** | **Ignorer** |
| "Nouveau message de Jean" | unknown | Ignorer |
| "Vos revenus de janvier sont disponibles" | unknown | Ignorer |
| "Votre avis compte !" | unknown | Ignorer |

---

*Document mis a jour le 2026-02-15 (Patch 4)*
