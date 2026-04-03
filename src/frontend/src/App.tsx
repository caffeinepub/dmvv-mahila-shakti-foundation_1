import { Toaster } from "@/components/ui/sonner";
import { AppProvider } from "@/context/AppContext";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import ProtectedRoute from "@/components/ProtectedRoute";

import About from "@/pages/About";
import Centers from "@/pages/Centers";
import Complaint from "@/pages/Complaint";
import Contact from "@/pages/Contact";
import Downloads from "@/pages/Downloads";
import Employment from "@/pages/Employment";
import FAQ from "@/pages/FAQ";
import FranchisePage from "@/pages/FranchisePage";
import Gallery from "@/pages/Gallery";
import Home from "@/pages/Home";
import Loan from "@/pages/Loan";
import Login from "@/pages/Login";
import News from "@/pages/News";
import OurPartners from "@/pages/OurPartners";
import OurTeam from "@/pages/OurTeam";
import Rewards from "@/pages/Rewards";
import RulesRegulations from "@/pages/RulesRegulations";
import SHGLoan from "@/pages/SHGLoan";
import Schemes from "@/pages/Schemes";
import Signup from "@/pages/Signup";
import TermsConditions from "@/pages/TermsConditions";
import Training from "@/pages/Training";
import UdhyogLoan from "@/pages/UdhyogLoan";

import LegalDocuments from "@/pages/LegalDocuments";
import WishesLetters from "@/pages/WishesLetters";

import KYCPage from "@/pages/user/KYCPage";
import UserDashboard from "@/pages/user/UserDashboard";

import AdminApplyForm from "@/pages/admin/AdminApplyForm";
import AdminCenters from "@/pages/admin/AdminCenters";
import AdminCommunityCenter from "@/pages/admin/AdminCommunityCenter";
import AdminCompanyProfile from "@/pages/admin/AdminCompanyProfile";
import AdminComplaints from "@/pages/admin/AdminComplaints";
import AdminComputerCenters from "@/pages/admin/AdminComputerCenters";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminDownloads from "@/pages/admin/AdminDownloads";
import AdminEmployment from "@/pages/admin/AdminEmployment";
import AdminFooter from "@/pages/admin/AdminFooter";
import AdminFoundationEvents from "@/pages/admin/AdminFoundationEvents";
import AdminFranchise from "@/pages/admin/AdminFranchise";
import AdminGallery from "@/pages/admin/AdminGallery";
import AdminHomePage from "@/pages/admin/AdminHomePage";
import AdminInsurance from "@/pages/admin/AdminInsurance";
import AdminKYC from "@/pages/admin/AdminKYC";
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminLeadership from "@/pages/admin/AdminLeadership";
import AdminLegalDocs from "@/pages/admin/AdminLegalDocs";
import AdminLoan from "@/pages/admin/AdminLoan";
import AdminLoanApplications from "@/pages/admin/AdminLoanApplications";
import AdminLoginManagement from "@/pages/admin/AdminLoginManagement";
import AdminMedia from "@/pages/admin/AdminMedia";
import AdminNews from "@/pages/admin/AdminNews";
import AdminOurPartners from "@/pages/admin/AdminOurPartners";
import AdminOurTeam from "@/pages/admin/AdminOurTeam";
import AdminPages from "@/pages/admin/AdminPages";
import AdminProducts from "@/pages/admin/AdminProducts";
import AdminRewards from "@/pages/admin/AdminRewards";
import AdminSchemes from "@/pages/admin/AdminSchemes";
import AdminSettings from "@/pages/admin/AdminSettings";
import AdminTraining from "@/pages/admin/AdminTraining";
import AdminTransport from "@/pages/admin/AdminTransport";
import AdminUserFullProfile from "@/pages/admin/AdminUserFullProfile";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminVolunteers from "@/pages/admin/AdminVolunteers";
import AdminWallet from "@/pages/admin/AdminWallet";
import AdminWishes from "@/pages/admin/AdminWishes";
import AdminYouTubeVideos from "@/pages/admin/AdminYouTubeVideos";

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
        path="/shg-loan"
        element={
          <PublicLayout>
            <SHGLoan />
          </PublicLayout>
        }
      />
      <Route
        path="/udhyog-loan"
        element={
          <PublicLayout>
            <UdhyogLoan />
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
      <Route
        path="/legal-documents"
        element={
          <PublicLayout>
            <LegalDocuments />
          </PublicLayout>
        }
      />
      <Route
        path="/wishes"
        element={
          <PublicLayout>
            <WishesLetters />
          </PublicLayout>
        }
      />
      <Route
        path="/our-team"
        element={
          <PublicLayout>
            <OurTeam />
          </PublicLayout>
        }
      />
      <Route
        path="/our-partners"
        element={
          <PublicLayout>
            <OurPartners />
          </PublicLayout>
        }
      />
      <Route
        path="/terms"
        element={
          <PublicLayout>
            <TermsConditions />
          </PublicLayout>
        }
      />
      <Route
        path="/rules"
        element={
          <PublicLayout>
            <RulesRegulations />
          </PublicLayout>
        }
      />
      <Route
        path="/complaint"
        element={
          <PublicLayout>
            <Complaint />
          </PublicLayout>
        }
      />
      <Route
        path="/franchise"
        element={
          <PublicLayout>
            <FranchisePage />
          </PublicLayout>
        }
      />

      <Route path="/dashboard" element={<DashboardRedirect />} />

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

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="homepage" element={<AdminHomePage />} />
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
        <Route path="leadership" element={<AdminLeadership />} />
        <Route path="events" element={<AdminFoundationEvents />} />
        <Route path="computer-centers" element={<AdminComputerCenters />} />
        <Route path="schemes" element={<AdminSchemes />} />
        <Route path="loan" element={<AdminLoan />} />
        <Route path="employment" element={<AdminEmployment />} />
        <Route path="rewards" element={<AdminRewards />} />
        <Route path="apply-forms" element={<AdminApplyForm />} />
        <Route path="community" element={<AdminCommunityCenter />} />
        <Route path="transport" element={<AdminTransport />} />
        <Route path="downloads" element={<AdminDownloads />} />
        <Route path="legal-docs" element={<AdminLegalDocs />} />
        <Route path="wishes" element={<AdminWishes />} />
        <Route path="our-team" element={<AdminOurTeam />} />
        <Route path="our-partners" element={<AdminOurPartners />} />
        <Route path="youtube" element={<AdminYouTubeVideos />} />
        <Route path="footer" element={<AdminFooter />} />
        <Route path="complaints" element={<AdminComplaints />} />
        <Route path="login-management" element={<AdminLoginManagement />} />
        <Route path="user-profile/:userId" element={<AdminUserFullProfile />} />
        <Route path="loan-applications" element={<AdminLoanApplications />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="volunteers" element={<AdminVolunteers />} />
        <Route path="insurance" element={<AdminInsurance />} />
        <Route path="wallet" element={<AdminWallet />} />
        <Route path="franchise" element={<AdminFranchise />} />
        <Route index element={<Navigate to="dashboard" replace />} />
      </Route>

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
