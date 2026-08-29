import { useState } from "react";
import type { GalleryItem } from "../types/content";
import Lightbox from "./Lightbox";

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (items.length === 0) {
    return <p className="text-ink/60">Ainda não há imagens nesta categoria.</p>;
  }

  return (
    <>
      <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-xl"
          >
            <img
              src={item.imagem.src}
              alt={item.imagem.alt}
              loading="lazy"
              className="w-full object-cover transition-transform duration-500 ease-editorial group-hover:scale-105"
            />
            {item.tipo === "video" && (
              <span className="absolute inset-0 flex items-center justify-center bg-ink/20">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-paper/90 text-ink">▶</span>
              </span>
            )}
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-3 text-left text-xs font-medium text-paper opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {item.titulo}
            </span>
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <Lightbox items={items} index={activeIndex} onClose={() => setActiveIndex(null)} onNavigate={setActiveIndex} />
      )}
    </>
  );
}
