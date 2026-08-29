import Seo from "../components/Seo";
import NewsletterCard from "../components/NewsletterCard";
import NewsletterSignupForm from "../components/NewsletterSignupForm";
import { getNewsletters, fetchNewsletters } from "../data/newsletters";
import { useLiveData } from "../lib/useLiveData";

export default function Newsletter() {
  const newsletters = useLiveData(getNewsletters(), fetchNewsletters);

  return (
    <>
      <Seo
        title="Newsletter — NKENTU"
        description="Receba novidades sobre actividades, oportunidades, histórias e tudo o que a NKENTU está a construir."
      />

      <section className="container-editorial grid gap-10 pb-16 pt-14 sm:pt-20 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow mb-4">Newsletter</p>
          <h1 className="text-display-lg text-balance">Fique por dentro da NKENTU.</h1>
          <p className="mt-4 max-w-prose text-lg text-ink/70">
            Receba novidades sobre actividades, oportunidades, histórias e tudo o que estamos a construir.
          </p>
        </div>
        <div className="rounded-3xl border border-ink/10 bg-sand p-8">
          <NewsletterSignupForm />
        </div>
      </section>

      <section className="container-editorial pb-24">
        <h2 className="font-display text-2xl">Últimas newsletters</h2>
        <div className="mt-8 grid gap-6">
          {newsletters.map((newsletter) => (
            <NewsletterCard key={newsletter.id} newsletter={newsletter} />
          ))}
        </div>
      </section>
    </>
  );
}
