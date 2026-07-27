import type { Locale } from "@/i18n/config";

type ResearchSchemaProps = {
  locale: Locale;
  slug: string;
  title: string;
  description: string;
  researchId?: string;
  category?: string;
  source?: string;
  datePublished?: string;
  dateModified?: string;
};

const SITE_URL =
  "https://setarehsalehabadi.com";

const PERSON_ID =
  `${SITE_URL}/#person`;

const WEBSITE_ID =
  `${SITE_URL}/#website`;

const SOCIAL_IMAGE_URL =
  `${SITE_URL}/images/hero/hero.png`;

function normalizeSchemaDate(
  value?: string,
) {
  if (!value) {
    return undefined;
  }

  const normalizedValue =
    value.trim();

  if (!normalizedValue) {
    return undefined;
  }

  if (
    /^\d{4}-\d{2}-\d{2}$/.test(
      normalizedValue,
    ) ||
    /^\d{4}-\d{2}-\d{2}T/.test(
      normalizedValue,
    )
  ) {
    return normalizedValue;
  }

  const parsedDate =
    new Date(normalizedValue);

  if (
    Number.isNaN(
      parsedDate.getTime(),
    )
  ) {
    return undefined;
  }

  return parsedDate.toISOString();
}

function getLanguageCode(
  locale: Locale,
) {
  if (locale === "fa") {
    return "fa-IR";
  }

  if (locale === "de") {
    return "de-DE";
  }

  return "en-US";
}

function getHomeLabel(
  locale: Locale,
) {
  if (locale === "fa") {
    return "صفحه اصلی";
  }

  if (locale === "de") {
    return "Startseite";
  }

  return "Home";
}

function getResearchLabel(
  locale: Locale,
) {
  if (locale === "fa") {
    return "آزمایشگاه پژوهش";
  }

  return "Research Lab";
}

export default function ResearchSchema({
  locale,
  slug,
  title,
  description,
  researchId,
  category,
  source,
  datePublished,
  dateModified,
}: ResearchSchemaProps) {
  const articleUrl =
    `${SITE_URL}/${locale}/research/${slug}`;

  const researchUrl =
    `${SITE_URL}/${locale}/research`;

  const localizedHomeUrl =
    `${SITE_URL}/${locale}`;

  const articleId =
    `${articleUrl}#article`;

  const webpageId =
    `${articleUrl}#webpage`;

  const breadcrumbId =
    `${articleUrl}#breadcrumb`;

  const researchCollectionId =
    `${researchUrl}#collection`;

  const languageCode =
    getLanguageCode(locale);

  const normalizedPublishedDate =
    normalizeSchemaDate(
      datePublished,
    );

  const normalizedModifiedDate =
    normalizeSchemaDate(
      dateModified,
    ) ||
    normalizedPublishedDate;

  const schema = {
    "@context":
      "https://schema.org",

    "@graph": [
      {
        "@type":
          "Article",

        "@id":
          articleId,

        headline:
          title,

        description,

        url:
          articleUrl,

        inLanguage:
          languageCode,

        mainEntityOfPage: {
          "@id":
            webpageId,
        },

        author: {
          "@id":
            PERSON_ID,
        },

        publisher: {
          "@id":
            PERSON_ID,
        },

        isPartOf: {
          "@id":
            researchCollectionId,
        },

        image: {
          "@type":
            "ImageObject",

          url:
            SOCIAL_IMAGE_URL,
        },

        ...(normalizedPublishedDate
          ? {
              datePublished:
                normalizedPublishedDate,
            }
          : {}),

        ...(normalizedModifiedDate
          ? {
              dateModified:
                normalizedModifiedDate,
            }
          : {}),

        ...(category
          ? {
              articleSection:
                category,
            }
          : {}),

        ...(researchId
          ? {
              identifier: {
                "@type":
                  "PropertyValue",

                propertyID:
                  "Research Lab ID",

                value:
                  researchId,
              },
            }
          : {}),

        ...(source
          ? {
              isBasedOn: {
                "@type":
                  "CreativeWork",

                name:
                  source,
              },

              citation:
                source,
            }
          : {}),
      },

      {
        "@type":
          "WebPage",

        "@id":
          webpageId,

        url:
          articleUrl,

        name:
          title,

        description,

        inLanguage:
          languageCode,

        isPartOf: {
          "@id":
            WEBSITE_ID,
        },

        breadcrumb: {
          "@id":
            breadcrumbId,
        },

        mainEntity: {
          "@id":
            articleId,
        },

        about: {
          "@id":
            PERSON_ID,
        },

        primaryImageOfPage: {
          "@type":
            "ImageObject",

          url:
            SOCIAL_IMAGE_URL,
        },
      },

      {
        "@type":
          "CollectionPage",

        "@id":
          researchCollectionId,

        url:
          researchUrl,

        name:
          getResearchLabel(
            locale,
          ),

        inLanguage:
          languageCode,

        isPartOf: {
          "@id":
            WEBSITE_ID,
        },
      },

      {
        "@type":
          "BreadcrumbList",

        "@id":
          breadcrumbId,

        itemListElement: [
          {
            "@type":
              "ListItem",

            position:
              1,

            name:
              getHomeLabel(
                locale,
              ),

            item:
              localizedHomeUrl,
          },

          {
            "@type":
              "ListItem",

            position:
              2,

            name:
              getResearchLabel(
                locale,
              ),

            item:
              researchUrl,
          },

          {
            "@type":
              "ListItem",

            position:
              3,

            name:
              title,

            item:
              articleUrl,
          },
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