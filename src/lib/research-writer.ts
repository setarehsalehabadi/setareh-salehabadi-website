import "server-only";

import matter from "gray-matter";

import {
  saveResearchMarkdown as persistResearchMarkdown,
} from "@/lib/research-file-manager";

import type {
  ResearchRecord,
} from "@/types/research-intake";

type ResearchMarkdownResult = {
  slug: string;
  content: string;
};

type ResearchFrontmatter = {
  title: string;
  slug: string;
  research_id: string;
  category: string;
  status: string;

  description?: string;
  source?: string;
  date?: string;
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
    value
      .replace(/\r\n?/g, "\n")
      .trim();

  return (
    normalizedValue ||
    undefined
  );
}

function normalizeDate(
  value: unknown,
): string | undefined {
  if (!value) {
    return undefined;
  }

  if (
    value instanceof Date
  ) {
    if (
      Number.isNaN(
        value.getTime(),
      )
    ) {
      throw new Error(
        "Research publication date is invalid.",
      );
    }

    return value
      .toISOString()
      .slice(0, 10);
  }

  if (
    typeof value !== "string"
  ) {
    return undefined;
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
      `Research publication date is invalid: ${normalizedValue}`,
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

function normalizeListItems(
  value: unknown,
): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const seenItems =
    new Set<string>();

  const normalizedItems:
    string[] = [];

  for (const item of value) {
    if (
      typeof item !== "string"
    ) {
      continue;
    }

    const normalizedItem =
      item
        .replace(
          /^\s*(?:[-*+]|\d+[.)]|[۰-۹]+[.)])\s*/,
          "",
        )
        .replace(/\s+/g, " ")
        .trim();

    if (!normalizedItem) {
      continue;
    }

    const comparisonKey =
      normalizedItem
        .toLocaleLowerCase();

    if (
      seenItems.has(
        comparisonKey,
      )
    ) {
      continue;
    }

    seenItems.add(
      comparisonKey,
    );

    normalizedItems.push(
      normalizedItem,
    );
  }

  return normalizedItems;
}

function createTextSection(
  title: string,
  value: unknown,
): string {
  const normalizedValue =
    normalizeOptionalText(
      value,
    );

  if (!normalizedValue) {
    return "";
  }

  return [
    `## ${title}`,
    "",
    normalizedValue,
  ].join("\n");
}

function createListSection(
  title: string,
  value: unknown,
): string {
  const items =
    normalizeListItems(
      value,
    );

  if (
    items.length === 0
  ) {
    return "";
  }

  return [
    `## ${title}`,
    "",
    ...items.map(
      (item) =>
        `- ${item}`,
    ),
  ].join("\n");
}

function createPendingSection(): string {
  return [
    "## وضعیت پرونده",
    "",
    "این پرونده پژوهشی ایجاد شده است، اما محتوای تحلیلی آن هنوز تکمیل و بازبینی نشده است.",
  ].join("\n");
}

function createMarkdownBody(
  research: ResearchRecord,
): string {
  const sections = [
    createTextSection(
      "خلاصه اولیه",
      research.abstract,
    ),

    createListSection(
      "یافته‌های کلیدی ثبت‌شده",
      research.keyFindings,
    ),

    createTextSection(
      "روش‌شناسی گزارش‌شده",
      research.methodology,
    ),

    createTextSection(
      "محدودیت‌های گزارش‌شده",
      research.limitations,
    ),
  ].filter(Boolean);

  if (
    sections.length === 0
  ) {
    return createPendingSection();
  }

  return sections
    .join("\n\n")
    .trim();
}

function createFrontmatter(
  research: ResearchRecord,
  slug: string,
): ResearchFrontmatter {
  const title =
    normalizeRequiredText(
      research.title,
      "title",
    );

  const researchId =
    normalizeRequiredText(
      research.researchId,
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

  const description =
    normalizeOptionalText(
      research.abstract,
    );

  const source =
    normalizeOptionalText(
      research.source,
    );

  const date =
    normalizeDate(
      research.publicationDate,
    );

  return {
    title,

    slug,

    research_id:
      researchId,

    category,

    status,

    ...(description
      ? {
          description,
        }
      : {}),

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
  };
}

export function createResearchMarkdown(
  research: ResearchRecord,
): ResearchMarkdownResult {
  const title =
    normalizeRequiredText(
      research.title,
      "title",
    );

  const slug =
    createSlug(title);

  if (!slug) {
    throw new Error(
      "A valid research slug could not be generated.",
    );
  }

  const frontmatter =
    createFrontmatter(
      research,
      slug,
    );

  const markdownBody =
    createMarkdownBody(
      research,
    );

  const content =
    matter
      .stringify(
        markdownBody,
        frontmatter,
      )
      .trimEnd()
      .concat("\n");

  return {
    slug,
    content,
  };
}

export function saveResearchMarkdown(
  research: ResearchRecord,
): string {
  const {
    slug,
    content,
  } = createResearchMarkdown(
    research,
  );

  return persistResearchMarkdown(
    slug,
    content,
  );
}