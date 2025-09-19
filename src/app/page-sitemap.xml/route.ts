// app/static-sitemap.xml/route.js
import { NextResponse } from "next/server";

const siteUrl = "https://stonecera.ie";

export async function GET() {
  const staticPages = [
    "/",
    "/about-us/",
    "/contact-us/",
    "/products/",
    "/product-category/",
    "/brochures/",
    "/privacy-policy/",
    "/terms-and-conditions/",
  ];

  const urls = staticPages.map((path) => {
    return `<url>
  <loc>${siteUrl}${path}</loc>
  <lastmod>${new Date().toISOString()}</lastmod>
  <priority>1.00</priority>
</url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/url-sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
