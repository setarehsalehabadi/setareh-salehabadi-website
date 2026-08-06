import type {
  ReactNode,
} from "react";

type InsightCardVariant =
  | "summary"
  | "findings"
  | "business"
  | "framework"
  | "action";

type InsightCardProps = {
  title: string;
  children: ReactNode;
  variant?: InsightCardVariant;
  label?: string;
};

type VariantStyle = {
  container: string;
  label: string;
  line: string;
  rule: string;
};

const variantStyles: Record<
  InsightCardVariant,
  VariantStyle
> = {
  summary: {
    container:
      "border-[#b4853b]/22 bg-[#fbf7ef]",

    label:
      "border-[#b4853b]/18 bg-[#b4853b]/10 text-[#8a672f]",

    line:
      "bg-[#b4853b]",

    rule:
      "bg-[#b4853b]/55",
  },

  findings: {
    container:
      "border-[#526653]/18 bg-[#f3f6f1]",

    label:
      "border-[#526653]/16 bg-[#526653]/10 text-[#526653]",

    line:
      "bg-[#526653]",

    rule:
      "bg-[#526653]/50",
  },

  business: {
    container:
      "border-[#8a672f]/16 bg-[#f7f3ed]",

    label:
      "border-[#8a672f]/16 bg-[#8a672f]/9 text-[#7b5d2d]",

    line:
      "bg-[#8a672f]",

    rule:
      "bg-[#8a672f]/45",
  },

  framework: {
    container:
      "border-[#2e5d91]/20 bg-[#f1f5f9]",

    label:
      "border-[#2e5d91]/16 bg-[#2e5d91]/10 text-[#2e5d91]",

    line:
      "bg-[#2e5d91]",

    rule:
      "bg-[#2e5d91]/50",
  },

  action: {
    container:
      "border-[#6d645a]/16 bg-[#f8f6f2]",

    label:
      "border-[#6d645a]/16 bg-[#6d645a]/9 text-[#5f574f]",

    line:
      "bg-[#6d645a]",

    rule:
      "bg-[#6d645a]/42",
  },
};

export default function InsightCard({
  title,
  children,
  variant = "summary",
  label,
}: InsightCardProps) {
  const styles =
    variantStyles[
      variant
    ];

  return (
    <section
      aria-label={
        title
      }
      className={`
        relative
        mx-auto
        w-full
        max-w-[940px]
        min-w-0
        overflow-hidden
        rounded-[28px]
        border
        px-6
        py-8
        shadow-[0_20px_55px_rgba(40,35,30,0.055)]
        sm:rounded-[30px]
        sm:px-8
        sm:py-9
        md:px-10
        md:py-11
        ${styles.container}
      `}
    >
      <span
        aria-hidden="true"
        className={`
          absolute
          inset-y-0
          start-0
          w-[5px]
          ${styles.line}
        `}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -end-20
          -top-24
          h-56
          w-56
          rounded-full
          bg-white/55
          blur-3xl
        "
      />

      <div
        className="
          relative
          min-w-0
          ps-1
          sm:ps-2
        "
      >
        {label && (
          <span
            dir="auto"
            className={`
              inline-flex
              min-h-[32px]
              w-fit
              items-center
              rounded-full
              border
              px-4
              py-1.5
              font-sans
              text-[11px]
              font-semibold
              leading-5
              ${styles.label}
            `}
          >
            {
              label
            }
          </span>
        )}

        <h2
          dir="auto"
          className="
            mb-0
            mt-5
            max-w-[760px]
            font-sans
            text-[clamp(1.45rem,2.35vw,2.05rem)]
            font-[650]
            leading-[1.75]
            tracking-normal
            text-[#171512]
          "
        >
          {
            title
          }
        </h2>

        <span
          aria-hidden="true"
          className={`
            mt-5
            block
            h-px
            w-16
            ${styles.rule}
          `}
        />

        <div
          className="
            mt-7
            min-w-0
            max-w-[840px]
            [&>*:first-child]:mt-0
            [&>*:last-child]:mb-0
          "
        >
          {
            children
          }
        </div>
      </div>
    </section>
  );
}