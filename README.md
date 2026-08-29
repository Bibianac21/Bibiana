# NKENTU — website

Protótipo funcional do website da NKENTU, um projecto social angolano dedicado
à capacitação e desenvolvimento de mulheres. Plataforma editorial (não
institucional): hub de actividades, histórias, galeria e newsletter, pensado
para crescer continuamente.

## Stack

- **React 19 + TypeScript** (Vite)
- **React Router 6** — routing client-side
- **Tailwind CSS 3** — sistema de design (tokens em `tailwind.config.js`)
- **@supabase/supabase-js** — instalado e preparado (ver "CMS / Supabase" abaixo), não ligado a um projecto real ainda

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
    images.ts             placeholder de fotografia (ver secção "Fotografia" abaixo)
    format.ts             formatação de datas em português e slugify
  components/            componentes de UI partilhados (cards, secções, filtros, lightbox, formulários)
  pages/                  uma página por rota
  App.tsx                 layout (Header/Footer) + definição de rotas
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

## CMS / Supabase

O objectivo é que, no futuro, uma pessoa não-técnica consiga gerir todo o
conteúdo sem mexer em código. A estrutura já está pronta para isso:

1. **Tipos como esquema.** Cada interface em `src/types/content.ts`
   corresponde a uma tabela Supabase (`activities`, `stories`,
   `newsletters`, `gallery_items`, `partners`, `team_members`), com os
   mesmos campos descritos no pedido original (categoria, estado, destaque,
   galeria, resultados, testemunhos, SEO, etc.).
2. **Camada de dados isolada.** As funções `get*` em `src/data/*.ts` são o
   único ponto de contacto entre páginas e conteúdo. Para ligar a Supabase:
   - criar as tabelas + Storage bucket para fotografias,
   - substituir o corpo de cada função por uma query Supabase (mantendo a
     assinatura — a maioria pode tornar-se `async` com um `useEffect`/`useQuery`
     nas páginas, sem alterar a interface pública),
   - usar `getSupabaseClient()` de `src/lib/supabase.ts`, que já lê
     `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` do ambiente.
3. **Formulários já preparados.** `NewsletterSignupForm` e a página
   `Contact` já chamam `subscribeToNewsletter` / `sendContactMessage` em
   `src/lib/supabase.ts`, que escrevem em `newsletter_subscribers` /
   `contact_messages` quando o Supabase está configurado, e simulam sucesso
   quando não está (para o protótipo funcionar sem backend).
4. **Autenticação administrativa.** Supabase Auth cobre o login da pessoa
   responsável pelo projecto; uma área `/admin` (fora do âmbito deste
   protótipo) passaria a escrever directamente nas tabelas acima — criar,
   editar e publicar actividades/histórias/newsletters, fazer upload de
   fotografias para o Storage, escolher destaques, editar paleta e
   tipografia, sem tocar em código.

Sem `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY` definidos, o site funciona
inteiramente com os dados fictícios em `src/data/`.

## Fotografia

O pedido é explícito quanto a evitar fotografia de stock corporativa — mas
este protótipo não teve acesso a uma biblioteca de fotografia documental
real. Todas as imagens vêm de `src/lib/images.ts`, que gera URLs
`picsum.photos` estáveis por item (mesma imagem em cada recarregamento,
diferente por actividade/história/foto de galeria). **Antes de um
lançamento real, este ficheiro deve ser o único ponto a alterar**: trocar
`photo()` por um construtor de URLs do Supabase Storage a apontar para
fotografia documental real das actividades da NKENTU.

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
