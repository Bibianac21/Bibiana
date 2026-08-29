import { Link } from "react-router-dom";
import { siteSettings } from "../data/site";
import NewsletterSignupForm from "./NewsletterSignupForm";

const FOOTER_LINKS = [
  { label: "Actividades", href: "/actividades" },
  { label: "Histórias", href: "/historias" },
  { label: "Galeria", href: "/galeria" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contacto", href: "/contacto" },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-ink text-paper">
      <div className="container-editorial grid gap-12 py-16 lg:grid-cols-[1.2fr_1fr_1.3fr]">
        <div>
          <Link to="/" className="font-display text-2xl">
            NKENTU
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/70">
            {siteSettings.descricaoCurta}
          </p>
          <ul className="mt-6 flex gap-4">
            {siteSettings.contacto.redesSociais.map((rede) => (
              <li key={rede.label}>
                <a
                  href={rede.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-paper/70 underline decoration-paper/30 underline-offset-4 hover:text-paper"
                >
                  {rede.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Navegação do rodapé">
          <p className="eyebrow text-paper/50">Navegação</p>
          <ul className="mt-4 space-y-2">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className="text-sm text-paper/80 hover:text-clay-300">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow text-paper/50">Newsletter</p>
          <p className="mt-4 text-sm text-paper/70">Novidades sobre actividades e histórias, uma vez por mês.</p>
          <div className="mt-4">
            <NewsletterSignupForm compact />
          </div>
        </div>
      </div>

      <div className="border-t border-paper/10 py-6">
        <div className="container-editorial flex flex-col gap-2 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} NKENTU. Todos os direitos reservados.</p>
          <p>{siteSettings.contacto.endereco}</p>
        </div>
      </div>
    </footer>
  );
}
