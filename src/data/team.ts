import { photo } from "../lib/images";
import { getSupabaseClient } from "../lib/supabase";
import type { TeamMember } from "../types/content";

export const team: TeamMember[] = [
  {
    id: "nark-luenzi",
    nome: "Nark Luenzi",
    funcao: "Direcção Geral",
    fotografia: { src: photo("team-nark-luenzi", 800, 1000), alt: "Retrato de Nark Luenzi" },
    biografia: "Lidera a direcção geral da NKENTU, coordenando a visão estratégica e institucional do colectivo.",
  },
  {
    id: "estefania-sousa",
    nome: "Estefânia Sousa",
    funcao: "Produção Executiva",
    fotografia: { src: photo("team-estefania-sousa", 800, 1000), alt: "Retrato de Estefânia Sousa" },
    biografia: "Responsável pela produção executiva das actividades e formações da NKENTU.",
  },
  {
    id: "shandy-morais",
    nome: "Shandy Morais",
    funcao: "Produção Cultural",
    fotografia: { src: photo("team-shandy-morais", 800, 1000), alt: "Retrato de Shandy Morais" },
    biografia: "Responsável pela produção cultural da NKENTU, incluindo o Cine Club Baku ya Diambu.",
  },
  {
    id: "rosana-bernardo",
    nome: "Rosana Bernardo",
    funcao: "Comunicação",
    fotografia: { src: photo("team-rosana-bernardo", 800, 1000), alt: "Retrato de Rosana Bernardo" },
    biografia: "Responsável pela comunicação da NKENTU.",
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
