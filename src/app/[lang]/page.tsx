import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getCPT, getPosts } from "@/lib/wp";
import { getDisdikBerita } from "@/lib/disdik-aceh";
import { Hero } from "@/components/home/hero";
import { AnnouncementStrip } from "@/components/home/announcement-strip";
import { HeadmasterSection } from "@/components/home/headmaster-section";
import { LatestNews } from "@/components/home/latest-news";
import { BentoInfo } from "@/components/home/bento-info";
import { BentoPrestasi } from "@/components/home/bento-prestasi";
import { BentoGuru } from "@/components/home/bento-guru";
import { BentoCommunity } from "@/components/home/bento-community";
import { InstagramFeed } from "@/components/home/instagram-feed";
import { SectionOrnament } from "@/components/ui/section-ornament";

export const revalidate = 86400; // 24h ISR — on-demand revalidation via /api/revalidate handles freshness

export default async function HomePage({
  params,
}: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  // All fetches run in parallel — single Promise.all for maximum concurrency.
  // Use lightweight options (no _embed, limited _fields) where possible
  // to drastically reduce WP response time and payload size.
  const [
    { posts: news },
    { posts: pengumuman },
    { berita: disdikBerita },
    { posts: agenda },
    { posts: editorial },
    { posts: prestasi },
    { posts: gtk },
    { posts: galeri },
  ] = await Promise.all([
    // News needs full embed for categories + media + excerpt
    getPosts({ perPage: 4 }),
    // Pengumuman strip only shows title — no embed needed
    getCPT("pengumuman", {
      perPage: 5,
      embed: false,
      fields: ["id", "title", "date"],
    }),
    getDisdikBerita({ limit: 5 }),
    // Agenda needs image + excerpt for featured card
    getCPT("agenda", { perPage: 4 }),
    // Editorial sidebar only shows title + date
    getCPT("editorial", {
      perPage: 4,
      embed: false,
      fields: ["id", "title", "date"],
    }),
    // Prestasi needs image for bento cards
    getCPT("prestasi", { perPage: 5 }),
    // GTK needs image + taxonomy terms (jab, stts)
    getCPT("gtk", { perPage: 12, orderBy: "title", order: "asc" }),
    // Galeri only needs image URL for hero slider + community grid
    getCPT("galeri", { perPage: 12 }),
  ]);

  return (
    <>
      <Hero locale={lang} dict={dict} gallery={galeri} />
      <AnnouncementStrip locale={lang} dict={dict} pengumuman={pengumuman} />
      <HeadmasterSection dict={dict} />
      <SectionOrnament />
      <LatestNews posts={news} disdikBerita={disdikBerita} locale={lang} dict={dict} />
      <InstagramFeed />
      <SectionOrnament flip />
      <BentoInfo
        locale={lang}
        dict={dict}
        pengumuman={pengumuman}
        agenda={agenda}
        editorial={editorial}
      />
      <SectionOrnament />
      <BentoPrestasi locale={lang} dict={dict} prestasi={prestasi} />
      <SectionOrnament flip />
      <BentoGuru locale={lang} dict={dict} gtk={gtk} />
      <SectionOrnament />
      <BentoCommunity locale={lang} dict={dict} gtk={[]} galeri={[...galeri, ...news, ...prestasi]} />
    </>
  );
}
