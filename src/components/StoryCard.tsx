import { Link } from "react-router-dom";
import type { Story } from "../types/content";
import { formatDateLong } from "../lib/format";

export default function StoryCard({ story, size = "default" }: { story: Story; size?: "default" | "large" }) {
  return (
    <Link
      to={`/historias/${story.slug}`}
      className={`group flex overflow-hidden rounded-2xl border border-ink/10 bg-paper-warm transition-transform duration-300 ease-editorial hover:-translate-y-1 ${
        size === "large" ? "flex-col sm:flex-row" : "flex-col"
      }`}
    >
      <div className={`relative overflow-hidden ${size === "large" ? "aspect-[4/3] sm:w-1/2" : "aspect-[4/5]"}`}>
        <img
          src={story.fotografia.src}
          alt={story.fotografia.alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-editorial group-hover:scale-105"
        />
      </div>
      <div className={`flex flex-1 flex-col gap-3 p-6 ${size === "large" ? "justify-center" : ""}`}>
        <p className="text-xs font-medium uppercase tracking-wide text-ink/50">{formatDateLong(story.data)}</p>
        <h3 className={`font-display text-balance leading-snug ${size === "large" ? "text-2xl sm:text-3xl" : "text-xl"}`}>
          {story.titulo}
        </h3>
        <p className="text-sm text-ink/70">{story.resumo}</p>
      </div>
    </Link>
  );
}
