import Link from "next/link";

import {
  defaultLocale,
  type Locale,
} from "@/i18n/config";

import en from "@/i18n/dictionaries/en";
import type { Dictionary } from "@/i18n/get-dictionary";

type FooterProps = {
  locale?: Locale;
  dictionary?: Dictionary["footer"];
  common?: Dictionary["common"];
};

type ArrowIconProps = {
  external: boolean;
};

type LegalLabels = {
  navigationLabel: string;
  privacy: string;
  terms: string;
};

const legalLabels: Record<
  Locale,
  LegalLabels
> = {
  en: {
    navigationLabel:
      "Legal information",

    privacy:
      "Privacy Policy",

    terms:
      "Terms of Use",
  },

  de: {
    navigationLabel:
      "Rechtliche Informationen",

    privacy:
      "Datenschutzerklärung",

    terms:
      "Nutzungsbedingungen",
  },

  fa: {
    navigationLabel:
      "اطلاعات حقوقی",

    privacy:
      "حریم خصوصی",

    terms:
      "شرایط استفاده",
  },
};

function isExternalAction(
  href: string
) {
  return (
    href.startsWith("mailto:") ||
    href.startsWith("http://") ||
    href.startsWith("https://")
  );
}

function formatYear(
  year: number,
  locale: Locale
) {
  return new Intl.NumberFormat(
    locale === "fa"
      ? "fa-IR"
      : locale,
    {
      useGrouping: false,
    }
  ).format(year);
}

function ArrowIcon({
  external,
}: ArrowIconProps) {
  if (external) {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="
          h-[17px]
          w-[17px]
          shrink-0
          fill-none
          stroke-current
        "
      >
        <path
          d="M6 14 14 6M8 6h6v6"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="
        h-[17px]
        w-[17px]
        shrink-0
        fill-none
        stroke-current
      "
    >
      <path
        d="M10 15V5M6.5 8.5 10 5l3.5 3.5"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Footer({
  locale = defaultLocale,
  dictionary = en.footer,
  common = en.common,
}: FooterProps) {
  const isPersian =
    locale === "fa";

  const currentYear =
    formatYear(
      new Date().getFullYear(),
      locale
    );

  const hasAvailability =
    dictionary.availability
      .trim()
      .length > 0;

  const primaryIsExternal =
    isExternalAction(
      dictionary.primaryCta.href
    );

  const secondaryIsExternal =
    isExternalAction(
      dictionary.secondaryCta.href
    );

  const currentLegalLabels =
    legalLabels[locale];

  const legalLinks = [
    {
      label:
        currentLegalLabels.privacy,

      href:
        `/${locale}/privacy`,
    },

    {
      label:
        currentLegalLabels.terms,

      href:
        `/${locale}/terms`,
    },
  ];

  return (
    <footer
      id="footer"
      aria-labelledby="footer-heading"
      className="
        relative
        overflow-hidden
        border-t
        border-[#302d29]/15
        bg-[#e1d8cc]
        text-[#211f1c]
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-24
          top-20
          h-72
          w-72
          rounded-full
          bg-[#b48a52]/10
          blur-[110px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-24
          top-12
          h-80
          w-80
          rounded-full
          bg-[#2e5d91]/10
          blur-[120px]
        "
      />

      <div
        className="
          relative
          mx-auto
          max-w-[1480px]
          px-5
          pb-8
          pt-16
          sm:px-8
          sm:pt-20
          lg:px-12
          lg:pt-24
          xl:px-16
        "
      >
        <div
          className="
            grid
            gap-12
            border-b
            border-[#302d29]/15
            pb-12
            lg:grid-cols-[minmax(0,1.25fr)_minmax(180px,0.46fr)_minmax(220px,0.58fr)]
            lg:gap-14
            xl:gap-16
          "
        >
          <div className="min-w-0">
            <p
              className={`
                font-sans
                font-semibold
                text-[#8a672f]
                ${
                  isPersian
                    ? "text-[11px] leading-6 tracking-normal sm:text-[12px]"
                    : "text-[10px] uppercase tracking-[0.3em]"
                }
              `}
            >
              {dictionary.eyebrow}
            </p>

            <h2
              id="footer-heading"
              className={`
                mt-5
                max-w-[880px]
                text-[#211f1c]
                ${
                  isPersian
                    ? "font-sans text-[clamp(1.8rem,2.7vw,2.75rem)] font-[650] leading-[1.62] tracking-normal"
                    : "font-serif text-[clamp(2.25rem,4.1vw,3.9rem)] font-medium leading-[1.02] tracking-[-0.043em]"
                }
              `}
            >
              <span>
                {
                  dictionary
                    .title
                    .first
                }
              </span>

              <span
                className={`
                  block
                  text-[#2e5d91]
                  ${
                    isPersian
                      ? "mt-0.5"
                      : "italic"
                  }
                `}
              >
                {
                  dictionary
                    .title
                    .highlighted
                }
              </span>
            </h2>

            <p
              className={`
                mt-7
                max-w-[720px]
                font-sans
                text-[#625d56]
                ${
                  isPersian
                    ? "text-[16px] leading-[2.05] sm:text-[17px]"
                    : "text-[18px] leading-[2.05rem] lg:text-[19px] lg:leading-[2.15rem]"
                }
              `}
            >
              {dictionary.description}
            </p>

            <div
              className="
                mt-8
                flex
                flex-col
                gap-3
                sm:flex-row
                sm:flex-wrap
                sm:gap-4
              "
            >
              <a
                href={
                  dictionary
                    .primaryCta
                    .href
                }
                className={`
                  group
                  inline-flex
                  min-h-[56px]
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  border
                  border-[#183655]
                  bg-[#183655]
                  px-8
                  font-sans
                  font-semibold
                  leading-none
                  text-white
                  shadow-[0_14px_30px_rgba(24,54,85,0.18)]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-[#2e5d91]
                  hover:bg-[#2e5d91]
                  hover:shadow-[0_18px_38px_rgba(46,93,145,0.24)]
                  focus-visible:outline-none
                  focus-visible:ring-4
                  focus-visible:ring-[#2e5d91]/20
                  ${
                    isPersian
                      ? "text-[14px] sm:text-[15px]"
                      : "text-[15px] sm:text-[16px]"
                  }
                `}
              >
                <span>
                  {
                    dictionary
                      .primaryCta
                      .label
                  }
                </span>

                <span
                  className="
                    transition-transform
                    duration-300
                    group-hover:-translate-y-0.5
                  "
                >
                  <ArrowIcon
                    external={
                      primaryIsExternal
                    }
                  />
                </span>
              </a>

              <a
                href={
                  dictionary
                    .secondaryCta
                    .href
                }
                className={`
                  group
                  inline-flex
                  min-h-[56px]
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  border
                  border-[#302d29]
                  bg-[#302d29]
                  px-8
                  font-sans
                  font-semibold
                  leading-none
                  text-white
                  shadow-[0_14px_30px_rgba(48,45,41,0.14)]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-[#2e5d91]
                  hover:bg-[#2e5d91]
                  hover:shadow-[0_18px_38px_rgba(46,93,145,0.2)]
                  focus-visible:outline-none
                  focus-visible:ring-4
                  focus-visible:ring-[#2e5d91]/20
                  ${
                    isPersian
                      ? "text-[14px] sm:text-[15px]"
                      : "text-[15px] sm:text-[16px]"
                  }
                `}
              >
                <span>
                  {
                    dictionary
                      .secondaryCta
                      .label
                  }
                </span>

                <span
                  className="
                    transition-transform
                    duration-300
                    group-hover:-translate-y-0.5
                  "
                >
                  <ArrowIcon
                    external={
                      secondaryIsExternal
                    }
                  />
                </span>
              </a>
            </div>
          </div>

          <div className="min-w-0">
            <p
              className={`
                font-sans
                font-semibold
                text-[#8a672f]
                ${
                  isPersian
                    ? "text-[11px] leading-6 tracking-normal sm:text-[12px]"
                    : "text-[10px] uppercase tracking-[0.27em]"
                }
              `}
            >
              {
                dictionary
                  .navigationLabel
              }
            </p>

            <nav
              aria-label={
                dictionary
                  .navigationLabel
              }
              className="mt-6"
            >
              <ul className="space-y-4">
                {
                  dictionary
                    .navigation
                    .map(
                      (item) => (
                        <li
                          key={
                            item.label
                          }
                        >
                          <a
                            href={
                              item.href
                            }
                            className={`
                              group
                              inline-flex
                              items-center
                              gap-3
                              font-sans
                              font-medium
                              text-[#4f4942]
                              transition-colors
                              duration-300
                              hover:text-[#2e5d91]
                              ${
                                isPersian
                                  ? "text-[14px] leading-7 sm:text-[15px]"
                                  : "text-[15px]"
                              }
                            `}
                          >
                            <span
                              aria-hidden="true"
                              className="
                                h-px
                                w-3
                                shrink-0
                                bg-[#b48a52]
                                transition-all
                                duration-300
                                group-hover:w-6
                                group-hover:bg-[#2e5d91]
                              "
                            />

                            <span>
                              {
                                item.label
                              }
                            </span>
                          </a>
                        </li>
                      )
                    )
                }
              </ul>
            </nav>
          </div>

          <div className="min-w-0">
            <p
              className={`
                font-sans
                font-semibold
                text-[#8a672f]
                ${
                  isPersian
                    ? "text-[11px] leading-6 tracking-normal sm:text-[12px]"
                    : "text-[10px] uppercase tracking-[0.27em]"
                }
              `}
            >
              {dictionary.focusLabel}
            </p>

            <ul className="mt-6 space-y-4">
              {
                dictionary
                  .focusAreas
                  .map(
                    (area) => (
                      <li
                        key={area}
                        dir="auto"
                        className={`
                          font-sans
                          text-[#625d56]
                          ${
                            isPersian
                              ? "text-[14px] leading-7 sm:text-[15px]"
                              : "text-[15px] leading-7"
                          }
                        `}
                      >
                        {area}
                      </li>
                    )
                  )
              }
            </ul>

            {!isPersian && (
              <div
                className="
                  mt-8
                  border-t
                  border-[#302d29]/15
                  pt-7
                "
              >
                <p
                  className="
                    font-sans
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.27em]
                    text-[#8a672f]
                  "
                >
                  {
                    dictionary
                      .connectLabel
                  }
                </p>

                <div
                  className="
                    mt-5
                    flex
                    flex-wrap
                    gap-3
                  "
                >
                  <a
                    href={`mailto:${common.email}`}
                    className="
                      inline-flex
                      min-h-[42px]
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#302d29]/18
                      bg-[#f7f3ed]/50
                      px-5
                      font-sans
                      text-[12px]
                      font-semibold
                      text-[#4f4942]
                      transition-all
                      duration-300
                      hover:border-[#2e5d91]
                      hover:bg-[#2e5d91]
                      hover:text-white
                    "
                  >
                    {common.emailLabel}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          className="
            grid
            gap-8
            border-b
            border-[#302d29]/15
            py-9
            md:grid-cols-[minmax(0,1fr)_auto]
            md:items-center
          "
        >
          <div className="min-w-0">
            <p
              className={`
                max-w-[840px]
                text-[#302b26]
                ${
                  isPersian
                    ? "font-sans text-[clamp(1.2rem,1.9vw,1.6rem)] font-[650] leading-[1.9] tracking-normal"
                    : "font-serif text-[clamp(1.55rem,2.4vw,2.2rem)] font-medium leading-[1.2] tracking-[-0.03em]"
                }
              `}
            >
              {dictionary.statement}
            </p>

            {hasAvailability && (
              <p
                className={`
                  mt-4
                  max-w-[780px]
                  font-sans
                  text-[#6d665e]
                  ${
                    isPersian
                      ? "text-[15px] leading-[2] sm:text-[16px]"
                      : "text-[17px] leading-8 sm:text-[18px] sm:leading-[2rem]"
                  }
                `}
              >
                {
                  dictionary
                    .availability
                }
              </p>
            )}
          </div>

          <a
            href="#top"
            aria-label={
              common.backToTop
            }
            className="
              group
              flex
              h-14
              w-14
              items-center
              justify-center
              justify-self-start
              rounded-full
              border
              border-[#183655]
              bg-[#183655]
              text-white
              shadow-[0_12px_28px_rgba(24,54,85,0.16)]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-[#2e5d91]
              hover:bg-[#2e5d91]
              hover:shadow-[0_18px_36px_rgba(46,93,145,0.22)]
              md:justify-self-end
            "
          >
            <span
              className="
                transition-transform
                duration-300
                group-hover:-translate-y-0.5
              "
            >
              <ArrowIcon
                external={false}
              />
            </span>
          </a>
        </div>

        <div
          className={`
            grid
            gap-5
            pt-7
            font-sans
            text-[#756e65]
            lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]
            lg:items-center
            ${
              isPersian
                ? "text-[11px] leading-7 sm:text-[12px]"
                : "text-[12px] leading-6"
            }
          `}
        >
          <p
            className="
              min-w-0
              lg:justify-self-start
            "
          >
            © {currentYear}{" "}
            {common.brandName}.{" "}
            {dictionary.rights}
          </p>

          <nav
            aria-label={
              currentLegalLabels
                .navigationLabel
            }
            className="
              flex
              flex-wrap
              items-center
              gap-x-5
              gap-y-2
              lg:justify-self-center
            "
          >
            {legalLinks.map(
              (item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="
                    relative
                    font-sans
                    font-medium
                    text-[#625d56]
                    transition-colors
                    duration-300
                    after:absolute
                    after:inset-x-0
                    after:-bottom-1
                    after:h-px
                    after:origin-center
                    after:scale-x-0
                    after:bg-[#2e5d91]
                    after:transition-transform
                    after:duration-300
                    hover:text-[#2e5d91]
                    hover:after:scale-x-100
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#2e5d91]/25
                  "
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <p
            className="
              min-w-0
              lg:justify-self-end
              lg:text-end
            "
          >
            {
              dictionary
                .designStatement
            }
          </p>
        </div>
      </div>
    </footer>
  );
}