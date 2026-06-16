"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({
    ignoreMobileResize: true,
  });
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      lerp: 0.06, // Lower lerp for stronger damping (makes scroll feel smooth and controlled)
      duration: 1.8, // Longer transition duration
      smoothWheel: true,
      wheelMultiplier: 0.75, // Reduce speed/distance of wheel scroll
      touchMultiplier: 0.75, // Reduce speed/distance of touch scroll on mobile
    });

    lenisRef.current = lenis;

    // Connect Lenis scrolling with GSAP ScrollTrigger updates
    lenis.on("scroll", ScrollTrigger.update);

    // Use GSAP's high-precision ticker to drive Lenis updates
    const tickHandler = (time: number) => {
      lenis.raf(time * 1000); // Convert seconds to milliseconds
    };
    gsap.ticker.add(tickHandler);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickHandler);
      lenis.destroy();
    };
  }, []);

  // Scroll to top and refresh ScrollTrigger on path change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    // Refresh ScrollTrigger after a brief timeout to allow Next.js route change layout to settle
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
    return () => clearTimeout(timer);
  }, [pathname]);

  return <>{children}</>;
}
