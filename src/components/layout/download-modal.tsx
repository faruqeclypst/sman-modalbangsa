"use client";

import { useEffect, useState } from "react";
import {
  X,
  Download,
  FileText,
  FileSpreadsheet,
  FileImage,
  File,
  Loader2,
} from "lucide-react";
import type { DownloadItem } from "@/lib/wp";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { formatDate } from "@/lib/utils";
import { fetchDownloadsAction } from "@/app/actions/downloads";

function FileIcon({ item }: { item: DownloadItem }) {
  const mime = item.fileType ?? "";
  const url = item.fileUrl ?? "";
  if (mime.includes("pdf") || url.endsWith(".pdf"))
    return <FileText className="size-5" />;
  if (
    mime.includes("spreadsheet") ||
    mime.includes("excel") ||
    /\.(xls|xlsx|csv)$/i.test(url)
  )
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
  if (
    item.fileType?.includes("spreadsheet") ||
    item.fileType?.includes("excel")
  )
    return "XLS";
  return "";
}

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  dict: Dictionary;
  locale: Locale;
}

export function DownloadModal({
  isOpen,
  onClose,
  dict,
  locale,
}: DownloadModalProps) {
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && downloads.length === 0) {
      setIsLoading(true);
      fetchDownloadsAction(1)
        .then((res) => {
          setDownloads(res.items);
        })
        .catch((err) => {
          console.error("Failed to fetch downloads", err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isOpen, downloads.length]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md shadow-2xl border border-white/20">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/20 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-white/20 text-white">
              <Download className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                {dict.cpt.download.title}
              </h2>
              <p className="text-sm text-gray-200">
                {dict.cpt.download.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-300 transition-colors hover:bg-white/20 hover:text-white"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[60vh] overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="size-8 animate-spin text-emerald-400" />
            </div>
          ) : downloads.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {downloads.map((item) => {
                const ext = getFileExt(item);
                const date = formatDate(item.date, locale);

                return (
                  <a
                    key={item.id}
                    href={item.fileUrl ?? "#"}
                    target={item.fileUrl ? "_blank" : undefined}
                    rel={item.fileUrl ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 shadow-sm transition-all hover:border-emerald-500/50 hover:bg-white/10 hover:shadow-md"
                  >
                    {/* Icon */}
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-emerald-400 transition-colors group-hover:bg-emerald-500 group-hover:text-white">
                      <FileIcon item={item} />
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-sm font-semibold leading-snug text-white group-hover:text-emerald-400">
                        {item.title}
                      </p>
                      <div className="mt-1 flex items-center gap-2 text-[11px] text-gray-300">
                        <span>{date}</span>
                        {ext && (
                          <>
                            <span>•</span>
                            <span className="rounded bg-white/20 px-1.5 py-0.5 font-mono text-[10px] font-bold text-white">
                              {ext}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          ) : (
            <div className="py-8 text-center">
              <Download className="mx-auto size-12 text-gray-400" />
              <p className="mt-3 text-sm text-gray-300">
                {dict.cpt.download.empty}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-white/20 bg-white/5 px-6 py-4">
          <a
            href={`/${locale}/download`}
            className="text-sm font-medium text-emerald-400 hover:text-emerald-300"
          >
            {dict.cpt.download.viewAll} &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
