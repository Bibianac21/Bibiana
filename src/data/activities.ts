import { photo } from "../lib/images";
import { getSupabaseClient } from "../lib/supabase";
import type { Activity } from "../types/content";

export const activities: Activity[] = [
  {
    id: "act-comunicacao-espaco",
    titulo: "Comunicação para mulheres que querem ocupar espaço",
    slug: "comunicacao-para-mulheres-que-querem-ocupar-espaco",
    categoria: "workshop",
    imagemPrincipal: {
      src: photo("act-comunicacao", 1600, 1000),
      alt: "Grupo de mulheres sentadas em círculo durante um workshop de comunicação",
    },
    data: "2026-09-15",
    hora: "14h00 — 17h30",
    local: "Centro Comunitário do Rangel, Luanda",
    descricaoCurta:
      "Uma sessão prática sobre comunicação, presença e construção de confiança para falar em público e em reuniões de trabalho.",
    descricaoCompleta: [
      "Falar numa reunião, negociar um preço, apresentar uma ideia a um investidor — todas estas situações pedem uma coisa que raramente se ensina: presença. Este workshop trabalha comunicação verbal e não-verbal a partir de casos concretos trazidos pelas próprias participantes.",
      "A sessão é dividida em três blocos: leitura de sala e postura, construção de argumento, e prática filmada com feedback em grupo. Não há teoria sem exercício — cada participante sai com pelo menos duas gravações próprias para rever em casa.",
    ],
    estado: "proxima",
    objectivos: [
      "Identificar padrões pessoais de comunicação em situações de pressão",
      "Praticar argumentação clara e directa",
      "Ganhar confiança para falar em reuniões, entrevistas e negociações",
    ],
    publicoAlvo: "Mulheres a partir dos 18 anos, sem experiência prévia necessária. Vagas limitadas a 25 participantes.",
    galeria: [
      { src: photo("act-comunicacao-2", 1200, 900), alt: "Participante a apresentar-se diante do grupo" },
      { src: photo("act-comunicacao-3", 1200, 900), alt: "Facilitadora a anotar feedback num quadro branco" },
    ],
    parceiroIds: ["camara-luanda"],
    testemunhos: [
      {
        nome: "Filomena Sacala",
        papel: "Participante da edição de Março 2026",
        texto: "Saí a falar mais devagar e a olhar as pessoas nos olhos. Parece pouco, mas mudou como sou tratada nas reuniões.",
      },
    ],
    destaque: true,
    cta: { label: "Inscrever-me", href: "/contacto" },
    seo: {
      metaTitle: "Comunicação para mulheres que querem ocupar espaço — NKENTU",
      metaDescription:
        "Workshop prático de comunicação, presença e confiança. 15 de Setembro de 2026, Luanda.",
    },
  },
  {
    id: "act-costura-design",
    titulo: "Costura e Design Têxtil — Turma 5",
    slug: "costura-e-design-textil-turma-5",
    categoria: "formacao",
    imagemPrincipal: {
      src: photo("act-costura", 1600, 1000),
      alt: "Mulher a trabalhar numa máquina de costura numa oficina",
    },
    data: "2026-10-05",
    dataFim: "2026-10-30",
    hora: "Terças e Quintas, 09h00 — 12h00",
    local: "Oficina NKENTU, Benguela",
    descricaoCurta:
      "Quatro semanas de formação prática em costura e desenvolvimento de peça própria, com estágio na Cooperativa Benguela Têxtil.",
    descricaoCompleta: [
      "A turma 5 volta ao formato que funcionou nas edições anteriores: aulas práticas todas as semanas, uma peça própria desenvolvida do risco ao acabamento, e duas semanas de estágio numa oficina parceira.",
      "As formadoras são costureiras profissionais da região, o que significa que o que se ensina é o que se usa no mercado — não um currículo genérico. No final, cada participante sai com um portefólio de três peças e uma carta de recomendação.",
    ],
    estado: "proxima",
    objectivos: [
      "Dominar técnicas base de corte e costura",
      "Desenvolver uma peça própria do desenho ao produto final",
      "Ganhar experiência prática de oficina através do estágio",
    ],
    publicoAlvo: "Mulheres residentes em Benguela e arredores, sem experiência prévia obrigatória. 15 vagas.",
    galeria: [
      { src: photo("act-costura-2", 1200, 900), alt: "Rolos de tecido organizados numa prateleira" },
      { src: photo("act-costura-3", 1200, 900), alt: "Participante a medir tecido com uma fita métrica" },
      { src: photo("act-costura-4", 1200, 900), alt: "Peças finalizadas expostas numa mesa" },
    ],
    parceiroIds: ["cooperativa-benguela"],
    cta: { label: "Ver condições de inscrição", href: "/contacto" },
    seo: {
      metaTitle: "Costura e Design Têxtil — Turma 5 — NKENTU",
      metaDescription:
        "Formação prática de quatro semanas em costura e design têxtil, com estágio incluído. Benguela, Outubro de 2026.",
    },
  },
  {
    id: "act-mentorias-empreendedorismo",
    titulo: "Programa de Mentorias em Empreendedorismo — Ciclo 3",
    slug: "mentorias-em-empreendedorismo-ciclo-3",
    categoria: "mentoria",
    imagemPrincipal: {
      src: photo("act-mentorias", 1600, 1000),
      alt: "Duas mulheres sentadas à mesa a rever um caderno de anotações",
    },
    data: "2026-09-01",
    dataFim: "2026-12-01",
    hora: "Encontros quinzenais",
    local: "Luanda (presencial e online)",
    descricaoCurta:
      "Três meses de acompanhamento individual entre participantes que gerem pequenos negócios e mentoras da área.",
    descricaoCompleta: [
      "Cada participante é emparelhada com uma mentora com experiência directa na sua área de negócio — comércio, serviços, produção artesanal ou tecnologia. Os encontros são quinzenais e seguem um plano definido nas primeiras duas sessões, com metas revistas a cada mês.",
      "O ciclo 3 conta com 18 mentoras, recrutadas através da Rede Mulheres em Tech Angola e da rede de antigas participantes da NKENTU.",
    ],
    estado: "a-decorrer",
    objectivos: [
      "Apoiar a resolução de problemas concretos de gestão do negócio",
      "Criar plano de crescimento realista a três meses",
      "Ligar participantes a uma rede de contacto profissional duradoura",
    ],
    publicoAlvo: "Mulheres com negócio próprio activo há pelo menos seis meses.",
    parceiroIds: ["rede-mulheres-tech", "banco-uniao"],
    resultados: [
      "18 pares mentora–participante activos",
      "Taxa de conclusão da edição anterior: 89%",
    ],
    testemunhos: [
      {
        nome: "Adriana Buta",
        papel: "Participante, Ciclo 2",
        texto: "A minha mentora não me deu respostas prontas. Ajudou-me a fazer as perguntas certas sobre o meu próprio negócio.",
      },
    ],
    cta: { label: "Saber mais sobre o próximo ciclo", href: "/contacto" },
    seo: {
      metaTitle: "Mentorias em Empreendedorismo — Ciclo 3 — NKENTU",
      metaDescription:
        "Três meses de mentoria individual para mulheres empreendedoras. A decorrer em Luanda até Dezembro de 2026.",
    },
  },
  {
    id: "act-feira-vitrine",
    titulo: "Feira NKENTU: Vitrine de Negócios de Mulheres",
    slug: "feira-nkentu-vitrine-de-negocios-de-mulheres",
    categoria: "evento",
    imagemPrincipal: {
      src: photo("act-feira", 1600, 1000),
      alt: "Bancas de feira com produtos artesanais expostos ao ar livre",
    },
    data: "2026-11-22",
    hora: "09h00 — 18h00",
    local: "Praça da Independência, Luanda",
    descricaoCurta:
      "Um dia inteiro dedicado a expor e vender produtos e serviços de participantes e antigas participantes da NKENTU.",
    descricaoCompleta: [
      "A feira reúne mais de 40 bancas de participantes actuais e antigas — moda, gastronomia, cosmética artesanal, serviços digitais. É também o momento em que mentoras, formadoras e participantes de diferentes edições se encontram fora das salas de aula.",
      "Entrada livre para o público. Inscrição de banca gratuita para participantes da NKENTU, sujeita a disponibilidade de espaço.",
    ],
    estado: "proxima",
    publicoAlvo: "Aberto ao público. Bancas reservadas a participantes e antigas participantes da NKENTU.",
    galeria: [
      { src: photo("act-feira-2", 1200, 900), alt: "Visitantes a percorrer as bancas da feira" },
      { src: photo("act-feira-3", 1200, 900), alt: "Produtos artesanais em exposição numa banca" },
    ],
    parceiroIds: ["camara-luanda", "fundacao-kwanza"],
    cta: { label: "Reservar banca", href: "/contacto" },
    seo: {
      metaTitle: "Feira NKENTU 2026 — Vitrine de Negócios de Mulheres",
      metaDescription:
        "Feira de um dia com mais de 40 bancas de participantes da NKENTU. 22 de Novembro, Praça da Independência, Luanda.",
    },
  },
  {
    id: "act-programa-raizes",
    titulo: "Programa Raízes — Literacia Financeira",
    slug: "programa-raizes-literacia-financeira",
    categoria: "programa",
    imagemPrincipal: {
      src: photo("act-raizes", 1600, 1000),
      alt: "Mulher a preencher um caderno de contas numa mesa de madeira",
    },
    data: "2026-08-10",
    dataFim: "2026-09-10",
    hora: "Sábados, 09h00 — 11h00",
    local: "Centro Cultural do Lubango, Huíla",
    descricaoCurta:
      "Um mês de sessões práticas sobre orçamento familiar, poupança e primeiros passos na formalização de um pequeno negócio.",
    descricaoCompleta: [
      "O Raízes nasceu de um pedido recorrente das participantes de formações anteriores: entender melhor para onde vai o dinheiro do negócio, e como separar contas pessoais das contas do negócio.",
      "As sessões são conduzidas pela voluntária Sandra Bumba, contabilista, com exercícios feitos com números reais trazidos pelas próprias participantes — sem fórmulas abstractas.",
    ],
    estado: "a-decorrer",
    objectivos: [
      "Construir um orçamento mensal realista",
      "Separar finanças pessoais e do negócio",
      "Perceber os primeiros passos para formalizar um pequeno negócio",
    ],
    publicoAlvo: "Mulheres da região da Huíla com ou sem negócio próprio.",
    parceiroIds: ["instituto-huila"],
    resultados: ["32 participantes inscritas na edição actual"],
    cta: { label: "Perguntar sobre a próxima edição", href: "/contacto" },
    seo: {
      metaTitle: "Programa Raízes — Literacia Financeira — NKENTU",
      metaDescription:
        "Um mês de sessões práticas sobre orçamento, poupança e formalização de negócio. Lubango, até Setembro de 2026.",
    },
  },
  {
    id: "act-fotografia-telemovel",
    titulo: "Fotografia com Telemóvel para Pequenos Negócios",
    slug: "fotografia-com-telemovel-para-pequenos-negocios",
    categoria: "workshop",
    imagemPrincipal: {
      src: photo("act-fotografia", 1600, 1000),
      alt: "Mulher a fotografar produtos artesanais com um telemóvel",
    },
    data: "2026-09-03",
    hora: "14h00 — 17h00",
    local: "Centro Comunitário do Rangel, Luanda",
    descricaoCurta:
      "Como fotografar produtos e serviços com o telemóvel para vender melhor nas redes sociais, sem equipamento caro.",
    descricaoCompleta: [
      "A maioria dos negócios das participantes vende através do WhatsApp e do Instagram. Este workshop foca-se só nisso: luz, enquadramento e edição simples para fotografias que vendem, feitas com o telemóvel que já se tem.",
      "As participantes trazem os seus próprios produtos e saem com um pequeno catálogo de fotografias prontas a publicar.",
    ],
    estado: "proxima",
    objectivos: [
      "Usar luz natural para fotografar produtos",
      "Aplicar edição básica com aplicações gratuitas",
      "Montar um pequeno catálogo de fotografias para redes sociais",
    ],
    publicoAlvo: "Mulheres com negócio próprio, qualquer área. Trazer telemóvel e três produtos.",
    cta: { label: "Inscrever-me", href: "/contacto" },
    seo: {
      metaTitle: "Fotografia com Telemóvel para Pequenos Negócios — NKENTU",
      metaDescription:
        "Workshop prático de fotografia de produtos com telemóvel. 3 de Setembro de 2026, Luanda.",
    },
  },
  {
    id: "act-ferramentas-digitais",
    titulo: "Introdução ao Computador e Ferramentas Digitais",
    slug: "introducao-ao-computador-e-ferramentas-digitais",
    categoria: "formacao",
    imagemPrincipal: {
      src: photo("act-digital", 1600, 1000),
      alt: "Mulheres sentadas em frente a computadores numa sala de formação",
    },
    data: "2026-06-15",
    dataFim: "2026-07-20",
    hora: "Segundas e Quartas, 15h00 — 17h00",
    local: "Biblioteca Municipal, Luanda",
    descricaoCurta:
      "Cinco semanas de formação em uso básico de computador, WhatsApp Business, folhas de cálculo e e-mail profissional.",
    descricaoCompleta: [
      "Muitas participantes chegam a esta formação a usar apenas o telemóvel. O objectivo é dar autonomia real: abrir e responder a um e-mail profissional, preencher uma folha de cálculo simples, configurar um catálogo no WhatsApp Business.",
      "A turma de Junho a Julho de 2026 concluiu com 22 das 24 inscritas a terminar o programa.",
    ],
    estado: "terminada",
    objectivos: [
      "Usar computador com autonomia para tarefas do dia a dia",
      "Configurar e gerir um catálogo no WhatsApp Business",
      "Criar e organizar uma folha de cálculo simples",
    ],
    publicoAlvo: "Mulheres sem experiência prévia com computador.",
    resultados: [
      "22 participantes concluíram o programa",
      "18 configuraram catálogo no WhatsApp Business durante o curso",
    ],
    testemunhos: [
      {
        nome: "Rosa Chindungo",
        papel: "Participante",
        texto: "Nunca tinha mandado um e-mail sozinha. Agora respondo aos meus fornecedores sem pedir ajuda a ninguém.",
      },
    ],
    seo: {
      metaTitle: "Introdução ao Computador e Ferramentas Digitais — NKENTU",
      metaDescription:
        "Formação concluída de cinco semanas em ferramentas digitais para pequenos negócios. Luanda, Junho–Julho de 2026.",
    },
  },
  {
    id: "act-encontro-anual-2025",
    titulo: "Encontro Anual NKENTU 2025",
    slug: "encontro-anual-nkentu-2025",
    categoria: "evento",
    imagemPrincipal: {
      src: photo("act-encontro-anual", 1600, 1000),
      alt: "Grande grupo de mulheres reunidas num auditório, aplaudindo",
    },
    data: "2025-12-12",
    hora: "10h00 — 16h00",
    local: "Auditório da Câmara Municipal de Luanda",
    descricaoCurta:
      "O encontro que reuniu mais de 200 participantes, mentoras e parceiras para fechar o ano com histórias, música e reconhecimento.",
    descricaoCompleta: [
      "O Encontro Anual é o único evento que junta participantes de todas as formações, workshops e programas de mentoria do ano. Em 2025, teve painéis com antigas participantes, actuação de um grupo de música local e entrega de certificados a 94 mulheres.",
    ],
    estado: "terminada",
    resultados: [
      "Mais de 200 pessoas presentes",
      "94 certificados entregues",
      "6 antigas participantes em painel",
    ],
    parceiroIds: ["camara-luanda", "fundacao-kwanza"],
    galeria: [
      { src: photo("act-encontro-2", 1200, 900), alt: "Entrega de certificados no palco" },
      { src: photo("act-encontro-3", 1200, 900), alt: "Grupo de música a actuar" },
    ],
    seo: {
      metaTitle: "Encontro Anual NKENTU 2025",
      metaDescription:
        "Retrospectiva do Encontro Anual NKENTU 2025, com mais de 200 participantes em Luanda.",
    },
  },
];

export function getActivities(list: Activity[] = activities): Activity[] {
  return list;
}

export function getActivityBySlug(slug: string, list: Activity[] = activities): Activity | undefined {
  return list.find((activity) => activity.slug === slug);
}

export function getFeaturedActivity(list: Activity[] = activities): Activity | undefined {
  return list.find((activity) => activity.destaque) ?? list[0];
}

export function getUpcomingActivities(limit?: number, list: Activity[] = activities): Activity[] {
  const upcoming = list
    .filter((activity) => activity.estado !== "terminada")
    .sort((a, b) => a.data.localeCompare(b.data));
  return typeof limit === "number" ? upcoming.slice(0, limit) : upcoming;
}

export function getRelatedActivities(current: Activity, limit = 3, list: Activity[] = activities): Activity[] {
  return list
    .filter((activity) => activity.id !== current.id && activity.categoria === current.categoria)
    .slice(0, limit)
    .concat(list.filter((activity) => activity.id !== current.id && activity.categoria !== current.categoria))
    .slice(0, limit);
}

/**
 * Live-data counterparts: read from Supabase when configured, falling
 * back to the mock `activities` array when it isn't (or the query fails)
 * so the public site keeps working without a backend attached.
 */
export async function fetchActivities(): Promise<Activity[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return activities;
  const { data, error } = await supabase.from("activities").select("*").order("data", { ascending: true });
  if (error || !data) return activities;
  return data as Activity[];
}

export async function fetchActivityBySlug(slug: string): Promise<Activity | undefined> {
  return getActivityBySlug(slug, await fetchActivities());
}

export async function fetchFeaturedActivity(): Promise<Activity | undefined> {
  return getFeaturedActivity(await fetchActivities());
}

export async function fetchUpcomingActivities(limit?: number): Promise<Activity[]> {
  return getUpcomingActivities(limit, await fetchActivities());
}

export async function fetchRelatedActivities(current: Activity, limit = 3): Promise<Activity[]> {
  return getRelatedActivities(current, limit, await fetchActivities());
}
