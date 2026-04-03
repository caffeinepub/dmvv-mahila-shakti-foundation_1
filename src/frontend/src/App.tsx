import { Toaster } from "@/components/ui/sonner";
import { AppProvider } from "@/context/AppContext";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import ProtectedRoute from "@/components/ProtectedRoute";

import About from "@/pages/About";
import Centers from "@/pages/Centers";
import Contact from "@/pages/Contact";
import Downloads from "@/pages/Downloads";
import Employment from "@/pages/Employment";
import FAQ from "@/pages/FAQ";
import Gallery from "@/pages/Gallery";
import Home from "@/pages/Home";
import Loan from "@/pages/Loan";
import Login from "@/pages/Login";
import News from "@/pages/News";
import Rewards from "@/pages/Rewards";
import Schemes from "@/pages/Schemes";
import Signup from "@/pages/Signup";
import Training from "@/pages/Training";

import KYCPage from "@/pages/user/KYCPage";
import UserDashboard from "@/pages/user/UserDashboard";

import AdminCenters from "@/pages/admin/AdminCenters";
import AdminCompanyProfile from "@/pages/admin/AdminCompanyProfile";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminGallery from "@/pages/admin/AdminGallery";
import AdminKYC from "@/pages/admin/AdminKYC";
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminMedia from "@/pages/admin/AdminMedia";
import AdminNews from "@/pages/admin/AdminNews";
import AdminPages from "@/pages/admin/AdminPages";
import AdminSettings from "@/pages/admin/AdminSettings";
import AdminTraining from "@/pages/admin/AdminTraining";
import AdminUsers from "@/pages/admin/AdminUsers";

import CenterDashboard from "@/pages/center/CenterDashboard";
import HRDashboard from "@/pages/hr/HRDashboard";
import SupervisorDashboard from "@/pages/supervisor/SupervisorDashboard";
import TransportDashboard from "@/pages/transport/TransportDashboard";

import { useApp } from "@/context/AppContext";

function DashboardRedirect() {
  const { currentUser } = useApp();
  if (!currentUser) return <Navigate to="/login" replace />;
  switch (currentUser.role) {
    case "admin":
      return <Navigate to="/admin/dashboard" replace />;
    case "center":
      return <Navigate to="/center/dashboard" replace />;
    case "supervisor":
      return <Navigate to="/supervisor/dashboard" replace />;
    case "transport":
      return <Navigate to="/transport/dashboard" replace />;
    case "hr":
      return <Navigate to="/hr/dashboard" replace />;
    default:
      return <Navigate to="/user/dashboard" replace />;
  }
}

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public pages */}
      <Route
        path="/"
        element={
          <PublicLayout>
            <Home />
          </PublicLayout>
        }
      />
      <Route
        path="/about"
        element={
          <PublicLayout>
            <About />
          </PublicLayout>
        }
      />
      <Route
        path="/schemes"
        element={
          <PublicLayout>
            <Schemes />
          </PublicLayout>
        }
      />
      <Route
        path="/centers"
        element={
          <PublicLayout>
            <Centers />
          </PublicLayout>
        }
      />
      <Route
        path="/training"
        element={
          <PublicLayout>
            <Training />
          </PublicLayout>
        }
      />
      <Route
        path="/employment"
        element={
          <PublicLayout>
            <Employment />
          </PublicLayout>
        }
      />
      <Route
        path="/loan"
        element={
          <PublicLayout>
            <Loan />
          </PublicLayout>
        }
      />
      <Route
        path="/rewards"
        element={
          <PublicLayout>
            <Rewards />
          </PublicLayout>
        }
      />
      <Route
        path="/news"
        element={
          <PublicLayout>
            <News />
          </PublicLayout>
        }
      />
      <Route
        path="/gallery"
        element={
          <PublicLayout>
            <Gallery />
          </PublicLayout>
        }
      />
      <Route
        path="/downloads"
        element={
          <PublicLayout>
            <Downloads />
          </PublicLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <PublicLayout>
            <Contact />
          </PublicLayout>
        }
      />
      <Route
        path="/faq"
        element={
          <PublicLayout>
            <FAQ />
          </PublicLayout>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicLayout>
            <Signup />
          </PublicLayout>
        }
      />
      <Route
        path="/login"
        element={
          <PublicLayout>
            <Login />
          </PublicLayout>
        }
      />

      {/* Dashboard redirect */}
      <Route path="/dashboard" element={<DashboardRedirect />} />

      {/* User routes */}
      <Route
        path="/user/dashboard"
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/kyc"
        element={
          <ProtectedRoute>
            <KYCPage />
          </ProtectedRoute>
        }
      />

      {/* Admin routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="kyc" element={<AdminKYC />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="centers" element={<AdminCenters />} />
        <Route path="pages" element={<AdminPages />} />
        <Route path="media" element={<AdminMedia />} />
        <Route path="news" element={<AdminNews />} />
        <Route path="gallery" element={<AdminGallery />} />
        <Route path="training" element={<AdminTraining />} />
        <Route path="company" element={<AdminCompanyProfile />} />
        <Route index element={<Navigate to="dashboard" replace />} />
      </Route>

      {/* Role-based dashboards */}
      <Route
        path="/center/dashboard"
        element={
          <ProtectedRoute>
            <CenterDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/supervisor/dashboard"
        element={
          <ProtectedRoute>
            <SupervisorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transport/dashboard"
        element={
          <ProtectedRoute>
            <TransportDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/hr/dashboard"
        element={
          <ProtectedRoute>
            <HRDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <AppRoutes />
        <Toaster richColors position="top-right" />
        <PWAInstallPrompt />
      </HashRouter>
    </AppProvider>
  );
}
