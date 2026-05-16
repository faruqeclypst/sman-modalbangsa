import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getCPT, getPosts } from "@/lib/wp";
import { Hero } from "@/components/home/hero";
import { InfoStrip } from "@/components/home/info-strip";
import { StudentAchievements } from "@/components/home/student-achievements";
import { LatestNews } from "@/components/home/latest-news";
import { TeamPreview } from "@/components/home/team-preview";
import { GalleryPreview } from "@/components/home/gallery-preview";

export const revalidate = 3600; // 1 hour ISR

export default async function HomePage({
  params,
}: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  // Fan out all CPT requests in parallel — they share an upstream cache.
  const [
    { posts: news },
    { posts: pengumuman },
    { posts: agenda },
    { posts: editorial },
    { posts: gtk },
    { posts: galeri },
  ] = await Promise.all([
    getPosts({ perPage: 8 }),
    getCPT("pengumuman", { perPage: 4 }),
    getCPT("agenda", { perPage: 4 }),
    getCPT("editorial", { perPage: 4 }),
    getCPT("gtk", { perPage: 4, orderBy: "title", order: "asc" }),
    getCPT("galeri", { perPage: 6 }),
  ]);

  return (
    <>
      <Hero locale={lang} dict={dict} gallery={galeri} />
      <LatestNews posts={news} locale={lang} dict={dict} />
      <InfoStrip
        locale={lang}
        dict={dict}
        pengumuman={pengumuman}
        agenda={agenda}
        editorial={editorial}
      />
      <StudentAchievements locale={lang} dict={dict} />
      <TeamPreview locale={lang} dict={dict} members={gtk} />
      <GalleryPreview locale={lang} dict={dict} items={galeri} />
    </>
  );
}
