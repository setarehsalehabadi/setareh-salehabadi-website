import {
  generateLinkedInPost as generateTemplatePost,
} from "@/ai/linkedin-template-engine";

import type {
  LinkedInPost,
} from "@/types/linkedin";

import type {
  ResearchArticle,
} from "@/types/research";

const SITE_URL =
  "https://setarehsalehabadi.com";

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

function createArticleUrl(
  slug: unknown,
): string | undefined {
  const normalizedSlug =
    normalizeText(slug);

  if (!normalizedSlug) {
    return undefined;
  }

  return `${SITE_URL}/fa/research/${encodeURIComponent(
    normalizedSlug,
  )}`;
}

export async function generateLinkedInPost(
  article: ResearchArticle,
): Promise<LinkedInPost> {
  const title =
    normalizeText(
      article.title,
    );

  if (!title) {
    throw new Error(
      "A research article title is required to generate a LinkedIn post.",
    );
  }

  /*
   * تولید پست کاملاً محلی است.
   * هیچ درخواست OpenAI یا سرویس خارجی
   * در این تابع انجام نمی‌شود.
   */
  return generateTemplatePost(
    {
      title,

      description:
        normalizeText(
          article.description,
        ) || undefined,

      summary:
        normalizeText(
          article.excerpt,
        ) || undefined,

      category:
        normalizeText(
          article.category,
        ) || undefined,

      content:
        normalizeText(
          article.content,
        ) || undefined,

      url:
        createArticleUrl(
          article.slug,
        ),
    },
    "researchInsight",
  );
}

export default generateLinkedInPost;