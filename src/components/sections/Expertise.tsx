import Image from "next/image";

const expertiseAreas = [
  {
    title: "SEO & Organic Growth",
    description:
      "Technical SEO, search intent, content architecture and organic acquisition systems designed for sustainable visibility.",
    label: "Search",
  },
  {
    title: "Digital Growth Strategy",
    description:
      "Clear priorities, connected channels and measurable growth plans shaped around business objectives.",
    label: "Strategy",
  },
  {
    title: "Consumer Psychology",
    description:
      "Understanding how people search, evaluate options, build trust and make decisions across digital journeys.",
    label: "Behavior",
  },
  {
    title: "Data & Analytics",
    description:
      "Turning performance data into practical insight through measurement frameworks, dashboards and interpretation.",
    label: "Insight",
  },
  {
    title: "AI & Automation",
    description:
      "Practical workflows that reduce repetitive work, improve consistency and support faster strategic decisions.",
    label: "Systems",
  },
];

export default function Expertise() {
  return (
    <section
      id="expertise"
      aria-labelledby="expertise-heading"
      className="
        scroll-mt-[84px]
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
              Expertise
            </p>

            <h2
              id="expertise-heading"
              className="
                max-w-[760px]
                font-serif
                text-[clamp(2.55rem,4.5vw,4.25rem)]
                font-medium
                leading-[1.02]
                tracking-[-0.043em]
                text-[#211f1c]
              "
            >
              Growth shaped by
              <span className="block italic text-[#2e5d91]">
                insight and evidence.
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
            My work combines search, strategy, behavioral insight, data and
            technology to create practical systems for sustainable digital
            growth.
          </p>
        </div>

        <div
          className="
            mt-12
            grid
            gap-12
            lg:grid-cols-[minmax(360px,0.84fr)_minmax(0,1.16fr)]
            lg:items-start
            lg:gap-14
          "
        >
          <div className="relative">
            <div
              className="
                sticky
                top-[112px]
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
                  min-h-[560px]
                  w-full
                  lg:min-h-[720px]
                "
              >
                <Image
                  src="/images/expertise/expertise.png"
                  alt="Editorial representation of digital growth strategy, search, data and consumer insight"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
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

          <div className="border-t border-[#302d29]/15">
            {expertiseAreas.map((item, index) => (
              <article
                key={item.title}
                className="
                  group
                  grid
                  gap-5
                  border-b
                  border-[#302d29]/15
                  py-8
                  sm:grid-cols-[48px_minmax(0,1fr)_auto]
                  sm:gap-7
                  lg:py-10
                "
              >
                <span
                  className="
                    pt-1
                    font-sans
                    text-[10px]
                    font-semibold
                    tracking-[0.19em]
                    text-[#978f85]
                    transition-colors
                    duration-300
                    group-hover:text-[#8a672f]
                  "
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3
                      className="
                        font-serif
                        text-[clamp(1.75rem,2.7vw,2.6rem)]
                        font-medium
                        leading-[1.08]
                        tracking-[-0.034em]
                        text-[#24211e]
                        transition-colors
                        duration-300
                        group-hover:text-[#2e5d91]
                      "
                    >
                      {item.title}
                    </h3>

                    <span
                      className="
                        rounded-full
                        border
                        border-[#302d29]/15
                        bg-[#ebe4da]/55
                        px-3
                        py-1.5
                        font-sans
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.16em]
                        text-[#756e65]
                      "
                    >
                      {item.label}
                    </span>
                  </div>

                  <p
                    className="
                      mt-5
                      max-w-[760px]
                      font-sans
                      text-[18px]
                      leading-[2.05rem]
                      text-[#625d56]
                      lg:text-[19px]
                      lg:leading-[2.15rem]
                    "
                  >
                    {item.description}
                  </p>
                </div>

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
              </article>
            ))}
          </div>
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
              max-w-[800px]
              font-sans
              text-[18px]
              leading-[2.05rem]
              text-[#625d56]
              lg:text-[19px]
              lg:leading-[2.15rem]
            "
          >
            Each discipline supports the others: research improves strategy,
            strategy guides execution and measurement creates continuous
            learning.
          </p>

          <a
            href="#growth-system"
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
              Explore the growth system
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