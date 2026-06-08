import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jobzz.dev";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/adddata", "/api/", "/profile/edit"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
