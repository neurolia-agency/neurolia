# Seed Auth Users — Instructions Manuelles

## Pourquoi manuellement ?

Supabase Auth gere les users dans `auth.users` (schema protege). On ne peut pas inserer directement en SQL dans le schema public. Les users doivent etre crees via :
- Le Dashboard Supabase (Authentication > Users)
- Le CLI Supabase
- L'API Admin Supabase

## Users a Creer

### User 1 : [ROLE_1] (Owner / Admin)

| Champ | Valeur |
|-------|--------|
| Email | `[ROLE_1_EMAIL]` |
| Password | `Test1234!` (dev uniquement) |
| Email confirmed | Oui |
| User metadata | `{ "display_name": "[ROLE_1_NAME]" }` |
| App metadata | `{ "role": "[ROLE_1]" }` |

**UUID attendu** : `00000000-0000-0000-0000-000000000001`

> Note : Si le UUID auto-genere est different, mettre a jour `seed-scenario.sql` avec le bon UUID.

### User 2 : [ROLE_2] (Staff / User)

| Champ | Valeur |
|-------|--------|
| Email | `[ROLE_2_EMAIL]` |
| Password | `Test1234!` (dev uniquement) |
| Email confirmed | Oui |
| User metadata | `{ "display_name": "[ROLE_2_NAME]" }` |
| App metadata | `{ "role": "[ROLE_2]" }` |

**UUID attendu** : `00000000-0000-0000-0000-000000000002`

### User 3 : [ROLE_2] supplementaire

| Champ | Valeur |
|-------|--------|
| Email | `[ROLE_2_EMAIL_2]` |
| Password | `Test1234!` (dev uniquement) |
| Email confirmed | Oui |
| User metadata | `{ "display_name": "[ROLE_2_NAME_2]" }` |
| App metadata | `{ "role": "[ROLE_2]" }` |

**UUID attendu** : `00000000-0000-0000-0000-000000000003`

## Methode 1 : Dashboard Supabase

1. Aller dans **Authentication > Users**
2. Cliquer **Add User > Create New User**
3. Remplir email + password
4. Confirmer l'email manuellement : **Kebab menu > Confirm email**
5. Mettre a jour les metadata :
   - Aller dans **SQL Editor**
   - Executer :

```sql
UPDATE auth.users
SET raw_app_meta_data = raw_app_meta_data || '{"role": "[ROLE]"}'::jsonb
WHERE email = '[EMAIL]';
```

6. Noter le UUID genere et mettre a jour `seed-scenario.sql` si different

## Methode 2 : Supabase CLI

```bash
# Creer un user
supabase auth admin create-user \
  --email [EMAIL] \
  --password "Test1234!" \
  --email-confirm

# Mettre a jour le role
psql $DATABASE_URL -c "
  UPDATE auth.users
  SET raw_app_meta_data = raw_app_meta_data || '{\"role\": \"[ROLE]\"}'::jsonb
  WHERE email = '[EMAIL]';
"
```

## Methode 3 : API Admin Supabase

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const { data, error } = await supabase.auth.admin.createUser({
  email: '[EMAIL]',
  password: 'Test1234!',
  email_confirm: true,
  app_metadata: { role: '[ROLE]' },
  user_metadata: { display_name: '[NAME]' },
})
```

## Verification

Apres creation, verifier :
- [ ] Les 3 users existent dans Authentication > Users
- [ ] Chaque user a le bon `role` dans `app_metadata`
- [ ] Les emails sont confirmes
- [ ] Les UUIDs correspondent a ceux dans `seed-scenario.sql`
- [ ] Login fonctionne avec email + password de test
