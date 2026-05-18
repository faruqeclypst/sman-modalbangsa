import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Download, FileText, FileSpreadsheet, FileImage, File, Calendar } from "lucide-react";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getDownloads } from "@/lib/wp";
import type { DownloadItem } from "@/lib/wp";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/layout/page-header";
import { Pagination } from "@/components/news/pagination";
import { formatDate } from "@/lib/utils";

export const revalidate = 600;

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/download">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.cpt.download.title,
    description: dict.cpt.download.subtitle,
    alternates: { canonical: `/${lang}/download` },
  };
}

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

export default async function DownloadListPage({
  params,
  searchParams,
}: PageProps<"/[lang]/download">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const sp = (await searchParams) as { page?: string };
  const page = Math.max(1, Number(sp.page ?? "1") || 1);
  const { items, totalPages } = await getDownloads(12, page);
  const basePath = `/${lang}/download`;

  return (
    <>
      <PageHeader
        title={dict.cpt.download.title}
        subtitle={dict.cpt.download.subtitle}
        breadcrumbs={[
          { label: dict.nav.home, href: `/${lang}` },
          { label: dict.cpt.download.label },
        ]}
      />
      <Container className="py-10 sm:py-12">
        {items.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => {
              const ext = getFileExt(item);
              const date = formatDate(item.date, lang);

              return (
                <a
                  key={item.id}
                  href={item.fileUrl ?? "#"}
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
                      <Calendar className="size-3" aria-hidden />
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
        ) : (
          <div className="flex min-h-[200px] items-center justify-center rounded-2xl bg-gray-50">
            <div className="text-center">
              <Download className="mx-auto size-12 text-gray-300" />
              <p className="mt-3 text-sm text-muted-foreground">{dict.cpt.download.empty}</p>
            </div>
          </div>
        )}

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          basePath={basePath}
          dict={dict}
        />
      </Container>
    </>
  );
}
