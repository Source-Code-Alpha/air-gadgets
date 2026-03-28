import HeroSection from "@/components/store/HeroSection";
import FeaturedCategories from "@/components/store/FeaturedCategories";
import BrandMarquee from "@/components/store/BrandMarquee";
import FeaturedProducts from "@/components/store/FeaturedProducts";
import StatsCounter from "@/components/store/StatsCounter";
import WhyChooseUs from "@/components/store/WhyChooseUs";
import Testimonials from "@/components/store/Testimonials";
import Newsletter from "@/components/store/Newsletter";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedCategories />
      <BrandMarquee />
      <FeaturedProducts />
      <StatsCounter />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
    </>
  );
}
