import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { getCPT, getPosts } from "@/lib/wp";

export const revalidate = 86400; // Cache sitemap for 24 hours to reduce CPU usage

const STATIC_PATHS = [
  "",
  "/profil/sejarah",
  "/profil/visi-misi",
  "/profil/kepala-sekolah",
  "/profil/fasilitas",
  "/profil/kalender",
  "/gtk",
  "/prestasi",
  "/agenda",
  "/pengumuman",
  "/editorial",
  "/ekskul",
  "/galeri",
  "/berita",
  "/kontak",
];

const CPT_ROUTES = [
  { type: "posts" as const, basePath: "berita" },
  { type: "agenda" as const, basePath: "agenda" },
  { type: "pengumuman" as const, basePath: "pengumuman" },
  { type: "editorial" as const, basePath: "editorial" },
  { type: "prestasi" as const, basePath: "prestasi" },
  { type: "ekskul" as const, basePath: "ekskul" },
  { type: "galeri" as const, basePath: "galeri" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://sman-modalbangsa.sch.id";

  const staticUrls: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    STATIC_PATHS.map((path) => ({
      url: `${base}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1.0 : 0.7,
    })),
  );

  // Try to enrich the sitemap with content URLs. If the upstream is offline at
  // build time we just emit the static URLs without failing the build. Use
  // sequential fetches (instead of Promise.all) to avoid hammering the WP host
  // with concurrent requests during the build.
  const contentUrls: MetadataRoute.Sitemap = [];
  for (const { type, basePath } of CPT_ROUTES) {
    try {
      const fetcher =
        type === "posts"
          ? getPosts({ perPage: 50 })
          : getCPT(type, { perPage: 50 });
      const { posts } = await fetcher;
      for (const post of posts) {
        for (const locale of locales) {
          contentUrls.push({
            url: `${base}/${locale}/${basePath}/${post.slug}`,
            lastModified: new Date(post.modified),
            changeFrequency: "monthly" as const,
            priority: 0.6,
          });
        }
      }
    } catch {
      // Best-effort enrichment.
    }
  }

  return [...staticUrls, ...contentUrls];
}
