import { notFound, redirect } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getPostBySlug, getCPTBySlug } from "@/lib/wp";

export const revalidate = 3600; // Cache redirect resolution for 1 hour

interface ResolverPageProps {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
}

export default async function SlugResolverPage({ params }: ResolverPageProps) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  // 1. Try to find the slug in standard news Posts
  const post = await getPostBySlug(slug);
  if (post) {
    redirect(`/${lang}/berita/${slug}`);
  }

  // 2. Try to find the slug in other Custom Post Types (Agenda, Prestasi, etc.)
  const cpts = [
    { type: "agenda", path: "agenda" },
    { type: "prestasi", path: "prestasi" },
    { type: "pengumuman", path: "pengumuman" },
    { type: "editorial", path: "editorial" },
    { type: "galeri", path: "galeri" },
    { type: "ekskul", path: "ekskul" },
  ] as const;

  for (const cpt of cpts) {
    const cptPost = await getCPTBySlug(cpt.type, slug);
    if (cptPost) {
      redirect(`/${lang}/${cpt.path}/${slug}`);
    }
  }

  // 3. If no matching post/CPT is found, return a 404 page
  notFound();
}
