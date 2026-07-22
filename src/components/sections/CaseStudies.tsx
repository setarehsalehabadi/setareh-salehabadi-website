import {
  defaultLocale,
  type Locale,
} from "@/i18n/config";
import en from "@/i18n/dictionaries/en";
import type { Dictionary } from "@/i18n/get-dictionary";

type CaseStudiesProps = {
  locale?: Locale;
  dictionary?: Dictionary["caseStudies"];
};

type Project =
  Dictionary["caseStudies"]["projects"][number];

type ChartType = Project["chart"];

type ChartLabels =
  Dictionary["caseStudies"]["chartLabels"];

type ChartProps = {
  chartId: string;
  metric: string;
  metricLabel: string;
  labels: ChartLabels;
  isPersian: boolean;
};

function containsPersian(text: string) {
  return /[\u0600-\u06ff]/.test(text);
}

function getPercentageValue(metric: string) {
  const parsedValue = Number.parseFloat(
    metric.replace(/[^\d.-]/g, "")
  );

  if (Number.isNaN(parsedValue)) {
    return 0;
  }

  return Math.min(
    Math.max(parsedValue, 0),
    100
  );
}

function DonutChart({
  chartId,
  metric,
  metricLabel,
  labels,
  isPersian,
}: ChartProps) {
  const radius = 72;
  const circumference =
    2 * Math.PI * radius;

  const percentage =
    getPercentageValue(metric);

  const progressLength =
    (percentage / 100) *
    circumference;

  const gradientId =
    `${chartId}-donut-gradient`;

  return (
    <div
      aria-hidden="true"
      className="
        relative
        flex
        h-full
        min-h-[230px]
        items-center
        justify-center
      "
    >
      <div
        className="
          absolute
          h-[190px]
          w-[190px]
          rounded-full
          bg-white/30
          blur-2xl
        "
      />

      <svg
        viewBox="0 0 220 220"
        className="
          relative
          h-[184px]
          w-[184px]
        "
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="10%"
            y1="0%"
            x2="90%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor="#315f91"
              stopOpacity="0.95"
            />

            <stop
              offset="55%"
              stopColor="#7593b2"
              stopOpacity="0.82"
            />

            <stop
              offset="100%"
              stopColor="#c5a06b"
              stopOpacity="0.9"
            />
          </linearGradient>
        </defs>

        <circle
          cx="110"
          cy="110"
          r={radius}
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.48"
          strokeWidth="15"
        />

        <circle
          cx="110"
          cy="110"
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="15"
          strokeLinecap="round"
          strokeDasharray={`${progressLength} ${circumference}`}
          transform="rotate(-90 110 110)"
        />

        <circle
          cx="110"
          cy="110"
          r="49"
          fill="#f7f3ed"
          fillOpacity="0.86"
          stroke="#ffffff"
          strokeOpacity="0.58"
        />
      </svg>

      <div
        className="
          absolute
          inset-0
          flex
          flex-col
          items-center
          justify-center
          px-6
          text-center
        "
      >
        <span
          dir="ltr"
          className="
            font-sans
            text-[28px]
            font-semibold
            leading-none
            text-[#24211e]
          "
        >
          {metric}
        </span>

        <span
          className={`
            mt-2
            max-w-[110px]
            font-sans
            font-semibold
            text-[#777168]
            ${
              isPersian
                ? "text-[10px] leading-5 tracking-normal"
                : "text-[9px] uppercase leading-4 tracking-[0.1em]"
            }
          `}
        >
          {metricLabel}
        </span>

        <span
          className={`
            mt-1
            font-sans
            text-[#8a672f]
            ${
              isPersian
                ? "text-[9px] tracking-normal"
                : "text-[8px] uppercase tracking-[0.1em]"
            }
          `}
        >
          {labels.growth}
        </span>
      </div>
    </div>
  );
}

function LineChart({
  chartId,
  metric,
  metricLabel,
  labels,
  isPersian,
}: ChartProps) {
  const areaGradientId =
    `${chartId}-line-area`;

  const strokeGradientId =
    `${chartId}-line-stroke`;

  return (
    <div
      aria-hidden="true"
      className="
        relative
        flex
        h-full
        min-h-[230px]
        items-center
      "
    >
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
        className="
          relative
          h-[210px]
          w-full
        "
      >
        <defs>
          <linearGradient
            id={areaGradientId}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor="#315f91"
              stopOpacity="0.3"
            />

            <stop
              offset="100%"
              stopColor="#315f91"
              stopOpacity="0.02"
            />
          </linearGradient>

          <linearGradient
            id={strokeGradientId}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop
              offset="0%"
              stopColor="#c19a64"
            />

            <stop
              offset="50%"
              stopColor="#7897b8"
            />

            <stop
              offset="100%"
              stopColor="#315f91"
            />
          </linearGradient>
        </defs>

        {[55, 105, 155, 205].map(
          (y) => (
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
          )
        )}

        <path
          d="
            M22 211
            C72 201, 88 185, 124 188
            C166 191, 181 153, 220 157
            C270 163, 292 110, 332 119
            C368 127, 385 76, 418 59
            L418 224
            L22 224
            Z
          "
          fill={`url(#${areaGradientId})`}
        />

        <path
          d="
            M22 211
            C72 201, 88 185, 124 188
            C166 191, 181 153, 220 157
            C270 163, 292 110, 332 119
            C368 127, 385 76, 418 59
          "
          fill="none"
          stroke={`url(#${strokeGradientId})`}
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
        className={`
          absolute
          top-3
          rounded-[16px]
          border
          border-white/50
          bg-white/50
          px-4
          py-3
          shadow-[0_8px_24px_rgba(46,93,145,0.1)]
          backdrop-blur-md
          ${
            isPersian
              ? "right-2 text-right"
              : "right-2 text-left"
          }
        `}
      >
        <span
          dir="ltr"
          className="
            block
            font-sans
            text-[22px]
            font-semibold
            leading-none
            text-[#315f91]
          "
        >
          {metric}
        </span>

        <span
          className={`
            mt-1.5
            block
            max-w-[130px]
            font-sans
            font-semibold
            text-[#6e675f]
            ${
              isPersian
                ? "text-[10px] leading-5 tracking-normal"
                : "text-[9px] uppercase leading-4 tracking-[0.1em]"
            }
          `}
        >
          {metricLabel}
        </span>
      </div>

      <div
        className={`
          absolute
          bottom-4
          rounded-full
          border
          border-white/45
          bg-white/35
          px-3
          py-2
          font-sans
          font-semibold
          text-[#315f91]
          backdrop-blur-md
          ${
            isPersian
              ? "left-2 text-[10px] tracking-normal"
              : "left-2 text-[9px] uppercase tracking-[0.1em]"
          }
        `}
      >
        {labels.upwardTrend}
      </div>
    </div>
  );
}

function BarChart({
  metric,
  metricLabel,
  labels,
  isPersian,
}: ChartProps) {
  const bars = [
    {
      label: labels.technical,
      tone:
        "from-[#315f91]/92 to-[#7593b2]/70",
    },
    {
      label: labels.content,
      tone:
        "from-[#436c98]/90 to-[#93a9bd]/72",
    },
    {
      label: labels.products,
      tone:
        "from-[#5f7f9e]/88 to-[#b9ae9a]/72",
    },
    {
      label: labels.visibility,
      tone:
        "from-[#7d8390]/88 to-[#c5a06b]/82",
    },
  ];

  return (
    <div
      aria-hidden="true"
      className="
        relative
        flex
        h-full
        min-h-[230px]
        flex-col
        justify-center
        px-2
        py-4
      "
    >
      <div
        className="
          absolute
          inset-x-[12%]
          bottom-[14%]
          h-[58%]
          rounded-full
          bg-white/30
          blur-3xl
        "
      />

      <div className="relative text-center">
        <span
          dir="ltr"
          className="
            block
            font-sans
            text-[28px]
            font-semibold
            leading-none
            text-[#315f91]
          "
        >
          {metric}
        </span>

        <span
          className={`
            mt-2
            block
            font-sans
            font-semibold
            text-[#6e675f]
            ${
              isPersian
                ? "text-[10px] leading-5 tracking-normal"
                : "text-[9px] uppercase tracking-[0.1em]"
            }
          `}
        >
          {metricLabel}
        </span>
      </div>

      <div
        className="
          relative
          mt-6
          grid
          grid-cols-4
          items-end
          gap-2
          sm:gap-3
        "
      >
        {bars.map((bar) => (
          <div
            key={bar.label}
            className="
              flex
              min-w-0
              flex-col
              items-center
            "
          >
            <div
              className="
                relative
                h-[116px]
                w-full
                max-w-[50px]
                overflow-hidden
                rounded-t-[15px]
                border
                border-white/45
                bg-white/25
                shadow-[0_14px_30px_rgba(46,93,145,0.09)]
                backdrop-blur-md
                sm:h-[126px]
              "
            >
              <div
                className={`
                  absolute
                  inset-0
                  bg-gradient-to-t
                  ${bar.tone}
                `}
              />

              <div
                className="
                  absolute
                  inset-x-1
                  top-1
                  h-[38%]
                  rounded-t-[11px]
                  bg-gradient-to-b
                  from-white/35
                  to-transparent
                "
              />
            </div>

            <span
              className={`
                mt-3
                max-w-full
                text-center
                font-sans
                font-semibold
                text-[#777168]
                ${
                  isPersian
                    ? "text-[9px] leading-5 tracking-normal sm:text-[10px]"
                    : "text-[8px] uppercase leading-4 tracking-[0.06em]"
                }
              `}
            >
              {bar.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RadialChart({
  chartId,
  metric,
  metricLabel,
  labels,
  isPersian,
}: ChartProps) {
  const gradientId =
    `${chartId}-radial-gradient`;

  return (
    <div
      aria-hidden="true"
      className="
        relative
        flex
        h-full
        min-h-[230px]
        items-center
        justify-center
      "
    >
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
        className="
          relative
          h-[198px]
          w-[198px]
        "
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="10%"
            y1="0%"
            x2="90%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor="#315f91"
              stopOpacity="0.3"
            />

            <stop
              offset="55%"
              stopColor="#7994ae"
              stopOpacity="0.2"
            />

            <stop
              offset="100%"
              stopColor="#c19a64"
              stopOpacity="0.28"
            />
          </linearGradient>
        </defs>

        {[103, 77, 51].map(
          (radius) => (
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
          )
        )}

        <path
          d="
            M140 38
            L169 68
            L210 62
            L218 106
            L244 140
            L217 173
            L219 216
            L174 210
            L140 242
            L108 212
            L63 218
            L66 174
            L37 140
            L65 108
            L62 64
            L107 69
            Z
          "
          fill={`url(#${gradientId})`}
          stroke="#315f91"
          strokeWidth="3"
          strokeLinejoin="round"
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
          r="46"
          fill="#f7f3ed"
          fillOpacity="0.9"
          stroke="#ffffff"
          strokeOpacity="0.62"
        />
      </svg>

      <div
        className="
          absolute
          inset-0
          flex
          flex-col
          items-center
          justify-center
          px-6
          text-center
        "
      >
        <span
          dir="ltr"
          className="
            font-sans
            text-[26px]
            font-semibold
            leading-none
            text-[#24211e]
          "
        >
          {metric}
        </span>

        <span
          className={`
            mt-2
            max-w-[110px]
            font-sans
            font-semibold
            text-[#777168]
            ${
              isPersian
                ? "text-[9px] leading-5 tracking-normal"
                : "text-[8px] uppercase leading-4 tracking-[0.08em]"
            }
          `}
        >
          {metricLabel}
        </span>

        <span
          className={`
            mt-1
            font-sans
            text-[#8a672f]
            ${
              isPersian
                ? "text-[9px] tracking-normal"
                : "text-[8px] uppercase tracking-[0.08em]"
            }
          `}
        >
          {labels.leads}
        </span>
      </div>
    </div>
  );
}

function ProjectChart({
  type,
  chartId,
  metric,
  metricLabel,
  labels,
  isPersian,
}: {
  type: ChartType;
  chartId: string;
  metric: string;
  metricLabel: string;
  labels: ChartLabels;
  isPersian: boolean;
}) {
  const chartProps: ChartProps = {
    chartId,
    metric,
    metricLabel,
    labels,
    isPersian,
  };

  switch (type) {
    case "donut":
      return (
        <DonutChart {...chartProps} />
      );

    case "line":
      return (
        <LineChart {...chartProps} />
      );

    case "bars":
      return (
        <BarChart {...chartProps} />
      );

    case "radial":
      return (
        <RadialChart {...chartProps} />
      );

    default:
      return null;
  }
}

export default function CaseStudies({
  locale = defaultLocale,
  dictionary = en.caseStudies,
}: CaseStudiesProps) {
  const isPersian =
    locale === "fa" ||
    containsPersian(
      [
        dictionary.eyebrow,
        dictionary.title.first,
        dictionary.title.highlighted,
        dictionary.introduction,
      ].join(" ")
    );

  return (
    <section
      id="case-studies"
      aria-labelledby="case-studies-heading"
      className="
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
            gap-8
            border-b
            border-[#302d29]/15
            pb-10
            lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.72fr)]
            lg:items-end
            lg:gap-16
            lg:pb-12
          "
        >
          <div>
            <p
              className={`
                mb-5
                font-sans
                font-semibold
                text-[#8a672f]
                ${
                  isPersian
                    ? "text-[11px] leading-6 tracking-normal sm:text-[12px]"
                    : "text-[11px] uppercase tracking-[0.3em]"
                }
              `}
            >
              {dictionary.eyebrow}
            </p>

            <h2
              id="case-studies-heading"
              className={`
                max-w-[800px]
                text-[#211f1c]
                ${
                  isPersian
                    ? "font-sans text-[clamp(2.15rem,3.7vw,3.55rem)] font-[650] leading-[1.48] tracking-normal"
                    : "font-serif text-[clamp(2.5rem,4.5vw,4.2rem)] font-medium leading-[1.02] tracking-[-0.043em]"
                }
              `}
            >
              <span>
                {dictionary.title.first}
              </span>

              <span
                className={`
                  block
                  text-[#2e5d91]
                  ${
                    isPersian
                      ? "mt-1"
                      : "italic"
                  }
                `}
              >
                {dictionary.title.highlighted}
              </span>
            </h2>
          </div>

          <p
            className={`
              max-w-[620px]
              font-sans
              text-[#5f5a53]
              lg:justify-self-end
              ${
                isPersian
                  ? "text-[16px] leading-[2.05] sm:text-[17px]"
                  : "text-[18px] leading-[2.05rem] lg:text-[19px] lg:leading-[2.15rem]"
              }
            `}
          >
            {dictionary.introduction}
          </p>
        </div>

        <div
          className="
            mt-10
            grid
            gap-7
            lg:mt-12
            lg:grid-cols-2
          "
        >
          {dictionary.projects.map(
            (project, index) => {
              const chartId =
                `case-chart-${index}-${project.chart}`;

              return (
                <article
                  key={`${project.number}-${project.brand}`}
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
                      lg:grid-cols-[minmax(0,0.98fr)_minmax(230px,1.02fr)]
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
                        lg:border-e
                        lg:p-9
                      "
                    >
                      <div
                        className="
                          flex
                          items-start
                          justify-between
                          gap-5
                        "
                      >
                        <div>
                          <span
                            className={`
                              block
                              font-sans
                              font-semibold
                              text-[#928a80]
                              ${
                                isPersian
                                  ? "text-[11px] tracking-normal"
                                  : "text-[10px] tracking-[0.18em]"
                              }
                            `}
                          >
                            {project.number}
                          </span>

                          <p
                            className={`
                              mt-3
                              font-sans
                              font-semibold
                              text-[#8a672f]
                              ${
                                isPersian
                                  ? "text-[11px] leading-6 tracking-normal sm:text-[12px]"
                                  : "text-[9px] uppercase leading-5 tracking-[0.18em]"
                              }
                            `}
                          >
                            {project.category}
                          </p>
                        </div>

                        {!isPersian && (
                          <span
                            aria-hidden="true"
                            className="
                              flex
                              h-9
                              w-9
                              shrink-0
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
                        )}
                      </div>

                      <h3
                        dir="ltr"
                        lang="en"
                        className={`
                          mt-7
                          font-sans
                          font-semibold
                          leading-[1.25]
                          tracking-normal
                          text-[#24211e]
                          ${
                            isPersian
                              ? "text-right text-[clamp(1.75rem,2.7vw,2.35rem)]"
                              : "text-left text-[clamp(2rem,3vw,3rem)]"
                          }
                        `}
                      >
                        {project.brand}
                      </h3>

                      <p
                        className={`
                          mt-5
                          font-sans
                          text-[#625d56]
                          ${
                            isPersian
                              ? "text-[15.5px] leading-[2.05] sm:text-[16.5px]"
                              : "text-[17px] leading-8 sm:text-[18px] sm:leading-[2rem]"
                          }
                        `}
                      >
                        {project.description}
                      </p>

                      <div
                        className="
                          mt-8
                          border-t
                          border-[#302d29]/15
                          pt-6
                          lg:mt-auto
                        "
                      >
                        <p
                          className={`
                            font-sans
                            font-semibold
                            text-[#8a672f]
                            ${
                              isPersian
                                ? "text-[11px] leading-6 tracking-normal"
                                : "text-[9px] uppercase tracking-[0.18em]"
                            }
                          `}
                        >
                          {
                            dictionary.projectOutcomeLabel
                          }
                        </p>

                        <p
                          className={`
                            mt-3
                            text-[#34302b]
                            ${
                              isPersian
                                ? "font-sans text-[1.25rem] font-[650] leading-[1.75] tracking-normal sm:text-[1.35rem]"
                                : "font-serif text-[1.5rem] font-medium leading-[1.2] tracking-[-0.025em]"
                            }
                          `}
                        >
                          {project.outcome}
                        </p>

                        <div
                          className="
                            mt-5
                            flex
                            items-end
                            justify-between
                            gap-5
                          "
                        >
                          <div className="shrink-0">
                            <span
                              dir="ltr"
                              className="
                                block
                                font-sans
                                text-[2.05rem]
                                font-semibold
                                leading-none
                                tracking-normal
                                text-[#2e5d91]
                              "
                            >
                              {project.metric}
                            </span>

                            <span
                              className={`
                                mt-2
                                block
                                max-w-[180px]
                                font-sans
                                font-medium
                                text-[#777168]
                                ${
                                  isPersian
                                    ? "text-[11px] leading-6 sm:text-[12px]"
                                    : "text-[11px] leading-5"
                                }
                              `}
                            >
                              {project.metricLabel}
                            </span>
                          </div>

                          <div
                            aria-hidden="true"
                            className={`
                              h-px
                              flex-1
                              from-[#b48a52]/45
                              to-transparent
                              ${
                                isPersian
                                  ? "bg-gradient-to-l"
                                  : "bg-gradient-to-r"
                              }
                            `}
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
                        aria-hidden="true"
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
                        aria-hidden="true"
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
                          bg-white/20
                          p-4
                          shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_18px_42px_rgba(61,51,41,0.06)]
                          backdrop-blur-md
                        "
                      >
                        <ProjectChart
                          type={project.chart}
                          chartId={chartId}
                          metric={project.metric}
                          metricLabel={
                            project.metricLabel
                          }
                          labels={
                            dictionary.chartLabels
                          }
                          isPersian={isPersian}
                        />
                      </div>
                    </div>
                  </div>
                </article>
              );
            }
          )}
        </div>

        <div
          className="
            mt-10
            grid
            gap-7
            border-t
            border-[#302d29]/15
            pt-8
            md:grid-cols-[minmax(0,1fr)_auto]
            md:items-center
            lg:mt-12
            lg:pt-9
          "
        >
          <p
            className={`
              max-w-[820px]
              font-sans
              text-[#625d56]
              ${
                isPersian
                  ? "text-[16px] leading-[2.05] sm:text-[17px]"
                  : "text-[18px] leading-[2.05rem] lg:text-[19px] lg:leading-[2.15rem]"
              }
            `}
          >
            {dictionary.closing}
          </p>

          <a
            href={dictionary.cta.href}
            className={`
              group
              inline-flex
              min-h-[56px]
              items-center
              justify-center
              gap-3
              justify-self-start
              rounded-full
              border
              border-[#183655]
              bg-[#183655]
              px-8
              font-sans
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
              ${
                isPersian
                  ? "text-[14px] sm:text-[15px]"
                  : "text-[15px] sm:text-[16px]"
              }
            `}
          >
            <span>
              {dictionary.cta.label}
            </span>

            <span
              aria-hidden="true"
              className={`
                text-[18px]
                transition-transform
                duration-300
                ${
                  isPersian
                    ? "group-hover:translate-y-0.5"
                    : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                }
              `}
            >
              {isPersian ? "↓" : "↗"}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}