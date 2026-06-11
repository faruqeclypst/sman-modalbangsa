"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { animate, stagger } from "animejs";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { WPPost } from "@/lib/wp-types";
import { getThumbnailUrl } from "@/lib/wp";
import { decodeHtmlEntities } from "@/lib/utils";
import { Container } from "@/components/ui/container";

interface BentoCommunityProps {
  locale: Locale;
  dict: Dictionary;
  gtk: WPPost[];
  galeri: WPPost[];
}

export function BentoCommunity({ locale, dict, galeri }: BentoCommunityProps) {
  const items = galeri.filter((p) => getThumbnailUrl(p));
  const numSlots = Math.min(6, items.length);
  const sectionRef = React.useRef<HTMLElement>(null);
  
  // Initialize slots with first N indices
  const [slots, setSlots] = React.useState<number[]>(() =>
    Array.from({ length: numSlots }, (_, i) => i)
  );

  // Rotate one slot at a time every 3 seconds
  React.useEffect(() => {
    if (items.length <= numSlots) return;
    let currentSlot = 0;

    const timer = setInterval(() => {
      setSlots((prev) => {
        const next = [...prev];
        let newIdx: number;
        let attempts = 0;
        do {
          newIdx = Math.floor(Math.random() * items.length);
          attempts++;
        } while (prev.includes(newIdx) && attempts < 20);
        
        next[currentSlot] = newIdx;
        currentSlot = (currentSlot + 1) % numSlots;
        return next;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [items.length, numSlots]);

  // Scroll-triggered entrance
  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const targets = el.querySelectorAll("[data-animate-galeri]");
    if (!targets.length) return;

    targets.forEach((t) => {
      (t as HTMLElement).style.opacity = "0";
      (t as HTMLElement).style.transform = "scale(0.9)";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(targets, {
              opacity: [0, 1],
              scale: [0.9, 1],
              delay: stagger(100, { start: 0 }),
              duration: 650,
              ease: "outQuint",
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (items.length < 3) return null;

  const visible = slots.map((idx) => items[idx % items.length]).filter(Boolean);
  if (visible.length < 3) return null;

  return (
    <section ref={sectionRef} id="galeri" aria-label={dict.cpt.galeri.title} className="bg-[color:var(--background)] py-14 sm:py-16">
      <Container>
        <div data-animate-galeri>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            <Link
              href={`/${locale}/galeri`}
              className="hover:text-[color:var(--primary)] transition-colors"
            >
              {dict.cpt.galeri.title}
            </Link>
          </h2>
        </div>

        {/* Bento grid — all slots auto-rotate through all gallery items */}
        <div data-animate-galeri className="mt-8 grid auto-rows-[140px] grid-cols-2 gap-3 sm:auto-rows-[160px] lg:auto-rows-[180px] lg:grid-cols-4 lg:gap-4">
          {/* Hero — tall on desktop, normal on mobile */}
          <div className="relative row-span-1 overflow-hidden rounded-2xl sm:row-span-2">
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
                    src={getThumbnailUrl(visible[0])!}
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
                      src={getThumbnailUrl(visible[1])!}
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

          {/* Small cards (fill remaining slots) */}
          {visible.slice(2).map((post, idx) => {
            const imgUrl = getThumbnailUrl(post);
            return (
              <div key={`slot-${idx}`} className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100">
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
                      href={`/${locale}/galeri/${post.slug}`}
                      className="group relative block h-full w-full"
                    >
                      {imgUrl ? (
                        <Image
                          src={imgUrl}
                          alt={decodeHtmlEntities(post.title.rendered)}
                          fill
                          sizes="(min-width: 1024px) 25vw, 50vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : null}
                      {/* Placeholder overlay - always visible as fallback */}
                      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-3 transition-colors group-hover:from-black/40">
                        <p className="line-clamp-2 text-[10px] font-semibold text-white">
                          {decodeHtmlEntities(post.title.rendered)}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* No dots needed - continuous random rotation */}
      </Container>
    </section>
  );
}
