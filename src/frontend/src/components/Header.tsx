import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useApp } from "@/context/AppContext";
import { useLanguage } from "@/context/LanguageContext";
import {
  AlertCircle,
  Award,
  Banknote,
  BookCheck,
  BookOpen,
  Briefcase,
  Building2,
  ChevronDown,
  Download,
  Factory,
  FileText,
  GraduationCap,
  Handshake,
  Heart,
  HelpCircle,
  Home,
  Image,
  Info,
  Layers,
  LayoutDashboard,
  LogOut,
  MapPin,
  MessageCircle,
  Newspaper,
  Phone,
  Rss,
  Scale,
  Star,
  Store,
  User,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
      <line x1="0" y1="3" x2="28" y2="3" strokeWidth="3" />
      <line x1="0" y1="11" x2="18" y2="11" strokeWidth="2.5" />
      <line x1="0" y1="19" x2="11" y2="19" strokeWidth="2" />
    </svg>
  );
}

type NavSubItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
};

type NavCategory = {
  id: string;
  label: string;
  icon: React.ReactNode;
  items: NavSubItem[];
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMobileCategory, setOpenMobileCategory] = useState<string | null>(
    null,
  );
  const { currentUser, setCurrentUser, settings } = useApp();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const navCategories: NavCategory[] = [
    {
      id: "org",
      label: t("nav.catOrg"),
      icon: <Building2 size={16} />,
      items: [
        { label: t("nav.about"), path: "/about", icon: <Info size={15} /> },
        {
          label: t("nav.ourTeam"),
          path: "/our-team",
          icon: <Users size={15} />,
        },
        {
          label: t("nav.ourPartners"),
          path: "/our-partners",
          icon: <Handshake size={15} />,
        },
        {
          label: t("nav.legalDocs"),
          path: "/legal-documents",
          icon: <FileText size={15} />,
        },
        { label: t("nav.wishes"), path: "/wishes", icon: <Heart size={15} /> },
      ],
    },
    {
      id: "schemes",
      label: t("nav.catSchemes"),
      icon: <Layers size={16} />,
      items: [
        { label: t("nav.schemes"), path: "/schemes", icon: <Star size={15} /> },
        { label: t("nav.loan"), path: "/loan", icon: <Banknote size={15} /> },
        {
          label: t("nav.shgLoan"),
          path: "/shg-loan",
          icon: <Users size={15} />,
        },
        {
          label: t("nav.udhyogLoan"),
          path: "/udhyog-loan",
          icon: <Factory size={15} />,
        },
        {
          label: t("nav.employment"),
          path: "/employment",
          icon: <Briefcase size={15} />,
        },
        {
          label: t("nav.rewards"),
          path: "/rewards",
          icon: <Award size={15} />,
        },
      ],
    },
    {
      id: "training",
      label: t("nav.catTraining"),
      icon: <GraduationCap size={16} />,
      items: [
        {
          label: t("nav.training"),
          path: "/training",
          icon: <BookOpen size={15} />,
        },
        {
          label: t("nav.centers"),
          path: "/centers",
          icon: <MapPin size={15} />,
        },
        {
          label: t("nav.communityCenter"),
          path: "/centers",
          icon: <Home size={15} />,
        },
        {
          label: t("nav.franchise"),
          path: "/franchise",
          icon: <Store size={15} />,
        },
      ],
    },
    {
      id: "media",
      label: t("nav.catMedia"),
      icon: <Newspaper size={16} />,
      items: [
        { label: t("nav.news"), path: "/news", icon: <Rss size={15} /> },
        {
          label: t("nav.gallery"),
          path: "/gallery",
          icon: <Image size={15} />,
        },
        {
          label: t("nav.downloads"),
          path: "/downloads",
          icon: <Download size={15} />,
        },
      ],
    },
    {
      id: "info",
      label: t("nav.catInfo"),
      icon: <HelpCircle size={16} />,
      items: [
        {
          label: t("nav.contact"),
          path: "/contact",
          icon: <Phone size={15} />,
        },
        {
          label: t("nav.faq"),
          path: "/faq",
          icon: <MessageCircle size={15} />,
        },
        { label: t("nav.terms"), path: "/terms", icon: <Scale size={15} /> },
        {
          label: t("nav.rules"),
          path: "/rules",
          icon: <BookCheck size={15} />,
        },
        {
          label: t("nav.complaint"),
          path: "/complaint",
          icon: <AlertCircle size={15} />,
        },
      ],
    },
  ];

  const handleLogout = () => {
    setCurrentUser(null);
    navigate("/");
  };

  const toggleMobileCategory = (id: string) => {
    setOpenMobileCategory((prev) => (prev === id ? null : id));
  };

  const logoSrc =
    settings.logoUrl ||
    "/assets/dmvv_01-019d502e-b12e-7281-9c5f-d104232dfddd.png";

  return (
    <header className="w-full sticky top-0 z-50 shadow-md">
      {/* White top bar: logo + auth */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={logoSrc}
              alt="DMVV Foundation Logo"
              className="h-14 w-14 object-contain flex-shrink-0"
            />
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <LanguageSwitcher />
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
                  <button
                    type="button"
                    className="flex w-full items-center px-2 py-1.5 text-sm hover:bg-accent rounded-sm cursor-pointer"
                    onClick={() => navigate(getDashboardPath(currentUser.role))}
                    data-ocid="header.link"
                  >
                    <LayoutDashboard size={14} className="mr-2" />{" "}
                    {t("auth.dashboard")}
                  </button>
                  <button
                    type="button"
                    className="flex w-full items-center px-2 py-1.5 text-sm text-red-600 hover:bg-accent rounded-sm cursor-pointer"
                    onClick={handleLogout}
                    data-ocid="header.close_button"
                  >
                    <LogOut size={14} className="mr-2" /> {t("auth.logout")}
                  </button>
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
                    {t("auth.login")}
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    size="sm"
                    className="bg-ngo-orange text-white hover:bg-ngo-orange-dark"
                    data-ocid="header.signup_button"
                  >
                    {t("auth.signup")}
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Green nav bar */}
      <nav className="bg-ngo-green">
        <div className="max-w-7xl mx-auto px-4">
          {/* Title row + hamburger */}
          <div className="flex items-center justify-between py-1 border-b border-green-700">
            <div className="flex flex-col leading-tight">
              <span className="text-white font-bold text-sm md:text-base lg:text-lg whitespace-nowrap tracking-wide">
                DMVV BHARTIY MAHILA SHAKTI FOUNDATION™
              </span>
              <span className="text-green-200 text-xs whitespace-nowrap">
                महिला सशक्तिकरण की ओर एक कदम
              </span>
            </div>
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

          {/* Desktop mega menu */}
          <div className="hidden lg:flex items-center justify-between">
            <div className="flex items-center">
              {/* Home standalone */}
              <Link
                to="/"
                className="flex items-center gap-1.5 text-white text-sm font-medium px-3 py-3 hover:bg-green-700 transition-colors whitespace-nowrap"
                data-ocid="nav.home.link"
              >
                <Home size={15} />
                {t("nav.home")}
              </Link>

              {/* Category dropdowns */}
              {navCategories.map((cat) => (
                <DropdownMenu key={cat.id}>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="flex items-center gap-1.5 text-white text-sm font-medium px-3 py-3 hover:bg-green-700 transition-colors whitespace-nowrap focus:outline-none"
                      data-ocid={`nav.${cat.id}.dropdown_menu`}
                    >
                      {cat.icon}
                      <span>{cat.label}</span>
                      <ChevronDown size={13} className="opacity-80" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    sideOffset={0}
                    className="p-2 min-w-[220px] bg-white shadow-xl rounded-xl border border-gray-100"
                  >
                    <div
                      className={
                        cat.items.length > 3
                          ? "grid grid-cols-2 gap-0.5"
                          : "flex flex-col gap-0.5"
                      }
                    >
                      {cat.items.map((item) => (
                        <Link
                          key={item.path + item.label}
                          to={item.path}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:text-ngo-green font-medium transition-colors"
                          data-ocid={`nav.${cat.id}.link`}
                        >
                          <span className="text-ngo-green opacity-80">
                            {item.icon}
                          </span>
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              ))}
            </div>

            {/* Donate button */}
            <div className="py-2 flex-shrink-0">
              <Link to="/contact">
                <Button
                  className="bg-ngo-orange text-white hover:bg-ngo-orange-dark font-semibold"
                  data-ocid="nav.donate_button"
                >
                  {t("nav.donateNow")}
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile accordion menu */}
          {menuOpen && (
            <div className="lg:hidden pb-3 border-t border-green-700">
              {/* Home */}
              <Link
                to="/"
                className="flex items-center gap-2 text-white text-sm px-3 py-2.5 hover:bg-green-700 transition-colors"
                onClick={() => setMenuOpen(false)}
                data-ocid="mobile_nav.home.link"
              >
                <Home size={15} />
                {t("nav.home")}
              </Link>

              {/* Categories accordion */}
              {navCategories.map((cat) => (
                <div key={cat.id}>
                  <button
                    type="button"
                    className="w-full flex items-center justify-between text-white text-sm px-3 py-2.5 hover:bg-green-700 transition-colors"
                    onClick={() => toggleMobileCategory(cat.id)}
                    data-ocid={`mobile_nav.${cat.id}.toggle`}
                  >
                    <span className="flex items-center gap-2">
                      {cat.icon}
                      <span className="font-medium">{cat.label}</span>
                    </span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${
                        openMobileCategory === cat.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openMobileCategory === cat.id && (
                    <div className="bg-green-800 border-l-2 border-green-400 ml-4">
                      {cat.items.map((item) => (
                        <Link
                          key={item.path + item.label}
                          to={item.path}
                          className="flex items-center gap-2 text-green-100 text-sm px-4 py-2 hover:bg-green-700 hover:text-white transition-colors"
                          onClick={() => setMenuOpen(false)}
                          data-ocid={`mobile_nav.${cat.id}.link`}
                        >
                          <span className="opacity-75">{item.icon}</span>
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Donate */}
              <div className="pt-2 px-3 mt-1 border-t border-green-700">
                <Link to="/contact" onClick={() => setMenuOpen(false)}>
                  <Button
                    className="w-full bg-ngo-orange text-white hover:bg-ngo-orange-dark"
                    data-ocid="mobile_nav.donate_button"
                  >
                    {t("nav.donateNow")}
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
