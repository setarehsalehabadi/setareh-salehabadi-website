import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";
import Research from "@/components/sections/Research";

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

type ResearchPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

type ResearchPageContent = {
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
  topicsCountLabel: string;
  areasCountLabel: string;

  methodology: {
    eyebrow: string;
    title: string;
    description: string;

    steps: {
      title: string;
      description: string;
    }[];
  };

  standards: {
    eyebrow: string;
    title: string;
    description: string;

    items: {
      title: string;
      description: string;
    }[];
  };

  closing: {
    eyebrow: string;
    title: string;
    description: string;
    primaryLabel: string;
    secondaryLabel: string;
  };
};

const pageContent: Record<
  Locale,
  ResearchPageContent
> = {
  en: {
    metadataTitle:
      "Research and Analysis | Setareh Salehabadi",

    metadataDescription:
      "Research themes and practical analysis across SEO, search behavior, consumer psychology, marketing science, customer experience, data and artificial intelligence.",

    homeLabel: "Home",
    pageLabel: "Research",

    eyebrow:
      "Research and analysis",

    title: {
      first:
        "Deeper analysis for",
      highlighted:
        "clearer digital decisions",
    },

    introduction:
      "This research space examines the forces shaping digital growth: how people search, evaluate information, build trust, make decisions and interact with increasingly intelligent systems. The goal is to turn complex evidence into clearer strategic understanding and practical frameworks.",

    overviewLabel:
      "Research overview",

    topicsCountLabel:
      "current research themes",

    areasCountLabel:
      "connected focus areas",

    methodology: {
      eyebrow:
        "Research process",

      title:
        "From a focused question to a practical framework",

      description:
        "The purpose of research is not to collect more information. It is to reduce uncertainty, make assumptions visible and support more responsible decisions.",

      steps: [
        {
          title:
            "Define the question",

          description:
            "Begin with a specific decision, behavior or growth problem rather than a broad and unfocused topic.",
        },
        {
          title:
            "Review the evidence",

          description:
            "Examine relevant research, official reports and available industry evidence while considering source quality and context.",
        },
        {
          title:
            "Analyse the pattern",

          description:
            "Compare findings, identify meaningful relationships and separate supported conclusions from interpretation.",
        },
        {
          title:
            "Build the framework",

          description:
            "Translate the analysis into a structure that can clarify decisions, guide further investigation or support practical learning.",
        },
      ],
    },

    standards: {
      eyebrow:
        "Editorial standards",

      title:
        "Evidence should create clarity, not artificial certainty",

      description:
        "Every analysis should distinguish between established evidence, interpretation and open questions. Uncertainty is not removed through confident wording.",

      items: [
        {
          title:
            "Traceable sources",

          description:
            "Important claims should be connected to sources that can be independently reviewed.",
        },
        {
          title:
            "Clear distinctions",

          description:
            "Evidence, inference, opinion and unresolved questions should not be presented as the same thing.",
        },
        {
          title:
            "Responsible application",

          description:
            "Practical recommendations should reflect the limits of the available evidence and the context in which they may be used.",
        },
      ],
    },

    closing: {
      eyebrow:
        "Continue exploring",

      title:
        "Connect research with real project decisions and sustainable growth systems",

      description:
        "The selected projects show how strategic reasoning, search, data and audience understanding can be applied to practical business challenges.",

      primaryLabel:
        "View selected projects",

      secondaryLabel:
        "About my approach",
    },
  },

  de: {
    metadataTitle:
      "Forschung und Analysen | Setareh Salehabadi",

    metadataDescription:
      "Forschungsthemen und praktische Analysen zu SEO, Suchverhalten, Konsumentenpsychologie, Marketingwissenschaft, Kundenerfahrung, Daten und künstlicher Intelligenz.",

    homeLabel: "Startseite",
    pageLabel: "Forschung",

    eyebrow:
      "Forschung und Analysen",

    title: {
      first:
        "Tiefere Analysen für",
      highlighted:
        "klarere digitale Entscheidungen",
    },

    introduction:
      "Dieser Forschungsbereich untersucht die Faktoren, die digitales Wachstum prägen: wie Menschen suchen, Informationen bewerten, Vertrauen aufbauen, Entscheidungen treffen und mit zunehmend intelligenten Systemen interagieren. Ziel ist es, komplexe Erkenntnisse in klarere strategische Zusammenhänge und praktische Frameworks zu übersetzen.",

    overviewLabel:
      "Forschungsübersicht",

    topicsCountLabel:
      "aktuelle Forschungsthemen",

    areasCountLabel:
      "verbundene Schwerpunktbereiche",

    methodology: {
      eyebrow:
        "Forschungsprozess",

      title:
        "Von einer klaren Frage zu einem praktischen Framework",

      description:
        "Forschung soll nicht nur mehr Informationen sammeln. Sie soll Unsicherheit reduzieren, Annahmen sichtbar machen und verantwortungsvollere Entscheidungen unterstützen.",

      steps: [
        {
          title:
            "Frage definieren",

          description:
            "Ausgangspunkt ist eine konkrete Entscheidung, ein bestimmtes Verhalten oder ein Wachstumsproblem – kein zu allgemeines Thema.",
        },
        {
          title:
            "Belege prüfen",

          description:
            "Relevante Forschung, offizielle Berichte und verfügbare Branchenbelege werden unter Berücksichtigung von Quellenqualität und Kontext untersucht.",
        },
        {
          title:
            "Muster analysieren",

          description:
            "Erkenntnisse werden verglichen, wichtige Zusammenhänge identifiziert und belegte Aussagen von Interpretationen getrennt.",
        },
        {
          title:
            "Framework entwickeln",

          description:
            "Die Analyse wird in eine Struktur übersetzt, die Entscheidungen klärt, weitere Untersuchungen unterstützt oder selbstständiges Lernen ermöglicht.",
        },
      ],
    },

    standards: {
      eyebrow:
        "Redaktionelle Standards",

      title:
        "Belege sollen Klarheit schaffen, keine künstliche Gewissheit",

      description:
        "Jede Analyse sollte zwischen gesicherten Erkenntnissen, Interpretation und offenen Fragen unterscheiden. Unsicherheit verschwindet nicht durch selbstbewusste Formulierungen.",

      items: [
        {
          title:
            "Nachvollziehbare Quellen",

          description:
            "Wichtige Aussagen sollten mit Quellen verbunden sein, die unabhängig geprüft werden können.",
        },
        {
          title:
            "Klare Unterscheidungen",

          description:
            "Belege, Schlussfolgerungen, Meinungen und ungelöste Fragen dürfen nicht als identisch dargestellt werden.",
        },
        {
          title:
            "Verantwortungsvolle Anwendung",

          description:
            "Praktische Empfehlungen sollten die Grenzen der verfügbaren Belege und den jeweiligen Anwendungskontext berücksichtigen.",
        },
      ],
    },

    closing: {
      eyebrow:
        "Weiter entdecken",

      title:
        "Forschung mit realen Projektentscheidungen und nachhaltigen Wachstumssystemen verbinden",

      description:
        "Die ausgewählten Projekte zeigen, wie strategisches Denken, Suche, Daten und Zielgruppenverständnis auf praktische geschäftliche Herausforderungen angewendet werden können.",

      primaryLabel:
        "Ausgewählte Projekte ansehen",

      secondaryLabel:
        "Mehr über meinen Ansatz",
    },
  },

  fa: {
    metadataTitle:
      "پژوهش‌ها و تحلیل‌های رشد دیجیتال | ستاره صالح‌آبادی",

    metadataDescription:
      "پژوهش‌ها و تحلیل‌هایی درباره سئو، رفتار جست‌وجو، روان‌شناسی مصرف‌کننده، علم بازاریابی، تجربه مشتری، تحلیل داده و هوش مصنوعی.",

    homeLabel: "صفحه اصلی",
    pageLabel: "پژوهش‌ها",

    eyebrow:
      "پژوهش‌ها و تحلیل‌ها",

    title: {
      first:
        "تحلیل عمیق‌تر برای",
      highlighted:
        "تصمیم‌های روشن‌تر در فضای دیجیتال",
    },

    introduction:
      "این فضای پژوهشی به بررسی عواملی می‌پردازد که رشد دیجیتال را شکل می‌دهند: اینکه افراد چگونه جست‌وجو می‌کنند، اطلاعات را ارزیابی می‌کنند، اعتماد می‌سازند، تصمیم می‌گیرند و با سیستم‌های هوشمند تعامل دارند. هدف، تبدیل شواهد پیچیده به درکی روشن‌تر و چارچوب‌هایی کاربردی برای تصمیم‌گیری است.",

    overviewLabel:
      "مرور پژوهش‌ها",

    topicsCountLabel:
      "موضوع پژوهشی فعلی",

    areasCountLabel:
      "حوزه مرتبط",

    methodology: {
      eyebrow:
        "فرایند پژوهش",

      title:
        "از یک پرسش دقیق تا چارچوبی کاربردی",

      description:
        "هدف پژوهش، جمع‌آوری اطلاعات بیشتر نیست؛ پژوهش باید عدم‌قطعیت را کاهش دهد، فرضیات را آشکار کند و به تصمیم‌گیری مسئولانه‌تر کمک کند.",

      steps: [
        {
          title:
            "تعریف پرسش",

          description:
            "فرایند با یک تصمیم، رفتار یا مسئله مشخص رشد آغاز می‌شود؛ نه با موضوعی بسیار گسترده و بدون تمرکز.",
        },
        {
          title:
            "بررسی شواهد",

          description:
            "پژوهش‌های مرتبط، گزارش‌های رسمی و شواهد موجود صنعت با توجه به کیفیت منبع و زمینه انتشار بررسی می‌شوند.",
        },
        {
          title:
            "تحلیل الگوها",

          description:
            "یافته‌ها با یکدیگر مقایسه می‌شوند، ارتباط‌های معنادار شناسایی می‌شوند و نتیجه مستند از برداشت تحلیلی تفکیک می‌شود.",
        },
        {
          title:
            "ساخت چارچوب",

          description:
            "تحلیل به ساختاری تبدیل می‌شود که بتواند تصمیم‌ها را روشن‌تر کند، مسیر پژوهش بعدی را نشان دهد یا یادگیری مستقل را پشتیبانی کند.",
        },
      ],
    },

    standards: {
      eyebrow:
        "استانداردهای تحلیلی",

      title:
        "شواهد باید شفافیت ایجاد کنند، نه قطعیت مصنوعی",

      description:
        "هر تحلیل باید میان شواهد مستند، برداشت تحلیلی و پرسش‌های بدون پاسخ تفاوت قائل شود. استفاده از لحن قطعی، عدم‌قطعیت واقعی را از بین نمی‌برد.",

      items: [
        {
          title:
            "منابع قابل‌ردیابی",

          description:
            "ادعاهای مهم باید به منابعی متصل باشند که امکان بررسی مستقل آن‌ها وجود داشته باشد.",
        },
        {
          title:
            "تفکیک روشن",

          description:
            "شواهد، استنباط، دیدگاه شخصی و پرسش‌های حل‌نشده نباید به‌عنوان مفاهیمی یکسان ارائه شوند.",
        },
        {
          title:
            "کاربرد مسئولانه",

          description:
            "پیشنهادهای کاربردی باید محدودیت شواهد موجود و شرایطی را که قرار است در آن استفاده شوند در نظر بگیرند.",
        },
      ],
    },

    closing: {
      eyebrow:
        "ادامه مسیر",

      title:
        "پیوند پژوهش با تصمیم‌های واقعی پروژه و سیستم‌های رشد پایدار",

      description:
        "پروژه‌های منتخب نشان می‌دهند که چگونه می‌توان تفکر استراتژیک، جست‌وجو، داده و شناخت مخاطب را در مسائل واقعی کسب‌وکار به کار گرفت.",

      primaryLabel:
        "مشاهده پروژه‌های منتخب",

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

    primaryCta: {
      ...dictionary.footer.primaryCta,
      href: `/${locale}/research`,
    },

    secondaryCta: {
      ...dictionary.footer.secondaryCta,
      href: `/${locale}/case-studies`,
    },

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

function createResearchDictionary(
  dictionary: Dictionary,
  locale: Locale
) {
  return {
    ...dictionary.research,

    cta: {
      ...dictionary.research.cta,
      href: `/${locale}/about`,
    },
  } as unknown as Dictionary["research"];
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
}: ResearchPageProps): Promise<Metadata> {
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
    `${siteUrl}/${locale}/research`;

  return {
    title: content.metadataTitle,

    description:
      content.metadataDescription,

    alternates: {
      canonical: canonicalUrl,

      languages: {
        en: `${siteUrl}/en/research`,
        de: `${siteUrl}/de/research`,
        fa: `${siteUrl}/fa/research`,

        "x-default":
          `${siteUrl}/en/research`,
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
            "/images/research/research.png",

          alt:
            locale === "fa"
              ? "پژوهش و تحلیل در حوزه رشد دیجیتال"
              : "Research and analysis for digital growth",
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
        "/images/research/research.png",
      ],
    },
  };
}

export default async function ResearchPage({
  params,
}: ResearchPageProps) {
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

  const researchDictionary =
    createResearchDictionary(
      dictionary,
      locale
    );

  const topicsCount =
    dictionary.research.topics.length;

  const areasCount =
    dictionary.research.areas.length;

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
                  id="research-page-heading"
                  className={`
                    mt-5
                    max-w-[940px]
                    text-[#211f1c]
                    ${
                      isPersian
                        ? "font-sans text-[clamp(2rem,3.4vw,3.4rem)] font-[650] leading-[1.58] tracking-normal"
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
                    max-w-[820px]
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
                    grid
                    grid-cols-2
                    gap-5
                    border-b
                    border-[#302d29]/14
                    pb-6
                  "
                >
                  <div>
                    <span
                      className="
                        block
                        font-sans
                        text-[clamp(2.8rem,6vw,4.6rem)]
                        font-semibold
                        leading-none
                        text-[#2e5d91]
                      "
                    >
                      {formatNumber(
                        topicsCount,
                        locale
                      )}
                    </span>

                    <span
                      className={`
                        mt-2
                        block
                        font-sans
                        font-medium
                        text-[#625d56]
                        ${
                          isPersian
                            ? "text-[12px] leading-6"
                            : "text-[12px] leading-5"
                        }
                      `}
                    >
                      {content.topicsCountLabel}
                    </span>
                  </div>

                  <div
                    className="
                      border-s
                      border-[#302d29]/14
                      ps-5
                    "
                  >
                    <span
                      className="
                        block
                        font-sans
                        text-[clamp(2.8rem,6vw,4.6rem)]
                        font-semibold
                        leading-none
                        text-[#8a672f]
                      "
                    >
                      {formatNumber(
                        areasCount,
                        locale
                      )}
                    </span>

                    <span
                      className={`
                        mt-2
                        block
                        font-sans
                        font-medium
                        text-[#625d56]
                        ${
                          isPersian
                            ? "text-[12px] leading-6"
                            : "text-[12px] leading-5"
                        }
                      `}
                    >
                      {content.areasCountLabel}
                    </span>
                  </div>
                </div>

                <div
                  className="
                    mt-6
                    flex
                    flex-wrap
                    gap-2
                  "
                >
                  {dictionary.research.areas.map(
                    (area) => (
                      <span
                        key={area}
                        dir="auto"
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
                        {area}
                      </span>
                    )
                  )}
                </div>
              </aside>
            </div>
          </div>
        </section>

        <Research
          locale={locale}
          dictionary={researchDictionary}
        />

        <section
          aria-labelledby="research-method-heading"
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
                  {content.methodology.eyebrow}
                </p>

                <h2
                  id="research-method-heading"
                  className={`
                    mt-5
                    max-w-[820px]
                    text-[#211f1c]
                    ${
                      isPersian
                        ? "font-sans text-[clamp(1.85rem,3vw,3rem)] font-[650] leading-[1.62] tracking-normal"
                        : "font-serif text-[clamp(2.5rem,4vw,4rem)] font-medium leading-[1.03] tracking-[-0.04em]"
                    }
                  `}
                >
                  {content.methodology.title}
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
                {content.methodology.description}
              </p>
            </div>

            <div
              className="
                mt-12
                grid
                border-s
                border-t
                border-[#302d29]/15
                md:grid-cols-2
                xl:grid-cols-4
              "
            >
              {content.methodology.steps.map(
                (step, index) => (
                  <article
                    key={step.title}
                    className="
                      flex
                      min-h-[300px]
                      flex-col
                      border-b
                      border-e
                      border-[#302d29]/15
                      bg-[#ebe4da]/30
                      p-6
                      sm:p-7
                      xl:min-h-[340px]
                      xl:p-8
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
                            ? "font-sans text-[clamp(1.35rem,1.8vw,1.75rem)] font-[650] leading-[1.7] tracking-normal"
                            : "font-serif text-[clamp(1.7rem,2.25vw,2.3rem)] font-medium leading-[1.08] tracking-[-0.03em]"
                        }
                      `}
                    >
                      {step.title}
                    </h3>

                    <p
                      className={`
                        mt-5
                        font-sans
                        text-[#625d56]
                        ${
                          isPersian
                            ? "text-[14.5px] leading-[2.05] sm:text-[15.5px]"
                            : "text-[16px] leading-8"
                        }
                      `}
                    >
                      {step.description}
                    </p>
                  </article>
                )
              )}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="research-standards-heading"
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
                gap-10
                lg:grid-cols-[minmax(280px,0.7fr)_minmax(0,1.3fr)]
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
                        ? "text-[11px] leading-6 sm:text-[12px]"
                        : "text-[10px] uppercase tracking-[0.28em]"
                    }
                  `}
                >
                  {content.standards.eyebrow}
                </p>

                <h2
                  id="research-standards-heading"
                  className={`
                    mt-5
                    max-w-[650px]
                    text-[#211f1c]
                    ${
                      isPersian
                        ? "font-sans text-[clamp(1.85rem,3vw,3rem)] font-[650] leading-[1.62] tracking-normal"
                        : "font-serif text-[clamp(2.5rem,4vw,4rem)] font-medium leading-[1.03] tracking-[-0.04em]"
                    }
                  `}
                >
                  {content.standards.title}
                </h2>

                <p
                  className={`
                    mt-7
                    max-w-[600px]
                    font-sans
                    text-[#5f5a53]
                    ${
                      isPersian
                        ? "text-[16px] leading-[2.1] sm:text-[17px]"
                        : "text-[18px] leading-[2.1rem]"
                    }
                  `}
                >
                  {content.standards.description}
                </p>
              </div>

              <div
                className="
                  border-t
                  border-[#302d29]/15
                "
              >
                {content.standards.items.map(
                  (item, index) => (
                    <article
                      key={item.title}
                      className="
                        grid
                        gap-5
                        border-b
                        border-[#302d29]/15
                        py-8
                        sm:grid-cols-[52px_minmax(0,1fr)]
                        sm:gap-7
                        lg:py-9
                      "
                    >
                      <span
                        className={`
                          pt-1
                          font-sans
                          font-semibold
                          text-[#978f85]
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

                      <div>
                        <h3
                          className={`
                            text-[#24211e]
                            ${
                              isPersian
                                ? "font-sans text-[clamp(1.4rem,2vw,1.85rem)] font-[650] leading-[1.7] tracking-normal"
                                : "font-serif text-[clamp(1.8rem,2.5vw,2.5rem)] font-medium leading-[1.08] tracking-[-0.03em]"
                            }
                          `}
                        >
                          {item.title}
                        </h3>

                        <p
                          className={`
                            mt-4
                            max-w-[760px]
                            font-sans
                            text-[#625d56]
                            ${
                              isPersian
                                ? "text-[15px] leading-[2.05] sm:text-[16px]"
                                : "text-[17px] leading-8"
                            }
                          `}
                        >
                          {item.description}
                        </p>
                      </div>
                    </article>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        <section
          id="case-studies"
          aria-labelledby="research-closing-heading"
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
              {content.closing.eyebrow}
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
                id="research-closing-heading"
                className={`
                  max-w-[940px]
                  text-white
                  ${
                    isPersian
                      ? "font-sans text-[clamp(1.9rem,3.2vw,3.2rem)] font-[650] leading-[1.62] tracking-normal"
                      : "font-serif text-[clamp(2.5rem,4.4vw,4.35rem)] font-medium leading-[1.04] tracking-[-0.04em]"
                  }
                `}
              >
                {content.closing.title}
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
                  {content.closing.description}
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
                    href={`/${locale}/case-studies`}
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
                    {content.closing.primaryLabel}
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
                    {content.closing.secondaryLabel}
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