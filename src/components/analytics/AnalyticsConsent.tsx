"use client";

import Link from "next/link";
import Script from "next/script";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useState,
} from "react";

import type { Locale } from "@/i18n/config";

declare global {
  interface Window {
    dataLayer: unknown[];

    gtag?: (
      ...args: unknown[]
    ) => void;
  }
}

type AnalyticsConsentProps = {
  locale: Locale;
};

type ConsentChoice =
  | "accepted"
  | "rejected"
  | null;

type ConsentCopy = {
  title: string;
  description: string;
  accept: string;
  reject: string;
  privacy: string;
  settings: string;
  dialogLabel: string;
};

const CONSENT_STORAGE_KEY =
  "setareh-analytics-consent-v1";

const copyByLocale: Record<
  Locale,
  ConsentCopy
> = {
  en: {
    title:
      "Your privacy choices",

    description:
      "With your permission, this website uses Google Analytics to understand page visits and improve its content. Analytics is optional, advertising cookies are not used, and you may change your choice later.",

    accept:
      "Accept analytics",

    reject:
      "Reject analytics",

    privacy:
      "Privacy Policy",

    settings:
      "Cookie settings",

    dialogLabel:
      "Analytics cookie preferences",
  },

  de: {
    title:
      "Ihre Datenschutzeinstellungen",

    description:
      "Mit Ihrer Zustimmung verwendet diese Website Google Analytics, um Seitenaufrufe zu verstehen und Inhalte zu verbessern. Analytics ist freiwillig, Werbe-Cookies werden nicht verwendet und Sie können Ihre Auswahl später ändern.",

    accept:
      "Analytics akzeptieren",

    reject:
      "Analytics ablehnen",

    privacy:
      "Datenschutzerklärung",

    settings:
      "Cookie-Einstellungen",

    dialogLabel:
      "Einstellungen für Analyse-Cookies",
  },

  fa: {
    title:
      "انتخاب‌های حریم خصوصی شما",

    description:
      "این وب‌سایت فقط با اجازه شما از گوگل آنالیتیکس برای بررسی بازدید صفحات و بهبود محتوا استفاده می‌کند. استفاده از آنالیتیکس اختیاری است، کوکی تبلیغاتی فعال نمی‌شود و بعداً نیز می‌توانید انتخاب خود را تغییر دهید.",

    accept:
      "پذیرش آنالیتیکس",

    reject:
      "رد کردن آنالیتیکس",

    privacy:
      "سیاست حریم خصوصی",

    settings:
      "تنظیمات کوکی",

    dialogLabel:
      "تنظیمات کوکی‌های تحلیلی",
  },
};

function deleteAnalyticsCookies() {
  if (
    typeof document ===
      "undefined" ||
    typeof window ===
      "undefined"
  ) {
    return;
  }

  const cookieNames =
    document.cookie
      .split(";")
      .map((cookie) =>
        cookie
          .split("=")[0]
          ?.trim()
      )
      .filter(
        (cookieName) =>
          cookieName ===
            "_ga" ||
          cookieName?.startsWith(
            "_ga_"
          )
      );

  const hostname =
    window.location.hostname;

  const hostnameParts =
    hostname.split(".");

  const rootDomain =
    hostnameParts.length >= 2
      ? hostnameParts
          .slice(-2)
          .join(".")
      : hostname;

  const domains =
    Array.from(
      new Set([
        "",
        hostname,
        `.${hostname}`,
        rootDomain,
        `.${rootDomain}`,
      ])
    );

  cookieNames.forEach(
    (cookieName) => {
      if (!cookieName) {
        return;
      }

      domains.forEach(
        (domain) => {
          const domainAttribute =
            domain
              ? `; domain=${domain}`
              : "";

          document.cookie =
            `${cookieName}=; ` +
            "Max-Age=0; " +
            "path=/" +
            domainAttribute +
            "; SameSite=Lax";
        }
      );
    }
  );
}

export default function AnalyticsConsent({
  locale,
}: AnalyticsConsentProps) {
  const pathname =
    usePathname();

  const [
    consentChoice,
    setConsentChoice,
  ] =
    useState<ConsentChoice>(
      null
    );

  const [
    isPreferenceOpen,
    setIsPreferenceOpen,
  ] = useState(false);

  const [
    isStorageChecked,
    setIsStorageChecked,
  ] = useState(false);

  const [
    isGoogleTagReady,
    setIsGoogleTagReady,
  ] = useState(false);

  const measurementId =
    process.env
      .NEXT_PUBLIC_GA_MEASUREMENT_ID
      ?.trim();

  const hasValidMeasurementId =
    Boolean(
      measurementId &&
        /^G-[A-Z0-9]+$/i.test(
          measurementId
        )
    );

  const isProduction =
    process.env.NODE_ENV ===
    "production";

  const shouldLoadAnalytics =
    isStorageChecked &&
    consentChoice ===
      "accepted" &&
    hasValidMeasurementId &&
    isProduction;

  const currentCopy =
    copyByLocale[locale];

  const isPersian =
    locale === "fa";

  useEffect(() => {
    try {
      const savedChoice =
        window.localStorage.getItem(
          CONSENT_STORAGE_KEY
        );

      if (
        savedChoice ===
          "accepted" ||
        savedChoice ===
          "rejected"
      ) {
        setConsentChoice(
          savedChoice
        );
      }
    } catch {
      setConsentChoice(null);
    } finally {
      setIsStorageChecked(
        true
      );
    }
  }, []);

  useEffect(() => {
    if (
      !shouldLoadAnalytics ||
      !isGoogleTagReady ||
      !measurementId ||
      !window.gtag
    ) {
      return;
    }

    window.gtag(
      "event",
      "page_view",
      {
        page_title:
          document.title,

        page_location:
          window.location.href,

        page_path:
          pathname,
      }
    );
  }, [
    isGoogleTagReady,
    measurementId,
    pathname,
    shouldLoadAnalytics,
  ]);

  const saveChoice = (
    choice: Exclude<
      ConsentChoice,
      null
    >
  ) => {
    try {
      window.localStorage.setItem(
        CONSENT_STORAGE_KEY,
        choice
      );
    } catch {
      // The choice remains active
      // for the current page session.
    }

    setConsentChoice(choice);

    setIsPreferenceOpen(
      false
    );
  };

  const acceptAnalytics =
    () => {
      saveChoice("accepted");
    };

  const rejectAnalytics =
    () => {
      const wasPreviouslyAccepted =
        consentChoice ===
        "accepted";

      if (window.gtag) {
        window.gtag(
          "consent",
          "update",
          {
            analytics_storage:
              "denied",

            ad_storage:
              "denied",

            ad_user_data:
              "denied",

            ad_personalization:
              "denied",
          }
        );
      }

      deleteAnalyticsCookies();

      saveChoice("rejected");

      if (
        wasPreviouslyAccepted
      ) {
        window.setTimeout(
          () => {
            window.location.reload();
          },
          0
        );
      }
    };

  const showDialog =
    isStorageChecked &&
    (consentChoice ===
      null ||
      isPreferenceOpen);

  return (
    <>
      {shouldLoadAnalytics &&
      measurementId ? (
        <>
          <Script
            id="google-analytics-library"
            src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
            strategy="afterInteractive"
          />

          <Script
            id="google-analytics-initialization"
            strategy="afterInteractive"
            onReady={() => {
              setIsGoogleTagReady(
                true
              );
            }}
          >
            {`
              window.dataLayer = window.dataLayer || [];

              function gtag() {
                window.dataLayer.push(arguments);
              }

              window.gtag = gtag;

              gtag("js", new Date());

              gtag("consent", "default", {
                analytics_storage: "granted",
                ad_storage: "denied",
                ad_user_data: "denied",
                ad_personalization: "denied",
                functionality_storage: "granted",
                security_storage: "granted"
              });

              gtag("config", "${measurementId}", {
                send_page_view: false
              });
            `}
          </Script>
        </>
      ) : null}

      {showDialog ? (
        <div
          className="
            fixed
            inset-x-0
            bottom-0
            z-[100]
            p-4
            sm:p-6
          "
        >
          <div
            aria-hidden="true"
            className="
              absolute
              inset-0
              bg-[#183655]/10
              backdrop-blur-[2px]
            "
          />

          <section
            role="dialog"
            aria-modal="true"
            aria-label={
              currentCopy
                .dialogLabel
            }
            dir={
              isPersian
                ? "rtl"
                : "ltr"
            }
            className="
              relative
              mx-auto
              grid
              max-w-[1180px]
              gap-6
              rounded-[30px]
              border
              border-[#302d29]/15
              bg-[#f7f3ed]
              p-6
              shadow-[0_24px_80px_rgba(24,54,85,0.18)]
              sm:p-8
              lg:grid-cols-[minmax(0,1fr)_auto]
              lg:items-end
            "
          >
            <div>
              <p
                className={`
                  text-[#282521]
                  ${
                    isPersian
                      ? "font-sans text-[20px] font-[700] leading-[1.7]"
                      : "font-serif text-[28px] font-semibold leading-tight tracking-[-0.025em]"
                  }
                `}
              >
                {
                  currentCopy.title
                }
              </p>

              <p
                className={`
                  mt-3
                  max-w-[760px]
                  text-[#5f5851]
                  ${
                    isPersian
                      ? "font-sans text-[13px] leading-[2]"
                      : "font-sans text-[13px] leading-[1.8]"
                  }
                `}
              >
                {
                  currentCopy
                    .description
                }
              </p>

              <Link
                href={`/${locale}/privacy`}
                className="
                  mt-4
                  inline-flex
                  min-h-10
                  items-center
                  font-sans
                  text-[12px]
                  font-semibold
                  text-[#2e5d91]
                  underline
                  decoration-[#2e5d91]/35
                  underline-offset-4
                  transition-colors
                  hover:text-[#183655]
                "
              >
                {
                  currentCopy.privacy
                }
              </Link>
            </div>

            <div
              className="
                flex
                flex-col-reverse
                gap-3
                sm:flex-row
                lg:justify-end
              "
            >
              <button
                type="button"
                onClick={
                  rejectAnalytics
                }
                className="
                  min-h-[50px]
                  rounded-full
                  border
                  border-[#302d29]/18
                  bg-transparent
                  px-6
                  font-sans
                  text-[13px]
                  font-semibold
                  text-[#3f3a35]
                  transition-all
                  duration-300
                  hover:border-[#183655]
                  hover:text-[#183655]
                  focus-visible:outline-none
                  focus-visible:ring-4
                  focus-visible:ring-[#2e5d91]/15
                "
              >
                {
                  currentCopy.reject
                }
              </button>

              <button
                type="button"
                onClick={
                  acceptAnalytics
                }
                className="
                  min-h-[50px]
                  rounded-full
                  border
                  border-[#183655]
                  bg-[#183655]
                  px-7
                  font-sans
                  text-[13px]
                  font-semibold
                  text-white
                  shadow-[0_12px_28px_rgba(24,54,85,0.16)]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-[#2e5d91]
                  hover:bg-[#2e5d91]
                  focus-visible:outline-none
                  focus-visible:ring-4
                  focus-visible:ring-[#2e5d91]/20
                "
              >
                {
                  currentCopy.accept
                }
              </button>
            </div>
          </section>
        </div>
      ) : null}

      {isStorageChecked &&
      consentChoice !== null &&
      !isPreferenceOpen ? (
        <button
          type="button"
          onClick={() => {
            setIsPreferenceOpen(
              true
            );
          }}
          className={`
            fixed
            bottom-4
            z-[90]
            min-h-10
            rounded-full
            border
            border-[#302d29]/15
            bg-[#f7f3ed]/95
            px-4
            font-sans
            text-[11px]
            font-semibold
            text-[#514b45]
            shadow-[0_10px_28px_rgba(24,54,85,0.12)]
            backdrop-blur-md
            transition-all
            duration-300
            hover:border-[#2e5d91]
            hover:text-[#2e5d91]
            focus-visible:outline-none
            focus-visible:ring-4
            focus-visible:ring-[#2e5d91]/15
            ${
              isPersian
                ? "right-4"
                : "left-4"
            }
          `}
        >
          {
            currentCopy.settings
          }
        </button>
      ) : null}
    </>
  );
}