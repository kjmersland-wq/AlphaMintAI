import { enUS } from "./en-US";

export type Dictionary = typeof enUS;

export const defaultLocale = "en-US" as const;

// To add a language: create `lib/i18n/<locale>.ts` exporting `const x: Dictionary`,
// add the locale code here, and register it in `dictionaries` below. Components
// read strings through `useDictionary()` and never need to change.
export type Locale = typeof defaultLocale; // widen to "en-US" | "es-ES" | "de-DE" | "nb-NO"

const dictionaries: Record<Locale, Dictionary> = {
  "en-US": enUS,
};

export function getDictionary(locale: Locale = defaultLocale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

/** Fills {placeholders} in a dictionary string. */
export function format(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  );
}
