import { notFound, redirect } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getPostBySlug, getCPTBySlug } from "@/lib/wp";

export const revalidate = 3600; // Cache redirect resolution for 1 hour
export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}

interface ResolverPageProps {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
}

export default async function SlugResolverPage({ params }: ResolverPageProps) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  // Early return for common scanner bot / asset / system paths to eliminate WP API calls
  if (
    slug.includes(".") ||
    slug.includes("wp-") ||
    slug.includes("admin") ||
    slug.includes("xmlrpc") ||
    slug.includes("php") ||
    slug.includes("api") ||
    slug.includes("vendor") ||
    slug.includes("well-known") ||
    slug.includes("autodiscover") ||
    slug.includes("feed") ||
    slug.includes("sitemap")
  ) {
    notFound();
  }

  // 1. Check regular posts first with minimal fields (most permalinks are news/berita)
  const post = await getPostBySlug(slug, { embed: false, fields: ["id", "slug"] });
  if (post) {
    redirect(`/${lang}/berita/${slug}`);
  }

  // 2. Only if not a post, check custom post types in parallel with minimal fields
  const cpts = [
    { type: "agenda", path: "agenda" },
    { type: "prestasi", path: "prestasi" },
    { type: "pengumuman", path: "pengumuman" },
    { type: "editorial", path: "editorial" },
    { type: "galeri", path: "galeri" },
    { type: "ekskul", path: "ekskul" },
  ] as const;

  const cptResults = await Promise.all(
    cpts.map((cpt) => getCPTBySlug(cpt.type, slug, { embed: false, fields: ["id", "slug"] }))
  );

  for (let i = 0; i < cpts.length; i++) {
    if (cptResults[i]) {
      redirect(`/${lang}/${cpts[i].path}/${slug}`);
    }
  }

  // 3. If no matching post/CPT is found, return a 404 page
  notFound();
}
