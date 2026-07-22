import Image from "next/image";

import {
  defaultLocale,
  type Locale,
} from "@/i18n/config";
import en from "@/i18n/dictionaries/en";
import type { Dictionary } from "@/i18n/get-dictionary";

type GrowthSystemProps = {
  locale?: Locale;
  dictionary?: Dictionary["growthSystem"];
};

function containsPersian(text: string) {
  return /[\u0600-\u06ff]/.test(text);
}

export default function GrowthSystem({
  locale = defaultLocale,
  dictionary = en.growthSystem,
}: GrowthSystemProps) {
  const isPersian =
    locale === "fa" ||
    containsPersian(
      [
        dictionary.eyebrow,
        dictionary.title.first,
        dictionary.title.highlighted,
        dictionary.introduction,
      ].join(" ")
    );

  return (
    <section
      id="growth-system"
      aria-labelledby="growth-system-heading"
      className="
        overflow-hidden
        border-b
        border-[#302d29]/15
        bg-[#ebe4da]
        text-[#211f1c]
      "
    >
      <div
        className="
          mx-auto
          max-w-[1480px]
          px-5
          py-20
          sm:px-8
          sm:py-24
          lg:px-12
          lg:py-28
          xl:px-16
        "
      >
        <div
          className="
            grid
            gap-8
            border-b
            border-[#302d29]/15
            pb-10
            lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.72fr)]
            lg:items-end
            lg:gap-16
            lg:pb-12
          "
        >
          <div>
            <p
              className={`
                mb-5
                font-sans
                font-semibold
                text-[#8a672f]
                ${
                  isPersian
                    ? "text-[11px] leading-6 tracking-normal sm:text-[12px]"
                    : "text-[11px] uppercase tracking-[0.3em]"
                }
              `}
            >
              {dictionary.eyebrow}
            </p>

            <h2
              id="growth-system-heading"
              className={`
                max-w-[820px]
                text-[#211f1c]
                ${
                  isPersian
                    ? "font-sans text-[clamp(2.15rem,3.7vw,3.55rem)] font-[650] leading-[1.48] tracking-normal"
                    : "font-serif text-[clamp(2.5rem,4.5vw,4.2rem)] font-medium leading-[1.02] tracking-[-0.043em]"
                }
              `}
            >
              <span>
                {dictionary.title.first}
              </span>

              <span
                className={`
                  block
                  text-[#2e5d91]
                  ${
                    isPersian
                      ? "mt-1"
                      : "italic"
                  }
                `}
              >
                {dictionary.title.highlighted}
              </span>
            </h2>
          </div>

          <p
            className={`
              max-w-[620px]
              font-sans
              text-[#5f5a53]
              lg:justify-self-end
              ${
                isPersian
                  ? "text-[16px] leading-[2.05] sm:text-[17px]"
                  : "text-[18px] leading-[2.05rem] lg:text-[19px] lg:leading-[2.15rem]"
              }
            `}
          >
            {dictionary.introduction}
          </p>
        </div>

        <div className="mt-10 lg:mt-12">
          <div
            className="
              overflow-hidden
              rounded-[28px]
              border
              border-[#302d29]/10
              bg-[#d9cfc2]
              shadow-[0_30px_80px_rgba(61,51,41,0.14)]
              sm:rounded-[36px]
            "
          >
            <div
              className="
                relative
                aspect-[16/10]
                min-h-[310px]
                w-full
                sm:aspect-[16/8.8]
                sm:min-h-[470px]
                lg:aspect-[16/8.2]
                lg:min-h-[550px]
              "
            >
              <Image
                src="/images/growth-system/growth-system.png"
                alt={dictionary.imageAlt}
                fill
                sizes="
                  (max-width: 767px) calc(100vw - 40px),
                  (max-width: 1023px) calc(100vw - 64px),
                  (max-width: 1535px) calc(100vw - 96px),
                  1352px
                "
                className="
                  object-cover
                  object-center
                  transition-transform
                  duration-[1400ms]
                  ease-out
                  hover:scale-[1.012]
                "
              />

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#171410]/10
                  via-transparent
                  to-white/5
                "
              />
            </div>
          </div>

          <div
            className="
              mt-5
              grid
              gap-6
              rounded-[22px]
              border
              border-[#302d29]/12
              bg-[#f7f3ed]
              p-6
              shadow-[0_18px_44px_rgba(35,29,23,0.08)]
              sm:mt-6
              sm:rounded-[26px]
              sm:p-8
              lg:grid-cols-[minmax(0,1fr)_auto]
              lg:items-end
              lg:gap-10
              lg:p-9
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
                      : "text-[10px] uppercase tracking-[0.27em]"
                  }
                `}
              >
                {dictionary.strategicPrinciple}
              </p>

              <p
                className={`
                  mt-3
                  max-w-[900px]
                  text-[#24211e]
                  ${
                    isPersian
                      ? "font-sans text-[clamp(1.35rem,2.3vw,1.9rem)] font-[650] leading-[1.75] tracking-normal"
                      : "font-serif text-[clamp(1.55rem,2.7vw,2.4rem)] font-medium leading-[1.18] tracking-[-0.03em]"
                  }
                `}
              >
                {dictionary.strategicStatement}
              </p>
            </div>

            <div
              className={`
                flex
                flex-wrap
                gap-2
                lg:max-w-[330px]
                ${
                  isPersian
                    ? "lg:justify-start"
                    : "lg:justify-end"
                }
              `}
            >
              {dictionary.systemLabels.map(
                (label) => (
                  <span
                    key={label}
                    className={`
                      rounded-full
                      border
                      border-[#302d29]/15
                      bg-[#ebe4da]/45
                      px-3.5
                      py-2
                      font-sans
                      font-semibold
                      text-[#625d56]
                      ${
                        isPersian
                          ? "text-[11px] leading-5 tracking-normal sm:text-[12px]"
                          : "text-[11px]"
                      }
                    `}
                  >
                    {label}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        <div
          className="
            mt-12
            grid
            border-s
            border-t
            border-[#302d29]/15
            md:grid-cols-2
            xl:mt-14
            xl:grid-cols-4
          "
        >
          {dictionary.steps.map(
            (step) => (
              <article
                key={step.number}
                className="
                  group
                  relative
                  flex
                  min-h-[360px]
                  flex-col
                  border-b
                  border-e
                  border-[#302d29]/15
                  bg-[#f7f3ed]/42
                  p-6
                  transition-colors
                  duration-500
                  hover:bg-[#f7f3ed]
                  sm:p-7
                  md:min-h-[390px]
                  xl:min-h-[420px]
                  xl:p-8
                "
              >
                <div
                  aria-hidden="true"
                  className={`
                    absolute
                    inset-x-0
                    top-0
                    h-[3px]
                    scale-x-0
                    bg-[#2e5d91]
                    transition-transform
                    duration-500
                    group-hover:scale-x-100
                    ${
                      isPersian
                        ? "origin-right"
                        : "origin-left"
                    }
                  `}
                />

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-5
                  "
                >
                  <span
                    className={`
                      font-sans
                      font-semibold
                      text-[#9a8170]
                      ${
                        isPersian
                          ? "text-[11px] tracking-normal"
                          : "text-[11px] tracking-[0.2em]"
                      }
                    `}
                  >
                    {step.number}
                  </span>

                  {!isPersian && (
                    <span
                      aria-hidden="true"
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#302d29]/15
                        font-sans
                        text-[15px]
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
                  )}
                </div>

                <div className="mt-9 xl:mt-11">
                  <h3
                    className={`
                      text-[#24211e]
                      transition-colors
                      duration-300
                      group-hover:text-[#2e5d91]
                      ${
                        isPersian
                          ? "font-sans text-[clamp(1.5rem,2.15vw,1.95rem)] font-[650] leading-[1.6] tracking-normal"
                          : "font-serif text-[clamp(2rem,3vw,2.8rem)] font-medium leading-none tracking-[-0.04em]"
                      }
                    `}
                  >
                    {step.title}
                  </h3>

                  <p
                    className={`
                      mt-3
                      font-sans
                      font-semibold
                      text-[#8a672f]
                      ${
                        isPersian
                          ? "text-[11px] leading-6 tracking-normal sm:text-[12px]"
                          : "text-[11px] uppercase leading-5 tracking-[0.16em]"
                      }
                    `}
                  >
                    {step.subtitle}
                  </p>

                  <p
                    className={`
                      mt-5
                      font-sans
                      text-[#625d56]
                      ${
                        isPersian
                          ? "text-[15.5px] leading-[2.05] sm:text-[16px]"
                          : "text-[17px] leading-8 sm:text-[18px] sm:leading-[2rem]"
                      }
                    `}
                  >
                    {step.description}
                  </p>
                </div>

                <div
                  className="
                    mt-auto
                    border-t
                    border-[#302d29]/15
                    pt-6
                  "
                >
                  <ul className="space-y-3">
                    {step.details.map(
                      (detail) => (
                        <li
                          key={detail}
                          className={`
                            flex
                            items-center
                            gap-3
                            font-sans
                            font-medium
                            text-[#625d56]
                            ${
                              isPersian
                                ? "text-[12px] leading-6 sm:text-[13px]"
                                : "text-[13px]"
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
                              bg-[#b48a52]
                            "
                          />

                          <span>
                            {detail}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </article>
            )
          )}
        </div>

        <div
          className="
            mt-10
            grid
            gap-7
            border-t
            border-[#302d29]/15
            pt-8
            md:grid-cols-[minmax(0,1fr)_auto]
            md:items-center
            lg:mt-12
            lg:pt-9
          "
        >
          <p
            className={`
              max-w-[820px]
              font-sans
              text-[#625d56]
              ${
                isPersian
                  ? "text-[16px] leading-[2.05] sm:text-[17px]"
                  : "text-[18px] leading-[2.05rem] lg:text-[19px] lg:leading-[2.15rem]"
              }
            `}
          >
            {dictionary.closing}
          </p>

          <a
            href={dictionary.cta.href}
            className={`
              group
              inline-flex
              min-h-[56px]
              items-center
              justify-center
              gap-3
              justify-self-start
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
              md:justify-self-end
              ${
                isPersian
                  ? "text-[14px] sm:text-[15px]"
                  : "text-[15px] sm:text-[16px]"
              }
            `}
          >
            <span>
              {dictionary.cta.label}
            </span>

            <span
              aria-hidden="true"
              className={`
                text-[18px]
                transition-transform
                duration-300
                ${
                  isPersian
                    ? "group-hover:translate-y-0.5"
                    : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                }
              `}
            >
              {isPersian ? "↓" : "↗"}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}