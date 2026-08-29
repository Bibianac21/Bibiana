import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Backend for the NKENTU CMS and /admin (see README "CMS / Supabase"):
 * `activities`, `stories`, `newsletters`, `gallery_items`, `partners`,
 * `team_members` and `site_settings` tables mirroring the shapes in
 * `src/types/content.ts`, plus Storage for photography and Auth for the
 * admin area. The client is created lazily and only when both env vars are
 * present, so the app (and `scripts/seed.ts`, run under plain Node/tsx
 * rather than Vite — hence `import.meta.env` may be undefined there)
 * degrades to the mock fixtures in `src/data/*.ts` when it isn't configured.
 */
const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY;

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
