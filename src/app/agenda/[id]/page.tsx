import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary } from "@/i18n/dictionaries";
import { getCPTBySlug, getFeaturedImageUrl } from "@/lib/wp";
import {
  decodeHtmlEntities,
  stripHtml,
  truncate,
} from "@/lib/utils";
import { CPTDetail } from "@/components/cpt/cpt-detail";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: PageProps<"/agenda/[id]">): Promise<Metadata> {
  const { id } = await params;
  const lang = "id" as const;
  const post = await getCPTBySlug("agenda", id);
  if (!post) return { title: "Not found" };
  const title = decodeHtmlEntities(post.title.rendered);
  const description = truncate(stripHtml(post.excerpt?.rendered ?? ""), 160);
  const imageUrl = getFeaturedImageUrl(post);
  return {
    title,
    description,
    alternates: { canonical: `/agenda/${post.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
  };
}

export default async function AgendaDetailPage({
  params,
}: PageProps<"/agenda/[id]">) {
  const { id } = await params;
  const lang = "id" as const;
  const dict = await getDictionary(lang);
  const post = await getCPTBySlug("agenda", id);
  if (!post) notFound();

  return (
    <CPTDetail
      post={post}
      locale={lang}
      dict={dict}
      typeLabel={dict.cpt.agenda.label}
      backHref={`/agenda`}
      backLabel={dict.cpt.agenda.viewAll}
    />
  );
}
