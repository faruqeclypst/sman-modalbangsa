import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getCPT } from "@/lib/wp";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/layout/page-header";
import { AgendaCalendar } from "@/components/agenda/agenda-calendar";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { decodeHtmlEntities } from "@/lib/utils";
import Link from "next/link";
import type { WPPost } from "@/lib/wp-types";

export const revalidate = 600;

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/agenda">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.cpt.agenda.title,
    description: dict.cpt.agenda.subtitle,
    alternates: { canonical: `/${lang}/agenda` },
  };
}

function EventListItem({
  event,
  locale,
  isUpcoming,
}: {
  event: WPPost;
  locale: Locale;
  isUpcoming: boolean;
}) {
  const title = decodeHtmlEntities(event.title.rendered);
  const eventDate = new Date(event.date);
  const day = eventDate.getDate();
  const month = eventDate.toLocaleDateString(locale === "id" ? "id-ID" : "en-US", {
    month: "short",
  });
  const year = eventDate.getFullYear();
  const time = eventDate.toLocaleTimeString(locale === "id" ? "id-ID" : "en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="group flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-[color:var(--primary)]/20">
      {/* Date badge */}
      <div
        className={`flex size-14 shrink-0 flex-col items-center justify-center rounded-xl font-sfpro ${
          isUpcoming
            ? "bg-gradient-to-br from-emerald-50 to-emerald-100/80 text-[color:var(--primary)] border border-emerald-500/10"
            : "bg-gray-50 text-gray-400 border border-gray-200/50"
        }`}
      >
        <span className="text-xl font-bold leading-none">{day}</span>
        <span className="mt-0.5 text-[9px] font-bold uppercase tracking-wider">
          {month}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <Link href={`/${locale}/agenda/${event.slug}`}>
          <h5 className="font-sfpro text-sm font-bold leading-snug text-[color:var(--foreground)] group-hover:text-[color:var(--primary)] transition-colors line-clamp-2">
            {title}
          </h5>
        </Link>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
          <Clock className="size-3.5 text-gray-400" />
          {time} • {year}
        </p>
      </div>

      {/* Link Icon */}
      <div className="self-center">
        <Link
          href={`/${locale}/agenda/${event.slug}`}
          className="flex items-center justify-center rounded-full bg-gray-50 p-2 text-gray-400 hover:bg-[color:var(--primary)]/10 hover:text-[color:var(--primary)] transition-colors"
        >
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </div>
  );
}

export default async function AgendaListPage({
  params,
}: PageProps<"/[lang]/agenda">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const { posts: allEvents } = await getCPT("agenda", { perPage: 100 });

  const now = new Date();
  
  // Upcoming events: future dates, sorted closest first
  const upcomingEvents = allEvents
    .filter((event) => new Date(event.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Past events: past dates, sorted most recent first
  const pastEvents = allEvents
    .filter((event) => new Date(event.date) < now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const isId = lang === "id";

  return (
    <>
      <PageHeader
        title={dict.cpt.agenda.title}
        subtitle={dict.cpt.agenda.subtitle}
        breadcrumbs={[
          { label: dict.nav.home, href: `/${lang}` },
          { label: dict.cpt.agenda.label },
        ]}
      />
      <Container className="py-10 sm:py-12">
        {/* Full-width calendar */}
        <AgendaCalendar events={allEvents} locale={lang} />

        {/* 2 columns layout for upcoming and past events */}
        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          {/* Upcoming Events Column */}
          <div>
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
              <h3 className="font-sfpro text-lg font-bold tracking-tight text-[color:var(--foreground)]">
                {isId ? "Agenda Mendatang" : "Upcoming Events"}
              </h3>
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-[color:var(--primary)]">
                {upcomingEvents.length} {isId ? "Kegiatan" : "Events"}
              </span>
            </div>
            
            <div className="space-y-4">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
                  <EventListItem
                    key={event.id}
                    event={event}
                    locale={lang}
                    isUpcoming={true}
                  />
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-gray-200 bg-white/50 p-8 text-center text-gray-400">
                  <Calendar className="mx-auto size-8 text-gray-300" />
                  <p className="mt-2 text-xs font-medium text-muted-foreground">
                    {isId ? "Tidak ada agenda mendatang." : "No upcoming events scheduled."}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Past Events Column */}
          <div>
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
              <h3 className="font-sfpro text-lg font-bold tracking-tight text-[color:var(--foreground)]">
                {isId ? "Agenda Sebelumnya" : "Past Events"}
              </h3>
              <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-bold text-gray-600">
                {pastEvents.length} {isId ? "Kegiatan" : "Events"}
              </span>
            </div>

            <div className="space-y-4">
              {pastEvents.length > 0 ? (
                pastEvents.map((event) => (
                  <EventListItem
                    key={event.id}
                    event={event}
                    locale={lang}
                    isUpcoming={false}
                  />
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-gray-200 bg-white/50 p-8 text-center text-gray-400">
                  <Calendar className="mx-auto size-8 text-gray-300" />
                  <p className="mt-2 text-xs font-medium text-muted-foreground">
                    {isId ? "Tidak ada agenda sebelumnya." : "No past events recorded."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
