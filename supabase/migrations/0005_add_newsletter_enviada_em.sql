-- Tracks when a newsletter edition was last emailed to subscribers (see the
-- send-newsletter Edge Function), so the admin panel can show "already sent"
-- and avoid an accidental repeat send. Additive-only.
alter table public.newsletters add column if not exists enviada_em timestamptz;
