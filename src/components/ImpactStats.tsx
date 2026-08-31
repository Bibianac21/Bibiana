import { useEffect, useRef, useState } from "react";
import type { ImpactNumber } from "../types/content";

function parseValue(raw: string): { prefix: string; number: number; suffix: string } | null {
  const match = raw.match(/^(\D*)(\d+)(\D*)$/);
  if (!match) return null;
  return { prefix: match[1], number: Number(match[2]), suffix: match[3] };
}

function useAnimatedValue(raw: string) {
  const ref = useRef<HTMLElement>(null);
  const [display, setDisplay] = useState(raw);

  useEffect(() => {
    const parsed = parseValue(raw);
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
  }, [raw]);

  return { ref, display };
}

function StatItem({ numero }: { numero: ImpactNumber }) {
  const { ref, display } = useAnimatedValue(numero.valor);
  return (
    <div>
      <dt className="sr-only">{numero.label}</dt>
      <dd ref={ref} className="font-display text-display-md text-ochre-300">
        {display}
      </dd>
      <p className="mt-1 text-sm text-ink/70">{numero.label}</p>
    </div>
  );
}

function StatRow({ numero }: { numero: ImpactNumber }) {
  const { ref, display } = useAnimatedValue(numero.valor);
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-ink/15 py-6 first:pt-0 last:border-b-0">
      <dt className="sr-only">{numero.label}</dt>
      <dd ref={ref} className="font-display text-5xl text-ink sm:text-6xl">
        {display}
      </dd>
      <p className="text-sm text-ink/70 sm:text-base">{numero.label}</p>
    </div>
  );
}

interface ImpactStatsProps {
  numeros: ImpactNumber[];
  /** "grid" (default) for even columns, "list" for a bold stacked stat block. */
  variant?: "grid" | "list";
}

export default function ImpactStats({ numeros, variant = "grid" }: ImpactStatsProps) {
  if (variant === "list") {
    return (
      <dl className="border-t border-ink/15">
        {numeros.map((numero) => (
          <StatRow key={numero.label} numero={numero} />
        ))}
      </dl>
    );
  }

  return (
    <dl className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
      {numeros.map((numero) => (
        <StatItem key={numero.label} numero={numero} />
      ))}
    </dl>
  );
}
