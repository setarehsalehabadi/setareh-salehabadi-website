import type {
  ResearchSourceStatus,
  ResearchSourceType,
} from "@/lib/research-source-validator";

export const researchCategories = [
  "AI",
  "SEO",
  "Digital Marketing",
  "Consumer Psychology",
  "Business Growth",
  "Marketing Science",
  "Other",
] as const;

/**
 * دسته‌بندی در ورودی API می‌تواند یکی از گزینه‌های استاندارد
 * یا یک دسته‌بندی معتبر سفارشی باشد.
 *
 * اعتبارسنجی نهایی رشته در research-intake.ts انجام می‌شود.
 */
export type ResearchCategory =
  string;

export type StandardResearchCategory =
  (typeof researchCategories)[number];

export const researchStatuses = [
  "Draft",
  "Reviewed",
  "Approved",
  "Published",
] as const;

export type ResearchStatus =
  (typeof researchStatuses)[number];

export interface ResearchInput {
  title: string;

  source: string;

  category: ResearchCategory;

  sourceUrl?: string;

  doi?: string;

  publicationDate?: string;

  sourceType?: ResearchSourceType;

  researchQuestion?: string;

  abstract?: string;

  keyFindings?: string[];

  methodology?: string;

  limitations?: string;
}

export interface ResearchSourceReview {
  status: ResearchSourceStatus;

  sourceType: ResearchSourceType;

  normalizedSourceUrl?: string;

  normalizedDoi?: string;

  issues: string[];

  isPublishable: boolean;

  reviewedAt: string;
}

export interface ResearchRecord
  extends Omit<
    ResearchInput,
    "sourceType" | "keyFindings"
  > {
  researchId: string;

  sourceType: ResearchSourceType;

  keyFindings: string[];

  status: ResearchStatus;

  sourceValidation: ResearchSourceReview;

  createdAt: string;

  updatedAt: string;
}