import { getCPT, getFeaturedImageUrl } from "@/lib/wp";
import { HeroSlider } from "@/components/home/hero-slider";

/**
 * Async server component that fetches gallery images from WP
 * and renders the HeroSlider. Wrapped in Suspense by the parent
 * so the static bg.png shows immediately while this streams in.
 */
export async function HeroGallery() {
  const { posts: galeri } = await getCPT("galeri", { perPage: 8 });

  const images = galeri
    .map((post) => getFeaturedImageUrl(post))
    .filter((url): url is string => Boolean(url));

  if (images.length < 2) return null;

  return <HeroSlider images={images} />;
}
