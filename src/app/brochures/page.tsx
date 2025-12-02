import PageBanner from "@/components/PageBanner";
import { getBrochurePage } from "@/lib/api";
import { Metadata } from "next";
import BrochureGrid from "./BrochureGrid";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getBrochurePage();
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

export default async function BrochurePage() {
  const data = await getBrochurePage();

  return (
    <>
      <PageBanner
        bgImg={data.pageBanner?.bannerImg}
        bgImgAlt={data.pageBanner?.alt_tag}
        pageName={data.pageBanner?.pageName}
        breadcrum={[{ slug: "", slugName: "Brochures" }]}
        categoryContent={null}
      />
      <section className="brochure py-10">
        <div className="container">
          <BrochureGrid data={data}/>
        </div>
      </section>
    </>
  );
}
