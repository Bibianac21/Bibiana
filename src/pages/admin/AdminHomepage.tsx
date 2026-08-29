import { useEffect, useState } from "react";
import CrudForm from "../../admin/CrudForm";
import { SITE_SETTINGS_FIELDS } from "../../admin/collections";
import { getRow } from "../../lib/adminDb";

const TABLE = "site_settings";

interface SiteSettingsRow {
  id: string;
  [key: string]: unknown;
}

export default function AdminHomepage() {
  const [initial, setInitial] = useState<SiteSettingsRow | null>(null);

  useEffect(() => {
    getRow<SiteSettingsRow>(TABLE, "1").then((row) => {
      setInitial(row ?? { id: "1" });
    });
  }, []);

  if (!initial) return <p className="text-ink/50">A carregar…</p>;

  return (
    <CrudForm<SiteSettingsRow>
      title="Homepage e Sobre"
      fields={SITE_SETTINGS_FIELDS}
      initial={initial}
      table={TABLE}
      isNew={false}
      showDelete={false}
      backHref="/admin"
    />
  );
}
