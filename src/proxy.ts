import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  defaultLocale,
  isLocale,
} from "@/i18n/config";

const PERMANENT_REDIRECT_STATUS = 308;

export function proxy(
  request: NextRequest
) {
  const { pathname } =
    request.nextUrl;

  const pathnameSegments =
    pathname.split("/");

  const possibleLocale =
    pathnameSegments[1];

  /*
   * The requested URL already contains a valid locale:
   * /en
   * /de
   * /fa
   * /fa/...
   */
  if (
    possibleLocale &&
    isLocale(possibleLocale)
  ) {
    return NextResponse.next();
  }

  /*
   * Normalize uppercase or mixed-case locale paths:
   * /FA  -> /fa
   * /De  -> /de
   * /EN/... -> /en/...
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
      PERMANENT_REDIRECT_STATUS
    );
  }

  /*
   * Add the default locale to every unlocalized page:
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
    PERMANENT_REDIRECT_STATUS
  );
}

export const config = {
  matcher: [
    /*
     * Run Proxy on page routes, but exclude:
     * - API routes
     * - Next.js internal assets
     * - files with extensions
     * - robots.txt
     * - sitemap.xml
     */
    "/((?!api|_next/static|_next/image|robots\\.txt|sitemap\\.xml|.*\\..*).*)",
  ],
};