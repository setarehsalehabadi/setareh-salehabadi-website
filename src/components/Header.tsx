export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent">

      <div className="max-w-7xl mx-auto px-8 py-8 flex items-center justify-between">

        {/* Logo */}
        <div>
          <h1 className="text-xl font-semibold tracking-[0.35em] text-white">
            SETAREH
          </h1>

          <p className="text-xs tracking-[0.35em] text-gray-400 mt-2">
            DIGITAL GROWTH STRATEGIST
          </p>
        </div>


        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-12 text-sm text-gray-300">

          <a href="#expertise" className="hover:text-white transition">
            Expertise
          </a>

          <a href="#case-studies" className="hover:text-white transition">
            Case Studies
          </a>

          <a href="#research" className="hover:text-white transition">
            Research
          </a>

          <a href="#about" className="hover:text-white transition">
            About
          </a>

        </nav>


        {/* CTA */}
        <button
          className="
          rounded-full
          border
          border-white/30
          px-7
          py-3
          text-sm
          text-white
          hover:bg-white
          hover:text-black
          transition
          "
        >
          Let's Work Together →
        </button>


      </div>

    </header>
  );
}