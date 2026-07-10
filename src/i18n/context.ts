import { createContext } from 'react';

export type Language = 'en' | 'pt' | 'es';

export interface I18nContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string | string[] | Record<string, unknown> | unknown[];
}

export const I18nContext = createContext<I18nContextValue | undefined>(undefined);
