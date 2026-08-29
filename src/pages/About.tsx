import Seo from "../components/Seo";
import ImpactStats from "../components/ImpactStats";
import PartnersStrip from "../components/PartnersStrip";
import { siteSettings, sobreConteudo } from "../data/site";
import { team } from "../data/team";
import { partners } from "../data/partners";
import { photo } from "../lib/images";

export default function About() {
  return (
    <>
      <Seo
        title="Sobre — NKENTU"
        description="Quem é a NKENTU, a nossa missão, o que fazemos, como trabalhamos, a nossa comunidade, equipa e parceiros."
      />

      <header className="container-editorial grid gap-10 pb-16 pt-14 sm:pt-20 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow mb-4">Sobre a NKENTU</p>
          <h1 className="text-display-lg text-balance">Quem é a NKENTU?</h1>
          <p className="mt-6 max-w-prose text-lg text-ink/70">{sobreConteudo.quemE}</p>
        </div>
        <div className="aspect-[4/3] overflow-hidden rounded-3xl">
          <img
            src={photo("sobre-hero", 1400, 1000)}
            alt="Equipa e participantes da NKENTU reunidas numa sala de formação"
            className="h-full w-full object-cover"
          />
        </div>
      </header>

      <section className="border-y border-ink/10 bg-sand py-16 sm:py-24">
        <div className="container-editorial grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl">A nossa missão</h2>
            <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink/80">{sobreConteudo.missao}</p>
          </div>
          <div>
            <h2 className="font-display text-2xl">Como trabalhamos</h2>
            <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink/80">{sobreConteudo.comoTrabalhamos}</p>
          </div>
        </div>
      </section>

      <section className="container-editorial py-16 sm:py-24">
        <h2 className="font-display text-2xl">O que fazemos</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {sobreConteudo.oQueFazemos.map((item) => (
            <li key={item} className="flex gap-3 rounded-xl border border-ink/10 p-5 text-ink/80">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay-500" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-ink py-16 text-paper sm:py-24">
        <div className="container-editorial">
          <h2 className="font-display text-2xl">A NKENTU em números</h2>
          <div className="mt-10">
            <ImpactStats numeros={siteSettings.sobreNumeros} />
          </div>
        </div>
      </section>

      <section className="container-editorial py-16 sm:py-24">
        <h2 className="font-display text-2xl">A nossa comunidade</h2>
        <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink/80">{sobreConteudo.comunidade}</p>
      </section>

      <section className="border-t border-ink/10 bg-sand py-16 sm:py-24">
        <div className="container-editorial">
          <h2 className="font-display text-2xl">Equipa</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <div key={member.id} className="flex flex-col gap-4">
                <div className="aspect-[4/5] overflow-hidden rounded-2xl">
                  <img src={member.fotografia.src} alt={member.fotografia.alt} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div>
                  <h3 className="font-display text-xl">{member.nome}</h3>
                  <p className="text-sm font-medium text-clay-600">{member.funcao}</p>
                  <p className="mt-2 text-sm text-ink/70">{member.biografia}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-editorial py-16 sm:py-24">
        <h2 className="font-display text-2xl">Parceiros</h2>
        <div className="mt-10">
          <PartnersStrip partners={partners} />
        </div>
      </section>
    </>
  );
}
