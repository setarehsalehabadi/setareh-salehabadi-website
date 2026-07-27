import type { Metadata } from "next";
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
import { getDictionary } from "@/i18n/get-dictionary";

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

export async function generateStaticParams() {
  const articles =
    await getResearchArticles();

  return articles.map(
    (article) => ({
      locale: "fa",
      slug: article.slug,
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

  if (!isLocale(localeParam)) {
    notFound();
  }

  const article =
    await getResearchArticle(slug);

  if (!article) {
    notFound();
  }

  const description =
    getArticleDescription(article);

  const canonicalUrl =
    `${siteUrl}/fa/research/${article.slug}`;

  const metadata: Metadata = {
    title:
      `${article.title} | آزمایشگاه پژوهش ستاره صالح‌آبادی`,

    description,

    authors: [
      {
        name:
          "Setareh Salehabadi",

        url:
          `${siteUrl}/fa/about`,
      },
    ],

    creator:
      "Setareh Salehabadi",

    publisher:
      "Setareh Salehabadi",

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
        "Setareh Salehabadi",

      locale:
        "fa_IR",

      title:
        article.title,

      description,

      authors: [
        "Setareh Salehabadi",
      ],

      section:
        article.category ||
        "Research Lab",

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

  if (localeParam !== "fa") {
    return {
      ...metadata,

      robots: {
        index: false,
        follow: true,
      },
    };
  }

  return {
    ...metadata,

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
  };
}

export default async function ResearchArticlePage({
  params,
}: PageProps) {
  const {
    locale: localeParam,
    slug,
  } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale =
    localeParam;

  if (locale !== "fa") {
    redirect(
      `/fa/research/${slug}`,
    );
  }

  const [
    article,
    allArticles,
    dictionary,
  ] = await Promise.all([
    getResearchArticle(slug),
    getResearchArticles(),
    getDictionary(locale),
  ]);

  if (!article) {
    notFound();
  }

  const description =
    getArticleDescription(article);

  return (
    <div
      id="top"
      dir="rtl"
      className="
        min-h-screen
        bg-[#f7f4ee]
        text-[#171512]
      "
    >
      <Header
        locale={locale}
        dictionary={dictionary.header}
        common={dictionary.common}
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
          slug={article.slug}
          title={article.title}
          description={description}
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
                py-10
                shadow-[0_22px_60px_rgba(40,35,30,0.07)]
                sm:rounded-[34px]
                sm:px-9
                sm:py-12
                md:px-12
                md:py-14
                lg:px-16
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

              <div className="relative">
                <div
                  className="
                    mb-8
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
                      dir="auto"
                      className="
                        rounded-full
                        border
                        border-[#2d2925]/10
                        bg-white/80
                        px-4
                        py-2
                      "
                    >
                      {article.category}
                    </span>
                  )}

                  {article.status && (
                    <span
                      dir="auto"
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
                      {article.status}
                    </span>
                  )}
                </div>

                <h1
                  className="
                    max-w-5xl
                    font-sans
                    text-[clamp(2rem,4.5vw,4.15rem)]
                    font-[650]
                    leading-[1.55]
                    tracking-normal
                    text-[#171512]
                  "
                >
                  {article.title}
                </h1>

                {article.description && (
                  <p
                    className="
                      mt-7
                      max-w-4xl
                      font-sans
                      text-[16px]
                      leading-[2.1]
                      text-[#625d56]
                      sm:text-[17px]
                    "
                  >
                    {
                      article.description
                    }
                  </p>
                )}

                <div
                  className="
                    mt-9
                    flex
                    flex-wrap
                    gap-x-6
                    gap-y-3
                    border-t
                    border-[#2d2925]/10
                    pt-6
                    font-sans
                    text-[12px]
                    leading-6
                    text-[#756d63]
                  "
                >
                  {article.date && (
                    <span dir="auto">
                      تاریخ انتشار:{" "}
                      {article.date}
                    </span>
                  )}

                  {article.readingTime && (
                    <span dir="auto">
                      زمان مطالعه:{" "}
                      {
                        article.readingTime
                      }
                    </span>
                  )}

                  {article.source && (
                    <span dir="auto">
                      منبع:{" "}
                      {article.source}
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
                Research Lab
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
        locale={locale}
        dictionary={dictionary.footer}
        common={dictionary.common}
      />
    </div>
  );
}