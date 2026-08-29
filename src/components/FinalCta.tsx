import { Link } from "react-router-dom";
import { siteSettings } from "../data/site";

export default function FinalCta() {
  return (
    <section className="bg-ink py-20 text-paper sm:py-28">
      <div className="container-editorial">
        <h2 className="text-display-lg max-w-2xl text-balance">Há muitas formas de fazer parte.</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {siteSettings.participar.map((item) => (
            <div key={item.titulo} className="flex flex-col gap-4 rounded-2xl border border-paper/15 p-8">
              <h3 className="font-display text-2xl">{item.titulo}</h3>
              <p className="flex-1 text-sm text-paper/70">{item.descricao}</p>
              <Link to={item.cta.href} className="btn-text text-paper decoration-ochre-300">
                {item.cta.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
