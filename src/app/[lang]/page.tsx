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

  // Split into critical (above-fold) and non-critical (below-fold) fetches
  // to reduce waterfall impact on perceived load time
  const [
    { posts: news },
    { posts: pengumuman },
    { berita: disdikBerita },
  ] = await Promise.all([
    getPosts({ perPage: 4 }),
    getCPT("pengumuman", { perPage: 5 }),
    getDisdikBerita({ limit: 5 }),
  ]);

  const [
    { posts: agenda },
    { posts: editorial },
    { posts: prestasi },
    { posts: gtk },
    { posts: galeri },
  ] = await Promise.all([
    getCPT("agenda", { perPage: 4 }),
    getCPT("editorial", { perPage: 4 }),
    getCPT("prestasi", { perPage: 5 }),
    getCPT("gtk", { perPage: 12, orderBy: "title", order: "asc" }),
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
