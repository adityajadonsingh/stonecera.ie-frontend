import { Metadata } from "next";
import { redirect } from "next/navigation";
import BlogGrid from "@/components/BlogGrid";
import BlogPagination from "@/components/BlogPagination";
import PageBanner from "@/components/PageBanner";
import { getBlogs } from "@/lib/api";

export const metadata: Metadata = {
  title: "Blogs | Stonecera",
  description: "Read the latest insights and guides from Stonecera.",
  alternates: {
    canonical: "https://stonecera.ie/blogs/",
  },
  robots: "index, follow",
};

export default async function BlogsPaginatedPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const pageNum = parseInt(page, 10);

  if (!pageNum || pageNum === 1) {
    redirect("/blogs/");
  }

  const { data: blogs, meta } = await getBlogs({ page: pageNum, limit: 12 });
  const bread = [
    {
      slugName: "Blogs",
      slug: "/blogs/",
    },
    {
      slugName: `Page ${pageNum}`,
      slug: "",
    },
  ];

  return (
    <>
      <PageBanner
        bgImg="/media/products-banner.webp"
        bgImgAlt="Blogs"
        pageName="Blogs"
        breadcrum={bread}
        categoryContent={null}
      />

      <section className="blogs py-10">
        <div className="container">
          <BlogGrid blogs={blogs} />
          <BlogPagination totalPages={meta.pageCount} currentPage={pageNum} />
        </div>
      </section>
    </>
  );
}
