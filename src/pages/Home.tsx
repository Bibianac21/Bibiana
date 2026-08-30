import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import Section from "../components/Section";
import ActivityCard from "../components/ActivityCard";
import FeaturedActivity from "../components/FeaturedActivity";
import StoryCard from "../components/StoryCard";
import NewsletterCard from "../components/NewsletterCard";
import ImpactStats from "../components/ImpactStats";
import PartnersStrip from "../components/PartnersStrip";
import FinalCta from "../components/FinalCta";
import Reveal from "../components/Reveal";
import Testimonials from "../components/Testimonials";
import { getUpcomingActivities, getFeaturedActivity, fetchUpcomingActivities, fetchFeaturedActivity } from "../data/activities";
import { getFeaturedStories, fetchFeaturedStories, getTestimonialStories, fetchTestimonialStories } from "../data/stories";
import { getLatestNewsletter, fetchLatestNewsletter } from "../data/newsletters";
import { partners as mockPartners, fetchPartners } from "../data/partners";
import { team as mockTeam, fetchTeam } from "../data/team";
import { siteSettings, fetchSiteContent } from "../data/site";
import { useLiveData } from "../lib/useLiveData";

export default function Home() {
  const upcoming = useLiveData(getUpcomingActivities(3), () => fetchUpcomingActivities(3));
  const featured = useLiveData(getFeaturedActivity(), fetchFeaturedActivity);
  const stories = useLiveData(getFeaturedStories(2), () => fetchFeaturedStories(2));
  const testimonialStories = useLiveData(getTestimonialStories(5), () => fetchTestimonialStories(5));
  const latestNewsletter = useLiveData(getLatestNewsletter(), fetchLatestNewsletter);
  const partners = useLiveData(mockPartners, fetchPartners);
  const team = useLiveData(mockTeam, fetchTeam);
  const content = useLiveData(
    { hero: siteSettings.hero, impacto: siteSettings.impacto },
    async () => {
      const live = await fetchSiteContent();
      return { hero: live.hero, impacto: live.impacto };
    },
  );

  return (
    <>
      <Seo title="NKENTU — Capacitação e desenvolvimento de mulheres" description={siteSettings.descricaoCurta} />

      <section className="relative overflow-hidden bg-clay-600">
        <div className="grid lg:grid-cols-2">
          <Reveal className="order-2 flex flex-col justify-center gap-6 px-5 py-16 sm:px-8 lg:order-1 lg:px-16 lg:py-24">
            <p className="eyebrow text-ink/75">NKENTU</p>
            <h1 className="text-display-xl text-balance uppercase text-ink">{content.hero.headline}</h1>
            <p className="max-w-prose text-lg text-ink/85">{content.hero.subheadline}</p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to={content.hero.ctaPrimaria.href} className="btn-primary bg-paper text-ink hover:bg-ink hover:text-paper">
                {content.hero.ctaPrimaria.label}
              </Link>
              <Link
                to={content.hero.ctaSecundaria.href}
                className="btn-secondary border-ink/40 text-ink hover:border-ink hover:bg-ink hover:text-paper"
              >
                {content.hero.ctaSecundaria.label}
              </Link>
            </div>
          </Reveal>
          <Reveal delay={120} className="relative order-1 min-h-[360px] overflow-hidden lg:order-2 lg:min-h-[600px]">
            <div
              className="absolute -left-20 top-1/2 hidden h-72 w-72 -translate-y-1/2 rounded-full bg-clay-500/50 lg:block"
              aria-hidden="true"
            />
            <img src={content.hero.imagem.src} alt={content.hero.imagem.alt} className="absolute inset-0 h-full w-full object-cover" />
          </Reveal>
        </div>
      </section>

      <Section
        eyebrow="Calendário"
        title="Está a acontecer na NKENTU"
        description="As próximas formações, workshops, mentorias e eventos, actualizados à medida que acontecem."
        action={
          <Link to="/actividades" className="btn-text">
            Ver todas as actividades
          </Link>
        }
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </Section>

      {featured && (
        <Section eyebrow="Em destaque" title="Actividade em destaque">
          <FeaturedActivity activity={featured} />
        </Section>
      )}

      <section className="bg-clay-700 py-20 text-ink sm:py-28">
        <Reveal className="container-editorial grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="eyebrow text-ink/70">O nosso impacto</p>
            <p className="text-display-md mt-4 max-w-xl text-balance">{content.impacto.intro}</p>
          </div>
          <ImpactStats numeros={content.impacto.numeros} variant="list" />
        </Reveal>
      </section>

      <Section
        eyebrow="Histórias"
        title="As pessoas por trás do impacto"
        description="Testemunhos, perfis e histórias de transformação de quem passa pela NKENTU."
        action={
          <Link to="/historias" className="btn-text">
            Ver todas as histórias
          </Link>
        }
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </Section>

      {latestNewsletter && (
        <Section
          eyebrow="Newsletter"
          title="Fique por dentro da NKENTU"
          description="A última edição da nossa newsletter — novidades sobre actividades, oportunidades e histórias."
          action={
            <Link to="/newsletter" className="btn-text">
              Ver arquivo
            </Link>
          }
        >
          <div className="max-w-2xl">
            <NewsletterCard newsletter={latestNewsletter} />
          </div>
        </Section>
      )}

      {team.length > 0 && (
        <Section
          eyebrow="Quem somos"
          title="A cara da NKENTU"
          description="A equipa que desenha, facilita e acompanha cada formação, workshop e mentoria."
          action={
            <Link to="/sobre#equipa" className="btn-text">
              Conhecer a equipa
            </Link>
          }
        >
          <div className="grid gap-6 sm:grid-cols-3">
            {team.slice(0, 3).map((member) => (
              <Link
                key={member.id}
                to="/sobre#equipa"
                className="group flex flex-col gap-4"
              >
                <div className="aspect-[4/5] overflow-hidden rounded-2xl">
                  <img
                    src={member.fotografia.src}
                    alt={member.fotografia.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 ease-editorial group-hover:scale-105"
                  />
                </div>
                <div>
                  <h3 className="font-display text-xl">{member.nome}</h3>
                  <p className="text-sm font-medium text-clay-300">{member.funcao}</p>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {testimonialStories.length > 0 && (
        <Section eyebrow="Testemunhos" title="O que dizem sobre a NKENTU">
          <div className="mx-auto max-w-2xl">
            <Testimonials stories={testimonialStories} />
          </div>
        </Section>
      )}

      <Section eyebrow="Parceiros" title="Construímos juntas.">
        <PartnersStrip partners={partners} />
      </Section>

      <FinalCta />
    </>
  );
}
