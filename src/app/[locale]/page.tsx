import { notFound } from "next/navigation";

import Header from "@/components/Header";
import About from "@/components/sections/About";
import CaseStudies from "@/components/sections/CaseStudies";
import Expertise from "@/components/sections/Expertise";
import Footer from "@/components/sections/Footer";
import GrowthSystem from "@/components/sections/GrowthSystem";
import Hero from "@/components/sections/Hero";
import Newsletter from "@/components/sections/Newsletter";
import Research from "@/components/sections/Research";
import TrustedBrands from "@/components/sections/TrustedBrands";

import {
  isLocale,
  type Locale,
} from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type HomePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function HomePage({
  params,
}: HomePageProps) {
  const { locale: localeParam } =
    await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;
  const dictionary =
    await getDictionary(locale);

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
        <Hero
          locale={locale}
          dictionary={dictionary.hero}
        />

        <TrustedBrands
          locale={locale}
          dictionary={
            dictionary.trustedBrands
          }
        />

        <Expertise
          locale={locale}
          dictionary={
            dictionary.expertise
          }
        />

        <GrowthSystem
          locale={locale}
          dictionary={
            dictionary.growthSystem
          }
        />

        <CaseStudies
          locale={locale}
          dictionary={
            dictionary.caseStudies
          }
        />

        <Research
          locale={locale}
          dictionary={
            dictionary.research
          }
        />

        <About
          locale={locale}
          dictionary={dictionary.about}
        />

        <Newsletter
          locale={locale}
          dictionary={
            dictionary.newsletter
          }
        />
      </main>

      <Footer
        locale={locale}
        dictionary={dictionary.footer}
        common={dictionary.common}
      />
    </div>
  );
}