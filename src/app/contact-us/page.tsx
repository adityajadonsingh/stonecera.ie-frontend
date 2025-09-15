import PageBanner from "@/components/PageBanner";

export default function ContactPage() {
    return (
        <>
            <PageBanner bgImg={"/media/contact-banner.webp"} bgImgAlt="Contact Us" pageName="Contact Us" breadcrum={[{ slugName: "Contact us", slug: "/" }]} categoryContent={null} />
            <section className="contact-top">
                <div className="container">
                    <div className="grid grid-cols-4">
                        <div className="card">
                            
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}