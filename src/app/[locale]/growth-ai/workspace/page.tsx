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

import { createClient } from "@/lib/supabase/server";

import { createGrowthAIWorkspace } from "./actions";


type GrowthAIWorkspacePageProps = {
  params: Promise<{
    locale: string;
  }>;

  searchParams: Promise<{
    onboardingError?:
      | string
      | string[];
  }>;
};


export default async function GrowthAIWorkspacePage({
  params,
  searchParams,
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


  // ======================================================
  // READ URL STATE
  // ======================================================

  const resolvedSearchParams =
    await searchParams;

  const rawOnboardingError =
    resolvedSearchParams
      .onboardingError;

  const onboardingErrorCode =
    Array.isArray(
      rawOnboardingError,
    )
      ? rawOnboardingError[0]
      : rawOnboardingError;


  let onboardingErrorMessage:
    | string
    | null = null;

  switch (
    onboardingErrorCode
  ) {
    case "invalidOrganizationName":
      onboardingErrorMessage =
        dictionary
          .growthAI
          .onboarding
          .errors
          .invalidOrganizationName;
      break;

    case "invalidBusinessName":
      onboardingErrorMessage =
        dictionary
          .growthAI
          .onboarding
          .errors
          .invalidBusinessName;
      break;

    case "invalidWebsiteUrl":
      onboardingErrorMessage =
        dictionary
          .growthAI
          .onboarding
          .errors
          .invalidWebsiteUrl;
      break;

    case "creationFailed":
      onboardingErrorMessage =
        dictionary
          .growthAI
          .onboarding
          .errors
          .creationFailed;
      break;

    default:
      onboardingErrorMessage =
        null;
  }


  // ======================================================
  // SUPABASE
  // ======================================================

  const supabase =
    await createClient();


  // ======================================================
  // FIND USER ORGANIZATION MEMBERSHIP
  //
  // RLS ensures the authenticated user only sees
  // memberships they are allowed to access.
  // ======================================================

  const {
    data: memberships,
    error: membershipError,
  } =
    await supabase
      .from(
        "organization_members",
      )
      .select(
        "organization_id, role",
      )
      .limit(1);


  if (membershipError) {
    console.error(
      "Growth AI membership lookup failed:",
      membershipError,
    );

    throw new Error(
      "Growth AI workspace could not be loaded.",
    );
  }


  const membership =
    memberships?.[0] ?? null;


  // ======================================================
  // NO ORGANIZATION
  // SHOW FIRST-TIME ONBOARDING
  // ======================================================

  if (!membership) {
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
          py-12
          sm:px-8
          sm:py-16
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
            max-w-[760px]
            rounded-[28px]
            border
            border-[#302d29]/12
            bg-[#f4efe8]
            p-6
            sm:p-8
            lg:p-10
          "
        >
          {/* ---------------------------------------------
              HEADER
          ---------------------------------------------- */}

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
                .onboarding
                .eyebrow
            }
          </p>


          <h1
            className="
              mt-5
              max-w-2xl
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
                .onboarding
                .title
            }
          </h1>


          <p
            className="
              mt-5
              max-w-2xl
              text-sm
              leading-7
              text-[#302d29]/65
              sm:text-[15px]
            "
          >
            {
              dictionary
                .growthAI
                .onboarding
                .description
            }
          </p>


          {/* ---------------------------------------------
              AUTH STATUS
          ---------------------------------------------- */}

          <div
            className="
              mt-8
              flex
              items-center
              gap-3
              rounded-[18px]
              border
              border-[#302d29]/10
              bg-white/40
              px-4
              py-3
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
                text-xs
                font-medium
                text-[#302d29]/70
                sm:text-sm
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


          {/* ---------------------------------------------
              ERROR
          ---------------------------------------------- */}

          {onboardingErrorMessage ? (
            <div
              role="alert"
              aria-live="polite"
              className="
                mt-6
                rounded-[18px]
                border
                border-[#8b4c3c]/20
                bg-[#8b4c3c]/5
                px-4
                py-3
                text-sm
                leading-6
                text-[#713d31]
              "
            >
              {
                onboardingErrorMessage
              }
            </div>
          ) : null}


          {/* ---------------------------------------------
              ONBOARDING FORM
          ---------------------------------------------- */}

          <form
            action={
              createGrowthAIWorkspace
            }
            className="
              mt-8
              space-y-6
            "
          >
            <input
              type="hidden"
              name="locale"
              value={locale}
            />


            {/* ORGANIZATION */}

            <div>
              <label
                htmlFor="organizationName"
                className="
                  block
                  text-sm
                  font-medium
                  text-[#302d29]
                "
              >
                {
                  dictionary
                    .growthAI
                    .onboarding
                    .organizationName
                }
              </label>

              <input
                id="organizationName"
                name="organizationName"
                type="text"
                required
                minLength={1}
                maxLength={120}
                autoComplete="organization"
                placeholder={
                  dictionary
                    .growthAI
                    .onboarding
                    .organizationNamePlaceholder
                }
                className="
                  mt-2
                  w-full
                  rounded-[16px]
                  border
                  border-[#302d29]/15
                  bg-white/60
                  px-4
                  py-3.5
                  text-[15px]
                  text-[#302d29]
                  outline-none
                  transition
                  placeholder:text-[#302d29]/35
                  focus:border-[#68705a]/60
                  focus:bg-white/80
                "
              />
            </div>


            {/* BUSINESS */}

            <div>
              <label
                htmlFor="businessName"
                className="
                  block
                  text-sm
                  font-medium
                  text-[#302d29]
                "
              >
                {
                  dictionary
                    .growthAI
                    .onboarding
                    .businessName
                }
              </label>

              <input
                id="businessName"
                name="businessName"
                type="text"
                required
                minLength={1}
                maxLength={160}
                placeholder={
                  dictionary
                    .growthAI
                    .onboarding
                    .businessNamePlaceholder
                }
                className="
                  mt-2
                  w-full
                  rounded-[16px]
                  border
                  border-[#302d29]/15
                  bg-white/60
                  px-4
                  py-3.5
                  text-[15px]
                  text-[#302d29]
                  outline-none
                  transition
                  placeholder:text-[#302d29]/35
                  focus:border-[#68705a]/60
                  focus:bg-white/80
                "
              />
            </div>


            {/* WEBSITE */}

            <div>
              <label
                htmlFor="websiteUrl"
                className="
                  block
                  text-sm
                  font-medium
                  text-[#302d29]
                "
              >
                {
                  dictionary
                    .growthAI
                    .onboarding
                    .websiteUrl
                }
              </label>

              <input
                id="websiteUrl"
                name="websiteUrl"
                type="text"
                inputMode="url"
                required
                maxLength={2048}
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                dir="ltr"
                placeholder={
                  dictionary
                    .growthAI
                    .onboarding
                    .websiteUrlPlaceholder
                }
                className="
                  mt-2
                  w-full
                  rounded-[16px]
                  border
                  border-[#302d29]/15
                  bg-white/60
                  px-4
                  py-3.5
                  text-left
                  text-[15px]
                  text-[#302d29]
                  outline-none
                  transition
                  placeholder:text-[#302d29]/35
                  focus:border-[#68705a]/60
                  focus:bg-white/80
                "
              />

              <p
                className="
                  mt-2
                  text-xs
                  leading-5
                  text-[#302d29]/50
                "
              >
                {
                  dictionary
                    .growthAI
                    .onboarding
                    .websiteHint
                }
              </p>
            </div>


            {/* SUBMIT */}

            <button
              type="submit"
              className="
                inline-flex
                min-h-12
                w-full
                items-center
                justify-center
                rounded-[16px]
                bg-[#302d29]
                px-5
                py-3
                text-sm
                font-medium
                text-[#f6f1ea]
                transition
                hover:bg-[#413d38]
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-[#302d29]
                sm:w-auto
              "
            >
              {
                dictionary
                  .growthAI
                  .onboarding
                  .submit
              }
            </button>
          </form>


          {/* ---------------------------------------------
              SIGN OUT
          ---------------------------------------------- */}

          <div
            className="
              mt-8
              border-t
              border-[#302d29]/10
              pt-6
            "
          >
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
          </div>
        </section>
      </main>
    );
  }


  // ======================================================
  // EXISTING WORKSPACE
  // ======================================================

  const [
    organizationResult,
    businessResult,
  ] =
    await Promise.all([
      supabase
        .from("organizations")
        .select("id, name")
        .eq(
          "id",
          membership.organization_id,
        )
        .maybeSingle(),

      supabase
        .from("businesses")
        .select(
          "id, name, website_url",
        )
        .eq(
          "organization_id",
          membership.organization_id,
        )
        .limit(1)
        .maybeSingle(),
    ]);


  if (
    organizationResult.error
  ) {
    console.error(
      "Growth AI organization lookup failed:",
      organizationResult.error,
    );

    throw new Error(
      "Growth AI organization could not be loaded.",
    );
  }


  if (businessResult.error) {
    console.error(
      "Growth AI business lookup failed:",
      businessResult.error,
    );

    throw new Error(
      "Growth AI business could not be loaded.",
    );
  }


  const organization =
    organizationResult.data;

  const business =
    businessResult.data;


  // ======================================================
  // WORKSPACE UI
  // ======================================================

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


        {/* ---------------------------------------------
            BUSINESS CONTEXT
        ---------------------------------------------- */}

        <div
          className="
            mt-6
            grid
            gap-4
            sm:grid-cols-2
          "
        >
          {organization ? (
            <div
              className="
                rounded-[20px]
                border
                border-[#302d29]/10
                bg-white/35
                p-5
              "
            >
              <p
                className="
                  text-xs
                  text-[#302d29]/50
                "
              >
                {
                  dictionary
                    .growthAI
                    .onboarding
                    .organizationName
                }
              </p>

              <p
                className="
                  mt-2
                  text-base
                  font-medium
                  text-[#302d29]
                "
              >
                {organization.name}
              </p>
            </div>
          ) : null}


          {business ? (
            <div
              className="
                rounded-[20px]
                border
                border-[#302d29]/10
                bg-white/35
                p-5
              "
            >
              <p
                className="
                  text-xs
                  text-[#302d29]/50
                "
              >
                {
                  dictionary
                    .growthAI
                    .onboarding
                    .businessName
                }
              </p>

              <p
                className="
                  mt-2
                  text-base
                  font-medium
                  text-[#302d29]
                "
              >
                {business.name}
              </p>

              {business.website_url ? (
                <p
                  dir="ltr"
                  className="
                    mt-2
                    break-all
                    text-sm
                    text-[#302d29]/55
                  "
                >
                  {
                    business.website_url
                  }
                </p>
              ) : null}
            </div>
          ) : null}
        </div>


        <p
          className="
            mt-6
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