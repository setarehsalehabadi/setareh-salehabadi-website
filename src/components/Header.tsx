"use client";

import { useEffect, useState } from "react";

const navigation = [
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Growth System", href: "#growth-system" },
  { label: "Insights", href: "#research" },
  { label: "Projects", href: "#case-studies" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={`
          fixed
          inset-x-0
          top-0
          z-50
          border-b
          border-[#302d29]/10
          transition-all
          duration-500
          ${
            isScrolled
              ? "bg-[#f7f3ed]/92 shadow-[0_12px_34px_rgba(48,43,37,0.07)] backdrop-blur-xl"
              : "bg-[#f7f3ed]"
          }
        `}
      >
        <div
          className="
            mx-auto
            flex
            h-[76px]
            max-w-[1480px]
            items-center
            justify-between
            px-5
            sm:px-8
            lg:h-[84px]
            lg:px-12
            xl:px-16
          "
        >
          <a
            href="#top"
            aria-label="Setareh Salehabadi — Back to top"
            onClick={closeMenu}
            className="
              group
              relative
              z-50
              inline-flex
              min-w-0
              items-center
              gap-3
            "
          >
            <span
              aria-hidden="true"
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-[#302d29]/14
                bg-[#ebe4da]
                font-serif
                text-[14px]
                font-medium
                italic
                text-[#2e5d91]
                transition-all
                duration-300
                group-hover:border-[#2e5d91]
                group-hover:bg-[#2e5d91]
                group-hover:text-white
              "
            >
              SS
            </span>

            <span className="min-w-0">
              <span
                className="
                  block
                  truncate
                  font-serif
                  text-[16px]
                  font-medium
                  uppercase
                  leading-none
                  tracking-[0.09em]
                  text-[#282521]
                  transition-colors
                  duration-300
                  group-hover:text-[#2e5d91]
                  sm:text-[17px]
                "
              >
                Setareh Salehabadi
              </span>

              <span
                className="
                  mt-1.5
                  hidden
                  font-sans
                  text-[9px]
                  font-semibold
                  uppercase
                  leading-none
                  tracking-[0.23em]
                  text-[#8a8178]
                  sm:block
                "
              >
                Digital Growth Strategist
              </span>
            </span>
          </a>

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-1 lg:flex"
          >
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="
                  group
                  relative
                  inline-flex
                  min-h-[44px]
                  items-center
                  justify-center
                  rounded-full
                  px-4
                  font-sans
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.09em]
                  text-[#49443f]
                  transition-all
                  duration-300
                  hover:bg-[#ebe4da]
                  hover:text-[#2e5d91]
                "
              >
                <span>{item.label}</span>

                <span
                  aria-hidden="true"
                  className="
                    absolute
                    bottom-[5px]
                    left-1/2
                    h-px
                    w-0
                    -translate-x-1/2
                    bg-[#2e5d91]
                    transition-all
                    duration-300
                    group-hover:w-[calc(100%-2rem)]
                  "
                />
              </a>
            ))}
          </nav>

          <div className="relative z-50 flex items-center gap-3">
            <a
              href="mailto:hello@setarehsalehabadi.com"
              className="
                group
                hidden
                min-h-[48px]
                items-center
                justify-center
                gap-3
                rounded-full
                border
                border-[#183655]
                bg-[#183655]
                px-7
                font-sans
                text-[13px]
                font-semibold
                leading-none
                shadow-[0_12px_28px_rgba(24,54,85,0.15)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:border-[#2e5d91]
                hover:bg-[#2e5d91]
                hover:shadow-[0_17px_34px_rgba(46,93,145,0.22)]
                focus-visible:outline-none
                focus-visible:ring-4
                focus-visible:ring-[#2e5d91]/20
                lg:inline-flex
              "
              style={{ color: "#ffffff" }}
            >
              <span style={{ color: "#ffffff" }}>
                Work with me
              </span>

              <span
                aria-hidden="true"
                className="
                  text-[16px]
                  transition-transform
                  duration-300
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
                style={{ color: "#ffffff" }}
              >
                ↗
              </span>
            </a>

            <button
              type="button"
              aria-label={
                isMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsMenuOpen((current) => !current)}
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                border-[#302d29]/15
                bg-[#ebe4da]
                text-[#282521]
                transition-all
                duration-300
                hover:border-[#2e5d91]
                hover:bg-[#2e5d91]
                hover:text-white
                lg:hidden
              "
            >
              <span className="relative block h-4 w-5">
                <span
                  className={`
                    absolute
                    left-0
                    top-[2px]
                    h-px
                    w-5
                    bg-current
                    transition-all
                    duration-300
                    ${
                      isMenuOpen
                        ? "translate-y-[6px] rotate-45"
                        : "translate-y-0 rotate-0"
                    }
                  `}
                />

                <span
                  className={`
                    absolute
                    left-0
                    top-[8px]
                    h-px
                    bg-current
                    transition-all
                    duration-300
                    ${
                      isMenuOpen
                        ? "w-0 opacity-0"
                        : "w-5 opacity-100"
                    }
                  `}
                />

                <span
                  className={`
                    absolute
                    left-0
                    top-[14px]
                    h-px
                    w-5
                    bg-current
                    transition-all
                    duration-300
                    ${
                      isMenuOpen
                        ? "-translate-y-[6px] -rotate-45"
                        : "translate-y-0 rotate-0"
                    }
                  `}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-navigation"
        className={`
          fixed
          inset-0
          z-40
          overflow-y-auto
          bg-[#ebe4da]
          px-5
          pb-8
          pt-[104px]
          transition-all
          duration-500
          sm:px-8
          lg:hidden
          ${
            isMenuOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-4 opacity-0"
          }
        `}
      >
        <div
          className="
            mx-auto
            flex
            min-h-full
            max-w-[720px]
            flex-col
            border-t
            border-[#302d29]/15
          "
        >
          <nav aria-label="Mobile navigation">
            <ul>
              {navigation.map((item, index) => (
                <li
                  key={item.label}
                  className="border-b border-[#302d29]/15"
                >
                  <a
                    href={item.href}
                    onClick={closeMenu}
                    className="
                      group
                      grid
                      min-h-[78px]
                      grid-cols-[44px_minmax(0,1fr)_40px]
                      items-center
                      gap-3
                    "
                  >
                    <span
                      className="
                        font-sans
                        text-[10px]
                        font-semibold
                        tracking-[0.18em]
                        text-[#9a9187]
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      className="
                        font-serif
                        text-[clamp(1.7rem,7vw,2.35rem)]
                        font-medium
                        tracking-[-0.035em]
                        text-[#282521]
                        transition-colors
                        duration-300
                        group-hover:text-[#2e5d91]
                      "
                    >
                      {item.label}
                    </span>

                    <span
                      aria-hidden="true"
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#302d29]/15
                        text-sm
                        text-[#2e5d91]
                        transition-all
                        duration-300
                        group-hover:border-[#2e5d91]
                        group-hover:bg-[#2e5d91]
                        group-hover:text-white
                      "
                    >
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto pt-10">
            <p
              className="
                max-w-[580px]
                font-serif
                text-[clamp(1.65rem,6.5vw,2.35rem)]
                font-medium
                leading-[1.15]
                tracking-[-0.035em]
                text-[#292621]
              "
            >
              Strategy, evidence and practical systems for sustainable digital
              growth.
            </p>

            <a
              href="mailto:hello@setarehsalehabadi.com"
              onClick={closeMenu}
              className="
                group
                mt-7
                inline-flex
                min-h-[58px]
                w-full
                items-center
                justify-center
                gap-3
                rounded-full
                border
                border-[#183655]
                bg-[#183655]
                px-8
                font-sans
                text-[15px]
                font-semibold
                leading-none
                shadow-[0_14px_30px_rgba(24,54,85,0.18)]
                transition-all
                duration-300
                hover:border-[#2e5d91]
                hover:bg-[#2e5d91]
                hover:shadow-[0_18px_38px_rgba(46,93,145,0.24)]
                sm:w-auto
                sm:text-[16px]
              "
              style={{ color: "#ffffff" }}
            >
              <span style={{ color: "#ffffff" }}>
                Start a conversation
              </span>

              <span
                aria-hidden="true"
                className="
                  text-[18px]
                  transition-transform
                  duration-300
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
                style={{ color: "#ffffff" }}
              >
                ↗
              </span>
            </a>

            <div
              className="
                mt-8
                flex
                flex-wrap
                items-center
                justify-between
                gap-4
                border-t
                border-[#302d29]/15
                pt-6
                font-sans
                text-[12px]
                text-[#6e675f]
              "
            >
              <span>Remote and international projects</span>

              <a
                href="mailto:hello@setarehsalehabadi.com"
                className="
                  font-semibold
                  text-[#183655]
                  transition-colors
                  duration-300
                  hover:text-[#2e5d91]
                "
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="h-[76px] lg:h-[84px]"
      />
    </>
  );
}