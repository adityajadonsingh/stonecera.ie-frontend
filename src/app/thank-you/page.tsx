// app/thank-you/page.tsx

import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false, 
  },
};

export default function ThankYou() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] py-6 bg-gray-50 px-4 text-center">
      {/* Big Thank You */}
      <h1 className="text-6xl sm:text-7xl font-extrabold text-gray-800 mb-6 animate-pulse">
        Thank You!
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 text-lg sm:text-xl mb-8 max-w-md">
        Your submission has been received successfully. We appreciate you taking the time to reach out to us.
      </p>

      {/* Go Home Button */}
      <Link
        href="/"
        className="bg-[#b2ac88] text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-[#867f54] transition duration-300"
      >
        Go Back Home
      </Link>

      {/* Optional small note */}
      <p className="text-gray-500 text-sm mt-6 opacity-80">
        We will get back to you shortly!
      </p>
    </div>
  );
}
