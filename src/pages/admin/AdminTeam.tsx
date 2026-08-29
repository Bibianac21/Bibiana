import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CrudList from "../../admin/CrudList";
import CrudForm from "../../admin/CrudForm";
import { TEAM_MEMBER_FIELDS } from "../../admin/collections";
import { emptyValueForFields } from "../../admin/FieldRenderer";
import { getRow } from "../../lib/adminDb";
import type { TeamMember } from "../../types/content";

const TABLE = "team_members";
const BASE = "/admin/equipa";

export function AdminTeamList() {
  return (
    <CrudList<TeamMember>
      title="Equipa"
      table={TABLE}
      basePath={BASE}
      orderBy="nome"
      ascending
      rowKey={(row) => row.id}
      renderRow={(row) => (
        <>
          <span className="font-medium">{row.nome}</span>
          <span className="text-sm text-ink/50">{row.funcao}</span>
        </>
      )}
    />
  );
}

export function AdminTeamForm() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === "novo";
  const [initial, setInitial] = useState<TeamMember | null>(null);

  useEffect(() => {
    if (isNew) {
      setInitial({ id: crypto.randomUUID(), ...(emptyValueForFields(TEAM_MEMBER_FIELDS) as object) } as TeamMember);
      return;
    }
    if (id) getRow<TeamMember>(TABLE, id).then(setInitial);
  }, [id, isNew]);

  if (!initial) return <p className="text-ink/50">A carregar…</p>;

  return (
    <CrudForm<TeamMember>
      title={isNew ? "Novo membro da equipa" : initial.nome}
      fields={TEAM_MEMBER_FIELDS}
      initial={initial}
      table={TABLE}
      isNew={isNew}
      backHref={BASE}
    />
  );
}
