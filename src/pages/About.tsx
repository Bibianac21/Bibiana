import Seo from "../components/Seo";
import ImpactStats from "../components/ImpactStats";
import PartnersStrip from "../components/PartnersStrip";
import Reveal from "../components/Reveal";
import { siteSettings, sobreConteudo, fetchSiteContent } from "../data/site";
import { team as mockTeam, fetchTeam } from "../data/team";
import { partners as mockPartners, fetchPartners } from "../data/partners";
import { useLiveData } from "../lib/useLiveData";

export default function About() {
  const team = useLiveData(mockTeam, fetchTeam);
  const partners = useLiveData(mockPartners, fetchPartners);
  const content = useLiveData(
    { sobreNumeros: siteSettings.sobreNumeros, sobre: sobreConteudo },
    async () => {
      const live = await fetchSiteContent();
      return { sobreNumeros: live.sobreNumeros, sobre: live.sobre };
    },
  );

  return (
    <>
      <Seo
        title="Sobre — NKENTU"
        description="Quem é a NKENTU, a nossa missão, o que fazemos, como trabalhamos, a nossa comunidade, equipa e parceiros."
      />

      <header className="container-editorial grid gap-10 pb-16 pt-14 sm:pt-20 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <div>
            <p className="eyebrow mb-4">Sobre a NKENTU</p>
            <h1 className="text-display-lg text-balance">Quem é a NKENTU?</h1>
            <p className="mt-6 max-w-prose text-lg text-ink/70">{content.sobre.quemE}</p>
          </div>
        </Reveal>
        <Reveal delay={120} className="aspect-[4/3] overflow-hidden rounded-3xl">
          <img src={content.sobre.imagem.src} alt={content.sobre.imagem.alt} className="h-full w-full object-cover" />
        </Reveal>
      </header>

      <section className="border-y border-ink/10 bg-sand py-16 sm:py-24">
        <Reveal className="container-editorial grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl">A nossa missão</h2>
            <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink/80">{content.sobre.missao}</p>
          </div>
          <div>
            <h2 className="font-display text-2xl">Como trabalhamos</h2>
            <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink/80">{content.sobre.comoTrabalhamos}</p>
          </div>
        </Reveal>
      </section>

      <section className="container-editorial py-16 sm:py-24">
        <Reveal>
          <h2 className="font-display text-2xl">O que fazemos</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {content.sobre.oQueFazemos.map((item) => (
              <li key={item} className="flex gap-3 rounded-xl border border-ink/10 p-5 text-ink/80">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay-500" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="bg-clay-700 py-16 text-ink sm:py-24">
        <Reveal className="container-editorial grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="eyebrow text-ink/70">Em números</p>
            <h2 className="font-display text-2xl mt-4">A NKENTU em números</h2>
          </div>
          <ImpactStats numeros={content.sobreNumeros} variant="list" />
        </Reveal>
      </section>

      <section className="container-editorial py-16 sm:py-24">
        <Reveal>
          <h2 className="font-display text-2xl">A nossa comunidade</h2>
          <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink/80">{content.sobre.comunidade}</p>
        </Reveal>
      </section>

      <section id="equipa" className="border-t border-ink/10 bg-sand py-16 sm:py-24">
        <div className="container-editorial">
          <Reveal>
            <h2 className="font-display text-2xl">Equipa</h2>
          </Reveal>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, i) => (
              <Reveal key={member.id} delay={(i % 3) * 90} className="flex flex-col gap-4">
                <div className="aspect-[4/5] overflow-hidden rounded-2xl">
                  <img src={member.fotografia.src} alt={member.fotografia.alt} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div>
                  <h3 className="font-display text-xl">{member.nome}</h3>
                  <p className="text-sm font-medium text-ochre-300">{member.funcao}</p>
                  <p className="mt-2 text-sm text-ink/70">{member.biografia}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-editorial py-16 sm:py-24">
        <Reveal>
          <h2 className="font-display text-2xl">Parceiros</h2>
          <div className="mt-10">
            <PartnersStrip partners={partners} />
          </div>
        </Reveal>
      </section>
    </>
  );
}
