import FAQ from "@/components/faq";
import Features from "@/components/features";
import Footer from "@/components/footer";
import { HeroSection1 } from "@/components/pro-blocks/landing-page/hero-sections/hero-section-1";
import Testimonials from "@/components/testimonials";

export default function Home() {
  return (
    <main>
      <HeroSection1 />
      <Features />
      <Testimonials/>
      <FAQ/>
      <Footer/>
    </main>
  );
}
