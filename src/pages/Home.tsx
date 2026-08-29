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
import { getUpcomingActivities, getFeaturedActivity } from "../data/activities";
import { getFeaturedStories } from "../data/stories";
import { getLatestNewsletter } from "../data/newsletters";
import { partners } from "../data/partners";
import { siteSettings } from "../data/site";

export default function Home() {
  const upcoming = getUpcomingActivities(3);
  const featured = getFeaturedActivity();
  const stories = getFeaturedStories(2);
  const latestNewsletter = getLatestNewsletter();

  return (
    <>
      <Seo title="NKENTU — Capacitação e desenvolvimento de mulheres" description={siteSettings.descricaoCurta} />

      <section className="relative overflow-hidden">
        <div className="container-editorial grid gap-10 pb-16 pt-14 lg:grid-cols-2 lg:items-center lg:pb-24 lg:pt-20">
          <div className="order-2 lg:order-1">
            <p className="eyebrow mb-6">NKENTU</p>
            <h1 className="text-display-xl text-balance">{siteSettings.hero.headline}</h1>
            <p className="mt-6 max-w-prose text-lg text-ink/70">{siteSettings.hero.subheadline}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to={siteSettings.hero.ctaPrimaria.href} className="btn-primary">
                {siteSettings.hero.ctaPrimaria.label}
              </Link>
              <Link to={siteSettings.hero.ctaSecundaria.href} className="btn-secondary">
                {siteSettings.hero.ctaSecundaria.label}
              </Link>
            </div>
          </div>
          <div className="order-1 aspect-[4/5] overflow-hidden rounded-3xl lg:order-2 lg:aspect-[3/4]">
            <img
              src={siteSettings.hero.imagem.src}
              alt={siteSettings.hero.imagem.alt}
              className="h-full w-full object-cover"
            />
          </div>
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

      <section className="bg-sand py-20 sm:py-28">
        <div className="container-editorial">
          <p className="text-display-md max-w-2xl text-balance">{siteSettings.impacto.intro}</p>
          <div className="mt-14">
            <ImpactStats numeros={siteSettings.impacto.numeros} />
          </div>
        </div>
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

      <Section eyebrow="Parceiros" title="Construímos juntas.">
        <PartnersStrip partners={partners} />
      </Section>

      <FinalCta />
    </>
  );
}
