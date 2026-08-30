import { useEffect, useState } from "react";
import { listRows, deleteRow } from "../../lib/adminDb";

interface Subscriber {
  id: string;
  nome: string;
  email: string;
  created_at: string;
}

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("pt-PT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function toCsv(rows: Subscriber[]): string {
  const escape = (value: string) => `"${value.replace(/"/g, '""')}"`;
  const header = ["Nome", "Email", "Data de subscrição"].join(",");
  const lines = rows.map((row) => [escape(row.nome), escape(row.email), escape(formatDateTime(row.created_at))].join(","));
  return [header, ...lines].join("\n");
}

export default function AdminSubscribers() {
  const [rows, setRows] = useState<Subscriber[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    listRows<Subscriber>("newsletter_subscribers", "created_at", false)
      .then((data) => {
        if (!cancelled) setRows(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Falha ao carregar.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleDelete(id: string) {
    if (!window.confirm("Remover este subscritor definitivamente?")) return;
    try {
      await deleteRow("newsletter_subscribers", id);
      setRows((current) => current?.filter((row) => row.id !== id) ?? current);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao remover.");
    }
  }

  function handleExport() {
    if (!rows || rows.length === 0) return;
    const csv = toCsv(rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `subscritores-nkentu-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl">Subscritores da newsletter</h1>
          <p className="mt-1 text-sm text-ink/60">
            Pessoas que se inscreveram através do formulário no site.{rows ? ` ${rows.length} no total.` : ""}
          </p>
        </div>
        <button
          type="button"
          onClick={handleExport}
          disabled={!rows || rows.length === 0}
          className="btn-primary disabled:opacity-40"
        >
          Exportar CSV
        </button>
      </div>

      {error && <p className="text-clay-300">{error}</p>}
      {!error && rows === null && <p className="text-ink/50">A carregar…</p>}
      {rows && rows.length === 0 && <p className="text-ink/50">Ainda não há subscritores.</p>}

      {rows && rows.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-ink/10">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink/10 bg-sand/60">
              <tr>
                <th className="px-5 py-3 font-semibold">Nome</th>
                <th className="px-5 py-3 font-semibold">Email</th>
                <th className="px-5 py-3 font-semibold">Data</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10">
              {rows.map((row) => (
                <tr key={row.id}>
                  <td className="px-5 py-3">{row.nome}</td>
                  <td className="px-5 py-3">{row.email}</td>
                  <td className="px-5 py-3 text-ink/60">{formatDateTime(row.created_at)}</td>
                  <td className="px-5 py-3 text-right">
                    <button type="button" onClick={() => handleDelete(row.id)} className="btn-text text-clay-300">
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
