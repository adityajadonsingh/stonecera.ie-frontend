// app/not-found.tsx

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] py-6 bg-gray-50 px-4 text-center">
      <h1 className="text-9xl font-extrabold text-gray-300 mb-4">404</h1>
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-500 mb-6 max-w-md">
        The page you are looking for does not exist or has been moved.
        Try using the button below to go back to the homepage.
      </p>
      <Link
        href="/"
        className="inline-block bg-[#b2ac88] hover:bg-[#867f54] text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
}
