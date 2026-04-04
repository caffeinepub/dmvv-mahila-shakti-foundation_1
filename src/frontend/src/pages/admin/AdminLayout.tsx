import LogoImage from "@/components/LogoImage";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import {
  Award,
  Briefcase,
  Building,
  Building2,
  Bus,
  CalendarDays,
  ChevronRight,
  ClipboardList,
  Download,
  FileCheck,
  FileText,
  GraduationCap,
  HandHeart,
  Handshake,
  Heart,
  Home,
  Image,
  Images,
  IndianRupee,
  KeyRound,
  LayoutDashboard,
  LayoutTemplate,
  ListChecks,
  LogOut,
  Menu,
  MessageSquare,
  Monitor,
  Newspaper,
  Package,
  ScrollText,
  Settings,
  Shield,
  Store,
  Trophy,
  UserCheck,
  Users,
  Wallet,
  X,
  Youtube,
} from "lucide-react";
import { useState } from "react";
import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";

const adminNav = [
  { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Home Page", path: "/admin/homepage", icon: Home },
  { label: "User Management", path: "/admin/users", icon: Users },
  {
    label: "Login Management",
    path: "/admin/login-management",
    icon: KeyRound,
  },
  { label: "KYC Management", path: "/admin/kyc", icon: FileCheck },
  {
    label: "Loan Applications",
    path: "/admin/loan-applications",
    icon: IndianRupee,
  },
  { label: "Products", path: "/admin/products", icon: Package },
  { label: "Volunteers", path: "/admin/volunteers", icon: HandHeart },
  { label: "Insurance", path: "/admin/insurance", icon: Shield },
  { label: "Wallet", path: "/admin/wallet", icon: Wallet },
  { label: "Franchise Page", path: "/admin/franchise", icon: Store },
  { label: "Center Management", path: "/admin/centers", icon: Building2 },
  { label: "News Management", path: "/admin/news", icon: Newspaper },
  { label: "Leadership Team", path: "/admin/leadership", icon: UserCheck },
  { label: "Foundation Events", path: "/admin/events", icon: CalendarDays },
  { label: "Computer Centers", path: "/admin/computer-centers", icon: Monitor },
  { label: "Schemes", path: "/admin/schemes", icon: ListChecks },
  { label: "Loan Schemes", path: "/admin/loan", icon: IndianRupee },
  { label: "Employment", path: "/admin/employment", icon: Briefcase },
  { label: "Rewards", path: "/admin/rewards", icon: Trophy },
  { label: "Apply Forms", path: "/admin/apply-forms", icon: ClipboardList },
  { label: "Community Center", path: "/admin/community", icon: Building },
  { label: "Transport", path: "/admin/transport", icon: Bus },
  { label: "Downloads", path: "/admin/downloads", icon: Download },
  { label: "Legal Documents", path: "/admin/legal-docs", icon: ScrollText },
  { label: "Wishes Letters", path: "/admin/wishes", icon: Heart },
  { label: "Our Team", path: "/admin/our-team", icon: Users },
  { label: "Our Partners", path: "/admin/our-partners", icon: Building2 },
  { label: "YouTube Videos", path: "/admin/youtube", icon: Youtube },
  { label: "Footer Settings", path: "/admin/footer", icon: LayoutTemplate },
  { label: "Complaints", path: "/admin/complaints", icon: MessageSquare },
  { label: "Training Programs", path: "/admin/training", icon: GraduationCap },
  { label: "Gallery Management", path: "/admin/gallery", icon: Images },
  { label: "Page Builder", path: "/admin/pages", icon: FileText },
  { label: "Media Manager", path: "/admin/media", icon: Image },
  { label: "Company Profile", path: "/admin/company", icon: Building },
  { label: "Site Settings", path: "/admin/settings", icon: Settings },
];

export default function AdminLayout() {
  const { currentUser, setCurrentUser } = useApp();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!currentUser || currentUser.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar text-sidebar-foreground flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <LogoImage
              className="h-8 w-8 object-contain flex-shrink-0"
              alt="Logo"
            />
            <div>
              <div className="font-bold text-sm text-white">
                DMVV Admin Panel
              </div>
              <div className="text-xs text-green-300">
                {currentUser.fullName}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="flex-1 py-4 overflow-y-auto">
          {adminNav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                  isActive
                    ? "bg-sidebar-accent text-white font-semibold"
                    : "text-green-200 hover:bg-sidebar-accent hover:text-white"
                }`
              }
              onClick={() => setSidebarOpen(false)}
              data-ocid="admin_nav.link"
            >
              <item.icon size={15} />
              <span className="flex-1">{item.label}</span>
              <ChevronRight size={11} className="opacity-40" />
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-sidebar-border">
          <Button
            variant="ghost"
            className="w-full text-red-300 hover:text-red-100 hover:bg-red-900/30 justify-start"
            onClick={handleLogout}
            data-ocid="admin_nav.close_button"
          >
            <LogOut size={16} className="mr-2" /> Logout
          </Button>
        </div>
      </aside>

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden w-full"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 lg:ml-64 flex flex-col">
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <button
            type="button"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
            data-ocid="admin.hamburger_button"
          >
            <Menu size={22} />
          </button>
          <span className="font-bold text-gray-800">Admin Dashboard</span>
          <span className="ml-auto text-sm text-gray-500">
            Logged in as: <strong>{currentUser.email}</strong>
          </span>
        </div>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
