import { NextResponse } from "next/server";

import { isLocale } from "@/i18n/config";
import { createClient } from "@/lib/supabase/server";

type AuthCallbackRouteProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function GET(
  request: Request,
  { params }: AuthCallbackRouteProps,
) {
  const { locale } = await params;
  const requestUrl = new URL(request.url);

  if (!isLocale(locale)) {
    return NextResponse.redirect(
      new URL(
        "/en/growth-ai?auth=invalid-locale",
        requestUrl.origin,
      ),
    );
  }

  const code = requestUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(
      new URL(
        `/${locale}/growth-ai?auth=missing-code`,
        requestUrl.origin,
      ),
    );
  }

  const supabase = await createClient();
  const { error } =
    await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(
      new URL(
        `/${locale}/growth-ai?auth=callback-error`,
        requestUrl.origin,
      ),
    );
  }

  return NextResponse.redirect(
    new URL(
      `/${locale}/growth-ai`,
      requestUrl.origin,
    ),
  );
}