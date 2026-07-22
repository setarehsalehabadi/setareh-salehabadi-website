import type { Locale } from "./config";
import { defaultLocale } from "./config";

const dictionaries = {
  en: () =>
    import("./dictionaries/en").then((module) => module.default),

  de: () =>
    import("./dictionaries/de").then((module) => module.default),

  fa: () =>
    import("./dictionaries/fa").then((module) => module.default),
} as const;

export async function getDictionary(
  locale: Locale = defaultLocale
) {
  const loader = dictionaries[locale] ?? dictionaries[defaultLocale];

  return loader();
}

export type Dictionary = Awaited<
  ReturnType<typeof getDictionary>
>;