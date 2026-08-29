import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { listRows } from "../lib/adminDb";

interface CrudListProps<T> {
  title: string;
  table: string;
  basePath: string;
  orderBy?: string;
  ascending?: boolean;
  renderRow: (row: T) => ReactNode;
  rowKey: (row: T) => string;
}

export default function CrudList<T extends { id: string }>({
  title,
  table,
  basePath,
  orderBy,
  ascending = false,
  renderRow,
  rowKey,
}: CrudListProps<T>) {
  const [rows, setRows] = useState<T[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    listRows<T>(table, orderBy, ascending)
      .then((data) => {
        if (!cancelled) setRows(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Falha ao carregar.");
      });
    return () => {
      cancelled = true;
    };
  }, [table, orderBy, ascending]);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl">{title}</h1>
        <Link to={`${basePath}/novo`} className="btn-primary">
          Novo
        </Link>
      </div>

      {error && <p className="text-clay-300">{error}</p>}
      {!error && rows === null && <p className="text-ink/50">A carregar…</p>}
      {rows && rows.length === 0 && <p className="text-ink/50">Ainda não há registos.</p>}

      {rows && rows.length > 0 && (
        <ul className="divide-y divide-ink/10 rounded-xl border border-ink/10">
          {rows.map((row) => (
            <li key={rowKey(row)}>
              <Link to={`${basePath}/${rowKey(row)}`} className="flex items-center justify-between px-5 py-4 hover:bg-sand/60">
                {renderRow(row)}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
