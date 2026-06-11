import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { WPPost } from "@/lib/wp-types";
import { getFeaturedImage, getThumbnailUrl } from "@/lib/wp";
import { decodeHtmlEntities } from "@/lib/utils";
import { Container } from "@/components/ui/container";

interface GalleryPreviewProps {
  locale: Locale;
  dict: Dictionary;
  items: WPPost[];
}

export function GalleryPreview({ locale, dict, items }: GalleryPreviewProps) {
  // Only render galleries that have a featured image; otherwise the strip is mostly empty.
  const withImages = items.filter((p) => getThumbnailUrl(p));
  if (!withImages.length) return null;

  return (
    <section
      aria-labelledby="gallery-preview-title"
      className="bg-[color:var(--background)] py-14 sm:py-16"
    >
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[color:var(--accent)]/30 bg-[color:var(--accent)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[color:var(--accent)]">
              <Camera className="size-3.5" aria-hidden />
              {dict.cpt.galeri.label}
            </p>
            <h2
              id="gallery-preview-title"
              className="mt-3 text-2xl font-bold tracking-tight text-[color:var(--foreground)] sm:text-3xl"
            >
              {dict.cpt.galeri.title}
            </h2>
            <p className="mt-2 max-w-2xl text-[color:var(--muted-foreground)]">
              {dict.cpt.galeri.subtitle}
            </p>
          </div>
          <Link
            href={`/${locale}/galeri`}
            className="inline-flex items-center gap-1.5 self-start rounded-full border border-[color:var(--border)] bg-white px-4 py-2 text-sm font-medium text-[color:var(--primary)] hover:bg-[color:var(--primary)] hover:text-white sm:self-auto"
          >
            {dict.cpt.galeri.title}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {withImages.slice(0, 6).map((post, idx) => {
            const title = decodeHtmlEntities(post.title.rendered);
            const media = getFeaturedImage(post);
            const imageUrl = getThumbnailUrl(post);
            return (
              <Link
                key={post.id}
                href={`/${locale}/galeri/${post.slug}`}
                className={`group relative aspect-square overflow-hidden rounded-xl bg-[color:var(--muted)] shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md ${
                  idx === 0 ? "col-span-2 row-span-2 lg:col-span-2 lg:row-span-2 lg:aspect-auto" : ""
                }`}
              >
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={media?.alt_text || title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : null}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3">
                  <p className="line-clamp-2 text-xs font-semibold text-white sm:text-sm">
                    {title}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
