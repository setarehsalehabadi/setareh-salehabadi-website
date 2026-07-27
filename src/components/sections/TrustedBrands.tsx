import Image from "next/image";

import en from "@/i18n/dictionaries/en";
import type { Dictionary } from "@/i18n/get-dictionary";

type TrustedBrandsProps = {
  locale?: "en" | "de" | "fa";
  dictionary?: Dictionary["trustedBrands"];
};

export default function TrustedBrands({
  dictionary = en.trustedBrands,
}: TrustedBrandsProps) {
  return (
    <section
      aria-labelledby="trusted-brands-heading"
      className="
        overflow-hidden
        border-b
        border-[#302d29]/15
        bg-[#f4efe8]
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
        <header
          className="
            grid
            gap-6
            border-b
            border-[#302d29]/15
            pb-10
            lg:grid-cols-[minmax(0,1fr)_auto]
            lg:items-end
          "
        >
          <div>
            <p
              className="
                mb-4
                font-sans
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.28em]
                text-[#8a672f]
                sm:text-[11px]
              "
            >
              {dictionary.eyebrow}
            </p>

            <h2
              id="trusted-brands-heading"
              className="
                max-w-[760px]
                font-serif
                text-[clamp(2.35rem,4.5vw,4.2rem)]
                font-medium
                leading-[1.03]
                tracking-[-0.043em]
                text-[#211f1c]
              "
            >
              {dictionary.title.first}

              <span className="block italic text-[#2e5d91]">
                {dictionary.title.highlighted}
              </span>
            </h2>
          </div>
        </header>

        <div
          className="
            grid
            grid-cols-2
            border-s
            border-t
            border-[#302d29]/15
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {dictionary.brands.map((brand) => (
            <article
              key={brand.name}
              className="
                group
                flex
                min-h-[220px]
                flex-col
                items-center
                justify-center
                border-b
                border-e
                border-[#302d29]/15
                bg-transparent
                px-5
                py-8
                text-center
                transition-colors
                duration-300
                hover:bg-[#ebe4da]/45
                sm:min-h-[250px]
                sm:px-7
                sm:py-10
              "
            >
              <div
                className="
                  flex
                  h-[108px]
                  w-full
                  max-w-[190px]
                  items-center
                  justify-center
                  sm:h-[122px]
                "
              >
                <Image
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  width={240}
                  height={140}
                  sizes="
                    (max-width: 640px) 140px,
                    (max-width: 1024px) 170px,
                    190px
                  "
                  className="
                    block
                    h-auto
                    max-h-[100px]
                    w-auto
                    max-w-full
                    object-contain
                    mix-blend-multiply
                    transition-transform
                    duration-300
                    group-hover:scale-[1.025]
                    sm:max-h-[112px]
                  "
                />
              </div>

              <div
                className="
                  mt-6
                  border-t
                  border-[#302d29]/10
                  pt-5
                "
              >
                <h3
                  className="
                    font-serif
                    text-[1.35rem]
                    font-medium
                    leading-tight
                    text-[#282521]
                  "
                >
                  {brand.name}
                </h3>

                <p
                  className="
                    mt-2
                    font-sans
                    text-[11px]
                    font-medium
                    leading-5
                    text-[#7b746b]
                  "
                >
                  {brand.category}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}