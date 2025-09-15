import FooterContent from "@/components/FooterContent";
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
      <TopChoices allCategories={allCategories} data={homepage.categorySlider} />
      <AboutUs data={homepage.aboutContent} />
      <Testimonials testimonials={homepage.testimonials} />
      <ContactUs data={homepage.contactContent}/>
      <FooterContent content={homepage.footerContent} isFullPage={false}/>
    </>
  );
}
