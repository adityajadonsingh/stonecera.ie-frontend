import Image from "next/image";

import PageBanner from "@/components/PageBanner";
import CategorySlider from "@/components/product-category/CategorySlider";
import { getAllCategories, getProductCategoryPageData } from "@/lib/api";
import { Category, ProductCategory } from "@/types";

export default async function ProductCategoryPage() {
    const getPageData: ProductCategory = await getProductCategoryPageData();
    const allCategories: Category[] = await getAllCategories();
    const bread = [{
        slugName: "Product Category",
        slug: ""
    }]
    console.log(getPageData);
    return (
        <>
            <PageBanner bgImg={getPageData.pageBanner?.bannerImg} bgImgAlt={getPageData.pageBanner?.alt_tag} pageName={getPageData.pageBanner?.pageName} breadcrum={bread} categoryContent={null}/>
            <CategorySlider allCategories={allCategories} />
            <section className="category-page-footer mb-10">
                <div className="container">
                    <div className="grid grid-cols-[45%_55%]">
                        <div className="content px-8 py-4 w-full h-full flex flex-col justify-center bg-[#F5F5DC]">
                            <h2 className="headingH2 pb-3">{getPageData.footer?.footerHeading}</h2>
                            <p>{getPageData.footer?.footerContent}</p>
                        </div>
                        <div className="img-box h-[500px] relative">
                            <Image 
                                src={getPageData.footer?.footerImg}
                                alt={getPageData.footer?.footerImgAlt}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}