"use client";

import * as React from "react";

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
  if (images.length === 0) return null;

  return (
    <div className="relative w-full my-12 py-6 bg-zinc-50/50 border-y border-zinc-100 rounded-3xl">
      <div className="px-6 mb-4 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-widest text-[#16a34a] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100/50">
          Galeri Foto
        </span>
        <span className="text-[10px] font-medium text-zinc-400">
          Geser atau scroll ke samping untuk melihat foto
        </span>
      </div>
      <div
        className="flex gap-6 px-6 relative z-10 w-full items-center overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((img, idx) => {
          return (
            <div
              key={idx}
              className="relative shrink-0 rounded-xl overflow-hidden snap-start"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt || `Dokumentasi ${idx + 1}`}
                className="aspect-[3/4] !w-[60vw] sm:!w-[38vw] md:!w-[24vw] !h-auto rounded-xl object-cover"
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
