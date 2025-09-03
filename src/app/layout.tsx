import type { Metadata } from "next";
import "@/styles/globals.css";
import Header from "@/components/Header";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Lato, Playfair_Display } from "next/font/google";
import { getAllCategories, getFooter } from "@/lib/api";
import { Category, Footer } from "@/types";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400","700","900"],
  variable: "--font-lato",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400","500","700", "900"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Stonecera",
  description: "Stonecera",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allCategories: Category[] = await getAllCategories();
  const footer: Footer = await getFooter();
  console.log(allCategories);
  return (
    <html lang="en">
      <body
        className={`${lato.variable} ${playfair.variable}`}
      >
        <Header allCategories={allCategories} phone={footer.phone_number1} email={footer.email1} />
        <main>{children}</main>
      </body>
    </html>
  );
}
