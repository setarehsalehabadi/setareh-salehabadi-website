import Image from "next/image";

import {
  defaultLocale,
  type Locale,
} from "@/i18n/config";
import en from "@/i18n/dictionaries/en";
import type { Dictionary } from "@/i18n/get-dictionary";

type AboutProps = {
  locale?: Locale;
  dictionary?: Dictionary["about"];
};

function containsPersian(text: string) {
  return /[\u0600-\u06ff]/.test(text);
}

export default function About({
  locale = defaultLocale,
  dictionary = en.about,
}: AboutProps) {
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
      id="about"
      aria-labelledby="about-heading"
      className="
        border-b
        border-[#302d29]/15
        bg-[#f7f3ed]
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
            lg:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.72fr)]
            lg:items-end
            lg:gap-16
            lg:pb-12
          "
        >
          <div className="min-w-0">
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
              id="about-heading"
              className={`
                max-w-[900px]
                text-[#211f1c]
                ${
                  isPersian
                    ? "font-sans text-[clamp(1.75rem,2.55vw,2.65rem)] font-[650] leading-[1.62] tracking-normal"
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
                      ? "mt-0.5"
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
            gap-10
            lg:mt-12
            lg:grid-cols-[minmax(340px,0.84fr)_minmax(0,1.16fr)]
            lg:items-stretch
            lg:gap-14
          "
        >
          <div className="min-w-0">
            <div
              className="
                overflow-hidden
                rounded-[28px]
                border
                border-[#302d29]/10
                bg-[#ded5ca]
                shadow-[0_28px_70px_rgba(61,51,41,0.13)]
                sm:rounded-[34px]
              "
            >
              <div
                className="
                  relative
                  aspect-[4/5]
                  w-full
                  sm:aspect-[4/4.6]
                  lg:aspect-auto
                  lg:h-[clamp(500px,62vh,620px)]
                "
              >
                <Image
                  src="/images/about/about.png"
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
          </div>

          <div
            className="
              flex
              min-w-0
              flex-col
            "
          >
            <div
              className="
                grid
                border-s
                border-t
                border-[#302d29]/15
                sm:grid-cols-3
              "
            >
              {dictionary.principles.map(
                (principle) => (
                  <article
                    key={principle.number}
                    className="
                      flex
                      min-h-[230px]
                      flex-col
                      border-b
                      border-e
                      border-[#302d29]/15
                      bg-[#ebe4da]/30
                      p-6
                      sm:min-h-[270px]
                      lg:min-h-[300px]
                      xl:p-7
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
                            : "text-[10px] tracking-[0.19em]"
                        }
                      `}
                    >
                      {principle.number}
                    </span>

                    <h3
                      className={`
                        mt-7
                        text-[#24211e]
                        ${
                          isPersian
                            ? "font-sans text-[clamp(1.35rem,2vw,1.75rem)] font-[650] leading-[1.65] tracking-normal"
                            : "font-serif text-[clamp(1.7rem,2.4vw,2.35rem)] font-medium leading-[1.08] tracking-[-0.03em]"
                        }
                      `}
                    >
                      {principle.title}
                    </h3>

                    <p
                      className={`
                        mt-4
                        font-sans
                        text-[#625d56]
                        ${
                          isPersian
                            ? "text-[14.5px] leading-[2] sm:text-[15.5px]"
                            : "text-[16px] leading-8 lg:text-[17px]"
                        }
                      `}
                    >
                      {principle.description}
                    </p>
                  </article>
                )
              )}
            </div>

            <div
              className="
                mt-8
                border-t
                border-[#302d29]/15
                pt-7
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
                {dictionary.focusLabel}
              </p>

              <div
                className="
                  mt-5
                  flex
                  flex-wrap
                  gap-2
                "
              >
                {dictionary.focusAreas.map(
                  (area) => (
                    <span
                      key={area}
                      dir="auto"
                      className={`
                        rounded-full
                        border
                        border-[#302d29]/15
                        bg-[#ebe4da]/45
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
                mt-auto
                pt-8
              "
            >
              <div
                className="
                  border-s-2
                  border-[#b48a52]
                  ps-5
                "
              >
                <p
                  className={`
                    max-w-[760px]
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
              </div>

              <a
                href={dictionary.cta.href}
                className={`
                  group
                  mt-7
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
        </div>
      </div>
    </section>
  );
}