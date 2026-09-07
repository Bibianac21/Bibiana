// Public endpoint the "Cancelar subscrição" link in the newsletter email
// points to. Deletes the matching row from `newsletter_subscribers` and
// shows a small confirmation page. No auth required (see supabase/config.toml
// — verify_jwt = false for this function) since the person clicking it isn't
// logged in anywhere.

import { createClient } from "npm:@supabase/supabase-js@2";

function page(message: string): Response {
  const html = `<!DOCTYPE html>
<html lang="pt-AO">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>NKENTU — Newsletter</title>
</head>
<body style="margin:0; padding:0; background-color:#120C22; font-family:Helvetica,Arial,sans-serif;">
  <div style="max-width:480px; margin:80px auto; padding:32px; text-align:center; color:#F4F1FB;">
    <div style="font-size:22px; font-weight:800; letter-spacing:1px; margin-bottom:24px;">NKENTU</div>
    <p style="font-size:15px; line-height:24px;">${message}</p>
  </div>
</body>
</html>`;
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}

Deno.serve(async (req) => {
  const email = new URL(req.url).searchParams.get("email");
  if (!email) return page("Falta o email a cancelar.");

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const { error } = await supabase.from("newsletter_subscribers").delete().eq("email", email);
  if (error) return page("Não foi possível cancelar a subscrição. Tenta novamente mais tarde.");

  return page("Subscrição cancelada. Já não vais receber a newsletter da NKENTU neste email.");
});
