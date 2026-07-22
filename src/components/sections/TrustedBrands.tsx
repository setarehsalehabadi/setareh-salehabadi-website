import Image from "next/image";

import {
  defaultLocale,
  type Locale,
} from "@/i18n/config";
import en from "@/i18n/dictionaries/en";
import type { Dictionary } from "@/i18n/get-dictionary";

type TrustedBrandsProps = {
  locale?: Locale;
  dictionary?: Dictionary["trustedBrands"];
};

function containsPersian(text: string) {
  return /[\u0600-\u06ff]/.test(text);
}

function formatBrandNumber(
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

export default function TrustedBrands({
  locale = defaultLocale,
  dictionary = en.trustedBrands,
}: TrustedBrandsProps) {
  const isPersian =
    locale === "fa" ||
    containsPersian(
      [
        dictionary.eyebrow,
        dictionary.title.first,
        dictionary.title.highlighted,
      ].join(" ")
    );

  return (
    <section
      id="trusted-brands"
      aria-labelledby="trusted-brands-heading"
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
          py-14
          sm:px-8
          sm:py-16
          lg:px-12
          lg:py-20
          xl:px-16
        "
      >
        <div
          className="
            grid
            gap-6
            border-b
            border-[#302d29]/15
            pb-8
            sm:pb-9
            lg:grid-cols-[minmax(260px,0.72fr)_minmax(0,1.28fr)]
            lg:items-end
            lg:gap-14
          "
        >
          <div>
            <p
              className={`
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

            <h2
              id="trusted-brands-heading"
              className={`
                mt-4
                max-w-[620px]
                text-[#211f1c]
                ${
                  isPersian
                    ? "font-sans text-[clamp(1.7rem,2.7vw,2.55rem)] font-[650] leading-[1.55] tracking-normal"
                    : "font-serif text-[clamp(2rem,3.2vw,3.2rem)] font-medium leading-[1.02] tracking-[-0.04em]"
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
                      ? ""
                      : "italic"
                  }
                `}
              >
                {dictionary.title.highlighted}
              </span>
            </h2>
          </div>

          <p
            aria-hidden="true"
            dir="ltr"
            className="
              hidden
              max-w-[520px]
              justify-self-end
              font-sans
              text-[11px]
              font-medium
              uppercase
              tracking-[0.18em]
              text-[#81786f]
              lg:block
            "
          >
            01 — 04
          </p>
        </div>

       <div
  className="
    mt-8
    grid
    grid-cols-2
    border-s
    border-t
    border-[#302d29]/14
    lg:mt-10
    lg:grid-cols-4
  "
>
          {dictionary.brands.map(
            (brand, index) => (
              <article
                key={brand.name}
                className="
                  flex
                  min-h-[164px]
                  min-w-0
                  flex-col
                  justify-between
                  border-b
                  border-e
                  border-[#302d29]/14
                  bg-[#f4efe8]/35
                  p-5
                  sm:min-h-[176px]
                  sm:p-6
                  lg:min-h-[190px]
                  lg:p-7
                "
              >
                <div
                  className="
                    flex
                    min-h-[54px]
                    items-center
                  "
                >
                  <Image
                    src={brand.logo}
                    alt=""
                    aria-hidden="true"
                    width={72}
                    height={48}
                    sizes="72px"
                    className="
                      h-11
                      w-16
                      object-contain
                      object-start
                    "
                  />
                </div>

                <div className="mt-7 min-w-0">
                  <span
                    dir="ltr"
                    className={`
                      block
                      font-sans
                      font-semibold
                      text-[#968d83]
                      ${
                        isPersian
                          ? "text-[10px] tracking-normal"
                          : "text-[9px] tracking-[0.14em]"
                      }
                    `}
                  >
                    {formatBrandNumber(
                      index,
                      locale,
                      isPersian
                    )}
                  </span>

                  <h3
                    dir="ltr"
                    lang="en"
                    className="
                      mt-2
                      max-w-full
                      break-words
                      font-sans
                      text-[15px]
                      font-semibold
                      leading-[1.45]
                      tracking-normal
                      text-[#26231f]
                      sm:text-[16px]
                      lg:text-[17px]
                    "
                  >
                    {brand.name}
                  </h3>

                  <p
                    className={`
                      mt-1.5
                      max-w-full
                      font-sans
                      text-[#6f685f]
                      ${
                        isPersian
                          ? "text-[11px] leading-6 sm:text-[12px]"
                          : "text-[10px] leading-5 sm:text-[11px]"
                      }
                    `}
                  >
                    {brand.category}
                  </p>
                </div>
              </article>
            )
          )}
        </div>
      </div>
    </section>
  );
}