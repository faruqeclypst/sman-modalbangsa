"use client";

import * as React from "react";
import Image from "next/image";
import { ImageLightbox } from "@/components/ui/image-lightbox";
import { Maximize2 } from "lucide-react";

interface StructureViewerProps {
  src: string;
  alt: string;
}

export function StructureViewer({ src, alt }: StructureViewerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        className="group relative aspect-[4/3] w-full bg-zinc-50 dark:bg-zinc-950/20 hover:scale-[1.01] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-zoom-in"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-contain p-4"
          priority
        />
        
        {/* Hover overlay with scan icon */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 dark:bg-zinc-900/90 text-[color:var(--foreground)] rounded-full p-3 shadow-md flex items-center gap-2">
            <Maximize2 className="h-4 w-4" />
            <span className="text-xs font-semibold pr-1">Perbesar Gambar</span>
          </div>
        </div>
      </div>

      {isOpen && (
        <ImageLightbox
          images={[{ src, alt }]}
          initialIndex={0}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
