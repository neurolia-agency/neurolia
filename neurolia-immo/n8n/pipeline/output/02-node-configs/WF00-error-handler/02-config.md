# Node: Config

**Type** : set
**Mode** : Run Once for All Items

## Expressions d'entree

| Champ | Expression | Description |
|-------|-----------|-------------|
| -- | -- | Variables chargees statiquement |

## Parametres

| Parametre | Valeur | Notes |
|-----------|--------|-------|
| mode | manual | Valeurs definies manuellement |
| assignments[0].name | ADMIN_EMAIL | Email admin technique |
| assignments[0].value | `={{ $env.ADMIN_EMAIL }}` | Ex: dorian@neurolia.fr |
| assignments[1].name | DASHBOARD_URL | URL base app |
| assignments[1].value | `={{ $env.DASHBOARD_URL }}` | Ex: https://app.locimmo.fr |
| assignments[2].name | SMTP_FROM_EMAIL | Email expediteur |
| assignments[2].value | `={{ $env.SMTP_FROM_EMAIL }}` | Ex: noreply@locimmo.fr |

## Sortie attendue

```json
{
  "ADMIN_EMAIL": "dorian@neurolia.fr",
  "DASHBOARD_URL": "https://app.locimmo.fr",
  "SMTP_FROM_EMAIL": "noreply@locimmo.fr"
}
```

## Connexions

- **Entree** : Error Trigger
- **Sortie** : Code: Format Error
