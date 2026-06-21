import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { getPosts, getCPT } from "@/lib/wp";
import { SchoolCommitment } from "@/components/home/school-commitment";
import { HeadmasterSection } from "@/components/home/headmaster-section";
import { StudentStories } from "@/components/home/student-stories";
import { LatestNews } from "@/components/home/latest-news";
import { GalleryPreview } from "@/components/home/gallery-preview";
import { StudentAchievements } from "@/components/home/student-achievements";
import { PjjPromoBanner } from "@/components/home/pjj-promo-banner";
import { SectionOrnament } from "@/components/ui/section-ornament";

interface HomeSectionsProps {
  locale: Locale;
  dict: Dictionary;
}

const BEHOLD_FEED_URL =
  process.env.NEXT_PUBLIC_BEHOLD_FEED_URL ??
  "https://feeds.behold.so/yqI9zrjyjYhovCj2nfNN";

async function getBeholdFeed() {
  try {
    const res = await fetch(BEHOLD_FEED_URL, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/**
 * All data-dependent homepage sections.
 * Wrapped in Suspense by the parent page so the hero renders instantly
 * while this component streams in once WP data is ready.
 */
export async function HomeSections({ locale, dict }: HomeSectionsProps) {
  const [
    { posts: news },
    feed,
    { posts: galleryItems },
  ] = await Promise.all([
    getPosts({ perPage: 6 }),
    getBeholdFeed(),
    getCPT("galeri", { perPage: 6 }),
  ]);

  const instagramPosts = feed?.posts || [];

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Premium Ambient Background Elements */}
      <div className="absolute top-0 left-0 right-0 h-[1000px] bg-gradient-to-b from-white via-[#f7fdfa] to-transparent pointer-events-none -z-20" />

      {/* Soft ambient glow spots that overlap and create high-end depth */}
      <div className="absolute top-[15%] left-[-15%] w-[60vw] h-[60vw] max-w-[800px] rounded-full bg-gradient-to-tr from-emerald-100/40 to-emerald-50/25 blur-[130px] pointer-events-none -z-20" />
      <div className="absolute top-[40%] right-[-15%] w-[55vw] h-[55vw] max-w-[750px] rounded-full bg-gradient-to-br from-emerald-100/50 via-green-150/20 to-transparent blur-[140px] pointer-events-none -z-20" />
      <div className="absolute bottom-[2%] left-[-5%] w-[60vw] h-[60vw] max-w-[800px] rounded-full bg-gradient-to-tr from-emerald-200/50 via-emerald-100/25 to-transparent blur-[150px] pointer-events-none -z-20" />

      {/* Structured vertical lines for architectural layout feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a04_1px,transparent_1px)] bg-[size:120px_100%] pointer-events-none opacity-70 -z-20" />

      {/* Main Gradient base */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f4fbf7]/40 via-[#ebf7ef]/70 via-[#dcf5e4]/90 to-[#caeccf]/90 -z-30 pointer-events-none" />

      <div className="relative z-10">
        <SchoolCommitment dict={dict} locale={locale} />

        <SectionOrnament flip />
        <HeadmasterSection dict={dict} />

        <SectionOrnament />
        <StudentAchievements locale={locale} dict={dict} />

        <SectionOrnament flip />
        <PjjPromoBanner locale={locale} />

        <SectionOrnament />
        {/* <StudentStories locale={locale} />
        <SectionOrnament /> */}

        <LatestNews
          posts={news}
          instagramPosts={instagramPosts}
          locale={locale}
          dict={dict}
        />

        <SectionOrnament />
        <GalleryPreview locale={locale} items={galleryItems} />
      </div>
    </div>
  );
}
