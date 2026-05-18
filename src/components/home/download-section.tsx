import Link from "next/link";
import { Download, FileText, FileSpreadsheet, FileImage, File } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { DownloadItem } from "@/lib/wp";
import { formatDate } from "@/lib/utils";
import { Container } from "@/components/ui/container";

interface DownloadSectionProps {
  locale: Locale;
  dict: Dictionary;
  downloads: DownloadItem[];
}

/** Get file extension icon based on mime type or URL */
function FileIcon({ item }: { item: DownloadItem }) {
  const mime = item.fileType ?? "";
  const url = item.fileUrl ?? "";
  if (mime.includes("pdf") || url.endsWith(".pdf")) return <FileText className="size-5" />;
  if (mime.includes("spreadsheet") || mime.includes("excel") || /\.(xls|xlsx|csv)$/i.test(url))
    return <FileSpreadsheet className="size-5" />;
  if (mime.includes("image") || /\.(jpg|jpeg|png|gif|webp)$/i.test(url))
    return <FileImage className="size-5" />;
  return <File className="size-5" />;
}

/** Get short file extension label */
function getFileExt(item: DownloadItem): string {
  if (item.fileUrl) {
    const ext = item.fileUrl.split(".").pop()?.toUpperCase() ?? "";
    if (ext.length <= 4) return ext;
  }
  if (item.fileType?.includes("pdf")) return "PDF";
  if (item.fileType?.includes("word")) return "DOC";
  if (item.fileType?.includes("spreadsheet") || item.fileType?.includes("excel")) return "XLS";
  return "";
}

export function DownloadSection({ locale, dict, downloads }: DownloadSectionProps) {
  if (!downloads.length) return null;

  return (
    <section aria-label={dict.cpt.download.title} className="bg-gray-50 py-14 sm:py-16">
      <Container>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[color:var(--foreground)]">
              <Link
                href={`/${locale}/download`}
                className="hover:text-[color:var(--primary)] transition-colors"
              >
                {dict.cpt.download.title}
              </Link>
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {dict.cpt.download.subtitle}
            </p>
          </div>
          <Link
            href={`/${locale}/download`}
            className="hidden items-center gap-1.5 rounded-full border border-[color:var(--border)] bg-white px-4 py-2 text-sm font-medium text-[color:var(--foreground)] transition-colors hover:border-[color:var(--primary)] hover:text-[color:var(--primary)] sm:inline-flex"
          >
            {dict.cpt.download.viewAll}
          </Link>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {downloads.slice(0, 6).map((item) => {
            const ext = getFileExt(item);
            const date = formatDate(item.date, locale);

            return (
              <a
                key={item.id}
                href={item.fileUrl ?? `/${locale}/download`}
                target={item.fileUrl ? "_blank" : undefined}
                rel={item.fileUrl ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-4 rounded-xl border border-[color:var(--border)] bg-white p-4 shadow-sm transition-all hover:border-[color:var(--primary)] hover:shadow-md"
              >
                {/* Icon */}
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[color:var(--primary)] transition-colors group-hover:bg-[color:var(--primary)] group-hover:text-white">
                  <FileIcon item={item} />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-sm font-semibold leading-snug text-[color:var(--foreground)] group-hover:text-[color:var(--primary)]">
                    {item.title}
                  </p>
                  <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
                    <span>{date}</span>
                    {ext ? (
                      <>
                        <span>•</span>
                        <span className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[10px] font-bold">
                          {ext}
                        </span>
                      </>
                    ) : null}
                    {item.category ? (
                      <>
                        <span>•</span>
                        <span>{item.category}</span>
                      </>
                    ) : null}
                  </div>
                </div>

                {/* Download icon */}
                <Download className="size-4 shrink-0 text-gray-300 transition-colors group-hover:text-[color:var(--primary)]" />
              </a>
            );
          })}
        </div>

        {/* Mobile view all link */}
        <div className="mt-6 text-center sm:hidden">
          <Link
            href={`/${locale}/download`}
            className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--border)] bg-white px-5 py-2.5 text-sm font-medium text-[color:var(--foreground)] transition-colors hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]"
          >
            {dict.cpt.download.viewAll}
          </Link>
        </div>
      </Container>
    </section>
  );
}
