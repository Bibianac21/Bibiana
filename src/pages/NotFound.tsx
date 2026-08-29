import { Link } from "react-router-dom";
import Seo from "../components/Seo";

export default function NotFound() {
  return (
    <>
      <Seo title="Página não encontrada — NKENTU" description="A página que procura não existe ou foi movida." />
      <div className="container-editorial flex min-h-[60vh] flex-col items-start justify-center gap-6 py-24">
        <p className="eyebrow">Erro 404</p>
        <h1 className="text-display-lg text-balance">Esta página não existe.</h1>
        <p className="max-w-prose text-lg text-ink/70">
          O conteúdo que procura pode ter sido movido ou já não está disponível.
        </p>
        <Link to="/" className="btn-primary">
          Voltar à página inicial
        </Link>
      </div>
    </>
  );
}
