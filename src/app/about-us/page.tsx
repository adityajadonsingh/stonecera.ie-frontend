import Image from "next/image";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import { getAboutPageData, getRandomProducts } from "@/lib/api";
import ProductSlider from "@/components/ProductSlider";

export default async function AboutUsPage() {
  const data = await getAboutPageData();
  const randomProducts = await getRandomProducts(10);

  return (
    <>
      <PageBanner
        bgImg={data.pageBanner?.bannerImg}
        bgImgAlt={data.pageBanner?.alt_tag}
        pageName={data.pageBanner?.pageName}
        breadcrum={[{ slugName: "About Us", slug: "" }]}
        categoryContent={null}
      />
      <section className="about-us py-10">
        <div className="container">
          <div className="grid md:grid-cols-[55%_40%] grid-cols-1 gap-y-10">
            <div className="content pr-10 flex flex-col justify-center md:text-start text-center">
              <h2 className="headingH2">Who we are?</h2>
              <p className="py-2">
                Stonecera is a trusted stone supplier in Ireland, offering an expertly curated range of natural and engineered stones to enhance living spaces, gardens, and commercial projects. Our collection includes cobblestone paving, sandstone paving, outdoor porcelain tiles, porcelain paving, and porcelain plank tiles. 

              </p>
              <p>
                All designed to combine timeless beauty with long-lasting strength.  With deep industry expertise and a passion for quality, we help homeowners, architects, and businesses bring their design vision to life. 
              </p>
            </div>
            <div className="img-box relative h-[400px] w-full">
              <Image
                src={"/media/demo-about.png"}
                alt="about us"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="features pb-10">
        <div className="container">
          <div className="grid lg:grid-cols-2 md:grid-cols-[70%_30%] grid-cols-1 items-center gap-y-6">
            <div className="left-side md:text-start text-center">
              <h2 className="headingH2">Why Choose Stonecera?</h2>
              <p className="pt-4">
                At Stoncera, we strongly believe in going beyond just supplying stones! We deliver quality, trust, and timeless beauty. Our commitment ensures that every customer in Ireland receives highly durable material, professional guidance, and the timeless elegance of natural stones. 
              </p>
            </div>
            <div className="right-side flex items-center md:justify-end justify-center">
              <Link href="/product-category/">
                <button className="btnType-1">Explore All Categories</button>
              </Link>
            </div>
          </div>
          <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 mt-8 gap-5">
            <div className="card text-center min-h-[300px] flex flex-col justify-center items-center px-2 py-6 text-white bg-[#867F54]">
                <div className="icn flex justify-center items-center border-1 border-white w-[78px] h-[78px]">
                    <Image src={"/media/about/durable.png"} alt="durable" width={50} height={50}/>
                </div>
                <span className="block pt-5 pb-3 text-xl font-semibold">Versatile Range</span>
                <p className="!text-white">Discover natural stone, porcelain, cladding, and paving solutions carefully curated to suit Irish homes, gardens, and commercial projects, offering both contemporary style and traditional charm in every way.</p>
            </div>
            <div className="card text-center min-h-[300px] flex flex-col justify-center items-center px-2 py-6 text-white bg-[#867F54]">
                <div className="icn flex justify-center items-center border-1 border-white w-[78px] h-[78px]">
                    <Image src={"/media/about/time.png"} alt="durable" width={40} height={50}/>
                </div>
                <span className="block pt-5 pb-3 text-xl font-semibold">Unmatched Quality</span>
                <p className="!text-white">Every stone is sourced from trusted quarries and crafted to meet the international standards, ensuring high durability, great resilience, and timeless beauty that withstands Ireland’s climate while enhancing spaces for decades. </p>
            </div>
            <div className="card text-center min-h-[300px] flex flex-col justify-center items-center px-2 py-6 text-white bg-[#867F54]">
                <div className="icn flex justify-center items-center border-1 border-white w-[78px] h-[78px]">
                    <Image src={"/media/about/price.png"} alt="durable" width={45} height={50}/>
                </div>
                <span className="block pt-5 pb-3 text-xl font-semibold">Eco-friendly Products</span>
                <p className="!text-white">We greatly prioritize eco-friendly sourcing and long-lasting performance, reducing environmental impact while offering customers sustainable building materials that add value and responsibility to their projects.</p>
            </div>
            <div className="card text-center min-h-[300px] flex flex-col justify-center items-center px-2 py-6 text-white bg-[#867F54]">
                <div className="icn flex justify-center items-center border-1 border-white w-[78px] h-[78px]">
                    <Image src={"/media/about/quality.png"} alt="durable" width={42} height={50}/>
                </div>
                <span className="block pt-5 pb-3 text-xl font-semibold">Customer-Centric Service</span>
                <p className="!text-white">From professional advice to reliable support, we guide clients at every stage, ensuring smooth experiences, tailored solutions, and complete satisfaction with every Stonecera product chosen.</p>
            </div>
          </div>
        </div>
      </section>
      <ProductSlider title="Browse Our Extensive Product Line" products={randomProducts}/>
    </>
  );
}
