import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Header from "@/components/Header";
import CaseStudies from "@/components/sections/CaseStudies";
import Footer from "@/components/sections/Footer";

import {
  isLocale,
  type Locale,
} from "@/i18n/config";

import {
  getDictionary,
  type Dictionary,
} from "@/i18n/get-dictionary";

const siteUrl =
  "https://setarehsalehabadi.com";

type CaseStudiesPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

type CaseStudiesPageContent = {
  metadataTitle: string;
  metadataDescription: string;

  homeLabel: string;
  pageLabel: string;

  eyebrow: string;

  title: {
    first: string;
    highlighted: string;
  };

  introduction: string;

  overviewLabel: string;
  projectCountLabel: string;
  representedAreasLabel: string;

  documentation: {
    eyebrow: string;
    title: string;
    description: string;

    cards: {
      title: string;
      description: string;
    }[];
  };

  research: {
    eyebrow: string;
    title: string;
    description: string;
    primaryLabel: string;
    secondaryLabel: string;
  };
};

const pageContent: Record<
  Locale,
  CaseStudiesPageContent
> = {
  en: {
    metadataTitle:
      "Selected Projects | Setareh Salehabadi",

    metadataDescription:
      "Selected digital growth projects across SEO, digital strategy, industrial search and performance marketing, presented through scope, decisions and measurable outcomes.",

    homeLabel: "Home",
    pageLabel: "Selected projects",

    eyebrow:
      "Selected project work",

    title: {
      first:
        "A closer look at",
      highlighted:
        "strategy, systems and measurable outcomes",
    },

    introduction:
      "These project summaries show how search, digital strategy, data and audience understanding can be connected to solve practical growth challenges. Each example is limited to the scope and outcome that can be responsibly stated.",

    overviewLabel:
      "Portfolio overview",

    projectCountLabel:
      "selected projects",

    representedAreasLabel:
      "Areas represented",

    documentation: {
      eyebrow:
        "Documentation standard",

      title:
        "How these project summaries are framed",

      description:
        "The purpose is not to present inflated success stories. Each project is organized around the business context, the reasoning behind the approach and the outcome that can be meaningfully evaluated.",

      cards: [
        {
          title:
            "Problem framing",

          description:
            "The project begins with the actual business, search or customer-experience problem rather than a predetermined channel or tactic.",
        },
        {
          title:
            "Decision logic",

          description:
            "The strategic choices are connected to audience behavior, available evidence, operational constraints and expected business value.",
        },
        {
          title:
            "Measurable outcome",

          description:
            "Outcomes are presented only where a relevant indicator or verifiable direction of improvement is available.",
        },
      ],
    },

    research: {
      eyebrow:
        "Research behind the work",

      title:
        "Better project decisions begin with stronger evidence",

      description:
        "The research section explores search behavior, consumer psychology, data, customer experience and artificial intelligence—the same areas that inform the strategic reasoning behind these projects.",

      primaryLabel:
        "Read research and analysis",

      secondaryLabel:
        "About my approach",
    },
  },

  de: {
    metadataTitle:
      "Ausgewählte Projekte | Setareh Salehabadi",

    metadataDescription:
      "Ausgewählte Projekte aus SEO, digitaler Strategie, industrieller Suche und Performance-Marketing – dargestellt anhand von Umfang, Entscheidungen und messbaren Ergebnissen.",

    homeLabel: "Startseite",
    pageLabel:
      "Ausgewählte Projekte",

    eyebrow:
      "Ausgewählte Projektarbeit",

    title: {
      first:
        "Ein genauerer Blick auf",
      highlighted:
        "Strategie, Systeme und messbare Ergebnisse",
    },

    introduction:
      "Diese Projektzusammenfassungen zeigen, wie Suche, digitale Strategie, Daten und Zielgruppenverständnis miteinander verbunden werden können, um praktische Wachstumsprobleme zu lösen. Jedes Beispiel beschränkt sich auf den Umfang und das Ergebnis, die verantwortungsvoll dargestellt werden können.",

    overviewLabel:
      "Projektübersicht",

    projectCountLabel:
      "ausgewählte Projekte",

    representedAreasLabel:
      "Vertretene Bereiche",

    documentation: {
      eyebrow:
        "Dokumentationsstandard",

      title:
        "Wie diese Projektzusammenfassungen aufgebaut sind",

      description:
        "Das Ziel ist nicht, übertriebene Erfolgsgeschichten zu präsentieren. Jedes Projekt wird anhand des geschäftlichen Kontexts, der Entscheidungslogik und des sinnvoll bewertbaren Ergebnisses dargestellt.",

      cards: [
        {
          title:
            "Problemdefinition",

          description:
            "Das Projekt beginnt mit dem tatsächlichen Geschäfts-, Such- oder Kundenerfahrungsproblem und nicht mit einem bereits festgelegten Kanal.",
        },
        {
          title:
            "Entscheidungslogik",

          description:
            "Strategische Entscheidungen werden mit Zielgruppenverhalten, verfügbaren Belegen, operativen Einschränkungen und erwartetem Geschäftswert verbunden.",
        },
        {
          title:
            "Messbares Ergebnis",

          description:
            "Ergebnisse werden nur dargestellt, wenn ein relevanter Indikator oder eine nachvollziehbare Verbesserungsrichtung verfügbar ist.",
        },
      ],
    },

    research: {
      eyebrow:
        "Forschung hinter der Arbeit",

      title:
        "Bessere Projektentscheidungen beginnen mit stärkeren Belegen",

      description:
        "Der Forschungsbereich untersucht Suchverhalten, Konsumentenpsychologie, Daten, Kundenerfahrung und künstliche Intelligenz – dieselben Bereiche, die auch die strategische Logik dieser Projekte prägen.",

      primaryLabel:
        "Forschung und Analysen lesen",

      secondaryLabel:
        "Mehr über meinen Ansatz",
    },
  },

  fa: {
    metadataTitle:
      "پروژه‌های منتخب ستاره صالح‌آبادی | استراتژی رشد دیجیتال",

    metadataDescription:
      "مروری بر پروژه‌های منتخب در حوزه سئو، استراتژی رشد دیجیتال، جست‌وجوی صنعتی و بازاریابی عملکردی؛ با تمرکز بر مسئله، منطق تصمیم‌گیری و نتایج قابل‌ارزیابی.",

    homeLabel: "صفحه اصلی",
    pageLabel: "پروژه‌های منتخب",

    eyebrow:
      "پروژه‌های منتخب",

    title: {
      first:
        "نگاهی دقیق‌تر به",
      highlighted:
        "استراتژی، سیستم‌ها و نتایج قابل‌اندازه‌گیری",
    },

    introduction:
      "این خلاصه‌ها نشان می‌دهند که چگونه می‌توان جست‌وجو، استراتژی دیجیتال، داده و شناخت مخاطب را برای حل مسائل واقعی رشد در کنار یکدیگر قرار داد. هر پروژه فقط براساس دامنه فعالیت و نتیجه‌ای ارائه شده است که بتوان آن را مسئولانه بیان کرد.",

    overviewLabel:
      "مرور پروژه‌ها",

    projectCountLabel:
      "پروژه منتخب",

    representedAreasLabel:
      "حوزه‌های پروژه‌ها",

    documentation: {
      eyebrow:
        "استاندارد ارائه پروژه‌ها",

      title:
        "این پروژه‌ها چگونه مستند شده‌اند",

      description:
        "هدف، ساختن داستان‌های اغراق‌آمیز از موفقیت نیست. هر پروژه براساس زمینه کسب‌وکار، منطق تصمیم‌گیری و نتیجه‌ای ارائه می‌شود که بتوان آن را به‌صورت معنادار ارزیابی کرد.",

      cards: [
        {
          title:
            "تعریف مسئله",

          description:
            "هر پروژه از مسئله واقعی کسب‌وکار، جست‌وجو یا تجربه مشتری آغاز می‌شود؛ نه از یک کانال یا تاکتیک ازپیش‌تعیین‌شده.",
        },
        {
          title:
            "منطق تصمیم‌گیری",

          description:
            "انتخاب‌های استراتژیک با رفتار مخاطب، شواهد موجود، محدودیت‌های اجرایی و ارزش موردانتظار برای کسب‌وکار ارتباط داده می‌شوند.",
        },
        {
          title:
            "نتیجه قابل‌ارزیابی",

          description:
            "نتیجه فقط زمانی بیان می‌شود که شاخص مرتبط یا مسیر قابل‌بررسی برای بهبود عملکرد وجود داشته باشد.",
        },
      ],
    },

    research: {
      eyebrow:
        "پژوهش پشت تصمیم‌ها",

      title:
        "تصمیم‌های بهتر در پروژه‌ها با شواهد قوی‌تر آغاز می‌شوند",

      description:
        "در بخش پژوهش‌ها، رفتار جست‌وجو، روان‌شناسی مصرف‌کننده، تحلیل داده، تجربه مشتری و هوش مصنوعی بررسی می‌شوند؛ همان حوزه‌هایی که منطق استراتژیک این پروژه‌ها را شکل می‌دهند.",

      primaryLabel:
        "مطالعه پژوهش‌ها و تحلیل‌ها",

      secondaryLabel:
        "آشنایی با رویکرد من",
    },
  },
};

function prefixHomeHash(
  href: string,
  locale: Locale
) {
  if (!href.startsWith("#")) {
    return href;
  }

  return `/${locale}${href}`;
}

function createInternalPageHeader(
  dictionary: Dictionary,
  locale: Locale
) {
  return {
    ...dictionary.header,

    navigation:
      dictionary.header.navigation.map(
        (item) => ({
          ...item,
          href: prefixHomeHash(
            item.href,
            locale
          ),
        })
      ),
  } as unknown as Dictionary["header"];
}

function createInternalPageFooter(
  dictionary: Dictionary,
  locale: Locale
) {
  return {
    ...dictionary.footer,

    navigation:
      dictionary.footer.navigation.map(
        (item) => ({
          ...item,
          href: prefixHomeHash(
            item.href,
            locale
          ),
        })
      ),
  } as unknown as Dictionary["footer"];
}

function formatNumber(
  value: number,
  locale: Locale
) {
  return new Intl.NumberFormat(
    locale === "fa"
      ? "fa-IR"
      : locale,
    {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }
  ).format(value);
}

export async function generateMetadata({
  params,
}: CaseStudiesPageProps): Promise<Metadata> {
  const { locale: localeParam } =
    await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale =
    localeParam;

  const content =
    pageContent[locale];

  const canonicalUrl =
    `${siteUrl}/${locale}/case-studies`;

  return {
    title: content.metadataTitle,

    description:
      content.metadataDescription,

    alternates: {
      canonical: canonicalUrl,

      languages: {
        en:
          `${siteUrl}/en/case-studies`,

        de:
          `${siteUrl}/de/case-studies`,

        fa:
          `${siteUrl}/fa/case-studies`,

        "x-default":
          `${siteUrl}/en/case-studies`,
      },
    },

    openGraph: {
      type: "website",

      url: canonicalUrl,

      title:
        content.metadataTitle,

      description:
        content.metadataDescription,

      siteName:
        "Setareh Salehabadi",

      images: [
        {
          url:
            "/images/growth-system/growth-system.png",

          alt:
            locale === "fa"
              ? "سیستم رشد دیجیتال و پروژه‌های منتخب ستاره صالح‌آبادی"
              : "Digital growth systems and selected projects by Setareh Salehabadi",
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
        "/images/growth-system/growth-system.png",
      ],
    },
  };
}

export default async function CaseStudiesPage({
  params,
}: CaseStudiesPageProps) {
  const { locale: localeParam } =
    await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale =
    localeParam;

  const isPersian =
    locale === "fa";

  const dictionary =
    await getDictionary(locale);

  const content =
    pageContent[locale];

  const headerDictionary =
    createInternalPageHeader(
      dictionary,
      locale
    );

  const footerDictionary =
    createInternalPageFooter(
      dictionary,
      locale
    );

  const projectCount =
    dictionary.caseStudies.projects.length;

  return (
    <div
      id="top"
      className="
        min-h-screen
        bg-[#f4efe8]
        text-[#211f1c]
      "
    >
      <Header
        locale={locale}
        dictionary={headerDictionary}
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
        <section
          aria-labelledby="case-studies-page-heading"
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
                  ${
                    isPersian
                      ? "text-[12px] leading-6"
                      : "text-[11px] uppercase tracking-[0.14em]"
                  }
                `}
              >
                {content.homeLabel}
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
                {content.pageLabel}
              </span>
            </nav>

            <div
              className="
                mt-10
                grid
                gap-10
                lg:mt-14
                lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.72fr)]
                lg:items-end
                lg:gap-16
              "
            >
              <div className="min-w-0">
                <p
                  className={`
                    font-sans
                    font-semibold
                    text-[#8a672f]
                    ${
                      isPersian
                        ? "text-[11px] leading-6 tracking-normal sm:text-[12px]"
                        : "text-[10px] uppercase tracking-[0.28em] sm:text-[11px]"
                    }
                  `}
                >
                  {content.eyebrow}
                </p>

                <h1
                  id="case-studies-page-heading"
                  className={`
                    mt-5
                    max-w-[920px]
                    text-[#211f1c]
                    ${
                      isPersian
                        ? "font-sans text-[clamp(2rem,3.45vw,3.45rem)] font-[650] leading-[1.55] tracking-normal"
                        : "font-serif text-[clamp(3.2rem,5.8vw,5.8rem)] font-medium leading-[0.98] tracking-[-0.045em]"
                    }
                  `}
                >
                  <span className="block">
                    {content.title.first}
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
                    {content.title.highlighted}
                  </span>
                </h1>

                <p
                  className={`
                    mt-7
                    max-w-[800px]
                    font-sans
                    text-[#5f5a53]
                    ${
                      isPersian
                        ? "text-[16px] leading-[2.1] sm:text-[17px]"
                        : "text-[18px] leading-[2.1rem] lg:text-[19px] lg:leading-[2.2rem]"
                    }
                  `}
                >
                  {content.introduction}
                </p>
              </div>

              <aside
                aria-label={
                  content.overviewLabel
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
                  {content.overviewLabel}
                </p>

                <div
                  className="
                    mt-5
                    flex
                    items-end
                    gap-3
                    border-b
                    border-[#302d29]/14
                    pb-6
                  "
                >
                  <span
                    className="
                      font-sans
                      text-[clamp(3.5rem,7vw,5.5rem)]
                      font-semibold
                      leading-none
                      text-[#2e5d91]
                    "
                  >
                    {formatNumber(
                      projectCount,
                      locale
                    )}
                  </span>

                  <span
                    className={`
                      pb-2
                      font-sans
                      font-medium
                      text-[#625d56]
                      ${
                        isPersian
                          ? "text-[13px] leading-7"
                          : "text-[13px]"
                      }
                    `}
                  >
                    {
                      content.projectCountLabel
                    }
                  </span>
                </div>

                <p
                  className={`
                    mt-6
                    font-sans
                    font-semibold
                    text-[#34302b]
                    ${
                      isPersian
                        ? "text-[13px] leading-7"
                        : "text-[12px] uppercase tracking-[0.12em]"
                    }
                  `}
                >
                  {
                    content
                      .representedAreasLabel
                  }
                </p>

                <div
                  className="
                    mt-4
                    flex
                    flex-wrap
                    gap-2
                  "
                >
                  {dictionary.caseStudies.projects.map(
                    (project) => (
                      <span
                        key={project.category}
                        className={`
                          rounded-full
                          border
                          border-[#302d29]/14
                          bg-[#f7f3ed]/65
                          px-3.5
                          py-2
                          font-sans
                          font-medium
                          text-[#625d56]
                          ${
                            isPersian
                              ? "text-[11px] leading-6"
                              : "text-[11px]"
                          }
                        `}
                      >
                        {project.category}
                      </span>
                    )
                  )}
                </div>
              </aside>
            </div>
          </div>
        </section>

        <CaseStudies
          locale={locale}
          dictionary={
            dictionary.caseStudies
          }
        />

        <section
          aria-labelledby="project-documentation-heading"
          className="
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
              py-20
              sm:px-8
              sm:py-24
              lg:px-12
              lg:py-28
              xl:px-16
            "
          >
            <div
              className="
                grid
                gap-8
                border-b
                border-[#302d29]/15
                pb-10
                lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.72fr)]
                lg:items-end
                lg:gap-16
                lg:pb-12
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
                        ? "text-[11px] leading-6 sm:text-[12px]"
                        : "text-[10px] uppercase tracking-[0.28em]"
                    }
                  `}
                >
                  {
                    content.documentation
                      .eyebrow
                  }
                </p>

                <h2
                  id="project-documentation-heading"
                  className={`
                    mt-5
                    max-w-[800px]
                    text-[#211f1c]
                    ${
                      isPersian
                        ? "font-sans text-[clamp(1.85rem,3vw,3rem)] font-[650] leading-[1.62] tracking-normal"
                        : "font-serif text-[clamp(2.5rem,4vw,4rem)] font-medium leading-[1.03] tracking-[-0.04em]"
                    }
                  `}
                >
                  {
                    content.documentation
                      .title
                  }
                </h2>
              </div>

              <p
                className={`
                  max-w-[640px]
                  font-sans
                  text-[#5f5a53]
                  lg:justify-self-end
                  ${
                    isPersian
                      ? "text-[16px] leading-[2.1] sm:text-[17px]"
                      : "text-[18px] leading-[2.1rem] lg:text-[19px]"
                  }
                `}
              >
                {
                  content.documentation
                    .description
                }
              </p>
            </div>

            <div
              className="
                mt-12
                grid
                border-s
                border-t
                border-[#302d29]/15
                md:grid-cols-3
              "
            >
              {content.documentation.cards.map(
                (card, index) => (
                  <article
                    key={card.title}
                    className="
                      flex
                      min-h-[270px]
                      flex-col
                      border-b
                      border-e
                      border-[#302d29]/15
                      bg-[#f7f3ed]/42
                      p-6
                      sm:p-7
                      lg:min-h-[310px]
                      lg:p-8
                    "
                  >
                    <span
                      className={`
                        font-sans
                        font-semibold
                        text-[#9a8170]
                        ${
                          isPersian
                            ? "text-[11px]"
                            : "text-[10px] tracking-[0.18em]"
                        }
                      `}
                    >
                      {formatNumber(
                        index + 1,
                        locale
                      )}
                    </span>

                    <h3
                      className={`
                        mt-8
                        text-[#24211e]
                        ${
                          isPersian
                            ? "font-sans text-[clamp(1.35rem,2vw,1.8rem)] font-[650] leading-[1.7] tracking-normal"
                            : "font-serif text-[clamp(1.8rem,2.6vw,2.5rem)] font-medium leading-[1.08] tracking-[-0.03em]"
                        }
                      `}
                    >
                      {card.title}
                    </h3>

                    <p
                      className={`
                        mt-5
                        font-sans
                        text-[#625d56]
                        ${
                          isPersian
                            ? "text-[15px] leading-[2.05] sm:text-[16px]"
                            : "text-[17px] leading-8"
                        }
                      `}
                    >
                      {card.description}
                    </p>
                  </article>
                )
              )}
            </div>
          </div>
        </section>

        <section
          id="research"
          aria-labelledby="project-research-heading"
          className="
            border-b
            border-[#302d29]/15
            bg-[#183655]
            text-white
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
            <p
              className={`
                font-sans
                font-semibold
                text-[#d3b47a]
                ${
                  isPersian
                    ? "text-[11px] leading-6 sm:text-[12px]"
                    : "text-[10px] uppercase tracking-[0.28em]"
                }
              `}
            >
              {content.research.eyebrow}
            </p>

            <div
              className="
                mt-5
                grid
                gap-10
                lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.62fr)]
                lg:items-end
                lg:gap-16
              "
            >
              <h2
                id="project-research-heading"
                className={`
                  max-w-[920px]
                  text-white
                  ${
                    isPersian
                      ? "font-sans text-[clamp(1.9rem,3.2vw,3.2rem)] font-[650] leading-[1.62] tracking-normal"
                      : "font-serif text-[clamp(2.5rem,4.4vw,4.35rem)] font-medium leading-[1.04] tracking-[-0.04em]"
                  }
                `}
              >
                {content.research.title}
              </h2>

              <div>
                <p
                  className={`
                    max-w-[620px]
                    font-sans
                    text-white/72
                    ${
                      isPersian
                        ? "text-[16px] leading-[2.1] sm:text-[17px]"
                        : "text-[18px] leading-[2.1rem]"
                    }
                  `}
                >
                  {
                    content.research
                      .description
                  }
                </p>

                <div
                  className="
                    mt-7
                    flex
                    flex-col
                    gap-3
                    sm:flex-row
                    sm:flex-wrap
                  "
                >
                  <Link
                    href={`/${locale}#research`}
                    className={`
                      inline-flex
                      min-h-[56px]
                      items-center
                      justify-center
                      rounded-full
                      bg-white
                      px-8
                      font-sans
                      font-semibold
                      text-[#183655]
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:bg-[#f4efe8]
                      ${
                        isPersian
                          ? "text-[14px] sm:text-[15px]"
                          : "text-[15px]"
                      }
                    `}
                  >
                    {
                      content.research
                        .primaryLabel
                    }
                  </Link>

                  <Link
                    href={`/${locale}/about`}
                    className={`
                      inline-flex
                      min-h-[56px]
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/30
                      bg-white/5
                      px-8
                      font-sans
                      font-semibold
                      text-white
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:border-white/60
                      hover:bg-white/10
                      ${
                        isPersian
                          ? "text-[14px] sm:text-[15px]"
                          : "text-[15px]"
                      }
                    `}
                  >
                    {
                      content.research
                        .secondaryLabel
                    }
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer
        locale={locale}
        dictionary={footerDictionary}
        common={dictionary.common}
      />
    </div>
  );
}