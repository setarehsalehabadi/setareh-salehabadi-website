import Link from "next/link";

import type {
  Locale,
} from "@/i18n/config";

import type {
  ResearchArticle,
} from "@/types/research";

type RelatedResearchProps = {
  articles: ResearchArticle[];
  currentSlug: string;
  locale: Locale;
};

type LocalizedContent = {
  eyebrow: string;
  title: string;
  libraryLabel: string;
  readLabel: string;
  emptyTitle: string;
  emptyDescription: string;
  publicationDateLabel: string;
  readingTimeLabel: string;
};

const localizedContent: Record<
  Locale,
  LocalizedContent
> = {
  en: {
    eyebrow:
      "Research Library",

    title:
      "Related Research",

    libraryLabel:
      "View Research Library",

    readLabel:
      "Read Research",

    emptyTitle:
      "No related research is available yet",

    emptyDescription:
      "Additional evidence-based research records will appear here after publication.",

    publicationDateLabel:
      "Published",

    readingTimeLabel:
      "Reading time",
  },

  de: {
    eyebrow:
      "Research Library",

    title:
      "Verwandte Forschung",

    libraryLabel:
      "Research Library ansehen",

    readLabel:
      "Analyse lesen",

    emptyTitle:
      "Noch keine verwandte Forschung verfügbar",

    emptyDescription:
      "Weitere evidenzbasierte Forschungsberichte erscheinen hier nach ihrer Veröffentlichung.",

    publicationDateLabel:
      "Veröffentlicht",

    readingTimeLabel:
      "Lesezeit",
  },

  fa: {
    eyebrow:
      "کتابخانه پژوهش",

    title:
      "پژوهش‌های مرتبط",

    libraryLabel:
      "مشاهده کتابخانه پژوهش",

    readLabel:
      "مطالعه پژوهش",

    emptyTitle:
      "هنوز پژوهش مرتبط دیگری منتشر نشده است",

    emptyDescription:
      "پس از انتشار پرونده‌های پژوهشی جدید، تحلیل‌های مرتبط در این بخش نمایش داده می‌شوند.",

    publicationDateLabel:
      "تاریخ انتشار",

    readingTimeLabel:
      "زمان مطالعه",
  },
};

function convertToPersianDigits(
  value: string,
): string {
  const persianDigits =
    "۰۱۲۳۴۵۶۷۸۹";

  return value.replace(
    /\d/g,
    (digit) =>
      persianDigits[
        Number(digit)
      ],
  );
}

function formatResearchDate(
  value: string,
  locale: Locale,
): string {
  if (
    locale !== "fa"
  ) {
    return value;
  }

  const normalizedValue =
    value.trim();

  if (
    !normalizedValue
  ) {
    return value;
  }

  const date =
    new Date(
      `${normalizedValue}T12:00:00Z`,
    );

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return convertToPersianDigits(
      normalizedValue,
    );
  }

  return new Intl.DateTimeFormat(
    "fa-IR-u-ca-persian",
    {
      day:
        "numeric",

      month:
        "long",

      year:
        "numeric",

      timeZone:
        "UTC",
    },
  ).format(date);
}

function formatReadingTime(
  value: string,
  locale: Locale,
): string {
  if (
    locale !== "fa"
  ) {
    return value;
  }

  const normalizedValue =
    value.trim();

  if (
    !normalizedValue
  ) {
    return value;
  }

  const minuteMatch =
    normalizedValue.match(
      /[0-9۰-۹]+/,
    );

  if (
    minuteMatch &&
    /\b(?:min|mins|minute|minutes)\b/i.test(
      normalizedValue,
    )
  ) {
    return `${convertToPersianDigits(
      minuteMatch[0],
    )} دقیقه`;
  }

  return convertToPersianDigits(
    normalizedValue,
  );
}

function getUniqueArticles(
  articles: ResearchArticle[],
  currentSlug: string,
) {
  const seenSlugs =
    new Set<string>();

  return articles.filter(
    (article) => {
      const normalizedSlug =
        article.slug.trim();

      if (
        !normalizedSlug ||
        normalizedSlug ===
          currentSlug ||
        seenSlugs.has(
          normalizedSlug,
        )
      ) {
        return false;
      }

      seenSlugs.add(
        normalizedSlug,
      );

      return true;
    },
  );
}

export default function RelatedResearch({
  articles,
  currentSlug,
  locale,
}: RelatedResearchProps) {
  const isPersian =
    locale === "fa";

  const content =
    localizedContent[
      locale
    ];

  const currentArticle =
    articles.find(
      (article) =>
        article.slug ===
        currentSlug,
    );

  const currentCategory =
    currentArticle
      ?.category
      ?.trim()
      .toLocaleLowerCase();

  const relatedArticles =
    getUniqueArticles(
      articles,
      currentSlug,
    )
      .map(
        (
          article,
          index,
        ) => ({
          article,
          index,

          categoryMatches:
            Boolean(
              currentCategory &&
                article.category
                  ?.trim()
                  .toLocaleLowerCase() ===
                  currentCategory,
            ),
        }),
      )
      .sort(
        (
          first,
          second,
        ) => {
          if (
            first.categoryMatches !==
            second.categoryMatches
          ) {
            return first.categoryMatches
              ? -1
              : 1;
          }

          return (
            first.index -
            second.index
          );
        },
      )
      .slice(
        0,
        3,
      )
      .map(
        ({
          article,
        }) =>
          article,
      );

  return (
    <section
      lang={
        locale
      }
      dir={
        isPersian
          ? "rtl"
          : "ltr"
      }
      aria-labelledby="related-research-heading"
      className="
        mt-12
        rounded-[34px]
        border
        border-[#2d2925]/10
        bg-[#fbf9f5]
        px-5
        py-8
        shadow-[0_18px_50px_rgba(40,35,30,0.05)]
        sm:px-8
        sm:py-10
        md:px-12
        md:py-12
      "
    >
      <div
        className="
          flex
          flex-col
          gap-4
          border-b
          border-[#2d2925]/10
          pb-7
          sm:flex-row
          sm:items-end
          sm:justify-between
        "
      >
        <div>
          <p
            className={`
              font-sans
              font-semibold
              text-[#8a672f]
              ${
                isPersian
                  ? "text-[11px] leading-6"
                  : "text-[10px] uppercase tracking-[0.22em]"
              }
            `}
          >
            {
              content.eyebrow
            }
          </p>

          <h2
            id="related-research-heading"
            className={`
              mt-3
              text-[#171512]
              ${
                isPersian
                  ? "font-sans text-[clamp(1.7rem,3vw,2.5rem)] font-[650] leading-[1.7] tracking-normal"
                  : "font-serif text-[clamp(2rem,3vw,2.8rem)] font-semibold leading-[1.2]"
              }
            `}
          >
            {
              content.title
            }
          </h2>
        </div>

        <Link
          href={`/${locale}/research`}
          className={`
            inline-flex
            w-fit
            items-center
            gap-2
            font-sans
            font-semibold
            text-[#183655]
            transition-colors
            duration-300
            hover:text-[#2e5d91]
            focus-visible:outline-none
            focus-visible:ring-4
            focus-visible:ring-[#2e5d91]/10
            ${
              isPersian
                ? "text-[13px] leading-7"
                : "text-[14px]"
            }
          `}
        >
          <span>
            {
              content.libraryLabel
            }
          </span>

          <span
            aria-hidden="true"
          >
            {isPersian
              ? "←"
              : "→"}
          </span>
        </Link>
      </div>

      {relatedArticles.length >
      0 ? (
        <div
          className="
            mt-8
            grid
            gap-5
            lg:grid-cols-3
          "
        >
          {relatedArticles.map(
            (
              article,
            ) => (
              <article
                key={
                  article.slug
                }
                className="
                  group
                  flex
                  min-h-full
                  flex-col
                  rounded-[26px]
                  border
                  border-[#2d2925]/10
                  bg-white
                  p-6
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#183655]/20
                  hover:shadow-[0_18px_45px_rgba(40,35,30,0.07)]
                "
              >
                <div
                  className={`
                    flex
                    flex-wrap
                    items-center
                    gap-2
                    font-sans
                    text-[#756d63]
                    ${
                      isPersian
                        ? "text-[11px] leading-6"
                        : "text-[11px]"
                    }
                  `}
                >
                  {article.research_id && (
                    <span
                      dir="ltr"
                      className="
                        rounded-full
                        bg-[#183655]
                        px-3
                        py-1.5
                        font-semibold
                        text-white
                      "
                    >
                      {
                        article.research_id
                      }
                    </span>
                  )}

                  {article.category && (
                    <span
                      dir={
                        isPersian
                          ? "rtl"
                          : "auto"
                      }
                      className="
                        rounded-full
                        bg-[#f1ebe2]
                        px-3
                        py-1.5
                      "
                    >
                      {
                        article.category
                      }
                    </span>
                  )}
                </div>

                <h3
                  dir={
                    isPersian
                      ? "rtl"
                      : "auto"
                  }
                  className={`
                    mt-6
                    text-[#171512]
                    transition-colors
                    duration-300
                    group-hover:text-[#183655]
                    ${
                      isPersian
                        ? "font-sans text-[clamp(1.35rem,2vw,1.8rem)] font-[650] leading-[1.8] tracking-normal"
                        : "font-serif text-[clamp(1.65rem,2.2vw,2.1rem)] font-semibold leading-[1.35]"
                    }
                  `}
                >
                  {
                    article.title
                  }
                </h3>

                {(article.description ||
                  article.excerpt) && (
                  <p
                    dir={
                      isPersian
                        ? "rtl"
                        : "auto"
                    }
                    className={`
                      mt-4
                      line-clamp-3
                      font-sans
                      text-[#625d56]
                      ${
                        isPersian
                          ? "text-[14px] leading-[2]"
                          : "text-[14px] leading-7"
                      }
                    `}
                  >
                    {article.description ||
                      article.excerpt}
                  </p>
                )}

                <div
                  className={`
                    mt-auto
                    flex
                    flex-col
                    gap-2
                    border-t
                    border-[#2d2925]/10
                    pt-5
                    font-sans
                    text-[#82796e]
                    ${
                      isPersian
                        ? "text-[11px] leading-6"
                        : "text-[12px]"
                    }
                  `}
                >
                  {article.date && (
                    <span>
                      {isPersian ? (
                        <>
                          {
                            content.publicationDateLabel
                          }
                          :{" "}
                        </>
                      ) : null}

                      <time
                        dateTime={
                          article.date
                        }
                      >
                        {formatResearchDate(
                          article.date,
                          locale,
                        )}
                      </time>
                    </span>
                  )}

                  {article.readingTime && (
                    <span>
                      {isPersian ? (
                        <>
                          {
                            content.readingTimeLabel
                          }
                          :{" "}
                        </>
                      ) : null}

                      {formatReadingTime(
                        article.readingTime,
                        locale,
                      )}
                    </span>
                  )}
                </div>

                <Link
                  href={`/${locale}/research/${article.slug}`}
                  aria-label={`${content.readLabel}: ${article.title}`}
                  className={`
                    mt-6
                    inline-flex
                    w-fit
                    items-center
                    gap-2
                    font-sans
                    font-semibold
                    text-[#183655]
                    transition-colors
                    duration-300
                    hover:text-[#2e5d91]
                    focus-visible:outline-none
                    focus-visible:ring-4
                    focus-visible:ring-[#2e5d91]/10
                    ${
                      isPersian
                        ? "text-[13px] leading-7"
                        : "text-[14px]"
                    }
                  `}
                >
                  <span>
                    {
                      content.readLabel
                    }
                  </span>

                  <span
                    aria-hidden="true"
                  >
                    {isPersian
                      ? "←"
                      : "→"}
                  </span>
                </Link>
              </article>
            ),
          )}
        </div>
      ) : (
        <div
          className="
            mt-8
            rounded-[24px]
            border
            border-[#2d2925]/10
            bg-white
            px-6
            py-10
            text-center
            sm:px-10
            sm:py-12
          "
        >
          <h3
            className={`
              text-[#211f1c]
              ${
                isPersian
                  ? "font-sans text-[1.4rem] font-[650] leading-[1.8]"
                  : "font-serif text-[2rem] font-semibold leading-tight"
              }
            `}
          >
            {
              content.emptyTitle
            }
          </h3>

          <p
            className={`
              mx-auto
              mt-4
              max-w-[620px]
              font-sans
              text-[#625d56]
              ${
                isPersian
                  ? "text-[14.5px] leading-[2.05]"
                  : "text-[15px] leading-7"
              }
            `}
          >
            {
              content.emptyDescription
            }
          </p>
        </div>
      )}
    </section>
  );
}