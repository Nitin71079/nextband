import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import Features from "../components/home/Features";
import GamesShowcase from "../components/home/GamesShowcase";
import WhyKnarrow from "../components/home/WhyKnarrow";
import DashboardPreview from "../components/home/DashboardPreview";
import Testimonials from "../components/home/Testimonials";
import PricingPreview from "../components/home/PricingPreview";
import CTA from "../components/home/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <GamesShowcase />
      <WhyKnarrow />
      <DashboardPreview />
      <Testimonials />
      <PricingPreview />
      <CTA />
    </>
  );
}
