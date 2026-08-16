"use client";

import { useState } from "react";

import type { Locale } from "@/i18n/config";
import { createClient } from "@/lib/supabase/client";

type GoogleSignInButtonProps = {
  locale: Locale;
  label: string;
  loadingLabel: string;
  errorMessage: string;
};

export default function GoogleSignInButton({
  locale,
  label,
  loadingLabel,
  errorMessage,
}: GoogleSignInButtonProps) {
  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  async function handleSignIn() {
    setIsLoading(true);
    setError(null);

    const supabase = createClient();

    const { data, error: signInError } =
      await supabase.auth.signInWithOAuth({
        provider: "google",

        options: {
          redirectTo:
            `${window.location.origin}/${locale}/auth/callback`,

          skipBrowserRedirect: true,

          queryParams: {
            prompt: "select_account",
          },
        },
      });

    if (signInError || !data.url) {
      setError(errorMessage);
      setIsLoading(false);
      return;
    }

    window.location.assign(data.url);
  }

  return (
    <div className="mt-8">
      <button
        type="button"
        disabled={isLoading}
        onClick={handleSignIn}
        className="
          inline-flex
          min-h-12
          items-center
          justify-center
          rounded-full
          bg-[#302d29]
          px-6
          py-3
          text-sm
          font-medium
          text-[#f4efe8]
          transition
          duration-200
          hover:bg-[#47423c]
          focus-visible:outline-2
          focus-visible:outline-offset-4
          focus-visible:outline-[#68705a]
          disabled:cursor-wait
          disabled:opacity-60
        "
      >
        {isLoading ? loadingLabel : label}
      </button>

      {error ? (
        <p
          role="alert"
          className="
            mt-3
            max-w-md
            text-sm
            leading-6
            text-[#8a3f35]
          "
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}