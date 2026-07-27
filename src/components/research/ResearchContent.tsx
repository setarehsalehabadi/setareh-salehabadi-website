import InsightCard from "@/components/research/InsightCard";
import MarkdownRenderer from "@/components/research/MarkdownRenderer";

import type { Locale } from "@/i18n/config";

type ResearchContentProps = {
  content: string;
  locale?: Locale;
};

type ResearchSection = {
  title: string;
  content: string;
};

type InsightCardVariant =
  | "summary"
  | "findings"
  | "business"
  | "framework"
  | "action";

type CardSectionConfig = {
  variant: InsightCardVariant;
  labels: Record<Locale, string>;
  aliases: string[];
};

const cardSectionConfigs: CardSectionConfig[] = [
  {
    variant: "summary",

    labels: {
      en: "Research summary",
      de: "Forschungsübersicht",
      fa: "مرور علمی پژوهش",
    },

    aliases: [
      "خلاصه علمی",
      "خلاصه اجرایی",
      "مرور پژوهش",
      "scientific summary",
      "executive summary",
      "research summary",
      "wissenschaftliche zusammenfassung",
      "zusammenfassung",
    ],
  },

  {
    variant: "findings",

    labels: {
      en: "Key research insights",
      de: "Zentrale Forschungserkenntnisse",
      fa: "بینش‌های اصلی پژوهش",
    },

    aliases: [
      "یافته‌های کلیدی",
      "یافته های کلیدی",
      "تحلیل روان‌شناسی مصرف‌کننده",
      "تحلیل روانشناسی مصرف‌کننده",
      "تحلیل روان شناسی مصرف کننده",
      "consumer psychology analysis",
      "key findings",
      "research findings",
      "analyse der konsumentenpsychologie",
      "zentrale erkenntnisse",
    ],
  },

  {
    variant: "business",

    labels: {
      en: "Business interpretation",
      de: "Geschäftliche Einordnung",
      fa: "کاربرد برای کسب‌وکار",
    },

    aliases: [
      "تفسیر کسب‌وکاری",
      "تفسیر کسب و کاری",
      "تحلیل کسب‌وکاری",
      "تحلیل کسب و کاری",
      "کاربرد برای کسب‌وکار",
      "business interpretation",
      "business implications",
      "business analysis",
      "geschäftliche interpretation",
      "geschäftliche einordnung",
    ],
  },

  {
    variant: "framework",

    labels: {
      en: "Proposed framework",
      de: "Vorgeschlagenes Framework",
      fa: "چارچوب پیشنهادی",
    },

    aliases: [
      "ساخت چارچوب",
      "چارچوب‌سازی",
      "چارچوب سازی",
      "چارچوب استراتژیک",
      "مدل پیشنهادی",
      "framework building",
      "strategic framework",
      "proposed framework",
      "framework-entwicklung",
      "strategisches framework",
    ],
  },

  {
    variant: "action",

    labels: {
      en: "Recommended actions",
      de: "Empfohlene Maßnahmen",
      fa: "اقدامات پیشنهادی",
    },

    aliases: [
      "چک‌لیست اقدام",
      "چک لیست اقدام",
      "اقدامات پیشنهادی",
      "action checklist",
      "recommended actions",
      "action plan",
      "handlungscheckliste",
      "empfohlene maßnahmen",
    ],
  },
];

const emptyContentMessages: Record<
  Locale,
  {
    title: string;
    description: string;
  }
> = {
  en: {
    title:
      "Research content is not available yet",

    description:
      "The full analysis will appear here after completing the research and editorial review process.",
  },

  de: {
    title:
      "Der Forschungsinhalt ist noch nicht verfügbar",

    description:
      "Die vollständige Analyse erscheint hier nach Abschluss des Forschungs- und redaktionellen Prüfprozesses.",
  },

  fa: {
    title:
      "محتوای پژوهش هنوز منتشر نشده است",

    description:
      "تحلیل کامل پس از تکمیل فرایند پژوهش و بررسی تحریریه در این بخش نمایش داده می‌شود.",
  },
};

function normalizeTitle(
  title: string,
): string {
  return title
    .replace(/^#{1,6}\s*/, "")
    .replace(/^[\d۰-۹]+\s*[-–—.:)]\s*/, "")
    .replace(/[*_`]/g, "")
    .replace(/\u200c/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function createTitleKey(
  title: string,
): string {
  return normalizeTitle(title)
    .toLocaleLowerCase()
    .replace(/[،,:؛;.!?؟()[\]{}]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getCardConfig(
  title: string,
  locale: Locale,
) {
  const titleKey =
    createTitleKey(title);

  const config =
    cardSectionConfigs.find(
      (item) =>
        item.aliases.some(
          (alias) =>
            createTitleKey(alias) ===
            titleKey,
        ),
    );

  if (!config) {
    return null;
  }

  return {
    variant:
      config.variant,

    label:
      config.labels[locale],
  };
}

function splitMarkdownIntoSections(
  markdown: string,
): ResearchSection[] {
  const normalizedContent =
    markdown
      .replace(/\r\n?/g, "\n")
      .trim();

  if (!normalizedContent) {
    return [];
  }

  const lines =
    normalizedContent.split("\n");

  const sections: ResearchSection[] =
    [];

  let currentTitle = "";
  let currentLines: string[] = [];
  let isInsideCodeFence = false;

  function saveCurrentSection() {
    const sectionContent =
      currentLines
        .join("\n")
        .trim();

    if (
      !currentTitle &&
      !sectionContent
    ) {
      currentLines = [];
      return;
    }

    sections.push({
      title:
        currentTitle,

      content:
        sectionContent,
    });

    currentLines = [];
  }

  for (const line of lines) {
    const trimmedLine =
      line.trim();

    if (
      /^(```|~~~)/.test(
        trimmedLine,
      )
    ) {
      isInsideCodeFence =
        !isInsideCodeFence;

      currentLines.push(line);
      continue;
    }

    if (!isInsideCodeFence) {
      const headingMatch =
        line.match(
          /^#{1,2}(?!#)\s+(.+?)\s*$/,
        );

      if (headingMatch) {
        saveCurrentSection();

        currentTitle =
          normalizeTitle(
            headingMatch[1],
          );

        continue;
      }
    }

    currentLines.push(line);
  }

  saveCurrentSection();

  return sections;
}

function buildSectionMarkdown(
  section: ResearchSection,
): string {
  if (!section.title) {
    return section.content;
  }

  if (!section.content) {
    return `## ${section.title}`;
  }

  return [
    `## ${section.title}`,
    "",
    section.content,
  ].join("\n");
}

export default function ResearchContent({
  content,
  locale = "fa",
}: ResearchContentProps) {
  const normalizedContent =
    content?.trim() ?? "";

  if (!normalizedContent) {
    const emptyContent =
      emptyContentMessages[locale];

    return (
      <div
        role="status"
        className="
          rounded-[24px]
          border
          border-[#2d2925]/10
          bg-[#f7f3ed]
          px-6
          py-12
          text-center
          sm:px-10
          sm:py-14
        "
      >
        <h2
          className={`
            text-[#211f1c]
            ${
              locale === "fa"
                ? "font-sans text-[1.5rem] font-[650] leading-[1.8]"
                : "font-serif text-[2rem] font-semibold leading-tight"
            }
          `}
        >
          {emptyContent.title}
        </h2>

        <p
          className={`
            mx-auto
            mt-4
            max-w-[680px]
            font-sans
            text-[#625d56]
            ${
              locale === "fa"
                ? "text-[15px] leading-[2.1]"
                : "text-[16px] leading-8"
            }
          `}
        >
          {emptyContent.description}
        </p>
      </div>
    );
  }

  const sections =
    splitMarkdownIntoSections(
      normalizedContent,
    );

  if (!sections.length) {
    return (
      <MarkdownRenderer
        content={normalizedContent}
        locale={locale}
      />
    );
  }

  return (
    <div
      dir={
        locale === "fa"
          ? "rtl"
          : "ltr"
      }
      className="
        space-y-10
        sm:space-y-12
      "
    >
      {sections.map(
        (section, index) => {
          const cardConfig =
            getCardConfig(
              section.title,
              locale,
            );

          const sectionKey =
            section.title
              ? `${createTitleKey(
                  section.title,
                )}-${index}`
              : `introduction-${index}`;

          if (cardConfig) {
            return (
              <InsightCard
                key={sectionKey}
                title={
                  section.title
                }
                variant={
                  cardConfig.variant
                }
                label={
                  cardConfig.label
                }
              >
                {section.content ? (
                  <MarkdownRenderer
                    content={
                      section.content
                    }
                    locale={
                      locale
                    }
                  />
                ) : null}
              </InsightCard>
            );
          }

          return (
            <section
              key={sectionKey}
              aria-label={
                section.title ||
                undefined
              }
              className="
                border-b
                border-[#2d2925]/10
                pb-10
                last:border-b-0
                last:pb-0
                sm:pb-12
              "
            >
              <MarkdownRenderer
                content={buildSectionMarkdown(
                  section,
                )}
                locale={locale}
              />
            </section>
          );
        },
      )}
    </div>
  );
}