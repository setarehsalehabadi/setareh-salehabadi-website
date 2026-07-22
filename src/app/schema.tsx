import {
  defaultLocale,
  type Locale,
} from "@/i18n/config";

type SchemaProps = {
  locale?: Locale;
};

type LocalizedSchemaContent = {
  jobTitle: string;
  description: string;
  knowsAbout: string[];
};

const siteUrl =
  "https://setarehsalehabadi.com";

const localizedContent: Record<
  Locale,
  LocalizedSchemaContent
> = {
  en: {
    jobTitle:
      "Digital Growth Strategist",

    description:
      "Digital growth strategy focused on SEO, consumer psychology, data, customer experience and practical artificial intelligence systems.",

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
  },

  de: {
    jobTitle:
      "Strategin für digitales Wachstum",

    description:
      "Strategie für digitales Wachstum mit Fokus auf SEO, Konsumentenpsychologie, Datenanalyse, Kundenerfahrung und praktische KI-Systeme.",

    knowsAbout: [
      "Strategie für digitales Wachstum",
      "Suchmaschinenoptimierung",
      "Organisches Wachstum",
      "Digitale Marketingstrategie",
      "Konsumentenpsychologie",
      "Konsumentenverhalten",
      "Datenanalyse",
      "Kundenerfahrung",
      "Künstliche Intelligenz",
      "Marketingautomatisierung",
    ],
  },

  fa: {
    jobTitle:
      "استراتژیست رشد دیجیتال",

    description:
      "استراتژی رشد دیجیتال با تمرکز بر سئو، رفتار مصرف‌کننده، تحلیل داده، تجربه مشتری و کاربرد عملی هوش مصنوعی.",

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
  },
};

export default function Schema({
  locale = defaultLocale,
}: SchemaProps) {
  const content =
    localizedContent[locale];

  const localizedUrl =
    `${siteUrl}/${locale}`;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${localizedUrl}#person`,

    name: "Setareh Salehabadi",

    alternateName:
      locale === "fa"
        ? "ستاره صالح‌آبادی"
        : undefined,

    url: localizedUrl,

    jobTitle: content.jobTitle,

    description:
      content.description,

    knowsAbout:
      content.knowsAbout,

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": localizedUrl,
    },
  };

  const serializedSchema =
    JSON.stringify(
      personSchema
    ).replace(
      /</g,
      "\\u003c"
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