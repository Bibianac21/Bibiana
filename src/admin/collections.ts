import type { FieldConfig } from "./fieldTypes";
import {
  ACTIVITY_CATEGORY_LABELS,
  ACTIVITY_STATUS_LABELS,
  STORY_CATEGORY_LABELS,
  GALLERY_CATEGORY_LABELS,
} from "../types/content";

function labelOptions(labels: Record<string, string>) {
  return Object.entries(labels).map(([value, label]) => ({ value, label }));
}

const SEO_FIELDS: FieldConfig[] = [
  { key: "seo.metaTitle", label: "SEO — título", type: "text" },
  { key: "seo.metaDescription", label: "SEO — descrição", type: "textarea" },
  { key: "seo.ogImage", label: "SEO — imagem (opcional)", type: "text", hint: "Por omissão usa a imagem principal." },
];

export const ACTIVITY_FIELDS: FieldConfig[] = [
  { key: "titulo", label: "Título", type: "text", required: true },
  { key: "slug", label: "Slug (URL)", type: "text", required: true, hint: "usado em /actividades/<slug>" },
  { key: "categoria", label: "Categoria", type: "select", options: labelOptions(ACTIVITY_CATEGORY_LABELS) },
  { key: "estado", label: "Estado", type: "select", options: labelOptions(ACTIVITY_STATUS_LABELS) },
  { key: "data", label: "Data", type: "date", required: true },
  { key: "dataFim", label: "Data de fim (opcional)", type: "date" },
  { key: "hora", label: "Hora", type: "text" },
  { key: "local", label: "Local", type: "text", required: true },
  { key: "imagemPrincipal", label: "Imagem principal", type: "image" },
  { key: "descricaoCurta", label: "Descrição curta", type: "textarea", required: true },
  { key: "descricaoCompleta", label: "Descrição completa", type: "lines", hint: "Um parágrafo por linha." },
  { key: "objectivos", label: "Objectivos", type: "lines" },
  { key: "publicoAlvo", label: "Público-alvo", type: "textarea" },
  { key: "resultados", label: "Resultados", type: "lines" },
  {
    key: "testemunhos",
    label: "Testemunhos",
    type: "repeater",
    repeaterFields: [
      { key: "nome", label: "Nome", type: "text" },
      { key: "papel", label: "Papel", type: "text" },
      { key: "texto", label: "Texto", type: "textarea" },
    ],
  },
  { key: "galeria", label: "Galeria de fotos", type: "repeater", repeaterFields: [{ key: "", label: "Foto", type: "image" }] },
  { key: "video", label: "URL de vídeo incorporado (opcional)", type: "text" },
  {
    key: "parceiroIds",
    label: "Parceiros envolvidos",
    type: "lines",
    hint: "Um ID de parceiro por linha (ver a lista em Parceiros).",
  },
  { key: "cta.label", label: "Botão — texto", type: "text" },
  { key: "cta.href", label: "Botão — link", type: "text" },
  { key: "destaque", label: "Actividade em destaque na homepage", type: "boolean" },
  ...SEO_FIELDS,
];

export const STORY_FIELDS: FieldConfig[] = [
  { key: "titulo", label: "Título", type: "text", required: true },
  { key: "slug", label: "Slug (URL)", type: "text", required: true, hint: "usado em /historias/<slug>" },
  { key: "nome", label: "Nome da pessoa", type: "text", required: true },
  { key: "categoria", label: "Categoria", type: "select", options: labelOptions(STORY_CATEGORY_LABELS) },
  { key: "data", label: "Data", type: "date", required: true },
  { key: "fotografia", label: "Fotografia", type: "image" },
  { key: "resumo", label: "Resumo", type: "textarea", required: true },
  { key: "conteudo", label: "Conteúdo", type: "lines", hint: "Um parágrafo por linha." },
  { key: "citacaoDestaque", label: "Citação em destaque", type: "textarea" },
  { key: "galeria", label: "Galeria", type: "repeater", repeaterFields: [{ key: "", label: "Foto", type: "image" }] },
  { key: "destaque", label: "História em destaque na homepage", type: "boolean" },
  ...SEO_FIELDS,
];

export const NEWSLETTER_FIELDS: FieldConfig[] = [
  { key: "titulo", label: "Título", type: "text", required: true },
  { key: "slug", label: "Slug (URL)", type: "text", required: true, hint: "usado em /newsletter/<slug>" },
  { key: "edicao", label: "Número da edição", type: "number", required: true },
  { key: "data", label: "Data", type: "date", required: true },
  { key: "imagem", label: "Imagem", type: "image" },
  { key: "resumo", label: "Resumo", type: "textarea", required: true },
  { key: "conteudo", label: "Conteúdo", type: "lines", hint: "Um parágrafo por linha." },
  { key: "galeria", label: "Galeria de fotos", type: "repeater", repeaterFields: [{ key: "", label: "Foto", type: "image" }] },
  { key: "destaque", label: "Newsletter em destaque na homepage", type: "boolean" },
  ...SEO_FIELDS,
];

export const GALLERY_ITEM_FIELDS: FieldConfig[] = [
  { key: "titulo", label: "Título", type: "text", required: true },
  { key: "legenda", label: "Legenda", type: "textarea", required: true },
  { key: "categoria", label: "Categoria", type: "select", options: labelOptions(GALLERY_CATEGORY_LABELS) },
  {
    key: "tipo",
    label: "Tipo",
    type: "select",
    options: [
      { value: "imagem", label: "Imagem" },
      { value: "video", label: "Vídeo" },
    ],
  },
  { key: "data", label: "Data", type: "date", required: true },
  { key: "imagem", label: "Imagem", type: "image" },
  { key: "actividadeSlug", label: "Slug da actividade relacionada (opcional)", type: "text" },
];

export const PARTNER_FIELDS: FieldConfig[] = [
  { key: "nome", label: "Nome", type: "text", required: true },
  { key: "logotipo", label: "Logótipo", type: "image" },
  { key: "website", label: "Website", type: "text" },
  { key: "descricao", label: "Descrição", type: "textarea", required: true },
];

export const SITE_SETTINGS_FIELDS: FieldConfig[] = [
  { key: "logo", label: "Logótipo (cabeçalho do site)", type: "image", hint: "Sem imagem, o cabeçalho mostra o nome NKENTU em texto." },
  { key: "hero.headline", label: "Hero — título", type: "textarea", required: true },
  { key: "hero.subheadline", label: "Hero — subtítulo", type: "textarea" },
  { key: "hero.imagem", label: "Hero — imagem", type: "image" },
  { key: "hero.ctaPrimaria.label", label: "Hero — botão principal (texto)", type: "text" },
  { key: "hero.ctaPrimaria.href", label: "Hero — botão principal (link)", type: "text" },
  { key: "hero.ctaSecundaria.label", label: "Hero — botão secundário (texto)", type: "text" },
  { key: "hero.ctaSecundaria.href", label: "Hero — botão secundário (link)", type: "text" },
  { key: "impacto.intro", label: "Impacto — frase de abertura", type: "textarea" },
  {
    key: "impacto.numeros",
    label: "Impacto — números (homepage)",
    type: "repeater",
    repeaterFields: [
      { key: "valor", label: "Número", type: "text" },
      { key: "label", label: "Legenda", type: "text" },
    ],
  },
  {
    key: "sobreNumeros",
    label: "Números (página Sobre)",
    type: "repeater",
    repeaterFields: [
      { key: "valor", label: "Número", type: "text" },
      { key: "label", label: "Legenda", type: "text" },
    ],
  },
  {
    key: "participar",
    label: "Formas de participar (CTA final)",
    type: "repeater",
    repeaterFields: [
      { key: "titulo", label: "Título", type: "text" },
      { key: "descricao", label: "Descrição", type: "textarea" },
      { key: "cta.label", label: "Botão — texto", type: "text" },
      { key: "cta.href", label: "Botão — link", type: "text" },
    ],
  },
  { key: "contacto.email", label: "Contacto — email", type: "text" },
  { key: "contacto.telefone", label: "Contacto — telefone", type: "text" },
  { key: "contacto.endereco", label: "Contacto — endereço", type: "text" },
  {
    key: "contacto.redesSociais",
    label: "Redes sociais",
    type: "repeater",
    repeaterFields: [
      { key: "label", label: "Rede", type: "text" },
      { key: "href", label: "Link", type: "text" },
    ],
  },
  { key: "sobre.quemE", label: "Sobre — quem é a NKENTU", type: "textarea" },
  { key: "sobre.missao", label: "Sobre — missão", type: "textarea" },
  { key: "sobre.oQueFazemos", label: "Sobre — o que fazemos", type: "lines" },
  { key: "sobre.comoTrabalhamos", label: "Sobre — como trabalhamos", type: "textarea" },
  { key: "sobre.comunidade", label: "Sobre — a nossa comunidade", type: "textarea" },
];

export const TEAM_MEMBER_FIELDS: FieldConfig[] = [
  { key: "nome", label: "Nome", type: "text", required: true },
  { key: "funcao", label: "Função", type: "text", required: true },
  { key: "fotografia", label: "Fotografia", type: "image" },
  { key: "biografia", label: "Biografia", type: "textarea", required: true },
  {
    key: "redesSociais",
    label: "Redes sociais",
    type: "repeater",
    repeaterFields: [
      { key: "label", label: "Rede", type: "text" },
      { key: "href", label: "Link", type: "text" },
    ],
  },
];
