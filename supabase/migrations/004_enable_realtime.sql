-- ============================================================
-- Enable Supabase Realtime on all tables that need live updates
-- ✅ Already enabled on this project — this is just documentation
--
-- The error "already member of publication" means Realtime is ON.
-- No action needed here. Tables confirmed in supabase_realtime:
--   ✅ timetables
--   ✅ special_events
--   ✅ timetable_overrides
-- ============================================================

-- Verify which tables are in the realtime publication
SELECT schemaname, tablename
FROM pg_publication_tables
WHERE pubname = 'supabase_realtime'
ORDER BY tablename;
