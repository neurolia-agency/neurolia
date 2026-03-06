# Node: Code: Assign Round-Robin

**Type** : code
**Mode** : Run Once for Each Item

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| -- | -- | Acces via `$('HTTP: Get Available Staff')`, `$('Code: Create Tasks')`, `$('Config')` |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| language | javaScript | Code JavaScript |
| mode | runOnceForEachItem | Par reservation |

## Code

**Langage** : JavaScript

```javascript
// ============================================================
// WF04 — Round-robin staff assignment
// Assigner au staff avec le moins de taches cette semaine
// ============================================================

const config = $('Config').item.json;
const taskData = $('Code: Create Tasks').item.json;
const staffArr = $('HTTP: Get Available Staff').all().map(i => i.json);
const staffList = Array.isArray(staffArr[0]) ? staffArr[0] : staffArr;

if (!staffList || staffList.length === 0) {
  // Pas de staff disponible — taches creees mais non assignees
  return [{
    json: {
      ...taskData,
      assignments: [],
      no_staff_available: true
    }
  }];
}

const supabaseUrl = config.SUPABASE_URL;
const supabaseKey = config.SUPABASE_SERVICE_KEY;
const headers = {
  'apikey': supabaseKey,
  'Authorization': `Bearer ${supabaseKey}`,
  'Content-Type': 'application/json'
};

// --- Compter les taches par staff cette semaine ---
const now = new Date();
const monday = new Date(now);
monday.setDate(now.getDate() - now.getDay() + 1);
const sunday = new Date(monday);
sunday.setDate(monday.getDate() + 6);

const mondayStr = monday.toISOString().slice(0, 10);
const sundayStr = sunday.toISOString().slice(0, 10);

const staffIds = staffList.map(s => s.id);
const staffIdsFilter = staffIds.map(id => `"${id}"`).join(',');

let taskCounts = {};
try {
  const countRes = await fetch(
    `${supabaseUrl}/rest/v1/cleaning_tasks?assigned_to=in.(${staffIdsFilter})&scheduled_date=gte.${mondayStr}&scheduled_date=lte.${sundayStr}&select=assigned_to`,
    { headers }
  );
  const weekTasks = await countRes.json();

  for (const t of weekTasks) {
    taskCounts[t.assigned_to] = (taskCounts[t.assigned_to] || 0) + 1;
  }
} catch (err) {
  // If count fails, use empty counts (all staff equal)
}

// --- Assigner chaque tache au staff avec le moins de taches ---
const assignments = [];

for (const task of taskData.tasks_created) {
  // Trouver le staff avec le moins de taches
  let minCount = Infinity;
  let candidates = [];

  for (const staff of staffList) {
    const count = taskCounts[staff.id] || 0;
    if (count < minCount) {
      minCount = count;
      candidates = [staff];
    } else if (count === minCount) {
      candidates.push(staff);
    }
  }

  // Si egalite, choix aleatoire
  const chosen = candidates[Math.floor(Math.random() * candidates.length)];

  // Update la tache en base
  try {
    await fetch(
      `${supabaseUrl}/rest/v1/cleaning_tasks?id=eq.${task.id}`,
      {
        method: 'PATCH',
        headers: { ...headers, 'Prefer': 'return=representation' },
        body: JSON.stringify({ assigned_to: chosen.id })
      }
    );
  } catch (err) {
    // Assignment failed — task remains unassigned
  }

  // Incrementer le compteur pour le prochain tour
  taskCounts[chosen.id] = (taskCounts[chosen.id] || 0) + 1;

  assignments.push({
    task_id: task.id,
    task_type: task.type,
    task_date: task.date,
    staff_id: chosen.id,
    staff_name: chosen.display_name,
    staff_email: chosen.email
  });
}

return [{
  json: {
    ...taskData,
    assignments: assignments,
    no_staff_available: false
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
  "guest_name": "Jean Dupont",
  "nb_guests": 2,
  "tasks_created": [...],
  "assignments": [
    {
      "task_id": "uuid-task-checkout",
      "task_type": "checkout_clean",
      "task_date": "2026-03-18",
      "staff_id": "uuid-staff-1",
      "staff_name": "Sarah Martin",
      "staff_email": "sarah@exemple.fr"
    },
    {
      "task_id": "uuid-task-checkin",
      "task_type": "checkin_prep",
      "task_date": "2026-03-15",
      "staff_id": "uuid-staff-2",
      "staff_name": "Pierre Durand",
      "staff_email": "pierre@exemple.fr"
    }
  ],
  "no_staff_available": false
}
```

## Connexions

- **Entree** : HTTP: Get Available Staff
- **Sortie** : Code: Build Notification Emails
