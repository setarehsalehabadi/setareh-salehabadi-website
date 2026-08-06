"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useState,
} from "react";

import {
  defaultLocale,
  isLocale,
  locales,
  localeShortLabels,
  type Locale,
} from "@/i18n/config";

import en from "@/i18n/dictionaries/en";

import type {
  Dictionary,
} from "@/i18n/get-dictionary";

type HeaderProps = {
  locale?: Locale;
  dictionary?: Dictionary["header"];
  common?: Dictionary["common"];
};

type AccessibilityLabels = {
  primaryNavigation: string;
  mobileNavigation: string;
  languageSwitcher: string;
  disabledNavigation: string;
};

type SelfPacedLearningLabel = {
  title: string;
  status: string;
};

const accessibilityLabels: Record<
  Locale,
  AccessibilityLabels
> = {
  en: {
    primaryNavigation:
      "Primary navigation",

    mobileNavigation:
      "Mobile navigation",

    languageSwitcher:
      "Select language",

    disabledNavigation:
      "Currently unavailable",
  },

  de: {
    primaryNavigation:
      "Hauptnavigation",

    mobileNavigation:
      "Mobile Navigation",

    languageSwitcher:
      "Sprache auswählen",

    disabledNavigation:
      "Derzeit nicht verfügbar",
  },

  fa: {
    primaryNavigation:
      "ناوبری اصلی",

    mobileNavigation:
      "ناوبری موبایل",

    languageSwitcher:
      "انتخاب زبان",

    disabledNavigation:
      "در حال حاضر غیرفعال",
  },
};

const selfPacedLearningLabels: Record<
  Locale,
  SelfPacedLearningLabel
> = {
  en: {
    title:
      "Self-Paced Learning",

    status:
      "Coming soon",
  },

  de: {
    title:
      "Selbstlernkurse",

    status:
      "Demnächst",
  },

  fa: {
    title:
      "آموزش‌های خودآموز",

    status:
      "به‌زودی",
  },
};

const confirmedNavigationRoutes: Record<
  string,
  string
> = {
  "#about":
    "/about",

  "/about":
    "/about",

  "#expertise":
    "/expertise",

  "/expertise":
    "/expertise",

  "#growth-system":
    "/growth-system",

  "/growth-system":
    "/growth-system",

  "#projects":
    "/case-studies",

  "#case-studies":
    "/case-studies",

  "#selected-projects":
    "/case-studies",

  "#work":
    "/case-studies",

  "/projects":
    "/case-studies",

  "/case-studies":
    "/case-studies",

  "/selected-projects":
    "/case-studies",

  "#research":
    "/research",

  "#insights":
    "/research",

  "#research-lab":
    "/research",

  "/research":
    "/research",

  "/insights":
    "/research",

  "/research-lab":
    "/research",
};

function getLocalizedPath(
  pathname: string,
  targetLocale: Locale,
): string {
  const segments =
    pathname.split("/");

  const currentLocale =
    segments[1];

  if (
    currentLocale &&
    isLocale(
      currentLocale,
    )
  ) {
    segments[1] =
      targetLocale;
  } else {
    segments.splice(
      1,
      0,
      targetLocale,
    );
  }

  const localizedPath =
    segments.join("/");

  return (
    localizedPath ||
    `/${targetLocale}`
  );
}

function getNavigationHref(
  href: string,
  locale: Locale,
): string {
  const trimmedHref =
    href.trim();

  if (
    !trimmedHref
  ) {
    return `/${locale}`;
  }

  if (
    /^(?:https?:\/\/|mailto:|tel:)/i.test(
      trimmedHref,
    )
  ) {
    return trimmedHref;
  }

  const hashIndex =
    trimmedHref.indexOf(
      "#",
    );

  const pathPart =
    hashIndex >= 0
      ? trimmedHref.slice(
          0,
          hashIndex,
        )
      : trimmedHref;

  const hashPart =
    hashIndex >= 0
      ? trimmedHref.slice(
          hashIndex,
        )
      : "";

  const pathSegments =
    pathPart
      .split("/")
      .filter(Boolean);

  if (
    pathSegments[0] &&
    isLocale(
      pathSegments[0],
    )
  ) {
    pathSegments.shift();
  }

  const normalizedPath =
    pathSegments.length > 0
      ? `/${pathSegments.join(
          "/",
        )}`
      : "";

  const normalizedHref =
    `${normalizedPath}${hashPart}`
      .toLowerCase();

  const confirmedRoute =
    confirmedNavigationRoutes[
      normalizedHref
    ];

  if (
    confirmedRoute
  ) {
    return `/${locale}${confirmedRoute}`;
  }

  if (
    hashPart &&
    pathSegments.length === 0
  ) {
    return `/${locale}${hashPart}`;
  }

  if (
    pathSegments.length > 0
  ) {
    return `/${locale}/${pathSegments.join(
      "/",
    )}${hashPart}`;
  }

  return `/${locale}`;
}

function formatNavigationIndex(
  index: number,
  locale: Locale,
): string {
  return new Intl.NumberFormat(
    locale === "fa"
      ? "fa-IR"
      : locale,
    {
      minimumIntegerDigits:
        2,

      useGrouping:
        false,
    },
  ).format(
    index + 1,
  );
}

export default function Header({
  locale = defaultLocale,
  dictionary = en.header,
  common = en.common,
}: HeaderProps) {
  const pathname =
    usePathname();

  const [
    isScrolled,
    setIsScrolled,
  ] = useState(false);

  const [
    isMenuOpen,
    setIsMenuOpen,
  ] = useState(false);

  const accessibility =
    accessibilityLabels[
      locale
    ];

  const selfPacedLearning =
    selfPacedLearningLabels[
      locale
    ];

  const isPersian =
    locale === "fa";

  const researchHref =
    `/${locale}/research`;

  const researchLabel =
    "مطالعه پژوهش‌ها";

  const workInquiryHref =
    `mailto:${common.email}?subject=${encodeURIComponent(
      "Work inquiry — Setareh Salehabadi",
    )}`;

  const mobileFooterHref =
    isPersian
      ? `/${locale}#newsletter`
      : `mailto:${common.email}`;

  const mobileFooterLabel =
    isPersian
      ? "خبرنامه"
      : common.emailLabel;

  useEffect(() => {
    const handleScroll =
      () => {
        setIsScrolled(
          window.scrollY >
            20,
        );
      };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive:
          true,
      },
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );
    };
  }, []);

  useEffect(() => {
    const handleResize =
      () => {
        if (
          window.innerWidth >=
          1024
        ) {
          setIsMenuOpen(
            false,
          );
        }
      };

    window.addEventListener(
      "resize",
      handleResize,
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize,
      );
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      isMenuOpen
        ? "hidden"
        : "";

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [
    isMenuOpen,
  ]);

  const closeMenu =
    () => {
      setIsMenuOpen(
        false,
      );
    };

  const desktopActionClassName = `
    group
    hidden
    h-12
    w-[192px]
    shrink-0
    items-center
    justify-center
    gap-3
    rounded-full
    border
    border-[#183655]
    bg-[#183655]
    px-6
    font-sans
    text-[13px]
    font-semibold
    leading-none
    shadow-[0_12px_28px_rgba(24,54,85,0.15)]
    transition-all
    duration-300
    hover:-translate-y-0.5
    hover:border-[#2e5d91]
    hover:bg-[#2e5d91]
    hover:shadow-[0_17px_34px_rgba(46,93,145,0.22)]
    focus-visible:outline-none
    focus-visible:ring-4
    focus-visible:ring-[#2e5d91]/20
    lg:inline-flex
  `;

  const mobileActionClassName = `
    group
    mt-7
    inline-flex
    min-h-[58px]
    w-full
    items-center
    justify-center
    gap-3
    rounded-full
    border
    border-[#183655]
    bg-[#183655]
    px-8
    font-sans
    text-[15px]
    font-semibold
    leading-none
    shadow-[0_14px_30px_rgba(24,54,85,0.18)]
    transition-all
    duration-300
    hover:border-[#2e5d91]
    hover:bg-[#2e5d91]
    hover:shadow-[0_18px_38px_rgba(46,93,145,0.24)]
    focus-visible:outline-none
    focus-visible:ring-4
    focus-visible:ring-[#2e5d91]/20
    sm:w-auto
    sm:text-[16px]
  `;

  return (
    <>
      <header
        className={`
          fixed
          inset-x-0
          top-0
          z-50
          border-b
          border-[#302d29]/10
          transition-all
          duration-500
          ${
            isScrolled
              ? "bg-[#f7f3ed]/92 shadow-[0_12px_34px_rgba(48,43,37,0.07)] backdrop-blur-xl"
              : "bg-[#f7f3ed]"
          }
        `}
      >
        <div
          className="
            mx-auto
            flex
            h-[76px]
            max-w-[1480px]
            items-center
            justify-between
            px-5
            sm:px-8
            lg:h-[84px]
            lg:px-12
            xl:px-16
          "
        >
          <Link
            href={`/${locale}`}
            aria-label={`${common.brandName} — ${common.backToTop}`}
            onClick={
              closeMenu
            }
            dir="ltr"
            className="
              group
              relative
              z-50
              inline-flex
              min-w-0
              shrink-0
              items-center
              gap-3
              rounded-xl
              focus-visible:outline-none
              focus-visible:ring-4
              focus-visible:ring-[#2e5d91]/15
              sm:gap-4
            "
          >
            <span
              aria-hidden="true"
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-[#183655]/28
                bg-[#f7f3ed]
                font-serif
                text-[13px]
                font-semibold
                italic
                tracking-[-0.03em]
                text-[#183655]
                transition-all
                duration-300
                group-hover:border-[#2e5d91]
                group-hover:text-[#2e5d91]
                sm:h-12
                sm:w-12
                sm:text-[14px]
              "
            >
              SS
            </span>

            <span
              className="
                hidden
                min-w-0
                flex-col
                justify-center
                sm:flex
              "
            >
              <span
                className="
                  whitespace-nowrap
                  font-serif
                  text-[14px]
                  font-semibold
                  uppercase
                  leading-none
                  tracking-[0.22em]
                  text-[#183655]
                  transition-colors
                  duration-300
                  group-hover:text-[#2e5d91]
                  lg:text-[15px]
                "
              >
                Setareh Salehabadi
              </span>

              <span
                className="
                  mt-2
                  whitespace-nowrap
                  font-sans
                  text-[7px]
                  font-semibold
                  uppercase
                  leading-none
                  tracking-[0.27em]
                  text-[#b4853b]
                  lg:text-[8px]
                "
              >
                Digital Growth Strategist
              </span>
            </span>
          </Link>

          <nav
            aria-label={
              accessibility
                .primaryNavigation
            }
            className="
              hidden
              items-center
              gap-1
              lg:flex
            "
          >
            {dictionary.navigation.map(
              (
                item,
              ) => (
                <Link
                  key={
                    item.label
                  }
                  href={getNavigationHref(
                    item.href,
                    locale,
                  )}
                  className="
                    group
                    relative
                    inline-flex
                    min-h-[44px]
                    items-center
                    justify-center
                    rounded-full
                    px-4
                    font-sans
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.09em]
                    text-[#49443f]
                    transition-all
                    duration-300
                    hover:bg-[#ebe4da]
                    hover:text-[#2e5d91]
                    focus-visible:outline-none
                    focus-visible:ring-4
                    focus-visible:ring-[#2e5d91]/15
                  "
                >
                  <span>
                    {
                      item.label
                    }
                  </span>

                  <span
                    aria-hidden="true"
                    className="
                      absolute
                      bottom-[5px]
                      left-1/2
                      h-px
                      w-0
                      -translate-x-1/2
                      bg-[#2e5d91]
                      transition-all
                      duration-300
                      group-hover:w-[calc(100%-2rem)]
                    "
                  />
                </Link>
              ),
            )}
          </nav>

          <div
            className="
              relative
              z-50
              flex
              items-center
              gap-2
              sm:gap-3
            "
          >
            <div
              dir="ltr"
              role="group"
              aria-label={
                accessibility
                  .languageSwitcher
              }
              className="
                hidden
                items-center
                rounded-full
                border
                border-[#302d29]/12
                bg-[#ebe4da]/75
                p-1
                sm:flex
              "
            >
              {locales.map(
                (
                  targetLocale,
                ) => {
                  const isActive =
                    targetLocale ===
                    locale;

                  return (
                    <Link
                      key={
                        targetLocale
                      }
                      href={getLocalizedPath(
                        pathname,
                        targetLocale,
                      )}
                      hrefLang={
                        targetLocale
                      }
                      aria-current={
                        isActive
                          ? "page"
                          : undefined
                      }
                      onClick={
                        closeMenu
                      }
                      className={`
                        flex
                        h-8
                        min-w-8
                        items-center
                        justify-center
                        rounded-full
                        px-2
                        font-sans
                        text-[9px]
                        font-bold
                        tracking-[0.12em]
                        transition-all
                        duration-300
                        focus-visible:outline-none
                        focus-visible:ring-4
                        focus-visible:ring-[#2e5d91]/15
                        ${
                          isActive
                            ? "bg-[#183655] text-white shadow-[0_6px_14px_rgba(24,54,85,0.15)]"
                            : "text-[#6e675f] hover:bg-[#f7f3ed] hover:text-[#2e5d91]"
                        }
                      `}
                    >
                      <span
                        style={{
                          color:
                            isActive
                              ? "#ffffff"
                              : undefined,
                        }}
                      >
                        {
                          localeShortLabels[
                            targetLocale
                          ]
                        }
                      </span>
                    </Link>
                  );
                },
              )}
            </div>

            {isPersian ? (
              <Link
                href={
                  researchHref
                }
                aria-label={
                  researchLabel
                }
                className={
                  desktopActionClassName
                }
                style={{
                  color:
                    "#ffffff",
                }}
              >
                <span
                  className="
                    whitespace-nowrap
                  "
                  style={{
                    color:
                      "#ffffff",
                  }}
                >
                  {
                    researchLabel
                  }
                </span>

                <span
                  aria-hidden="true"
                  className="
                    text-[16px]
                    transition-transform
                    duration-300
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  "
                  style={{
                    color:
                      "#ffffff",
                  }}
                >
                  ↗
                </span>
              </Link>
            ) : (
              <a
                href={
                  workInquiryHref
                }
                aria-label={`${dictionary.workWithMe} — ${common.email}`}
                className={
                  desktopActionClassName
                }
                style={{
                  color:
                    "#ffffff",
                }}
              >
                <span
                  className="
                    whitespace-nowrap
                  "
                  style={{
                    color:
                      "#ffffff",
                  }}
                >
                  {
                    dictionary
                      .workWithMe
                  }
                </span>

                <span
                  aria-hidden="true"
                  className="
                    text-[16px]
                    transition-transform
                    duration-300
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  "
                  style={{
                    color:
                      "#ffffff",
                  }}
                >
                  ↗
                </span>
              </a>
            )}

            <button
              type="button"
              aria-label={
                isMenuOpen
                  ? dictionary
                      .closeMenu
                  : dictionary
                      .openMenu
              }
              aria-expanded={
                isMenuOpen
              }
              aria-controls="mobile-navigation"
              onClick={() =>
                setIsMenuOpen(
                  (
                    current,
                  ) =>
                    !current,
                )
              }
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                border-[#302d29]/15
                bg-[#ebe4da]
                text-[#282521]
                transition-all
                duration-300
                hover:border-[#2e5d91]
                hover:bg-[#2e5d91]
                hover:text-white
                focus-visible:outline-none
                focus-visible:ring-4
                focus-visible:ring-[#2e5d91]/15
                lg:hidden
              "
            >
              <span
                className="
                  relative
                  block
                  h-4
                  w-5
                "
              >
                <span
                  className={`
                    absolute
                    left-0
                    top-[2px]
                    h-px
                    w-5
                    bg-current
                    transition-all
                    duration-300
                    ${
                      isMenuOpen
                        ? "translate-y-[6px] rotate-45"
                        : "translate-y-0 rotate-0"
                    }
                  `}
                />

                <span
                  className={`
                    absolute
                    left-0
                    top-[8px]
                    h-px
                    bg-current
                    transition-all
                    duration-300
                    ${
                      isMenuOpen
                        ? "w-0 opacity-0"
                        : "w-5 opacity-100"
                    }
                  `}
                />

                <span
                  className={`
                    absolute
                    left-0
                    top-[14px]
                    h-px
                    w-5
                    bg-current
                    transition-all
                    duration-300
                    ${
                      isMenuOpen
                        ? "-translate-y-[6px] -rotate-45"
                        : "translate-y-0 rotate-0"
                    }
                  `}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-navigation"
        className={`
          fixed
          inset-0
          z-40
          overflow-y-auto
          bg-[#ebe4da]
          px-5
          pb-8
          pt-[104px]
          transition-all
          duration-500
          sm:px-8
          lg:hidden
          ${
            isMenuOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-4 opacity-0"
          }
        `}
      >
        <div
          className="
            mx-auto
            flex
            min-h-full
            max-w-[720px]
            flex-col
            border-t
            border-[#302d29]/15
          "
        >
          <nav
            aria-label={
              accessibility
                .mobileNavigation
            }
          >
            <ul>
              {dictionary.navigation.map(
                (
                  item,
                  index,
                ) => (
                  <li
                    key={
                      item.label
                    }
                    className="
                      border-b
                      border-[#302d29]/15
                    "
                  >
                    <Link
                      href={getNavigationHref(
                        item.href,
                        locale,
                      )}
                      onClick={
                        closeMenu
                      }
                      className="
                        group
                        grid
                        min-h-[78px]
                        grid-cols-[44px_minmax(0,1fr)_40px]
                        items-center
                        gap-3
                        focus-visible:outline-none
                        focus-visible:ring-4
                        focus-visible:ring-[#2e5d91]/15
                      "
                    >
                      <span
                        className="
                          font-sans
                          text-[10px]
                          font-semibold
                          tracking-[0.18em]
                          text-[#9a9187]
                        "
                      >
                        {formatNavigationIndex(
                          index,
                          locale,
                        )}
                      </span>

                      <span
                        className="
                          font-serif
                          text-[clamp(1.7rem,7vw,2.35rem)]
                          font-medium
                          tracking-[-0.035em]
                          text-[#282521]
                          transition-colors
                          duration-300
                          group-hover:text-[#2e5d91]
                        "
                      >
                        {
                          item.label
                        }
                      </span>

                      <span
                        aria-hidden="true"
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-[#302d29]/15
                          text-sm
                          text-[#2e5d91]
                          transition-all
                          duration-300
                          group-hover:border-[#2e5d91]
                          group-hover:bg-[#2e5d91]
                          group-hover:text-white
                        "
                      >
                        ↗
                      </span>
                    </Link>
                  </li>
                ),
              )}

              <li
                className="
                  border-b
                  border-[#302d29]/15
                "
              >
                <span
                  role="link"
                  aria-disabled="true"
                  aria-label={`${selfPacedLearning.title} — ${accessibility.disabledNavigation}`}
                  className="
                    grid
                    min-h-[78px]
                    cursor-default
                    select-none
                    grid-cols-[44px_minmax(0,1fr)_auto]
                    items-center
                    gap-3
                    opacity-65
                  "
                >
                  <span
                    className="
                      font-sans
                      text-[10px]
                      font-semibold
                      tracking-[0.18em]
                      text-[#9a9187]
                    "
                  >
                    {formatNavigationIndex(
                      dictionary
                        .navigation
                        .length,
                      locale,
                    )}
                  </span>

                  <span
                    className="
                      font-serif
                      text-[clamp(1.55rem,6.5vw,2.15rem)]
                      font-medium
                      tracking-[-0.035em]
                      text-[#514c46]
                    "
                  >
                    {
                      selfPacedLearning
                        .title
                    }
                  </span>

                  <span
                    className="
                      rounded-full
                      border
                      border-[#8a672f]/20
                      bg-[#f7f3ed]/50
                      px-3
                      py-2
                      font-sans
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-[#8a672f]
                    "
                  >
                    {
                      selfPacedLearning
                        .status
                    }
                  </span>
                </span>
              </li>
            </ul>
          </nav>

          <div
            className="
              mt-auto
              pt-8
            "
          >
            <div
              dir="ltr"
              role="group"
              aria-label={
                accessibility
                  .languageSwitcher
              }
              className="
                flex
                w-fit
                items-center
                rounded-full
                border
                border-[#302d29]/15
                bg-[#f7f3ed]/70
                p-1.5
                sm:hidden
              "
            >
              {locales.map(
                (
                  targetLocale,
                ) => {
                  const isActive =
                    targetLocale ===
                    locale;

                  return (
                    <Link
                      key={
                        targetLocale
                      }
                      href={getLocalizedPath(
                        pathname,
                        targetLocale,
                      )}
                      hrefLang={
                        targetLocale
                      }
                      aria-current={
                        isActive
                          ? "page"
                          : undefined
                      }
                      onClick={
                        closeMenu
                      }
                      className={`
                        flex
                        h-10
                        min-w-12
                        items-center
                        justify-center
                        rounded-full
                        px-3
                        font-sans
                        text-[11px]
                        font-bold
                        tracking-[0.12em]
                        transition-all
                        duration-300
                        focus-visible:outline-none
                        focus-visible:ring-4
                        focus-visible:ring-[#2e5d91]/15
                        ${
                          isActive
                            ? "bg-[#183655] text-white shadow-[0_8px_18px_rgba(24,54,85,0.16)]"
                            : "text-[#6e675f] hover:bg-[#ebe4da] hover:text-[#2e5d91]"
                        }
                      `}
                    >
                      <span
                        style={{
                          color:
                            isActive
                              ? "#ffffff"
                              : undefined,
                        }}
                      >
                        {
                          localeShortLabels[
                            targetLocale
                          ]
                        }
                      </span>
                    </Link>
                  );
                },
              )}
            </div>

            {isPersian ? (
              <Link
                href={
                  researchHref
                }
                aria-label={
                  researchLabel
                }
                onClick={
                  closeMenu
                }
                className={
                  mobileActionClassName
                }
                style={{
                  color:
                    "#ffffff",
                }}
              >
                <span
                  style={{
                    color:
                      "#ffffff",
                  }}
                >
                  {
                    researchLabel
                  }
                </span>

                <span
                  aria-hidden="true"
                  className="
                    text-[18px]
                    transition-transform
                    duration-300
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  "
                  style={{
                    color:
                      "#ffffff",
                  }}
                >
                  ↗
                </span>
              </Link>
            ) : (
              <a
                href={
                  workInquiryHref
                }
                aria-label={`${dictionary.mobileCta} — ${common.email}`}
                onClick={
                  closeMenu
                }
                className={
                  mobileActionClassName
                }
                style={{
                  color:
                    "#ffffff",
                }}
              >
                <span
                  style={{
                    color:
                      "#ffffff",
                  }}
                >
                  {
                    dictionary
                      .mobileCta
                  }
                </span>

                <span
                  aria-hidden="true"
                  className="
                    text-[18px]
                    transition-transform
                    duration-300
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  "
                  style={{
                    color:
                      "#ffffff",
                  }}
                >
                  ↗
                </span>
              </a>
            )}

            <div
              className="
                mt-8
                flex
                flex-wrap
                items-center
                justify-between
                gap-4
                border-t
                border-[#302d29]/15
                pt-6
                font-sans
                text-[12px]
                text-[#6e675f]
              "
            >
              <span>
                {
                  dictionary
                    .availability
                }
              </span>

              <a
                href={
                  mobileFooterHref
                }
                onClick={
                  closeMenu
                }
                className="
                  inline-flex
                  min-h-11
                  items-center
                  font-semibold
                  text-[#183655]
                  transition-colors
                  duration-300
                  hover:text-[#2e5d91]
                  focus-visible:outline-none
                  focus-visible:ring-4
                  focus-visible:ring-[#2e5d91]/20
                "
              >
                {
                  mobileFooterLabel
                }
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="
          h-[76px]
          lg:h-[84px]
        "
      />
    </>
  );
}