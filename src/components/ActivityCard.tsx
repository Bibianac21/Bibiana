import { Link } from "react-router-dom";
import type { Activity } from "../types/content";
import { ACTIVITY_CATEGORY_LABELS } from "../types/content";
import { formatDateRange } from "../lib/format";
import StatusBadge from "./StatusBadge";

export default function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <Link
      to={`/actividades/${activity.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-paper-warm transition-transform duration-300 ease-editorial hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={activity.imagemPrincipal.src}
          alt={activity.imagemPrincipal.alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-editorial group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <StatusBadge status={activity.estado} />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="eyebrow">{ACTIVITY_CATEGORY_LABELS[activity.categoria]}</p>
        <h3 className="font-display text-xl leading-snug text-balance">{activity.titulo}</h3>
        <p className="text-sm text-ink/60">{formatDateRange(activity.data, activity.dataFim)} · {activity.local}</p>
        <p className="mt-1 flex-1 text-sm text-ink/70">{activity.descricaoCurta}</p>
        <span className="btn-text mt-2 self-start">Ver actividade</span>
      </div>
    </Link>
  );
}
