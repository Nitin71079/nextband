import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import Features from "../components/home/Features";
import WhyNextBand from "../components/home/WhyNextBand";
import DashboardPreview from "../components/home/DashboardPreview";
import Testimonials from "../components/home/Testimonials";
import PricingPreview from "../components/home/PricingPreview";
import CTA from "../components/home/CTA";
import Footer from "../components/home/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <WhyNextBand />
      <DashboardPreview />
      <Testimonials />
      <PricingPreview />
      <CTA />
      <Footer />
    </>
  );
}