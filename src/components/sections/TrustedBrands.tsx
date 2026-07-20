import Image from "next/image";

const brandSlots = [
  null,
  {
    name: "Delta",
    category: "Real Estate Platform",
    logo: "/images/brands/delta.png",
  },
  {
    name: "Omran Niroo",
    category: "Industrial Automation",
    logo: "/images/brands/omran-niroo.png",
  },
  {
    name: "Morshed Gohar",
    category: "Industrial Equipment",
    logo: "/images/brands/morshed-gohar.png",
  },
  {
    name: "Wise Apply",
    category: "Immigration Services",
    logo: "/images/brands/wise-apply.png",
  },
];

export default function TrustedBrands() {
  return (
    <section
      aria-labelledby="trusted-brands-heading"
      className="
        relative
        overflow-hidden
        border-b
        border-[#2f2a24]/12
        bg-[#e1d8cc]
        text-[#211f1c]
      "
    >
      <div
        className="
          mx-auto
          max-w-[1480px]
          px-5
          py-6
          sm:px-8
          sm:py-7
          lg:px-12
          lg:py-8
          xl:px-16
        "
      >
        <div
          className="
            grid
            gap-6
            lg:grid-cols-[220px_minmax(0,1fr)]
            lg:items-center
            lg:gap-10
          "
        >
          <div className="min-w-0">
            <p
              className="
                font-sans
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.26em]
                text-[#8a672f]
              "
            >
              Selected Experience
            </p>

            <h2
              id="trusted-brands-heading"
              className="
                mt-2
                max-w-[210px]
                font-serif
                text-[clamp(1.2rem,1.7vw,1.55rem)]
                font-medium
                leading-[1.08]
                tracking-[-0.028em]
                text-[#1f1b17]
              "
            >
              Experience across
              <span className="ml-1 italic text-[#2e5d91]">
                industries.
              </span>
            </h2>
          </div>

          <div
            className="
              grid
              grid-cols-2
              gap-x-6
              gap-y-6
              sm:grid-cols-3
              lg:grid-cols-5
              lg:gap-x-7
            "
          >
            {brandSlots.map((brand, index) =>
              brand ? (
                <article
                  key={brand.name}
                  className="
                    group
                    min-w-0
                  "
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-full
                        border
                        border-[#2f2a24]/10
                        bg-[#f3eee7]
                      "
                    >
                      <div className="relative h-6 w-6">
                        <Image
                          src={brand.logo}
                          alt={`${brand.name} logo`}
                          fill
                          sizes="24px"
                          className="
                            object-contain
                            grayscale
                            sepia
                            opacity-80
                            contrast-75
                            brightness-90
                            saturate-50
                            transition-all
                            duration-300
                            group-hover:grayscale-0
                            group-hover:sepia-0
                            group-hover:opacity-100
                            group-hover:contrast-100
                            group-hover:brightness-100
                            group-hover:saturate-100
                          "
                        />
                        <div
                          className="
                            pointer-events-none
                            absolute
                            inset-0
                            rounded-full
                            bg-[#2e5d91]/8
                            mix-blend-multiply
                          "
                        />
                      </div>
                    </div>

                    <div className="min-w-0">
                      <h3
                        className="
                          truncate
                          font-serif
                          text-[0.98rem]
                          font-medium
                          leading-none
                          tracking-[-0.018em]
                          text-[#24211e]
                          transition-colors
                          duration-300
                          group-hover:text-[#2e5d91]
                          sm:text-[1.03rem]
                        "
                      >
                        {brand.name}
                      </h3>

                      <p
                        className="
                          mt-1
                          truncate
                          font-sans
                          text-[8px]
                          font-semibold
                          uppercase
                          tracking-[0.11em]
                          text-[#746e66]
                        "
                      >
                        {brand.category}
                      </p>
                    </div>
                  </div>
                </article>
              ) : (
                <div
                  key={`empty-slot-${index}`}
                  aria-hidden="true"
                  className="hidden lg:block"
                />
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}