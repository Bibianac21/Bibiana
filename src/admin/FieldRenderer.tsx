import { useState } from "react";
import type { FieldConfig } from "./fieldTypes";
import { getPath, setPath } from "./paths";

function subPath(base: string, sub: string): string {
  return base === "" ? sub : `${base}.${sub}`;
}
import { uploadImage } from "../lib/adminDb";

export function emptyValueForFields(fields: FieldConfig[]): Record<string, unknown> {
  return fields.reduce((acc, field) => {
    const fallback =
      field.type === "lines" || field.type === "repeater"
        ? []
        : field.type === "boolean"
          ? false
          : field.type === "image"
            ? {}
            : "";
    return setPath(acc, field.key, fallback);
  }, {} as Record<string, unknown>);
}

interface FieldRendererProps<T> {
  field: FieldConfig;
  value: T;
  onChange: (updated: T) => void;
}

const inputClasses = "w-full rounded-lg border border-ink/20 bg-transparent px-3 py-2 text-sm text-ink";

export default function FieldRenderer<T>({ field, value, onChange }: FieldRendererProps<T>) {
  const raw = getPath(value, field.key);
  const [uploading, setUploading] = useState(false);

  function set(next: unknown) {
    onChange(setPath(value, field.key, next));
  }

  if (field.type === "repeater") {
    const items = Array.isArray(raw) ? (raw as Record<string, unknown>[]) : [];
    const subFields = field.repeaterFields ?? [];
    return (
      <fieldset className="rounded-xl border border-ink/15 p-4">
        <legend className="px-1 text-sm font-semibold text-ink">{field.label}</legend>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="grid gap-3 rounded-lg border border-ink/10 bg-sand/50 p-3 sm:grid-cols-2">
              {subFields.map((sub) => (
                <div key={sub.key} className={sub.type === "textarea" ? "sm:col-span-2" : ""}>
                  <FieldRenderer
                    field={sub}
                    value={item}
                    onChange={(updatedItem) => {
                      const next = [...items];
                      next[index] = updatedItem as Record<string, unknown>;
                      set(next);
                    }}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => set(items.filter((_, i) => i !== index))}
                className="btn-text col-span-full self-start text-clay-300"
              >
                Remover
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => set([...items, emptyValueForFields(subFields)])}
          className="btn-secondary mt-4"
        >
          Adicionar
        </button>
      </fieldset>
    );
  }

  if (field.type === "image") {
    const image = (raw as { src?: string; alt?: string } | undefined) ?? {};
    return (
      <div>
        <span className="mb-2 block text-sm font-semibold text-ink">{field.label}</span>
        {image.src && (
          <img src={image.src} alt={image.alt ?? ""} className="mb-2 h-32 w-32 rounded-lg object-cover" />
        )}
        <input
          type="file"
          accept="image/*"
          disabled={uploading}
          onChange={async (event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            setUploading(true);
            try {
              const url = await uploadImage(file);
              onChange(setPath(setPath(value, subPath(field.key, "src"), url), subPath(field.key, "alt"), image.alt ?? ""));
            } catch (error) {
              alert(error instanceof Error ? error.message : "Falha no envio da imagem.");
            } finally {
              setUploading(false);
            }
          }}
          className="block text-sm"
        />
        {uploading && <p className="mt-1 text-xs text-ink/50">A enviar…</p>}
        <input
          type="text"
          placeholder="Texto alternativo (descrição da imagem)"
          value={image.alt ?? ""}
          onChange={(event) => set({ ...image, alt: event.target.value })}
          className={`${inputClasses} mt-2`}
        />
      </div>
    );
  }

  const label = (
    <span className="mb-2 block text-sm font-semibold text-ink">
      {field.label}
      {field.required && <span className="text-clay-300"> *</span>}
    </span>
  );

  if (field.type === "boolean") {
    return (
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={Boolean(raw)} onChange={(event) => set(event.target.checked)} />
        <span className="text-sm font-semibold text-ink">{field.label}</span>
      </label>
    );
  }

  if (field.type === "select") {
    return (
      <label className="block">
        {label}
        <select value={(raw as string) ?? ""} onChange={(event) => set(event.target.value)} className={inputClasses}>
          <option value="" disabled>
            Seleccionar…
          </option>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (field.type === "textarea") {
    return (
      <label className="block">
        {label}
        <textarea
          rows={4}
          value={(raw as string) ?? ""}
          onChange={(event) => set(event.target.value)}
          className={inputClasses}
        />
        {field.hint && <p className="mt-1 text-xs text-ink/50">{field.hint}</p>}
      </label>
    );
  }

  if (field.type === "lines") {
    const items = Array.isArray(raw) ? (raw as string[]) : [];
    return (
      <label className="block">
        {label}
        <textarea
          rows={5}
          value={items.join("\n")}
          onChange={(event) => set(event.target.value.split("\n").filter((line) => line.trim() !== ""))}
          className={inputClasses}
        />
        <p className="mt-1 text-xs text-ink/50">{field.hint ?? "Um item por linha."}</p>
      </label>
    );
  }

  if (field.type === "date") {
    return (
      <label className="block">
        {label}
        <input type="date" value={(raw as string) ?? ""} onChange={(event) => set(event.target.value)} className={inputClasses} />
      </label>
    );
  }

  if (field.type === "number") {
    return (
      <label className="block">
        {label}
        <input
          type="number"
          value={(raw as number) ?? ""}
          onChange={(event) => set(event.target.value === "" ? "" : Number(event.target.value))}
          className={inputClasses}
        />
      </label>
    );
  }

  return (
    <label className="block">
      {label}
      <input
        type="text"
        required={field.required}
        value={(raw as string) ?? ""}
        onChange={(event) => set(event.target.value)}
        className={inputClasses}
      />
      {field.hint && <p className="mt-1 text-xs text-ink/50">{field.hint}</p>}
    </label>
  );
}
