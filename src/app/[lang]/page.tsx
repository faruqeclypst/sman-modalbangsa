import { Suspense } from "react";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Hero } from "@/components/home/hero";
import { HeroGallery } from "@/components/home/hero-gallery";
import { InstagramFeed } from "@/components/home/instagram-feed";
import { HomeSections } from "@/components/home/home-sections";
import { HomeSectionsSkeleton } from "@/components/home/home-sections-skeleton";

export const revalidate = 86400; // 24h ISR — on-demand revalidation via /api/revalidate handles freshness

export default async function HomePage({
  params,
}: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <>
      {/* Hero renders instantly with static bg.png */}
      {/* Gallery slider streams in when WP responds */}
      <Hero locale={lang} dict={dict}>
        <Suspense fallback={null}>
          <HeroGallery />
        </Suspense>
      </Hero>

      {/* Content sections stream in with skeleton fallback */}
      <Suspense fallback={<HomeSectionsSkeleton />}>
        <HomeSections locale={lang} dict={dict} />
      </Suspense>

      <InstagramFeed />
    </>
  );
}
