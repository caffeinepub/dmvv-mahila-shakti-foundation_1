import { useApp } from "@/context/AppContext";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const { settings, footerSettings } = useApp();
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "dmvv.org";

  const socialLinks = [
    { Icon: Facebook, label: "Facebook", href: footerSettings.facebookUrl },
    { Icon: Twitter, label: "Twitter", href: footerSettings.twitterUrl },
    { Icon: Youtube, label: "Youtube", href: footerSettings.youtubeUrl },
    { Icon: Instagram, label: "Instagram", href: footerSettings.instagramUrl },
  ];

  return (
    <footer className="bg-ngo-green text-white">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/dmvv_01-019d502e-b12e-7281-9c5f-d104232dfddd.png"
                alt="DMVV Logo"
                className="h-14 w-14 object-contain bg-white rounded-full p-1"
              />
              <div>
                <div className="font-bold text-sm leading-tight">
                  DMVV BHARTIY MAHILA SHAKTI FOUNDATION™
                </div>
                <div className="text-xs text-green-300">
                  महिला सशक्तिकरण की ओर एक कदम
                </div>
              </div>
            </div>
            <p className="text-sm text-green-200 leading-relaxed">
              {footerSettings.footerText || settings.footerText}
            </p>
            <div className="flex gap-3 mt-4">
              {socialLinks.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ngo-orange transition-colors"
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          {footerSettings.showQuickLinks && (
            <div>
              <h3 className="font-semibold text-base mb-3 text-ngo-orange">
                Quick Links
              </h3>
              <ul className="space-y-2 text-sm text-green-200">
                {[
                  "/about",
                  "/schemes",
                  "/centers",
                  "/training",
                  "/employment",
                  "/our-team",
                  "/our-partners",
                ].map((path) => (
                  <li key={path}>
                    <Link
                      to={path}
                      className="hover:text-white transition-colors capitalize"
                    >
                      {path.replace("/", "").replace(/-/g, " ")}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Programs */}
          {footerSettings.showPrograms && (
            <div>
              <h3 className="font-semibold text-base mb-3 text-ngo-orange">
                Programs &amp; Pages
              </h3>
              <ul className="space-y-2 text-sm text-green-200">
                {[
                  "/loan",
                  "/rewards",
                  "/gallery",
                  "/legal-documents",
                  "/wishes",
                  "/terms",
                  "/rules",
                  "/complaint",
                ].map((path) => (
                  <li key={path}>
                    <Link
                      to={path}
                      className="hover:text-white transition-colors capitalize"
                    >
                      {path.replace("/", "").replace(/-/g, " ")}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-base mb-3 text-ngo-orange">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-green-200">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-1 flex-shrink-0" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} />
                <span>{settings.contactPhone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} />
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="hover:text-white transition-colors"
                >
                  {settings.contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-green-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between text-xs text-green-300">
          <span>
            {footerSettings.copyrightText ||
              `© ${year} DMVV Bhartiy Mahila Shakti Foundation™. All Rights Reserved.`}
          </span>
          <span>
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors underline"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
