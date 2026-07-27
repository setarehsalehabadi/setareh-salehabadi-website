import type {
  GeneratedLinkedInPost,
  LinkedInTemplateName,
} from "@/types/linkedin";

type ResearchInput = {
  title: string;
  description?: string;
  category?: string;
  summary?: string;
  content?: string;
  url?: string;
};

type ContentLanguage =
  | "fa"
  | "en";

type NormalizedResearch = {
  title: string;
  category: string;
  summary: string;
  url: string;
  language: ContentLanguage;
};

const MAX_SUMMARY_LENGTH =
  520;

function normalizeText(
  value: unknown,
): string {
  if (
    typeof value !== "string"
  ) {
    return "";
  }

  return value
    .replace(/\r\n?/g, "\n")
    .replace(/\u0000/g, "")
    .trim();
}

function stripMarkdown(
  value: string,
): string {
  return value
    .replace(
      /^---\s*\n[\s\S]*?\n---\s*/i,
      "",
    )
    .replace(
      /```[\s\S]*?```/g,
      "",
    )
    .replace(
      /!\[[^\]]*]\([^)]*\)/g,
      "",
    )
    .replace(
      /\[([^\]]+)]\([^)]*\)/g,
      "$1",
    )
    .replace(
      /^#{1,6}\s+/gm,
      "",
    )
    .replace(
      /^\s*(?:[-*+]|\d+[.)]|[۰-۹]+[.)])\s+/gm,
      "",
    )
    .replace(
      /[*_~>`]/g,
      "",
    )
    .replace(
      /[ \t]+/g,
      " ",
    )
    .replace(
      /\n{3,}/g,
      "\n\n",
    )
    .trim();
}

function truncateText(
  value: string,
  maximumLength: number,
): string {
  if (
    value.length <=
    maximumLength
  ) {
    return value;
  }

  const shortened =
    value.slice(
      0,
      maximumLength,
    );

  const lastSentenceEnd =
    Math.max(
      shortened.lastIndexOf("."),
      shortened.lastIndexOf("!"),
      shortened.lastIndexOf("?"),
      shortened.lastIndexOf("؟"),
    );

  if (
    lastSentenceEnd >=
    Math.floor(
      maximumLength * 0.6,
    )
  ) {
    return shortened
      .slice(
        0,
        lastSentenceEnd + 1,
      )
      .trim();
  }

  const lastSpace =
    shortened.lastIndexOf(" ");

  if (
    lastSpace >=
    Math.floor(
      maximumLength * 0.7,
    )
  ) {
    return `${shortened
      .slice(
        0,
        lastSpace,
      )
      .trim()}…`;
  }

  return `${shortened.trim()}…`;
}

function extractSummary(
  research: ResearchInput,
): string {
  const candidates = [
    research.summary,
    research.description,
  ];

  for (
    const candidate of
    candidates
  ) {
    const normalizedCandidate =
      normalizeText(
        candidate,
      );

    if (
      normalizedCandidate
    ) {
      return truncateText(
        stripMarkdown(
          normalizedCandidate,
        ),
        MAX_SUMMARY_LENGTH,
      );
    }
  }

  const content =
    normalizeText(
      research.content,
    );

  if (!content) {
    return "";
  }

  const cleanedContent =
    stripMarkdown(
      content,
    );

  const firstUsefulParagraph =
    cleanedContent
      .split(/\n{2,}/)
      .map(
        (paragraph) =>
          paragraph.trim(),
      )
      .find(
        (paragraph) =>
          paragraph.length >=
          40,
      ) ||
    cleanedContent;

  return truncateText(
    firstUsefulParagraph,
    MAX_SUMMARY_LENGTH,
  );
}

function containsPersianText(
  value: string,
): boolean {
  return /[\u0600-\u06FF]/u.test(
    value,
  );
}

function detectLanguage(
  research: ResearchInput,
  summary: string,
): ContentLanguage {
  /*
   * برای تشخیص زبان، متن اصلی مقاله و خلاصه
   * نسبت به عنوان و دسته‌بندی اولویت دارند.
   *
   * بنابراین مقاله‌ای با عنوان انگلیسی و متن فارسی،
   * خروجی فارسی دریافت می‌کند.
   */
  const primaryContent = [
    summary,
    normalizeText(
      research.description,
    ),
    normalizeText(
      research.content,
    ),
  ].join(" ");

  if (
    containsPersianText(
      primaryContent,
    )
  ) {
    return "fa";
  }

  const secondaryContent = [
    normalizeText(
      research.title,
    ),
    normalizeText(
      research.category,
    ),
  ].join(" ");

  return containsPersianText(
    secondaryContent,
  )
    ? "fa"
    : "en";
}

function translateKnownCategoryToPersian(
  value: string,
): string {
  const normalizedCategory =
    value
      .toLocaleLowerCase()
      .replace(/\s+/g, " ")
      .trim();

  const exactCategories:
    Record<string, string> = {
    ai: "هوش مصنوعی",

    "artificial intelligence":
      "هوش مصنوعی",

    seo:
      "سئو و رشد ارگانیک",

    "digital marketing":
      "بازاریابی دیجیتال",

    "consumer psychology":
      "روان‌شناسی مصرف‌کننده",

    "consumer behavior":
      "رفتار مصرف‌کننده",

    "business growth":
      "رشد کسب‌وکار",

    "marketing science":
      "علم بازاریابی",

    "customer experience":
      "تجربه مشتری",

    "data analytics":
      "تحلیل داده",

    "ai & consumer psychology":
      "هوش مصنوعی و روان‌شناسی مصرف‌کننده",

    "ai and consumer psychology":
      "هوش مصنوعی و روان‌شناسی مصرف‌کننده",

    "digital growth":
      "رشد دیجیتال",
  };

  return (
    exactCategories[
      normalizedCategory
    ] ||
    value
  );
}

function normalizeCategory(
  value: unknown,
  language: ContentLanguage,
): string {
  const category =
    normalizeText(value);

  if (!category) {
    return language === "fa"
      ? "رشد دیجیتال"
      : "digital growth";
  }

  if (
    language === "fa" &&
    !containsPersianText(
      category,
    )
  ) {
    return translateKnownCategoryToPersian(
      category,
    );
  }

  return category;
}

function normalizeUrl(
  value: unknown,
): string {
  const url =
    normalizeText(value);

  if (!url) {
    return "";
  }

  try {
    const parsedUrl =
      new URL(url);

    if (
      parsedUrl.protocol !==
        "https:" &&
      parsedUrl.protocol !==
        "http:"
    ) {
      return "";
    }

    return parsedUrl.toString();
  } catch {
    return "";
  }
}

function createHashtags(
  category: string,
): string[] {
  const normalizedCategory =
    category
      .toLocaleLowerCase()
      .replace(/\u200c/g, " ");

  const hashtags =
    new Set<string>([
      "#ResearchInsights",
      "#DigitalStrategy",
    ]);

  if (
    normalizedCategory.includes(
      "ai",
    ) ||
    normalizedCategory.includes(
      "artificial intelligence",
    ) ||
    normalizedCategory.includes(
      "هوش مصنوعی",
    )
  ) {
    hashtags.add("#AI");
  }

  if (
    normalizedCategory.includes(
      "seo",
    ) ||
    normalizedCategory.includes(
      "سئو",
    )
  ) {
    hashtags.add("#SEO");
  }

  if (
    normalizedCategory.includes(
      "consumer",
    ) ||
    normalizedCategory.includes(
      "psychology",
    ) ||
    normalizedCategory.includes(
      "behavior",
    ) ||
    normalizedCategory.includes(
      "مصرف کننده",
    ) ||
    normalizedCategory.includes(
      "روان شناسی",
    ) ||
    normalizedCategory.includes(
      "رفتار",
    )
  ) {
    hashtags.add(
      "#ConsumerPsychology",
    );
  }

  if (
    normalizedCategory.includes(
      "marketing",
    ) ||
    normalizedCategory.includes(
      "بازاریابی",
    )
  ) {
    hashtags.add(
      "#MarketingStrategy",
    );
  }

  if (
    normalizedCategory.includes(
      "growth",
    ) ||
    normalizedCategory.includes(
      "business",
    ) ||
    normalizedCategory.includes(
      "رشد",
    ) ||
    normalizedCategory.includes(
      "کسب و کار",
    )
  ) {
    hashtags.add(
      "#BusinessGrowth",
    );
  }

  if (
    normalizedCategory.includes(
      "data",
    ) ||
    normalizedCategory.includes(
      "analytics",
    ) ||
    normalizedCategory.includes(
      "داده",
    )
  ) {
    hashtags.add(
      "#DataAnalytics",
    );
  }

  return Array.from(
    hashtags,
  ).slice(0, 5);
}

function appendHashtags(
  content: string,
  hashtags: string[],
): string {
  if (
    hashtags.length === 0
  ) {
    return content.trim();
  }

  return [
    content.trim(),
    "",
    hashtags.join(" "),
  ].join("\n");
}

function normalizeResearch(
  research: ResearchInput,
): NormalizedResearch {
  const title =
    normalizeText(
      research.title,
    );

  if (!title) {
    throw new Error(
      "A research title is required to generate a LinkedIn post.",
    );
  }

  const summary =
    extractSummary(
      research,
    );

  const language =
    detectLanguage(
      research,
      summary,
    );

  return {
    title,

    summary,

    language,

    category:
      normalizeCategory(
        research.category,
        language,
      ),

    url:
      normalizeUrl(
        research.url,
      ),
  };
}

function createPersianResearchInsightPost(
  research: NormalizedResearch,
): GeneratedLinkedInPost {
  const hashtags =
    createHashtags(
      research.category,
    );

  const sections = [
    [
      "اخیراً پژوهشی را درباره این موضوع بررسی کردم:",
      research.title,
    ].join("\n"),

    research.summary
      ? [
          "آنچه منبع اصلی مطرح می‌کند:",
          research.summary,
        ].join("\n")
      : "",

    `این موضوع به‌ویژه برای حوزه ${research.category} اهمیت دارد.`,

    "در Research Lab تلاش می‌کنم یافته‌های مستقیم منبع را از تفسیر کسب‌وکاری و پیشنهادهای عملی جدا نگه دارم؛ چون هر نتیجه پژوهشی لزوماً به معنای یک اقدام قطعی برای همه کسب‌وکارها نیست.",

    research.url
      ? [
          "تحلیل کامل پژوهش:",
          research.url,
        ].join("\n")
      : "",
  ].filter(Boolean);

  return {
    title:
      research.title,

    content:
      appendHashtags(
        sections.join(
          "\n\n",
        ),
        hashtags,
      ),

    hashtags,
  };
}

function createEnglishResearchInsightPost(
  research: NormalizedResearch,
): GeneratedLinkedInPost {
  const hashtags =
    createHashtags(
      research.category,
    );

  const sections = [
    [
      "I recently reviewed research on:",
      research.title,
    ].join("\n"),

    research.summary
      ? [
          "What the source highlights:",
          research.summary,
        ].join("\n")
      : "",

    `The topic is particularly relevant to ${research.category}.`,

    "In my Research Lab, I separate the source’s direct findings from business interpretation and practical recommendations. A research result does not automatically support the same action for every business.",

    research.url
      ? [
          "Read the full analysis:",
          research.url,
        ].join("\n")
      : "",
  ].filter(Boolean);

  return {
    title:
      research.title,

    content:
      appendHashtags(
        sections.join(
          "\n\n",
        ),
        hashtags,
      ),

    hashtags,
  };
}

function createResearchInsightPost(
  research: ResearchInput,
): GeneratedLinkedInPost {
  const normalizedResearch =
    normalizeResearch(
      research,
    );

  return normalizedResearch
    .language === "fa"
    ? createPersianResearchInsightPost(
        normalizedResearch,
      )
    : createEnglishResearchInsightPost(
        normalizedResearch,
      );
}

function createPersianBusinessLessonPost(
  research: NormalizedResearch,
): GeneratedLinkedInPost {
  const hashtags =
    createHashtags(
      research.category,
    );

  const sections = [
    "وجود داده به‌تنهایی یک پژوهش را به تصمیم قابل‌استفاده برای کسب‌وکار تبدیل نمی‌کند.",

    [
      "پژوهشی که بررسی کردم:",
      research.title,
    ].join("\n"),

    research.summary
      ? [
          "آنچه منبع گزارش می‌کند:",
          research.summary,
        ].join("\n")
      : "",

    "مرحله بعدی این است که شواهد، تفسیر استراتژیک و اقدام پیشنهادی را از یکدیگر جدا کنیم.",

    `این تمایز در حوزه ${research.category} اهمیت بیشتری دارد؛ زیرا نتیجه‌گیری‌ها ممکن است به‌راحتی از محدوده شواهد اصلی فراتر بروند.`,

    research.url
      ? [
          "تحلیل کامل پژوهش:",
          research.url,
        ].join("\n")
      : "",
  ].filter(Boolean);

  return {
    title:
      research.title,

    content:
      appendHashtags(
        sections.join(
          "\n\n",
        ),
        hashtags,
      ),

    hashtags,
  };
}

function createEnglishBusinessLessonPost(
  research: NormalizedResearch,
): GeneratedLinkedInPost {
  const hashtags =
    createHashtags(
      research.category,
    );

  const sections = [
    "Research does not become useful to a business simply because it contains data.",

    [
      "The source I reviewed:",
      research.title,
    ].join("\n"),

    research.summary
      ? [
          "What the source reports:",
          research.summary,
        ].join("\n")
      : "",

    "The next step is to distinguish carefully between evidence, strategic interpretation and a proposed business action.",

    `This distinction is especially important in ${research.category}, where conclusions can easily become broader than the evidence supports.`,

    research.url
      ? [
          "Full research analysis:",
          research.url,
        ].join("\n")
      : "",
  ].filter(Boolean);

  return {
    title:
      research.title,

    content:
      appendHashtags(
        sections.join(
          "\n\n",
        ),
        hashtags,
      ),

    hashtags,
  };
}

function createBusinessLessonPost(
  research: ResearchInput,
): GeneratedLinkedInPost {
  const normalizedResearch =
    normalizeResearch(
      research,
    );

  return normalizedResearch
    .language === "fa"
    ? createPersianBusinessLessonPost(
        normalizedResearch,
      )
    : createEnglishBusinessLessonPost(
        normalizedResearch,
      );
}

function createPersianQuestionPost(
  research: NormalizedResearch,
): GeneratedLinkedInPost {
  const hashtags =
    createHashtags(
      research.category,
    );

  const sections = [
    `کسب‌وکارها چگونه می‌توانند پژوهش‌های مرتبط با ${research.category} را به تصمیم تبدیل کنند، بدون اینکه شواهد را بیش از اندازه تعمیم دهند؟`,

    [
      "این پرسش را در تحلیل پژوهش زیر بررسی کردم:",
      research.title,
    ].join("\n"),

    research.summary
      ? [
          "یکی از نکات اصلی منبع:",
          research.summary,
        ].join("\n")
      : "",

    "رویکرد من این است که سه لایه را جدا نگه دارم: یافته مستقیم، تفسیر استراتژیک و اقدام پیشنهادی.",

    "به نظر شما کسب‌وکارها بیشتر در کدام مرحله مرز میان شواهد و تفسیر را نادیده می‌گیرند؟",

    research.url
      ? [
          "تحلیل کامل پژوهش:",
          research.url,
        ].join("\n")
      : "",
  ].filter(Boolean);

  return {
    title:
      research.title,

    content:
      appendHashtags(
        sections.join(
          "\n\n",
        ),
        hashtags,
      ),

    hashtags,
  };
}

function createEnglishQuestionPost(
  research: NormalizedResearch,
): GeneratedLinkedInPost {
  const hashtags =
    createHashtags(
      research.category,
    );

  const sections = [
    `How should businesses turn research about ${research.category} into decisions without overstating the evidence?`,

    [
      "I explored this question through the following research:",
      research.title,
    ].join("\n"),

    research.summary
      ? [
          "A central point from the source:",
          research.summary,
        ].join("\n")
      : "",

    "My approach is to keep three layers separate: direct findings, strategic interpretation and recommended action.",

    "Where do you think businesses most often blur these boundaries?",

    research.url
      ? [
          "Read the full analysis:",
          research.url,
        ].join("\n")
      : "",
  ].filter(Boolean);

  return {
    title:
      research.title,

    content:
      appendHashtags(
        sections.join(
          "\n\n",
        ),
        hashtags,
      ),

    hashtags,
  };
}

function createQuestionEngagementPost(
  research: ResearchInput,
): GeneratedLinkedInPost {
  const normalizedResearch =
    normalizeResearch(
      research,
    );

  return normalizedResearch
    .language === "fa"
    ? createPersianQuestionPost(
        normalizedResearch,
      )
    : createEnglishQuestionPost(
        normalizedResearch,
      );
}

const templates: Record<
  LinkedInTemplateName,
  (
    research: ResearchInput,
  ) => GeneratedLinkedInPost
> = {
  researchInsight:
    createResearchInsightPost,

  businessLesson:
    createBusinessLessonPost,

  questionEngagement:
    createQuestionEngagementPost,
};

export function generateLinkedInPost(
  research: ResearchInput,
  template: LinkedInTemplateName =
    "researchInsight",
): GeneratedLinkedInPost {
  const selectedTemplate =
    templates[template];

  return selectedTemplate(
    research,
  );
}