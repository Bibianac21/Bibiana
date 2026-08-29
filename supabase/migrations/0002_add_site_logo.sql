-- Adds a "logo" field to the site_settings singleton, so the NKENTU
-- wordmark image can be uploaded and shown in the header instead of the
-- plain text "NKENTU". Additive-only — safe to run on a project that
-- already applied 0001_init.sql.
alter table public.site_settings add column if not exists logo jsonb not null default '{}';
