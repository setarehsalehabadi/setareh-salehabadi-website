export const linkedinTemplateNames = [
  "researchInsight",
  "businessLesson",
  "questionEngagement",
] as const;

export type LinkedInTemplateName =
  (typeof linkedinTemplateNames)[number];

export interface LinkedInPost {
  title: string;

  content: string;

  hashtags: string[];
}

export type GeneratedLinkedInPost =
  LinkedInPost;

export interface LinkedInPostInput {
  title: string;

  description?: string;

  summary?: string;

  category?: string;

  content?: string;

  source?: string;

  researchId?: string;

  url?: string;
}

export const linkedinPostStatuses = [
  "draft",
  "ready_for_manual_publish",
  "published",
] as const;

export type LinkedInPostStatus =
  (typeof linkedinPostStatuses)[number];

export interface LinkedInPostResult {
  success: boolean;

  status: LinkedInPostStatus;

  post: GeneratedLinkedInPost;

  message?: string;
}