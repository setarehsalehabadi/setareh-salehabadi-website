import Image from "next/image";
import Link from "next/link";

type Locale = "en" | "de" | "fa";

type HeroProps = {
  locale: Locale;
  dictionary: unknown;
};

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getRecord(
  source: UnknownRecord,
  key: string,
): UnknownRecord | undefined {
  const value = source[key];
  return isRecord(value) ? value : undefined;
}

function getString(
  source: UnknownRecord,
  ...keys: string[]
): string {
  for (const key of keys) {
    const value = source[key];

    if (typeof value === "string" && value.trim().length > 0) {
      return value;
    }
  }

  return "";
}

function getStringArray(
  source: UnknownRecord,
  ...keys: string[]
): string[] {
  for (const key of keys) {
    const value = source[key];

    if (Array.isArray(value)) {
      const items = value.filter(
        (item): item is string =>
          typeof item === "string" && item.trim().length > 0,
      );

      if (items.length > 0) {
        return items;
      }
    }
  }

  return [];
}

function normaliseHeroDictionary(dictionary: unknown) {
  const root = isRecord(dictionary) ? dictionary : {};

  const firstHeroLevel = getRecord(root, "hero") ?? root;
  const hero =
    getRecord(firstHeroLevel, "hero") ??
    firstHeroLevel;

  const title = getRecord(hero, "title") ?? {};
  const ctas = getRecord(hero, "ctas") ?? {};

  return {
    eyebrow: getString(hero, "eyebrow"),

    titleLine1:
      getString(hero, "titleLine1") ||
      getString(title, "first"),

    titleLine2: getString(hero, "titleLine2"),

    titleAccentLine1:
      getString(hero, "titleAccentLine1") ||
      getString(title, "highlighted"),

    titleAccentLine2: getString(
      hero,
      "titleAccentLine2",
    ),

    titleLine3:
      getString(hero, "titleLine3") ||
      getString(title, "last"),

    titleLine4: getString(hero, "titleLine4"),

    description: getString(
      hero,
      "description",
      "subtitle",
    ),

    points: getStringArray(
      hero,
      "points",
      "focusAreas",
    ),

    primaryCta:
      getString(hero, "primaryCta") ||
      getString(ctas, "primary"),

    secondaryCta:
      getString(hero, "secondaryCta") ||
      getString(ctas, "secondary"),

    note: getString(hero, "note"),

    imageAlt: getString(
      hero,
      "imageAlt",
      "alt",
    ),

    imageCaptionLeft: getString(
      hero,
      "imageCaptionLeft",
    ),

    imageCaptionRight: getString(
      hero,
      "imageCaptionRight",
    ),
  };
}

export default function Hero({
  locale,
  dictionary,
}: HeroProps) {
  const hero = normaliseHeroDictionary(dictionary);
  const isFa = locale === "fa";

  const titleLines = [
    {
      text: hero.titleLine1,
      accent: false,
    },
    {
      text: hero.titleLine2,
      accent: false,
    },
    {
      text: hero.titleAccentLine1,
      accent: true,
    },
    {
      text: hero.titleAccentLine2,
      accent: true,
    },
    {
      text: hero.titleLine3,
      accent: false,
    },
    {
      text: hero.titleLine4,
      accent: false,
    },
  ].filter((line) => line.text.length > 0);

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
              isFa ? "lg:order-2" : "lg:order-1"
            }
          >
            {hero.eyebrow && (
              <p
                className="
                  mb-5
                  font-sans
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.28em]
                  text-[#8a672f]
                  sm:text-[11px]
                "
              >
                {hero.eyebrow}
              </p>
            )}

            <h1
              id="hero-heading"
              className={`
                font-serif
                font-medium
                tracking-[-0.045em]
                text-[#171512]
                ${
                  isFa
                    ? "max-w-[660px] text-[clamp(2.55rem,5.8vw,4.9rem)] leading-[1.02]"
                    : "max-w-[700px] text-[clamp(3.4rem,7vw,6.2rem)] leading-[0.94]"
                }
              `}
            >
              {titleLines.map((line, index) => (
                <span
                  key={`${line.text}-${index}`}
                  className={
                    line.accent
                      ? "block italic text-[#2e5d91]"
                      : "block"
                  }
                >
                  {line.text}
                </span>
              ))}
            </h1>

            {hero.description && (
              <p
                className="
                  mt-8
                  max-w-[720px]
                  font-sans
                  text-[18px]
                  leading-[2.05rem]
                  text-[#5d5852]
                  lg:text-[19px]
                  lg:leading-[2.2rem]
                "
              >
                {hero.description}
              </p>
            )}

            {hero.points.length > 0 && (
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
                {hero.points.map((item) => (
                  <div
                    key={item}
                    className="
                      flex
                      min-h-[56px]
                      items-center
                      border-b
                      border-[#302d29]/12
                      px-4
                      py-4
                      last:border-b-0
                      sm:border-b-0
                      sm:[&:nth-child(odd)]:border-l
                      sm:[&:nth-child(odd)]:border-[#302d29]/12
                    "
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
                      className="
                        font-sans
                        text-[15px]
                        font-medium
                        text-[#2d2a26]
                        sm:text-[16px]
                      "
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {(hero.primaryCta ||
              hero.secondaryCta) && (
              <div
                className="
                  mt-8
                  flex
                  flex-wrap
                  items-center
                  gap-4
                "
              >
                {hero.primaryCta && (
                  <Link
                    href={`/${locale}/case-studies`}
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
                    <span>{hero.primaryCta}</span>

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
                  </Link>
                )}

                {hero.secondaryCta && (
                  <Link
                    href={`/${locale}/research`}
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
                    <span>{hero.secondaryCta}</span>

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
                  </Link>
                )}
              </div>
            )}

            {hero.note && (
              <div
                className="
                  mt-7
                  border-s-2
                  border-[#b4853b]
                  ps-4
                "
              >
                <p
                  className="
                    max-w-[760px]
                    font-sans
                    text-[16px]
                    leading-[1.95rem]
                    text-[#706961]
                    lg:text-[17px]
                  "
                >
                  {hero.note}
                </p>
              </div>
            )}
          </div>

          <div
            className={
              isFa ? "lg:order-1" : "lg:order-2"
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
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="object-cover object-center"
                />
              </div>
            </div>

            {(hero.imageCaptionLeft ||
              hero.imageCaptionRight) && (
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
                    tracking-[0.22em]
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
                    tracking-[0.22em]
                    text-[#7f776e]
                  "
                >
                  {hero.imageCaptionRight}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}