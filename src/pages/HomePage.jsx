import HeroSection          from "../sections/HeroSection";
import StatsSection         from "../sections/StatsSection";
import WhyChooseUs          from "../sections/WhyChooseUs";
import CertificationSection from "../sections/CertificationSection";
import TestimonialsSection  from "../sections/TestimonialsSection";
import EmergencyBannerSection from "../sections/EmergencyBannerSection";
import BlogSection          from "../sections/BlogSection";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <WhyChooseUs />
      <TestimonialsSection />
      <EmergencyBannerSection />
      <BlogSection />
      <CertificationSection />
    </div>
  );
}
