"use client";

import { createContext, useContext, type ReactNode } from "react";
import { defaultLocale, getDictionary, type Dictionary, type Locale } from "@/lib/i18n";

interface I18nValue {
  locale: Locale;
  dict: Dictionary;
}

const I18nContext = createContext<I18nValue>({
  locale: defaultLocale,
  dict: getDictionary(defaultLocale),
});

export function I18nProvider({
  locale,
  dictionary,
  children,
}: {
  locale: Locale;
  dictionary: Dictionary;
  children: ReactNode;
}) {
  return <I18nContext.Provider value={{ locale, dict: dictionary }}>{children}</I18nContext.Provider>;
}

export function useDictionary(): I18nValue {
  return useContext(I18nContext);
}
