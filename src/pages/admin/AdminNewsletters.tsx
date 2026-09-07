import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CrudList from "../../admin/CrudList";
import CrudForm from "../../admin/CrudForm";
import { NEWSLETTER_FIELDS } from "../../admin/collections";
import { emptyValueForFields } from "../../admin/FieldRenderer";
import { getRow } from "../../lib/adminDb";
import { getSupabaseClient } from "../../lib/supabase";
import { formatDateLong } from "../../lib/format";
import type { Newsletter } from "../../types/content";

const TABLE = "newsletters";
const BASE = "/admin/newsletters";

export function AdminNewslettersList() {
  return (
    <CrudList<Newsletter>
      title="Newsletters"
      table={TABLE}
      basePath={BASE}
      orderBy="data"
      rowKey={(row) => row.id}
      renderRow={(row) => (
        <>
          <span className="font-medium">{row.titulo}</span>
          <span className="text-sm text-ink/50">Edição nº{row.edicao}</span>
        </>
      )}
    />
  );
}

export function AdminNewsletterForm() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === "novo";
  const [initial, setInitial] = useState<Newsletter | null>(null);

  useEffect(() => {
    if (isNew) {
      setInitial({ id: crypto.randomUUID(), ...(emptyValueForFields(NEWSLETTER_FIELDS) as object) } as Newsletter);
      return;
    }
    if (id) getRow<Newsletter>(TABLE, id).then(setInitial);
  }, [id, isNew]);

  if (!initial) return <p className="text-ink/50">A carregar…</p>;

  return (
    <>
      {!isNew && (
        <div className="max-w-3xl">
          <SendNewsletterCard newsletter={initial} />
        </div>
      )}
      <CrudForm<Newsletter>
        title={isNew ? "Nova newsletter" : initial.titulo}
        fields={NEWSLETTER_FIELDS}
        initial={initial}
        table={TABLE}
        isNew={isNew}
        backHref={BASE}
      />
    </>
  );
}

/**
 * Triggers the send-newsletter Edge Function, which emails every address in
 * newsletter_subscribers using the NKENTU email template (see
 * supabase/functions/send-newsletter). Requires RESEND_API_KEY,
 * RESEND_FROM_EMAIL and SITE_URL to be set as Supabase project secrets —
 * see the README for setup steps.
 */
function SendNewsletterCard({ newsletter }: { newsletter: Newsletter }) {
  const [enviadaEm, setEnviadaEm] = useState(newsletter.enviada_em ?? null);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  async function handleSend() {
    const confirmMessage = enviadaEm
      ? `Esta edição já foi enviada em ${formatDateLong(enviadaEm.slice(0, 10))}. Enviar novamente a todos os subscritores?`
      : "Enviar esta edição, por email, a todos os subscritores da newsletter? Esta acção não pode ser desfeita.";
    if (!window.confirm(confirmMessage)) return;

    const supabase = getSupabaseClient();
    if (!supabase) {
      setResult({ ok: false, message: "Supabase não está configurado." });
      return;
    }

    setSending(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("send-newsletter", {
        body: { newsletterId: newsletter.id },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setEnviadaEm(new Date().toISOString());
      setResult({ ok: true, message: `Enviada a ${data.sent} subscritor(es).` });
    } catch (err) {
      setResult({ ok: false, message: err instanceof Error ? err.message : "Falha ao enviar." });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="mb-8 rounded-xl border border-ink/15 bg-sand p-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-ink">Envio por email</p>
          <p className="mt-1 text-xs text-ink/60">
            {enviadaEm ? `Enviada em ${formatDateLong(enviadaEm.slice(0, 10))}.` : "Ainda não foi enviada por email."}
          </p>
        </div>
        <button type="button" onClick={handleSend} disabled={sending} className="btn-secondary">
          {sending ? "A enviar…" : enviadaEm ? "Reenviar aos inscritos" : "Enviar aos inscritos"}
        </button>
      </div>
      {result && (
        <p className={`mt-3 text-sm ${result.ok ? "text-moss-300" : "text-clay-300"}`} role="status">
          {result.message}
        </p>
      )}
    </div>
  );
}
