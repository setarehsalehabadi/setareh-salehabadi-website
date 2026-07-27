import {
  NextResponse,
} from "next/server";

import {
  generateLinkedInPost,
} from "@/ai/linkedin-template-engine";

import {
  getResearchArticles,
} from "@/lib/research";

export const runtime =
  "nodejs";

export const dynamic =
  "force-dynamic";

const SITE_URL =
  "https://setarehsalehabadi.com";

function normalizeText(
  value: unknown,
): string {
  return typeof value === "string"
    ? value.trim()
    : "";
}

function isUsableArticle(
  article: {
    title?: string;
    slug?: string;
    content?: string;
    status?: string;
  },
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

  return ![
    "draft",
    "needs_review",
    "archived",
  ].includes(status);
}

export async function GET() {
  try {
    const articles =
      await getResearchArticles();

    const latestArticle =
      articles.find(
        isUsableArticle,
      );

    if (!latestArticle) {
      return NextResponse.json(
        {
          success: false,

          message:
            "No eligible research article was found.",
        },
        {
          status: 404,

          headers: {
            "Cache-Control":
              "no-store",
          },
        },
      );
    }

    const articleUrl =
      `${SITE_URL}/fa/research/${encodeURIComponent(
        latestArticle.slug,
      )}`;

    /*
     * این تابع کاملاً محلی است.
     * در این مسیر هیچ فراخوانی به OpenAI
     * یا سرویس خارجی انجام نمی‌شود.
     */
    const linkedinPost =
      generateLinkedInPost({
        title:
          latestArticle.title,

        description:
          latestArticle.description,

        category:
          latestArticle.category,

        summary:
          latestArticle.excerpt,

        content:
          latestArticle.content,

        url:
          articleUrl,
      });

    return NextResponse.json(
      {
        success: true,

        generationMethod:
          "local_template",

        article: {
          id:
            latestArticle.research_id ||
            latestArticle.id,

          title:
            latestArticle.title,

          slug:
            latestArticle.slug,

          url:
            articleUrl,
        },

        linkedinPost,
      },
      {
        status: 200,

        headers: {
          "Cache-Control":
            "no-store",
        },
      },
    );
  } catch (error) {
    console.error(
      "LinkedIn post generation failed:",
      error,
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Failed to generate LinkedIn post.",
      },
      {
        status: 500,

        headers: {
          "Cache-Control":
            "no-store",
        },
      },
    );
  }
}