// Sends one newsletter edition to every subscriber in `newsletter_subscribers`,
// using the shared template in ../_shared/newsletterEmail.ts and Resend's API.
//
// Requires these secrets to be set on the Supabase project
// (Dashboard → Edge Functions → Secrets, or `supabase secrets set`):
//   RESEND_API_KEY    — from resend.com
//   RESEND_FROM_EMAIL — e.g. "NKENTU <newsletter@nkentu.org>" (must be a
//                        verified sender/domain in Resend; while testing you
//                        can use "NKENTU <onboarding@resend.dev>")
//   SITE_URL          — absolute site URL, no trailing slash, e.g.
//                        "https://nkentu.org" — used to build links inside
//                        the email (edition page, unsubscribe, etc).
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are provided automatically by
// the Supabase Edge Functions runtime.
//
// Invoked from the admin panel (authenticated session) as:
//   supabase.functions.invoke("send-newsletter", { body: { newsletterId } })

import { createClient } from "npm:@supabase/supabase-js@2";
import { renderNewsletterEmail } from "../_shared/newsletterEmail.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { newsletterId } = await req.json();
    if (!newsletterId || typeof newsletterId !== "string") {
      return json({ error: "Falta o campo newsletterId." }, 400);
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const fromEmail = Deno.env.get("RESEND_FROM_EMAIL");
    const siteUrl = Deno.env.get("SITE_URL");
    if (!resendApiKey || !fromEmail || !siteUrl) {
      return json(
        {
          error:
            "Envio de emails não configurado: falta RESEND_API_KEY, RESEND_FROM_EMAIL ou SITE_URL nos secrets do projecto Supabase.",
        },
        500,
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Only an authenticated admin (the /admin panel's logged-in session) may
    // trigger a real send to every subscriber.
    const authHeader = req.headers.get("Authorization") ?? "";
    const token = authHeader.replace(/^Bearer\s+/i, "");
    const { data: userData, error: authError } = await supabase.auth.getUser(token);
    if (authError || !userData?.user) {
      return json({ error: "Não autenticado." }, 401);
    }

    const { data: newsletter, error: newsletterError } = await supabase
      .from("newsletters")
      .select("*")
      .eq("id", newsletterId)
      .single();
    if (newsletterError || !newsletter) {
      return json({ error: "Newsletter não encontrada." }, 404);
    }

    const { data: siteSettings } = await supabase
      .from("site_settings")
      .select("contacto")
      .eq("id", 1)
      .single();

    const { data: subscribers, error: subscribersError } = await supabase
      .from("newsletter_subscribers")
      .select("nome, email");
    if (subscribersError) {
      return json({ error: `Falha ao carregar subscritores: ${subscribersError.message}` }, 500);
    }
    if (!subscribers || subscribers.length === 0) {
      return json({ error: "Não há subscritores para enviar." }, 400);
    }

    const site = { siteUrl, contacto: siteSettings?.contacto ?? {} };

    const emails = subscribers.map((subscriber: { nome: string; email: string }) => {
      const unsubscribeUrl = `${Deno.env.get("SUPABASE_URL")}/functions/v1/unsubscribe-newsletter?email=${encodeURIComponent(subscriber.email)}`;
      const { subject, html } = renderNewsletterEmail(newsletter, subscriber.nome, site, unsubscribeUrl);
      return { from: fromEmail, to: subscriber.email, subject, html };
    });

    // Resend's batch endpoint accepts up to 100 emails per call.
    let sent = 0;
    const failures: string[] = [];
    for (let i = 0; i < emails.length; i += 100) {
      const batch = emails.slice(i, i + 100);
      const response = await fetch("https://api.resend.com/emails/batch", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(batch),
      });
      if (response.ok) {
        sent += batch.length;
      } else {
        const detail = await response.text();
        failures.push(detail);
      }
    }

    if (sent > 0) {
      await supabase
        .from("newsletters")
        .update({ enviada_em: new Date().toISOString() })
        .eq("id", newsletterId);
    }

    if (failures.length > 0) {
      return json({ sent, failed: subscribers.length - sent, error: failures.join(" | ") }, 207);
    }
    return json({ sent, failed: 0 });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Erro inesperado." }, 500);
  }
});
