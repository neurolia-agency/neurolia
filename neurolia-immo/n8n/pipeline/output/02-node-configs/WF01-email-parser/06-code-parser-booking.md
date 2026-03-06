# Node: Code: Parser Booking

**Type** : code
**Mode** : Run Once for Each Item

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| -- | -- | Acces via `$input.item.json` dans le code |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| language | javaScript | Code JavaScript |
| mode | runOnceForEachItem | Traite chaque email individuellement |

## Code

**Langage** : JavaScript

```javascript
// ============================================================
// WF01 — Parse Booking.com email (v2)
// Formats: confirmation, modification, annulation
// ============================================================

const html = $input.item.json.textHtml || $input.item.json.html || "";
const subject = $input.item.json.subject || "";
const messageId = $input.item.json.messageId || "";

// --- Detection du type d'email ---
let emailType = "unknown";

if (/annul/i.test(subject) || /cancel/i.test(subject)) {
  emailType = "cancellation";
} else if (/modifi/i.test(subject) || /updated/i.test(subject) || /changed/i.test(subject)) {
  emailType = "modification";
} else if (/confirm/i.test(subject) || /nouvelle?\s+r[eé]servation/i.test(subject) || /new\s+booking/i.test(subject) || /new\s+reservation/i.test(subject)) {
  emailType = "confirmation";
} else if (/renseignement/i.test(subject) || /inquiry/i.test(subject)) {
  emailType = "inquiry";
}

// --- Extraction du nom du voyageur ---
let guestName = "";
let m;

// Pattern 1: "Nom du client : Jean Dupont" (Booking FR)
m = html.match(/[Nn]om\s+(?:du\s+)?(?:client|voyageur|guest)\s*:?\s*<[^>]*>\s*([^<]+)/);
if (!m) m = html.match(/[Nn]om\s+(?:du\s+)?(?:client|voyageur|guest)\s*:?\s*([A-Z\u00C0-\u00DC][a-z\u00E0-\u00FC]+(?:\s+[A-Z\u00C0-\u00DC][a-z\u00E0-\u00FC]+)*)/);

// Pattern 2: "Guest name: ..."
if (!m) m = html.match(/[Gg]uest\s+name\s*:?\s*<[^>]*>\s*([^<]+)/);
if (!m) m = html.match(/[Gg]uest\s+name\s*:?\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/);

// Pattern 3: "Booked by ..." ou "Reserve par ..."
if (!m) m = html.match(/(?:[Bb]ooked\s+by|[Rr][eé]serv[eé]\s+par)\s*:?\s*([A-Z\u00C0-\u00DC][a-z\u00E0-\u00FC]+(?:\s+[A-Z\u00C0-\u00DC][a-z\u00E0-\u00FC]+)*)/);

// Pattern 4: dans le sujet "reservation de Jean Dupont"
if (!m) m = subject.match(/(?:de|by|from)\s+([A-Z\u00C0-\u00DC][a-z\u00E0-\u00FC]+(?:\s+[A-Z\u00C0-\u00DC][a-z\u00E0-\u00FC]+)*)/);

if (m) guestName = m[1].trim();

// --- Extraction des dates ---
const moisFR = {
  "janv": "01", "janvier": "01", "jan": "01",
  "fevr": "02", "f\u00e9vr": "02", "fevrier": "02", "f\u00e9vrier": "02", "fev": "02", "feb": "02",
  "mars": "03", "mar": "03", "march": "03",
  "avr": "04", "avril": "04", "apr": "04", "april": "04",
  "mai": "05", "may": "05",
  "juin": "06", "jun": "06", "june": "06",
  "juil": "07", "juillet": "07", "jul": "07", "july": "07",
  "aout": "08", "ao\u00fbt": "08", "aug": "08", "august": "08",
  "sept": "09", "septembre": "09", "sep": "09", "september": "09",
  "oct": "10", "octobre": "10", "october": "10",
  "nov": "11", "novembre": "11", "november": "11",
  "dec": "12", "d\u00e9c": "12", "decembre": "12", "d\u00e9cembre": "12", "december": "12"
};

const moisEN = {
  "january": "01", "february": "02", "march": "03", "april": "04",
  "may": "05", "june": "06", "july": "07", "august": "08",
  "september": "09", "october": "10", "november": "11", "december": "12"
};

function getMonth(str) {
  const key = str.toLowerCase().replace(/\./g, "");
  return moisFR[key] || moisEN[key] || null;
}

let checkIn = "";
let checkOut = "";

// Pattern 1: "Check-in: 15 March 2026" / "Arrivee : 15 mars 2026" (Booking format)
const arrM = html.match(/(?:[Cc]heck[\s-]*in|[Aa]rriv[eé]e)\s*:?\s*(?:<[^>]*>\s*)*(\d{1,2})\s+([\wéûô]+)\.?\s+(\d{4})/);
const depM = html.match(/(?:[Cc]heck[\s-]*out|[Dd][eé]part)\s*:?\s*(?:<[^>]*>\s*)*(\d{1,2})\s+([\wéûô]+)\.?\s+(\d{4})/);

if (arrM) {
  const am = getMonth(arrM[2]);
  if (am) checkIn = arrM[3] + "-" + am + "-" + arrM[1].padStart(2, "0");
}
if (depM) {
  const dm = getMonth(depM[2]);
  if (dm) checkOut = depM[3] + "-" + dm + "-" + depM[1].padStart(2, "0");
}

// Pattern 2: format "YYYY-MM-DD" (Booking API-style)
if (!checkIn) {
  m = html.match(/(?:[Cc]heck[\s-]*in|[Aa]rriv[eé]e)\s*:?\s*(?:<[^>]*>\s*)*(\d{4}-\d{2}-\d{2})/);
  if (m) checkIn = m[1];
}
if (!checkOut) {
  m = html.match(/(?:[Cc]heck[\s-]*out|[Dd][eé]part)\s*:?\s*(?:<[^>]*>\s*)*(\d{4}-\d{2}-\d{2})/);
  if (m) checkOut = m[1];
}

// Pattern 3: format compact "15 - 18 mars 2026"
if (!checkIn) {
  m = (subject + " " + html).match(/(\d{1,2})\s*[\u2013\u2014-]\s*(\d{1,2})\s+([\wéûô]+)\.?\s+(\d{4})/);
  if (m) {
    const month = getMonth(m[3]);
    if (month) {
      checkIn = m[4] + "-" + month + "-" + m[1].padStart(2, "0");
      checkOut = m[4] + "-" + month + "-" + m[2].padStart(2, "0");
    }
  }
}

// --- Extraction check-in / check-out times ---
let checkInTime = "";
let checkOutTime = "";

m = html.match(/(?:[Cc]heck[\s-]*in|[Aa]rriv[eé]e)[^<\d]*?(\d{1,2})[h:]\s*(\d{2})?/);
if (m) checkInTime = m[1].padStart(2, "0") + ":" + (m[2] || "00");

m = html.match(/(?:[Cc]heck[\s-]*out|[Dd][eé]part)[^<\d]*?(\d{1,2})[h:]\s*(\d{2})?/);
if (m) checkOutTime = m[1].padStart(2, "0") + ":" + (m[2] || "00");

// --- Extraction du nombre de voyageurs ---
let nbGuests = 1;
m = html.match(/(\d+)\s+(?:voyageur|guest|person|adulte|traveller)/i);
if (!m) m = html.match(/(?:voyageurs?|guests?|persons?)\s*:?\s*(\d+)/i);
if (m) nbGuests = parseInt(m[1], 10);

// --- Extraction du montant ---
let amount = null;
m = html.match(/[Tt]otal\s*(?:price|prix)?\s*:?\s*(?:<[^>]*>\s*)*[\u20ac]?\s*([\d\s]+[.,]\d{2})/);
if (!m) m = html.match(/[Pp]rix\s*:?\s*[\u20ac]?\s*([\d\s]+[.,]\d{2})/);
if (!m) m = html.match(/[\u20acEUR]\s*([\d\s]+[.,]\d{2})/);
if (!m) m = html.match(/([\d\s]+[.,]\d{2})\s*[\u20acEUR]/);
if (m) {
  amount = parseFloat(m[1].replace(/\s/g, "").replace(",", "."));
}

// --- Extraction de la reference Booking ---
let platformRefId = "";
m = html.match(/[Nn](?:uméro|umero|°|o)\s*(?:de\s+)?(?:r[eé]servation|confirmation|booking)\s*:?\s*(?:<[^>]*>\s*)*(\d{6,14})/);
if (!m) m = html.match(/[Bb]ooking\s*(?:number|reference|ref)\s*:?\s*(?:<[^>]*>\s*)*(\d{6,14})/);
if (!m) m = html.match(/[Cc]onfirmation\s*(?:number|code)\s*:?\s*(?:<[^>]*>\s*)*(\d{6,14})/);
if (!m) m = subject.match(/\b(\d{8,14})\b/);
if (m) platformRefId = m[1].trim();

// --- Extraction du nom de la propriete ---
let propertyName = "";
m = html.match(/(?:votre\s+)?(?:logement|bien|propri[eé]t[eé]|h[eé]bergement|(?:your\s+)?property)\s*:?\s*(?:<[^>]*>\s*)*([^<\n"]+)/i);
if (!m) m = html.match(/[Ll]ogement\s*:\s*([^<\n]+)/);
if (!m) m = subject.match(/(?:pour|for|at)\s+(.+?)(?:\s*[-–—]|\s*$)/i);
if (m) {
  propertyName = m[1].trim().replace(/["\u00ab\u00bb]/g, "").trim();
}

// --- Construction de l'output ---
const result = {
  platform: "booking",
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
  "platform": "booking",
  "emailType": "confirmation",
  "guestName": "Marie Martin",
  "checkIn": "2026-03-20",
  "checkOut": "2026-03-23",
  "checkInTime": "14:00",
  "checkOutTime": "10:00",
  "nbGuests": 3,
  "amount": 520.00,
  "platformRefId": "4012345678",
  "propertyName": "Appartement Bastille",
  "sourceEmailId": "<xyz789@booking.com>",
  "_parseQuality": {
    "guestName": true,
    "dates": true,
    "amount": true,
    "reference": true,
    "property": true
  },
  "_rawSubject": "Nouvelle reservation - Marie Martin",
  "_isPartialParse": false
}
```

## Connexions

- **Entree** : Switch: Email Router (sortie 1)
- **Sortie** : Switch: Type Detector

## Notes

- Les emails Booking.com utilisent souvent un mix FR/EN selon la configuration du compte
- Les references Booking sont numeriques (pas prefixe HM comme Airbnb)
- Les mois sont cherches en FR et EN (Booking envoie parfois en anglais)
