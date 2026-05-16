import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { SchoolMark } from "./school-mark";

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

// Inline social icons (lucide-react v1.x doesn't ship branded ones)
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H8v-2.9h2.4V9.8c0-2.4 1.4-3.7 3.6-3.7 1 0 2.1.2 2.1.2v2.3h-1.2c-1.2 0-1.5.7-1.5 1.5V12h2.6l-.4 2.9H13.4v7A10 10 0 0 0 22 12Z" />
    </svg>
  );
}
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
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

export function Footer({ locale, dict }: FooterProps) {
  const navLinks = [
    { label: dict.nav.home, href: `/${locale}` },
    { label: dict.nav.history, href: `/${locale}/profil/sejarah` },
    { label: dict.nav.visionMission, href: `/${locale}/profil/visi-misi` },
    { label: dict.nav.principal, href: `/${locale}/profil/kepala-sekolah` },
    { label: dict.nav.facilities, href: `/${locale}/profil/fasilitas` },
    { label: dict.cpt.gtk.label, href: `/${locale}/gtk` },
    { label: dict.cpt.prestasi.label, href: `/${locale}/prestasi` },
    { label: dict.cpt.agenda.label, href: `/${locale}/agenda` },
    { label: dict.cpt.pengumuman.label, href: `/${locale}/pengumuman` },
    { label: dict.cpt.editorial.label, href: `/${locale}/editorial` },
    { label: dict.cpt.galeri.label, href: `/${locale}/galeri` },
    { label: dict.cpt.ekskul.label, href: `/${locale}/ekskul` },
    { label: dict.nav.news, href: `/${locale}/berita` },
  ];

  return (
    <footer className="mt-16 border-t border-white/20 bg-white/40 backdrop-blur-xl">
      <Container className="grid gap-10 py-12 md:grid-cols-3 md:gap-8">
        <div>
          <div className="flex items-center gap-3">
            <SchoolMark />
            <div>
              <p className="text-base font-bold text-[color:var(--primary)]">
                {dict.site.name}
              </p>
              <p className="text-xs text-[color:var(--muted-foreground)]">
                {dict.site.tagline}
              </p>
            </div>
          </div>
          <div className="mt-5 space-y-2.5 text-sm text-[color:var(--muted-foreground)]">
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-[color:var(--primary)]" aria-hidden />
              <span>{dict.footer.address}</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="size-4 shrink-0 text-[color:var(--primary)]" aria-hidden />
              <a
                href="mailto:info@sman-modalbangsa.sch.id"
                className="hover:text-[color:var(--primary)]"
              >
                info@sman-modalbangsa.sch.id
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="size-4 shrink-0 text-[color:var(--primary)]" aria-hidden />
              <span>(0651) 7551700</span>
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[color:var(--foreground)]">
            {dict.footer.links}
          </h2>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[color:var(--muted-foreground)] hover:text-[color:var(--primary)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[color:var(--foreground)]">
            {dict.footer.follow}
          </h2>
          <div className="mt-4 flex items-center gap-2">
            {[
              { Icon: FacebookIcon, label: "Facebook", href: "https://facebook.com" },
              { Icon: InstagramIcon, label: "Instagram", href: "https://instagram.com" },
              { Icon: YoutubeIcon, label: "YouTube", href: "https://youtube.com" },
            ].map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex size-10 items-center justify-center rounded-full border border-[color:var(--border)] bg-white text-[color:var(--muted-foreground)] transition-colors hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]"
              >
                <Icon className="size-5" />
              </a>
            ))}
          </div>
        </div>
      </Container>

      <div className="border-t border-white/20 bg-white/50 backdrop-blur-sm">
        <Container className="flex flex-col items-center justify-between gap-2 py-4 text-xs text-[color:var(--muted-foreground)] sm:flex-row">
          <p>
            © {new Date().getFullYear()} {dict.site.name}. {dict.footer.rights}
          </p>
          <p>{dict.footer.developed}</p>
        </Container>
      </div>
    </footer>
  );
}
