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
        description="Quem é a NKENTU, a nossa missão, visão, o que fazemos, como trabalhamos, equipa, voluntárias e parceiros."
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

      {content.sobre.historia && (
        <section className="border-y border-ink/10 bg-sand py-16 sm:py-24">
          <Reveal className="container-editorial">
            <h2 className="font-display text-2xl">Nossa história</h2>
            <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink/80">{content.sobre.historia}</p>
          </Reveal>
        </section>
      )}

      <section className="container-editorial py-16 sm:py-24">
        <Reveal className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl">A nossa missão</h2>
            <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink/80">{content.sobre.missao}</p>
          </div>
          {content.sobre.visao && (
            <div>
              <h2 className="font-display text-2xl">A nossa visão</h2>
              <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink/80">{content.sobre.visao}</p>
            </div>
          )}
        </Reveal>
      </section>

      {content.sobre.actividadesPrincipais && content.sobre.actividadesPrincipais.length > 0 && (
        <section className="border-t border-ink/10 bg-sand py-16 sm:py-24">
          <Reveal className="container-editorial">
            <h2 className="font-display text-2xl">O que fazemos</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {content.sobre.actividadesPrincipais.map((item) => (
                <div key={item.titulo} className="rounded-xl border border-ink/10 bg-paper p-5">
                  <h3 className="font-display text-lg">{item.titulo}</h3>
                  <p className="mt-2 text-sm text-ink/70">{item.descricao}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      <section className="bg-clay-700 py-16 text-ink sm:py-24">
        <Reveal className="container-editorial grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="eyebrow text-ink/70">Em números</p>
            <h2 className="font-display text-2xl mt-4">A NKENTU em números</h2>
          </div>
          <ImpactStats numeros={content.sobreNumeros} variant="list" />
        </Reveal>
      </section>

      {content.sobre.publicoAlvo && content.sobre.publicoAlvo.length > 0 && (
        <section className="container-editorial py-16 sm:py-24">
          <Reveal>
            <h2 className="font-display text-2xl">Nosso público-alvo</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {content.sobre.publicoAlvo.map((item) => (
                <div key={item.titulo} className="rounded-xl border border-ink/10 p-5">
                  <h3 className="font-display text-lg text-ochre-300">{item.titulo}</h3>
                  <p className="mt-2 text-sm text-ink/70">{item.descricao}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      {content.sobre.valores && content.sobre.valores.length > 0 && (
        <section className="border-t border-ink/10 bg-sand py-16 sm:py-24">
          <Reveal className="container-editorial">
            <h2 className="font-display text-2xl">Nossos valores</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {content.sobre.valores.map((item) => (
                <div key={item.titulo} className="rounded-xl border border-ink/10 bg-paper p-5">
                  <h3 className="font-display text-lg">{item.titulo}</h3>
                  <p className="mt-2 text-sm text-ink/70">{item.descricao}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      {content.sobre.comoTrabalhamosPassos && content.sobre.comoTrabalhamosPassos.length > 0 && (
        <section className="container-editorial py-16 sm:py-24">
          <Reveal>
            <h2 className="font-display text-2xl">Como trabalhamos</h2>
            <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {content.sobre.comoTrabalhamosPassos.map((passo, i) => (
                <li key={passo.titulo} className="rounded-xl border border-ink/10 p-5">
                  <span className="font-display text-2xl text-ochre-300">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 font-display text-lg">{passo.titulo}</h3>
                  <p className="mt-2 text-sm text-ink/70">{passo.descricao}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </section>
      )}

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

          {content.sobre.voluntarios && content.sobre.voluntarios.length > 0 && (
            <div className="mt-16">
              <Reveal>
                <h3 className="font-display text-xl">Voluntárias e voluntários</h3>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {content.sobre.voluntarios.map((pessoa) => (
                    <li key={pessoa.nome} className="rounded-xl border border-ink/10 bg-paper px-5 py-4">
                      <p className="font-medium text-ink">{pessoa.nome}</p>
                      <p className="text-sm text-ink/60">{pessoa.funcao}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          )}
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
