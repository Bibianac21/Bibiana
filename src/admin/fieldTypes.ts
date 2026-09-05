export type FieldType =
  | "text"
  | "textarea"
  | "date"
  | "number"
  | "boolean"
  | "select"
  | "lines"
  | "image"
  | "repeater"
  | "photoSet";

export interface FieldConfig {
  /** Dot-path into the row object, e.g. "imagemPrincipal.src" or "seo.metaTitle". */
  key: string;
  label: string;
  type: FieldType;
  options?: { value: string; label: string }[];
  /** For type "repeater": the flat field configs rendered inside each row. */
  repeaterFields?: FieldConfig[];
  /**
   * For type "photoSet": dot-path to the single "cover" image field (e.g.
   * "imagem"). `key` is the path to the array of additional photos. Lets an
   * editor upload several photos into one unified grid and pick which one
   * is the cover, instead of juggling two separate fields.
   */
  coverKey?: string;
  hint?: string;
  required?: boolean;
}
