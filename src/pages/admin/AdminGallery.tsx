import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CrudList from "../../admin/CrudList";
import CrudForm from "../../admin/CrudForm";
import { GALLERY_ITEM_FIELDS } from "../../admin/collections";
import { getRow, uploadImage, upsertRow } from "../../lib/adminDb";
import { GALLERY_CATEGORY_LABELS, type GalleryItem } from "../../types/content";

const TABLE = "gallery_items";
const BASE = "/admin/galeria";

export function AdminGalleryList() {
  return (
    <CrudList<GalleryItem>
      title="Galeria"
      table={TABLE}
      basePath={BASE}
      orderBy="data"
      rowKey={(row) => row.id}
      renderRow={(row) => (
        <>
          <span className="font-medium">{row.titulo}</span>
          <span className="text-sm text-ink/50">{GALLERY_CATEGORY_LABELS[row.categoria]}</span>
        </>
      )}
    />
  );
}

export function AdminGalleryForm() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === "novo";
  const [initial, setInitial] = useState<GalleryItem | null>(null);

  useEffect(() => {
    if (isNew) return;
    if (id) getRow<GalleryItem>(TABLE, id).then(setInitial);
  }, [id, isNew]);

  if (isNew) return <AdminGalleryBulkForm />;

  if (!initial) return <p className="text-ink/50">A carregar…</p>;

  return (
    <CrudForm<GalleryItem>
      title={initial.titulo}
      fields={GALLERY_ITEM_FIELDS}
      initial={initial}
      table={TABLE}
      isNew={false}
      backHref={BASE}
    />
  );
}

const inputClasses = "w-full rounded-lg border border-ink/20 bg-transparent px-3 py-2 text-sm text-ink";

/**
 * Creating a gallery item is the one flow where uploading a single photo at
 * a time is real friction — an event usually produces a batch. This lets
 * you pick every photo from that event/actividade at once and saves them
 * as a single album (one card in the public gallery grid, with all the
 * photos inside it) instead of one card per photo. The first photo chosen
 * becomes the cover; that can be changed afterwards when editing the item.
 */
function AdminGalleryBulkForm() {
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const [titulo, setTitulo] = useState("");
  const [legenda, setLegenda] = useState("");
  const [categoria, setCategoria] = useState<GalleryItem["categoria"] | "">("");
  const [tipo, setTipo] = useState<GalleryItem["tipo"]>("imagem");
  const [data, setData] = useState("");
  const [actividadeSlug, setActividadeSlug] = useState("");
  const [saving, setSaving] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    if (files.length === 0) {
      setError("Escolhe pelo menos uma foto.");
      return;
    }
    if (!categoria) {
      setError("Escolhe uma categoria.");
      return;
    }
    if (!data) {
      setError("Escolhe uma data.");
      return;
    }
    setSaving(true);
    setError(null);
    setProgress({ done: 0, total: files.length });
    try {
      const urls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        urls.push(await uploadImage(files[i]));
        setProgress({ done: i + 1, total: files.length });
      }
      const [capaUrl, ...restoUrls] = urls;
      const row: GalleryItem = {
        id: crypto.randomUUID(),
        imagem: { src: capaUrl, alt: titulo || legenda },
        imagens: restoUrls.map((url) => ({ src: url, alt: titulo || legenda })),
        titulo,
        legenda,
        categoria,
        tipo,
        data,
        ...(actividadeSlug ? { actividadeSlug } : {}),
      };
      await upsertRow(TABLE, row);
      navigate(BASE);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao enviar as fotos.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl">Novo álbum</h1>
        <a href={BASE} className="btn-text">
          ← Voltar
        </a>
      </div>

      <p className="mb-6 text-sm text-ink/60">
        Escolhe todas as fotos deste evento/actividade de uma vez — ficam juntas num único cartão da galeria. A
        primeira foto escolhida é usada como capa; podes trocar depois, ao editar o item.
      </p>

      <div className="space-y-6">
        <div>
          <span className="mb-2 block text-sm font-semibold text-ink">
            Fotos<span className="text-clay-300"> *</span>
          </span>
          <input
            type="file"
            accept="image/*"
            multiple
            disabled={saving}
            onChange={(event) => setFiles(Array.from(event.target.files ?? []))}
            className="block text-sm"
          />
          {files.length > 0 && (
            <p className="mt-1 text-xs text-ink/50">{files.length} foto(s) seleccionada(s).</p>
          )}
        </div>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-ink">Título</span>
          <input type="text" value={titulo} onChange={(event) => setTitulo(event.target.value)} className={inputClasses} />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-ink">
            Legenda<span className="text-clay-300"> *</span>
          </span>
          <textarea rows={3} value={legenda} onChange={(event) => setLegenda(event.target.value)} className={inputClasses} />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-ink">Categoria</span>
          <select
            value={categoria}
            onChange={(event) => setCategoria(event.target.value as GalleryItem["categoria"])}
            className={inputClasses}
          >
            <option value="" disabled>
              Seleccionar…
            </option>
            {Object.entries(GALLERY_CATEGORY_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-ink">Tipo</span>
          <select
            value={tipo}
            onChange={(event) => setTipo(event.target.value as GalleryItem["tipo"])}
            className={inputClasses}
          >
            <option value="imagem">Imagem</option>
            <option value="video">Vídeo</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-ink">
            Data<span className="text-clay-300"> *</span>
          </span>
          <input type="date" value={data} onChange={(event) => setData(event.target.value)} className={inputClasses} />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-ink">Slug da actividade relacionada (opcional)</span>
          <input
            type="text"
            value={actividadeSlug}
            onChange={(event) => setActividadeSlug(event.target.value)}
            className={inputClasses}
          />
        </label>
      </div>

      {error && (
        <p className="mt-6 text-sm text-clay-300" role="alert">
          {error}
        </p>
      )}

      <div className="mt-8 flex items-center gap-4">
        <button type="button" onClick={handleSave} disabled={saving} className="btn-primary">
          {saving && progress ? `A enviar ${progress.done}/${progress.total}…` : saving ? "A enviar…" : "Guardar álbum"}
        </button>
      </div>
    </div>
  );
}
