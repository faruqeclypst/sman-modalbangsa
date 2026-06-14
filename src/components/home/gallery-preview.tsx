"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { WPPost } from "@/lib/wp-types";
import { getFeaturedImageUrl } from "@/lib/wp";
import { decodeHtmlEntities } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface GalleryPreviewProps {
  locale: Locale;
  items: WPPost[];
}

interface PhotoItem {
  url: string;
  title: string;
  albumSlug: string;
  albumTitle: string;
  date: string;
}

function toProxyUrlLocal(url: string | null): string | null {
  if (!url) return null;
  const wpContentIdx = url.indexOf("/wp-content/");
  if (wpContentIdx !== -1) {
    return url.substring(wpContentIdx);
  }
  const wpIncludesIdx = url.indexOf("/wp-includes/");
  if (wpIncludesIdx !== -1) {
    return url.substring(wpIncludesIdx);
  }
  return url;
}

export function GalleryPreview({ locale, items }: GalleryPreviewProps) {
  const sectionRef = React.useRef<HTMLElement>(null);
  const headerRef = React.useRef<HTMLDivElement>(null);
  const gridRef = React.useRef<HTMLDivElement>(null);

  const [selectedPhotoIndex, setSelectedPhotoIndex] = React.useState<number | null>(null);

  const allPhotos = React.useMemo(() => {
    const photos: PhotoItem[] = [];

    items.forEach((item) => {
      const albumTitle = decodeHtmlEntities(item.title.rendered);
      const albumSlug = item.slug;
      const albumDate = item.date;

      const featuredUrl = getFeaturedImageUrl(item);
      const proxiedFeaturedUrl = toProxyUrlLocal(featuredUrl);
      if (proxiedFeaturedUrl) {
        photos.push({
          url: proxiedFeaturedUrl,
          title: albumTitle,
          albumSlug,
          albumTitle,
          date: albumDate,
        });
      }

      const html = item.content?.rendered || "";
      const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
      const altRegex = /alt=["']([^"']*)["']/i;

      let match;
      while ((match = imgRegex.exec(html)) !== null) {
        const rawUrl = match[1];
        const proxiedUrl = toProxyUrlLocal(rawUrl);
        const altMatch = altRegex.exec(match[0]);
        const imgTitle = altMatch && altMatch[1] ? decodeHtmlEntities(altMatch[1]) : albumTitle;

        if (
          proxiedUrl &&
          (proxiedUrl.includes("/uploads/") || proxiedUrl.includes("/wp-content/")) &&
          !photos.some((p) => p.url === proxiedUrl)
        ) {
          photos.push({
            url: proxiedUrl,
            title: imgTitle,
            albumSlug,
            albumTitle,
            date: albumDate,
          });
        }
      }
    });

    return photos;
  }, [items]);

  const displayPhotos = React.useMemo(() => {
    return allPhotos.slice(0, 5);
  }, [allPhotos]);

  const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (gridRef.current) {
        const isMobile = window.innerWidth < 768;

        if (isMobile) {
          const cards = gridRef.current;
          const totalWidth = cards.scrollWidth;
          const viewportWidth = window.innerWidth;
          const scrollDist = totalWidth - viewportWidth + 32;

          gsap.to(cards, {
            x: -scrollDist,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              pin: true,
              scrub: 0.5,
              start: "top 15%",
              end: () => `+=${scrollDist * 1.5}`,
              invalidateOnRefresh: true,
            },
          });
        } else {
          gsap.fromTo(
            gridRef.current.children,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.12,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [displayPhotos]);

  React.useEffect(() => {
    if (selectedPhotoIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedPhotoIndex(null);
      if (e.key === "ArrowLeft") {
        setSelectedPhotoIndex((prev) => (prev === 0 ? allPhotos.length - 1 : prev! - 1));
      }
      if (e.key === "ArrowRight") {
        setSelectedPhotoIndex((prev) => (prev === allPhotos.length - 1 ? 0 : prev! + 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhotoIndex, allPhotos.length]);

  if (!allPhotos.length) return null;

  const renderCardOverlay = (photo: PhotoItem, isLarge = false) => {
    const isDuplicate =
      photo.title.toLowerCase() === photo.albumTitle.toLowerCase() ||
      photo.title.toLowerCase().includes("hero slider") ||
      photo.title.toLowerCase().includes("slideshow");
    const displayTitle = isDuplicate ? "" : photo.title;
    const displayCategory = photo.albumTitle.toLowerCase().includes("hero slider")
      ? locale === "id"
        ? "Aktivitas Sekolah"
        : "School Activities"
      : photo.albumTitle;

    return (
      <>
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
        <div className="relative z-10 flex flex-col justify-end p-6 md:p-8 text-center">
          <p className="text-white/80 font-medium text-xs sm:text-sm tracking-wide mb-1.5">
            {displayCategory}
          </p>
          {displayTitle && (
            <h3
              className={`font-sfpro font-bold text-white leading-tight ${
                isLarge ? "text-lg sm:text-xl md:text-2xl" : "text-base sm:text-lg line-clamp-2"
              }`}
            >
              {displayTitle}
            </h3>
          )}
        </div>
      </>
    );
  };

  const cardClassName =
    "group relative flex flex-col justify-end overflow-hidden rounded-[2rem] bg-zinc-900 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer";

  return (
    <section
      ref={sectionRef}
      id="gallery"
      aria-labelledby="gallery-preview-title"
      className="relative overflow-hidden bg-transparent py-24 sm:py-32"
    >
      <Container>
        <div ref={headerRef} className="mx-auto max-w-4xl text-center mb-16 sm:mb-20">
          <h2
            id="gallery-preview-title"
            className="font-sfpro font-bold tracking-tight text-[2.5rem] leading-[1.15] sm:text-[3.5rem] md:text-[4rem] text-zinc-900 mb-6"
          >
            {locale === "en" ? (
              <>
                Our{" "}
                <span className="text-[#16a34a] font-romulo font-normal italic normal-case px-1">
                  Activity
                </span>{" "}
                Gallery
              </>
            ) : (
              <>
                Galeri{" "}
                <span className="text-[#16a34a] font-romulo font-normal italic normal-case px-1">
                  Aktivitas
                </span>{" "}
                Kami
              </>
            )}
          </h2>
          <p className="mx-auto max-w-3xl text-gray-500 font-medium text-sm sm:text-base md:text-lg leading-relaxed px-4">
            {locale === "en"
              ? "A collection of live documentation photos from SMAN Modal Bangsa activities and events."
              : "Kumpulan foto dokumentasi langsung dari berbagai kegiatan dan acara SMAN Modal Bangsa."}
          </p>
        </div>

        {displayPhotos.length >= 5 ? (
          <div
            ref={gridRef}
            className="flex md:grid md:grid-cols-4 gap-6 md:gap-6 grid-flow-dense md:grid-rows-2 md:h-[650px] items-stretch will-change-transform select-none pb-4 md:pb-0"
          >
            <div
              className="md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto w-[290px] sm:w-[320px] md:w-auto shrink-0 snap-start"
            >
              <div
                onClick={() => setSelectedPhotoIndex(0)}
                className={`${cardClassName} w-full h-full`}
              >
                <Image
                  src={displayPhotos[0].url}
                  alt={displayPhotos[0].title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {renderCardOverlay(displayPhotos[0], true)}
              </div>
            </div>

            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="aspect-square md:aspect-auto w-[290px] sm:w-[320px] md:w-auto shrink-0 snap-start"
              >
                <div
                  onClick={() => setSelectedPhotoIndex(index)}
                  className={`${cardClassName} w-full h-full`}
                >
                  <Image
                    src={displayPhotos[index].url}
                    alt={displayPhotos[index].title}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {renderCardOverlay(displayPhotos[index], false)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            ref={gridRef}
            className="flex md:grid md:grid-cols-3 gap-6 will-change-transform select-none pb-4 md:pb-0"
          >
            {displayPhotos.map((photo, index) => (
              <div
                key={index}
                className="w-[290px] sm:w-[320px] md:w-auto shrink-0 snap-start"
              >
                <div
                  onClick={() => setSelectedPhotoIndex(index)}
                  className={`${cardClassName} aspect-[4/5]`}
                >
                  <Image
                    src={photo.url}
                    alt={photo.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {renderCardOverlay(photo, false)}
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>

      {selectedPhotoIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          <button
            onClick={() => setSelectedPhotoIndex(null)}
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-55 cursor-pointer"
            aria-label={locale === "id" ? "Tutup" : "Close"}
          >
            <X className="size-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPhotoIndex((prev) => (prev === 0 ? allPhotos.length - 1 : prev! - 1));
            }}
            className="absolute left-4 sm:left-6 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-55 cursor-pointer"
            aria-label={locale === "id" ? "Sebelumnya" : "Previous"}
          >
            <ChevronLeft className="size-8" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPhotoIndex((prev) => (prev === allPhotos.length - 1 ? 0 : prev! + 1));
            }}
            className="absolute right-4 sm:right-6 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-55 cursor-pointer"
            aria-label={locale === "id" ? "Selanjutnya" : "Next"}
          >
            <ChevronRight className="size-8" />
          </button>

          <div
            className="relative max-h-[85vh] max-w-[90vw] flex flex-col items-center z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={allPhotos[selectedPhotoIndex].url}
              alt={allPhotos[selectedPhotoIndex].title}
              className="max-h-[75vh] max-w-full object-contain rounded-[1.5rem] shadow-2xl border border-white/5"
            />
            <div className="mt-5 text-center text-white select-none">
              <p className="text-white/80 font-medium text-xs sm:text-sm tracking-wide">
                {allPhotos[selectedPhotoIndex].albumTitle}
              </p>
              <h3 className="font-sfpro text-base sm:text-lg md:text-xl font-bold mt-1.5 max-w-2xl px-6 leading-snug">
                {allPhotos[selectedPhotoIndex].title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
