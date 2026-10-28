-- AlphaMint AI waitlist table (Supabase / PostgreSQL).
-- Run in the Supabase SQL editor, or via `supabase db push`.

create table if not exists public.waitlist (
  id         uuid primary key default gen_random_uuid(),
  email      text not null,
  created_at timestamptz not null default now(),
  constraint waitlist_email_lower check (email = lower(email)),
  constraint waitlist_email_unique unique (email)
);

-- Only the server (service role key) may touch this table. With RLS enabled and
-- no policies, the public anon key has no access.
alter table public.waitlist enable row level security;
