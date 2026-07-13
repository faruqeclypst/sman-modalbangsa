import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getCPTBySlug, getFeaturedImageUrl } from "@/lib/wp";
import { decodeHtmlEntities, stripHtml, truncate } from "@/lib/utils";
import { CPTDetail } from "@/components/cpt/cpt-detail";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/galeri/[id]">): Promise<Metadata> {
  const { lang, id } = await params;
  if (!isLocale(lang)) return {};
  const post = await getCPTBySlug("galeri", id);
  if (!post) return { title: "Not found" };
  const title = decodeHtmlEntities(post.title.rendered);
  const description = truncate(stripHtml(post.excerpt?.rendered ?? ""), 160);
  const imageUrl = getFeaturedImageUrl(post);
  return {
    title,
    description,
    alternates: { canonical: `/${lang}/galeri/${post.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
  };
}

export default async function GaleriDetailPage({
  params,
}: PageProps<"/[lang]/galeri/[id]">) {
  const { lang, id } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const post = await getCPTBySlug("galeri", id);
  if (!post) notFound();

  return (
    <CPTDetail
      post={post}
      locale={lang}
      dict={dict}
      typeLabel={dict.cpt.galeri.label}
      backHref={`/${lang}/galeri`}
      backLabel={dict.cpt.galeri.title}
    />
  );
}
