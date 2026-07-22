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
  type Dictionary,
} from "@/i18n/get-dictionary";

const siteUrl =
  "https://setarehsalehabadi.com";

type CoursesPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

type LearningArea = {
  title: string;
  description: string;
  status: string;
};

type CoursesPageContent = {
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

  availability: {
    label: string;
    title: string;
    description: string;
  };

  model: {
    eyebrow: string;
    title: string;
    description: string;

    principles: {
      title: string;
      description: string;
    }[];
  };

  structure: {
    eyebrow: string;
    title: string;
    description: string;

    steps: {
      title: string;
      description: string;
    }[];
  };

  areas: {
    eyebrow: string;
    title: string;
    description: string;
    items: LearningArea[];
  };

  purchaseModel: {
    eyebrow: string;
    title: string;
    description: string;

    steps: {
      title: string;
      description: string;
    }[];

    notice: string;
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
  CoursesPageContent
> = {
  en: {
    metadataTitle:
      "Self-Guided Learning Resources | Setareh Salehabadi",

    metadataDescription:
      "A planned library of independent, self-guided educational resources covering SEO, digital strategy, data, consumer psychology, AI and automation.",

    homeLabel: "Home",
    pageLabel: "Learning",

    eyebrow:
      "Self-guided learning",

    title: {
      first:
        "Practical learning designed for",
      highlighted:
        "independent progress",
    },

    introduction:
      "This learning space is being designed for people who want clear, practical and evidence-based educational resources without live sessions, project submissions, recurring meetings or dependency on direct instructor support.",

    availability: {
      label:
        "Current availability",

      title:
        "No paid course is currently active",

      description:
        "The learning library is still being developed. No course, price, payment link or enrolment claim is active on this page at the moment.",
    },

    model: {
      eyebrow:
        "Learning model",

      title:
        "Complete resources instead of ongoing support",

      description:
        "Each future product should contain enough structure, explanation and practical guidance for the learner to use it independently from beginning to end.",

      principles: [
        {
          title:
            "Self-paced by design",

          description:
            "Learners should be able to study according to their own schedule without fixed class times or mandatory meetings.",
        },
        {
          title:
            "No direct support dependency",

          description:
            "The resource should not require coaching, instructor review, project submission or ongoing communication to be useful.",
        },
        {
          title:
            "Practical and structured",

          description:
            "Concepts should be connected to clear examples, frameworks, checklists and practical decision-making tools.",
        },
      ],
    },

    structure: {
      eyebrow:
        "Resource structure",

      title:
        "What a complete self-guided resource should include",

      description:
        "Before publication, every educational product should be designed as a complete learning system rather than a collection of disconnected lessons.",

      steps: [
        {
          title:
            "Clear learning objective",

          description:
            "The learner should understand exactly what problem the resource addresses and what capability it is designed to develop.",
        },
        {
          title:
            "Progressive explanation",

          description:
            "The material should move from foundations to application without assuming unsupported knowledge or skipping important steps.",
        },
        {
          title:
            "Practical tools",

          description:
            "Frameworks, worksheets, templates, examples and checklists should help translate learning into independent action.",
        },
        {
          title:
            "Independent completion",

          description:
            "The learner should be able to complete the resource without live instruction, personal feedback or direct support.",
        },
      ],
    },

    areas: {
      eyebrow:
        "Planned learning areas",

      title:
        "Connected skills for sustainable digital growth",

      description:
        "The following areas represent the planned direction of the learning library. They are not currently available as active paid courses.",

      items: [
        {
          title:
            "SEO and Organic Growth",

          description:
            "Search strategy, technical foundations, content structure, search intent and sustainable organic visibility.",

          status:
            "Planned",
        },
        {
          title:
            "Digital Growth Strategy",

          description:
            "Growth systems, strategic priorities, customer journeys, channel alignment and evidence-based decision-making.",

          status:
            "Planned",
        },
        {
          title:
            "Data and Analytics",

          description:
            "Measurement foundations, KPI design, interpretation, dashboards and clearer performance evaluation.",

          status:
            "Planned",
        },
        {
          title:
            "Consumer Psychology",

          description:
            "Decision-making, trust, attention, audience understanding and responsible application of behavioral insights.",

          status:
            "Planned",
        },
        {
          title:
            "AI and Automation",

          description:
            "Practical AI workflows, automation logic, quality control and responsible use of intelligent systems.",

          status:
            "Planned",
        },
      ],
    },

    purchaseModel: {
      eyebrow:
        "Future access model",

      title:
        "A clear path from selection to independent learning",

      description:
        "When the learning platform becomes active, the purchase and access process should remain simple, transparent and largely automated.",

      steps: [
        {
          title:
            "Review the resource",

          description:
            "The product page should clearly explain the topic, scope, format, level and expected learning outcome.",
        },
        {
          title:
            "Complete payment",

          description:
            "The learner should be able to complete payment through the available checkout method without arranging a call.",
        },
        {
          title:
            "Receive access",

          description:
            "Access or downloadable files should be delivered automatically after a successful payment.",
        },
        {
          title:
            "Learn independently",

          description:
            "The learner should be able to use the complete resource without mandatory contact, meetings or direct support.",
        },
      ],

      notice:
        "This purchase flow is not active yet. No payment or enrolment should be attempted until an active product page is published.",
    },

    closing: {
      eyebrow:
        "While the library is being developed",

      title:
        "Explore the research and strategic thinking behind future learning resources",

      description:
        "The research and project sections already provide a view of the evidence, frameworks and practical reasoning that will shape the educational library.",

      primaryLabel:
        "Read research and analysis",

      secondaryLabel:
        "View selected projects",
    },
  },

  de: {
    metadataTitle:
      "Selbstständige Lernressourcen | Setareh Salehabadi",

    metadataDescription:
      "Eine geplante Bibliothek selbstständiger Lernressourcen zu SEO, digitaler Strategie, Datenanalyse, Konsumentenpsychologie, KI und Automatisierung.",

    homeLabel: "Startseite",
    pageLabel: "Lernen",

    eyebrow:
      "Selbstständiges Lernen",

    title: {
      first:
        "Praktisches Lernen für",
      highlighted:
        "unabhängigen Fortschritt",
    },

    introduction:
      "Dieser Lernbereich wird für Menschen entwickelt, die klare, praktische und evidenzbasierte Lernressourcen nutzen möchten – ohne Live-Unterricht, Projektabgaben, regelmäßige Meetings oder Abhängigkeit von direkter Betreuung.",

    availability: {
      label:
        "Aktueller Status",

      title:
        "Derzeit ist kein kostenpflichtiger Kurs aktiv",

      description:
        "Die Lernbibliothek befindet sich noch in Entwicklung. Auf dieser Seite sind aktuell keine Kurse, Preise, Zahlungslinks oder Anmeldungen aktiv.",
    },

    model: {
      eyebrow:
        "Lernmodell",

      title:
        "Vollständige Ressourcen statt laufender Betreuung",

      description:
        "Jedes zukünftige Produkt soll genügend Struktur, Erklärung und praktische Anleitung enthalten, damit es vollständig selbstständig genutzt werden kann.",

      principles: [
        {
          title:
            "Lernen im eigenen Tempo",

          description:
            "Lernende sollen nach ihrem eigenen Zeitplan arbeiten können – ohne feste Unterrichtszeiten oder verpflichtende Meetings.",
        },
        {
          title:
            "Keine Abhängigkeit von Betreuung",

          description:
            "Die Ressource soll kein Coaching, keine Projektprüfung und keine laufende Kommunikation benötigen, um nützlich zu sein.",
        },
        {
          title:
            "Praktisch und strukturiert",

          description:
            "Konzepte sollen mit klaren Beispielen, Frameworks, Checklisten und praktischen Entscheidungshilfen verbunden werden.",
        },
      ],
    },

    structure: {
      eyebrow:
        "Aufbau der Ressourcen",

      title:
        "Was eine vollständige selbstständige Lernressource enthalten sollte",

      description:
        "Vor der Veröffentlichung soll jedes Produkt als vollständiges Lernsystem gestaltet werden – nicht als Sammlung unverbundener Lektionen.",

      steps: [
        {
          title:
            "Klares Lernziel",

          description:
            "Die Lernenden sollen genau verstehen, welches Problem behandelt und welche Fähigkeit entwickelt wird.",
        },
        {
          title:
            "Schrittweise Erklärung",

          description:
            "Das Material soll von den Grundlagen zur Anwendung führen, ohne wichtige Zwischenschritte auszulassen.",
        },
        {
          title:
            "Praktische Werkzeuge",

          description:
            "Frameworks, Arbeitsblätter, Vorlagen, Beispiele und Checklisten sollen selbstständiges Handeln unterstützen.",
        },
        {
          title:
            "Unabhängiger Abschluss",

          description:
            "Die Ressource soll ohne Live-Unterricht, persönliche Rückmeldung oder direkte Betreuung abgeschlossen werden können.",
        },
      ],
    },

    areas: {
      eyebrow:
        "Geplante Lernbereiche",

      title:
        "Verbundene Fähigkeiten für nachhaltiges digitales Wachstum",

      description:
        "Die folgenden Bereiche beschreiben die geplante Richtung der Lernbibliothek. Sie sind derzeit nicht als aktive kostenpflichtige Kurse verfügbar.",

      items: [
        {
          title:
            "SEO und organisches Wachstum",

          description:
            "Suchstrategie, technische Grundlagen, Inhaltsstruktur, Suchintention und nachhaltige organische Sichtbarkeit.",

          status:
            "Geplant",
        },
        {
          title:
            "Digitale Wachstumsstrategie",

          description:
            "Wachstumssysteme, strategische Prioritäten, Customer Journeys, Kanalabstimmung und evidenzbasierte Entscheidungen.",

          status:
            "Geplant",
        },
        {
          title:
            "Daten und Analyse",

          description:
            "Messgrundlagen, KPI-Entwicklung, Interpretation, Dashboards und klarere Leistungsbewertung.",

          status:
            "Geplant",
        },
        {
          title:
            "Konsumentenpsychologie",

          description:
            "Entscheidungsverhalten, Vertrauen, Aufmerksamkeit, Zielgruppenverständnis und verantwortungsvolle Anwendung verhaltensbezogener Erkenntnisse.",

          status:
            "Geplant",
        },
        {
          title:
            "KI und Automatisierung",

          description:
            "Praktische KI-Workflows, Automatisierungslogik, Qualitätskontrolle und verantwortungsvoller Einsatz intelligenter Systeme.",

          status:
            "Geplant",
        },
      ],
    },

    purchaseModel: {
      eyebrow:
        "Zukünftiges Zugangsmodell",

      title:
        "Ein klarer Weg von der Auswahl zum selbstständigen Lernen",

      description:
        "Sobald die Lernplattform aktiv ist, soll der Kauf- und Zugangsprozess einfach, transparent und weitgehend automatisiert funktionieren.",

      steps: [
        {
          title:
            "Ressource prüfen",

          description:
            "Die Produktseite soll Thema, Umfang, Format, Niveau und erwartetes Lernergebnis klar beschreiben.",
        },
        {
          title:
            "Zahlung abschließen",

          description:
            "Die Zahlung soll über die verfügbaren Checkout-Methoden ohne vorheriges Gespräch möglich sein.",
        },
        {
          title:
            "Zugang erhalten",

          description:
            "Der Zugang oder die herunterladbaren Dateien sollen nach erfolgreicher Zahlung automatisch bereitgestellt werden.",
        },
        {
          title:
            "Selbstständig lernen",

          description:
            "Die vollständige Ressource soll ohne verpflichtenden Kontakt, Meetings oder direkte Betreuung nutzbar sein.",
        },
      ],

      notice:
        "Dieser Kaufprozess ist noch nicht aktiv. Zahlungen oder Anmeldungen sind erst möglich, wenn eine aktive Produktseite veröffentlicht wurde.",
    },

    closing: {
      eyebrow:
        "Während die Bibliothek entwickelt wird",

      title:
        "Entdecken Sie die Forschung und strategische Denkweise hinter den zukünftigen Lernressourcen",

      description:
        "Die Forschungs- und Projektbereiche zeigen bereits die Belege, Frameworks und praktische Logik, auf denen die Lernbibliothek aufbauen wird.",

      primaryLabel:
        "Forschung und Analysen lesen",

      secondaryLabel:
        "Ausgewählte Projekte ansehen",
    },
  },

  fa: {
    metadataTitle:
      "آموزش‌های خودآموز رشد دیجیتال | ستاره صالح‌آبادی",

    metadataDescription:
      "کتابخانه‌ای در حال توسعه از منابع آموزشی مستقل و خودآموز در حوزه سئو، استراتژی رشد دیجیتال، تحلیل داده، رفتار مصرف‌کننده، هوش مصنوعی و اتوماسیون.",

    homeLabel: "صفحه اصلی",
    pageLabel: "آموزش‌های خودآموز",

    eyebrow:
      "یادگیری مستقل و خودآموز",

    title: {
      first:
        "آموزش‌های کاربردی برای",
      highlighted:
        "یادگیری و پیشرفت مستقل",
    },

    introduction:
      "این بخش برای افرادی طراحی می‌شود که به منابع آموزشی روشن، کاربردی و مبتنی بر شواهد نیاز دارند؛ بدون کلاس زنده، تحویل پروژه، جلسات مداوم یا وابستگی به ارتباط و پشتیبانی مستقیم.",
 
    availability: {
      label:
        "وضعیت فعلی",

      title:
        "در حال حاضر هیچ دوره پولی فعالی وجود ندارد",

      description:
        "کتابخانه آموزشی هنوز در حال توسعه است. در این صفحه فعلاً هیچ دوره، قیمت، لینک پرداخت یا ثبت‌نام فعالی ارائه نمی‌شود.",
    },

    model: {
      eyebrow:
        "مدل آموزشی",

      title:
        "منابع کامل به‌جای پشتیبانی مداوم",

      description:
        "هر محصول آموزشی آینده باید ساختار، توضیح و راهنمای عملی کافی داشته باشد تا مخاطب بتواند آن را از ابتدا تا انتها به‌صورت مستقل استفاده کند.",

      principles: [
        {
          title:
            "یادگیری با زمان‌بندی شخصی",

          description:
            "مخاطب باید بتواند بدون ساعت ثابت کلاس یا جلسه اجباری، آموزش را با برنامه شخصی خود پیش ببرد.",
        },
        {
          title:
            "بدون وابستگی به پشتیبانی مستقیم",

          description:
            "منبع آموزشی نباید برای مفیدبودن به کوچینگ، بررسی پروژه، تماس مستمر یا ارتباط مستقیم با مدرس وابسته باشد.",
        },
        {
          title:
            "ساختاریافته و کاربردی",

          description:
            "مفاهیم باید با مثال، چارچوب، چک‌لیست و ابزارهای کاربردی برای تصمیم‌گیری و اجرا همراه باشند.",
        },
      ],
    },

    structure: {
      eyebrow:
        "ساختار منابع آموزشی",

      title:
        "یک منبع خودآموز کامل باید چه بخش‌هایی داشته باشد",

      description:
        "هر محصول آموزشی پیش از انتشار باید به‌عنوان یک سیستم کامل یادگیری طراحی شود؛ نه مجموعه‌ای از درس‌های جدا و بدون ارتباط.",

      steps: [
        {
          title:
            "هدف یادگیری روشن",

          description:
            "مخاطب باید بداند این منبع دقیقاً چه مسئله‌ای را حل می‌کند و قرار است چه توانایی مشخصی را توسعه دهد.",
        },
        {
          title:
            "توضیح مرحله‌به‌مرحله",

          description:
            "محتوا باید از مبانی به کاربرد برسد و بدون حذف مراحل مهم، مسیر یادگیری را به‌صورت پیوسته پیش ببرد.",
        },
        {
          title:
            "ابزارهای کاربردی",

          description:
            "چارچوب‌ها، کاربرگ‌ها، قالب‌ها، مثال‌ها و چک‌لیست‌ها باید امکان اقدام مستقل را برای مخاطب فراهم کنند.",
        },
        {
          title:
            "امکان تکمیل مستقل",

          description:
            "مخاطب باید بتواند آموزش را بدون تدریس زنده، بازخورد شخصی یا پشتیبانی مستقیم به پایان برساند.",
        },
      ],
    },

    areas: {
      eyebrow:
        "حوزه‌های آموزشی برنامه‌ریزی‌شده",

      title:
        "مهارت‌های مرتبط برای ساخت رشد دیجیتال پایدار",

      description:
        "حوزه‌های زیر مسیر برنامه‌ریزی‌شده کتابخانه آموزشی را نشان می‌دهند. این موارد در حال حاضر به‌عنوان دوره پولی فعال عرضه نشده‌اند.",

      items: [
        {
          title:
            "سئو و رشد ارگانیک",

          description:
            "استراتژی جست‌وجو، مبانی فنی، ساختار محتوا، نیت جست‌وجو و افزایش پایدار دیده‌شدن ارگانیک.",

          status:
            "در حال برنامه‌ریزی",
        },
        {
          title:
            "استراتژی رشد دیجیتال",

          description:
            "سیستم‌های رشد، اولویت‌های استراتژیک، سفر مشتری، هماهنگی کانال‌ها و تصمیم‌گیری مبتنی بر شواهد.",

          status:
            "در حال برنامه‌ریزی",
        },
        {
          title:
            "داده و تحلیل عملکرد",

          description:
            "مبانی اندازه‌گیری، طراحی شاخص‌ها، تفسیر داده، داشبوردها و ارزیابی روشن‌تر عملکرد.",

          status:
            "در حال برنامه‌ریزی",
        },
        {
          title:
            "روان‌شناسی مصرف‌کننده",

          description:
            "تصمیم‌گیری، اعتماد، توجه، شناخت مخاطب و استفاده مسئولانه از بینش‌های رفتاری.",

          status:
            "در حال برنامه‌ریزی",
        },
        {
          title:
            "هوش مصنوعی و اتوماسیون",

          description:
            "جریان‌های کاری هوش مصنوعی، منطق اتوماسیون، کنترل کیفیت و استفاده مسئولانه از سیستم‌های هوشمند.",

          status:
            "در حال برنامه‌ریزی",
        },
      ],
    },

    purchaseModel: {
      eyebrow:
        "مدل آینده دسترسی",

      title:
        "مسیر روشن از انتخاب تا یادگیری مستقل",

      description:
        "پس از فعال‌شدن پلتفرم آموزشی، فرایند خرید و دسترسی باید ساده، شفاف و تا حد ممکن خودکار باشد.",

      steps: [
        {
          title:
            "بررسی منبع آموزشی",

          description:
            "صفحه محصول باید موضوع، دامنه محتوا، فرمت، سطح و نتیجه موردانتظار یادگیری را به‌روشنی توضیح دهد.",
        },
        {
          title:
            "پرداخت داخل سایت",

          description:
            "مخاطب باید بتواند بدون هماهنگی تماس یا جلسه، پرداخت را از طریق روش‌های فعال سایت انجام دهد.",
        },
        {
          title:
            "دریافت خودکار دسترسی",

          description:
            "پس از پرداخت موفق، دسترسی یا فایل‌های قابل‌دریافت باید به‌صورت خودکار در اختیار خریدار قرار گیرند.",
        },
        {
          title:
            "یادگیری مستقل",

          description:
            "مخاطب باید بتواند منبع کامل را بدون ارتباط اجباری، جلسه یا پشتیبانی مستقیم استفاده کند.",
        },
      ],

      notice:
        "این مسیر خرید هنوز فعال نیست. تا پیش از انتشار صفحه رسمی یک محصول، هیچ پرداخت یا ثبت‌نامی نباید انجام شود.",
    },

    closing: {
      eyebrow:
        "تا زمان تکمیل کتابخانه آموزشی",

      title:
        "پژوهش‌ها و منطق استراتژیک پشت منابع آموزشی آینده را بررسی کنید",

      description:
        "بخش‌های پژوهش و پروژه‌ها، شواهد، چارچوب‌ها و منطق کاربردی‌ای را نشان می‌دهند که مبنای طراحی منابع آموزشی آینده خواهند بود.",

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
}: CoursesPageProps): Promise<Metadata> {
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
    `${siteUrl}/${locale}/courses`;

  return {
    title:
      content.metadataTitle,

    description:
      content.metadataDescription,

    alternates: {
      canonical: canonicalUrl,

      languages: {
        en: `${siteUrl}/en/courses`,
        de: `${siteUrl}/de/courses`,
        fa: `${siteUrl}/fa/courses`,

        "x-default":
          `${siteUrl}/en/courses`,
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
              ? "آموزش‌های خودآموز و سیستم‌های رشد دیجیتال"
              : "Self-guided learning resources for digital growth",
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

export default async function CoursesPage({
  params,
}: CoursesPageProps) {
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
          aria-labelledby="courses-page-heading"
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
                  id="courses-page-heading"
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
                  content.availability.label
                }
                className="
                  rounded-[26px]
                  border
                  border-[#302d29]/13
                  bg-[#ebe4da]/70
                  p-6
                  sm:p-7
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
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
                    {content.availability.label}
                  </p>

                  <span
                    aria-hidden="true"
                    className="
                      h-2.5
                      w-2.5
                      shrink-0
                      rounded-full
                      bg-[#b48a52]
                      shadow-[0_0_0_6px_rgba(180,138,82,0.12)]
                    "
                  />
                </div>

                <h2
                  className={`
                    mt-5
                    text-[#24211e]
                    ${
                      isPersian
                        ? "font-sans text-[clamp(1.4rem,2vw,1.85rem)] font-[650] leading-[1.75] tracking-normal"
                        : "font-serif text-[clamp(1.8rem,2.7vw,2.6rem)] font-medium leading-[1.12] tracking-[-0.03em]"
                    }
                  `}
                >
                  {content.availability.title}
                </h2>

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
                  {content.availability.description}
                </p>
              </aside>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="learning-model-heading"
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
                  {content.model.eyebrow}
                </p>

                <h2
                  id="learning-model-heading"
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
                  {content.model.title}
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
                {content.model.description}
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
              {content.model.principles.map(
                (principle, index) => (
                  <article
                    key={principle.title}
                    className="
                      flex
                      min-h-[280px]
                      flex-col
                      border-b
                      border-e
                      border-[#302d29]/15
                      bg-[#f7f3ed]/42
                      p-6
                      sm:p-7
                      lg:min-h-[320px]
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
                      {principle.title}
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
                      {principle.description}
                    </p>
                  </article>
                )
              )}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="resource-structure-heading"
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
                  {content.structure.eyebrow}
                </p>

                <h2
                  id="resource-structure-heading"
                  className={`
                    mt-5
                    max-w-[860px]
                    text-[#211f1c]
                    ${
                      isPersian
                        ? "font-sans text-[clamp(1.85rem,3vw,3rem)] font-[650] leading-[1.62] tracking-normal"
                        : "font-serif text-[clamp(2.5rem,4vw,4rem)] font-medium leading-[1.03] tracking-[-0.04em]"
                    }
                  `}
                >
                  {content.structure.title}
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
                {content.structure.description}
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
              {content.structure.steps.map(
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
          aria-labelledby="learning-areas-heading"
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
                lg:grid-cols-[minmax(280px,0.72fr)_minmax(0,1.28fr)]
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
                  {content.areas.eyebrow}
                </p>

                <h2
                  id="learning-areas-heading"
                  className={`
                    mt-5
                    max-w-[660px]
                    text-[#211f1c]
                    ${
                      isPersian
                        ? "font-sans text-[clamp(1.85rem,3vw,3rem)] font-[650] leading-[1.62] tracking-normal"
                        : "font-serif text-[clamp(2.5rem,4vw,4rem)] font-medium leading-[1.03] tracking-[-0.04em]"
                    }
                  `}
                >
                  {content.areas.title}
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
                  {content.areas.description}
                </p>
              </div>

              <div
                className="
                  border-t
                  border-[#302d29]/15
                "
              >
                {content.areas.items.map(
                  (area, index) => (
                    <article
                      key={area.title}
                      className="
                        grid
                        gap-5
                        border-b
                        border-[#302d29]/15
                        py-8
                        sm:grid-cols-[52px_minmax(0,1fr)_auto]
                        sm:items-start
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
                          {area.title}
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
                          {area.description}
                        </p>
                      </div>

                      <span
                        className={`
                          w-fit
                          rounded-full
                          border
                          border-[#8a672f]/25
                          bg-[#f7f3ed]/60
                          px-3.5
                          py-2
                          font-sans
                          font-semibold
                          text-[#8a672f]
                          ${
                            isPersian
                              ? "text-[11px] leading-6"
                              : "text-[10px] uppercase tracking-[0.1em]"
                          }
                        `}
                      >
                        {area.status}
                      </span>
                    </article>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="purchase-model-heading"
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
                  {content.purchaseModel.eyebrow}
                </p>

                <h2
                  id="purchase-model-heading"
                  className={`
                    mt-5
                    max-w-[860px]
                    text-[#211f1c]
                    ${
                      isPersian
                        ? "font-sans text-[clamp(1.85rem,3vw,3rem)] font-[650] leading-[1.62] tracking-normal"
                        : "font-serif text-[clamp(2.5rem,4vw,4rem)] font-medium leading-[1.03] tracking-[-0.04em]"
                    }
                  `}
                >
                  {content.purchaseModel.title}
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
                {content.purchaseModel.description}
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
              {content.purchaseModel.steps.map(
                (step, index) => (
                  <article
                    key={step.title}
                    className="
                      flex
                      min-h-[290px]
                      flex-col
                      border-b
                      border-e
                      border-[#302d29]/15
                      bg-[#ebe4da]/30
                      p-6
                      sm:p-7
                      xl:min-h-[330px]
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

            <div
              className="
                mt-8
                rounded-[22px]
                border
                border-[#8a672f]/20
                bg-[#ebe4da]/50
                px-5
                py-5
                sm:px-7
                sm:py-6
              "
            >
              <p
                className={`
                  max-w-[980px]
                  font-sans
                  font-medium
                  text-[#6e675f]
                  ${
                    isPersian
                      ? "text-[13px] leading-8 sm:text-[14px]"
                      : "text-[14px] leading-7"
                  }
                `}
              >
                {content.purchaseModel.notice}
              </p>
            </div>
          </div>
        </section>

        <section
          id="case-studies"
          aria-labelledby="courses-closing-heading"
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
                id="courses-closing-heading"
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
                    href={`/${locale}/research`}
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
                    href={`/${locale}/case-studies`}
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