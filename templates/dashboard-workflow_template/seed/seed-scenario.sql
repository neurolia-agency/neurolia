-- ============================================
-- SEED DATA — [NOM_PROJET]
-- Scenario realiste complet pour test visuel
-- Dates relatives (NOW()) pour donnees toujours fraiches
-- Idempotent (ON CONFLICT DO NOTHING)
-- ============================================

-- IMPORTANT : Executer APRES le schema (migrations)
-- IMPORTANT : Les users auth doivent etre crees AVANT via Supabase Dashboard
--             Voir seed-auth-users.md pour les instructions

-- ============================================
-- 1. PROFILES (lies aux auth.users)
-- ============================================
-- Les UUIDs ci-dessous doivent correspondre aux users crees dans Supabase Auth

-- [ROLE_1] : Owner / Admin principal
INSERT INTO profiles (id, email, display_name, role, is_active, created_at)
VALUES (
  '00000000-0000-0000-0000-000000000001',  -- UUID fixe pour reference
  '[ROLE_1_EMAIL]',
  '[ROLE_1_NAME]',
  '[ROLE_1]',
  true,
  NOW() - INTERVAL '30 days'
) ON CONFLICT (id) DO NOTHING;

-- [ROLE_2] : Staff / Utilisateur secondaire
INSERT INTO profiles (id, email, display_name, role, is_active, created_at)
VALUES (
  '00000000-0000-0000-0000-000000000002',
  '[ROLE_2_EMAIL]',
  '[ROLE_2_NAME]',
  '[ROLE_2]',
  true,
  NOW() - INTERVAL '25 days'
) ON CONFLICT (id) DO NOTHING;

-- [ROLE_2] supplementaire (pour tester les listes)
INSERT INTO profiles (id, email, display_name, role, is_active, created_at)
VALUES (
  '00000000-0000-0000-0000-000000000003',
  '[ROLE_2_EMAIL_2]',
  '[ROLE_2_NAME_2]',
  '[ROLE_2]',
  true,
  NOW() - INTERVAL '20 days'
) ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 2. ENTITES PRINCIPALES
-- ============================================
-- Adapter les tables et colonnes au data model du projet

-- INSERT INTO [entite_principale] (id, owner_id, name, status, created_at)
-- VALUES
--   ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '[Nom 1]', '[status_actif]', NOW() - INTERVAL '28 days'),
--   ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', '[Nom 2]', '[status_actif]', NOW() - INTERVAL '20 days'),
--   ('10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', '[Nom 3]', '[status_inactif]', NOW() - INTERVAL '10 days')
-- ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 3. ENTITES SECONDAIRES
-- ============================================
-- Mix de statuts pour que les filtres aient des resultats
-- Dates relatives pour le calendrier/timeline

-- Exemple : reservations, commandes, taches, etc.
-- Inclure :
--   - 2-3 avec statut "actif" / "en cours"
--   - 2-3 avec statut "termine" / "complete"
--   - 1-2 avec statut "en attente" / "pending"
--   - 1 avec statut "annule" / "cancelled"

-- Dates :
--   - 2 dans le passe (semaine derniere)
--   - 2 aujourd'hui
--   - 2 demain / cette semaine
--   - 2 semaine prochaine

-- ============================================
-- 4. TACHES / ACTIONS
-- ============================================
-- Taches assignees aux differents users role_2

-- Mix de statuts :
--   - 3 pending
--   - 2 in_progress
--   - 3 completed

-- ============================================
-- 5. NOTIFICATIONS
-- ============================================
-- Notifications variees pour tester le panel

-- INSERT INTO notifications (id, user_id, type, title, body, is_read, created_at)
-- VALUES
--   (gen_random_uuid(), '00000000-0000-0000-0000-000000000001', '[type_1]', '[Titre]', '[Corps]', false, NOW() - INTERVAL '1 hour'),
--   (gen_random_uuid(), '00000000-0000-0000-0000-000000000001', '[type_2]', '[Titre]', '[Corps]', false, NOW() - INTERVAL '3 hours'),
--   (gen_random_uuid(), '00000000-0000-0000-0000-000000000001', '[type_3]', '[Titre]', '[Corps]', true, NOW() - INTERVAL '1 day')
-- ON CONFLICT DO NOTHING;

-- ============================================
-- 6. LOGS / HISTORIQUE
-- ============================================
-- Pour les vues timeline / historique

-- ============================================
-- 7. CONFIGURATION / TEMPLATES
-- ============================================
-- Pour les pages settings

-- ============================================
-- VERIFICATION POST-SEED
-- ============================================
-- Executer ces requetes pour verifier la couverture :

-- SELECT role, COUNT(*) FROM profiles GROUP BY role;
-- SELECT status, COUNT(*) FROM [entite_principale] GROUP BY status;
-- SELECT status, COUNT(*) FROM [entite_secondaire] GROUP BY status;
-- SELECT type, COUNT(*) FROM notifications WHERE is_read = false GROUP BY type;
