import Image from "next/image";

const principles = [
  {
    number: "01",
    title: "Systems thinking",
    description:
      "Every decision should support a connected growth system instead of isolated short-term activity.",
  },
  {
    number: "02",
    title: "Clarity before execution",
    description:
      "Better outcomes happen when priorities, positioning and measurable direction are clear from the beginning.",
  },
  {
    number: "03",
    title: "Long-term growth",
    description:
      "Sustainable systems, trusted experiences and continuous learning create more value than short-term activity alone.",
  },
];

const focusAreas = [
  "SEO & Organic Growth",
  "Digital Strategy",
  "Consumer Psychology",
  "Data & Analytics",
  "AI & Automation",
  "Customer Experience",
];

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="
        scroll-mt-[84px]
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
            lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.7fr)]
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
              About Setareh
            </p>

            <h2
              id="about-heading"
              className="
                max-w-[820px]
                font-serif
                text-[clamp(2.4rem,4.4vw,4.05rem)]
                font-medium
                leading-[1.03]
                tracking-[-0.043em]
                text-[#211f1c]
              "
            >
              A systems-oriented approach
              <span className="block italic text-[#2e5d91]">
                to digital growth.
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
            I combine SEO, strategy, analytics, consumer psychology and
            practical AI systems to build growth foundations that are measurable,
            ethical and designed for long-term value.
          </p>
        </div>

        <div
          className="
            mt-12
            grid
            gap-12
            lg:grid-cols-[minmax(360px,0.9fr)_minmax(0,1.1fr)]
            lg:items-start
            lg:gap-14
          "
        >
          <div>
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
                  min-h-[520px]
                  w-full
                  lg:min-h-[660px]
                "
              >
                <Image
                  src="/images/about/about.png"
                  alt="Setareh Salehabadi working in a strategic research environment"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="
                    object-cover
                    object-center
                  "
                />
              </div>
            </div>
          </div>

          <div>
            <div className="border-t border-[#302d29]/15">
              {principles.map((item) => (
                <article
                  key={item.number}
                  className="
                    grid
                    gap-4
                    border-b
                    border-[#302d29]/15
                    py-8
                    sm:grid-cols-[52px_minmax(180px,0.75fr)_minmax(0,1fr)]
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
                    "
                  >
                    {item.number}
                  </span>

                  <h3
                    className="
                      font-serif
                      text-[clamp(1.85rem,2.5vw,2.7rem)]
                      font-medium
                      leading-[1.08]
                      tracking-[-0.035em]
                      text-[#24211e]
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      max-w-[580px]
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
                </article>
              ))}
            </div>

            <div className="mt-10">
              <p
                className="
                  mb-5
                  font-sans
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                  text-[#8a672f]
                "
              >
                Areas of focus
              </p>

              <div className="flex flex-wrap gap-3">
                {focusAreas.map((item) => (
                  <span
                    key={item}
                    className="
                      rounded-full
                      border
                      border-[#302d29]/15
                      bg-[#f7f3ed]/55
                      px-4
                      py-2.5
                      font-sans
                      text-[13px]
                      font-medium
                      text-[#645d55]
                    "
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
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
              max-w-[860px]
              font-sans
              text-[18px]
              leading-[2.05rem]
              text-[#625d56]
              lg:text-[19px]
              lg:leading-[2.15rem]
            "
          >
            I am building this platform as a long-term space for selected work,
            independent research, practical frameworks and thoughtful
            perspectives on digital growth.
          </p>

          <a
            href="#newsletter"
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
            <span style={{ color: "#ffffff" }}>Continue to insights</span>

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