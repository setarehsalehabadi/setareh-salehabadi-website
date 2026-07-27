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
};

const variantStyles: Record<
  InsightCardVariant,
  VariantStyle
> = {
  summary: {
    container:
      "border-[#b4853b]/25 bg-[#fbf7ef]",

    label:
      "border-[#b4853b]/15 bg-[#b4853b]/10 text-[#8a672f]",

    line:
      "bg-[#b4853b]",
  },

  findings: {
    container:
      "border-[#183655]/15 bg-[#f4f7fa]",

    label:
      "border-[#183655]/15 bg-[#183655]/10 text-[#183655]",

    line:
      "bg-[#183655]",
  },

  business: {
    container:
      "border-[#526653]/20 bg-[#f4f6f1]",

    label:
      "border-[#526653]/15 bg-[#526653]/10 text-[#526653]",

    line:
      "bg-[#526653]",
  },

  framework: {
    container:
      "border-[#2e5d91]/20 bg-[#f3f6fa]",

    label:
      "border-[#2e5d91]/15 bg-[#2e5d91]/10 text-[#2e5d91]",

    line:
      "bg-[#2e5d91]",
  },

  action: {
    container:
      "border-[#6d645a]/15 bg-[#f8f6f2]",

    label:
      "border-[#6d645a]/15 bg-[#6d645a]/10 text-[#5f574f]",

    line:
      "bg-[#6d645a]",
  },
};

export default function InsightCard({
  title,
  children,
  variant = "summary",
  label,
}: InsightCardProps) {
  const styles =
    variantStyles[variant];

  return (
    <section
      aria-label={title}
      className={`
        relative
        m-0
        min-w-0
        overflow-hidden
        rounded-[28px]
        border
        px-6
        py-8
        shadow-[0_16px_45px_rgba(40,35,30,0.05)]
        sm:rounded-[30px]
        sm:px-8
        sm:py-9
        md:px-10
        md:py-10
        ${styles.container}
      `}
    >
      <span
        aria-hidden="true"
        className={`
          absolute
          inset-y-0
          start-0
          w-1
          ${styles.line}
        `}
      />

      <div
        className="
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
            {label}
          </span>
        )}

        <h2
          dir="auto"
          className="
            mb-0
            mt-5
            font-sans
            text-[clamp(1.45rem,2.5vw,2.15rem)]
            font-[650]
            leading-[1.75]
            tracking-normal
            text-[#171512]
          "
        >
          {title}
        </h2>

        <div
          className="
            mt-6
            min-w-0
            [&>*:first-child]:mt-0
            [&>*:last-child]:mb-0
          "
        >
          {children}
        </div>
      </div>
    </section>
  );
}