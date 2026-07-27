import "server-only";

import {
  generateLinkedInPost,
} from "@/ai/linkedin-generator";

import {
  getResearchArticles,
} from "@/lib/research";

import type {
  LinkedInPost,
  LinkedInPostStatus,
} from "@/types/linkedin";

import type {
  ResearchArticle,
} from "@/types/research";

type SuccessfulResult = {
  success: true;

  status:
    "ready_for_manual_publish";

  message: string;

  article: {
    id: string;

    title: string;

    slug: string;
  };

  linkedinPost: LinkedInPost;
};

type FailedResult = {
  success: false;

  status: "draft";

  message: string;

  error: string;
};

export type PublishLinkedInResult =
  | SuccessfulResult
  | FailedResult;

const blockedStatuses =
  new Set([
    "draft",
    "needs_review",
    "archived",
    "rejected",
  ]);

function normalizeText(
  value: unknown,
): string {
  if (
    typeof value !== "string"
  ) {
    return "";
  }

  return value
    .replace(/\u0000/g, "")
    .trim();
}

function isEligibleArticle(
  article: ResearchArticle,
): boolean {
  const title =
    normalizeText(
      article.title,
    );

  const slug =
    normalizeText(
      article.slug,
    );

  const content =
    normalizeText(
      article.content,
    );

  const status =
    normalizeText(
      article.status,
    ).toLocaleLowerCase();

  if (
    !title ||
    !slug ||
    !content
  ) {
    return false;
  }

  if (
    status &&
    blockedStatuses.has(
      status,
    )
  ) {
    return false;
  }

  return true;
}

function getArticleId(
  article: ResearchArticle,
): string {
  return (
    normalizeText(
      article.research_id,
    ) ||
    normalizeText(
      article.id,
    )
  );
}

/**
 * این تابع هیچ پستی را مستقیماً در LinkedIn منتشر نمی‌کند.
 *
 * فقط متن آماده انتشار دستی را با استفاده از Template Engine
 * داخلی سایت تولید می‌کند.
 *
 * هیچ درخواست OpenAI یا سرویس خارجی در این فایل انجام نمی‌شود.
 */
export async function publishLinkedInPost(): Promise<PublishLinkedInResult> {
  try {
    const articles =
      await getResearchArticles();

    const article =
      articles.find(
        isEligibleArticle,
      );

    if (!article) {
      return {
        success: false,

        status:
          "draft",

        message:
          "LinkedIn post was not generated.",

        error:
          "No eligible research article is available.",
      };
    }

    const linkedinPost =
      await generateLinkedInPost(
        article,
      );

    const status: LinkedInPostStatus =
      "ready_for_manual_publish";

    return {
      success: true,

      status,

      message:
        "LinkedIn post is ready for manual review and publishing.",

      article: {
        id:
          getArticleId(
            article,
          ),

        title:
          article.title,

        slug:
          article.slug,
      },

      linkedinPost,
    };
  } catch (error) {
    console.error(
      "LinkedIn post preparation failed:",
      error,
    );

    return {
      success: false,

      status:
        "draft",

      message:
        "LinkedIn post was not generated.",

      error:
        "Failed to prepare the LinkedIn post.",
    };
  }
}