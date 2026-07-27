import type {
  Metadata,
} from "next";

import Link from "next/link";

import {
  notFound,
} from "next/navigation";

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
      "آزمایشگاه پژوهش | ستاره صالح‌آبادی",

    metadataDescription:
      "پژوهش‌ها و تحلیل‌های مبتنی بر شواهد در حوزه هوش مصنوعی، روان‌شناسی مصرف‌کننده، بازاریابی دیجیتال، سئو و استراتژی رشد کسب‌وکار.",

    openGraphLocale:
      "fa_IR",

    socialImageAlt:
      "آزمایشگاه پژوهش ستاره صالح‌آبادی",

    homeLabel:
      "صفحه اصلی",

    pageLabel:
      "آزمایشگاه پژوهش",

    eyebrow:
      "Research Lab",

    title:
      "هوش رشد مبتنی بر شواهد",

    description:
      "تحلیل پژوهش‌های علمی در حوزه هوش مصنوعی، روان‌شناسی مصرف‌کننده، بازاریابی دیجیتال، رفتار جست‌وجو و استراتژی رشد کسب‌وکار.",

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
) {
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
    pageContent[locale];

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

  const dictionary =
    await getDictionary(
      locale,
    );

  const articles =
    await getResearchArticles();

  const content =
    pageContent[locale];

  return (
    <div
      id="top"
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
              pb-14
              pt-8
              sm:px-8
              sm:pb-16
              sm:pt-10
              lg:px-12
              lg:pb-20
              lg:pt-12
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
                pb-5
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
                mt-7
                grid
                gap-9
                lg:mt-9
                lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.42fr)]
                lg:items-end
                lg:gap-14
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
                    mt-4
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
                    mt-5
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
                  border-[#302d29]/13
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
                    max-w-[220px]
                    font-sans
                    font-semibold
                    text-[#4f4942]
                    ${
                      isPersian
                        ? "text-[14px] leading-7 sm:text-[14.5px]"
                        : "text-[12.5px] uppercase leading-5 tracking-[0.1em]"
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
              py-14
              sm:px-8
              sm:py-16
              lg:px-12
              lg:py-20
              xl:px-16
            "
          >
            {articles.length > 0 ? (
              <div
                className="
                  space-y-8
                "
              >
                {articles.map(
                  (
                    article,
                  ) => (
                    <article
                      key={
                        article.slug
                      }
                      className="
                        group
                        rounded-[30px]
                        border
                        border-[#2d2925]/10
                        bg-white
                        p-6
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:border-[#2e5d91]/20
                        hover:shadow-[0_20px_60px_rgba(40,35,30,0.08)]
                        sm:p-8
                        lg:p-10
                      "
                    >
                      <div
                        className={`
                          mb-6
                          flex
                          flex-wrap
                          items-center
                          gap-x-5
                          gap-y-3
                          font-sans
                          text-[#82796e]
                          ${
                            isPersian
                              ? "text-[11px] leading-6"
                              : "text-[10px] uppercase tracking-[0.14em]"
                          }
                        `}
                      >
                        <span>
                          {
                            article.research_id
                          }
                        </span>

                        <span
                          aria-hidden="true"
                          className="
                            h-px
                            w-5
                            bg-[#b48a52]
                          "
                        />

                        <span
                          dir="auto"
                        >
                          {
                            article.category
                          }
                        </span>

                        {article.status ? (
                          <span
                            dir="auto"
                            className="
                              rounded-full
                              bg-[#f1ebe2]
                              px-3
                              py-1
                              font-medium
                              text-[#6f665c]
                            "
                          >
                            {
                              article.status
                            }
                          </span>
                        ) : null}
                      </div>

                      <h2
                        dir="auto"
                        className={`
                          max-w-[980px]
                          text-[#171512]
                          transition-colors
                          duration-300
                          group-hover:text-[#183655]
                          ${
                            isPersian
                              ? "font-sans text-[clamp(1.65rem,2.6vw,2.7rem)] font-[650] leading-[1.7] tracking-normal"
                              : "font-serif text-[clamp(2rem,3vw,3.3rem)] font-medium leading-[1.08] tracking-[-0.035em]"
                          }
                        `}
                      >
                        {
                          article.title
                        }
                      </h2>

                      <p
                        dir="auto"
                        className={`
                          mt-5
                          max-w-[860px]
                          font-sans
                          text-[#625d56]
                          ${
                            isPersian
                              ? "text-[15.5px] leading-[2.1] sm:text-[16.5px]"
                              : "text-[17px] leading-8"
                          }
                        `}
                      >
                        {
                          article.description
                        }
                      </p>

                      <div
                        className="
                          mt-8
                          flex
                          flex-wrap
                          items-center
                          justify-between
                          gap-6
                          border-t
                          border-[#2d2925]/10
                          pt-6
                        "
                      >
                        <div
                          className={`
                            flex
                            flex-wrap
                            gap-5
                            font-sans
                            text-[#756d63]
                            ${
                              isPersian
                                ? "text-[12px] leading-6"
                                : "text-[13px]"
                            }
                          `}
                        >
                          {article.date ? (
                            <span
                              dir="auto"
                            >
                              {
                                article.date
                              }
                            </span>
                          ) : null}

                          {article.readingTime ? (
                            <span
                              dir="auto"
                            >
                              {
                                article.readingTime
                              }
                            </span>
                          ) : null}
                        </div>

                        <Link
                          href={`/${locale}/research/${article.slug}`}
                          aria-label={`${content.readLabel}: ${article.title}`}
                          className={`
                            inline-flex
                            min-h-[50px]
                            items-center
                            justify-center
                            gap-2.5
                            rounded-full
                            bg-[#183655]
                            px-7
                            font-sans
                            font-semibold
                            text-white
                            transition-all
                            duration-300
                            hover:-translate-y-0.5
                            hover:bg-[#2e5d91]
                            ${
                              isPersian
                                ? "text-[13px] sm:text-[14px]"
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
                      </div>
                    </article>
                  ),
                )}
              </div>
            ) : (
              <div
                className="
                  rounded-[30px]
                  border
                  border-[#302d29]/12
                  bg-[#ebe4da]/55
                  px-6
                  py-16
                  text-center
                  sm:px-10
                  sm:py-20
                "
              >
                <h2
                  className={`
                    text-[#211f1c]
                    ${
                      isPersian
                        ? "font-sans text-[1.75rem] font-[650] leading-[1.7]"
                        : "font-serif text-[2.5rem] font-medium leading-tight"
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
                        ? "text-[15.5px] leading-[2.1]"
                        : "text-[17px] leading-8"
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