import { useLanguage } from "@/context/LanguageContext";
import { LANGUAGES } from "@/lib/translations";
import { Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Extend Window to include Google Translate types
declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement?: new (
          config: {
            pageLanguage: string;
            includedLanguages: string;
            autoDisplay: boolean;
            layout?: number;
          },
          containerId: string,
        ) => undefined;
      };
    };
  }
}

// Map our language codes to Google Translate codes
const GOOGLE_LANG_MAP: Record<string, string> = {
  hi: "hi",
  en: "en",
  mr: "mr",
  or: "or",
  pa: "pa",
  bn: "bn",
};

function triggerGoogleTranslate(langCode: string) {
  const select = document.querySelector(
    ".goog-te-combo",
  ) as HTMLSelectElement | null;
  if (select) {
    select.value = GOOGLE_LANG_MAP[langCode] || langCode;
    select.dispatchEvent(new Event("change"));
    return;
  }
  // Widget may not be initialized yet - retry
  const tryAgain = () => {
    const sel = document.querySelector(
      ".goog-te-combo",
    ) as HTMLSelectElement | null;
    if (sel) {
      sel.value = GOOGLE_LANG_MAP[langCode] || langCode;
      sel.dispatchEvent(new Event("change"));
    }
  };
  setTimeout(tryAgain, 500);
  setTimeout(tryAgain, 1500);
}

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const current = LANGUAGES.find((l) => l.code === language);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Inject Google Translate widget on mount
  useEffect(() => {
    if (!document.getElementById("google-translate-script")) {
      window.googleTranslateElementInit = () => {
        if (window.google?.translate?.TranslateElement) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "hi",
              includedLanguages: "hi,en,mr,or,pa,bn",
              autoDisplay: false,
            },
            "google_translate_element",
          );
        }
      };

      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageSelect = (langCode: string) => {
    setLanguage(langCode as "en" | "hi" | "mr" | "or" | "pa" | "bn");
    triggerGoogleTranslate(langCode);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* Premium language button */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-green-600 to-emerald-500 text-white text-xs font-semibold shadow-md hover:from-green-500 hover:to-emerald-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-1 select-none"
        aria-label={`Language: ${current?.nativeLabel || "भाषा"}. Click to change.`}
        data-ocid="language.toggle"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe size={13} className="flex-shrink-0" aria-hidden="true" />
        <span className="hidden sm:inline tracking-wide">
          {current?.nativeLabel || "भाषा"}
        </span>
        <span className="sm:hidden">
          {(current?.code || "hi").toUpperCase()}
        </span>
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          aria-hidden="true"
          focusable="false"
        >
          <title>dropdown arrow</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Premium dropdown */}
      {isOpen && (
        <div
          className="absolute right-0 top-full mt-2 w-44 rounded-xl shadow-xl border border-gray-100 bg-white overflow-hidden z-[9999] animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-150"
          data-ocid="language.dropdown_menu"
        >
          <div className="px-3 py-2 bg-gradient-to-r from-green-600 to-emerald-500">
            <p className="text-[10px] font-semibold text-white/80 uppercase tracking-wider">
              भाषा चुनें
            </p>
          </div>
          <div className="py-1">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleLanguageSelect(lang.code)}
                className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 text-left transition-colors duration-100 ${
                  lang.code === language
                    ? "bg-green-50 text-green-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                aria-pressed={lang.code === language}
                data-ocid="language.select"
              >
                <span className="text-sm font-medium">{lang.nativeLabel}</span>
                <span className="text-[10px] text-gray-400 font-mono uppercase">
                  {lang.code}
                </span>
                {lang.code === language && (
                  <span className="text-green-600 text-xs ml-auto">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
