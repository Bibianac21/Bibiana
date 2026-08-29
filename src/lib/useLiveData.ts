import { useEffect, useState } from "react";

/**
 * Renders `mockValue` immediately (no loading flash), then swaps in the
 * result of `fetcher()` once it resolves — used to read live Supabase
 * content with the prototype's mock data as an instant, always-available
 * fallback (see fetch* functions in src/data/*.ts).
 */
export function useLiveData<T>(mockValue: T, fetcher: () => Promise<T>, deps: unknown[] = []): T {
  const [value, setValue] = useState<T>(mockValue);

  useEffect(() => {
    // Reset to the (possibly new, e.g. after a slug change) fallback value
    // right away, then swap in live data once it resolves.
    setValue(mockValue);
    let cancelled = false;
    fetcher()
      .then((result) => {
        if (!cancelled) setValue(result);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return value;
}
