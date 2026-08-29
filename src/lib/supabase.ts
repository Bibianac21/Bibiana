import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase is the intended backend for the NKENTU CMS (see README):
 * `activities`, `stories`, `newsletters`, `gallery_items`, `partners` and
 * `team_members` tables mirroring the shapes in `src/types/content.ts`,
 * plus Storage buckets for photography and Auth for the admin area.
 *
 * No project is provisioned yet, so this client is created lazily and only
 * when both env vars are present — every current page reads from
 * `src/data/*.ts` instead. `getSupabaseClient()` is the single place a
 * future data-fetching layer needs to touch to start reading from the real
 * database rather than the mock fixtures.
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  if (!client) client = createClient(supabaseUrl, supabaseAnonKey);
  return client;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export interface NewsletterSubscription {
  nome: string;
  email: string;
}

/**
 * Subscribes an address to the newsletter. Writes to Supabase's
 * `newsletter_subscribers` table when configured; otherwise resolves
 * successfully after a short delay so the form works end-to-end in this
 * prototype without a backend attached.
 */
export async function subscribeToNewsletter(
  data: NewsletterSubscription,
): Promise<{ ok: boolean; error?: string }> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { ok: true };
  }

  const { error } = await supabase.from("newsletter_subscribers").insert({
    nome: data.nome,
    email: data.email,
  });

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export interface ContactMessage {
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
}

/** Same lazy-Supabase pattern as `subscribeToNewsletter`, writing to `contact_messages`. */
export async function sendContactMessage(data: ContactMessage): Promise<{ ok: boolean; error?: string }> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { ok: true };
  }

  const { error } = await supabase.from("contact_messages").insert(data);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
