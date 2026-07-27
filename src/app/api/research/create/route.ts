import path from "path";

import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  createResearchRecord,
  validateResearchInput,
} from "@/lib/research-intake";

import {
  validateResearchSource,
} from "@/lib/research-source-validator";

import {
  saveResearchMarkdown,
} from "@/lib/research-writer";

export const runtime = "nodejs";

export const dynamic =
  "force-dynamic";

const DISABLED_VALUE =
  "disabled_until_later";

function isCreateAutomationEnabled(): boolean {
  const publishKey =
    process.env
      .RESEARCH_PUBLISH_KEY
      ?.trim();

  return Boolean(
    publishKey &&
      publishKey !==
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
      "duplicate",
    )
  );
}

export async function POST(
  request: NextRequest,
) {
  if (
    !isCreateAutomationEnabled()
  ) {
    return NextResponse.json(
      {
        success: false,

        enabled: false,

        message:
          "Research creation automation is temporarily disabled.",
      },
      {
        status: 503,
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
    const body: unknown =
      await request.json();

    /*
     * این تابع علاوه بر اعتبارسنجی،
     * نوع body را برای TypeScript
     * به ResearchInput محدود می‌کند.
     */
    if (
      !validateResearchInput(
        body,
      )
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Research input is incomplete, invalid or the source is not publishable.",
        },
        {
          status: 400,
        },
      );
    }

    const sourceValidation =
      validateResearchSource({
        sourceName:
          body.source,

        sourceUrl:
          body.sourceUrl,

        doi:
          body.doi,

        publicationDate:
          body.publicationDate,

        sourceType:
          body.sourceType,
      });

    if (
      !sourceValidation
        .isPublishable
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "The research source is not publishable.",

          sourceValidation,
        },
        {
          status: 400,
        },
      );
    }

    const researchRecord =
      createResearchRecord(
        body,
      );

    const savedFilePath =
      saveResearchMarkdown(
        researchRecord,
      );

    return NextResponse.json(
      {
        success: true,

        message:
          "Research record created successfully.",

        research: {
          researchId:
            researchRecord.researchId,

          title:
            researchRecord.title,

          category:
            researchRecord.category,

          status:
            researchRecord.status,
        },

        fileName:
          path.basename(
            savedFilePath,
          ),
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unknown research creation error.";

    const normalizedMessage =
      message.toLocaleLowerCase();

    const isRequestError =
      error instanceof
        SyntaxError ||
      normalizedMessage.includes(
        "required",
      ) ||
      normalizedMessage.includes(
        "invalid",
      ) ||
      normalizedMessage.includes(
        "incomplete",
      ) ||
      normalizedMessage.includes(
        "maximum length",
      );

    const status =
      isRequestError
        ? 400
        : isConflictError(
              message,
            )
          ? 409
          : 500;

    console.error(
      "Research creation failed:",
      error,
    );

    return NextResponse.json(
      {
        success: false,

        message:
          status === 500
            ? "Failed to create research."
            : message,
      },
      {
        status,
      },
    );
  }
}