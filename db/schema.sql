-- Idriss Auto — Supabase schema
-- Run this once in Supabase → SQL Editor → New query → paste → Run.
-- Idea & developed by Idriss Romdhani.
--
-- Security model: Row Level Security is ON for every table and NO public
-- policies are granted. That means the public (anon) key can do NOTHING here.
-- All access happens through your Vercel serverless functions using the
-- SUPABASE service-role key, which bypasses RLS. So the browser never holds
-- any database credential, and only YOU (admin) effectively write data.

-- ---------- PARTS (catalog additions / overrides) ----------
-- The app ships with 26 built-in parts. Rows you add here are merged on top
-- (matched by id). Add new parts or fix existing ones without touching code.
create table if not exists public.parts (
  id          text primary key,
  part_no     text,
  barcode     text,
  category    text not null,
  name        jsonb not null,         -- {"en":"","fr":"","ar":""}
  fits        jsonb not null default '[]'::jsonb, -- [{"make":"","model":"","years":""}]
  created_at  timestamptz not null default now()
);

-- ---------- USER-SUBMITTED PARTS / SUGGESTIONS ----------
create table if not exists public.submissions (
  id          uuid primary key default gen_random_uuid(),
  kind        text not null default 'part',   -- 'part' | 'fitment' | 'correction'
  payload     jsonb not null,                 -- free-form suggestion data
  source      text,                           -- e.g. 'scan' | 'manual'
  status      text not null default 'new',    -- you set 'approved' / 'rejected'
  created_at  timestamptz not null default now()
);

-- ---------- SCAN LOGS (every AI identification) ----------
create table if not exists public.scan_logs (
  id          uuid primary key default gen_random_uuid(),
  part_name   text,
  part_number text,
  vehicles    jsonb,
  confidence  text,
  created_at  timestamptz not null default now()
);

-- ---------- FEEDBACK / CONTACT ----------
create table if not exists public.feedback (
  id          uuid primary key default gen_random_uuid(),
  message     text not null,
  contact     text,
  created_at  timestamptz not null default now()
);

-- ---------- Lock everything down ----------
alter table public.parts       enable row level security;
alter table public.submissions enable row level security;
alter table public.scan_logs   enable row level security;
alter table public.feedback    enable row level security;
-- (No policies created on purpose → anon/public is fully blocked.
--  Your serverless functions use the service-role key which bypasses RLS.)

-- ---------- Helpful indexes ----------
create index if not exists parts_category_idx     on public.parts (category);
create index if not exists submissions_status_idx on public.submissions (status);
create index if not exists scan_logs_created_idx   on public.scan_logs (created_at desc);
