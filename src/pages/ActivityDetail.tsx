import { Link, useParams } from "react-router-dom";
import Seo from "../components/Seo";
import StatusBadge from "../components/StatusBadge";
import ActivityCard from "../components/ActivityCard";
import NotFound from "./NotFound";
import {
  getActivityBySlug,
  getRelatedActivities,
  fetchActivityBySlug,
  fetchRelatedActivities,
} from "../data/activities";
import { getPartnerById, fetchPartners, partners as mockPartners } from "../data/partners";
import { useLiveData } from "../lib/useLiveData";
import { ACTIVITY_CATEGORY_LABELS } from "../types/content";
import { formatDateRange } from "../lib/format";

export default function ActivityDetail() {
  const { slug } = useParams<{ slug: string }>();
  const activity = useLiveData(
    slug ? getActivityBySlug(slug) : undefined,
    () => (slug ? fetchActivityBySlug(slug) : Promise.resolve(undefined)),
    [slug],
  );
  const partners = useLiveData(mockPartners, fetchPartners);
  const related = useLiveData(
    activity ? getRelatedActivities(activity) : [],
    () => (activity ? fetchRelatedActivities(activity) : Promise.resolve([])),
    [activity?.id],
  );

  if (!activity) return <NotFound />;

  const parceiros = (activity.parceiroIds ?? []).map((id) => getPartnerById(id, partners)).filter(Boolean);

  return (
    <>
      <Seo title={activity.seo.metaTitle} description={activity.seo.metaDescription} ogImage={activity.seo.ogImage ?? activity.imagemPrincipal.src} />

      <div className="container-editorial pt-8">
        <Link to="/actividades" className="btn-text">
          ← Todas as actividades
        </Link>
      </div>

      <header className="container-editorial grid gap-10 py-10 lg:grid-cols-2 lg:items-center">
        <div className="aspect-[4/3] overflow-hidden rounded-3xl">
          <img src={activity.imagemPrincipal.src} alt={activity.imagemPrincipal.alt} className="h-full w-full object-cover" />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <p className="eyebrow">{ACTIVITY_CATEGORY_LABELS[activity.categoria]}</p>
            <StatusBadge status={activity.estado} />
          </div>
          <h1 className="text-display-lg mt-4 text-balance">{activity.titulo}</h1>
          <dl className="mt-6 space-y-2 text-ink/70">
            <div className="flex gap-2">
              <dt className="font-semibold text-ink">Data:</dt>
              <dd>{formatDateRange(activity.data, activity.dataFim)}{activity.hora ? ` · ${activity.hora}` : ""}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-semibold text-ink">Local:</dt>
              <dd>{activity.local}</dd>
            </div>
            {activity.publicoAlvo && (
              <div className="flex gap-2">
                <dt className="font-semibold text-ink">Público-alvo:</dt>
                <dd>{activity.publicoAlvo}</dd>
              </div>
            )}
          </dl>
          {activity.cta && activity.estado !== "terminada" && (
            <Link to={activity.cta.href} className="btn-primary mt-8">
              {activity.cta.label}
            </Link>
          )}
        </div>
      </header>

      <div className="container-editorial grid gap-16 pb-20 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-12">
          <div className="max-w-prose space-y-4 text-lg leading-relaxed text-ink/80">
            {activity.descricaoCompleta.map((paragrafo, i) => (
              <p key={i}>{paragrafo}</p>
            ))}
          </div>

          {activity.objectivos && (
            <div>
              <h2 className="font-display text-2xl">Objectivos</h2>
              <ul className="mt-4 space-y-2 text-ink/80">
                {activity.objectivos.map((objectivo) => (
                  <li key={objectivo} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay-500" />
                    {objectivo}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activity.resultados && (
            <div>
              <h2 className="font-display text-2xl">Resultados</h2>
              <ul className="mt-4 space-y-2 text-ink/80">
                {activity.resultados.map((resultado) => (
                  <li key={resultado} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-moss-500" />
                    {resultado}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activity.galeria && (
            <div>
              <h2 className="font-display text-2xl">Fotografias</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {activity.galeria.map((foto) => (
                  <div key={foto.src} className="aspect-[4/3] overflow-hidden rounded-xl">
                    <img src={foto.src} alt={foto.alt} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activity.video && (
            <div>
              <h2 className="font-display text-2xl">Vídeo</h2>
              <div className="mt-4 aspect-video overflow-hidden rounded-xl">
                <iframe
                  src={activity.video}
                  title={`Vídeo — ${activity.titulo}`}
                  className="h-full w-full"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {activity.testemunhos && (
            <div className="space-y-6">
              <h2 className="font-display text-2xl">Testemunhos</h2>
              {activity.testemunhos.map((testemunho) => (
                <blockquote key={testemunho.nome} className="border-l-2 border-clay-500 pl-6">
                  <p className="text-xl leading-relaxed text-ink/80">"{testemunho.texto}"</p>
                  <footer className="mt-3 text-sm text-ink/60">
                    {testemunho.nome}
                    {testemunho.papel ? `, ${testemunho.papel}` : ""}
                  </footer>
                </blockquote>
              ))}
            </div>
          )}
        </div>

        {parceiros.length > 0 && (
          <aside>
            <h2 className="font-display text-xl">Parceiros</h2>
            <ul className="mt-4 space-y-4">
              {parceiros.map((partner) => (
                <li key={partner!.id} className="flex items-center gap-3">
                  <img src={partner!.logotipo.src} alt={partner!.logotipo.alt} className="h-10 w-10 rounded-full object-cover" />
                  <span className="text-sm font-medium text-ink/80">{partner!.nome}</span>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>

      {related.length > 0 && (
        <section className="border-t border-ink/10 bg-sand py-16 sm:py-24">
          <div className="container-editorial">
            <h2 className="text-display-md text-balance">Veja também</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ActivityCard key={item.id} activity={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
