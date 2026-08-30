import { useEffect, useRef, useState } from "react";
import type { ImpactNumber } from "../types/content";

function parseValue(raw: string): { prefix: string; number: number; suffix: string } | null {
  const match = raw.match(/^(\D*)(\d+)(\D*)$/);
  if (!match) return null;
  return { prefix: match[1], number: Number(match[2]), suffix: match[3] };
}

function StatItem({ numero }: { numero: ImpactNumber }) {
  const ref = useRef<HTMLElement>(null);
  const [display, setDisplay] = useState(numero.valor);

  useEffect(() => {
    const parsed = parseValue(numero.valor);
    const node = ref.current;
    if (!parsed || !node) return;
    if (typeof IntersectionObserver === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const duration = 1000;
        const start = performance.now();
        function tick(now: number) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(parsed!.number * eased);
          setDisplay(`${parsed!.prefix}${current}${parsed!.suffix}`);
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [numero.valor]);

  return (
    <div>
      <dt className="sr-only">{numero.label}</dt>
      <dd ref={ref} className="font-display text-display-md text-clay-300">
        {display}
      </dd>
      <p className="mt-1 text-sm text-ink/70">{numero.label}</p>
    </div>
  );
}

export default function ImpactStats({ numeros }: { numeros: ImpactNumber[] }) {
  return (
    <dl className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
      {numeros.map((numero) => (
        <StatItem key={numero.label} numero={numero} />
      ))}
    </dl>
  );
}
