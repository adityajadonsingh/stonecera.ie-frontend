import Image from "next/image";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import { getContactPage, getFooter, getHomepageData } from "@/lib/api";
import ContactUs from "@/components/home/ContactUs";
import { ContactPageData } from "@/types";

import { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content: ContactPageData = await getContactPage();
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

export default async function ContactPage() {
    const details = await getFooter();
    const homeData = await getHomepageData();
    console.log(details);
    return (
        <>
            <PageBanner bgImg={"/media/contact-banner.webp"} bgImgAlt="Contact Us" pageName="Contact Us" breadcrum={[{ slugName: "Contact us", slug: "/" }]} categoryContent={null} />
            <section className="contact-top py-10">
                <div className="container">
                    <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
                        <div className="card flex flex-col px-2 justify-center gap-3 text-center items-center bg-[#F3F3EB] h-[250px]">
                            <div className="icn w-[85px] h-[85px] flex justify-center items-center bg-[#867F54]">
                                <Image src={"/media/contact/location.png"} alt="location" width={39} height={47}/>
                            </div>
                            <h2 className="text-xl font-semibold">Our Location</h2>
                            <span className="text-[#867F54]">{details.address}</span>
                        </div>
                        <div className="card flex flex-col px-2 justify-center gap-3 text-center items-center bg-[#F3F3EB] h-[250px]">
                            <div className="icn w-[85px] h-[85px] flex justify-center items-center bg-[#867F54]">
                                <Image src={"/media/contact/mail.png"} alt="location" width={39} height={47}/>
                            </div>
                            <h2 className="text-xl font-semibold">Mail Us</h2>
                            <Link href={`mailto:${details.email1}`}><span className="text-[#867F54]">{details.email1}</span></Link>
                        </div>
                        <div className="card flex flex-col px-2 justify-center gap-3 text-center items-center bg-[#F3F3EB] h-[250px]">
                            <div className="icn w-[85px] h-[85px] flex justify-center items-center bg-[#867F54]">
                                <Image src={"/media/contact/call.png"} alt="location" width={39} height={47}/>
                            </div>
                            <h2 className="text-xl font-semibold">Call Us</h2>
                            <Link href={`tel:${details.phone_number1}`}><span className="text-[#867F54]">{details.phone_number1}</span></Link>
                        </div>
                        <div className="card flex flex-col px-2 justify-center gap-3 text-center items-center bg-[#F3F3EB] h-[250px]">
                            <div className="icn w-[85px] h-[85px] flex justify-center items-center bg-[#867F54]">
                                <Image src={"/media/contact/operating.png"} alt="location" width={39} height={47}/>
                            </div>
                            <h2 className="text-xl font-semibold">Operating Time</h2>
                            <span className="text-[#867F54]">9 AM - 6 PM</span>
                        </div>
                    </div>
                </div>
            </section>
            <ContactUs data={homeData.contactContent}/>
        </>
    )
}