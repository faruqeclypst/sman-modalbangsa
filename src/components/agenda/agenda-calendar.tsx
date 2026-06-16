"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Calendar, Clock, ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { WPPost } from "@/lib/wp-types";
import { decodeHtmlEntities, formatDate } from "@/lib/utils";

interface AgendaCalendarProps {
  events: WPPost[];
  locale: Locale;
}

export function AgendaCalendar({ events, locale }: AgendaCalendarProps) {
  const isId = locale === "id";
  const [currentDate, setCurrentDate] = React.useState(() => new Date());
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(() => new Date());

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Get start day of month (0-6) and number of days in month
  const startDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Create grid arrays
  const days: Date[] = [];
  
  // Padding from previous month
  const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
  for (let i = startDay - 1; i >= 0; i--) {
    days.push(new Date(currentYear, currentMonth - 1, prevMonthDays - i));
  }

  // Days of the current month
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(new Date(currentYear, currentMonth, d));
  }

  // Padding for next month to complete the calendar grid (multiple of 7)
  const totalSlots = Math.ceil(days.length / 7) * 7;
  const nextMonthPadding = totalSlots - days.length;
  for (let d = 1; d <= nextMonthPadding; d++) {
    days.push(new Date(currentYear, currentMonth + 1, d));
  }

  // Grid headers
  const dayHeaders = isId
    ? ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"]
    : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Helper: check if two dates are the same day
  const isSameDay = (d1: Date, d2: Date) => {
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  };

  // Get events on a specific day
  const getEventsForDay = (date: Date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return isSameDay(eventDate, date);
    });
  };

  // Nav actions
  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const monthName = currentDate.toLocaleDateString(locale === "id" ? "id-ID" : "en-US", {
    month: "long",
  });
  const yearName = currentDate.toLocaleDateString(locale === "id" ? "id-ID" : "en-US", {
    year: "numeric",
  });

  const selectedDayEvents = selectedDate ? getEventsForDay(selectedDate) : [];

  return (
    <div className="mb-12 overflow-hidden rounded-3xl border border-white/20 bg-white/70 shadow-lg shadow-gray-100/50 backdrop-blur-lg grid lg:grid-cols-[1fr_440px] transition-all hover:shadow-xl hover:shadow-gray-200/50">
      {/* Left panel: Event List for selected day */}
      <div className="p-5 sm:p-6 md:p-8">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <h4 className="font-sfpro text-xs font-bold uppercase tracking-wider text-gray-400">
            {isId ? "Agenda Kegiatan" : "Events for"}
          </h4>
          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-[color:var(--primary)]">
            {selectedDayEvents.length} {isId ? "Kegiatan" : "Events"}
          </span>
        </div>

        <p className="mt-4 text-sm font-semibold text-[color:var(--foreground)]">
          {selectedDate
            ? selectedDate.toLocaleDateString(locale === "id" ? "id-ID" : "en-US", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
              })
            : (isId ? "Pilih Tanggal" : "Select Date")}
        </p>

        <div className="mt-6 space-y-4">
          {selectedDayEvents.length > 0 ? (
            selectedDayEvents.map((event) => {
              const title = decodeHtmlEntities(event.title.rendered);
              const eventDate = new Date(event.date);
              const timeStr = eventDate.toLocaleTimeString(locale === "id" ? "id-ID" : "en-US", {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div
                  key={event.id}
                  className="group relative rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-[color:var(--primary)]/20"
                >
                  {/* Left decorative bar */}
                  <span className="absolute left-0 top-1/4 h-1/2 w-1 rounded-r-md bg-[color:var(--primary)] transition-all group-hover:h-2/3 group-hover:bg-[color:var(--accent)]" />
                  
                  <Link
                    href={`/${locale}/agenda/${event.slug}`}
                    className="block"
                  >
                    <h5 className="font-sfpro text-sm font-bold leading-snug text-[color:var(--foreground)] group-hover:text-[color:var(--primary)] transition-colors line-clamp-2">
                      {title}
                    </h5>
                  </Link>
                  
                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Clock className="size-3.5 text-gray-400" />
                      {timeStr}
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <Calendar className="size-3.5 text-gray-400" />
                      {formatDate(event.date, locale)}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-end">
                    <Link
                      href={`/${locale}/agenda/${event.slug}`}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[color:var(--primary)] group-hover:text-[color:var(--accent)] transition-colors"
                    >
                      {isId ? "Lihat Detail" : "View Details"}
                      <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center text-gray-300">
              <div className="rounded-full bg-gray-50 p-4 border border-gray-100">
                <Calendar className="size-8 text-gray-300" />
              </div>
              <p className="mt-4 text-xs font-medium text-[color:var(--muted-foreground)]">
                {isId ? "Tidak ada agenda terjadwal untuk hari ini." : "No events scheduled for this day."}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Right panel: Calendar Grid */}
      <div className="border-t border-gray-100 bg-gray-50/45 p-5 sm:p-6 md:p-8 lg:border-t-0 lg:border-l">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
          <div>
            <h3 className="font-sfpro text-lg font-bold tracking-tight text-[color:var(--foreground)] sm:text-xl">
              {isId ? "Kalender Agenda" : "Event Calendar"}
            </h3>
            <p className="mt-1 text-[11px] text-[color:var(--muted-foreground)]">
              {isId ? "Pilih tanggal untuk melihat kegiatan" : "Select a date to view events"}
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-center">
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-[color:var(--foreground)]">
                {monthName}
              </span>
              <span className="text-[10px] font-semibold text-[color:var(--primary)]">
                {yearName}
              </span>
            </div>
            <div className="flex gap-0.5 bg-gray-50 p-1 rounded-lg border border-gray-100">
              <button
                type="button"
                onClick={prevMonth}
                className="rounded p-1 text-gray-500 hover:bg-white hover:text-gray-900 transition-all hover:shadow-sm"
                aria-label="Previous month"
              >
                <ChevronLeft className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={nextMonth}
                className="rounded p-1 text-gray-500 hover:bg-white hover:text-gray-900 transition-all hover:shadow-sm"
                aria-label="Next month"
              >
                <ChevronRight className="size-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Days grid headers */}
        <div className="mt-5 grid grid-cols-7 gap-1.5 text-center text-[10px] font-bold uppercase tracking-wider text-gray-400">
          {dayHeaders.map((hdr) => (
            <div key={hdr} className="py-1">{hdr}</div>
          ))}
        </div>

        {/* Days grid */}
        <div className="mt-1.5 grid grid-cols-7 gap-1.5">
          {days.map((day) => {
            const isCurrentMonth = day.getMonth() === currentMonth;
            const dayEvents = getEventsForDay(day);
            const hasEvents = dayEvents.length > 0;
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const isToday = isSameDay(day, new Date());

            return (
              <button
                key={day.toISOString()}
                type="button"
                onClick={() => setSelectedDate(day)}
                className={`group relative flex aspect-square flex-col items-center justify-center rounded-xl text-xs sm:text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)] ${
                  isSelected
                    ? "bg-gradient-to-br from-[color:var(--primary)] to-[color:var(--accent)] text-white font-bold shadow-md shadow-emerald-200/40 scale-[1.03]"
                    : isToday
                    ? "bg-emerald-50 text-[color:var(--primary)] font-bold border border-[color:var(--primary)]/20 hover:bg-emerald-100/60"
                    : isCurrentMonth
                    ? "text-[color:var(--foreground)] hover:bg-gray-50 hover:scale-[1.02]"
                    : "text-gray-300 hover:bg-gray-50/50"
                }`}
              >
                <span className="relative z-10">{day.getDate()}</span>
                
                {/* Event Marker */}
                {hasEvents && (
                  <span
                    className={`absolute bottom-1.5 size-1 rounded-full transition-transform group-hover:scale-125 ${
                      isSelected 
                        ? "bg-white" 
                        : isToday 
                        ? "bg-[color:var(--primary)]" 
                        : "bg-[color:var(--secondary)]"
                    }`}
                  />
                )}

                {/* Subtle outer indicator for event day */}
                {hasEvents && !isSelected && (
                  <span className="absolute inset-0 rounded-xl border border-[color:var(--secondary)]/25 group-hover:border-[color:var(--secondary)]/40 pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
