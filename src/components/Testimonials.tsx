import { useState } from "react";
import { Link } from "react-router-dom";
import type { Story } from "../types/content";

export default function Testimonials({ stories }: { stories: Story[] }) {
  const [index, setIndex] = useState(0);

  if (stories.length === 0) return null;
  const current = stories[index % stories.length];

  function go(delta: number) {
    setIndex((i) => (i + delta + stories.length) % stories.length);
  }

  return (
    <div>
      <figure className="rounded-3xl border border-ink/10 bg-paper-warm p-8 sm:p-12">
        <span className="font-display text-6xl leading-none text-clay-300" aria-hidden="true">
          "
        </span>
        <blockquote className="mt-2 text-2xl leading-snug text-balance sm:text-3xl">{current.citacaoDestaque}</blockquote>
        <figcaption className="mt-8 flex items-center gap-4">
          <img src={current.fotografia.src} alt="" className="h-14 w-14 rounded-full object-cover" />
          <div>
            <Link to={`/historias/${current.slug}`} className="font-semibold text-ink hover:text-clay-300">
              {current.nome}
            </Link>
            <p className="text-sm text-ink/60">Ler a história completa</p>
          </div>
        </figcaption>
      </figure>

      {stories.length > 1 && (
        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="flex gap-2" role="tablist" aria-label="Escolher testemunho">
            {stories.map((story, i) => (
              <button
                key={story.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Testemunho ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-8 bg-clay-300" : "w-1.5 bg-ink/20"}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Testemunho anterior"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink/20 text-ink transition-colors hover:border-ink"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Testemunho seguinte"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink/20 text-ink transition-colors hover:border-ink"
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
