export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-32">

      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">

        <div>
          <p className="text-yellow-400 tracking-[0.5em] text-sm mb-8">
            ABOUT
          </p>

          <h1 className="text-6xl leading-tight">
            Strategy,
            <br />
            psychology
            <br />
            and technology.
          </h1>
        </div>


        <div className="text-gray-300 text-lg leading-8">

          <p className="mb-8">
            I am Setareh Salehabadi, a Digital Growth Strategist focused on
            building measurable growth systems through SEO, digital strategy,
            consumer psychology and AI-powered marketing.
          </p>


          <p className="mb-12">
            With a background in Chemical Engineering and experience across
            technology, healthcare, industrial and digital businesses, I combine
            analytical thinking with creative strategy to solve complex growth
            challenges.
          </p>


          <div className="flex gap-12">

            <div>
              <h3 className="text-yellow-400 text-3xl">
                SEO
              </h3>
              <p>
                Growth Systems
              </p>
            </div>


            <div>
              <h3 className="text-yellow-400 text-3xl">
                AI
              </h3>
              <p>
                Automation
              </p>
            </div>


            <div>
              <h3 className="text-yellow-400 text-3xl">
                Data
              </h3>
              <p>
                Strategy
              </p>
            </div>

          </div>

        </div>

      </section>

    </main>
  );
}