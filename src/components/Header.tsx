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
import type { Dictionary } from "@/i18n/get-dictionary";

type HeaderProps = {
  locale?: Locale;
  dictionary?: Dictionary["header"];
  common?: Dictionary["common"];
};

type AccessibilityLabels = {
  primaryNavigation: string;
  mobileNavigation: string;
  languageSwitcher: string;
  mobileDialog: string;
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

    mobileDialog:
      "Navigation menu",
  },

  de: {
    primaryNavigation:
      "Hauptnavigation",

    mobileNavigation:
      "Mobile Navigation",

    languageSwitcher:
      "Sprache auswählen",

    mobileDialog:
      "Navigationsmenü",
  },

  fa: {
    primaryNavigation:
      "ناوبری اصلی",

    mobileNavigation:
      "ناوبری موبایل",

    languageSwitcher:
      "انتخاب زبان",

    mobileDialog:
      "منوی ناوبری",
  },
};

const persianMobileFooterLabel =
  "آموزش‌های خودآموز";

function getLocalizedPath(
  pathname: string,
  targetLocale: Locale
) {
  const segments =
    pathname.split("/");

  const currentLocale =
    segments[1];

  if (
    currentLocale &&
    isLocale(currentLocale)
  ) {
    segments[1] =
      targetLocale;
  } else {
    segments.splice(
      1,
      0,
      targetLocale
    );
  }

  const localizedPath =
    segments.join("/");

  return (
    localizedPath ||
    `/${targetLocale}`
  );
}

function getHashFromHref(
  href: string
) {
  const hashIndex =
    href.indexOf("#");

  if (hashIndex === -1) {
    return "";
  }

  return href.slice(hashIndex);
}

function getNavigationHref(
  originalHref: string,
  locale: Locale
) {
  const hash =
    getHashFromHref(
      originalHref
    );

  switch (hash) {
    case "#about":
      return `/${locale}/about`;

    case "#research":
      return `/${locale}/research`;

    case "#case-studies":
      return `/${locale}/case-studies`;

    case "#expertise":
      return `/${locale}#expertise`;

    case "#growth-system":
      return `/${locale}#growth-system`;

    case "#newsletter":
      return `/${locale}#newsletter`;

    default:
      break;
  }

  if (
    originalHref === "#about"
  ) {
    return `/${locale}/about`;
  }

  if (
    originalHref === "#research"
  ) {
    return `/${locale}/research`;
  }

  if (
    originalHref ===
    "#case-studies"
  ) {
    return `/${locale}/case-studies`;
  }

  if (
    originalHref.startsWith("#")
  ) {
    return `/${locale}${originalHref}`;
  }

  return originalHref;
}

function isPageLinkActive(
  pathname: string,
  href: string
) {
  if (
    href.includes("#") ||
    href.startsWith("mailto:")
  ) {
    return false;
  }

  return pathname === href;
}

function formatNavigationIndex(
  index: number,
  locale: Locale
) {
  return new Intl.NumberFormat(
    locale === "fa"
      ? "fa-IR"
      : locale,
    {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }
  ).format(index + 1);
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

  const isPersian =
    locale === "fa";

  const accessibility =
    accessibilityLabels[locale];

  const homeHref =
    pathname === `/${locale}`
      ? "#top"
      : `/${locale}`;

  const navigation =
    dictionary.navigation.map(
      (item) => ({
        ...item,

        href:
          getNavigationHref(
            item.href,
            locale
          ),
      })
    );

  const desktopCtaHref =
    isPersian
      ? `/${locale}/case-studies`
      : `mailto:${common.email}`;

  const mobileCtaHref =
    isPersian
      ? `/${locale}/research`
      : `mailto:${common.email}`;

  const mobileFooterHref =
    isPersian
      ? `/${locale}/courses`
      : `mailto:${common.email}`;

  const mobileFooterLabel =
    isPersian
      ? persianMobileFooterLabel
      : common.emailLabel;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(
        window.scrollY > 20
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (
        window.innerWidth >= 1024
      ) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (
        event.key === "Escape"
      ) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  useEffect(() => {
    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      isMenuOpen
        ? "hidden"
        : "";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

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
            href={homeHref}
            aria-label={`${common.brandName} — ${common.backToTop}`}
            onClick={closeMenu}
            className="
              group
              relative
              z-50
              inline-flex
              min-w-0
              items-center
              gap-3
            "
          >
            <span
              aria-hidden="true"
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-[#302d29]/14
                bg-[#ebe4da]
                font-serif
                text-[14px]
                font-medium
                italic
                text-[#2e5d91]
                transition-all
                duration-300
                group-hover:border-[#2e5d91]
                group-hover:bg-[#2e5d91]
                group-hover:text-white
              "
            >
              SS
            </span>

            <span className="min-w-0">
              <span
                className={`
                  block
                  truncate
                  text-[#282521]
                  transition-colors
                  duration-300
                  group-hover:text-[#2e5d91]
                  ${
                    isPersian
                      ? "font-sans text-[13px] font-[650] leading-none sm:text-[14px]"
                      : "font-serif text-[16px] font-medium uppercase leading-none tracking-[0.09em] sm:text-[17px]"
                  }
                `}
              >
                {common.brandName}
              </span>

              <span
                className={`
                  mt-1.5
                  hidden
                  font-sans
                  font-semibold
                  leading-none
                  text-[#8a8178]
                  sm:block
                  ${
                    isPersian
                      ? "text-[9px] tracking-normal"
                      : "text-[9px] uppercase tracking-[0.18em]"
                  }
                `}
              >
                {common.role}
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
            {navigation.map(
              (item) => {
                const isActive =
                  isPageLinkActive(
                    pathname,
                    item.href
                  );

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    aria-current={
                      isActive
                        ? "page"
                        : undefined
                    }
                    className={`
                      group
                      relative
                      inline-flex
                      min-h-[44px]
                      items-center
                      justify-center
                      rounded-full
                      px-4
                      font-sans
                      font-semibold
                      text-[#49443f]
                      transition-all
                      duration-300
                      hover:bg-[#ebe4da]
                      hover:text-[#2e5d91]
                      ${
                        isPersian
                          ? "text-[12px] tracking-normal"
                          : "text-[11px] uppercase tracking-[0.09em]"
                      }
                      ${
                        isActive
                          ? "bg-[#ebe4da] text-[#2e5d91]"
                          : ""
                      }
                    `}
                  >
                    <span>
                      {item.label}
                    </span>

                    <span
                      aria-hidden="true"
                      className={`
                        absolute
                        bottom-[5px]
                        left-1/2
                        h-px
                        -translate-x-1/2
                        bg-[#2e5d91]
                        transition-all
                        duration-300
                        group-hover:w-[calc(100%-2rem)]
                        ${
                          isActive
                            ? "w-[calc(100%-2rem)]"
                            : "w-0"
                        }
                      `}
                    />
                  </Link>
                );
              }
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
                (targetLocale) => {
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
                        targetLocale
                      )}
                      hrefLang={
                        targetLocale
                      }
                      lang={
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
                        ${
                          isActive
                            ? "bg-[#183655] text-white shadow-[0_6px_14px_rgba(24,54,85,0.15)]"
                            : "text-[#6e675f] hover:bg-[#f7f3ed] hover:text-[#2e5d91]"
                        }
                      `}
                    >
                      {
                        localeShortLabels[
                          targetLocale
                        ]
                      }
                    </Link>
                  );
                }
              )}
            </div>

            {isPersian ? (
              <Link
                href={
                  desktopCtaHref
                }
                className="
                  group
                  hidden
                  min-h-[48px]
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  border
                  border-[#183655]
                  bg-[#183655]
                  px-7
                  font-sans
                  text-[13px]
                  font-semibold
                  leading-none
                  text-white
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
                "
              >
                <span>
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
                    group-hover:-translate-y-0.5
                  "
                >
                  ↓
                </span>
              </Link>
            ) : (
              <a
                href={
                  desktopCtaHref
                }
                className="
                  group
                  hidden
                  min-h-[48px]
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  border
                  border-[#183655]
                  bg-[#183655]
                  px-7
                  font-sans
                  text-[13px]
                  font-semibold
                  leading-none
                  text-white
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
                "
              >
                <span>
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
                >
                  ↗
                </span>
              </a>
            )}

            <button
              type="button"
              aria-label={
                isMenuOpen
                  ? dictionary.closeMenu
                  : dictionary.openMenu
              }
              aria-expanded={
                isMenuOpen
              }
              aria-controls="mobile-navigation"
              onClick={() =>
                setIsMenuOpen(
                  (current) =>
                    !current
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
        role="dialog"
        aria-modal="true"
        aria-label={
          accessibility.mobileDialog
        }
        aria-hidden={
          !isMenuOpen
        }
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
              : "pointer-events-none invisible -translate-y-4 opacity-0"
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
              {navigation.map(
                (
                  item,
                  index
                ) => {
                  const isActive =
                    isPageLinkActive(
                      pathname,
                      item.href
                    );

                  return (
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
                        href={
                          item.href
                        }
                        aria-current={
                          isActive
                            ? "page"
                            : undefined
                        }
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
                            locale
                          )}
                        </span>

                        <span
                          className={`
                            text-[#282521]
                            transition-colors
                            duration-300
                            group-hover:text-[#2e5d91]
                            ${
                              isPersian
                                ? "font-sans text-[clamp(1.4rem,6vw,1.9rem)] font-[650] leading-[1.6] tracking-normal"
                                : "font-serif text-[clamp(1.7rem,7vw,2.35rem)] font-medium tracking-[-0.035em]"
                            }
                            ${
                              isActive
                                ? "text-[#2e5d91]"
                                : ""
                            }
                          `}
                        >
                          {
                            item.label
                          }
                        </span>

                        <span
                          aria-hidden="true"
                          className={`
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            border
                            text-sm
                            transition-all
                            duration-300
                            group-hover:border-[#2e5d91]
                            group-hover:bg-[#2e5d91]
                            group-hover:text-white
                            ${
                              isActive
                                ? "border-[#2e5d91] bg-[#2e5d91] text-white"
                                : "border-[#302d29]/15 text-[#2e5d91]"
                            }
                          `}
                        >
                          ↓
                        </span>
                      </Link>
                    </li>
                  );
                }
              )}
            </ul>
          </nav>

          <div
            className="
              mt-auto
              pt-10
            "
          >
            <p
              className={`
                max-w-[580px]
                text-[#292621]
                ${
                  isPersian
                    ? "font-sans text-[clamp(1.25rem,5.5vw,1.75rem)] font-[650] leading-[1.9]"
                    : "font-serif text-[clamp(1.65rem,6.5vw,2.35rem)] font-medium leading-[1.15] tracking-[-0.035em]"
                }
              `}
            >
              {
                dictionary
                  .mobileStatement
              }
            </p>

            <div
              dir="ltr"
              role="group"
              aria-label={
                accessibility
                  .languageSwitcher
              }
              className="
                mt-7
                flex
                w-fit
                items-center
                rounded-full
                border
                border-[#302d29]/12
                bg-[#f7f3ed]/65
                p-1
              "
            >
              {locales.map(
                (targetLocale) => {
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
                        targetLocale
                      )}
                      hrefLang={
                        targetLocale
                      }
                      lang={
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
                        h-9
                        min-w-10
                        items-center
                        justify-center
                        rounded-full
                        px-3
                        font-sans
                        text-[9px]
                        font-bold
                        tracking-[0.12em]
                        transition-all
                        duration-300
                        ${
                          isActive
                            ? "bg-[#183655] text-white shadow-[0_8px_18px_rgba(24,54,85,0.16)]"
                            : "text-[#6e675f] hover:bg-[#ebe4da] hover:text-[#2e5d91]"
                        }
                      `}
                    >
                      {
                        localeShortLabels[
                          targetLocale
                        ]
                      }
                    </Link>
                  );
                }
              )}
            </div>

            {isPersian ? (
              <Link
                href={
                  mobileCtaHref
                }
                onClick={
                  closeMenu
                }
                className="
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
                  text-white
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
                "
              >
                <span>
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
                    group-hover:-translate-y-0.5
                  "
                >
                  ↓
                </span>
              </Link>
            ) : (
              <a
                href={
                  mobileCtaHref
                }
                onClick={
                  closeMenu
                }
                className="
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
                  text-white
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
                "
              >
                <span>
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

              {isPersian ? (
                <Link
                  href={
                    mobileFooterHref
                  }
                  onClick={
                    closeMenu
                  }
                  className="
                    font-semibold
                    text-[#183655]
                    transition-colors
                    duration-300
                    hover:text-[#2e5d91]
                  "
                >
                  {
                    mobileFooterLabel
                  }
                </Link>
              ) : (
                <a
                  href={
                    mobileFooterHref
                  }
                  onClick={
                    closeMenu
                  }
                  className="
                    font-semibold
                    text-[#183655]
                    transition-colors
                    duration-300
                    hover:text-[#2e5d91]
                  "
                >
                  {
                    mobileFooterLabel
                  }
                </a>
              )}
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