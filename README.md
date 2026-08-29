# NKENTU — website

Protótipo funcional do website da NKENTU, um projecto social angolano dedicado
à capacitação e desenvolvimento de mulheres. Plataforma editorial (não
institucional): hub de actividades, histórias, galeria e newsletter, pensado
para crescer continuamente.

## Stack

- **React 19 + TypeScript** (Vite)
- **React Router 6** — routing client-side
- **Tailwind CSS 3** — sistema de design (tokens em `tailwind.config.js`)
- **@supabase/supabase-js** — base de dados, Storage e autenticação para o site público e para `/admin` (ver "CMS / Supabase" abaixo); o site funciona com dados fictícios enquanto não estiver ligado a um projecto real

## Correr o projecto

```bash
npm install
npm run dev       # servidor de desenvolvimento
npm run build     # build de produção (tsc -b && vite build)
npm run preview   # pré-visualizar o build
```

## Arquitectura de informação

```
src/
  types/content.ts     Tipos de conteúdo (Activity, Story, Newsletter, GalleryItem, Partner, TeamMember, ...)
  data/                 "CMS" actual: um ficheiro por colecção, com dados fictícios mas realistas
    activities.ts        + getActivities/getActivityBySlug/getFeaturedActivity/getUpcomingActivities/getRelatedActivities
    stories.ts            + getStories/getStoryBySlug/getFeaturedStories/getRelatedStories
    newsletters.ts        + getNewsletters/getNewsletterBySlug/getLatestNewsletter
    gallery.ts             + getGalleryItems
    partners.ts             + getPartnerById
    team.ts
    site.ts               conteúdo editável da homepage/sobre (hero, números de impacto, secções "participar", contacto)
  lib/
    supabase.ts           cliente Supabase preguiçoso + subscribeToNewsletter/sendContactMessage
    adminDb.ts             CRUD genérico contra o Supabase (list/get/upsert/delete/upload) usado por /admin
    useLiveData.ts          hook: mostra o valor fictício de imediato, troca para o fetch* quando resolve
    images.ts             placeholder de fotografia (ver secção "Fotografia" abaixo)
    format.ts             formatação de datas em português e slugify
  admin/                  infra do painel de administração (auth, layout, formulários/listas genéricos, configuração de campos por colecção em collections.ts)
  components/            componentes de UI partilhados (cards, secções, filtros, lightbox, formulários)
  pages/                  uma página por rota
  pages/admin/            páginas do painel de administração (login + lista/formulário por colecção)
  App.tsx                 layout (Header/Footer) + definição de rotas (públicas e /admin)
supabase/
  migrations/0001_init.sql  esquema, RLS e bucket de Storage
scripts/seed.ts            popula o Supabase com o conteúdo fictício deste protótipo (npm run seed)
```

Todas as páginas leem conteúdo através das funções de `src/data/*.ts` — nunca
directamente dos arrays. Isto significa que trocar os dados fictícios por uma
base de dados real (Supabase) implica **apenas reescrever essas funções**,
sem tocar em nenhuma página ou componente.

## Rotas

| Rota | Página |
|---|---|
| `/` | Home (hero, "está a acontecer", actividade em destaque, impacto, histórias, newsletter, parceiros, CTA final) |
| `/actividades` | Arquivo de actividades, com filtros por categoria |
| `/actividades/:slug` | Página individual de actividade |
| `/historias` | Arquivo de histórias, com filtros por categoria |
| `/historias/:slug` | Página individual de história |
| `/galeria` | Galeria com filtros e lightbox |
| `/newsletter` | Formulário de subscrição + arquivo de edições |
| `/newsletter/:slug` | Edição individual |
| `/sobre` | Missão, o que fazemos, números, equipa, parceiros |
| `/contacto` | Formulário de contacto + informação directa |
| `*` | 404 |
| `/admin/entrar` | Login da administração (Supabase Auth) |
| `/admin` | Painel de administração — ver "CMS / Supabase" |

## CMS / Supabase

Cada interface em `src/types/content.ts` corresponde a uma tabela Supabase
(`activities`, `stories`, `newsletters`, `gallery_items`, `partners`,
`team_members`, mais um `site_settings` singleton para a homepage/Sobre) —
ver `supabase/migrations/0001_init.sql`. Campos aninhados (imagens,
parágrafos, testemunhos, SEO) ficam em colunas `jsonb` cujas chaves
coincidem com as dos tipos TypeScript, para que uma linha da base de dados
seja quase directamente o objecto que a página espera.

**Camada de dados com fallback automático.** Cada ficheiro em `src/data/*.ts`
exporta duas versões de cada leitura:
- `get*()` — síncrona, lê o array fictício local (usada como valor inicial,
  sem flash de carregamento);
- `fetch*()` — assíncrona, lê do Supabase quando `isSupabaseConfigured()` é
  verdadeiro, caindo de volta para os dados fictícios se não estiver
  configurado ou se a query falhar.

As páginas usam ambas através do hook `useLiveData` (`src/lib/useLiveData.ts`):
mostram o conteúdo fictício de imediato e trocam para o conteúdo real assim
que a leitura ao Supabase resolve. Isto significa que o site público **já
lê da base de dados** sempre que uma estiver ligada — não é preciso alterar
mais nada quando o Supabase for configurado.

**Área de administração em `/admin`.** Protegida por Supabase Auth (sem
registo público — contas criadas à mão no painel do Supabase), permite
criar, editar e eliminar actividades, histórias, newsletters, itens de
galeria, parceiros e membros da equipa, fazer upload de fotografias para o
Storage, escolher destaques, e editar o conteúdo da homepage e da página
Sobre (hero, números de impacto, secções "participar", contacto). Ver
`src/admin/` (infra genérica de formulários/listas orientada a
configuração de campos, em `collections.ts`) e `src/pages/admin/`.

### Activar o Supabase

1. Criar um projecto em [supabase.com](https://supabase.com).
2. Correr `supabase/migrations/0001_init.sql` no SQL editor do projecto
   (cria tabelas, RLS e o bucket de Storage `nkentu-media`).
3. Copiar `.env.example` para `.env` e preencher com os valores do projecto
   (Project Settings → API).
4. `npm run seed` — popula a base de dados com o mesmo conteúdo fictício
   deste protótipo, lido directamente de `src/data/*.ts` (precisa de
   `SUPABASE_SERVICE_ROLE_KEY` no `.env`, só usada por este script local).
5. Em Authentication → Users no painel do Supabase, criar manualmente a
   conta da pessoa responsável pelo projecto — é essa conta que faz login
   em `/admin/entrar`.
6. Definir `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` (nunca a service
   role key) também no ambiente de produção (por exemplo, Vercel → Project
   Settings → Environment Variables) e voltar a fazer deploy.

Sem estas variáveis definidas, tanto o site público como `/admin` continuam
a funcionar — o público mostra os dados fictícios, e `/admin` mostra um
ecrã a explicar os passos acima em vez do formulário de login.

### Limitações conhecidas do `/admin` actual

- A relação entre uma actividade e os seus parceiros (`parceiroIds`) é um
  campo de texto (um ID de parceiro por linha), não um selector — é preciso
  copiar o ID a partir da lista de Parceiros.
- Sem upload de vídeo: o campo `video` de uma actividade aceita apenas uma
  URL de embed (iframe), e a galeria não reproduz vídeo — um item marcado
  `tipo: "video"` mostra apenas uma imagem estática.

## Fotografia

O pedido é explícito quanto a evitar fotografia de stock corporativa — e
também quanto a não usar fotografias de pessoas reais e desconhecidas como
se fossem participantes fictícias da NKENTU. Este protótipo não teve acesso
a uma biblioteca de fotografia documental real, por isso `src/lib/images.ts`
gera, localmente e sem qualquer pedido de rede, um placeholder abstracto em
SVG (gradiente + formas, na paleta do site) como `data:image/svg+xml`,
determinístico por `seed` — a mesma actividade/história/foto de galeria
mostra sempre o mesmo placeholder. **Antes de um lançamento real, este
ficheiro deve ser o único ponto a alterar**: trocar `photo()` por um
construtor de URLs do Supabase Storage a apontar para fotografia documental
real das actividades da NKENTU.

## Design

- Paleta editorial e quente (terracota `clay`, ochre, verde `moss`, tons de
  `stone`/`sand`), definida em `tailwind.config.js` — deliberadamente longe
  de rosa/gradientes ou clichés de "empoderamento feminino".
- Tipografia: **Fraunces** (serifada, editorial) para títulos, **Work Sans**
  para o resto — carregadas via Google Fonts em `index.html`.
- Grelhas assimétricas, cards simples, microinteracções subtis
  (hover em cards, transições de menu), sem bibliotecas de animação.

## Acessibilidade e SEO

- Hierarquia de headings correcta em cada página (`h1` único por página).
- `alt` descritivo em todas as imagens de conteúdo.
- Navegação por teclado: skip-link, foco visível (`:focus-visible`), lightbox
  da galeria com `Escape`/setas e `role="dialog"`.
- Cada actividade/história/newsletter define `meta title`, `meta
  description` e `og:image` próprios, aplicados via `src/components/Seo.tsx`.
- `public/robots.txt` e `public/sitemap.xml` (sitemap estático a partir do
  conteúdo actual — antes de produção, gerar dinamicamente a partir da base
  de dados).
- URLs amigáveis (`/actividades/nome-da-actividade`, etc.) usando o campo
  `slug` de cada colecção.

## Performance

- Lazy loading em imagens fora do topo da página (`loading="lazy"`).
- Sem bibliotecas de animação; transições feitas em CSS/Tailwind.
- Bundle único, build de produção testado (`npm run build`).
