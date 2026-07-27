import type { MetadataRoute } from "next";

import {
  expertiseSlugs,
} from "@/content/expertise-pages";

import {
  getResearchArticles,
} from "@/lib/research";

const SITE_URL =
  "https://setarehsalehabadi.com";

const locales = [
  "en",
  "de",
  "fa",
] as const;

const staticRoutes = [
  "",
  "/about",
  "/expertise",
  "/growth-system",
  "/case-studies",
  "/research",
  "/courses",
  "/privacy",
  "/terms",
] as const;

function createAlternates(
  route: string,
) {
  return {
    languages: {
      en:
        `${SITE_URL}/en${route}`,

      de:
        `${SITE_URL}/de${route}`,

      fa:
        `${SITE_URL}/fa${route}`,

      "x-default":
        `${SITE_URL}/en${route}`,
    },
  };
}

function getStaticPagePriority(
  route: string,
): number {
  if (route === "") {
    return 1;
  }

  if (route === "/research") {
    return 0.9;
  }

  if (
    route === "/expertise" ||
    route === "/growth-system" ||
    route === "/case-studies"
  ) {
    return 0.8;
  }

  return 0.7;
}

function getStaticPageFrequency(
  route: string,
): MetadataRoute.Sitemap[number]["changeFrequency"] {
  if (route === "") {
    return "weekly";
  }

  if (route === "/research") {
    return "daily";
  }

  return "monthly";
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const researchArticles =
    await getResearchArticles();

  const staticPages: MetadataRoute.Sitemap =
    staticRoutes.flatMap(
      (route) =>
        locales.map(
          (locale) => ({
            url:
              `${SITE_URL}/${locale}${route}`,

            lastModified:
              new Date(),

            changeFrequency:
              getStaticPageFrequency(
                route,
              ),

            priority:
              getStaticPagePriority(
                route,
              ),

            alternates:
              createAlternates(route),
          }),
        ),
    );

  const expertisePages: MetadataRoute.Sitemap =
    expertiseSlugs.flatMap(
      (slug) => {
        const route =
          `/expertise/${slug}`;

        return locales.map(
          (locale) => ({
            url:
              `${SITE_URL}/${locale}${route}`,

            lastModified:
              new Date(),

            changeFrequency:
              "monthly",

            priority:
              0.8,

            alternates:
              createAlternates(route),
          }),
        );
      },
    );

  const researchPages: MetadataRoute.Sitemap =
    researchArticles.map(
      (article) => ({
        url:
          `${SITE_URL}/fa/research/${article.slug}`,

        lastModified:
          article.date
            ? new Date(
                article.date,
              )
            : new Date(),

        changeFrequency:
          "monthly",

        priority:
          0.8,
      }),
    );

  return [
    ...staticPages,
    ...expertisePages,
    ...researchPages,
  ];
}