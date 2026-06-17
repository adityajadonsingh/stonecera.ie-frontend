import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import HtmlContent from "@/components/HtmlContent";
import SchemaInjector from "@/components/SchemaInjector";
import BlogCommentSection from "@/components/blog/BlogCommentSection";
import { getBlogBySlug, getBlogs } from "@/lib/api";
import { JSONObject, Schema } from "@/types";

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-IE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getBlogBySlug(slug);

  if (!data?.blog) return {};

  const seo = data.blog.seo;

  return {
    title: seo?.meta_title || data.blog.title,
    description: seo?.meta_description || data.blog.shortDescription,
    openGraph: {
      title: seo?.og_title || seo?.meta_title || data.blog.title,
      description:
        seo?.og_description ||
        seo?.meta_description ||
        data.blog.shortDescription,
      url: seo?.canonical || `https://stonecera.ie/blogs/${data.blog.slug}/`,
      images: seo?.meta_image ? [seo.meta_image] : [],
      type: "article",
      locale: "en_IE",
      siteName: "Stonecera",
    },
    twitter: {
      title: seo?.twitter_title || seo?.meta_title || data.blog.title,
      description:
        seo?.twitter_description ||
        seo?.meta_description ||
        data.blog.shortDescription,
      images: seo?.meta_image ? [seo.meta_image] : [],
    },
    alternates: {
      canonical: seo?.canonical || `https://stonecera.ie/blogs/${data.blog.slug}/`,
    },
    robots: seo?.robots,
  };
}

export async function generateStaticParams() {
  const blogs = await getBlogs();

  return blogs.data.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getBlogBySlug(slug);

  if (!data?.blog) return notFound();

  const { blog, recentBlogs } = data;
  const hasRecentBlogs = recentBlogs.length > 0;
  const canonical = `https://stonecera.ie/blogs/${blog.slug}/`;

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
        name: "Blogs",
        item: "https://stonecera.ie/blogs/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: blog.title,
        item: canonical,
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
    headline: blog.title,
    description: blog.shortDescription,
    image: blog.image?.url || null,
    publisher: {
      "@type": "Organization",
      name: "Stonecera",
      logo: {
        "@type": "ImageObject",
        url: "https://stonecera.ie/media/logo.png",
      },
    },
    datePublished: new Date(blog.createdOn).toISOString(),
  };

  const normalizeSchema = (schema: Schema | JSONObject): Schema =>
    "schema_json" in schema
      ? (schema as Schema)
      : { id: 0, name: "", schema_json: schema };

  const isSchemaObject = (schema: unknown): schema is Schema | JSONObject =>
    typeof schema === "object" && schema !== null && !Array.isArray(schema);

  const seoSchemas = blog.seo?.schemas;
  const extraSchemas = Array.isArray(seoSchemas)
    ? seoSchemas.filter(isSchemaObject)
    : isSchemaObject(seoSchemas)
    ? [seoSchemas]
    : [];

  const rawSchemas: (Schema | JSONObject)[] = [
    breadcrumbSchema,
    articleSchema,
    ...extraSchemas,
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
      <section className="md:py-16 py-8">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            <article className={hasRecentBlogs ? "lg:col-span-3" : "lg:col-span-4"}>
              <ul className="flex flex-wrap gap-x-2 font-semibold md:text-base text-sm text-[#867f54] capitalize mb-4">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/blogs/">Blogs</Link>
                </li>
                <li>/</li>
                <li>{blog.title}</li>
              </ul>

              <h1 className="md:text-3xl text-2xl font-bold mb-4">
                {blog.title}
              </h1>

              {(blog.updatedOn || blog.createdOn) && (
                <div className="mb-5 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  {blog.createdOn && (
                    <p className="text-[#867f54]">
                      Published on {formatDateTime(blog.createdOn)}
                    </p>
                  )}
                  {blog.updatedOn && blog.updatedOn !== blog.createdOn && (
                    <p className="text-[#867f54]">
                      Updated on {formatDateTime(blog.updatedOn)}
                    </p>
                  )}
                </div>
              )}

              {blog.image?.url && (
                <div className="relative h-[420px] w-full mb-6 overflow-hidden rounded-sm bg-[#eee9d8]">
                  <Image
                    src={blog.image.url}
                    alt={blog.image.alt || blog.title}
                    fill
                    priority
                    sizes="(min-width: 1024px) 75vw, 100vw"
                    className="object-cover"
                  />
                </div>
              )}

              <HtmlContent content={blog.content} />
              <BlogCommentSection blogId={blog.id} />
            </article>

            {hasRecentBlogs && (
              <aside className="lg:col-span-1">
                <h2 className="text-xl font-semibold mb-4">Recent Blogs</h2>

                <div className="space-y-4">
                  {recentBlogs.map((recentBlog) => (
                    <Link
                      key={recentBlog.slug}
                      href={`/blogs/${recentBlog.slug}/`}
                      className="group block"
                    >
                      <div className="relative h-[120px] w-full overflow-hidden rounded-sm bg-[#eee9d8]">
                        {recentBlog.image?.url && (
                          <Image
                            src={recentBlog.image.url}
                            alt={recentBlog.image.alt || recentBlog.title}
                            fill
                            sizes="(min-width: 1024px) 25vw, 100vw"
                            className="object-cover group-hover:scale-105"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/40 flex items-end p-2">
                          <h3 className="text-white text-sm font-semibold leading-snug">
                            {recentBlog.title}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </aside>
            )}
          </div>
        </div>
      </section>
      <SchemaInjector schemas={safeSchemas} />
    </>
  );
}
