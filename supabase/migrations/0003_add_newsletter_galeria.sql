-- Adds a "galeria" (photo gallery) field to newsletters, so each edition
-- can carry more than one photo instead of only the single cover image.
-- Additive-only — safe to run on a project that already applied
-- 0001_init.sql and 0002_add_site_logo.sql.
alter table public.newsletters add column if not exists galeria jsonb not null default '[]';
