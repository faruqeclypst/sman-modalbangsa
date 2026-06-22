import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://sman-modalbangsa.sch.id";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: [
          "AhrefsBot",
          "SemrushBot",
          "MJ12bot",
          "DotBot",
          "PetalBot",
          "GPTBot",
          "ClaudeBot",
          "Claude-Web",
          "applebot",
          "CCBot",
        ],
        disallow: ["/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
