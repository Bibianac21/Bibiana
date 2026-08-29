// Small dot-path helpers so a flat FieldConfig list can address nested
// jsonb shapes (e.g. "imagemPrincipal.src", "seo.metaTitle") without a
// bespoke reader/writer per collection.

export function getPath(obj: unknown, path: string): unknown {
  if (path === "") return obj;
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc == null || typeof acc !== "object") return undefined;
    return (acc as Record<string, unknown>)[key];
  }, obj);
}

export function setPath<T>(obj: T, path: string, value: unknown): T {
  if (path === "") return value as T;
  const keys = path.split(".");
  const clone = structuredClone(obj) as Record<string, unknown>;
  let cursor = clone;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (cursor[key] == null || typeof cursor[key] !== "object") cursor[key] = {};
    cursor = cursor[key] as Record<string, unknown>;
  }
  cursor[keys[keys.length - 1]] = value;
  return clone as T;
}
