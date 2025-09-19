import FooterContent from "@/components/FooterContent";
import AboutUs from "@/components/home/AboutUs";
import BannerSection from "@/components/home/Banner";
import ContactUs from "@/components/home/ContactUs";
import Testimonials from "@/components/home/Testimonials";
import TopChoices from "@/components/home/TopChoices";
import SchemaInjector from "@/components/SchemaInjector";
import { getAllCategories, getHomepageData } from "@/lib/api";
import { Category, Homepage } from "@/types";

import { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content: Homepage = await getHomepageData();
  const seo = content.seo;


  return {
    title: seo.meta_title || "Home | MPG Stone",
    description: seo.meta_description || "Default description",
    openGraph: {
      title: seo.og_title || seo.meta_title || "",
      description: seo.og_description || seo.meta_description || "",
      url: seo.canonical || "",
      images: seo.meta_image ? [seo.meta_image] : [],
      type: "website",
      locale: "en_US",
      siteName: "Stonecera",
    },
    twitter: {
      title: seo.twitter_title || seo.meta_title || "",
      description: seo.twitter_description || seo.meta_description || "",
      images: seo.meta_image ? [seo.meta_image] : [],
    },
    alternates: {
      canonical: seo.canonical || "",
    },
    robots: seo.robots,
  };
}

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
      <SchemaInjector schemas={homepage.schema} />
    </>
  );
}
