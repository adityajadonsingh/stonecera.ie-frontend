import FooterContent from "@/components/FooterContent";
import PageBanner from "@/components/PageBanner";
import ProductCard from "@/components/product/ProductCard";
import SchemaInjector from "@/components/SchemaInjector";
import { getAllCategories, getCategoryBySlug } from "@/lib/api";
import { JSONObject, Schema } from "@/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category: { slug: string }) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const getParams = await params;
  const category = await getCategoryBySlug(getParams.category);

  if (!category) {
    return {};
  }

  return {
    title: category.seo?.meta_title || "Home | MPG Stone",
    description: category.seo?.meta_description || "Default description",
    openGraph: {
      title: category.seo?.og_title || category.seo?.meta_title || "",
      description:
        category.seo?.og_description || category.seo?.meta_description || "",
      url: category.seo?.canonical || "",
      images: category.seo?.meta_image ? [category.seo?.meta_image] : [],
      type: "website",
      locale: "en_US",
      siteName: "MPG Stone",
    },
    twitter: {
      title: category.seo?.twitter_title || category.seo?.meta_title || "",
      description:
        category.seo?.twitter_description ||
        category.seo?.meta_description ||
        "",
      images: category.seo?.meta_image ? [category.seo?.meta_image] : [],
    },
    alternates: {
      canonical: category.seo?.canonical || "",
    },
    robots: category.seo?.robots,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const getParams = await params;
  const category = await getCategoryBySlug(getParams.category);
  if (!category) return notFound();
  const bread = [
    {
      slugName: "Product Category",
      slug: "/product-category/",
    },
    {
      slugName: category.name,
      slug: "",
    },
  ];
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
        name: category.name,
        item: `https://stonecera.ie/product-category/${category.slug}/`,
      },
    ],
  };

  const normalizeSchema = (schema: Schema | JSONObject): Schema =>
    "schema_json" in schema
      ? (schema as Schema)
      : { id: 0, name: "", schema_json: schema };

  const rawSchemas: (Schema | JSONObject)[] = [
    breadcrumbSchema,
    ...(Array.isArray(category.schema) ? category.schema : []),
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
      <PageBanner
        bgImg={category.pageBanner?.bannerImg}
        bgImgAlt={category.pageBanner?.alt_tag}
        pageName={category.name}
        breadcrum={bread}
        categoryContent={category.short_description}
      />

      <section className="product-grid py-10">
        <div className="container">
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
            {category.products.map((product) => (
              <ProductCard data={product} key={`prod-${product.id}`} />
            ))}
          </div>
        </div>
      </section>
      {category.footer_content !== null && (
        <FooterContent content={category.footer_content} isFullPage={false} />
      )}
      <SchemaInjector schemas={safeSchemas} />
    </>
  );
}
