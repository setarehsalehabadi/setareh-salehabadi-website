import InsightCard from "@/components/research/InsightCard";
import MarkdownRenderer from "@/components/research/MarkdownRenderer";

import type {
  Locale,
} from "@/i18n/config";

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

  labels: Record<
    Locale,
    string
  >;

  aliases: string[];
};

const cardSectionConfigs: CardSectionConfig[] = [
  {
    variant:
      "summary",

    labels: {
      en:
        "Research overview",

      de:
        "Forschungsübersicht",

      fa:
        "مرور پژوهش",
    },

    aliases: [
      "خلاصه پژوهش",
      "خلاصه علمی",
      "خلاصه علمی پژوهش",
      "خلاصه اجرایی",
      "مرور پژوهش",
      "مرور علمی پژوهش",
      "scientific summary",
      "executive summary",
      "research summary",
      "wissenschaftliche zusammenfassung",
      "zusammenfassung",
    ],
  },

  {
    variant:
      "findings",

    labels: {
      en:
        "Behavioural insight",

      de:
        "Verhaltensbezogene Erkenntnis",

      fa:
        "بینش رفتاری",
    },

    aliases: [
      "یافته‌های اصلی",
      "یافته های اصلی",
      "یافته‌های پژوهش",
      "یافته های پژوهش",
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
    variant:
      "business",

    labels: {
      en:
        "Strategic application",

      de:
        "Strategische Anwendung",

      fa:
        "کاربرد استراتژیک",
    },

    aliases: [
      "تفسیر کسب‌وکاری",
      "تفسیر کسب و کاری",
      "تحلیل کسب‌وکاری",
      "تحلیل کسب و کاری",
      "کاربرد برای کسب‌وکار",
      "کاربرد برای کسب و کار",
      "business interpretation",
      "business implications",
      "business analysis",
      "geschäftliche interpretation",
      "geschäftliche einordnung",
    ],
  },

  {
    variant:
      "framework",

    labels: {
      en:
        "Decision framework",

      de:
        "Entscheidungsrahmen",

      fa:
        "مدل تصمیم",
    },

    aliases: [
      "چارچوب پیشنهادی",
      "ساخت چارچوب",
      "چارچوب‌سازی",
      "چارچوب سازی",
      "چارچوب استراتژیک",
      "مدل پیشنهادی",
      "framework",
      "framework building",
      "strategic framework",
      "proposed framework",
      "framework-entwicklung",
      "strategisches framework",
    ],
  },

  {
    variant:
      "action",

    labels: {
      en:
        "Practical action",

      de:
        "Praktische Maßnahme",

      fa:
        "اقدام عملی",
    },

    aliases: [
      "چک‌لیست اجرایی",
      "چک لیست اجرایی",
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

const persianTitleMap: Record<
  string,
  string
> = {
  "scientific summary":
    "خلاصه علمی",

  "research summary":
    "خلاصه پژوهش",

  "consumer psychology analysis":
    "تحلیل روان‌شناسی مصرف‌کننده",

  "business interpretation":
    "تفسیر کسب‌وکاری",

  framework:
    "چارچوب پیشنهادی",

  "proposed framework":
    "چارچوب پیشنهادی",

  "action checklist":
    "چک‌لیست اجرایی",

  limitations:
    "محدودیت‌های پژوهش",

  "research limitations":
    "محدودیت‌های پژوهش",

  "my take":
    "برداشت من",

  "research findings":
    "یافته‌های پژوهش",

  "key findings":
    "یافته‌های اصلی",

  "perceived value loss":
    "کاهش ارزش ادراک‌شده",

  "expectation gap":
    "شکاف انتظارات",

  "trust erosion":
    "فرسایش اعتماد",

  transparency:
    "شفافیت",

  "human oversight":
    "نظارت انسانی",

  "human control":
    "کنترل انسانی",

  "perceived benefit":
    "منفعت ادراک‌شده",

  "personal relevance":
    "تناسب شخصی",

  recognition:
    "احساس شناخته‌شدن",

  "contextual experience":
    "تجربه زمینه‌محور",

  "human-centered ai growth framework":
    "چارچوب رشد انسان‌محور با هوش مصنوعی",
};

const editorialTones = [
  {
    container:
      "border-[#b4853b]/18 bg-[#fbf7ef]",

    number:
      "text-[#b4853b]",

    line:
      "bg-[#b4853b]",
  },

  {
    container:
      "border-[#526653]/16 bg-[#f3f6f1]",

    number:
      "text-[#526653]",

    line:
      "bg-[#526653]",
  },

  {
    container:
      "border-[#2e5d91]/16 bg-[#f2f5f8]",

    number:
      "text-[#2e5d91]",

    line:
      "bg-[#2e5d91]",
  },

  {
    container:
      "border-[#786b60]/15 bg-[#f7f4ef]",

    number:
      "text-[#786b60]",

    line:
      "bg-[#786b60]",
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
    .replace(
      /^#{1,6}\s*/,
      "",
    )
    .replace(
      /^[\d۰-۹]+\s*[-–—.:)]\s*/,
      "",
    )
    .replace(
      /[*_`]/g,
      "",
    )
    .replace(
      /\u200c/g,
      " ",
    )
    .replace(
      /\s+/g,
      " ",
    )
    .trim();
}

function createTitleKey(
  title: string,
): string {
  return normalizeTitle(
    title,
  )
    .toLocaleLowerCase()
    .replace(
      /[،,:؛;.!?؟()[\]{}]/g,
      "",
    )
    .replace(
      /[-–—]+/g,
      " ",
    )
    .replace(
      /\s+/g,
      " ",
    )
    .trim();
}

function getVisibleTitle(
  title: string,
  locale: Locale,
): string {
  if (
    locale !== "fa"
  ) {
    return title;
  }

  const titleKey =
    createTitleKey(
      title,
    );

  return (
    persianTitleMap[
      titleKey
    ] ||
    title
  );
}

function getCardConfig(
  title: string,
  locale: Locale,
) {
  const titleKey =
    createTitleKey(
      title,
    );

  const matchedConfig =
    cardSectionConfigs.find(
      (
        config,
      ) =>
        config.aliases.some(
          (
            alias,
          ) =>
            createTitleKey(
              alias,
            ) ===
            titleKey,
        ),
    );

  if (
    !matchedConfig
  ) {
    return null;
  }

  return {
    variant:
      matchedConfig.variant,

    label:
      matchedConfig.labels[
        locale
      ],
  };
}

function splitMarkdownIntoSections(
  markdown: string,
): ResearchSection[] {
  const normalizedContent =
    markdown
      .replace(
        /\r\n?/g,
        "\n",
      )
      .trim();

  if (
    !normalizedContent
  ) {
    return [];
  }

  const lines =
    normalizedContent.split(
      "\n",
    );

  const sections:
    ResearchSection[] = [];

  let currentTitle =
    "";

  let currentLines:
    string[] = [];

  let isInsideCodeFence =
    false;

  function saveCurrentSection() {
    const sectionContent =
      currentLines
        .join(
          "\n",
        )
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

  for (
    const line of lines
  ) {
    const trimmedLine =
      line.trim();

    if (
      /^(```|~~~)/.test(
        trimmedLine,
      )
    ) {
      isInsideCodeFence =
        !isInsideCodeFence;

      currentLines.push(
        line,
      );

      continue;
    }

    if (
      !isInsideCodeFence
    ) {
      const headingMatch =
        line.match(
          /^#{1,2}(?!#)\s+(.+?)\s*$/,
        );

      if (
        headingMatch
      ) {
        saveCurrentSection();

        currentTitle =
          normalizeTitle(
            headingMatch[1],
          );

        continue;
      }
    }

    currentLines.push(
      line,
    );
  }

  saveCurrentSection();

  return sections;
}

function createSectionId(
  title: string,
  index: number,
): string {
  const normalizedTitle =
    createTitleKey(
      title,
    )
      .replace(
        /[^a-z0-9\u0600-\u06ff]+/g,
        "-",
      )
      .replace(
        /^-+|-+$/g,
        "",
      );

  return (
    normalizedTitle ||
    `research-section-${index + 1}`
  );
}

function formatSectionNumber(
  index: number,
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
  ).format(
    index + 1,
  );
}

function localizePersianHeadings(
  markdown: string,
  locale: Locale,
): string {
  if (
    locale !== "fa"
  ) {
    return markdown;
  }

  return markdown
    .split(
      "\n",
    )
    .map(
      (
        line,
      ) => {
        const headingMatch =
          line.match(
            /^(#{1,6})\s+(.+?)\s*$/,
          );

        if (
          !headingMatch
        ) {
          return line;
        }

        const level =
          headingMatch[1];

        const originalTitle =
          headingMatch[2];

        return `${level} ${getVisibleTitle(
          originalTitle,
          locale,
        )}`;
      },
    )
    .join(
      "\n",
    );
}

export default function ResearchContent({
  content,
  locale = "fa",
}: ResearchContentProps) {
  const normalizedContent =
    content?.trim() ??
    "";

  if (
    !normalizedContent
  ) {
    const message =
      emptyContentMessages[
        locale
      ];

    return (
      <div
        role="status"
        lang={
          locale
        }
        dir={
          locale === "fa"
            ? "rtl"
            : "ltr"
        }
        className="
          mx-auto
          max-w-[920px]
          rounded-[28px]
          border
          border-[#2d2925]/10
          bg-[#f7f3ed]
          px-6
          py-14
          text-center
          sm:px-10
          sm:py-16
        "
      >
        <h2
          className={`
            text-[#211f1c]
            ${
              locale === "fa"
                ? "font-sans text-[1.55rem] font-[650] leading-[1.8]"
                : "font-serif text-[2rem] font-semibold leading-tight"
            }
          `}
        >
          {
            message.title
          }
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
          {
            message.description
          }
        </p>
      </div>
    );
  }

  const localizedContent =
    localizePersianHeadings(
      normalizedContent,
      locale,
    );

  const sections =
    splitMarkdownIntoSections(
      localizedContent,
    );

  if (
    !sections.length
  ) {
    return (
      <MarkdownRenderer
        content={
          localizedContent
        }
        locale={
          locale
        }
      />
    );
  }

  const titledSections =
    sections
      .map(
        (
          section,
          index,
        ) => ({
          ...section,

          index,

          visibleTitle:
            getVisibleTitle(
              section.title,
              locale,
            ),

          sectionId:
            createSectionId(
              section.title,
              index,
            ),
        }),
      )
      .filter(
        (
          section,
        ) =>
          Boolean(
            section.title,
          ),
      );

  return (
    <div
      lang={
        locale
      }
      dir={
        locale === "fa"
          ? "rtl"
          : "ltr"
      }
      className="
        min-w-0
      "
    >
      {locale === "fa" &&
      titledSections.length >
        2 ? (
        <aside
          aria-label="نقشه مطالعه مقاله"
          className="
            mx-auto
            mb-12
            max-w-[940px]
            overflow-hidden
            rounded-[30px]
            border
            border-[#183655]/14
            bg-[#183655]
            px-6
            py-7
            text-white
            shadow-[0_20px_50px_rgba(24,54,85,0.12)]
            sm:px-8
            sm:py-8
          "
        >
          <div
            className="
              flex
              flex-col
              gap-3
              border-b
              border-white/15
              pb-6
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >
            <div>
              <p
                className="
                  font-sans
                  text-[11px]
                  font-semibold
                  leading-6
                  text-[#d3b47a]
                "
              >
                مسیر مطالعه
              </p>

              <h2
                className="
                  mt-2
                  font-sans
                  text-[clamp(1.45rem,2.5vw,2.1rem)]
                  font-[650]
                  leading-[1.75]
                  text-white
                "
              >
                ساختار این پرونده
                پژوهشی
              </h2>
            </div>

            <span
              className="
                font-sans
                text-[12px]
                leading-6
                text-white/60
              "
            >
              {
                formatSectionNumber(
                  titledSections.length -
                    1,
                  locale,
                )
              }{" "}
              بخش تحلیلی
            </span>
          </div>

          <div
            className="
              mt-6
              grid
              gap-3
              sm:grid-cols-2
            "
          >
            {titledSections
              .slice(
                0,
                8,
              )
              .map(
                (
                  section,
                  mapIndex,
                ) => (
                  <a
                    key={
                      section.sectionId
                    }
                    href={`#${section.sectionId}`}
                    className="
                      group
                      flex
                      min-h-[64px]
                      items-center
                      gap-4
                      rounded-[18px]
                      border
                      border-white/12
                      bg-white/[0.06]
                      px-4
                      py-3
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:border-white/25
                      hover:bg-white/[0.1]
                      focus-visible:outline-none
                      focus-visible:ring-4
                      focus-visible:ring-white/10
                    "
                  >
                    <span
                      className="
                        inline-flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-white/10
                        font-sans
                        text-[11px]
                        font-semibold
                        text-[#d3b47a]
                      "
                    >
                      {formatSectionNumber(
                        mapIndex,
                        locale,
                      )}
                    </span>

                    <span
                      className="
                        line-clamp-2
                        font-sans
                        text-[13px]
                        font-semibold
                        leading-7
                        text-white/88
                        transition-colors
                        group-hover:text-white
                      "
                    >
                      {
                        section.visibleTitle
                      }
                    </span>
                  </a>
                ),
              )}
          </div>
        </aside>
      ) : null}

      <div
        className="
          space-y-10
          sm:space-y-12
        "
      >
        {sections.map(
          (
            section,
            index,
          ) => {
            const visibleTitle =
              getVisibleTitle(
                section.title,
                locale,
              );

            const sectionId =
              createSectionId(
                section.title,
                index,
              );

            const localizedSectionContent =
              localizePersianHeadings(
                section.content,
                locale,
              );

            if (
              !section.title
            ) {
              return (
                <section
                  key={`research-introduction-${index}`}
                  className="
                    mx-auto
                    max-w-[940px]
                    overflow-hidden
                    rounded-[30px]
                    border
                    border-[#2d2925]/10
                    bg-[#fbf9f5]
                    px-6
                    py-8
                    shadow-[0_16px_44px_rgba(40,35,30,0.045)]
                    sm:px-8
                    sm:py-10
                    md:px-10
                  "
                >
                  <div
                    className="
                      mb-6
                      flex
                      items-center
                      gap-4
                    "
                  >
                    <span
                      aria-hidden="true"
                      className="
                        h-px
                        w-14
                        bg-[#b4853b]
                      "
                    />

                    <span
                      className="
                        font-sans
                        text-[11px]
                        font-semibold
                        leading-6
                        text-[#8a672f]
                      "
                    >
                      مقدمه پرونده
                    </span>
                  </div>

                  <MarkdownRenderer
                    content={
                      localizedSectionContent
                    }
                    locale={
                      locale
                    }
                  />
                </section>
              );
            }

            const cardConfig =
              getCardConfig(
                section.title,
                locale,
              );

            if (
              cardConfig
            ) {
              return (
                <div
                  id={
                    sectionId
                  }
                  key={
                    sectionId
                  }
                  className="
                    scroll-mt-28
                  "
                >
                  <InsightCard
                    title={
                      visibleTitle
                    }
                    variant={
                      cardConfig.variant
                    }
                    label={
                      cardConfig.label
                    }
                  >
                    {localizedSectionContent ? (
                      <MarkdownRenderer
                        content={
                          localizedSectionContent
                        }
                        locale={
                          locale
                        }
                      />
                    ) : null}
                  </InsightCard>
                </div>
              );
            }

            const tone =
              editorialTones[
                index %
                  editorialTones.length
              ];

            const headingId =
              `${sectionId}-heading`;

            return (
              <section
                id={
                  sectionId
                }
                key={
                  sectionId
                }
                aria-labelledby={
                  headingId
                }
                className={`
                  relative
                  mx-auto
                  max-w-[940px]
                  scroll-mt-28
                  overflow-hidden
                  rounded-[30px]
                  border
                  px-6
                  py-8
                  shadow-[0_18px_50px_rgba(40,35,30,0.045)]
                  sm:px-8
                  sm:py-10
                  md:px-10
                  md:py-11
                  ${tone.container}
                `}
              >
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    -end-20
                    -top-24
                    h-60
                    w-60
                    rounded-full
                    bg-white/55
                    blur-3xl
                  "
                />

                <div
                  className="
                    relative
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-4
                    "
                  >
                    <span
                      className={`
                        font-sans
                        text-[12px]
                        font-semibold
                        ${tone.number}
                      `}
                    >
                      {formatSectionNumber(
                        index,
                        locale,
                      )}
                    </span>

                    <span
                      aria-hidden="true"
                      className={`
                        h-px
                        w-12
                        ${tone.line}
                      `}
                    />

                    <span
                      className="
                        font-sans
                        text-[11px]
                        font-semibold
                        leading-6
                        text-[#756d63]
                      "
                    >
                      بخش پژوهش
                    </span>
                  </div>

                  <h2
                    id={
                      headingId
                    }
                    className="
                      mt-5
                      max-w-[790px]
                      font-sans
                      text-[clamp(1.45rem,2.4vw,2.05rem)]
                      font-[650]
                      leading-[1.78]
                      tracking-normal
                      text-[#171512]
                    "
                  >
                    {
                      visibleTitle
                    }
                  </h2>

                  <div
                    className="
                      mt-7
                      border-t
                      border-[#2d2925]/10
                      pt-7
                    "
                  >
                    <MarkdownRenderer
                      content={
                        localizedSectionContent
                      }
                      locale={
                        locale
                      }
                    />
                  </div>
                </div>
              </section>
            );
          },
        )}
      </div>
    </div>
  );
}