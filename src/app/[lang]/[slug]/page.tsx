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

  // Early return for common scanner bot / file paths to save Vercel CPU execution time
  if (
    slug.includes(".") ||
    slug.includes("wp-") ||
    slug.includes("admin") ||
    slug.includes("xmlrpc")
  ) {
    notFound();
  }

  const cpts = [
    { type: "agenda", path: "agenda" },
    { type: "prestasi", path: "prestasi" },
    { type: "pengumuman", path: "pengumuman" },
    { type: "editorial", path: "editorial" },
    { type: "galeri", path: "galeri" },
    { type: "ekskul", path: "ekskul" },
  ] as const;

  // Query all endpoints in parallel to reduce sequential API overhead
  const [post, ...cptResults] = await Promise.all([
    getPostBySlug(slug),
    ...cpts.map((cpt) => getCPTBySlug(cpt.type, slug)),
  ]);

  if (post) {
    redirect(`/${lang}/berita/${slug}`);
  }

  for (let i = 0; i < cpts.length; i++) {
    if (cptResults[i]) {
      redirect(`/${lang}/${cpts[i].path}/${slug}`);
    }
  }

  // 3. If no matching post/CPT is found, return a 404 page
  notFound();
}
