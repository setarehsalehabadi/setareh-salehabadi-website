const credibilityItems = [
  "SEO Strategy",
  "Consumer Psychology",
  "AI Automation",
  "Data Analytics",
  "Research-Driven Decisions",
  "Customer Experience",
  "Growth Systems",
];


export default function CredibilityStrip() {
  return (
    <section
      aria-label="Areas of strategic expertise"
      className="
        relative
        overflow-hidden
        border-b
        border-border
        bg-warm-white
      "
    >
      <div
        className="
          site-container
          flex
          min-h-[92px]
          items-center
          py-5
          sm:min-h-[104px]
          sm:py-6
        "
      >
        <div
          className="
            flex
            w-full
            flex-wrap
            items-center
            justify-center
            gap-x-4
            gap-y-3
            sm:gap-x-5
            lg:flex-nowrap
            lg:justify-between
            lg:gap-4
          "
        >
          {credibilityItems.map((item, index) => (
            <div
              key={item}
              className="
                flex
                items-center
                gap-4
                sm:gap-5
              "
            >
              <span
                className="
                  whitespace-nowrap
                  font-sans
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.17em]
                  text-graphite/75
                  transition-colors
                  duration-300
                  hover:text-navy
                  sm:text-[11px]
                  sm:tracking-[0.19em]
                  xl:text-xs
                "
              >
                {item}
              </span>

              {index < credibilityItems.length - 1 && (
                <span
                  aria-hidden="true"
                  className="
                    h-1
                    w-1
                    shrink-0
                    rounded-full
                    bg-gold
                  "
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}