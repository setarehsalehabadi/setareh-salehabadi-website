import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Cormorant_Garamond,
  Manrope,
  Vazirmatn,
} from "next/font/google";

import Schema from "@/app/schema";
import AnalyticsConsent from "@/components/analytics/AnalyticsConsent";

import {
  isLocale,
  localeDirections,
  localeHtmlLanguages,
  locales,
  type Locale,
} from "@/i18n/config";

import "../globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const cormorant =
  Cormorant_Garamond({
    subsets: ["latin"],

    weight: [
      "400",
      "500",
      "600",
      "700",
    ],

    style: [
      "normal",
      "italic",
    ],

    variable:
      "--font-cormorant",

    display: "swap",
  });

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],

  weight: [
    "400",
    "500",
    "600",
    "700",
  ],

  variable:
    "--font-vazirmatn",

  display: "swap",
});

const siteUrl =
  "https://setarehsalehabadi.com";

const socialImagePath =
  "/images/hero/hero.png";

type LocalizedMetadata = {
  title: string;
  description: string;
  keywords: string[];
  openGraphLocale: string;
  socialImageAlt: string;
};

const metadataByLocale: Record<
  Locale,
  LocalizedMetadata
> = {
  en: {
    title:
      "Setareh Salehabadi | Digital Growth Strategist",

    description:
      "Digital growth strategy focused on SEO, consumer psychology, data analytics, customer experience and practical AI systems for sustainable business growth.",

    keywords: [
      "Digital Growth Strategist",
      "Digital Growth Strategy",
      "SEO Strategy",
      "Organic Growth",
      "Consumer Psychology",
      "Consumer Behavior",
      "Data Analytics",
      "Customer Experience",
      "AI Marketing",
      "Marketing Automation",
    ],

    openGraphLocale:
      "en_US",

    socialImageAlt:
      "Setareh Salehabadi, Digital Growth Strategist",
  },

  de: {
    title:
      "Setareh Salehabadi | Strategin für digitales Wachstum",

    description:
      "Strategie für digitales Wachstum mit Fokus auf SEO, Konsumentenpsychologie, Datenanalyse, Kundenerfahrung und praktische KI-Systeme.",

    keywords: [
      "Strategie für digitales Wachstum",
      "SEO Strategie",
      "Organisches Wachstum",
      "Digitale Marketingstrategie",
      "Konsumentenpsychologie",
      "Konsumentenverhalten",
      "Datenanalyse",
      "Kundenerfahrung",
      "Künstliche Intelligenz",
      "Marketingautomatisierung",
    ],

    openGraphLocale:
      "de_DE",

    socialImageAlt:
      "Setareh Salehabadi, Strategin für digitales Wachstum",
  },

  fa: {
    title:
      "ستاره صالح‌آبادی | استراتژیست رشد دیجیتال و سئو",

    description:
      "استراتژی رشد دیجیتال با تمرکز بر سئو، تحلیل رفتار مشتری، داده و هوش مصنوعی؛ برای تصمیم‌های دقیق‌تر و ساخت رشد پایدار در کسب‌وکارهای آنلاین.",

    keywords: [
      "استراتژی رشد دیجیتال",
      "استراتژیست رشد دیجیتال",
      "استراتژی سئو",
      "سئو و رشد ارگانیک",
      "استراتژی دیجیتال مارکتینگ",
      "روان‌شناسی مصرف‌کننده",
      "تحلیل رفتار مشتری",
      "تحلیل داده",
      "تجربه مشتری",
      "هوش مصنوعی در بازاریابی",
      "اتوماسیون بازاریابی",
    ],

    openGraphLocale:
      "fa_IR",

    socialImageAlt:
      "ستاره صالح‌آبادی، استراتژیست رشد دیجیتال و سئو",
  },
};

type LocaleLayoutProps = {
  children: React.ReactNode;

  params: Promise<{
    locale: string;
  }>;
};

type GenerateMetadataProps = {
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return locales.map(
    (locale) => ({
      locale,
    })
  );
}

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const {
    locale: localeParam,
  } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale =
    localeParam;

  const localizedMetadata =
    metadataByLocale[locale];

  const canonicalUrl =
    `${siteUrl}/${locale}`;

  return {
    metadataBase:
      new URL(siteUrl),

    title:
      localizedMetadata.title,

    description:
      localizedMetadata.description,

    keywords:
      localizedMetadata.keywords,

    applicationName:
      "Setareh Salehabadi",

    authors: [
      {
        name:
          "Setareh Salehabadi",

        url:
          canonicalUrl,
      },
    ],

    creator:
      "Setareh Salehabadi",

    publisher:
      "Setareh Salehabadi",
verification: {
  google:
    "hWQ288DEcelI4z4KirtrBsSLEV_jwVii3lIQLISpx9g",
},
    alternates: {
      canonical:
        canonicalUrl,

      languages: {
        en:
          `${siteUrl}/en`,

        de:
          `${siteUrl}/de`,

        fa:
          `${siteUrl}/fa`,

        "x-default":
          `${siteUrl}/en`,
      },
    },

    openGraph: {
      type:
        "website",

      url:
        canonicalUrl,

      siteName:
        "Setareh Salehabadi",

      locale:
        localizedMetadata
          .openGraphLocale,

      alternateLocale: [
        "en_US",
        "de_DE",
        "fa_IR",
      ].filter(
        (openGraphLocale) =>
          openGraphLocale !==
          localizedMetadata
            .openGraphLocale
      ),

      title:
        localizedMetadata.title,

      description:
        localizedMetadata.description,

      images: [
        {
          url:
            socialImagePath,

          alt:
            localizedMetadata
              .socialImageAlt,
        },
      ],
    },

    twitter: {
      card:
        "summary_large_image",

      title:
        localizedMetadata.title,

      description:
        localizedMetadata.description,

      images: [
        socialImagePath,
      ],
    },

    robots: {
      index: true,
      follow: true,

      googleBot: {
        index: true,
        follow: true,

        "max-image-preview":
          "large",

        "max-snippet":
          -1,

        "max-video-preview":
          -1,
      },
    },

    category:
      "digital marketing",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const {
    locale: localeParam,
  } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale =
    localeParam;

  const direction =
    localeDirections[locale];

  const htmlLanguage =
    localeHtmlLanguages[locale];

  return (
    <html
      lang={htmlLanguage}
      dir={direction}
    >
      <body
        className={`
          ${manrope.variable}
          ${cormorant.variable}
          ${vazirmatn.variable}
          min-h-screen
          bg-[#f4efe8]
          text-[#191919]
          antialiased
        `}
      >
        <Schema
          locale={locale}
        />

        {children}

        <AnalyticsConsent
          locale={locale}
        />
      </body>
    </html>
  );
}