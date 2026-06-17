"use client";

import { useRouter } from "next/navigation";

interface BlogPaginationProps {
  totalPages: number;
  currentPage: number;
}

export default function BlogPagination({
  totalPages,
  currentPage,
}: BlogPaginationProps) {
  const router = useRouter();

  if (totalPages <= 1) return null;

  const handleNavigation = (page: number) => {
    router.push(page === 1 ? "/blogs/" : `/blogs/page/${page}/`);
  };

  return (
    <nav className="flex justify-center my-8 gap-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          type="button"
          className={`px-3 py-1 rounded-sm text-lg font-medium w-[40px] cursor-pointer ${
            page === currentPage
              ? "bg-[#867f54] text-white"
              : "bg-[#f7f3eb] text-[#867f54] hover:bg-[#867f54] hover:text-white"
          }`}
          onClick={() => handleNavigation(page)}
        >
          {page}
        </button>
      ))}
    </nav>
  );
}
