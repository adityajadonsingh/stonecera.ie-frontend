import type { Metadata } from "next";
import "@/styles/globals.css";
import Header from "@/components/Header";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Lato, Playfair_Display } from "next/font/google";
import { getAllCategories, getFooter } from "@/lib/api";
import { Category, FooterType } from "@/types";
import Footer from "@/components/Footer";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-lato",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Stonecera",
  description: "Stonecera",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allCategories: Category[] = await getAllCategories();
  const footer: FooterType = await getFooter();
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body
        className={`${lato.variable} ${playfair.variable} relative`}
      >
        <Header allCategories={allCategories} phone={footer.phone_number1} email={footer.email1} />
        <main>{children}</main>
        <Footer allCategories={allCategories} phone={footer.phone_number1} email={footer.email1} address={footer.address} instagram_link={footer.instagram_link} facebook_link={footer.facebook_link} linkedin_link={footer.linkedin_link} twitter_link={footer.twitter_link} pinterest_link={footer.pinterest_link} />
      </body>
    </html>
  );
}
