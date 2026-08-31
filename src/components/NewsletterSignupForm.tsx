import { useState, type FormEvent } from "react";
import { subscribeToNewsletter } from "../lib/supabase";

interface NewsletterSignupFormProps {
  compact?: boolean;
}

export default function NewsletterSignupForm({ compact = false }: NewsletterSignupFormProps) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    const result = await subscribeToNewsletter({ nome, email });
    if (result.ok) {
      setStatus("success");
      setNome("");
      setEmail("");
    } else {
      setStatus("error");
    }
  }

  const inputClasses = compact
    ? "w-full rounded-lg border border-ink/25 bg-transparent px-4 py-2.5 text-sm text-ink placeholder:text-ink/40 focus-visible:ring-ochre-300"
    : "w-full rounded-lg border border-ink/20 bg-paper px-5 py-3.5 text-sm text-ink placeholder:text-ink/40";

  if (status === "success") {
    return (
      <p className={compact ? "text-sm text-ink/80" : "text-sm text-moss-300"} role="status">
        Subscrição confirmada. Obrigada por acompanhar a NKENTU.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? "space-y-3" : "space-y-4"}>
      <div className={compact ? "space-y-2" : "grid gap-3 sm:grid-cols-2"}>
        <label className="block">
          <span className="sr-only">Nome</span>
          <input
            type="text"
            required
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            placeholder="O seu nome"
            className={inputClasses}
            autoComplete="name"
          />
        </label>
        <label className="block">
          <span className="sr-only">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="O seu email"
            className={inputClasses}
            autoComplete="email"
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className={compact ? "btn-primary w-full bg-clay-500 text-ink hover:bg-clay-600" : "btn-primary"}
      >
        {status === "loading" ? "A subscrever…" : "Subscrever"}
      </button>
      {status === "error" && (
        <p className="text-sm text-clay-300" role="alert">
          Não foi possível concluir a subscrição. Tente novamente.
        </p>
      )}
    </form>
  );
}
