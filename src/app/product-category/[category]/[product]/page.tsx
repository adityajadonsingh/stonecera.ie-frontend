// app/product/[category]/[product]/page.tsx

import ProductGallery from "@/components/product/ProductGallery";
import {
  getAllProducts,
  getCategoryBySlug,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import HtmlContent from "@/components/HtmlContent";
import ReviewSection from "@/components/product/ReviewSection";
import ProductSlider from "@/components/ProductSlider";
import ContactPopup from "@/components/ContactPopup";
import { Metadata } from "next";
import { JSONObject, Schema } from "@/types";
import SchemaInjector from "@/components/SchemaInjector";

interface ProductPageProps {
  params: Promise<{ category: string; product: string }>;
}

export async function generateStaticParams() {
  const allProducts = await getAllProducts();
  return allProducts.map((product) => ({
    category: product.category.slug,
    product: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; product: string }>;
}): Promise<Metadata> {
  const { category, product } = await params;
  const categories = await getCategoryBySlug(category);
  const productData = await getProductBySlug(product);

  if (!categories || !productData) return {};

  return {
    title: productData.seo?.meta_title,
    description: productData.seo?.meta_description,
    openGraph: {
      title: productData.seo?.og_title || productData.seo?.meta_title || "",
      description:
        productData.seo?.og_description ||
        productData.seo?.meta_description ||
        "",
      url: productData.seo?.canonical || "",
      images: productData.seo?.meta_image ? [productData.seo?.meta_image] : [],
      type: "website",
      locale: "en_US",
      siteName: "MPG Stone",
    },
    twitter: {
      title:
        productData.seo?.twitter_title || productData.seo?.meta_title || "",
      description:
        productData.seo?.twitter_description ||
        productData.seo?.meta_description ||
        "",
      images: productData.seo?.meta_image ? [productData.seo?.meta_image] : [],
    },
    alternates: {
      canonical: productData.seo?.canonical || "",
    },
    robots: productData.seo?.robots,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { category, product } = await params;
  const productData = await getProductBySlug(product);

  if (category !== productData?.category.slug || product !== productData.slug) {
    return notFound();
  }

  const related = await getRelatedProducts(category, productData?.id, 5);
    const breadcrumbSchema = {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://stonecera.ie/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Product Category",
        item: "https://stonecera.ie/product-category/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: productData.category?.name,
        item: `https://stonecera.ie/product-category/${productData.category?.slug}/`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: productData.name,
        item: `https://stonecera.ie/product-category/${productData.category?.name}/${productData.slug}/`,
      },
    ],
  };
  const reviewsSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: productData.name,
    image: productData.image,
    description: productData.seo?.meta_description || "",
    brand: {
      "@type": "Brand",
      name: "MPG Stone",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      ratingCount: "15",
    },
  };

  const normalizeSchema = (schema: Schema | JSONObject): Schema =>
    "schema_json" in schema
      ? (schema as Schema)
      : { id: 0, name: "", schema_json: schema };

  const rawSchemas: (Schema | JSONObject)[] = [
    breadcrumbSchema,
    reviewsSchema,
    ...(Array.isArray(productData.schema) ? productData.schema : []),
  ];

  const safeSchemas: Schema[] = Array.from(
    new Map(
      rawSchemas.map((schema) => {
        const normalized = normalizeSchema(schema);
        return [JSON.stringify(normalized.schema_json), normalized];
      })
    ).values()
  );
  return (
    <>
      <section className="product-top py-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image Gallery */}
            <ProductGallery images={productData.images} />

            {/* Product Details */}
            <div className="product-info">
              {/* Breadcrumbs */}
              <div className="product-bread mb-3">
                <ul className="flex flex-wrap gap-x-2 font-semibold md:text-base text-sm text-[#867f54] capitalize">
                  <li>
                    <Link href={"/"}>Home</Link>
                  </li>
                  <li>/</li>
                  <li>
                    <Link href={`/product-category/`}>Product Category</Link>
                  </li>
                  <li>/</li>
                  <li>
                    <Link href={`/product-category/${category}/`}>
                      {productData.category?.name}
                    </Link>
                  </li>
                  <li>/</li>
                  <li>{productData.name}</li>
                </ul>
              </div>

              <h1 className="md:text-3xl text-2xl capitalize font-bold mb-4">
                {productData.name}
              </h1>

              <HtmlContent
                content={productData.description}
                className="prose"
              />

              {productData.attributes.length >= 1 && (
                <div className="attributes mt-4 bg-[#f3f3eb] py-4 px-4">
                  <h2 className="text-[#867f54] font-semibold text-lg mb-3">
                    Product Attributes
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full border border-[#d1cfb8] text-[#867f54]">
                      <tbody>
                        {productData.attributes.map((item) => (
                          <tr
                            key={item.id}
                            className="border-b border-[#d1cfb8]"
                          >
                            <td className="px-3 py-2 font-semibold w-1/3">
                              {item.attribute_name}
                            </td>
                            <td className="px-3 py-2">
                              {item.attribute_value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Enquire Button with Popup */}
              <ContactPopup productName={productData.name} />

              <span className="mt-3 text-xs block text-[#b2ac88]">
                ** Image Shown in Picture might Vary in real, Images are for
                Visual Purposes only
              </span>
            </div>
          </div>
        </div>
      </section>

      <ReviewSection slug={productData.slug} productId={productData.id} />
      <ProductSlider title="Similar Products" products={related} />
      <SchemaInjector schemas={safeSchemas} />
    </>
  );
}
 