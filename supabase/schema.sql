-- IvoxStack database schema (Supabase / Postgres)
-- Safe to re-run: every object is created only if missing, policies are recreated.
--
-- Access model
--   * Website visitors (anon key): read public content, INSERT leads. Nothing else.
--   * Staff (signed in via Supabase Auth AND listed in public.staff): full access.
--   * Any other signed-in account gets nothing — being "authenticated" is not enough.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Staff allow-list
-- ---------------------------------------------------------------------------
create table if not exists public.staff (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  email      text not null unique,
  full_name  text not null default 'Admin',
  role       text not null default 'SUPER_ADMIN'
             check (role in ('SUPER_ADMIN', 'OPERATIONS_LEAD', 'SALES_TEAM', 'MARKETING_TEAM')),
  created_at timestamptz not null default now()
);

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.staff where user_id = auth.uid());
$$;

revoke all on function public.is_staff() from public;
grant execute on function public.is_staff() to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Public content
-- ---------------------------------------------------------------------------
create table if not exists public.site_settings (
  id         int primary key default 1 check (id = 1),
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id                   text primary key,
  name                 text not null,
  slug                 text not null unique,
  short_description    text not null default '',
  detailed_description text,
  starting_price       integer not null default 0 check (starting_price >= 0),
  icon                 text not null default '',
  features             jsonb not null default '[]'::jsonb,
  display_order        integer not null default 0,
  is_active            boolean not null default true
);

create table if not exists public.portfolio (
  id            text primary key,
  title         text not null,
  category      text not null,
  client        text,
  description   text not null default '',
  image         text not null,
  project_url   text,
  is_featured   boolean not null default false,
  is_published  boolean not null default true,
  display_order integer not null default 0,
  created_at    timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- CRM
-- ---------------------------------------------------------------------------
create table if not exists public.leads (
  id              uuid primary key default gen_random_uuid(),
  lead_id         text not null unique check (lead_id ~ '^LEAD-[0-9]{6}$'),
  full_name       text not null check (char_length(full_name) between 2 and 120),
  business_name   text check (char_length(business_name) <= 160),
  phone           text not null check (char_length(phone) between 8 and 25),
  email           text not null check (char_length(email) between 3 and 160),
  service         text not null check (char_length(service) <= 200),
  budget          text check (char_length(budget) <= 60),
  timeline        text check (char_length(timeline) <= 60),
  project_details text check (char_length(project_details) <= 4000),
  status          text not null default 'NEW'
                  check (status in ('NEW', 'CONTACTED', 'QUALIFIED', 'FOLLOW-UP', 'WON', 'LOST')),
  utm_source      text check (char_length(utm_source) <= 200),
  utm_medium      text check (char_length(utm_medium) <= 200),
  utm_campaign    text check (char_length(utm_campaign) <= 200),
  utm_term        text check (char_length(utm_term) <= 200),
  utm_content     text check (char_length(utm_content) <= 200),
  landing_page    text check (char_length(landing_page) <= 500),
  page_url        text check (char_length(page_url) <= 2000),
  assigned_user   text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz
);
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);

create table if not exists public.lead_notes (
  id         uuid primary key default gen_random_uuid(),
  lead_id    uuid not null references public.leads (id) on delete cascade,
  user_name  text not null,
  note       text not null,
  created_at timestamptz not null default now()
);
create index if not exists lead_notes_lead_id_idx on public.lead_notes (lead_id);

create table if not exists public.clients (
  id               uuid primary key default gen_random_uuid(),
  name             text not null,
  company          text,
  phone            text not null,
  email            text not null,
  source_lead_id   uuid references public.leads (id) on delete set null,
  status           text not null default 'ACTIVE' check (status in ('ACTIVE', 'INACTIVE', 'COMPLETED')),
  assigned_manager text,
  notes            text,
  created_at       timestamptz not null default now()
);

create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  client_id   uuid not null references public.clients (id) on delete cascade,
  client_name text not null,
  name        text not null,
  service     text not null,
  status      text not null default 'Active'
              check (status in ('Active', 'In Progress', 'Client Review', 'Revision', 'Delivered', 'On Hold')),
  start_date  date,
  deadline    date,
  budget      integer not null default 0,
  team_member text,
  notes       text,
  created_at  timestamptz not null default now()
);

create table if not exists public.invoices (
  id             uuid primary key default gen_random_uuid(),
  invoice_number text not null unique,
  client_id      uuid references public.clients (id) on delete cascade,
  client_name    text not null,
  order_id       text,
  amount         integer not null,
  tax_amount     integer default 0,
  issue_date     date not null default current_date,
  due_date       date,
  status         text not null default 'Pending' check (status in ('Paid', 'Pending', 'Overdue', 'Cancelled')),
  payment_method text,
  notes          text,
  created_at     timestamptz not null default now()
);

create table if not exists public.activity_logs (
  id         uuid primary key default gen_random_uuid(),
  user_name  text not null,
  action     text not null,
  entity     text not null,
  details    text,
  created_at timestamptz not null default now()
);
create index if not exists activity_logs_created_at_idx on public.activity_logs (created_at desc);

create table if not exists public.audit_logs (
  id         uuid primary key default gen_random_uuid(),
  user_name  text not null,
  action     text not null,
  entity     text not null,
  old_value  text,
  new_value  text,
  created_at timestamptz not null default now()
);
create index if not exists audit_logs_created_at_idx on public.audit_logs (created_at desc);

-- Every new lead is recorded in the activity stream (visitors can't write logs themselves)
create or replace function public.log_new_lead()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.activity_logs (user_name, action, entity, details)
  values ('Website', 'LEAD_CREATED', new.lead_id, 'New inquiry for ' || new.service || ' from ' || new.full_name);
  return new;
end;
$$;

drop trigger if exists leads_log_new on public.leads;
create trigger leads_log_new after insert on public.leads
  for each row execute function public.log_new_lead();

-- ---------------------------------------------------------------------------
-- Table privileges (RLS below narrows these down row by row)
-- ---------------------------------------------------------------------------
grant usage on schema public to anon, authenticated;
revoke all on all tables in schema public from anon;
grant select on public.site_settings, public.services, public.portfolio to anon;
grant insert on public.leads to anon;
grant select, insert, update, delete on all tables in schema public to authenticated;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.staff          enable row level security;
alter table public.site_settings  enable row level security;
alter table public.services       enable row level security;
alter table public.portfolio      enable row level security;
alter table public.leads          enable row level security;
alter table public.lead_notes     enable row level security;
alter table public.clients        enable row level security;
alter table public.projects       enable row level security;
alter table public.invoices       enable row level security;
alter table public.activity_logs  enable row level security;
alter table public.audit_logs     enable row level security;

-- staff: a signed-in user may only see their own staff row; rows are managed via SQL only
drop policy if exists "staff read own row" on public.staff;
create policy "staff read own row" on public.staff
  for select to authenticated using (user_id = auth.uid());

-- public content: everyone reads visible rows, staff read and write everything
drop policy if exists "public read settings" on public.site_settings;
create policy "public read settings" on public.site_settings for select using (true);
drop policy if exists "staff write settings" on public.site_settings;
create policy "staff write settings" on public.site_settings
  for all to authenticated using (public.is_staff()) with check (public.is_staff());

drop policy if exists "public read services" on public.services;
create policy "public read services" on public.services for select using (is_active or public.is_staff());
drop policy if exists "staff write services" on public.services;
create policy "staff write services" on public.services
  for all to authenticated using (public.is_staff()) with check (public.is_staff());

drop policy if exists "public read portfolio" on public.portfolio;
create policy "public read portfolio" on public.portfolio for select using (is_published or public.is_staff());
drop policy if exists "staff write portfolio" on public.portfolio;
create policy "staff write portfolio" on public.portfolio
  for all to authenticated using (public.is_staff()) with check (public.is_staff());

-- leads: anyone can submit a NEW, unassigned lead; only staff can read or change leads
drop policy if exists "public submit leads" on public.leads;
create policy "public submit leads" on public.leads
  for insert to anon, authenticated
  with check (status = 'NEW' and assigned_user is null and updated_at is null);
drop policy if exists "staff manage leads" on public.leads;
create policy "staff manage leads" on public.leads
  for all to authenticated using (public.is_staff()) with check (public.is_staff());

-- everything else: staff only
drop policy if exists "staff manage lead notes" on public.lead_notes;
create policy "staff manage lead notes" on public.lead_notes
  for all to authenticated using (public.is_staff()) with check (public.is_staff());
drop policy if exists "staff manage clients" on public.clients;
create policy "staff manage clients" on public.clients
  for all to authenticated using (public.is_staff()) with check (public.is_staff());
drop policy if exists "staff manage projects" on public.projects;
create policy "staff manage projects" on public.projects
  for all to authenticated using (public.is_staff()) with check (public.is_staff());
drop policy if exists "staff manage invoices" on public.invoices;
create policy "staff manage invoices" on public.invoices
  for all to authenticated using (public.is_staff()) with check (public.is_staff());
drop policy if exists "staff manage activity logs" on public.activity_logs;
create policy "staff manage activity logs" on public.activity_logs
  for all to authenticated using (public.is_staff()) with check (public.is_staff());
drop policy if exists "staff manage audit logs" on public.audit_logs;
create policy "staff manage audit logs" on public.audit_logs
  for all to authenticated using (public.is_staff()) with check (public.is_staff());
