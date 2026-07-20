import Image from "next/image";

const researchTopics = [
  {
    category: "AI & Search",
    title: "How AI is changing digital discovery",
    description:
      "Exploring how generative search, large language models and changing user expectations are reshaping the way information is discovered.",
    tags: ["LLM Search", "Search Behavior", "AI"],
  },
  {
    category: "Consumer Psychology",
    title: "Why trust matters more than attention",
    description:
      "Examining how credibility, cognitive ease and perceived risk influence engagement, evaluation and decision-making.",
    tags: ["Trust", "Decision-Making", "Behavior"],
  },
  {
    category: "Marketing Science",
    title: "From marketing activity to evidence",
    description:
      "Studying how measurement, experimentation and research can improve strategic clarity and reduce unsupported assumptions.",
    tags: ["Evidence", "Analytics", "Strategy"],
  },
  {
    category: "Customer Experience",
    title: "The hidden friction shaping satisfaction",
    description:
      "Investigating how confusion, effort and uncertainty affect customer experience across digital journeys.",
    tags: ["Customer Experience", "Friction", "Satisfaction"],
  },
];

const researchAreas = [
  "Artificial Intelligence",
  "Consumer Psychology",
  "Search Behavior",
  "Marketing Science",
  "Decision-Making",
  "Customer Experience",
];

export default function Research() {
  return (
    <section
      id="research"
      aria-labelledby="research-heading"
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
              Research Lab
            </p>

            <h2
              id="research-heading"
              className="
                max-w-[820px]
                font-serif
                text-[clamp(2.5rem,4.5vw,4.2rem)]
                font-medium
                leading-[1.02]
                tracking-[-0.043em]
                text-[#211f1c]
              "
            >
              Research for understanding
              <span className="block italic text-[#2e5d91]">
                what shapes digital decisions.
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
            The Research Lab connects academic evidence, industry developments
            and real business questions to create useful strategic insight.
          </p>
        </div>

        <div
          className="
            mt-12
            grid
            gap-12
            lg:grid-cols-[minmax(380px,0.9fr)_minmax(0,1.1fr)]
            lg:items-start
            lg:gap-14
          "
        >
          <div className="relative">
            <div
              className="
                sticky
                top-[112px]
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
                    aspect-[4/5]
                    min-h-[560px]
                    w-full
                    lg:min-h-[690px]
                  "
                >
                  <Image
                    src="/images/research/research.png"
                    alt="Editorial research environment representing artificial intelligence, consumer psychology and strategic analysis"
                    fill
                    sizes="(max-width: 1024px) 100vw, 44vw"
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
                  border-l
                  border-[#b48a52]
                  pl-5
                "
              >
                <p
                  className="
                    font-sans
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.25em]
                    text-[#8a672f]
                  "
                >
                  Research principle
                </p>

                <p
                  className="
                    mt-3
                    max-w-[560px]
                    font-serif
                    text-[clamp(1.45rem,2.2vw,2rem)]
                    font-medium
                    leading-[1.2]
                    tracking-[-0.028em]
                    text-[#2d2925]
                  "
                >
                  Evidence should simplify decisions, not simply add more
                  information.
                </p>
              </div>

              <div className="mt-7 flex flex-wrap gap-2">
                {researchAreas.map((area) => (
                  <span
                    key={area}
                    className="
                      rounded-full
                      border
                      border-[#302d29]/15
                      bg-[#f7f3ed]/55
                      px-3.5
                      py-2
                      font-sans
                      text-[11px]
                      font-medium
                      text-[#686158]
                    "
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-[#302d29]/15">
            {researchTopics.map((topic, index) => (
              <article
                key={topic.title}
                className="
                  group
                  grid
                  gap-5
                  border-b
                  border-[#302d29]/15
                  py-8
                  sm:grid-cols-[48px_minmax(0,1fr)_44px]
                  sm:gap-7
                  lg:py-9
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
                  <p
                    className="
                      font-sans
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.23em]
                      text-[#8a672f]
                    "
                  >
                    {topic.category}
                  </p>

                  <h3
                    className="
                      mt-4
                      max-w-[720px]
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
                    {topic.title}
                  </h3>

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
                    {topic.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {topic.tags.map((tag) => (
                      <span
                        key={tag}
                        className="
                          rounded-full
                          border
                          border-[#302d29]/15
                          bg-[#f7f3ed]/42
                          px-3.5
                          py-2
                          font-sans
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-[0.12em]
                          text-[#716a61]
                        "
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
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
              max-w-[820px]
              font-sans
              text-[18px]
              leading-[2.05rem]
              text-[#625d56]
              lg:text-[19px]
              lg:leading-[2.15rem]
            "
          >
            Research themes will evolve into long-form analysis, practical
            frameworks, strategic resources and educational materials.
          </p>

          <a
            href="#about"
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
              Discover my perspective
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