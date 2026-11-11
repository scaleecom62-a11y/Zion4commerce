-- Supabase grants EXECUTE on new public functions to anon and authenticated by default.
-- Narrow the website functions to who actually calls them. Each one also checks
-- is_site_editor() itself, so this is defence in depth, not a fix for an open hole.
revoke execute on function public.site_team_admin() from anon;
revoke execute on function public.site_set_team_member(uuid, boolean, integer, text, text, text) from anon;
-- Trigger function: fired by the profiles trigger, never called over the API.
revoke execute on function public.site_guard_profile_website_fields() from anon, authenticated, public;
