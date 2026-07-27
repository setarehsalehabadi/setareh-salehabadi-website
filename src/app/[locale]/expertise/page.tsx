import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Header from "@/components/Header";
import Expertise from "@/components/sections/Expertise";
import Footer from "@/components/sections/Footer";

import {
  isLocale,
  type Locale,
} from "@/i18n/config";

import {
  getDictionary,
  type Dictionary,
} from "@/i18n/get-dictionary";

const siteUrl =
  "https://setarehsalehabadi.com";

type ExpertisePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

type ExpertisePageLabels = {
  home: string;
  page: string;
};

const expertisePageLabels: Record<
  Locale,
  ExpertisePageLabels
> = {
  en: {
    home: "Home",
    page: "Expertise",
  },

  de: {
    home: "Startseite",
    page: "Expertise",
  },

  fa: {
    home: "صفحه اصلی",
    page: "تخصص‌ها",
  },
};

function prefixHomeHash(
  href: string,
  locale: Locale,
): string {
  if (!href.startsWith("#")) {
    return href;
  }

  return `/${locale}${href}`;
}

function createInternalPageFooter(
  dictionary: Dictionary,
  locale: Locale,
): Dictionary["footer"] {
  const footer = {
    ...dictionary.footer,

    primaryCta: {
      ...dictionary.footer.primaryCta,
      href: prefixHomeHash(
        dictionary.footer.primaryCta.href,
        locale,
      ),
    },

    secondaryCta: {
      ...dictionary.footer.secondaryCta,
      href: prefixHomeHash(
        dictionary.footer.secondaryCta.href,
        locale,
      ),
    },

    navigation:
      dictionary.footer.navigation.map(
        (item) => ({
          ...item,
          href: prefixHomeHash(
            item.href,
            locale,
          ),
        }),
      ),
  };

  return footer as unknown as Dictionary["footer"];
}

export async function generateMetadata({
  params,
}: ExpertisePageProps): Promise<Metadata> {
  const { locale: localeParam } =
    await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale =
    localeParam;

  const dictionary =
    await getDictionary(locale);

  const canonicalUrl =
    `${siteUrl}/${locale}/expertise`;

  const metadataTitle =
    `${dictionary.expertise.eyebrow} | ${dictionary.common.brandName}`;

  const metadataDescription =
    dictionary.expertise.introduction;

  return {
    title: metadataTitle,

    description:
      metadataDescription,

    alternates: {
      canonical: canonicalUrl,

      languages: {
        en: `${siteUrl}/en/expertise`,
        de: `${siteUrl}/de/expertise`,
        fa: `${siteUrl}/fa/expertise`,
        "x-default":
          `${siteUrl}/en/expertise`,
      },
    },

    openGraph: {
      type: "website",

      url: canonicalUrl,

      title: metadataTitle,

      description:
        metadataDescription,

      siteName:
        dictionary.common.brandName,

      images: [
        {
          url:
            "/images/expertise/expertise.png",

          alt:
            dictionary.expertise.imageAlt,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title: metadataTitle,

      description:
        metadataDescription,

      images: [
        "/images/expertise/expertise.png",
      ],
    },
  };
}

export default async function ExpertisePage({
  params,
}: ExpertisePageProps) {
  const { locale: localeParam } =
    await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale =
    localeParam;

  const dictionary =
    await getDictionary(locale);

  const labels =
    expertisePageLabels[locale];

  const isPersian =
    locale === "fa";

  const footerDictionary =
    createInternalPageFooter(
      dictionary,
      locale,
    );

  return (
    <div
      id="top"
      className="
        min-h-screen
        bg-[#f4efe8]
        text-[#211f1c]
      "
    >
      <Header
        locale={locale}
        dictionary={dictionary.header}
        common={dictionary.common}
      />

      <main
        id="main-content"
        tabIndex={-1}
        className="
          min-w-0
          outline-none
        "
      >
        <div
          className="
            border-b
            border-[#302d29]/15
            bg-[#f4efe8]
          "
        >
          <div
            className="
              mx-auto
              max-w-[1480px]
              px-5
              pt-10
              sm:px-8
              sm:pt-12
              lg:px-12
              lg:pt-16
              xl:px-16
            "
          >
            <nav
              aria-label={
                isPersian
                  ? "مسیر صفحه"
                  : "Breadcrumb"
              }
              className="
                flex
                flex-wrap
                items-center
                gap-3
                border-b
                border-[#302d29]/12
                pb-6
              "
            >
              <Link
                href={`/${locale}`}
                className={`
                  font-sans
                  font-semibold
                  text-[#6e675f]
                  transition-colors
                  duration-300
                  hover:text-[#2e5d91]
                  focus-visible:outline-none
                  focus-visible:ring-4
                  focus-visible:ring-[#2e5d91]/15
                  ${
                    isPersian
                      ? "text-[12px] leading-6"
                      : "text-[11px] uppercase tracking-[0.14em]"
                  }
                `}
              >
                {labels.home}
              </Link>

              <span
                aria-hidden="true"
                className="
                  h-px
                  w-6
                  bg-[#b48a52]
                "
              />

              <span
                aria-current="page"
                className={`
                  font-sans
                  font-semibold
                  text-[#8a672f]
                  ${
                    isPersian
                      ? "text-[12px] leading-6"
                      : "text-[11px] uppercase tracking-[0.14em]"
                  }
                `}
              >
                {labels.page}
              </span>
            </nav>
          </div>
        </div>

        <Expertise
          locale={locale}
          dictionary={
            dictionary.expertise
          }
          headingLevel="h1"
        />
      </main>

      <Footer
        locale={locale}
        dictionary={footerDictionary}
        common={dictionary.common}
      />
    </div>
  );
}