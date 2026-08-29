import { Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Activities from "./pages/Activities";
import ActivityDetail from "./pages/ActivityDetail";
import Stories from "./pages/Stories";
import StoryDetail from "./pages/StoryDetail";
import Gallery from "./pages/Gallery";
import Newsletter from "./pages/Newsletter";
import NewsletterDetail from "./pages/NewsletterDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./admin/AuthContext";
import ProtectedAdminRoute from "./admin/ProtectedAdminRoute";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { AdminActivitiesList, AdminActivityForm } from "./pages/admin/AdminActivities";
import { AdminStoriesList, AdminStoryForm } from "./pages/admin/AdminStories";
import { AdminNewslettersList, AdminNewsletterForm } from "./pages/admin/AdminNewsletters";
import { AdminGalleryList, AdminGalleryForm } from "./pages/admin/AdminGallery";
import { AdminPartnersList, AdminPartnerForm } from "./pages/admin/AdminPartners";
import { AdminTeamList, AdminTeamForm } from "./pages/admin/AdminTeam";
import AdminHomepage from "./pages/admin/AdminHomepage";

function PublicLayout() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Saltar para o conteúdo
      </a>
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/admin/entrar" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedAdminRoute />}>
          <Route index element={<AdminDashboard />} />
          <Route path="actividades" element={<AdminActivitiesList />} />
          <Route path="actividades/:id" element={<AdminActivityForm />} />
          <Route path="historias" element={<AdminStoriesList />} />
          <Route path="historias/:id" element={<AdminStoryForm />} />
          <Route path="newsletters" element={<AdminNewslettersList />} />
          <Route path="newsletters/:id" element={<AdminNewsletterForm />} />
          <Route path="galeria" element={<AdminGalleryList />} />
          <Route path="galeria/:id" element={<AdminGalleryForm />} />
          <Route path="parceiros" element={<AdminPartnersList />} />
          <Route path="parceiros/:id" element={<AdminPartnerForm />} />
          <Route path="equipa" element={<AdminTeamList />} />
          <Route path="equipa/:id" element={<AdminTeamForm />} />
          <Route path="homepage" element={<AdminHomepage />} />
        </Route>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/actividades" element={<Activities />} />
          <Route path="/actividades/:slug" element={<ActivityDetail />} />
          <Route path="/historias" element={<Stories />} />
          <Route path="/historias/:slug" element={<StoryDetail />} />
          <Route path="/galeria" element={<Gallery />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/newsletter/:slug" element={<NewsletterDetail />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
