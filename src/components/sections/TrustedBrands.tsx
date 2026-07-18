export default function TrustedBrands() {

  const brands = [
    "HIGH DENT",
    "DELTA",
    "OMRAN NIROO",
    "MORSHED GOHAR",
    "WISE APPLY",
  ];


  return (

    <section
      className="
      bg-black
      text-white
      py-20
      border-t
      border-white/10
      "
    >


      <div
        className="
        max-w-7xl
        mx-auto
        px-8
        "
      >


        <p
          className="
          text-xs
          tracking-[0.5em]
          text-gray-500
          mb-12
          text-center
          "
        >
          TRUSTED BY AMBITIOUS BUSINESSES
        </p>




        <div
          className="
          grid
          grid-cols-2
          md:grid-cols-5
          gap-8
          items-center
          "
        >


          {brands.map((brand) => (

            <div
              key={brand}
              className="
              text-center
              text-gray-400
              font-medium
              tracking-widest
              text-sm
              hover:text-yellow-400
              transition
              "
            >

              {brand}

            </div>

          ))}


        </div>


      </div>


    </section>

  );

}