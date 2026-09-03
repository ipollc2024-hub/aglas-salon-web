import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] },
    sitemap: "https://www.aglassalonpr.com/sitemap.xml",
    host: "https://www.aglassalonpr.com",
  };
}
