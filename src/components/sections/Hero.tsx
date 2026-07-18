import Image from "next/image";
import StatsCard from "../StatsCard";


export default function Hero() {

  return (

    <section
      className="
      relative
      min-h-screen
      bg-black
      text-white
      overflow-hidden
      pt-28
      "
    >


      {/* GOLD LIGHT */}

      <div
        className="
        absolute
        right-0
        top-40
        w-[450px]
        h-[450px]
        bg-yellow-400/20
        blur-[130px]
        rounded-full
        "
      />



      <div
        className="
        max-w-7xl
        mx-auto
        px-8
        grid
        lg:grid-cols-2
        gap-12
        items-center
        "
      >



        {/* LEFT CONTENT */}


        <div>


          <p
            className="
            text-sm
            tracking-[0.6em]
            text-yellow-400
            mb-8
            "
          >
            DIGITAL GROWTH STRATEGIST
          </p>



          <h1
            className="
            text-5xl
            lg:text-7xl
            leading-[0.95]
            font-serif
            "
          >

            I turn strategy

            <br />

            <span
              className="
              italic
              text-yellow-400
              "
            >
              into measurable
            </span>


            <br />

            growth.


          </h1>




          <p
            className="
            mt-10
            max-w-xl
            text-lg
            text-gray-300
            leading-relaxed
            "
          >

            I help ambitious businesses grow through SEO,
            consumer psychology, AI and data-driven
            marketing systems.

          </p>




          <div
            className="
            flex
            gap-5
            mt-12
            "
          >



            <button
              className="
              bg-yellow-400
              text-black
              px-9
              py-4
              rounded-full
              font-medium
              transition
              hover:scale-105
              "
            >

              Explore My Work →

            </button>




            <button
              className="
              border
              border-white/30
              px-9
              py-4
              rounded-full
              transition
              hover:bg-white
              hover:text-black
              "
            >

              View Case Studies

            </button>



          </div>


        </div>






        {/* IMAGE */}


        <div
          className="
          relative
          flex
          justify-center
          "
        >



          <div
            className="
            relative
            w-[460px]
            h-[650px]
            rounded-[50px]
            overflow-hidden
            border
            border-white/10
            "
          >


            <Image

              src="/profile.jpeg"

              alt="Setareh Salehabadi"

              fill

              sizes="460px"

              priority

              className="
              object-cover
              "
            />


          </div>




          {/* MOVE CARD TO CORNER */}


          <div
            className="
            absolute
            right-[-90px]
            bottom-24
            "
          >

            <StatsCard />

          </div>




        </div>



      </div>



    </section>

  );

}