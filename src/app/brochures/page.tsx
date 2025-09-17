import PageBanner from "@/components/PageBanner";
import { getBrochurePage } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";

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
          <div className="grid grid-cols-4">
            {data.brochures.map((b, i) => {
              return (
                <Link href={b.pdf?.url} target="_blank">
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
