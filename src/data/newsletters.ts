import { photo } from "../lib/images";
import { getSupabaseClient } from "../lib/supabase";
import type { Newsletter } from "../types/content";

export const newsletters: Newsletter[] = [
  {
    id: "nl-2026-08",
    titulo: "Feira à vista, Raízes a meio caminho",
    slug: "agosto-2026",
    edicao: 14,
    data: "2026-08-25",
    imagem: { src: photo("nl-agosto-2026", 1600, 900), alt: "Colagem de fotografias de actividades de Agosto" },
    resumo:
      "As inscrições para a Feira NKENTU abriram, o Programa Raízes vai a meio, e duas novas mentoras juntaram-se ao Ciclo 3.",
    conteudo: [
      "Este mês foi de preparação. As inscrições de banca para a Feira NKENTU, marcada para 22 de Novembro, abriram esta semana — e em três dias já tínhamos meia lista preenchida.",
      "O Programa Raízes, em Lubango, está a meio do seu percurso. As primeiras avaliações mostram que 28 das 32 participantes já construíram o seu primeiro orçamento mensal completo.",
      "Duas novas mentoras da área de tecnologia juntaram-se ao Ciclo 3 do programa de mentorias, trazendo o total de mentoras activas para 18.",
      "Como sempre, deixamos aqui o calendário do próximo mês: workshop de fotografia com telemóvel a 3 de Setembro, e o workshop de comunicação a 15 de Setembro. Ambos em Luanda.",
    ],
    destaque: true,
    seo: {
      metaTitle: "Newsletter NKENTU — Agosto 2026",
      metaDescription: "Edição de Agosto de 2026 da newsletter da NKENTU: Feira, Programa Raízes e novas mentoras.",
    },
  },
  {
    id: "nl-2026-07",
    titulo: "22 certificados e uma turma que não queria acabar",
    slug: "julho-2026",
    edicao: 13,
    data: "2026-07-22",
    imagem: { src: photo("nl-julho-2026", 1600, 900), alt: "Entrega de certificados a participantes" },
    resumo:
      "A formação de ferramentas digitais terminou com 22 certificados entregues. Conhece a história da Rosa, uma das participantes.",
    conteudo: [
      "A turma de \"Introdução ao Computador e Ferramentas Digitais\" terminou esta semana com 22 das 24 inscritas a concluir o programa — a maior taxa de conclusão desde que a formação começou.",
      "Uma das participantes, Rosa Chindungo, já confirmou que quer voltar como voluntária de apoio à próxima turma. A história completa está publicada esta semana em Histórias.",
      "Também abrimos as inscrições para a Turma 5 de Costura e Design Têxtil, em Benguela, com início em Outubro.",
    ],
    seo: {
      metaTitle: "Newsletter NKENTU — Julho 2026",
      metaDescription: "Edição de Julho de 2026 da newsletter da NKENTU: fim da formação digital e nova turma de costura.",
    },
  },
  {
    id: "nl-2026-06",
    titulo: "Contas certas: o que aprendemos com o Programa Raízes",
    slug: "junho-2026",
    edicao: 12,
    data: "2026-06-18",
    imagem: { src: photo("nl-junho-2026", 1600, 900), alt: "Sessão de formação sobre finanças pessoais" },
    resumo:
      "Preparação do novo ciclo do Programa Raízes na Huíla e balanço do Ciclo 2 de mentorias em empreendedorismo.",
    conteudo: [
      "O Ciclo 2 do Programa de Mentorias em Empreendedorismo terminou com 89% de taxa de conclusão. Vamos partilhar mais resultados na próxima edição.",
      "Em Lubango, a equipa está a preparar a próxima edição do Programa Raízes, com início marcado para Agosto.",
      "Recebemos também duas novas parceiras: o Instituto Huíla Cresce e a Cooperativa Benguela Têxtil, que vão apoiar formações na região sul e no litoral.",
    ],
    seo: {
      metaTitle: "Newsletter NKENTU — Junho 2026",
      metaDescription: "Edição de Junho de 2026 da newsletter da NKENTU: balanço de mentorias e novas parcerias.",
    },
  },
  {
    id: "nl-2026-05",
    titulo: "Quem desenha o que aprendemos",
    slug: "maio-2026",
    edicao: 11,
    data: "2026-05-20",
    imagem: { src: photo("nl-maio-2026", 1600, 900), alt: "Coordenadora a rever material de formação" },
    resumo: "Um perfil sobre Esperança Domingos, Coordenadora de Formações, e as próximas datas do calendário.",
    conteudo: [
      "Esta edição traz um perfil sobre Esperança Domingos, que desenha o currículo de cada formação da NKENTU a partir de conversas directas com as participantes.",
      "No calendário: o workshop de comunicação volta em Setembro, depois do sucesso da edição de Março.",
    ],
    seo: {
      metaTitle: "Newsletter NKENTU — Maio 2026",
      metaDescription: "Edição de Maio de 2026 da newsletter da NKENTU: perfil de Esperança Domingos e calendário.",
    },
  },
  {
    id: "nl-2026-01",
    titulo: "Balanço de 2025 e o que vem em 2026",
    slug: "janeiro-2026",
    edicao: 8,
    data: "2026-01-15",
    imagem: { src: photo("nl-janeiro-2026", 1600, 900), alt: "Grupo de participantes reunidas no Encontro Anual" },
    resumo:
      "Retrospectiva do Encontro Anual 2025 e primeiras datas confirmadas para o ano — incluindo o regresso da formação de costura.",
    conteudo: [
      "2025 fechou com o Encontro Anual, que reuniu mais de 200 pessoas em Luanda e entregou 94 certificados. Obrigada a todas as que estiveram presentes.",
      "Para 2026, já estão confirmadas duas novas edições da formação de ferramentas digitais, o regresso da formação de costura em Benguela e o arranque do Programa Raízes na Huíla.",
    ],
    seo: {
      metaTitle: "Newsletter NKENTU — Janeiro 2026",
      metaDescription: "Edição de Janeiro de 2026 da newsletter da NKENTU: balanço de 2025 e calendário do novo ano.",
    },
  },
];

export function getNewsletters(list: Newsletter[] = newsletters): Newsletter[] {
  return [...list].sort((a, b) => b.data.localeCompare(a.data));
}

export function getNewsletterBySlug(slug: string, list: Newsletter[] = newsletters): Newsletter | undefined {
  return list.find((newsletter) => newsletter.slug === slug);
}

export function getLatestNewsletter(list: Newsletter[] = newsletters): Newsletter | undefined {
  return getNewsletters(list)[0];
}

export async function fetchNewsletters(): Promise<Newsletter[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return newsletters;
  const { data, error } = await supabase.from("newsletters").select("*");
  if (error || !data) return newsletters;
  return data as Newsletter[];
}

export async function fetchNewsletterBySlug(slug: string): Promise<Newsletter | undefined> {
  return getNewsletterBySlug(slug, await fetchNewsletters());
}

export async function fetchLatestNewsletter(): Promise<Newsletter | undefined> {
  return getLatestNewsletter(await fetchNewsletters());
}
