import { Link } from "react-router-dom";
import type { Activity } from "../types/content";
import { ACTIVITY_CATEGORY_LABELS } from "../types/content";
import { formatDateRange } from "../lib/format";
import StatusBadge from "./StatusBadge";

export default function FeaturedActivity({ activity }: { activity: Activity }) {
  return (
    <div className="grid overflow-hidden rounded-3xl border border-ink/10 bg-white/40 lg:grid-cols-2">
      <div className="relative aspect-[4/3] lg:aspect-auto">
        <img
          src={activity.imagemPrincipal.src}
          alt={activity.imagemPrincipal.alt}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-center gap-5 p-8 sm:p-12">
        <div className="flex items-center gap-3">
          <p className="eyebrow">{ACTIVITY_CATEGORY_LABELS[activity.categoria]}</p>
          <StatusBadge status={activity.estado} />
        </div>
        <h3 className="text-display-md text-balance">{activity.titulo}</h3>
        <p className="max-w-prose text-ink/70">{activity.descricaoCurta}</p>
        <dl className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-ink/60">
          <div>
            <dt className="sr-only">Data</dt>
            <dd>{formatDateRange(activity.data, activity.dataFim)}</dd>
          </div>
          <div>
            <dt className="sr-only">Local</dt>
            <dd>{activity.local}</dd>
          </div>
        </dl>
        <Link to={`/actividades/${activity.slug}`} className="btn-primary mt-2 self-start">
          Ver actividade
        </Link>
      </div>
    </div>
  );
}
