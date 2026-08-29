export default function NotConfigured() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col justify-center gap-4 px-6 py-24">
      <p className="eyebrow">Administração</p>
      <h1 className="text-display-md text-balance">O Supabase ainda não está configurado.</h1>
      <p className="text-ink/70">
        A área de administração precisa de um projecto Supabase ligado para funcionar. Para activar:
      </p>
      <ol className="list-decimal space-y-2 pl-5 text-ink/70">
        <li>
          Crie um projecto em{" "}
          <a href="https://supabase.com" target="_blank" rel="noreferrer" className="underline decoration-clay-500">
            supabase.com
          </a>
          .
        </li>
        <li>
          Corra <code className="rounded bg-sand px-1.5 py-0.5 text-sm">supabase/migrations/0001_init.sql</code> no
          SQL editor do projecto.
        </li>
        <li>
          Defina <code className="rounded bg-sand px-1.5 py-0.5 text-sm">VITE_SUPABASE_URL</code> e{" "}
          <code className="rounded bg-sand px-1.5 py-0.5 text-sm">VITE_SUPABASE_ANON_KEY</code> nas variáveis de
          ambiente (local e na Vercel).
        </li>
        <li>
          Crie um utilizador administrador em Authentication → Users no painel do Supabase (não há registo público).
        </li>
      </ol>
      <p className="text-sm text-ink/50">Detalhes completos no README, secção "CMS / Supabase".</p>
    </div>
  );
}
