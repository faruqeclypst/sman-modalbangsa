"use client";

import * as React from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface GalleryImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface GallerySliderProps {
  images: GalleryImage[];
}

export function GallerySlider({ images }: GallerySliderProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLDivElement>(null);

  const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

  useIsomorphicLayoutEffect(() => {
    if (images.length <= 1 || !containerRef.current || !triggerRef.current) return;

    const ctx = gsap.context(() => {
      // Calculate scroll duration based on the number of images
      const pinDistance = window.innerWidth * (images.length - 1) * 0.6;
      
      gsap.to(containerRef.current, {
        x: () => {
          if (!containerRef.current) return 0;
          return -(containerRef.current.scrollWidth - window.innerWidth + 96);
        },
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 0.2,
          start: "top 10%",
          end: () => `+=${pinDistance}`,
          invalidateOnRefresh: true,
        },
      });
    }, triggerRef);

    return () => ctx.revert();
  }, [images]);

  if (images.length === 0) return null;

  return (
    <div ref={triggerRef} className="relative w-full my-12 overflow-hidden py-6 bg-zinc-50/50 border-y border-zinc-100 rounded-3xl">
      <div className="px-6 mb-4 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-widest text-[#16a34a] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100/50">
          Galeri Foto
        </span>
        <span className="text-[10px] font-medium text-zinc-400">
          Scroll ke bawah untuk melihat foto berikutnya
        </span>
      </div>
      <div
        ref={containerRef}
        className="flex gap-6 px-6 relative z-10 w-max items-center"
      >
        {images.map((img, idx) => {
          const isSchoolHost = /(^|\/\/)(www\.)?sman-modalbangsa\.sch\.id\//i.test(img.src);
          return (
            <div
              key={idx}
              className="relative shrink-0 rounded-2xl overflow-hidden shadow-md border border-zinc-200/40 bg-white aspect-[16/10] w-[75vw] sm:w-[50vw] md:w-[40vw] max-w-[550px] transition-transform duration-500 hover:scale-[1.01]"
            >
              <Image
                src={img.src}
                alt={img.alt || `Dokumentasi ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 75vw, 40vw"
                className="object-cover"
                unoptimized={!isSchoolHost}
              />
              {img.alt && (
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 z-20">
                  <p className="text-white text-xs font-medium font-sfpro">
                    {img.alt}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
