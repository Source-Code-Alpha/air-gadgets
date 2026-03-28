import HeroSection from "@/components/store/HeroSection";
import FeaturedCategories from "@/components/store/FeaturedCategories";
import BrandMarquee from "@/components/store/BrandMarquee";
import FeaturedProducts from "@/components/store/FeaturedProducts";
import StatsCounter from "@/components/store/StatsCounter";
import WhyChooseUs from "@/components/store/WhyChooseUs";
import Testimonials from "@/components/store/Testimonials";
import Newsletter from "@/components/store/Newsletter";
import SectionWrapper from "@/components/store/SectionWrapper";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SectionWrapper>
        <FeaturedCategories />
      </SectionWrapper>
      <SectionWrapper delay={100}>
        <BrandMarquee />
      </SectionWrapper>
      <SectionWrapper delay={100}>
        <FeaturedProducts />
      </SectionWrapper>
      <SectionWrapper delay={100}>
        <StatsCounter />
      </SectionWrapper>
      <SectionWrapper delay={100}>
        <WhyChooseUs />
      </SectionWrapper>
      <SectionWrapper delay={100}>
        <Testimonials />
      </SectionWrapper>
      <SectionWrapper delay={100}>
        <Newsletter />
      </SectionWrapper>
    </>
  );
}
