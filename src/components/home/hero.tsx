import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { HeroContent } from "@/components/home/hero-content";

interface HeroProps {
  locale: Locale;
  dict: Dictionary;
  /** Optional slot for streaming gallery slider (rendered via Suspense) */
  children?: React.ReactNode;
}

export function Hero({ locale, dict, children }: HeroProps) {
  return (
    <section
      className="relative flex min-h-[100dvh] items-center overflow-hidden text-white"
      aria-labelledby="hero-title"
      id="hero"
    >
      {/* Default static background — always loads instantly */}
      <Image
        src="/bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover blur-[2px]"
        aria-hidden
      />

      {/* Gallery slider streams in on top when ready */}
      {children}

      {/* Flat overlay */}
      <div aria-hidden className="absolute inset-0 bg-black/40" />

      {/* Content — centered on mobile, left on desktop */}
      <Container className="relative z-10 py-24 sm:py-32">
        <HeroContent locale={locale} dict={dict} />
      </Container>
    </section>
  );
}
