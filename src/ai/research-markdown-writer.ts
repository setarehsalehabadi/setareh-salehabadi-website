import "server-only";

import matter from "gray-matter";

import type { ResearchDocument } from "./research-writer";

export type ResearchMarkdownInput = {
  title: string;

  researchId?: string;
  research_id?: string;

  category?: string;
  status?: string;

  source?: string;

  date?: string | Date;

  slug?: string;

  readingTime?: string;
  reading_time?: string;

  description?: string;
  excerpt?: string;
};

type ResearchFrontmatter = {
  title: string;
  research_id: string;
  category: string;
  status: string;
  slug: string;

  source?: string;
  date?: string;
  readingTime?: string;
  description?: string;
  excerpt?: string;
};

function normalizeRequiredText(
  value: unknown,
  fieldName: string,
): string {
  if (
    typeof value !== "string" ||
    !value.trim()
  ) {
    throw new Error(
      `Missing required research field: ${fieldName}`,
    );
  }

  return value.trim();
}

function normalizeOptionalText(
  value: unknown,
): string | undefined {
  if (
    typeof value !== "string"
  ) {
    return undefined;
  }

  const normalizedValue =
    value.trim();

  return normalizedValue ||
    undefined;
}

function normalizeDate(
  value?: string | Date,
): string | undefined {
  if (!value) {
    return undefined;
  }

  if (value instanceof Date) {
    if (
      Number.isNaN(
        value.getTime(),
      )
    ) {
      throw new Error(
        "Invalid research date.",
      );
    }

    return value
      .toISOString()
      .slice(0, 10);
  }

  const normalizedValue =
    value.trim();

  if (!normalizedValue) {
    return undefined;
  }

  const isoDateMatch =
    normalizedValue.match(
      /^(\d{4}-\d{2}-\d{2})(?:T.*)?$/,
    );

  if (isoDateMatch) {
    return isoDateMatch[1];
  }

  const parsedDate =
    new Date(
      normalizedValue,
    );

  if (
    Number.isNaN(
      parsedDate.getTime(),
    )
  ) {
    throw new Error(
      `Invalid research date: ${normalizedValue}`,
    );
  }

  return parsedDate
    .toISOString()
    .slice(0, 10);
}

function createSlug(
  value: string,
): string {
  return value
    .normalize("NFKC")
    .trim()
    .toLocaleLowerCase()
    .replace(
      /['’"`]/g,
      "",
    )
    .replace(
      /[^\p{L}\p{N}]+/gu,
      "-",
    )
    .replace(
      /^-+|-+$/g,
      "",
    );
}

function normalizeSlug(
  providedSlug: string | undefined,
  title: string,
): string {
  const slug =
    createSlug(
      providedSlug ||
        title,
    );

  if (!slug) {
    throw new Error(
      "A valid research slug could not be generated.",
    );
  }

  return slug;
}

function removeLeadingSectionHeading(
  value: string,
): string {
  const lines =
    value
      .replace(/\r\n?/g, "\n")
      .trim()
      .split("\n");

  while (
    lines.length > 0 &&
    !lines[0].trim()
  ) {
    lines.shift();
  }

  if (
    lines[0]?.trim().match(
      /^#{1,6}\s+.+$/,
    )
  ) {
    lines.shift();
  }

  while (
    lines.length > 0 &&
    !lines[0].trim()
  ) {
    lines.shift();
  }

  return lines
    .join("\n")
    .trim();
}

function createMarkdownSection(
  title: string,
  value?: string,
): string {
  const normalizedValue =
    normalizeOptionalText(
      value,
    );

  if (!normalizedValue) {
    return "";
  }

  const sectionBody =
    removeLeadingSectionHeading(
      normalizedValue,
    );

  if (!sectionBody) {
    return "";
  }

  return [
    `## ${title}`,
    "",
    sectionBody,
  ].join("\n");
}

function normalizeChecklistItem(
  value: string,
): string {
  return value
    .replace(
      /^\s*(?:[-*+]|\d+[.)]|[۰-۹]+[.)])\s*/,
      "",
    )
    .replace(/\s+/g, " ")
    .trim();
}

function createChecklistSection(
  items: readonly string[],
): string {
  const seenItems =
    new Set<string>();

  const normalizedItems =
    items
      .map(
        normalizeChecklistItem,
      )
      .filter(
        (item) => {
          if (!item) {
            return false;
          }

          const comparisonKey =
            item.toLocaleLowerCase();

          if (
            seenItems.has(
              comparisonKey,
            )
          ) {
            return false;
          }

          seenItems.add(
            comparisonKey,
          );

          return true;
        },
      );

  if (
    normalizedItems.length ===
    0
  ) {
    return "";
  }

  return [
    "## چک‌لیست اقدام",
    "",
    ...normalizedItems.map(
      (item) =>
        `- ${item}`,
    ),
  ].join("\n");
}

function createExecutiveSummary(
  research: ResearchMarkdownInput,
): string {
  const summary =
    normalizeOptionalText(
      research.description,
    ) ||
    normalizeOptionalText(
      research.excerpt,
    );

  if (!summary) {
    return "";
  }

  return [
    "## خلاصه اجرایی",
    "",
    summary,
  ].join("\n");
}

function createResearchBody(
  research: ResearchMarkdownInput,
  analysis: ResearchDocument,
): string {
  const sections = [
    createExecutiveSummary(
      research,
    ),

    createMarkdownSection(
      "خلاصه علمی پژوهش",
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
      "چارچوب استراتژیک",
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
      "دیدگاه من",
      analysis
        .دیدگاه_من,
    ),
  ]
    .filter(Boolean)
    .join("\n\n")
    .trim();

  if (!sections) {
    throw new Error(
      "Research Markdown content is empty.",
    );
  }

  return sections;
}

function createFrontmatter(
  research: ResearchMarkdownInput,
): ResearchFrontmatter {
  const title =
    normalizeRequiredText(
      research.title,
      "title",
    );

  const researchId =
    normalizeRequiredText(
      research.researchId ||
        research.research_id,
      "research_id",
    );

  const category =
    normalizeRequiredText(
      research.category,
      "category",
    );

  const status =
    normalizeRequiredText(
      research.status,
      "status",
    );

  const source =
    normalizeOptionalText(
      research.source,
    );

  const date =
    normalizeDate(
      research.date,
    );

  const readingTime =
    normalizeOptionalText(
      research.readingTime,
    ) ||
    normalizeOptionalText(
      research.reading_time,
    );

  const description =
    normalizeOptionalText(
      research.description,
    );

  const excerpt =
    normalizeOptionalText(
      research.excerpt,
    );

  return {
    title,

    research_id:
      researchId,

    category,

    status,

    slug:
      normalizeSlug(
        research.slug,
        title,
      ),

    ...(source
      ? {
          source,
        }
      : {}),

    ...(date
      ? {
          date,
        }
      : {}),

    ...(readingTime
      ? {
          readingTime,
        }
      : {}),

    ...(description
      ? {
          description,
        }
      : {}),

    ...(excerpt
      ? {
          excerpt,
        }
      : {}),
  };
}

export function generateResearchMarkdown(
  research: ResearchMarkdownInput,
  analysis: ResearchDocument,
): string {
  const frontmatter =
    createFrontmatter(
      research,
    );

  const markdownBody =
    createResearchBody(
      research,
      analysis,
    );

  return matter
    .stringify(
      markdownBody,
      frontmatter,
    )
    .trimEnd()
    .concat("\n");
}