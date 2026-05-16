"use client";

import * as React from "react";
import Image from "next/image";

interface HeroSliderProps {
  images: string[];
  /** Interval between slides in ms. Default 6000. */
  interval?: number;
}

export function HeroSlider({ images, interval = 6000 }: HeroSliderProps) {
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="absolute inset-0" aria-hidden>
      {images.map((src, idx) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          priority={idx === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-[1200ms] ease-in-out ${
            idx === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Slide indicators — bottom-left aligned */}
      <div className="absolute bottom-36 left-4 z-20 flex items-center gap-2 sm:bottom-32 sm:left-8 lg:left-[max(2rem,calc((100vw-80rem)/2+2rem))]">
        {images.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrent(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === current
                ? "w-8 bg-white"
                : "w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
