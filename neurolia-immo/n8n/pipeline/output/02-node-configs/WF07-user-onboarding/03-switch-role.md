# Node: Switch: Role

**Type** : switch
**Mode** : Run Once for Each Item

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| value | `={{ $('Webhook Trigger').item.json.body.role }}` | Role du nouvel utilisateur |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| dataType | string | Comparaison chaine |
| rules[0].value | owner | Proprietaire |
| rules[0].operation | equal | Egalite |
| rules[0].output | 0 | → Flow A (Owner) |
| rules[1].value | cleaning_staff | Staff entretien |
| rules[1].operation | equal | Egalite |
| rules[1].output | 1 | → Flow B (Staff) |

## Connexions

- **Entree** : Config
- **Sortie 0** : Code: Build Owner Welcome Email
- **Sortie 1** : HTTP: Get Owner Profile (Staff flow)
