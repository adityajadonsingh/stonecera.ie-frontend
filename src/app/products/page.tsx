

import PageBanner from "@/components/PageBanner";
import ProductCard from "@/components/product/ProductCard";
import { getAllProducts, getCategoryBySlug } from "@/lib/api";
import { notFound } from "next/navigation";

// export async function generateStaticParams() {
//   const categories = await getAllCategorys();
//   return categories.map((category: { slug: string }) => ({
//     category: category.slug,
//   }));
// }

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ category: string }>;
// }): Promise<Metadata> {
//   const getParams = await params;
//   const [category] = await getCategoryBySlug(getParams.category);

//   return {
//     title: category.meta_title || "Home | MPG Stone",
//     description: category.meta_description || "Default description",
//     keywords: category.meta_keywords || "",
//     openGraph: {
//       title: category.og_title || category.meta_title || "",
//       description: category.og_description || category.meta_description || "",
//       url: category.canonical_url || "",
//       images: category.meta_image ? [category.meta_image] : [],
//       type: "website",
//       locale: "en_US",
//       siteName: "MPG Stone",
//     },
//     twitter: {
//       title: category.twitter_title || category.meta_title || "",
//       description:
//         category.twitter_decriptions || category.meta_description || "",
//       images: category.meta_image ? [category.meta_image] : [],
//     },
//     alternates: {
//       canonical: category.canonical_url || "",
//     },
//     robots: category.robots_tag,
//   };
// }

export default async function ProductsPage() {
  const allProducts = await getAllProducts();
  const bread = [{
    slugName: "Products",
    slug: "/product-category/"
  }]

  return (
    <>
      <PageBanner bgImg={"/media/products-banner.webp"} bgImgAlt={"products"} pageName={"Products"} breadcrum={bread} categoryContent={null} />

      <section className="product-grid py-10">
        <div className="container">
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
            {
              allProducts.map(product => <ProductCard data={product} key={`prod-${product.id}`} />)
            }
            {/* <ProductCard /> */}
          </div>
        </div>
      </section>

      {/* <FooterContent content={category.descriptions} isFullPage={false} /> */}
      {/* <SchemaInjector schemas={safeSchemas}/> */}
    </>
  );
}
