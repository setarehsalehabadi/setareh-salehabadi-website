const footerLinks = [
  {
    title: "Explore",
    links: [
      "About",
      "Expertise",
      "Case Studies",
      "Research",
    ],
  },

  {
    title: "Resources",
    links: [
      "Blog",
      "Newsletter",
      "Courses",
      "Templates",
    ],
  },

  {
    title: "Connect",
    links: [
      "LinkedIn",
      "Email",
      "Contact",
    ],
  },
];


export default function Footer() {
  return (
    <footer className="bg-black text-white px-8 py-20">


      <div className="max-w-7xl mx-auto">


        <div className="grid md:grid-cols-4 gap-12 pb-16 border-b border-white/20">


          {/* Brand */}

          <div>

            <h3 className="text-2xl font-semibold tracking-wide">
              SETAREH
            </h3>


            <p className="mt-4 text-gray-400 leading-relaxed">

              Digital Growth Strategist helping businesses grow through
              SEO, strategy, psychology and AI-powered systems.

            </p>


          </div>



          {/* Links */}

          {footerLinks.map((column) => (

            <div key={column.title}>


              <h4 className="text-sm uppercase tracking-[0.25em] text-gray-400 mb-6">
                {column.title}
              </h4>


              <ul className="space-y-4">


                {column.links.map((link) => (

                  <li key={link}>

                    <a
                      href="#"
                      className="
                      text-gray-300
                      hover:text-white
                      transition
                      "
                    >
                      {link}
                    </a>

                  </li>

                ))}


              </ul>


            </div>

          ))}


        </div>



        {/* Bottom */}

        <div className="flex flex-col md:flex-row justify-between gap-6 pt-8">


          <p className="text-gray-500 text-sm">

            © {new Date().getFullYear()} Setareh Salehabadi.
            All rights reserved.

          </p>


          <p className="text-gray-500 text-sm">

            Digital Growth • SEO • AI • Strategy

          </p>


        </div>



      </div>


    </footer>
  );
}