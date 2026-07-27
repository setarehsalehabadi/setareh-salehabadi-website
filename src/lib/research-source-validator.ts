export type ResearchSourceStatus =
  | "verified"
  | "needs_review"
  | "missing";

export const researchSourceTypes = [
  "peer_reviewed_paper",
  "preprint",
  "official_report",
  "industry_report",
  "official_documentation",
  "news",
  "unknown",
] as const;

export type ResearchSourceType =
  (typeof researchSourceTypes)[number];

export interface ResearchSourceInput {
  sourceName?: string;

  sourceUrl?: string;

  doi?: string;

  publicationDate?: string;

  sourceType?: ResearchSourceType;
}

export interface ResearchSourceValidation {
  status: ResearchSourceStatus;

  sourceType: ResearchSourceType;

  normalizedSourceUrl: string;

  normalizedDoi: string;

  issues: string[];

  isPublishable: boolean;
}

const publishableSourceTypes: readonly ResearchSourceType[] = [
  "peer_reviewed_paper",
  "preprint",
  "official_report",
  "industry_report",
  "official_documentation",
];

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
    .replace(/\s+/g, " ")
    .trim();
}

function isLocalHostname(
  hostname: string,
): boolean {
  const normalizedHostname =
    hostname
      .toLocaleLowerCase()
      .replace(
        /^\[|\]$/g,
        "",
      );

  return (
    normalizedHostname ===
      "localhost" ||
    normalizedHostname ===
      "0.0.0.0" ||
    normalizedHostname ===
      "127.0.0.1" ||
    normalizedHostname ===
      "::1" ||
    normalizedHostname.endsWith(
      ".local",
    )
  );
}

function normalizeUrl(
  value: unknown,
): string {
  const rawUrl =
    normalizeText(value);

  if (!rawUrl) {
    return "";
  }

  try {
    const parsedUrl =
      new URL(rawUrl);

    if (
      parsedUrl.protocol !==
        "https:" &&
      parsedUrl.protocol !==
        "http:"
    ) {
      return "";
    }

    if (
      parsedUrl.username ||
      parsedUrl.password
    ) {
      return "";
    }

    if (
      isLocalHostname(
        parsedUrl.hostname,
      )
    ) {
      return "";
    }

    parsedUrl.hash = "";

    return parsedUrl.toString();
  } catch {
    return "";
  }
}

function normalizeDoi(
  value: unknown,
): string {
  const rawDoi =
    normalizeText(value);

  if (!rawDoi) {
    return "";
  }

  let decodedDoi =
    rawDoi;

  try {
    decodedDoi =
      decodeURIComponent(
        rawDoi,
      );
  } catch {
    decodedDoi =
      rawDoi;
  }

  const normalizedDoi =
    decodedDoi
      .replace(
        /^https?:\/\/(?:dx\.)?doi\.org\//i,
        "",
      )
      .replace(
        /^doi:\s*/i,
        "",
      )
      .split(/[?#]/)[0]
      .trim();

  const doiPattern =
    /^10\.\d{4,9}\/[-._;()/:A-Z0-9]+$/i;

  return doiPattern.test(
    normalizedDoi,
  )
    ? normalizedDoi
    : "";
}

function extractDoiFromUrl(
  normalizedSourceUrl: string,
): string {
  if (!normalizedSourceUrl) {
    return "";
  }

  try {
    const parsedUrl =
      new URL(
        normalizedSourceUrl,
      );

    const hostname =
      parsedUrl.hostname
        .toLocaleLowerCase()
        .replace(
          /^www\./,
          "",
        );

    if (
      hostname !== "doi.org" &&
      hostname !== "dx.doi.org"
    ) {
      return "";
    }

    return normalizeDoi(
      parsedUrl.pathname.replace(
        /^\/+/,
        "",
      ),
    );
  } catch {
    return "";
  }
}

function normalizePublicationDate(
  value: unknown,
): {
  provided: boolean;
  valid: boolean;
  future: boolean;
} {
  const rawDate =
    normalizeText(value);

  if (!rawDate) {
    return {
      provided: false,
      valid: true,
      future: false,
    };
  }

  const parsedDate =
    new Date(rawDate);

  if (
    Number.isNaN(
      parsedDate.getTime(),
    )
  ) {
    return {
      provided: true,
      valid: false,
      future: false,
    };
  }

  const endOfToday =
    new Date();

  endOfToday.setHours(
    23,
    59,
    59,
    999,
  );

  return {
    provided: true,
    valid: true,
    future:
      parsedDate.getTime() >
      endOfToday.getTime(),
  };
}

function resolveSourceType(
  value: unknown,
): ResearchSourceType {
  if (
    typeof value === "string" &&
    researchSourceTypes.includes(
      value as ResearchSourceType,
    )
  ) {
    return value as ResearchSourceType;
  }

  return "unknown";
}

function addIssue(
  issues: string[],
  message: string,
): void {
  if (
    !issues.includes(message)
  ) {
    issues.push(message);
  }
}

export function validateResearchSource(
  input: ResearchSourceInput,
): ResearchSourceValidation {
  const sourceName =
    normalizeText(
      input.sourceName,
    );

  const rawSourceUrl =
    normalizeText(
      input.sourceUrl,
    );

  const normalizedSourceUrl =
    normalizeUrl(
      rawSourceUrl,
    );

  const rawDoi =
    normalizeText(
      input.doi,
    );

  const normalizedDoi =
    normalizeDoi(
      rawDoi,
    ) ||
    extractDoiFromUrl(
      normalizedSourceUrl,
    );

  const publicationDate =
    normalizePublicationDate(
      input.publicationDate,
    );

  const sourceType =
    resolveSourceType(
      input.sourceType,
    );

  const issues: string[] =
    [];

  let hasFatalIssue =
    false;

  if (!sourceName) {
    addIssue(
      issues,
      "نام منبع مشخص نشده است.",
    );

    hasFatalIssue =
      true;
  }

  if (
    rawSourceUrl &&
    !normalizedSourceUrl
  ) {
    addIssue(
      issues,
      "آدرس منبع معتبر یا عمومی نیست.",
    );

    hasFatalIssue =
      true;
  }

  if (
    rawDoi &&
    !normalizedDoi
  ) {
    addIssue(
      issues,
      "شناسه DOI معتبر نیست.",
    );

    hasFatalIssue =
      true;
  }

  if (
    publicationDate.provided &&
    !publicationDate.valid
  ) {
    addIssue(
      issues,
      "تاریخ انتشار منبع معتبر نیست.",
    );

    hasFatalIssue =
      true;
  }

  if (
    publicationDate.future
  ) {
    addIssue(
      issues,
      "تاریخ انتشار منبع نمی‌تواند در آینده باشد.",
    );

    hasFatalIssue =
      true;
  }

  if (
    sourceType ===
    "unknown"
  ) {
    addIssue(
      issues,
      "نوع منبع مشخص نشده است.",
    );

    hasFatalIssue =
      true;
  }

  if (
    sourceType === "news"
  ) {
    addIssue(
      issues,
      "منبع خبری به‌تنهایی برای انتشار در کتابخانه پژوهش کافی نیست.",
    );
  }

  const hasTraceableReference =
    Boolean(
      normalizedSourceUrl ||
      normalizedDoi,
    );

  if (
    !hasTraceableReference
  ) {
    addIssue(
      issues,
      "برای انتشار باید لینک مستقیم منبع یا DOI معتبر ثبت شود.",
    );

    hasFatalIssue =
      true;
  }

  const hasPublishableSourceType =
    publishableSourceTypes.includes(
      sourceType,
    );

  if (
    !hasPublishableSourceType &&
    sourceType !== "unknown"
  ) {
    addIssue(
      issues,
      "نوع منبع انتخاب‌شده برای انتشار در کتابخانه پژوهش تأیید نشده است.",
    );
  }

  if (
    sourceType ===
      "peer_reviewed_paper" &&
    !normalizedDoi
  ) {
    addIssue(
      issues,
      "برای مقاله داوری‌شده، ثبت DOI توصیه می‌شود و منبع باید بازبینی انسانی شود.",
    );
  }

  if (
    sourceType === "preprint"
  ) {
    addIssue(
      issues,
      "این منبع Preprint است و ممکن است هنوز داوری علمی کامل نشده باشد.",
    );
  }

  if (
    sourceType ===
    "industry_report"
  ) {
    addIssue(
      issues,
      "گزارش صنعتی باید از نظر روش‌شناسی، تعارض منافع و اعتبار ناشر بازبینی شود.",
    );
  }

  const isPublishable =
    Boolean(sourceName) &&
    hasTraceableReference &&
    hasPublishableSourceType &&
    !hasFatalIssue;

  let status:
    ResearchSourceStatus =
    "needs_review";

  if (
    !sourceName &&
    !hasTraceableReference
  ) {
    status =
      "missing";
  }

  /*
   * این Validator فقط ساختار اطلاعات را بررسی می‌کند
   * و هیچ منبعی را به‌صورت آنلاین یا علمی راستی‌آزمایی نمی‌کند.
   * بنابراین وضعیت verified در این مرحله به‌صورت خودکار صادر نمی‌شود.
   */
  return {
    status,

    sourceType,

    normalizedSourceUrl,

    normalizedDoi,

    issues,

    isPublishable,
  };
}