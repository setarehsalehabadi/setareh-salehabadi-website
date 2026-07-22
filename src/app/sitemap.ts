import type { MetadataRoute } from "next";

import {
  locales,
  type Locale,
} from "@/i18n/config";

const siteUrl =
  "https://setarehsalehabadi.com";

const localizedRoutes = [
  "",
  "/about",
  "/case-studies",
  "/research",
  "/courses",
  "/privacy",
  "/terms",
] as const;

type LocalizedRoute =
  (typeof localizedRoutes)[number];

function createLocalizedUrl(
  locale: Locale,
  route: LocalizedRoute
) {
  return `${siteUrl}/${locale}${route}`;
}

function createLanguageAlternates(
  route: LocalizedRoute
) {
  return {
    en: createLocalizedUrl(
      "en",
      route
    ),

    de: createLocalizedUrl(
      "de",
      route
    ),

    fa: createLocalizedUrl(
      "fa",
      route
    ),

    "x-default": createLocalizedUrl(
      "en",
      route
    ),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return localizedRoutes.flatMap(
    (route) =>
      locales.map((locale) => ({
        url: createLocalizedUrl(
          locale,
          route
        ),

        alternates: {
          languages:
            createLanguageAlternates(
              route
            ),
        },
      }))
  );
}