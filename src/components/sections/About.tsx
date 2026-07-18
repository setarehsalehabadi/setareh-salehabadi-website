export default function About() {

  return (

    <section
      className="
      bg-black
      text-white
      py-32
      "
    >

      <div
        className="
        max-w-7xl
        mx-auto
        px-8
        grid
        lg:grid-cols-2
        gap-16
        items-center
        "
      >


        {/* LEFT */}

        <div>


          <p
            className="
            text-yellow-400
            text-sm
            tracking-[0.5em]
            mb-8
            "
          >
            ABOUT
          </p>



          <h2
            className="
            text-5xl
            lg:text-6xl
            font-serif
            leading-tight
            "
          >

            Strategy,
            <br />
            psychology
            <br />
            and technology.

          </h2>


        </div>





        {/* RIGHT */}

        <div>


          <p
            className="
            text-xl
            text-gray-300
            leading-relaxed
            "
          >

            I am Setareh Salehabadi, a Digital Growth
            Strategist focused on building measurable
            growth systems through SEO, digital strategy,
            consumer psychology and AI-powered marketing.

          </p>



          <p
            className="
            mt-8
            text-gray-400
            leading-relaxed
            "
          >

            With a background in Chemical Engineering
            and experience across technology, healthcare,
            industrial and digital businesses, I combine
            analytical thinking with creative strategy
            to solve complex growth challenges.

          </p>




          <div
            className="
            mt-10
            flex
            gap-10
            "
          >


            <div>

              <p
                className="
                text-3xl
                text-yellow-400
                font-semibold
                "
              >
                SEO
              </p>

              <p className="text-gray-400 text-sm mt-2">
                Growth Systems
              </p>

            </div>




            <div>

              <p
                className="
                text-3xl
                text-yellow-400
                font-semibold
                "
              >
                AI
              </p>

              <p className="text-gray-400 text-sm mt-2">
                Automation
              </p>

            </div>




            <div>

              <p
                className="
                text-3xl
                text-yellow-400
                font-semibold
                "
              >
                Data
              </p>

              <p className="text-gray-400 text-sm mt-2">
                Strategy
              </p>

            </div>



          </div>



        </div>



      </div>


    </section>

  );

}