// Renders the NKENTU newsletter as a self-contained, inlined-CSS HTML email
// (Gmail/Outlook-safe table layout), following the exact visual identity of
// the reference template the team provided: near-black background (#120C22),
// card blocks (#1E1733 / border #35294F), NKENTU orange (#F2661E) and purple
// (#AC8FF2) accents, Baloo 2 headlines + Work Sans body text.
//
// Deliberately self-contained (no imports outside this file) so the Supabase
// CLI can bundle+deploy this function on its own.

const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

function formatMonthYear(iso: string): string {
  const [year, month] = iso.split("-").map(Number);
  return `${MESES[(month ?? 1) - 1]} / ${year}`;
}

/** Minimal HTML-escaping for values interpolated into the markup below. */
function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export interface NewsletterEmailInput {
  titulo: string;
  slug: string;
  edicao: number;
  data: string; // ISO date, e.g. "2026-08-25"
  resumo: string;
  imagem: { src: string; alt: string };
}

export interface SiteFooterInput {
  siteUrl: string; // absolute, no trailing slash, e.g. "https://nkentu.org"
  contacto: {
    endereco?: string;
    redesSociais?: { label: string; href: string }[];
  };
}

export function renderNewsletterEmail(
  newsletter: NewsletterEmailInput,
  subscriberNome: string,
  site: SiteFooterInput,
  unsubscribeUrl: string,
): { subject: string; html: string } {
  const primeiroNome = subscriberNome.trim().split(/\s+/)[0] || subscriberNome;
  const edicaoUrl = `${site.siteUrl}/newsletter/${newsletter.slug}`;
  const participarUrl = `${site.siteUrl}/contacto`;
  const subject = `NKENTU · Newsletter Nº${newsletter.edicao} — ${newsletter.titulo}`;

  const redes = site.contacto.redesSociais ?? [];
  const redesHtml = redes
    .map(
      (rede, i) =>
        `${i > 0 ? "&nbsp;·&nbsp;" : ""}<a href="${esc(rede.href)}" style="color:#AC8FF2; text-decoration:none;">${esc(rede.label)}</a>`,
    )
    .join("");

  const html = `<!DOCTYPE html>
<html lang="pt-AO" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">
<title>${esc(subject)}</title>
<link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800&family=Work+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<!--[if mso]>
<noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
<![endif]-->
<style>
  body, table, td { -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; }
  table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
  img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
  body { margin: 0; padding: 0; width: 100% !important; background-color: #120C22; }
  .headline { font-family: 'Baloo 2', 'Arial Rounded MT Bold', Arial, sans-serif; }
  .body-font { font-family: 'Work Sans', Helvetica, Arial, sans-serif; }
  a.cta-link { text-decoration: none; }
  @media screen and (max-width: 600px) {
    .full-width { width: 100% !important; }
    .px { padding-left: 20px !important; padding-right: 20px !important; }
    .h1 { font-size: 30px !important; line-height: 34px !important; }
  }
</style>
</head>
<body class="body-font" style="margin:0; padding:0; background-color:#120C22;">
<div style="display:none; max-height:0; overflow:hidden; mso-hide:all;">
  ${esc(newsletter.resumo)} &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
</div>

<center style="width:100%; background-color:#120C22;">
<!--[if mso]>
<table role="presentation" width="600" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td>
<![endif]-->

<table role="presentation" class="full-width" width="600" align="center" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; margin:0 auto; background-color:#120C22;">

  <tr>
    <td class="px" align="center" style="padding:32px 32px 24px 32px; background-color:#120C22;" bgcolor="#120C22">
      <div class="headline" style="font-size:26px; line-height:26px; letter-spacing:1px; color:#FFFFFF; font-weight:800;">NKENTU</div>
      <div class="body-font" style="font-size:12px; letter-spacing:2px; text-transform:uppercase; color:#AC8FF2; margin-top:10px; font-weight:600;">Newsletter · Edição Nº${String(newsletter.edicao).padStart(2, "0")} · ${formatMonthYear(newsletter.data)}</div>
    </td>
  </tr>

  <tr>
    <td class="px" style="padding:8px 32px 28px 32px; background-color:#120C22;" bgcolor="#120C22">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#1E1733; border-radius:16px; border:1px solid #35294F;">
        <tr>
          <td style="padding:26px 28px;">
            <p class="body-font" style="margin:0; font-size:15px; line-height:24px; color:#F4F1FB;">
              Olá, ${esc(primeiroNome)} 👋<br><br>
              Mais um mês de trabalho colectivo. Esta edição traz o que se passou nos nossos encontros — vamos a isso.
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <tr>
    <td class="px" style="padding:0 32px 28px 32px; background-color:#120C22;" bgcolor="#120C22">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#1E1733; border-radius:16px; border:1px solid #35294F; overflow:hidden;">
        <tr>
          <td style="padding:0;">
            <img src="${esc(newsletter.imagem.src)}" alt="${esc(newsletter.imagem.alt)}" width="600" style="display:block; width:100%; max-width:600px; height:auto; border-radius:16px 16px 0 0;">
          </td>
        </tr>
        <tr>
          <td style="padding:22px 28px 0 28px;">
            <span class="body-font" style="display:inline-block; font-size:11px; letter-spacing:2px; text-transform:uppercase; color:#F2661E; font-weight:700;">Destaque do mês</span>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 28px 6px 28px;">
            <span class="headline" style="font-size:24px; line-height:28px; color:#FFFFFF; font-weight:800;">${esc(newsletter.titulo)}</span>
          </td>
        </tr>
        <tr>
          <td style="padding:0 28px 24px 28px;">
            <p class="body-font" style="margin:0; font-size:15px; line-height:23px; color:#D9D2EE;">${esc(newsletter.resumo)}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:0 28px 28px 28px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center" style="border-radius:10px; background-color:#F2661E;">
                  <a href="${esc(edicaoUrl)}" class="cta-link body-font" style="display:inline-block; padding:13px 26px; font-size:14px; font-weight:700; color:#120C22;">Ler a edição completa →</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <tr>
    <td class="px" style="padding:0 32px 28px 32px; background-color:#120C22;" bgcolor="#120C22">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F2661E; border-radius:16px;">
        <tr>
          <td align="center" style="padding:30px 28px;">
            <span class="headline" style="font-size:21px; color:#120C22; font-weight:800;">Queres fazer parte?</span><br><br>
            <span class="body-font" style="font-size:14px; line-height:21px; color:#2A1607;">
              Como voluntária, mentora ou apoiante — há sempre um lugar para ti na NKENTU.
            </span><br><br>
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center" style="border-radius:10px; background-color:#120C22;">
                  <a href="${esc(participarUrl)}" class="cta-link body-font" style="display:inline-block; padding:13px 28px; font-size:14px; font-weight:700; color:#FFFFFF;">Quero participar →</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <tr>
    <td class="px" align="center" style="padding:24px 32px 40px 32px; background-color:#120C22;" bgcolor="#120C22">
      <span class="headline" style="font-size:15px; color:#FFFFFF; font-weight:800; letter-spacing:0.5px;">NKENTU</span><br>
      <span class="body-font" style="font-size:12px; color:#7A7194; line-height:20px;">
        ${esc(site.contacto.endereco ?? "")}
      </span><br><br>
      ${redesHtml ? `<span class="body-font" style="font-size:12px;">${redesHtml}</span><br><br>` : ""}
      <span class="body-font" style="font-size:11px; color:#544C6B;">
        Recebeste este email porque fazes parte da comunidade NKENTU.<br>
        <a href="${esc(unsubscribeUrl)}" style="color:#544C6B; text-decoration:underline;">Cancelar subscrição</a>
      </span>
    </td>
  </tr>

</table>

<!--[if mso]>
</td></tr></table>
<![endif]-->
</center>
</body>
</html>
`;

  return { subject, html };
}
