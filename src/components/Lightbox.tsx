import { useEffect } from "react";
import { Link } from "react-router-dom";
import type { GalleryItem } from "../types/content";
import { GALLERY_CATEGORY_LABELS } from "../types/content";
import { formatDateLong } from "../lib/format";

interface LightboxProps {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const item = items[index];

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNavigate((index + 1) % items.length);
      if (event.key === "ArrowLeft") onNavigate((index - 1 + items.length) % items.length);
    }
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [index, items.length, onClose, onNavigate]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.titulo}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-paper/95 p-4 sm:p-8"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-ink/30 text-ink hover:bg-ink/10 sm:right-8 sm:top-8"
      >
        ✕
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onNavigate((index - 1 + items.length) % items.length);
        }}
        aria-label="Imagem anterior"
        className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ink/30 text-ink hover:bg-ink/10 sm:left-6"
      >
        ‹
      </button>

      <div
        className="flex max-h-[85vh] w-full max-w-4xl flex-col gap-4"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={item.imagem.src}
          alt={item.imagem.alt}
          className="max-h-[65vh] w-full rounded-lg object-contain"
        />
        <div className="text-ink">
          <p className="font-display text-xl">{item.titulo}</p>
          <p className="mt-1 text-sm text-ink/70">{item.legenda}</p>
          <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs uppercase tracking-wide text-ink/50">
            <span>{GALLERY_CATEGORY_LABELS[item.categoria]}</span>
            <span>{formatDateLong(item.data)}</span>
            {item.actividadeSlug && (
              <Link
                to={`/actividades/${item.actividadeSlug}`}
                className="underline decoration-ochre-300 underline-offset-4 hover:text-ink"
              >
                Ver actividade relacionada
              </Link>
            )}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onNavigate((index + 1) % items.length);
        }}
        aria-label="Próxima imagem"
        className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ink/30 text-ink hover:bg-ink/10 sm:right-6"
      >
        ›
      </button>
    </div>
  );
}
