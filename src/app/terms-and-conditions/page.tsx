import FooterContent from "@/components/FooterContent";
import PageBanner from "@/components/PageBanner";
import { getLegalPageContent } from "@/lib/api";

import { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  const content = await getLegalPageContent("Terms & Conditions");

  if (!content) {
    return {
      title: "Home | MPG Stone",
      description: "Default description",
    };
  }

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

export default async function LegalPage() {
  const page = await getLegalPageContent("Terms & Conditions");
  return (
    <>
      <PageBanner
        bgImg="/media/terms-banner.webp"
        bgImgAlt="Terms & Conditions"
        breadcrum={[{ slug: "", slugName: "Terms & Conditions" }]}
        pageName="Terms & Conditions"
        categoryContent={null}
      />
      {page?.content && (
        <div className="pt-10">
          <FooterContent content={page.content} isFullPage={true} />
        </div>
      )}
    </>
  );
}
