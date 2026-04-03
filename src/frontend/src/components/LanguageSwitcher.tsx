import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/context/LanguageContext";
import { LANGUAGES } from "@/lib/translations";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const current = LANGUAGES.find((l) => l.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-1.5 px-2 py-1.5 rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ngo-green focus:ring-offset-1"
          aria-label="Select language"
          data-ocid="language.toggle"
        >
          <Globe size={14} className="text-ngo-green flex-shrink-0" />
          <span className="hidden sm:inline max-w-[80px] truncate">
            {current?.nativeLabel}
          </span>
          <span className="sm:hidden text-xs">
            {current?.code.toUpperCase()}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-44"
        data-ocid="language.dropdown_menu"
      >
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`flex items-center justify-between cursor-pointer ${
              lang.code === language
                ? "bg-green-50 text-ngo-green font-semibold"
                : "text-gray-700"
            }`}
            data-ocid="language.select"
          >
            <span>{lang.nativeLabel}</span>
            {lang.code === language && (
              <span className="text-ngo-green text-xs ml-2">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
