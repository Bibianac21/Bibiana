import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CrudList from "../../admin/CrudList";
import CrudForm from "../../admin/CrudForm";
import { STORY_FIELDS } from "../../admin/collections";
import { emptyValueForFields } from "../../admin/FieldRenderer";
import { getRow } from "../../lib/adminDb";
import { STORY_CATEGORY_LABELS, type Story } from "../../types/content";

const TABLE = "stories";
const BASE = "/admin/historias";

export function AdminStoriesList() {
  return (
    <CrudList<Story>
      title="Histórias"
      table={TABLE}
      basePath={BASE}
      orderBy="data"
      rowKey={(row) => row.id}
      renderRow={(row) => (
        <>
          <span className="font-medium">{row.titulo}</span>
          <span className="text-sm text-ink/50">{STORY_CATEGORY_LABELS[row.categoria]}</span>
        </>
      )}
    />
  );
}

export function AdminStoryForm() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === "novo";
  const [initial, setInitial] = useState<Story | null>(null);

  useEffect(() => {
    if (isNew) {
      setInitial({ id: crypto.randomUUID(), ...(emptyValueForFields(STORY_FIELDS) as object) } as Story);
      return;
    }
    if (id) getRow<Story>(TABLE, id).then(setInitial);
  }, [id, isNew]);

  if (!initial) return <p className="text-ink/50">A carregar…</p>;

  return (
    <CrudForm<Story>
      title={isNew ? "Nova história" : initial.titulo}
      fields={STORY_FIELDS}
      initial={initial}
      table={TABLE}
      isNew={isNew}
      backHref={BASE}
    />
  );
}
