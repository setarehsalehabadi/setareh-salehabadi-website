export default function Research() {


  const insights = [

    {
      title: "The Future of SEO in the AI Era",
      category: "SEO",
      description:
        "How search behavior is changing and why businesses need smarter organic growth systems.",
    },


    {
      title: "Consumer Psychology Behind Digital Decisions",
      category: "Psychology",
      description:
        "Understanding human behavior to create marketing strategies that convert.",
    },


    {
      title: "AI-Powered Marketing Systems",
      category: "Artificial Intelligence",
      description:
        "How automation and AI tools are transforming modern marketing workflows.",
    },


  ];



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
        "
      >



        <p
          className="
          text-yellow-400
          tracking-[0.5em]
          text-sm
          mb-6
          "
        >
          RESEARCH & INSIGHTS
        </p>



        <h2
          className="
          text-5xl
          lg:text-6xl
          font-serif
          mb-16
          "
        >

          Ideas shaping the
          <br />
          future of growth.

        </h2>





        <div
          className="
          grid
          md:grid-cols-3
          gap-8
          "
        >



          {insights.map((item) => (

            <article

              key={item.title}

              className="
              border
              border-white/10
              rounded-3xl
              p-8
              hover:border-yellow-400/50
              transition
              "
            >



              <p
                className="
                text-yellow-400
                text-sm
                tracking-widest
                mb-6
                "
              >

                {item.category}

              </p>



              <h3
                className="
                text-2xl
                font-serif
                mb-5
                "
              >

                {item.title}

              </h3>




              <p
                className="
                text-gray-400
                leading-relaxed
                "
              >

                {item.description}

              </p>



              <button
                className="
                mt-8
                text-yellow-400
                "
              >

                Read More →

              </button>



            </article>


          ))}



        </div>


      </div>


    </section>

  );

}