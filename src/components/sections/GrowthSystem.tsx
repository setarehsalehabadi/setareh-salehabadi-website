import Image from "next/image";

const growthSteps = [
  {
    number: "01",
    title: "Diagnose",
    subtitle: "Understand the real growth problem",
    description:
      "Review the business context, audience, search demand, customer journey and existing performance before choosing a direction.",
    details: ["Business context", "Audience insight", "Performance review"],
  },
  {
    number: "02",
    title: "Prioritize",
    subtitle: "Decide what deserves attention",
    description:
      "Identify the opportunities with the strongest strategic value instead of distributing resources across disconnected activities.",
    details: ["Growth opportunities", "Strategic priorities", "Resource focus"],
  },
  {
    number: "03",
    title: "Build",
    subtitle: "Create a connected growth system",
    description:
      "Translate the strategy into practical SEO, content, analytics, customer experience and automation workflows.",
    details: ["SEO systems", "Content structure", "AI workflows"],
  },
  {
    number: "04",
    title: "Learn",
    subtitle: "Measure, interpret and improve",
    description:
      "Use evidence from performance data and customer behavior to refine decisions and improve the system over time.",
    details: ["Measurement", "Interpretation", "Continuous learning"],
  },
];

export default function GrowthSystem() {
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
              Growth System
            </p>

            <h2
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
              A clearer path from
              <span className="block italic text-[#2e5d91]">
                complexity to focused growth.
              </span>
            </h2>
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
            A practical framework for turning research, strategic priorities
            and execution into a connected system that can be measured,
            improved and sustained.
          </p>
        </div>

        <div className="mt-12">
          <div
            className="
              relative
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
                aspect-[16/8.2]
                min-h-[420px]
                w-full
                sm:min-h-[500px]
                lg:min-h-[590px]
              "
            >
              <Image
                src="/images/growth-system/growth-system.png"
                alt="Editorial visualization of a structured digital growth system"
                fill
                sizes="100vw"
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
                  from-[#171410]/22
                  via-transparent
                  to-white/5
                "
              />
            </div>

            <div
              className="
                absolute
                bottom-5
                left-5
                right-5
                grid
                gap-5
                rounded-[22px]
                border
                border-white/25
                bg-[#f7f3ed]/92
                p-6
                shadow-[0_20px_50px_rgba(35,29,23,0.16)]
                backdrop-blur-md
                sm:bottom-7
                sm:left-7
                sm:right-7
                sm:p-7
                lg:grid-cols-[minmax(0,1fr)_auto]
                lg:items-end
              "
            >
              <div>
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
                  Strategic principle
                </p>

                <p
                  className="
                    mt-3
                    max-w-[820px]
                    font-serif
                    text-[clamp(1.55rem,2.7vw,2.4rem)]
                    font-medium
                    leading-[1.15]
                    tracking-[-0.03em]
                    text-[#24211e]
                  "
                >
                  Growth improves when diagnosis, strategy, execution and
                  learning operate as one connected system.
                </p>
              </div>

              <div
                className="
                  flex
                  flex-wrap
                  gap-2
                  lg:max-w-[290px]
                  lg:justify-end
                "
              >
                {["Research", "Strategy", "Execution", "Learning"].map(
                  (label) => (
                    <span
                      key={label}
                      className="
                        rounded-full
                        border
                        border-[#302d29]/15
                        bg-white/45
                        px-3
                        py-2
                        font-sans
                        text-[11px]
                        font-semibold
                        text-[#625d56]
                      "
                    >
                      {label}
                    </span>
                  )
                )}
              </div>
            </div>
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
          {growthSteps.map((step) => (
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
            The system is intentionally flexible. The priorities and
            execution methods change according to the business, audience and
            available evidence.
          </p>

          <a
            href="#case-studies"
            className="
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
            "
            style={{ color: "#ffffff" }}
          >
            <span style={{ color: "#ffffff" }}>
              View selected projects
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
              style={{ color: "#ffffff" }}
            >
              ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}