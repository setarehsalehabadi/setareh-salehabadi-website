export const locales = ["en", "de", "fa"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
  fa: "فارسی",
};

export const localeShortLabels: Record<Locale, string> = {
  en: "EN",
  de: "DE",
  fa: "FA",
};

export const localeDirections: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  de: "ltr",
  fa: "rtl",
};

export const localeHtmlLanguages: Record<Locale, string> = {
  en: "en",
  de: "de",
  fa: "fa",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocaleDirection(locale: Locale): "ltr" | "rtl" {
  return localeDirections[locale];
}

export function getLocaleLabel(locale: Locale): string {
  return localeLabels[locale];
}

export function getLocaleShortLabel(locale: Locale): string {
  return localeShortLabels[locale];
}