const projects = [
  {
    number: "01",
    category: "SEO & Organic Growth",
    brand: "HighDent",
    description:
      "A technical SEO and content growth system designed to improve search visibility, content quality and long-term organic acquisition.",
    outcome: "Organic visibility and sustainable search growth",
    metric: "+45%",
    metricLabel: "Organic traffic",
    chart: "donut",
  },
  {
    number: "02",
    category: "Digital Growth Strategy",
    brand: "Delta",
    description:
      "A connected digital strategy focused on audience development, campaign structure, channel alignment and scalable acquisition.",
    outcome: "Audience growth and stronger digital acquisition",
    metric: "+30%",
    metricLabel: "Sales uplift",
    chart: "line",
  },
  {
    number: "03",
    category: "Industrial SEO Strategy",
    brand: "Omran Niroo",
    description:
      "A search-led growth framework for industrial products, combining technical SEO, product architecture and educational content.",
    outcome: "Stronger product discovery and search coverage",
    metric: "4×",
    metricLabel: "Search coverage",
    chart: "bars",
  },
  {
    number: "04",
    category: "Performance Marketing",
    brand: "Morshed Gohar",
    description:
      "A focused acquisition system connecting landing pages, campaign channels, lead generation and measurable conversion paths.",
    outcome: "More efficient demand generation and lead acquisition",
    metric: "250",
    metricLabel: "Qualified leads",
    chart: "radial",
  },
];

function DonutChart() {
  return (
    <div className="relative flex h-full min-h-[230px] items-center justify-center">
      <div
        className="
          absolute
          h-[190px]
          w-[190px]
          rounded-full
          bg-white/25
          blur-2xl
        "
      />

      <svg
        viewBox="0 0 220 220"
        className="relative h-[180px] w-[180px]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="caseDonutGradient"
            x1="10%"
            y1="0%"
            x2="90%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#315f91" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#7593b2" stopOpacity="0.78" />
            <stop offset="100%" stopColor="#c5a06b" stopOpacity="0.9" />
          </linearGradient>

          <filter id="caseDonutShadow">
            <feDropShadow
              dx="0"
              dy="8"
              stdDeviation="7"
              floodColor="#2e5d91"
              floodOpacity="0.14"
            />
          </filter>
        </defs>

        <circle
          cx="110"
          cy="110"
          r="72"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.4"
          strokeWidth="15"
        />

        <circle
          cx="110"
          cy="110"
          r="72"
          fill="none"
          stroke="url(#caseDonutGradient)"
          strokeWidth="15"
          strokeLinecap="round"
          strokeDasharray="340 452"
          transform="rotate(-90 110 110)"
          filter="url(#caseDonutShadow)"
        />

        <circle
          cx="110"
          cy="110"
          r="49"
          fill="#f7f3ed"
          fillOpacity="0.82"
          stroke="#ffffff"
          strokeOpacity="0.5"
        />

        <text
          x="110"
          y="105"
          textAnchor="middle"
          className="fill-[#24211e] text-[27px] font-medium"
        >
          75%
        </text>

        <text
          x="110"
          y="127"
          textAnchor="middle"
          className="fill-[#777168] text-[9px] uppercase tracking-[0.18em]"
        >
          Growth
        </text>
      </svg>
    </div>
  );
}

function LineChart() {
  return (
    <div className="relative flex h-full min-h-[230px] items-center">
      <div
        className="
          absolute
          inset-x-[10%]
          top-[23%]
          h-[54%]
          rounded-full
          bg-white/30
          blur-3xl
        "
      />

      <svg
        viewBox="0 0 440 250"
        preserveAspectRatio="none"
        className="relative h-[210px] w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="caseLineArea"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#315f91" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#315f91" stopOpacity="0.02" />
          </linearGradient>

          <linearGradient
            id="caseLineStroke"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#c19a64" />
            <stop offset="50%" stopColor="#7897b8" />
            <stop offset="100%" stopColor="#315f91" />
          </linearGradient>
        </defs>

        {[55, 105, 155, 205].map((y) => (
          <line
            key={y}
            x1="22"
            y1={y}
            x2="418"
            y2={y}
            stroke="#726b62"
            strokeOpacity="0.14"
            strokeWidth="1"
          />
        ))}

        <path
          d="M22 211 C72 201, 88 185, 124 188 C166 191, 181 153, 220 157 C270 163, 292 110, 332 119 C368 127, 385 76, 418 59 L418 224 L22 224 Z"
          fill="url(#caseLineArea)"
        />

        <path
          d="M22 211 C72 201, 88 185, 124 188 C166 191, 181 153, 220 157 C270 163, 292 110, 332 119 C368 127, 385 76, 418 59"
          fill="none"
          stroke="url(#caseLineStroke)"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {[
          [22, 211],
          [124, 188],
          [220, 157],
          [332, 119],
          [418, 59],
        ].map(([x, y]) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r="6"
            fill="#f7f3ed"
            stroke="#315f91"
            strokeWidth="2.5"
          />
        ))}
      </svg>

      <div
        className="
          absolute
          right-2
          top-3
          rounded-full
          border
          border-white/45
          bg-white/35
          px-3
          py-2
          text-[9px]
          font-semibold
          uppercase
          tracking-[0.12em]
          text-[#315f91]
          shadow-[0_8px_24px_rgba(46,93,145,0.1)]
          backdrop-blur-md
        "
      >
        Upward trend
      </div>
    </div>
  );
}

function BarChart() {
  const bars = [
    { height: "34%", value: "34", label: "Technical" },
    { height: "48%", value: "48", label: "Content" },
    { height: "66%", value: "67", label: "Products" },
    { height: "82%", value: "82", label: "Visibility" },
  ];

  return (
    <div
      className="
        relative
        flex
        h-full
        min-h-[230px]
        items-end
        justify-center
        gap-4
        px-4
        pb-2
        pt-8
        sm:gap-5
      "
    >
      <div
        className="
          absolute
          bottom-[16%]
          left-[13%]
          right-[13%]
          h-[55%]
          rounded-full
          bg-white/30
          blur-3xl
        "
      />

      {bars.map((bar) => (
        <div
          key={bar.label}
          className="
            relative
            flex
            h-[210px]
            w-full
            max-w-[54px]
            flex-col
            items-center
            justify-end
          "
        >
          <span
            className="
              mb-2
              font-sans
              text-[10px]
              font-semibold
              text-[#6e675f]
            "
          >
            {bar.value}
          </span>

          <div
            className="
              relative
              w-full
              overflow-hidden
              rounded-t-[16px]
              border
              border-white/45
              bg-white/20
              shadow-[0_14px_30px_rgba(46,93,145,0.1)]
              backdrop-blur-md
            "
            style={{ height: bar.height }}
          >
            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-[#315f91]/95
                via-[#718eaa]/75
                to-[#c6a06b]/80
              "
            />

            <div
              className="
                absolute
                inset-x-1
                top-1
                h-[38%]
                rounded-t-[12px]
                bg-gradient-to-b
                from-white/35
                to-transparent
              "
            />
          </div>

          <span
            className="
              mt-3
              whitespace-nowrap
              font-sans
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.1em]
              text-[#777168]
            "
          >
            {bar.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function RadialChart() {
  return (
    <div className="relative flex h-full min-h-[230px] items-center justify-center">
      <div
        className="
          absolute
          h-[180px]
          w-[180px]
          rounded-full
          bg-white/35
          blur-3xl
        "
      />

      <svg
        viewBox="0 0 280 280"
        className="relative h-[195px] w-[195px]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="caseRadialGradient"
            x1="10%"
            y1="0%"
            x2="90%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#315f91" stopOpacity="0.3" />
            <stop offset="55%" stopColor="#7994ae" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#c19a64" stopOpacity="0.28" />
          </linearGradient>

          <filter id="caseRadialShadow">
            <feDropShadow
              dx="0"
              dy="8"
              stdDeviation="8"
              floodColor="#315f91"
              floodOpacity="0.12"
            />
          </filter>
        </defs>

        {[103, 77, 51].map((radius) => (
          <circle
            key={radius}
            cx="140"
            cy="140"
            r={radius}
            fill="none"
            stroke="#6f6961"
            strokeOpacity="0.17"
            strokeWidth="1"
          />
        ))}

        <path
          d="M140 38 L169 68 L210 62 L218 106 L244 140 L217 173 L219 216 L174 210 L140 242 L108 212 L63 218 L66 174 L37 140 L65 108 L62 64 L107 69 Z"
          fill="url(#caseRadialGradient)"
          stroke="#315f91"
          strokeWidth="3"
          strokeLinejoin="round"
          filter="url(#caseRadialShadow)"
        />

        {[
          [140, 38],
          [210, 62],
          [244, 140],
          [219, 216],
          [140, 242],
          [63, 218],
          [37, 140],
          [62, 64],
        ].map(([x, y]) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r="5"
            fill="#c19a64"
          />
        ))}

        <circle
          cx="140"
          cy="140"
          r="42"
          fill="#f7f3ed"
          fillOpacity="0.86"
          stroke="#ffffff"
          strokeOpacity="0.55"
        />

        <text
          x="140"
          y="134"
          textAnchor="middle"
          className="fill-[#24211e] text-[25px] font-medium"
        >
          250
        </text>

        <text
          x="140"
          y="157"
          textAnchor="middle"
          className="fill-[#777168] text-[8px] uppercase tracking-[0.16em]"
        >
          Leads
        </text>
      </svg>
    </div>
  );
}

function ProjectChart({ type }: { type: string }) {
  if (type === "donut") {
    return <DonutChart />;
  }

  if (type === "line") {
    return <LineChart />;
  }

  if (type === "bars") {
    return <BarChart />;
  }

  return <RadialChart />;
}

export default function CaseStudies() {
  return (
    <section
      id="case-studies"
      aria-labelledby="case-studies-heading"
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
              Selected Projects
            </p>

            <h2
              id="case-studies-heading"
              className="
                max-w-[780px]
                font-serif
                text-[clamp(2.5rem,4.5vw,4.2rem)]
                font-medium
                leading-[1.02]
                tracking-[-0.043em]
                text-[#211f1c]
              "
            >
              Selected work,
              <span className="block italic text-[#2e5d91]">
                measured through outcomes.
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
            A selection of projects connecting strategic diagnosis, execution
            and measurable learning across different business environments.
          </p>
        </div>

        <div className="mt-12 grid gap-7 lg:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.brand}
              className="
                group
                overflow-hidden
                rounded-[26px]
                border
                border-[#302d29]/13
                bg-[#fbf8f3]
                transition-all
                duration-500
                hover:-translate-y-1
                hover:border-[#2e5d91]/28
                hover:shadow-[0_28px_65px_rgba(57,47,37,0.1)]
                sm:rounded-[30px]
              "
            >
              <div
                className="
                  grid
                  min-h-full
                  lg:grid-cols-[minmax(0,0.98fr)_minmax(240px,1.02fr)]
                "
              >
                <div
                  className="
                    flex
                    flex-col
                    border-b
                    border-[#302d29]/12
                    p-7
                    sm:p-8
                    lg:border-b-0
                    lg:border-r
                    lg:p-9
                  "
                >
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <span
                        className="
                          block
                          font-sans
                          text-[10px]
                          font-semibold
                          tracking-[0.18em]
                          text-[#928a80]
                        "
                      >
                        {project.number}
                      </span>

                      <p
                        className="
                          mt-3
                          font-sans
                          text-[9px]
                          font-semibold
                          uppercase
                          tracking-[0.22em]
                          text-[#8a672f]
                        "
                      >
                        {project.category}
                      </p>
                    </div>

                    <span
                      aria-hidden="true"
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#302d29]/15
                        text-sm
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

                  <h3
                    className="
                      mt-8
                      font-serif
                      text-[clamp(2rem,3vw,3rem)]
                      font-medium
                      leading-none
                      tracking-[-0.04em]
                      text-[#24211e]
                    "
                  >
                    {project.brand}
                  </h3>

                  <p
                    className="
                      mt-5
                      font-sans
                      text-[17px]
                      leading-8
                      text-[#625d56]
                      sm:text-[18px]
                      sm:leading-[2rem]
                    "
                  >
                    {project.description}
                  </p>

                  <div
                    className="
                      mt-9
                      border-t
                      border-[#302d29]/15
                      pt-6
                      lg:mt-auto
                    "
                  >
                    <p
                      className="
                        font-sans
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.22em]
                        text-[#8a672f]
                      "
                    >
                      Project outcome
                    </p>

                    <p
                      className="
                        mt-3
                        font-serif
                        text-[1.5rem]
                        font-medium
                        leading-[1.2]
                        tracking-[-0.025em]
                        text-[#34302b]
                      "
                    >
                      {project.outcome}
                    </p>

                    <div className="mt-5 flex items-end justify-between gap-5">
                      <div>
                        <span
                          className="
                            block
                            font-serif
                            text-[2.1rem]
                            font-medium
                            leading-none
                            tracking-[-0.04em]
                            text-[#2e5d91]
                          "
                        >
                          {project.metric}
                        </span>

                        <span
                          className="
                            mt-2
                            block
                            font-sans
                            text-[11px]
                            font-medium
                            text-[#777168]
                          "
                        >
                          {project.metricLabel}
                        </span>
                      </div>

                      <div
                        className="
                          h-px
                          flex-1
                          bg-gradient-to-r
                          from-[#b48a52]/45
                          to-transparent
                        "
                      />
                    </div>
                  </div>
                </div>

                <div
                  className="
                    relative
                    min-h-[260px]
                    overflow-hidden
                    bg-gradient-to-br
                    from-[#eee7de]
                    via-[#f6f1ea]
                    to-[#ded3c5]
                    p-5
                    sm:min-h-[280px]
                    sm:p-6
                    lg:min-h-full
                  "
                >
                  <div
                    className="
                      pointer-events-none
                      absolute
                      -right-12
                      -top-12
                      h-40
                      w-40
                      rounded-full
                      bg-[#315f91]/12
                      blur-3xl
                    "
                  />

                  <div
                    className="
                      pointer-events-none
                      absolute
                      -bottom-14
                      -left-12
                      h-44
                      w-44
                      rounded-full
                      bg-[#c19a64]/16
                      blur-3xl
                    "
                  />

                  <div
                    className="
                      relative
                      h-full
                      min-h-[230px]
                      rounded-[22px]
                      border
                      border-white/45
                      bg-white/18
                      p-4
                      shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_18px_42px_rgba(61,51,41,0.06)]
                      backdrop-blur-md
                    "
                  >
                    <ProjectChart type={project.chart} />
                  </div>
                </div>
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
            The charts communicate the direction of progress while keeping the
            focus on strategy, business context and measurable outcomes.
          </p>

          <a
            href="#research"
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
              Explore the research
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