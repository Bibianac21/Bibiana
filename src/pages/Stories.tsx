import { useMemo, useState } from "react";
import Seo from "../components/Seo";
import StoryCard from "../components/StoryCard";
import FilterTabs from "../components/FilterTabs";
import { getStories, fetchStories } from "../data/stories";
import { useLiveData } from "../lib/useLiveData";
import { STORY_CATEGORY_LABELS, type StoryCategory } from "../types/content";

type FilterValue = "todas" | StoryCategory;

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: "todas", label: "Todas" },
  ...(Object.entries(STORY_CATEGORY_LABELS) as [StoryCategory, string][]).map(([value, label]) => ({
    value,
    label,
  })),
];

export default function Stories() {
  const [filter, setFilter] = useState<FilterValue>("todas");
  const stories = useLiveData(getStories(), fetchStories);

  const filtered = useMemo(() => {
    const list = filter === "todas" ? stories : stories.filter((story) => story.categoria === filter);
    return [...list].sort((a, b) => b.data.localeCompare(a.data));
  }, [filter, stories]);

  return (
    <>
      <Seo
        title="Histórias — NKENTU"
        description="Histórias de participantes, testemunhos, entrevistas, perfis e bastidores da NKENTU."
      />

      <header className="container-editorial pb-10 pt-14 sm:pt-20">
        <p className="eyebrow mb-4">Histórias</p>
        <h1 className="text-display-lg text-balance">As pessoas por trás do impacto</h1>
        <p className="mt-4 max-w-prose text-lg text-ink/70">
          Histórias de transformação, testemunhos, entrevistas e perfis de quem faz parte da NKENTU.
        </p>
      </header>

      <div className="container-editorial pb-10">
        <FilterTabs options={FILTERS} active={filter} onChange={setFilter} />
      </div>

      <div className="container-editorial pb-24">
        {filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((story, i) => (
              <div key={story.id} className={i === 0 ? "sm:col-span-2" : ""}>
                <StoryCard story={story} size={i === 0 ? "large" : "default"} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-ink/60">Ainda não há histórias nesta categoria.</p>
        )}
      </div>
    </>
  );
}
