import { useState, type FormEvent } from "react";
import Seo from "../components/Seo";
import { siteSettings } from "../data/site";
import { sendContactMessage } from "../lib/supabase";

export default function Contact() {
  const [form, setForm] = useState({ nome: "", email: "", assunto: "Participar", mensagem: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    const result = await sendContactMessage(form);
    setStatus(result.ok ? "success" : "error");
    if (result.ok) setForm({ nome: "", email: "", assunto: "Participar", mensagem: "" });
  }

  return (
    <>
      <Seo
        title="Contacto — NKENTU"
        description="Fale com a NKENTU sobre participação, parcerias ou apoio ao projecto."
      />

      <header className="container-editorial pb-10 pt-14 sm:pt-20">
        <p className="eyebrow mb-4">Contacto</p>
        <h1 className="text-display-lg text-balance">Vamos conversar.</h1>
        <p className="mt-4 max-w-prose text-lg text-ink/70">
          Quer participar numa actividade, propor uma parceria ou apoiar o projecto? Escreva-nos.
        </p>
      </header>

      <div className="container-editorial grid gap-12 pb-24 lg:grid-cols-[1.2fr_1fr]">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-ink">Nome</span>
              <input
                type="text"
                required
                value={form.nome}
                onChange={(event) => setForm({ ...form, nome: event.target.value })}
                className="w-full rounded-xl border border-ink/20 bg-transparent px-4 py-3 text-ink"
                autoComplete="name"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-ink">Email</span>
              <input
                type="email"
                required
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                className="w-full rounded-xl border border-ink/20 bg-transparent px-4 py-3 text-ink"
                autoComplete="email"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-ink">Assunto</span>
            <select
              value={form.assunto}
              onChange={(event) => setForm({ ...form, assunto: event.target.value })}
              className="w-full rounded-xl border border-ink/20 bg-paper px-4 py-3 text-ink"
            >
              <option>Participar</option>
              <option>Parceria</option>
              <option>Apoiar</option>
              <option>Outro assunto</option>
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-ink">Mensagem</span>
            <textarea
              required
              rows={5}
              value={form.mensagem}
              onChange={(event) => setForm({ ...form, mensagem: event.target.value })}
              className="w-full rounded-xl border border-ink/20 bg-transparent px-4 py-3 text-ink"
            />
          </label>

          <button type="submit" disabled={status === "loading"} className="btn-primary">
            {status === "loading" ? "A enviar…" : "Enviar mensagem"}
          </button>

          {status === "success" && (
            <p className="text-sm text-moss-700" role="status">
              Mensagem enviada. Vamos responder brevemente.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-clay-600" role="alert">
              Não foi possível enviar a mensagem. Tente novamente.
            </p>
          )}
        </form>

        <aside className="space-y-8 rounded-3xl border border-ink/10 bg-sand p-8">
          <div>
            <h2 className="font-display text-xl">Contacto directo</h2>
            <dl className="mt-4 space-y-2 text-ink/80">
              <div className="flex gap-2">
                <dt className="font-semibold">Email:</dt>
                <dd>
                  <a href={`mailto:${siteSettings.contacto.email}`} className="underline decoration-clay-500 underline-offset-4">
                    {siteSettings.contacto.email}
                  </a>
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold">Telefone:</dt>
                <dd>{siteSettings.contacto.telefone}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold">Endereço:</dt>
                <dd>{siteSettings.contacto.endereco}</dd>
              </div>
            </dl>
          </div>
          <div>
            <h2 className="font-display text-xl">Redes sociais</h2>
            <ul className="mt-4 flex flex-wrap gap-4">
              {siteSettings.contacto.redesSociais.map((rede) => (
                <li key={rede.label}>
                  <a
                    href={rede.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold underline decoration-clay-500 underline-offset-4"
                  >
                    {rede.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
