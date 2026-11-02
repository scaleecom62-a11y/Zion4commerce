-- Website content, editors, leads and team publishing.
-- Applied to Tasqr's Supabase project (folwture). Additive only: new site_* objects
-- plus website-only columns on public.profiles. No existing Tasqr data is changed.

-- ── Editors allow-list ─────────────────────────────────────────────
-- profiles.role is self-editable under Tasqr's current RLS, so it must not grant
-- website access. Editors are listed here and managed only by existing editors.
create table if not exists public.site_editors (
  user_id    uuid primary key references public.profiles(id) on delete cascade,
  added_at   timestamptz not null default now(),
  added_by   uuid references public.profiles(id) on delete set null
);
alter table public.site_editors enable row level security;

create or replace function public.is_site_editor()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.site_editors e
    join public.profiles p on p.id = e.user_id
    where e.user_id = auth.uid() and p.is_active
  );
$$;
revoke all on function public.is_site_editor() from public;
grant execute on function public.is_site_editor() to anon, authenticated;

create policy site_editors_read on public.site_editors
  for select to authenticated using (public.is_site_editor());
create policy site_editors_add on public.site_editors
  for insert to authenticated with check (public.is_site_editor());
create policy site_editors_remove on public.site_editors
  for delete to authenticated using (public.is_site_editor() and user_id <> auth.uid());

insert into public.site_editors (user_id)
select id from public.profiles where role in ('admin', 'superadmin') and is_active
on conflict do nothing;

-- ── Site documents: one draft, one published ──────────────────────
create table if not exists public.site_documents (
  key         text primary key check (key in ('draft', 'published')),
  content     jsonb not null,
  updated_at  timestamptz not null default now(),
  updated_by  uuid references public.profiles(id) on delete set null
);
alter table public.site_documents enable row level security;

create policy site_documents_public_read on public.site_documents
  for select to anon, authenticated using (key = 'published' or public.is_site_editor());
create policy site_documents_editor_insert on public.site_documents
  for insert to authenticated with check (public.is_site_editor());
create policy site_documents_editor_update on public.site_documents
  for update to authenticated using (public.is_site_editor()) with check (public.is_site_editor());

-- ── Version history (one row per publish) ─────────────────────────
create table if not exists public.site_versions (
  id          bigint generated always as identity primary key,
  content     jsonb not null,
  note        text,
  created_at  timestamptz not null default now(),
  created_by  uuid references public.profiles(id) on delete set null
);
alter table public.site_versions enable row level security;

create policy site_versions_editor_read on public.site_versions
  for select to authenticated using (public.is_site_editor());
create policy site_versions_editor_insert on public.site_versions
  for insert to authenticated with check (public.is_site_editor());

-- ── Leads from the audit form ─────────────────────────────────────
create table if not exists public.site_leads (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  name          text not null check (char_length(name) between 1 and 200),
  email         text not null check (char_length(email) between 3 and 320),
  company       text check (char_length(company) <= 200),
  website       text check (char_length(website) <= 500),
  phone         text check (char_length(phone) <= 50),
  country       text check (char_length(country) <= 100),
  spend         text check (char_length(spend) <= 100),
  services      text[] not null default '{}',
  message       text check (char_length(message) <= 5000),
  source_page   text check (char_length(source_page) <= 300),
  email_status  text not null default 'pending' check (email_status in ('pending', 'sent', 'failed', 'skipped'))
);
alter table public.site_leads enable row level security;

-- Visitors can only add a lead; they can never read, change or delete one.
create policy site_leads_public_insert on public.site_leads
  for insert to anon, authenticated with check (email_status = 'pending');
create policy site_leads_editor_read on public.site_leads
  for select to authenticated using (public.is_site_editor());
create policy site_leads_editor_update on public.site_leads
  for update to authenticated using (public.is_site_editor()) with check (public.is_site_editor());

-- ── Team publishing: website-only fields on Tasqr profiles ────────
alter table public.profiles
  add column if not exists show_on_website  boolean not null default false,
  add column if not exists website_order    integer not null default 100,
  add column if not exists website_slug     text unique,
  add column if not exists website_role     text,
  add column if not exists website_bio      text,
  add column if not exists linkedin_url     text;

-- Public team list: safe columns only, opted-in active people only.
create or replace function public.site_team()
returns table (
  id uuid,
  slug text,
  name text,
  role text,
  department text,
  bio text,
  photo text,
  linkedin text,
  sort integer
)
language sql
stable
security definer
set search_path = public
as $$
  select p.id,
         coalesce(p.website_slug, p.id::text),
         trim(p.full_name),
         coalesce(nullif(p.website_role, ''), p.designation, ''),
         p.department,
         p.website_bio,
         p.avatar_url,
         p.linkedin_url,
         p.website_order
  from public.profiles p
  where p.is_active and p.show_on_website
  order by p.website_order, p.full_name;
$$;
revoke all on function public.site_team() from public;
grant execute on function public.site_team() to anon, authenticated;

-- Editor view of everyone, so the editor can choose who appears.
create or replace function public.site_team_admin()
returns table (
  id uuid,
  name text,
  designation text,
  department text,
  photo text,
  is_active boolean,
  show_on_website boolean,
  website_order integer,
  website_role text,
  website_bio text,
  linkedin_url text
)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if not public.is_site_editor() then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  return query
    select p.id, trim(p.full_name), p.designation, p.department, p.avatar_url, p.is_active,
           p.show_on_website, p.website_order, p.website_role, p.website_bio, p.linkedin_url
    from public.profiles p
    order by p.is_active desc, p.website_order, p.full_name;
end;
$$;
revoke all on function public.site_team_admin() from public;
grant execute on function public.site_team_admin() to authenticated;

-- Editors change only the website columns, through this function.
create or replace function public.site_set_team_member(
  p_id uuid,
  p_show boolean,
  p_order integer,
  p_role text,
  p_bio text,
  p_linkedin text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_site_editor() then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  if p_linkedin is not null and p_linkedin <> '' and p_linkedin !~ '^https://([a-z]+\.)?linkedin\.com/' then
    raise exception 'LinkedIn link must start with https://www.linkedin.com/' using errcode = '22023';
  end if;
  update public.profiles
     set show_on_website = coalesce(p_show, false),
         website_order   = coalesce(p_order, 100),
         website_role    = nullif(trim(p_role), ''),
         website_bio     = nullif(trim(p_bio), ''),
         linkedin_url    = nullif(trim(p_linkedin), '')
   where id = p_id;
end;
$$;
revoke all on function public.site_set_team_member(uuid, boolean, integer, text, text, text) from public;
grant execute on function public.site_set_team_member(uuid, boolean, integer, text, text, text) to authenticated;

-- ── Media bucket ──────────────────────────────────────────────────
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-media', 'site-media', true, 8388608, array['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml'])
on conflict (id) do nothing;

create policy site_media_editor_insert on storage.objects
  for insert to authenticated with check (bucket_id = 'site-media' and public.is_site_editor());
create policy site_media_editor_update on storage.objects
  for update to authenticated using (bucket_id = 'site-media' and public.is_site_editor());
create policy site_media_editor_delete on storage.objects
  for delete to authenticated using (bucket_id = 'site-media' and public.is_site_editor());

-- Tasqr lets every user update their own profile row. Stop non-editors from
-- changing the website columns that way (e.g. publishing themselves).
create or replace function public.site_guard_profile_website_fields()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if (new.show_on_website, new.website_order, new.website_slug, new.website_role, new.website_bio, new.linkedin_url)
     is distinct from
     (old.show_on_website, old.website_order, old.website_slug, old.website_role, old.website_bio, old.linkedin_url)
     and auth.uid() is not null
     and not public.is_site_editor() then
    raise exception 'Only website editors can change website fields' using errcode = '42501';
  end if;
  return new;
end;
$$;

drop trigger if exists site_guard_profile_website_fields on public.profiles;
create trigger site_guard_profile_website_fields
  before update on public.profiles
  for each row execute function public.site_guard_profile_website_fields();
