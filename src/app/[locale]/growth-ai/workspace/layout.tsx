import type { ReactNode } from "react";

import {
  notFound,
  redirect,
} from "next/navigation";

import {
  isLocale,
  type Locale,
} from "@/i18n/config";

import { createClient } from "@/lib/supabase/server";

type GrowthAIWorkspaceLayoutProps = {
  children: ReactNode;

  params: Promise<{
    locale: string;
  }>;
};

export default async function GrowthAIWorkspaceLayout({
  children,
  params,
}: GrowthAIWorkspaceLayoutProps) {
  const {
    locale: localeParam,
  } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale =
    localeParam;

  const supabase =
    await createClient();

  const {
    data,
    error,
  } =
    await supabase.auth.getClaims();

  const isAuthenticated =
    !error &&
    Boolean(
      data?.claims?.sub,
    );

  if (!isAuthenticated) {
    redirect(
      `/${locale}/growth-ai`,
    );
  }

  return children;
}