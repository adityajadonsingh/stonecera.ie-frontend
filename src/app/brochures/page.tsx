import PageBanner from "@/components/PageBanner";
import { getBrochurePage } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";

import { Metadata } from "next";
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
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            {data.brochures.map((b) => {
              return (
                <Link href={b.pdf?.url} key={b.id} target="_blank">
                  <div className="card ">
                    <div className="h-[200px] relative">
                      <Image
                        src={b.thumbnail_image?.url}
                        alt={b.brochure_name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-center mt-2 block text-lg text-[#b2ac88] font-semibold">{b.brochure_name}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
