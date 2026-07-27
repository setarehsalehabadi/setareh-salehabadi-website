import {
  defaultLocale,
  type Locale,
} from "@/i18n/config";

type SchemaProps = {
  locale?: Locale;
};

type LocalizedSchemaContent = {
  languageCode: string;
  languageName: string;

  jobTitle: string;
  description: string;

  serviceName: string;
  serviceDescription: string;

  knowsAbout: string[];

  services: {
    name: string;
    description: string;
    path: string;
  }[];
};

const siteUrl =
  "https://setarehsalehabadi.com";

const publicEmail =
  "salehabadi.setareh@gmail.com";

const localizedContent: Record<
  Locale,
  LocalizedSchemaContent
> = {
  en: {
    languageCode: "en",
    languageName: "English",

    jobTitle:
      "Digital Growth Strategist",

    description:
      "Digital Growth Strategist working across SEO, digital strategy, consumer psychology, data analytics, customer experience and practical artificial intelligence systems.",

    serviceName:
      "Digital Growth Strategy Services",

    serviceDescription:
      "Strategic digital growth services connecting SEO, consumer psychology, analytics, customer experience and practical AI automation.",

    knowsAbout: [
      "Digital Growth Strategy",
      "Search Engine Optimization",
      "Organic Growth",
      "Digital Marketing Strategy",
      "Consumer Psychology",
      "Consumer Behavior",
      "Data Analytics",
      "Customer Experience",
      "Artificial Intelligence",
      "Marketing Automation",
    ],

    services: [
      {
        name:
          "SEO & Organic Growth",
        description:
          "Technical SEO, search intent, content architecture and sustainable organic acquisition systems.",
        path:
          "/expertise/seo-organic-growth",
      },
      {
        name:
          "Digital Growth Strategy",
        description:
          "Strategic priorities, connected channels and measurable digital growth roadmaps.",
        path:
          "/expertise/digital-growth-strategy",
      },
      {
        name:
          "Consumer Psychology",
        description:
          "Behavioral insight focused on trust, decision-making and digital customer journeys.",
        path:
          "/expertise/consumer-psychology",
      },
      {
        name:
          "Data & Analytics",
        description:
          "Measurement frameworks, performance analysis and strategic interpretation of digital data.",
        path:
          "/expertise/data-analytics",
      },
      {
        name:
          "AI & Automation",
        description:
          "Practical AI and automation workflows designed to support consistent digital operations and decisions.",
        path:
          "/expertise/ai-automation",
      },
    ],
  },

  de: {
    languageCode: "de",
    languageName: "German",

    jobTitle:
      "Strategin für digitales Wachstum",

    description:
      "Strategin für digitales Wachstum mit Fokus auf SEO, digitale Strategie, Konsumentenpsychologie, Datenanalyse, Customer Experience und praxisnahe KI-Systeme.",

    serviceName:
      "Strategische Leistungen für digitales Wachstum",

    serviceDescription:
      "Strategische Leistungen, die SEO, Konsumentenpsychologie, Analytics, Customer Experience und praxisnahe KI-Automatisierung verbinden.",

    knowsAbout: [
      "Strategie für digitales Wachstum",
      "Suchmaschinenoptimierung",
      "Organisches Wachstum",
      "Digitale Marketingstrategie",
      "Konsumentenpsychologie",
      "Konsumentenverhalten",
      "Datenanalyse",
      "Customer Experience",
      "Künstliche Intelligenz",
      "Marketingautomatisierung",
    ],

    services: [
      {
        name:
          "SEO & organisches Wachstum",
        description:
          "Technisches SEO, Suchintention, Content-Architektur und nachhaltige organische Akquisitionssysteme.",
        path:
          "/expertise/seo-organic-growth",
      },
      {
        name:
          "Digitale Wachstumsstrategie",
        description:
          "Strategische Prioritäten, vernetzte Kanäle und messbare Roadmaps für digitales Wachstum.",
        path:
          "/expertise/digital-growth-strategy",
      },
      {
        name:
          "Konsumentenpsychologie",
        description:
          "Verhaltenswissen zu Vertrauen, Entscheidungsfindung und digitalen Customer Journeys.",
        path:
          "/expertise/consumer-psychology",
      },
      {
        name:
          "Daten & Analytics",
        description:
          "Messkonzepte, Performance-Analyse und strategische Interpretation digitaler Daten.",
        path:
          "/expertise/data-analytics",
      },
      {
        name:
          "KI & Automatisierung",
        description:
          "Praxisnahe KI- und Automatisierungsworkflows für konsistente digitale Prozesse und Entscheidungen.",
        path:
          "/expertise/ai-automation",
      },
    ],
  },

  fa: {
    languageCode: "fa",
    languageName: "Persian",

    jobTitle:
      "استراتژیست رشد دیجیتال",

    description:
      "استراتژیست رشد دیجیتال با تمرکز بر سئو، استراتژی دیجیتال، روان‌شناسی مصرف‌کننده، تحلیل داده، تجربه مشتری و کاربرد عملی هوش مصنوعی.",

    serviceName:
      "خدمات استراتژی رشد دیجیتال",

    serviceDescription:
      "خدمات استراتژیک رشد دیجیتال با ترکیب سئو، رفتار مصرف‌کننده، تحلیل داده، تجربه مشتری و اتوماسیون کاربردی هوش مصنوعی.",

    knowsAbout: [
      "استراتژی رشد دیجیتال",
      "سئو و بهینه‌سازی موتورهای جست‌وجو",
      "رشد ارگانیک",
      "استراتژی دیجیتال مارکتینگ",
      "روان‌شناسی مصرف‌کننده",
      "تحلیل رفتار مشتری",
      "تحلیل داده",
      "تجربه مشتری",
      "هوش مصنوعی",
      "اتوماسیون بازاریابی",
    ],

    services: [
      {
        name:
          "سئو و رشد ارگانیک",
        description:
          "سئوی فنی، تحلیل هدف جست‌وجو، معماری محتوا و طراحی سیستم رشد ارگانیک پایدار.",
        path:
          "/expertise/seo-organic-growth",
      },
      {
        name:
          "استراتژی رشد دیجیتال",
        description:
          "تعیین اولویت‌های استراتژیک، هماهنگی کانال‌ها و طراحی نقشه راه رشد قابل‌اندازه‌گیری.",
        path:
          "/expertise/digital-growth-strategy",
      },
      {
        name:
          "روان‌شناسی مصرف‌کننده",
        description:
          "تحلیل اعتماد، رفتار تصمیم‌گیری و مسیر دیجیتال مشتری با استفاده از بینش رفتاری.",
        path:
          "/expertise/consumer-psychology",
      },
      {
        name:
          "داده و تحلیل",
        description:
          "طراحی چارچوب اندازه‌گیری، تحلیل عملکرد و تفسیر استراتژیک داده‌های دیجیتال.",
        path:
          "/expertise/data-analytics",
      },
      {
        name:
          "هوش مصنوعی و اتوماسیون",
        description:
          "طراحی جریان‌های کاربردی هوش مصنوعی و اتوماسیون برای فرایندها و تصمیم‌های دیجیتال منسجم‌تر.",
        path:
          "/expertise/ai-automation",
      },
    ],
  },
};

export default function Schema({
  locale = defaultLocale,
}: SchemaProps) {
  const content =
    localizedContent[locale];

  const localizedUrl =
    `${siteUrl}/${locale}`;

  const personId =
    `${siteUrl}/#person`;

  const websiteId =
    `${siteUrl}/#website`;

  const serviceId =
    `${siteUrl}/#professional-service`;

  const webpageId =
    `${localizedUrl}#webpage`;

  const schema = {
    "@context":
      "https://schema.org",

    "@graph": [
      {
        "@type": "Person",
        "@id": personId,

        name:
          "Setareh Salehabadi",

        alternateName: [
          "ستاره صالح‌آبادی",
          "Setareh Salehabadi",
        ],

        url:
          `${localizedUrl}/about`,

        email:
          publicEmail,

        jobTitle:
          content.jobTitle,

        description:
          content.description,

        knowsAbout:
          content.knowsAbout,

        mainEntityOfPage: {
          "@id":
            webpageId,
        },

        subjectOf: [
          {
            "@type":
              "WebPage",

            "@id":
              `${localizedUrl}/about`,
          },
          {
            "@type":
              "CollectionPage",

            "@id":
              `${localizedUrl}/research`,
          },
          {
            "@type":
              "CollectionPage",

            "@id":
              `${localizedUrl}/case-studies`,
          },
        ],
      },

      {
        "@type": "WebSite",
        "@id": websiteId,

        url:
          siteUrl,

        name:
          "Setareh Salehabadi",

        alternateName:
          "Setareh Salehabadi — Digital Growth Strategist",

        description:
          content.description,

        inLanguage: [
          "en",
          "de",
          "fa",
        ],

        publisher: {
          "@id":
            personId,
        },
      },

      {
        "@type":
          "ProfessionalService",

        "@id":
          serviceId,

        name:
          content.serviceName,

        url:
          `${localizedUrl}/expertise`,

        email:
          publicEmail,

        description:
          content.serviceDescription,

        provider: {
          "@id":
            personId,
        },

        mainEntityOfPage: {
          "@id":
            `${localizedUrl}/expertise`,
        },

        availableLanguage: [
          {
            "@type":
              "Language",

            name:
              "English",

            alternateName:
              "en",
          },
          {
            "@type":
              "Language",

            name:
              "German",

            alternateName:
              "de",
          },
          {
            "@type":
              "Language",

            name:
              "Persian",

            alternateName:
              "fa",
          },
        ],

        hasOfferCatalog: {
          "@type":
            "OfferCatalog",

          name:
            content.serviceName,

          itemListElement:
            content.services.map(
              (
                service,
                index,
              ) => ({
                "@type":
                  "Offer",

                position:
                  index + 1,

                itemOffered: {
                  "@type":
                    "Service",

                  name:
                    service.name,

                  description:
                    service.description,

                  url:
                    `${localizedUrl}${service.path}`,

                  provider: {
                    "@id":
                      personId,
                  },
                },
              }),
            ),
        },
      },

      {
        "@type":
          "WebPage",

        "@id":
          webpageId,

        url:
          localizedUrl,

        name:
          content.jobTitle,

        description:
          content.description,

        inLanguage:
          content.languageCode,

        isPartOf: {
          "@id":
            websiteId,
        },

        about: {
          "@id":
            personId,
        },

        mainEntity: {
          "@id":
            personId,
        },

        primaryImageOfPage: {
          "@type":
            "ImageObject",

          url:
            `${siteUrl}/images/hero/strategy-hero.jpg`,
        },

        significantLink: [
          `${localizedUrl}/expertise`,
          `${localizedUrl}/growth-system`,
          `${localizedUrl}/case-studies`,
          `${localizedUrl}/research`,
          `${localizedUrl}/about`,
        ],
      },
    ],
  };

  const serializedSchema =
    JSON.stringify(
      schema,
    ).replace(
      /</g,
      "\\u003c",
    );

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html:
          serializedSchema,
      }}
    />
  );
}