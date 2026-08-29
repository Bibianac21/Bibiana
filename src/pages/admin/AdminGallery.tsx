import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CrudList from "../../admin/CrudList";
import CrudForm from "../../admin/CrudForm";
import { GALLERY_ITEM_FIELDS } from "../../admin/collections";
import { emptyValueForFields } from "../../admin/FieldRenderer";
import { getRow } from "../../lib/adminDb";
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
    if (isNew) {
      setInitial({ id: crypto.randomUUID(), ...(emptyValueForFields(GALLERY_ITEM_FIELDS) as object) } as GalleryItem);
      return;
    }
    if (id) getRow<GalleryItem>(TABLE, id).then(setInitial);
  }, [id, isNew]);

  if (!initial) return <p className="text-ink/50">A carregar…</p>;

  return (
    <CrudForm<GalleryItem>
      title={isNew ? "Nova imagem" : initial.titulo}
      fields={GALLERY_ITEM_FIELDS}
      initial={initial}
      table={TABLE}
      isNew={isNew}
      backHref={BASE}
    />
  );
}
