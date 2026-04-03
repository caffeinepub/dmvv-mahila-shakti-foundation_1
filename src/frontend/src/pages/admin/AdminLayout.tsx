import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import {
  Building,
  Building2,
  ChevronRight,
  FileCheck,
  FileText,
  Image,
  Images,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";

const adminNav = [
  { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "User Management", path: "/admin/users", icon: Users },
  { label: "KYC Management", path: "/admin/kyc", icon: FileCheck },
  { label: "Center Management", path: "/admin/centers", icon: Building2 },
  { label: "Page Builder", path: "/admin/pages", icon: FileText },
  { label: "Media Manager", path: "/admin/media", icon: Image },
  { label: "Gallery Management", path: "/admin/gallery", icon: Images },
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
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar text-sidebar-foreground flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <div>
            <div className="font-bold text-sm text-white">DMVV Admin Panel</div>
            <div className="text-xs text-green-300">{currentUser.fullName}</div>
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
                `flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                  isActive
                    ? "bg-sidebar-accent text-white font-semibold"
                    : "text-green-200 hover:bg-sidebar-accent hover:text-white"
                }`
              }
              onClick={() => setSidebarOpen(false)}
              data-ocid="admin_nav.link"
            >
              <item.icon size={16} />
              {item.label}
              <ChevronRight size={12} className="ml-auto opacity-50" />
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

      {/* Overlay */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden w-full"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col">
        {/* Top bar */}
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
