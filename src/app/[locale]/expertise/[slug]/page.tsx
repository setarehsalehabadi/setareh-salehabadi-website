import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";

import {
  expertiseSlugs,
  getExpertisePage,
  isExpertiseSlug,
  type ExpertisePageContent,
  type ExpertiseSlug,
} from "@/content/expertise-pages";

import {
  isLocale,
  locales,
  type Locale,
} from "@/i18n/config";

import de from "@/i18n/dictionaries/de";
import en from "@/i18n/dictionaries/en";
import fa from "@/i18n/dictionaries/fa";

import type { Dictionary } from "@/i18n/get-dictionary";

const siteUrl =
  "https://setarehsalehabadi.com";

const dictionaries = {
  en,
  de,
  fa,
} as const;

type ExpertiseDetailPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

type PageLabels = {
  breadcrumbHome: string;
  breadcrumbExpertise: string;
  capabilitiesLabel: string;
  approachLabel: string;
  questionsLabel: string;
  relatedLabel: string;
  pagePositionLabel: string;
};

const pageLabels: Record<
  Locale,
  PageLabels
> = {
  en: {
    breadcrumbHome: "Home",
    breadcrumbExpertise: "Expertise",
    capabilitiesLabel: "Capabilities",
    approachLabel: "Approach",
    questionsLabel: "Strategic questions",
    relatedLabel: "Related expertise",
    pagePositionLabel: "Expertise area",
  },

  de: {
    breadcrumbHome: "Startseite",
    breadcrumbExpertise: "Expertise",
    capabilitiesLabel: "Kompetenzen",
    approachLabel: "Arbeitsansatz",
    questionsLabel: "Strategische Fragen",
    relatedLabel: "Verwandte Expertise",
    pagePositionLabel: "Expertisebereich",
  },

  fa: {
    breadcrumbHome: "صفحه اصلی",
    breadcrumbExpertise: "تخصص‌ها",
    capabilitiesLabel: "قابلیت‌ها",
    approachLabel: "رویکرد کاری",
    questionsLabel: "پرسش‌های استراتژیک",
    relatedLabel: "تخصص‌های مرتبط",
    pagePositionLabel: "حوزه تخصصی",
  },
};

function getDictionary(
  locale: Locale,
): Dictionary {
  return dictionaries[
    locale
  ] as unknown as Dictionary;
}

function getLocalizedHref(
  locale: Locale,
  href: string,
): string {
  const trimmedHref = href.trim();

  if (!trimmedHref) {
    return `/${locale}`;
  }

  if (
    /^(?:https?:\/\/|mailto:|tel:)/i.test(
      trimmedHref,
    )
  ) {
    return trimmedHref;
  }

  if (trimmedHref.startsWith("#")) {
    return `/${locale}${trimmedHref}`;
  }

  const segments = trimmedHref
    .split("/")
    .filter(Boolean);

  if (
    segments[0] &&
    isLocale(segments[0])
  ) {
    segments.shift();
  }

  if (segments.length === 0) {
    return `/${locale}`;
  }

  return `/${locale}/${segments.join("/")}`;
}

function formatNumber(
  value: number,
  locale: Locale,
  minimumIntegerDigits = 1,
): string {
  return new Intl.NumberFormat(
    locale === "fa"
      ? "fa-IR"
      : locale,
    {
      minimumIntegerDigits,
      useGrouping: false,
    },
  ).format(value);
}

function getRelatedPages(
  locale: Locale,
  content: ExpertisePageContent,
) {
  return content.relatedSlugs.map(
    (relatedSlug) =>
      getExpertisePage(
        locale,
        relatedSlug,
      ),
  );
}

export function generateStaticParams() {
  return locales.flatMap(
    (locale) =>
      expertiseSlugs.map(
        (slug) => ({
          locale,
          slug,
        }),
      ),
  );
}

export async function generateMetadata({
  params,
}: ExpertiseDetailPageProps): Promise<Metadata> {
  const {
    locale: localeParam,
    slug: slugParam,
  } = await params;

  if (
    !isLocale(localeParam) ||
    !isExpertiseSlug(slugParam)
  ) {
    notFound();
  }

  const locale: Locale =
    localeParam;

  const slug: ExpertiseSlug =
    slugParam;

  const content =
    getExpertisePage(
      locale,
      slug,
    );

  const canonical =
    `${siteUrl}/${locale}/expertise/${slug}`;

  return {
    title:
      `${content.metaTitle} | Setareh Salehabadi`,

    description:
      content.metaDescription,

    alternates: {
      canonical,

      languages: {
        en:
          `${siteUrl}/en/expertise/${slug}`,

        de:
          `${siteUrl}/de/expertise/${slug}`,

        fa:
          `${siteUrl}/fa/expertise/${slug}`,

        "x-default":
          `${siteUrl}/en/expertise/${slug}`,
      },
    },

    openGraph: {
      type: "website",
      url: canonical,

      title:
        `${content.metaTitle} | Setareh Salehabadi`,

      description:
        content.metaDescription,

      siteName:
        "Setareh Salehabadi",
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ExpertiseDetailPage({
  params,
}: ExpertiseDetailPageProps) {
  const {
    locale: localeParam,
    slug: slugParam,
  } = await params;

  if (
    !isLocale(localeParam) ||
    !isExpertiseSlug(slugParam)
  ) {
    notFound();
  }

  const locale: Locale =
    localeParam;

  const slug: ExpertiseSlug =
    slugParam;

  const dictionary =
    getDictionary(locale);

  const content =
    getExpertisePage(
      locale,
      slug,
    );

  const labels =
    pageLabels[locale];

  const isPersian =
    locale === "fa";

  const currentPageIndex =
    expertiseSlugs.indexOf(slug) + 1;

  const relatedPages =
    getRelatedPages(
      locale,
      content,
    );

  const primaryHref =
    getLocalizedHref(
      locale,
      content.cta.primary.href,
    );

  const secondaryHref =
    getLocalizedHref(
      locale,
      content.cta.secondary.href,
    );

  return (
    <div id="top">
      <Header
        locale={locale}
        dictionary={
          dictionary.header
        }
        common={
          dictionary.common
        }
      />

      <main
        id="main-content"
        className="
          bg-[#f4efe8]
          text-[#211f1c]
        "
      >
        <section
          className="
            overflow-hidden
            border-b
            border-[#302d29]/15
            bg-[#ebe4da]
          "
        >
          <div
            className="
              mx-auto
              max-w-[1480px]
              px-5
              pb-16
              pt-8
              sm:px-8
              sm:pb-20
              sm:pt-10
              lg:px-12
              lg:pb-24
              xl:px-16
            "
          >
            <nav
              aria-label="Breadcrumb"
              className="
                flex
                flex-wrap
                items-center
                gap-2
                font-sans
                text-[11px]
                text-[#716a61]
              "
            >
              <Link
                href={`/${locale}`}
                className="
                  transition-colors
                  duration-300
                  hover:text-[#2e5d91]
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#2e5d91]/25
                "
              >
                {labels.breadcrumbHome}
              </Link>

              <span
                aria-hidden="true"
                className="text-[#a49b91]"
              >
                /
              </span>

              <Link
                href={`/${locale}/expertise`}
                className="
                  transition-colors
                  duration-300
                  hover:text-[#2e5d91]
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#2e5d91]/25
                "
              >
                {
                  labels
                    .breadcrumbExpertise
                }
              </Link>

              <span
                aria-hidden="true"
                className="text-[#a49b91]"
              >
                /
              </span>

              <span
                aria-current="page"
                className="
                  font-semibold
                  text-[#302b26]
                "
              >
                {content.eyebrow}
              </span>
            </nav>

            <div
              className="
                mt-12
                grid
                gap-12
                lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.48fr)]
                lg:items-end
                lg:gap-16
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
                        : "text-[10px] uppercase tracking-[0.3em]"
                    }
                  `}
                >
                  {content.eyebrow}
                </p>

                <h1
                  className={`
                    mt-5
                    max-w-[1040px]
                    text-[#211f1c]
                    ${
                      isPersian
                        ? "font-sans text-[clamp(2.2rem,5vw,4.7rem)] font-[750] leading-[1.5] tracking-normal"
                        : "font-serif text-[clamp(3.3rem,6vw,6.5rem)] font-medium leading-[0.95] tracking-[-0.052em]"
                    }
                  `}
                >
                  <span>
                    {
                      content
                        .title
                        .first
                    }
                  </span>

                  <span
                    className={`
                      block
                      text-[#2e5d91]
                      ${
                        isPersian
                          ? "mt-1"
                          : "italic"
                      }
                    `}
                  >
                    {
                      content
                        .title
                        .highlighted
                    }
                  </span>
                </h1>

                <p
                  className={`
                    mt-8
                    max-w-[850px]
                    font-sans
                    text-[#625d56]
                    ${
                      isPersian
                        ? "text-[16px] leading-[2.15] sm:text-[18px]"
                        : "text-[18px] leading-[2.05rem] sm:text-[19px]"
                    }
                  `}
                >
                  {content.introduction}
                </p>
              </div>

              <aside
                className="
                  rounded-[28px]
                  border
                  border-[#302d29]/12
                  bg-[#f7f3ed]/65
                  p-6
                  shadow-[0_20px_50px_rgba(57,48,40,0.06)]
                  sm:p-7
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-5
                  "
                >
                  <p
                    className={`
                      font-sans
                      font-semibold
                      text-[#8a672f]
                      ${
                        isPersian
                          ? "text-[11px]"
                          : "text-[10px] uppercase tracking-[0.24em]"
                      }
                    `}
                  >
                    {
                      labels
                        .pagePositionLabel
                    }
                  </p>

                  <p
                    dir="ltr"
                    className="
                      font-sans
                      text-[11px]
                      font-semibold
                      tracking-[0.15em]
                      text-[#756e65]
                    "
                  >
                    {formatNumber(
                      currentPageIndex,
                      locale,
                      2,
                    )}
                    {" / "}
                    {formatNumber(
                      expertiseSlugs.length,
                      locale,
                      2,
                    )}
                  </p>
                </div>

                <div
                  aria-hidden="true"
                  className="
                    mt-5
                    grid
                    grid-cols-5
                    gap-2
                  "
                >
                  {expertiseSlugs.map(
                    (
                      expertiseSlug,
                      index,
                    ) => (
                      <span
                        key={
                          expertiseSlug
                        }
                        className={`
                          h-1
                          rounded-full
                          ${
                            index <
                            currentPageIndex
                              ? "bg-[#2e5d91]"
                              : "bg-[#302d29]/15"
                          }
                        `}
                      />
                    ),
                  )}
                </div>

                <div
                  className="
                    mt-7
                    border-t
                    border-[#302d29]/12
                    pt-6
                  "
                >
                  <p
                    className={`
                      font-sans
                      font-semibold
                      text-[#8a672f]
                      ${
                        isPersian
                          ? "text-[11px]"
                          : "text-[10px] uppercase tracking-[0.23em]"
                      }
                    `}
                  >
                    {
                      content
                        .principle
                        .label
                    }
                  </p>

                  <p
                    className={`
                      mt-4
                      text-[#302b26]
                      ${
                        isPersian
                          ? "font-sans text-[17px] font-[650] leading-[2]"
                          : "font-serif text-[22px] font-medium leading-[1.45] tracking-[-0.02em]"
                      }
                    `}
                  >
                    {
                      content
                        .principle
                        .statement
                    }
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section
          className="
            mx-auto
            max-w-[1280px]
            px-5
            py-16
            sm:px-8
            sm:py-20
            lg:px-12
            lg:py-24
          "
        >
          <div
            className="
              grid
              gap-8
              lg:grid-cols-[220px_minmax(0,1fr)]
              lg:gap-16
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
                      ? "text-[11px]"
                      : "text-[10px] uppercase tracking-[0.27em]"
                  }
                `}
              >
                {
                  content
                    .overview
                    .label
                }
              </p>
            </div>

            <div>
              <h2
                className={`
                  max-w-[900px]
                  text-[#25211d]
                  ${
                    isPersian
                      ? "font-sans text-[clamp(1.8rem,3.5vw,3rem)] font-[700] leading-[1.65]"
                      : "font-serif text-[clamp(2.5rem,4.5vw,4.4rem)] font-medium leading-[1.04] tracking-[-0.043em]"
                  }
                `}
              >
                {
                  content
                    .overview
                    .title
                }
              </h2>

              <p
                className={`
                  mt-7
                  max-w-[860px]
                  font-sans
                  text-[#625d56]
                  ${
                    isPersian
                      ? "text-[16px] leading-[2.15] sm:text-[17px]"
                      : "text-[17px] leading-[2rem] sm:text-[18px]"
                  }
                `}
              >
                {
                  content
                    .overview
                    .description
                }
              </p>
            </div>
          </div>
        </section>

        <section
          className="
            border-y
            border-[#302d29]/15
            bg-[#e6ddd1]
          "
        >
          <div
            className="
              mx-auto
              max-w-[1280px]
              px-5
              py-16
              sm:px-8
              sm:py-20
              lg:px-12
              lg:py-24
            "
          >
            <div
              className="
                grid
                gap-8
                lg:grid-cols-[220px_minmax(0,1fr)]
                lg:gap-16
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
                        ? "text-[11px]"
                        : "text-[10px] uppercase tracking-[0.27em]"
                    }
                  `}
                >
                  {
                    content
                      .capabilities
                      .label
                  }
                </p>
              </div>

              <div>
                <h2
                  className={`
                    max-w-[880px]
                    text-[#25211d]
                    ${
                      isPersian
                        ? "font-sans text-[clamp(1.8rem,3.5vw,3rem)] font-[700] leading-[1.65]"
                        : "font-serif text-[clamp(2.4rem,4vw,4rem)] font-medium leading-[1.06] tracking-[-0.04em]"
                    }
                  `}
                >
                  {
                    content
                      .capabilities
                      .title
                  }
                </h2>

                <div
                  className="
                    mt-10
                    grid
                    border
                    border-[#302d29]/12
                    md:grid-cols-2
                  "
                >
                  {content.capabilities.items.map(
                    (
                      item,
                      index,
                    ) => (
                      <article
                        key={item.title}
                        className="
                          min-w-0
                          border-b
                          border-[#302d29]/12
                          bg-[#f7f3ed]/35
                          p-6
                          last:border-b-0
                          md:border-e
                          md:p-8
                          md:[&:nth-child(2n)]:border-e-0
                          md:[&:nth-last-child(-n+2)]:border-b-0
                        "
                      >
                        <p
                          className="
                            font-sans
                            text-[10px]
                            font-semibold
                            tracking-[0.18em]
                            text-[#9a9187]
                          "
                        >
                          {formatNumber(
                            index + 1,
                            locale,
                            2,
                          )}
                        </p>

                        <h3
                          className={`
                            mt-5
                            text-[#282521]
                            ${
                              isPersian
                                ? "font-sans text-[21px] font-[700] leading-[1.7]"
                                : "font-serif text-[28px] font-medium leading-[1.15] tracking-[-0.025em]"
                            }
                          `}
                        >
                          {item.title}
                        </h3>

                        <p
                          className={`
                            mt-4
                            font-sans
                            text-[#625d56]
                            ${
                              isPersian
                                ? "text-[14px] leading-[2]"
                                : "text-[15px] leading-7"
                            }
                          `}
                        >
                          {item.description}
                        </p>
                      </article>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="
            mx-auto
            max-w-[1280px]
            px-5
            py-16
            sm:px-8
            sm:py-20
            lg:px-12
            lg:py-24
          "
        >
          <div
            className="
              grid
              gap-8
              lg:grid-cols-[220px_minmax(0,1fr)]
              lg:gap-16
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
                      ? "text-[11px]"
                      : "text-[10px] uppercase tracking-[0.27em]"
                  }
                `}
              >
                {
                  content
                    .approach
                    .label
                }
              </p>
            </div>

            <div>
              <h2
                className={`
                  max-w-[900px]
                  text-[#25211d]
                  ${
                    isPersian
                      ? "font-sans text-[clamp(1.8rem,3.5vw,3rem)] font-[700] leading-[1.65]"
                      : "font-serif text-[clamp(2.4rem,4vw,4rem)] font-medium leading-[1.06] tracking-[-0.04em]"
                  }
                `}
              >
                {
                  content
                    .approach
                    .title
                }
              </h2>

              <p
                className={`
                  mt-6
                  max-w-[820px]
                  font-sans
                  text-[#625d56]
                  ${
                    isPersian
                      ? "text-[15px] leading-[2.1] sm:text-[16px]"
                      : "text-[16px] leading-[1.9]"
                  }
                `}
              >
                {
                  content
                    .approach
                    .introduction
                }
              </p>

              <ol
                className="
                  mt-10
                  border-t
                  border-[#302d29]/15
                "
              >
                {content.approach.steps.map(
                  (step) => (
                    <li
                      key={step.number}
                      className="
                        grid
                        gap-4
                        border-b
                        border-[#302d29]/15
                        py-7
                        sm:grid-cols-[80px_minmax(180px,0.5fr)_minmax(0,1fr)]
                        sm:gap-6
                        sm:py-8
                      "
                    >
                      <span
                        className="
                          font-sans
                          text-[11px]
                          font-semibold
                          tracking-[0.18em]
                          text-[#9a9187]
                        "
                      >
                        {step.number}
                      </span>

                      <h3
                        className={`
                          text-[#302b26]
                          ${
                            isPersian
                              ? "font-sans text-[19px] font-[700] leading-[1.7]"
                              : "font-serif text-[25px] font-medium leading-[1.2] tracking-[-0.025em]"
                          }
                        `}
                      >
                        {step.title}
                      </h3>

                      <p
                        className={`
                          font-sans
                          text-[#625d56]
                          ${
                            isPersian
                              ? "text-[14px] leading-[2]"
                              : "text-[15px] leading-7"
                          }
                        `}
                      >
                        {step.description}
                      </p>
                    </li>
                  ),
                )}
              </ol>
            </div>
          </div>
        </section>

        <section
          className="
            border-y
            border-[#302d29]/15
            bg-[#ebe4da]
          "
        >
          <div
            className="
              mx-auto
              max-w-[1280px]
              px-5
              py-16
              sm:px-8
              sm:py-20
              lg:px-12
              lg:py-24
            "
          >
            <div
              className="
                grid
                gap-8
                lg:grid-cols-[220px_minmax(0,1fr)]
                lg:gap-16
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
                        ? "text-[11px]"
                        : "text-[10px] uppercase tracking-[0.27em]"
                    }
                  `}
                >
                  {
                    content
                      .questions
                      .label
                  }
                </p>
              </div>

              <div>
                <h2
                  className={`
                    max-w-[900px]
                    text-[#25211d]
                    ${
                      isPersian
                        ? "font-sans text-[clamp(1.8rem,3.5vw,3rem)] font-[700] leading-[1.65]"
                        : "font-serif text-[clamp(2.4rem,4vw,4rem)] font-medium leading-[1.06] tracking-[-0.04em]"
                    }
                  `}
                >
                  {
                    content
                      .questions
                      .title
                  }
                </h2>

                <ul
                  className="
                    mt-10
                    grid
                    gap-4
                    md:grid-cols-2
                  "
                >
                  {content.questions.items.map(
                    (
                      question,
                      index,
                    ) => (
                      <li
                        key={question}
                        className="
                          rounded-[22px]
                          border
                          border-[#302d29]/12
                          bg-[#f7f3ed]/55
                          p-6
                        "
                      >
                        <p
                          className="
                            font-sans
                            text-[10px]
                            font-semibold
                            tracking-[0.18em]
                            text-[#8a672f]
                          "
                        >
                          {formatNumber(
                            index + 1,
                            locale,
                            2,
                          )}
                        </p>

                        <p
                          className={`
                            mt-4
                            text-[#302b26]
                            ${
                              isPersian
                                ? "font-sans text-[16px] font-[650] leading-[2]"
                                : "font-serif text-[20px] font-medium leading-[1.5] tracking-[-0.015em]"
                            }
                          `}
                        >
                          {question}
                        </p>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section
          className="
            mx-auto
            max-w-[1280px]
            px-5
            py-16
            sm:px-8
            sm:py-20
            lg:px-12
            lg:py-24
          "
        >
          <div
            className="
              grid
              gap-8
              lg:grid-cols-[220px_minmax(0,1fr)]
              lg:gap-16
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
                      ? "text-[11px]"
                      : "text-[10px] uppercase tracking-[0.27em]"
                  }
                `}
              >
                {content.relatedLabel}
              </p>
            </div>

            <div
              className="
                grid
                gap-4
                md:grid-cols-2
              "
            >
              {relatedPages.map(
                (relatedPage) => (
                  <Link
                    key={
                      relatedPage.slug
                    }
                    href={`/${locale}/expertise/${relatedPage.slug}`}
                    className="
                      group
                      rounded-[24px]
                      border
                      border-[#302d29]/12
                      bg-[#ebe4da]/65
                      p-6
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-[#2e5d91]/35
                      hover:bg-[#e6ddd1]
                      hover:shadow-[0_18px_42px_rgba(57,48,40,0.08)]
                      focus-visible:outline-none
                      focus-visible:ring-4
                      focus-visible:ring-[#2e5d91]/15
                      sm:p-7
                    "
                  >
                    <div
                      className="
                        flex
                        items-start
                        justify-between
                        gap-5
                      "
                    >
                      <p
                        className={`
                          font-sans
                          font-semibold
                          text-[#8a672f]
                          ${
                            isPersian
                              ? "text-[11px]"
                              : "text-[10px] uppercase tracking-[0.2em]"
                          }
                        `}
                      >
                        {
                          relatedPage
                            .eyebrow
                        }
                      </p>

                      <span
                        aria-hidden="true"
                        className="
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-[#302d29]/15
                          text-[14px]
                          text-[#2e5d91]
                          transition-all
                          duration-300
                          group-hover:border-[#2e5d91]
                          group-hover:bg-[#2e5d91]
                          group-hover:text-white
                        "
                      >
                        ↗
                      </span>
                    </div>

                    <h3
                      className={`
                        mt-7
                        text-[#302b26]
                        transition-colors
                        duration-300
                        group-hover:text-[#2e5d91]
                        ${
                          isPersian
                            ? "font-sans text-[21px] font-[700] leading-[1.7]"
                            : "font-serif text-[28px] font-medium leading-[1.15] tracking-[-0.025em]"
                        }
                      `}
                    >
                      {
                        relatedPage
                          .title
                          .highlighted
                      }
                    </h3>

                    <p
                      className={`
                        mt-4
                        font-sans
                        text-[#625d56]
                        ${
                          isPersian
                            ? "text-[14px] leading-[2]"
                            : "text-[14px] leading-7"
                        }
                      `}
                    >
                      {
                        relatedPage
                          .metaDescription
                      }
                    </p>
                  </Link>
                ),
              )}
            </div>
          </div>
        </section>

        <section
          className="
            border-t
            border-[#302d29]/15
            bg-[#183655]
            text-white
          "
        >
          <div
            className="
              mx-auto
              flex
              max-w-[1280px]
              flex-col
              gap-8
              px-5
              py-14
              sm:px-8
              sm:py-16
              lg:flex-row
              lg:items-center
              lg:justify-between
              lg:px-12
            "
          >
            <div className="max-w-[760px]">
              <p
                className={`
                  font-sans
                  font-semibold
                  text-[#d6b77c]
                  ${
                    isPersian
                      ? "text-[11px]"
                      : "text-[10px] uppercase tracking-[0.27em]"
                  }
                `}
              >
                {content.eyebrow}
              </p>

              <p
                className={`
                  mt-4
                  text-white
                  ${
                    isPersian
                      ? "font-sans text-[clamp(1.45rem,2.8vw,2.3rem)] font-[700] leading-[1.8]"
                      : "font-serif text-[clamp(2rem,3.7vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.035em]"
                  }
                `}
              >
                {
                  content
                    .principle
                    .statement
                }
              </p>
            </div>

            <div
              className="
                flex
                w-full
                flex-col
                gap-3
                sm:w-auto
                sm:flex-row
                sm:flex-wrap
              "
            >
              <Link
                href={primaryHref}
                className="
                  inline-flex
                  min-h-[54px]
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white
                  bg-white
                  px-7
                  font-sans
                  text-[14px]
                  font-semibold
                  text-[#183655]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-[#ebe4da]
                  focus-visible:outline-none
                  focus-visible:ring-4
                  focus-visible:ring-white/25
                "
              >
                {
                  content
                    .cta
                    .primary
                    .label
                }
              </Link>

              <Link
                href={secondaryHref}
                className="
                  inline-flex
                  min-h-[54px]
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/35
                  bg-white/5
                  px-7
                  font-sans
                  text-[14px]
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-white
                  hover:bg-white/12
                  focus-visible:outline-none
                  focus-visible:ring-4
                  focus-visible:ring-white/20
                "
              >
                {
                  content
                    .cta
                    .secondary
                    .label
                }
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer
        locale={locale}
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