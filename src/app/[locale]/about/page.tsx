import type { Metadata } from "next";
import Image from "next/image";
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
  type Dictionary,
} from "@/i18n/get-dictionary";

const siteUrl =
  "https://setarehsalehabadi.com";

type AboutPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

type AboutPageContent = {
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

  background: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };

  backgroundCards: {
    title: string;
    description: string;
  }[];

  approach: {
    eyebrow: string;
    title: string;
    description: string;
  };

  focusIntroduction: string;

  closing: {
    eyebrow: string;
    title: string;
    description: string;
    primaryLabel: string;
    secondaryLabel: string;
  };
};

const aboutPageContent: Record<
  Locale,
  AboutPageContent
> = {
  en: {
    metadataTitle:
      "About Setareh Salehabadi | Digital Growth Strategist",

    metadataDescription:
      "Learn about Setareh Salehabadi’s approach to digital growth strategy, SEO, consumer psychology, data analysis and practical AI systems.",

    homeLabel: "Home",
    pageLabel: "About",

    eyebrow:
      "About Setareh Salehabadi",

    title: {
      first:
        "An analytical perspective on",
      highlighted:
        "digital growth and decision-making",
    },

    introduction:
      "My professional path combines analytical thinking, digital strategy, search, consumer behavior, data and practical artificial intelligence. I focus on making complex growth challenges clearer, more structured and more measurable.",

    background: {
      eyebrow:
        "Professional background",

      title:
        "From engineering thinking to digital growth strategy",

      paragraphs: [
        "My academic background in Chemical Engineering shaped the way I approach problems: by examining systems, relationships, constraints and evidence rather than isolated symptoms.",

        "Working across SEO, digital marketing, analytics and growth operations later showed me that sustainable business growth requires the same discipline. Visibility, customer understanding, content, technology and measurement must work as parts of one connected system.",

        "Today, this perspective guides how I study digital behavior, design strategic frameworks and turn research into practical resources for businesses and independent learners.",
      ],
    },

    backgroundCards: [
      {
        title:
          "Analytical foundation",

        description:
          "A structured approach to diagnosing problems, evaluating evidence and identifying the variables that meaningfully influence performance.",
      },
      {
        title:
          "Cross-functional strategy",

        description:
          "Connecting SEO, marketing, consumer psychology, customer experience, data and AI instead of treating them as separate activities.",
      },
      {
        title:
          "Independent knowledge",

        description:
          "Creating research, frameworks and self-guided educational resources that can be used without ongoing meetings or direct support.",
      },
    ],

    approach: {
      eyebrow:
        "How I work",

      title:
        "Clarity before execution",

      description:
        "The goal is not to add more tactics. It is to identify the real problem, define priorities, make assumptions visible and build a system that can be measured and improved.",
    },

    focusIntroduction:
      "My work currently concentrates on the following connected areas:",

    closing: {
      eyebrow:
        "Continue exploring",

      title:
        "Projects, research and practical frameworks for sustainable digital growth",

      description:
        "This website brings together selected projects, evidence-based analysis and self-guided learning resources designed to support clearer decisions and more durable growth systems.",

      primaryLabel:
        "Read research and analysis",

      secondaryLabel:
        "View selected projects",
    },
  },

  de: {
    metadataTitle:
      "Über Setareh Salehabadi | Strategin für digitales Wachstum",

    metadataDescription:
      "Erfahren Sie mehr über Setareh Salehabadis Ansatz für digitales Wachstum, SEO, Konsumentenpsychologie, Datenanalyse und praktische KI-Systeme.",

    homeLabel: "Startseite",
    pageLabel: "Über mich",

    eyebrow:
      "Über Setareh Salehabadi",

    title: {
      first:
        "Eine analytische Perspektive auf",
      highlighted:
        "digitales Wachstum und Entscheidungen",
    },

    introduction:
      "Mein beruflicher Weg verbindet analytisches Denken, digitale Strategie, Suche, Konsumentenverhalten, Daten und den praktischen Einsatz künstlicher Intelligenz. Mein Fokus liegt darauf, komplexe Wachstumsfragen klarer, strukturierter und messbarer zu machen.",

    background: {
      eyebrow:
        "Beruflicher Hintergrund",

      title:
        "Vom technischen Denken zur Strategie für digitales Wachstum",

      paragraphs: [
        "Mein akademischer Hintergrund im Chemieingenieurwesen hat meine Art der Problemlösung geprägt: Systeme, Zusammenhänge, Einschränkungen und Belege stehen im Mittelpunkt, nicht nur einzelne Symptome.",

        "Die Arbeit in SEO, digitalem Marketing, Analyse und Growth Operations hat mir später gezeigt, dass nachhaltiges Unternehmenswachstum dieselbe Disziplin benötigt. Sichtbarkeit, Kundenverständnis, Inhalte, Technologie und Messung müssen als verbundenes System funktionieren.",

        "Heute prägt diese Perspektive meine Analyse digitalen Verhaltens, die Entwicklung strategischer Frameworks und die Übersetzung von Forschung in praktische Ressourcen.",
      ],
    },

    backgroundCards: [
      {
        title:
          "Analytische Grundlage",

        description:
          "Ein strukturierter Ansatz zur Diagnose von Problemen, Bewertung von Belegen und Identifikation der Faktoren, die Leistung tatsächlich beeinflussen.",
      },
      {
        title:
          "Bereichsübergreifende Strategie",

        description:
          "SEO, Marketing, Konsumentenpsychologie, Kundenerfahrung, Daten und KI werden als verbundene Bestandteile betrachtet.",
      },
      {
        title:
          "Unabhängiges Wissen",

        description:
          "Entwicklung von Forschung, Frameworks und selbstständigen Lernressourcen, die ohne laufende Meetings oder direkte Betreuung nutzbar sind.",
      },
    ],

    approach: {
      eyebrow:
        "Meine Arbeitsweise",

      title:
        "Klarheit vor Umsetzung",

      description:
        "Das Ziel ist nicht, immer mehr Maßnahmen hinzuzufügen. Entscheidend ist, das tatsächliche Problem zu erkennen, Prioritäten festzulegen, Annahmen sichtbar zu machen und ein messbares System aufzubauen.",
    },

    focusIntroduction:
      "Meine aktuelle Arbeit konzentriert sich auf die folgenden miteinander verbundenen Bereiche:",

    closing: {
      eyebrow:
        "Weiter entdecken",

      title:
        "Projekte, Forschung und praktische Frameworks für nachhaltiges digitales Wachstum",

      description:
        "Diese Website vereint ausgewählte Projekte, evidenzbasierte Analysen und selbstständige Lernressourcen für klarere Entscheidungen und belastbarere Wachstumssysteme.",

      primaryLabel:
        "Forschung und Analysen lesen",

      secondaryLabel:
        "Ausgewählte Projekte ansehen",
    },
  },

  fa: {
    metadataTitle:
      "درباره ستاره صالح‌آبادی | استراتژیست رشد دیجیتال",

    metadataDescription:
      "آشنایی با مسیر حرفه‌ای و رویکرد ستاره صالح‌آبادی در استراتژی رشد دیجیتال، سئو، رفتار مصرف‌کننده، تحلیل داده و کاربرد عملی هوش مصنوعی.",

    homeLabel: "صفحه اصلی",
    pageLabel: "درباره من",

    eyebrow:
      "درباره ستاره صالح‌آبادی",

    title: {
      first:
        "نگاهی تحلیلی به",
      highlighted:
        "رشد دیجیتال و تصمیم‌گیری",
    },

    introduction:
      "مسیر حرفه‌ای من ترکیبی از تفکر تحلیلی، استراتژی دیجیتال، جست‌وجو، رفتار مصرف‌کننده، داده و کاربرد عملی هوش مصنوعی است. تمرکز من بر این است که مسائل پیچیده رشد را روشن‌تر، ساختاریافته‌تر و قابل‌اندازه‌گیری‌تر کنم.",

    background: {
      eyebrow:
        "پیشینه حرفه‌ای",

      title:
        "از تفکر مهندسی تا استراتژی رشد دیجیتال",

      paragraphs: [
        "تحصیل در مهندسی شیمی، نگاه من به حل مسئله را شکل داد؛ نگاهی که به‌جای تمرکز بر نشانه‌های جداگانه، سیستم‌ها، ارتباط میان عوامل، محدودیت‌ها و شواهد را بررسی می‌کند.",

        "فعالیت در سئو، بازاریابی دیجیتال، تحلیل داده و عملیات رشد به من نشان داد که رشد پایدار کسب‌وکار نیز به همین نوع نگاه نیاز دارد. دیده‌شدن، شناخت مشتری، محتوا، فناوری و اندازه‌گیری باید به‌عنوان اجزای یک سیستم واحد عمل کنند.",

        "امروز این دیدگاه، مبنای مطالعه رفتار دیجیتال، طراحی چارچوب‌های استراتژیک و تبدیل پژوهش به منابع کاربردی برای کسب‌وکارها و یادگیری مستقل است.",
      ],
    },

    backgroundCards: [
      {
        title:
          "پایه تحلیلی",

        description:
          "رویکردی ساختاریافته برای تشخیص مسئله، بررسی شواهد و شناسایی عواملی که واقعاً بر عملکرد تأثیر می‌گذارند.",
      },
      {
        title:
          "استراتژی میان‌رشته‌ای",

        description:
          "پیوند میان سئو، بازاریابی، روان‌شناسی مصرف‌کننده، تجربه مشتری، تحلیل داده و هوش مصنوعی، به‌جای بررسی جداگانه هر حوزه.",
      },
      {
        title:
          "دانش مستقل و کاربردی",

        description:
          "تولید پژوهش، چارچوب و منابع آموزشی خودآموز که بدون جلسات مداوم یا نیاز به پشتیبانی مستقیم قابل‌استفاده باشند.",
      },
    ],

    approach: {
      eyebrow:
        "رویکرد کاری",

      title:
        "شفافیت پیش از اجرا",

      description:
        "هدف، اضافه‌کردن تاکتیک‌های بیشتر نیست؛ ابتدا باید مسئله واقعی را شناخت، اولویت‌ها را مشخص کرد، فرضیات را آشکار ساخت و سیستمی ایجاد کرد که قابل‌اندازه‌گیری و بهبود باشد.",
    },

    focusIntroduction:
      "تمرکز فعلی من بر حوزه‌های مرتبط زیر است:",

    closing: {
      eyebrow:
        "ادامه مسیر",

      title:
        "پروژه‌ها، پژوهش‌ها و چارچوب‌های کاربردی برای رشد دیجیتال پایدار",

      description:
        "این وب‌سایت مجموعه‌ای از پروژه‌های منتخب، تحلیل‌های مبتنی بر شواهد و منابع آموزشی خودآموز است؛ با هدف کمک به تصمیم‌های روشن‌تر و طراحی سیستم‌های رشد ماندگارتر.",

      primaryLabel:
        "مطالعه پژوهش‌ها و تحلیل‌ها",

      secondaryLabel:
        "مشاهده پروژه‌های منتخب",
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
      href: prefixHomeHash(
        dictionary.footer.primaryCta.href,
        locale
      ),
    },

    secondaryCta: {
      ...dictionary.footer.secondaryCta,
      href: prefixHomeHash(
        dictionary.footer.secondaryCta.href,
        locale
      ),
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

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale: localeParam } =
    await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale =
    localeParam;

  const content =
    aboutPageContent[locale];

  const canonicalUrl =
    `${siteUrl}/${locale}/about`;

  return {
    title: content.metadataTitle,

    description:
      content.metadataDescription,

    alternates: {
      canonical: canonicalUrl,

      languages: {
        en: `${siteUrl}/en/about`,
        de: `${siteUrl}/de/about`,
        fa: `${siteUrl}/fa/about`,
        "x-default":
          `${siteUrl}/en/about`,
      },
    },

    openGraph: {
      type: "profile",

      url: canonicalUrl,

      title: content.metadataTitle,

      description:
        content.metadataDescription,

      siteName:
        "Setareh Salehabadi",

      images: [
        {
          url: "/images/about/about.png",

          alt:
            locale === "fa"
              ? "ستاره صالح‌آبادی، استراتژیست رشد دیجیتال"
              : "Setareh Salehabadi, Digital Growth Strategist",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title: content.metadataTitle,

      description:
        content.metadataDescription,

      images: [
        "/images/about/about.png",
      ],
    },
  };
}

export default async function AboutPage({
  params,
}: AboutPageProps) {
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
    aboutPageContent[locale];

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
          aria-labelledby="about-page-heading"
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
                lg:grid-cols-[minmax(0,1fr)_minmax(380px,0.82fr)]
                lg:items-center
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
                  id="about-page-heading"
                  className={`
                    mt-5
                    max-w-[880px]
                    text-[#211f1c]
                    ${
                      isPersian
                        ? "font-sans text-[clamp(2.1rem,3.65vw,3.65rem)] font-[650] leading-[1.5] tracking-normal"
                        : "font-serif text-[clamp(3.2rem,6vw,6rem)] font-medium leading-[0.98] tracking-[-0.045em]"
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
                    max-w-[760px]
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

                <div
                  className="
                    mt-8
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
                      border
                      border-[#183655]
                      bg-[#183655]
                      px-8
                      font-sans
                      font-semibold
                      text-white
                      shadow-[0_14px_30px_rgba(24,54,85,0.18)]
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:bg-[#2e5d91]
                      ${
                        isPersian
                          ? "text-[14px] sm:text-[15px]"
                          : "text-[15px]"
                      }
                    `}
                  >
                    {
                      content
                        .closing
                        .primaryLabel
                    }
                  </Link>

                  <Link
                    href={`/${locale}#case-studies`}
                    className={`
                      inline-flex
                      min-h-[56px]
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#302d29]/18
                      bg-[#fbf8f4]
                      px-8
                      font-sans
                      font-semibold
                      text-[#211f1c]
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:border-[#2e5d91]/30
                      hover:text-[#2e5d91]
                      ${
                        isPersian
                          ? "text-[14px] sm:text-[15px]"
                          : "text-[15px]"
                      }
                    `}
                  >
                    {
                      content
                        .closing
                        .secondaryLabel
                    }
                  </Link>
                </div>
              </div>

              <div className="min-w-0">
                <div
                  className="
                    overflow-hidden
                    rounded-[28px]
                    border
                    border-[#302d29]/10
                    bg-[#ded5ca]
                    shadow-[0_28px_70px_rgba(61,51,41,0.13)]
                    sm:rounded-[34px]
                  "
                >
                  <div
                    className="
                      relative
                      aspect-[4/5]
                      w-full
                      sm:aspect-[4/4.6]
                      lg:h-[clamp(520px,68vh,680px)]
                      lg:aspect-auto
                    "
                  >
                    <Image
                      src="/images/about/about.png"
                      alt={
                        dictionary
                          .about
                          .imageAlt
                      }
                      fill
                      priority
                      sizes="
                        (max-width: 1023px) calc(100vw - 40px),
                        (max-width: 1535px) 40vw,
                        590px
                      "
                      className="
                        object-cover
                        object-center
                      "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="background-heading"
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
                lg:grid-cols-[minmax(280px,0.68fr)_minmax(0,1.32fr)]
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
                        ? "text-[11px] leading-6 tracking-normal sm:text-[12px]"
                        : "text-[10px] uppercase tracking-[0.28em]"
                    }
                  `}
                >
                  {content.background.eyebrow}
                </p>

                <h2
                  id="background-heading"
                  className={`
                    mt-5
                    max-w-[620px]
                    text-[#211f1c]
                    ${
                      isPersian
                        ? "font-sans text-[clamp(1.85rem,3vw,3rem)] font-[650] leading-[1.6] tracking-normal"
                        : "font-serif text-[clamp(2.5rem,4vw,4rem)] font-medium leading-[1.03] tracking-[-0.04em]"
                    }
                  `}
                >
                  {content.background.title}
                </h2>
              </div>

              <div
                className="
                  border-t
                  border-[#302d29]/15
                "
              >
                {content.background.paragraphs.map(
                  (paragraph, index) => (
                    <div
                      key={paragraph}
                      className="
                        grid
                        gap-4
                        border-b
                        border-[#302d29]/15
                        py-7
                        sm:grid-cols-[48px_minmax(0,1fr)]
                        sm:gap-6
                        sm:py-8
                      "
                    >
                      <span
                        aria-hidden="true"
                        className={`
                          font-sans
                          font-semibold
                          text-[#978f85]
                          ${
                            isPersian
                              ? "text-[11px]"
                              : "text-[10px] tracking-[0.16em]"
                          }
                        `}
                      >
                        {new Intl.NumberFormat(
                          isPersian
                            ? "fa-IR"
                            : locale,
                          {
                            minimumIntegerDigits: 2,
                            useGrouping: false,
                          }
                        ).format(index + 1)}
                      </span>

                      <p
                        className={`
                          max-w-[820px]
                          font-sans
                          text-[#5f5a53]
                          ${
                            isPersian
                              ? "text-[16px] leading-[2.1] sm:text-[17px]"
                              : "text-[18px] leading-[2.1rem] lg:text-[19px]"
                          }
                        `}
                      >
                        {paragraph}
                      </p>
                    </div>
                  )
                )}
              </div>
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
              {content.backgroundCards.map(
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
                      {new Intl.NumberFormat(
                        isPersian
                          ? "fa-IR"
                          : locale,
                        {
                          minimumIntegerDigits: 2,
                          useGrouping: false,
                        }
                      ).format(index + 1)}
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
          aria-labelledby="approach-heading"
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
                gap-10
                border-b
                border-[#302d29]/15
                pb-12
                lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.72fr)]
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
                        ? "text-[11px] leading-6 sm:text-[12px]"
                        : "text-[10px] uppercase tracking-[0.28em]"
                    }
                  `}
                >
                  {content.approach.eyebrow}
                </p>

                <h2
                  id="approach-heading"
                  className={`
                    mt-5
                    max-w-[760px]
                    text-[#211f1c]
                    ${
                      isPersian
                        ? "font-sans text-[clamp(1.9rem,3.1vw,3.1rem)] font-[650] leading-[1.6] tracking-normal"
                        : "font-serif text-[clamp(2.5rem,4vw,4rem)] font-medium leading-[1.03] tracking-[-0.04em]"
                    }
                  `}
                >
                  {content.approach.title}
                </h2>
              </div>

              <p
                className={`
                  max-w-[620px]
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
                {content.approach.description}
              </p>
            </div>

            <div
              className="
                mt-12
                grid
                gap-10
                lg:grid-cols-[minmax(0,1.16fr)_minmax(300px,0.84fr)]
                lg:gap-16
              "
            >
              <div
                className="
                  grid
                  border-s
                  border-t
                  border-[#302d29]/15
                  sm:grid-cols-3
                "
              >
                {dictionary.about.principles.map(
                  (principle) => (
                    <article
                      key={principle.number}
                      className="
                        min-h-[270px]
                        border-b
                        border-e
                        border-[#302d29]/15
                        bg-[#ebe4da]/28
                        p-6
                        sm:p-7
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
                        {principle.number}
                      </span>

                      <h3
                        className={`
                          mt-8
                          text-[#24211e]
                          ${
                            isPersian
                              ? "font-sans text-[clamp(1.3rem,1.8vw,1.7rem)] font-[650] leading-[1.7] tracking-normal"
                              : "font-serif text-[clamp(1.7rem,2.3vw,2.25rem)] font-medium leading-[1.08] tracking-[-0.03em]"
                          }
                        `}
                      >
                        {principle.title}
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
                        {principle.description}
                      </p>
                    </article>
                  )
                )}
              </div>

              <div>
                <p
                  className={`
                    max-w-[560px]
                    font-sans
                    font-semibold
                    text-[#34302b]
                    ${
                      isPersian
                        ? "text-[1.2rem] leading-[1.9]"
                        : "text-[1.25rem] leading-[1.6]"
                    }
                  `}
                >
                  {content.focusIntroduction}
                </p>

                <div
                  className="
                    mt-7
                    flex
                    flex-wrap
                    gap-2.5
                  "
                >
                  {dictionary.about.focusAreas.map(
                    (area) => (
                      <span
                        key={area}
                        dir="auto"
                        className={`
                          rounded-full
                          border
                          border-[#302d29]/15
                          bg-[#ebe4da]/45
                          px-4
                          py-2.5
                          font-sans
                          font-medium
                          text-[#625d56]
                          ${
                            isPersian
                              ? "text-[12px] leading-6"
                              : "text-[12px]"
                          }
                        `}
                      >
                        {area}
                      </span>
                    )
                  )}
                </div>

                <div
                  className="
                    mt-9
                    border-s-2
                    border-[#b48a52]
                    ps-5
                  "
                >
                  <p
                    className={`
                      max-w-[560px]
                      font-sans
                      text-[#625d56]
                      ${
                        isPersian
                          ? "text-[15.5px] leading-[2.1] sm:text-[16.5px]"
                          : "text-[17px] leading-[2rem]"
                      }
                    `}
                  >
                    {dictionary.about.closing}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="about-closing-heading"
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
                id="about-closing-heading"
                className={`
                  max-w-[900px]
                  text-white
                  ${
                    isPersian
                      ? "font-sans text-[clamp(1.9rem,3.25vw,3.2rem)] font-[650] leading-[1.62] tracking-normal"
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
                      content.closing.primaryLabel
                    }
                  </Link>

                  <Link
                    href={`/${locale}#case-studies`}
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
                      content.closing.secondaryLabel
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