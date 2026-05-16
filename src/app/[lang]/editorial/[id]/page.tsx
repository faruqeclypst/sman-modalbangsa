import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getCPTById, getFeaturedImageUrl } from "@/lib/wp";
import { decodeHtmlEntities, stripHtml, truncate } from "@/lib/utils";
import { CPTDetail } from "@/components/cpt/cpt-detail";

export const revalidate = 600;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/editorial/[id]">): Promise<Metadata> {
  const { lang, id } = await params;
  if (!isLocale(lang)) return {};
  const post = await getCPTById("editorial", id);
  if (!post) return { title: "Not found" };
  const title = decodeHtmlEntities(post.title.rendered);
  const description = truncate(stripHtml(post.excerpt?.rendered ?? ""), 160);
  const imageUrl = getFeaturedImageUrl(post);
  return {
    title,
    description,
    alternates: { canonical: `/${lang}/editorial/${id}` },
    openGraph: {
      title,
      description,
      type: "article",
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
  };
}

export default async function EditorialDetailPage({
  params,
}: PageProps<"/[lang]/editorial/[id]">) {
  const { lang, id } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const post = await getCPTById("editorial", id);
  if (!post) notFound();

  return (
    <CPTDetail
      post={post}
      locale={lang}
      dict={dict}
      typeLabel={dict.cpt.editorial.label}
      backHref={`/${lang}/editorial`}
      backLabel={dict.cpt.editorial.title}
    />
  );
}
