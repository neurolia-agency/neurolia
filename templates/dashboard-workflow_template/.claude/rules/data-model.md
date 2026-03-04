# Conventions Data Model

## Nommage

### Tables
- `snake_case` minuscules (ex: `cleaning_tasks`, `staff_invitations`)
- Pluriel pour les tables de donnees (ex: `properties`, `reservations`)
- Singulier pour les tables de configuration (ex: `app_config`)

### Colonnes
- `snake_case` minuscules
- Foreign keys : `[table_singulier]_id` (ex: `property_id`, `owner_id`)
- Booleans : prefixe `is_` ou `has_` (ex: `is_active`, `has_notifications`)
- Timestamps : suffixe `_at` (ex: `created_at`, `completed_at`, `synced_at`)
- JSONB : nom descriptif sans suffixe (ex: `preferences`, `content`, `metadata`)

### Enums
- `snake_case` minuscules
- Noms descriptifs : `[domaine]_[type]` (ex: `task_status`, `user_role`, `reservation_platform`)
- Valeurs en `snake_case` (ex: `in_progress`, `self_checkin`)

## Colonnes Standard

Chaque table DOIT avoir :

```sql
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
```

Tables multi-tenant DOIVENT avoir :

```sql
owner_id UUID NOT NULL REFERENCES profiles(id)
```

## RLS (Row Level Security)

### Activation
```sql
ALTER TABLE [table] ENABLE ROW LEVEL SECURITY;
```

### Patterns de Policies

**Owner voit ses propres donnees :**
```sql
CREATE POLICY "[table]_owner_select" ON [table]
  FOR SELECT USING (owner_id = auth.uid());
```

**Staff voit les donnees de son owner :**
```sql
CREATE POLICY "[table]_staff_select" ON [table]
  FOR SELECT USING (
    owner_id IN (
      SELECT owner_id FROM profiles WHERE id = auth.uid()
    )
  );
```

**Insert/Update/Delete limites au owner :**
```sql
CREATE POLICY "[table]_owner_insert" ON [table]
  FOR INSERT WITH CHECK (owner_id = auth.uid());

CREATE POLICY "[table]_owner_update" ON [table]
  FOR UPDATE USING (owner_id = auth.uid());

CREATE POLICY "[table]_owner_delete" ON [table]
  FOR DELETE USING (owner_id = auth.uid());
```

### Nommage Policies
Format : `[table]_[role]_[action]`
- `properties_owner_select`
- `properties_staff_select`
- `cleaning_tasks_staff_update`

## Indexes

Creer des indexes sur :
- Toutes les foreign keys
- Colonnes de filtrage frequentes (status, type, date)
- Colonnes de recherche (name, email)

```sql
CREATE INDEX IF NOT EXISTS idx_[table]_[colonne] ON [table]([colonne]);
```

## Migrations

- Un fichier par migration dans `supabase/migrations/`
- Nommage : `[timestamp]_[description].sql`
- Toujours idempotent (`IF NOT EXISTS`, `IF EXISTS`)
- Jamais de `DROP TABLE` en production sans backup

## Types TypeScript

### Generation
```bash
supabase gen types typescript --schema public > src/types/database.ts
```

### Utilisation
```typescript
import { Database } from '@/types/database'

type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T]

// Usage
type Property = Tables<'properties'>
type TaskStatus = Enums<'task_status'>
```

## Seed Data

### Principes
- Dates relatives avec `NOW()` et `NOW() + INTERVAL`
- Idempotent avec `ON CONFLICT DO NOTHING`
- Couvrir TOUS les statuts/enums
- Commentaires SQL pour chaque bloc
- Separe du schema (fichier different)

### Quantites minimales
| Entite | Minimum | Variete |
|--------|---------|---------|
| Users/roles | 3-5 | 1 par role |
| Entites principales | 3-5 | Mix de statuts |
| Entites secondaires | 6-10 | Tous les statuts representes |
| Taches/actions | 6-8 | Mix completed/pending/in_progress |
| Logs/historique | 4-6 | Pour les vues timeline |

### Criteres de qualite
- [ ] Toutes les pages affichent des donnees
- [ ] Chaque filtre a des resultats
- [ ] Le calendrier a des evenements aujourd'hui, demain, et la semaine prochaine
- [ ] Les KPIs calculent des valeurs non-zero
- [ ] Les vues role restreint ont des donnees visibles
