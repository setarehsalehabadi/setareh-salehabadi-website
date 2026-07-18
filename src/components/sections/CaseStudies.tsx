export default function CaseStudies() {


  const projects = [

    {
      company: "HighDent",
      category: "SEO Growth System",
      result: "+45% Organic Traffic",
      description:
        "Built an SEO and content growth system for a healthcare brand, improving organic visibility and generating sustainable growth.",
    },


    {
      company: "Delta",
      category: "Digital Strategy",
      result: "Brand Growth",
      description:
        "Developed digital marketing strategies focused on awareness, audience growth and scalable acquisition channels.",
    },


    {
      company: "Omran Niroo",
      category: "Technical SEO",
      result: "Search Optimization",
      description:
        "Improved technical SEO structure, indexing health and content strategy for an industrial technology company.",
    },


    {
      company: "Morshed Gohar",
      category: "Performance Marketing",
      result: "Lead Generation",
      description:
        "Created campaign strategy combining landing pages, paid media and conversion optimization.",
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
          CASE STUDIES
        </p>




        <h2
          className="
          text-5xl
          lg:text-6xl
          font-serif
          mb-16
          "
        >

          Selected growth
          <br />
          projects.

        </h2>






        <div
          className="
          grid
          md:grid-cols-2
          gap-8
          "
        >



          {projects.map((project) => (

            <div

              key={project.company}

              className="
              border
              border-white/10
              rounded-3xl
              p-10
              hover:border-yellow-400/50
              transition
              "
            >



              <p
                className="
                text-yellow-400
                text-sm
                tracking-widest
                mb-5
                "
              >

                {project.category}

              </p>




              <h3
                className="
                text-4xl
                font-serif
                mb-4
                "
              >

                {project.company}

              </h3>




              <div
                className="
                text-2xl
                text-white
                mb-6
                "
              >

                {project.result}

              </div>





              <p
                className="
                text-gray-400
                leading-relaxed
                "
              >

                {project.description}

              </p>




              <button
                className="
                mt-8
                text-yellow-400
                "
              >

                View Case Study →

              </button>



            </div>


          ))}


        </div>


      </div>


    </section>

  );

}