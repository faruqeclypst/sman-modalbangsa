import Link from "next/link";
import {
  Calendar,
  GraduationCap,
  Megaphone,
  Monitor,
  Trophy,
  Vote,
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";

interface QuickLinksProps {
  locale: Locale;
  dict: Dictionary;
}

export function QuickLinks({ locale, dict }: QuickLinksProps) {
  const items = [
    {
      key: "spmb",
      Icon: GraduationCap,
      label: dict.quickLinks.items.spmb,
      desc: dict.quickLinks.items.spmbDesc,
      href: `/${locale}/spmb`,
      tone: "bg-[color:var(--primary)]/10 text-[color:var(--primary)]",
    },
    {
      key: "cbt",
      Icon: Monitor,
      label: dict.quickLinks.items.cbt,
      desc: dict.quickLinks.items.cbtDesc,
      href: "https://cbt.sman-modalbangsa.sch.id",
      external: true,
      tone: "bg-[color:var(--accent)]/10 text-[color:var(--accent)]",
    },
    {
      key: "schedule",
      Icon: Calendar,
      label: dict.quickLinks.items.schedule,
      desc: dict.quickLinks.items.scheduleDesc,
      href: `/${locale}/akademik/jadwal`,
      tone: "bg-emerald-50 text-emerald-700",
    },
    {
      key: "announcements",
      Icon: Megaphone,
      label: dict.quickLinks.items.announcements,
      desc: dict.quickLinks.items.announcementsDesc,
      href: `/${locale}/berita`,
      tone: "bg-amber-50 text-amber-700",
    },
    {
      key: "achievements",
      Icon: Trophy,
      label: dict.quickLinks.items.achievements,
      desc: dict.quickLinks.items.achievementsDesc,
      href: `/${locale}/prestasi`,
      tone: "bg-rose-50 text-rose-700",
    },
    {
      key: "evoting",
      Icon: Vote,
      label: dict.quickLinks.items.evoting,
      desc: dict.quickLinks.items.evotingDesc,
      href: "https://evoting.sman-modalbangsa.sch.id",
      external: true,
      tone: "bg-indigo-50 text-indigo-700",
    },
  ] as const;

  return (
    <section
      aria-labelledby="quick-links-title"
      className="bg-[color:var(--background)] py-14 sm:py-16"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="quick-links-title"
            className="text-2xl font-bold tracking-tight text-[color:var(--foreground)] sm:text-3xl"
          >
            {dict.quickLinks.title}
          </h2>
          <p className="mt-2 text-[color:var(--muted-foreground)]">
            {dict.quickLinks.subtitle}
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
          {items.map(({ key, Icon, label, desc, href, tone, ...rest }) => {
            const isExternal = "external" in rest && rest.external;
            const content = (
              <>
                <span
                  className={`flex size-12 items-center justify-center rounded-xl ${tone} transition-transform group-hover:scale-110`}
                >
                  <Icon className="size-6" aria-hidden />
                </span>
                <span className="mt-3 block text-sm font-semibold text-[color:var(--foreground)]">
                  {label}
                </span>
                <span className="mt-0.5 block text-xs text-[color:var(--muted-foreground)]">
                  {desc}
                </span>
              </>
            );

            const className =
              "group flex flex-col items-center rounded-xl border border-[color:var(--border)] bg-white p-4 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:border-[color:var(--primary)]/40 hover:shadow-md";

            return (
              <li key={key}>
                {isExternal ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                  >
                    {content}
                  </a>
                ) : (
                  <Link href={href} className={className}>
                    {content}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
