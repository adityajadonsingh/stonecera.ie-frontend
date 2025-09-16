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
          <div className="grid grid-cols-[55%_40%]">
            <div className="content pr-10 flex flex-col justify-center">
              <h2 className="headingH2">Lorem, ipsum dolor.</h2>
              <p className="py-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Temporibus iure quia eveniet quos qui fuga fugiat! Architecto
                atque dolorem reiciendis, tenetur aperiam vitae alias molestiae
                numquam quo rerum. Eaque, impedit.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
                autem eveniet nihil, reiciendis similique amet voluptatibus
                quisquam voluptatem optio. Dolorem!
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
          <div className="grid grid-cols-2">
            <div className="left-side">
              <h2 className="headingH2">Top Choices</h2>
              <p className="pt-4">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
            </div>
            <div className="right-side flex items-center justify-end">
              <Link href="/product-category/">
                <button className="btnType-1">Explore All Categories</button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-4 mt-8 gap-5">
            <div className="card text-center min-h-[300px] flex flex-col justify-center items-center p-2 text-white bg-[#867F54]">
                <div className="icn flex justify-center items-center border-1 border-white w-[78px] h-[78px]">
                    <Image src={"/media/about/durable.png"} alt="durable" width={50} height={50}/>
                </div>
                <span className="block pt-5 pb-3 text-xl font-semibold">Highly Durable</span>
                <p className="!text-white"> From our humble beginnings, weve grown into a team of passionate creatives, strategists, and technologists dedicated to bringing visions to life.</p>
            </div>
            <div className="card text-center min-h-[300px] flex flex-col justify-center items-center p-2 text-white bg-[#867F54]">
                <div className="icn flex justify-center items-center border-1 border-white w-[78px] h-[78px]">
                    <Image src={"/media/about/time.png"} alt="durable" width={40} height={50}/>
                </div>
                <span className="block pt-5 pb-3 text-xl font-semibold">Timely service</span>
                <p className="!text-white"> From our humble beginnings, weve grown into a team of passionate creatives, strategists, and technologists dedicated to bringing visions to life.</p>
            </div>
            <div className="card text-center min-h-[300px] flex flex-col justify-center items-center p-2 text-white bg-[#867F54]">
                <div className="icn flex justify-center items-center border-1 border-white w-[78px] h-[78px]">
                    <Image src={"/media/about/price.png"} alt="durable" width={45} height={50}/>
                </div>
                <span className="block pt-5 pb-3 text-xl font-semibold">Affordable price</span>
                <p className="!text-white"> From our humble beginnings, weve grown into a team of passionate creatives, strategists, and technologists dedicated to bringing visions to life.</p>
            </div>
            <div className="card text-center min-h-[300px] flex flex-col justify-center items-center p-2 text-white bg-[#867F54]">
                <div className="icn flex justify-center items-center border-1 border-white w-[78px] h-[78px]">
                    <Image src={"/media/about/quality.png"} alt="durable" width={42} height={50}/>
                </div>
                <span className="block pt-5 pb-3 text-xl font-semibold">Ensured Quality</span>
                <p className="!text-white"> From our humble beginnings, weve grown into a team of passionate creatives, strategists, and technologists dedicated to bringing visions to life.</p>
            </div>
          </div>
        </div>
      </section>
      <ProductSlider title="Browse Our Extensive Product Line" products={randomProducts}/>
    </>
  );
}
