import { useContext, useState, type ReactNode } from 'react';
import en from './locales/en.json';
import pt from './locales/pt.json';
import es from './locales/es.json';
import { I18nContext, type Language } from './context';

export type { Language } from './context';

const translations = {
  en,
  pt,
  es,
};

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language') as Language | null;
      if (saved && saved in translations) return saved;

      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'en') return 'en';
      if (browserLang === 'es') return 'es';
    }
    return 'pt';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  const t = (key: string): string | string[] | Record<string, unknown> | unknown[] => {
    const keys = key.split('.');
    let current: unknown = translations[language];

    for (const k of keys) {
      if (current && typeof current === 'object' && k in (current as object)) {
        current = (current as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }

    if (current === undefined || current === null) return key;
    return current as string | string[] | Record<string, unknown> | unknown[];
  };

  return <I18nContext.Provider value={{ language, setLanguage, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}
