import type { ImpactNumber } from "../types/content";

export default function ImpactStats({ numeros }: { numeros: ImpactNumber[] }) {
  return (
    <dl className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
      {numeros.map((numero) => (
        <div key={numero.label}>
          <dt className="sr-only">{numero.label}</dt>
          <dd className="font-display text-display-md text-clay-600">{numero.valor}</dd>
          <p className="mt-1 text-sm text-ink/70">{numero.label}</p>
        </div>
      ))}
    </dl>
  );
}
