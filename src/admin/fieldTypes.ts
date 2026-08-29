export type FieldType = "text" | "textarea" | "date" | "number" | "boolean" | "select" | "lines" | "image" | "repeater";

export interface FieldConfig {
  /** Dot-path into the row object, e.g. "imagemPrincipal.src" or "seo.metaTitle". */
  key: string;
  label: string;
  type: FieldType;
  options?: { value: string; label: string }[];
  /** For type "repeater": the flat field configs rendered inside each row. */
  repeaterFields?: FieldConfig[];
  hint?: string;
  required?: boolean;
}
