import "server-only";

import {
  randomUUID,
} from "crypto";

import {
  researchSourceTypes,
  validateResearchSource,
} from "@/lib/research-source-validator";

import type {
  ResearchSourceType,
} from "@/lib/research-source-validator";

import type {
  ResearchInput,
  ResearchRecord,
} from "@/types/research-intake";

const MAX_TITLE_LENGTH =
  300;

const MAX_SOURCE_LENGTH =
  300;

const MAX_CATEGORY_LENGTH =
  120;

const MAX_SHORT_TEXT_LENGTH =
  2_000;

const MAX_LONG_TEXT_LENGTH =
  20_000;

const MAX_FINDINGS =
  30;

function isRecord(
  value: unknown,
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function normalizeText(
  value: unknown,
  maximumLength:
    number = MAX_SHORT_TEXT_LENGTH,
): string | undefined {
  if (
    typeof value !== "string"
  ) {
    return undefined;
  }

  const normalizedValue =
    value
      .replace(/\r\n?/g, "\n")
      .replace(/\u0000/g, "")
      .trim();

  if (!normalizedValue) {
    return undefined;
  }

  if (
    normalizedValue.length >
    maximumLength
  ) {
    throw new Error(
      `Research text exceeds the maximum length of ${maximumLength} characters.`,
    );
  }

  return normalizedValue;
}

function normalizeRequiredText(
  value: unknown,
  fieldName: string,
  maximumLength: number,
): string {
  const normalizedValue =
    normalizeText(
      value,
      maximumLength,
    );

  if (!normalizedValue) {
    throw new Error(
      `Research field "${fieldName}" is required.`,
    );
  }

  return normalizedValue;
}

function normalizeSourceType(
  value: unknown,
): ResearchSourceType | undefined {
  if (
    typeof value !== "string"
  ) {
    return undefined;
  }

  if (
    researchSourceTypes.includes(
      value as ResearchSourceType,
    )
  ) {
    return value as ResearchSourceType;
  }

  return undefined;
}

function normalizeList(
  value: unknown,
): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  if (
    value.length >
    MAX_FINDINGS
  ) {
    throw new Error(
      `Research key findings cannot contain more than ${MAX_FINDINGS} items.`,
    );
  }

  const seenItems =
    new Set<string>();

  const normalizedItems:
    string[] = [];

  for (const item of value) {
    const normalizedItem =
      normalizeText(
        item,
        MAX_SHORT_TEXT_LENGTH,
      );

    if (!normalizedItem) {
      continue;
    }

    const comparisonKey =
      normalizedItem
        .replace(/\u200c/g, " ")
        .replace(/\s+/g, " ")
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

function validateOptionalString(
  value: unknown,
): boolean {
  return (
    value === undefined ||
    value === null ||
    typeof value === "string"
  );
}

function validateOptionalStringArray(
  value: unknown,
): boolean {
  return (
    value === undefined ||
    value === null ||
    (
      Array.isArray(value) &&
      value.every(
        (item) =>
          typeof item ===
          "string",
      )
    )
  );
}

function generateResearchId(): string {
  const year =
    new Date()
      .getUTCFullYear();

  const uniquePart =
    randomUUID()
      .replace(/-/g, "")
      .slice(0, 10)
      .toUpperCase();

  return `RL-${year}-${uniquePart}`;
}

export function validateResearchInput(
  input: unknown,
): input is ResearchInput {
  if (!isRecord(input)) {
    return false;
  }

  if (
    typeof input.title !==
      "string" ||
    !input.title.trim() ||
    input.title.trim().length >
      MAX_TITLE_LENGTH
  ) {
    return false;
  }

  if (
    typeof input.source !==
      "string" ||
    !input.source.trim() ||
    input.source.trim().length >
      MAX_SOURCE_LENGTH
  ) {
    return false;
  }

  if (
    typeof input.category !==
      "string" ||
    !input.category.trim() ||
    input.category.trim().length >
      MAX_CATEGORY_LENGTH
  ) {
    return false;
  }

  if (
    !validateOptionalString(
      input.sourceUrl,
    ) ||
    !validateOptionalString(
      input.doi,
    ) ||
    !validateOptionalString(
      input.publicationDate,
    ) ||
    !validateOptionalString(
      input.researchQuestion,
    ) ||
    !validateOptionalString(
      input.abstract,
    ) ||
    !validateOptionalString(
      input.methodology,
    ) ||
    !validateOptionalString(
      input.limitations,
    ) ||
    !validateOptionalStringArray(
      input.keyFindings,
    )
  ) {
    return false;
  }

  const sourceType =
    normalizeSourceType(
      input.sourceType,
    );

  if (
    input.sourceType !==
      undefined &&
    !sourceType
  ) {
    return false;
  }

  const sourceValidation =
    validateResearchSource({
      sourceName:
        input.source,

      sourceUrl:
        typeof input.sourceUrl ===
          "string"
          ? input.sourceUrl
          : undefined,

      doi:
        typeof input.doi ===
          "string"
          ? input.doi
          : undefined,

      publicationDate:
        typeof input.publicationDate ===
          "string"
          ? input.publicationDate
          : undefined,

      sourceType,
    });

  return (
    sourceValidation
      .isPublishable === true
  );
}

export function createResearchRecord(
  input: ResearchInput,
): ResearchRecord {
  if (
    !validateResearchInput(
      input,
    )
  ) {
    throw new Error(
      "Research input is incomplete, invalid or based on a non-publishable source.",
    );
  }

  const now =
    new Date()
      .toISOString();

  const title =
    normalizeRequiredText(
      input.title,
      "title",
      MAX_TITLE_LENGTH,
    );

  const source =
    normalizeRequiredText(
      input.source,
      "source",
      MAX_SOURCE_LENGTH,
    );

  const category =
    normalizeRequiredText(
      input.category,
      "category",
      MAX_CATEGORY_LENGTH,
    );

  const sourceUrl =
    normalizeText(
      input.sourceUrl,
      MAX_SHORT_TEXT_LENGTH,
    );

  const doi =
    normalizeText(
      input.doi,
      MAX_SHORT_TEXT_LENGTH,
    );

  const publicationDate =
    normalizeText(
      input.publicationDate,
      MAX_SHORT_TEXT_LENGTH,
    );

  const sourceType =
    normalizeSourceType(
      input.sourceType,
    );

  const sourceValidation =
    validateResearchSource({
      sourceName:
        source,

      sourceUrl,

      doi,

      publicationDate,

      sourceType,
    });

  if (
    !sourceValidation
      .isPublishable
  ) {
    throw new Error(
      "The research source is not publishable.",
    );
  }

  return {
    researchId:
      generateResearchId(),

    title,

    source,

    sourceUrl:
      sourceValidation
        .normalizedSourceUrl ||
      sourceUrl,

    doi:
      sourceValidation
        .normalizedDoi ||
      doi,

    publicationDate,

    sourceType:
      sourceValidation
        .sourceType,

    category,

    researchQuestion:
      normalizeText(
        input.researchQuestion,
        MAX_LONG_TEXT_LENGTH,
      ),

    abstract:
      normalizeText(
        input.abstract,
        MAX_LONG_TEXT_LENGTH,
      ),

    keyFindings:
      normalizeList(
        input.keyFindings,
      ),

    methodology:
      normalizeText(
        input.methodology,
        MAX_LONG_TEXT_LENGTH,
      ),

    limitations:
      normalizeText(
        input.limitations,
        MAX_LONG_TEXT_LENGTH,
      ),

    status:
      "Draft",

    sourceValidation: {
      ...sourceValidation,

      reviewedAt:
        now,
    },

    createdAt:
      now,

    updatedAt:
      now,
  };
}