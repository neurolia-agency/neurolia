# Systeme de Seed Data

## Principe

Le seed data permet de peupler la base de donnees avec un scenario realiste complet, pour tester visuellement toutes les pages du dashboard sans dependre des integrations externes.

## Fichiers

| Fichier | Description |
|---------|-------------|
| `seed-scenario.sql` | SQL complet avec donnees realistes (dates relatives NOW()) |
| `seed-auth-users.md` | Instructions manuelles pour creer les users dans Supabase Auth |
| `reset-seed.sql` | Nettoyage complet + re-seed (idempotent) |

## Utilisation

### 1. Creer les utilisateurs auth

Suivre les instructions dans `seed-auth-users.md` pour creer les utilisateurs dans Supabase Auth Dashboard (ou via CLI).

### 2. Executer le seed

```bash
# Option A : Via Supabase CLI
supabase db reset --db-url postgresql://... < seed/seed-scenario.sql

# Option B : Via psql
psql $DATABASE_URL < seed/seed-scenario.sql

# Option C : Via npm script (si configure)
npm run db:seed
```

### 3. Reset (nettoyage + re-seed)

```bash
psql $DATABASE_URL < seed/reset-seed.sql
psql $DATABASE_URL < seed/seed-scenario.sql
```

## Principes

### Dates Relatives
Toutes les dates utilisent `NOW()` et `NOW() + INTERVAL` pour etre toujours pertinentes :

```sql
-- Evenement aujourd'hui
NOW()::date

-- Evenement demain
(NOW() + INTERVAL '1 day')::date

-- Evenement la semaine derniere
(NOW() - INTERVAL '7 days')::date

-- Evenement dans 2 semaines
(NOW() + INTERVAL '14 days')::date
```

### Idempotence
Le seed est re-executable sans erreur grace a `ON CONFLICT DO NOTHING` :

```sql
INSERT INTO entities (id, name, ...) VALUES (...)
ON CONFLICT (id) DO NOTHING;
```

### Couverture
Le seed DOIT couvrir :
- [ ] Toutes les pages du dashboard affichent des donnees
- [ ] Les filtres ont des resultats (chaque statut a au moins 1 entite)
- [ ] Le calendrier/timeline a des evenements aujourd'hui, demain, et la semaine prochaine
- [ ] Les KPIs calculent des valeurs non-zero
- [ ] Les vues staff/role restreint ont des donnees visibles
- [ ] Les alertes/notifications ont des cas a afficher

### Separation
- **Seed ≠ Schema** — le seed ne cree pas de tables, il les remplit
- **Seed ≠ Migration** — le seed n'est pas versionne dans les migrations
- Les UUIDs du seed sont fixes (pour etre references entre tables)
