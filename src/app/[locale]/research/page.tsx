import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";

import {
  isLocale,
  type Locale,
} from "@/i18n/config";

import {
  getDictionary,
} from "@/i18n/get-dictionary";

import {
  getResearchArticles,
} from "@/lib/research";

const siteUrl =
  "https://setarehsalehabadi.com";

const socialImagePath =
  "/images/hero/hero.png";

type ResearchPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

type ResearchPageContent = {
  metadataTitle: string;
  metadataDescription: string;
  openGraphLocale: string;
  socialImageAlt: string;

  homeLabel: string;
  pageLabel: string;

  eyebrow: string;
  title: string;
  description: string;

  articleCountLabel: string;
  readLabel: string;

  emptyTitle: string;
  emptyDescription: string;
};

const pageContent: Record<
  Locale,
  ResearchPageContent
> = {
  en: {
    metadataTitle:
      "Research Lab | Setareh Salehabadi",

    metadataDescription:
      "Evidence-based research and analysis across artificial intelligence, consumer psychology, digital marketing, SEO and business growth strategy.",

    openGraphLocale:
      "en_US",

    socialImageAlt:
      "Research Lab by Setareh Salehabadi",

    homeLabel:
      "Home",

    pageLabel:
      "Research Lab",

    eyebrow:
      "Research Lab",

    title:
      "Evidence-Based Growth Intelligence",

    description:
      "Research-driven analysis across artificial intelligence, consumer psychology, digital marketing, search behaviour and business growth strategy.",

    articleCountLabel:
      "published research records",

    readLabel:
      "Read research",

    emptyTitle:
      "Research records are being prepared",

    emptyDescription:
      "New evidence-based analyses will appear here after completing the research and editorial review process.",
  },

  de: {
    metadataTitle:
      "Research Lab | Setareh Salehabadi",

    metadataDescription:
      "Evidenzbasierte Forschung und Analysen zu künstlicher Intelligenz, Konsumentenpsychologie, digitalem Marketing, SEO und Wachstumsstrategie.",

    openGraphLocale:
      "de_DE",

    socialImageAlt:
      "Research Lab von Setareh Salehabadi",

    homeLabel:
      "Startseite",

    pageLabel:
      "Research Lab",

    eyebrow:
      "Research Lab",

    title:
      "Evidenzbasierte Wachstumsintelligenz",

    description:
      "Forschungsbasierte Analysen zu künstlicher Intelligenz, Konsumentenpsychologie, digitalem Marketing, Suchverhalten und strategischem Unternehmenswachstum.",

    articleCountLabel:
      "veröffentlichte Forschungsberichte",

    readLabel:
      "Analyse lesen",

    emptyTitle:
      "Forschungsberichte werden vorbereitet",

    emptyDescription:
      "Neue evidenzbasierte Analysen erscheinen hier nach Abschluss des Forschungs- und redaktionellen Prüfprozesses.",
  },

  fa: {
    metadataTitle:
      "جدیدترین پژوهش‌ها | ستاره صالح‌آبادی",

    metadataDescription:
      "تحلیل پژوهش‌های علمی در حوزه هوش مصنوعی، روان‌شناسی مصرف‌کننده، بازاریابی دیجیتال و استراتژی رشد کسب‌وکار.",

    openGraphLocale:
      "fa_IR",

    socialImageAlt:
      "جدیدترین پژوهش‌های ستاره صالح‌آبادی",

    homeLabel:
      "صفحه اصلی",

    pageLabel:
      "جدیدترین پژوهش‌ها",

    eyebrow:
      "جدیدترین پژوهش‌ها",

    title:
      "افزایش رشد کسب‌وکارها با تکیه بر شواهد",

    description:
      "تحلیل پژوهش‌های علمی در حوزه هوش مصنوعی، روان‌شناسی مصرف‌کننده، بازاریابی دیجیتال و استراتژی رشد کسب‌وکار.",

    articleCountLabel:
      "پرونده پژوهشی منتشرشده",

    readLabel:
      "مطالعه پژوهش",

    emptyTitle:
      "پرونده‌های پژوهشی در حال آماده‌سازی هستند",

    emptyDescription:
      "تحلیل‌های جدید پس از تکمیل فرایند پژوهش و بررسی تحریریه در این بخش منتشر می‌شوند.",
  },
};

function formatNumber(
  value: number,
  locale: Locale,
): string {
  return new Intl.NumberFormat(
    locale === "fa"
      ? "fa-IR"
      : locale,
    {
      minimumIntegerDigits:
        2,

      useGrouping:
        false,
    },
  ).format(value);
}

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
  const normalizedValue =
    value.trim();

  if (!normalizedValue) {
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
    return locale === "fa"
      ? convertToPersianDigits(
          normalizedValue,
        )
      : normalizedValue;
  }

  if (locale === "fa") {
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

  return new Intl.DateTimeFormat(
    locale === "de"
      ? "de-DE"
      : "en-US",
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
  const normalizedValue =
    value.trim();

  if (
    locale !== "fa"
  ) {
    return normalizedValue;
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

export async function generateMetadata({
  params,
}: ResearchPageProps): Promise<Metadata> {
  const {
    locale: localeParam,
  } = await params;

  if (
    !isLocale(
      localeParam,
    )
  ) {
    notFound();
  }

  const locale: Locale =
    localeParam;

  const content =
    pageContent[
      locale
    ];

  const canonicalUrl =
    `${siteUrl}/${locale}/research`;

  return {
    title:
      content.metadataTitle,

    description:
      content.metadataDescription,

    alternates: {
      canonical:
        canonicalUrl,

      languages: {
        en:
          `${siteUrl}/en/research`,

        de:
          `${siteUrl}/de/research`,

        fa:
          `${siteUrl}/fa/research`,

        "x-default":
          `${siteUrl}/en/research`,
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
        content.openGraphLocale,

      alternateLocale: [
        "en_US",
        "de_DE",
        "fa_IR",
      ].filter(
        (
          openGraphLocale,
        ) =>
          openGraphLocale !==
          content.openGraphLocale,
      ),

      title:
        content.metadataTitle,

      description:
        content.metadataDescription,

      images: [
        {
          url:
            socialImagePath,

          alt:
            content.socialImageAlt,
        },
      ],
    },

    twitter: {
      card:
        "summary_large_image",

      title:
        content.metadataTitle,

      description:
        content.metadataDescription,

      images: [
        socialImagePath,
      ],
    },
  };
}

export default async function ResearchPage({
  params,
}: ResearchPageProps) {
  const {
    locale: localeParam,
  } = await params;

  if (
    !isLocale(
      localeParam,
    )
  ) {
    notFound();
  }

  const locale: Locale =
    localeParam;

  const isPersian =
    locale === "fa";

  const [
    dictionary,
    articles,
  ] = await Promise.all([
    getDictionary(
      locale,
    ),

    getResearchArticles(),
  ]);

  const content =
    pageContent[
      locale
    ];

  return (
    <div
      id="top"
      lang={
        locale
      }
      dir={
        isPersian
          ? "rtl"
          : "ltr"
      }
      className="
        min-h-screen
        bg-[#f7f3ed]
        text-[#211f1c]
      "
    >
      <Header
        locale={
          locale
        }
        dictionary={
          dictionary.header
        }
        common={
          dictionary.common
        }
      />

      <main
        id="main-content"
        tabIndex={-1}
        className="
          min-w-0
          outline-none
        "
      >
        <section
          aria-labelledby="research-page-heading"
          className="
            border-b
            border-[#302d29]/15
            bg-[#f4efe8]
          "
        >
          <div
            className="
              mx-auto
              max-w-[1480px]
              px-5
              pb-20
              pt-10
              sm:px-8
              sm:pb-24
              sm:pt-12
              lg:px-12
              lg:pb-28
              lg:pt-16
              xl:px-16
            "
          >
            <nav
              aria-label={
                isPersian
                  ? "مسیر صفحه"
                  : "Breadcrumb"
              }
              className="
                flex
                flex-wrap
                items-center
                gap-3
                border-b
                border-[#302d29]/12
                pb-6
              "
            >
              <Link
                href={`/${locale}`}
                className={`
                  font-sans
                  font-semibold
                  text-[#6e675f]
                  transition-colors
                  duration-300
                  hover:text-[#2e5d91]
                  focus-visible:outline-none
                  focus-visible:ring-4
                  focus-visible:ring-[#2e5d91]/10
                  ${
                    isPersian
                      ? "text-[12px] leading-6"
                      : "text-[11px] uppercase tracking-[0.14em]"
                  }
                `}
              >
                {
                  content.homeLabel
                }
              </Link>

              <span
                aria-hidden="true"
                className="
                  h-px
                  w-6
                  bg-[#b48a52]
                "
              />

              <span
                aria-current="page"
                className={`
                  font-sans
                  font-semibold
                  text-[#8a672f]
                  ${
                    isPersian
                      ? "text-[12px] leading-6"
                      : "text-[11px] uppercase tracking-[0.14em]"
                  }
                `}
              >
                {
                  content.pageLabel
                }
              </span>
            </nav>

            <div
              className="
                mt-10
                grid
                gap-10
                lg:mt-14
                lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.42fr)]
                lg:items-end
                lg:gap-16
              "
            >
              <header
                className="
                  min-w-0
                "
              >
                <p
                  className={`
                    font-sans
                    font-semibold
                    text-[#8a672f]
                    ${
                      isPersian
                        ? "text-[11px] leading-6 sm:text-[12px]"
                        : "text-[10px] uppercase tracking-[0.3em] sm:text-[11px]"
                    }
                  `}
                >
                  {
                    content.eyebrow
                  }
                </p>

                <h1
                  id="research-page-heading"
                  className={`
                    mt-5
                    max-w-[940px]
                    text-[#171512]
                    ${
                      isPersian
                        ? "font-sans text-[clamp(2rem,3.6vw,3.7rem)] font-[650] leading-[1.55] tracking-normal"
                        : "font-serif text-[clamp(3.2rem,5.8vw,5.8rem)] font-medium leading-[0.98] tracking-[-0.045em]"
                    }
                  `}
                >
                  {
                    content.title
                  }
                </h1>

                <p
                  className={`
                    mt-7
                    max-w-[800px]
                    font-sans
                    text-[#625d56]
                    ${
                      isPersian
                        ? "text-[16px] leading-[2.1] sm:text-[17px]"
                        : "text-[18px] leading-[2.1rem] lg:text-[19px] lg:leading-[2.2rem]"
                    }
                  `}
                >
                  {
                    content.description
                  }
                </p>
              </header>

              <aside
                aria-label={
                  content.articleCountLabel
                }
                className="
                  rounded-[26px]
                  border
                  border-[#302d29]/15
                  bg-[#ebe4da]/65
                  p-6
                  sm:p-7
                "
              >
                <span
                  className="
                    block
                    font-sans
                    text-[clamp(3.5rem,7vw,5.5rem)]
                    font-semibold
                    leading-none
                    text-[#2e5d91]
                  "
                >
                  {formatNumber(
                    articles.length,
                    locale,
                  )}
                </span>

                <span
                  className={`
                    mt-4
                    block
                    font-sans
                    font-medium
                    text-[#625d56]
                    ${
                      isPersian
                        ? "text-[13px] leading-7"
                        : "text-[12px] uppercase tracking-[0.12em]"
                    }
                  `}
                >
                  {
                    content.articleCountLabel
                  }
                </span>
              </aside>
            </div>
          </div>
        </section>

        <section
          aria-label={
            isPersian
              ? "فهرست پژوهش‌ها"
              : "Research articles"
          }
          className="
            border-b
            border-[#302d29]/15
            bg-[#f7f3ed]
          "
        >
          <div
            className="
              mx-auto
              max-w-[1480px]
              px-5
              py-20
              sm:px-8
              sm:py-24
              lg:px-12
              lg:py-28
              xl:px-16
            "
          >
            {articles.length >
            0 ? (
              <div
                className="
                  space-y-8
                  sm:space-y-10
                "
              >
                {articles.map(
                  (
                    article,
                    index,
                  ) => {
                    const articleDescription =
                      article.description ||
                      article.excerpt;

                    return (
                      <article
                        key={
                          article.slug
                        }
                        className="
                          group
                          relative
                          overflow-hidden
                          rounded-[30px]
                          border
                          border-[#302d29]/12
                          bg-white
                          shadow-[0_18px_48px_rgba(45,39,33,0.045)]
                          transition-all
                          duration-300
                          hover:-translate-y-1
                          hover:border-[#2e5d91]/25
                          hover:shadow-[0_26px_64px_rgba(45,39,33,0.08)]
                          sm:rounded-[34px]
                        "
                      >
                        <Link
                          href={`/${locale}/research/${article.slug}`}
                          aria-label={`${content.readLabel}: ${article.title}`}
                          className="
                            block
                            px-6
                            py-8
                            focus-visible:outline-none
                            focus-visible:ring-4
                            focus-visible:ring-inset
                            focus-visible:ring-[#2e5d91]/15
                            sm:px-9
                            sm:py-10
                            md:px-12
                            md:py-12
                            lg:px-14
                            lg:py-14
                          "
                        >
                          <div
                            className="
                              flex
                              flex-col
                              gap-8
                              lg:grid
                              lg:grid-cols-[minmax(0,1fr)_200px]
                              lg:items-start
                              lg:gap-14
                            "
                          >
                            <div
                              className="
                                min-w-0
                              "
                            >
                              <div
                                className="
                                  flex
                                  flex-wrap
                                  items-center
                                  gap-3
                                  font-sans
                                  text-[11px]
                                  leading-6
                                  text-[#756d63]
                                "
                              >
                                {article.research_id && (
                                  <span
                                    dir="ltr"
                                    className="
                                      inline-flex
                                      items-center
                                      gap-3
                                      font-semibold
                                      text-[#8a672f]
                                    "
                                  >
                                    <span
                                      aria-hidden="true"
                                      className="
                                        h-px
                                        w-5
                                        bg-[#b4853b]
                                      "
                                    />

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
                                  >
                                    {
                                      article.category
                                    }
                                  </span>
                                )}

                                {article.status && (
                                  <span
                                    dir={
                                      isPersian
                                        ? "rtl"
                                        : "auto"
                                    }
                                    className="
                                      rounded-full
                                      bg-[#ebe4da]/75
                                      px-3
                                      py-1.5
                                    "
                                  >
                                    {
                                      article.status
                                    }
                                  </span>
                                )}
                              </div>

                              <h2
                                dir={
                                  isPersian
                                    ? "rtl"
                                    : "auto"
                                }
                                className={`
                                  mt-7
                                  max-w-[980px]
                                  text-[#171512]
                                  transition-colors
                                  duration-300
                                  group-hover:text-[#183655]
                                  ${
                                    isPersian
                                      ? "font-sans text-[clamp(1.75rem,3.2vw,3rem)] font-[650] leading-[1.65] tracking-normal"
                                      : "font-serif text-[clamp(2.2rem,4vw,4rem)] font-medium leading-[1.06] tracking-[-0.04em]"
                                  }
                                `}
                              >
                                {
                                  article.title
                                }
                              </h2>

                              {articleDescription && (
                                <p
                                  dir={
                                    isPersian
                                      ? "rtl"
                                      : "auto"
                                  }
                                  className={`
                                    mt-6
                                    max-w-[900px]
                                    font-sans
                                    text-[#625d56]
                                    ${
                                      isPersian
                                        ? "text-[15.5px] leading-[2.1] sm:text-[16.5px]"
                                        : "text-[17px] leading-[2rem]"
                                    }
                                  `}
                                >
                                  {
                                    articleDescription
                                  }
                                </p>
                              )}
                            </div>

                            <div
                              className="
                                flex
                                min-w-0
                                flex-col
                                border-t
                                border-[#302d29]/10
                                pt-6
                                lg:min-h-full
                                lg:border-s
                                lg:border-t-0
                                lg:ps-8
                                lg:pt-0
                              "
                            >
                              <span
                                className="
                                  font-sans
                                  text-[11px]
                                  font-semibold
                                  text-[#9a8170]
                                "
                              >
                                {formatNumber(
                                  index + 1,
                                  locale,
                                )}
                              </span>

                              <div
                                className="
                                  mt-5
                                  space-y-2
                                  font-sans
                                  text-[12px]
                                  leading-6
                                  text-[#756d63]
                                "
                              >
                                {article.date && (
                                  <time
                                    dateTime={
                                      article.date
                                    }
                                    className="
                                      block
                                    "
                                  >
                                    {formatResearchDate(
                                      article.date,
                                      locale,
                                    )}
                                  </time>
                                )}

                                {article.readingTime && (
                                  <span
                                    className="
                                      block
                                    "
                                  >
                                    {formatReadingTime(
                                      article.readingTime,
                                      locale,
                                    )}
                                  </span>
                                )}
                              </div>

                              <span
                                className="
                                  mt-7
                                  inline-flex
                                  w-fit
                                  items-center
                                  gap-3
                                  font-sans
                                  text-[13px]
                                  font-semibold
                                  text-[#183655]
                                  lg:mt-auto
                                  lg:pt-10
                                "
                              >
                                <span>
                                  {
                                    content.readLabel
                                  }
                                </span>

                                <span
                                  aria-hidden="true"
                                  className="
                                    text-[17px]
                                    transition-transform
                                    duration-300
                                    group-hover:translate-x-0.5
                                    group-hover:-translate-y-0.5
                                  "
                                >
                                  {isPersian
                                    ? "↖"
                                    : "↗"}
                                </span>
                              </span>
                            </div>
                          </div>
                        </Link>
                      </article>
                    );
                  },
                )}
              </div>
            ) : (
              <div
                role="status"
                className="
                  rounded-[30px]
                  border
                  border-[#302d29]/12
                  bg-white
                  px-6
                  py-16
                  text-center
                  shadow-[0_18px_48px_rgba(45,39,33,0.04)]
                  sm:px-10
                  sm:py-20
                "
              >
                <h2
                  className={`
                    text-[#211f1c]
                    ${
                      isPersian
                        ? "font-sans text-[1.55rem] font-[650] leading-[1.8]"
                        : "font-serif text-[2.2rem] font-semibold leading-tight"
                    }
                  `}
                >
                  {
                    content.emptyTitle
                  }
                </h2>

                <p
                  className={`
                    mx-auto
                    mt-5
                    max-w-[680px]
                    font-sans
                    text-[#625d56]
                    ${
                      isPersian
                        ? "text-[15px] leading-[2.1]"
                        : "text-[16px] leading-8"
                    }
                  `}
                >
                  {
                    content.emptyDescription
                  }
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer
        locale={
          locale
        }
        dictionary={
          dictionary.footer
        }
        common={
          dictionary.common
        }
      />
    </div>
  );
}