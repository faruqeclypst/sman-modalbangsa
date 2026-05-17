import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getCPT, getPosts } from "@/lib/wp";
import { Hero } from "@/components/home/hero";
import { HeadmasterSection } from "@/components/home/headmaster-section";
import { LatestNews } from "@/components/home/latest-news";
import { BentoInfo } from "@/components/home/bento-info";
import { BentoPrestasi } from "@/components/home/bento-prestasi";
import { BentoGuru } from "@/components/home/bento-guru";
import { BentoCommunity } from "@/components/home/bento-community";

export const revalidate = 3600;

export default async function HomePage({
  params,
}: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  const [
    { posts: news },
    { posts: pengumuman },
    { posts: agenda },
    { posts: editorial },
    { posts: prestasi },
    { posts: gtk },
    { posts: galeri },
  ] = await Promise.all([
    getPosts({ perPage: 8 }),
    getCPT("pengumuman", { perPage: 5 }),
    getCPT("agenda", { perPage: 4 }),
    getCPT("editorial", { perPage: 4 }),
    getCPT("prestasi", { perPage: 5 }),
    getCPT("gtk", { perPage: 20, orderBy: "title", order: "asc" }),
    getCPT("galeri", { perPage: 6 }),
  ]);

  return (
    <>
      <Hero locale={lang} dict={dict} gallery={galeri} />
      <HeadmasterSection dict={dict} />
      <LatestNews posts={news} locale={lang} dict={dict} />
      <BentoInfo
        locale={lang}
        dict={dict}
        pengumuman={pengumuman}
        agenda={agenda}
        editorial={editorial}
      />
      <BentoPrestasi locale={lang} dict={dict} prestasi={prestasi} />
      <BentoGuru locale={lang} dict={dict} gtk={gtk} />
      <BentoCommunity locale={lang} dict={dict} gtk={[]} galeri={galeri} />
    </>
  );
}
