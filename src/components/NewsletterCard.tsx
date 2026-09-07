import { Link } from "react-router-dom";
import type { Newsletter } from "../types/content";
import { formatDateLong } from "../lib/format";

export default function NewsletterCard({ newsletter }: { newsletter: Newsletter }) {
  return (
    <Link
      to={`/newsletter/${newsletter.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-paper-warm transition-transform duration-300 ease-editorial hover:-translate-y-1 sm:flex-row"
    >
      <div className="relative aspect-[16/10] overflow-hidden sm:w-2/5">
        <img
          src={newsletter.imagem.src}
          alt={newsletter.imagem.alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-editorial group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-ochre-300">
          Edição nº{newsletter.edicao} · {formatDateLong(newsletter.data)}
        </p>
        <h3 className="font-display text-xl leading-snug text-balance">{newsletter.titulo}</h3>
        <p className="text-sm text-ink/70">{newsletter.resumo}</p>
        <span className="mt-1 inline-flex w-fit items-center gap-2 rounded-lg bg-ochre-500 px-5 py-2.5 text-sm font-semibold text-paper transition-colors duration-300 ease-editorial group-hover:bg-ochre-300">
          Ler a edição completa →
        </span>
      </div>
    </Link>
  );
}
