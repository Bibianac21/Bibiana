import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { FieldConfig } from "./fieldTypes";
import FieldRenderer from "./FieldRenderer";
import { upsertRow, deleteRow } from "../lib/adminDb";

interface CrudFormProps<T extends { id: string }> {
  title: string;
  fields: FieldConfig[];
  initial: T;
  table: string;
  isNew: boolean;
  backHref: string;
  showDelete?: boolean;
}

export default function CrudForm<T extends { id: string }>({
  title,
  fields,
  initial,
  table,
  isNew,
  backHref,
  showDelete = !isNew,
}: CrudFormProps<T>) {
  const [value, setValue] = useState<T>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      await upsertRow(table, value);
      navigate(backHref);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao guardar.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm("Eliminar definitivamente? Esta acção não pode ser desfeita.")) return;
    setSaving(true);
    try {
      await deleteRow(table, value.id);
      navigate(backHref);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao eliminar.");
      setSaving(false);
    }
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl">{title}</h1>
        <a href={backHref} className="btn-text">
          ← Voltar
        </a>
      </div>

      <div className="space-y-6">
        {fields.map((field) => (
          <FieldRenderer key={field.key} field={field} value={value} onChange={setValue} />
        ))}
      </div>

      {error && (
        <p className="mt-6 text-sm text-clay-300" role="alert">
          {error}
        </p>
      )}

      <div className="mt-8 flex items-center gap-4">
        <button type="button" onClick={handleSave} disabled={saving} className="btn-primary">
          {saving ? "A guardar…" : "Guardar"}
        </button>
        {showDelete && (
          <button type="button" onClick={handleDelete} disabled={saving} className="btn-text text-clay-300">
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
}
