import { Navigate, Outlet } from "react-router-dom";
import { isSupabaseConfigured } from "../lib/supabase";
import { useAuth } from "./AuthContext";
import NotConfigured from "./NotConfigured";
import AdminLayout from "./AdminLayout";

export default function ProtectedAdminRoute() {
  if (!isSupabaseConfigured()) return <NotConfigured />;

  const { session, loading } = useAuth();

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-ink/50">A carregar…</div>;
  }

  if (!session) return <Navigate to="/admin/entrar" replace />;

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
