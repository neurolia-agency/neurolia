-- ============================================
-- RESET SEED — [NOM_PROJET]
-- Nettoyage complet des donnees de test
-- Executer AVANT seed-scenario.sql pour re-seeder proprement
-- ============================================

-- ATTENTION : Ce script SUPPRIME toutes les donnees des tables listees.
-- Il ne supprime PAS le schema (tables, enums, indexes).
-- Il ne supprime PAS les users auth (auth.users).

-- Ordre de suppression : du plus dependant au moins dependant
-- (respecter les foreign keys)

-- ============================================
-- Adapter les tables ci-dessous au data model du projet
-- Decommenter et completer avec vos tables
-- ============================================

-- DELETE FROM notifications;
-- DELETE FROM [logs_table];
-- DELETE FROM [taches_table];
-- DELETE FROM [entites_secondaires];
-- DELETE FROM [entites_principales];
-- DELETE FROM profiles;

-- ============================================
-- Reset des sequences (si auto-increment)
-- ============================================
-- ALTER SEQUENCE [table]_id_seq RESTART WITH 1;

-- ============================================
-- Verification post-reset
-- ============================================
-- SELECT 'profiles' as table_name, COUNT(*) FROM profiles
-- UNION ALL
-- SELECT '[entite_principale]', COUNT(*) FROM [entite_principale]
-- UNION ALL
-- SELECT '[entite_secondaire]', COUNT(*) FROM [entite_secondaire];
-- Toutes les lignes doivent afficher 0
