-- Lets a single gallery item hold more than one photo (e.g. several shots
-- from the same activity, shown together in one card instead of many).
-- Additive-only — safe to run on a project that already applied the
-- earlier migrations.
alter table public.gallery_items add column if not exists imagens jsonb not null default '[]';
