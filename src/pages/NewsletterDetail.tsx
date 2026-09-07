import { Link, useParams } from "react-router-dom";
import Seo from "../components/Seo";
import NotFound from "./NotFound";
import ImpactStats from "../components/ImpactStats";
import FinalCta from "../components/FinalCta";
import { getNewsletterBySlug, getNewsletters, fetchNewsletterBySlug, fetchNewsletters } from "../data/newsletters";
import { siteSettings, fetchSiteContent } from "../data/site";
import { useLiveData } from "../lib/useLiveData";
import { formatDateLong } from "../lib/format";

export default function NewsletterDetail() {
  const { slug } = useParams<{ slug: string }>();
  const newsletter = useLiveData(
    slug ? getNewsletterBySlug(slug) : undefined,
    () => (slug ? fetchNewsletterBySlug(slug) : Promise.resolve(undefined)),
    [slug],
  );
  const all = useLiveData(getNewsletters(), fetchNewsletters);
  const impacto = useLiveData(siteSettings.impacto, async () => (await fetchSiteContent()).impacto);

  if (!newsletter) return <NotFound />;

  const currentIndex = all.findIndex((item) => item.id === newsletter.id);
  const previous = all[currentIndex + 1];
  const next = all[currentIndex - 1];

  return (
    <>
      <Seo
        title={newsletter.seo.metaTitle}
        description={newsletter.seo.metaDescription}
        ogImage={newsletter.seo.ogImage ?? newsletter.imagem.src}
      />

      <div className="container-editorial pt-8">
        <Link to="/newsletter" className="btn-text">
          ← Arquivo de newsletters
        </Link>
      </div>

      <article className="container-editorial py-10">
        <header className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">
            Edição nº{newsletter.edicao} · {formatDateLong(newsletter.data)}
          </p>
          <h1 className="text-display-lg mt-4 text-balance">{newsletter.titulo}</h1>
        </header>

        <div className="mx-auto mt-10 aspect-[16/9] max-w-4xl overflow-hidden rounded-3xl">
          <img src={newsletter.imagem.src} alt={newsletter.imagem.alt} className="h-full w-full object-cover" />
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-ink/10 bg-sand p-7 sm:p-10">
          <p className="eyebrow">Destaque do mês</p>
          <p className="mt-4 text-xl leading-relaxed text-ink sm:text-2xl">{newsletter.resumo}</p>
        </div>

        <div className="mx-auto mt-10 max-w-prose space-y-6 text-lg leading-relaxed text-ink/80">
          {newsletter.conteudo.map((paragrafo, i) => (
            <p key={i}>{paragrafo}</p>
          ))}
        </div>

        {newsletter.galeria && newsletter.galeria.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl">Galeria</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {newsletter.galeria.map((foto) => (
                <div key={foto.src} className="aspect-[4/3] overflow-hidden rounded-xl">
                  <img src={foto.src} alt={foto.alt} loading="lazy" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        {impacto.numeros.length > 0 && (
          <div className="mx-auto mt-16 max-w-3xl rounded-2xl border border-ink/10 bg-sand p-7 sm:p-10">
            <p className="eyebrow justify-center">Impacto em números</p>
            <div className="mt-6">
              <ImpactStats numeros={impacto.numeros} />
            </div>
          </div>
        )}
      </article>

      <FinalCta />

      <nav className="border-t border-ink/10 bg-sand py-10" aria-label="Navegação entre edições">
        <div className="container-editorial flex items-center justify-between gap-4">
          {previous ? (
            <Link to={`/newsletter/${previous.slug}`} className="btn-text">
              ← Edição nº{previous.edicao}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link to={`/newsletter/${next.slug}`} className="btn-text">
              Edição nº{next.edicao} →
            </Link>
          ) : (
            <span />
          )}
        </div>
      </nav>
    </>
  );
}
