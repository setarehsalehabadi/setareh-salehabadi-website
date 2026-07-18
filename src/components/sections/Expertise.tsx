export default function Expertise() {


  const skills = [

    {
      title: "SEO",
      subtitle: "Organic Growth",
      description:
        "Building sustainable search growth through technical SEO, content systems and data-driven optimization.",
    },


    {
      title: "Psychology",
      subtitle: "Consumer Insight",
      description:
        "Understanding customer behavior and turning human insights into better marketing decisions.",
    },


    {
      title: "AI",
      subtitle: "Automation Systems",
      description:
        "Using AI and automation to create smarter and more efficient marketing workflows.",
    },


    {
      title: "Strategy",
      subtitle: "Growth Systems",
      description:
        "Creating long-term digital strategies connected to measurable business results.",
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


        <div
          className="
          mb-16
          "
        >


          <p
            className="
            text-yellow-400
            text-sm
            tracking-[0.5em]
            mb-6
            "
          >
            EXPERTISE
          </p>



          <h2
            className="
            text-5xl
            lg:text-6xl
            font-serif
            "
          >

            Strategic pillars
            <br />
            behind growth.

          </h2>


        </div>





        <div
          className="
          grid
          md:grid-cols-2
          lg:grid-cols-4
          gap-6
          "
        >



          {skills.map((skill) => (

            <div

              key={skill.title}

              className="
              group
              border
              border-white/10
              rounded-3xl
              p-8
              hover:border-yellow-400/50
              transition
              "
            >



              <h3
                className="
                text-3xl
                font-serif
                text-yellow-400
                mb-3
                "
              >

                {skill.title}

              </h3>




              <p
                className="
                text-white
                mb-5
                "
              >

                {skill.subtitle}

              </p>




              <p
                className="
                text-gray-400
                text-sm
                leading-relaxed
                "
              >

                {skill.description}

              </p>



            </div>

          ))}



        </div>



      </div>



    </section>

  );

}