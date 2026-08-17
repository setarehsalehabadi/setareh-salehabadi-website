"use server";

import { redirect } from "next/navigation";

import {
  isLocale,
  type Locale,
} from "@/i18n/config";

import { createClient } from "@/lib/supabase/server";

function getSafeLocale(
  value: FormDataEntryValue | null,
): Locale {
  if (
    typeof value === "string" &&
    isLocale(value)
  ) {
    return value;
  }

  return "en";
}

function normalizeWebsiteUrl(
  value: string,
) {
  const trimmed = value.trim();

  if (!trimmed) {
    return "";
  }

  if (
    /^https?:\/\//i.test(trimmed)
  ) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

function redirectWithError(
  locale: Locale,
  code: string,
): never {
  redirect(
    `/${locale}/growth-ai/workspace?onboardingError=${encodeURIComponent(
      code,
    )}`,
  );
}

export async function createGrowthAIWorkspace(
  formData: FormData,
) {
  const locale =
    getSafeLocale(
      formData.get("locale"),
    );

  const organizationName =
    String(
      formData.get(
        "organizationName",
      ) ?? "",
    ).trim();

  const businessName =
    String(
      formData.get(
        "businessName",
      ) ?? "",
    ).trim();

  const websiteUrl =
    normalizeWebsiteUrl(
      String(
        formData.get(
          "websiteUrl",
        ) ?? "",
      ),
    );

  if (
    organizationName.length < 1 ||
    organizationName.length > 120
  ) {
    redirectWithError(
      locale,
      "invalidOrganizationName",
    );
  }

  if (
    businessName.length < 1 ||
    businessName.length > 160
  ) {
    redirectWithError(
      locale,
      "invalidBusinessName",
    );
  }

  if (
    websiteUrl.length < 1 ||
    websiteUrl.length > 2048
  ) {
    redirectWithError(
      locale,
      "invalidWebsiteUrl",
    );
  }

  let parsedUrl: URL;

  try {
    parsedUrl =
      new URL(websiteUrl);
  } catch {
    redirectWithError(
      locale,
      "invalidWebsiteUrl",
    );
  }

  if (
    parsedUrl.protocol !==
      "http:" &&
    parsedUrl.protocol !==
      "https:"
  ) {
    redirectWithError(
      locale,
      "invalidWebsiteUrl",
    );
  }

  const supabase =
    await createClient();

  const {
    data: claimsData,
    error: claimsError,
  } =
    await supabase.auth.getClaims();

  const userId =
    claimsData?.claims?.sub;

  if (
    claimsError ||
    !userId
  ) {
    redirect(
      `/${locale}/growth-ai`,
    );
  }

  const {
    error: workspaceError,
  } =
    await supabase.rpc(
      "create_growth_ai_workspace",
      {
        organization_name:
          organizationName,
        business_name:
          businessName,
        business_website_url:
          websiteUrl,
      },
    );

  if (workspaceError) {
    if (
      workspaceError.message.includes(
        "Growth AI workspace already exists",
      )
    ) {
      redirect(
        `/${locale}/growth-ai/workspace`,
      );
    }

    console.error(
      "Growth AI onboarding failed:",
      workspaceError,
    );

    redirectWithError(
      locale,
      "creationFailed",
    );
  }

  redirect(
    `/${locale}/growth-ai/workspace?ready=1`,
  );
}