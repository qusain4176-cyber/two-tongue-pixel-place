import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type SiteLanguage = "en" | "ur";

type LanguageContextValue = {
  language: SiteLanguage;
  setLanguage: (language: SiteLanguage) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setCurrentLanguage] = useState<SiteLanguage>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("al-mehdi-language");
    if (saved === "en" || saved === "ur") setCurrentLanguage(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ur" ? "rtl" : "ltr";
  }, [language]);

  const setLanguage = (next: SiteLanguage) => {
    setCurrentLanguage(next);
    window.localStorage.setItem("al-mehdi-language", next);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useSocietyLanguage() {
  const value = useContext(LanguageContext);
  if (!value) {
    throw new Error("useSocietyLanguage must be used inside LanguageProvider.");
  }
  return value;
}