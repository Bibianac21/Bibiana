import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CrudList from "../../admin/CrudList";
import CrudForm from "../../admin/CrudForm";
import { NEWSLETTER_FIELDS } from "../../admin/collections";
import { emptyValueForFields } from "../../admin/FieldRenderer";
import { getRow } from "../../lib/adminDb";
import type { Newsletter } from "../../types/content";

const TABLE = "newsletters";
const BASE = "/admin/newsletters";

export function AdminNewslettersList() {
  return (
    <CrudList<Newsletter>
      title="Newsletters"
      table={TABLE}
      basePath={BASE}
      orderBy="data"
      rowKey={(row) => row.id}
      renderRow={(row) => (
        <>
          <span className="font-medium">{row.titulo}</span>
          <span className="text-sm text-ink/50">Edição nº{row.edicao}</span>
        </>
      )}
    />
  );
}

export function AdminNewsletterForm() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === "novo";
  const [initial, setInitial] = useState<Newsletter | null>(null);

  useEffect(() => {
    if (isNew) {
      setInitial({ id: crypto.randomUUID(), ...(emptyValueForFields(NEWSLETTER_FIELDS) as object) } as Newsletter);
      return;
    }
    if (id) getRow<Newsletter>(TABLE, id).then(setInitial);
  }, [id, isNew]);

  if (!initial) return <p className="text-ink/50">A carregar…</p>;

  return (
    <CrudForm<Newsletter>
      title={isNew ? "Nova newsletter" : initial.titulo}
      fields={NEWSLETTER_FIELDS}
      initial={initial}
      table={TABLE}
      isNew={isNew}
      backHref={BASE}
    />
  );
}
