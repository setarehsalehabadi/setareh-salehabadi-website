import {
  defaultLocale,
  type Locale,
} from "@/i18n/config";
import en from "@/i18n/dictionaries/en";
import type { Dictionary } from "@/i18n/get-dictionary";

type NewsletterProps = {
  locale?: Locale;
  dictionary?: Dictionary["newsletter"];
};

type FormLabels = {
  emailLabel: string;
  inactiveMessage: string;
};

const formLabels: Record<
  Locale,
  FormLabels
> = {
  en: {
    emailLabel: "Email address",
    inactiveMessage:
      "Newsletter registration will be enabled after the subscription service is connected.",
  },

  de: {
    emailLabel: "E-Mail-Adresse",
    inactiveMessage:
      "Die Newsletter-Anmeldung wird nach der Verbindung mit dem Abonnementdienst aktiviert.",
  },

  fa: {
    emailLabel: "نشانی ایمیل",
    inactiveMessage:
      "فرم عضویت پس از اتصال سرویس خبرنامه فعال خواهد شد.",
  },
};

function containsPersian(text: string) {
  return /[\u0600-\u06ff]/.test(text);
}

export default function Newsletter({
  locale = defaultLocale,
  dictionary = en.newsletter,
}: NewsletterProps) {
  const isPersian =
    locale === "fa" ||
    containsPersian(
      [
        dictionary.eyebrow,
        dictionary.title.first,
        dictionary.title.highlighted,
        dictionary.introduction,
      ].join(" ")
    );

  const effectiveLocale: Locale =
    isPersian ? "fa" : locale;

  const labels =
    formLabels[effectiveLocale];

  return (
    <section
      id="newsletter"
      aria-labelledby="newsletter-heading"
      className="
        border-b
        border-[#302d29]/15
        bg-[#ebe4da]
        text-[#211f1c]
      "
    >
      <div
        className="
          mx-auto
          max-w-[1480px]
          px-5
          py-20
          sm:px-8
          sm:py-24
          lg:px-12
          lg:py-28
          xl:px-16
        "
      >
        <div
          className="
            grid
            gap-8
            border-b
            border-[#302d29]/15
            pb-10
            lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.75fr)]
            lg:items-end
            lg:gap-16
            lg:pb-12
          "
        >
          <div>
            <p
              className={`
                mb-5
                font-sans
                font-semibold
                text-[#8a672f]
                ${
                  isPersian
                    ? "text-[11px] leading-6 tracking-normal sm:text-[12px]"
                    : "text-[11px] uppercase tracking-[0.3em]"
                }
              `}
            >
              {dictionary.eyebrow}
            </p>

            <h2
              id="newsletter-heading"
              className={`
                max-w-[820px]
                text-[#211f1c]
                ${
                  isPersian
                    ? "font-sans text-[clamp(2.05rem,3.5vw,3.35rem)] font-[650] leading-[1.5] tracking-normal"
                    : "font-serif text-[clamp(2.35rem,4.1vw,3.95rem)] font-medium leading-[1.03] tracking-[-0.042em]"
                }
              `}
            >
              <span>
                {dictionary.title.first}
              </span>

              <span
                className={`
                  block
                  text-[#2e5d91]
                  ${
                    isPersian
                      ? "mt-1"
                      : "italic"
                  }
                `}
              >
                {dictionary.title.highlighted}
              </span>
            </h2>
          </div>

          <p
            className={`
              max-w-[620px]
              font-sans
              text-[#625d56]
              lg:justify-self-end
              ${
                isPersian
                  ? "text-[16px] leading-[2.05] sm:text-[17px]"
                  : "text-[18px] leading-[2.05rem] lg:text-[19px] lg:leading-[2.15rem]"
              }
            `}
          >
            {dictionary.introduction}
          </p>
        </div>

        <div
          className="
            mt-10
            grid
            gap-8
            rounded-[28px]
            border
            border-[#302d29]/12
            bg-[#f6f1ea]
            p-6
            shadow-[0_20px_50px_rgba(57,48,40,0.06)]
            sm:rounded-[30px]
            sm:p-8
            lg:grid-cols-[minmax(300px,0.9fr)_minmax(420px,1.1fr)]
            lg:gap-10
            lg:p-10
          "
        >
          <div
            className="
              flex
              min-w-0
              flex-col
              justify-between
              gap-9
            "
          >
            <div>
              <h3
                className={`
                  max-w-[560px]
                  text-[#26221d]
                  ${
                    isPersian
                      ? "font-sans text-[clamp(1.55rem,2.5vw,2.15rem)] font-[650] leading-[1.7] tracking-normal"
                      : "font-serif text-[clamp(2rem,3.1vw,3rem)] font-medium leading-[1.08] tracking-[-0.035em]"
                  }
                `}
              >
                <span>
                  {
                    dictionary
                      .editorialTitle
                      .first
                  }
                </span>

                <span
                  className={`
                    block
                    text-[#8a672f]
                    ${
                      isPersian
                        ? "mt-1"
                        : "italic"
                    }
                  `}
                >
                  {
                    dictionary
                      .editorialTitle
                      .highlighted
                  }
                </span>
              </h3>

              <p
                className={`
                  mt-6
                  max-w-[580px]
                  font-sans
                  text-[#676158]
                  ${
                    isPersian
                      ? "text-[15.5px] leading-[2.05] sm:text-[16.5px]"
                      : "text-[17px] leading-[1.95rem] lg:text-[18px] lg:leading-[2.05rem]"
                  }
                `}
              >
                {
                  dictionary
                    .editorialDescription
                }
              </p>
            </div>

            <div>
              <p
                className={`
                  mb-4
                  font-sans
                  font-semibold
                  text-[#8a672f]
                  ${
                    isPersian
                      ? "text-[11px] leading-6 tracking-normal sm:text-[12px]"
                      : "text-[10px] uppercase tracking-[0.24em]"
                  }
                `}
              >
                {dictionary.topicsLabel}
              </p>

              <div
                className="
                  flex
                  flex-wrap
                  gap-2.5
                "
              >
                {dictionary.topics.map(
                  (topic) => (
                    <span
                      key={topic}
                      dir="auto"
                      className={`
                        rounded-full
                        border
                        border-[#302d29]/14
                        bg-white/50
                        px-4
                        py-2.5
                        font-sans
                        font-medium
                        text-[#5f5a53]
                        ${
                          isPersian
                            ? "text-[11px] leading-6 sm:text-[12px]"
                            : "text-[13px]"
                        }
                      `}
                    >
                      {topic}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          <div
            className="
              min-w-0
              rounded-[24px]
              border
              border-[#302d29]/12
              bg-[#fffdfa]
              p-6
              sm:rounded-[26px]
              sm:p-7
              lg:p-8
            "
          >
            <p
              className={`
                mb-3
                font-sans
                font-semibold
                text-[#8a672f]
                ${
                  isPersian
                    ? "text-[11px] leading-6 tracking-normal sm:text-[12px]"
                    : "text-[10px] uppercase tracking-[0.25em]"
                }
              `}
            >
              {dictionary.formEyebrow}
            </p>

            <h3
              id="newsletter-form-heading"
              className={`
                max-w-[560px]
                text-[#241f1b]
                ${
                  isPersian
                    ? "font-sans text-[clamp(1.55rem,2.5vw,2.15rem)] font-[650] leading-[1.7] tracking-normal"
                    : "font-serif text-[clamp(1.9rem,3vw,3rem)] font-medium leading-[1.08] tracking-[-0.035em]"
                }
              `}
            >
              <span>
                {dictionary.formTitle.first}
              </span>

              <span className="block">
                {dictionary.formTitle.second}
              </span>
            </h3>

            <p
              className={`
                mt-4
                max-w-[580px]
                font-sans
                text-[#676158]
                ${
                  isPersian
                    ? "text-[15px] leading-[2.05] sm:text-[16px]"
                    : "text-[17px] leading-[1.95rem] lg:text-[18px] lg:leading-[2.05rem]"
                }
              `}
            >
              {dictionary.formDescription}
            </p>

            <form
              aria-labelledby="newsletter-form-heading"
              aria-describedby="newsletter-form-status newsletter-consent"
              className="mt-7"
            >
              <label
                htmlFor="newsletter-email"
                className={`
                  mb-2.5
                  block
                  font-sans
                  font-semibold
                  text-[#4f4942]
                  ${
                    isPersian
                      ? "text-[12px] leading-6"
                      : "text-[12px]"
                  }
                `}
              >
                {labels.emailLabel}
              </label>

              <div
                className="
                  flex
                  flex-col
                  gap-4
                  sm:flex-row
                  sm:items-end
                "
              >
                <input
                  id="newsletter-email"
                  type="email"
                  name="email"
                  disabled
                  autoComplete="email"
                  inputMode="email"
                  dir="ltr"
                  placeholder={
                    dictionary.emailPlaceholder
                  }
                  className="
                    min-h-[58px]
                    w-full
                    rounded-full
                    border
                    border-[#302d29]/14
                    bg-[#f8f4ee]
                    px-6
                    text-left
                    font-sans
                    text-[15px]
                    text-[#241f1b]
                    outline-none
                    placeholder:text-[#8f877d]
                    disabled:cursor-not-allowed
                    disabled:opacity-75
                  "
                />

                <button
                  type="submit"
                  disabled
                  aria-disabled="true"
                  className={`
                    inline-flex
                    min-h-[58px]
                    w-full
                    shrink-0
                    cursor-not-allowed
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#183655]/70
                    bg-[#183655]/85
                    px-8
                    font-sans
                    font-semibold
                    leading-none
                    text-white
                    opacity-75
                    sm:w-auto
                    ${
                      isPersian
                        ? "text-[14px] sm:text-[15px]"
                        : "text-[15px] sm:text-[16px]"
                    }
                  `}
                >
                  {dictionary.submitLabel}
                </button>
              </div>

              <p
                id="newsletter-form-status"
                role="status"
                className={`
                  mt-4
                  max-w-[620px]
                  rounded-[14px]
                  border
                  border-[#8a672f]/18
                  bg-[#ebe4da]/42
                  px-4
                  py-3
                  font-sans
                  text-[#746c63]
                  ${
                    isPersian
                      ? "text-[12px] leading-7"
                      : "text-[12px] leading-6"
                  }
                `}
              >
                {labels.inactiveMessage}
              </p>

              <p
                id="newsletter-consent"
                className={`
                  mt-4
                  max-w-[620px]
                  font-sans
                  text-[#8a8379]
                  ${
                    isPersian
                      ? "text-[11px] leading-7 sm:text-[12px]"
                      : "text-[13px] leading-6"
                  }
                `}
              >
                {dictionary.consent}
              </p>
            </form>

            <div
              className="
                mt-8
                grid
                gap-5
                border-t
                border-[#302d29]/12
                pt-6
                sm:grid-cols-3
              "
            >
              {dictionary.highlights.map(
                (item) => (
                  <div
                    key={item.title}
                    className="min-w-0"
                  >
                    <p
                      className={`
                        text-[#2e5d91]
                        ${
                          isPersian
                            ? "font-sans text-[1.25rem] font-[650] leading-[1.6] tracking-normal"
                            : "font-serif text-[1.8rem] leading-none tracking-[-0.03em]"
                        }
                      `}
                    >
                      {item.title}
                    </p>

                    <p
                      className={`
                        mt-2
                        font-sans
                        text-[#857d73]
                        ${
                          isPersian
                            ? "text-[12px] leading-7 sm:text-[13px]"
                            : "text-[14px] leading-6"
                        }
                      `}
                    >
                      {item.description}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}