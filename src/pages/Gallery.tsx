import { useMemo, useState } from "react";
import Seo from "../components/Seo";
import GalleryGrid from "../components/GalleryGrid";
import FilterTabs from "../components/FilterTabs";
import { getGalleryItems, fetchGalleryItems } from "../data/gallery";
import { useLiveData } from "../lib/useLiveData";
import { GALLERY_CATEGORY_LABELS, type GalleryCategory } from "../types/content";

type FilterValue = "todas" | GalleryCategory;

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: "todas", label: "Todas" },
  ...(Object.entries(GALLERY_CATEGORY_LABELS) as [GalleryCategory, string][]).map(([value, label]) => ({
    value,
    label,
  })),
];

export default function Gallery() {
  const [filter, setFilter] = useState<FilterValue>("todas");
  const items = useLiveData(getGalleryItems(), fetchGalleryItems);

  const filtered = useMemo(
    () => (filter === "todas" ? items : items.filter((item) => item.categoria === filter)),
    [filter, items],
  );

  return (
    <>
      <Seo
        title="Galeria — NKENTU"
        description="Fotografias e vídeos das actividades, formações, eventos e bastidores da NKENTU."
      />

      <header className="container-editorial pb-10 pt-14 sm:pt-20">
        <p className="eyebrow mb-4">Arquivo visual</p>
        <h1 className="text-display-lg text-balance">Galeria</h1>
        <p className="mt-4 max-w-prose text-lg text-ink/70">
          Momentos das nossas actividades, formações, eventos e bastidores — actualizada continuamente.
        </p>
      </header>

      <div className="container-editorial pb-10">
        <FilterTabs options={FILTERS} active={filter} onChange={setFilter} />
      </div>

      <div className="container-editorial pb-24">
        <GalleryGrid items={filtered} />
      </div>
    </>
  );
}
