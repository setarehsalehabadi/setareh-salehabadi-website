import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  generateResearchDocument,
} from "@/ai/research-writer";

import {
  getResearchById,
  updateResearchFile,
} from "@/lib/research";

export const runtime =
  "nodejs";

export const dynamic =
  "force-dynamic";

const DISABLED_VALUE =
  "disabled_until_later";

type AnalyzeRequestBody = {
  researchId: string;
};

function isAutomationEnabled(): boolean {
  const apiKey =
    process.env.OPENAI_API_KEY
      ?.trim();

  return Boolean(
    apiKey &&
      apiKey !==
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
    authorization?.startsWith(
      "Bearer ",
    )
  ) {
    return authorization
      .slice(7)
      .trim();
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

function isAuthorized(
  request: NextRequest,
): boolean {
  const configuredSecret =
    process.env
      .RESEARCH_PUBLISH_KEY
      ?.trim();

  if (
    !configuredSecret ||
    configuredSecret ===
      DISABLED_VALUE
  ) {
    return false;
  }

  const requestSecret =
    getRequestSecret(
      request,
    );

  return (
    Boolean(requestSecret) &&
    requestSecret ===
      configuredSecret
  );
}

function parseRequestBody(
  value: unknown,
): AnalyzeRequestBody {
  if (
    typeof value !==
      "object" ||
    value === null ||
    Array.isArray(value)
  ) {
    throw new Error(
      "Request body must be a JSON object.",
    );
  }

  const researchId =
    (
      value as Record<
        string,
        unknown
      >
    ).researchId;

  if (
    typeof researchId !==
      "string" ||
    !researchId.trim()
  ) {
    throw new Error(
      "researchId is required.",
    );
  }

  return {
    researchId:
      researchId.trim(),
  };
}

export async function POST(
  request: NextRequest,
) {
  /*
   * این بررسی پیش از خواندن بدنه درخواست انجام می‌شود.
   * بنابراین در حالت غیرفعال:
   * - هیچ تحلیلی اجرا نمی‌شود.
   * - هیچ فایل پژوهشی تغییر نمی‌کند.
   * - هیچ درخواست خارجی ارسال نمی‌شود.
   */
  if (
    !isAutomationEnabled()
  ) {
    return NextResponse.json(
      {
        success: false,

        enabled: false,

        message:
          "Research automation is temporarily disabled.",
      },
      {
        status: 503,
      },
    );
  }

  if (
    !isAuthorized(request)
  ) {
    return NextResponse.json(
      {
        success: false,

        message:
          "Unauthorized request.",
      },
      {
        status: 401,
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
      },
    );
  }

  try {
    const rawBody:
      unknown =
      await request.json();

    const {
      researchId,
    } = parseRequestBody(
      rawBody,
    );

    const research =
      await getResearchById(
        researchId,
      );

    if (!research) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Research record was not found.",
        },
        {
          status: 404,
        },
      );
    }

    const analysis =
      generateResearchDocument(
        research,
      );

    await updateResearchFile(
      researchId,
      analysis,
    );

    return NextResponse.json(
      {
        success: true,

        message:
          "Research analysis completed successfully.",

        researchId:
          research.research_id ||
          research.id,

        slug:
          research.slug,

        analysis,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unknown research analysis error.";

    const isRequestError =
      error instanceof
        SyntaxError ||
      message.includes(
        "required",
      ) ||
      message.includes(
        "JSON object",
      );

    console.error(
      "Research analysis failed:",
      error,
    );

    return NextResponse.json(
      {
        success: false,

        message:
          isRequestError
            ? message
            : "Research analysis failed.",
      },
      {
        status:
          isRequestError
            ? 400
            : 500,
      },
    );
  }
}