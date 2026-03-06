# Node: Code: Create Tasks

**Type** : code
**Mode** : Run Once for Each Item

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| -- | -- | Acces via `$('Code: Validate')`, `$('HTTP: Get Property')`, `$('Config')` |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| language | javaScript | Code JavaScript |
| mode | runOnceForEachItem | Par reservation |

## Code

**Langage** : JavaScript

```javascript
// ============================================================
// WF04 — Create cleaning tasks (checkout_clean + checkin_prep)
// + checklist items from property templates or defaults
// ============================================================

const config = $('Config').item.json;
const reservation = $('Code: Validate').item.json;
const propertyArr = $('HTTP: Get Property').all().map(i => i.json);
const property = Array.isArray(propertyArr[0]) ? propertyArr[0][0] : propertyArr[0];

const supabaseUrl = config.SUPABASE_URL;
const supabaseKey = config.SUPABASE_SERVICE_KEY;

const headers = {
  'apikey': supabaseKey,
  'Authorization': `Bearer ${supabaseKey}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=representation'
};

// --- Default checklists ---
const defaultCheckoutChecklist = [
  'Vider les poubelles',
  'Faire la vaisselle',
  'Changer les draps',
  'Nettoyer la salle de bain',
  'Passer l\'aspirateur',
  'Laver les sols',
  'Sortir les poubelles',
  'Nettoyer les surfaces',
  'Reapprovisionner (savon, papier toilette)',
  'Verifier objets oublies'
];

const defaultCheckinChecklist = [
  'Verifier que le menage checkout a ete effectue',
  'Verifier l\'etat general du logement',
  'Verifier les fournitures (draps, serviettes)',
  'Regler chauffage/climatisation',
  'Verifier cles/digicode',
  'Tester WiFi'
];

const defaultGreetingChecklist = [
  { label: 'Accueillir le voyageur a l\'heure prevue', position: 1 },
  { label: 'Faire la visite guidee du logement', position: 2 },
  { label: 'Remettre les cles / expliquer le digicode', position: 3 },
  { label: 'Montrer les equipements (chauffage, WiFi, electromenager)', position: 4 },
  { label: 'Donner le livret d\'accueil (papier ou QR code)', position: 5 }
];

// --- Fetch property checklists (custom templates) ---
let checkoutItems = defaultCheckoutChecklist;
let checkinItems = defaultCheckinChecklist;
let checklists = [];

try {
  const checklistRes = await fetch(
    `${supabaseUrl}/rest/v1/property_checklists?property_id=eq.${reservation.property_id}&select=type,items`,
    { headers }
  );
  checklists = await checklistRes.json();

  const checkoutTemplate = checklists.find(c => c.type === 'checkout_clean');
  const checkinTemplate = checklists.find(c => c.type === 'checkin_prep');

  if (checkoutTemplate && checkoutTemplate.items && checkoutTemplate.items.length > 0) {
    checkoutItems = checkoutTemplate.items;
  }
  if (checkinTemplate && checkinTemplate.items && checkinTemplate.items.length > 0) {
    checkinItems = checkinTemplate.items;
  }
} catch (err) {
  // Use defaults if fetch fails
}

// --- Calculate scheduled times ---
const checkOutTime = reservation.check_out_time || '11:00';
const checkInTime = reservation.check_in_time || '16:00';

// checkin_prep = check_in_time - 2h (minimum 10:00)
let prepHour = parseInt(checkInTime.split(':')[0]) - 2;
if (prepHour < 10) prepHour = 10;
const checkinPrepTime = String(prepHour).padStart(2, '0') + ':00';

const tasksCreated = [];

// --- 1. Create checkout_clean task ---
const checkoutTask = {
  property_id: reservation.property_id,
  reservation_id: reservation.reservation_id,
  type: 'checkout_clean',
  status: 'pending',
  scheduled_date: reservation.check_out,
  scheduled_time: checkOutTime,
  notes: `Depart de ${reservation.guest_name} (${reservation.nb_guests} pers.)`
};

const checkoutRes = await fetch(
  `${supabaseUrl}/rest/v1/cleaning_tasks`,
  {
    method: 'POST',
    headers,
    body: JSON.stringify(checkoutTask)
  }
);
const checkoutCreated = await checkoutRes.json();
const checkoutId = Array.isArray(checkoutCreated) ? checkoutCreated[0].id : checkoutCreated.id;
tasksCreated.push({ id: checkoutId, type: 'checkout_clean', date: reservation.check_out });

// Create checkout checklist items
const checkoutChecklistItems = checkoutItems.map((label, idx) => ({
  task_id: checkoutId,
  label: label,
  position: idx + 1,
  is_completed: false
}));

await fetch(
  `${supabaseUrl}/rest/v1/task_checklist_items`,
  {
    method: 'POST',
    headers,
    body: JSON.stringify(checkoutChecklistItems)
  }
);

// --- 2. Create check_in_greeting task (if property has staff_checkin) ---
if (property.check_in_mode === 'staff_checkin') {
  const greetingTime = reservation.check_in_time || '16:00';

  // Fetch custom greeting checklist if exists
  let greetingItems = defaultGreetingChecklist;
  try {
    const greetingTemplate = checklists.find(c => c.type === 'check_in_greeting');
    if (greetingTemplate && greetingTemplate.items && greetingTemplate.items.length > 0) {
      greetingItems = greetingTemplate.items;
    }
  } catch (err) {
    // Use defaults
  }

  const greetingTask = {
    property_id: reservation.property_id,
    reservation_id: reservation.reservation_id,
    type: 'check_in_greeting',
    status: 'pending',
    scheduled_date: reservation.check_in,
    scheduled_time: greetingTime,
    notes: `Accueil de ${reservation.guest_name} (${reservation.nb_guests} pers.) prevu a ${greetingTime}`
  };

  const greetingRes = await fetch(
    `${supabaseUrl}/rest/v1/cleaning_tasks`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify(greetingTask)
    }
  );
  const greetingCreated = await greetingRes.json();
  const greetingId = Array.isArray(greetingCreated) ? greetingCreated[0].id : greetingCreated.id;
  tasksCreated.push({ id: greetingId, type: 'check_in_greeting', date: reservation.check_in });

  // Create greeting checklist items
  const greetingChecklistItems = greetingItems.map((item, idx) => ({
    task_id: greetingId,
    label: typeof item === 'string' ? item : item.label,
    position: typeof item === 'string' ? idx + 1 : item.position,
    is_completed: false
  }));

  await fetch(
    `${supabaseUrl}/rest/v1/task_checklist_items`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify(greetingChecklistItems)
    }
  );
}

// --- 3. Create checkin_prep task (if check_in != check_out) ---
if (reservation.check_in !== reservation.check_out) {
  const checkinTask = {
    property_id: reservation.property_id,
    reservation_id: reservation.reservation_id,
    type: 'checkin_prep',
    status: 'pending',
    scheduled_date: reservation.check_in,
    scheduled_time: checkinPrepTime,
    notes: `Arrivee de ${reservation.guest_name} (${reservation.nb_guests} pers.) prevue a ${checkInTime}`
  };

  const checkinRes = await fetch(
    `${supabaseUrl}/rest/v1/cleaning_tasks`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify(checkinTask)
    }
  );
  const checkinCreated = await checkinRes.json();
  const checkinId = Array.isArray(checkinCreated) ? checkinCreated[0].id : checkinCreated.id;
  tasksCreated.push({ id: checkinId, type: 'checkin_prep', date: reservation.check_in });

  // Create checkin checklist items
  const checkinChecklistItems = checkinItems.map((label, idx) => ({
    task_id: checkinId,
    label: label,
    position: idx + 1,
    is_completed: false
  }));

  await fetch(
    `${supabaseUrl}/rest/v1/task_checklist_items`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify(checkinChecklistItems)
    }
  );
}

return [{
  json: {
    reservation_id: reservation.reservation_id,
    property_id: reservation.property_id,
    property_name: property.name,
    property_address: property.address,
    owner_id: property.owner_id,
    guest_name: reservation.guest_name,
    nb_guests: reservation.nb_guests,
    check_in: reservation.check_in,
    check_out: reservation.check_out,
    tasks_created: tasksCreated,
    tasks_count: tasksCreated.length
  }
}];
```

## Sortie attendue

```json
{
  "reservation_id": "uuid-reservation",
  "property_id": "uuid-property",
  "property_name": "Studio Marais",
  "property_address": "12 rue des Rosiers, 75004 Paris",
  "owner_id": "uuid-owner",
  "guest_name": "Jean Dupont",
  "nb_guests": 2,
  "check_in": "2026-03-15",
  "check_out": "2026-03-18",
  "tasks_created": [
    { "id": "uuid-task-checkout", "type": "checkout_clean", "date": "2026-03-18" },
    { "id": "uuid-task-checkin", "type": "checkin_prep", "date": "2026-03-15" }
  ],
  "tasks_count": 2
}
```

## Connexions

- **Entree** : IF: Task Exists? (sortie true — 0 tasks)
- **Sortie** : HTTP: Get Available Staff
