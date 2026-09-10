import { photo } from "../lib/images";
import { getSupabaseClient } from "../lib/supabase";
import type { ImpactNumber } from "../types/content";

export const siteSettings = {
  nome: "NKENTU",
  // Nome e NIF da entidade legal, para o rodapé do site.
  nomeLegal: "Associação Nkentu",
  nif: "50030155664",
  // Logótipo real da NKENTU (versão branca, do brand board oficial).
  // Podes trocar por outra variante de cor em /admin/homepage.
  logo: { src: "/brand/logo-white.png", alt: "Logótipo da NKENTU" },
  descricaoCurta:
    "Colectivo artístico educacional de mulheres independentes, dedicado à capacitação, inclusão e impulsionamento de mulheres no mercado digital e audiovisual angolano.",
  hero: {
    headline: "Capacitar mulheres para transformar possibilidades em caminhos.",
    subheadline:
      "A NKENTU cria espaços de aprendizagem, partilha e desenvolvimento para mulheres que querem crescer, criar e construir novas possibilidades.",
    ctaPrimaria: { label: "Conhecer a NKENTU", href: "/sobre" },
    ctaSecundaria: { label: "Ver actividades", href: "/actividades" },
    imagem: {
      src: photo("hero-nkentu", 1800, 2000),
      alt: "Grupo de mulheres reunidas ao ar livre durante uma sessão de formação da NKENTU",
    },
  },
  impacto: {
    intro: "Cada actividade é uma oportunidade para transformar conhecimento em possibilidade.",
    numeros: [
      { valor: "+80", label: "formandas capacitadas" },
      { valor: "+700", label: "mulheres alcançadas" },
      { valor: "+4", label: "em estágio" },
      { valor: "+560", label: "seguidoras nas redes" },
      { valor: "+4", label: "parceiros envolvidos" },
    ] satisfies ImpactNumber[],
  },
  sobreNumeros: [
    { valor: "+80", label: "formandas capacitadas" },
    { valor: "+700", label: "mulheres alcançadas" },
    { valor: "+4", label: "formandas em estágio" },
    { valor: "+560", label: "seguidoras nas redes sociais" },
  ] satisfies ImpactNumber[],
  participar: [
    {
      titulo: "Participar",
      descricao: "Inscreve-te numa formação, workshop ou no programa de mentorias.",
      cta: { label: "Ver actividades", href: "/actividades" },
    },
    {
      titulo: "Parceria",
      descricao: "A tua instituição ou empresa pode apoiar formações, ceder espaço ou juntar-se como mentora.",
      cta: { label: "Falar connosco", href: "/contacto" },
    },
    {
      titulo: "Apoiar",
      descricao: "Contribui com materiais, tempo voluntário ou apoio financeiro directo às actividades.",
      cta: { label: "Saber como apoiar", href: "/contacto" },
    },
  ],
  contacto: {
    email: "nkentucoletivo@gmail.com",
    telefone: "+244 929 425 096",
    // Morada não fornecida na informação institucional mais recente — este
    // valor é um placeholder por confirmar/substituir em /admin/homepage.
    endereco: "Rua da Missão, 45, Rangel, Luanda, Angola",
    // Cola aqui o link de partilha do Google Maps (Google Maps → localização → Partilhar → Copiar link).
    googleMapsUrl: "",
    redesSociais: [{ label: "Instagram", href: "https://www.instagram.com/nkentu.coletivo/" }],
  },
};

export const sobreConteudo = {
  imagem: {
    src: photo("sobre-hero", 1400, 1000),
    alt: "Equipa e participantes da NKENTU reunidas numa sala de formação",
  },
  quemE:
    "Um colectivo artístico educacional de mulheres independentes que tem como foco a capacitação, inclusão e impulsionamento de mulheres no mercado digital e audiovisual.",
  historia:
    "Começámos em 2023 com uma ideia no papel — hoje somos um colectivo estruturado, que capacita mulheres para inserção na indústria digital e audiovisual em Angola. Após um ano de pesquisa, estruturação e construção de parcerias, em 2024 impactámos directamente mais de 155 mulheres, realizámos oficinas mensais e garantimos oportunidades de estágio para quatro formandas. Construímos parcerias estratégicas, como com o Goethe-Institut, e fortalecemos a nossa presença digital, alcançando mais de 618 seguidoras. Trabalhamos para garantir material didáctico, transporte e alimentação às participantes, com o apoio de 10 voluntárias e doações individuais. No início de 2025, conquistámos um marco essencial: o nosso primeiro espaço físico para formações, consolidando o NKENTU como um pilar na capacitação feminina. Nos próximos anos, queremos expandir o nosso alcance, fortalecer a representatividade das mulheres no mercado e tornar o NKENTU um espaço de referência para inclusão e inovação no sector.",
  missao: "Capacitar e ser suporte para a inserção de mulheres no mercado digital e audiovisual angolano.",
  visao: "Ser a principal referência em Angola na formação e inclusão de mulheres no digital e audiovisual.",
  publicoAlvo: [
    {
      titulo: "Jovens mulheres",
      descricao: "Beneficiárias directas das nossas actividades culturais e dos programas educativos e participativos.",
    },
    {
      titulo: "Parceiras e colaboradoras",
      descricao:
        "Profissionais e formadoras em fase de formação ou inserção no mercado, com pouca experiência ou à procura de capacitação e redes de apoio.",
    },
    {
      titulo: "Comunidades locais",
      descricao: "Rede activa de formações e mentorias, troca de experiências e fortalecimento institucional.",
    },
    {
      titulo: "Instituições e empresas",
      descricao: "Interessadas em gerar impacto social e cultural através de apoios e parcerias estratégicas.",
    },
  ],
  actividadesPrincipais: [
    {
      titulo: "Cine Club Baku ya Diambu",
      descricao:
        "Cineclube que promove exibições mensais de cinema realizado por mulheres, todas as últimas quartas-feiras, seguidas de roda de conversa em microfone aberto — cinema, mulheres e reflexão.",
    },
    {
      titulo: "Formações",
      descricao:
        "Oficinas mensais de audiovisual em diferentes áreas, realizadas pela NKENTU e em parceria com instituições, associações e profissionais do sector.",
    },
    {
      titulo: "Voluntariado profissional",
      descricao:
        "Programa de 6 meses que integra voluntárias na estrutura do projecto, proporcionando experiência prática em diferentes funções, com formação e acompanhamento para o desenvolvimento das suas competências.",
    },
    {
      titulo: "Estágio profissional",
      descricao:
        "Parceria com produtoras nacionais para integrar, durante 3 meses, as melhores formandas de cada formação em experiências práticas, com apoio para despesas básicas de transporte e alimentação.",
    },
  ],
  valores: [
    {
      titulo: "Representatividade",
      descricao: "Acreditamos na importância de mulheres ocuparem lugares de criação, liderança e decisão.",
    },
    {
      titulo: "Colaboração",
      descricao: "Valorizamos a troca de experiências, a criação colectiva e o trabalho em rede.",
    },
    {
      titulo: "Impacto social",
      descricao:
        "O audiovisual e a cultura como ferramentas de transformação social, capazes de ampliar vozes, questionar realidades e criar novas possibilidades.",
    },
    {
      titulo: "Criatividade",
      descricao: "Estimulamos a experimentação, a liberdade artística e a procura de novas formas de contar histórias e expressar ideias.",
    },
  ],
  comoTrabalhamosPassos: [
    { titulo: "Escuta", descricao: "Identificamos necessidades e oportunidades reais junto das comunidades e participantes." },
    { titulo: "Formação", descricao: "Desenvolvemos actividades práticas com formadoras e profissionais qualificadas." },
    {
      titulo: "Acompanhamento",
      descricao: "Criamos espaços seguros de orientação, partilha de experiências e aprendizagem contínua.",
    },
    {
      titulo: "Conexão",
      descricao: "Aproximamos as mulheres de redes profissionais, projectos de impacto social e novas oportunidades.",
    },
    {
      titulo: "Avaliação",
      descricao: "Registamos resultados, recolhemos testemunhos e analisamos o impacto social gerado.",
    },
  ],
  voluntarios: [
    { nome: "Domingos Morais", funcao: "Designer NKENTU" },
    { nome: "Rosana Bernardo", funcao: "Assistente de Produção e Comunicação" },
    { nome: "Dully Dully", funcao: "Assistente de Produção" },
    { nome: "Maria Odeth", funcao: "Assistente de Produção" },
    { nome: "Amina Ásia", funcao: "Assistente de Produção e Copywriter" },
  ],
};

export interface SiteContent {
  logo: typeof siteSettings.logo;
  hero: typeof siteSettings.hero;
  impacto: typeof siteSettings.impacto;
  sobreNumeros: typeof siteSettings.sobreNumeros;
  participar: typeof siteSettings.participar;
  contacto: typeof siteSettings.contacto;
  sobre: typeof sobreConteudo;
}

const mockSiteContent: SiteContent = {
  logo: siteSettings.logo,
  hero: siteSettings.hero,
  impacto: siteSettings.impacto,
  sobreNumeros: siteSettings.sobreNumeros,
  participar: siteSettings.participar,
  contacto: siteSettings.contacto,
  sobre: sobreConteudo,
};

/**
 * The editable half of the homepage/about content, backed by the
 * `site_settings` singleton row (id = 1). Falls back to the mock values
 * above when Supabase isn't configured, the row is missing, or a field
 * within it wasn't set yet.
 */
export async function fetchSiteContent(): Promise<SiteContent> {
  const supabase = getSupabaseClient();
  if (!supabase) return mockSiteContent;
  const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
  if (error || !data) return mockSiteContent;
  return {
    logo: data.logo?.src ? data.logo : mockSiteContent.logo,
    hero: data.hero ?? mockSiteContent.hero,
    impacto: data.impacto ?? mockSiteContent.impacto,
    sobreNumeros: data.sobreNumeros ?? mockSiteContent.sobreNumeros,
    participar: data.participar ?? mockSiteContent.participar,
    contacto: data.contacto ?? mockSiteContent.contacto,
    sobre: data.sobre ? { ...mockSiteContent.sobre, ...data.sobre } : mockSiteContent.sobre,
  };
}
