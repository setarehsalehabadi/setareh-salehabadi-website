import "server-only";

import {
  promises as fs,
} from "fs";

import path from "path";

import matter from "gray-matter";

import type {
  ResearchDocument,
} from "@/ai/research-writer";

import type {
  ResearchArticle,
} from "@/types/research";

const researchDirectory =
  path.join(
    process.cwd(),
    "content/research/fa",
  );

const markdownExtension =
  ".md";

const persianCategoryMap: Readonly<
  Record<string, string>
> = {
  "ai & consumer psychology":
    "هوش مصنوعی و روان‌شناسی مصرف‌کننده",

  "ai and consumer psychology":
    "هوش مصنوعی و روان‌شناسی مصرف‌کننده",

  "consumer psychology":
    "روان‌شناسی مصرف‌کننده",

  "consumer behavior":
    "رفتار مصرف‌کننده",

  "consumer behaviour":
    "رفتار مصرف‌کننده",

  "digital marketing":
    "بازاریابی دیجیتال",

  "digital growth":
    "رشد دیجیتال",

  "business growth":
    "رشد کسب‌وکار",

  "customer experience":
    "تجربه مشتری",

  "artificial intelligence":
    "هوش مصنوعی",

  "ai":
    "هوش مصنوعی",

  "seo":
    "سئو",

  "seo & organic growth":
    "سئو و رشد ارگانیک",

  "seo and organic growth":
    "سئو و رشد ارگانیک",
};

const persianStatusMap: Readonly<
  Record<string, string>
> = {
  "approved for research library":
    "تأییدشده برای کتابخانه پژوهش",

  approved:
    "تأییدشده",

  published:
    "منتشرشده",

  draft:
    "پیش‌نویس",

  "under review":
    "در حال بررسی",

  reviewing:
    "در حال بررسی",

  archived:
    "بایگانی‌شده",
};

function getFileSlug(
  fileName: string,
): string {
  return fileName.replace(
    /\.md$/i,
    "",
  );
}

function getOptionalString(
  value: unknown,
): string | undefined {
  if (
    typeof value !==
    "string"
  ) {
    return undefined;
  }

  const normalizedValue =
    value.trim();

  return (
    normalizedValue ||
    undefined
  );
}

function getOptionalDate(
  value: unknown,
): string | undefined {
  if (
    value instanceof Date
  ) {
    if (
      Number.isNaN(
        value.getTime(),
      )
    ) {
      return undefined;
    }

    return value
      .toISOString()
      .slice(
        0,
        10,
      );
  }

  if (
    typeof value ===
    "string"
  ) {
    const normalizedValue =
      value.trim();

    return (
      normalizedValue ||
      undefined
    );
  }

  return undefined;
}

function getPersianCategory(
  value: unknown,
): string | undefined {
  const category =
    getOptionalString(
      value,
    );

  if (
    !category
  ) {
    return undefined;
  }

  const categoryKey =
    category
      .toLocaleLowerCase()
      .replace(
        /\s+/g,
        " ",
      )
      .trim();

  return (
    persianCategoryMap[
      categoryKey
    ] ||
    category
  );
}

function getPersianStatus(
  value: unknown,
): string | undefined {
  const status =
    getOptionalString(
      value,
    );

  if (
    !status
  ) {
    return undefined;
  }

  const statusKey =
    status
      .toLocaleLowerCase()
      .replace(
        /\s+/g,
        " ",
      )
      .trim();

  return (
    persianStatusMap[
      statusKey
    ] ||
    status
  );
}

function normalizeSlug(
  value: string,
  fallback: string,
): string {
  const normalizedValue =
    value
      .trim()
      .replace(
        /^\/+|\/+$/g,
        "",
      )
      .replace(
        /[\\/]+/g,
        "-",
      )
      .replace(
        /\s+/g,
        "-",
      )
      .toLocaleLowerCase();

  return (
    normalizedValue ||
    fallback
  );
}

function decodeSlug(
  slug: string,
): string {
  try {
    return decodeURIComponent(
      slug,
    );
  } catch {
    return slug;
  }
}

function getDateTimestamp(
  date?: string,
): number {
  if (
    !date
  ) {
    return 0;
  }

  const timestamp =
    new Date(
      date,
    ).getTime();

  return Number.isNaN(
    timestamp,
  )
    ? 0
    : timestamp;
}

async function ensureResearchDirectory(): Promise<void> {
  await fs.mkdir(
    researchDirectory,
    {
      recursive:
        true,
    },
  );
}

async function getMarkdownFiles(): Promise<
  string[]
> {
  await ensureResearchDirectory();

  const directoryEntries =
    await fs.readdir(
      researchDirectory,
      {
        withFileTypes:
          true,
      },
    );

  return directoryEntries
    .filter(
      (
        entry,
      ) =>
        entry.isFile() &&
        entry.name
          .toLocaleLowerCase()
          .endsWith(
            markdownExtension,
          ),
    )
    .map(
      (
        entry,
      ) =>
        entry.name,
    )
    .sort(
      (
        firstFile,
        secondFile,
      ) =>
        firstFile.localeCompare(
          secondFile,
          "en",
          {
            numeric:
              true,

            sensitivity:
              "base",
          },
        ),
    );
}

async function readResearchFile(
  fileName: string,
): Promise<ResearchArticle> {
  const filePath =
    path.join(
      researchDirectory,
      fileName,
    );

  const fileContent =
    await fs.readFile(
      filePath,
      "utf8",
    );

  let parsedFile: ReturnType<
    typeof matter
  >;

  try {
    parsedFile =
      matter(
        fileContent,
      );
  } catch (
    error
  ) {
    throw new Error(
      `Invalid frontmatter in research file: ${fileName}`,
      {
        cause:
          error,
      },
    );
  }

  const {
    data,
    content,
  } =
    parsedFile;

  const fileSlug =
    getFileSlug(
      fileName,
    );

  const title =
    getOptionalString(
      data.title,
    );

  if (
    !title
  ) {
    throw new Error(
      `Missing required "title" in research file: ${fileName}`,
    );
  }

  const frontmatterSlug =
    getOptionalString(
      data.slug,
    );

  const slug =
    normalizeSlug(
      frontmatterSlug ||
        fileSlug,
      fileSlug,
    );

  const readingTime =
    getOptionalString(
      data.readingTime,
    ) ||
    getOptionalString(
      data.reading_time,
    );

  return {
    id:
      fileSlug,

    slug,

    title,

    content:
      content.trim(),

    description:
      getOptionalString(
        data.description,
      ),

    excerpt:
      getOptionalString(
        data.excerpt,
      ),

    category:
      getPersianCategory(
        data.category,
      ),

    research_id:
      getOptionalString(
        data.research_id,
      ),

    status:
      getPersianStatus(
        data.status,
      ),

    date:
      getOptionalDate(
        data.date,
      ),

    readingTime,

    source:
      getOptionalString(
        data.source,
      ),
  };
}

function ensureUniqueSlugs(
  articles: ResearchArticle[],
): void {
  const seenSlugs =
    new Map<
      string,
      string
    >();

  for (
    const article of
      articles
  ) {
    const existingId =
      seenSlugs.get(
        article.slug,
      );

    if (
      existingId
    ) {
      throw new Error(
        `Duplicate research slug "${article.slug}" found in "${existingId}.md" and "${article.id}.md".`,
      );
    }

    seenSlugs.set(
      article.slug,
      article.id,
    );
  }
}

function getResearchSequence(
  researchId?: string,
): number {
  if (
    !researchId
  ) {
    return -1;
  }

  const match =
    researchId.match(
      /(\d+)\s*$/,
    );

  if (
    !match
  ) {
    return -1;
  }

  const sequence =
    Number.parseInt(
      match[1],
      10,
    );

  return Number.isNaN(
    sequence,
  )
    ? -1
    : sequence;
}

function sortResearchArticles(
  articles: ResearchArticle[],
): ResearchArticle[] {
  return [
    ...articles,
  ].sort(
    (
      firstArticle,
      secondArticle,
    ) => {
      const sequenceDifference =
        getResearchSequence(
          secondArticle.research_id,
        ) -
        getResearchSequence(
          firstArticle.research_id,
        );

      if (
        sequenceDifference !==
        0
      ) {
        return sequenceDifference;
      }

      const dateDifference =
        getDateTimestamp(
          secondArticle.date,
        ) -
        getDateTimestamp(
          firstArticle.date,
        );

      if (
        dateDifference !==
        0
      ) {
        return dateDifference;
      }

      return firstArticle.slug.localeCompare(
        secondArticle.slug,
        "en",
        {
          numeric:
            true,

          sensitivity:
            "base",
        },
      );
    },
  );
}

export async function getResearchArticles(): Promise<
  ResearchArticle[]
> {
  const files =
    await getMarkdownFiles();

  const articles =
    await Promise.all(
      files.map(
        (
          fileName,
        ) =>
          readResearchFile(
            fileName,
          ),
      ),
    );

  ensureUniqueSlugs(
    articles,
  );

  return sortResearchArticles(
    articles,
  );
}

export async function getResearchArticle(
  slug: string,
): Promise<ResearchArticle | null> {
  const decodedSlug =
    decodeSlug(
      slug,
    );

  const normalizedSlug =
    normalizeSlug(
      decodedSlug,
      decodedSlug,
    );

  const articles =
    await getResearchArticles();

  const article =
    articles.find(
      (
        item,
      ) =>
        item.slug ===
        normalizedSlug,
    );

  return (
    article ||
    null
  );
}

export async function getResearchById(
  researchId: string,
): Promise<ResearchArticle | null> {
  const normalizedResearchId =
    researchId
      .trim()
      .toLocaleLowerCase();

  if (
    !normalizedResearchId
  ) {
    return null;
  }

  const articles =
    await getResearchArticles();

  const article =
    articles.find(
      (
        item,
      ) =>
        item.id
          .toLocaleLowerCase() ===
          normalizedResearchId ||
        item.research_id
          ?.toLocaleLowerCase() ===
          normalizedResearchId,
    );

  return (
    article ||
    null
  );
}

function normalizeSectionBody(
  value: string,
): string {
  return value
    .replace(
      /\r\n?/g,
      "\n",
    )
    .trim()
    .replace(
      /^#{1,6}\s+[^\n]+\n+/,
      "",
    )
    .trim();
}

function createMarkdownSection(
  title: string,
  value?: string,
): string {
  if (
    !value?.trim()
  ) {
    return "";
  }

  const normalizedBody =
    normalizeSectionBody(
      value,
    );

  if (
    !normalizedBody
  ) {
    return "";
  }

  return [
    `## ${title}`,
    "",
    normalizedBody,
  ].join(
    "\n",
  );
}

function createChecklistSection(
  items: string[],
): string {
  const normalizedItems =
    items
      .map(
        (
          item,
        ) =>
          item.trim(),
      )
      .filter(
        Boolean,
      );

  if (
    normalizedItems.length ===
    0
  ) {
    return "";
  }

  return [
    "## چک‌لیست اجرایی",
    "",
    ...normalizedItems.map(
      (
        item,
      ) =>
        `- [ ] ${item}`,
    ),
  ].join(
    "\n",
  );
}

function createAnalysisMarkdown(
  analysis: ResearchDocument,
): string {
  const markdownSections = [
    createMarkdownSection(
      "خلاصه علمی",
      analysis
        .خلاصه_علمی_پژوهش,
    ),

    createMarkdownSection(
      "تحلیل روان‌شناسی مصرف‌کننده",
      analysis
        .تحلیل_روانشناسی_مصرف_کننده,
    ),

    createMarkdownSection(
      "تفسیر کسب‌وکاری",
      analysis
        .تفسیر_کسب_وکاری,
    ),

    createMarkdownSection(
      "چارچوب پیشنهادی",
      analysis
        .چارچوب_استراتژیک,
    ),

    createChecklistSection(
      Array.isArray(
        analysis
          .چک_لیست_اقدام,
      )
        ? analysis
            .چک_لیست_اقدام
        : [],
    ),

    createMarkdownSection(
      "محدودیت‌های پژوهش",
      analysis
        .محدودیت_های_پژوهش,
    ),

    createMarkdownSection(
      "برداشت من",
      analysis
        .دیدگاه_من,
    ),
  ]
    .filter(
      Boolean,
    )
    .join(
      "\n\n",
    )
    .trim();

  if (
    !markdownSections
  ) {
    throw new Error(
      "The generated research analysis is empty.",
    );
  }

  return markdownSections;
}

export async function updateResearchFile(
  researchId: string,
  analysis: ResearchDocument,
): Promise<{
  success: true;
  filePath: string;
}> {
  await ensureResearchDirectory();

  const normalizedResearchId =
    researchId.trim();

  if (
    !normalizedResearchId
  ) {
    throw new Error(
      "Research ID is required.",
    );
  }

  const files =
    await getMarkdownFiles();

  let matchedFile:
    | string
    | undefined;

  for (
    const fileName of
      files
  ) {
    const article =
      await readResearchFile(
        fileName,
      );

    if (
      article.id ===
        normalizedResearchId ||
      article.research_id ===
        normalizedResearchId
    ) {
      matchedFile =
        fileName;

      break;
    }
  }

  if (
    !matchedFile
  ) {
    throw new Error(
      `Research file not found: ${normalizedResearchId}`,
    );
  }

  const filePath =
    path.join(
      researchDirectory,
      matchedFile,
    );

  const fileContent =
    await fs.readFile(
      filePath,
      "utf8",
    );

  const parsedFile =
    matter(
      fileContent,
    );

  const updatedContent =
    createAnalysisMarkdown(
      analysis,
    );

  const updatedFile =
    matter.stringify(
      updatedContent,
      {
        ...parsedFile.data,

        category:
          getPersianCategory(
            parsedFile.data
              .category,
          ),

        status:
          "تأییدشده برای کتابخانه پژوهش",

        updatedAt:
          new Date()
            .toISOString(),
      },
    );

  await fs.writeFile(
    filePath,
    updatedFile,
    "utf8",
  );

  return {
    success:
      true,

    filePath,
  };
}