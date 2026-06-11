"use client";

import * as React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";

interface HeroSliderProps {
  images: string[];
  interval?: number;
}

export function HeroSlider({ images, interval = 6000 }: HeroSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 30 },
    [Autoplay({ delay: interval, stopOnInteraction: false }), Fade()]
  );

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = React.useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  if (images.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden" ref={emblaRef} aria-hidden>
      <div className="flex h-full touch-pan-y">
        {images.map((src, idx) => (
          <div key={src} className="relative min-w-0 flex-[0_0_100%]">
            <Image
              src={src}
              alt=""
              fill
              priority={idx === 0}
              sizes="100vw"
              className="object-cover blur-[5px]"
            />
          </div>
        ))}
      </div>

      {/* Slide indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-36 left-4 z-20 flex items-center gap-2 sm:bottom-32 sm:left-8 lg:left-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollTo(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === selectedIndex
                  ? "w-8 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
