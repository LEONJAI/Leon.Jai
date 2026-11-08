-- Run in the Supabase SQL editor. Auth users are managed by Supabase Auth.
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null check (category in ('photo','logo','video','web')),
  description text not null default '',
  image_url text,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.saved_projects (
  user_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid not null references public.projects(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, project_id)
);

create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  session_id text not null,
  role text not null check (role in ('user','assistant')),
  content text not null,
  created_at timestamptz not null default now()
);

-- Sign-up details are copied from Supabase Auth metadata by the trigger below.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  studio_name text not null default '',
  email text not null,
  service_interest text not null check (service_interest in ('brand','web','motion','art-direction','other')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.create_profile_for_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, studio_name, email, service_interest)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.raw_user_meta_data ->> 'studio_name', ''),
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'service_interest', 'other')
  )
  on conflict (id) do update set
    full_name = excluded.full_name,
    studio_name = excluded.studio_name,
    email = excluded.email,
    service_interest = excluded.service_interest,
    updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_profile on auth.users;
create trigger on_auth_user_created_profile
  after insert on auth.users
  for each row execute procedure public.create_profile_for_new_user();

alter table public.projects enable row level security;
alter table public.saved_projects enable row level security;
alter table public.chat_messages enable row level security;
alter table public.profiles enable row level security;

create policy "Published projects are public" on public.projects for select using (published = true);
create policy "Users manage their saved projects" on public.saved_projects for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users read own chat messages" on public.chat_messages for select using (auth.uid() = user_id);
create policy "Users insert own chat messages" on public.chat_messages for insert with check (auth.uid() = user_id);

drop policy if exists "Users read their profile" on public.profiles;
create policy "Users read their profile" on public.profiles for select using (auth.uid() = id);
drop policy if exists "Users update their profile" on public.profiles;
create policy "Users update their profile" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
