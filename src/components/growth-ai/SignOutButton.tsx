"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { createClient } from "@/lib/supabase/client";

type SignOutButtonProps = {
  label: string;
  loadingLabel: string;
  errorMessage: string;
};

export default function SignOutButton({
  label,
  loadingLabel,
  errorMessage,
}: SignOutButtonProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  async function handleSignOut() {
    setIsLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: signOutError } =
      await supabase.auth.signOut();

    if (signOutError) {
      setError(errorMessage);
      setIsLoading(false);
      return;
    }

    router.refresh();
  }

  return (
    <div className="mt-5">
      <button
        type="button"
        disabled={isLoading}
        onClick={handleSignOut}
        className="
          inline-flex
          min-h-11
          items-center
          justify-center
          rounded-full
          border
          border-[#302d29]/20
          px-5
          py-2.5
          text-sm
          font-medium
          text-[#302d29]
          transition
          duration-200
          hover:border-[#302d29]/40
          hover:bg-[#302d29]/5
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