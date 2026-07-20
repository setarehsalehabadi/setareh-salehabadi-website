const navigation = [
  { label: "Expertise", href: "#expertise" },
  { label: "Growth System", href: "#growth-system" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Research", href: "#research" },
  { label: "About", href: "#about" },
  { label: "Newsletter", href: "#newsletter" },
];

const focusAreas = [
  "SEO & Organic Growth",
  "Digital Strategy",
  "Consumer Psychology",
  "Data & Analytics",
  "AI & Automation",
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="
        relative
        overflow-hidden
        border-t
        border-[#302d29]/15
        bg-[#e1d8cc]
        text-[#211f1c]
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-24
          top-20
          h-72
          w-72
          rounded-full
          bg-[#b48a52]/10
          blur-[110px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-24
          top-12
          h-80
          w-80
          rounded-full
          bg-[#2e5d91]/10
          blur-[120px]
        "
      />

      <div
        className="
          relative
          mx-auto
          max-w-[1480px]
          px-5
          pb-8
          pt-16
          sm:px-8
          sm:pt-20
          lg:px-12
          lg:pt-24
          xl:px-16
        "
      >
        <div
          className="
            grid
            gap-12
            border-b
            border-[#302d29]/15
            pb-12
            lg:grid-cols-[minmax(0,1.25fr)_minmax(180px,0.46fr)_minmax(220px,0.58fr)]
            lg:gap-16
          "
        >
          <div>
            <p
              className="
                font-sans
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.3em]
                text-[#8a672f]
              "
            >
              Setareh Salehabadi
            </p>

            <h2
              className="
                mt-5
                max-w-[760px]
                font-serif
                text-[clamp(2.25rem,4.1vw,3.9rem)]
                font-medium
                leading-[1.02]
                tracking-[-0.043em]
                text-[#211f1c]
              "
            >
              Building clearer systems
              <span className="block italic text-[#2e5d91]">
                for sustainable digital growth.
              </span>
            </h2>

            <p
              className="
                mt-7
                max-w-[700px]
                font-sans
                text-[18px]
                leading-[2.05rem]
                text-[#625d56]
                lg:text-[19px]
                lg:leading-[2.15rem]
              "
            >
              Digital Growth Strategist working across SEO, strategy, consumer
              psychology, analytics, customer experience and practical AI
              systems.
            </p>

            <div
              className="
                mt-8
                flex
                flex-col
                gap-4
                sm:flex-row
                sm:flex-wrap
              "
            >
              <a
                href="mailto:hello@setarehsalehabadi.com"
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
                  sm:text-[16px]
                "
                style={{ color: "#ffffff" }}
              >
                <span style={{ color: "#ffffff" }}>
                  Start a conversation
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
                  border
                  border-[#302d29]
                  bg-[#302d29]
                  px-9
                  font-sans
                  text-[15px]
                  font-semibold
                  leading-none
                  shadow-[0_14px_30px_rgba(48,45,41,0.14)]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-[#2e5d91]
                  hover:bg-[#2e5d91]
                  hover:shadow-[0_18px_38px_rgba(46,93,145,0.2)]
                  focus-visible:outline-none
                  focus-visible:ring-4
                  focus-visible:ring-[#2e5d91]/20
                  sm:text-[16px]
                "
                style={{ color: "#ffffff" }}
              >
                <span style={{ color: "#ffffff" }}>
                  View selected work
                </span>

                <span
                  aria-hidden="true"
                  className="
                    text-[18px]
                    transition-transform
                    duration-300
                    group-hover:translate-x-0.5
                  "
                  style={{ color: "#ffffff" }}
                >
                  →
                </span>
              </a>
            </div>
          </div>

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
              Navigation
            </p>

            <nav
              aria-label="Footer navigation"
              className="mt-6"
            >
              <ul className="space-y-4">
                {navigation.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="
                        group
                        inline-flex
                        items-center
                        gap-3
                        font-sans
                        text-[15px]
                        font-medium
                        text-[#4f4942]
                        transition-colors
                        duration-300
                        hover:text-[#2e5d91]
                      "
                    >
                      <span
                        aria-hidden="true"
                        className="
                          h-px
                          w-3
                          bg-[#b48a52]
                          transition-all
                          duration-300
                          group-hover:w-6
                          group-hover:bg-[#2e5d91]
                        "
                      />

                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

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
              Focus
            </p>

            <ul className="mt-6 space-y-4">
              {focusAreas.map((area) => (
                <li
                  key={area}
                  className="
                    font-sans
                    text-[15px]
                    leading-7
                    text-[#625d56]
                  "
                >
                  {area}
                </li>
              ))}
            </ul>

            <div
              className="
                mt-8
                border-t
                border-[#302d29]/15
                pt-7
              "
            >
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
                Connect
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="
                    inline-flex
                    min-h-[42px]
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#302d29]/18
                    bg-[#f7f3ed]/50
                    px-5
                    font-sans
                    text-[12px]
                    font-semibold
                    text-[#4f4942]
                    transition-all
                    duration-300
                    hover:border-[#2e5d91]
                    hover:bg-[#2e5d91]
                    hover:text-white
                  "
                >
                  LinkedIn
                </a>

                <a
                  href="mailto:hello@setarehsalehabadi.com"
                  className="
                    inline-flex
                    min-h-[42px]
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#302d29]/18
                    bg-[#f7f3ed]/50
                    px-5
                    font-sans
                    text-[12px]
                    font-semibold
                    text-[#4f4942]
                    transition-all
                    duration-300
                    hover:border-[#2e5d91]
                    hover:bg-[#2e5d91]
                    hover:text-white
                  "
                >
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          className="
            grid
            gap-8
            border-b
            border-[#302d29]/15
            py-9
            md:grid-cols-[minmax(0,1fr)_auto]
            md:items-center
          "
        >
          <div>
            <p
              className="
                max-w-[820px]
                font-serif
                text-[clamp(1.55rem,2.4vw,2.2rem)]
                font-medium
                leading-[1.2]
                tracking-[-0.03em]
                text-[#302b26]
              "
            >
              Research, strategy and practical systems for better digital
              decisions.
            </p>

            <p
              className="
                mt-4
                max-w-[760px]
                font-sans
                text-[17px]
                leading-8
                text-[#6d665e]
                sm:text-[18px]
                sm:leading-[2rem]
              "
            >
              Available for selected remote collaborations, strategic
              consulting and international digital growth projects.
            </p>
          </div>

          <a
            href="#top"
            aria-label="Back to the top of the page"
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              justify-self-start
              rounded-full
              border
              border-[#183655]
              bg-[#183655]
              font-sans
              text-[20px]
              font-semibold
              shadow-[0_12px_28px_rgba(24,54,85,0.16)]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-[#2e5d91]
              hover:bg-[#2e5d91]
              hover:shadow-[0_18px_36px_rgba(46,93,145,0.22)]
              md:justify-self-end
            "
            style={{ color: "#ffffff" }}
          >
            <span style={{ color: "#ffffff" }}>↑</span>
          </a>
        </div>

        <div
          className="
            flex
            flex-col
            gap-4
            pt-7
            font-sans
            text-[12px]
            leading-6
            text-[#756e65]
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p>
            © {currentYear} Setareh Salehabadi. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a
              href="/privacy"
              className="
                transition-colors
                duration-300
                hover:text-[#2e5d91]
              "
            >
              Privacy
            </a>

            <a
              href="/terms"
              className="
                transition-colors
                duration-300
                hover:text-[#2e5d91]
              "
            >
              Terms
            </a>

            <span>
              Designed for clarity, trust and long-term growth.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}