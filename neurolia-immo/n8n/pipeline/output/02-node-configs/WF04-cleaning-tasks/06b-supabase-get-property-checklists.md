# Node: Supabase: Get Property Checklists

**Type** : supabase (n8n-nodes-base.supabase)
**Credential** : supabaseApi — CRED-03-NATIVE (Supabase Neurolia Immo)

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| operation | getAll | Lecture multiple |
| tableId | property_checklists | Table Supabase |
| returnAll | true | Retourne toutes les checklists du bien |
| filterType | string | Filtre en syntaxe PostgREST |
| filterString | `=property_id=eq.{{ $('Supabase: Get Property').item.json.id }}` | Checklists liees au bien |

## Sortie attendue

```json
[
  {
    "id": "uuid-checklist-1",
    "property_id": "uuid-property",
    "type": "checkout_clean",
    "label": "Nettoyer la salle de bain",
    "position": 1
  },
  {
    "id": "uuid-checklist-2",
    "property_id": "uuid-property",
    "type": "checkout_clean",
    "label": "Changer les draps",
    "position": 2
  }
]
```

## Connexions

- **Entree** : IF: Task Exists? (sortie false)
- **Sortie** : Code: Create Tasks

## Notes

- Nouveau noeud — extrait de l'ancien fetch() dans Code: Create Tasks
- Recupere toutes les checklists du bien pour les associer aux taches creees
- Le Code: Create Tasks filtre par `type` (checkout_clean, checkin_prep, check_in_greeting) selon les taches a creer
