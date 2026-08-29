import { useState, type FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { useAuth, isSupabaseConfigured } from "../../admin/AuthContext";
import NotConfigured from "../../admin/NotConfigured";

export default function AdminLogin() {
  const { session, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isSupabaseConfigured()) return <NotConfigured />;
  if (session) return <Navigate to="/admin" replace />;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const result = await signIn(email, password);
    setLoading(false);
    if (result.error) setError(result.error);
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6">
      <p className="eyebrow mb-2">NKENTU · admin</p>
      <h1 className="font-display text-3xl">Entrar</h1>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-ink">Email</span>
          <input
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-xl border border-ink/20 bg-transparent px-4 py-3 text-ink"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-ink">Palavra-passe</span>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-xl border border-ink/20 bg-transparent px-4 py-3 text-ink"
          />
        </label>
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "A entrar…" : "Entrar"}
        </button>
        {error && (
          <p className="text-sm text-clay-300" role="alert">
            {error}
          </p>
        )}
      </form>
      <p className="mt-6 text-sm text-ink/50">
        Sem conta de administração? Contas são criadas manualmente no painel do Supabase — não há registo público.
      </p>
    </div>
  );
}
