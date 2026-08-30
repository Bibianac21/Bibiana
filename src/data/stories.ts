import { photo } from "../lib/images";
import { getSupabaseClient } from "../lib/supabase";
import type { Story } from "../types/content";

export const stories: Story[] = [
  {
    id: "story-rosa-chindungo",
    titulo: "Comecei por aprender. Hoje estou a ensinar.",
    slug: "comecei-por-aprender-hoje-estou-a-ensinar",
    nome: "Rosa Chindungo",
    fotografia: { src: photo("story-rosa", 1200, 1500), alt: "Retrato de Rosa Chindungo sorrindo" },
    categoria: "transformacao",
    resumo:
      "Entrou na formação de ferramentas digitais sem saber ligar um computador. Um ano depois, é ela quem recebe as novas turmas.",
    conteudo: [
      "Rosa Chindungo tinha 34 anos e vendia roupa em segunda mão no mercado do Kikolo quando se inscreveu na primeira turma de \"Introdução ao Computador e Ferramentas Digitais\". Nunca tinha usado um computador sozinha.",
      "\"No primeiro dia fiquei com vergonha de perguntar como se ligava a máquina. Achei que ia ser a única que não sabia nada,\" recorda. Não era. Das 24 participantes da turma, mais de metade estava na mesma situação.",
      "Cinco semanas depois, Rosa já geria o catálogo do seu negócio no WhatsApp Business e respondia a clientes por e-mail. Seis meses depois, voltou à NKENTU — desta vez como voluntária de apoio às novas turmas.",
      "\"Não ensino porque sei tudo. Ensino porque sei exactamente onde é que dói não saber. É mais fácil explicar quando ainda se lembra do medo.\"",
      "Hoje Rosa acompanha duas turmas por semestre e diz que o mercado onde vende continua igual — mas ela já não é a mesma pessoa que entrou na sala em Junho de 2025.",
    ],
    citacaoDestaque: "É mais fácil explicar quando ainda se lembra do medo.",
    data: "2026-07-28",
    destaque: true,
    seo: {
      metaTitle: "Rosa Chindungo — Comecei por aprender. Hoje estou a ensinar. — NKENTU",
      metaDescription:
        "A história de Rosa Chindungo, de participante na formação digital a voluntária de apoio a novas turmas.",
    },
  },
  {
    id: "story-adriana-buta",
    titulo: "A mentora não me deu respostas. Ajudou-me a fazer as perguntas certas.",
    slug: "a-mentora-nao-me-deu-respostas-ajudou-me-a-fazer-as-perguntas-certas",
    nome: "Adriana Buta",
    fotografia: { src: photo("story-adriana", 1200, 1500), alt: "Retrato de Adriana Buta no seu atelier" },
    categoria: "participante",
    resumo:
      "Gere um pequeno atelier de moda em Luanda. Depois de três meses de mentoria, mudou a forma como precifica o próprio trabalho.",
    conteudo: [
      "Adriana Buta abriu o atelier em 2021, sozinha, depois de anos a costurar por encomenda em casa. Em 2026, entrou no Ciclo 2 do Programa de Mentorias em Empreendedorismo emparelhada com uma mentora da área têxtil.",
      "\"O meu maior problema não era costurar. Era cobrar o justo pelo meu trabalho,\" conta. Nos primeiros dois encontros, a mentora não trouxe soluções prontas — trouxe perguntas: quanto custa mesmo uma hora do seu tempo? Quanto do preço final é matéria-prima? Quanto está a perder em encomendas urgentes?",
      "Três meses depois, Adriana reformulou a tabela de preços do atelier. As encomendas não aumentaram — mas a margem, sim.",
      "\"Ninguém me ensinou a fazer contas do negócio na escola. Aprendi sentada numa mesa, com alguém que já tinha passado pelo mesmo.\"",
    ],
    citacaoDestaque: "O meu maior problema não era costurar. Era cobrar o justo pelo meu trabalho.",
    data: "2026-06-14",
    destaque: true,
    seo: {
      metaTitle: "Adriana Buta — Programa de Mentorias — NKENTU",
      metaDescription: "Como três meses de mentoria mudaram a forma como Adriana Buta precifica o seu atelier de moda.",
    },
  },
  {
    id: "story-filomena-sacala",
    titulo: "Aprendi a olhar as pessoas nos olhos quando falo",
    slug: "aprendi-a-olhar-as-pessoas-nos-olhos-quando-falo",
    nome: "Filomena Sacala",
    fotografia: { src: photo("story-filomena", 1200, 1500), alt: "Retrato de Filomena Sacala" },
    categoria: "testemunho",
    resumo:
      "Participou no workshop de comunicação em Março de 2026. Diz que mudou como é tratada nas reuniões de trabalho.",
    conteudo: [
      "Filomena Sacala trabalha há sete anos numa cooperativa agrícola nos arredores de Luanda, mas raramente falava nas reuniões mensais. \"Preparava o que ia dizer, mas quando chegava a vez, ficava com a voz a tremer e desistia,\" explica.",
      "No workshop \"Comunicação para mulheres que querem ocupar espaço\", praticou apresentações filmadas — algo que nunca tinha feito. \"Ver-me a falar foi mais desconfortável do que falar. Mas foi aí que percebi o que estava a fazer mal: falava depressa demais, como quem quer despachar.\"",
      "Hoje, três meses depois, é Filomena quem apresenta os relatórios trimestrais da sua equipa. \"Não fiquei outra pessoa. Só fiquei mais devagar — e isso, sozinho, já muda tudo.\"",
    ],
    citacaoDestaque: "Não fiquei outra pessoa. Só fiquei mais devagar — e isso, sozinho, já muda tudo.",
    data: "2026-04-02",
    seo: {
      metaTitle: "Filomena Sacala — Testemunho — NKENTU",
      metaDescription: "O testemunho de Filomena Sacala sobre o workshop de comunicação da NKENTU.",
    },
  },
  {
    id: "story-esperanca-domingos-perfil",
    titulo: "Quem desenha as formações da NKENTU",
    slug: "quem-desenha-as-formacoes-da-nkentu",
    nome: "Esperança Domingos",
    fotografia: { src: photo("story-esperanca-perfil", 1200, 1500), alt: "Retrato de Esperança Domingos a rever um caderno" },
    categoria: "perfil",
    resumo:
      "Antes de coordenar as formações da NKENTU, geriu programas de alfabetização de adultos na Huíla. Um perfil sobre método e paciência.",
    conteudo: [
      "Esperança Domingos chegou à NKENTU em 2023, depois de sete anos a coordenar programas de alfabetização de adultos em zonas rurais da Huíla. \"Aprendi lá uma coisa que uso todos os dias aqui: ninguém aprende bem com pressa nem com vergonha,\" diz.",
      "É ela quem desenha o currículo de cada formação nova, sempre a partir de conversas directas com potenciais participantes — nunca de um modelo importado. \"Antes de escrever um plano de aulas, pergunto: o que é que estas mulheres já sabem fazer? A formação constrói-se a partir daí, não do zero.\"",
      "O resultado é visível nas taxas de conclusão: as formações desenhadas por Esperança têm, em média, 15 pontos percentuais a mais de participantes que terminam o programa do que a média do sector.",
    ],
    data: "2026-05-19",
    seo: {
      metaTitle: "Esperança Domingos — Perfil — NKENTU",
      metaDescription: "Um perfil sobre Esperança Domingos, Coordenadora de Formações da NKENTU.",
    },
  },
  {
    id: "story-bastidores-feira",
    titulo: "Os bastidores de montar 40 bancas em Luanda",
    slug: "os-bastidores-de-montar-40-bancas-em-luanda",
    nome: "Equipa NKENTU",
    fotografia: { src: photo("story-bastidores-feira", 1200, 1500), alt: "Equipa a montar estruturas de banca antes da feira" },
    categoria: "bastidores",
    resumo: "O que é preciso para pôr de pé, num só dia, a maior feira de participantes da NKENTU.",
    conteudo: [
      "Duas semanas antes da Feira NKENTU 2025, a lista de espera para bancas já tinha 52 nomes para 40 lugares. A equipa passou a última semana a confirmar presenças, distribuir números de banca e imprimir sinalética — tudo isto sem orçamento para uma agência de eventos.",
      "\"Fazemos com o que temos: fita métrica, marcador e muita mensagem de voz no grupo do WhatsApp,\" conta Marta Quiende, responsável por parcerias, que nesse dia também ajudou a montar estruturas.",
      "A montagem começou às 6h da manhã. À 9h, quando a feira abriu ao público, faltavam ainda três bancas — resolvidas em cima da hora, com material emprestado por participantes que já tinham terminado a sua.",
    ],
    data: "2025-12-15",
    seo: {
      metaTitle: "Bastidores da Feira NKENTU — NKENTU",
      metaDescription: "Uma história dos bastidores sobre a organização da Feira NKENTU 2025.",
    },
  },
  {
    id: "story-joaquina-entrevista",
    titulo: "\"Emparelhar bem é mais difícil do que parece\"",
    slug: "emparelhar-bem-e-mais-dificil-do-que-parece",
    nome: "Joaquina Cassinda",
    fotografia: { src: photo("story-joaquina-entrevista", 1200, 1500), alt: "Retrato de Joaquina Cassinda numa entrevista" },
    categoria: "entrevista",
    resumo:
      "Entrevista com a coordenadora do programa de mentorias sobre como decide quem fica com quem.",
    conteudo: [
      "NKENTU: Como decides os pares mentora–participante?",
      "Joaquina Cassinda: Não é só por área de negócio. Faço uma conversa de 30 minutos com cada participante antes de decidir — o que pergunta, como fala do próprio negócio, o que evita dizer. Isso conta tanto quanto o sector.",
      "NKENTU: Já houve pares que não resultaram?",
      "Joaquina: Sim, e não há problema nisso. Se ao fim de duas sessões não está a funcionar, trocamos sem drama. O objectivo é a participante avançar, não cumprir o emparelhamento inicial a qualquer custo.",
      "NKENTU: O que fazem as mentoras que resultam melhor?",
      "Joaquina: Perguntam mais do que respondem. As que chegam já com a solução pronta, normalmente, duram pouco no programa.",
    ],
    data: "2026-03-10",
    seo: {
      metaTitle: "Entrevista com Joaquina Cassinda — NKENTU",
      metaDescription: "Entrevista com a Coordenadora de Mentorias da NKENTU sobre o processo de emparelhamento.",
    },
  },
];

export function getStories(list: Story[] = stories): Story[] {
  return list;
}

export function getStoryBySlug(slug: string, list: Story[] = stories): Story | undefined {
  return list.find((story) => story.slug === slug);
}

export function getFeaturedStories(limit = 3, list: Story[] = stories): Story[] {
  return list.filter((story) => story.destaque).slice(0, limit);
}

export function getTestimonialStories(limit = 5, list: Story[] = stories): Story[] {
  return list.filter((story) => story.citacaoDestaque).slice(0, limit);
}

export function getRelatedStories(current: Story, limit = 3, list: Story[] = stories): Story[] {
  return list
    .filter((story) => story.id !== current.id && story.categoria === current.categoria)
    .slice(0, limit)
    .concat(list.filter((story) => story.id !== current.id && story.categoria !== current.categoria))
    .slice(0, limit);
}

export async function fetchStories(): Promise<Story[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return stories;
  const { data, error } = await supabase.from("stories").select("*").order("data", { ascending: false });
  if (error || !data) return stories;
  return data as Story[];
}

export async function fetchStoryBySlug(slug: string): Promise<Story | undefined> {
  return getStoryBySlug(slug, await fetchStories());
}

export async function fetchFeaturedStories(limit = 3): Promise<Story[]> {
  return getFeaturedStories(limit, await fetchStories());
}

export async function fetchRelatedStories(current: Story, limit = 3): Promise<Story[]> {
  return getRelatedStories(current, limit, await fetchStories());
}

export async function fetchTestimonialStories(limit = 5): Promise<Story[]> {
  return getTestimonialStories(limit, await fetchStories());
}
