import { ACTIVITY_STATUS_LABELS, type ActivityStatus } from "../types/content";

const STATUS_STYLES: Record<ActivityStatus, string> = {
  proxima: "bg-ochre-100 text-ink/80",
  "a-decorrer": "bg-moss-100 text-ink/80",
  terminada: "bg-stone-200 text-ink/75",
};

export default function StatusBadge({ status }: { status: ActivityStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${STATUS_STYLES[status]}`}>
      {ACTIVITY_STATUS_LABELS[status]}
    </span>
  );
}
