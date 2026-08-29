import { useMemo, useState } from "react";
import Seo from "../components/Seo";
import ActivityCard from "../components/ActivityCard";
import FilterTabs from "../components/FilterTabs";
import { getActivities, fetchActivities } from "../data/activities";
import { useLiveData } from "../lib/useLiveData";
import { ACTIVITY_CATEGORY_LABELS, type ActivityCategory } from "../types/content";

type FilterValue = "todas" | ActivityCategory;

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: "todas", label: "Todas" },
  { value: "formacao", label: "Formações" },
  { value: "workshop", label: "Workshops" },
  { value: "mentoria", label: "Mentorias" },
  { value: "evento", label: "Eventos" },
  { value: "programa", label: "Programas" },
];

export default function Activities() {
  const [filter, setFilter] = useState<FilterValue>("todas");
  const activities = useLiveData(getActivities(), fetchActivities);

  const filtered = useMemo(() => {
    const list = filter === "todas" ? activities : activities.filter((activity) => activity.categoria === filter);
    return [...list].sort((a, b) => b.data.localeCompare(a.data));
  }, [filter, activities]);

  return (
    <>
      <Seo
        title="Actividades — NKENTU"
        description="O arquivo de formações, workshops, mentorias, eventos e programas da NKENTU."
      />

      <header className="container-editorial pb-10 pt-14 sm:pt-20">
        <p className="eyebrow mb-4">Arquivo</p>
        <h1 className="text-display-lg text-balance">Actividades</h1>
        <p className="mt-4 max-w-prose text-lg text-ink/70">
          Formações, workshops, mentorias, eventos e programas — passados e por vir. {ACTIVITY_CATEGORY_LABELS.formacao},{" "}
          {ACTIVITY_CATEGORY_LABELS.workshop.toLowerCase()}, {ACTIVITY_CATEGORY_LABELS.mentoria.toLowerCase()} e mais.
        </p>
      </header>

      <div className="container-editorial pb-10">
        <FilterTabs options={FILTERS} active={filter} onChange={setFilter} />
      </div>

      <div className="container-editorial pb-24">
        {filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        ) : (
          <p className="text-ink/60">Ainda não há actividades nesta categoria.</p>
        )}
      </div>
    </>
  );
}
