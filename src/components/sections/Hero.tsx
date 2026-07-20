import Image from "next/image";

const focusAreas = [
  "SEO & Organic Growth",
  "Consumer Psychology",
  "Data & Analytics",
  "AI & Automation",
];

const brandPrinciples = [
  "Data-driven",
  "Human-centred",
  "Evidence-based",
  "Sustainable growth",
];

export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="
        relative
        scroll-mt-[84px]
        overflow-hidden
        border-b
        border-[#302d29]/15
        bg-[#f7f3ed]
        text-[#211f1c]
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-36
          top-24
          h-[420px]
          w-[420px]
          rounded-full
          bg-[#b48a52]/10
          blur-[130px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-32
          top-12
          h-[460px]
          w-[460px]
          rounded-full
          bg-[#2e5d91]/10
          blur-[140px]
        "
      />

      <div
        className="
          relative
          mx-auto
          max-w-[1480px]
          px-5
          pb-14
          pt-14
          sm:px-8
          sm:pb-16
          sm:pt-16
          lg:px-12
          lg:pb-20
          lg:pt-20
          xl:px-16
        "
      >
        <div
          className="
            grid
            gap-12
            lg:grid-cols-[minmax(0,0.92fr)_minmax(500px,1.08fr)]
            lg:items-start
            lg:gap-14
            xl:gap-20
          "
        >
          <div className="relative z-10 flex min-w-0 flex-col">
            <p
              className="
                mb-7
                font-sans
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.3em]
                text-[#8a672f]
              "
            >
              Digital Growth Strategist
            </p>

            <h1
              id="hero-heading"
              className="
                max-w-[650px]
                font-serif
                text-[clamp(3.15rem,5.45vw,5.35rem)]
                font-medium
                leading-[1.02]
                tracking-[-0.048em]
                text-[#211f1c]
              "
            >
              <span className="block">Strategic,</span>

              <span className="block italic text-[#2e5d91]">
                measurable
              </span>

              <span className="block">digital growth.</span>
            </h1>

            <p
              className="
                mt-12
                max-w-[640px]
                font-sans
                text-[18px]
                leading-[2.05rem]
                text-[#514c46]
                sm:mt-14
                sm:text-[19px]
                sm:leading-[2.15rem]
                lg:text-[20px]
                lg:leading-[2.3rem]
              "
            >
              I help businesses make clearer growth decisions by connecting
              SEO, digital strategy, consumer psychology, data and practical AI
              automation.
            </p>

            <div
              className="
                mt-9
                grid
                border-y
                border-[#302d29]/20
                sm:grid-cols-2
              "
            >
              {focusAreas.map((area, index) => (
                <div
                  key={area}
                  className={`
                    flex
                    min-h-[64px]
                    items-center
                    gap-3
                    border-[#302d29]/15
                    py-4
                    font-sans
                    text-[14px]
                    font-medium
                    leading-6
                    text-[#423e39]
                    ${index < 2 ? "border-b" : ""}
                    ${
                      index % 2 === 0
                        ? "sm:border-r sm:pr-6"
                        : "sm:pl-6"
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

                  {area}
                </div>
              ))}
            </div>

            <div
              className="
                mt-9
                flex
                flex-col
                gap-4
                sm:flex-row
                sm:flex-wrap
                sm:items-center
              "
            >
              <a
                href="#case-studies"
                className="
                  group
                  inline-flex
                  min-h-[58px]
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  bg-[#183655]
                  px-9
                  font-sans
                  text-[15px]
                  font-semibold
                  leading-none
                  !text-white
                  shadow-[0_12px_28px_rgba(24,54,85,0.16)]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-[#2e5d91]
                  hover:!text-white
                  hover:shadow-[0_18px_38px_rgba(46,93,145,0.24)]
                  focus-visible:outline-none
                  focus-visible:ring-4
                  focus-visible:ring-[#2e5d91]/20
                  sm:text-[16px]
                "
              >
                <span className="!text-white">
                  Explore selected work
                </span>

                <span
                  aria-hidden="true"
                  className="
                    text-[18px]
                    !text-white
                    transition-transform
                    duration-300
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  "
                >
                  ↗
                </span>
              </a>

              <a
                href="#research"
                className="
                  group
                  inline-flex
                  min-h-[58px]
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  border
                  border-[#35312c]
                  bg-[#35312c]
                  px-9
                  font-sans
                  text-[15px]
                  font-semibold
                  leading-none
                  !text-white
                  shadow-[0_12px_28px_rgba(53,49,44,0.12)]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-[#2e5d91]
                  hover:bg-[#2e5d91]
                  hover:!text-white
                  hover:shadow-[0_18px_38px_rgba(46,93,145,0.2)]
                  focus-visible:outline-none
                  focus-visible:ring-4
                  focus-visible:ring-[#2e5d91]/20
                  sm:text-[16px]
                "
              >
                <span className="!text-white">
                  Visit the Research Lab
                </span>

                <span
                  aria-hidden="true"
                  className="
                    text-[18px]
                    !text-white
                    transition-transform
                    duration-300
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  "
                >
                  ↗
                </span>
              </a>
            </div>

            <div
              className="
                mt-8
                border-l
                border-[#b48a52]
                pl-5
              "
            >
              <p
                className="
                  max-w-[640px]
                  font-sans
                  text-[14px]
                  leading-7
                  text-[#6c655d]
                "
              >
                Evidence before assumption. Strategy before execution.
                Sustainable growth before short-term noise.
              </p>
            </div>
          </div>

          <div className="relative min-w-0">
            <div
              className="
                relative
                overflow-hidden
                rounded-[30px]
                border
                border-[#302d29]/10
                bg-[#e5ddd1]
                shadow-[0_28px_70px_rgba(61,51,41,0.14)]
                sm:rounded-[36px]
              "
            >
              <div
                className="
                  relative
                  aspect-[1.12/1]
                  min-h-[420px]
                  w-full
                  sm:min-h-[500px]
                  lg:min-h-[560px]
                  xl:min-h-[590px]
                "
              >
                <Image
                  src="/images/hero/hero.png"
                  alt="Setareh Salehabadi presenting a strategic digital growth framework"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 54vw"
                  className="
                    object-cover
                    object-center
                    transition-transform
                    duration-[1400ms]
                    ease-out
                    hover:scale-[1.015]
                  "
                />

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-[#15120e]/14
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
                grid-cols-2
                gap-4
                px-1
                font-sans
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.22em]
                text-[#71685f]
              "
            >
              <span>Observe · Decide · Execute</span>

              <span className="text-right">
                Strategy before tactics
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="
          relative
          border-t
          border-[#302d29]/15
          bg-[#f4efe8]
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-[1480px]
            grid-cols-2
            px-5
            sm:px-8
            lg:grid-cols-4
            lg:px-12
            xl:px-16
          "
        >
          {brandPrinciples.map((principle, index) => (
            <div
              key={principle}
              className={`
                flex
                min-h-[76px]
                items-center
                gap-4
                py-5
                ${index % 2 === 0 ? "pr-4" : "pl-4"}
                ${
                  index < 2
                    ? "border-b border-[#302d29]/10 lg:border-b-0"
                    : ""
                }
                ${
                  index > 0
                    ? "lg:border-l lg:border-[#302d29]/10 lg:pl-7"
                    : ""
                }
              `}
            >
              <span
                aria-hidden="true"
                className="
                  h-px
                  w-5
                  shrink-0
                  bg-[#b48a52]
                "
              />

              <span
                className="
                  font-sans
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.21em]
                  text-[#665f57]
                  sm:text-[11px]
                "
              >
                {principle}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}