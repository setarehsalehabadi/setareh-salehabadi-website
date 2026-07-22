import type { Metadata } from "next";
import Link from "next/link";
import {
  Cormorant_Garamond,
  Manrope,
  Vazirmatn,
} from "next/font/google";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: [
    "400",
    "500",
    "600",
    "700",
  ],
  style: [
    "normal",
    "italic",
  ],
  variable: "--font-cormorant",
  display: "swap",
});

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  weight: [
    "400",
    "500",
    "600",
    "700",
  ],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Page Not Found | Setareh Salehabadi",

  description:
    "The requested page could not be found. Return to the Persian, English or German version of the website.",
};

const languageLinks = [
  {
    locale: "fa",
    label: "بازگشت به نسخه فارسی",
    languageName: "فارسی",
    href: "/fa",
    direction: "rtl",
  },
  {
    locale: "en",
    label: "Return to English",
    languageName: "English",
    href: "/en",
    direction: "ltr",
  },
  {
    locale: "de",
    label: "Zur deutschen Version",
    languageName: "Deutsch",
    href: "/de",
    direction: "ltr",
  },
] as const;

export default function GlobalNotFound() {
  return (
    <html
      lang="en"
      dir="ltr"
    >
      <body
        className={`
          ${manrope.variable}
          ${cormorant.variable}
          ${vazirmatn.variable}
          min-h-screen
          bg-[#f4efe8]
          text-[#211f1c]
          antialiased
        `}
      >
        <main
          className="
            relative
            flex
            min-h-screen
            overflow-hidden
            bg-[#f4efe8]
          "
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -left-32
              top-16
              h-[420px]
              w-[420px]
              rounded-full
              bg-[#b48a52]/10
              blur-[130px]
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-32
              bottom-12
              h-[460px]
              w-[460px]
              rounded-full
              bg-[#2e5d91]/10
              blur-[140px]
            "
          />

          <div
            className="
              relative
              mx-auto
              flex
              min-h-screen
              w-full
              max-w-[1480px]
              flex-col
              px-5
              py-6
              sm:px-8
              sm:py-8
              lg:px-12
              xl:px-16
            "
          >
            <header
              className="
                flex
                items-center
                justify-between
                gap-5
                border-b
                border-[#302d29]/14
                pb-6
              "
            >
              <Link
                href="/en"
                aria-label="Setareh Salehabadi — English homepage"
                className="
                  group
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
                    h-10
                    w-10
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
                      text-[17px]
                      font-medium
                      uppercase
                      leading-none
                      tracking-[0.08em]
                      text-[#282521]
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
                      tracking-[0.18em]
                      text-[#8a8178]
                      sm:block
                    "
                  >
                    Digital Growth Strategist
                  </span>
                </span>
              </Link>

              <span
                className="
                  rounded-full
                  border
                  border-[#302d29]/14
                  bg-[#ebe4da]/65
                  px-4
                  py-2
                  font-sans
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-[#8a672f]
                "
              >
                Error 404
              </span>
            </header>

            <section
              aria-labelledby="not-found-heading"
              className="
                grid
                flex-1
                items-center
                gap-10
                py-14
                lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]
                lg:gap-16
                lg:py-20
              "
            >
              <div
                aria-hidden="true"
                className="
                  relative
                  flex
                  min-h-[280px]
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-[28px]
                  border
                  border-[#302d29]/12
                  bg-[#ebe4da]/60
                  sm:min-h-[360px]
                  sm:rounded-[34px]
                  lg:min-h-[520px]
                "
              >
                <div
                  className="
                    absolute
                    inset-6
                    rounded-[22px]
                    border
                    border-[#302d29]/10
                    sm:inset-8
                  "
                />

                <span
                  className="
                    relative
                    font-sans
                    text-[clamp(8rem,22vw,18rem)]
                    font-semibold
                    leading-none
                    tracking-[-0.08em]
                    text-[#2e5d91]
                  "
                >
                  404
                </span>

                <span
                  className="
                    absolute
                    bottom-7
                    left-1/2
                    -translate-x-1/2
                    whitespace-nowrap
                    font-sans
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.24em]
                    text-[#8a672f]
                    sm:bottom-9
                  "
                >
                  Page not found
                </span>
              </div>

              <div className="min-w-0">
                <p
                  className="
                    font-sans
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.28em]
                    text-[#8a672f]
                  "
                >
                  The requested page does not exist
                </p>

                <h1
                  id="not-found-heading"
                  className="
                    mt-5
                    max-w-[920px]
                    font-serif
                    text-[clamp(3rem,6vw,6rem)]
                    font-medium
                    leading-[0.99]
                    tracking-[-0.045em]
                    text-[#211f1c]
                  "
                >
                  This path could not be
                  <span
                    className="
                      block
                      text-[#2e5d91]
                      italic
                    "
                  >
                    found or may have moved.
                  </span>
                </h1>

                <p
                  className="
                    mt-7
                    max-w-[720px]
                    font-sans
                    text-[17px]
                    leading-[2rem]
                    text-[#625d56]
                    sm:text-[18px]
                    sm:leading-[2.1rem]
                  "
                >
                  Choose a language below to return to the
                  corresponding homepage and continue exploring
                  the website.
                </p>

                <div
                  className="
                    mt-9
                    grid
                    gap-3
                    sm:grid-cols-3
                  "
                >
                  {languageLinks.map(
                    (item) => (
                      <Link
                        key={item.locale}
                        href={item.href}
                        hrefLang={item.locale}
                        lang={item.locale}
                        dir={item.direction}
                        className="
                          group
                          flex
                          min-h-[94px]
                          flex-col
                          justify-between
                          rounded-[20px]
                          border
                          border-[#302d29]/14
                          bg-[#fbf8f4]
                          px-5
                          py-4
                          transition-all
                          duration-300
                          hover:-translate-y-0.5
                          hover:border-[#2e5d91]/35
                          hover:shadow-[0_18px_38px_rgba(46,93,145,0.1)]
                        "
                      >
                        <span
                          className={`
                            font-semibold
                            text-[#24211e]
                            transition-colors
                            duration-300
                            group-hover:text-[#2e5d91]
                            ${
                              item.locale === "fa"
                                ? "font-sans text-[14px] leading-7"
                                : "font-sans text-[13px] leading-6"
                            }
                          `}
                        >
                          {item.label}
                        </span>

                        <span
                          className="
                            font-sans
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.14em]
                            text-[#8a672f]
                          "
                        >
                          {item.languageName}
                        </span>
                      </Link>
                    )
                  )}
                </div>

                <div
                  lang="fa"
                  dir="rtl"
                  className="
                    mt-8
                    border-s-2
                    border-[#b48a52]
                    ps-5
                  "
                >
                  <p
                    className="
                      max-w-[720px]
                      font-sans
                      text-[14px]
                      leading-8
                      text-[#6a635b]
                      sm:text-[15px]
                    "
                  >
                    صفحه موردنظر پیدا نشد یا ممکن است نشانی آن
                    تغییر کرده باشد. برای ادامه، نسخه فارسی،
                    انگلیسی یا آلمانی سایت را انتخاب کنید.
                  </p>
                </div>
              </div>
            </section>

            <footer
              className="
                flex
                flex-col
                gap-3
                border-t
                border-[#302d29]/14
                pt-6
                font-sans
                text-[11px]
                leading-6
                text-[#756e65]
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <p>
                © Setareh Salehabadi
              </p>

              <p>
                Digital Growth Strategy · SEO · Data · Consumer Psychology
              </p>
            </footer>
          </div>
        </main>
      </body>
    </html>
  );
}