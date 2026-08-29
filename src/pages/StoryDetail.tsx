import { Link, useParams } from "react-router-dom";
import Seo from "../components/Seo";
import StoryCard from "../components/StoryCard";
import NotFound from "./NotFound";
import { getStoryBySlug, getRelatedStories, fetchStoryBySlug, fetchRelatedStories } from "../data/stories";
import { useLiveData } from "../lib/useLiveData";
import { STORY_CATEGORY_LABELS } from "../types/content";
import { formatDateLong } from "../lib/format";

export default function StoryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const story = useLiveData(
    slug ? getStoryBySlug(slug) : undefined,
    () => (slug ? fetchStoryBySlug(slug) : Promise.resolve(undefined)),
    [slug],
  );
  const related = useLiveData(
    story ? getRelatedStories(story) : [],
    () => (story ? fetchRelatedStories(story) : Promise.resolve([])),
    [story?.id],
  );

  if (!story) return <NotFound />;

  return (
    <>
      <Seo title={story.seo.metaTitle} description={story.seo.metaDescription} ogImage={story.seo.ogImage ?? story.fotografia.src} />

      <div className="container-editorial pt-8">
        <Link to="/historias" className="btn-text">
          ← Todas as histórias
        </Link>
      </div>

      <article>
        <header className="container-editorial grid gap-10 py-10 lg:grid-cols-2 lg:items-center">
          <div className="aspect-[4/5] overflow-hidden rounded-3xl">
            <img src={story.fotografia.src} alt={story.fotografia.alt} className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="eyebrow">{STORY_CATEGORY_LABELS[story.categoria]}</p>
            <h1 className="text-display-lg mt-4 text-balance">{story.titulo}</h1>
            <p className="mt-4 text-lg font-medium text-ink/70">{story.nome}</p>
            <p className="mt-1 text-sm text-ink/50">{formatDateLong(story.data)}</p>
          </div>
        </header>

        <div className="container-editorial max-w-prose space-y-6 pb-16 text-lg leading-relaxed text-ink/80">
          {story.conteudo.map((paragrafo, i) => (
            <p key={i}>{paragrafo}</p>
          ))}
        </div>

        {story.citacaoDestaque && (
          <blockquote className="border-y border-ink/10 bg-sand py-16">
            <p className="container-editorial text-display-md max-w-3xl text-balance">"{story.citacaoDestaque}"</p>
          </blockquote>
        )}

        {story.galeria && (
          <div className="container-editorial py-16">
            <h2 className="font-display text-2xl">Galeria</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {story.galeria.map((foto) => (
                <div key={foto.src} className="aspect-[4/3] overflow-hidden rounded-xl">
                  <img src={foto.src} alt={foto.alt} loading="lazy" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}
      </article>

      {related.length > 0 && (
        <section className="border-t border-ink/10 bg-sand py-16 sm:py-24">
          <div className="container-editorial">
            <h2 className="text-display-md text-balance">Veja também</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <StoryCard key={item.id} story={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
