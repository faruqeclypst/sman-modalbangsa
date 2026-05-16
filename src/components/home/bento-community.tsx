import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { WPPost } from "@/lib/wp-types";
import { getFeaturedImageUrl } from "@/lib/wp";
import { decodeHtmlEntities } from "@/lib/utils";
import { Container } from "@/components/ui/container";

interface BentoCommunityProps {
  locale: Locale;
  dict: Dictionary;
  gtk: WPPost[]; // kept for interface compat but unused now
  galeri: WPPost[];
}

export function BentoCommunity({ locale, dict, galeri }: BentoCommunityProps) {
  const items = galeri.filter((p) => getFeaturedImageUrl(p));
  if (!items.length) return null;

  return (
    <section aria-label={dict.cpt.galeri.title} className="bg-gray-50 py-14 sm:py-16">
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="size-5 text-emerald-600" />
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              {dict.cpt.galeri.title}
            </h2>
          </div>
          <Link
            href={`/${locale}/galeri`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:underline"
          >
            Lihat Semua
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/*
          Bento galeri — asymmetric masonry-like:
          [hero tall 1×2] [wide 2×1] [small]
                          [small]    [small]
        */}
        <div className="mt-8 grid auto-rows-[160px] grid-cols-2 gap-3 lg:auto-rows-[180px] lg:grid-cols-4 lg:gap-4">
          {/* Hero — tall */}
          {items[0] ? (
            <Link
              href={`/${locale}/galeri/${items[0].id}`}
              className="group relative row-span-2 overflow-hidden rounded-2xl"
            >
              <Image
                src={getFeaturedImageUrl(items[0])!}
                alt={decodeHtmlEntities(items[0].title.rendered)}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/5" />
              <div className="absolute bottom-3 left-3 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
                {decodeHtmlEntities(items[0].title.rendered)}
              </div>
            </Link>
          ) : null}

          {/* Wide */}
          {items[1] ? (
            <Link
              href={`/${locale}/galeri/${items[1].id}`}
              className="group relative col-span-1 overflow-hidden rounded-2xl lg:col-span-2"
            >
              <Image
                src={getFeaturedImageUrl(items[1])!}
                alt={decodeHtmlEntities(items[1].title.rendered)}
                fill
                sizes="(min-width: 1024px) 50vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/5" />
            </Link>
          ) : null}

          {/* Small cards */}
          {items.slice(2, 5).map((post) => (
            <Link
              key={post.id}
              href={`/${locale}/galeri/${post.id}`}
              className="group relative overflow-hidden rounded-2xl"
            >
              <Image
                src={getFeaturedImageUrl(post)!}
                alt={decodeHtmlEntities(post.title.rendered)}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/5" />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
