import { photo } from "../lib/images";
import { getSupabaseClient } from "../lib/supabase";
import type { TeamMember } from "../types/content";

export const team: TeamMember[] = [
  {
    id: "bianca-neto",
    nome: "Bianca Neto",
    funcao: "Fundadora e Directora",
    fotografia: { src: photo("team-bianca", 800, 1000), alt: "Retrato de Bianca Neto" },
    biografia:
      "Começou a NKENTU em 2022 depois de facilitar workshops informais de costura no bairro onde cresceu, em Luanda. Acredita que capacitação séria não precisa de discurso inflado — precisa de sala cheia e continuidade.",
    redesSociais: [{ label: "LinkedIn", href: "https://linkedin.com/in/exemplo" }],
  },
  {
    id: "esperanca-domingos",
    nome: "Esperança Domingos",
    funcao: "Coordenadora de Formações",
    fotografia: { src: photo("team-esperanca", 800, 1000), alt: "Retrato de Esperança Domingos" },
    biografia:
      "Desenha os currículos de todas as formações da NKENTU e mantém contacto directo com as facilitadoras. Antes de entrar para a equipa, geriu programas de alfabetização de adultos na Huíla.",
  },
  {
    id: "joaquina-cassinda",
    nome: "Joaquina Cassinda",
    funcao: "Coordenadora de Mentorias",
    fotografia: { src: photo("team-joaquina", 800, 1000), alt: "Retrato de Joaquina Cassinda" },
    biografia:
      "Combina participantes com mentoras de acordo com objectivos concretos, não apenas área profissional. Trabalhou dez anos em recursos humanos antes de se dedicar ao projecto a tempo inteiro.",
  },
  {
    id: "irina-satula",
    nome: "Irina Satula",
    funcao: "Comunicação e Conteúdo",
    fotografia: { src: photo("team-irina", 800, 1000), alt: "Retrato de Irina Satula" },
    biografia:
      "Documenta as actividades, escreve as histórias e mantém a newsletter. Formada em Jornalismo, prefere gravar uma conversa longa a escrever um comunicado curto.",
    redesSociais: [{ label: "Instagram", href: "https://instagram.com/exemplo" }],
  },
  {
    id: "marta-quiende",
    nome: "Marta Quiende",
    funcao: "Gestão de Parcerias",
    fotografia: { src: photo("team-marta", 800, 1000), alt: "Retrato de Marta Quiende" },
    biografia:
      "Negoceia espaços, materiais e apoios com instituições e empresas. Já trabalhou em Luanda, Lobito e Lubango, sempre em projectos de base comunitária.",
  },
  {
    id: "sandra-bumba",
    nome: "Sandra Bumba",
    funcao: "Voluntária Sénior — Finanças Pessoais",
    fotografia: { src: photo("team-sandra", 800, 1000), alt: "Retrato de Sandra Bumba" },
    biografia:
      "Contabilista de profissão, dá formações voluntárias sobre orçamento e poupança desde a primeira edição do programa.",
  },
];

export function getTeamMemberById(id: string, list: TeamMember[] = team): TeamMember | undefined {
  return list.find((member) => member.id === id);
}

export async function fetchTeam(): Promise<TeamMember[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return team;
  const { data, error } = await supabase.from("team_members").select("*").order("nome", { ascending: true });
  if (error || !data) return team;
  return data as TeamMember[];
}
