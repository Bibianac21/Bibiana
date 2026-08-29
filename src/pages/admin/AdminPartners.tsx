import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CrudList from "../../admin/CrudList";
import CrudForm from "../../admin/CrudForm";
import { PARTNER_FIELDS } from "../../admin/collections";
import { emptyValueForFields } from "../../admin/FieldRenderer";
import { getRow } from "../../lib/adminDb";
import type { Partner } from "../../types/content";

const TABLE = "partners";
const BASE = "/admin/parceiros";

export function AdminPartnersList() {
  return (
    <CrudList<Partner>
      title="Parceiros"
      table={TABLE}
      basePath={BASE}
      orderBy="nome"
      ascending
      rowKey={(row) => row.id}
      renderRow={(row) => (
        <>
          <span className="font-medium">{row.nome}</span>
          <span className="text-sm text-ink/50">{row.id}</span>
        </>
      )}
    />
  );
}

export function AdminPartnerForm() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === "novo";
  const [initial, setInitial] = useState<Partner | null>(null);

  useEffect(() => {
    if (isNew) {
      setInitial({ id: crypto.randomUUID(), ...(emptyValueForFields(PARTNER_FIELDS) as object) } as Partner);
      return;
    }
    if (id) getRow<Partner>(TABLE, id).then(setInitial);
  }, [id, isNew]);

  if (!initial) return <p className="text-ink/50">A carregar…</p>;

  return (
    <CrudForm<Partner>
      title={isNew ? "Novo parceiro" : initial.nome}
      fields={PARTNER_FIELDS}
      initial={initial}
      table={TABLE}
      isNew={isNew}
      backHref={BASE}
    />
  );
}
