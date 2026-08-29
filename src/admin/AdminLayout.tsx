import type { ReactNode } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

const NAV = [
  { label: "Início", href: "/admin" },
  { label: "Actividades", href: "/admin/actividades" },
  { label: "Histórias", href: "/admin/historias" },
  { label: "Newsletters", href: "/admin/newsletters" },
  { label: "Galeria", href: "/admin/galeria" },
  { label: "Parceiros", href: "/admin/parceiros" },
  { label: "Equipa", href: "/admin/equipa" },
  { label: "Homepage e Sobre", href: "/admin/homepage" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { session, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-paper">
      <div className="flex flex-col lg:flex-row">
        <aside className="border-b border-ink/10 bg-clay-700 px-6 py-6 text-ink lg:min-h-screen lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r">
          <Link to="/admin" className="font-display text-xl">
            NKENTU · admin
          </Link>
          <nav className="mt-8 flex flex-row flex-wrap gap-x-4 gap-y-2 lg:flex-col" aria-label="Navegação de administração">
            {NAV.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === "/admin"}
                className={({ isActive }) =>
                  `text-sm font-medium ${isActive ? "text-ochre-300" : "text-ink/70 hover:text-ink"}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-10 border-t border-ink/15 pt-4 text-xs text-ink/50">
            <p className="truncate">{session?.user.email}</p>
            <button type="button" onClick={() => signOut()} className="mt-2 underline decoration-ink/30 hover:text-ink">
              Terminar sessão
            </button>
            <Link to="/" className="mt-2 block underline decoration-ink/30 hover:text-ink">
              Ver site público
            </Link>
          </div>
        </aside>
        <main className="min-w-0 flex-1 px-6 py-10 sm:px-10">{children}</main>
      </div>
    </div>
  );
}
