import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { siteSettings, fetchSiteContent } from "../data/site";
import { useLiveData } from "../lib/useLiveData";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Actividades", href: "/actividades" },
  { label: "Histórias", href: "/historias" },
  { label: "Galeria", href: "/galeria" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contacto", href: "/contacto" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const logo = useLiveData(siteSettings.logo, async () => (await fetchSiteContent()).logo);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/95 backdrop-blur">
      <div className="container-editorial flex h-24 items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-ink"
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          <span className="relative block h-4 w-6 shrink-0">
            <span
              className={`absolute left-0 top-0 block h-0.5 w-6 bg-ink transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`absolute left-0 top-[7px] block h-0.5 w-6 bg-ink transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`absolute left-0 top-[14px] block h-0.5 w-6 bg-ink transition-transform duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </span>
          <span className="hidden sm:inline">Menu</span>
        </button>

        <Link to="/" className="flex items-center" aria-label="NKENTU, página inicial">
          {logo.src ? (
            <img src={logo.src} alt={logo.alt || "NKENTU"} className="h-16 w-auto object-contain sm:h-20" />
          ) : (
            <span className="font-display text-2xl tracking-tight text-ink">NKENTU</span>
          )}
        </Link>

        <Link to="/contacto" className="btn-primary hidden shrink-0 sm:inline-flex">
          Junte-se à NKENTU
        </Link>
      </div>
    </header>

    {open && (
      <div id="site-menu" className="fixed inset-x-0 top-24 bottom-0 z-40 overflow-y-auto bg-paper">
        <nav className="container-editorial py-10" aria-label="Navegação principal">
          <ul className="flex flex-col divide-y divide-ink/10 border-t border-ink/10">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <NavLink
                  to={link.href}
                  end={link.href === "/"}
                  className={({ isActive }) =>
                    `block py-5 font-display text-3xl transition-colors duration-200 sm:text-5xl ${
                      isActive ? "text-clay-300" : "text-ink hover:text-clay-300"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link to="/contacto" className="btn-primary mt-10 w-full sm:hidden">
            Junte-se à NKENTU
          </Link>
        </nav>
      </div>
    )}
    </>
  );
}
