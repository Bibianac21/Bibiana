export interface ImageAsset {
  src: string;
  alt: string;
  credito?: string;
}

export interface SeoFields {
  metaTitle: string;
  metaDescription: string;
  ogImage?: string;
}

export type ActivityCategory =
  | "formacao"
  | "workshop"
  | "mentoria"
  | "evento"
  | "programa";

export const ACTIVITY_CATEGORY_LABELS: Record<ActivityCategory, string> = {
  formacao: "Formação",
  workshop: "Workshop",
  mentoria: "Mentoria",
  evento: "Evento",
  programa: "Programa",
};

export type ActivityStatus = "proxima" | "a-decorrer" | "terminada";

export const ACTIVITY_STATUS_LABELS: Record<ActivityStatus, string> = {
  proxima: "Próxima",
  "a-decorrer": "A decorrer",
  terminada: "Terminada",
};

export interface Testemunho {
  nome: string;
  papel?: string;
  texto: string;
}

export interface CallToAction {
  label: string;
  href: string;
}

export interface Activity {
  id: string;
  titulo: string;
  slug: string;
  categoria: ActivityCategory;
  imagemPrincipal: ImageAsset;
  data: string;
  dataFim?: string;
  hora?: string;
  local: string;
  descricaoCurta: string;
  descricaoCompleta: string[];
  estado: ActivityStatus;
  objectivos?: string[];
  publicoAlvo?: string;
  galeria?: ImageAsset[];
  video?: string;
  parceiroIds?: string[];
  resultados?: string[];
  testemunhos?: Testemunho[];
  destaque?: boolean;
  cta?: CallToAction;
  seo: SeoFields;
}

export type StoryCategory =
  | "participante"
  | "testemunho"
  | "entrevista"
  | "perfil"
  | "transformacao"
  | "bastidores";

export const STORY_CATEGORY_LABELS: Record<StoryCategory, string> = {
  participante: "Histórias de participantes",
  testemunho: "Testemunho",
  entrevista: "Entrevista",
  perfil: "Perfil",
  transformacao: "Transformação",
  bastidores: "Bastidores",
};

export interface Story {
  id: string;
  titulo: string;
  slug: string;
  nome: string;
  fotografia: ImageAsset;
  categoria: StoryCategory;
  resumo: string;
  conteudo: string[];
  galeria?: ImageAsset[];
  citacaoDestaque?: string;
  data: string;
  destaque?: boolean;
  seo: SeoFields;
}

export interface Newsletter {
  id: string;
  titulo: string;
  slug: string;
  edicao: number;
  data: string;
  imagem: ImageAsset;
  resumo: string;
  conteudo: string[];
  destaque?: boolean;
  seo: SeoFields;
}

export type GalleryCategory =
  | "actividades"
  | "formacoes"
  | "eventos"
  | "comunidade"
  | "bastidores";

export const GALLERY_CATEGORY_LABELS: Record<GalleryCategory, string> = {
  actividades: "Actividades",
  formacoes: "Formações",
  eventos: "Eventos",
  comunidade: "Comunidade",
  bastidores: "Bastidores",
};

export interface GalleryItem {
  id: string;
  imagem: ImageAsset;
  titulo: string;
  legenda: string;
  categoria: GalleryCategory;
  actividadeSlug?: string;
  data: string;
  tipo: "imagem" | "video";
}

export interface Partner {
  id: string;
  nome: string;
  logotipo: ImageAsset;
  website?: string;
  descricao: string;
}

export interface TeamMember {
  id: string;
  nome: string;
  funcao: string;
  fotografia: ImageAsset;
  biografia: string;
  redesSociais?: CallToAction[];
}

export interface ImpactNumber {
  valor: string;
  label: string;
}
