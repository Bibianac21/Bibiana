import { Link } from "react-router-dom";

const SHORTCUTS = [
  { label: "Actividades", href: "/admin/actividades", description: "Formações, workshops, mentorias, eventos e programas." },
  { label: "Histórias", href: "/admin/historias", description: "Testemunhos, perfis, entrevistas e bastidores." },
  { label: "Newsletters", href: "/admin/newsletters", description: "Edições publicadas e por publicar." },
  { label: "Galeria", href: "/admin/galeria", description: "Fotografias e vídeos organizados por categoria." },
  { label: "Parceiros", href: "/admin/parceiros", description: "Logótipos e descrições dos parceiros." },
  { label: "Equipa", href: "/admin/equipa", description: "Perfis da equipa NKENTU." },
  { label: "Homepage e Sobre", href: "/admin/homepage", description: "Hero, números de impacto, contacto e texto institucional." },
  { label: "Subscritores", href: "/admin/subscritores", description: "Quem se inscreveu na newsletter, com exportação para CSV." },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="font-display text-3xl">Bem-vinda à administração da NKENTU</h1>
      <p className="mt-3 max-w-prose text-ink/70">
        Edite aqui o conteúdo que aparece no site público. As alterações ficam visíveis assim que guardar.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {SHORTCUTS.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="rounded-xl border border-ink/10 p-5 transition-colors hover:border-clay-500"
          >
            <p className="font-display text-lg">{item.label}</p>
            <p className="mt-1 text-sm text-ink/60">{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
