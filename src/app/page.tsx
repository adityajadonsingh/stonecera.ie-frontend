import AboutUs from "@/components/home/AboutUs";
import BannerSection from "@/components/home/Banner";
import ContactUs from "@/components/home/ContactUs";
import Testimonials from "@/components/home/Testimonials";
import TopChoices from "@/components/home/TopChoices";
import { getAllCategories, getHomepageData } from "@/lib/api";
import { Category, Homepage } from "@/types";

export default async function Home() {
  const homepage: Homepage = await getHomepageData();
  const allCategories: Category[] = await getAllCategories();
  return (
    <>
      <BannerSection banners={homepage.banners} />
      <TopChoices allCategories={allCategories} />
      <AboutUs />
      <Testimonials testimonials={homepage.testimonials} />
      <ContactUs/>
    </>
  );
}
