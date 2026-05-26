"use client";

import * as React from "react";
import Link from "next/link";
import { Search, X, Loader2 } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { WPPost } from "@/lib/wp-types";
import { decodeHtmlEntities } from "@/lib/utils";

interface SearchOverlayProps {
  locale: Locale;
  placeholder?: string;
}

export function SearchOverlay({ locale, placeholder = "Cari berita, pengumuman, agenda..." }: SearchOverlayProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<WPPost[]>([]);
  const [loading, setLoading] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const debounceRef = React.useRef<ReturnType<typeof setTimeout>>(undefined);

  // Keyboard shortcut: Ctrl+/ or Cmd+/
  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "/") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Focus input when opened
  React.useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [open]);

  // Debounced search
  React.useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query.trim() || query.length < 2) {
      setResults([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/health?search=${encodeURIComponent(query)}`
        );
        // Use WP REST API directly for search
        const wpUrl = process.env.NEXT_PUBLIC_WP_API_URL || "";
        const wpRes = await fetch(
          `${wpUrl}/posts?search=${encodeURIComponent(query)}&per_page=5&_fields=id,title,slug,date`
        );
        if (wpRes.ok) {
          const data = await wpRes.json();
          setResults(data);
        }
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);
  }, [query]);

  // Lock body scroll when open
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-lg border border-[color:var(--border)] bg-[color:var(--muted)]/50 px-3 py-2 text-sm text-[color:var(--muted-foreground)] transition-colors hover:border-[color:var(--primary)] hover:text-[color:var(--foreground)]"
      >
        <Search className="size-4" />
        <span className="hidden sm:inline">{placeholder}</span>
        <kbd className="ml-2 hidden rounded border border-[color:var(--border)] bg-white px-1.5 py-0.5 text-[10px] font-semibold sm:inline">
          ⌘/
        </kbd>
      </button>

      {/* Overlay */}
      {open ? (
        <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Modal */}
          <div className="relative mx-4 w-full max-w-lg overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)] shadow-2xl">
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-[color:var(--border)] px-5 py-4">
              <Search className="size-5 shrink-0 text-[color:var(--muted-foreground)]" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-transparent text-base text-[color:var(--foreground)] placeholder:text-[color:var(--muted-foreground)] focus:outline-none"
              />
              {loading ? (
                <Loader2 className="size-5 shrink-0 animate-spin text-[color:var(--muted-foreground)]" />
              ) : (
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="shrink-0 rounded-md border border-[color:var(--border)] px-2 py-1 text-xs text-[color:var(--muted-foreground)]"
                >
                  ESC
                </button>
              )}
            </div>

            {/* Results */}
            <div className="max-h-[50vh] overflow-y-auto">
              {results.length > 0 ? (
                <ul className="divide-y divide-[color:var(--border)]">
                  {results.map((post) => (
                    <li key={post.id}>
                      <Link
                        href={`/${locale}/berita/${post.slug}`}
                        onClick={() => setOpen(false)}
                        className="flex flex-col gap-1 px-5 py-3 transition-colors hover:bg-[color:var(--muted)]/50"
                      >
                        <span className="text-sm font-medium text-[color:var(--foreground)]">
                          {decodeHtmlEntities(post.title.rendered)}
                        </span>
                        <span className="text-xs text-[color:var(--muted-foreground)]">
                          {new Date(post.date).toLocaleDateString(locale === "id" ? "id-ID" : "en-US")}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : query.length >= 2 && !loading ? (
                <div className="px-5 py-8 text-center text-sm text-[color:var(--muted-foreground)]">
                  Tidak ada hasil untuk &ldquo;{query}&rdquo;
                </div>
              ) : (
                <div className="px-5 py-8 text-center text-sm text-[color:var(--muted-foreground)]">
                  Ketik minimal 2 karakter untuk mencari...
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
