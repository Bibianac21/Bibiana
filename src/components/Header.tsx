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
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/90 backdrop-blur">
      <div className="container-editorial flex h-24 items-center justify-between">
        <Link to="/" className="flex items-center" aria-label="NKENTU, página inicial">
          {logo.src ? (
            <img src={logo.src} alt={logo.alt || "NKENTU"} className="h-16 w-auto object-contain sm:h-20" />
          ) : (
            <span className="font-display text-2xl tracking-tight text-ink">NKENTU</span>
          )}
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              end={link.href === "/"}
              className={({ isActive }) =>
                `group relative py-1 text-sm font-medium tracking-wide ${isActive ? "text-ochre-300" : "text-ink/80 hover:text-ink"}`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-0.5 bg-ochre-300 transition-all duration-300 ease-editorial ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link to="/contacto" className="btn-primary">
            Junte-se à NKENTU
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-ink/15 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 block h-0.5 w-5 bg-ink transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`absolute left-0 top-[7px] block h-0.5 w-5 bg-ink transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`absolute left-0 top-[14px] block h-0.5 w-5 bg-ink transition-transform duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          className="border-t border-ink/10 bg-paper px-6 pb-8 pt-4 lg:hidden"
          aria-label="Navegação móvel"
        >
          <ul className="flex flex-col divide-y divide-ink/10">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <NavLink
                  to={link.href}
                  end={link.href === "/"}
                  className={({ isActive }) =>
                    `block py-4 font-display text-2xl ${isActive ? "text-ochre-300" : "text-ink"}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link to="/contacto" className="btn-primary mt-6 w-full">
            Junte-se à NKENTU
          </Link>
        </nav>
      )}
    </header>
  );
}
