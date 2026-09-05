import type { Partner } from "../types/content";

export default function PartnersStrip({ partners }: { partners: Partner[] }) {
  return (
    <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
      {partners.map((partner) => {
        const content = (
          <img
            src={partner.logotipo.src}
            alt={partner.logotipo.alt}
            loading="lazy"
            className="h-20 w-full rounded-xl border border-ink/10 bg-white object-contain p-4 grayscale transition duration-300 ease-editorial group-hover:grayscale-0"
          />
        );
        return (
          <li key={partner.id} className="group" title={partner.descricao}>
            {partner.website ? (
              <a href={partner.website} target="_blank" rel="noreferrer" aria-label={partner.nome}>
                {content}
              </a>
            ) : (
              content
            )}
          </li>
        );
      })}
    </ul>
  );
}
