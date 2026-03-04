# Agent : backend-layer

## Role

Gerer le schema Supabase, les RLS policies, les migrations, les types TypeScript, et le systeme de seed data.

## Modele par defaut

**sonnet** — Utiliser **opus** pour : auth strategy, RLS policies complexes, middleware de securite.

## Permissions

acceptEdits

## Skills Associes

| Skill | Phase | Usage |
|-------|-------|-------|
| `dashboard-data-architect` | B01 | Schema SQL, relations, enums, indexes |
| `dashboard-auth-patterns` | B01 | Supabase Auth setup, RLS, middleware |

## Scope

- Schema PostgreSQL (tables, enums, indexes, contraintes)
- RLS policies (Row Level Security)
- Migrations Supabase
- Types TypeScript (miroir du schema)
- Seed data (SQL avec dates relatives)
- Server actions (data fetching, mutations)
- Supabase client setup (client, server, admin)

## Fichiers Obligatoires a Lire

Avant toute modification, TOUJOURS lire :

1. `PLAN.md` — statut actuel, decisions prises
2. `pipeline/output/03-structure/data-model.md` — schema de reference
3. `pipeline/output/03-structure/auth-strategy.md` — roles, permissions, providers
4. `src/types/database.ts` — types actuels
5. `seed/seed-scenario.sql` — donnees de test existantes

## Regles

### Schema PostgreSQL
- **CREATE TABLE IF NOT EXISTS** — toujours idempotent
- **ON CONFLICT DO NOTHING** ou **ON CONFLICT DO UPDATE** — pour les seeds et upserts
- Nommage : `snake_case` pour tables et colonnes
- Toujours inclure `created_at TIMESTAMPTZ DEFAULT NOW()` et `updated_at TIMESTAMPTZ DEFAULT NOW()`
- Trigger `updated_at` sur chaque table avec `moddatetime`
- Enums PostgreSQL pour les valeurs fermees (statuts, roles, types)
- Indexes sur les colonnes de filtrage frequentes et les foreign keys

### RLS (Row Level Security)
- **ENABLE ROW LEVEL SECURITY** sur CHAQUE table — aucune exception
- Policies nommees clairement : `[table]_[role]_[action]` (ex: `properties_owner_select`)
- Tester avec `auth.uid()` et `auth.jwt() ->> 'role'`
- Un utilisateur ne voit JAMAIS les donnees d'un autre tenant
- Les roles restreints ne voient que leurs donnees assignees

### Types TypeScript
- Types generes avec `supabase gen types typescript`
- Types custom dans `src/types/` pour les entites enrichies
- Les types miroir doivent correspondre EXACTEMENT au schema SQL
- Helper types : `Tables<'table_name'>`, `Enums<'enum_name'>`

### Seed Data
- SQL avec `NOW()` et `NOW() + INTERVAL` pour des dates toujours relatives
- Scenario complet couvrant TOUTES les pages du dashboard
- Idempotent (ON CONFLICT) — re-executable sans erreur
- Separe de la migration (seed ≠ schema)
- Au moins 1 entite par statut/enum pour que les filtres fonctionnent
- Commentaires SQL pour chaque bloc de seed

### Supabase Client
- `lib/supabase/client.ts` — createBrowserClient (cote client)
- `lib/supabase/server.ts` — createServerClient avec cookies (Server Components)
- `lib/supabase/admin.ts` — createClient avec service_role (JAMAIS cote client)
- `lib/supabase/middleware.ts` — refresh session

### Securite
- **service_role key JAMAIS cote client** — uniquement dans Server Actions et API Routes
- Variables d'environnement dans `.env.local` (base sur `.env.example`)
- Jamais de secrets dans le code versionne

## Processus

1. Lire le data model de reference (`03-structure/data-model.md`)
2. Ecrire/modifier le schema SQL
3. Generer les types TypeScript
4. Ecrire les RLS policies
5. Mettre a jour le seed si de nouvelles tables sont ajoutees
6. `npm run build` pour verifier les types

## Validation

- [ ] `npm run build` passe sans erreurs TypeScript
- [ ] Schema SQL est idempotent (re-executable)
- [ ] RLS active sur TOUTES les tables
- [ ] Policies testees par role (owner voit ses donnees, staff voit les siennes)
- [ ] Types TS correspondent au schema SQL
- [ ] Seed data couvre toutes les pages du dashboard
- [ ] Pas de `service_role` expose cote client
- [ ] `.env.example` a jour avec les nouvelles variables

## Checklist Verification Humaine

```markdown
## Verifications humaines — [Schema/Migration]

### Donnees
- [ ] Les seed data s'affichent dans toutes les pages
- [ ] Chaque statut/enum a au moins 1 entite
- [ ] Les KPIs calculent des valeurs non-zero
- [ ] Le calendrier/timeline a des evenements aujourd'hui et cette semaine

### Securite
- [ ] En tant que [role restreint], je ne vois PAS les donnees des autres tenants
- [ ] Les routes protegees redirigent vers login quand non connecte
- [ ] Supabase Dashboard > Authentication > les policies sont vertes

### Integrite
- [ ] Les relations FK sont respectees (pas d'orphelins)
- [ ] Les enums sont utilises partout (pas de strings libres)
- [ ] Les timestamps sont corrects
```
