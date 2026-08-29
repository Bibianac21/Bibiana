/**
 * Placeholder photography.
 *
 * NKENTU's editorial direction calls for real documentary photography —
 * workshops, encontros, retratos — never corporate stock, and never photos
 * of real strangers presented as fictional NKENTU participants. Until a
 * real photography library exists, this generates an abstract, on-brand
 * placeholder as an inline SVG data URI: no network request, no implied
 * people. Swap `photo()` for a Supabase Storage URL builder once real
 * assets are uploaded — every call site only ever reads `ImageAsset.src`,
 * so the swap is local to this file.
 */

const PALETTES: [string, string][] = [
  ["#F3D2C1", "#C1502E"],
  ["#F3E1B5", "#A87724"],
  ["#DCE2CE", "#4B5D3A"],
  ["#EDE3D0", "#7A7263"],
  ["#DE8F63", "#7E3018"],
  ["#E4BE6C", "#4B5D3A"],
];

function hash(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) >>> 0;
  }
  return h;
}

export function photo(seed: string, width = 1200, height = 1500): string {
  const h = hash(seed);
  const [from, to] = PALETTES[h % PALETTES.length];
  const angle = h % 360;
  const cx = 20 + (h % 60);
  const cy = 20 + ((h >> 4) % 60);
  const r1 = Math.max(width, height) * (0.35 + ((h >> 8) % 20) / 100);
  const r2 = r1 * 0.6;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="g" gradientTransform="rotate(${angle})">
        <stop offset="0%" stop-color="${from}" />
        <stop offset="100%" stop-color="${to}" />
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="${from}" />
    <circle cx="${(cx / 100) * width}" cy="${(cy / 100) * height}" r="${r1}" fill="url(#g)" opacity="0.9" />
    <circle cx="${width - (cx / 100) * width}" cy="${height - (cy / 100) * height}" r="${r2}" fill="${to}" opacity="0.35" />
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
