import Image from "next/image";
import Link from "next/link";

import {
  defaultLocale,
  isLocale,
  type Locale,
} from "@/i18n/config";
import en from "@/i18n/dictionaries/en";
import type { Dictionary } from "@/i18n/get-dictionary";

type GrowthSystemProps = {
  locale?: Locale;
  dictionary?: Dictionary["growthSystem"];
  headingLevel?: "h1" | "h2";
};

const confirmedRoutes: Record<string, string> = {
  "#about": "/about",
  "/about": "/about",

  "#expertise": "/expertise",
  "/expertise": "/expertise",

  "#growth-system": "/growth-system",
  "/growth-system": "/growth-system",

  "#projects": "/case-studies",
  "#case-studies": "/case-studies",
  "#selected-projects": "/case-studies",
  "/projects": "/case-studies",
  "/case-studies": "/case-studies",
  "/selected-projects": "/case-studies",

  "#research": "/research",
  "#insights": "/research",
  "#research-lab": "/research",
  "/research": "/research",
  "/insights": "/research",
  "/research-lab": "/research",
};

function getLocalizedHref(
  href: string,
  locale: Locale,
): string {
  const trimmedHref = href.trim();

  if (!trimmedHref) {
    return `/${locale}`;
  }

  if (
    /^(?:https?:\/\/|mailto:|tel:)/i.test(
      trimmedHref,
    )
  ) {
    return trimmedHref;
  }

  const hashIndex = trimmedHref.indexOf("#");

  const pathPart =
    hashIndex >= 0
      ? trimmedHref.slice(0, hashIndex)
      : trimmedHref;

  const hashPart =
    hashIndex >= 0
      ? trimmedHref.slice(hashIndex)
      : "";

  const pathSegments = pathPart
    .split("/")
    .filter(Boolean);

  if (
    pathSegments[0] &&
    isLocale(pathSegments[0])
  ) {
    pathSegments.shift();
  }

  const normalizedPath =
    pathSegments.length > 0
      ? `/${pathSegments.join("/")}`
      : "";

  const normalizedHref =
    `${normalizedPath}${hashPart}`.toLowerCase();

  const confirmedRoute =
    confirmedRoutes[normalizedHref];

  if (confirmedRoute) {
    return `/${locale}${confirmedRoute}`;
  }

  if (
    hashPart &&
    pathSegments.length === 0
  ) {
    return `/${locale}${hashPart}`;
  }

  if (pathSegments.length > 0) {
    return `/${locale}/${pathSegments.join("/")}${hashPart}`;
  }

  return `/${locale}`;
}

export default function GrowthSystem({
  locale = defaultLocale,
  dictionary = en.growthSystem,
  headingLevel = "h2",
}: GrowthSystemProps) {
  const HeadingTag = headingLevel;

  const ctaHref = getLocalizedHref(
    dictionary.cta.href,
    locale,
  );

  const isInternalCta =
    ctaHref.startsWith("/");

  const ctaClassName = `
    group
    inline-flex
    min-h-[58px]
    items-center
    justify-center
    gap-3
    justify-self-start
    rounded-full
    border
    border-[#183655]
    bg-[#183655]
    px-9
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
    hover:shadow-[0_18px_38px_rgba(46,93,145,0.24)]
    focus-visible:outline-none
    focus-visible:ring-4
    focus-visible:ring-[#2e5d91]/20
    md:justify-self-end
    sm:text-[16px]
  `;

  const ctaContent = (
    <>
      <span>
        {dictionary.cta.label}
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
    </>
  );

  return (
    <section
      id="growth-system"
      aria-labelledby="growth-system-heading"
      className="
        scroll-mt-[84px]
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
            gap-10
            border-b
            border-[#302d29]/15
            pb-12
            lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.72fr)]
            lg:items-end
            lg:gap-16
          "
        >
          <div>
            <p
              className="
                mb-5
                font-sans
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.3em]
                text-[#8a672f]
              "
            >
              {dictionary.eyebrow}
            </p>

            <HeadingTag
              id="growth-system-heading"
              className="
                max-w-[790px]
                font-serif
                text-[clamp(2.5rem,4.5vw,4.2rem)]
                font-medium
                leading-[1.02]
                tracking-[-0.043em]
                text-[#211f1c]
              "
            >
              {dictionary.title.first}

              <span className="block italic text-[#2e5d91]">
                {dictionary.title.highlighted}
              </span>
            </HeadingTag>
          </div>

          <p
            className="
              max-w-[620px]
              font-sans
              text-[18px]
              leading-[2.05rem]
              text-[#5f5a53]
              lg:justify-self-end
              lg:text-[19px]
              lg:leading-[2.15rem]
            "
          >
            {dictionary.introduction}
          </p>
        </div>

        <div className="mt-12">
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
            <Image
              src="/images/growth-system/growth-system-editorial.png"
              alt="سیستم رشد دیجیتال شامل سئو، تحلیل داده، بخش‌بندی مخاطب، رفتار مصرف‌کننده و رضایت مشتری"
              width={1536}
              height={1024}
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 94vw, 1360px"
              className="
                block
                h-auto
                w-full
                object-contain
              "
            />
          </div>
        </div>

        <div
          className="
            mt-14
            grid
            border-t
            border-l
            border-[#302d29]/15
            md:grid-cols-2
            xl:grid-cols-4
          "
        >
          {dictionary.steps.map((step) => (
            <article
              key={step.number}
              className="
                group
                relative
                flex
                min-h-[400px]
                flex-col
                border-b
                border-r
                border-[#302d29]/15
                bg-[#f7f3ed]/42
                p-7
                transition-all
                duration-500
                hover:bg-[#f7f3ed]
                sm:p-8
                lg:min-h-[430px]
              "
            >
              <div
                aria-hidden="true"
                className="
                  absolute
                  inset-x-0
                  top-0
                  h-[3px]
                  origin-left
                  scale-x-0
                  bg-[#2e5d91]
                  transition-transform
                  duration-500
                  group-hover:scale-x-100
                "
              />

              <div className="flex items-center justify-between gap-5">
                <span
                  className="
                    font-sans
                    text-[11px]
                    font-semibold
                    tracking-[0.2em]
                    text-[#9a8170]
                  "
                >
                  {step.number}
                </span>

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
              </div>

              <div className="mt-12">
                <h3
                  className="
                    font-serif
                    text-[clamp(2rem,3vw,2.8rem)]
                    font-medium
                    leading-none
                    tracking-[-0.04em]
                    text-[#24211e]
                    transition-colors
                    duration-300
                    group-hover:text-[#2e5d91]
                  "
                >
                  {step.title}
                </h3>

                <p
                  className="
                    mt-4
                    font-sans
                    text-[11px]
                    font-semibold
                    uppercase
                    leading-5
                    tracking-[0.16em]
                    text-[#8a672f]
                  "
                >
                  {step.subtitle}
                </p>

                <p
                  className="
                    mt-6
                    font-sans
                    text-[17px]
                    leading-8
                    text-[#625d56]
                    sm:text-[18px]
                    sm:leading-[2rem]
                  "
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
                  {step.details.map((detail) => (
                    <li
                      key={detail}
                      className="
                        flex
                        items-center
                        gap-3
                        font-sans
                        text-[13px]
                        font-medium
                        text-[#625d56]
                      "
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

                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div
          className="
            mt-12
            grid
            gap-8
            border-t
            border-[#302d29]/15
            pt-9
            md:grid-cols-[minmax(0,1fr)_auto]
            md:items-center
          "
        >
          <p
            className="
              max-w-[820px]
              font-sans
              text-[18px]
              leading-[2.05rem]
              text-[#625d56]
              lg:text-[19px]
              lg:leading-[2.15rem]
            "
          >
            {dictionary.closing}
          </p>

          {isInternalCta ? (
            <Link
              href={ctaHref}
              className={ctaClassName}
            >
              {ctaContent}
            </Link>
          ) : (
            <a
              href={ctaHref}
              className={ctaClassName}
            >
              {ctaContent}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}