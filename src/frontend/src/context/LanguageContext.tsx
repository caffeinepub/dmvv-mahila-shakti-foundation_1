import {
  type Language,
  type TranslationKey,
  t as translate,
} from "@/lib/translations";
import { createContext, useContext, useState } from "react";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

function getInitialLanguage(): Language {
  try {
    const stored = localStorage.getItem("dmvv_language") as Language | null;
    const valid: Language[] = ["en", "hi", "mr", "or", "pa", "bn"];
    if (stored && valid.includes(stored)) return stored;
  } catch {
    // localStorage not available
  }
  return "hi";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("dmvv_language", lang);
    } catch {
      // ignore
    }
  };

  const tFn = (key: TranslationKey) => translate(language, key);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: tFn }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
