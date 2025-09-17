

import FooterContent from "@/components/FooterContent";
import PageBanner from "@/components/PageBanner";
import ProductCard from "@/components/product/ProductCard";
import { getCategoryBySlug } from "@/lib/api";
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

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const getParams = await params;
  const category = await getCategoryBySlug(getParams.category);
  if (!category) return notFound();
  const bread = [{
    slugName: "Product Category",
    slug: "/product-category/"
  },{
    slugName: category.name,
    slug: ""
  }]
  // const { products, totalPages } = await getProductsByCategory(
  //   getParams.category,
  //   1
  // );
  // const breadcrumbSchema = {
  //   "@context": "https://schema.org/",
  //   "@type": "BreadcrumbList",
  //   itemListElement: [
  //     {
  //       "@type": "ListItem",
  //       position: 1,
  //       name: "Home",
  //       item: "https://mpgstone.co.uk/",
  //     },
  //     {
  //       "@type": "ListItem",
  //       position: 2,
  //       name: "Product Category",
  //       item: "https://mpgstone.co.uk/product-category/",
  //     },
  //     {
  //       "@type": "ListItem",
  //       position: 3,
  //       name: category.category_name,
  //       item: `https://mpgstone.co.uk/product-category/${category.slug}/`,
  //     },
  //   ],
  // };

  // const normalizeSchema = (schema: Schema | JSONObject): Schema =>
  //   "schema_json" in schema
  //     ? (schema as Schema)
  //     : { id: 0, name: "", schema_json: schema };

  // const rawSchemas: (Schema | JSONObject)[] = [
  //   breadcrumbSchema,
  //   ...(Array.isArray(category.schemas) ? category.schemas : []),
  // ];

  // const safeSchemas: Schema[] = Array.from(
  //   new Map(
  //     rawSchemas.map((schema) => {
  //       const normalized = normalizeSchema(schema);
  //       return [JSON.stringify(normalized.schema_json), normalized];
  //     })
  //   ).values()
  // );

  return (
    <>
      <PageBanner bgImg={category.pageBanner?.bannerImg} bgImgAlt={category.pageBanner?.alt_tag} pageName={category.name} breadcrum={bread} categoryContent={category.short_description} />

      <section className="product-grid py-10">
        <div className="container">
          <div className="grid grid-cols-4 gap-4">
            {
              category.products.map(product => <ProductCard data={product} key={`prod-${product.id}`} />)
            }
            {/* <ProductCard /> */}
          </div>
        </div>
      </section>
      <FooterContent content={category.footer_content} isFullPage={false}/>
      {/* <FooterContent content={category.descriptions} isFullPage={false} /> */}
      {/* <SchemaInjector schemas={safeSchemas}/> */}
    </>
  );
}
