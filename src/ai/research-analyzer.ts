import type { ResearchArticle } from "@/types/research";

export interface ResearchAnalysisInput {
  title: string;
  source: string;
  category: string;
  content: string;
}

export interface ResearchInsights {
  researchQuestion: string;

  methodology: string;

  mainFindings: string[];

  scientificContribution: string;

  consumerBehaviorInsights: string[];

  businessImplications: string[];
}

type MarkdownHeadingBlock = {
  level: number;
  title: string;
  content: string;
};

const researchQuestionAliases = [
  "سؤال اصلی پژوهش",
  "سوال اصلی پژوهش",
  "سؤال پژوهش",
  "سوال پژوهش",
  "پرسش پژوهش",
  "مسئله اصلی پژوهش",
  "هدف اصلی پژوهش",
  "هدف پژوهش",
  "research question",
  "research objective",
  "study objective",
  "objective",
  "research aim",
  "study aim",
  "purpose of the study",
];

const methodologyAliases = [
  "روش‌شناسی پژوهش",
  "روش شناسی پژوهش",
  "روش‌شناسی",
  "روش شناسی",
  "روش پژوهش",
  "طراحی پژوهش",
  "روش مطالعه",
  "methodology",
  "research methodology",
  "research method",
  "study method",
  "study design",
  "methods",
];

const findingsAliases = [
  "یافته‌های اصلی",
  "یافته های اصلی",
  "یافته‌های کلیدی",
  "یافته های کلیدی",
  "نتایج اصلی",
  "نتایج پژوهش",
  "نتایج مطالعه",
  "جمع‌بندی یافته‌ها",
  "جمع بندی یافته ها",
  "main findings",
  "key findings",
  "research findings",
  "study findings",
  "results",
  "main results",
  "conclusion",
  "conclusions",
];

const scientificContributionAliases = [
  "دستاورد علمی پژوهش",
  "سهم علمی پژوهش",
  "مشارکت علمی پژوهش",
  "نوآوری پژوهش",
  "ارزش علمی پژوهش",
  "scientific contribution",
  "research contribution",
  "academic contribution",
  "theoretical contribution",
  "contribution",
];

const consumerPsychologyAliases = [
  "تحلیل روان‌شناسی مصرف‌کننده",
  "تحلیل روانشناسی مصرف‌کننده",
  "تحلیل روان شناسی مصرف کننده",
  "بینش‌های رفتاری",
  "بینش های رفتاری",
  "رفتار مصرف‌کننده",
  "رفتار مصرف کننده",
  "consumer psychology analysis",
  "consumer psychology",
  "consumer behavior analysis",
  "consumer behaviour analysis",
  "behavioral insights",
  "behavioural insights",
];

const businessImplicationAliases = [
  "تفسیر کسب‌وکاری",
  "تفسیر کسب و کاری",
  "تحلیل کسب‌وکاری",
  "تحلیل کسب و کاری",
  "کاربردهای کسب‌وکاری",
  "کاربردهای کسب و کاری",
  "پیامدهای مدیریتی",
  "کاربرد برای کسب‌وکار",
  "کاربرد برای کسب و کار",
  "business interpretation",
  "business implications",
  "managerial implications",
  "practical implications",
  "business applications",
];

function normalizeWhitespace(
  value: string,
): string {
  return value
    .replace(/\r\n?/g, "\n")
    .replace(/\u00a0/g, " ")
    .trim();
}

function normalizeHeading(
  value: string,
): string {
  return value
    .replace(/^#{1,6}\s*/, "")
    .replace(/[*_`~]/g, "")
    .replace(/\u200c/g, " ")
    .replace(/[،,:؛;.!?؟()[\]{}]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLocaleLowerCase();
}

function stripMarkdownFormatting(
  value: string,
): string {
  return value
    .replace(
      /!\[([^\]]*)\]\([^)]+\)/g,
      "$1",
    )
    .replace(
      /\[([^\]]+)\]\([^)]+\)/g,
      "$1",
    )
    .replace(
      /^>\s?/gm,
      "",
    )
    .replace(
      /^#{1,6}\s+/gm,
      "",
    )
    .replace(
      /[*_`~]/g,
      "",
    )
    .replace(
      /<[^>]*>/g,
      "",
    )
    .replace(
      /\r\n?/g,
      "\n",
    )
    .replace(
      /[ \t]+\n/g,
      "\n",
    )
    .replace(
      /\n{3,}/g,
      "\n\n",
    )
    .trim();
}

function splitMarkdownIntoHeadingBlocks(
  markdown: string,
): MarkdownHeadingBlock[] {
  const normalizedContent =
    normalizeWhitespace(markdown);

  if (!normalizedContent) {
    return [];
  }

  const lines =
    normalizedContent.split("\n");

  const headings: Array<{
    index: number;
    level: number;
    title: string;
  }> = [];

  let isInsideCodeFence =
    false;

  for (
    let index = 0;
    index < lines.length;
    index += 1
  ) {
    const line =
      lines[index];

    const trimmedLine =
      line.trim();

    if (
      /^(```|~~~)/.test(
        trimmedLine,
      )
    ) {
      isInsideCodeFence =
        !isInsideCodeFence;

      continue;
    }

    if (isInsideCodeFence) {
      continue;
    }

    const headingMatch =
      line.match(
        /^(#{1,6})\s+(.+?)\s*$/,
      );

    if (!headingMatch) {
      continue;
    }

    headings.push({
      index,
      level:
        headingMatch[1].length,

      title:
        headingMatch[2].trim(),
    });
  }

  return headings.map(
    (
      heading,
      headingIndex,
    ) => {
      let endIndex =
        lines.length;

      for (
        let nextIndex =
          headingIndex + 1;
        nextIndex <
        headings.length;
        nextIndex += 1
      ) {
        const nextHeading =
          headings[nextIndex];

        if (
          nextHeading.level <=
          heading.level
        ) {
          endIndex =
            nextHeading.index;

          break;
        }
      }

      return {
        level:
          heading.level,

        title:
          heading.title,

        content:
          lines
            .slice(
              heading.index + 1,
              endIndex,
            )
            .join("\n")
            .trim(),
      };
    },
  );
}

function headingMatchesAlias(
  heading: string,
  alias: string,
): boolean {
  const normalizedHeading =
    normalizeHeading(heading);

  const normalizedAlias =
    normalizeHeading(alias);

  return (
    normalizedHeading ===
      normalizedAlias ||
    normalizedHeading.startsWith(
      `${normalizedAlias} `,
    ) ||
    normalizedHeading.endsWith(
      ` ${normalizedAlias}`,
    )
  );
}

function findSectionContent(
  blocks: MarkdownHeadingBlock[],
  aliases: readonly string[],
): string {
  for (
    const alias of aliases
  ) {
    const matchingBlock =
      blocks.find(
        (block) =>
          headingMatchesAlias(
            block.title,
            alias,
          ),
      );

    if (
      matchingBlock?.content
    ) {
      return stripMarkdownFormatting(
        matchingBlock.content,
      );
    }
  }

  return "";
}

function extractLabeledValue(
  content: string,
  aliases: readonly string[],
): string {
  const lines =
    normalizeWhitespace(content)
      .split("\n");

  for (
    let index = 0;
    index < lines.length;
    index += 1
  ) {
    const rawLine =
      lines[index].trim();

    if (!rawLine) {
      continue;
    }

    const line =
      rawLine
        .replace(
          /^[-*+>]\s*/,
          "",
        )
        .replace(
          /\*\*/g,
          "",
        )
        .trim();

    for (
      const alias of aliases
    ) {
      const normalizedLine =
        normalizeHeading(line);

      const normalizedAlias =
        normalizeHeading(alias);

      if (
        normalizedLine ===
        normalizedAlias
      ) {
        const nextLine =
          lines[index + 1]
            ?.trim();

        if (nextLine) {
          return stripMarkdownFormatting(
            nextLine,
          );
        }
      }

      const labelPattern =
        new RegExp(
          `^${escapeRegExp(
            alias,
          )}\\s*[:：]\\s*(.+)$`,
          "i",
        );

      const match =
        line.match(
          labelPattern,
        );

      if (
        match?.[1]?.trim()
      ) {
        return stripMarkdownFormatting(
          match[1],
        );
      }
    }
  }

  return "";
}

function escapeRegExp(
  value: string,
): string {
  return value.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&",
  );
}

function extractListItems(
  value: string,
): string[] {
  const items: string[] =
    [];

  const lines =
    normalizeWhitespace(value)
      .split("\n");

  for (
    const line of lines
  ) {
    const listMatch =
      line.match(
        /^\s*(?:[-*+]|\d+[.)]|[۰-۹]+[.)])\s+(.+?)\s*$/,
      );

    if (!listMatch) {
      continue;
    }

    const cleanedItem =
      stripMarkdownFormatting(
        listMatch[1],
      );

    if (cleanedItem) {
      items.push(
        cleanedItem,
      );
    }
  }

  return deduplicateItems(
    items,
  );
}

function extractParagraphItems(
  value: string,
): string[] {
  const paragraphs =
    stripMarkdownFormatting(
      value,
    )
      .split(/\n{2,}/)
      .map(
        (paragraph) =>
          paragraph
            .replace(
              /\s+/g,
              " ",
            )
            .trim(),
      )
      .filter(Boolean);

  return deduplicateItems(
    paragraphs,
  );
}

function deduplicateItems(
  items: readonly string[],
): string[] {
  const seenItems =
    new Set<string>();

  const uniqueItems:
    string[] = [];

  for (
    const item of items
  ) {
    const normalizedItem =
      item
        .replace(/\u200c/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    const comparisonKey =
      normalizedItem
        .toLocaleLowerCase();

    if (
      !normalizedItem ||
      seenItems.has(
        comparisonKey,
      )
    ) {
      continue;
    }

    seenItems.add(
      comparisonKey,
    );

    uniqueItems.push(
      normalizedItem,
    );
  }

  return uniqueItems.slice(
    0,
    12,
  );
}

function extractSectionItems(
  blocks: MarkdownHeadingBlock[],
  aliases: readonly string[],
): string[] {
  const sectionContent =
    findSectionContent(
      blocks,
      aliases,
    );

  if (!sectionContent) {
    return [];
  }

  const listItems =
    extractListItems(
      sectionContent,
    );

  if (
    listItems.length > 0
  ) {
    return listItems;
  }

  return extractParagraphItems(
    sectionContent,
  );
}

function extractResearchQuestion(
  content: string,
  blocks: MarkdownHeadingBlock[],
): string {
  return (
    findSectionContent(
      blocks,
      researchQuestionAliases,
    ) ||
    extractLabeledValue(
      content,
      researchQuestionAliases,
    )
  );
}

function extractMethodology(
  content: string,
  blocks: MarkdownHeadingBlock[],
): string {
  return (
    findSectionContent(
      blocks,
      methodologyAliases,
    ) ||
    extractLabeledValue(
      content,
      methodologyAliases,
    )
  );
}

function extractScientificContribution(
  content: string,
  blocks: MarkdownHeadingBlock[],
): string {
  return (
    findSectionContent(
      blocks,
      scientificContributionAliases,
    ) ||
    extractLabeledValue(
      content,
      scientificContributionAliases,
    )
  );
}

export function analyzeResearch(
  research: ResearchArticle,
): ResearchInsights {
  const content =
    normalizeWhitespace(
      research.content || "",
    );

  if (!content) {
    return {
      researchQuestion:
        "",

      methodology:
        "",

      mainFindings:
        [],

      scientificContribution:
        "",

      consumerBehaviorInsights:
        [],

      businessImplications:
        [],
    };
  }

  const headingBlocks =
    splitMarkdownIntoHeadingBlocks(
      content,
    );

  return {
    researchQuestion:
      extractResearchQuestion(
        content,
        headingBlocks,
      ),

    methodology:
      extractMethodology(
        content,
        headingBlocks,
      ),

    mainFindings:
      extractSectionItems(
        headingBlocks,
        findingsAliases,
      ),

    scientificContribution:
      extractScientificContribution(
        content,
        headingBlocks,
      ),

    consumerBehaviorInsights:
      extractSectionItems(
        headingBlocks,
        consumerPsychologyAliases,
      ),

    businessImplications:
      extractSectionItems(
        headingBlocks,
        businessImplicationAliases,
      ),
  };
}