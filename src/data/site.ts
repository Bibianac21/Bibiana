import { photo } from "../lib/images";
import { getSupabaseClient } from "../lib/supabase";
import type { ImpactNumber } from "../types/content";

export const siteSettings = {
  nome: "NKENTU",
  // Vazio por omissão: sem logótipo carregado, o cabeçalho mostra o nome
  // "NKENTU" em texto. Faz upload do logótipo real em /admin/homepage.
  logo: { src: "", alt: "Logótipo da NKENTU" },
  descricaoCurta:
    "Projecto social angolano dedicado à capacitação e desenvolvimento de mulheres, através de formação, workshops, mentorias e criação de oportunidades.",
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
      { valor: "+120", label: "mulheres capacitadas" },
      { valor: "+15", label: "actividades realizadas" },
      { valor: "+340", label: "horas de formação" },
      { valor: "+8", label: "mentoras activas" },
      { valor: "+6", label: "parceiros envolvidos" },
    ] satisfies ImpactNumber[],
  },
  sobreNumeros: [
    { valor: "+120", label: "mulheres capacitadas" },
    { valor: "+15", label: "actividades" },
    { valor: "+8", label: "mentoras" },
    { valor: "+6", label: "parceiros" },
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
    email: "geral@nkentu.org",
    telefone: "+244 923 000 000",
    endereco: "Rua da Missão, 45, Rangel, Luanda, Angola",
    redesSociais: [
      { label: "Instagram", href: "https://instagram.com/nkentu" },
      { label: "Facebook", href: "https://facebook.com/nkentu" },
      { label: "LinkedIn", href: "https://linkedin.com/company/nkentu" },
    ],
  },
};

export const sobreConteudo = {
  imagem: {
    src: photo("sobre-hero", 1400, 1000),
    alt: "Equipa e participantes da NKENTU reunidas numa sala de formação",
  },
  quemE:
    "A NKENTU é um projecto social angolano que cria espaços de aprendizagem, partilha e desenvolvimento para mulheres. Começámos em 2022, em Luanda, com um grupo pequeno de workshops de costura — e crescemos a partir do que as próprias participantes pediam a seguir.",
  missao:
    "Criar espaços onde mulheres aprendem, experimentam, partilham conhecimento e encontram novas possibilidades — em formação técnica, comunicação, gestão do próprio negócio e apoio mútuo.",
  oQueFazemos: [
    "Formações técnicas e digitais, gratuitas ou de baixo custo",
    "Workshops práticos de curta duração",
    "Um programa de mentorias individuais em empreendedorismo",
    "Eventos e feiras que ligam participantes ao mercado",
    "Uma newsletter e um arquivo de histórias que documentam o que vamos aprendendo",
  ],
  comoTrabalhamos:
    "Cada formação nasce de conversas directas com quem vai participar, não de um modelo importado. Trabalhamos com facilitadoras e mentoras da comunidade, medimos resultados com números simples e publicamos o que funciona — e o que não funciona — nas nossas newsletters.",
  comunidade:
    "Hoje a comunidade NKENTU inclui participantes activas, antigas participantes que voltam como voluntárias, mentoras, formadoras e instituições parceiras em Luanda, Benguela e na Huíla.",
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
