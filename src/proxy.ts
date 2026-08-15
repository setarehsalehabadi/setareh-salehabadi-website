import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  defaultLocale,
  isLocale,
} from "@/i18n/config";
import { updateSession } from "@/lib/supabase/proxy";

const PERMANENT_REDIRECT_STATUS = 308;

const LEGACY_RESEARCH_REDIRECTS: Readonly<
  Record<string, string>
> = {
  "/fa/research/ai-disclosure-consumer-engagement":
    "/fa/research/ai-consumer-trust-marketing",
};

function removeTrailingSlash(
  pathname: string,
): string {
  if (pathname === "/") {
    return pathname;
  }

  return pathname.replace(/\/+$/, "");
}

function getLegacyResearchDestination(
  pathname: string,
): string | null {
  const normalizedPathname =
    removeTrailingSlash(pathname);

  return (
    LEGACY_RESEARCH_REDIRECTS[
      normalizedPathname
    ] ?? null
  );
}

export function proxy(
  request: NextRequest,
) {
  const { pathname } =
    request.nextUrl;

  /*
   * Preserve SEO value from the previous RL-001 URL:
   *
   * /fa/research/ai-disclosure-consumer-engagement
   *
   * permanently redirects to:
   *
   * /fa/research/ai-consumer-trust-marketing
   */
  const legacyResearchDestination =
    getLegacyResearchDestination(
      pathname,
    );

  if (legacyResearchDestination) {
    const redirectUrl =
      request.nextUrl.clone();

    redirectUrl.pathname =
      legacyResearchDestination;

    return NextResponse.redirect(
      redirectUrl,
      PERMANENT_REDIRECT_STATUS,
    );
  }

  const pathnameSegments =
    pathname.split("/");

  const possibleLocale =
    pathnameSegments[1];

  /*
   * The requested URL already contains a valid locale:
   *
   * /en
   * /de
   * /fa
   * /fa/...
   */
  if (
    possibleLocale &&
    isLocale(possibleLocale)
  ) {
    return updateSession(request);
  }

  /*
   * Normalize uppercase or mixed-case locale paths:
   *
   * /FA       -> /fa
   * /De       -> /de
   * /EN/about -> /en/about
   */
  const normalizedLocale =
    possibleLocale?.toLowerCase();

  if (
    normalizedLocale &&
    isLocale(normalizedLocale)
  ) {
    const normalizedUrl =
      request.nextUrl.clone();

    pathnameSegments[1] =
      normalizedLocale;

    normalizedUrl.pathname =
      pathnameSegments.join("/") ||
      `/${normalizedLocale}`;

    return NextResponse.redirect(
      normalizedUrl,
      PERMANENT_REDIRECT_STATUS,
    );
  }

  /*
   * Add the default locale to every unlocalized page:
   *
   * /        -> /en
   * /about   -> /en/about
   * /courses -> /en/courses
   */
  const localizedUrl =
    request.nextUrl.clone();

  localizedUrl.pathname =
    pathname === "/"
      ? `/${defaultLocale}`
      : `/${defaultLocale}${pathname}`;

  return NextResponse.redirect(
    localizedUrl,
    PERMANENT_REDIRECT_STATUS,
  );
}

export const config = {
  matcher: [
    /*
     * Run Proxy on page routes, but exclude:
     *
     * - API routes
     * - Next.js internal assets
     * - files with extensions
     * - robots.txt
     * - sitemap.xml
     */
    "/((?!api|_next/static|_next/image|robots\\.txt|sitemap\\.xml|.*\\..*).*)",
  ],
};