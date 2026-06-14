import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, Phone, ArrowUpRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { SchoolMark } from "./school-mark";

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

/** Decorative background pattern for footer */
function FooterPattern() {
  return (
    <>
      {/* Dot grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* Large decorative circles */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 size-[500px] rounded-full border border-white/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -left-20 size-[300px] rounded-full border border-white/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 bottom-10 size-[200px] rounded-full bg-white/[0.03]"
      />
    </>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H8v-2.9h2.4V9.8c0-2.4 1.4-3.7 3.6-3.7 1 0 2.1.2 2.1.2v2.3h-1.2c-1.2 0-1.5.7-1.5 1.5V12h2.6l-.4 2.9H13.4v7A10 10 0 0 0 22 12Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.3-1.6.4-3.2.4-4.8 0-1.6-.1-3.2-.4-4.8ZM10 15V9l5.2 3L10 15Z" />
    </svg>
  );
}

function TiktokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.88 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.28 0 .56.04.82.1v-3.5a6.37 6.37 0 0 0-.82-.05A6.34 6.34 0 0 0 3.15 15.6a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.4a8.16 8.16 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.83Z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function Footer({ locale, dict }: FooterProps) {
  const quickLinks = [
    { label: dict.nav.home, href: `/${locale}` },
    { label: dict.nav.news, href: `/${locale}/berita` },
    { label: dict.cpt.prestasi.label, href: `/${locale}/prestasi` },
    { label: dict.cpt.agenda.label, href: `/${locale}/agenda` },
    { label: dict.cpt.pengumuman.label, href: `/${locale}/pengumuman` },
    { label: dict.cpt.galeri.label, href: `/${locale}/galeri` },
  ];

  const profileLinks = [
    { label: dict.nav.history, href: `/${locale}/profil/sejarah` },
    { label: dict.nav.visionMission, href: `/${locale}/profil/visi-misi` },
    { label: dict.nav.principal, href: `/${locale}/profil/kepala-sekolah` },
    { label: dict.nav.facilities, href: `/${locale}/profil/fasilitas` },
    { label: dict.cpt.gtk.label, href: `/${locale}/gtk` },
    { label: dict.cpt.ekskul.label, href: `/${locale}/ekskul` },
  ];

  const socials = [
    { Icon: FacebookIcon, label: "Facebook", href: "https://facebook.com" },
    { Icon: InstagramIcon, label: "Instagram", href: "https://instagram.com" },
    { Icon: YoutubeIcon, label: "YouTube", href: "https://youtube.com" },
    { Icon: TiktokIcon, label: "TikTok", href: "https://tiktok.com" },
    { Icon: WhatsAppIcon, label: "WhatsApp", href: "https://wa.me/6285359907696?text=Assalamualaikum%20humas%20SMAN%20Modal%20Bangsa" },
  ];

  return (
    <footer>
      {/* CTA Section */}
      <div className="relative overflow-hidden py-36 md:py-48 flex items-center justify-center min-h-[480px] text-center text-white">
        <Image
          src="/images/cta.jpeg"
          alt="Mosa Inspire Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/65" />

        <div className="relative z-10 mx-auto max-w-4xl px-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            {dict.cta.title}{" "}
            <span className="font-romulo italic text-emerald-400">
              {dict.cta.titleAccent}
            </span>
          </h2>
          <p className="mt-6 text-base md:text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">
            {dict.cta.description}
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href={`/${locale}/profil/sejarah`}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 px-8 py-4 text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95 shadow-lg shadow-black/20"
            >
              <span>{dict.cta.buttonText}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4 transition-transform group-hover:translate-x-1"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#056b43] via-[#045937] to-[#03442a] border-t border-emerald-500/20">
        {/* Decorative Pattern */}
        <FooterPattern />

        {/* Ambient Glows */}
        <div className="absolute left-[10%] bottom-0 -z-10 h-80 w-80 rounded-full bg-white/[0.04] blur-[100px] pointer-events-none" />
        <div className="absolute right-[10%] top-0 -z-10 h-80 w-80 rounded-full bg-white/[0.02] blur-[100px] pointer-events-none" />

        <Container className="relative z-10 py-16 sm:py-20">
          {/* Bento Grid */}
          <div className="grid gap-6 md:grid-cols-4 lg:gap-8">
            {/* Brand Card - spans 2 cols */}
            <div className="flex flex-col justify-between rounded-3xl bg-white/[0.07] border border-white/[0.12] p-8 backdrop-blur-md hover:bg-white/[0.12] hover:border-white/30 transition-all duration-500 shadow-xl shadow-black/10 md:col-span-2">
              <div>
                <div className="flex items-center gap-4">
                  <SchoolMark />
                  <div>
                    <p className="text-xl font-bold tracking-tight text-white">
                      {dict.site.name}
                    </p>
                    <p className="text-xs font-medium text-emerald-200 mt-0.5">
                      {dict.site.tagline}
                    </p>
                  </div>
                </div>

                <div className="mt-8 space-y-4 text-sm text-emerald-100/95">
                  <p className="flex items-start gap-3 leading-relaxed">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-emerald-250" aria-hidden />
                    <span className="hover:text-white transition-colors duration-300">{dict.footer.address}</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <Mail className="size-4 shrink-0 text-emerald-250" aria-hidden />
                    <a
                      href="mailto:info@sman-modalbangsa.sch.id"
                      className="transition-colors hover:text-white"
                    >
                      info@sman-modalbangsa.sch.id
                    </a>
                  </p>
                  <p className="flex items-center gap-3">
                    <Phone className="size-4 shrink-0 text-emerald-250" aria-hidden />
                    <span className="hover:text-white transition-colors duration-300">(0651) 7551700</span>
                  </p>
                </div>
              </div>

              {/* Social Icons */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {socials.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex size-10 items-center justify-center rounded-full bg-white/[0.08] border border-white/[0.12] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#056b43] hover:border-white shadow-sm"
                  >
                    <Icon className="size-[18px]" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links Card */}
            <div className="rounded-3xl bg-white/[0.07] border border-white/[0.12] p-8 backdrop-blur-md hover:bg-white/[0.12] hover:border-white/30 transition-all duration-500 shadow-xl shadow-black/10">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-200/60 font-sfpro mb-6">
                {dict.footer.links}
              </h2>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center justify-between text-sm font-medium text-emerald-100 hover:text-white transition-colors"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="size-3.5 opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-white" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Profile Links Card */}
            <div className="rounded-3xl bg-white/[0.07] border border-white/[0.12] p-8 backdrop-blur-md hover:bg-white/[0.12] hover:border-white/30 transition-all duration-500 shadow-xl shadow-black/10">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-200/60 font-sfpro mb-6">
                {dict.nav.profile}
              </h2>
              <ul className="space-y-3">
                {profileLinks.slice(0, 5).map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center justify-between text-sm font-medium text-emerald-100 hover:text-white transition-colors"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="size-3.5 opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-white" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.08] bg-black/10">
          <Container className="flex flex-col items-center justify-between gap-4 py-6 text-xs text-emerald-200/60 sm:flex-row">
            <p className="font-medium">
              © {new Date().getFullYear()} {dict.site.name}. {dict.footer.rights}
            </p>
            <p className="font-medium hover:text-white transition-colors duration-300">{dict.footer.developed}</p>
          </Container>
        </div>
      </div>
    </footer>
  );
}
