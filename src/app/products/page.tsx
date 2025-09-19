

import PageBanner from "@/components/PageBanner";
import ProductCard from "@/components/product/ProductCard";
import { getAllProducts, getProductsSeo } from "@/lib/api";
import { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getProductsSeo();

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

export default async function ProductsPage() {
  const allProducts = await getAllProducts();
  if (!allProducts || allProducts.length === 0) {
    return <p>No products found.</p>;
  }
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
          </div>
        </div>
      </section>
    </>
  );
}
