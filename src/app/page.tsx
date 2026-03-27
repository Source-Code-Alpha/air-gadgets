import HeroSection from "@/components/store/HeroSection";
import FeaturedCategories from "@/components/store/FeaturedCategories";
import FeaturedProducts from "@/components/store/FeaturedProducts";
import WhyChooseUs from "@/components/store/WhyChooseUs";
import Newsletter from "@/components/store/Newsletter";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedCategories />
      <FeaturedProducts />
      <WhyChooseUs />
      <Newsletter />
    </>
  );
}
