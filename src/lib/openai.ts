import "server-only";

const DISABLED_VALUE =
  "disabled_until_later";

export type OpenAIStatus =
  | {
      enabled: true;
      apiKey: string;
      reason: null;
    }
  | {
      enabled: false;
      apiKey: null;
      reason:
        | "missing_api_key"
        | "temporarily_disabled";
    };

function normalizeEnvironmentValue(
  value: string | undefined,
): string {
  return value?.trim() ?? "";
}

export function getOpenAIStatus(): OpenAIStatus {
  const apiKey =
    normalizeEnvironmentValue(
      process.env.OPENAI_API_KEY,
    );

  if (!apiKey) {
    return {
      enabled: false,
      apiKey: null,
      reason:
        "missing_api_key",
    };
  }

  if (
    apiKey ===
    DISABLED_VALUE
  ) {
    return {
      enabled: false,
      apiKey: null,
      reason:
        "temporarily_disabled",
    };
  }

  return {
    enabled: true,
    apiKey,
    reason: null,
  };
}

export function isOpenAIEnabled(): boolean {
  return getOpenAIStatus()
    .enabled;
}

export function requireOpenAIKey(): string {
  const status =
    getOpenAIStatus();

  if (!status.enabled) {
    throw new Error(
      "OpenAI automation is temporarily disabled.",
    );
  }

  return status.apiKey;
}