// components/GoogleAnalytics.tsx
import Script from "next/script";

export default function GoogleAnalytics() {
  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-QC47YYY54P"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-QC47YYY54P');
        `}
      </Script>
    </>
  );
}
