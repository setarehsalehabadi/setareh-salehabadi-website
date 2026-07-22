import Image from "next/image";

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

type HeroProps = {
  locale: Locale;
  dictionary: Dictionary["hero"];
};

export default function Hero({
  locale,
  dictionary,
}: HeroProps) {
  const isPersian = locale === "fa";

  const internalArrow = isPersian
    ? "↓"
    : "↗";

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
            lg:grid-cols-[minmax(360px,1.04fr)_minmax(0,0.96fr)]
            lg:items-center
            lg:gap-14
          "
        >
          <div
            className={
              isPersian
                ? "min-w-0 lg:order-2"
                : "min-w-0 lg:order-1"
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
              {dictionary.eyebrow}
            </p>

            <h1
              id="hero-heading"
              className={`
                text-[#171512]
                ${
                  isPersian
                    ? "max-w-[690px] font-sans text-[clamp(2.2rem,3.7vw,3.7rem)] font-[650] leading-[1.32] tracking-normal"
                    : "max-w-[700px] font-serif text-[clamp(3.4rem,7vw,6.2rem)] font-medium leading-[0.94] tracking-[-0.045em]"
                }
              `}
            >
              <span className="block">
                {dictionary.title.first}
              </span>

              <span
                className={`
                  block
                  text-[#2e5d91]
                  ${
                    isPersian
                      ? "mt-1"
                      : ""
                  }
                `}
              >
                {dictionary.title.highlighted}
              </span>

              <span
                className={`
                  block
                  ${
                    isPersian
                      ? "mt-1"
                      : ""
                  }
                `}
              >
                {dictionary.title.last}
              </span>
            </h1>

            <p
              className={`
                mt-7
                max-w-[660px]
                font-sans
                text-[#5d5852]
                ${
                  isPersian
                    ? "text-[16px] leading-[2.05] sm:text-[17px] lg:text-[17.5px]"
                    : "text-[17px] leading-[2.05rem] lg:text-[18px] lg:leading-[2.15rem]"
                }
              `}
            >
              {dictionary.description}
            </p>

            <div
              className="
                mt-7
                grid
                max-w-[660px]
                grid-cols-1
                border-y
                border-[#302d29]/12
                sm:grid-cols-2
              "
            >
              {dictionary.focusAreas.map(
                (item, index) => {
                  const isLastItem =
                    index ===
                    dictionary.focusAreas.length - 1;

                  const isTopRow =
                    index < 2;

                  const isSecondColumn =
                    index % 2 === 1;

                  return (
                    <div
                      key={item}
                      className={`
                        flex
                        min-h-[54px]
                        items-center
                        gap-3
                        border-[#302d29]/12
                        px-4
                        py-3.5
                        ${
                          !isLastItem
                            ? "border-b"
                            : ""
                        }
                        ${
                          isTopRow
                            ? "sm:border-b"
                            : "sm:border-b-0"
                        }
                        ${
                          isSecondColumn
                            ? "sm:border-s"
                            : ""
                        }
                      `}
                    >
                      <span
                        aria-hidden="true"
                        className="
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
                              ? "text-[14px] leading-7 sm:text-[15px]"
                              : "text-[14px] leading-7 sm:text-[15px]"
                          }
                        `}
                      >
                        {item}
                      </span>
                    </div>
                  );
                }
              )}
            </div>

            <div
              className="
                mt-7
                flex
                flex-wrap
                items-center
                gap-3
              "
            >
              <a
                href={dictionary.primaryCta.href}
                className={`
                  group
                  inline-flex
                  min-h-[54px]
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  border
                  border-[#183655]
                  bg-[#183655]
                  px-7
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
                  hover:shadow-[0_18px_36px_rgba(46,93,145,0.22)]
                  focus-visible:outline-none
                  focus-visible:ring-4
                  focus-visible:ring-[#2e5d91]/20
                  sm:px-8
                  ${
                    isPersian
                      ? "text-[14px] sm:text-[15px]"
                      : "text-[14px] sm:text-[15px]"
                  }
                `}
              >
                <span>
                  {dictionary.primaryCta.label}
                </span>

                <span
                  aria-hidden="true"
                  className={`
                    text-[17px]
                    transition-transform
                    duration-300
                    ${
                      isPersian
                        ? "group-hover:translate-y-0.5"
                        : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    }
                  `}
                >
                  {internalArrow}
                </span>
              </a>

              <a
                href={dictionary.secondaryCta.href}
                className={`
                  group
                  inline-flex
                  min-h-[54px]
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  border
                  border-[#302d29]/18
                  bg-[#fbf8f4]
                  px-7
                  font-sans
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
                  sm:px-8
                  ${
                    isPersian
                      ? "text-[14px] sm:text-[15px]"
                      : "text-[14px] sm:text-[15px]"
                  }
                `}
              >
                <span>
                  {dictionary.secondaryCta.label}
                </span>

                <span
                  aria-hidden="true"
                  className={`
                    text-[17px]
                    transition-transform
                    duration-300
                    ${
                      isPersian
                        ? "group-hover:translate-y-0.5"
                        : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    }
                  `}
                >
                  {internalArrow}
                </span>
              </a>
            </div>

            <div
              className="
                mt-7
                max-w-[680px]
                border-s-2
                border-[#b4853b]
                ps-4
              "
            >
              <p
                className={`
                  font-sans
                  text-[#706961]
                  ${
                    isPersian
                      ? "text-[14px] leading-8 sm:text-[15px] sm:leading-8"
                      : "text-[14px] leading-7 sm:text-[15px] sm:leading-8"
                  }
                `}
              >
                {dictionary.principle}
              </p>
            </div>
          </div>

          <div
            className={
              isPersian
                ? "min-w-0 lg:order-1"
                : "min-w-0 lg:order-2"
            }
          >
            <div
              className="
                overflow-hidden
                rounded-[30px]
                border
                border-[#302d29]/10
                bg-[#ddd4c8]
                shadow-[0_26px_65px_rgba(61,51,41,0.12)]
              "
            >
              <div
                className={`
                  relative
                  w-full
                  ${
                    isPersian
                      ? "aspect-[4/4.05]"
                      : "aspect-[4/4.2]"
                  }
                `}
              >
                <Image
                  src="/images/hero/hero.png"
                  alt={dictionary.imageAlt}
                  fill
                  priority
                  sizes="
                    (max-width: 1023px) calc(100vw - 40px),
                    (max-width: 1535px) 46vw,
                    680px
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
                mt-3
                flex
                items-center
                justify-between
                gap-4
                px-1
              "
            >
              <span
                className={`
                  font-sans
                  font-medium
                  text-[#7f776e]
                  ${
                    isPersian
                      ? "text-[11px] leading-6 tracking-normal"
                      : "text-[10px]"
                  }
                `}
              >
                {dictionary.imageCaptionLeft}
              </span>

              <span
                className={`
                  font-sans
                  font-medium
                  text-[#7f776e]
                  ${
                    isPersian
                      ? "text-[11px] leading-6 tracking-normal"
                      : "text-[10px]"
                  }
                `}
              >
                {dictionary.imageCaptionRight}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}