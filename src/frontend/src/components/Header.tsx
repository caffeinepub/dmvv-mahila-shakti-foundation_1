import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useApp } from "@/context/AppContext";
import { ChevronDown, LayoutDashboard, LogOut, User, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Schemes", path: "/schemes" },
  { label: "Our Centers", path: "/centers" },
  { label: "Training", path: "/training" },
  { label: "Employment", path: "/employment" },
  { label: "Loan", path: "/loan" },
  { label: "Rewards", path: "/rewards" },
  { label: "News", path: "/news" },
  { label: "Gallery", path: "/gallery" },
  { label: "Downloads", path: "/downloads" },
  { label: "Contact", path: "/contact" },
  { label: "FAQ", path: "/faq" },
];

function getDashboardPath(role: string): string {
  switch (role) {
    case "admin":
      return "/admin/dashboard";
    case "center":
      return "/center/dashboard";
    case "supervisor":
      return "/supervisor/dashboard";
    case "transport":
      return "/transport/dashboard";
    case "hr":
      return "/hr/dashboard";
    default:
      return "/user/dashboard";
  }
}

// Descending hamburger: line1 large, line2 small, line3 smaller than line2
function HamburgerIcon() {
  return (
    <svg
      role="img"
      aria-label="Menu"
      width="28"
      height="22"
      viewBox="0 0 28 22"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
    >
      <title>Menu</title>
      {/* Line 1 - Bada (large, full width) */}
      <line x1="0" y1="3" x2="28" y2="3" strokeWidth="3" />
      {/* Line 2 - Chota (small, medium width) */}
      <line x1="0" y1="11" x2="18" y2="11" strokeWidth="2.5" />
      {/* Line 3 - Sabse chota (smallest) */}
      <line x1="0" y1="19" x2="11" y2="19" strokeWidth="2" />
    </svg>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser, setCurrentUser, settings } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser(null);
    navigate("/");
  };

  const logoSrc =
    settings.logoUrl ||
    "/assets/dmvv_01-019d502e-b12e-7281-9c5f-d104232dfddd.png";

  return (
    <header className="w-full sticky top-0 z-50 shadow-md">
      {/* Top strip - ONLY LOGO + Login/Signup buttons */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Only Logo */}
          <div className="flex items-center">
            <img
              src={logoSrc}
              alt="DMVV Foundation Logo"
              className="h-14 w-14 object-contain flex-shrink-0"
            />
          </div>
          {/* Login / Signup buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 border-ngo-green text-ngo-green"
                    data-ocid="header.dropdown_menu"
                  >
                    <User size={14} />
                    <span className="hidden md:inline">
                      {currentUser.fullName.split(" ")[0]}
                    </span>
                    <ChevronDown size={14} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => navigate(getDashboardPath(currentUser.role))}
                    data-ocid="header.link"
                  >
                    <LayoutDashboard size={14} className="mr-2" /> Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600"
                    data-ocid="header.close_button"
                  >
                    <LogOut size={14} className="mr-2" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-ngo-green text-ngo-green hover:bg-green-50"
                    data-ocid="header.login_button"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    size="sm"
                    className="bg-ngo-orange text-white hover:bg-ngo-orange-dark"
                    data-ocid="header.signup_button"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Primary navigation bar - Title + Nav links */}
      <nav className="bg-ngo-green">
        <div className="max-w-7xl mx-auto px-4">
          {/* Title row on green bar */}
          <div className="flex items-center justify-between py-1 border-b border-green-700">
            <div className="flex flex-col leading-tight">
              <span className="text-white font-bold text-sm md:text-base lg:text-lg whitespace-nowrap tracking-wide">
                DMVV BHARTIY MAHILA SHAKTI FOUNDATION™
              </span>
              <span className="text-green-200 text-xs whitespace-nowrap">
                महिला सशक्तिकरण की ओर एक कदम
              </span>
            </div>

            {/* Mobile: hamburger on same title row */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                type="button"
                className="text-white p-2"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
                data-ocid="nav.hamburger_button"
              >
                {menuOpen ? <X size={22} /> : <HamburgerIcon />}
              </button>
            </div>
          </div>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center justify-between">
            <div className="flex items-center overflow-x-auto">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-white text-sm font-medium px-3 py-3 hover:bg-green-700 transition-colors whitespace-nowrap"
                  data-ocid={`nav.${item.label.toLowerCase().replace(/\s+/g, "_")}.link`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="py-2 flex-shrink-0">
              <Link to="/contact">
                <Button
                  className="bg-ngo-orange text-white hover:bg-ngo-orange-dark font-semibold"
                  data-ocid="nav.donate_button"
                >
                  Donate Now
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="lg:hidden pb-3 border-t border-green-700">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block text-white text-sm px-3 py-2 hover:bg-green-700 transition-colors"
                  onClick={() => setMenuOpen(false)}
                  data-ocid="mobile_nav.link"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2 px-3">
                <Link to="/contact" onClick={() => setMenuOpen(false)}>
                  <Button
                    className="w-full bg-ngo-orange text-white hover:bg-ngo-orange-dark"
                    data-ocid="mobile_nav.donate_button"
                  >
                    Donate Now
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
