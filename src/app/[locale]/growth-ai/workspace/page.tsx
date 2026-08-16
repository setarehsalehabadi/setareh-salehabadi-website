import { notFound } from "next/navigation";

import SignOutButton from "@/components/growth-ai/SignOutButton";

import {
  isLocale,
  type Locale,
} from "@/i18n/config";

import {
  getDictionary,
  type Dictionary,
} from "@/i18n/get-dictionary";

type GrowthAIWorkspacePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function GrowthAIWorkspacePage({
  params,
}: GrowthAIWorkspacePageProps) {
  const {
    locale: localeParam,
  } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale =
    localeParam;

  const dictionary =
    (await getDictionary(
      locale,
    )) as Dictionary;

  const isPersian =
    locale === "fa";

  return (
    <main
      dir={
        isPersian
          ? "rtl"
          : "ltr"
      }
      className={`
        min-h-screen
        bg-[#ebe4da]
        px-5
        py-16
        sm:px-8
        lg:px-12
        ${
          isPersian
            ? "font-fa"
            : ""
        }
      `}
    >
      <section
        className="
          mx-auto
          max-w-[980px]
          rounded-[28px]
          border
          border-[#302d29]/12
          bg-[#f4efe8]
          p-6
          sm:p-8
          lg:p-10
        "
      >
        <p
          className="
            text-[11px]
            font-medium
            uppercase
            tracking-[0.18em]
            text-[#302d29]/55
          "
        >
          {
            dictionary
              .growthAI
              .eyebrow
          }
        </p>

        <h1
          className="
            mt-5
            max-w-3xl
            text-3xl
            font-medium
            leading-[1.2]
            text-[#302d29]
            sm:text-4xl
          "
        >
          {
            dictionary
              .growthAI
              .title
          }
        </h1>

        <div
          className="
            mt-8
            flex
            items-center
            gap-3
            rounded-[20px]
            border
            border-[#302d29]/12
            bg-white/45
            px-5
            py-4
          "
        >
          <span
            aria-hidden="true"
            className="
              h-2
              w-2
              shrink-0
              rounded-full
              bg-[#68705a]
            "
          />

          <span
            className="
              text-sm
              font-medium
              text-[#302d29]
            "
          >
            {
              dictionary
                .growthAI
                .auth
                .connectedStatus
            }
          </span>
        </div>

        <p
          className="
            mt-5
            max-w-2xl
            text-sm
            leading-7
            text-[#302d29]/65
          "
        >
          {
            dictionary
              .growthAI
              .status
          }
        </p>

        <SignOutButton
          label={
            dictionary
              .growthAI
              .auth
              .signOut
          }
          loadingLabel={
            dictionary
              .growthAI
              .auth
              .signingOut
          }
          errorMessage={
            dictionary
              .growthAI
              .auth
              .signOutError
          }
        />
      </section>
    </main>
  );
}