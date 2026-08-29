-- NKENTU CMS schema.
--
-- Design choice: nested/array shapes (images, paragraphs, testimonials,
-- SEO fields, ...) are stored as jsonb columns whose keys match the
-- TypeScript types in src/types/content.ts exactly (e.g. "imagemPrincipal"
-- jsonb holds {src, alt}). This keeps the mapping between a Supabase row
-- and the app's content types close to a straight cast, instead of a
-- hand-written to/from-row translation layer for every collection.
--
-- Run this once in the Supabase SQL editor (or `supabase db push`) on a
-- fresh project, then optionally run `npm run seed` to populate it with
-- the same starter content the prototype ships with.

create extension if not exists pgcrypto;

-- ─── activities ─────────────────────────────────────────────────────────
create table if not exists public.activities (
  id text primary key default gen_random_uuid()::text,
  slug text unique not null,
  titulo text not null,
  categoria text not null check (categoria in ('formacao', 'workshop', 'mentoria', 'evento', 'programa')),
  "imagemPrincipal" jsonb not null,
  data date not null,
  "dataFim" date,
  hora text,
  local text not null,
  "descricaoCurta" text not null,
  "descricaoCompleta" jsonb not null default '[]',
  estado text not null check (estado in ('proxima', 'a-decorrer', 'terminada')),
  objectivos jsonb not null default '[]',
  "publicoAlvo" text,
  galeria jsonb not null default '[]',
  video text,
  "parceiroIds" jsonb not null default '[]',
  resultados jsonb not null default '[]',
  testemunhos jsonb not null default '[]',
  destaque boolean not null default false,
  cta jsonb,
  seo jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ─── stories ────────────────────────────────────────────────────────────
create table if not exists public.stories (
  id text primary key default gen_random_uuid()::text,
  slug text unique not null,
  titulo text not null,
  nome text not null,
  fotografia jsonb not null,
  categoria text not null check (categoria in ('participante', 'testemunho', 'entrevista', 'perfil', 'transformacao', 'bastidores')),
  resumo text not null,
  conteudo jsonb not null default '[]',
  galeria jsonb not null default '[]',
  "citacaoDestaque" text,
  data date not null,
  destaque boolean not null default false,
  seo jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ─── newsletters ────────────────────────────────────────────────────────
create table if not exists public.newsletters (
  id text primary key default gen_random_uuid()::text,
  slug text unique not null,
  titulo text not null,
  edicao integer not null,
  data date not null,
  imagem jsonb not null,
  resumo text not null,
  conteudo jsonb not null default '[]',
  destaque boolean not null default false,
  seo jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ─── gallery_items ──────────────────────────────────────────────────────
create table if not exists public.gallery_items (
  id text primary key default gen_random_uuid()::text,
  imagem jsonb not null,
  titulo text not null,
  legenda text not null,
  categoria text not null check (categoria in ('actividades', 'formacoes', 'eventos', 'comunidade', 'bastidores')),
  "actividadeSlug" text,
  data date not null,
  tipo text not null check (tipo in ('imagem', 'video')) default 'imagem',
  created_at timestamptz not null default now()
);

-- ─── partners ───────────────────────────────────────────────────────────
create table if not exists public.partners (
  id text primary key default gen_random_uuid()::text,
  nome text not null,
  logotipo jsonb not null,
  website text,
  descricao text not null,
  created_at timestamptz not null default now()
);

-- ─── team_members ───────────────────────────────────────────────────────
create table if not exists public.team_members (
  id text primary key default gen_random_uuid()::text,
  nome text not null,
  funcao text not null,
  fotografia jsonb not null,
  biografia text not null,
  "redesSociais" jsonb not null default '[]',
  created_at timestamptz not null default now()
);

-- ─── site_settings (singleton row, id always 1) ────────────────────────
create table if not exists public.site_settings (
  id integer primary key default 1 check (id = 1),
  hero jsonb not null default '{}',
  impacto jsonb not null default '{}',
  "sobreNumeros" jsonb not null default '[]',
  participar jsonb not null default '[]',
  contacto jsonb not null default '{}',
  sobre jsonb not null default '{}',
  updated_at timestamptz not null default now()
);

-- ─── form submissions ───────────────────────────────────────────────────
create table if not exists public.newsletter_subscribers (
  id text primary key default gen_random_uuid()::text,
  nome text not null,
  email text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id text primary key default gen_random_uuid()::text,
  nome text not null,
  email text not null,
  assunto text not null,
  mensagem text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ─── row level security ─────────────────────────────────────────────────
-- Content tables: anyone can read (public website), only signed-in admins
-- (Supabase Auth users, created by hand in the dashboard — there is no
-- self-serve signup) can write.
alter table public.activities enable row level security;
alter table public.stories enable row level security;
alter table public.newsletters enable row level security;
alter table public.gallery_items enable row level security;
alter table public.partners enable row level security;
alter table public.team_members enable row level security;
alter table public.site_settings enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.contact_messages enable row level security;

do $$
declare
  t text;
begin
  foreach t in array array['activities', 'stories', 'newsletters', 'gallery_items', 'partners', 'team_members', 'site_settings'] loop
    execute format('create policy "public read %1$s" on public.%1$s for select using (true)', t);
    execute format('create policy "authenticated write %1$s" on public.%1$s for all using (auth.role() = ''authenticated'') with check (auth.role() = ''authenticated'')', t);
  end loop;
end $$;

-- Subscription/contact forms: the public site can insert (submit a form),
-- only admins can read or manage the submissions.
create policy "public insert newsletter_subscribers" on public.newsletter_subscribers for insert with check (true);
create policy "authenticated manage newsletter_subscribers" on public.newsletter_subscribers for select using (auth.role() = 'authenticated');
create policy "authenticated delete newsletter_subscribers" on public.newsletter_subscribers for delete using (auth.role() = 'authenticated');

create policy "public insert contact_messages" on public.contact_messages for insert with check (true);
create policy "authenticated manage contact_messages" on public.contact_messages for select using (auth.role() = 'authenticated');
create policy "authenticated update contact_messages" on public.contact_messages for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated delete contact_messages" on public.contact_messages for delete using (auth.role() = 'authenticated');

-- ─── storage ────────────────────────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('nkentu-media', 'nkentu-media', true)
on conflict (id) do nothing;

create policy "public read nkentu-media" on storage.objects for select using (bucket_id = 'nkentu-media');
create policy "authenticated upload nkentu-media" on storage.objects for insert with check (bucket_id = 'nkentu-media' and auth.role() = 'authenticated');
create policy "authenticated update nkentu-media" on storage.objects for update using (bucket_id = 'nkentu-media' and auth.role() = 'authenticated');
create policy "authenticated delete nkentu-media" on storage.objects for delete using (bucket_id = 'nkentu-media' and auth.role() = 'authenticated');

insert into public.site_settings (id) values (1) on conflict (id) do nothing;
