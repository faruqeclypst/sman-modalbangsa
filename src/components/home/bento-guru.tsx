"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { LayoutGroup, motion } from "framer-motion";
import { animate, stagger } from "animejs";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { WPPost } from "@/lib/wp-types";
import { getFeaturedImageUrl, getTermsByTaxonomy } from "@/lib/wp";
import { decodeHtmlEntities } from "@/lib/utils";
import { Container } from "@/components/ui/container";

interface BentoGuruProps {
  locale: Locale;
  dict: Dictionary;
  gtk: WPPost[];
}

function GuruCard({ person, size }: { person: WPPost; size: "large" | "small" }) {
  const name = decodeHtmlEntities(person.title.rendered);
  const imageUrl = getFeaturedImageUrl(person);
  const jab = getTermsByTaxonomy(person, "jab")[0];
  const stts = getTermsByTaxonomy(person, "stts")[0];
  const initials = name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[inherit]">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes={size === "large" ? "(min-width: 1024px) 33vw, 100vw" : "(min-width: 1024px) 16vw, 25vw"}
          className="object-cover object-top"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-200">
          <div className={`flex items-center justify-center rounded-full bg-white/80 ${size === "large" ? "size-20" : "size-12"}`}>
            <span className={`font-bold text-emerald-500 ${size === "large" ? "text-3xl" : "text-lg"}`}>
              {initials}
            </span>
          </div>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className={`absolute inset-x-0 bottom-0 p-3 text-white ${size === "large" ? "p-5" : ""}`}>
        <p className={`font-bold leading-tight ${size === "large" ? "text-base sm:text-lg" : "text-[11px] sm:text-xs"}`}>
          {name}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-1">
          {jab ? (
            <span className={`inline-flex items-center rounded-full bg-emerald-500/80 font-semibold text-white ${size === "large" ? "px-2.5 py-0.5 text-[10px]" : "px-1.5 py-0.5 text-[8px]"}`}>
              {decodeHtmlEntities(jab.name)}
            </span>
          ) : null}
          {stts ? (
            <span className={`inline-flex items-center rounded-full bg-white/20 font-medium text-white backdrop-blur-sm ${size === "large" ? "px-2.5 py-0.5 text-[10px]" : "px-1.5 py-0.5 text-[8px]"}`}>
              {decodeHtmlEntities(stts.name)}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function MobileGuruScroll({ gtk }: { gtk: WPPost[] }) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el || gtk.length <= 2) return;

    let pos = 0;
    const cardWidth = 162; // 150px + 12px gap

    const timer = setInterval(() => {
      pos += 1;
      if (pos >= gtk.slice(0, 10).length - 1) pos = 0;
      el.scrollTo({ left: pos * cardWidth, behavior: "smooth" });
    }, 3000);

    return () => clearInterval(timer);
  }, [gtk]);

  return (
    <div
      ref={scrollRef}
      className="mt-6 flex gap-3 overflow-x-auto pb-4 sm:hidden"
      style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
    >
      {gtk.slice(0, 10).map((person) => (
        <div
          key={person.id}
          className="relative h-[200px] w-[150px] flex-shrink-0 overflow-hidden rounded-xl shadow-md"
          style={{ scrollSnapAlign: "start" }}
        >
          <GuruCard person={person} size="small" />
        </div>
      ))}
    </div>
  );
}

export function BentoGuru({ locale, dict, gtk }: BentoGuruProps) {
  const [step, setStep] = React.useState(0);
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (gtk.length <= 7) return;
    const timer = setInterval(() => {
      setStep((prev) => prev + 1);
    }, 3500);
    return () => clearInterval(timer);
  }, [gtk.length]);

  // Scroll-triggered entrance
  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const targets = el.querySelectorAll("[data-animate-guru]");
    if (!targets.length) return;

    targets.forEach((t) => {
      (t as HTMLElement).style.opacity = "0";
      (t as HTMLElement).style.transform = "translateY(40px)";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(targets, {
              opacity: [0, 1],
              translateY: [40, 0],
              delay: stagger(120, { start: 0 }),
              duration: 800,
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

  if (!gtk.length) return null;

  const len = gtk.length;
  const VISIBLE = Math.min(7, len);

  // Flow based on screenshot arrows:
  // Row 1: 1 (col4) ← 2 (col3) ← 3 (col2) — enter from right, move left
  // ↓ down to UTAMA
  // UTAMA = slot-3 (col1, row-span-2) — position 4
  // ↓ from UTAMA to row 2
  // Row 2: 5 (col2) → 6 (col3) → 7 (col4) — exit to right
  const visible = Array.from({ length: VISIBLE }, (_, slot) => {
    const idx = ((step - slot) % len + len) % len;
    return gtk[idx];
  });

  return (
    <section ref={sectionRef} aria-label={dict.cpt.gtk.title} className="bg-[color:var(--background)] py-14 sm:py-16">
      <Container>
        <div data-animate-guru>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            <Link
              href={`/${locale}/gtk`}
              className="hover:text-[color:var(--primary)] transition-colors"
            >
              {dict.cpt.gtk.title}
            </Link>
          </h2>
          <p className="text-sm text-gray-500">{dict.cpt.gtk.subtitle}</p>
        </div>

        <LayoutGroup>
          {/* Desktop: bento grid with animation */}
          <div data-animate-guru className="mt-8 hidden sm:grid sm:grid-cols-4 sm:gap-3 lg:gap-4">
            {visible.map((person, slot) => {
              const isUtama = slot === 3;

              let col: number;
              let row: number;
              if (isUtama) {
                col = 1;
                row = 1;
              } else if (slot < 3) {
                // Row 1: right to left (col 4, 3, 2) — slots 0, 1, 2
                col = 4 - slot;
                row = 1;
              } else {
                // Row 2: left to right (col 2, 3, 4) — slots 4, 5, 6
                col = slot - 2;
                row = 2;
              }

              return (
                <motion.div
                  key={person.id}
                  layoutId={`guru-${person.id}`}
                  transition={{ layout: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] } }}
                  className={`relative overflow-hidden ${isUtama
                      ? "col-span-1 row-span-2 h-[420px] lg:h-[500px] rounded-2xl shadow-lg"
                      : "h-[200px] lg:h-[242px] rounded-xl shadow-md"
                    }`}
                  style={{
                    gridColumnStart: col,
                    gridRowStart: row,
                    gridRowEnd: isUtama ? 3 : undefined,
                  }}
                >
                  <GuruCard person={person} size={isUtama ? "large" : "small"} />
                </motion.div>
              );
            })}
          </div>

          {/* Mobile: horizontal auto-scroll */}
          <MobileGuruScroll gtk={gtk} />
        </LayoutGroup>

        <div className="mt-5 flex justify-center gap-1.5">
          {gtk.slice(0, Math.min(len, 15)).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === step % len ? "w-5 bg-emerald-500" : "w-1.5 bg-gray-300"
                }`}
            />
          ))}
        </div>


      </Container>
    </section>
  );
}
