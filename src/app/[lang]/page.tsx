import { Suspense } from "react";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Hero } from "@/components/home/hero";
import { IntroTransition } from "@/components/home/intro-transition";
import { HomeSections } from "@/components/home/home-sections";
import { HomeSectionsSkeleton } from "@/components/home/home-sections-skeleton";
import { SectionOrnament } from "@/components/ui/section-ornament";

export const revalidate = 3600; // 1h ISR

export default async function HomePage({
  params,
}: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <>
      {/* Hero renders instantly with video bg.mp4 */}
      <Hero locale={lang} dict={dict} />

      {/* GSAP Scroll-scrubbing text reveal transition section */}
      <IntroTransition locale={lang} />

      {/* Content sections stream in with skeleton fallback */}
      <Suspense fallback={<HomeSectionsSkeleton />}>
        <HomeSections locale={lang} dict={dict} />
      </Suspense>
    </>
  );
}

