export default function Newsletter() {
  const topics = [
    "AI & Technology",
    "SEO & Search",
    "Consumer Psychology",
    "Digital Strategy",
    "Business Growth",
  ];

  const highlights = [
    {
      title: "Curated",
      description: "Selected topics only",
    },
    {
      title: "Practical",
      description: "Clear strategic value",
    },
    {
      title: "Focused",
      description: "No unnecessary noise",
    },
  ];

  return (
    <section
      id="newsletter"
      aria-labelledby="newsletter-heading"
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
          py-16
          sm:px-8
          sm:py-20
          lg:px-12
          lg:py-24
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
            lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.75fr)]
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
              Strategic Briefing
            </p>

            <h2
              id="newsletter-heading"
              className="
                max-w-[760px]
                font-serif
                text-[clamp(2.35rem,4.1vw,3.95rem)]
                font-medium
                leading-[1.03]
                tracking-[-0.042em]
                text-[#211f1c]
              "
            >
              Useful signals for
              <span className="block italic text-[#2e5d91]">
                clearer digital decisions.
              </span>
            </h2>
          </div>

          <p
            className="
              max-w-[580px]
              font-sans
              text-[18px]
              leading-[2.05rem]
              text-[#625d56]
              lg:justify-self-end
              lg:text-[19px]
              lg:leading-[2.15rem]
            "
          >
            Receive a concise selection of research, market developments and
            practical insights across AI, search, consumer behavior and digital
            growth.
          </p>
        </div>

        <div
          className="
            mt-10
            grid
            gap-8
            rounded-[30px]
            border
            border-[#302d29]/12
            bg-[#f6f1ea]
            p-6
            shadow-[0_20px_50px_rgba(57,48,40,0.06)]
            sm:p-8
            lg:grid-cols-[minmax(300px,0.9fr)_minmax(420px,1.1fr)]
            lg:gap-10
            lg:p-10
          "
        >
          <div className="flex flex-col justify-between gap-8">
            <div>
              <h3
                className="
                  max-w-[500px]
                  font-serif
                  text-[clamp(2rem,3.1vw,3rem)]
                  font-medium
                  leading-[1.08]
                  tracking-[-0.035em]
                  text-[#26221d]
                "
              >
                A thoughtful briefing,
                <span className="block italic text-[#8a672f]">
                  not another crowded newsletter.
                </span>
              </h3>

              <p
                className="
                  mt-6
                  max-w-[540px]
                  font-sans
                  text-[17px]
                  leading-[1.95rem]
                  text-[#676158]
                  lg:text-[18px]
                  lg:leading-[2.05rem]
                "
              >
                Each edition is designed to help you understand what is
                changing, why it matters and how it may affect strategy,
                customer experience and long-term growth.
              </p>
            </div>

            <div>
              <p
                className="
                  mb-4
                  font-sans
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.24em]
                  text-[#8a672f]
                "
              >
                Topics
              </p>

              <div className="flex flex-wrap gap-3">
                {topics.map((topic) => (
                  <span
                    key={topic}
                    className="
                      rounded-full
                      border
                      border-[#302d29]/14
                      bg-white/50
                      px-4
                      py-2.5
                      font-sans
                      text-[13px]
                      font-medium
                      text-[#5f5a53]
                    "
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div
            className="
              rounded-[26px]
              border
              border-[#302d29]/12
              bg-[#fffdfa]
              p-6
              sm:p-7
              lg:p-8
            "
          >
            <p
              className="
                mb-3
                font-sans
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.25em]
                text-[#8a672f]
              "
            >
              Join the newsletter
            </p>

            <h3
              className="
                max-w-[520px]
                font-serif
                text-[clamp(1.9rem,3vw,3rem)]
                font-medium
                leading-[1.08]
                tracking-[-0.035em]
                text-[#241f1b]
              "
            >
              Start with the next
              <span className="block">strategic briefing.</span>
            </h3>

            <p
              className="
                mt-4
                max-w-[560px]
                font-sans
                text-[17px]
                leading-[1.95rem]
                text-[#676158]
                lg:text-[18px]
                lg:leading-[2.05rem]
              "
            >
              No noise, exaggerated promises or daily promotional emails. Only
              selected insights and practical analysis.
            </p>

            <form className="mt-7">
              <div
                className="
                  flex
                  flex-col
                  gap-4
                  sm:flex-row
                "
              >
                <input
                  type="email"
                  placeholder="Your email address"
                  className="
                    min-h-[58px]
                    w-full
                    rounded-full
                    border
                    border-[#302d29]/14
                    bg-[#f8f4ee]
                    px-6
                    font-sans
                    text-[15px]
                    text-[#241f1b]
                    outline-none
                    placeholder:text-[#8f877d]
                    focus:border-[#2e5d91]/40
                    focus:ring-4
                    focus:ring-[#2e5d91]/10
                  "
                />

                <button
                  type="submit"
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
                    px-9
                    font-sans
                    text-[15px]
                    font-semibold
                    leading-none
                    shadow-[0_14px_30px_rgba(24,54,85,0.16)]
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:border-[#2e5d91]
                    hover:bg-[#2e5d91]
                    hover:shadow-[0_18px_38px_rgba(46,93,145,0.22)]
                    focus-visible:outline-none
                    focus-visible:ring-4
                    focus-visible:ring-[#2e5d91]/18
                    sm:px-8
                    sm:text-[16px]
                  "
                  style={{ color: "#ffffff" }}
                >
                  <span style={{ color: "#ffffff" }}>Subscribe</span>

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
                </button>
              </div>

              <p
                className="
                  mt-4
                  max-w-[620px]
                  font-sans
                  text-[13px]
                  leading-6
                  text-[#8a8379]
                "
              >
                By subscribing, you agree to receive editorial updates from
                Setareh Salehabadi. You can unsubscribe at any time.
              </p>
            </form>

            <div
              className="
                mt-8
                grid
                gap-5
                border-t
                border-[#302d29]/12
                pt-6
                sm:grid-cols-3
              "
            >
              {highlights.map((item) => (
                <div key={item.title}>
                  <p
                    className="
                      font-serif
                      text-[1.8rem]
                      leading-none
                      tracking-[-0.03em]
                      text-[#2e5d91]
                    "
                  >
                    {item.title}
                  </p>

                  <p
                    className="
                      mt-2
                      font-sans
                      text-[14px]
                      leading-6
                      text-[#857d73]
                    "
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}