import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CrudList from "../../admin/CrudList";
import CrudForm from "../../admin/CrudForm";
import { ACTIVITY_FIELDS } from "../../admin/collections";
import { emptyValueForFields } from "../../admin/FieldRenderer";
import { getRow } from "../../lib/adminDb";
import { ACTIVITY_CATEGORY_LABELS, ACTIVITY_STATUS_LABELS, type Activity } from "../../types/content";

const TABLE = "activities";
const BASE = "/admin/actividades";

export function AdminActivitiesList() {
  return (
    <CrudList<Activity>
      title="Actividades"
      table={TABLE}
      basePath={BASE}
      orderBy="data"
      rowKey={(row) => row.id}
      renderRow={(row) => (
        <>
          <span className="font-medium">{row.titulo}</span>
          <span className="text-sm text-ink/50">
            {ACTIVITY_CATEGORY_LABELS[row.categoria]} · {ACTIVITY_STATUS_LABELS[row.estado]}
          </span>
        </>
      )}
    />
  );
}

export function AdminActivityForm() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === "novo";
  const [initial, setInitial] = useState<Activity | null>(null);

  useEffect(() => {
    if (isNew) {
      setInitial({
        id: crypto.randomUUID(),
        ...(emptyValueForFields(ACTIVITY_FIELDS) as object),
      } as Activity);
      return;
    }
    if (id) getRow<Activity>(TABLE, id).then(setInitial);
  }, [id, isNew]);

  if (!initial) return <p className="text-ink/50">A carregar…</p>;

  return (
    <CrudForm<Activity>
      title={isNew ? "Nova actividade" : initial.titulo}
      fields={ACTIVITY_FIELDS}
      initial={initial}
      table={TABLE}
      isNew={isNew}
      backHref={BASE}
    />
  );
}
