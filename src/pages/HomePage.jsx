import HeroSection          from "../sections/HeroSection";
import StatsSection         from "../sections/StatsSection";
import CertificationSection from "../sections/CertificationSection";
import ServicesSection      from "../sections/ServicesSection";
import WhyChooseUs          from "../sections/WhyChooseUs";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <WhyChooseUs />
      <CertificationSection />
    </div>
  );
}