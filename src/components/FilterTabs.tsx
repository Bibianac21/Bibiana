interface FilterTabsProps<T extends string> {
  options: { value: T; label: string }[];
  active: T;
  onChange: (value: T) => void;
}

export default function FilterTabs<T extends string>({ options, active, onChange }: FilterTabsProps<T>) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoria">
      {options.map((option) => {
        const isActive = option.value === active;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={isActive}
            className={`rounded-lg border px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors duration-200 ${
              isActive
                ? "border-ink bg-ink text-paper"
                : "border-ink/20 bg-transparent text-ink/70 hover:border-ink hover:text-ink"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
