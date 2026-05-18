import { getCPTById } from "@/lib/wp";
import { HeroSlider } from "@/components/home/hero-slider";

/** ID of the dedicated "Hero Slider" galeri post in WordPress. */
const HERO_SLIDER_POST_ID = 11399;

/**
 * Extract image URLs from a WordPress Gallery block rendered HTML.
 * Handles both classic gallery and block gallery markup.
 */
function extractGalleryImages(html: string): string[] {
  const urls: string[] = [];
  // Match src attributes from <img> tags inside the content
  const imgRegex = /<img[^>]+src="([^"]+)"/g;
  let match: RegExpExecArray | null;
  while ((match = imgRegex.exec(html)) !== null) {
    const url = match[1];
    if (url && !url.includes("gravatar") && !url.includes("favicon")) {
      urls.push(url);
    }
  }
  return urls;
}

/**
 * Async server component that fetches hero slider images from a
 * dedicated WP galeri post (ID 11399). Wrapped in Suspense by the
 * parent so the static bg.png shows immediately while this streams in.
 */
export async function HeroGallery() {
  const post = await getCPTById("galeri", HERO_SLIDER_POST_ID);

  if (!post?.content?.rendered) return null;

  const images = extractGalleryImages(post.content.rendered);

  if (images.length < 2) return null;

  return <HeroSlider images={images} />;
}
