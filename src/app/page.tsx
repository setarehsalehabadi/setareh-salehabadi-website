import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import TrustedBrands from "@/components/sections/TrustedBrands";
import Expertise from "@/components/sections/Expertise";
import CaseStudies from "@/components/sections/CaseStudies";
import Research from "@/components/sections/Research";
import About from "@/components/sections/About";
import Newsletter from "@/components/sections/Newsletter";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />

        <TrustedBrands />

        <Expertise />

        <CaseStudies />

        <Research />

        <About />

        <Newsletter />
      </main>

      <Footer />
    </>
  );
}