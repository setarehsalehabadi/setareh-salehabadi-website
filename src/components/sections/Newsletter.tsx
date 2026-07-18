export default function Newsletter() {
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
        max-w-6xl
        mx-auto
        px-8
        text-center
        "
      >

        <p
          className="
          text-sm
          tracking-[0.5em]
          text-yellow-400
          mb-8
          "
        >
          DIGITAL GROWTH INSIGHTS
        </p>


        <h2
          className="
          text-5xl
          lg:text-6xl
          font-serif
          mb-8
          "
        >
          Stay Ahead With
          <br />
          Digital Growth Knowledge
        </h2>


        <p
          className="
          text-gray-300
          max-w-2xl
          mx-auto
          text-lg
          leading-relaxed
          "
        >
          Receive strategic insights about SEO,
          consumer psychology, AI and modern
          marketing systems.
        </p>


        <div
          className="
          mt-10
          flex
          justify-center
          gap-4
          "
        >

          <input
            type="email"
            placeholder="Your email address"
            className="
            bg-white/10
            border
            border-white/20
            rounded-full
            px-6
            py-4
            w-72
            outline-none
            "
          />


          <button
            className="
            bg-yellow-400
            text-black
            px-8
            py-4
            rounded-full
            font-medium
            "
          >
            Subscribe
          </button>


        </div>


      </div>

    </section>
  );
}