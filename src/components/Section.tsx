import type { ReactNode } from "react";

interface SectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}

export default function Section({ eyebrow, title, description, action, className = "", children }: SectionProps) {
  return (
    <section className={`container-editorial py-16 sm:py-24 ${className}`}>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          <h2 className="text-display-lg text-balance">{title}</h2>
          {description && <p className="mt-4 max-w-prose text-lg text-ink/70">{description}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      <div className="mt-12">{children}</div>
    </section>
  );
}
