# Node: Code: Parser Airbnb

**Type** : code
**Mode** : Run Once for Each Item

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| -- | -- | Acces via `$input.first().json` dans le code |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| language | javaScript | Code JavaScript |
| mode | runOnceForEachItem | Traite chaque email individuellement |

## Code

**Langage** : JavaScript

```javascript
// ============================================================
// WF01 — Parse Airbnb email (v2 — adapte au format reel)
// IMPORTANT: utilise textHtml (pas html) pour IMAP v2
// ============================================================

const html = $input.item.json.textHtml || $input.item.json.html || "";
const subject = $input.item.json.subject || "";
const messageId = $input.item.json.messageId || "";

// --- Detection du type d'email ---
let emailType = "unknown"; // v2: default unknown (pas confirmation) pour eviter faux positifs

if (/annul/i.test(subject) || /cancel/i.test(subject)) {
  emailType = "cancellation";
} else if (/modifi/i.test(subject) || /updated/i.test(subject) || /changed/i.test(subject)) {
  emailType = "modification";
} else if (/r[eé]serv/i.test(subject) || /confirm/i.test(subject) || /en attente/i.test(subject) || /demande de r/i.test(subject)) {
  emailType = "confirmation";
} else if (/renseignement/i.test(subject) || /inquiry/i.test(subject) || /question/i.test(subject)) {
  emailType = "inquiry";
}

// --- Extraction du nom du voyageur ---
let guestName = "";

// Pattern 1: "demande de Alexis" ou "demande de Jean Dupont"
let m = subject.match(/demande de ([A-Z\u00C0-\u00DC][a-z\u00E0-\u00FC]+(?:\s+[A-Z\u00C0-\u00DC][a-z\u00E0-\u00FC]+)*)/);
if (m) guestName = m[1].trim();

// Pattern 2: dans le HTML "demande de Alexis"
if (!guestName) {
  m = html.match(/demande de ([A-Z\u00C0-\u00DC][a-z\u00E0-\u00FC]+(?:\s+[A-Z\u00C0-\u00DC][a-z\u00E0-\u00FC]+)*)/);
  if (m) guestName = m[1].trim();
}

// Pattern 3: "a reserve" ou "a reserve"
if (!guestName) {
  m = html.match(/([A-Z\u00C0-\u00DC][a-z\u00E0-\u00FC]+(?:\s+[A-Z\u00C0-\u00DC][a-z\u00E0-\u00FC]+)*)\s+a\s+r[eé]serv/);
  if (m) guestName = m[1].trim();
}

// Pattern 4: aria-label avec un prenom
if (!guestName) {
  m = html.match(/aria-label="([A-Z\u00C0-\u00DC][a-z\u00E0-\u00FC]+(?:\s+[A-Z\u00C0-\u00DC][a-z\u00E0-\u00FC]+)*)"/);
  if (m) guestName = m[1].trim();
}

// Pattern 5: "Votre voyageur : Xxx"
if (!guestName) {
  m = html.match(/voyageur\s*:\s*([A-Z\u00C0-\u00DC][a-z\u00E0-\u00FC]+(?:\s+[A-Z\u00C0-\u00DC][a-z\u00E0-\u00FC]+)*)/i);
  if (m) guestName = m[1].trim();
}

// --- Extraction des dates ---
const moisFR = {
  "janv": "01", "janvier": "01", "jan": "01",
  "fevr": "02", "f\u00e9vr": "02", "fevrier": "02", "f\u00e9vrier": "02", "fev": "02", "feb": "02",
  "mars": "03", "mar": "03",
  "avr": "04", "avril": "04", "apr": "04",
  "mai": "05", "may": "05",
  "juin": "06", "jun": "06",
  "juil": "07", "juillet": "07", "jul": "07",
  "aout": "08", "ao\u00fbt": "08", "aug": "08",
  "sept": "09", "septembre": "09", "sep": "09",
  "oct": "10", "octobre": "10",
  "nov": "11", "novembre": "11",
  "dec": "12", "d\u00e9c": "12", "decembre": "12", "d\u00e9cembre": "12"
};

function getMonth(str) {
  const key = str.toLowerCase().replace(/\./g, "");
  return moisFR[key] || null;
}

let checkIn = "";
let checkOut = "";

// Pattern 1: format compact "19-20 fevr. 2026" (jour-jour mois annee)
m = subject.match(/(\d{1,2})\s*[\u2013\u2014-]\s*(\d{1,2})\s+([\w\u00e9\u00fb\u00f4]+)\.?\s+(\d{4})/);
if (!m) m = html.match(/(\d{1,2})\s*[\u2013\u2014-]\s*(\d{1,2})\s+([\w\u00e9\u00fb\u00f4]+)\.?\s+(\d{4})/);
if (m) {
  const month = getMonth(m[3]);
  if (month) {
    checkIn = m[4] + "-" + month + "-" + m[1].padStart(2, "0");
    checkOut = m[4] + "-" + month + "-" + m[2].padStart(2, "0");
  }
}

// Pattern 2: format complet "19 fevr. 2026 - 20 fevr. 2026"
if (!checkIn) {
  m = (subject + " " + html).match(/(\d{1,2})\s+([\w\u00e9\u00fb\u00f4]+)\.?\s+(\d{4})\s*[\u2013\u2014-]\s*(\d{1,2})\s+([\w\u00e9\u00fb\u00f4]+)\.?\s+(\d{4})/);
  if (m) {
    const m1 = getMonth(m[2]);
    const m2 = getMonth(m[5]);
    if (m1) checkIn = m[3] + "-" + m1 + "-" + m[1].padStart(2, "0");
    if (m2) checkOut = m[6] + "-" + m2 + "-" + m[4].padStart(2, "0");
  }
}

// Pattern 3: "Arrivee" et "Depart" dans le HTML
if (!checkIn) {
  const arrM = html.match(/[Aa]rriv[eé]e[^<\d]*?(\d{1,2})\s+([\w\u00e9\u00fb\u00f4]+)\.?\s+(\d{4})/);
  const depM = html.match(/[Dd][eé]part[^<\d]*?(\d{1,2})\s+([\w\u00e9\u00fb\u00f4]+)\.?\s+(\d{4})/);
  if (arrM) {
    const am = getMonth(arrM[2]);
    if (am) checkIn = arrM[3] + "-" + am + "-" + arrM[1].padStart(2, "0");
  }
  if (depM) {
    const dm = getMonth(depM[2]);
    if (dm) checkOut = depM[3] + "-" + dm + "-" + depM[1].padStart(2, "0");
  }
}

// --- Extraction check-in / check-out times ---
let checkInTime = "";
let checkOutTime = "";

m = html.match(/[Aa]rriv[eé]e[^<\d]*?(\d{1,2})[h:]\s*(\d{2})?/);
if (m) checkInTime = m[1].padStart(2, "0") + ":" + (m[2] || "00");

m = html.match(/[Dd][eé]part[^<\d]*?(\d{1,2})[h:]\s*(\d{2})?/);
if (m) checkOutTime = m[1].padStart(2, "0") + ":" + (m[2] || "00");

// --- Extraction du nombre de voyageurs ---
let nbGuests = 1;
m = html.match(/(\d+)\s+voyageur/i);
if (!m) m = html.match(/(\d+)\s+guest/i);
if (!m) m = html.match(/voyageurs?\s*:\s*(\d+)/i);
if (m) nbGuests = parseInt(m[1], 10);

// --- Extraction du montant ---
let amount = null;
m = html.match(/[Tt]otal[^0-9\u20ac]*[\u20ac]?\s*([\d\s]+[.,]\d{2})\s*[\u20acEUR]?/);
if (!m) m = html.match(/[Rr]evenus?\s*:?\s*[\u20ac]?\s*([\d\s]+[.,]\d{2})/);
if (!m) m = html.match(/[\u20acEUR]\s*([\d\s]+[.,]\d{2})/);
if (!m) m = html.match(/([\d\s]+[.,]\d{2})\s*[\u20acEUR]/);
if (m) {
  amount = parseFloat(m[1].replace(/\s/g, "").replace(",", "."));
}

// --- Extraction de la reference Airbnb ---
let platformRefId = "";
m = html.match(/reservations\/details\/(HM[A-Z0-9]+)/);
if (!m) m = html.match(/\b(HM[A-Z0-9]{6,12})\b/);
if (!m) m = subject.match(/\b(HM[A-Z0-9]{6,12})\b/);
if (!m) m = html.match(/[Cc]ode\s+de\s+confirmation\s*:?\s*([A-Z0-9]{8,14})/);
if (!m) m = html.match(/[Cc]onfirmation\s+code\s*:?\s*([A-Z0-9]{8,14})/);
if (m) platformRefId = m[1].trim();

// --- Extraction du nom de la propriete ---
let propertyName = "";
m = subject.match(/l'annonce\s+(.+?)\s+pour\s/i);
if (!m) m = subject.match(/annonce\s+(.+?)\s+pour\s/i);
if (!m) m = subject.match(/concernant\s+(.+?)\s+pour\s/i);
if (!m) m = html.match(/votre\s+(?:logement|bien|propri[eé]t[eé]|appartement|studio|maison|annonce)\s+([^<\n"]+)/i);
if (!m) m = html.match(/[Ll]ogement\s*:\s*([^<\n]+)/);
if (m) {
  propertyName = m[1].trim().replace(/["\u00ab\u00bb]/g, "").trim();
}

// --- Construction de l'output ---
const result = {
  platform: "airbnb",
  emailType: emailType,
  guestName: guestName || "[NON DETECTE]",
  checkIn: checkIn || "[NON DETECTE]",
  checkOut: checkOut || "[NON DETECTE]",
  checkInTime: checkInTime || null,
  checkOutTime: checkOutTime || null,
  nbGuests: nbGuests,
  amount: amount,
  platformRefId: platformRefId || "[NON DETECTE]",
  propertyName: propertyName || "[NON DETECTE]",
  sourceEmailId: messageId,
  _parseQuality: {
    guestName: !!guestName,
    dates: !!(checkIn && checkOut),
    amount: amount !== null,
    reference: !!platformRefId,
    property: !!propertyName
  },
  _rawSubject: subject
};

const criticalFields = [guestName, checkIn, checkOut, platformRefId];
result._isPartialParse = criticalFields.some(f => !f);

return [{ json: result }];
```

## Sortie attendue

```json
{
  "platform": "airbnb",
  "emailType": "confirmation",
  "guestName": "Jean Dupont",
  "checkIn": "2026-03-15",
  "checkOut": "2026-03-18",
  "checkInTime": "15:00",
  "checkOutTime": "11:00",
  "nbGuests": 2,
  "amount": 450.00,
  "platformRefId": "HMXXXXXXXXXX",
  "propertyName": "Studio Marais",
  "sourceEmailId": "<abc123@airbnb.com>",
  "_parseQuality": {
    "guestName": true,
    "dates": true,
    "amount": true,
    "reference": true,
    "property": true
  },
  "_rawSubject": "Reservation confirmee - 15-18 mars 2026",
  "_isPartialParse": false
}
```

## Connexions

- **Entree** : Switch: Email Router (sortie 0)
- **Sortie** : Switch: Type Detector
