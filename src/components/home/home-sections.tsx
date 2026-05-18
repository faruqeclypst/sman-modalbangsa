import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { getCPT, getPosts } from "@/lib/wp";
import { getDisdikBerita } from "@/lib/disdik-aceh";
import { AnnouncementStrip } from "@/components/home/announcement-strip";
import { HeadmasterSection } from "@/components/home/headmaster-section";
import { LatestNews } from "@/components/home/latest-news";
import { BentoInfo } from "@/components/home/bento-info";
import { BentoPrestasi } from "@/components/home/bento-prestasi";
import { BentoGuru } from "@/components/home/bento-guru";
import { BentoCommunity } from "@/components/home/bento-community";
import { SectionOrnament } from "@/components/ui/section-ornament";

interface HomeSectionsProps {
  locale: Locale;
  dict: Dictionary;
}

/**
 * All data-dependent homepage sections.
 * Wrapped in Suspense by the parent page so the hero renders instantly
 * while this component streams in once WP data is ready.
 */
export async function HomeSections({ locale, dict }: HomeSectionsProps) {
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
    getPosts({ perPage: 4 }),
    getCPT("pengumuman", {
      perPage: 5,
      embed: false,
      fields: ["id", "title", "date"],
    }),
    getDisdikBerita({ limit: 5 }),
    getCPT("agenda", { perPage: 4 }),
    getCPT("editorial", {
      perPage: 4,
      embed: false,
      fields: ["id", "title", "date"],
    }),
    getCPT("prestasi", { perPage: 5 }),
    getCPT("gtk", { perPage: 12, orderBy: "title", order: "asc" }),
    getCPT("galeri", { perPage: 12 }),
  ]);

  return (
    <>
      <AnnouncementStrip locale={locale} dict={dict} pengumuman={pengumuman} />
      <HeadmasterSection dict={dict} />
      <SectionOrnament />
      <LatestNews posts={news} disdikBerita={disdikBerita} locale={locale} dict={dict} />
      <SectionOrnament flip />
      <BentoInfo
        locale={locale}
        dict={dict}
        pengumuman={pengumuman}
        agenda={agenda}
        editorial={editorial}
      />
      <SectionOrnament />
      <BentoPrestasi locale={locale} dict={dict} prestasi={prestasi} />
      <SectionOrnament flip />
      <BentoGuru locale={locale} dict={dict} gtk={gtk} />
      <SectionOrnament />
      <BentoCommunity locale={locale} dict={dict} gtk={[]} galeri={[...galeri, ...news, ...prestasi]} />
    </>
  );
}
