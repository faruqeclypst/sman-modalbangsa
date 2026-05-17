"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
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
  gtk: WPPost[];
  galeri: WPPost[];
}

export function BentoCommunity({ locale, dict, galeri }: BentoCommunityProps) {
  const items = galeri.filter((p) => getFeaturedImageUrl(p));
  const [offset, setOffset] = React.useState(0);

  // Auto-rotate: shift visible window every 5 seconds
  React.useEffect(() => {
    if (items.length <= 5) return;
    const timer = setInterval(() => {
      setOffset((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [items.length]);

  if (!items.length) return null;

  // Get 5 visible items from circular buffer
  const getItem = (i: number) => items[(offset + i) % items.length];
  const visible = Array.from({ length: Math.min(5, items.length) }, (_, i) => getItem(i));

  return (
    <section aria-label={dict.cpt.galeri.title} className="bg-gray-50 py-14 sm:py-16">
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <Camera className="size-5" />
            </span>
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

        {/* Bento grid — all slots auto-rotate through all gallery items */}
        <div className="mt-8 grid auto-rows-[160px] grid-cols-2 gap-3 lg:auto-rows-[180px] lg:grid-cols-4 lg:gap-4">
          {/* Hero — tall */}
          <div className="relative row-span-2 overflow-hidden rounded-2xl">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={visible[0].id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <Link
                  href={`/${locale}/galeri/${visible[0].id}`}
                  className="group relative block h-full w-full"
                >
                  <Image
                    src={getFeaturedImageUrl(visible[0])!}
                    alt={decodeHtmlEntities(visible[0].title.rendered)}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/5" />
                  <div className="absolute bottom-3 left-3 max-w-[90%] truncate rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
                    {decodeHtmlEntities(visible[0].title.rendered)}
                  </div>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Wide */}
          {visible[1] ? (
            <div className="relative col-span-1 overflow-hidden rounded-2xl lg:col-span-2">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={visible[1].id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="absolute inset-0"
                >
                  <Link
                    href={`/${locale}/galeri/${visible[1].id}`}
                    className="group relative block h-full w-full"
                  >
                    <Image
                      src={getFeaturedImageUrl(visible[1])!}
                      alt={decodeHtmlEntities(visible[1].title.rendered)}
                      fill
                      sizes="(min-width: 1024px) 50vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/5" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          ) : null}

          {/* Small cards (3 slots) */}
          {visible.slice(2, 5).map((post, idx) => (
            <div key={`slot-${idx}`} className="relative overflow-hidden rounded-2xl">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, delay: (idx + 2) * 0.1 }}
                  className="absolute inset-0"
                >
                  <Link
                    href={`/${locale}/galeri/${post.id}`}
                    className="group relative block h-full w-full"
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
                </motion.div>
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Dots */}
        {items.length > 5 ? (
          <div className="mt-4 flex justify-center gap-1.5">
            {items.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === offset % items.length ? "w-5 bg-emerald-500" : "w-1.5 bg-gray-300"
                }`}
              />
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
