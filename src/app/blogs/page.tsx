// app/blogs/page.tsx

import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false, 
  },
};

export default function BlogsPage() {
  return (
    <div className="min-h-[50vh] py-5 flex flex-col items-center justify-center bg-gray-50 px-4 text-center">

      {/* Message */}
      <p className="text-gray-600 text-lg sm:text-xl mb-8 max-w-md">
        Currently, there are no blogs available. Please check back later for updates!
      </p>

      {/* Go Home Button */}
      <Link
        href="/"
        className="bg-[#b2ac88] hover:bg-[#867f54] text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
}
