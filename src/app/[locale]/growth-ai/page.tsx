import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";

import {
  isLocale,
  type Locale,
} from "@/i18n/config";

import {
  getDictionary,
  type Dictionary,
} from "@/i18n/get-dictionary";

const siteUrl = "https://setarehsalehabadi.com";

type GrowthAIPageProps = {
  params: Promise<{
    locale: string;
  }>;
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

    navigation: dictionary.footer.navigation.map((item) => ({
      ...item,
      href: prefixHomeHash(item.href, locale),
    })),
  };

  return footer as unknown as Dictionary["footer"];
}

export async function generateMetadata({
  params,
}: GrowthAIPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;
  const dictionary = (await getDictionary(locale)) as Dictionary;

  const canonicalUrl = `${siteUrl}/${locale}/growth-ai`;
  const metadataTitle =
    `${dictionary.growthAI.eyebrow} | ${dictionary.common.brandName}`;

  return {
    title: metadataTitle,
    description: dictionary.growthAI.description,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: metadataTitle,
      description: dictionary.growthAI.description,
      url: canonicalUrl,
      type: "website",
    },

    twitter: {
      card: "summary",
      title: metadataTitle,
      description: dictionary.growthAI.description,
    },
  };
}

export default async function GrowthAIPage({
  params,
}: GrowthAIPageProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;
  const dictionary = (await getDictionary(locale)) as Dictionary;
  const isPersian = locale === "fa";

  const footerDictionary =
    createInternalPageFooter(dictionary, locale);

  return (
    <div
      className={isPersian ? "font-fa" : undefined}
      dir={isPersian ? "rtl" : "ltr"}
    >
<Header
  locale={locale}
  dictionary={dictionary.header}
  common={dictionary.common}
/>
      <main className="bg-[#ebe4da]">
        <section
          className="
            mx-auto
            flex
            min-h-[72vh]
            max-w-[1480px]
            items-center
            px-5
            py-24
            sm:px-8
            sm:py-28
            lg:px-12
            lg:py-32
            xl:px-16
          "
        >
          <div className="max-w-4xl">
            <p
              className="
                mb-6
                text-[11px]
                font-medium
                uppercase
                tracking-[0.18em]
                text-[#302d29]/58
              "
            >
              {dictionary.growthAI.eyebrow}
            </p>

            <h1
              className="
                max-w-4xl
                text-4xl
                font-medium
                leading-[1.08]
                tracking-[-0.035em]
                text-[#302d29]
                sm:text-5xl
                lg:text-7xl
              "
            >
              {dictionary.growthAI.title}
            </h1>

            <p
              className="
                mt-8
                max-w-2xl
                text-base
                leading-8
                text-[#302d29]/68
                sm:text-lg
                sm:leading-9
              "
            >
              {dictionary.growthAI.description}
            </p>

            <div
              className="
                mt-10
                inline-flex
                items-center
                gap-3
                rounded-full
                border
                border-[#302d29]/15
                bg-[#f4efe8]/65
                px-5
                py-3
                text-sm
                text-[#302d29]/72
              "
            >
              <span
                aria-hidden="true"
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-[#68705a]
                "
              />

              <span>{dictionary.growthAI.status}</span>
            </div>
          </div>
        </section>
      </main>

      <Footer
        locale={locale}
        dictionary={footerDictionary}
        common={dictionary.common}
      />
    </div>
  );
}