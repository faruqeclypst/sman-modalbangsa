import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://sman-modalbangsa.sch.id";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          // Path backend WordPress (dilayani lewat proxy, tidak perlu diindeks)
          "/wp-admin/",
          "/wp-login.php",
          "/wp-json/",
          "/wp-content/",
          "/wp-includes/",
          "/xmlrpc.php",
          // Hasil pencarian & filter (menghindari crawl tak terbatas)
          "/id/berita?*",
          "/en/berita?*",
          "/*?s=",
          "/*?p=",
          "/*?page=",
        ],
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
