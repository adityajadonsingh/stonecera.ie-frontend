import type { Metadata } from "next";
import "@/styles/globals.css";
import "@/styles/responsive.css";
import Header from "@/components/Header";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Lato, Playfair_Display } from "next/font/google";
import { getAllCategories, getFooter } from "@/lib/api";
import { Category, FooterType } from "@/types";
import Footer from "@/components/Footer";
import Script from "next/script";
import GoogleAnalytics from "@/components/GoogleAnalytics";

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
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  authors: [{ name: "stonecera.ie" }],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
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
        {/* <GoogleAnalytics /> */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-M7ZZPJ7D');
          `}
        </Script>
        <Script
          id="tawk-to"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/68c7f2e4e1f9b31922b2b320/1j56gpjn1';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${lato.variable} ${playfair.variable} relative`}
      >
         <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M7ZZPJ7D"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Header allCategories={allCategories} phone={footer.phone_number1} email={footer.email1} />
        <main>{children}</main>
        <Footer allCategories={allCategories} phone={footer.phone_number1} email={footer.email1} address={footer.address} instagram_link={footer.instagram_link} facebook_link={footer.facebook_link} linkedin_link={footer.linkedin_link} twitter_link={footer.twitter_link} pinterest_link={footer.pinterest_link} />
      </body>
    </html>
  );
}
