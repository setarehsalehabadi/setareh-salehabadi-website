import type {
  Metadata,
} from "next";

import Link from "next/link";

import {
  notFound,
  redirect,
} from "next/navigation";

import Header from "@/components/Header";

import ResearchContent from "@/components/research/ResearchContent";

import RelatedResearch from "@/components/research/RelatedResearch";

import ResearchSchema from "@/components/research/ResearchSchema";

import Footer from "@/components/sections/Footer";

import {
  isLocale,
  type Locale,
} from "@/i18n/config";

import {
  getDictionary,
} from "@/i18n/get-dictionary";

import {
  getResearchArticle,
  getResearchArticles,
} from "@/lib/research";

const siteUrl =
  "https://setarehsalehabadi.com";

const socialImagePath =
  "/images/hero/hero.png";

const fallbackDescription =
  "تحلیل پژوهشی در آزمایشگاه پژوهش رشد دیجیتال ستاره صالح‌آبادی";

type PageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

type ArticleDescriptionSource = {
  description?: string | null;
  excerpt?: string | null;
};

function getArticleDescription(
  article: ArticleDescriptionSource,
) {
  return (
    article.description ||
    article.excerpt ||
    fallbackDescription
  );
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
): string {
  const normalizedValue =
    value.trim();

  if (!normalizedValue) {
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

function isExternalUrl(
  value: string,
): boolean {
  return (
    value.startsWith(
      "https://",
    ) ||
    value.startsWith(
      "http://",
    )
  );
}

export async function generateStaticParams() {
  const articles =
    await getResearchArticles();

  return articles.map(
    (article) => ({
      locale:
        "fa",

      slug:
        article.slug,
    }),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const {
    locale: localeParam,
    slug,
  } = await params;

  if (
    !isLocale(
      localeParam,
    )
  ) {
    notFound();
  }

  const article =
    await getResearchArticle(
      slug,
    );

  if (!article) {
    notFound();
  }

  const description =
    getArticleDescription(
      article,
    );

  const canonicalUrl =
    `${siteUrl}/fa/research/${article.slug}`;

  const metadata: Metadata = {
    title:
      `${article.title} | آزمایشگاه پژوهش ستاره صالح‌آبادی`,

    description,

    authors: [
      {
        name:
          "ستاره صالح‌آبادی",

        url:
          `${siteUrl}/fa/about`,
      },
    ],

    creator:
      "ستاره صالح‌آبادی",

    publisher:
      "ستاره صالح‌آبادی",

    alternates: {
      canonical:
        canonicalUrl,

      languages: {
        fa:
          canonicalUrl,

        "x-default":
          canonicalUrl,
      },
    },

    openGraph: {
      type:
        "article",

      url:
        canonicalUrl,

      siteName:
        "ستاره صالح‌آبادی",

      locale:
        "fa_IR",

      title:
        article.title,

      description,

      authors: [
        "ستاره صالح‌آبادی",
      ],

      section:
        article.category ||
        "آزمایشگاه پژوهش",

      images: [
        {
          url:
            socialImagePath,

          alt:
            article.title,
        },
      ],
    },

    twitter: {
      card:
        "summary_large_image",

      title:
        article.title,

      description,

      images: [
        socialImagePath,
      ],
    },
  };

  if (
    localeParam !== "fa"
  ) {
    return {
      ...metadata,

      robots: {
        index:
          false,

        follow:
          true,
      },
    };
  }

  return {
    ...metadata,

    robots: {
      index:
        true,

      follow:
        true,

      googleBot: {
        index:
          true,

        follow:
          true,

        "max-image-preview":
          "large",

        "max-snippet":
          -1,

        "max-video-preview":
          -1,
      },
    },
  };
}

export default async function ResearchArticlePage({
  params,
}: PageProps) {
  const {
    locale: localeParam,
    slug,
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

  if (
    locale !== "fa"
  ) {
    redirect(
      `/fa/research/${slug}`,
    );
  }

  const [
    article,
    allArticles,
    dictionary,
  ] = await Promise.all([
    getResearchArticle(
      slug,
    ),

    getResearchArticles(),

    getDictionary(
      locale,
    ),
  ]);

  if (!article) {
    notFound();
  }

  const description =
    getArticleDescription(
      article,
    );

  return (
    <div
      id="top"
      lang="fa"
      dir="rtl"
      className="
        min-h-screen
        bg-[#f7f4ee]
        text-[#171512]
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
        <ResearchSchema
          locale="fa"
          slug={
            article.slug
          }
          title={
            article.title
          }
          description={
            description
          }
          researchId={
            article.research_id
          }
          category={
            article.category
          }
          source={
            article.source
          }
          datePublished={
            article.date
          }
          dateModified={
            article.date
          }
        />

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
            aria-label="مسیر صفحه"
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
              href="/fa"
              className="
                font-sans
                text-[12px]
                font-semibold
                leading-6
                text-[#6e675f]
                transition-colors
                duration-300
                hover:text-[#2e5d91]
              "
            >
              صفحه اصلی
            </Link>

            <span
              aria-hidden="true"
              className="
                h-px
                w-6
                bg-[#b48a52]
              "
            />

            <Link
              href="/fa/research"
              className="
                font-sans
                text-[12px]
                font-semibold
                leading-6
                text-[#6e675f]
                transition-colors
                duration-300
                hover:text-[#2e5d91]
              "
            >
              آزمایشگاه پژوهش
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
              className="
                max-w-[420px]
                truncate
                font-sans
                text-[12px]
                font-semibold
                leading-6
                text-[#8a672f]
              "
            >
              {article.research_id ||
                article.title}
            </span>
          </nav>

          <article
            className="
              mx-auto
              mt-10
              max-w-6xl
              lg:mt-14
            "
          >
            <header
              className="
                relative
                overflow-hidden
                rounded-[30px]
                border
                border-[#2d2925]/10
                bg-[#fbf9f5]
                px-6
                py-9
                shadow-[0_22px_60px_rgba(40,35,30,0.07)]
                sm:rounded-[34px]
                sm:px-9
                sm:py-11
                md:px-12
                md:py-12
                lg:px-16
                lg:py-14
              "
            >
              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  opacity-[0.38]
                  [background-image:linear-gradient(to_right,rgba(24,54,85,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(24,54,85,0.08)_1px,transparent_1px)]
                  [background-size:40px_40px]
                "
              />

              <div
                className="
                  relative
                "
              >
                <div
                  className="
                    mb-7
                    flex
                    flex-wrap
                    items-center
                    gap-3
                    font-sans
                    text-[11px]
                    leading-6
                    text-[#756d63]
                    sm:mb-8
                  "
                >
                  {article.research_id && (
                    <span
                      dir="ltr"
                      className="
                        rounded-full
                        bg-[#183655]
                        px-4
                        py-2
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
                      dir="rtl"
                      className="
                        rounded-full
                        border
                        border-[#2d2925]/10
                        bg-white/80
                        px-4
                        py-2
                      "
                    >
                      {
                        article.category
                      }
                    </span>
                  )}

                  {article.status && (
                    <span
                      dir="rtl"
                      className="
                        rounded-full
                        border
                        border-[#b4853b]/20
                        bg-[#b4853b]/10
                        px-4
                        py-2
                        text-[#8a672f]
                      "
                    >
                      {
                        article.status
                      }
                    </span>
                  )}
                </div>

                <h1
                  className="
                    max-w-[940px]
                    text-wrap-balance
                    font-sans
                    text-[clamp(1.85rem,3.5vw,3.45rem)]
                    font-[650]
                    leading-[1.55]
                    tracking-normal
                    text-[#171512]
                    [text-wrap:balance]
                  "
                >
                  {
                    article.title
                  }
                </h1>

                {article.description && (
                  <p
                    className="
                      mt-5
                      max-w-[800px]
                      font-sans
                      text-[15.5px]
                      leading-[2.05]
                      text-[#625d56]
                      sm:mt-6
                      sm:text-[16.5px]
                      lg:text-[17px]
                    "
                  >
                    {
                      article.description
                    }
                  </p>
                )}

                <div
                  className="
                    mt-7
                    flex
                    flex-wrap
                    items-start
                    gap-x-6
                    gap-y-3
                    border-t
                    border-[#2d2925]/10
                    pt-5
                    font-sans
                    text-[12px]
                    leading-6
                    text-[#756d63]
                    sm:mt-8
                    sm:pt-6
                  "
                >
                  {article.date && (
                    <span>
                      تاریخ انتشار:{" "}

                      <time
                        dateTime={
                          article.date
                        }
                      >
                        {formatResearchDate(
                          article.date,
                        )}
                      </time>
                    </span>
                  )}

                  {article.readingTime && (
                    <span>
                      زمان مطالعه:{" "}

                      {formatReadingTime(
                        article.readingTime,
                      )}
                    </span>
                  )}

                  {article.source && (
                    <span
                      className="
                        min-w-0
                        max-w-full
                      "
                    >
                      منبع:{" "}

                      {isExternalUrl(
                        article.source,
                      ) ? (
                        <a
                          href={
                            article.source
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          dir="ltr"
                          aria-label="بازکردن منبع پژوهش در پنجره جدید"
                          className="
                            inline-block
                            max-w-full
                            break-all
                            text-left
                            font-medium
                            text-[#2e5d91]
                            underline
                            decoration-[#2e5d91]/30
                            underline-offset-4
                            transition-colors
                            duration-300
                            hover:text-[#183655]
                            hover:decoration-[#183655]
                          "
                        >
                          {
                            article.source
                          }
                        </a>
                      ) : (
                        <span>
                          {
                            article.source
                          }
                        </span>
                      )}
                    </span>
                  )}
                </div>
              </div>
            </header>

            <section
              aria-label="محتوای پژوهش"
              className="
                mt-10
                rounded-[30px]
                border
                border-[#2d2925]/10
                bg-white
                px-5
                py-8
                shadow-[0_18px_50px_rgba(40,35,30,0.05)]
                sm:rounded-[34px]
                sm:px-8
                sm:py-10
                md:px-12
                md:py-14
              "
            >
              <ResearchContent
                content={
                  article.content
                }
                locale="fa"
              />
            </section>

            <RelatedResearch
              articles={
                allArticles
              }
              currentSlug={
                article.slug
              }
              locale="fa"
            />

            <section
              aria-labelledby="research-article-closing-heading"
              className="
                mt-12
                overflow-hidden
                rounded-[30px]
                bg-[#17395c]
                px-6
                py-10
                text-center
                text-white
                sm:rounded-[34px]
                sm:px-10
                sm:py-12
              "
            >
              <p
                className="
                  font-sans
                  text-[11px]
                  font-semibold
                  leading-6
                  text-white/65
                "
              >
                آزمایشگاه پژوهش
              </p>

              <h2
                id="research-article-closing-heading"
                className="
                  mt-4
                  font-sans
                  text-[clamp(1.65rem,3vw,2.5rem)]
                  font-[650]
                  leading-[1.7]
                  text-white
                "
              >
                تحلیل‌های پژوهشی جدید
                را دنبال کنید
              </h2>

              <p
                className="
                  mx-auto
                  mt-4
                  max-w-2xl
                  font-sans
                  text-[15px]
                  leading-[2.05]
                  text-white/75
                  sm:text-[16px]
                "
              >
                پژوهش‌های علمی درباره
                هوش مصنوعی،
                روان‌شناسی مصرف‌کننده،
                بازاریابی دیجیتال و
                استراتژی رشد کسب‌وکار.
              </p>

              <div
                className="
                  mt-8
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-3
                  sm:flex-row
                "
              >
                <Link
                  href="/fa/research"
                  className="
                    inline-flex
                    min-h-[52px]
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    px-7
                    font-sans
                    text-[14px]
                    font-semibold
                    text-[#17395c]
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:bg-[#f4efe8]
                  "
                >
                  مشاهده همه پژوهش‌ها
                </Link>

                <span
                  className="
                    inline-flex
                    min-h-[52px]
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/20
                    bg-white/10
                    px-7
                    font-sans
                    text-[13px]
                    font-medium
                    text-white/85
                  "
                >
                  انتشار خبرنامه به‌زودی
                  فعال می‌شود
                </span>
              </div>
            </section>
          </article>
        </div>
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