import Image from "next/image";
import type { WPPost } from "@/lib/wp-types";
import { getFeaturedImage, getFeaturedImageUrl } from "@/lib/wp";
import { decodeHtmlEntities, stripHtml, truncate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface GTKCardProps {
  post: WPPost;
  /** Translated label for the role (jabatan) term. */
  jabatanLabel?: string;
  /** Translated label for the status (PNS/Honorer) term. */
  statusLabel?: string;
}

export function GTKCard({ post, jabatanLabel, statusLabel }: GTKCardProps) {
  const name = decodeHtmlEntities(post.title.rendered);
  const description = truncate(stripHtml(post.excerpt?.rendered ?? ""), 110);
  const media = getFeaturedImage(post);
  const imageUrl = getFeaturedImageUrl(post);

  return (
    <article className="group flex h-full flex-col items-center overflow-hidden rounded-xl border border-white/30 bg-white/60 p-5 text-center shadow-sm backdrop-blur-md transition-all hover:-translate-y-1 hover:border-white/50 hover:bg-white/80 hover:shadow-lg">
      <div className="relative mx-auto size-28 overflow-hidden rounded-full bg-[color:var(--muted)] ring-4 ring-[color:var(--primary)]/10">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={media?.alt_text || name}
            fill
            sizes="112px"
            className="object-cover"
          />
        ) : (
          <div
            aria-hidden
            className="flex h-full w-full items-center justify-center text-3xl font-bold text-[color:var(--primary)]/40"
          >
            {name
              .split(" ")
              .filter(Boolean)
              .slice(0, 2)
              .map((p) => p[0])
              .join("")
              .toUpperCase() || "?"}
          </div>
        )}
      </div>
      <h3 className="mt-4 text-base font-semibold leading-tight text-[color:var(--foreground)]">
        {name}
      </h3>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5">
        {jabatanLabel ? <Badge variant="primary">{jabatanLabel}</Badge> : null}
        {statusLabel ? <Badge variant="muted">{statusLabel}</Badge> : null}
      </div>
      {description ? (
        <p className="mt-3 line-clamp-3 text-xs text-[color:var(--muted-foreground)]">
          {description}
        </p>
      ) : null}
    </article>
  );
}
