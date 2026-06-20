"use client";

import { useRef, useEffect, useLayoutEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { HeroContent } from "@/components/home/hero-content";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";


const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;


// Register ScrollTrigger on client only
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroProps {
  locale: Locale;
  dict: Dictionary;
}

export function Hero({ locale, dict }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [imageZoomed, setImageZoomed] = useState(false);
  const [modalData, setModalData] = useState<{
    isEnabled: boolean;
    title: string;
    message: string;
    image?: string;
    linkText?: string;
    linkUrl?: string;
  } | null>(null);

  useEffect(() => {
    const fetchCustomModal = async () => {
      try {
        const res = await fetch("https://webtestmosa-default-rtdb.asia-southeast1.firebasedatabase.app/settings/ppdb/customModal.json");
        if (res.ok) {
          const data = await res.json();
          if (data && data.isEnabled) {
            setModalData(data);
            setModalOpen(true);
          }
        }
      } catch (err) {
        console.error("Error fetching custom modal:", err);
      }
    };
    fetchCustomModal();
  }, []);

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [modalOpen]);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!heroRef.current || !videoContainerRef.current || !contentContainerRef.current) return;

      // Pin the hero section with no spacing, allowing the next section to slide on top
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
      });

      // Parallax zoom-in and scroll shift for the video background
      gsap.to(videoContainerRef.current, {
        scale: 1.15,
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Fade out and float up for the content
      gsap.to(contentContainerRef.current, {
        opacity: 0,
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom 40%",
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="bg-zinc-950 w-full overflow-hidden relative z-10">
      <section
        className="relative flex h-screen w-full items-center justify-center overflow-hidden text-white"
        aria-labelledby="hero-title"
        id="hero"
      >
        {/* Background Video playing in loop, muted, playsInline */}
        <div
          ref={videoContainerRef}
          className="absolute inset-0 h-full w-full overflow-hidden origin-center z-0"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/bg-video.mp4" type="video/mp4" />
            {/* Fallback image */}
            <img
              src="/bg.png"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              aria-hidden
            />
          </video>

          {/* Cinematic overlay */}
          <div aria-hidden className="absolute inset-0 bg-black/55" />
        </div>

        {/* Content — Centered */}
        <div ref={contentContainerRef} className="relative z-10 w-full">
          <Container className="py-24 sm:py-32">
            <HeroContent locale={locale} dict={dict} />
          </Container>
        </div>
      </section>

      {/* Special Dynamic Custom Modal */}
      <AnimatePresence>
        {modalOpen && modalData && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop with fade-in and blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setModalOpen(false);
              }}
              className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative bg-white text-zinc-900 w-[90%] sm:w-full max-w-md sm:max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-zinc-100 flex flex-col z-10"
            >
              {/* Image (if provided) */}
              {modalData.image && (
                <div className="relative w-full bg-white flex items-center justify-center p-4 sm:p-6 pb-0 overflow-hidden">
                  <img
                    src={modalData.image}
                    alt={modalData.title}
                    onClick={() => setImageZoomed(true)}
                    className="w-full max-h-[260px] sm:max-h-[380px] object-contain rounded-2xl shadow-sm border border-zinc-100 cursor-zoom-in transition-transform duration-250 hover:scale-[1.01]"
                  />
                </div>
              )}

              {/* Body Content */}
              <div className="p-5 sm:p-7 space-y-3 sm:space-y-4 flex-1">
                <h3 className="font-sfpro text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 uppercase">
                  {modalData.title}
                </h3>
                
                <p className="text-zinc-650 text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-sans">
                  {modalData.message}
                </p>

                {/* Footer Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  {modalData.linkUrl && modalData.linkText && (
                    <a
                      href={modalData.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[#16a34a] hover:bg-[#118037] text-white text-center text-xs sm:text-sm font-bold tracking-wider py-3.5 px-6 rounded-full transition-all duration-300 font-sfpro uppercase shadow-sm cursor-pointer"
                    >
                      {modalData.linkText}
                    </a>
                  )}
                  <button
                    onClick={() => {
                      setModalOpen(false);
                    }}
                    className="flex-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-center text-xs sm:text-sm font-bold tracking-wider py-3.5 px-6 rounded-full transition-all duration-300 font-sfpro uppercase cursor-pointer"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Zoomed Image Lightbox Overlay */}
      <AnimatePresence>
        {imageZoomed && modalData && modalData.image && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setImageZoomed(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md cursor-zoom-out"
            />

            {/* Zoomed Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative max-w-[95vw] max-h-[90vh] z-10 flex items-center justify-center rounded-xl overflow-hidden shadow-2xl"
            >
              <img
                src={modalData.image}
                alt={modalData.title}
                onClick={() => setImageZoomed(false)}
                className="max-w-[95vw] max-h-[90vh] object-contain rounded-xl cursor-zoom-out"
              />

              {/* Close Button placed inside on top right */}
              <button
                onClick={() => setImageZoomed(false)}
                className="absolute top-4 right-4 bg-black/45 hover:bg-black/60 text-white p-2 rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center border border-white/10 hover:scale-105 active:scale-95"
                aria-label="Close zoomed image"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

