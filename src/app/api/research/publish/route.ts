import {
  timingSafeEqual,
} from "crypto";

import path from "path";

import matter from "gray-matter";

import {
  revalidatePath,
} from "next/cache";

import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  generateResearchMarkdown,
  type ResearchMarkdownInput,
} from "@/ai/research-markdown-writer";

import type {
  ResearchDocument,
} from "@/ai/research-writer";

import {
  saveResearchMarkdown,
} from "@/lib/research-file-manager";

export const runtime =
  "nodejs";

export const dynamic =
  "force-dynamic";

const DISABLED_VALUE =
  "disabled_until_later";

type PublishRequestBody = {
  research: ResearchMarkdownInput;

  analysis: ResearchDocument;

  overwrite?: boolean;
};

function isRecord(
  value: unknown,
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function isStringArray(
  value: unknown,
): value is string[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        typeof item ===
        "string",
    )
  );
}

function isResearchDocument(
  value: unknown,
): value is ResearchDocument {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value
      .خلاصه_علمی_پژوهش ===
      "string" &&
    typeof value
      .تحلیل_روانشناسی_مصرف_کننده ===
      "string" &&
    typeof value
      .تفسیر_کسب_وکاری ===
      "string" &&
    typeof value
      .چارچوب_استراتژیک ===
      "string" &&
    isStringArray(
      value
        .چک_لیست_اقدام,
    ) &&
    typeof value
      .محدودیت_های_پژوهش ===
      "string" &&
    typeof value
      .دیدگاه_من ===
      "string"
  );
}

function isResearchInput(
  value: unknown,
): value is ResearchMarkdownInput {
  if (!isRecord(value)) {
    return false;
  }

  if (
    typeof value.title !==
      "string" ||
    !value.title.trim()
  ) {
    return false;
  }

  const researchId =
    value.researchId ??
    value.research_id;

  if (
    typeof researchId !==
      "string" ||
    !researchId.trim()
  ) {
    return false;
  }

  return (
    typeof value.category ===
      "string" &&
    Boolean(
      value.category.trim(),
    ) &&
    typeof value.status ===
      "string" &&
    Boolean(
      value.status.trim(),
    )
  );
}

function parseRequestBody(
  value: unknown,
): PublishRequestBody {
  if (!isRecord(value)) {
    throw new Error(
      "Request body must be a JSON object.",
    );
  }

  if (
    !isResearchInput(
      value.research,
    )
  ) {
    throw new Error(
      "Research data is incomplete or invalid.",
    );
  }

  if (
    !isResearchDocument(
      value.analysis,
    )
  ) {
    throw new Error(
      "Research analysis is incomplete or invalid.",
    );
  }

  if (
    value.overwrite !==
      undefined &&
    typeof value.overwrite !==
      "boolean"
  ) {
    throw new Error(
      "The overwrite field must be a boolean.",
    );
  }

  return {
    research:
      value.research,

    analysis:
      value.analysis,

    overwrite:
      value.overwrite ===
      true,
  };
}

function getConfiguredSecret():
  string | null {
  const secret =
    process.env
      .RESEARCH_PUBLISH_KEY
      ?.trim();

  return secret || null;
}

function isPublishingEnabled():
  boolean {
  const configuredSecret =
    getConfiguredSecret();

  return Boolean(
    configuredSecret &&
    configuredSecret !==
      DISABLED_VALUE,
  );
}

function getRequestSecret(
  request: NextRequest,
): string | null {
  const authorization =
    request.headers.get(
      "authorization",
    );

  if (
    authorization &&
    /^Bearer\s+/i.test(
      authorization,
    )
  ) {
    return authorization
      .replace(
        /^Bearer\s+/i,
        "",
      )
      .trim() ||
      null;
  }

  return (
    request.headers
      .get(
        "x-research-publish-key",
      )
      ?.trim() ||
    null
  );
}

function secretsMatch(
  requestSecret: string,
  configuredSecret: string,
): boolean {
  const requestBuffer =
    Buffer.from(
      requestSecret,
      "utf8",
    );

  const configuredBuffer =
    Buffer.from(
      configuredSecret,
      "utf8",
    );

  if (
    requestBuffer.length !==
    configuredBuffer.length
  ) {
    return false;
  }

  return timingSafeEqual(
    requestBuffer,
    configuredBuffer,
  );
}

function isAuthorized(
  request: NextRequest,
): boolean {
  const configuredSecret =
    getConfiguredSecret();

  const requestSecret =
    getRequestSecret(
      request,
    );

  if (
    !configuredSecret ||
    configuredSecret ===
      DISABLED_VALUE ||
    !requestSecret
  ) {
    return false;
  }

  return secretsMatch(
    requestSecret,
    configuredSecret,
  );
}

function isConflictError(
  message: string,
): boolean {
  const normalizedMessage =
    message.toLocaleLowerCase();

  return (
    normalizedMessage.includes(
      "already exists",
    ) ||
    normalizedMessage.includes(
      "duplicate research slug",
    ) ||
    normalizedMessage.includes(
      "duplicate",
    )
  );
}

function isRequestError(
  error: unknown,
  message: string,
): boolean {
  if (
    error instanceof
    SyntaxError
  ) {
    return true;
  }

  const normalizedMessage =
    message.toLocaleLowerCase();

  return [
    "invalid",
    "missing",
    "required",
    "empty",
    "mismatch",
    "incomplete",
    "json object",
    "must be",
  ].some(
    (term) =>
      normalizedMessage.includes(
        term,
      ),
  );
}

export async function POST(
  request: NextRequest,
) {
  /*
   * با تنظیم فعلی:
   *
   * RESEARCH_PUBLISH_KEY=disabled_until_later
   *
   * این مسیر پیش از احراز هویت، خواندن بدنه درخواست
   * یا ایجاد فایل متوقف می‌شود.
   */
  if (!isPublishingEnabled()) {
    return NextResponse.json(
      {
        success: false,

        enabled: false,

        message:
          "Research publishing automation is temporarily disabled.",
      },
      {
        status: 503,

        headers: {
          "Cache-Control":
            "no-store",
        },
      },
    );
  }

  if (!isAuthorized(request)) {
    return NextResponse.json(
      {
        success: false,

        message:
          "Unauthorized request.",
      },
      {
        status: 401,

        headers: {
          "Cache-Control":
            "no-store",
        },
      },
    );
  }

  const contentType =
    request.headers.get(
      "content-type",
    );

  if (
    !contentType?.includes(
      "application/json",
    )
  ) {
    return NextResponse.json(
      {
        success: false,

        message:
          "Content-Type must be application/json.",
      },
      {
        status: 415,

        headers: {
          "Cache-Control":
            "no-store",
        },
      },
    );
  }

  try {
    const rawBody:
      unknown =
      await request.json();

    const {
      research,
      analysis,
      overwrite,
    } = parseRequestBody(
      rawBody,
    );

    const markdown =
      generateResearchMarkdown(
        research,
        analysis,
      );

    const parsedMarkdown =
      matter(markdown);

    const slugValue =
      parsedMarkdown.data
        .slug;

    if (
      typeof slugValue !==
        "string" ||
      !slugValue.trim()
    ) {
      throw new Error(
        "Generated Markdown does not contain a valid slug.",
      );
    }

    const slug =
      slugValue.trim();

    const savedFilePath =
      saveResearchMarkdown(
        slug,
        markdown,
        {
          overwrite,
        },
      );

    revalidatePath(
      "/fa/research",
    );

    revalidatePath(
      `/fa/research/${slug}`,
    );

    return NextResponse.json(
      {
        success: true,

        message:
          "Research published successfully.",

        researchId:
          parsedMarkdown.data
            .research_id,

        slug,

        fileName:
          path.basename(
            savedFilePath,
          ),

        url:
          `/fa/research/${slug}`,
      },
      {
        status:
          overwrite
            ? 200
            : 201,

        headers: {
          "Cache-Control":
            "no-store",
        },
      },
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unknown publishing error.";

    const status =
      isRequestError(
        error,
        message,
      )
        ? 400
        : isConflictError(
              message,
            )
          ? 409
          : 500;

    console.error(
      "Research publishing failed:",
      error,
    );

    return NextResponse.json(
      {
        success: false,

        message:
          status === 500
            ? "Research publishing failed."
            : message,
      },
      {
        status,

        headers: {
          "Cache-Control":
            "no-store",
        },
      },
    );
  }
}