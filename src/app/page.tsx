import AboutUs from "@/components/home/AboutUs";
import BannerSection from "@/components/home/Banner";
import ContactUs from "@/components/home/ContactUs";
import Testimonials from "@/components/home/Testimonials";
import TopChoices from "@/components/home/TopChoices";
import { getHomepageData } from "@/lib/api";
import { Homepage } from "@/types";

export default async function Home() {
  const homepage: Homepage = await getHomepageData();
  return (
    <>
      <BannerSection banners={homepage.banners} />
      <TopChoices />
      <AboutUs />
      <Testimonials testimonials={homepage.testimonials} />
      <ContactUs/>
    </>
  );
}
