import Image from "next/image";
import Link from "next/link";

import {
  defaultLocale,
  type Locale,
} from "@/i18n/config";

import en from "@/i18n/dictionaries/en";

type HeroTitle = {
  readonly first: string;
  readonly highlighted: string;
  readonly last: string;
};

type HeroCta = {
  readonly label: string;
  readonly href: string;
};

type HeroContent = {
  readonly eyebrow: string;
  readonly title: HeroTitle;
  readonly description: string;
  readonly focusAreas: readonly string[];
  readonly primaryCta: HeroCta;
  readonly secondaryCta: HeroCta;
  readonly principle: string;
  readonly imageAlt: string;
  readonly imageCaptionLeft: string;
  readonly imageCaptionRight: string;
  readonly brandPrinciples?: readonly string[];
};

type HeroProps = {
  locale?: Locale;
  dictionary?: unknown;
};

function isRecord(
  value: unknown,
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null
  );
}

function isString(
  value: unknown,
): value is string {
  return typeof value === "string";
}

function isStringArray(
  value: unknown,
): value is readonly string[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        typeof item === "string",
    )
  );
}

function isHeroTitle(
  value: unknown,
): value is HeroTitle {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isString(value.first) &&
    isString(value.highlighted) &&
    isString(value.last)
  );
}

function isHeroCta(
  value: unknown,
): value is HeroCta {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isString(value.label) &&
    isString(value.href)
  );
}

function isHeroContent(
  value: unknown,
): value is HeroContent {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isString(value.eyebrow) &&
    isHeroTitle(value.title) &&
    isString(value.description) &&
    isStringArray(value.focusAreas) &&
    isHeroCta(value.primaryCta) &&
    isHeroCta(value.secondaryCta) &&
    isString(value.principle) &&
    isString(value.imageAlt) &&
    isString(value.imageCaptionLeft) &&
    isString(value.imageCaptionRight) &&
    (
      value.brandPrinciples === undefined ||
      isStringArray(value.brandPrinciples)
    )
  );
}

function resolveHeroContent(
  dictionary: unknown,
): HeroContent {
  /*
   * حالت اول:
   * <Hero dictionary={dictionary.hero} />
   */
  if (
    isHeroContent(dictionary)
  ) {
    return dictionary;
  }

  if (
    isRecord(dictionary)
  ) {
    /*
     * حالت دوم:
     * <Hero dictionary={dictionary} />
     */
    if (
      isHeroContent(
        dictionary.hero,
      )
    ) {
      return dictionary.hero;
    }

    /*
     * پشتیبانی از ساختار قدیمی:
     * hero: {
     *   hero: {
     *     ...
     *   }
     * }
     */
    if (
      isRecord(dictionary.hero) &&
      isHeroContent(
        dictionary.hero.hero,
      )
    ) {
      return dictionary.hero.hero;
    }
  }

  return en.hero;
}

export default function Hero({
  locale = defaultLocale,
  dictionary,
}: HeroProps) {
  const hero =
    resolveHeroContent(
      dictionary,
    );

  const isPersian =
    locale === "fa";

  const primaryHref =
    `/${locale}/case-studies`;

  const secondaryHref =
    `/${locale}/research`;

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="
        border-b
        border-[#302d29]/12
        bg-[#f4efe8]
        text-[#211f1c]
      "
    >
      <div
        className="
          mx-auto
          max-w-[1480px]
          px-5
          py-10
          sm:px-8
          sm:py-12
          lg:px-12
          lg:py-14
          xl:px-16
        "
      >
        <div
          className="
            grid
            gap-10
            lg:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)]
            lg:items-start
            lg:gap-14
          "
        >
          <div
            className={
              isPersian
                ? "lg:order-2"
                : "lg:order-1"
            }
          >
            <p
              className={`
                mb-5
                font-sans
                font-semibold
                text-[#8a672f]
                ${
                  isPersian
                    ? "text-[11px] leading-6 tracking-normal sm:text-[12px]"
                    : "text-[10px] uppercase tracking-[0.28em] sm:text-[11px]"
                }
              `}
            >
              {hero.eyebrow}
            </p>

            <h1
              id="hero-heading"
              className={`
                text-[#171512]
                ${
                  isPersian
                    ? "max-w-[720px] font-sans text-[clamp(2.35rem,5.3vw,4.7rem)] font-[650] leading-[1.55] tracking-normal"
                    : "max-w-[720px] font-serif text-[clamp(3.4rem,7vw,6.2rem)] font-medium leading-[0.96] tracking-[-0.045em]"
                }
              `}
            >
              <span className="block">
                {hero.title.first}
              </span>

              <span
                className={`
                  block
                  text-[#2e5d91]
                  ${
                    isPersian
                      ? ""
                      : "italic"
                  }
                `}
              >
                {hero.title.highlighted}
              </span>

              <span className="block">
                {hero.title.last}
              </span>
            </h1>

            <p
              className={`
                mt-8
                max-w-[720px]
                font-sans
                text-[#5d5852]
                ${
                  isPersian
                    ? "text-[16px] leading-[2.1] sm:text-[17px]"
                    : "text-[18px] leading-[2.05rem] lg:text-[19px] lg:leading-[2.2rem]"
                }
              `}
            >
              {hero.description}
            </p>

            <div
              className="
                mt-8
                grid
                gap-0
                border-y
                border-[#302d29]/12
                sm:grid-cols-2
              "
            >
              {hero.focusAreas.map(
                (
                  item,
                  index,
                ) => (
                  <div
                    key={item}
                    className={`
                      flex
                      min-h-[58px]
                      items-center
                      border-b
                      border-[#302d29]/12
                      px-4
                      py-4
                      last:border-b-0
                      sm:border-b-0
                      ${
                        index % 2 === 0
                          ? "sm:border-e sm:border-[#302d29]/12"
                          : ""
                      }
                    `}
                  >
                    <span
                      aria-hidden="true"
                      className="
                        me-3
                        inline-block
                        h-1.5
                        w-1.5
                        shrink-0
                        rounded-full
                        bg-[#b4853b]
                      "
                    />

                    <span
                      className={`
                        font-sans
                        font-medium
                        text-[#2d2a26]
                        ${
                          isPersian
                            ? "text-[14.5px] leading-7 sm:text-[15.5px]"
                            : "text-[15px] sm:text-[16px]"
                        }
                      `}
                    >
                      {item}
                    </span>
                  </div>
                ),
              )}
            </div>

            <div
              className="
                mt-8
                flex
                flex-col
                gap-4
                sm:flex-row
                sm:flex-wrap
                sm:items-center
              "
            >
              <Link
                href={primaryHref}
                className="
                  group
                  inline-flex
                  min-h-[58px]
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
                  hover:-translate-y-0.5
                  hover:border-[#2e5d91]
                  hover:bg-[#2e5d91]
                  hover:shadow-[0_18px_36px_rgba(46,93,145,0.22)]
                  focus-visible:outline-none
                  focus-visible:ring-4
                  focus-visible:ring-[#2e5d91]/20
                  sm:text-[16px]
                "
              >
                <span>
                  {hero.primaryCta.label}
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
                  {isPersian
                    ? "↖"
                    : "↗"}
                </span>
              </Link>

              <Link
                href={secondaryHref}
                className="
                  group
                  inline-flex
                  min-h-[58px]
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  border
                  border-[#302d29]/18
                  bg-[#fbf8f4]
                  px-8
                  font-sans
                  text-[15px]
                  font-semibold
                  leading-none
                  text-[#211f1c]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-[#2e5d91]/30
                  hover:text-[#2e5d91]
                  focus-visible:outline-none
                  focus-visible:ring-4
                  focus-visible:ring-[#2e5d91]/10
                  sm:text-[16px]
                "
              >
                <span>
                  {hero.secondaryCta.label}
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
                  {isPersian
                    ? "↖"
                    : "↗"}
                </span>
              </Link>
            </div>

            <div
              className="
                mt-7
                border-s-2
                border-[#b4853b]
                ps-4
              "
            >
              <p
                className={`
                  max-w-[760px]
                  font-sans
                  text-[#706961]
                  ${
                    isPersian
                      ? "text-[15px] leading-[2.05] sm:text-[16px]"
                      : "text-[16px] leading-[1.95rem] lg:text-[17px]"
                  }
                `}
              >
                {hero.principle}
              </p>
            </div>
          </div>

          <div
            className={
              isPersian
                ? "lg:order-1"
                : "lg:order-2"
            }
          >
            <div
              className="
                overflow-hidden
                rounded-[34px]
                border
                border-[#302d29]/10
                bg-[#ddd4c8]
                shadow-[0_28px_70px_rgba(61,51,41,0.12)]
              "
            >
              <div
                className="
                  relative
                  aspect-[4/4.2]
                  w-full
                "
              >
                <Image
                  src="/images/hero/hero.png"
                  alt={hero.imageAlt}
                  fill
                  priority
                  sizes="
                    (max-width: 1024px) 100vw,
                    46vw
                  "
                  className="
                    object-cover
                    object-center
                  "
                />
              </div>
            </div>

            <div
              className="
                mt-4
                flex
                items-center
                justify-between
                gap-4
                px-1
              "
            >
              <span
                className="
                  font-sans
                  text-[10px]
                  font-medium
                  tracking-[0.18em]
                  text-[#7f776e]
                "
              >
                {hero.imageCaptionLeft}
              </span>

              <span
                className="
                  font-sans
                  text-[10px]
                  font-medium
                  tracking-[0.18em]
                  text-[#7f776e]
                "
              >
                {hero.imageCaptionRight}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}