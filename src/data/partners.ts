import { photo } from "../lib/images";
import { getSupabaseClient } from "../lib/supabase";
import type { Partner } from "../types/content";

export const partners: Partner[] = [
  {
    id: "fundacao-kwanza",
    nome: "Fundação Kwanza",
    logotipo: { src: photo("logo-kwanza", 400, 200), alt: "Logótipo da Fundação Kwanza" },
    website: "https://exemplo.org/fundacao-kwanza",
    descricao:
      "Apoia programas de formação profissional e financia bolsas para participantes com menos recursos.",
  },
  {
    id: "banco-uniao",
    nome: "Banco União",
    logotipo: { src: photo("logo-banco-uniao", 400, 200), alt: "Logótipo do Banco União" },
    website: "https://exemplo.org/banco-uniao",
    descricao: "Parceiro financeiro do programa de mentorias em empreendedorismo.",
  },
  {
    id: "camara-luanda",
    nome: "Câmara Municipal de Luanda",
    logotipo: { src: photo("logo-camara-luanda", 400, 200), alt: "Logótipo da Câmara Municipal de Luanda" },
    descricao: "Cede espaços públicos para workshops e eventos comunitários.",
  },
  {
    id: "instituto-huila",
    nome: "Instituto Huíla Cresce",
    logotipo: { src: photo("logo-huila", 400, 200), alt: "Logótipo do Instituto Huíla Cresce" },
    website: "https://exemplo.org/huila-cresce",
    descricao: "Co-organiza formações técnicas na região sul, em parceria com escolas locais.",
  },
  {
    id: "rede-mulheres-tech",
    nome: "Rede Mulheres em Tech Angola",
    logotipo: { src: photo("logo-mulheres-tech", 400, 200), alt: "Logótipo da Rede Mulheres em Tech Angola" },
    website: "https://exemplo.org/mulheres-tech",
    descricao: "Traz mentoras voluntárias da área de tecnologia para o programa de mentorias.",
  },
  {
    id: "cooperativa-benguela",
    nome: "Cooperativa Benguela Têxtil",
    logotipo: { src: photo("logo-benguela-textil", 400, 200), alt: "Logótipo da Cooperativa Benguela Têxtil" },
    descricao: "Acolhe estágios práticos para participantes da formação em costura e design têxtil.",
  },
];

export function getPartnerById(id: string, list: Partner[] = partners): Partner | undefined {
  return list.find((partner) => partner.id === id);
}

export async function fetchPartners(): Promise<Partner[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return partners;
  const { data, error } = await supabase.from("partners").select("*").order("nome", { ascending: true });
  if (error || !data) return partners;
  return data as Partner[];
}
