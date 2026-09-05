import { getSupabaseClient } from "../lib/supabase";
import type { Partner } from "../types/content";

// Parceiros reais da NKENTU, a partir do brand board oficial. As descrições
// abaixo são provisórias — ajusta-as em /admin/parceiros conforme o texto
// que preferires para cada parceria.
export const partners: Partner[] = [
  {
    id: "goethe-institut",
    nome: "Goethe-Institut",
    logotipo: { src: "/brand/partners/goethe-institut.jpg", alt: "Logótipo do Goethe-Institut" },
    website: "https://www.goethe.de/ins/ao/pt/index.html",
    descricao: "Parceiro dos ciclos de cinema e conversa e das oficinas criativas da NKENTU em Luanda.",
  },
  {
    id: "rompe",
    nome: "ROMPE",
    logotipo: { src: "/brand/partners/rompe.jpg", alt: "Logótipo da ROMPE" },
    descricao: "Parceiro criativo da NKENTU.",
  },
  {
    id: "ondjango-feminista",
    nome: "Ondjango Feminista",
    logotipo: { src: "/brand/partners/ondjango-feminista.jpg", alt: "Logótipo da Ondjango Feminista" },
    descricao: "Parceiro em iniciativas feministas e de capacitação de mulheres.",
  },
  {
    id: "unu",
    nome: "UNU",
    logotipo: { src: "/brand/partners/unu.png", alt: "Logótipo da UNU" },
    descricao: "Parceiro da NKENTU.",
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
