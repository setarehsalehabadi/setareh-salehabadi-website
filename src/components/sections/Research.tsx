import Image from "next/image";

import {
  defaultLocale,
  type Locale,
} from "@/i18n/config";
import en from "@/i18n/dictionaries/en";
import type { Dictionary } from "@/i18n/get-dictionary";

type ResearchProps = {
  locale?: Locale;
  dictionary?: Dictionary["research"];
};

function containsPersian(text: string) {
  return /[\u0600-\u06ff]/.test(text);
}

function formatTopicNumber(
  index: number,
  locale: Locale,
  isPersian: boolean
) {
  return new Intl.NumberFormat(
    isPersian ? "fa-IR" : locale,
    {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }
  ).format(index + 1);
}

export default function Research({
  locale = defaultLocale,
  dictionary = en.research,
}: ResearchProps) {
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
      id="research"
      aria-labelledby="research-heading"
      className="
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
              id="research-heading"
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

        <div
          className="
            mt-10
            grid
            gap-12
            lg:mt-12
            lg:grid-cols-[minmax(340px,0.88fr)_minmax(0,1.12fr)]
            lg:items-start
            lg:gap-14
          "
        >
          <div
            className="
              relative
              min-w-0
              xl:sticky
              xl:top-[112px]
            "
          >
            <div
              className="
                overflow-hidden
                rounded-[28px]
                border
                border-[#302d29]/10
                bg-[#d8cec1]
                shadow-[0_28px_70px_rgba(61,51,41,0.13)]
                sm:rounded-[34px]
              "
            >
              <div
                className="
                  relative
                  aspect-[4/4.7]
                  w-full
                  sm:aspect-[4/4.4]
                  lg:aspect-auto
                  lg:h-[clamp(440px,52vh,560px)]
                "
              >
                <Image
                  src="/images/research/research.png"
                  alt={dictionary.imageAlt}
                  fill
                  sizes="
                    (max-width: 1023px) calc(100vw - 40px),
                    (max-width: 1535px) 40vw,
                    570px
                  "
                  className="
                    object-cover
                    object-center
                    transition-transform
                    duration-[1400ms]
                    ease-out
                    hover:scale-[1.015]
                  "
                />
              </div>
            </div>

            <div
              className="
                mt-6
                border-s
                border-[#b48a52]
                ps-5
              "
            >
              <p
                className={`
                  font-sans
                  font-semibold
                  text-[#8a672f]
                  ${
                    isPersian
                      ? "text-[11px] leading-6 tracking-normal sm:text-[12px]"
                      : "text-[10px] uppercase tracking-[0.25em]"
                  }
                `}
              >
                {dictionary.principleLabel}
              </p>

              <p
                className={`
                  mt-3
                  max-w-[560px]
                  text-[#2d2925]
                  ${
                    isPersian
                      ? "font-sans text-[clamp(1.25rem,2vw,1.65rem)] font-[650] leading-[1.85] tracking-normal"
                      : "font-serif text-[clamp(1.45rem,2.2vw,2rem)] font-medium leading-[1.2] tracking-[-0.028em]"
                  }
                `}
              >
                {dictionary.principle}
              </p>
            </div>

            <div
              className="
                mt-7
                flex
                flex-wrap
                gap-2
              "
            >
              {dictionary.areas.map(
                (area) => (
                  <span
                    key={area}
                    dir="auto"
                    className={`
                      rounded-full
                      border
                      border-[#302d29]/15
                      bg-[#f7f3ed]/55
                      px-3.5
                      py-2
                      font-sans
                      font-medium
                      text-[#686158]
                      ${
                        isPersian
                          ? "text-[11px] leading-6 tracking-normal sm:text-[12px]"
                          : "text-[11px]"
                      }
                    `}
                  >
                    {area}
                  </span>
                )
              )}
            </div>
          </div>

          <div
            className="
              min-w-0
              border-t
              border-[#302d29]/15
            "
          >
            {dictionary.topics.map(
              (topic, index) => (
                <article
                  key={topic.title}
                  className={`
                    grid
                    gap-5
                    border-b
                    border-[#302d29]/15
                    py-8
                    sm:grid-cols-[48px_minmax(0,1fr)_44px]
                    sm:gap-7
                    lg:py-9
                    ${
                      isPersian
                        ? ""
                        : "group"
                    }
                  `}
                >
                  <span
                    aria-hidden="true"
                    className={`
                      pt-1
                      font-sans
                      font-semibold
                      text-[#978f85]
                      transition-colors
                      duration-300
                      ${
                        isPersian
                          ? "text-[11px] tracking-normal"
                          : "text-[10px] tracking-[0.19em] group-hover:text-[#8a672f]"
                      }
                    `}
                  >
                    {formatTopicNumber(
                      index,
                      locale,
                      isPersian
                    )}
                  </span>

                  <div className="min-w-0">
                    <p
                      className={`
                        font-sans
                        font-semibold
                        text-[#8a672f]
                        ${
                          isPersian
                            ? "text-[11px] leading-6 tracking-normal sm:text-[12px]"
                            : "text-[10px] uppercase tracking-[0.23em]"
                        }
                      `}
                    >
                      {topic.category}
                    </p>

                    <h3
                      className={`
                        mt-4
                        max-w-[720px]
                        text-[#24211e]
                        transition-colors
                        duration-300
                        ${
                          isPersian
                            ? "font-sans text-[clamp(1.45rem,2.25vw,1.9rem)] font-[650] leading-[1.7] tracking-normal"
                            : "font-serif text-[clamp(1.75rem,2.7vw,2.6rem)] font-medium leading-[1.08] tracking-[-0.034em] group-hover:text-[#2e5d91]"
                        }
                      `}
                    >
                      {topic.title}
                    </h3>

                    <p
                      className={`
                        mt-5
                        max-w-[760px]
                        font-sans
                        text-[#625d56]
                        ${
                          isPersian
                            ? "text-[15.5px] leading-[2.05] sm:text-[16.5px]"
                            : "text-[18px] leading-[2.05rem] lg:text-[19px] lg:leading-[2.15rem]"
                        }
                      `}
                    >
                      {topic.description}
                    </p>

                    <div
                      className="
                        mt-6
                        flex
                        flex-wrap
                        gap-2
                      "
                    >
                      {topic.tags.map(
                        (tag) => (
                          <span
                            key={tag}
                            dir="auto"
                            className={`
                              rounded-full
                              border
                              border-[#302d29]/15
                              bg-[#f7f3ed]/42
                              px-3.5
                              py-2
                              font-sans
                              font-semibold
                              text-[#716a61]
                              ${
                                isPersian
                                  ? "text-[10px] leading-5 tracking-normal sm:text-[11px]"
                                  : "text-[10px] uppercase tracking-[0.12em]"
                              }
                            `}
                          >
                            {tag}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  {!isPersian && (
                    <span
                      aria-hidden="true"
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        self-start
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
                </article>
              )
            )}
          </div>
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