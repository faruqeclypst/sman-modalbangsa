"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { animate, stagger } from "animejs";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { WPPost } from "@/lib/wp-types";
import { getFeaturedImageUrl } from "@/lib/wp";
import { decodeHtmlEntities, formatDate } from "@/lib/utils";
import { Container } from "@/components/ui/container";

interface BentoPrestasiProps {
  locale: Locale;
  dict: Dictionary;
  prestasi: WPPost[];
}

export function BentoPrestasi({ locale, dict, prestasi }: BentoPrestasiProps) {
  const [active, setActive] = React.useState(0);
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (prestasi.length <= 1) return;
    const t = setInterval(() => setActive((p) => (p + 1) % prestasi.length), 5000);
    return () => clearInterval(t);
  }, [prestasi.length]);

  // Scroll-triggered entrance animation
  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const targets = el.querySelectorAll("[data-animate]");
    if (!targets.length) return;

    targets.forEach((t) => {
      (t as HTMLElement).style.opacity = "0";
      (t as HTMLElement).style.transform = "scale(0.92) translateY(24px)";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(targets, {
              opacity: [0, 1],
              scale: [0.92, 1],
              translateY: [24, 0],
              delay: stagger(80, { start: 100 }),
              duration: 600,
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

  if (!prestasi.length) return null;

  // Split: featured (rotating) + side list
  const featured = prestasi[active];
  const featuredImage = getFeaturedImageUrl(featured);
  const featuredTitle = decodeHtmlEntities(featured.title.rendered);

  return (
    <section ref={sectionRef} id="prestasi" aria-label={dict.cpt.prestasi.title} className="bg-[color:var(--background)] py-14 sm:py-16">
      <Container>
        <div data-animate>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            <Link
              href={`/${locale}/prestasi`}
              className="hover:text-[color:var(--primary)] transition-colors"
            >
              {dict.cpt.prestasi.title}
            </Link>
          </h2>
        </div>

        {/*
          Bento: [Featured 2×2] [item] [item]
                                [item] [item]
        */}
        <div className="mt-8 grid auto-rows-[160px] grid-cols-2 gap-3 lg:auto-rows-[180px] lg:grid-cols-4 lg:gap-4">
          {/* Featured — large rotating card */}
          <div data-animate className="relative col-span-2 row-span-2 overflow-hidden rounded-2xl bg-gray-900">
            {featuredImage ? (
              <Image
                src={featuredImage}
                alt={featuredTitle}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-opacity duration-700"
              />
            ) : null}
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative flex h-full flex-col justify-end p-6">
              <p className="line-clamp-3 text-lg font-bold leading-snug text-white sm:text-xl">
                {featuredTitle}
              </p>
              <p className="mt-2 text-xs text-white/70">
                {formatDate(featured.date, locale)}
              </p>
              {/* Dots */}
              <div className="mt-3 flex gap-1.5">
                {prestasi.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Prestasi ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${i === active ? "w-6 bg-emerald-400" : "w-2 bg-white/40"}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Side items — 4 smaller cards */}
          {prestasi.slice(0, 4).map((post) => {
            const img = getFeaturedImageUrl(post);
            const title = decodeHtmlEntities(post.title.rendered);
            return (
              <Link
                key={post.id}
                href={`/${locale}/prestasi/${post.slug}`}
                data-animate
                className="group relative overflow-hidden rounded-2xl bg-gray-100"
              >
                {img ? (
                  <Image
                    src={img}
                    alt={title}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : null}
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative flex h-full flex-col justify-end p-4 text-white">
                  <p className="line-clamp-2 text-xs font-semibold leading-snug sm:text-sm">
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
