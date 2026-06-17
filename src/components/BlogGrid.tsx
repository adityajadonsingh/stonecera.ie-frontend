import Image from "next/image";
import Link from "next/link";
import { Blog } from "@/types";

interface BlogGridProps {
  blogs: Blog[];
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export default function BlogGrid({ blogs }: BlogGridProps) {
  if (!blogs.length) {
    return (
      <div className="min-h-[35vh] flex flex-col items-center justify-center px-4 text-center">
        <p className="text-gray-600 text-lg sm:text-xl mb-8 max-w-md">
          Currently, there are no blogs available. Please check back later for
          updates!
        </p>
        <Link
          href="/"
          className="bg-[#b2ac88] hover:bg-[#867f54] text-white font-semibold py-3 px-6 rounded-sm"
        >
          Go Back Home
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {blogs.map((blog) => (
        <Link className="group" key={blog.id} href={`/blogs/${blog.slug}/`}>
          <div className="p-4 h-full shadow-sm group-hover:shadow-lg bg-[#f6f6f2] rounded-sm">
            <div className="relative overflow-hidden rounded-sm h-[250px] w-full bg-[#eee9d8]">
              {blog.createdOn && (
                <div className="absolute items-center rounded-sm py-1 px-2 bg-[#867f54] text-white flex gap-x-1 z-10 top-1 left-1">
                  <span className="capitalize text-sm">
                    {formatDate(blog.updatedOn || blog.createdOn)}
                  </span>
                </div>
              )}

              {blog.image?.url && (
                <Image
                  src={blog.image.url}
                  alt={blog.image.alt || blog.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover rounded-sm group-hover:scale-105"
                />
              )}
            </div>

            <div className="flex flex-col justify-between h-[calc(100%-250px)]">
              <div>
                <h3 className="text-lg capitalize font-semibold text-[#867f54] my-3">
                  {blog.title}
                </h3>
                <p className="text-sm line-clamp-2">
                  {blog.shortDescription}
                </p>
              </div>

              <span className="btnType-1 w-fit cursor-pointer py-1 px-3 mt-3 text-sm rounded-sm">
                Read More
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
