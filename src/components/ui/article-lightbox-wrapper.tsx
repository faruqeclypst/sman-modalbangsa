"use client";

import * as React from "react";
import { ImageLightbox } from "@/components/ui/image-lightbox";

/**
 * Wraps article content and makes all images clickable to open in a lightbox.
 * Place this around any rendered HTML content that contains images.
 */

export function ArticleLightboxWrapper({ children }: { children: React.ReactNode }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [lightboxIndex, setLightboxIndex] = React.useState(0);
  const [images, setImages] = React.useState<{ src: string; alt: string }[]>([]);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const imgs = el.querySelectorAll("img");
    const imageList: { src: string; alt: string }[] = [];

    imgs.forEach((img, idx) => {
      const src = img.getAttribute("src") || "";
      const alt = img.getAttribute("alt") || "";
      if (src) {
        imageList.push({ src, alt });
        img.style.cursor = "zoom-in";
        img.addEventListener("click", () => {
          setLightboxIndex(idx);
          setLightboxOpen(true);
        });
      }
    });

    setImages(imageList);
  }, []);

  return (
    <>
      <div ref={containerRef}>{children}</div>
      {lightboxOpen && images.length > 0 ? (
        <ImageLightbox
          images={images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      ) : null}
    </>
  );
}
