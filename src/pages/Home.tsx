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

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={content.hero.imagem.src}
            alt={content.hero.imagem.alt}
            className="h-full w-full origin-center animate-hero-zoom object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to top, rgba(24,15,32,0.97) 0%, rgba(24,15,32,0.95) 62%, rgba(24,15,32,0.55) 82%, rgba(24,15,32,0) 100%)",
            }}
          />
        </div>
        <div className="container-editorial relative flex min-h-[540px] flex-col justify-end gap-5 pb-14 pt-32 sm:min-h-[620px] lg:min-h-[700px] lg:pb-20">
          <Reveal>
            <p className="eyebrow text-ink">NKENTU</p>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="text-display-lg max-w-3xl text-balance uppercase text-ink [text-shadow:0_2px_16px_rgba(0,0,0,0.6)]">
              {content.hero.headline}
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="max-w-md text-lg text-ink/95 [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
              {content.hero.subheadline}
            </p>
          </Reveal>
          <Reveal delay={270} className="flex flex-wrap gap-4 pt-2">
            <Link to={content.hero.ctaPrimaria.href} className="btn-primary bg-ochre-500 text-night hover:bg-ochre-300">
              {content.hero.ctaPrimaria.label}
            </Link>
            <Link
              to={content.hero.ctaSecundaria.href}
              className="btn-secondary border-ink/60 text-ink hover:border-ink hover:bg-ink/15"
            >
              {content.hero.ctaSecundaria.label}
            </Link>
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
                  <p className="text-sm font-medium text-ochre-300">{member.funcao}</p>
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
